import React, { Component } from "react";
import ChatContent from "../chatContent/ChatContent";
import Avatar from "./Avatar";

export default function ChatListItems({
  name,
  key,
  animationDelay,
  active,
  isOnline,
  backgroundCol,
  letter,
}) {
  const selectChat = (e) => {
    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
    console.log(name);
    localStorage.setItem("chatName", name);
    return <ChatContent id={key} name={name} />;
  };

  return (
    <div
      style={{ animationDelay: `0.${animationDelay}s` }}
      onClick={selectChat}
      className={`chatlist__item ${active ? active : ""} `}
    >
      <Avatar isOnline="active" backgroundCol={backgroundCol} letter={letter} />

      <div className="userMeta">
        <p>{name}</p>
        <span className="activeTime">32 mins ago</span>
      </div>
    </div>
  );
}
