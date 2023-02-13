// // // /* eslint-disable react/no-this-in-sfc */
// // // import React, { useEffect, useState } from "react";
// // // import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// // // import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// // // import MDBox from "components/MDBox";
// // // import MDInput from "components/MDInput";
// // // import MDButton from "components/MDButton";
// // // import Card from "@mui/material/Card";
// // // import { Container, Form } from "react-bootstrap";
// // // import "bootstrap/dist/css/bootstrap.min.css";
// // // import MDTypography from "components/MDTypography";
// // // import PHeaders from "postHeader";
// // // import GHeaders from "getHeader";
// // // import Styles from "styles";
// // // import TextField from "@mui/material/TextField";
// // // import { useNavigate } from "react-router-dom";
// // // // import PhoneInput from "react-phone-input-2";
// // // import Swal from "sweetalert2";
// // // import withReactContent from "sweetalert2-react-content";
// // // import Backdrop from "@mui/material/Backdrop";
// // // import CircularProgress from "@mui/material/CircularProgress";
// // // import Box from "@mui/material/Box";
// // // import Grid from "@mui/material/Grid";
// // // import Modal from "@mui/material/Modal";
// // // import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// // // import { styled } from "@mui/material/styles";
// // // // import Box from '@mui/material/Box';
// // // import Paper from "@mui/material/Paper";
// // // import PersonAddIcon from "@mui/icons-material/PersonAdd";
// // // import { IconButton } from "@mui/material";
// // // import MenuItem from "@mui/material/MenuItem";
// // // import InputLabel from "@mui/material/InputLabel";
// // // import Select from "@mui/material/Select";
// // // import FormControl from "@mui/material/FormControl";
// // // import Add from "@mui/icons-material/Add";
// // // import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
// // // // import { style } from "@mui/system";
// // // // import { NoBackpackSharp } from "@mui/icons-material";
// // // // zinoleesky wrote this part of d code called sales

// // // function Sales() {
// // //   const MySwal = withReactContent(Swal);
// // //   const { allPHeaders: myHeaders } = PHeaders();
// // //   const { allGHeaders: miHeaders } = GHeaders();

// // //   //   const [branId, setBranId] = useState([]);
// // //   //   const [branx, setBranx] = useState("");
// // //   //   const [quantityx, setQuantity] = useState("");
// // //   //   const [ppQuantity, setPPQuantity] = useState("");
// // //   //   const [amountx, setAmount] = useState(0);
// // //   //   const [taskAmountx, setTaskAmount] = useState(0);

// // //   const [individualx, setIndividual] = useState([]);
// // //   const [indix, setIndi] = useState("");
// // //   //   const [craze, setCraze] = useState(false);
// // //   const [namex, setName] = useState("");
// // //   const [lnamex, setLnamex] = useState("");
// // //   const [titlex, setTitle] = useState("");

// // //   const [checkedName, setCheckedName] = useState("");
// // //   const [enabled, setEnabled] = useState("");
// // //   //   const [emailx, setEmail] = useState("");
// // //   // const [pnox, setPno] = useState("");
// // //   // const [maritalx, setMaritalx] = useState("");
// // //   //   const [duty, setDutyRelieverx] = useState("");
// // //   const [user, setUser] = useState([]);
// // //   const [commentx, setComment] = useState("");

// // //   const navigate = useNavigate();
// // //   const [opened, setOpened] = useState(false);
// // //   const [open, setOpen] = useState(false);
// // //   const handleClose = () => setOpen(false);
// // //   const [salesTypex, setSalesType] = useState("");
// // //   const [pPQuantityx, setPPQuantity] = useState("");
// // //   const [quantityx, setQuantity] = useState("");
// // //   const [amountx, setAmount] = useState("");
// // //   const [taxAmountx, setTaxAmount] = useState("");
// // //   const [amountNotChange, setAmountNotChange] = useState("");
// // //   const [amountNotChange2, setAmountNotChange2] = useState("");

// // //   const [counter, setCounter] = useState([
// // //     { salesType: "", pPQuantity: "", quantity: "", amount: "", taxAmountx: "", bonusAmount: "" },
// // //   ]);
// // //   const [counter2, setCounter2] = useState([]);
// // //   const [view, setView] = useState([]);
// // //   // const [ppp, setppp] = useState(0);
// // //   console.log(user);
// // //   console.log(enabled);
// // //   console.log(Number(amountNotChange));
// // //   console.log(amountNotChange2);
// // //   console.log(setAmountNotChange2);
// // //   console.log(view);
// // //   // console.log(ppp);
// // //   // eslint-disable-next-line no-lone-blocks
// // //   // {
// // //   //   view.map(
// // //   //     (apis) =>
// // //   //       // <option key={apis.code} value={apis.name}>
// // //   //       apis.amountx
// // //   //     // console.log(apis.amountx);
// // //   //     // </option>
// // //   //   );
// // //   // }
// // //   console.log(view.map((apis) => apis.amountx));

// // //   //   useEffect(() => {
// // //   //     const data11 = JSON.parse(localStorage.getItem("user1"));

// // //   //     const orgIDs = data11.orgID;
// // //   //     const headers = miHeaders;
// // //   //     let isMounted = true;
// // //   //     fetch(`${process.env.REACT_APP_KUBU_URL}/branch/gets/${orgIDs}`, { headers })
// // //   //       .then(async (res) => {
// // //   //         const aToken = res.headers.get("token-1");
// // //   //         localStorage.setItem("rexxdex", aToken);
// // //   //         return res.json();
// // //   //       })
// // //   //       .then((result) => {
// // //   //         if (result.message === "Expired Access") {
// // //   //           navigate("/authentication/sign-in");
// // //   //           window.location.reload();
// // //   //         }
// // //   //         if (result.message === "Token Does Not Exist") {
// // //   //           navigate("/authentication/sign-in");
// // //   //           window.location.reload();
// // //   //         }
// // //   //         if (result.message === "Unauthorized Access") {
// // //   //           navigate("/authentication/forbiddenPage");
// // //   //           window.location.reload();
// // //   //         }
// // //   //         if (isMounted) {
// // //   //           setBranId(result);
// // //   //         }
// // //   //       });
// // //   //     return () => {
// // //   //       isMounted = false;
// // //   //     };
// // //   //   }, []);

// // //   useEffect(() => {
// // //     const data11 = JSON.parse(localStorage.getItem("user1"));

// // //     const orgIDs = data11.orgID;
// // //     const headers = miHeaders;
// // //     let isMounted = true;
// // //     fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/gets/${orgIDs}`, { headers })
// // //       .then(async (res) => {
// // //         const aToken = res.headers.get("token-1");
// // //         localStorage.setItem("rexxdex", aToken);
// // //         return res.json();
// // //       })
// // //       .then((result) => {
// // //         if (result.message === "Expired Access") {
// // //           navigate("/authentication/sign-in");
// // //           window.location.reload();
// // //         }
// // //         if (result.message === "Token Does Not Exist") {
// // //           navigate("/authentication/sign-in");
// // //           window.location.reload();
// // //         }
// // //         if (result.message === "Unauthorized Access") {
// // //           navigate("/authentication/forbiddenPage");
// // //           window.location.reload();
// // //         }
// // //         if (isMounted) {
// // //           console.log(result);
// // //           setIndividual(result);
// // //         }
// // //       });
// // //     return () => {
// // //       isMounted = false;
// // //     };
// // //   }, []);

// // //   const handleOnlastChange = (e) => {
// // //     //   // amountNotChange;
// // //     const abc = e;
// // //     console.log(abc);
// // //     // abc[e.target.className] = e.target.value;
// // //     // setAmount({ ...amountx, abc });
// // //     setAmount(abc);
// // //     console.log(e);
// // //     console.log({ amountx, abc });
// // //   };

// // //   useEffect(() => {
// // //     const headers = miHeaders;

// // //     const data11 = JSON.parse(localStorage.getItem("user1"));

// // //     const orgIDs = data11.orgID;
// // //     let isMounted = true;
// // //     // setOpened(true);
// // //     fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
// // //       .then(async (res) => {
// // //         const aToken = res.headers.get("token-1");
// // //         localStorage.setItem("rexxdex", aToken);
// // //         return res.json();
// // //       })
// // //       .then((result) => {
// // //         if (result.message === "Expired Access") {
// // //           navigate("/authentication/sign-in");
// // //           window.location.reload();
// // //         }
// // //         if (result.message === "Token Does Not Exist") {
// // //           navigate("/authentication/sign-in");
// // //           window.location.reload();
// // //         }
// // //         if (result.message === "Unauthorized Access") {
// // //           navigate("/authentication/forbiddenPage");
// // //           window.location.reload();
// // //         }
// // //         if (isMounted) {
// // //           setUser(result);
// // //           setOpened(false);
// // //         }
// // //         if (amountNotChange2 !== "") {
// // //           handleOnlastChange(amountNotChange2);
// // //           // setAmount(amountNotChange2);
// // //           console.log(amountNotChange2);
// // //         }
// // //       });
// // //     return () => {
// // //       isMounted = false;
// // //     };
// // //   }, []);
// // //   // useEffect(() => {
// // //   //   const headers = miHeaders;

// // //   //   const data11 = JSON.parse(localStorage.getItem("user1"));

// // //   //   const orgIDs = data11.orgID;
// // //   //   let isMounted = true;
// // //   //   fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
// // //   //     .then(async (res) => {
// // //   //       const aToken = res.headers.get("token-1");
// // //   //       localStorage.setItem("rexxdex", aToken);
// // //   //       return res.json();
// // //   //     })
// // //   //     .then((result) => {
// // //   //       if (result.message === "Expired Access") {
// // //   //         navigate("/authentication/sign-in");
// // //   //         window.location.reload();
// // //   //       }
// // //   //       if (result.message === "Token Does Not Exist") {
// // //   //         navigate("/authentication/sign-in");
// // //   //         window.location.reload();
// // //   //       }
// // //   //       if (result.message === "Unauthorized Access") {
// // //   //         navigate("/authentication/forbiddenPage");
// // //   //         window.location.reload();
// // //   //       }
// // //   //       console.log(result);
// // //   //       if (isMounted) {
// // //   //         const newMap = [];

// // //   //         // eslint-disable-next-line array-callback-return
// // //   //         result.map((item) => {
// // //   //           const NewMapp = {
// // //   //             value: item.personal.id,
// // //   //             label: `${item.personal.fname}`,
// // //   //           };
// // //   //           newMap.push(NewMapp);
// // //   //         });
// // //   //         setUser(newMap);
// // //   //       }
// // //   //     });
// // //   //   return () => {
// // //   //     isMounted = false;
// // //   //   };
// // //   // }, []);

// // //   const modalStyle = {
// // //     position: "absolute",
// // //     top: "50%",
// // //     left: "50%",
// // //     transform: "translate(-50%, -50%)",
// // //     width: 400,
// // //     bgcolor: "#ffffff",
// // //     border: "3px solid #5F9DF7",
// // //     borderRadius: 5,
// // //     boxShadow: 24,
// // //     p: 4,
// // //     overflow: "auto",
// // //     height: "35%",
// // //     display: "flex",
// // //     "&::-webkit-scrollbar": {
// // //       width: 40,
// // //     },
// // //     "&::-webkit-scrollbar-track": {
// // //       backgroundColor: "white",
// // //     },
// // //     "&::-webkit-scrollbar-thumb": {
// // //       backgroundColor: "#f5f5f5",
// // //       borderRadius: 10,
// // //     },
// // //   };

// // //   console.log(salesTypex);

// // //   const handleNewInput = () => {
// // //     setCounter(counter + 1);
// // //     setCounter2(counter);
// // //     console.log(counter);
// // //     const item = {
// // //       saleType: [salesTypex],
// // //       branchID: "",
// // //       pricePerUnit: "",
// // //       quantity: "",
// // //       amount: [amountx],
// // //       taxAmount: "",
// // //       totalAmount: "",
// // //       id: counter,
// // //     };

// // //     console.log(item);
// // //     console.log(counter2);
// // //     console.log(item.amount.amountx);
// // //     console.log(item.amount);
// // //     setView(item.amount);
// // //     // console.log(counter.current);
// // //   };

// // //   // if (counter === item.id) {

// // //   // }

// // //   const array = [];
// // //   array.push(counter2);
// // //   console.log(array);
// // //   const handleRemoveInput = () => {
// // //     setCounter(counter - 1);
// // //     console.log(counter);
// // //   };
// // //   console.log(handleNewInput);
// // //   console.log(pPQuantityx);
// // //   console.log(quantityx);
// // //   // const amountx = parseInt(pPQuantityx, 10) * parseInt(quantityx, 10);
// // //   console.log(amountx);
// // //   // setAmountNotChange2(amountxx);

// // //   const handleClick = (e) => {
// // //     // handleOnTitleKeys();
// // //     // handleOnQuantityKeys();
// // //     // handleOnPPQuantityKeys();
// // //     // handleOnBonusAmountKeys();
// // //     // Amount * taxamount - bonus
// // //     // if (enabled) {
// // //     setOpened(true);
// // //     e.preventDefault();
// // //     const data11 = JSON.parse(localStorage.getItem("user1"));

// // //     const orgIDs = data11.orgID;
// // //     //   const idx = data11.personalID;
// // //     const raw = JSON.stringify({
// // //       orgID: orgIDs,
// // //       individualID: "duty",
// // //       items: [
// // //         {
// // //           saleType: salesTypex,
// // //           salesID: "string",
// // //           branchID: "branx",
// // //           pricePerUnit: pPQuantityx,
// // //           quantity: quantityx,
// // //           amount: "amountx",
// // //           taxAmount: taxAmountx,
// // //           totalAmount: "totalAmountx",
// // //         },
// // //       ],
// // //       bonusAmount: 0,
// // //       subTotalAmount: 0,
// // //       totalAmount: 0,
// // //       createdBy: "idx",
// // //       comment: commentx,
// // //       receiptStatus: 0,
// // //     });
// // //     console.log(raw);
// // //     const requestOptions = {
// // //       method: "POST",
// // //       headers: myHeaders,
// // //       body: raw,
// // //       redirect: "follow",
// // //     };

// // //     fetch(`${process.env.REACT_APP_LOUGA_URL}/sales/add`, requestOptions)
// // //       .then(async (res) => {
// // //         const aToken = res.headers.get("token-1");
// // //         localStorage.setItem("rexxdex", aToken);
// // //         return res.json();
// // //       })
// // //       .then((result) => {
// // //         setOpened(false);
// // //         if (result.message === "Expired Access") {
// // //           navigate("/authentication/sign-in");
// // //           window.location.reload();
// // //         }
// // //         if (result.message === "Token Does Not Exist") {
// // //           navigate("/authentication/sign-in");
// // //           window.location.reload();
// // //         }
// // //         if (result.message === "Unauthorized Access") {
// // //           navigate("/authentication/forbiddenPage");
// // //           window.location.reload();
// // //         }
// // //         MySwal.fire({
// // //           title: result.status,
// // //           type: "success",
// // //           text: result.message,
// // //         })
// // //           .then(() => {
// // //             console.log(result.data.id);
// // //             //   handlePayVAT(result.data.id);
// // //             // window.location.reload();
// // //           })
// // //           .then(() => {
// // //             window.location.reload();
// // //           });
// // //       })
// // //       .catch((error) => {
// // //         MySwal.fire({
// // //           title: error.status,
// // //           type: "error",
// // //           text: error.message,
// // //         });
// // //       });
// // //     // }
// // //   };

// // //   const handleOnNameKeys = () => {
// // //     const letters = /^[a-zA-Z ]+$/;
// // //     if (!namex.match(letters)) {
// // //       setCheckedName(false);
// // //       // eslint-disable-next-line no-unused-expressions
// // //       document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
// // //     }
// // //     if (namex.match(letters)) {
// // //       setCheckedName(true);
// // //       // eslint-disable-next-line no-unused-expressions
// // //       document.getElementById("name").innerHTML = "";
// // //     }
// // //     if (namex.length === 0) {
// // //       // eslint-disable-next-line no-unused-expressions
// // //       document.getElementById("name").innerHTML = "Name is required<br>";
// // //     }
// // //     setEnabled(checkedName === true);
// // //   };
// // //   //   const handleOnEmailKeys = () => {
// // //   //     const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
// // //   //     if (!emailx.match(letters)) {
// // //   //       // eslint-disable-next-line no-unused-expressions
// // //   //       document.getElementById("email").innerHTML = "Email - input a valid email<br>";
// // //   //     }
// // //   //     if (emailx.match(letters)) {
// // //   //       // eslint-disable-next-line no-unused-expressions
// // //   //       document.getElementById("email").innerHTML = "";
// // //   //     }
// // //   //     if (emailx.length === 0) {
// // //   //       // eslint-disable-next-line no-unused-expressions
// // //   //       document.getElementById("email").innerHTML = "Email is required<br>";
// // //   //     }
// // //   //   };

// // //   const openModal = (id) => {
// // //     console.log("This is for modal");
// // //     // setTaskid(id);
// // //     setOpen(true);
// // //     console.log(id);
// // //   };
// // //   const handleOnChange = (e) => {
// // //     const abc = {};
// // //     abc[e.target.className] = e.target.value;
// // //     setSalesType({ ...salesTypex, ...abc });
// // //     console.log({ ...salesTypex, ...abc });
// // //   };
// // //   const handleOnChange2 = (e) => {
// // //     console.log(e);
// // //     console.log(pPQuantityx);
// // //     const abc = parseInt(e, 10) * parseInt(quantityx, 10);
// // //     const belgium = e * quantityx;
// // //     console.log(abc);
// // //     console.log(belgium);
// // //     // abc[e.target.className] = e.target.value;
// // //     setPPQuantity(e);
// // //     const invest = Number(abc);
// // //     console.log(invest);
// // //     setAmountNotChange(belgium);
// // //     // setAmount(quantityx * e);
// // //   };
// // //   // console.log(setAmount);
// // //   // const handleOnChange4 = (e) => {
// // //   //   console.log(e);
// // //   //   // const abc = e;
// // //   //   // abc = e.target.value;
// // //   //   // setAmount(e);
// // //   //   console.log({ ...amountx, ...e });
// // //   // };

// // //   // const callback = (e) => {
// // //   //   useEffect(() => {
// // //   //     let isMounted = true;
// // //   //     if (isMounted) {
// // //   //       // handleOnlastChange(e);
// // //   //       console.log(e);
// // //   //     }
// // //   //     return () => {
// // //   //       isMounted = false;
// // //   //     };
// // //   //   }, []);
// // //   // };
// // //   // console.log(handleOnlastChange);
// // //   // useEffect(() => {
// // //   //   // let isMounted = true;
// // //   //   // if (isMounted) {
// // //   //   //   // handleOnlastChange(amountNotChange2);
// // //   //   console.log(amountNotChange2);
// // //   //   // }
// // //   //   // return () => {
// // //   //   //   isMounted = false;
// // //   //   // };
// // //   // }, []);
// // //   if (amountNotChange2 !== "") {
// // //     console.log(amountNotChange2);
// // //     // useEffect(() => {
// // //     //   // let isMounted = true;
// // //     //   // if (isMounted) {
// // //     //   handleOnlastChange(amountNotChange2);
// // //     //   console.log(amountNotChange2);
// // //     //   // }
// // //     //   // return () => {
// // //     //   //   isMounted = false;
// // //     //   // };
// // //     // }, [amountx]);
// // //   }
// // //   const handleOnChange3 = (e) => {
// // //     // const abc = {};
// // //     // abc[e.target.className] = e.target.value;
// // //     setQuantity(e.target.value);
// // //     // setAmount(e.target.value * pPQuantityx);
// // //     console.log(pPQuantityx * e.target.value);
// // //     setAmountNotChange2(pPQuantityx * e.target.value);
// // //     const movvvv = parseInt(pPQuantityx, 10) * parseInt(e.target.value, 10);
// // //     console.log(movvvv);
// // //     console.log(e.target.value);
// // //     if (movvvv !== "") {
// // //       console.log(e.target.value * pPQuantityx);
// // //       console.log(amountNotChange2);
// // //       console.log(amountNotChange);
// // //       console.log(movvvv);
// // //       // callback(movvvv);
// // //       // useEffect(() => {
// // //       // let isMounted = true;
// // //       // if (isMounted) {
// // //       handleOnlastChange(movvvv);
// // //       // }
// // //       // return () => {
// // //       //   isMounted = false;
// // //       // };
// // //       // }, []);
// // //     }
// // //   };
// // //   // const handleOnChange4 = () => {
// // //   //   // const abc = {};
// // //   //   // abc[e.target.className] = e.target.value;
// // //   //   // setQuantity(e.target.value);
// // //   //   // setAmount(quantityx * pPQuantityx);
// // //   //   console.log(quantityx * pPQuantityx);
// // //   // };

// // //   console.log(handleOnNameKeys);

// // //   const Item = styled(Paper)(({ theme }) => ({
// // //     backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
// // //     ...theme.typography.body2,
// // //     padding: theme.spacing(1),
// // //     textAlign: "center",
// // //     color: theme.palette.text.secondary,
// // //   }));

// // //   const handleIndividual = (e) => {
// // //     if (namex.length > 1) {
// // //       setOpened(true);
// // //       e.preventDefault();
// // //       // handleClose();

// // //       const data11 = JSON.parse(localStorage.getItem("user1"));
// // //       const orgIDs = data11.orgID;
// // //       const personalIDs = data11.personalID;
// // //       // const dutyx = Number(duty);
// // //       const raw = JSON.stringify([
// // //         {
// // //           orgID: orgIDs,
// // //           fname: namex,
// // //           lname: lnamex,
// // //           title: titlex,
// // //           // clientLevelID: clientLevel,
// // //           createdBy: personalIDs,
// // //           accountOwnerID: personalIDs,
// // //         },
// // //       ]);
// // //       const requestOptions = {
// // //         method: "POST",
// // //         headers: myHeaders,
// // //         body: raw,
// // //         redirect: "follow",
// // //       };
// // //       fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/add`, requestOptions)
// // //         .then(async (res) => {
// // //           const aToken = res.headers.get("token-1");
// // //           localStorage.setItem("rexxdex", aToken);
// // //           return res.json();
// // //         })
// // //         .then((result) => {
// // //           if (result.message === "Expired Access") {
// // //             navigate("/authentication/sign-in");
// // //             window.location.reload();
// // //           }
// // //           if (result.message === "Token Does Not Exist") {
// // //             navigate("/authentication/sign-in");
// // //             window.location.reload();
// // //           }
// // //           if (result.message === "Unauthorized Access") {
// // //             navigate("/authentication/forbiddenPage");
// // //             window.location.reload();
// // //           }
// // //           setOpened(false);
// // //           handleClose();
// // //           MySwal.fire({
// // //             title: result.status,
// // //             type: "success",
// // //             text: result.message,
// // //           }).then(() => {
// // //             window.location.reload();
// // //           });
// // //         })
// // //         .catch((error) => {
// // //           setOpened(false);
// // //           MySwal.fire({
// // //             title: error.status,
// // //             type: "error",
// // //             text: error.message,
// // //           });
// // //         });
// // //     } else {
// // //       alert("Please fill the required input(s)");
// // //     }
// // //   };

// // //   // const handleChange = (event: SelectChangeEvent) => {
// // //   //   setAge(event.target.value as string);
// // //   // };
// // //   // style={{ tr {
// // //   //     background-color: #dddddd;
// // //   //   }}}

// // //   const handleFormChange = (event, index) => {
// // //     console.log(event, index);
// // //   };

// // //   function load(e) {
// // //     handleOnlastChange(e);
// // //     // id = 1;
// // //     console.log(e);
// // //   }
// // //   console.log(load);
// // //   console.log(salesTypex);
// // //   console.log(quantityx);
// // //   console.log(pPQuantityx);
// // //   // // eslint-disable-next-line no-lone-blocks
// // //   // {
// // //   //   Object.keys(amountx).map((c) => (
// // //   //     <p>{salesTypex[c]}</p>
// // //   //     console.log(c);
// // //   //     // setdiots(c),
// // //   //   ));
// // //   // }

// // //   // handleAddRow = () => {
// // //   //   const item = {
// // //   //     saleType: "",
// // //   //     branchID: "",
// // //   //     pricePerUnit: "",
// // //   //     quantity: "",
// // //   //     amount: "",
// // //   //     taxAmount: "",
// // //   //     totalAmount: "",
// // //   //   };
// // //   //   console.log(item);
// // //   //   // this.setState = {
// // //   //   //   // eslint-disable-next-line react/destructuring-assignment, react/no-this-in-sfc
// // //   //   //   rows: this.state.rows.slice(0, -1),
// // //   //   // };
// // //   // };
// // //   // console.log(handleAddRow);
// // //   // handleRemoveRow = () => {
// // //   //   // eslint-disable-next-line react/destructuring-assignment
// // //   //   this.state.rows.slice(0, -1);
// // //   // };

// // //   return (
// // //     <DashboardLayout>
// // //       <DashboardNavbar />
// // //       {/* <Card>
// // //         <MDBox pt={4} pb={3} px={30}>
// // //           <MDBox
// // //             variant="gradient"
// // //             // bgColor="info"
// // //             borderRadius="lg"
// // //             coloredShadow="info"
// // //             mx={2}
// // //             mt={-3}
// // //             p={2}
// // //             mb={1}
// // //             textAlign="center"
// // //             style={Styles.boxSx}
// // //           >
// // //             <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
// // //               Sales
// // //             </MDTypography>
// // //           </MDBox>
// // //           <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
// // //             <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
// // //               {" "}
// // //             </MDTypography>
// // //           </MDBox>
// // //           <MDBox component="form" role="form">
// // //             <MDBox mb={2}>
// // //               <Container>
// // //                 <div className="row">
// // //                   <div className="col-sm-6">
// // //                     {/* <MDInput
// // //                       type="text"
// // //                       label="Quantity *"
// // //                       value={quantityx || ""}
// // //                       onKeyUp={handleOnNameKeys}
// // //                       className="form-control"
// // //                       onChange={(e) => setQuantity(e.target.value)}
// // //                       variant="standard"
// // //                       fullWidth
// // //                     />
// // //                     <TextField
// // //                       label="Amount *"
// // //                       type="number"
// // //                       value={amountx}
// // //                       onKeyUp={handleOnNameKeys}
// // //                       onChange={(e) => setAmount(e.target.value)}
// // //                     />
// // //                   </div>
// // //                   <div className="col-sm-6">
// // //                     {/* <MDInput
// // //                       type="text"
// // //                       value={ppQuantity || ""}
// // //                       onChange={(e) => setPPQuantity(e.target.value)}
// // //                       label="Price Per Quantity"
// // //                       variant="standard"
// // //                       fullWidth
// // //                     />
// // //                     <TextField
// // //                       label="Price Per Quantity "
// // //                       type="number"
// // //                       value={ppQuantity}
// // //                       onChange={(e) => setPPQuantity(e.target.value)}
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               </Container>
// // //             </MDBox>
// // //             <MDBox mb={2}>
// // //               <Container>
// // //                 <div className="row">
// // //                   <div className="col-sm-6">
// // //                     {/* <MDInput
// // //                       type="text"
// // //                       label="Quantity *"
// // //                       value={amountx || ""}
// // //                       onKeyUp={handleOnNameKeys}
// // //                       className="form-control"
// // //                       onChange={(e) => setAmount(e.target.value)}
// // //                       variant="standard"
// // //                       fullWidth
// // //                     />
// // //                     <TextField
// // //                       label="Quantity *"
// // //                       type="number"
// // //                       value={quantityx}
// // //                       onChange={(e) => setQuantity(e.target.value)}
// // //                     />
// // //                   </div>
// // //                   <div className="col-sm-6">
// // //                     {/* <MDInput
// // //                       type="text"
// // //                       value={ppQuantity || ""}
// // //                       onChange={(e) => setPPQuantity(e.target.value)}
// // //                       label="Price Per Quantity"
// // //                       variant="standard"
// // //                       fullWidth
// // //                     />
// // //                     <TextField
// // //                       label="Price Per Quantity "
// // //                       type="number"
// // //                       value={taskAmountx}
// // //                       onChange={(e) => setAmount(e.target.value)}
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               </Container>
// // //             </MDBox>
// // //             <MDBox>
// // //               <Container>
// // //                 <div className="row">
// // //                   <div className="col-sm-6">
// // //                     <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
// // //                       Branch
// // //                     </MDTypography>
// // //                     <MDBox textAlign="right">
// // //                       <Form.Select
// // //                         value={branx || ""}
// // //                         aria-label="Default select example"
// // //                         onChange={setBranx}
// // //                       >
// // //                         <option>--Select Branch--</option>
// // //                         {branId.map((apis) => (
// // //                           <option key={apis.id} value={apis.id}>
// // //                             {apis.name}
// // //                           </option>
// // //                         ))}
// // //                       </Form.Select>
// // //                     </MDBox>
// // //                   </div>
// // //                   <div className="col-sm-6">
// // //                     <TextField
// // //                       label="Task Amount "
// // //                       type="number"
// // //                       value={taskAmountx}
// // //                       onChange={(e) => setTaskAmount(e.target.value)}
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               </Container>
// // //             </MDBox>
// // //             <MDBox mt={4} mb={1}>
// // //               <MDButton
// // //                 variant="gradient"
// // //                 onClick={handleClick}
// // //                 color="info"
// // //                 width="50%"
// // //                 align="left"
// // //               >
// // //                 Save
// // //               </MDButton>
// // //             </MDBox>
// // //           </MDBox>
// // //         </MDBox>
// // //       </Card> */}
// // //       <Card>
// // //         {/* <MDBox style={{ paddingLeft: "200px" }}>
// // //           <MDButton variant="gradient" onClick={() => openModal()}>
// // //             Add New Individual
// // //           </MDButton>
// // //         </MDBox> */}
// // //         <MDBox style={{ paddingLeft: "450px" }}>
// // //           <Container>
// // //             <div className="row" style={{ paddingLeft: "700px" }}>
// // //               <div className="col-sm-12">
// // //                 <MDTypography
// // //                   variant="button"
// // //                   //   style={{ paddingLeft: "300px" }}
// // //                   fontWeight="regular"
// // //                   color="text"
// // //                   mt={8}
// // //                 >
// // //                   Individual
// // //                 </MDTypography>
// // //                 {/* <IconButton onClick={() => openModal()}>
// // //                   <PersonAddIcon />
// // //                 </IconButton> */}
// // //                 <MDBox>
// // //                   <IconButton
// // //                     size="large"
// // //                     aria-label="account of current user"
// // //                     aria-controls="primary-search-account-menu"
// // //                     aria-haspopup="true"
// // //                     color="inherit"
// // //                     onClick={() => openModal()}
// // //                   >
// // //                     <PersonAddIcon sx={{ color: "#f96d02" }} />
// // //                   </IconButton>
// // //                 </MDBox>
// // //                 <MDBox>
// // //                   <Form.Select
// // //                     value={indix || ""}
// // //                     aria-label="Default select example"
// // //                     onChange={setIndi}
// // //                   >
// // //                     <option>--Select Individual--</option>
// // //                     {individualx.map((apis) => (
// // //                       <option key={apis.id} value={apis.id}>
// // //                         {apis.fname} {apis.lname}
// // //                       </option>
// // //                     ))}
// // //                   </Form.Select>
// // //                 </MDBox>
// // //               </div>
// // //             </div>
// // //           </Container>
// // //           {/* <MDBox mt={1} style={{ paddingLeft: "700px" }}>
// // //             <MDTypography variant="button" color="text">
// // //               Individual not in organization yet ?
// // //               {/* <MDTypography
// // //                 component={Link}
// // //                 // to="/authentication/sign-up"
// // //                 onClick={}
// // //                 variant="button"
// // //                 color="info"
// // //                 fontWeight="medium"
// // //                 // textGradient
// // //                 style={Styles.textSx}
// // //               >
// // //                 Add New Individual
// // //               </MDTypography>
// // //               <MDButton variant="gradient" onClick={() => openModal()}>
// // //                 Add New Individual
// // //               </MDButton>
// // //             </MDTypography>
// // //           </MDBox> */}
// // //         </MDBox>
// // //         {/* <MDBox>
// // //           {/* startAction= */}
// // //         {/* <IconButton
// // //             onClick={handleNewInput}
// // //             aria-label="Add"
// // //             size="sm"
// // //             variant="plain"
// // //             color="neutral"
// // //           > */}
// // //         {/* <Add /> */}
// // //         {/* </IconButton>
// // //         </MDBox> */}
// // //         <br />
// // //         &nbsp; &nbsp;
// // //         <MDBox>
// // //           <IconButton
// // //             size="large"
// // //             aria-label="account of current user"
// // //             aria-controls="primary-search-account-menu"
// // //             aria-haspopup="true"
// // //             color="inherit"
// // //             onClick={() => handleNewInput()}
// // //           >
// // //             <Add sx={{ color: "#f96d02" }} />
// // //           </IconButton>
// // //           <IconButton
// // //             size="large"
// // //             aria-label="account of current user"
// // //             aria-controls="primary-search-account-menu"
// // //             aria-haspopup="true"
// // //             color="inherit"
// // //             onClick={() => handleRemoveInput()}
// // //           >
// // //             <CancelPresentationIcon sx={{ color: "#f96d02" }} />
// // //           </IconButton>
// // //         </MDBox>
// // //         <Card style={{ backgroundColor: "#CCC1FF" }}>
// // //           <Grid container spacing={2}>
// // //             <Grid item xs={2}>
// // //               <Item>
// // //                 <b>saleType</b>
// // //               </Item>
// // //               {/* branchID: "branx",
// // //             pricePerUnit: "ppQuantity",
// // //             quantity: "quantityx",
// // //             amount: "amountx",
// // //             taxAmount: "taskAmountx",
// // //             totalAmount: "totalAmountx", */}
// // //             </Grid>
// // //             <Grid item xs={2}>
// // //               <Item>
// // //                 <b>Branch</b>
// // //               </Item>
// // //             </Grid>
// // //             <Grid item xs={2}>
// // //               <Item>
// // //                 <b>Price Per Unit (NGN)</b>
// // //               </Item>
// // //             </Grid>
// // //             <Grid item xs={1}>
// // //               <Item>
// // //                 <h6>
// // //                   <b>Quantity</b>
// // //                 </h6>
// // //               </Item>
// // //             </Grid>
// // //             <Grid item xs={2}>
// // //               <Item>
// // //                 <b>Amount (NGN)</b>
// // //               </Item>
// // //             </Grid>
// // //             <Grid item xs={1}>
// // //               <Item>
// // //                 <b>Tax Amount</b>
// // //               </Item>
// // //             </Grid>
// // //             <Grid item xs={2}>
// // //               <Item>
// // //                 <b>Bonus Amount (NGN)</b>
// // //               </Item>
// // //             </Grid>
// // //           </Grid>
// // //         </Card>
// // //         {/* <br /> */}
// // //         &nbsp;
// // //         <Grid>
// // //           {/* <Container> */}
// // //           {Object.keys(amountx).map((c) => (
// // //             <p>{salesTypex[c]}</p>
// // //             // setdiots(c),
// // //           ))}
// // //           {counter.map((form, index) => (
// // //             <div className="row" key={index()}>
// // //               {/* <div>{setppp(id)}</div> */}
// // //               <div className="col-sm-2">
// // //                 {/* <MDInput
// // //                   type="text"
// // //                   value={namex || ""}
// // //                   onChange={(e) => setName(e.target.value)}
// // //                   // onKeyUp={handleOnNameKeys}
// // //                   label="First Name"
// // //                   variant="standard"
// // //                   fullWidth
// // //                 /> */}
// // //                 {/* <TextField
// // //                   id="outlined-error-helper-text"
// // //                   label="Error"
// // //                   // defaultValue="Hello World"
// // //                   // helperText="Incorrect entry."
// // //                 /> */}

