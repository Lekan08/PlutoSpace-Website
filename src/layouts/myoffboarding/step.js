import React from "react";

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function Step({ index, label, updateStep, selected }) {
  return (
    <div className={`stepBlock${selected ? " selected" : ""}`}>
      {/* <div className="circleWrapper" onClick={() => updateStep(index + 1)}> */}
      <div className="circleWrapper">
        <div className="circle">{index + 1}</div>
      </div>
      <span>{label}</span>
    </div>
  );
}
