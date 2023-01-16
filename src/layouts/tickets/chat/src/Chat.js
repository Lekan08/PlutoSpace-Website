import React, { useState, useEffect } from "react";
import "./Chat.css";
import io from "socket.io-client";
import Nav from "./components/nav/Nav";
import ChatBody from "./components/chatBody/ChatBody";

const socket = io.connect("http://localhost:3004");

function Chat() {
  // const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    /* if (idx === 0) {
    setPassEnabled(true);
  } */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    // const userNamex = urlParams.get("username");
    const roomID = urlParams.get("ticketID");

    let isMounted = true;
    if (isMounted) {
      // setUsername(userNamex);
      setRoom(roomID);
      socket.emit("join_room", roomID);
    }
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className="__main">
      <Nav />
      <ChatBody socket={socket} room={room} />
    </div>
  );
}

export default Chat;
