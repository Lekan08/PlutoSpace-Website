import React, { Component } from "react";

export default function Avatar({ backgroundCol, letter, isOnline }) {
  return (
    <div className="avatar">
      <div
        className="avatar-img"
        style={{ backgroundColor: `${backgroundCol}` }}
      >
        <p className="avatar-letter">{letter}</p>
      </div>
      <span className={`isOnline ${isOnline}`}></span>
    </div>
  );
}
