import React from "react";
import SocketProvider from "./SocketProvider";
import ChatRoom from "./ChatRoom";

export default function Chat() {
  return (
    <div class="w3-container w3-padding-32 w3-center w3-black w3-margin-left: 200px" >
      <h1>Chat</h1>
      <hr />

      <SocketProvider>
        <ChatRoom />
      </SocketProvider>
    </div>
  );
}