// // //                 <Box sx={{ minWidth: 120 }}>
// // //                   <FormControl fullWidth>
// // //                     <InputLabel id="demo-select-small">Sales Type</InputLabel>
// // //                     <Select
// // //                       labelId="demo-select-small"
// // //                       id="demo-select-small"
// // //                       value={form.salesType}
// // //                       // key={c}
// // //                       label="Age"
// // //                       sx={{ minHeight: 40 }}
// // //                       // fullWidth
// // //                       onChange={handleFormChange}
// // //                       // onChange={(e) => handleOnChange(e.target.value)}
// // //                     >
// // //                       <MenuItem value="1">Product</MenuItem>
// // //                       <MenuItem value="2">Company Sales</MenuItem>
// // //                       <MenuItem value="3">Custom Service</MenuItem>
// // //                       {/* <MenuItem value="4">Thirty</MenuItem> */}
// // //                     </Select>
// // //                   </FormControl>
// // //                 </Box>

// // //                 {/* <input onChange={(e) => setName(e.target.value)} value={namex || ""} type="text" /> */}
// // //               </div>
// // //               <div className="col-sm-2">
// // //                 <Box sx={{ minWidth: 120 }}>
// // //                   <FormControl fullWidth>
// // //                     <TextField
// // //                       id="outlined-error-helper-text"
// // //                       label="First Name"
// // //                       size="small"
// // //                       // defaultValue="Hello World"
// // //                       // helperText="Incorrect entry."
// // //                     />
// // //                   </FormControl>
// // //                 </Box>
// // //               </div>
// // //               <div className="col-sm-2">
// // //                 {/* <TextField
// // //                   id="outlined-error-helper-text"
// // //                   label="First Name"
// // //                   // defaultValue="Hello World"
// // //                   // helperText="Incorrect entry."
// // //                 /> */}
// // //                 <Box sx={{ minWidth: 120 }}>
// // //                   <FormControl fullWidth>
// // //                     <TextField
// // //                       id="filled-number"
// // //                       value={form.pPQuantity}
// // //                       label="Pice Per Quantity "
// // //                       placeholder="Pice Per Quantity "
// // //                       size="small"
// // //                       // key={c}
// // //                       // className={index}
// // //                       type="number"
// // //                       onChange={(e) => handleOnChange2(e.target.value)}
// // //                       // onChange={(e) => setPPQuantity(e.target.value)}
// // //                       // onKeyUp={(e) => handleTaxAmount(e.target.value)}

// // //                       required
// // //                     />
// // //                   </FormControl>
// // //                 </Box>

// // //                 {/* <TextField
// // //                     label="Tax Amount *"
// // //                     type="number"
// // //                     value={taxAmountx}
// // //                     onKeyUp={(e) => handleOnTaxAmountKeys(e.target.value)}
// // //                     onChange={(e) => setTaxAmount(e.target.value)}
// // //                   /> */}
// // //               </div>
// // //               <div className="col-sm-1">
// // //                 <Box sx={{ minWidth: 100 }}>
// // //                   <FormControl fullWidth>
// // //                     <TextField
// // //                       id="filled-number"
// // //                       value={form.quantity}
// // //                       label="Quantity "
// // //                       placeholder="Quantity "
// // //                       // key={c}
// // //                       // className={index}
// // //                       type="number"
// // //                       size="small"
// // //                       onChange={handleOnChange3}
// // //                       // onChange={(e) => setQuantity(e.target.value)}
// // //                       // onKeyUp={(e) => handleTaxAmount(e.target.value)}

// // //                       required
// // //                     />
// // //                   </FormControl>
// // //                 </Box>
// // //               </div>
// // //               <div className="col-sm-2">
// // //                 <Box sx={{ minWidth: 120 }}>
// // //                   <FormControl fullWidth>
// // //                     <TextField
// // //                       id="filled-number"
// // //                       value={form.amount}
// // //                       label="Amount "
// // //                       placeholder="Amount "
// // //                       // key={c}
// // //                       // className={index}
// // //                       size="small"
// // //                       type="number"
// // //                       onChange={(e) => setAmount(e)}
// // //                       // onChange={(e) => handleOnlastChange(e)}
// // //                       // onKeyUp={(e) => setAmount(e.target.value)}

// // //                       InputProps={{
// // //                         readOnly: true,
// // //                       }}
// // //                       // disabled
// // //                     />
// // //                   </FormControl>
// // //                 </Box>
// // //               </div>
// // //               <div className="col-sm-1">
// // //                 <Box sx={{ minWidth: 100 }}>
// // //                   <FormControl fullWidth>
// // //                     <TextField
// // //                       id="filled-number"
// // //                       value={form.taxAmountx}
// // //                       label="Tax Amount (NGN) "
// // //                       placeholder="Tax Amount "
// // //                       type="number"
// // //                       size="small"
// // //                       onChange={(e) => setTaxAmount(e.target.value)}
// // //                       // onKeyUp={(e) => handleTaxAmount(e.target.value)}

// // //                       required
// // //                     />
// // //                   </FormControl>
// // //                 </Box>
// // //               </div>
// // //               <div className="col-sm-2">
// // //                 <Box sx={{ minWidth: 120 }}>
// // //                   <FormControl fullWidth>
// // //                     <TextField
// // //                       id="filled-number"
// // //                       value={form.bonusAmount || ""}
// // //                       label="Bonus Amount "
// // //                       placeholder="Bonus Amount "
// // //                       type="number"
// // //                       size="small"
// // //                       onChange={(e) => setTaxAmount(e.target.value)}
// // //                       // onKeyUp={(e) => handleTaxAmount(e.target.value)}

// // //                       required
// // //                     />
// // //                   </FormControl>
// // //                 </Box>
// // //               </div>
// // //             </div>
// // //           ))}
// // //           &nbsp; &nbsp;
// // //           {/* </Container> */}
// // //         </Grid>
// // //         <br />
// // //         <div>
// // //           <Card>
// // //             <table>
// // //               <tr>
// // //                 <th>Sales Type</th>
// // //                 <th>Branch</th>
// // //                 <th>Price Per Unit (NGN)</th>
// // //                 <th>Quantity</th>
// // //                 <th>Amount (NGN)</th>
// // //                 <th>Tax Amount</th>
// // //                 <th>Bonus Amount (NGN)</th>
// // //               </tr>
// // //               {Array.from(Array(counter)).map(() => (
// // //                 <tr style={{ backgroundColor: "#dddddd" }}>
// // //                   {/* <td>{idx}</td> */}
// // //                   <td>
// // //                     <Box sx={{ minWidth: 120 }}>
// // //                       <FormControl fullWidth>
// // //                         <InputLabel id="demo-select-small">Sales Type</InputLabel>
// // //                         <Select
// // //                           labelId="demo-select-small"
// // //                           id="demo-select-small"
// // //                           // value={salesTypex || ""}
// // //                           // key={c}
// // //                           label="Age"
// // //                           sx={{ minHeight: 40 }}
// // //                           // fullWidth
// // //                           onChange={handleOnChange}
// // //                           // onChange={(e) => handleOnChange(e.target.value)}
// // //                         >
// // //                           <MenuItem value="1">Product</MenuItem>
// // //                           <MenuItem value="2">Company Sales</MenuItem>
// // //                           <MenuItem value="3">Custom Service</MenuItem>
// // //                           {/* <MenuItem value="4">Thirty</MenuItem> */}
// // //                         </Select>
// // //                       </FormControl>
// // //                     </Box>
// // //                   </td>
// // //                   <td>
// // //                     <Box sx={{ minWidth: 120 }}>
// // //                       <FormControl fullWidth>
// // //                         <TextField
// // //                           id="outlined-error-helper-text"
// // //                           label="First Name"
// // //                           size="small"
// // //                           // defaultValue="Hello World"
// // //                           // helperText="Incorrect entry."
// // //                         />
// // //                       </FormControl>
// // //                     </Box>
// // //                   </td>

// // //                   <td>
// // //                     <Box sx={{ minWidth: 120 }}>
// // //                       <FormControl fullWidth>
// // //                         <TextField
// // //                           id="filled-number"
// // //                           // value={pPQuantityx || ""}
// // //                           label="Pice Per Quantity "
// // //                           placeholder="Pice Per Quantity "
// // //                           size="small"
// // //                           // key={c}
// // //                           // className={index}
// // //                           type="number"
// // //                           onChange={(e) => handleOnChange2(e.target.value)}
// // //                           // onChange={(e) => setPPQuantity(e.target.value)}
// // //                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}

// // //                           required
// // //                         />
// // //                       </FormControl>
// // //                     </Box>
// // //                   </td>
// // //                   <td>
// // //                     <Box sx={{ minWidth: 100 }}>
// // //                       <FormControl fullWidth>
// // //                         <TextField
// // //                           id="filled-number"
// // //                           // value={quantityx || ""}
// // //                           label="Quantity "
// // //                           placeholder="Quantity "
// // //                           // key={c}
// // //                           // className={index}
// // //                           type="number"
// // //                           size="small"
// // //                           onChange={handleOnChange3}
// // //                           // onChange={(e) => setQuantity(e.target.value)}
// // //                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}

// // //                           required
// // //                         />
// // //                       </FormControl>
// // //                     </Box>
// // //                   </td>
// // //                   <td>
// // //                     <Box sx={{ minWidth: 120 }}>
// // //                       <FormControl fullWidth>
// // //                         <TextField
// // //                           id="filled-number"
// // //                           // value={amountx || ""}
// // //                           label="Amount "
// // //                           placeholder="Amount "
// // //                           // key={c}
// // //                           // className={index}
// // //                           size="small"
// // //                           type="number"
// // //                           // onChange={(e) => handleOnChange4(e.target.value)}
// // //                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}

// // //                           InputProps={{
// // //                             readOnly: true,
// // //                           }}
// // //                           // disabled
// // //                         />
// // //                       </FormControl>
// // //                     </Box>
// // //                   </td>
// // //                   <td>
// // //                     <Box sx={{ minWidth: 100 }}>
// // //                       <FormControl fullWidth>
// // //                         <TextField
// // //                           id="filled-number"
// // //                           value={taxAmountx || ""}
// // //                           label="Tax Amount (NGN) "
// // //                           placeholder="Tax Amount "
// // //                           type="number"
// // //                           size="small"
// // //                           onChange={(e) => setTaxAmount(e.target.value)}
// // //                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}

// // //                           required
// // //                         />
// // //                       </FormControl>
// // //                     </Box>
// // //                   </td>
// // //                   <td>
// // //                     <Box sx={{ minWidth: 120 }}>
// // //                       <FormControl fullWidth>
// // //                         <TextField
// // //                           id="filled-number"
// // //                           value={taxAmountx || ""}
// // //                           label="Bonus Amount "
// // //                           placeholder="Bonus Amount "
// // //                           type="number"
// // //                           size="small"
// // //                           onChange={(e) => setTaxAmount(e.target.value)}
// // //                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}

// // //                           required
// // //                         />
// // //                       </FormControl>
// // //                     </Box>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </table>
// // //           </Card>
// // //         </div>
// // //         <div>
// // //           {/* <table>
// // //             <thead>
// // //               <tr>
// // //                 <th>Item</th>
// // //                 <th>Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               <tr>
// // //                 <input />
// // //               </tr>
// // //               <tr>
// // //                 <input />
// // //               </tr>
// // //             </tbody>
// // //           </table> */}
// // //           {/* <table>
// // //             <tr>
// // //               <th>Company</th>
// // //               <th>Contact</th>
// // //               <th>Country</th>
// // //             </tr>
// // //             <tr>
// // //               <td>
// // //                 <input />
// // //               </td>
// // //               <td>
// // //                 <input />
// // //               </td>

// // //               <td>
// // //                 <input />
// // //               </td>
// // //             </tr>
// // //             <input />
// // //             <tr>
// // //               <td>
// // //                 <input />
// // //               </td>
// // //               <td>
// // //                 <input />
// // //               </td>
// // //               <td>
// // //                 <input />
// // //               </td>
// // //             </tr>
// // //             <tr>
// // //               <td>
// // //                 <input />
// // //               </td>
// // //               <td>
// // //                 <input />
// // //               </td>
// // //               <td>
// // //                 <input />
// // //               </td>
// // //             </tr>
// // //             <tr>
// // //               <td>
// // //                 <input />
// // //               </td>
// // //               <td>
// // //                 <input />
// // //               </td>
// // //               <td>
// // //                 <input />
// // //               </td>
// // //             </tr>
// // //             <tr>
// // //               <td>
// // //                 <input />
// // //               </td>
// // //               <td>
// // //                 <input />
// // //               </td>
// // //               <td>
// // //                 <input />
// // //               </td>
// // //             </tr>
// // //             <tr>
// // //               <td>
// // //                 <input />
// // //               </td>
// // //               <td>
// // //                 <input />
// // //               </td>
// // //               <td>Italy</td>
// // //             </tr>
// // //           </table> */}
// // //         </div>
// // //         &nbsp; &nbsp;
// // //         <MDBox style={{ paddingLeft: "30px" }}>
// // //           <Container>
// // //             <div className="row">
// // //               <div className="col-sm-12">
// // //                 <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
// // //                   <Form.Label style={{ fontSize: 14 }}>Portfolio</Form.Label>
// // //                   <Form.Control
// // //                     as="textarea"
// // //                     value={commentx || ""}
// // //                     // onKeyUp={handleOnPortfolioKeys}
// // //                     onChange={(e) => setComment(e.target.value)}
// // //                     rows={2}
// // //                   />
// // //                 </Form.Group>

// // //                 <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// // //               </div>
// // //             </div>
// // //           </Container>
// // //         </MDBox>
// // //         <MDBox mt={4} mb={1}>
// // //           <MDButton
// // //             variant="gradient"
// // //             onClick={handleClick}
// // //             style={Styles.buttonSx}
// // //             width="50%"
// // //             align="left"
// // //           >
// // //             Save
// // //           </MDButton>
// // //         </MDBox>
// // //         {/* <Grid>
// // //           <Grid>
// // //             <li className="list-group-item" item xs={8}>
// // //               machala
// // //             </li>
// // //             <li className="list-group-item" item xs={4}>
// // //               machala2
// // //             </li>
// // //           </Grid>
// // //         </Grid> */}
// // //       </Card>
// // //       <div>
// // //         <Modal
// // //           open={open}
// // //           onClose={handleClose}
// // //           aria-labelledby="modal-modal-title"
// // //           aria-describedby="modal-modal-description"
// // //         >
// // //           <Box sx={modalStyle}>
// // //             <Grid>
// // //               <Grid
// // //                 item
// // //                 xs={6}
// // //                 md={6}
// // //                 // style={{ backgroundColor: "ButtonFace", minHeight: "550px" }}
// // //               >
// // //                 {" "}
// // //                 <HighlightOffIcon
// // //                   onClick={handleClose}
// // //                   fontSize="large"
// // //                   style={{
// // //                     padding: "5px",
// // //                     color: "red",
// // //                     float: "right",
// // //                     cursor: "pointer",
// // //                   }}
// // //                 />
// // //                 {/* <SubTaskComment subTaskId={taskId} /> */}
// // //                 <MDBox>
// // //                   <MDBox component="form" role="form">
// // //                     {/* <SidenavCollapse */}
// // //                     <MDBox mb={0}>
// // //                       <Container>
// // //                         <div className="row">
// // //                           <div className="col-sm-6">
// // //                             <MDInput
// // //                               type="text"
// // //                               value={namex || ""}
// // //                               onChange={(e) => setName(e.target.value)}
// // //                               // onKeyUp={handleOnNameKeys}
// // //                               label="First Name"
// // //                               variant="standard"
// // //                               fullWidth
// // //                             />
// // //                           </div>
// // //                           <div className="col-sm-6">
// // //                             <MDInput
// // //                               type="text"
// // //                               value={lnamex || ""}
// // //                               onChange={(e) => setLnamex(e.target.value)}
// // //                               // onKeyUp={handleOnNameKeys}
// // //                               label="Last Name"
// // //                               variant="standard"
// // //                               fullWidth
// // //                             />
// // //                           </div>
// // //                         </div>
// // //                         &nbsp; &nbsp;
// // //                         <div className="row">
// // //                           <div className="col-sm-10">
// // //                             <MDTypography
// // //                               variant="button"
// // //                               fontWeight="regular"
// // //                               fontSize="80%"
// // //                               textAlign="center"
// // //                               color="text"
// // //                             >
// // //                               Title
// // //                             </MDTypography>
// // //                             <Form.Select
// // //                               value={titlex}
// // //                               onChange={(e) => setTitle(e.target.value)}
// // //                               aria-label="Default select example"
// // //                             >
// // //                               <option value="">--Select Title--</option>
// // //                               <option value="Bishop">Bishop</option>
// // //                               <option value="Chancellor">Chancellor</option>
// // //                               <option value="Comrade">Comrade</option>
// // //                               <option value="Doctor">Doctor</option>
// // //                               <option value="Engineer">Engineer</option>
// // //                               <option value="Excellency">Excellency</option>
// // //                               <option value="Honorable">Honorable</option>
// // //                               <option value="Imam">Imam</option>
// // //                               <option value="Master">Master</option>
// // //                               <option value="Miss">Miss</option>
// // //                               <option value="Mr">Mr</option>
// // //                               <option value="Mrs">Mrs</option>
// // //                               <option value="Reverend">Reverend</option>
// // //                               <option value="Pastor">Pastor</option>
// // //                               <option value="Professor">Professor</option>
// // //                               <option value="Pope">Pope</option>
// // //                               <option value="Vice-Chancellor">Vice-Chancellor</option>
// // //                               <option value="Other">Others...</option>
// // //                             </Form.Select>
// // //                           </div>
// // //                         </div>
// // //                       </Container>
// // //                     </MDBox>
// // //                     {/* <MDBox>
// // //                       <Container>
// // //                         <div className="row">
// // //                           <div className="col-sm-10">
// // //                             <MDBox textAlign="center">
// // //                               <MDTypography
// // //                                 variant="button"
// // //                                 fontWeight="regular"
// // //                                 fontSize="80%"
// // //                                 textAlign="center"
// // //                                 color="text"
// // //                               >
// // //                                 Title
// // //                               </MDTypography>
// // //                               <Form.Select
// // //                                 value={titlex}
// // //                                 onChange={(e) => setTitle(e.target.value)}
// // //                                 aria-label="Default select example"
// // //                               >
// // //                                 <option value="">--Select Title--</option>
// // //                                 <option value="Bishop">Bishop</option>
// // //                                 <option value="Chancellor">Chancellor</option>
// // //                                 <option value="Comrade">Comrade</option>
// // //                                 <option value="Doctor">Doctor</option>
// // //                                 <option value="Engineer">Engineer</option>
// // //                                 <option value="Excellency">Excellency</option>
// // //                                 <option value="Honorable">Honorable</option>
// // //                                 <option value="Imam">Imam</option>
// // //                                 <option value="Master">Master</option>
// // //                                 <option value="Miss">Miss</option>
// // //                                 <option value="Mr">Mr</option>
// // //                                 <option value="Mrs">Mrs</option>
// // //                                 <option value="Reverend">Reverend</option>
// // //                                 <option value="Pastor">Pastor</option>
// // //                                 <option value="Professor">Professor</option>
// // //                                 <option value="Pope">Pope</option>
// // //                                 <option value="Vice-Chancellor">Vice-Chancellor</option>
// // //                                 <option value="Other">Others...</option>
// // //                               </Form.Select>
// // //                             </MDBox>
// // //                           </div>
// // //                         </div>
// // //                       </Container>
// // //                     </MDBox> */}
// // //                     <MDBox mt={4} mb={1}>
// // //                       <MDButton
// // //                         variant="gradient"
// // //                         onClick={handleIndividual}
// // //                         // color="info"
// // //                         style={Styles.buttonSx}
// // //                         width="50%"
// // //                         align="left"
// // //                       >
// // //                         Save
// // //                       </MDButton>
// // //                     </MDBox>
// // //                   </MDBox>
// // //                 </MDBox>
// // //               </Grid>
// // //               {/* <MDTypography>Trying to create a modal</MDTypography> */}
// // //             </Grid>
// // //           </Box>
// // //         </Modal>
// // //       </div>
// // //       {/* {craze ? (
// // //         <Card />
// // //       ) : (
// // //         <MDBox>
// // //           <MDBox component="form" role="form">
// // //           <SidenavCollapse
// // //             <MDBox mb={0}>
// // //               <Container>
// // //                 <div className="row">
// // //                   <div className="col-sm-6">
// // //                     <MDInput
// // //                       type="text"
// // //                       value={namex || ""}
// // //                       onChange={(e) => setName(e.target.value)}
// // //                       onKeyUp={handleOnNameKeys}
// // //                       label="First Name"
// // //                       variant="standard"
// // //                       fullWidth
// // //                     />
// // //                   </div>
// // //                   <div className="col-sm-6">
// // //                     <MDInput
// // //                       type="text"
// // //                       value={lnamex || ""}
// // //                       onChange={(e) => setLnamex(e.target.value)}
// // //                       onKeyUp={handleOnNameKeys}
// // //                       label="Last Name"
// // //                       variant="standard"
// // //                       fullWidth
// // //                     />
// // //                   </div>
// // //                   {/* <div className="col-sm-6">
// // //                     <MDInput
// // //                       type="text"
// // //                       value={onamex || ""}
// // //                       onChange={(e) => setOnamex(e.target.value)}
// // //                       onKeyUp={handleOnNameKeys}
// // //                       label="Other Name"
// // //                       variant="standard"
// // //                       fullWidth
// // //                     />
// // //                     <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// // //                   </div>
// // //                 </div>
// // //                 <br />
// // //                 {/* <div className="row">
// // //                   <div className="col-sm-10">
// // //                     <MDBox textAlign="center">
// // //                       <MDTypography
// // //                         variant="button"
// // //                         fontWeight="regular"
// // //                         fontSize="80%"
// // //                         textAlign="center"
// // //                         color="text"
// // //                       >
// // //                         Title
// // //                       </MDTypography>
// // //                       <Form.Select
// // //                         value={titlex}
// // //                         onChange={(e) => setTitlex(e.target.value)}
// // //                         aria-label="Default select example"
// // //                       >
// // //                         <option value="">--Select Title--</option>
// // //                         <option value="Bishop">Bishop</option>
// // //                         <option value="Chancellor">Chancellor</option>
// // //                         <option value="Comrade">Comrade</option>
// // //                         <option value="Doctor">Doctor</option>
// // //                         <option value="Engineer">Engineer</option>
// // //                         <option value="Excellency">Excellency</option>
// // //                         <option value="Honorable">Honorable</option>
// // //                         <option value="Imam">Imam</option>
// // //                         <option value="Master">Master</option>
// // //                         <option value="Miss">Miss</option>
// // //                         <option value="Mr">Mr</option>
// // //                         <option value="Mrs">Mrs</option>
// // //                         <option value="Reverend">Reverend</option>
// // //                         <option value="Pastor">Pastor</option>
// // //                         <option value="Professor">Professor</option>
// // //                         <option value="Pope">Pope</option>
// // //                         <option value="Vice-Chancellor">Vice-Chancellor</option>
// // //                         <option value="Other">Others...</option>
// // //                       </Form.Select>
// // //                     </MDBox>
// // //                   </div>
// // //                 </div> */}
// // //       <br />
// // //       {/* <div className="row">
// // //                   <div className="col-sm-6">
// // //                     <MDInput
// // //                       type="text"
// // //                       value={streetx || ""}
// // //                       onChange={(e) => setStreet(e.target.value)}
// // //                       label="Street"
// // //                       variant="standard"
// // //                       fullWidth
// // //                     />

// // //                     <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// // //                   </div>
// // //                   <div className="col-sm-6">
// // //                     <MDInput
// // //                       type="text"
// // //                       value={cityx || ""}
// // //                       onChange={(e) => setCity(e.target.value)}
// // //                       onKeyUp={handleOnCityKeys}
// // //                       label="City"
// // //                       variant="standard"
// // //                       fullWidth
// // //                     />

// // //                     <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// // //                   </div>
// // //                   <div className="row">
// // //                     <div className="col-sm-6">
// // //                       <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
// // //                         Country
// // //                       </MDTypography>
// // //                       <MDBox textAlign="right">
// // //                         <Form.Select
// // //                           value={residentialCountryx || ""}
// // //                           aria-label="Default select example"
// // //                           onChange={handleOnChangeRCCountry}
// // //                         >
// // //                           <option>--Select Country--</option>
// // //                           {AlCountry.map((apic) => (
// // //                             <option key={apic.code3} value={apic.name}>
// // //                               {apic.name}
// // //                             </option>
// // //                           ))}
// // //                         </Form.Select>
// // //                       </MDBox>

// // //                       <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// // //                     </div>
// // //                     <div className="col-sm-6">
// // //                       <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
// // //                         State
// // //                       </MDTypography>
// // //                       <MDBox textAlign="right">
// // //                         <Form.Select
// // //                           value={residentialStatex || ""}
// // //                           aria-label="Default select example"
// // //                           onChange={handleOnChangeRCState}
// // //                         >
// // //                           <option>--Select State--</option>
// // //                           {allStates.map((apis) => (
// // //                             <option key={apis.code} value={apis.name}>
// // //                               {apis.name}
// // //                             </option>
// // //                           ))}
// // //                         </Form.Select>
// // //                       </MDBox>

// // //                       <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </Container>
// // //             </MDBox>
// // //             <br />
// // //             <MDBox>
// // //               <Container>
// // //                 <div className="row">
// // //                   <div className="col-sm-6">
// // //                     <MDInput
// // //                       type="text"
// // //                       value={emailx || ""}
// // //                       onChange={(e) => setEmail(e.target.value)}
// // //                       onKeyUp={handleOnEmailKeys}
// // //                       label="Email"
// // //                       variant="standard"
// // //                       fullWidth
// // //                     />

// // //                     <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// // //                   </div>

// // //                   <div className="col-sm-6">
// // //                     <MDTypography variant="button" fontWeight="regular" color="text">
// // //                       Phone Number
// // //                     </MDTypography>
// // //                     <PhoneInput
// // //                       value={pnox}
// // //                       inputStyle={{ width: "100%" }}
// // //                       buttonStyle={{}}
// // //                       onChange={setPno}
// // //                     />

