// import React, { useState, useEffect } from "react";
// import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
// import Card from "@mui/material/Card";
// import { Container, Form } from "react-bootstrap";

// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// import Footer from "examples/Footer";

// import "bootstrap/dist/css/bootstrap.min.css";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import PHeaders from "postHeader";
// import GHeaders from "getHeader";
// import { useNavigate } from "react-router-dom";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";

// import { styled } from "@mui/material/styles";
// import Chip from "@mui/material/Chip";
// import Paper from "@mui/material/Paper";

// import dayjs from "dayjs";
// import TextField from "@mui/material/TextField";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";

// const ListItem = styled("li")(({ theme }) => ({
//   margin: theme.spacing(0.5),
// }));

// const style = {
//   boxShadow: 2,
//   overflow: "scroll",
//   height: "90px",
//   display: "flex",
//   justifyContent: "center",
//   flexWrap: "wrap",
//   listStyle: "none",
//   p: 0.5,
//   mt: 0,
//   "&::-webkit-scrollbar": {
//     width: "6px",
//     height: "2px",
//   },
//   "&::-webkit-scrollbar-track": {
//     boxShadow: "inset 0 0 1px rgba(0,0,0,0.00)",
//     webkitBoxShadow: "inset 0 0 1px rgba(0,0,0,0.00)",
//   },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: "#4285F4",
//     borderRadius: "10px",
//     webkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
//   },
// };

// function TicketSettings() {
//   const MySwal = withReactContent(Swal);

//   const [twitterAccountsx, setTwitterAccounts] = React.useState([]);
//   const [whatsappAccountsx, setWhatsappAccounts] = React.useState([]);
//   const [emailAccountsx, setEmailAccounts] = React.useState([]);

//   const handleTwitDelete = (chipToDelete) => () => {
//     setTwitterAccounts((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
//   };

//   const handleWhatsDelete = (chipToDelete) => () => {
//     setWhatsappAccounts((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));

//     setEmailAccounts((list) => [...list, chipToDelete]);
//   };

//   const handleEmailDelete = (chipToDelete) => () => {
//     setEmailAccounts((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
//     setWhatsappAccounts((list) => [...list, chipToDelete]);
//   };

//   const [idx, setId] = useState("");
//   const [twitValue, setTwitValue] = useState("");
//   const [whatsValue, setWhatsValue] = useState("");
//   const [emailValue, setEmailValue] = useState("");

//   const [miniTPAs, setMiniTPAs] = useState(0);
//   const [maxiTPAs, setMaxiTPAs] = useState(0);
//   const [averageResoluTime, setAverageResoluTime] = React.useState(
//     dayjs(`${new Date().getFullYear()}-01-01T00:00:00.000Z`)
//   );
//   const [averageRespoTime, setAverageRespoTime] = React.useState(
//     dayjs(`${new Date().getFullYear()}-01-01T00:00:00.000Z`)
//   );
//   const [twitConsKey, setTwitConsKey] = useState("");
//   const [twitConsSecret, setTwitConsSecret] = useState("");
//   const [twitAccessToken, setTwitAccessToken] = useState("");
//   const [twitAccessTokenSecret, setTwitAccessTokenSecret] = useState("");
//   const [twitBearerToken, setTwitBearerToken] = useState("");

//   //   const [startTimex, setStartTime] = useState("");
//   //   const [endTimex, setEndTime] = useState("");

//   const [opened, setOpened] = useState(false);
//   const [checkARPT, setCheckARPT] = useState(false);
//   const [checkARLT, setCheckARLT] = useState(false);

//   const { allPHeaders: myHeaders } = PHeaders();
//   const { allGHeaders: miHeaders } = GHeaders();

//   const navigate = useNavigate();

//   // Method to filter tickets
//   const handleGets = () => {
//     const data11 = JSON.parse(localStorage.getItem("user1"));

