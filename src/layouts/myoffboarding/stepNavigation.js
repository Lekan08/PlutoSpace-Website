/* eslint-disable react/prop-types */
import React from "react";
import Step from "./step";

// eslint-disable-next-line react/prop-types
export default function StepNavigation({ labelArray, updateStep, currentStep }) {
  return (
    <div className="stepWrapper">
      {labelArray.map((item, index) => (
        <Step
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          index={index}
          label={item}
          updateStep={updateStep}
          selected={currentStep === index + 1}
        >
          &nbsp;
        </Step>
      ))}
    </div>
  );
}
