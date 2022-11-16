// import React, { useState, useEffect } from "react";
// // import ReactDOM from "react-dom";
// import Countdown from "react-countdown";
// // import { useState, useEffect } from "react";

// // Random component
// const Completionist = () => <span>You are good to go!</span>;

// // Renderer callback with condition
// const renderer = ({ hours, minutes, seconds, completed }) => {
//   if (completed) {
//     // Render a complete state
//     return <Completionist />;
//   }
//   // Render a countdown
//   return (
//     <span>
//       {hours}:{minutes}:{seconds}
//     </span>
//   );
// };

// const getLocalStorageValue = (s) => localStorage.getItem(s);

// const Time = () => {
//   const [data, setData] = useState(
//     { date: Date.now(), delay: 60000 } // 10 seconds
//   );
//   // console.log(data);
//   const wantedDelay = 60000; // 10 ms
//   // console.log(wantedDelay);

//   // [START] componentDidMount
//   // Code runs only one time after each reloading
//   useEffect(() => {
//     const savedDate = getLocalStorageValue("end_date");
//     // eslint-disable-next-line no-restricted-globals
//     if (savedDate != null && !isNaN(savedDate)) {
//       const currentTime = Date.now();
//       const delta = parseInt(savedDate, 10) - currentTime;
//       // console.log(delta);

//       // Do you reach the end?
//       if (delta > wantedDelay) {
//         // Yes we clear uour saved end date
//         if (localStorage.getItem("end_date").length > 0) localStorage.removeItem("end_date");
//       } else {
//         // No update the end date with the current date
//         setData({ date: currentTime, delay: delta });
//       }
//     }
//   }, []);
//   // [END] componentDidMount

//   return (
//     <div>
//       <Countdown
//         date={data.date + data.delay}
//         renderer={renderer}
//         onStart={() => {
//           // Save the end date
//           if (localStorage.getItem("end_date") == null)
//             localStorage.setItem("end_date", JSON.stringify(data.date + data.delay));
//         }}
//         onComplete={() => {
//           if (localStorage.getItem("end_date") != null) localStorage.removeItem("end_date");
//         }}
//       />
//     </div>
//   );
// };

// export default Time;