//     const orgIDs = data11.orgID;
//     setOpened(true);
//     const headers = miHeaders;
//     fetch(`${process.env.REACT_APP_SHASHA_URL}/ticketSettings/gets/${orgIDs}`, { headers })
//       .then(async (res) => {
//         const aToken = res.headers.get("token-1");
//         localStorage.setItem("rexxdex", aToken);
//         const resultres = await res.text();
//         if (resultres === null || resultres === undefined || resultres === "") {
//           return {};
//         }
//         return JSON.parse(resultres);
//       })
//       .then((result) => {
//         if (result.message === "Expired Access") {
//           navigate("/authentication/sign-in");
//           window.location.reload();
//         }
//         if (result.message === "Token Does Not Exist") {
//           navigate("/authentication/sign-in");
//           window.location.reload();
//         }
//         if (result.message === "Unauthorized Access") {
//           navigate("/authentication/forbiddenPage");
//           window.location.reload();
//         }
//         console.log(result);
//         if (Object.keys(result).length !== 0) {
//           setId(result.id);
//           const ntwitterAccount = [];
//           // eslint-disable-next-line array-callback-return
//           result.twitterAccounts.map((item) => {
//             const chipData = {
//               key: ntwitterAccount.length + 1,
//               label: item,
//             };
//             ntwitterAccount.push(chipData);
//           });
//           setTwitterAccounts(ntwitterAccount);

//           const nwhatsappAccount = [];
//           // eslint-disable-next-line array-callback-return
//           result.whatsappAccounts.map((item) => {
//             const chipData = {
//               key: nwhatsappAccount.length + 1,
//               label: item,
//             };
//             nwhatsappAccount.push(chipData);
//           });
//           setWhatsappAccounts(nwhatsappAccount);

//           const nemailAccount = [];
//           // eslint-disable-next-line array-callback-return
//           result.emailAccounts.map((item) => {
//             const chipData = {
//               key: nemailAccount.length + 1,
//               label: item,
//             };
//             nemailAccount.push(chipData);
//           });
//           // Method to change date to timestamp
//           // eslint-disable-next-line consistent-return
//           const changeRTime = (timestamp) => {
//             if (timestamp !== "") {
//               const date = new Date(timestamp);
//               const yearVal = date.getFullYear();

//               let minuteVal = "0";
//               let secondVal = "0";

//               if (date.getSeconds() < 10) {
//                 secondVal += date.getSeconds();
//               } else {
//                 secondVal = date.getSeconds();
//               }

//               if (date.getMinutes() < 10) {
//                 minuteVal += date.getMinutes();
//               } else {
//                 minuteVal = date.getMinutes();
//               }
//               const retDate = `${yearVal}-01-01T00:${minuteVal}:${secondVal}.000Z`;
//               console.log(retDate);
//               return retDate;
//             }
//           };
//           setEmailAccounts(nemailAccount);
//           setMiniTPAs(result.minimumTicketPerAgent);
//           setMaxiTPAs(result.maximumTicketPerAgent);
//           setAverageResoluTime(changeRTime(result.averageResolutionTime));
//           setAverageRespoTime(changeRTime(result.averageResponseTime));
//           const averageResolT = new Date(result.averageResolutionTime);
//           const averageRespoT = new Date(result.averageResponseTime);
//           // eslint-disable-next-line no-restricted-globals
//           if (isNaN(averageResolT) || isNaN(averageRespoT)) {
//             setCheckARLT(false);

//             setCheckARPT(false);
//           } else {
//             setCheckARLT(true);

//             setCheckARPT(true);
//           }
//           setTwitConsKey(result.twitterConsumerKey);
//           setTwitConsSecret(result.twitterConsumerSecret);
//           setTwitAccessToken(result.twitterAccessToken);
//           setTwitAccessTokenSecret(result.twitterAccessTokenSecret);
//           setTwitBearerToken(result.twitterBearerToken);
//         }
//         setOpened(false);
//       });
//   };

//   useEffect(() => {
//     let isMounted = true;