// // //                     <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// // //                   </div>
// // //                 </div>
// // //                 <br />
// // //                 {/* <MDBox textAlign="center">
// // //                   <MDTypography variant="h4" fontWeight="medium" fontSize="55%">
// // //                     Date Of Birth
// // //                   </MDTypography>
// // //                   <DatePicker
// // //                     date={startDate}
// // //                     wrapperClassName="date-picker"
// // //                     placeholder="Select Birth Date"
// // //                     dateFormat="MM/dd/yyyy"
// // //                     confirmBtnText="Confirm"
// // //                     showCancelButton="true"
// // //                     customStyles={{
// // //                       placeholderText: {
// // //                         fontSize: 5,
// // //                       },
// // //                       dateIcon: {
// // //                         height: 0,
// // //                         width: 0,
// // //                       },
// // //                       dateText: {
// // //                         color: "#b3b4b5",
// // //                         fontSize: 16,
// // //                       },
// // //                       dateInput: {
// // //                         borderWidth: 0,
// // //                       },
// // //                     }}
// // //                     selected={startDate}
// // //                     onChange={(date) => setStartDate(date)}
// // //                     peekNextMonth
// // //                     showMonthDropdown
// // //                     showYearDropdown
// // //                     dropdownMode="select"
// // //                   />
// // //                   <br />
// // //                   <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// // //                 </MDBox>
// // //               </Container>
// // //             </MDBox>
// // //             <br />
// // //             <MDBox textAlign="center" align="center">
// // //               <Container>
// // //                 <div className="row">
// // //                   <MDBox mt={4}>
// // //                     <MDBox textAlign="center">
// // //                       <MDTypography
// // //                         variant="button"
// // //                         fontWeight="regular"
// // //                         fontSize="80%"
// // //                         textAlign="center"
// // //                         color="text"
// // //                       >
// // //                         Marital Status
// // //                       </MDTypography>
// // //                       <Form.Select
// // //                         value={maritalx}
// // //                         onChange={(e) => setMaritalx(e.target.value)}
// // //                         aria-label="Default select example"
// // //                       >
// // //                         <option value="">Select Marital Status</option>
// // //                         <option value="Single">Single</option>
// // //                         <option value="Married">Married</option>
// // //                         <option value="Divorced">Divorced</option>
// // //                         <option value="Widowed">Widowed</option>
// // //                       </Form.Select>
// // //                     </MDBox>
// // //                   </MDBox>

// // //                   <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// // //                 </div>
// // //               </Container>
// // //               <Container>
// // //                 <div className="row">
// // //                   <MDBox mt={4}>
// // //                     <MDBox textAlign="center">
// // //                       <MDTypography
// // //                         variant="button"
// // //                         fontWeight="regular"
// // //                         fontSize="80%"
// // //                         textAlign="center"
// // //                         color="text"
// // //                       >
// // //                         Account Owner
// // //                       </MDTypography>
// // //                       <Form.Select
// // //                         value={duty}
// // //                         onChange={(e) => setDutyRelieverx(e.target.value)}
// // //                         aria-label="Default select example"
// // //                       >
// // //                         <option value="">Select Account Owner</option>
// // //                         {user.map((api) => (
// // //                           <option key={api.personal.id} value={api.personal.id}>
// // //                             {api.personal.fname} {api.personal.lname}
// // //                           </option>
// // //                         ))}
// // //                       </Form.Select>
// // //                     </MDBox>
// // //                   </MDBox>
// // //                 </div>
// // //               </Container>
// // //               <br />
// // //               {/* <Container>
// // //                 <div className="row">
// // //                   <MDTypography
// // //                     variant="button"
// // //                     fontWeight="regular"
// // //                     fontSize="80%"
// // //                     textAlign="center"
// // //                     color="text"
// // //                   >
// // //                     Corporate Name
// // //                   </MDTypography>
// // //                   <Select options={options} onChange={handleChanges} styles={customStyles} />
// // //                   <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// // //                 </div>
// // //               </Container>
// // //             </MDBox>
// // //             <MDBox mt={4} mb={1} textAlign="center">
// // //               <MDButton variant="gradient" onClick={handleClick} color="info" width="50%">
// // //                 Save
// // //               </MDButton>
// // //             </MDBox>
// // //           </MDBox>
// // //         </MDBox>
// // //       )} */}
// // //       <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
// // //         <CircularProgress color="info" />
// // //       </Backdrop>
// // //     </DashboardLayout>
// // //   );
// // // }
// // // export default Sales;
// // /* eslint-disable no-eval */
// // /* eslint-disable no-lone-blocks */
// // /* eslint-disable react/no-this-in-sfc */
// // import React, { useEffect, useState, useRef } from "react";
// // import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// // import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// // import MDBox from "components/MDBox";
// // import MDInput from "components/MDInput";
// // import MDButton from "components/MDButton";
// // import Card from "@mui/material/Card";
// // import { Container, Form } from "react-bootstrap";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import MDTypography from "components/MDTypography";
// // import PHeaders from "postHeader";
// // import GHeaders from "getHeader";
// // import Styles from "styles";
// // import TextField from "@mui/material/TextField";
// // import { useNavigate } from "react-router-dom";
// // import Swal from "sweetalert2";
// // import withReactContent from "sweetalert2-react-content";
// // import Backdrop from "@mui/material/Backdrop";
// // import CircularProgress from "@mui/material/CircularProgress";
// // import Box from "@mui/material/Box";
// // import Grid from "@mui/material/Grid";
// // import Modal from "@mui/material/Modal";
// // import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// // import { styled } from "@mui/material/styles";
// // import Paper from "@mui/material/Paper";
// // import PersonAddIcon from "@mui/icons-material/PersonAdd";
// // import { IconButton } from "@mui/material";
// // import FormControl from "@mui/material/FormControl";
// // import Add from "@mui/icons-material/Add";
// // import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
// // import { useReactToPrint } from "react-to-print";
// // import { MonnifyConsumer } from "react-monnify";
// // import PhoneInput from "react-phone-input-2";
// // // import houseOfTara from "./HouseOfTara.jpg";
// // // import "./Force.css";
// // // zinoleesky wrote this part of d code called sales
// // // incase another Printing {https://stackblitz.com/edit/react-print-receipt?file=index.js}

// // function Sales() {
// //   const MySwal = withReactContent(Swal);
// //   const { allPHeaders: myHeaders } = PHeaders();
// //   const { allGHeaders: miHeaders } = GHeaders();

// //   //   const [branId, setBranId] = useState([]);
// //   //   const [branx, setBranx] = useState("");
// //   //   const [quantityx, setQuantity] = useState("");
// //   //   const [ppQuantity, setPPQuantity] = useState("");
// //   //   const [amountx, setAmount] = useState(0);
// //   //   const [taskAmountx, setTaskAmount] = useState(0);

// //   const [individualx, setIndividual] = useState([]);
// //   const [indix, setIndi] = useState("");
// //   //   const [craze, setCraze] = useState(false);
// //   const [namex, setName] = useState("");
// //   const [lnamex, setLnamex] = useState("");
// //   const [titlex, setTitle] = useState("");

// //   const [checkedName, setCheckedName] = useState("");
// //   // const [enabled, setEnabled] = useState("");
// //   //   const [emailx, setEmail] = useState("");
// //   // const [pnox, setPno] = useState("");
// //   // const [maritalx, setMaritalx] = useState("");
// //   // const [duty, setDutyRelieverx] = useState("");
// //   const [user, setUser] = useState([]);
// //   const [commentx, setComment] = useState("");

// //   const [emailx, setEmail] = useState("");
// //   const currencyx = "NGN";
// //   const [pnox, setPno] = useState("");
// //   const [indiName, setIndiName] = useState("");
// //   const [referenceSKey, setReferenceSKey] = useState();
// //   const [listenn, setListenn] = useState(false);

// //   const navigate = useNavigate();
// //   const [opened, setOpened] = useState(false);
// //   const [open, setOpen] = useState(false);
// //   const handleClose = () => setOpen(false);
// //   const [salesTypex, setSalesType] = useState("");
// //   const [pPQuantityx, setPPQuantity] = useState("");
// //   const [quantityx, setQuantity] = useState("");
// //   const [amountx, setAmount] = useState("");
// //   // const [taxAmountx, setTaxAmount] = useState("");
// //   const [amountNotChange, setAmountNotChange] = useState("");
// //   const [amountNotChange2, setAmountNotChange2] = useState("");
// //   const [productx, setProduct] = useState([]);
// //   // const [prodx, setProd] = useState("");
// //   const [productBranx, setProductBran] = useState([]);
// //   const [prodBranx, setProdBran] = useState("");
// //   const [bonusAmountxx, setBonusAmount] = useState("");
// //   const [subTotalAmountx, setSubTotalAmount] = useState([]);
// //   const [allTax, setAllTax] = useState("");
// //   const [cashPaymentx, setCashPayment] = useState("");
// //   const [cardPaymentx, setCardPayment] = useState("");
// //   const [transferPaymentx, setTransferPayment] = useState("");
// //   const [showPayment, setShowPayment] = useState(false);
// //   const [showPrint, setShowPrint] = useState(false);
// //   const [cashierx, setCashier] = useState([]);
// //   const [productxx, setProductxx] = useState("");
// //   const [checkedEmail, setCheckedEmail] = useState("");
// //   const [checkedPortfolio, setCheckedPortfolio] = useState("");
// //   // const [checkedFirst, setCheckedFirst] = useState("");
// //   // const [checkedAExpense, handleOnEmailKeys] = useState("");
// //   const onBeforeGetContentResolve = useRef();
// //   // const [addictx, setAddict] = useState("");
// //   const [peeps, setPeeps] = useState([]);
// //   console.log(setPeeps);
// //   console.log(setSalesType);
// //   console.log(setPPQuantity);
// //   console.log(setQuantity);
// //   // console.log(setTaxAmount);
// //   console.log(setAmountNotChange);
// //   console.log(setProductBran);
// //   console.log(prodBranx);
// //   console.log(setProdBran);
// //   <style type="text/css" media="print">
// //     {"\
// //   @page{ size: portrait; } \
// //   "}
// //   </style>;

// //   const [counter, setCounter] = useState([
// //     {
// //       saleType: Number(""),
// //       salesID: "",
// //       branchID: "",
// //       pricePerUnit: Number(""),
// //       quantity: Number(""),
// //       amount: Number(""),
// //       taxAmount: Number(""),
// //       totalAmount: Number(""),
// //       // product: "",
// //       // branch: "",
// //       // bonusAmount: "",
// //       // id: `SALE${new Date().getTime * 8 + 2}`,
// //     },
// //     // {
// //     //   saleType: "",
// //     //   salesID: "",
// //     //   branchID: "",
// //     //   pricePerUnit: "",
// //     //   quantity: "",
// //     //   amount: "",
// //     //   taxAmount: "",
// //     //   totalAmount: "",
// //     //   id: `SALE${new Date().getTime * 8 + 2}`,
// //     // },
// //   ]);
// //   const [counter2, setCounter2] = useState([]);
// //   const [view, setView] = useState([]);
// //   // const [ppp, setppp] = useState(0);
// //   console.log(user);
// //   // console.log(enabled);
// //   console.log(Number(amountNotChange));
// //   console.log(amountNotChange2);
// //   console.log(setAmountNotChange2);
// //   console.log(view);
// //   console.log(counter);
// //   // console.log(ppp);
// //   // eslint-disable-next-line no-lone-blocks
// //   // {
// //   //   view.map(
// //   //     (apis) =>
// //   //       // <option key={apis.code} value={apis.name}>
// //   //       apis.amountx
// //   //     // console.log(apis.amountx);
// //   //     // </option>
// //   //   );
// //   // }
// //   console.log(view.map((apis) => apis.amountx));

// //   // const handleOnNameKeys = (value) => {
// //   //   const letters = /^[a-zA-Z ]+$/;
// //   //   const Game = value.toString();
// //   //   if (!Game.match(letters)) {
// //   //     setCheckedFirst(false);
// //   //     // eslint-disable-next-line no-unused-expressions
// //   //     document.getElementById("first").innerHTML =
// //   //       "First Name - input only capital and small letters<br>";
// //   //   }
// //   //   if (Game.match(letters)) {
// //   //     setCheckedFirst(true);
// //   //     // eslint-disable-next-line no-unused-expressions
// //   //     document.getElementById("first").innerHTML = "";
// //   //   }
// //   //   if (Game.length === 0) {
// //   //     setCheckedFirst(false);
// //   //     // eslint-disable-next-line no-unused-expressions
// //   //     document.getElementById("first").innerHTML = "First Name is required<br>";
// //   //   } else {
// //   //     setCheckedFirst(true);
// //   //     // eslint-disable-next-line no-unused-expressions
// //   //     document.getElementById("first").innerHTML = "";
// //   //   }
// //   // };

// //   //   useEffect(() => {
// //   //     const data11 = JSON.parse(localStorage.getItem("user1"));

// //   //     const orgIDs = data11.orgID;
// //   //     const headers = miHeaders;
// //   //     let isMounted = true;
// //   //     fetch(`${process.env.REACT_APP_KUBU_URL}/branch/gets/${orgIDs}`, { headers })
// //   //       .then(async (res) => {
// //   //         const aToken = res.headers.get("token-1");
// //   //         localStorage.setItem("rexxdex", aToken);
// //   //         return res.json();
// //   //       })
// //   //       .then((result) => {
// //   //         if (result.message === "Expired Access") {
// //   //           navigate("/authentication/sign-in");
// //   //           window.location.reload();
// //   //         }
// //   //         if (result.message === "Token Does Not Exist") {
// //   //           navigate("/authentication/sign-in");
// //   //           window.location.reload();
// //   //         }
// //   //         if (result.message === "Unauthorized Access") {
// //   //           navigate("/authentication/forbiddenPage");
// //   //           window.location.reload();
// //   //         }
// //   //         if (isMounted) {
// //   //           setBranId(result);
// //   //         }
// //   //       });
// //   //     return () => {
// //   //       isMounted = false;
// //   //     };
// //   //   }, []);

// //   useEffect(() => {
// //     const data11 = JSON.parse(localStorage.getItem("user1"));

// //     const orgIDs = data11.orgID;
// //     const headers = miHeaders;
// //     let isMounted = true;
// //     fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/gets/${orgIDs}`, { headers })
// //       .then(async (res) => {
// //         const aToken = res.headers.get("token-1");
// //         localStorage.setItem("rexxdex", aToken);
// //         return res.json();
// //       })
// //       .then((result) => {
// //         if (result.message === "Expired Access") {
// //           navigate("/authentication/sign-in");
// //           window.location.reload();
// //         }
// //         if (result.message === "Token Does Not Exist") {
// //           navigate("/authentication/sign-in");
// //           window.location.reload();
// //         }
// //         if (result.message === "Unauthorized Access") {
// //           navigate("/authentication/forbiddenPage");
// //           window.location.reload();
// //         }
// //         if (isMounted) {
// //           console.log(result);
// //           setIndividual(result);
// //         }
// //       });
// //     return () => {
// //       isMounted = false;
// //     };
// //   }, []);

// //   const handleOnlastChange = (e) => {
// //     //   // amountNotChange;
// //     const abc = e;
// //     console.log(abc);
// //     // abc[e.target.className] = e.target.value;
// //     // setAmount({ ...amountx, abc });
// //     setAmount(abc);
// //     console.log(e);
// //     console.log({ amountx, abc });
// //   };

// //   useEffect(() => {
// //     const headers = miHeaders;

// //     const data11 = JSON.parse(localStorage.getItem("user1"));

// //     const orgIDs = data11.orgID;
// //     let isMounted = true;
// //     // setOpened(true);
// //     fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
// //       .then(async (res) => {
// //         const aToken = res.headers.get("token-1");
// //         localStorage.setItem("rexxdex", aToken);
// //         return res.json();
// //       })
// //       .then((result) => {
// //         if (result.message === "Expired Access") {
// //           navigate("/authentication/sign-in");
// //           window.location.reload();
// //         }
// //         if (result.message === "Token Does Not Exist") {
// //           navigate("/authentication/sign-in");
// //           window.location.reload();
// //         }
// //         if (result.message === "Unauthorized Access") {
// //           navigate("/authentication/forbiddenPage");
// //           window.location.reload();
// //         }
// //         if (isMounted) {
// //           setUser(result);
// //           setOpened(false);
// //         }
// //         if (amountNotChange2 !== "") {
// //           handleOnlastChange(amountNotChange2);
// //           // setAmount(amountNotChange2);
// //           console.log(amountNotChange2);
// //         }
// //       });
// //     return () => {
// //       isMounted = false;
// //     };
// //   }, []);
// //   // useEffect(() => {
// //   //   const headers = miHeaders;

// //   //   const data11 = JSON.parse(localStorage.getItem("user1"));

// //   //   const orgIDs = data11.orgID;
// //   //   let isMounted = true;
// //   //   fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
// //   //     .then(async (res) => {
// //   //       const aToken = res.headers.get("token-1");
// //   //       localStorage.setItem("rexxdex", aToken);
// //   //       return res.json();
// //   //     })
// //   //     .then((result) => {
// //   //       if (result.message === "Expired Access") {
// //   //         navigate("/authentication/sign-in");
// //   //         window.location.reload();
// //   //       }
// //   //       if (result.message === "Token Does Not Exist") {
// //   //         navigate("/authentication/sign-in");
// //   //         window.location.reload();
// //   //       }
// //   //       if (result.message === "Unauthorized Access") {
// //   //         navigate("/authentication/forbiddenPage");
// //   //         window.location.reload();
// //   //       }
// //   //       console.log(result);
// //   //       if (isMounted) {
// //   //         const newMap = [];

// //   //         // eslint-disable-next-line array-callback-return
// //   //         result.map((item) => {
// //   //           const NewMapp = {
// //   //             value: item.personal.id,
// //   //             label: `${item.personal.fname}`,
// //   //           };
// //   //           newMap.push(NewMapp);
// //   //         });
// //   //         setUser(newMap);
// //   //       }
// //   //     });
// //   //   return () => {
// //   //     isMounted = false;
// //   //   };
// //   // }, []);

// //   const modalStyle = {
// //     position: "absolute",
// //     top: "50%",
// //     left: "50%",
// //     transform: "translate(-50%, -50%)",
// //     width: 400,
// //     bgcolor: "#ffffff",
// //     border: "3px solid #5F9DF7",
// //     borderRadius: 5,
// //     boxShadow: 24,
// //     p: 4,
// //     overflow: "auto",
// //     height: "55%",
// //     display: "flex",
// //     "&::-webkit-scrollbar": {
// //       width: 40,
// //     },
// //     "&::-webkit-scrollbar-track": {
// //       backgroundColor: "white",
// //     },
// //     "&::-webkit-scrollbar-thumb": {
// //       backgroundColor: "#f5f5f5",
// //       borderRadius: 10,
// //     },
// //   };

// //   useEffect(() => {
// //     const data11 = JSON.parse(localStorage.getItem("user1"));

// //     const orgIDs = data11.orgID;
// //     const headers = miHeaders;
// //     let isMounted = true;
// //     fetch(`${process.env.REACT_APP_KUBU_URL}/branch/gets/${orgIDs}`, { headers })
// //       .then(async (res) => {
// //         const aToken = res.headers.get("token-1");
// //         localStorage.setItem("rexxdex", aToken);
// //         return res.json();
// //       })
// //       .then((result) => {
// //         if (result.message === "Expired Access") {
// //           navigate("/authentication/sign-in");
// //           window.location.reload();
// //         }
// //         if (result.message === "Token Does Not Exist") {
// //           navigate("/authentication/sign-in");
// //           window.location.reload();
// //         }
// //         if (result.message === "Unauthorized Access") {
// //           navigate("/authentication/forbiddenPage");
// //           window.location.reload();
// //         }
// //         if (isMounted) {
// //           setProductBran(result);
// //         }
// //         console.log(result);
// //       });
// //     return () => {
// //       isMounted = false;
// //     };
// //   }, []);

// //   console.log(salesTypex);

// //   const handleNewInput = () => {
// //     // setCounter(counter + 1);
// //     setCounter2(counter);
// //     console.log(counter);
// //     const item = {
// //       saleType: "",
// //       salesID: "",
// //       branchID: "",
// //       pricePerUnit: "",
// //       quantity: "",
// //       amount: "",
// //       taxAmount: "",
// //       totalAmount: "",
// //       product: "",
// //       // branch: "",
// //       // bonusAmount: "",
// //       // id: `SALE${new Date().getTime * 8 + 2}`,
// //     };
// //     // {
// //     //   saleType: [salesTypex],
// //     //   branch: "",
// //     //   pricePerUnit: "",
// //     //   product: "",
// //     //   quantity: "",
// //     //   amount: [amountx],
// //     //   taxAmount: "",
// //     //   totalAmount: "",
// //     //   id: counter,
// //     // };

// //     console.log(item);
// //     console.log(counter2);
// //     console.log(item.amount.amountx);
// //     console.log(item.amount);
// //     setView(item.amount);
// //     // console.log(counter.current);
// //   };

// //   // if (counter === item.id) {

// //   // }

// //   const array = [];
// //   array.push(counter2);
// //   console.log(array);
// //   // const handleRemoveInput = () => {
// //   //   setCounter(counter.pop());
// //   //   console.log(counter);
// //   // };
// //   console.log(handleNewInput);
// //   console.log(pPQuantityx);
// //   console.log(quantityx);
// //   // const amountx = parseInt(pPQuantityx, 10) * parseInt(quantityx, 10);
// //   console.log(amountx);
// //   // setAmountNotChange2(amountxx);

// //   const TOTAL = eval(subTotalAmountx + allTax - bonusAmountxx);
// //   console.log(TOTAL);

// //   // const handleClick = (e) => {
// //   //   // handleOnTitleKeys();
// //   //   // handleOnQuantityKeys();
// //   //   // handleOnPPQuantityKeys();
// //   //   // handleOnBonusAmountKeys();
// //   //   // Amount * taxamount - bonus
// //   //   // if (enabled) {
// //   //   setOpened(true);
// //   //   e.preventDefault();
// //   //   const data11 = JSON.parse(localStorage.getItem("user1"));

// //   //   const orgIDs = data11.orgID;
// //   //   const idx = data11.personalID;
// //   //   const raw = JSON.stringify({
// //   //     orgID: orgIDs,
// //   //     individualID: indix,
// //   //     items: counter,
// //   //     bonusAmount: bonusAmountxx,
// //   //     subTotalAmount: subTotalAmountx,
// //   //     totalAmount: TOTAL,
// //   //     createdBy: idx,
// //   //     comment: commentx,
// //   //     receiptStatus: 1,
// //   //     cardPaymentAmount: cardPaymentx,
// //   //     transferPaymentAmount: transferPaymentx,
// //   //     cashPaymentAmount: cashPaymentx,
// //   //   });
// //   //   console.log(raw);
// //   //   const requestOptions = {
// //   //     method: "POST",
// //   //     headers: myHeaders,
// //   //     body: raw,
// //   //     redirect: "follow",
// //   //   };
// //   //   // localStorage.setItem("Payload", JSON.stringify(raw));
// //   //   // navigate("/sales/salesPayment");
// //   //   // navigate(`/sales/sales-payment`);

// //   //   fetch(`${process.env.REACT_APP_LOUGA_URL}/sales/add`, requestOptions)
// //   //     .then(async (res) => {
// //   //       const aToken = res.headers.get("token-1");
// //   //       localStorage.setItem("rexxdex", aToken);
// //   //       return res.json();
// //   //     })
// //   //     .then((result) => {
// //   //       setOpened(false);
// //   //       if (result.message === "Expired Access") {
// //   //         navigate("/authentication/sign-in");
// //   //         window.location.reload();
// //   //       }
// //   //       if (result.message === "Token Does Not Exist") {
// //   //         navigate("/authentication/sign-in");
// //   //         window.location.reload();
// //   //       }
// //   //       if (result.message === "Unauthorized Access") {
// //   //         navigate("/authentication/forbiddenPage");
// //   //         window.location.reload();
// //   //       }

// //   //       MySwal.fire({
// //   //         title: result.status,
// //   //         type: "success",
// //   //         text: result.message,
// //   //       })
// //   //         .then(() => {
// //   //           console.log(result.data.id);
// //   //           //   handlePayVAT(result.data.id);
// //   //           // window.location.reload();
// //   //         })
// //   //         .then(() => {
// //   //           window.location.reload();
// //   //         });
// //   //     })
// //   //     .catch((error) => {
// //   //       MySwal.fire({
// //   //         title: error.status,
// //   //         type: "error",
// //   //         text: error.message,
// //   //       });
// //   //     });
// //   // };

// //   // console.log(handleClick);
// //   console.log(allTax);
// //   console.log(subTotalAmountx);
// //   console.log(bonusAmountxx);

// //   const handleOnNameKeys = () => {
// //     const letters = /^[a-zA-Z ]+$/;
// //     if (!namex.match(letters)) {
// //       setCheckedName(false);
// //       // eslint-disable-next-line no-unused-expressions
// //       document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
// //     }
// //     if (namex.match(letters)) {
// //       setCheckedName(true);
// //       // eslint-disable-next-line no-unused-expressions
// //       document.getElementById("name").innerHTML = "";
// //     }
// //     if (namex.length === 0) {
// //       // eslint-disable-next-line no-unused-expressions
// //       document.getElementById("name").innerHTML = "Name is required<br>";
// //     }
// //     // setEnabled(checkedName === true);
// //   };
// //   const handleOnEmailKeys = (value) => {
// //     const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
// //     const nylon = value.target.value.toString();
// //     console.log(value);
// //     if (!nylon.match(letters)) {
// //       setCheckedEmail(false);
// //       // eslint-disable-next-line no-unused-expressions
// //       document.getElementById("email").innerHTML = "Email - input a valid email<br>";
// //     }
// //     if (nylon.match(letters)) {
// //       setCheckedEmail(true);
// //       // eslint-disable-next-line no-unused-expressions
// //       document.getElementById("email").innerHTML = "";
// //     }
// //     if (nylon.length === 0) {
// //       setCheckedEmail(false);
// //       // eslint-disable-next-line no-unused-expressions
// //       document.getElementById("email").innerHTML = "Email is required<br>";
// //     }
// //   };
// //   //   const handleOnEmailKeys = () => {
// //   //     const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
// //   //     if (!emailx.match(letters)) {
// //   //       // eslint-disable-next-line no-unused-expressions
// //   //       document.getElementById("email").innerHTML = "Email - input a valid email<br>";
// //   //     }
// //   //     if (emailx.match(letters)) {
// //   //       // eslint-disable-next-line no-unused-expressions
// //   //       document.getElementById("email").innerHTML = "";
// //   //     }
// //   //     if (emailx.length === 0) {
// //   //       // eslint-disable-next-line no-unused-expressions
// //   //       document.getElementById("email").innerHTML = "Email is required<br>";
// //   //     }
// //   //   };

// //   const openModal = (id) => {
// //     console.log("This is for modal");
// //     // setTaskid(id);
// //     setOpen(true);
// //     console.log(id);
// //   };
// //   // const handleOnChange = (e) => {
// //   //   const abc = {};
// //   //   abc[e.target.className] = e.target.value;
// //   //   setSalesType({ ...salesTypex, ...abc });
// //   //   console.log({ ...salesTypex, ...abc });
// //   // };
// //   // const handleOnChange2 = (e) => {
// //   //   console.log(e);
// //   //   console.log(pPQuantityx);
// //   //   const abc = parseInt(e, 10) * parseInt(quantityx, 10);
// //   //   const belgium = e * quantityx;
// //   //   console.log(abc);
// //   //   console.log(belgium);
// //   //   // abc[e.target.className] = e.target.value;
// //   //   setPPQuantity(e);
// //   //   const invest = Number(abc);
// //   //   console.log(invest);
// //   //   setAmountNotChange(belgium);
// //   //   // setAmount(quantityx * e);
// //   // };
// //   // console.log(setAmount);
// //   // const handleOnChange4 = (e) => {
// //   //   console.log(e);
// //   //   // const abc = e;
// //   //   // abc = e.target.value;
// //   //   // setAmount(e);
// //   //   console.log({ ...amountx, ...e });
// //   // };

// //   // const callback = (e) => {
// //   //   useEffect(() => {
// //   //     let isMounted = true;
// //   //     if (isMounted) {
// //   //       // handleOnlastChange(e);
// //   //       console.log(e);
// //   //     }
// //   //     return () => {
// //   //       isMounted = false;
// //   //     };
// //   //   }, []);
// //   // };
// //   // console.log(handleOnlastChange);
// //   // useEffect(() => {
// //   //   // let isMounted = true;
// //   //   // if (isMounted) {
// //   //   //   // handleOnlastChange(amountNotChange2);
// //   //   console.log(amountNotChange2);
// //   //   // }
// //   //   // return () => {
// //   //   //   isMounted = false;
// //   //   // };
// //   // }, []);
// //   if (amountNotChange2 !== "") {
// //     console.log(amountNotChange2);
// //     // useEffect(() => {
// //     //   // let isMounted = true;
// //     //   // if (isMounted) {
// //     //   handleOnlastChange(amountNotChange2);
// //     //   console.log(amountNotChange2);
// //     //   // }
// //     //   // return () => {
// //     //   //   isMounted = false;
// //     //   // };
// //     // }, [amountx]);
// //   }
// //   // const handleOnChange3 = (e) => {
// //   //   // const abc = {};
// //   //   // abc[e.target.className] = e.target.value;
// //   //   setQuantity(e.target.value);
// //   //   // setAmount(e.target.value * pPQuantityx);
// //   //   console.log(pPQuantityx * e.target.value);
// //   //   setAmountNotChange2(pPQuantityx * e.target.value);
// //   //   const movvvv = parseInt(pPQuantityx, 10) * parseInt(e.target.value, 10);
// //   //   console.log(movvvv);
// //   //   console.log(e.target.value);
// //   //   if (movvvv !== "") {
// //   //     console.log(e.target.value * pPQuantityx);
// //   //     console.log(amountNotChange2);
// //   //     console.log(amountNotChange);
// //   //     console.log(movvvv);
// //   //     // callback(movvvv);
// //   //     // useEffect(() => {
// //   //     // let isMounted = true;
// //   //     // if (isMounted) {
// //   //     handleOnlastChange(movvvv);
// //   //     // }
// //   //     // return () => {
// //   //     //   isMounted = false;
// //   //     // };
// //   //     // }, []);
// //   //   }
// //   // };
// //   // const handleOnChange4 = () => {
// //   //   // const abc = {};
// //   //   // abc[e.target.className] = e.target.value;
// //   //   // setQuantity(e.target.value);
// //   //   // setAmount(quantityx * pPQuantityx);
// //   //   console.log(quantityx * pPQuantityx);
// //   // };

// //   console.log(handleOnNameKeys);
// //   console.log(indix);

// //   const Item = styled(Paper)(({ theme }) => ({
// //     backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
// //     ...theme.typography.body2,
// //     padding: theme.spacing(1),
// //     textAlign: "center",
// //     color: theme.palette.text.secondary,
// //   }));

// //   const handleIndividual = (e) => {
// //     if (pnox !== "") {
// //       setOpened(true);
// //       e.preventDefault();
// //       // handleClose();

// //       const data11 = JSON.parse(localStorage.getItem("user1"));
// //       const orgIDs = data11.orgID;
// //       const personalIDs = data11.personalID;
// //       // const dutyx = Number(duty);
// //       const raw = JSON.stringify([
// //         {
// //           orgID: orgIDs,
// //           fname: namex,
// //           lname: lnamex,
// //           title: titlex,
// //           // clientLevelID: clientLevel,
// //           createdBy: personalIDs,
// //           accountOwnerID: personalIDs,
// //         },
// //       ]);
// //       const requestOptions = {
// //         method: "POST",
// //         headers: myHeaders,
// //         body: raw,
// //         redirect: "follow",
// //       };
// //       fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/add`, requestOptions)
// //         .then(async (res) => {
// //           const aToken = res.headers.get("token-1");
// //           localStorage.setItem("rexxdex", aToken);
// //           return res.json();
// //         })
// //         .then((result) => {
// //           if (result.message === "Expired Access") {
// //             navigate("/authentication/sign-in");
// //             window.location.reload();
// //           }
// //           if (result.message === "Token Does Not Exist") {
// //             navigate("/authentication/sign-in");
// //             window.location.reload();
// //           }
// //           if (result.message === "Unauthorized Access") {
// //             navigate("/authentication/forbiddenPage");
// //             window.location.reload();
// //           }
// //           setOpened(false);
// //           handleClose();
// //           MySwal.fire({
// //             title: result.status,
// //             type: "success",
// //             text: result.message,
// //           }).then(() => {
// //             window.location.reload();
// //           });
// //         })
// //         .catch((error) => {
// //           setOpened(false);
// //           MySwal.fire({
// //             title: error.status,
// //             type: "error",
// //             text: error.message,
// //           });
// //         });
// //     } else {
// //       alert("Please fill the required input(s)");
// //     }
// //   };

