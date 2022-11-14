import React from "react";
import { useContext, useState } from "react";
import { WebsocketContext } from "./SocketProvider";
import Conversation from "./Conversation";

export default function ChatRoom() {
  //use it just like a hook: useContext gets as initial value
  //the content WebSocketContext
  const [ready, message, send] = useContext(WebsocketContext);
  //two useStates to control inpus from user: userId and chatId
  const [chatId, setChatId] = useState("");
  const [userId, setUserId] = useState("");

  //just to parse message JSON-aws (quasi JSON) from server to JSON and string
  let messageToShow = "";
  let messageJSON = JSON.parse(message);
  const messageString = JSON.stringify(message);
  //console.log("messageJSON: " + messageJSON);
  //to print the connection after log in if it exists

  let isLogin = messageString.length > 4;
  if (!isLogin) messageToShow = "not logged-in";
  else
    messageToShow =
      messageJSON.action + " (connectionId: " + messageJSON.connectionId + ")";

  //functio to send login data to server
  const sendLogin = () => {
    let data = {
      action: "login",
      chatId: chatId,
      userId: userId
    };
    if (ready) send(JSON.stringify(data));
  };

  //props to tree-component downstairs
  let props = {
    userId: userId,
    chatId: chatId
  };

  //view.......................................
  //conditional render.........................
  return (
    <>
      <div>
        <h3>Chat Room</h3>
        <p>
          Status connection: <b> {JSON.stringify(ready)}</b>
        </p>

        {ready && !isLogin ? (
          <>
            <label> UserId </label>
            <input
              type="text"
              placeholder="Alex"
              onChange={(e) => setUserId(e.target.value)}
            />
            <label> ChatId </label>
            <input
              type="text"
              placeholder="chatReactAWS"
              onChange={(e) => setChatId(e.target.value)}
            />
            <br />

            <button onClick={sendLogin}>Enter chat room</button>

            <p>
              Status log in: <b> {messageToShow}</b>
            </p>
          </>
        ) : (
          ""
        )}

        {isLogin ? <Conversation {...props} /> : ""}
      </div>
    </>
  );
}