//     if (isMounted) {
//       //   fetches the table data
//       handleGets();
//     }
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const handleClick = (e) => {
//     const data11 = JSON.parse(localStorage.getItem("user1"));

//     const orgIDs = data11.orgID;
//     setOpened(true);
//     e.preventDefault();

//     const ntwitterAccount = [];
//     // eslint-disable-next-line array-callback-return
//     twitterAccountsx.map((item) => {
//       const fdy = item.label;
//       ntwitterAccount.push(fdy);
//     });

//     const nwhatsappAccount = [];
//     // eslint-disable-next-line array-callback-return
//     whatsappAccountsx.map((item) => {
//       const fdy = item.label;
//       nwhatsappAccount.push(fdy);
//     });

//     const nemailAccount = [];
//     // eslint-disable-next-line array-callback-return
//     emailAccountsx.map((item) => {
//       const fdy = item.label;
//       nemailAccount.push(fdy);
//     });

//     // Method to change date to timestamp
//     // eslint-disable-next-line consistent-return
//     const changeRTime = (timestamp) => {
//       if (timestamp !== "") {
//         const date = new Date(timestamp);
//         const retDate = date.getTime();
//         return retDate;
//       }
//     };
//     const raw = JSON.stringify({
//       orgID: orgIDs,
//       twitterAccounts: ntwitterAccount,
//       emailAccounts: nemailAccount,
//       whatsappAccounts: nwhatsappAccount,
//       minimumTicketPerAgent: parseInt(miniTPAs, 10),
//       maximumTicketPerAgent: parseInt(maxiTPAs, 10),
//       averageResolutionTime: changeRTime(averageResoluTime),
//       averageResponseTime: changeRTime(averageRespoTime),
//       twitterConsumerKey: twitConsKey,
//       twitterConsumerSecret: twitConsSecret,
//       twitterAccessToken: twitAccessToken,
//       twitterAccessTokenSecret: twitAccessTokenSecret,
//       twitterBearerToken: twitBearerToken,
//     });
//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };
//     fetch(`${process.env.REACT_APP_SHASHA_URL}/ticketSettings/save`, requestOptions)
//       .then(async (res) => {
//         const aToken = res.headers.get("token-1");
//         localStorage.setItem("rexxdex", aToken);
//         const resultres = await res.text();
//         if (resultres === null || resultres === undefined || resultres === "") {
//           return {};
//         }
//         return JSON.parse(resultres);
//       })
//       .then((result) => {
//         if (result.message === "Expired Access") {
//           navigate("/authentication/sign-in");
//           window.location.reload();
//         }
//         if (result.message === "Token Does Not Exist") {
//           navigate("/authentication/sign-in");
//           window.location.reload();
//         }
//         if (result.message === "Unauthorized Access") {
//           navigate("/authentication/forbiddenPage");
//           window.location.reload();
//         }
//         setOpened(false);
//         MySwal.fire({
//           title: result.status,
//           type: "success",
//           text: result.message,
//         }).then(() => {
//           handleGets();
//         });
//       })
//       .catch((error) => {
//         setOpened(false);
//         MySwal.fire({
//           title: error.status,
//           type: "error",
//           text: error.message,
//         });
//       });
//   };

//   const handleUpdate = (e) => {
//     setOpened(true);
//     e.preventDefault();
//     const data11 = JSON.parse(localStorage.getItem("user1"));

//     const orgIDs = data11.orgID;

//     const ntwitterAccount = [];
//     // eslint-disable-next-line array-callback-return
//     twitterAccountsx.map((item) => {
//       const fdy = item.label;
//       ntwitterAccount.push(fdy);
//     });

//     const nwhatsappAccount = [];
//     // eslint-disable-next-line array-callback-return
//     whatsappAccountsx.map((item) => {
//       const fdy = item.label;
//       nwhatsappAccount.push(fdy);
//     });

//     const nemailAccount = [];
//     // eslint-disable-next-line array-callback-return
//     emailAccountsx.map((item) => {
//       const fdy = item.label;
//       nemailAccount.push(fdy);
//     });
//     // Method to change date to timestamp
//     // eslint-disable-next-line consistent-return
//     const changeRTime = (timestamp) => {
//       if (timestamp !== "") {
//         const date = new Date(timestamp);
//         const retDate = date.getTime();
//         console.log(retDate);
//         return retDate;
//       }
//     };
//     const raw = JSON.stringify({
//       orgID: orgIDs,
//       twitterAccounts: ntwitterAccount,
//       emailAccounts: nemailAccount,
//       whatsappAccounts: nwhatsappAccount,
//       minimumTicketPerAgent: parseInt(miniTPAs, 10),
//       maximumTicketPerAgent: parseInt(maxiTPAs, 10),
//       averageResolutionTime: changeRTime(averageResoluTime),
//       averageResponseTime: changeRTime(averageRespoTime),
//       twitterConsumerKey: twitConsKey,
//       twitterConsumerSecret: twitConsSecret,
//       twitterAccessToken: twitAccessToken,
//       twitterAccessTokenSecret: twitAccessTokenSecret,
//       twitterBearerToken: twitBearerToken,
//     });
//     // console.log(raw);
//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };
//     fetch(`${process.env.REACT_APP_SHASHA_URL}/ticketSettings/save`, requestOptions)
//       .then(async (res) => {
//         const aToken = res.headers.get("token-1");
//         localStorage.setItem("rexxdex", aToken);
//         const resultres = await res.text();
//         if (resultres === null || resultres === undefined || resultres === "") {
//           return {};
//         }
//         return JSON.parse(resultres);
//       })
//       .then((result) => {
//         if (result.message === "Expired Access") {
//           navigate("/authentication/sign-in");
//           window.location.reload();
//         }
//         if (result.message === "Token Does Not Exist") {
//           navigate("/authentication/sign-in");
//           window.location.reload();
//         }
//         if (result.message === "Unauthorized Access") {
//           navigate("/authentication/forbiddenPage");
//           window.location.reload();
//         }
//         setOpened(false);
//         MySwal.fire({
//           title: result.status,
//           type: "success",
//           text: result.message,
//         }).then(() => {
//           handleGets();
//         });
//       })
//       .catch((error) => {
//         setOpened(false);
//         MySwal.fire({
//           title: error.status,
//           type: "error",
//           text: error.message,
//         });
//       });
//   };

//   const handleAddorUpdate = (e) => {
//     e.preventDefault();
//     if (checkARPT === true && checkARLT === true) {
//       if (twitterAccountsx.length !== 0) {
//         if (
//           twitConsKey === "" ||
//           twitConsSecret === "" ||
//           twitAccessToken === "" ||
//           twitAccessTokenSecret === "" ||
//           twitBearerToken === ""
//         ) {
//           MySwal.fire({
//             title: "EMPTY_TWITTER_FIELDS",
//             type: "error",
//             text: "Please If You Add A twitter Account Please Add The Remaining Required Twitter Fields",
//           });
//         } else {
//           // eslint-disable-next-line no-lonely-if
//           if (idx === null || idx === "") {
//             handleClick(e);
//           } else {
//             handleUpdate(e);
//           }
//         }
//       } else {
//         // eslint-disable-next-line no-lonely-if
//         if (idx === null || idx === "") {
//           handleClick(e);
//         } else {
//           handleUpdate(e);
//         }
//       }
//     }
//   };

//   //   const handleOnSelect = (select) => {
//   //     const userIDs = [];
//   //     // eslint-disable-next-line array-callback-return
//   //     select.map((item) => {
//   //       const fdy = item.value;
//   //       console.log(fdy);
//   //       userIDs.push(fdy);
//   //     });
//   //     setAllUserID(userIDs);
//   //     console.log(select);
//   //     console.log(userIDs);
//   //   };

//   // Method to change type
//   const AddChipData = (num) => {
//     if (num === 1) {
//       if (twitValue !== "") {
//         const chipData = {
//           key: twitterAccountsx.length + 1,
//           label: twitValue,
//         };
//         // const dataa = [...twitterAccountsx, chipData];
//         // console.log(dataa);
//         setTwitterAccounts((list) => [chipData, ...list]);
//         setTwitValue("");
//       }
//     }
//     if (num === 2) {
//       if (whatsValue !== "") {
//         const chipData = {
//           key: whatsappAccountsx.length + 1,
//           label: whatsValue,
//         };
//         setWhatsappAccounts((list) => [chipData, ...list]);
//         setWhatsValue("");
//       }
//     }
//     if (num === 3) {
//       if (emailValue !== "") {
//         const chipData = {
//           key: emailAccountsx.length + 1,
//           label: emailValue,
//         };
//         setEmailAccounts((list) => [chipData, ...list]);
//         setEmailValue("");
//       }
//     }
//   };

//   const handleKeyDown = (e, num) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       AddChipData(num);
//     }
//   };

//   const handleChangeResolTime = (newValue, num) => {
//     if (num === 1) {
//       console.log(newValue);
//       if (newValue === null || newValue === "null") {
//         // eslint-disable-next-line no-unused-expressions
//         document.getElementById("resolVal").innerHTML = "input a resolution time<br>";
//         setCheckARLT(false);
//       } else {
//         console.log(newValue.$m);
//         console.log(newValue.$s);

//         let minuteVal = newValue.$m;
//         const hourVal = newValue.$H;
//         let secondVal = newValue.$s;
//         const concaZero = "0";
//         if (secondVal === 6) {
//           secondVal = concaZero + secondVal;
//         }
//         // eslint-disable-next-line no-restricted-globals
//         if (isNaN(minuteVal)) {
//           // eslint-disable-next-line no-unused-expressions
//           document.getElementById("resolVal").innerHTML = "input a valid time<br>";
//           setCheckARLT(false);
//         } else {
//           // eslint-disable-next-line no-lonely-if
//           if (hourVal > 0) {
//             // eslint-disable-next-line no-unused-expressions
//             document.getElementById("resolVal").innerHTML = "minutes cannot be greater than 59<br>";
//             setCheckARLT(false);
//           } else {
//             console.log("Worked👍🏿");
//             // eslint-disable-next-line no-unused-expressions
//             document.getElementById("resolVal").innerHTML = "";
//             setCheckARLT(true);
//             const datee = `${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`;
//             console.log(new Date(datee));
//             console.log(
//               dayjs(`${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`)
//             );
//             console.log(`${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`);
//             setAverageResoluTime(datee);
//           }
//         }
//         const datee = new Date(
//           `${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`
//         );
//         console.log(datee);
//         if (hourVal === 0) {
//           // eslint-disable-next-line no-restricted-globals
//           if (!isNaN(newValue.$d)) {
//             if (new Date(newValue.$d).getMinutes() < 10) {
//               minuteVal = `0${new Date(newValue.$d).getMinutes()}`;
//               // console.log("new Date(newValue.$d).getSeconds()");
//               // console.log(new Date(newValue.$d).getSeconds());
//               console.log(datee);
//             }
//             if (new Date(newValue.$d).getSeconds() < 10) {
//               secondVal = `0${new Date(newValue.$d).getSeconds()}`;
//               // console.log("new Date(newValue.$d).getSeconds()");
//               // console.log(new Date(newValue.$d).getSeconds());
//               console.log(datee);
//             }
//             console.log(`${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`);
//             console.log(datee);
//             console.log("valid Date");
//             setAverageResoluTime(
//               `${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`
//             );
//             // eslint-disable-next-line no-unused-expressions
//             document.getElementById("resolVal").innerHTML = "";
//             setCheckARLT(true);
//             // eslint-disable-next-line no-restricted-globals
//           } else if (!isNaN(datee)) {
//             if (new Date(newValue.$d).getMinutes() < 10) {
//               minuteVal = `0${new Date(newValue.$d).getMinutes()}`;
//               // console.log("new Date(newValue.$d).getSeconds()");
//               // console.log(new Date(newValue.$d).getSeconds());
//             }
//             if (new Date(newValue.$d).getSeconds() < 10) {
//               secondVal = `0${new Date(newValue.$d).getSeconds()}`;
//               console.log("new Date(newValue.$d).getSeconds()");
//               console.log(new Date(newValue.$d).getSeconds());
//               console.log(secondVal);
//             }
//             console.log(`${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`);
//             console.log("valid Date");
//             setAverageResoluTime(
//               `${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`
//             );
//             // eslint-disable-next-line no-unused-expressions
//             document.getElementById("resolVal").innerHTML = "";
//             setCheckARLT(true);
//           } else {
//             // eslint-disable-next-line no-unused-expressions
//             document.getElementById("resolVal").innerHTML = "input a valid time<br>";
//             setCheckARLT(false);
//             console.log("invalid Date");
//           }
//         }
//       }
//     } else if (num === 2) {
//       console.log(newValue);
//       if (newValue === null || newValue === "null") {
//         // eslint-disable-next-line no-unused-expressions
//         document.getElementById("respoVal").innerHTML = "input a response time<br>";
//         setCheckARPT(false);
//       } else {
//         console.log(newValue.$m);
//         let minuteVal = newValue.$m;
//         const hourVal = newValue.$H;
//         let secondVal = newValue.$s;
//         const concaZero = "0";
//         if (secondVal === 6) {
//           secondVal = concaZero + secondVal;
//         }
//         // eslint-disable-next-line no-restricted-globals
//         if (isNaN(minuteVal)) {
//           // eslint-disable-next-line no-unused-expressions
//           document.getElementById("respoVal").innerHTML = "input a valid time<br>";
//           setCheckARPT(false);
//         } else {
//           // eslint-disable-next-line no-lonely-if
//           if (hourVal > 0) {
//             // eslint-disable-next-line no-unused-expressions
//             document.getElementById("respoVal").innerHTML = "minutes cannot be greater than 59<br>";
//             setCheckARPT(false);
//           } else {
//             console.log("Worked👍🏿");
//             // eslint-disable-next-line no-unused-expressions
//             document.getElementById("respoVal").innerHTML = "";
//             setCheckARPT(true);
//             const datee = `${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`;
//             console.log(datee);
//             setAverageRespoTime(datee);
//           }
//         }

//         const datee = new Date(
//           `${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`
//         );
//         console.log(datee);

//         if (hourVal === 0) {
//           // eslint-disable-next-line no-restricted-globals
//           if (!isNaN(newValue.$d)) {
//             if (new Date(newValue.$d).getMinutes() < 10) {
//               minuteVal = `0${new Date(newValue.$d).getMinutes()}`;
//               // console.log("new Date(newValue.$d).getSeconds()");
//               // console.log(new Date(newValue.$d).getSeconds());
//             }
//             if (new Date(newValue.$d).getSeconds() < 10) {
//               secondVal = `0${new Date(newValue.$d).getSeconds()}`;
//               // console.log("new Date(newValue.$d).getSeconds()");
//               // console.log(new Date(newValue.$d).getSeconds());
//             }
//             console.log(`${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`);
//             console.log("valid Date");
//             setAverageRespoTime(
//               `${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`
//             );
//             // eslint-disable-next-line no-unused-expressions
//             document.getElementById("respoVal").innerHTML = "";
//             setCheckARPT(true);
//             // eslint-disable-next-line no-restricted-globals
//           } else if (!isNaN(datee)) {
//             if (new Date(newValue.$d).getMinutes() < 10) {
//               minuteVal = `0${new Date(newValue.$d).getMinutes()}`;
//               // console.log("new Date(newValue.$d).getSeconds()");
//               // console.log(new Date(newValue.$d).getSeconds());
//             }
//             if (new Date(newValue.$d).getSeconds() < 10) {
//               secondVal = `0${new Date(newValue.$d).getSeconds()}`;
//               console.log("new Date(newValue.$d).getSeconds()");
//               console.log(new Date(newValue.$d).getSeconds());
//             }
//             console.log(`${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`);
//             console.log("valid Date");
//             setAverageRespoTime(
//               `${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`
//             );
//             // eslint-disable-next-line no-unused-expressions
//             document.getElementById("respoVal").innerHTML = "";
//             setCheckARPT(true);
//           } else {
//             // eslint-disable-next-line no-unused-expressions
//             document.getElementById("respoVal").innerHTML = "input a valid time<br>";
//             setCheckARPT(false);
//             console.log("invalid Date");
//           }
//         }
//       }
//     }
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Card>
//         <MDBox pt={4} pb={3} px={5}>
//           <MDBox
//             variant="gradient"
//             bgColor="info"
//             borderRadius="lg"
//             coloredShadow="info"
//             mx={2}
//             mt={-3}
//             p={2}
//             mb={1}
//             textAlign="center"
//           >
//             <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
//               Ticket Settings
//             </MDTypography>
//           </MDBox>
//           <MDBox
//             variant="gradient"
//             sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//             borderRadius="lg"
//             coloredShadow="success"
//             mx={3}
//             mt={1}
//             p={1}
//             mb={1}
//             textAlign="center"
//           >
//             <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
//               {" "}
//             </MDTypography>
//           </MDBox>
//           <div align="center">
//             {" "}
//             <u>How Ticket Settings Works:</u>
//           </div>
//           <MDBox p={3} mt={1}>
//             <MDTypography
//               variant="h4"
//               fontWeight="regular"
//               fontSize="75%"
//               textAlign="center"
//               color="text"
//             >
//               &nbsp;&nbsp;&nbsp;&nbsp;Three Means Of Receiving Tickets Are Listed below(Twitter,
//               WhatApp, Email)
//               <br />
//               Please Fill Correctly Which means you would like to receive Tickets
//               <br />
//               Twitter - Please Fill in the Username of the twitter Account you wish to receive
//               tickets from and if you add a twitter account please fill the other twitter fields
//               <br /> WhatsApp - Please Fill in the Phone Number Of the WhatsApp Account you wish to
//               receive tickets from
//               <br /> Email - Please Fill in the Emails you wish to receive tickets from
//               <br /> Set the Minimun and Maximum Tickets Per Agents
//               <br /> Set the Average Resolution Time and Average Response time for the Tickets(They
//               are in minutes and seconds)
//             </MDTypography>
//           </MDBox>
//           <MDBox component="form" role="form">
//             <MDBox mb={2}>
//               <Container>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <MDBox>
//                       <MDInput
//                         type="text"
//                         label="Twitter Accounts(Usernames) *"
//                         value={twitValue || ""}
//                         onChange={(e) => setTwitValue(e.target.value)}
//                         onKeyDown={(e) => handleKeyDown(e, 1)}
//                         variant="standard"
//                         style={{ width: "80%" }}
//                       />
//                       <MDButton
//                         variant="gradient"
//                         onClick={() => AddChipData(1)}
//                         color="info"
//                         width="50%"
//                         align="center"
//                         size="small"
//                       >
//                         Add
//                       </MDButton>
//                     </MDBox>
//                   </div>
//                   <div className="col-sm-6">
//                     <Paper sx={style} component="ul">
//                       {twitterAccountsx.map((data) => (
//                         <ListItem key={data.key}>
//                           <Chip label={data.label} onDelete={handleTwitDelete(data)} />
//                         </ListItem>
//                       ))}
//                     </Paper>
//                   </div>
//                 </div>
//               </Container>
//             </MDBox>
//             <MDBox mb={2}>
//               <Container>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <MDBox>
//                       <MDInput
//                         type="text"
//                         label="WhatsApp Accounts(Phone Numbers) *"
//                         value={whatsValue || ""}
//                         onChange={(e) => setWhatsValue(e.target.value)}
//                         onKeyDown={(e) => handleKeyDown(e, 2)}
//                         variant="standard"
//                         style={{ width: "80%" }}
//                       />
//                       <MDButton
//                         variant="gradient"
//                         onClick={() => AddChipData(2)}
//                         color="info"
//                         width="50%"
//                         align="center"
//                         size="small"
//                       >
//                         Add
//                       </MDButton>
//                     </MDBox>
//                   </div>
//                   <div className="col-sm-6">
//                     <Paper sx={style} component="ul">
//                       {whatsappAccountsx.map((data) => (
//                         <ListItem key={data.key}>
//                           <Chip label={data.label} onDelete={handleWhatsDelete(data)} />
//                         </ListItem>
//                       ))}
//                     </Paper>
//                   </div>
//                 </div>
//               </Container>
//             </MDBox>
//             <MDBox mb={2}>
//               <Container>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <MDBox>
//                       <MDInput
//                         type="text"
//                         label="Email Accounts(Emails) *"
//                         value={emailValue || ""}
//                         onChange={(e) => setEmailValue(e.target.value)}
//                         onKeyDown={(e) => handleKeyDown(e, 3)}
//                         variant="standard"
//                         style={{ width: "80%" }}
//                       />
//                       <MDButton
//                         variant="gradient"
//                         onClick={() => AddChipData(3)}
//                         color="info"
//                         width="50%"
//                         align="center"
//                         size="small"
//                       >
//                         Add
//                       </MDButton>
//                     </MDBox>
//                   </div>
//                   <div className="col-sm-6">
//                     <Paper sx={style} component="ul">
//                       {emailAccountsx.map((data) => (
//                         <ListItem key={data.key}>
//                           <Chip label={data.label} onDelete={handleEmailDelete(data)} />
//                         </ListItem>
//                       ))}
//                     </Paper>
//                   </div>
//                 </div>
//               </Container>
//             </MDBox>
//             <MDBox mb={2}>
//               <Container>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <MDInput
//                       type="number"
//                       label="Minimum Tickets Per Agent *"
//                       value={miniTPAs || ""}
//                       className="form-control"
//                       onChange={(e) => setMiniTPAs(e.target.value)}
//                       variant="standard"
//                       fullWidth
//                     />
//                   </div>
//                   <div className="col-sm-6">
//                     <MDInput
//                       type="number"
//                       label="Maximum Tickets Per Agent *"
//                       value={maxiTPAs || ""}
//                       onChange={(e) => setMaxiTPAs(e.target.value)}
//                       variant="standard"
//                       fullWidth
//                     />
//                   </div>
//                 </div>
//               </Container>
//             </MDBox>
//             <MDBox mb={2} mt={2}>
//               <Container>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <Container>
//                       <div className="row">
//                         {" "}
//                         <MDBox mb={3}>
//                           <MDTypography
//                             variant="h4"
//                             fontWeight="regular"
//                             fontSize="55%"
//                             textAlign="center"
//                             color="error"
//                           >
//                             note: please input values lower than 59:59
//                           </MDTypography>
//                         </MDBox>
//                         <div className="col-sm-6">
//                           <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <TimePicker
//                               disableOpenPicker
//                               views={["minutes", "seconds"]}
//                               inputFormat="mm:ss"
//                               mask="__:__"
//                               label="Average Resolution Time*"
//                               minutesStep={1}
//                               value={averageResoluTime}
//                               onChange={(newValue) => {
//                                 handleChangeResolTime(newValue, 1);
//                               }}
//                               renderInput={(params) => <TextField {...params} />}
//                             />
//                           </LocalizationProvider>
//                           <MDTypography
//                             variant="h4"
//                             fontWeight="regular"
//                             fontSize="55%"
//                             textAlign="left"
//                             color="error"
//                             id="resolVal"
//                           >
//                             {" "}
//                           </MDTypography>
//                         </div>
//                         <div className="col-sm-6">
//                           <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <TimePicker
//                               disableOpenPicker
//                               views={["minutes", "seconds"]}
//                               inputFormat="mm:ss"
//                               mask="__:__"
//                               label="Average Response Time*"
//                               minutesStep={1}
//                               value={averageRespoTime}
//                               onChange={(newValue) => {
//                                 handleChangeResolTime(newValue, 2);
//                               }}
//                               renderInput={(params) => <TextField {...params} />}
//                             />
//                           </LocalizationProvider>
//                           <MDTypography
//                             variant="h4"
//                             fontWeight="regular"
//                             fontSize="55%"
//                             textAlign="left"
//                             color="error"
//                             id="respoVal"
//                           >
//                             {" "}
//                           </MDTypography>
//                         </div>
//                       </div>
//                     </Container>
//                   </div>
//                   <div className="col-sm-6">
//                     <Form.Group className="mb-1" controlId="exampleForm.ControlTextArea">
//                       <Form.Label style={{ fontSize: 14 }}>Twitter Bearer Token</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         value={twitBearerToken || ""}
//                         onChange={(e) => setTwitBearerToken(e.target.value)}
//                         label="Message *"
//                         variant="standard"
//                       />
//                     </Form.Group>
//                   </div>
//                 </div>
//               </Container>
//             </MDBox>
//             <MDBox mb={2}>
//               <Container>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <Form.Group className="mb-1" controlId="exampleForm.ControlTextArea">
//                       <Form.Label style={{ fontSize: 14 }}>Twitter Consumer Key</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         value={twitConsKey || ""}
//                         onChange={(e) => setTwitConsKey(e.target.value)}
//                         label="Message"
//                         variant="standard"
//                       />
//                     </Form.Group>
//                   </div>
//                   <div className="col-sm-6">
//                     <Form.Group className="mb-1" controlId="exampleForm.ControlTextArea">
//                       <Form.Label style={{ fontSize: 14 }}>Twitter Consumer Secret</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         value={twitConsSecret || ""}
//                         onChange={(e) => setTwitConsSecret(e.target.value)}
//                         label="Message"
//                         variant="standard"
//                       />
//                     </Form.Group>
//                   </div>
//                 </div>
//               </Container>
//             </MDBox>
//             <MDBox mb={2}>
//               <Container>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <Form.Group className="mb-1" controlId="exampleForm.ControlTextArea">
//                       <Form.Label style={{ fontSize: 14 }}>Twitter Access Token</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         value={twitAccessToken || ""}
//                         onChange={(e) => setTwitAccessToken(e.target.value)}
//                         label="Message"
//                         variant="standard"
//                       />
//                     </Form.Group>
//                   </div>
//                   <div className="col-sm-6">
//                     <Form.Group className="mb-1" controlId="exampleForm.ControlTextArea">
//                       <Form.Label style={{ fontSize: 14 }}>Twitter Access Token secret</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         value={twitAccessTokenSecret || ""}
//                         onChange={(e) => setTwitAccessTokenSecret(e.target.value)}
//                         label="Message"
//                         variant="standard"
//                       />
//                     </Form.Group>
//                   </div>
//                 </div>
//               </Container>
//             </MDBox>

//             <div align="center">
//               <MDBox mt={4} mb={1}>
//                 <MDButton
//                   variant="gradient"
//                   onClick={handleAddorUpdate}
//                   color="info"
//                   width="50%"
//                   align="center"
//                 >
//                   Save
//                 </MDButton>
//               </MDBox>
//             </div>
//           </MDBox>
//         </MDBox>
//       </Card>
//       <Footer />
//       <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
//         <CircularProgress color="info" />
//       </Backdrop>
//     </DashboardLayout>
//   );
// }

// export default TicketSettings;