// //   // const handleChange = (event: SelectChangeEvent) => {
// //   //   setAge(event.target.value as string);
// //   // };
// //   // style={{ tr {
// //   //     background-color: #dddddd;
// //   //   }}}

// //   // const handleChangeBranch = (value, event) => {
// //   //   console.log(event);
// //   //   const poolls = value.toString();
// //   //   console.log(value);
// //   //   setProd(value);
// //   //   setOpened(true);
// //   //   const headers = miHeaders;
// //   //   const data11 = JSON.parse(localStorage.getItem("user1"));
// //   //   const orgIDs = data11.orgID;

// //   //   fetch(`${process.env.REACT_APP_LOUGA_URL}/productBranch/gets/${orgIDs}/${poolls}`, { headers })
// //   //     .then(async (res) => {
// //   //       const aToken = res.headers.get("token-1");
// //   //       localStorage.setItem("rexxdex", aToken);
// //   //       const resultres = await res.text();
// //   //       if (resultres === null || resultres === undefined || resultres === "") {
// //   //         return {};
// //   //       }
// //   //       return JSON.parse(resultres);
// //   //     })
// //   //     .then((result) => {
// //   //       setOpened(false);
// //   //       if (result.message === "Expired Access") {
// //   //         navigate("/authentication/sign-in");
// //   //         window.location.reload();
// //   //       }
// //   //       if (result.message === "Token Does Not Exist") {
// //   //         navigate("/authentication/sign-in");
// //   //         window.location.reload();
// //   //       }
// //   //       if (result.message === "Unauthorized Access") {
// //   //         navigate("/authentication/forbiddenPage");
// //   //         window.location.reload();
// //   //       }
// //   //       if (result !== "") {
// //   //         setProductBran(result);
// //   //       }
// //   //       console.log(result);
// //   //     });
// //   // };

// //   const handleFormChange = (event, index) => {
// //     console.log(event, index);
// //     console.log(event.target.name);
// //     // console.log(vee);
// //     const ids = event.target.name;
// //     const data = [...counter];
// //     console.log([...counter], ids);
// //     console.log(data);
// //     console.log(data[index][event.target.name]);
// //     data[index][event.target.name] = event.target.value;
// //     if (event.target.name === "pricePerUnit") {
// //       data[index].amount = parseInt(data[index].quantity, 10) * parseInt(event.target.value, 10);
// //       data[index].totalAmount =
// //         parseInt(data[index].quantity, 10) * parseInt(event.target.value, 10) +
// //         parseInt(data[index].taxAmount, 10);
// //       // parseInt(event.target.value, 10)
// //       const zoom = counter.map((item) => item.pricePerUnit * item.quantity);
// //       console.log(zoom);
// //       setSubTotalAmount(eval(zoom.join("+")));
// //       // eslint-disable-next-line no-eval
// //       console.log(eval(zoom.join("+")));
// //     } else if (event.target.name === "quantity") {
// //       data[index].amount =
// //         parseInt(data[index].pricePerUnit, 10) * parseInt(event.target.value, 10);
// //       data[index].totalAmount =
// //         parseInt(data[index].pricePerUnit, 10) * parseInt(event.target.value, 10) +
// //         parseInt(data[index].taxAmount, 10);
// //       const zoom = counter.map((item) => item.pricePerUnit * item.quantity);
// //       console.log(zoom);
// //       setSubTotalAmount(eval(zoom.join("+")));
// //       // eslint-disable-next-line no-eval
// //       console.log(eval(zoom.join("+")));
// //       // parseInt(event.target.value, 10)
// //     } else if (event.target.name === "product") {
// //       // handleChangeBranch(event.target.value);
// //       // } else if (event.target.name === "branch") {
// //       data[index][event.target.name] = event.target.value;
// //       // } else if (event.target.name === "taxAmount") {
// //       //   data[index].totalAmount = data[index].amount + event.target.value;
// //     } else if (event.target.name === "taxAmount") {
// //       data[index].totalAmount = parseInt(data[index].amount, 10) + parseInt(event.target.value, 10);
// //       // parseInt(event.target.value, 10)
// //       const zoom = counter.map((item) => item.taxAmount);
// //       console.log(zoom);
// //       setAllTax(eval(zoom.join("+")));
// //     } else if (event.target.name === "product") {
// //       // data[index][event.target.name] = event.target.value;
// //       setProductxx((data[index][event.target.name] = event.target.value));
// //     } else if (event.target.name === "quantity") {
// //       data[index].totalAmount =
// //         parseInt(data[index].pricePerUnit, 10) * parseInt(event.target.value, 10);
// //     }
// //     setCounter(data);
// //   };

// //   // function load(e) {
// //   //   handleOnlastChange(e);
// //   //   // id = 1;
// //   //   console.log(e);
// //   // }
// //   // console.log(load);
// //   console.log(salesTypex);
// //   console.log(quantityx);
// //   console.log(pPQuantityx);
// //   // // eslint-disable-next-line no-lone-blocks
// //   // {
// //   //   Object.keys(amountx).map((c) => (
// //   //     <p>{salesTypex[c]}</p>
// //   //     console.log(c);
// //   //     // setdiots(c),
// //   //   ));
// //   // }

// //   // handleAddRow = () => {
// //   //   const item = {
// //   //     saleType: "",
// //   //     branchID: "",
// //   //     pricePerUnit: "",
// //   //     quantity: "",
// //   //     amount: "",
// //   //     taxAmount: "",
// //   //     totalAmount: "",
// //   //   };
// //   //   console.log(item);
// //   //   // this.setState = {
// //   //   //   // eslint-disable-next-line react/destructuring-assignment, react/no-this-in-sfc
// //   //   //   rows: this.state.rows.slice(0, -1),
// //   //   // };
// //   // };
// //   // console.log(handleAddRow);
// //   const handleRemoveRow = () => {
// //     // eslint-disable-next-line react/destructuring-assignment
// //     this.state.rows.slice(0, -1);
// //   };
// //   console.log(handleRemoveRow);

// //   const addFields = () => {
// //     const object = {
// //       saleType: Number(""),
// //       salesID: "",
// //       branchID: "",
// //       pricePerUnit: Number(""),
// //       quantity: Number(""),
// //       amount: Number(""),
// //       taxAmount: Number(""),
// //       totalAmount: Number(""),
// //       product: Number(""),
// //       // branch: "",
// //       // bonusAmount: "",
// //       // id: `SALE${new Date().getTime * 8 + 2}`,
// //     };
// //     // {
// //     //   salesType: "",
// //     //   pPQuantity: "",
// //     //   quantity: "",
// //     //   product: "",
// //     //   amount: "",
// //     //   branch: "",
// //     //   taxAmountx: "",
// //     //   bonusAmount: "",
// //     //   id: `SALE${new Date().getTime * 8 + 2}`,
// //     // };
// //     setCounter([...counter, object]);
// //   };
// //   const removeFields = (index) => {
// //     console.log(index);
// //     const data = [...counter];
// //     data.splice(index, 1);
// //     // data.slice(0, -1);
// //     setCounter(data);
// //   };
// //   console.log(removeFields);

// //   // console.log(
// //   // eslint-disable-next-line array-callback-return
// //   // counter.map((v) => {
// //   //   // {
// //   //   //   (v.quantity)
// //   //   // }
// //   //   console.log(v.quantity);
// //   // });
// //   // eslint-disable-next-line array-callback-return
// //   // counter.map((v) => {
// //   //   // {
// //   //   //   (v.quantity)
// //   //   // }
// //   //   console.log(v.pPQuantity);
// //   // });
// //   // );
// //   // console.log(counter.pPQuantity);
// //   // if (counter.pPQuantity !== "" && counter.quantity) {
// //   //   {
// //   //     // eslint-disable-next-line array-callback-return
// //   //     counter.map((apis) => {
// //   //       const veel = parseInt(apis.pPQuantity, 10) * parseInt(apis.quantity, 10);
// //   //       console.log(veel);
// //   //       setAddict(veel);
// //   //     });
// //   //   }
// //   // }
// //   // if (counter.length === )

// //   console.log(peeps);
// //   console.log(setSubTotalAmount);

// //   // {
// //   // const zoom = counter.map((item) => item.pricePerUnit * item.quantity);
// //   // console.log(zoom);
// //   // setSubTotalAmount(zoom);
// //   // eslint-disable-next-line no-eval
// //   // console.log(eval(zoom.join("+")));
// //   // const escape = eval(zoom.join("+"));
// //   // eslint-disable-next-line no-eval
// //   // setSubTotalAmount(eval(zoom.join("+")));
// //   // eslint-disable-next-line array-callback-return
// //   // zoom.map((items) => {
// //   //   // setPeeps(items);
// //   //   console.log(items);
// //   //   // console.log(items());
// //   // });
// //   // .reduce((acc, current) => acc + current, 0);
// //   // const handleOnSelect2 = () => {
// //   //   // const zoom = counter.map((item) => item.pPQuantity * item.quantity);
// //   //   // const usseerr = [];
// //   //   // console.log(zoom);

// //   //   // eslint-disable-next-line array-callback-return
// //   //   // zoom.map((items) => {
// //   //   //   setPeeps(items);
// //   //   //   console.log(items);
// //   //   //   // console.log(items());
// //   //   // });
// //   //   // setApprov2(usseerr);
// //   //   // };
// //   //   // if (peeps === 0) {
// //   //   //   console.log(peeps);
// //   //   const speak = zoom;
// //   //   console.log(speak);
// //   // };
// //   // console.log(zoom);
// //   // if (zoom !== 0) {
// //   //   useEffect(() => {
// //   //     handleOnSelect2();
// //   //   }, [zoom]);
// //   // }
// //   // }
// //   console.log(peeps);
// //   useEffect(() => {
// //     const headers = miHeaders;
// //     const data11 = JSON.parse(localStorage.getItem("user1"));

// //     const orgIDs = data11.orgID;
// //     let isMounted = true;
// //     fetch(`${process.env.REACT_APP_LOUGA_URL}/products/gets/${orgIDs}`, { headers })
// //       .then(async (res) => {
// //         const aToken = res.headers.get("token-1");
// //         localStorage.setItem("rexxdex", aToken);
// //         return res.json();
// //       })
// //       .then((result) => {
// //         console.log(result);
// //         if (result.message === "Expired Access") {
// //           navigate("/authentication/sign-in");
// //           window.location.reload();
// //         }
// //         if (result.message === "Token Does Not Exist") {
// //           navigate("/authentication/sign-in");
// //           window.location.reload();
// //         }
// //         if (result.message === "Unauthorized Access") {
// //           navigate("/authentication/forbiddenPage");
// //           window.location.reload();
// //         }
// //         console.log(result);
// //         if (isMounted) {
// //           setProduct(result);
// //           console.log(result);
// //         }
// //         console.log(result);
// //         // console.log(prodx);
// //       });
// //     return () => {
// //       isMounted = false;
// //     };
// //   }, []);
// //   // console.log(prodx);
// //   // if (prodx !== "") {
// //   //   // useEffect(() => {
// //   //   //   const headers = miHeaders;
// //   //   //   const data11 = JSON.parse(localStorage.getItem("user1"));
// //   //   //   const orgIDs = data11.orgID;
// //   //   //   console.log(prodx);
// //   //   //   let isMounted = true;
// //   //   //   fetch(`${process.env.REACT_APP_LOUGA_URL}/productBranch/gets/${orgIDs}/${prodx}`, {
// //   //   //     headers,
// //   //   //   })
// //   //   //     .then(async (res) => {
// //   //   //       const aToken = res.headers.get("token-1");
// //   //   //       localStorage.setItem("rexxdex", aToken);
// //   //   //       return res.json();
// //   //   //     })
// //   //   //     .then((result) => {
// //   //   //       console.log(result);
// //   //   //       if (result.message === "Expired Access") {
// //   //   //         navigate("/authentication/sign-in");
// //   //   //         window.location.reload();
// //   //   //       }
// //   //   //       if (result.message === "Token Does Not Exist") {
// //   //   //         navigate("/authentication/sign-in");
// //   //   //         window.location.reload();
// //   //   //       }
// //   //   //       if (result.message === "Unauthorized Access") {
// //   //   //         navigate("/authentication/forbiddenPage");
// //   //   //         window.location.reload();
// //   //   //       }
// //   //   //       console.log(result);
// //   //   //       if (isMounted) {
// //   //   //         if (result !== "") {
// //   //   //           setProductBran(result);
// //   //   //         }
// //   //   //         console.log(result);
// //   //   //       }
// //   //   //       console.log(result);
// //   //   //     });
// //   //   //   return () => {
// //   //   //     isMounted = false;
// //   //   //   };
// //   //   // }, []);
// //   // }
// //   // console.log(subTotalAmountx(eval(zoom.join("+"))));
// //   console.log(cashPaymentx);
// //   console.log(transferPaymentx);
// //   console.log(cardPaymentx);
// //   const Payment = eval(
// //     Number(cashPaymentx) + Number(cardPaymentx) + Number(transferPaymentx) - Number(subTotalAmountx)
// //   );
// //   console.log(Payment);
// //   // const Payment =
// //   //   parseInt(cashPaymentx, 10) + parseInt(cardPaymentx, 10) + parseInt(transferPaymentx, 10);
// //   // parseInt(subTotalAmountx, 10);
// //   // console.log(Payment);
// //   // const Balancex = eval(Payment - subTotalAmountx);
// //   // console.log(Balancex);
// //   const Pay = () => {
// //     setShowPayment(true);
// //   };
// //   const handleOnBeforeGetContent = () =>
// //     new Promise((resolve) => {
// //       // `react-to-print` will wait for this Promise to resolve before continuing
// //       // Load data
// //       onBeforeGetContentResolve.current = resolve;
// //       setShowPrint(true); // When data is done loading
// //     });
// //   // const componentRef = useRef();
// //   const data111 = JSON.parse(localStorage.getItem("user1"));
// //   console.log(data111);
// //   const componentRef = useRef();
// //   console.log(componentRef);
// //   const handlePrint = useReactToPrint({
// //     content: () => componentRef.current,
// //     // console.log(content);
// //     // documentTitle: "Announcement_Dashboard",
// //     onBeforeGetContent: handleOnBeforeGetContent,
// //     onAfterPrint: () => window.location.reload(),
// //   });
// //   console.log(showPrint);
// //   useEffect(() => {
// //     const id = setImmediate(() => {
// //       if (showPrint) {
// //         // Resolves the Promise, telling `react-to-print` it is time to gather the content of the page for printing
// //         onBeforeGetContentResolve.current();
// //       }
// //     });
// //     return () => {
// //       clearTimeout(id);
// //     };
// //   }, [showPrint, onBeforeGetContentResolve]);

// //   const handleClick = (e) => {
// //     if (Payment === 0) {
// //       setOpened(true);
// //       e.preventDefault();
// //       const data11 = JSON.parse(localStorage.getItem("user1"));

// //       const orgIDs = data11.orgID;
// //       const idx = data11.personalID;
// //       const raw = JSON.stringify({
// //         orgID: orgIDs,
// //         individualID: indix,
// //         items: counter,
// //         bonusAmount: bonusAmountxx,
// //         subTotalAmount: subTotalAmountx,
// //         totalAmount: TOTAL,
// //         createdBy: idx,
// //         comment: commentx,
// //         receiptStatus: 1,
// //         cardPaymentAmount: cardPaymentx,
// //         transferPaymentAmount: transferPaymentx,
// //         cashPaymentAmount: cashPaymentx,
// //       });
// //       console.log(raw);
// //       const requestOptions = {
// //         method: "POST",
// //         headers: myHeaders,
// //         body: raw,
// //         redirect: "follow",
// //       };
// //       fetch(`${process.env.REACT_APP_LOUGA_URL}/sales/add`, requestOptions)
// //         .then(async (res) => {
// //           const aToken = res.headers.get("token-1");
// //           localStorage.setItem("rexxdex", aToken);
// //           const result = await res.text();
// //           if (result === null || result === undefined || result === "") {
// //             return {};
// //           }
// //           return JSON.parse(result);
// //         })
// //         .then((result) => {
// //           if (result.message === "Expired Access") {
// //             navigate("/authentication/sign-in");
// //             window.location.reload();
// //           }
// //           if (result.message === "Token Does Not Exist") {
// //             navigate("/authentication/sign-in");
// //             window.location.reload();
// //           }
// //           if (result.message === "Unauthorized Access") {
// //             navigate("/authentication/forbiddenPage");
// //             window.location.reload();
// //           }
// //           if (result.status === "SUCCESS") {
// //             handlePrint();
// //           }
// //           console.log(result);
// //           console.log(result.message);
// //           setOpened(false);
// //           MySwal.fire({
// //             title: result.status,
// //             type: "success",
// //             text: result.message,
// //           }).then(() => {
// //             window.location.reload();
// //           });
// //         })
// //         .catch((error) => {
// //           setOpened(false);
// //           MySwal.fire({
// //             title: error.status,
// //             type: "error",
// //             text: error.message,
// //           });
// //         });
// //     }
// //   };
// //   console.log(handleClick);

// //   // const orgIDs = data11.orgID;
// //   // const idx = data11.personalID;
// //   // const data11 = JSON.parse(localStorage.getItem("user1"));
// //   // const orgIDs = data11.orgID;
// //   useEffect(() => {
// //     const headers = miHeaders;

// //     const data11 = JSON.parse(localStorage.getItem("user1"));

// //     const orgIDs = data11.orgID;
// //     const empID = data11.personalID;
// //     let isMounted = true;
// //     // setOpened(true);
// //     fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getUserInfo/${orgIDs}/${empID}`, { headers })
// //       .then(async (res) => {
// //         const aToken = res.headers.get("token-1");
// //         localStorage.setItem("rexxdex", aToken);
// //         return res.json();
// //       })
// //       .then((result) => {
// //         if (result.message === "Expired Access") {
// //           navigate("/authentication/sign-in");
// //           window.location.reload();
// //         }
// //         if (result.message === "Token Does Not Exist") {
// //           navigate("/authentication/sign-in");
// //           window.location.reload();
// //         }
// //         if (result.message === "Unauthorized Access") {
// //           navigate("/authentication/forbiddenPage");
// //           window.location.reload();
// //         }
// //         if (isMounted) {
// //           setCashier(result);
// //           // setOpened(false);
// //         }
// //       });
// //     return () => {
// //       isMounted = false;
// //     };
// //   }, []);
// //   console.log(cashierx);
// //   console.log(productxx);
// //   // eslint-disable-next-line array-callback-return
// //   counter.map((row, index) => {
// //     // index.taxAmount;
// //     console.log(index);
// //     console.log(row);
// //     console.log(index.taxAmount);
// //     console.log(parseInt(row.pricePerUnit, 10) * parseInt(row.quantity, 10));
// //   });
// //   // console.log(eval(zoom.join("+")));
// //   // const amountxxx = parseInt(counter.pricePerUnit, 10) * parseInt(form.quantity, 10);

// //   useEffect(() => {
// //     let isMounted = true;
// //     if (isMounted) {
// //       setReferenceSKey(`${Math.floor(Math.random() * 1000000000 + 1)}`);
// //     }

// //     return () => {
// //       isMounted = false;
// //     };
// //   }, [listenn]);

// //   const honClose = (response) => {
// //     console.log(response);
// //     // if (enabled) {
// //     setListenn(!listenn);
// //     setReferenceSKey(`${Math.floor(Math.random() * 1000000000 + 1)}`);

// //     if (response.message === "Transaction Successful" && response.status === "SUCCESS") {
// //       // call api after success from monnify
// //     }
// //     // }
// //   };

// //   // const personalApiKey = "MK_TEST_JB2L9T7HMG";
// //   // const personalConCode = "6428086775";
// //   console.log(`${process.env.REACT_APP_PERSONAL_API_KEY}`);
// //   console.log(`${process.env.REACT_APP_PERSONAL_CONTRACT_KEY}`);
// //   const monNey = {
// //     onClose: honClose,
// //     amount: cardPaymentx,
// //     currency: currencyx,
// //     reference: referenceSKey,
// //     customerFullName: indiName,
// //     customerEmail: emailx,
// //     customerMobileNumber: pnox,
// //     apiKey: `${process.env.REACT_APP_PERSONAL_API_KEY}`,
// //     contractCode: `${process.env.REACT_APP_PERSONAL_CONTRACT_KEY}`,
// //     paymentDescription: commentx,
// //     isTestMode: true,
// //   };

// //   const handleOnPortfolioKeys = () => {
// //     if (commentx.length === 0) {
// //       setCheckedPortfolio(false);
// //       // eslint-disable-next-line no-unused-expressions
// //       document.getElementById("portfolio").innerHTML = "A text is required<br>";
// //     } else {
// //       setCheckedPortfolio(true);
// //     }
// //     // setEnabled(checkedPortfolio === true);
// //   };

// //   const handleValidate = (e) => {
// //     // handleOnFirstKeys(namex);
// //     // handleOnLastKeys(lnamex);
// //     // handleOnOtherKeys(onamex);
// //     // handleOnEmailKeys(emailx);
// //     // handleOnOEmailKeys(emaily);
// //     // handleOnStreetKeys(residentialStreetx);
// //     // handleOnCityKeys(residentialCityx);
// //     // handleOnPasswordKeys(passwordx);
// //     // handleOnRTPasswordKeys(retypePasswordx);
// //     console.log(checkedEmail);
// //     console.log(checkedName);
// //     if (checkedName && checkedEmail === true) {
// //       handleIndividual(e);
// //     }
// //   };
// //   const handleValidate2 = (e) => {
// //     console.log(checkedPortfolio);
// //     if (checkedPortfolio === true) {
// //       handleClick(e);
// //     }
// //   };

// //   return (
// //     <DashboardLayout>
// //       <DashboardNavbar />
// //       <div align="center">
// //         {/* <MDButton className="hide-on-print" onClick={handleClick}>
// //           Print
// //         </MDButton> */}
// //       </div>
// //       <div ref={componentRef}>
// //         {showPrint ? (
// //           <>
// //             <div align="center">
// //               <h6>Reprinted</h6>
// //               <h2>House Of Tara</h2>
// //               {/* <MDBox style={{ paddingTop: "260px" }}> */}
// //               {/* <img className="img" src={houseOfTara} alt="example" /> */}
// //               {/* </MDBox> */}
// //               <h3>
// //                 <b>HOUSE OF TARA INTL LIMITED LEKKI</b>
// //               </h3>
// //               <p>13A Road 12, Onikepe Akande Street</p>
// //               <p>Off Admiralty Road, Lekki Phase 1, Lagos</p>
// //             </div>
// //             <div style={{ paddingLeft: "160px" }}>
// //               <p>
// //                 Cashier: {cashierx.personal.fname} {cashierx.personal.lname}
// //               </p>
// //             </div>
// //             <div align="center">
// //               <table>
// //                 <thead>
// //                   <tr>
// //                     <th>Item Name</th>
// //                     <th>Qty</th>
// //                     <th>Price</th>
// //                     <th>Ext Price</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {counter.map((row, index) => (
// //                     <>
// //                       <tr>
// //                         {/* {} */}
// //                         <td>{counter[index].product}</td>
// //                         <td>{counter[index].quantity}</td>
// //                         <td>{counter[index].pricePerUnit}</td>
// //                         <td>
// //                           {parseInt(counter[index].pricePerUnit, 10) *
// //                             parseInt(counter[index].quantity, 10)}
// //                         </td>
// //                       </tr>
// //                       <tr>
// //                         {/* <td />
// //                         <td />
// //                         {/* <td>Subtotal</td>
// //                         {/* <td>N23,200.00</td>
// //                       </tr>
// //                       <tr>
// //                         Local Sales Tax
// //                         <td />
// //                         <td>0% Tax:</td>
// //                         <td>+N0.00</td> */}
// //                       </tr>
// //                     </>
// //                   ))}
// //                   <tr>
// //                     <td />
// //                     <td />
// //                     <td>Subtotal</td>
// //                     <td>N{subTotalAmountx}</td>
// //                   </tr>
// //                   <tr>
// //                     Local Sales Tax
// //                     <td />
// //                     <td>{allTax}% Tax:</td>
// //                     <td>+N{allTax}.00</td>
// //                   </tr>
// //                 </tbody>
// //               </table>
// //             </div>
// //             {/* <br /> */}
// //             <div style={{ paddingLeft: "350px" }}>
// //               <b>Receipt Total: {subTotalAmountx} </b>
// //             </div>
// //             <p align="center">Charges Inclusive of 7.5% VAT</p>
// //             <p align="center">
// //               {" "}
// //               Thank you for shopping with us, Products purchased in good condition are not
// //               returnable
// //             </p>
// //             <h4 align="center">Have a great day |||</h4>
// //           </>
// //         ) : (
// //           ""
// //         )}
// //       </div>
// //       {/* <div>
// //       {/* {counter.map((form) => {
// //         const amountxx = parseInt(form.pricePerUnit, 10) * parseInt(form.quantity, 10);
// //         const taxAmoun = Number(form.taxAmount); */}
// //       {/* <div ref={componentRef}>
// //         {showPrint ? (
// //           <>
// //             {/* eslint-disable-next-line array-callback-return */}
// //       {/* {counter.map((form) => {
// //               const amountxx = parseInt(form.pricePerUnit, 10) * parseInt(form.quantity, 10);
// //               const taxAmoun = Number(form.taxAmount);
// //             <>
// //               <div align="center">
// //                 <h6>Reprinted</h6>
// //                 <h2>House Of Tara</h2>
// //                 <h3>
// //                   <b>HOUSE OF TARA INTL LIMITED LEKKI</b>
// //                 </h3>
// //                 <p>13A Road 12, Onikepe Akande Street</p>
// //                 <p>Off Admiralty Road, Lekki Phase 1, Lagos</p>
// //               </div>
// //               <div style={{ paddingLeft: "160px" }}>
// //                 <p>
// //                   Cashier: {cashierx.personal.fname} {cashierx.personal.lname}
// //                 </p>
// //               </div>
// //               <div align="center">
// //                 {/* <table>
// //                   <tr>
// //                     <th>Item Name</th>
// //                     <th>Qty</th>
// //                     <th>Price</th>
// //                     <th>Ext Price</th>
// //                   </tr>
// //                   <tr>
// //                     <td>SF 215</td>
// //                     <td />
// //                     <td>{form.quantity}</td>
// //                     <td>{amountxx}</td>
// //                   </tr>
// //                   <tr>
// //                     <td />
// //                     <td />
// //                     <td>Subtotal</td>
// //                     <td>{amountxx}</td>
// //                   </tr>
// //                   <tr>
// //                     Local Sales Tax
// //                     <td />
// //                     <td>{taxAmoun}% Tax:</td>
// //                     <td>+N{amountxx}.00</td>
// //                   </tr>
// //                 </table>
// //               </div>
// //             </>
// //             ;{/* <br />
// //             <>
// //               <div style={{ paddingLeft: "350px" }}>
// //                 <b>Receipt Total: {Payment} </b>
// //               </div>
// //               <p align="center">Charges Inclusive of 7.5% VAT</p>
// //               <p align="center">
// //                 {" "}
// //                 Thank you for shopping with us, Products purchased in good condition are not
// //                 returnable
// //               </p>
// //               <h4 align="center">Have a great day |||</h4>
// //             </>
// //             {/* ; })}
// //           </>
// //         ) : (
// //           ""
// //         )}
// //       </div> */}
// //       ;{/* </div> */}
// //       {/* <Card>
// //         <MDBox pt={4} pb={3} px={30}>
// //           <MDBox
// //             variant="gradient"
// //             // bgColor="info"
// //             borderRadius="lg"
// //             coloredShadow="info"
// //             mx={2}
// //             mt={-3}
// //             p={2}
// //             mb={1}
// //             textAlign="center"
// //             style={Styles.boxSx}
// //           >
// //             <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
// //               Sales
// //             </MDTypography>
// //           </MDBox>
// //           <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
// //             <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
// //               {" "}
// //             </MDTypography>
// //           </MDBox>
// //           <MDBox component="form" role="form">
// //             <MDBox mb={2}>
// //               <Container>
// //                 <div className="row">
// //                   <div className="col-sm-6">
// //                     {/* <MDInput
// //                       type="text"
// //                       label="Quantity *"
// //                       value={quantityx || ""}
// //                       onKeyUp={handleOnNameKeys}
// //                       className="form-control"
// //                       onChange={(e) => setQuantity(e.target.value)}
// //                       variant="standard"
// //                       fullWidth
// //                     />
// //                     <TextField
// //                       label="Amount *"
// //                       type="number"
// //                       value={amountx}
// //                       onKeyUp={handleOnNameKeys}
// //                       onChange={(e) => setAmount(e.target.value)}
// //                     />
// //                   </div>
// //                   <div className="col-sm-6">
// //                     {/* <MDInput
// //                       type="text"
// //                       value={ppQuantity || ""}
// //                       onChange={(e) => setPPQuantity(e.target.value)}
// //                       label="Price Per Quantity"
// //                       variant="standard"
// //                       fullWidth
// //                     />
// //                     <TextField
// //                       label="Price Per Quantity "
// //                       type="number"
// //                       value={ppQuantity}
// //                       onChange={(e) => setPPQuantity(e.target.value)}
// //                     />
// //                   </div>
// //                 </div>
// //               </Container>
// //             </MDBox>
// //             <MDBox mb={2}>
// //               <Container>
// //                 <div className="row">
// //                   <div className="col-sm-6">
// //                     {/* <MDInput
// //                       type="text"
// //                       label="Quantity *"
// //                       value={amountx || ""}
// //                       onKeyUp={handleOnNameKeys}
// //                       className="form-control"
// //                       onChange={(e) => setAmount(e.target.value)}
// //                       variant="standard"
// //                       fullWidth
// //                     />
// //                     <TextField
// //                       label="Quantity *"
// //                       type="number"
// //                       value={quantityx}
// //                       onChange={(e) => setQuantity(e.target.value)}
// //                     />
// //                   </div>
// //                   <div className="col-sm-6">
// //                     {/* <MDInput
// //                       type="text"
// //                       value={ppQuantity || ""}
// //                       onChange={(e) => setPPQuantity(e.target.value)}
// //                       label="Price Per Quantity"
// //                       variant="standard"
// //                       fullWidth
// //                     />
// //                     <TextField
// //                       label="Price Per Quantity "
// //                       type="number"
// //                       value={taskAmountx}
// //                       onChange={(e) => setAmount(e.target.value)}
// //                     />
// //                   </div>
// //                 </div>
// //               </Container>
// //             </MDBox>
// //             <MDBox>
// //               <Container>
// //                 <div className="row">
// //                   <div className="col-sm-6">
// //                     <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
// //                       Branch
// //                     </MDTypography>
// //                     <MDBox textAlign="right">
// //                       <Form.Select
// //                         value={branx || ""}
// //                         aria-label="Default select example"
// //                         onChange={setBranx}
// //                       >
// //                         <option>--Select Branch--</option>
// //                         {branId.map((apis) => (
// //                           <option key={apis.id} value={apis.id}>
// //                             {apis.name}
// //                           </option>
// //                         ))}
// //                       </Form.Select>
// //                     </MDBox>
// //                   </div>
// //                   <div className="col-sm-6">
// //                     <TextField
// //                       label="Task Amount "
// //                       type="number"
// //                       value={taskAmountx}
// //                       onChange={(e) => setTaskAmount(e.target.value)}
// //                     />
// //                   </div>
// //                 </div>
// //               </Container>
// //             </MDBox>
// //             <MDBox mt={4} mb={1}>
// //               <MDButton
// //                 variant="gradient"
// //                 onClick={handleClick}
// //                 color="info"
// //                 width="50%"
// //                 align="left"
// //               >
// //                 Save
// //               </MDButton>
// //             </MDBox>
// //           </MDBox>
// //         </MDBox>
// //       </Card> */}
// //       <Card>
// //         {/* <MDBox style={{ paddingLeft: "200px" }}>
// //           <MDButton variant="gradient" onClick={() => openModal()}>
// //             Add New Individual
// //           </MDButton>
// //         </MDBox> */}
// //         <MDBox style={{ paddingLeft: "450px" }}>
// //           <Container>
// //             <div className="row" style={{ paddingLeft: "700px" }}>
// //               <div className="col-sm-12">
// //                 <MDTypography
// //                   variant="button"
// //                   //   style={{ paddingLeft: "300px" }}
// //                   fontWeight="regular"
// //                   color="text"
// //                   mt={8}
// //                 >
// //                   Individual
// //                 </MDTypography>
// //                 {/* <IconButton onClick={() => openModal()}>
// //                   <PersonAddIcon />
// //                 </IconButton> */}
// //                 <MDBox>
// //                   <IconButton
// //                     size="large"
// //                     aria-label="account of current user"
// //                     aria-controls="primary-search-account-menu"
// //                     aria-haspopup="true"
// //                     color="inherit"
// //                     onClick={() => openModal()}
// //                   >
// //                     <PersonAddIcon sx={{ color: "#f96d02" }} />
// //                   </IconButton>
// //                 </MDBox>
// //                 <MDBox>
// //                   <Form.Select
// //                     value={indix || ""}
// //                     aria-label="Default select example"
// //                     onChange={(e) => {
// //                       setIndi(e.target.value);
// //                       const { value } = e.target;
// //                       const fData = individualx.filter((indii) => indii.id === value);
// //                       console.log(fData);
// //                       setIndiName(`${fData[0].fname} ${fData[0].lname}`);
// //                       if (fData[0].email) {
// //                         setEmail(`${fData[0].email}`);
// //                       } else {
// //                         setEmail("");
// //                       }
// //                       if (fData[0].pno) {
// //                         setPno(`${fData[0].pno}`);
// //                       } else {
// //                         setPno("");
// //                       }
// //                     }}
// //                   >
// //                     <option>--Select Individual--</option>
// //                     {individualx.map((apis) => (
// //                       <option key={apis.id} value={apis.id}>
// //                         {apis.fname} {apis.lname}
// //                       </option>
// //                     ))}
// //                   </Form.Select>
// //                 </MDBox>
// //               </div>
// //             </div>
// //           </Container>
// //           {/* <MDBox mt={1} style={{ paddingLeft: "700px" }}>
// //             <MDTypography variant="button" color="text">
// //               Individual not in organization yet ?
// //               {/* <MDTypography
// //                 component={Link}
// //                 // to="/authentication/sign-up"
// //                 onClick={}
// //                 variant="button"
// //                 color="info"
// //                 fontWeight="medium"
// //                 // textGradient
// //                 style={Styles.textSx}
// //               >
// //                 Add New Individual
// //               </MDTypography>
// //               <MDButton variant="gradient" onClick={() => openModal()}>
// //                 Add New Individual
// //               </MDButton>
// //             </MDTypography>
// //           </MDBox> */}
// //         </MDBox>
// //         {/* <MDBox>
// //           {/* startAction= */}
// //         {/* <IconButton
// //             onClick={handleNewInput}
// //             aria-label="Add"
// //             size="sm"
// //             variant="plain"
// //             color="neutral"
// //           > */}
// //         {/* <Add /> */}
// //         {/* </IconButton>
// //         </MDBox> */}
// //         <br />
// //         &nbsp; &nbsp;
// //         <MDBox>
// //           <IconButton
// //             size="large"
// //             aria-label="account of current user"
// //             aria-controls="primary-search-account-menu"
// //             aria-haspopup="true"
// //             color="inherit"
// //             onClick={addFields}
// //           >
// //             <Add sx={{ color: "#f96d02" }} />
// //           </IconButton>
// //           {/* <IconButton
// //             size="large"
// //             aria-label="account of current user"
// //             aria-controls="primary-search-account-menu"
// //             aria-haspopup="true"
// //             color="inherit"
// //             onClick={removeFields}
// //           >
// //             <CancelPresentationIcon sx={{ color: "#f96d02" }} />
// //           </IconButton> */}
// //         </MDBox>
// //         <Card style={{ backgroundColor: "#CCC1FF" }}>
// //           <Grid container spacing={2}>
// //             <Grid item xs={2}>
// //               <Item>
// //                 <b>saleType</b>
// //               </Item>
// //               {/* branchID: "branx",
// //             pricePerUnit: "ppQuantity",
// //             quantity: "quantityx",
// //             amount: "amountx",
// //             taxAmount: "taskAmountx",
// //             totalAmount: "totalAmountx", */}
// //             </Grid>
// //             <Grid item xs={1}>
// //               <Item>
// //                 <b>Product</b>
// //               </Item>
// //             </Grid>
// //             <Grid item xs={2}>
// //               <Item>
// //                 <b>Branch</b>
// //               </Item>
// //             </Grid>
// //             <Grid item xs={2}>
// //               <Item>
// //                 <b>Price Per Unit (NGN)</b>
// //               </Item>
// //             </Grid>
// //             <Grid item xs={1}>
// //               <Item>
// //                 <h6>
// //                   <b>Quantity</b>
// //                 </h6>
// //               </Item>
// //             </Grid>
// //             <Grid item xs={2}>
// //               <Item>
// //                 <b>Amount (NGN)</b>
// //               </Item>
// //             </Grid>
// //             <Grid item xs={1}>
// //               <Item>
// //                 <b>Tax Amount</b>
// //               </Item>
// //             </Grid>
// //             <Grid item xs={1}>
// //               <Item>
// //                 <b>Total Amount (NGN)</b>
// //               </Item>
// //             </Grid>
// //           </Grid>
// //         </Card>
// //         {/* <br /> */}
// //         &nbsp;
// //         <Grid>
// //           {/* return ( */}
// //           {/* {showPrint ? ( */}
// //           {/* <div ref={componentRef} style={{ width: "100%", height: window.innerHeight }}>
// //             {showPrint ? (
// //               <>
// //                 <div align="center">
// //                   <h6>Reprinted</h6>
// //                   <h2>House Of Tara</h2>
// //                   <p>HOUSE OF TARA INTL LIMITED LEKKI</p>
// //                   <p>13A Road 12, Onikepe Akande Street</p>
// //                   <p>Off Admiralty Road, Lekki Phase 1, Lagos</p>
// //                 </div>
// //                 <p>Cashier: Name of human being</p>
// //                 <div>
// //                   <table>
// //                     <tr>
// //                       <th>Firstname</th>
// //                       <th>Lastname</th>
// //                     </tr>
// //                     <tr>
// //                       <td>Peter</td>
// //                       <td>Griffin</td>
// //                     </tr>
// //                     <tr>
// //                       <td>Lois</td>
// //                       <td>Griffin</td>
// //                     </tr>
// //                   </table>
// //                   <div className="row">
// //                     <div className="col-sm-3">Item Name</div>
// //                     <div className="col-sm-3">Qty</div>
// //                     <div className="col-sm-3">Qty</div>
// //                   </div>
// //                 </div>
// //                 <br />
// //                 <div style={{ paddingLeft: "200px" }}>Receipt Total anyamount</div>
// //                 <p align="center">Charges Inclusive of 7.5% VAT</p>
// //                 <p align="center">
// //                   {" "}
// //                   Thank you for shopping with us, Products purchased in good condition are not
// //                   returnable
// //                 </p>
// //                 <h4 align="center">Have a great day |||</h4>
// //               </>
// //             ) : (
// //               ""
// //             )}
// //           </div> */}
// //           {/* <div> */}
// //           {/* <table class="print-receipt"> */}
// //           {/* <Hello name="Reprinted" /> */}

