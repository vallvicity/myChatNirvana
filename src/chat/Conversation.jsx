import React from "react";
import { useContext, useState, useReducer, useEffect } from "react";
import { WebsocketContext } from "./SocketProvider";

export default function Conversation(props) {
  // use it just like a hook
  const [ready, message, send] = useContext(WebsocketContext);
  const [state, dispatch] = useReducer(conversationReducer, []);
  const [text, setText] = useState("");

  function conversationReducer(state, action) {
    switch (action.type) {
      case "send": {
        let data = {
          action: "conversation",
          chatId: props.chatId,
          userId: props.userId,
          text: action.payload
        };
        if (ready) send(JSON.stringify(data));

        return [
          ...state,
          {
            id: Date.now(),
            time: Date.now(),
            chatId: props.chatId,
            userId: props.userId,
            text: action.payload
          }
        ];
      }
      case "receive": {
        return [
          ...state,
          {
            id: Date.now(),
            time: JSON.parse(message).time,
            chatId: JSON.parse(message).chatId,
            userId: JSON.parse(message).userId,
            text: JSON.parse(message).text
          }
        ];
      }
      case "login": {
        return [
          ...state,
          {
            id: Date.now(),
            userId: "status",
            time: JSON.parse(message).time,
            text:
              JSON.parse(message).action +
              " at " +
              JSON.parse(message).time +
              " with connection:  " +
              JSON.parse(message).connectionId
          }
        ];
      }

      default: {
        return state;
      }
    }
  }

  useEffect(() => {
    var isConverastion = false;
    let stringMessage = JSON.stringify(message);
    if (!stringMessage.includes("sent at")) {
      isConverastion = JSON.parse(message).action === "conversation";
      if (isConverastion) dispatch({ type: "receive", payload: message });
      else dispatch({ type: "login", payload: message });
    }
    console.log("isConverastion: " + isConverastion + " - message: " + message);
  }, [message]);

  let propsConversationLines = {
    state: state,
    userId: props.userId
  };

  return (
    <>
      <div>
        <h2>Conversation</h2>
        <hr />
        <div
          style={{
            color: "black",
            backgroundColor: "azure",
            padding: "10px",
            width: "400px",
            fontFamily: "Helvetica",
            fontSize: "13px"
          }}
        >
          <ConversationsList {...propsConversationLines} />
        </div>
        <br />
        <input
          type="text"
          name="content"
          placeholder="say hello"
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={() => dispatch({ type: "send", payload: text })}>
          {" "}
          Send
        </button>
      </div>
    </>
  );
}

function ConversationsList(propsConversationLines) {
  return propsConversationLines.state.map((item) => (
    <>
      {propsConversationLines.userId === item.userId ? (
        <p
          style={{
            textAlign: "right"
          }}
        >
          {item.userId}: {item.text}
        </p>
      ) : (
        <p
          style={{
            textAlign: "left"
          }}
        >
          {item.userId}: {item.text}
        </p>
      )}
    </>
  ));
}
