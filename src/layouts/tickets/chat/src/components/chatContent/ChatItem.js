import React from "react";
import Avatar from "../chatList/Avatar";

export default function ChatItem({
  animationDelay,
  key,
  user,
  msg,
  backgroundCol,
  letter,
}) {
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${user ? user : ""}`}
    >
      &nbsp;
      <div className="chat__item__content">
        <div className="chat__msg">{msg}</div>
        <div className="chat__meta">
          <span id="author">{user ? user : "you"}</span>
          <span id="time">1:30PM</span>
        </div>
      </div>
      <Avatar isOnline="active" backgroundCol={backgroundCol} letter={letter} />
    </div>
  );
}