// //           {/* <div align="center">
// //                         <button className="hide-on-print" onClick={this.printReceipt}>
// //                           Print
// //                         </button>
// //                       </div> */}
// //           {/* </div> */}
// //           {/* ); */}
// //         </Grid>
// //         <Grid>
// //           {/* <Container> */}
// //           {/* {Object.keys(amountx).map((c) => (
// //             <p>{salesTypex[c]}</p>
// //             // setdiots(c),
// //           ))} */}
// //           {/* cns */}
// //           <div className="row">
// //             {/* <div>{setppp(id)}</div> */}
// //             {counter.map((form, index) => {
// //               const amountxx = parseInt(form.pricePerUnit, 10) * parseInt(form.quantity, 10);
// //               const branchx = form.branchID;
// //               const totalAmountxx = parseInt(form.amount, 10) + parseInt(form.taxAmount, 10);
// //               console.log(totalAmountxx);
// //               console.log(form.amount);
// //               console.log(form.totalAmount);
// //               console.log(amountxx);
// //               console.log(form.taxAmount);
// //               // const ppq = Number(form.pricePerUnit);
// //               // const qty = Number(form.quantity);
// //               const taxAmoun = parseInt(form.taxAmount, 10);
// //               return (
// //                 <>
// //                   <div className="col-sm-2">
// //                     {/* <MDInput
// //       type="text"
// //       value={namex || ""}
// //       onChange={(e) => setName(e.target.value)}
// //       // onKeyUp={handleOnNameKeys}
// //       label="First Name"
// //       variant="standard"
// //       fullWidth
// //     /> */}
// //                     {/* <TextField
// //       id="outlined-error-helper-text"
// //       label="Error"
// //       // defaultValue="Hello World"
// //       // helperText="Incorrect entry."
// //     /> */}
// //                     <MDBox>
// //                       <Form.Select
// //                         value={form.salesID}
// //                         aria-label="Default select example"
// //                         name="salesID"
// //                         onChange={(event) => handleFormChange(event, index)}
// //                       >
// //                         <option value="">Sales Type</option>
// //                         <option value="1">Product</option>
// //                         <option value="2">Company Service</option>
// //                         <option value="3">Custom Sales</option>
// //                       </Form.Select>
// //                     </MDBox>

// //                     {/* <input onChange={(e) => setName(e.target.value)} value={namex || ""} type="text" /> */}
// //                   </div>
// //                   <div className="col-sm-1">
// //                     <MDBox>
// //                       <Form.Select
// //                         value={form.product}
// //                         aria-label="Default select example"
// //                         name="product"
// //                         onChange={(event) => handleFormChange(event, index)}
// //                       >
// //                         <option>Product</option>
// //                         {productx.map((apis) => (
// //                           <option key={apis.id} value={apis.name}>
// //                             {apis.name}
// //                           </option>
// //                         ))}
// //                       </Form.Select>
// //                     </MDBox>
// //                   </div>
// //                   <div className="col-sm-2">
// //                     <MDBox>
// //                       <Form.Select
// //                         value={branchx}
// //                         aria-label="Default select example"
// //                         name="branchID"
// //                         onChange={(event) => handleFormChange(event, index)}
// //                       >
// //                         <option>Branch</option>
// //                         {productBranx.map((apis) => (
// //                           <option key={apis.id} value={apis.id}>
// //                             {apis.name}
// //                           </option>
// //                         ))}
// //                       </Form.Select>
// //                     </MDBox>
// //                   </div>
// //                   <div className="col-sm-2">
// //                     {/* <TextField
// //       id="outlined-error-helper-text"
// //       label="First Name"
// //       // defaultValue="Hello World"
// //       // helperText="Incorrect entry."
// //     /> */}
// //                     <Box sx={{ minWidth: 120 }}>
// //                       <FormControl fullWidth>
// //                         <TextField
// //                           id="filled-number"
// //                           value={form.pricePerUnit}
// //                           label="Pice Per Quantity "
// //                           placeholder="Pice Per Quantity "
// //                           size="small"
// //                           name="pricePerUnit"
// //                           // key={c}
// //                           // className={index}
// //                           type="number"
// //                           onChange={(event) => handleFormChange(event, index)}
// //                           // onChange={(e) => setPPQuantity(e.target.value)}
// //                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}
// //                           required
// //                         />
// //                       </FormControl>
// //                     </Box>
// //                   </div>
// //                   <div className="col-sm-1">
// //                     <Box sx={{ minWidth: 100 }}>
// //                       <FormControl fullWidth>
// //                         <TextField
// //                           id="filled-number"
// //                           value={form.quantity}
// //                           label="Quantity "
// //                           placeholder="Quantity "
// //                           name="quantity"
// //                           // key={c}
// //                           // className={index}
// //                           type="number"
// //                           size="small"
// //                           onChange={(event) => handleFormChange(event, index)}
// //                           // onChange={(e) => setQuantity(e.target.value)}
// //                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}
// //                           required
// //                         />
// //                       </FormControl>
// //                     </Box>
// //                   </div>
// //                   <div className="col-sm-2">
// //                     <Box sx={{ minWidth: 120 }}>
// //                       <FormControl fullWidth>
// //                         <TextField
// //                           id="filled-number"
// //                           value={amountxx}
// //                           label="Amount "
// //                           placeholder="Amount "
// //                           name="Amount"
// //                           // key={c}
// //                           // className={index}
// //                           size="small"
// //                           type="number"
// //                           // onChange={handleOnSelect2}
// //                           // onChange={(e) => handleOnlastChange(e)}
// //                           // onKeyUp={(e) => setAmount(e.target.value)}
// //                           InputProps={{
// //                             readOnly: true,
// //                           }}
// //                         />
// //                       </FormControl>
// //                     </Box>
// //                   </div>
// //                   <div className="col-sm-1">
// //                     {/* <Box sx={{ minWidth: 100 }}>
// //                       <FormControl fullWidth>
// //                         <TextField
// //                           id="filled-number"
// //                           value={taxAmoun}
// //                           label="Tax Amount (NGN) "
// //                           placeholder="Tax Amount "
// //                           type="number"
// //                           name="taxAmount"
// //                           size="small"
// //                           onChange={(event) => handleFormChange(event, index)}
// //                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}
// //                           required
// //                         />
// //                       </FormControl>
// //                     </Box> */}
// //                     <Box sx={{ minWidth: 100 }}>
// //                       <FormControl fullWidth>
// //                         <TextField
// //                           id="filled-number"
// //                           value={taxAmoun}
// //                           label="Tax Amount (NGN) "
// //                           placeholder="Tax Amount "
// //                           size="small"
// //                           name="taxAmount"
// //                           // key={c}
// //                           // className={index}
// //                           type="number"
// //                           onChange={(event) => handleFormChange(event, index)}
// //                           // onChange={(e) => setPPQuantity(e.target.value)}
// //                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}
// //                           required
// //                         />
// //                       </FormControl>
// //                     </Box>
// //                   </div>
// //                   <div className="col-sm-1">
// //                     <Box sx={{ minWidth: 100 }}>
// //                       <FormControl fullWidth>
// //                         <TextField
// //                           id="filled-number"
// //                           value={totalAmountxx}
// //                           label="Total Amount "
// //                           placeholder="Total Amount "
// //                           type="number"
// //                           size="small"
// //                           name="totalAmount"
// //                           // onChange={(event) => handleFormChange(event, index)}
// //                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}
// //                           // required
// //                           InputProps={{
// //                             readOnly: true,
// //                           }}
// //                         />
// //                       </FormControl>
// //                     </Box>
// //                   </div>
// //                   <MDBox>
// //                     <IconButton
// //                       size="large"
// //                       aria-label="account of current user"
// //                       aria-controls="primary-search-account-menu"
// //                       aria-haspopup="true"
// //                       color="inherit"
// //                       onClick={() => removeFields(index)}
// //                     >
// //                       <CancelPresentationIcon sx={{ color: "#f96d02" }} />
// //                     </IconButton>
// //                   </MDBox>
// //                   {/* <div className="col-sm-2">
// //                     <Box sx={{ minWidth: 120 }}>
// //                       <FormControl fullWidth>
// //                         <TextField
// //                           id="filled-number"
// //                           value={amountxx}
// //                           label="Amount "
// //                           placeholder="Amount "
// //                           name="Amount"
// //                           // key={c}
// //                           // className={index}
// //                           size="small"
// //                           type="number"
// //                           // onChange={handleOnSelect2}
// //                           // onChange={(e) => handleOnlastChange(e)}
// //                           // onKeyUp={(e) => setAmount(e.target.value)}
// //                           InputProps={{
// //                             readOnly: true,
// //                           }}
// //                         />
// //                       </FormControl>
// //                     </Box>
// //                   </div> */}
// //                   <br />
// //                 </>
// //               );
// //             })}
// //             {/* {zoom.map((items) => (
// //               <>
// //                 <div className="col-sm-2">
// //                   <Box sx={{ minWidth: 120 }}>
// //                     <FormControl fullWidth>
// //                       <TextField
// //                         id="filled-number"
// //                         value={items}
// //                         label="Amount "
// //                         placeholder="Amount "
// //                         name="Amount"
// //                         // key={c}
// //                         // className={index}
// //                         size="small"
// //                         type="number"
// //                         // onChange={handleOnSelect2}
// //                         // onChange={(e) => handleOnlastChange(e)}
// //                         // onKeyUp={(e) => setAmount(e.target.value)}
// //                         InputProps={{
// //                           readOnly: true,
// //                         }}
// //                       />
// //                     </FormControl>
// //                   </Box>
// //                 </div>
// //                 <br />
// //               </>
// //             ))} */}

// //             {/* {zoom.map((items) => (
// //               <div className="col-sm-2">
// //                 <Box sx={{ minWidth: 120 }}>
// //                   <FormControl fullWidth>
// //                     <TextField
// //                       id="filled-number"
// //                       value={items}
// //                       label="Amount "
// //                       placeholder="Amount "
// //                       name="Amount"
// //                       // key={c}
// //                       // className={index}
// //                       size="small"
// //                       type="number"
// //                       // onChange={handleOnSelect2}
// //                       // onChange={(e) => handleOnlastChange(e)}
// //                       // onKeyUp={(e) => setAmount(e.target.value)}

// //                       InputProps={{
// //                         readOnly: true,
// //                       }}
// //                       // disabled
// //                     />
// //                   </FormControl>
// //                 </Box>
// //               </div>
// //             ))} */}
// //           </div>
// //           &nbsp; &nbsp;
// //           {/* </Container> */}
// //         </Grid>
// //         <MDBox>
// //           <Container>
// //             <div className="row">
// //               {/* <Box sx={{ minWidth: 120 }} style={{ paddingLeft: "930px", paddingTop: "40px" }}>
// //                   <FormControl fullWidth>
// //                     {/* <MDBox> */}
// //               {/* <TextField id="outlined-basic" label="Total Amount" variant="outlined" /> */}
// //               {/* </MDBox>
// //                   </FormControl>
// //                 </Box> */}

// //               <div className="col-sm-3">
// //                 <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
// //                   <FormControl fullWidth>
// //                     <TextField
// //                       id="filled-number"
// //                       value={bonusAmountxx}
// //                       label="Bonus Amount "
// //                       placeholder="Bonus Amount "
// //                       type="number"
// //                       onChange={(e) => setBonusAmount(e.target.value)}
// //                     />
// //                   </FormControl>
// //                 </Box>
// //               </div>
// //               <div className="col-sm-3" />
// //               <div className="col-sm-3">
// //                 <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
// //                   <FormControl fullWidth>
// //                     <TextField
// //                       id="filled-number"
// //                       value={subTotalAmountx}
// //                       label="Total Amount "
// //                       placeholder="Total Amount "
// //                       type="number"
// //                       // size="small"
// //                       name="totalAmount"
// //                       // onChange={(event) => handleFormChange(event, index)}
// //                       // onKeyUp={(e) => handleTaxAmount(e.target.value)}
// //                       // required
// //                       InputProps={{
// //                         readOnly: true,
// //                       }}
// //                     />
// //                   </FormControl>
// //                 </Box>
// //               </div>
// //             </div>
// //             {/* <div className="col-sm-6">
// //                 <Box sx={{ minWidth: 120 }} style={{ paddingRight: "930px", paddingTop: "20px" }}>
// //                   <FormControl fullWidth>
// //                     {/* <MDBox> */}
// //             {/* <TextField id="outlined-basic" label="Bonus Amount" variant="outlined" /> */}
// //             {/* </MDBox>
// //                   </FormControl>
// //                 </Box>
// //               </div> */}
// //           </Container>
// //         </MDBox>
// //         <br />
// //         {/* <div>
// //           <Card>
// //             <table>
// //               <tr>
// //                 <th>Sales Type</th>
// //                 <th>Branch</th>
// //                 <th>Price Per Unit (NGN)</th>
// //                 <th>Quantity</th>
// //                 <th>Amount (NGN)</th>
// //                 <th>Tax Amount</th>
// //                 <th>Bonus Amount (NGN)</th>
// //               </tr>
// //               {Array.from(Array(counter)).map(() => (
// //                 <tr style={{ backgroundColor: "#dddddd" }}>
// //                   {/* <td>{idx}</td>
// //                   <td>
// //                     <Box sx={{ minWidth: 120 }}>
// //                       <FormControl fullWidth>
// //                         <InputLabel id="demo-select-small">Sales Type</InputLabel>
// //                         <Select
// //                           labelId="demo-select-small"
// //                           id="demo-select-small"
// //                           // value={salesTypex || ""}
// //                           // key={c}
// //                           label="Age"
// //                           sx={{ minHeight: 40 }}
// //                           // fullWidth
// //                           onChange={handleOnChange}
// //                           // onChange={(e) => handleOnChange(e.target.value)}
// //                         >
// //                           <MenuItem value="1">Product</MenuItem>
// //                           <MenuItem value="2">Company Sales</MenuItem>
// //                           <MenuItem value="3">Custom Service</MenuItem>
// //                           {/* <MenuItem value="4">Thirty</MenuItem>
// //                         </Select>
// //                       </FormControl>
// //                     </Box>
// //                   </td>
// //                   <td>
// //                     <Box sx={{ minWidth: 120 }}>
// //                       <FormControl fullWidth>
// //                         <TextField
// //                           id="outlined-error-helper-text"
// //                           label="First Name"
// //                           size="small"
// //                           // defaultValue="Hello World"
// //                           // helperText="Incorrect entry."
// //                         />
// //                       </FormControl>
// //                     </Box>
// //                   </td>

// //                   <td>
// //                     <Box sx={{ minWidth: 120 }}>
// //                       <FormControl fullWidth>
// //                         <TextField
// //                           id="filled-number"
// //                           // value={pPQuantityx || ""}
// //                           label="Pice Per Quantity "
// //                           placeholder="Pice Per Quantity "
// //                           size="small"
// //                           // key={c}
// //                           // className={index}
// //                           type="number"
// //                           onChange={(e) => handleOnChange2(e.target.value)}
// //                           // onChange={(e) => setPPQuantity(e.target.value)}
// //                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}

// //                           required
// //                         />
// //                       </FormControl>
// //                     </Box>
// //                   </td>
// //                   <td>
// //                     <Box sx={{ minWidth: 100 }}>
// //                       <FormControl fullWidth>
// //                         <TextField
// //                           id="filled-number"
// //                           // value={quantityx || ""}
// //                           label="Quantity "
// //                           placeholder="Quantity "
// //                           // key={c}
// //                           // className={index}
// //                           type="number"
// //                           size="small"
// //                           onChange={handleOnChange3}
// //                           // onChange={(e) => setQuantity(e.target.value)}
// //                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}

// //                           required
// //                         />
// //                       </FormControl>
// //                     </Box>
// //                   </td>
// //                   <td>
// //                     <Box sx={{ minWidth: 120 }}>
// //                       <FormControl fullWidth>
// //                         <TextField
// //                           id="filled-number"
// //                           // value={amountx || ""}
// //                           label="Amount "
// //                           placeholder="Amount "
// //                           // key={c}
// //                           // className={index}
// //                           size="small"
// //                           type="number"
// //                           // onChange={(e) => handleOnChange4(e.target.value)}
// //                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}

// //                           InputProps={{
// //                             readOnly: true,
// //                           }}
// //                           // disabled
// //                         />
// //                       </FormControl>
// //                     </Box>
// //                   </td>
// //                   <td>
// //                     <Box sx={{ minWidth: 100 }}>
// //                       <FormControl fullWidth>
// //                         <TextField
// //                           id="filled-number"
// //                           value={taxAmountx || ""}
// //                           label="Tax Amount (NGN) "
// //                           placeholder="Tax Amount "
// //                           type="number"
// //                           size="small"
// //                           onChange={(e) => setTaxAmount(e.target.value)}
// //                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}

// //                           required
// //                         />
// //                       </FormControl>
// //                     </Box>
// //                   </td>
// //                   <td>
// //                     <Box sx={{ minWidth: 120 }}>
// //                       <FormControl fullWidth>
// //                         <TextField
// //                           id="filled-number"
// //                           value={taxAmountx || ""}
// //                           label="Bonus Amount "
// //                           placeholder="Bonus Amount "
// //                           type="number"
// //                           size="small"
// //                           onChange={(e) => setTaxAmount(e.target.value)}
// //                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}

// //                           required
// //                         />
// //                       </FormControl>
// //                     </Box>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </table>
// //           </Card>
// //         </div> */}
// //         <div>
// //           {/* <table>
// //             <thead>
// //               <tr>
// //                 <th>Item</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               <tr>
// //                 <input />
// //               </tr>
// //               <tr>
// //                 <input />
// //               </tr>
// //             </tbody>
// //           </table> */}
// //           {/* <table>
// //             <tr>
// //               <th>Company</th>
// //               <th>Contact</th>
// //               <th>Country</th>
// //             </tr>
// //             <tr>
// //               <td>
// //                 <input />
// //               </td>
// //               <td>
// //                 <input />
// //               </td>

// //               <td>
// //                 <input />
// //               </td>
// //             </tr>
// //             <input />
// //             <tr>
// //               <td>
// //                 <input />
// //               </td>
// //               <td>
// //                 <input />
// //               </td>
// //               <td>
// //                 <input />
// //               </td>
// //             </tr>
// //             <tr>
// //               <td>
// //                 <input />
// //               </td>
// //               <td>
// //                 <input />
// //               </td>
// //               <td>
// //                 <input />
// //               </td>
// //             </tr>
// //             <tr>
// //               <td>
// //                 <input />
// //               </td>
// //               <td>
// //                 <input />
// //               </td>
// //               <td>
// //                 <input />
// //               </td>
// //             </tr>
// //             <tr>
// //               <td>
// //                 <input />
// //               </td>
// //               <td>
// //                 <input />
// //               </td>
// //               <td>
// //                 <input />
// //               </td>
// //             </tr>
// //             <tr>
// //               <td>
// //                 <input />
// //               </td>
// //               <td>
// //                 <input />
// //               </td>
// //               <td>Italy</td>
// //             </tr>
// //           </table> */}
// //         </div>
// //         &nbsp; &nbsp;
// //         <MDBox style={{ paddingLeft: "30px" }}>
// //           <Container>
// //             <div className="row">
// //               <div className="col-sm-12">
// //                 <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
// //                   <Form.Label style={{ fontSize: 14 }}>Comment</Form.Label>
// //                   <Form.Control
// //                     as="textarea"
// //                     value={commentx || ""}
// //                     onKeyUp={handleOnPortfolioKeys}
// //                     onChange={(e) => setComment(e.target.value)}
// //                     rows={2}
// //                   />
// //                 </Form.Group>

// //                 {/* <i style={{ fontSize: "11px", color: "gray" }}>optional</i> */}
// //               </div>
// //             </div>
// //           </Container>
// //         </MDBox>
// //         <br />
// //         &nbsp; &nbsp;
// //         <MDBox>
// //           {showPayment ? (
// //             <Container>
// //               <div className="row">
// //                 <div className="col-sm-3">
// //                   <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
// //                     <FormControl fullWidth>
// //                       <MDTypography
// //                         variant="button"
// //                         color="info"
// //                         fontWeight="medium"
// //                         style={Styles.textSx}
// //                       >
// //                         Cash Payment:
// //                       </MDTypography>
// //                       {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
// //                       <label htmlFor="filled-number"> Cash Payment: </label>
// //                       <TextField
// //                         id="filled-number"
// //                         value={cashPaymentx}
// //                         label="Amount"
// //                         placeholder="Amount"
// //                         type="number"
// //                         onChange={(e) => setCashPayment(e.target.value)}
// //                       />
// //                     </FormControl>
// //                   </Box>
// //                 </div>
// //               </div>
// //               <div className="row">
// //                 <div className="col-sm-3">
// //                   <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
// //                     <FormControl fullWidth>
// //                       <MDTypography
// //                         variant="button"
// //                         color="info"
// //                         fontWeight="medium"
// //                         style={Styles.textSx}
// //                       >
// //                         Transfer Payment:
// //                       </MDTypography>
// //                       {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
// //                       <label htmlFor="filled-number"> Transfer Payment: </label>
// //                       <TextField
// //                         id="filled-number"
// //                         value={transferPaymentx}
// //                         label="Amount"
// //                         placeholder="Amount"
// //                         type="number"
// //                         onChange={(e) => setTransferPayment(e.target.value)}
// //                       />
// //                     </FormControl>
// //                   </Box>
// //                 </div>
// //               </div>
// //               <div className="row">
// //                 <div className="col-sm-3">
// //                   <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
// //                     <MDTypography
// //                       variant="button"
// //                       color="info"
// //                       fontWeight="medium"
// //                       style={Styles.textSx}
// //                     >
// //                       Card Payment:
// //                     </MDTypography>
// //                     <FormControl fullWidth>
// //                       {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
// //                       <label htmlFor="filled-number"> Card Payment: </label>
// //                       <TextField
// //                         id="filled-number"
// //                         value={cardPaymentx}
// //                         label="Amount"
// //                         placeholder="Amount"
// //                         type="number"
// //                         onChange={(e) => setCardPayment(e.target.value)}
// //                       />
// //                     </FormControl>
// //                     <MDBox mt={4} mb={1}>
// //                       <div>
// //                         <MonnifyConsumer {...monNey} className="btn">
// //                           {({ initializePayment }) => (
// //                             // eslint-disable-next-line react/button-has-type
// //                             <MDButton
// //                               variant="gradient"
// //                               onClick={() => initializePayment()}
// //                               color="info"
// //                               width="50%"
// //                             >
// //                               Pay
// //                             </MDButton>
// //                           )}
// //                         </MonnifyConsumer>
// //                       </div>
// //                     </MDBox>
// //                   </Box>
// //                 </div>
// //               </div>
// //             </Container>
// //           ) : (
// //             <></>
// //           )}

