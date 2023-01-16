/* eslint-disable react/prop-types */
import React from "react";

export default function Avatar({ backgroundCol, letter, isOnline }) {
  return (
    <div className="avatar">
      <div className="avatar" style={{ backgroundColor: `${backgroundCol}` }}>
        <p className="avatar-letter">{letter}</p>
      </div>
      <span className={`isOnline ${isOnline}`} />
    </div>
  );
}
