import { useState, useRef, useEffect, createContext } from "react";
import React from "react";

//https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
//https://reactjs.org/docs/context.html
//ceate context we will use as store of websockets
export const WebsocketContext = createContext(false, null, () => {});
// ..........................................ready...message...send

// Make sure to put WebsocketProvider higher up in
// the component tree than any consumers
const SocketProvider = ({ children }) => {
  //two hooks to control states of connection and getting messages
  const [isReady, setIsReady] = useState(false);
  const [message, setMessage] = useState(null);

  //hook to control websocket persistence over re-renders and component tree
  // to any consumer
  const websocket = useRef(null);
  // aws endpoint
  var protocol = "wss://";
  //var word = "no-connection";
  var word = "oxuzzgyilh";
  var domain = ".execute-api.eu-central-1.amazonaws.com/production";
  var endpoint = protocol + word + domain;

  //hook to execute every render () => { function, how many renders we want}
  // void > just one render at first
  //[] > every new state
  //[dependency] > depends on functions within dependency
  useEffect(() => {
    //create socket object
    const socket = new WebSocket(endpoint);
    //if we open, set isReady to true
    socket.onopen = () => setIsReady(true);
    //if we close, set isReady to false
    socket.onclose = () => setIsReady(false);
    //if we get a message, set message on that event (JSON)
    socket.onmessage = (event) => setMessage(event.data);
    websocket.current = socket;
    //close socket on return, that is, useEffect may use
    //this feature as optional, in this case we use it
    //to clean-up and close when exit the tab
    return () => {
      socket.close();
    };
  }, []);

  //create  variable JSON with the 3 websocket-states we will use
  //along the component tree: connection (isReady), get messages from server,
  //sendind messages : function
  const actionsWebSocket = [
    isReady,
    message,
    //function to send ws WHEN it is called
    websocket.current?.send.bind(websocket.current)
  ];

  //ending component: we call context => WebsoockettContext
  //so socket provider is a component which returns a context
  //And this context goes with explicit props: actionsWebSocket
  return (
    <WebsocketContext.Provider value={actionsWebSocket}>
      {children}
    </WebsocketContext.Provider>
  );
};

export default SocketProvider;