// //           <MDBox style={{ paddingTop: "40px", paddingLeft: "400px" }}>
// //             <Container>
// //               <div className="row">
// //                 <div className="col-sm-3">
// //                   <Box sx={{ minWidth: 120 }}>
// //                     <FormControl fullWidth>
// //                       <TextField
// //                         id="filled-number"
// //                         value={Payment}
// //                         label="Balance "
// //                         placeholder="Balance"
// //                         type="number"
// //                         // size="small"
// //                         name="balance"
// //                         // onChange={(event) => handleFormChange(event, index)}
// //                         // onKeyUp={(e) => handleTaxAmount(e.target.value)}
// //                         // required
// //                         InputProps={{
// //                           readOnly: true,
// //                         }}
// //                       />
// //                     </FormControl>
// //                   </Box>
// //                 </div>
// //               </div>
// //             </Container>
// //           </MDBox>
// //         </MDBox>
// //         <MDBox mt={4} mb={1}>
// //           <MDButton
// //             variant="gradient"
// //             onClick={Pay}
// //             style={Styles.buttonSx}
// //             width="50%"
// //             align="left"
// //           >
// //             Pay
// //           </MDButton>
// //         </MDBox>
// //         <MDBox mt={4} mb={1} align="center">
// //           <MDButton
// //             variant="gradient"
// //             onClick={handleValidate2}
// //             style={Styles.buttonSx}
// //             width="50%"
// //             align="left"
// //           >
// //             Print
// //           </MDButton>
// //         </MDBox>
// //         {/* <Grid>
// //           <Grid>
// //             <li className="list-group-item" item xs={8}>
// //               machala
// //             </li>
// //             <li className="list-group-item" item xs={4}>
// //               machala2
// //             </li>
// //           </Grid>
// //         </Grid> */}
// //       </Card>
// //       <div>
// //         <Modal
// //           open={open}
// //           onClose={handleClose}
// //           aria-labelledby="modal-modal-title"
// //           aria-describedby="modal-modal-description"
// //         >
// //           <Box sx={modalStyle}>
// //             <Grid>
// //               <Grid
// //                 item
// //                 xs={6}
// //                 md={6}
// //                 // style={{ backgroundColor: "ButtonFace", minHeight: "550px" }}
// //               >
// //                 {" "}
// //                 <HighlightOffIcon
// //                   onClick={handleClose}
// //                   fontSize="large"
// //                   style={{
// //                     padding: "5px",
// //                     color: "red",
// //                     float: "right",
// //                     cursor: "pointer",
// //                   }}
// //                 />
// //                 {/* <SubTaskComment subTaskId={taskId} /> */}
// //                 <MDBox>
// //                   <MDBox component="form" role="form">
// //                     {/* <SidenavCollapse */}
// //                     <MDBox
// //                       variant="gradient"
// //                       // bgColor="info"
// //                       borderRadius="lg"
// //                       coloredShadow="success"
// //                       mx={0}
// //                       mt={0}
// //                       p={3}
// //                       mb={1}
// //                       textAlign="center"
// //                       style={Styles.boxSx}
// //                     >
// //                       <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
// //                         Add New Individual
// //                       </MDTypography>
// //                     </MDBox>
// //                     <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
// //                       <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
// //                         {" "}
// //                       </MDTypography>
// //                       <MDTypography variant="gradient" fontSize="60%" color="error" id="email">
// //                         {" "}
// //                       </MDTypography>
// //                       <MDBox mb={0}>
// //                         <Container>
// //                           <div className="row">
// //                             <div className="col-sm-6">
// //                               <MDInput
// //                                 type="text"
// //                                 value={namex || ""}
// //                                 onChange={(e) => setName(e.target.value)}
// //                                 onKeyUp={handleOnNameKeys}
// //                                 label="First Name"
// //                                 variant="standard"
// //                                 fullWidth
// //                               />
// //                             </div>
// //                             <div className="col-sm-6">
// //                               <MDInput
// //                                 type="text"
// //                                 value={lnamex || ""}
// //                                 onChange={(e) => setLnamex(e.target.value)}
// //                                 // onKeyUp={handleOnNameKeys}
// //                                 label="Last Name"
// //                                 variant="standard"
// //                                 fullWidth
// //                               />
// //                             </div>
// //                           </div>
// //                           &nbsp; &nbsp;
// //                           <div className="row">
// //                             <div className="col-sm-10">
// //                               <MDTypography
// //                                 variant="button"
// //                                 fontWeight="regular"
// //                                 fontSize="80%"
// //                                 textAlign="center"
// //                                 color="text"
// //                               >
// //                                 Title
// //                               </MDTypography>
// //                               <Form.Select
// //                                 value={titlex}
// //                                 onChange={(e) => setTitle(e.target.value)}
// //                                 aria-label="Default select example"
// //                               >
// //                                 <option value="">--Select Title--</option>
// //                                 <option value="Bishop">Bishop</option>
// //                                 <option value="Chancellor">Chancellor</option>
// //                                 <option value="Comrade">Comrade</option>
// //                                 <option value="Doctor">Doctor</option>
// //                                 <option value="Engineer">Engineer</option>
// //                                 <option value="Excellency">Excellency</option>
// //                                 <option value="Honorable">Honorable</option>
// //                                 <option value="Imam">Imam</option>
// //                                 <option value="Master">Master</option>
// //                                 <option value="Miss">Miss</option>
// //                                 <option value="Mr">Mr</option>
// //                                 <option value="Mrs">Mrs</option>
// //                                 <option value="Reverend">Reverend</option>
// //                                 <option value="Pastor">Pastor</option>
// //                                 <option value="Professor">Professor</option>
// //                                 <option value="Pope">Pope</option>
// //                                 <option value="Vice-Chancellor">Vice-Chancellor</option>
// //                                 <option value="Other">Others...</option>
// //                               </Form.Select>
// //                             </div>
// //                           </div>
// //                           <div className="row">
// //                             <div className="col-sm-6">
// //                               <MDInput
// //                                 type="text"
// //                                 value={emailx || ""}
// //                                 onChange={(e) => setEmail(e.target.value)}
// //                                 onKeyUp={handleOnEmailKeys}
// //                                 label="Email"
// //                                 variant="standard"
// //                                 fullWidth
// //                               />

// //                               {/* <i style={{ fontSize: "11px", color: "gray" }}>optional</i> */}
// //                             </div>

// //                             <div className="col-sm-6">
// //                               <MDTypography variant="button" fontWeight="regular" color="text">
// //                                 Phone Number
// //                               </MDTypography>
// //                               <PhoneInput
// //                                 value={pnox}
// //                                 inputStyle={{ width: "100%" }}
// //                                 buttonStyle={{}}
// //                                 onChange={setPno}
// //                               />

// //                               {/* <i style={{ fontSize: "11px", color: "gray" }}>optional</i> */}
// //                             </div>
// //                           </div>
// //                         </Container>
// //                       </MDBox>
// //                     </MDBox>
// //                     {/* <MDBox>
// //                       <Container>
// //                         <div className="row">
// //                           <div className="col-sm-10">
// //                             <MDBox textAlign="center">
// //                               <MDTypography
// //                                 variant="button"
// //                                 fontWeight="regular"
// //                                 fontSize="80%"
// //                                 textAlign="center"
// //                                 color="text"
// //                               >
// //                                 Title
// //                               </MDTypography>
// //                               <Form.Select
// //                                 value={titlex}
// //                                 onChange={(e) => setTitle(e.target.value)}
// //                                 aria-label="Default select example"
// //                               >
// //                                 <option value="">--Select Title--</option>
// //                                 <option value="Bishop">Bishop</option>
// //                                 <option value="Chancellor">Chancellor</option>
// //                                 <option value="Comrade">Comrade</option>
// //                                 <option value="Doctor">Doctor</option>
// //                                 <option value="Engineer">Engineer</option>
// //                                 <option value="Excellency">Excellency</option>
// //                                 <option value="Honorable">Honorable</option>
// //                                 <option value="Imam">Imam</option>
// //                                 <option value="Master">Master</option>
// //                                 <option value="Miss">Miss</option>
// //                                 <option value="Mr">Mr</option>
// //                                 <option value="Mrs">Mrs</option>
// //                                 <option value="Reverend">Reverend</option>
// //                                 <option value="Pastor">Pastor</option>
// //                                 <option value="Professor">Professor</option>
// //                                 <option value="Pope">Pope</option>
// //                                 <option value="Vice-Chancellor">Vice-Chancellor</option>
// //                                 <option value="Other">Others...</option>
// //                               </Form.Select>
// //                             </MDBox>
// //                           </div>
// //                         </div>
// //                       </Container>
// //                     </MDBox> */}
// //                     <MDBox mt={4} mb={1}>
// //                       <MDButton
// //                         variant="gradient"
// //                         onClick={handleValidate}
// //                         // color="info"
// //                         style={Styles.buttonSx}
// //                         width="50%"
// //                         align="left"
// //                       >
// //                         Save
// //                       </MDButton>
// //                     </MDBox>
// //                   </MDBox>
// //                 </MDBox>
// //               </Grid>
// //               {/* <MDTypography>Trying to create a modal</MDTypography> */}
// //             </Grid>
// //           </Box>
// //         </Modal>
// //       </div>
// //       {/* {craze ? (
// //         <Card />
// //       ) : (
// //         <MDBox>
// //           <MDBox component="form" role="form">
// //           <SidenavCollapse
// //             <MDBox mb={0}>
// //               <Container>
// //                 <div className="row">
// //                   <div className="col-sm-6">
// //                     <MDInput
// //                       type="text"
// //                       value={namex || ""}
// //                       onChange={(e) => setName(e.target.value)}
// //                       onKeyUp={handleOnNameKeys}
// //                       label="First Name"
// //                       variant="standard"
// //                       fullWidth
// //                     />
// //                   </div>
// //                   <div className="col-sm-6">
// //                     <MDInput
// //                       type="text"
// //                       value={lnamex || ""}
// //                       onChange={(e) => setLnamex(e.target.value)}
// //                       onKeyUp={handleOnNameKeys}
// //                       label="Last Name"
// //                       variant="standard"
// //                       fullWidth
// //                     />
// //                   </div>
// //                   {/* <div className="col-sm-6">
// //                     <MDInput
// //                       type="text"
// //                       value={onamex || ""}
// //                       onChange={(e) => setOnamex(e.target.value)}
// //                       onKeyUp={handleOnNameKeys}
// //                       label="Other Name"
// //                       variant="standard"
// //                       fullWidth
// //                     />
// //                     <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// //                   </div>
// //                 </div>
// //                 <br />
// //                 {/* <div className="row">
// //                   <div className="col-sm-10">
// //                     <MDBox textAlign="center">
// //                       <MDTypography
// //                         variant="button"
// //                         fontWeight="regular"
// //                         fontSize="80%"
// //                         textAlign="center"
// //                         color="text"
// //                       >
// //                         Title
// //                       </MDTypography>
// //                       <Form.Select
// //                         value={titlex}
// //                         onChange={(e) => setTitlex(e.target.value)}
// //                         aria-label="Default select example"
// //                       >
// //                         <option value="">--Select Title--</option>
// //                         <option value="Bishop">Bishop</option>
// //                         <option value="Chancellor">Chancellor</option>
// //                         <option value="Comrade">Comrade</option>
// //                         <option value="Doctor">Doctor</option>
// //                         <option value="Engineer">Engineer</option>
// //                         <option value="Excellency">Excellency</option>
// //                         <option value="Honorable">Honorable</option>
// //                         <option value="Imam">Imam</option>
// //                         <option value="Master">Master</option>
// //                         <option value="Miss">Miss</option>
// //                         <option value="Mr">Mr</option>
// //                         <option value="Mrs">Mrs</option>
// //                         <option value="Reverend">Reverend</option>
// //                         <option value="Pastor">Pastor</option>
// //                         <option value="Professor">Professor</option>
// //                         <option value="Pope">Pope</option>
// //                         <option value="Vice-Chancellor">Vice-Chancellor</option>
// //                         <option value="Other">Others...</option>
// //                       </Form.Select>
// //                     </MDBox>
// //                   </div>
// //                 </div> */}
// //       <br />
// //       {/* <div className="row">
// //                   <div className="col-sm-6">
// //                     <MDInput
// //                       type="text"
// //                       value={streetx || ""}
// //                       onChange={(e) => setStreet(e.target.value)}
// //                       label="Street"
// //                       variant="standard"
// //                       fullWidth
// //                     />

// //                     <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// //                   </div>
// //                   <div className="col-sm-6">
// //                     <MDInput
// //                       type="text"
// //                       value={cityx || ""}
// //                       onChange={(e) => setCity(e.target.value)}
// //                       onKeyUp={handleOnCityKeys}
// //                       label="City"
// //                       variant="standard"
// //                       fullWidth
// //                     />

// //                     <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// //                   </div>
// //                   <div className="row">
// //                     <div className="col-sm-6">
// //                       <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
// //                         Country
// //                       </MDTypography>
// //                       <MDBox textAlign="right">
// //                         <Form.Select
// //                           value={residentialCountryx || ""}
// //                           aria-label="Default select example"
// //                           onChange={handleOnChangeRCCountry}
// //                         >
// //                           <option>--Select Country--</option>
// //                           {AlCountry.map((apic) => (
// //                             <option key={apic.code3} value={apic.name}>
// //                               {apic.name}
// //                             </option>
// //                           ))}
// //                         </Form.Select>
// //                       </MDBox>

// //                       <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// //                     </div>
// //                     <div className="col-sm-6">
// //                       <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
// //                         State
// //                       </MDTypography>
// //                       <MDBox textAlign="right">
// //                         <Form.Select
// //                           value={residentialStatex || ""}
// //                           aria-label="Default select example"
// //                           onChange={handleOnChangeRCState}
// //                         >
// //                           <option>--Select State--</option>
// //                           {allStates.map((apis) => (
// //                             <option key={apis.code} value={apis.name}>
// //                               {apis.name}
// //                             </option>
// //                           ))}
// //                         </Form.Select>
// //                       </MDBox>

// //                       <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </Container>
// //             </MDBox>
// //             <br />
// //             <MDBox>
// //               <Container>
// //                 <div className="row">
// //                   <div className="col-sm-6">
// //                     <MDInput
// //                       type="text"
// //                       value={emailx || ""}
// //                       onChange={(e) => setEmail(e.target.value)}
// //                       onKeyUp={handleOnEmailKeys}
// //                       label="Email"
// //                       variant="standard"
// //                       fullWidth
// //                     />

// //                     <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// //                   </div>

// //                   <div className="col-sm-6">
// //                     <MDTypography variant="button" fontWeight="regular" color="text">
// //                       Phone Number
// //                     </MDTypography>
// //                     <PhoneInput
// //                       value={pnox}
// //                       inputStyle={{ width: "100%" }}
// //                       buttonStyle={{}}
// //                       onChange={setPno}
// //                     />

// //                     <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// //                   </div>
// //                 </div>
// //                 <br />
// //                 {/* <MDBox textAlign="center">
// //                   <MDTypography variant="h4" fontWeight="medium" fontSize="55%">
// //                     Date Of Birth
// //                   </MDTypography>
// //                   <DatePicker
// //                     date={startDate}
// //                     wrapperClassName="date-picker"
// //                     placeholder="Select Birth Date"
// //                     dateFormat="MM/dd/yyyy"
// //                     confirmBtnText="Confirm"
// //                     showCancelButton="true"
// //                     customStyles={{
// //                       placeholderText: {
// //                         fontSize: 5,
// //                       },
// //                       dateIcon: {
// //                         height: 0,
// //                         width: 0,
// //                       },
// //                       dateText: {
// //                         color: "#b3b4b5",
// //                         fontSize: 16,
// //                       },
// //                       dateInput: {
// //                         borderWidth: 0,
// //                       },
// //                     }}
// //                     selected={startDate}
// //                     onChange={(date) => setStartDate(date)}
// //                     peekNextMonth
// //                     showMonthDropdown
// //                     showYearDropdown
// //                     dropdownMode="select"
// //                   />
// //                   <br />
// //                   <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// //                 </MDBox>
// //               </Container>
// //             </MDBox>
// //             <br />
// //             <MDBox textAlign="center" align="center">
// //               <Container>
// //                 <div className="row">
// //                   <MDBox mt={4}>
// //                     <MDBox textAlign="center">
// //                       <MDTypography
// //                         variant="button"
// //                         fontWeight="regular"
// //                         fontSize="80%"
// //                         textAlign="center"
// //                         color="text"
// //                       >
// //                         Marital Status
// //                       </MDTypography>
// //                       <Form.Select
// //                         value={maritalx}
// //                         onChange={(e) => setMaritalx(e.target.value)}
// //                         aria-label="Default select example"
// //                       >
// //                         <option value="">Select Marital Status</option>
// //                         <option value="Single">Single</option>
// //                         <option value="Married">Married</option>
// //                         <option value="Divorced">Divorced</option>
// //                         <option value="Widowed">Widowed</option>
// //                       </Form.Select>
// //                     </MDBox>
// //                   </MDBox>

// //                   <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// //                 </div>
// //               </Container>
// //               <Container>
// //                 <div className="row">
// //                   <MDBox mt={4}>
// //                     <MDBox textAlign="center">
// //                       <MDTypography
// //                         variant="button"
// //                         fontWeight="regular"
// //                         fontSize="80%"
// //                         textAlign="center"
// //                         color="text"
// //                       >
// //                         Account Owner
// //                       </MDTypography>
// //                       <Form.Select
// //                         value={duty}
// //                         onChange={(e) => setDutyRelieverx(e.target.value)}
// //                         aria-label="Default select example"
// //                       >
// //                         <option value="">Select Account Owner</option>
// //                         {user.map((api) => (
// //                           <option key={api.personal.id} value={api.personal.id}>
// //                             {api.personal.fname} {api.personal.lname}
// //                           </option>
// //                         ))}
// //                       </Form.Select>
// //                     </MDBox>
// //                   </MDBox>
// //                 </div>
// //               </Container>
// //               <br />
// //               {/* <Container>
// //                 <div className="row">
// //                   <MDTypography
// //                     variant="button"
// //                     fontWeight="regular"
// //                     fontSize="80%"
// //                     textAlign="center"
// //                     color="text"
// //                   >
// //                     Corporate Name
// //                   </MDTypography>
// //                   <Select options={options} onChange={handleChanges} styles={customStyles} />
// //                   <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
// //                 </div>
// //               </Container>
// //             </MDBox>
// //             <MDBox mt={4} mb={1} textAlign="center">
// //               <MDButton variant="gradient" onClick={handleClick} color="info" width="50%">
// //                 Save
// //               </MDButton>
// //             </MDBox>
// //           </MDBox>
// //         </MDBox>
// //       )} */}
// //       <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
// //         <CircularProgress color="info" />
// //       </Backdrop>
// //     </DashboardLayout>
// //   );
// // }
// // export default Sales;

// /* eslint-disable no-eval */
// /* eslint-disable no-lone-blocks */
// /* eslint-disable react/no-this-in-sfc */
// import React, { useEffect, useState, useRef } from "react";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";
// import Card from "@mui/material/Card";
// import { Container, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import MDTypography from "components/MDTypography";
// import PHeaders from "postHeader";
// import GHeaders from "getHeader";
// import Styles from "styles";
// import TextField from "@mui/material/TextField";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Modal from "@mui/material/Modal";
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import { IconButton } from "@mui/material";
// import FormControl from "@mui/material/FormControl";
// import Add from "@mui/icons-material/Add";
// import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
// import { useReactToPrint } from "react-to-print";
// import { MonnifyConsumer } from "react-monnify";
// import PhoneInput from "react-phone-input-2";
// // import houseOfTara from "./HouseOfTara.jpg";
// // import "./Force.css";
// // zinoleesky wrote this part of d code called sales
// // incase another Printing {https://stackblitz.com/edit/react-print-receipt?file=index.js}

// function Sales() {
//   const MySwal = withReactContent(Swal);
//   const { allPHeaders: myHeaders } = PHeaders();
//   const { allGHeaders: miHeaders } = GHeaders();

//   const [individualx, setIndividual] = useState([]);
//   const [indix, setIndi] = useState("");
//   const [namex, setName] = useState("");
//   const [lnamex, setLnamex] = useState("");
//   const [titlex, setTitle] = useState("");

//   const [checkedName, setCheckedName] = useState("");
//   const [user, setUser] = useState([]);
//   const [commentx, setComment] = useState("");

//   const [emailx, setEmail] = useState("");
//   const currencyx = "NGN";
//   const [pnox, setPno] = useState("");
//   const [indiName, setIndiName] = useState("");
//   const [referenceSKey, setReferenceSKey] = useState();
//   const [listenn, setListenn] = useState(false);

//   const navigate = useNavigate();
//   const [opened, setOpened] = useState(false);
//   const [open, setOpen] = useState(false);
//   const handleClose = () => setOpen(false);
//   const [productx, setProduct] = useState([]);
//   const [productBranx, setProductBran] = useState([]);
//   const [bonusAmountxx, setBonusAmount] = useState("");
//   const [subTotalAmountx, setSubTotalAmount] = useState([]);
//   const [allTax, setAllTax] = useState("");
//   const [cashPaymentx, setCashPayment] = useState("");
//   const [cardPaymentx, setCardPayment] = useState("");
//   const [transferPaymentx, setTransferPayment] = useState("");
//   const [showPayment, setShowPayment] = useState(false);
//   const [showPrint, setShowPrint] = useState(false);
//   const [cashierx, setCashier] = useState([]);
//   const [checkedEmail, setCheckedEmail] = useState("");
//   const [checkedPortfolio, setCheckedPortfolio] = useState("");
//   const [servicex, setService] = useState([]);
//   const [showClients, setShowClients] = useState(false);
//   const onBeforeGetContentResolve = useRef();
//   <style type="text/css" media="print">
//     {"\
//   @page{ size: portrait; } \
//   "}
//   </style>;

//   const [counter, setCounter] = useState([
//     {
//       saleType: Number(""),
//       salesID: "",
//       branchID: "",
//       pricePerUnit: Number(""),
//       quantity: Number(""),
//       amount: Number(""),
//       taxAmount: Number(""),
//       totalAmount: Number(""),
//     },
//   ]);
//   console.log(user);

//   useEffect(() => {
//     const data11 = JSON.parse(localStorage.getItem("user1"));

//     const orgIDs = data11.orgID;
//     const headers = miHeaders;
//     let isMounted = true;
//     fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/gets/${orgIDs}`, { headers })
//       .then(async (res) => {
//         const aToken = res.headers.get("token-1");
//         localStorage.setItem("rexxdex", aToken);
//         return res.json();
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
//         if (isMounted) {
//           setIndividual(result);
//         }
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {
//     const headers = miHeaders;

//     const data11 = JSON.parse(localStorage.getItem("user1"));

//     const orgIDs = data11.orgID;
//     let isMounted = true;
//     fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
//       .then(async (res) => {
//         const aToken = res.headers.get("token-1");
//         localStorage.setItem("rexxdex", aToken);
//         return res.json();
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
//         if (isMounted) {
//           setUser(result);
//           setOpened(false);
//         }
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);
//   const modalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     bgcolor: "#ffffff",
//     border: "3px solid #5F9DF7",
//     borderRadius: 5,
//     boxShadow: 24,
//     p: 4,
//     overflow: "auto",
//     height: "55%",
//     display: "flex",
//     "&::-webkit-scrollbar": {
//       width: 40,
//     },
//     "&::-webkit-scrollbar-track": {
//       backgroundColor: "white",
//     },
//     "&::-webkit-scrollbar-thumb": {
//       backgroundColor: "#f5f5f5",
//       borderRadius: 10,
//     },
//   };

//   useEffect(() => {
//     const data11 = JSON.parse(localStorage.getItem("user1"));

//     const orgIDs = data11.orgID;
//     const headers = miHeaders;
//     let isMounted = true;
//     fetch(`${process.env.REACT_APP_KUBU_URL}/branch/gets/${orgIDs}`, { headers })
//       .then(async (res) => {
//         const aToken = res.headers.get("token-1");
//         localStorage.setItem("rexxdex", aToken);
//         return res.json();
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
//         if (isMounted) {
//           setProductBran(result);
//         }
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const TOTAL = eval(subTotalAmountx + allTax - bonusAmountxx);

//   const handleOnNameKeys = () => {
//     const letters = /^[a-zA-Z ]+$/;
//     if (!namex.match(letters)) {
//       setCheckedName(false);
//       // eslint-disable-next-line no-unused-expressions
//       document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
//     }
//     if (namex.match(letters)) {
//       setCheckedName(true);
//       // eslint-disable-next-line no-unused-expressions
//       document.getElementById("name").innerHTML = "";
//     }
//     if (namex.length === 0) {
//       // eslint-disable-next-line no-unused-expressions
//       document.getElementById("name").innerHTML = "Name is required<br>";
//     }
//     // setEnabled(checkedName === true);
//   };
//   const handleOnEmailKeys = (value) => {
//     const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
//     const nylon = value.target.value.toString();
//     if (!nylon.match(letters)) {
//       setCheckedEmail(false);
//       // eslint-disable-next-line no-unused-expressions
//       document.getElementById("email").innerHTML = "Email - input a valid email<br>";
//     }
//     if (nylon.match(letters)) {
//       setCheckedEmail(true);
//       // eslint-disable-next-line no-unused-expressions
//       document.getElementById("email").innerHTML = "";
//     }
//     if (nylon.length === 0) {
//       setCheckedEmail(false);
//       // eslint-disable-next-line no-unused-expressions
//       document.getElementById("email").innerHTML = "Email is required<br>";
//     }
//   };
//   const openModal = () => {
//     setOpen(true);
//   };

//   const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//   }));

//   const handleIndividual = (e) => {
//     if (pnox !== "") {
//       setOpened(true);
//       e.preventDefault();
//       // handleClose();

//       const data11 = JSON.parse(localStorage.getItem("user1"));
//       const orgIDs = data11.orgID;
//       const personalIDs = data11.personalID;
//       const raw = JSON.stringify([
//         {
//           orgID: orgIDs,
//           fname: namex,
//           lname: lnamex,
//           title: titlex,
//           createdBy: personalIDs,
//           accountOwnerID: personalIDs,
//         },
//       ]);
//       const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow",
//       };
//       fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/add`, requestOptions)
//         .then(async (res) => {
//           const aToken = res.headers.get("token-1");
//           localStorage.setItem("rexxdex", aToken);
//           return res.json();
//         })
//         .then((result) => {
//           if (result.message === "Expired Access") {
//             navigate("/authentication/sign-in");
//             window.location.reload();
//           }
//           if (result.message === "Token Does Not Exist") {
//             navigate("/authentication/sign-in");
//             window.location.reload();
//           }
//           if (result.message === "Unauthorized Access") {
//             navigate("/authentication/forbiddenPage");
//             window.location.reload();
//           }
//           setOpened(false);
//           handleClose();
//           MySwal.fire({
//             title: result.status,
//             type: "success",
//             text: result.message,
//           }).then(() => {
//             window.location.reload();
//           });
//         })
//         .catch((error) => {
//           setOpened(false);
//           MySwal.fire({
//             title: error.status,
//             type: "error",
//             text: error.message,
//           });
//         });
//     } else {
//       alert("Please fill the required input(s)");
//     }
//   };

//   // eslint-disable-next-line consistent-return
//   const handleChangeProdServ = (value) => {
//     const chnageToString = value.toString();
//     if (chnageToString === "1") {
//       setShowClients(true);
//     } else if (chnageToString === "2") {
//       setShowClients(false);
//     }
//     if (chnageToString === "1") {
//       setOpened(true);
//       const headers = miHeaders;
//       let isMounted = true;
//       const data11 = JSON.parse(localStorage.getItem("user1"));
//       const orgIDs = data11.orgID;

//       fetch(`${process.env.REACT_APP_LOUGA_URL}/products/gets/${orgIDs}`, { headers })
//         .then(async (res) => {
//           const aToken = res.headers.get("token-1");
//           localStorage.setItem("rexxdex", aToken);
//           return res.json();
//         })
//         .then((result) => {
//           setOpened(false);
//           if (result.message === "Expired Access") {
//             navigate("/authentication/sign-in");
//             window.location.reload();
//           }
//           if (result.message === "Token Does Not Exist") {
//             navigate("/authentication/sign-in");
//             window.location.reload();
//           }
//           if (result.message === "Unauthorized Access") {
//             navigate("/authentication/forbiddenPage");
//             window.location.reload();
//           }
//           console.log(result);
//           if (isMounted) {
//             setProduct(result);
//           }
//         });
//       return () => {
//         isMounted = false;
//       };
//     }
//     if (chnageToString === "2") {
//       const headers = miHeaders;
//       const data11 = JSON.parse(localStorage.getItem("user1"));
//       const orgIDs = data11.orgID;
//       fetch(`${process.env.REACT_APP_LOUGA_URL}/companyServices/gets/${orgIDs}`, { headers })
//         .then(async (res) => {
//           const aToken = res.headers.get("token-1");
//           localStorage.setItem("rexxdex", aToken);
//           return res.json();
//         })
//         .then((result) => {
//           setOpened(false);
//           if (result.message === "Expired Access") {
//             navigate("/authentication/sign-in");
//             window.location.reload();
//           }
//           if (result.message === "Token Does Not Exist") {
//             navigate("/authentication/sign-in");
//             window.location.reload();
//           }
//           if (result.message === "Unauthorized Access") {
//             navigate("/authentication/forbiddenPage");
//             window.location.reload();
//           }
//           console.log(result);
//           setService(result);
//         });
//     }
//     if (chnageToString === "3") {
//       setProduct([]);
//       setService([]);
//     }
//   };

//   const handleFormChange = (event, index) => {
//     console.log(event.target.value, "event");
//     console.log(index, "index");
//     const data = [...counter];
//     data[index][event.target.name] = event.target.value;
//     if (event.target.name === "pricePerUnit") {
//       data[index].amount = parseInt(data[index].quantity, 10) * parseInt(event.target.value, 10);
//       data[index].totalAmount =
//         parseInt(data[index].quantity, 10) * parseInt(event.target.value, 10) +
//         parseInt(data[index].taxAmount, 10);
//       // parseInt(event.target.value, 10)
//       const zoom = counter.map((item) => item.pricePerUnit * item.quantity);
//       setSubTotalAmount(eval(zoom.join("+")));
//       // eslint-disable-next-line no-eval
//     } else if (event.target.name === "quantity") {
//       data[index].amount =
//         parseInt(data[index].pricePerUnit, 10) * parseInt(event.target.value, 10);
//       data[index].totalAmount =
//         parseInt(data[index].pricePerUnit, 10) * parseInt(event.target.value, 10) +
//         parseInt(data[index].taxAmount, 10);
//       const zoom = counter.map((item) => item.pricePerUnit * item.quantity);
//       setSubTotalAmount(eval(zoom.join("+")));
//       // eslint-disable-next-line no-eval
//     } else if (event.target.name === "product") {
//       data[index][event.target.name] = event.target.value;
//     } else if (event.target.name === "taxAmount") {
//       data[index].totalAmount = parseInt(data[index].amount, 10) + parseInt(event.target.value, 10);
//       const zoom = counter.map((item) => item.taxAmount);
//       setAllTax(eval(zoom.join("+")));
//     } else if (event.target.name === "quantity") {
//       data[index].totalAmount =
//         parseInt(data[index].pricePerUnit, 10) * parseInt(event.target.value, 10);
//     } else if (event.target.name === "salesID") {
//       handleChangeProdServ(event.target.value);
//       console.log("testing");
//     }
//     setCounter(data);
//   };

//   const addFields = () => {
//     const object = {
//       saleType: Number(""),
//       salesID: "",
//       branchID: "",
//       pricePerUnit: Number(""),
//       quantity: Number(""),
//       amount: Number(""),
//       taxAmount: Number(""),
//       totalAmount: Number(""),
//       product: Number(""),
//     };
//     setCounter([...counter, object]);
//   };
//   const removeFields = (index) => {
//     const data = [...counter];
//     data.splice(index, 1);
//     setCounter(data);
//   };

//   // useEffect(() => {
//   //   const headers = miHeaders;
//   //   const data11 = JSON.parse(localStorage.getItem("user1"));

//   //   const orgIDs = data11.orgID;
//   //   let isMounted = true;
//   //   fetch(`${process.env.REACT_APP_LOUGA_URL}/products/gets/${orgIDs}`, { headers })
//   //     .then(async (res) => {
//   //       const aToken = res.headers.get("token-1");
//   //       localStorage.setItem("rexxdex", aToken);
//   //       return res.json();
//   //     })
//   //     .then((result) => {
//   //       if (result.message === "Expired Access") {
//   //         navigate("/authentication/sign-in");
//   //         window.location.reload();
//   //       }
//   //       if (result.message === "Token Does Not Exist") {
//   //         navigate("/authentication/sign-in");
//   //         window.location.reload();
//   //       }
//   //       if (result.message === "Unauthorized Access") {
//   //         navigate("/authentication/forbiddenPage");
//   //         window.location.reload();
//   //       }
//   //       if (isMounted) {
//   //         setProduct(result);
//   //       }
//   //     });
//   //   return () => {
//   //     isMounted = false;
//   //   };
//   // }, []);
//   const Payment = eval(
//     Number(cashPaymentx) + Number(cardPaymentx) + Number(transferPaymentx) - Number(subTotalAmountx)
//   );
//   const Pay = () => {
//     setShowPayment(true);
//   };
//   const handleOnBeforeGetContent = () =>
//     new Promise((resolve) => {
//       // `react-to-print` will wait for this Promise to resolve before continuing
//       // Load data
//       onBeforeGetContentResolve.current = resolve;
//       setShowPrint(true); // When data is done loading
//     });
//   const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     onBeforeGetContent: handleOnBeforeGetContent,
//     onAfterPrint: () => window.location.reload(),
//   });
//   useEffect(() => {
//     const id = setImmediate(() => {
//       if (showPrint) {
//         // Resolves the Promise, telling `react-to-print` it is time to gather the content of the page for printing
//         onBeforeGetContentResolve.current();
//       }
//     });
//     return () => {
//       clearTimeout(id);
//     };
//   }, [showPrint, onBeforeGetContentResolve]);

//   const handleClick = (e) => {
//     if (Payment === 0) {
//       setOpened(true);
//       e.preventDefault();
//       const data11 = JSON.parse(localStorage.getItem("user1"));

//       const orgIDs = data11.orgID;
//       const idx = data11.personalID;
//       const raw = JSON.stringify({
//         orgID: orgIDs,
//         individualID: indix,
//         items: counter,
//         bonusAmount: bonusAmountxx,
//         subTotalAmount: subTotalAmountx,
//         totalAmount: TOTAL,
//         createdBy: idx,
//         comment: commentx,
//         receiptStatus: 1,
//         cardPaymentAmount: cardPaymentx,
//         transferPaymentAmount: transferPaymentx,
//         cashPaymentAmount: cashPaymentx,
//       });
//       const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow",
//       };
//       fetch(`${process.env.REACT_APP_LOUGA_URL}/sales/add`, requestOptions)
//         .then(async (res) => {
//           const aToken = res.headers.get("token-1");
//           localStorage.setItem("rexxdex", aToken);
//           const result = await res.text();
//           if (result === null || result === undefined || result === "") {
//             return {};
//           }
//           return JSON.parse(result);
//         })
//         .then((result) => {
//           if (result.message === "Expired Access") {
//             navigate("/authentication/sign-in");
//             window.location.reload();
//           }
//           if (result.message === "Token Does Not Exist") {
//             navigate("/authentication/sign-in");
//             window.location.reload();
//           }
//           if (result.message === "Unauthorized Access") {
//             navigate("/authentication/forbiddenPage");
//             window.location.reload();
//           }
//           if (result.status === "SUCCESS") {
//             handlePrint();
//           }
//           setOpened(false);
//           MySwal.fire({
//             title: result.status,
//             type: "success",
//             text: result.message,
//           }).then(() => {
//             window.location.reload();
//           });
//         })
//         .catch((error) => {
//           setOpened(false);
//           MySwal.fire({
//             title: error.status,
//             type: "error",
//             text: error.message,
//           });
//         });
//     }
//   };
//   useEffect(() => {
//     const headers = miHeaders;

//     const data11 = JSON.parse(localStorage.getItem("user1"));

//     const orgIDs = data11.orgID;
//     const empID = data11.personalID;
//     let isMounted = true;
//     fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getUserInfo/${orgIDs}/${empID}`, { headers })
//       .then(async (res) => {
//         const aToken = res.headers.get("token-1");
//         localStorage.setItem("rexxdex", aToken);
//         return res.json();
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
//         if (isMounted) {
//           setCashier(result);
//         }
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);
//   useEffect(() => {
//     let isMounted = true;
//     if (isMounted) {
//       setReferenceSKey(`${Math.floor(Math.random() * 1000000000 + 1)}`);
//     }

//     return () => {
//       isMounted = false;
//     };
//   }, [listenn]);

//   const honClose = (response) => {
//     setListenn(!listenn);
//     setReferenceSKey(`${Math.floor(Math.random() * 1000000000 + 1)}`);

//     if (response.message === "Transaction Successful" && response.status === "SUCCESS") {
//       // call api after success from monnify
//     }
//   };

//   const monNey = {
//     onClose: honClose,
//     amount: cardPaymentx,
//     currency: currencyx,
//     reference: referenceSKey,
//     customerFullName: indiName,
//     customerEmail: emailx,
//     customerMobileNumber: pnox,
//     apiKey: `${process.env.REACT_APP_PERSONAL_API_KEY}`,
//     contractCode: `${process.env.REACT_APP_PERSONAL_CONTRACT_KEY}`,
//     paymentDescription: commentx,
//     isTestMode: true,
//   };

//   const handleOnPortfolioKeys = () => {
//     if (commentx.length === 0) {
//       setCheckedPortfolio(false);
//       // eslint-disable-next-line no-unused-expressions
//       document.getElementById("portfolio").innerHTML = "A text is required<br>";
//     } else {
//       setCheckedPortfolio(true);
//     }
//   };

//   const handleValidate = (e) => {
//     if (checkedName && checkedEmail === true) {
//       handleIndividual(e);
//     }
//   };
//   const handleValidate2 = (e) => {
//     if (checkedPortfolio === true) {
//       handleClick(e);
//     }
//   };

//   // useEffect(() => {
//   //   const headers = miHeaders;
//   //   const data11 = JSON.parse(localStorage.getItem("user1"));

//   //   const orgIDs = data11.orgID;
//   //   let isMounted = true;
//   //   fetch(`${process.env.REACT_APP_LOUGA_URL}/companyServices/gets/${orgIDs}`, { headers })
//   //     .then(async (res) => {
//   //       const aToken = res.headers.get("token-1");
//   //       localStorage.setItem("rexxdex", aToken);
//   //       return res.json();
//   //     })
//   //     .then((result) => {
//   //       if (result.message === "Expired Access") {
//   //         navigate("/authentication/sign-in");
//   //         window.location.reload();
//   //       }
//   //       if (result.message === "Token Does Not Exist") {
//   //         navigate("/authentication/sign-in");
//   //         window.location.reload();
//   //       }
//   //       if (result.message === "Unauthorized Access") {
//   //         navigate("/authentication/forbiddenPage");
//   //         window.location.reload();
//   //       }
//   //       console.log(result);
//   //       if (isMounted) {
//   //         set(result);
//   //       }
//   //     });
//   //   return () => {
//   //     isMounted = false;
//   //   };
//   // }, []);

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <div ref={componentRef}>
//         {showPrint ? (
//           <>
//             <div align="center">
//               <h6>Reprinted</h6>
//               <h2>House Of Tara</h2>
//               <h3>
//                 <b>HOUSE OF TARA INTL LIMITED LEKKI</b>
//               </h3>
//               <p>13A Road 12, Onikepe Akande Street</p>
//               <p>Off Admiralty Road, Lekki Phase 1, Lagos</p>
//             </div>
//             <div style={{ paddingLeft: "160px" }}>
//               <p>
//                 Cashier: {cashierx.personal.fname} {cashierx.personal.lname}
//               </p>
//             </div>
//             <div align="center">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Item Name</th>
//                     <th>Qty</th>
//                     <th>Price</th>
//                     <th>Ext Price</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {counter.map((row, index) => (
//                     <>
//                       <tr>
//                         {/* {} */}
//                         <td>{counter[index].product}</td>
//                         <td>{counter[index].quantity}</td>
//                         <td>{counter[index].pricePerUnit}</td>
//                         <td>
//                           {parseInt(counter[index].pricePerUnit, 10) *
//                             parseInt(counter[index].quantity, 10)}
//                         </td>
//                       </tr>
//                       <tr>
//                         {/* <td />
//                         <td />
//                         {/* <td>Subtotal</td>
//                         {/* <td>N23,200.00</td>
//                       </tr>
//                       <tr>
//                         Local Sales Tax
//                         <td />
//                         <td>0% Tax:</td>
//                         <td>+N0.00</td> */}
//                       </tr>
//                     </>
//                   ))}
//                   <tr>
//                     <td />
//                     <td />
//                     <td>Subtotal</td>
//                     <td>N{subTotalAmountx}</td>
//                   </tr>
//                   <tr>
//                     Local Sales Tax
//                     <td />
//                     <td>{allTax}% Tax:</td>
//                     <td>+N{allTax}.00</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//             {/* <br /> */}
//             <div style={{ paddingLeft: "350px" }}>
//               <b>Receipt Total: {subTotalAmountx} </b>
//             </div>
//             <p align="center">Charges Inclusive of 7.5% VAT</p>
//             <p align="center">
//               {" "}
//               Thank you for shopping with us, Products purchased in good condition are not
//               returnable
//             </p>
//             <h4 align="center">Have a great day |||</h4>
//           </>
//         ) : (
//           ""
//         )}
//       </div>
//       <Card>
//         <MDBox style={{ paddingLeft: "450px" }}>
//           <Container>
//             <div className="row" style={{ paddingLeft: "450px" }}>
//               <div className="col-sm-12">
//                 <MDTypography
//                   variant="button"
//                   //   style={{ paddingLeft: "300px" }}
//                   fontWeight="regular"
//                   color="text"
//                   mt={8}
//                 >
//                   Individual
//                 </MDTypography>
//                 <MDBox>
//                   <IconButton
//                     size="large"
//                     aria-label="account of current user"
//                     aria-controls="primary-search-account-menu"
//                     aria-haspopup="true"
//                     color="inherit"
//                     onClick={() => openModal()}
//                   >
//                     <PersonAddIcon sx={{ color: "#f96d02" }} />
//                   </IconButton>
//                 </MDBox>
//                 <MDBox>
//                   <Form.Select
//                     value={indix || ""}
//                     aria-label="Default select example"
//                     onChange={(e) => {
//                       setIndi(e.target.value);
//                       const { value } = e.target;
//                       const fData = individualx.filter((indii) => indii.id === value);
//                       setIndiName(`${fData[0].fname} ${fData[0].lname}`);
//                       if (fData[0].email) {
//                         setEmail(`${fData[0].email}`);
//                       } else {
//                         setEmail("");
//                       }
//                       if (fData[0].pno) {
//                         setPno(`${fData[0].pno}`);
//                       } else {
//                         setPno("");
//                       }
//                     }}
//                   >
//                     <option>--Select Individual--</option>
//                     {individualx.map((apis) => (
//                       <option key={apis.id} value={apis.id}>
//                         {apis.fname} {apis.lname}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </MDBox>
//               </div>
//             </div>
//           </Container>
//         </MDBox>
//         <br />
//         &nbsp; &nbsp;
//         <MDBox>
//           <IconButton
//             size="large"
//             aria-label="account of current user"
//             aria-controls="primary-search-account-menu"
//             aria-haspopup="true"
//             color="inherit"
//             onClick={addFields}
//           >
//             <Add sx={{ color: "#f96d02" }} />
//           </IconButton>
//         </MDBox>
//         <Card style={{ backgroundColor: "#CCC1FF" }}>
//           <Grid container spacing={2}>
//             <Grid item xs={2}>
//               <Item>
//                 <b>saleType</b>
//               </Item>
//             </Grid>
//             <Grid item xs={1}>
//               <Item>
//                 <b>Product</b>
//               </Item>
//             </Grid>
//             <Grid item xs={2}>
//               <Item>
//                 <b>Branch</b>
//               </Item>
//             </Grid>
//             <Grid item xs={2}>
//               <Item>
//                 <b>Price Per Unit (NGN)</b>
//               </Item>
//             </Grid>
//             <Grid item xs={1}>
//               <Item>
//                 <h6>
//                   <b>Quantity</b>
//                 </h6>
//               </Item>
//             </Grid>
//             <Grid item xs={2}>
//               <Item>
//                 <b>Amount (NGN)</b>
//               </Item>
//             </Grid>
//             <Grid item xs={1}>
//               <Item>
//                 <b>Tax Amount</b>
//               </Item>
//             </Grid>
//             <Grid item xs={1}>
//               <Item>
//                 <b>Total Amount (NGN)</b>
//               </Item>
//             </Grid>
//           </Grid>
//         </Card>
//         &nbsp;
//         <Grid>
//           <div className="row">
//             {counter.map((form, index) => {
//               const amountxx = parseInt(form.pricePerUnit, 10) * parseInt(form.quantity, 10);
//               const branchx = form.branchID;
//               const totalAmountxx = parseInt(form.amount, 10) + parseInt(form.taxAmount, 10);
//               const taxAmoun = parseInt(form.taxAmount, 10);
//               return (
//                 <>
//                   <div className="col-sm-2">
//                     {/* <MDInput
//       type="text"
//       value={namex || ""}
//       onChange={(e) => setName(e.target.value)}
//       // onKeyUp={handleOnNameKeys}
//       label="First Name"
//       variant="standard"
//       fullWidth
//     /> */}
//                     {/* <TextField
//       id="outlined-error-helper-text"
//       label="Error"
//       // defaultValue="Hello World"
//       // helperText="Incorrect entry."
//     /> */}
//                     <MDBox>
//                       <Form.Select
//                         value={form.salesID}
//                         aria-label="Default select example"
//                         name="salesID"
//                         onChange={(event) => handleFormChange(event, index)}
//                       >
//                         <option value="">Sales Type</option>
//                         <option value="1">Product</option>
//                         <option value="2">Company Service</option>
//                         <option value="3">Custom Sales</option>
//                       </Form.Select>
//                     </MDBox>

//                     {/* <input onChange={(e) => setName(e.target.value)} value={namex || ""} type="text" /> */}
//                   </div>
//                   <div className="col-sm-1">
//                     {showClients ? (
//                       <MDBox>
//                         <Form.Select
//                           value={form.product}
//                           aria-label="Default select example"
//                           name="product"
//                           onChange={(event) => handleFormChange(event, index)}
//                         >
//                           <option>Product</option>
//                           {productx.map((apis) => (
//                             <option key={apis.id} value={apis.name}>
//                               {apis.name}
//                             </option>
//                           ))}
//                         </Form.Select>
//                       </MDBox>
//                     ) : (
//                       <MDBox>
//                         <Form.Select
//                           value={form.product}
//                           aria-label="Default select example"
//                           name="product"
//                           onChange={(event) => handleFormChange(event, index)}
//                         >
//                           <option>Company Services</option>
//                           {servicex.map((apis) => (
//                             <option key={apis.id} value={apis.name}>
//                               {apis.name}
//                             </option>
//                           ))}
//                         </Form.Select>
//                       </MDBox>
//                     )}
//                   </div>
//                   <div className="col-sm-2">
//                     <MDBox>
//                       <Form.Select
//                         value={branchx}
//                         aria-label="Default select example"
//                         name="branchID"
//                         onChange={(event) => handleFormChange(event, index)}
//                       >
//                         <option>Branch</option>
//                         {productBranx.map((apis) => (
//                           <option key={apis.id} value={apis.id}>
//                             {apis.name}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     </MDBox>
//                   </div>
//                   <div className="col-sm-2">
//                     {/* <TextField
//       id="outlined-error-helper-text"
//       label="First Name"
//       // defaultValue="Hello World"
//       // helperText="Incorrect entry."
//     /> */}
//                     <Box sx={{ minWidth: 120 }}>
//                       <FormControl fullWidth>
//                         <TextField
//                           id="filled-number"
//                           value={form.pricePerUnit}
//                           label="Price Per Unit"
//                           placeholder="Pice Per Unit "
//                           size="small"
//                           name="pricePerUnit"
//                           // key={c}
//                           // className={index}
//                           type="number"
//                           onChange={(event) => handleFormChange(event, index)}
//                           // onChange={(e) => setPPQuantity(e.target.value)}
//                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}
//                           required
//                         />
//                       </FormControl>
//                     </Box>
//                   </div>
//                   <div className="col-sm-1">
//                     <Box sx={{ minWidth: 100 }}>
//                       <FormControl fullWidth>
//                         <TextField
//                           id="filled-number"
//                           value={form.quantity}
//                           label="Quantity "
//                           placeholder="Quantity "
//                           name="quantity"
//                           // key={c}
//                           // className={index}
//                           type="number"
//                           size="small"
//                           onChange={(event) => handleFormChange(event, index)}
//                           // onChange={(e) => setQuantity(e.target.value)}
//                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}
//                           required
//                         />
//                       </FormControl>
//                     </Box>
//                   </div>
//                   <div className="col-sm-2">
//                     <Box sx={{ minWidth: 120 }}>
//                       <FormControl fullWidth>
//                         <TextField
//                           id="filled-number"
//                           value={amountxx}
//                           label="Amount "
//                           placeholder="Amount "
//                           name="Amount"
//                           // key={c}
//                           // className={index}
//                           size="small"
//                           type="number"
//                           // onChange={handleOnSelect2}
//                           // onChange={(e) => handleOnlastChange(e)}
//                           // onKeyUp={(e) => setAmount(e.target.value)}
//                           InputProps={{
//                             readOnly: true,
//                           }}
//                         />
//                       </FormControl>
//                     </Box>
//                   </div>
//                   <div className="col-sm-1">
//                     {/* <Box sx={{ minWidth: 100 }}>
//                       <FormControl fullWidth>
//                         <TextField
//                           id="filled-number"
//                           value={taxAmoun}
//                           label="Tax Amount (NGN) "
//                           placeholder="Tax Amount "
//                           type="number"
//                           name="taxAmount"
//                           size="small"
//                           onChange={(event) => handleFormChange(event, index)}
//                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}
//                           required
//                         />
//                       </FormControl>
//                     </Box> */}
//                     <Box sx={{ minWidth: 100 }}>
//                       <FormControl fullWidth>
//                         <TextField
//                           id="filled-number"
//                           value={taxAmoun}
//                           label="Tax Amount (NGN) "
//                           placeholder="Tax Amount "
//                           size="small"
//                           name="taxAmount"
//                           // key={c}
//                           // className={index}
//                           type="number"
//                           onChange={(event) => handleFormChange(event, index)}
//                           // onChange={(e) => setPPQuantity(e.target.value)}
//                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}
//                           required
//                         />
//                       </FormControl>
//                     </Box>
//                   </div>
//                   <div className="col-sm-1">
//                     <Box sx={{ minWidth: 100 }}>
//                       <FormControl fullWidth>
//                         <TextField
//                           id="filled-number"
//                           value={totalAmountxx}
//                           label="Total Amount "
//                           placeholder="Total Amount "
//                           type="number"
//                           size="small"
//                           name="totalAmount"
//                           // onChange={(event) => handleFormChange(event, index)}
//                           // onKeyUp={(e) => handleTaxAmount(e.target.value)}
//                           // required
//                           InputProps={{
//                             readOnly: true,
//                           }}
//                         />
//                       </FormControl>
//                     </Box>
//                   </div>
//                   <MDBox>
//                     <IconButton
//                       size="large"
//                       aria-label="account of current user"
//                       aria-controls="primary-search-account-menu"
//                       aria-haspopup="true"
//                       color="inherit"
//                       onClick={() => removeFields(index)}
//                     >
//                       <CancelPresentationIcon sx={{ color: "#f96d02" }} />
//                     </IconButton>
//                   </MDBox>
//                   <br />
//                 </>
//               );
//             })}
//           </div>
//           &nbsp; &nbsp;
//         </Grid>
//         <MDBox>
//           <Container>
//             <div className="row">
//               <div className="col-sm-3">
//                 <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
//                   <FormControl fullWidth>
//                     <TextField
//                       id="filled-number"
//                       value={bonusAmountxx}
//                       label="Bonus Amount "
//                       placeholder="Bonus Amount "
//                       type="number"
//                       onChange={(e) => setBonusAmount(e.target.value)}
//                     />
//                   </FormControl>
//                 </Box>
//               </div>
//               <div className="col-sm-3" />
//               <div className="col-sm-3">
//                 <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
//                   <FormControl fullWidth>
//                     <TextField
//                       id="filled-number"
//                       value={subTotalAmountx}
//                       label="Total Amount "
//                       placeholder="Total Amount "
//                       type="number"
//                       name="totalAmount"
//                       InputProps={{
//                         readOnly: true,
//                       }}
//                     />
//                   </FormControl>
//                 </Box>
//               </div>
//             </div>
//           </Container>
//         </MDBox>
//         <br />
//         &nbsp; &nbsp;
//         <MDBox style={{ paddingLeft: "30px" }}>
//           <Container>
//             <div className="row">
//               <div className="col-sm-12">
//                 <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
//                   <Form.Label style={{ fontSize: 14 }}>Comment</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     value={commentx || ""}
//                     onKeyUp={handleOnPortfolioKeys}
//                     onChange={(e) => setComment(e.target.value)}
//                     rows={2}
//                   />
//                 </Form.Group>
//               </div>
//             </div>
//           </Container>
//         </MDBox>
//         <br />
//         &nbsp; &nbsp;
//         <MDBox>
//           {showPayment ? (
//             <Container>
//               <div className="row">
//                 <div className="col-sm-3">
//                   <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
//                     <FormControl fullWidth>
//                       <MDTypography
//                         variant="button"
//                         color="info"
//                         fontWeight="medium"
//                         style={Styles.textSx}
//                       >
//                         Cash Payment:
//                       </MDTypography>
//                       {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
//                       <label htmlFor="filled-number"> Cash Payment: </label>
//                       <TextField
//                         id="filled-number"
//                         value={cashPaymentx}
//                         label="Amount"
//                         placeholder="Amount"
//                         type="number"
//                         onChange={(e) => setCashPayment(e.target.value)}
//                       />
//                     </FormControl>
//                   </Box>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-3">
//                   <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
//                     <FormControl fullWidth>
//                       <MDTypography
//                         variant="button"
//                         color="info"
//                         fontWeight="medium"
//                         style={Styles.textSx}
//                       >
//                         Transfer Payment:
//                       </MDTypography>
//                       {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
//                       <label htmlFor="filled-number"> Transfer Payment: </label>
//                       <TextField
//                         id="filled-number"
//                         value={transferPaymentx}
//                         label="Amount"
//                         placeholder="Amount"
//                         type="number"
//                         onChange={(e) => setTransferPayment(e.target.value)}
//                       />
//                     </FormControl>
//                   </Box>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-3">
//                   <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
//                     <MDTypography
//                       variant="button"
//                       color="info"
//                       fontWeight="medium"
//                       style={Styles.textSx}
//                     >
//                       Card Payment:
//                     </MDTypography>
//                     <FormControl fullWidth>
//                       {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
//                       <label htmlFor="filled-number"> Card Payment: </label>
//                       <TextField
//                         id="filled-number"
//                         value={cardPaymentx}
//                         label="Amount"
//                         placeholder="Amount"
//                         type="number"
//                         onChange={(e) => setCardPayment(e.target.value)}
//                       />
//                     </FormControl>
//                     <MDBox mt={4} mb={1}>
//                       <div>
//                         <MonnifyConsumer {...monNey} className="btn">
//                           {({ initializePayment }) => (
//                             // eslint-disable-next-line react/button-has-type
//                             <MDButton
//                               variant="gradient"
//                               onClick={() => initializePayment()}
//                               color="info"
//                               width="50%"
//                             >
//                               Pay
//                             </MDButton>
//                           )}
//                         </MonnifyConsumer>
//                       </div>
//                     </MDBox>
//                   </Box>
//                 </div>
//               </div>
//             </Container>
//           ) : (
//             <></>
//           )}

//           <MDBox style={{ paddingTop: "40px", paddingLeft: "400px" }}>
//             <Container>
//               <div className="row">
//                 <div className="col-sm-3">
//                   <Box sx={{ minWidth: 120 }}>
//                     <FormControl fullWidth>
//                       <TextField
//                         id="filled-number"
//                         value={Payment}
//                         label="Balance "
//                         placeholder="Balance"
//                         type="number"
//                         name="balance"
//                         InputProps={{
//                           readOnly: true,
//                         }}
//                       />
//                     </FormControl>
//                   </Box>
//                 </div>
//               </div>
//             </Container>
//           </MDBox>
//         </MDBox>
//         <MDBox mt={4} mb={1}>
//           <MDButton
//             variant="gradient"
//             onClick={Pay}
//             style={Styles.buttonSx}
//             width="50%"
//             align="left"
//           >
//             Pay
//           </MDButton>
//         </MDBox>
//         <MDBox mt={4} mb={1} align="center">
//           <MDButton
//             variant="gradient"
//             onClick={handleValidate2}
//             style={Styles.buttonSx}
//             width="50%"
//             align="left"
//           >
//             Print
//           </MDButton>
//         </MDBox>
//       </Card>
//       <div>
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={modalStyle}>
//             <Grid>
//               <Grid item xs={6} md={6}>
//                 {" "}
//                 <HighlightOffIcon
//                   onClick={handleClose}
//                   fontSize="large"
//                   style={{
//                     padding: "5px",
//                     color: "red",
//                     float: "right",
//                     cursor: "pointer",
//                   }}
//                 />
//                 <MDBox>
//                   <MDBox component="form" role="form">
//                     <MDBox
//                       variant="gradient"
//                       borderRadius="lg"
//                       coloredShadow="success"
//                       mx={0}
//                       mt={0}
//                       p={3}
//                       mb={1}
//                       textAlign="center"
//                       style={Styles.boxSx}
//                     >
//                       <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
//                         Add New Individual
//                       </MDTypography>
//                     </MDBox>
//                     <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                       <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
//                         {" "}
//                       </MDTypography>
//                       <MDTypography variant="gradient" fontSize="60%" color="error" id="email">
//                         {" "}
//                       </MDTypography>
//                       <MDBox mb={0}>
//                         <Container>
//                           <div className="row">
//                             <div className="col-sm-6">
//                               <MDInput
//                                 type="text"
//                                 value={namex || ""}
//                                 onChange={(e) => setName(e.target.value)}
//                                 onKeyUp={handleOnNameKeys}
//                                 label="First Name"
//                                 variant="standard"
//                                 fullWidth
//                               />
//                             </div>
//                             <div className="col-sm-6">
//                               <MDInput
//                                 type="text"
//                                 value={lnamex || ""}
//                                 onChange={(e) => setLnamex(e.target.value)}
//                                 label="Last Name"
//                                 variant="standard"
//                                 fullWidth
//                               />
//                             </div>
//                           </div>
//                           &nbsp; &nbsp;
//                           <div className="row">
//                             <div className="col-sm-10">
//                               <MDTypography
//                                 variant="button"
//                                 fontWeight="regular"
//                                 fontSize="80%"
//                                 textAlign="center"
//                                 color="text"
//                               >
//                                 Title
//                               </MDTypography>
//                               <Form.Select
//                                 value={titlex}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 aria-label="Default select example"
//                               >
//                                 <option value="">--Select Title--</option>
//                                 <option value="Bishop">Bishop</option>
//                                 <option value="Chancellor">Chancellor</option>
//                                 <option value="Comrade">Comrade</option>
//                                 <option value="Doctor">Doctor</option>
//                                 <option value="Engineer">Engineer</option>
//                                 <option value="Excellency">Excellency</option>
//                                 <option value="Honorable">Honorable</option>
//                                 <option value="Imam">Imam</option>
//                                 <option value="Master">Master</option>
//                                 <option value="Miss">Miss</option>
//                                 <option value="Mr">Mr</option>
//                                 <option value="Mrs">Mrs</option>
//                                 <option value="Reverend">Reverend</option>
//                                 <option value="Pastor">Pastor</option>
//                                 <option value="Professor">Professor</option>
//                                 <option value="Pope">Pope</option>
//                                 <option value="Vice-Chancellor">Vice-Chancellor</option>
//                                 <option value="Other">Others...</option>
//                               </Form.Select>
//                             </div>
//                           </div>
//                           <div className="row">
//                             <div className="col-sm-6">
//                               <MDInput
//                                 type="text"
//                                 value={emailx || ""}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 onKeyUp={handleOnEmailKeys}
//                                 label="Email"
//                                 variant="standard"
//                                 fullWidth
//                               />
//                             </div>

//                             <div className="col-sm-6">
//                               <MDTypography variant="button" fontWeight="regular" color="text">
//                                 Phone Number
//                               </MDTypography>
//                               <PhoneInput
//                                 value={pnox}
//                                 inputStyle={{ width: "100%" }}
//                                 buttonStyle={{}}
//                                 onChange={setPno}
//                               />
//                             </div>
//                           </div>
//                         </Container>
//                       </MDBox>
//                     </MDBox>
//                     <MDBox mt={4} mb={1}>
//                       <MDButton
//                         variant="gradient"
//                         onClick={handleValidate}
//                         style={Styles.buttonSx}
//                         width="50%"
//                         align="left"
//                       >
//                         Save
//                       </MDButton>
//                     </MDBox>
//                   </MDBox>
//                 </MDBox>
//               </Grid>
//             </Grid>
//           </Box>
//         </Modal>
//       </div>
//       <br />
//       <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
//         <CircularProgress color="info" />
//       </Backdrop>
//     </DashboardLayout>
//   );
// }
// export default Sales;
/* eslint-disable no-eval */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Styles from "styles";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { IconButton } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Add from "@mui/icons-material/Add";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { useReactToPrint } from "react-to-print";
import { MonnifyConsumer } from "react-monnify";
import PhoneInput from "react-phone-input-2";
// import houseOfTara from "./HouseOfTara.jpg";
// import "./Force.css";
// zinoleesky wrote this part of d code called sales
// incase another Printing {https://stackblitz.com/edit/react-print-receipt?file=index.js}

function Sales() {
  const MySwal = withReactContent(Swal);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [individualx, setIndividual] = useState([]);
  const [indix, setIndi] = useState("");
  const [namex, setName] = useState("");
  const [lnamex, setLnamex] = useState("");
  const [titlex, setTitle] = useState("");

  const [checkedName, setCheckedName] = useState("");
  const [user, setUser] = useState([]);
  const [commentx, setComment] = useState("");

  const [emailx, setEmail] = useState("");
  const currencyx = "NGN";
  const [pnox, setPno] = useState("");
  const [indiName, setIndiName] = useState("");
  const [referenceSKey, setReferenceSKey] = useState();
  const [listenn, setListenn] = useState(false);

  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [productx, setProduct] = useState([]);
  const [productBranx, setProductBran] = useState([]);
  const [bonusAmountxx, setBonusAmount] = useState("");
  const [subTotalAmountx, setSubTotalAmount] = useState([]);
  const [allTax, setAllTax] = useState("");
  const [cashPaymentx, setCashPayment] = useState("");
  const [cardPaymentx, setCardPayment] = useState("");
  const [transferPaymentx, setTransferPayment] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const [cashierx, setCashier] = useState([]);
  const [checkedEmail, setCheckedEmail] = useState("");
  const [checkedPortfolio, setCheckedPortfolio] = useState("");
  const [receiptNo, setReceiptNo] = useState("");
  // const [showClients, setShowClients] = useState(false);
  const [creditFacilityx, setCreditFacility] = useState("");
  const onBeforeGetContentResolve = useRef();
  <style type="text/css" media="print">
    {"\
  @page{ size: portrait; } \
  "}
  </style>;

  const [counter, setCounter] = useState([
    {
      saleType: Number(""),
      salesID: "",
      branchID: "",
      pricePerUnit: Number(""),
      quantity: Number(""),
      amount: Number(""),
      taxAmount: Number(""),
      totalAmount: Number(""),
      product: "",
      psArray: [],
    },
  ]);
  console.log(user);

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
        if (isMounted) {
          setIndividual(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
        if (isMounted) {
          setUser(result);
          setOpened(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#ffffff",
    border: "3px solid #5F9DF7",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    height: "55%",
    display: "flex",
    "&::-webkit-scrollbar": {
      width: 40,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "white",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#f5f5f5",
      borderRadius: 10,
    },
  };

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/branch/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
        if (isMounted) {
          setProductBran(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const TOTAL = eval(subTotalAmountx + allTax - bonusAmountxx);

  const handleOnNameKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!namex.match(letters)) {
      setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
    }
    if (namex.match(letters)) {
      setCheckedName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (namex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name is required<br>";
    }
    // setEnabled(checkedName === true);
  };
  const handleOnEmailKeys = (value) => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    const nylon = value.target.value.toString();
    if (!nylon.match(letters)) {
      setCheckedEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email - input a valid email<br>";
    }
    if (nylon.match(letters)) {
      setCheckedEmail(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (nylon.length === 0) {
      setCheckedEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email is required<br>";
    }
  };
  const openModal = () => {
    setOpen(true);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleIndividual = (e) => {
    if (pnox !== "") {
      setOpened(true);
      e.preventDefault();
      // handleClose();

      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      const personalIDs = data11.personalID;
      const raw = JSON.stringify([
        {
          orgID: orgIDs,
          fname: namex,
          lname: lnamex,
          title: titlex,
          createdBy: personalIDs,
          accountOwnerID: personalIDs,
        },
      ]);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/add`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          if (result.message === "Expired Access") {
            navigate("/authentication/sign-in");
            window.location.reload();
          }
          if (result.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
            window.location.reload();
          }
          if (result.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
            window.location.reload();
          }
          setOpened(false);
          handleClose();
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          setOpened(false);
          MySwal.fire({
            title: error.status,
            type: "error",
            text: error.message,
          });
        });
    } else {
      alert("Please fill the required input(s)");
    }
  };

  // eslint-disable-next-line consistent-return
  const handleChangeProdServ = (value, index) => {
    const chnageToString = value.toString();
    const data = [...counter];
    // if (chnageToString === "1") {
    //   setShowClients(false);
    // } else if (chnageToString === "2") {
    //   setShowClients(true);
    // }
    if (chnageToString === "1") {
      setOpened(true);
      const headers = miHeaders;
      let isMounted = true;
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;

      fetch(`${process.env.REACT_APP_LOUGA_URL}/products/gets/${orgIDs}`, { headers })
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          setOpened(false);
          if (result.message === "Expired Access") {
            navigate("/authentication/sign-in");
            window.location.reload();
          }
          if (result.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
            window.location.reload();
          }
          if (result.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
            window.location.reload();
          }
          console.log(result);
          if (isMounted) {
            // setProduct(result);
            data[index].psArray = result;
            setCounter(data);
          }
        });
      return () => {
        isMounted = false;
      };
    }
    if (chnageToString === "2") {
      const headers = miHeaders;
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      fetch(`${process.env.REACT_APP_LOUGA_URL}/companyServices/gets/${orgIDs}`, { headers })
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          setOpened(false);
          if (result.message === "Expired Access") {
            navigate("/authentication/sign-in");
            window.location.reload();
          }
          if (result.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
            window.location.reload();
          }
          if (result.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
            window.location.reload();
          }
          console.log(result);
          // setProduct(result);
          data[index].psArray = result;
          setCounter(data);
        });
    }
    if (chnageToString === "3") {
      setProduct([]);
      data[index].psArray = [];
      setCounter(data);
      // setService([]);
    }
  };

  const handleFormChange = (event, index) => {
    console.log(event.target.value, "event");
    console.log(index, "index");
    const data = [...counter];
    data[index][event.target.name] = event.target.value;
    if (data[index].saleType === "3" && event.target.name === "pricePerUnit") {
      data[index].amount = parseInt(data[index].quantity, 10) * parseInt(event.target.value, 10);
      data[index].totalAmount =
        parseInt(data[index].quantity, 10) * parseInt(event.target.value, 10) +
        parseInt(data[index].taxAmount, 10);
      // parseInt(event.target.value, 10)
      const zoom = counter.map((item) => item.pricePerUnit * item.quantity);
      setSubTotalAmount(eval(zoom.join("+")));
      // eslint-disable-next-line no-eval
    } else if (event.target.name === "quantity") {
      data[index].amount =
        parseInt(data[index].pricePerUnit, 10) * parseInt(event.target.value, 10);
      data[index].totalAmount =
        parseInt(data[index].pricePerUnit, 10) * parseInt(event.target.value, 10) +
        parseInt(data[index].taxAmount, 10);
      const zoom = counter.map((item) => item.pricePerUnit * item.quantity);
      setSubTotalAmount(eval(zoom.join("+")));
      // eslint-disable-next-line no-eval
    } else if (event.target.name === "product") {
      console.log(event.target.value);
      const productObj = JSON.parse(event.target.value);
      data[index][event.target.name] = productObj.name;
      data[index].salesID = productObj.id;
      if (data[index].saleType === "1") {
        data[index].pricePerUnit = productObj.pricePerQuantity;
      } else if (data[index].saleType === "2") {
        data[index].pricePerUnit = productObj.pricePerUnit;
      }
    } else if (event.target.name === "taxAmount") {
      data[index].totalAmount = parseInt(data[index].amount, 10) + parseInt(event.target.value, 10);
      const zoom = counter.map((item) => item.taxAmount);
      setAllTax(eval(zoom.join("+")));
    } else if (event.target.name === "quantity") {
      data[index].totalAmount =
        parseInt(data[index].pricePerUnit, 10) * parseInt(event.target.value, 10);
    } else if (event.target.name === "saleType") {
      console.log(event.target.value);
      // data[index][event.target.name] = handleChangeProdServ(event.target.value);
      data[index][event.target.name] = event.target.value;
      handleChangeProdServ(event.target.value, index);
      console.log("testing");
    }
    setCounter(data);
  };

  const addFields = () => {
    const object = {
      saleType: Number(""),
      salesID: "",
      branchID: "",
      pricePerUnit: Number(""),
      quantity: Number(""),
      amount: Number(""),
      taxAmount: Number(""),
      totalAmount: Number(""),
      product: "",
      psArray: [],
    };
    setCounter([...counter, object]);
  };
  const removeFields = (index) => {
    const data = [...counter];
    data.splice(index, 1);
    setCounter(data);
  };

  // useEffect(() => {
  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/products/gets/${orgIDs}`, { headers })
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       if (result.message === "Expired Access") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Token Does Not Exist") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Unauthorized Access") {
  //         navigate("/authentication/forbiddenPage");
  //         window.location.reload();
  //       }
  //       if (isMounted) {
  //         setProduct(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
  const Payment = eval(
    Number(cashPaymentx) +
      Number(cardPaymentx) +
      Number(transferPaymentx) +
      Number(creditFacilityx) -
      Number(subTotalAmountx)
  );
  const Pay = () => {
    setShowPayment(true);
  };
  const handleOnBeforeGetContent = () =>
    new Promise((resolve) => {
      // `react-to-print` will wait for this Promise to resolve before continuing
      // Load data
      onBeforeGetContentResolve.current = resolve;
      setShowPrint(true); // When data is done loading
    });
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: handleOnBeforeGetContent,
    onAfterPrint: () => window.location.reload(),
  });
  useEffect(() => {
    const id = setImmediate(() => {
      if (showPrint) {
        // Resolves the Promise, telling `react-to-print` it is time to gather the content of the page for printing
        onBeforeGetContentResolve.current();
      }
    });
    return () => {
      clearTimeout(id);
    };
  }, [showPrint, onBeforeGetContentResolve]);

  console.log(handlePrint);

  const handleClick = (e) => {
    if (Payment === 0) {
      setOpened(true);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const idx = data11.personalID;
      const raw = JSON.stringify({
        orgID: orgIDs,
        individualID: indix,
        items: counter,
        bonusAmount: bonusAmountxx,
        subTotalAmount: subTotalAmountx,
        totalAmount: TOTAL,
        createdBy: idx,
        comment: commentx,
        receiptStatus: 1,
        cardPaymentAmount: cardPaymentx,
        transferPaymentAmount: transferPaymentx,
        cashPaymentAmount: cashPaymentx,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_LOUGA_URL}/sales/add`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          const result = await res.text();
          if (result === null || result === undefined || result === "") {
            return {};
          }
          return JSON.parse(result);
        })
        .then((result) => {
          if (result.message === "Expired Access") {
            navigate("/authentication/sign-in");
            window.location.reload();
          }
          if (result.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
            window.location.reload();
          }
          if (result.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
            window.location.reload();
          }
          // if (result.status === "SUCCESS") {
          //   // handlePrint();
          // }
          if (result.status === "SUCCESS") {
            setReceiptNo(result.data.receiptNo);
            handlePrint();
            if (creditFacilityx > 0) {
              const allResult = result.data;
              const raw2 = JSON.stringify({
                orgID: orgIDs,
                type: "SALES",
                requestID: allResult.id,
                balance: allResult.subTotalAmount,
                createdBy: allResult.createdBy,
                clientType: "1",
                clientID: allResult.individualID,
                originalAmount: allResult.subTotalAmount,
              });
              console.log(raw2);
              const requestOptions2 = {
                method: "POST",
                headers: myHeaders,
                body: raw2,
                redirect: "follow",
              };
              fetch(`${process.env.REACT_APP_LOUGA_URL}/creditFacility/add`, requestOptions2)
                .then(async (res) => {
                  const aToken = res.headers.get("token-1");
                  localStorage.setItem("rexxdex", aToken);
                  const resultx = await res.text();
                  if (resultx === null || resultx === undefined || resultx === "") {
                    return {};
                  }
                  return JSON.parse(resultx);
                })
                .then((resultx) => {
                  if (resultx.message === "Expired Access") {
                    navigate("/authentication/sign-in");
                    window.location.reload();
                  }
                  if (resultx.message === "Token Does Not Exist") {
                    navigate("/authentication/sign-in");
                    window.location.reload();
                  }
                  if (resultx.message === "Unauthorized Access") {
                    navigate("/authentication/forbiddenPage");
                    window.location.reload();
                  }
                  console.log(resultx);
                  setOpened(false);
                  // MySwal.fire({
                  //   title: resultx.status,
                  //   type: "success",
                  //   text: resultx.message,
                  // }).then(() => {
                  //   window.location.reload();
                  // });
                })
                .catch((error) => {
                  setOpened(false);
                  MySwal.fire({
                    title: error.status,
                    type: "error",
                    text: error.message,
                  });
                });
            }
          }
          console.log(result);
          setOpened(false);
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          setOpened(false);
          MySwal.fire({
            title: error.status,
            type: "error",
            text: error.message,
          });
        });
    }
  };
  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const empID = data11.personalID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getUserInfo/${orgIDs}/${empID}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
        if (isMounted) {
          setCashier(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setReferenceSKey(`${Math.floor(Math.random() * 1000000000 + 1)}`);
    }

    return () => {
      isMounted = false;
    };
  }, [listenn]);

  const honClose = (response) => {
    setListenn(!listenn);
    setReferenceSKey(`${Math.floor(Math.random() * 1000000000 + 1)}`);

    if (response.message === "Transaction Successful" && response.status === "SUCCESS") {
      // call api after success from monnify
    }
  };

  const monNey = {
    onClose: honClose,
    amount: cardPaymentx,
    currency: currencyx,
    reference: referenceSKey,
    customerFullName: indiName,
    customerEmail: emailx,
    customerMobileNumber: pnox,
    apiKey: `${process.env.REACT_APP_PERSONAL_API_KEY}`,
    contractCode: `${process.env.REACT_APP_PERSONAL_CONTRACT_KEY}`,
    paymentDescription: commentx,
    isTestMode: true,
  };

  const handleOnPortfolioKeys = () => {
    if (commentx.length === 0) {
      setCheckedPortfolio(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("portfolio").innerHTML = "A text is required<br>";
    } else {
      setCheckedPortfolio(true);
    }
  };

  const handleValidate = (e) => {
    if (checkedName && checkedEmail === true) {
      handleIndividual(e);
    }
  };
  const handleValidate2 = (e) => {
    if (checkedPortfolio === true) {
      handleClick(e);
    }
  };

  // useEffect(() => {
  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/companyServices/gets/${orgIDs}`, { headers })
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       if (result.message === "Expired Access") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Token Does Not Exist") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Unauthorized Access") {
  //         navigate("/authentication/forbiddenPage");
  //         window.location.reload();
  //       }
  //       console.log(result);
  //       if (isMounted) {
  //         set(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  console.log(productx);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div ref={componentRef}>
        {showPrint ? (
          <>
            <div align="center">
              <h6>Reprinted</h6>
              <h2>House Of Tara</h2>
              <h3>
                <b>HOUSE OF TARA INTL LIMITED LEKKI</b>
              </h3>
              <p>13A Road 12, Onikepe Akande Street</p>
              <p>Off Admiralty Road, Lekki Phase 1, Lagos</p>
            </div>
            <div style={{ paddingLeft: "160px" }}>
              <p>
                Cashier: {cashierx.personal.fname} {cashierx.personal.lname}
              </p>
            </div>
            <div align="center">
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Ext Price</th>
                  </tr>
                </thead>
                <tbody>
                  {counter.map((row, index) => (
                    <>
                      <tr>
                        {/* {} */}
                        <td>{counter[index].product}</td>
                        <td>{counter[index].quantity}</td>
                        <td>{counter[index].pricePerUnit}</td>
                        <td>
                          {parseInt(counter[index].pricePerUnit, 10) *
                            parseInt(counter[index].quantity, 10)}
                        </td>
                      </tr>
                      <tr>
                        {/* <td />
                        <td />
                        {/* <td>Subtotal</td> 
                        {/* <td>N23,200.00</td>
                      </tr>
                      <tr>
                        Local Sales Tax
                        <td />
                        <td>0% Tax:</td>
                        <td>+N0.00</td> */}
                      </tr>
                    </>
                  ))}
                  <tr>
                    <td />
                    <td />
                    <td>Subtotal</td>
                    <td>N{subTotalAmountx}</td>
                  </tr>
                  <tr>
                    Local Sales Tax
                    <td />
                    <td>{allTax}% Tax:</td>
                    <td>+N{allTax}.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <br /> */}
            <div style={{ paddingLeft: "350px" }}>
              <b>Receipt Total: {subTotalAmountx} </b>
            </div>
            <p align="center">Charges Inclusive of 7.5% VAT</p>
            <p align="center">
              {" "}
              Thank you for shopping with us, Products purchased in good condition are not
              returnable
            </p>
            <h4 align="center">Have a great day |||</h4>
            <h4 align="center">Receipt Number: {receiptNo}</h4>
          </>
        ) : (
          ""
        )}
      </div>
      <Card>
        <MDBox style={{ paddingLeft: "450px" }}>
          <Container>
            <div className="row" style={{ paddingLeft: "450px" }}>
              <div className="col-sm-12">
                <MDTypography
                  variant="button"
                  //   style={{ paddingLeft: "300px" }}
                  fontWeight="regular"
                  color="text"
                  mt={8}
                >
                  Individual
                </MDTypography>
                <MDBox>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => openModal()}
                  >
                    <PersonAddIcon sx={{ color: "#f96d02" }} />
                  </IconButton>
                </MDBox>
                <MDBox>
                  <Form.Select
                    value={indix || ""}
                    aria-label="Default select example"
                    onChange={(e) => {
                      setIndi(e.target.value);
                      const { value } = e.target;
                      const fData = individualx.filter((indii) => indii.id === value);
                      setIndiName(`${fData[0].fname} ${fData[0].lname}`);
                      if (fData[0].email) {
                        setEmail(`${fData[0].email}`);
                      } else {
                        setEmail("");
                      }
                      if (fData[0].pno) {
                        setPno(`${fData[0].pno}`);
                      } else {
                        setPno("");
                      }
                    }}
                  >
                    <option>--Select Individual--</option>
                    {individualx.map((apis) => (
                      <option key={apis.id} value={apis.id}>
                        {apis.fname} {apis.lname}
                      </option>
                    ))}
                  </Form.Select>
                </MDBox>
              </div>
            </div>
          </Container>
        </MDBox>
        <br />
        &nbsp; &nbsp;
        <MDBox>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={addFields}
          >
            <Add sx={{ color: "#f96d02" }} />
          </IconButton>
        </MDBox>
        <Card style={{ backgroundColor: "#CCC1FF" }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Item>
                <b>Sales Type</b>
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>
                <b>Product</b>
              </Item>
            </Grid>
            <Grid item xs={2}>
              <Item>
                <b>Branch</b>
              </Item>
            </Grid>
            <Grid item xs={2}>
              <Item>
                <b>Price Per Unit (NGN)</b>
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>
                <h6>
                  <b>Quantity</b>
                </h6>
              </Item>
            </Grid>
            <Grid item xs={2}>
              <Item>
                <b>Amount (NGN)</b>
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>
                <b>Tax Amount</b>
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>
                <b>Total Amount (NGN)</b>
              </Item>
            </Grid>
          </Grid>
        </Card>
        &nbsp;
        <Grid>
          <div className="row">
            {counter.map((form, index) => {
              const amountxx = parseInt(form.pricePerUnit, 10) * parseInt(form.quantity, 10);
              const branchx = form.branchID;
              const totalAmountxx = parseInt(form.amount, 10) + parseInt(form.taxAmount, 10);
              const taxAmoun = parseInt(form.taxAmount, 10);
              // const tried = form.product;
              return (
                <>
                  <div className="col-sm-2">
                    {/* <MDInput
      type="text"
      value={namex || ""}
      onChange={(e) => setName(e.target.value)}
      // onKeyUp={handleOnNameKeys}
      label="First Name"
      variant="standard"
      fullWidth
    /> */}
                    {/* <TextField
      id="outlined-error-helper-text"
      label="Error"
      // defaultValue="Hello World"
      // helperText="Incorrect entry."
    /> */}
                    <MDBox>
                      <Form.Select
                        value={form.saleType}
                        aria-label="Default select example"
                        name="saleType"
                        onChange={(event) => handleFormChange(event, index)}
                      >
                        <option value="">Sales Type</option>
                        <option value="1">Product</option>
                        <option value="2">Company Service</option>
                        <option value="3">Custom Sales</option>
                      </Form.Select>
                    </MDBox>

                    {/* <input onChange={(e) => setName(e.target.value)} value={namex || ""} type="text" /> */}
                  </div>
                  <div className="col-sm-1">
                    <MDBox>
                      <Form.Select
                        value={form.salesID}
                        aria-label="Default select example"
                        name="product"
                        onChange={(event) => handleFormChange(event, index)}
                      >
                        <option>Select</option>
                        {form.psArray.map((apis) => (
                          <option key={apis.id} value={JSON.stringify(apis)}>
                            {apis.name}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </div>
                  <div className="col-sm-2">
                    <MDBox>
                      <Form.Select
                        value={branchx}
                        aria-label="Default select example"
                        name="branchID"
                        onChange={(event) => handleFormChange(event, index)}
                      >
                        <option>Branch</option>
                        {productBranx.map((apis) => (
                          <option key={apis.id} value={apis.id}>
                            {apis.name}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </div>
                  <div className="col-sm-2">
                    {/* <TextField
      id="outlined-error-helper-text"
      label="First Name"
      // defaultValue="Hello World"
      // helperText="Incorrect entry."
    /> */}
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={form.pricePerUnit}
                          label="Price Per Unit"
                          placeholder="Pice Per Unit "
                          size="small"
                          name="pricePerUnit"
                          // key={c}
                          // className={index}
                          type="number"
                          onChange={(event) => handleFormChange(event, index)}
                          // onChange={(e) => setPPQuantity(e.target.value)}
                          // onKeyUp={(e) => handleTaxAmount(e.target.value)}
                          required
                        />
                      </FormControl>
                    </Box>
                  </div>
                  <div className="col-sm-1">
                    <Box sx={{ minWidth: 100 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={form.quantity}
                          label="Quantity "
                          placeholder="Quantity "
                          name="quantity"
                          // key={c}
                          // className={index}
                          type="number"
                          size="small"
                          onChange={(event) => handleFormChange(event, index)}
                          // onChange={(e) => setQuantity(e.target.value)}
                          // onKeyUp={(e) => handleTaxAmount(e.target.value)}
                          required
                        />
                      </FormControl>
                    </Box>
                  </div>
                  <div className="col-sm-2">
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={amountxx}
                          label="Amount "
                          placeholder="Amount "
                          name="Amount"
                          // key={c}
                          // className={index}
                          size="small"
                          type="number"
                          // onChange={handleOnSelect2}
                          // onChange={(e) => handleOnlastChange(e)}
                          // onKeyUp={(e) => setAmount(e.target.value)}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </FormControl>
                    </Box>
                  </div>
                  <div className="col-sm-1">
                    {/* <Box sx={{ minWidth: 100 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={taxAmoun}
                          label="Tax Amount (NGN) "
                          placeholder="Tax Amount "
                          type="number"
                          name="taxAmount"
                          size="small"
                          onChange={(event) => handleFormChange(event, index)}
                          // onKeyUp={(e) => handleTaxAmount(e.target.value)}
                          required
                        />
                      </FormControl>
                    </Box> */}
                    <Box sx={{ minWidth: 100 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={taxAmoun}
                          label="Tax Amount (NGN) "
                          placeholder="Tax Amount "
                          size="small"
                          name="taxAmount"
                          // key={c}
                          // className={index}
                          type="number"
                          onChange={(event) => handleFormChange(event, index)}
                          // onChange={(e) => setPPQuantity(e.target.value)}
                          // onKeyUp={(e) => handleTaxAmount(e.target.value)}
                          required
                        />
                      </FormControl>
                    </Box>
                  </div>
                  <div className="col-sm-1">
                    <Box sx={{ minWidth: 100 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={totalAmountxx}
                          label="Total Amount "
                          placeholder="Total Amount "
                          type="number"
                          size="small"
                          name="totalAmount"
                          // onChange={(event) => handleFormChange(event, index)}
                          // onKeyUp={(e) => handleTaxAmount(e.target.value)}
                          // required
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </FormControl>
                    </Box>
                  </div>
                  <MDBox>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={() => removeFields(index)}
                    >
                      <CancelPresentationIcon sx={{ color: "#f96d02" }} />
                    </IconButton>
                  </MDBox>
                  <br />
                </>
              );
            })}
          </div>
          &nbsp; &nbsp;
        </Grid>
        <MDBox>
          <Container>
            <div className="row">
              <div className="col-sm-3">
                <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
                  <FormControl fullWidth>
                    <TextField
                      id="filled-number"
                      value={bonusAmountxx}
                      label="Bonus Amount (NGN) "
                      placeholder="Bonus Amount (NGN) "
                      type="number"
                      onChange={(e) => setBonusAmount(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </div>
              <div className="col-sm-3" />
              <div className="col-sm-3">
                <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
                  <FormControl fullWidth>
                    <TextField
                      id="filled-number"
                      value={subTotalAmountx}
                      label="Total Amount (NGN) "
                      placeholder="Total Amount (NGN) "
                      type="number"
                      name="totalAmount"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                </Box>
              </div>
            </div>
          </Container>
        </MDBox>
        <br />
        &nbsp; &nbsp;
        <MDBox style={{ paddingLeft: "30px" }}>
          <Container>
            <div className="row">
              <div className="col-sm-12">
                <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                  <Form.Label style={{ fontSize: 14 }}>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={commentx || ""}
                    onKeyUp={handleOnPortfolioKeys}
                    onChange={(e) => setComment(e.target.value)}
                    rows={2}
                  />
                </Form.Group>
              </div>
            </div>
          </Container>
        </MDBox>
        <br />
        &nbsp; &nbsp;
        <MDBox>
          {showPayment ? (
            <Container>
              <div className="row">
                <div className="col-sm-3">
                  <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
                    <FormControl fullWidth>
                      <MDTypography
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        style={Styles.textSx}
                      >
                        {/* Cash Payment: */}
                      </MDTypography>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="filled-number"> Cash Payment (NGN): </label>
                      <TextField
                        id="filled-number"
                        value={cashPaymentx}
                        label="Amount"
                        placeholder="Amount"
                        type="number"
                        onChange={(e) => setCashPayment(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
                    <FormControl fullWidth>
                      <MDTypography
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        style={Styles.textSx}
                      >
                        {/* Transfer Payment: */}
                      </MDTypography>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="filled-number"> Transfer Payment (NGN): </label>
                      <TextField
                        id="filled-number"
                        value={transferPaymentx}
                        label="Amount"
                        placeholder="Amount"
                        type="number"
                        onChange={(e) => setTransferPayment(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
                    <MDTypography
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      style={Styles.textSx}
                    >
                      {/* Card Payment: */}
                    </MDTypography>
                    <FormControl fullWidth>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="filled-number"> Card Payment (NGN): </label>
                      <TextField
                        id="filled-number"
                        value={cardPaymentx}
                        label="Amount"
                        placeholder="Amount"
                        type="number"
                        onChange={(e) => setCardPayment(e.target.value)}
                      />
                      <div>
                        <MonnifyConsumer {...monNey} className="btn">
                          {({ initializePayment }) => (
                            // eslint-disable-next-line react/button-has-type
                            <MDButton
                              variant="gradient"
                              onClick={() => initializePayment()}
                              color="info"
                              width="50%"
                            >
                              Pay using card
                            </MDButton>
                          )}
                        </MonnifyConsumer>
                      </div>
                    </FormControl>
                    {/* <MDBox mt={4} mb={1}>
                      <div>
                        <MonnifyConsumer {...monNey} className="btn">
                          {({ initializePayment }) => (
                            // eslint-disable-next-line react/button-has-type
                            <MDButton
                              variant="gradient"
                              onClick={() => initializePayment()}
                              color="info"
                              width="50%"
                            >
                              Pay
                            </MDButton>
                          )}
                        </MonnifyConsumer>
                      </div>
                    </MDBox> */}
                  </Box>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
                    <FormControl fullWidth>
                      <MDTypography
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        style={Styles.textSx}
                      >
                        {/* Cash Payment: */}
                      </MDTypography>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="filled-number"> Credit Facility (NGN): </label>
                      <TextField
                        id="filled-number"
                        value={creditFacilityx}
                        label="Credit Facility"
                        placeholder="Credit Facility"
                        type="number"
                        onChange={(e) => setCreditFacility(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </div>
              </div>
            </Container>
          ) : (
            <></>
          )}

          <MDBox style={{ paddingTop: "40px", paddingLeft: "400px" }}>
            <Container>
              <div className="row">
                <div className="col-sm-3">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <TextField
                        id="filled-number"
                        value={Payment}
                        label="Balance (NGN)"
                        placeholder="Balance (NGN)"
                        type="number"
                        name="balance"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </FormControl>
                  </Box>
                </div>
              </div>
            </Container>
          </MDBox>
        </MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton
            variant="gradient"
            onClick={Pay}
            style={Styles.buttonSx}
            width="50%"
            align="left"
          >
            Pay
          </MDButton>
        </MDBox>
        <MDBox mt={4} mb={1} align="center">
          <MDButton
            variant="gradient"
            onClick={handleValidate2}
            style={Styles.buttonSx}
            width="50%"
            align="left"
          >
            Print
          </MDButton>
        </MDBox>
      </Card>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Grid>
              <Grid item xs={6} md={6}>
                {" "}
                <HighlightOffIcon
                  onClick={handleClose}
                  fontSize="large"
                  style={{
                    padding: "5px",
                    color: "red",
                    float: "right",
                    cursor: "pointer",
                  }}
                />
                <MDBox>
                  <MDBox component="form" role="form">
                    <MDBox
                      variant="gradient"
                      borderRadius="lg"
                      coloredShadow="success"
                      mx={0}
                      mt={0}
                      p={3}
                      mb={1}
                      textAlign="center"
                      style={Styles.boxSx}
                    >
                      <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                        Add New Individual
                      </MDTypography>
                    </MDBox>
                    <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
                        {" "}
                      </MDTypography>
                      <MDTypography variant="gradient" fontSize="60%" color="error" id="email">
                        {" "}
                      </MDTypography>
                      <MDBox mb={0}>
                        <Container>
                          <div className="row">
                            <div className="col-sm-6">
                              <MDInput
                                type="text"
                                value={namex || ""}
                                onChange={(e) => setName(e.target.value)}
                                onKeyUp={handleOnNameKeys}
                                label="First Name"
                                variant="standard"
                                fullWidth
                              />
                            </div>
                            <div className="col-sm-6">
                              <MDInput
                                type="text"
                                value={lnamex || ""}
                                onChange={(e) => setLnamex(e.target.value)}
                                label="Last Name"
                                variant="standard"
                                fullWidth
                              />
                            </div>
                          </div>
                          &nbsp; &nbsp;
                          <div className="row">
                            <div className="col-sm-10">
                              <MDTypography
                                variant="button"
                                fontWeight="regular"
                                fontSize="80%"
                                textAlign="center"
                                color="text"
                              >
                                Title
                              </MDTypography>
                              <Form.Select
                                value={titlex}
                                onChange={(e) => setTitle(e.target.value)}
                                aria-label="Default select example"
                              >
                                <option value="">--Select Title--</option>
                                <option value="Bishop">Bishop</option>
                                <option value="Chancellor">Chancellor</option>
                                <option value="Comrade">Comrade</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Engineer">Engineer</option>
                                <option value="Excellency">Excellency</option>
                                <option value="Honorable">Honorable</option>
                                <option value="Imam">Imam</option>
                                <option value="Master">Master</option>
                                <option value="Miss">Miss</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Reverend">Reverend</option>
                                <option value="Pastor">Pastor</option>
                                <option value="Professor">Professor</option>
                                <option value="Pope">Pope</option>
                                <option value="Vice-Chancellor">Vice-Chancellor</option>
                                <option value="Other">Others...</option>
                              </Form.Select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <MDInput
                                type="text"
                                value={emailx || ""}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyUp={handleOnEmailKeys}
                                label="Email"
                                variant="standard"
                                fullWidth
                              />
                            </div>

                            <div className="col-sm-6">
                              <MDTypography variant="button" fontWeight="regular" color="text">
                                Phone Number
                              </MDTypography>
                              <PhoneInput
                                value={pnox}
                                inputStyle={{ width: "100%" }}
                                buttonStyle={{}}
                                onChange={setPno}
                              />
                            </div>
                          </div>
                        </Container>
                      </MDBox>
                    </MDBox>
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        onClick={handleValidate}
                        style={Styles.buttonSx}
                        width="50%"
                        align="left"
                      >
                        Save
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
      <br />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}
export default Sales;
