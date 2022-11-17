import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate, Link } from "react-router-dom";
// import CardContent from "@mui/material/CardContent";
// ZINOLEESKY

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import "./index.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import MixedChart from "examples/Charts/MixedChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import Button from "@mui/material/Button";
// import edit from "./edit/index";
// import Divider from "@mui/material/Divider";
// import CardActions from "@mui/material/CardActions";
// import Button from "@mui/material/Button";
// import { green } from "@mui/material/colors";
// import AccountCircle from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";

function ViewSingleIndividual() {
  const MySwal = withReactContent(Swal);
  // MODAL
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
    height: "60%",
    display: "block",
  };
  const scrollContainerStyle = { width: "100%", maxHeight: "95%" };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [openn, setOpenn] = React.useState(false);
  // const handleOpenn = () => setOpenn(true);
  // const handleClosee = () => setOpenn(false);
  // END OF MODAL

  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [titlex, setTitlex] = useState("");
  const [feed, setItems] = useState([]);
  const [checkedTitle, setCheckedTitle] = useState("");
  const [checkedMessage, setCheckedMessage] = useState("");
  const [messagex, setmessagex] = useState("");
  const [UID, setUID] = useState("");
  const [UTitle, setUTitle] = useState("");
  const [UMessage, setUMessage] = useState("");
  const [UTime, setUTime] = useState("");
  // const [showCard, setShowCard] = useState(false);
  const [UOpened, setUOpened] = useState(false);
  // const [supplyTitle, setSupplyTitle] = useState("");
  // const [supplyPayingAmount, setSupplyPayingAmount] = useState("");
  // const [supplyDateCreated, setSupplyDateCreated] = useState("");
  const [supply, setSupply] = useState([]);
  const [demand, setDemand] = useState([]);
  const [ticket, setTicket] = useState([]);

  const [supplyNo, setSupplyNo] = useState("");
  const [demandNo, setDemandNo] = useState("");
  const [ticketNo, setTicketNo] = useState("");
  const [demandSupplyNo, setDemandSupplyNo] = useState("");

  const [ctitlex, setCTitlex] = useState("");
  const [namex, setName] = useState("");
  const [lastEngagementTime, setLastEngagementTime] = useState("");
  // const [lnamex, setLnamex] = useState("");
  // const [onamex, setOnamex] = useState("");

  // const handleUClose = () => {
  //   setUOpened(false);
  //   showCard(false);
  // };
  const [product, setProduct] = useState([]);
  // const [productSupplyRequest, setProductSupplyRequest] = useState([]);
  // const { allGHeaders: miHeaders } = GHeaders();
  // console.log(setProductSupplyRequest);

  // eslint-disable-next-line no-unused-vars
  const [day, setDay] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [month, setMonth] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [year, setYear] = useState("");
  // const [createdByx, setCreatedBy] = useState("");
  // const [accountOwnerIDx, setAccountOwnerID] = useState("");
  // const [checkedState, setCheckedState] = useState("");
  // const [checkedCountry, setCheckedCountry] = useState("");

  // const [user, setUser] = useState([]);

  const [enabled, setEnabled] = useState("");
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleOnTitleKeys = () => {
    if (titlex.length === 0) {
      setCheckedTitle(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML = "Title is required<br>";
    }
    if (titlex.length > 0) {
      setCheckedTitle(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML = "";
    }
    setEnabled(checkedTitle === true && checkedMessage === true);
  };
  const handleOnMessageKeys = () => {
    if (messagex.length === 0) {
      setCheckedMessage(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("message").innerHTML = "Details is required<br>";
    }
    if (messagex.length > 0) {
      setCheckedMessage(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("message").innerHTML = "";
    }
    setEnabled(checkedTitle === true && checkedMessage === true);
  };
  // const handleOnStateKeys = () => {
  //   const letters = /^[a-zA-Z ]+$/;
  //   if (!cityx.match(letters)) {
  //     setCheckedState(false);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("state").innerHTML =
  //       "State - input only capital and small letters<br>";
  //   }
  //   if (cityx.match(letters)) {
  //     setCheckedState(true);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("state").innerHTML = "";
  //   }
  //   // if (cityx.length === 0) {
  //   //   // eslint-disable-next-line no-unused-expressions
  //   //   document.getElementById("city").innerHTML = "Name is required<br>";
  //   // }
  //   setEnabled(checkedState === true);
  // };
  // const handleOnCountryKeys = () => {
  //   const letters = /^[a-zA-Z ]+$/;
  //   if (!countryx.match(letters)) {
  //     setCheckedCountry(false);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("country").innerHTML =
  //       "State - input only capital and small letters<br>";
  //   }
  //   if (countryx.match(letters)) {
  //     setCheckedCountry(true);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("country").innerHTML = "";
  //   }
  //   // if (cityx.length === 0) {
  //   //   // eslint-disable-next-line no-unused-expressions
  //   //   document.getElementById("city").innerHTML = "Name is required<br>";
  //   // }
  //   setEnabled(checkedCountry === true);
  // };
  const handleUpdateView = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    const raw = JSON.stringify({
      id: UID,
      orgID: orgIDs,
      clientType: 1,
      clientID: ids,
      title: UTitle,
      message: UMessage,
      createdBy: personalIDs,
      createdTime: UTime,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_LOUGA_URL}/feeds/update`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        setUOpened(false);
        // showCard(false);
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
  };

  const handleCreate = (e) => {
    handleOnTitleKeys();
    handleOnMessageKeys();
    if (enabled) {
      setOpened(true);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      const personalIDs = data11.personalID;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const ids = urlParams.get("id");

      const raw = JSON.stringify({
        orgID: orgIDs,
        clientType: 1,
        clientID: ids,
        title: titlex,
        message: messagex,
        createdBy: personalIDs,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_LOUGA_URL}/feeds/add`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          setOpened(false);
          handleClose();
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

          // handleOnTitleKeys(false);
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          // handleOnTitleKeys(false)
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
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    const clientIDs = ids;
    const type = 1;
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_LOUGA_URL}/feeds/getClientFeeds/${orgIDs}/${clientIDs}/${type}`,
      {
        headers,
      }
    )
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
          if (result.length > 0) {
            setItems(result);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const ids = data11.id;

    let isMounted = true;
    setOpened(true);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/getByIds/${ids}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        console.log(result);
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
          // eslint-disable-next-line eqeqeq
          if (result.length != 0) {
            setName(result[0].fname);
            // setLnamex(result[0].lname);
            // setOnamex(result[0].oname);
            setCTitlex(result[0].title);
            setOpened(false);
          }
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

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    const clientIDs = ids;

    const clientTypes = 1;
    const date = new Date();
    // const endTime = new Date(date.getFullYear(), date.getMonth(), 1);
    // const endTime = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();
    // const endTime = new Date(date.getFullYear(), date.getMonth() + 0);
    // const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    // const endTime = new Date().toISOString().slice(0, 10).getTime();
    const endTime = new Date().getTime();
    const startTime = new Date(date.getFullYear(), date.getMonth() - 1, 1).getTime();
    // const endTime = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    // const endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`.getTime();
    // const endTime = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`.getTime();
    // console.log(startTime);
    // console.log(endTime);
    // const dateString = String.valueOf(startTime);
    // // const tired = String(dateString).substring(4, 11) + String(dateString).substring(30).toString();

    // const dateStringx = String.valueOf(endTime);
    // const tiredx =
    //   String(dateStringx).substring(4, 11) + String(dateStringx).substring(30).toString();

    // const dateString = "Wed Jun 1 00:00:00 GMT 2022";
    // const dateObj = new Date(dateString);

    // const startTime = dateObj.toDateString();
    // const dateStringx = "Sun Jun 26 00:00:00 GMT 2022";
    // const dateObjx = new Date(dateStringx);

    // const endTime = dateObjx.toDateString();

    // 1654038000000
    // index.js:631 1656198000000

    console.log(startTime);
    console.log(endTime);

    // console.log(dateObj.toDateString());
    // outputs Mon May 25 2020

    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_LOUGA_URL}/supply/getForClient/${orgIDs}/${clientIDs}/${clientTypes}/?startTime=${startTime}&endTime=${endTime}`,
      { headers }
    )
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
          console.log(result);
          if (result.length !== 0) {
            setSupply(result);
            setSupplyNo(result.length);
          } else {
            setSupplyNo(0);
          }
          console.log(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const headers = miHeaders;
    // const data11 = JSON.parse(localStorage.getItem("user1"));
    // const orgIDs = data11.orgID;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    const clientIDs = ids;

    const clientTypes = 1;
    // const date = new Date();
    // const endTime = new Date().getTime();
    // const startTime = new Date(date.getFullYear(), date.getMonth() - 1, 1).getTime();
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/demands/getForClient/${clientIDs}/${clientTypes}`, {
      headers,
    })
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
          console.log(result);
          // setSupply(result);
          if (result.length === 0) {
            setDemand([]);
            setDemandNo(0);
          } else {
            setDemand(result);
            setDemandNo(result.length);
          }
          // if (result.length > 0) {
          //   setSupply(result);
          // }
          console.log(result);
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

    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const ids = urlParams.get("id");

    // const clientIDs = ids;

    // const clientTypes = 1;
    // const date = new Date();
    // const endTime = new Date().getTime();
    // const startTime = new Date(date.getFullYear(), date.getMonth() - 1, 1).getTime();
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/supply/getQuantityConversionRate/${orgIDs}`, {
      headers,
    })
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
          console.log(result);
          if (result.length === 0) {
            setDemandSupplyNo(0);
          } else {
            setDemandSupplyNo(result.length);
          }

          console.log(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // useEffect(() => {
  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const orgIDs = data11.orgID;
  //   const clientID = data11.personalID;
  //   const clientType = 1;
  //   const date = new Date();
  //   const startTime = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  //   const endTime = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();
  //   // const startTime = 0;
  //   // const endTime = 0;
  //   let isMounted = true;
  //   fetch(
  //     `${process.env.REACT_APP_LOUGA_URL}/tickets/getFiltered`,
  //     {
  //       headers,
  //     }
  //   )
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
  //         console.log(result);
  //         setSupply(result);
  //         // if (result.length < 0) {
  //         //   console.log("Empty");
  //         // }
  //         // if (result.length > 0) {
  //         //   setSupplyTitle(result[0].title);
  //         //   // setSupplyPayingAmount(result[0].payingAmount);
  //         //   // setSupplyDateCreated(result[0].dateCreated);
  //         //   setSupply(result);
  //         // }
  //         console.log(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
  const handleView = (filteredData) => {
    console.log(filteredData);
    setUID(filteredData.id);
    setUTitle(filteredData.title);
    setUMessage(filteredData.message);
    setUTime(filteredData.createdTime);

    // console.log(showCard);
    // handleOpenn();
    // setShowCard(true);
    setUOpened(true);
    // console.log(showCard);
  };

  // const handleLink = () => {
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const ids = urlParams.get("id");
  //   navigate(`/supply/viewSupply?id=${ids}`);
  // };

  useEffect(() => {
    // const headers = myHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    const clientIDs = ids;
    // const isAssignedx = data11.personalID;

    const clientTypes = 1;
    const date = new Date(1654902000000);
    const endTimex = new Date().getTime();
    const startTimex = new Date(date.getFullYear(), date.getMonth() - 1, 1).getTime();

    // {
    //   "orgID": "orgIDs",//
    //   "startTime": 0,//
    //   "endTime": 0,//
    //   "clientType": 0,//
    //   "clientID": "string",//
    //   "isAssigned": "string",
    //   "agentID": "string"
    // }

    const raw = JSON.stringify({
      orgID: orgIDs,
      startTime: startTimex,
      endTime: endTimex,
      clientType: clientTypes,
      clientID: clientIDs,
      // isAssigned: isAssignedx,
      // agentID: clientIDs,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/tickets/getFiltered`, requestOptions)
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
          console.log(result);
          // setSupply(result);
          if (result.length !== 0) {
            setTicket(result);
            setTicketNo(result.length);
          } else {
            setTicketNo(0);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const cardBorder = {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  };
  // <------------------------------------------------>
  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    fetch(`${process.env.REACT_APP_LOUGA_URL}/products/getByIds/${ids}`, {
      headers,
    })
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
      });
  }, []);

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    const date = new Date();
    const endTime = new Date().getTime();
    const startTime = new Date(date.getFullYear(), date.getMonth() - 1, 1).getTime();
    const clientID = ids;

    const clientType = 1;
    console.log(date);
    console.log(startTime);
    console.log(endTime);
    // console.log(productSupplyRequest);
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_LOUGA_URL}/supply/getClientsPreference/${orgIDs}/${clientID}/${clientType}?startTime=${startTime}&endTime=${endTime} `,
      {
        headers,
      }
    )
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
          setProduct(result);

          console.log(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const changeDateandTime = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    let hour = "0";
    let minutes = "0";
    let seconds = "0";

    if (date.getHours() < 10) {
      hour += date.getHours();
    } else {
      hour = date.getHours();
    }

    if (date.getMinutes() < 10) {
      minutes += date.getMinutes();
    } else {
      minutes = date.getMinutes();
    }

    if (date.getSeconds() < 10) {
      seconds += date.getSeconds();
    } else {
      seconds = date.getSeconds();
    }
    let newDate = `${retDate} ${hour}:${minutes}:${seconds} AM`;
    if (hour > "12") {
      const nHour = parseInt(hour, 10) - 12;
      newDate = `${retDate} ${nHour}:${minutes}:${seconds} PM`;
    }
    return newDate;
  };

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    const clientID = ids;

    const clientType = 1;
    // console.log(productSupplyRequest);
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_LOUGA_URL}/supply/getLastClientEngagement/${orgIDs}/${clientType}/${clientID} `,
      {
        headers,
      }
    )
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
          setLastEngagementTime(changeDateandTime(result));
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // const styleSx = {
  //   height: 150,
  //   maxHeight: "100%",
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   p: 4,
  //   display: "block",
  // };

  const styleSxx = {
    display: "flex",
    justifyContent: "center",
    height: 140,
    maxHeight: "100%",
    alignItems: "center",
  };

  const styleT = {
    display: "flex",
    justifyContent: "center",
    height: 399,
    maxHeight: "100%",
  };

  const styleDST = {
    display: "flex",
    justifyContent: "center",
    height: 195,
    maxHeight: "100%",
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container spacing={0.5}>
                <Grid item xs={9}>
                  <Grid container spacing={0}>
                    <Grid item xs={3}>
                      <Paper sx={styleSxx} variant="outlined" square>
                        <MDBox
                          variant="gradient"
                          bgColor="primary"
                          borderRadius="lg"
                          coloredShadow="success"
                          mt={0}
                          mx={2}
                          p={1}
                          textAlign="center"
                          sx={{ width: 100, height: 120 }}
                        >
                          <MDTypography
                            variant="h6"
                            fontWeight="medium"
                            fontSize="50%"
                            color="white"
                            textAlign="center"
                          >
                            NO OF TICKETS
                          </MDTypography>
                          <MDTypography
                            variant="h1"
                            fontWeight="medium"
                            fontSize="300%"
                            color="white"
                            textAlign="center"
                          >
                            {ticketNo || 0}
                          </MDTypography>
                        </MDBox>
                      </Paper>{" "}
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={styleSxx} variant="outlined" square>
                        <MDBox
                          variant="gradient"
                          bgColor="warning"
                          borderRadius="lg"
                          coloredShadow="success"
                          mt={0}
                          mx={2}
                          p={1}
                          textAlign="center"
                          sx={{ width: 100, height: 120 }}
                        >
                          <MDTypography
                            variant="h6"
                            fontWeight="medium"
                            fontSize="50%"
                            color="white"
                            textAlign="center"
                          >
                            NO OF DEMAND
                          </MDTypography>
                          <MDTypography
                            variant="h1"
                            fontWeight="medium"
                            fontSize="300%"
                            color="white"
                            textAlign="center"
                          >
                            {demandNo || 0}
                          </MDTypography>
                        </MDBox>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={styleSxx} variant="outlined" square>
                        <MDBox
                          variant="gradient"
                          bgColor="success"
                          borderRadius="lg"
                          coloredShadow="success"
                          mt={0}
                          mx={2}
                          p={1}
                          textAlign="center"
                          sx={{ width: 100, height: 120 }}
                        >
                          <MDTypography
                            variant="h6"
                            fontWeight="medium"
                            fontSize="50%"
                            color="white"
                            textAlign="center"
                          >
                            NO OF SUPPLY
                          </MDTypography>
                          <MDTypography
                            variant="h1"
                            fontWeight="medium"
                            fontSize="300%"
                            color="white"
                            textAlign="center"
                          >
                            {supplyNo || 0}
                          </MDTypography>
                        </MDBox>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={styleSxx} variant="outlined" square>
                        <MDBox
                          variant="gradient"
                          bgColor="secondary"
                          borderRadius="lg"
                          coloredShadow="success"
                          mt={0}
                          mx={2}
                          p={1}
                          textAlign="center"
                          sx={{ width: 100, height: 120 }}
                        >
                          <MDTypography
                            variant="h6"
                            fontWeight="medium"
                            fontSize="50%"
                            color="white"
                            textAlign="center"
                          >
                            NO OF DEMAND SUPPLIED
                          </MDTypography>
                          <MDTypography
                            variant="h1"
                            fontWeight="medium"
                            fontSize="300%"
                            color="white"
                            textAlign="center"
                            mt={-2}
                          >
                            {demandSupplyNo || 0}
                          </MDTypography>
                        </MDBox>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Paper sx={styleSxx} variant="outlined" square>
                    <MDBox
                      variant="gradient"
                      bgColor="primary"
                      borderRadius="lg"
                      coloredShadow="success"
                      mt={0}
                      mx={2}
                      p={1}
                      textAlign="left"
                    >
                      <MDTypography
                        variant="h6"
                        fontWeight="medium"
                        fontSize="70%"
                        color="white"
                        textAlign="center"
                      >
                        CLIENT
                      </MDTypography>
                      <MDTypography
                        variant="h6"
                        fontWeight="medium"
                        color="white"
                        textAlign="center"
                        mt={1}
                      >
                        {ctitlex}&nbsp;{namex || "Name"}
                      </MDTypography>
                      <MDTypography
                        variant="h6"
                        fontWeight="medium"
                        fontSize="70%"
                        color="white"
                        textAlign="center"
                      >
                        Last Engagement
                      </MDTypography>
                      <MDTypography
                        variant="h6"
                        fontWeight="medium"
                        color="white"
                        textAlign="center"
                        mt={1}
                      >
                        {lastEngagementTime}
                      </MDTypography>
                    </MDBox>
                  </Paper>
                </Grid>
              </Grid>
              <MDBox my={1} />
              <Grid container spacing={0.5}>
                <Grid item xs={6}>
                  {" "}
                  <Paper sx={styleT} variant="outlined" square>
                    <MDBox sx={{ maxHeight: 399 }}>
                      <div
                        className="scrollbar scrollbar-primary mt-2 mx-auto"
                        style={scrollContainerStyle}
                      >
                        <MDBox mb={1.5}>
                          <MDBox
                            variant="gradient"
                            bgColor="info"
                            borderRadius="lg"
                            coloredShadow="success"
                            mt={0}
                            mx={2}
                            p={1}
                            mb={2}
                            textAlign="left"
                          >
                            <MDTypography
                              variant="h4"
                              fontWeight="medium"
                              color="white"
                              textAlign="center"
                              mt={1}
                            >
                              Tickets
                            </MDTypography>
                          </MDBox>
                          <Container>
                            <div className="row">
                              <MDBox>
                                {ticket.map((item, index) => (
                                  <Link to={`/Tickets/Chats?id=${item.id}`}>
                                    <Grid item xs={12} md={12} lg={12} key={item.id}>
                                      <Card sx={{ maxWidth: 345 }}>
                                        <CardContent>
                                          <MDTypography
                                            variant="h6"
                                            color="text"
                                            fontSize="75%"
                                            textAlign="left"
                                            mt={1}
                                          >
                                            {`${index + 1}.`} Client&apos;s Name - {item.clientName}
                                          </MDTypography>
                                          <MDTypography
                                            variant="h6"
                                            color="text"
                                            fontSize="75%"
                                            textAlign="left"
                                            mt={1}
                                          >
                                            Channel - {item.channel}
                                          </MDTypography>
                                          <MDTypography
                                            variant="h6"
                                            color="text"
                                            fontSize="75%"
                                            textAlign="left"
                                            mt={0}
                                          >
                                            Priority - {item.priority}
                                          </MDTypography>
                                        </CardContent>
                                      </Card>
                                      &nbsp;
                                    </Grid>
                                  </Link>
                                ))}
                              </MDBox>
                            </div>
                          </Container>
                        </MDBox>
                      </div>
                    </MDBox>
                  </Paper>{" "}
                </Grid>{" "}
                <Grid item xs={6}>
                  {" "}
                  <Paper sx={styleDST} variant="outlined" square>
                    <MDBox sx={{ maxHeight: 195 }}>
                      <div
                        className="scrollbar scrollbar-primary mt-2 mx-auto"
                        style={scrollContainerStyle}
                      >
                        <MDBox mb={1.5}>
                          <MDBox
                            variant="gradient"
                            bgColor="success"
                            borderRadius="lg"
                            coloredShadow="success"
                            mt={0}
                            mx={2}
                            p={1}
                            mb={2}
                            textAlign="left"
                          >
                            <MDTypography
                              variant="h4"
                              fontWeight="medium"
                              color="white"
                              textAlign="center"
                              mt={1}
                            >
                              Demand
                            </MDTypography>
                          </MDBox>
                          <Container>
                            <div className="row">
                              <MDBox>
                                {demand.map((item, index) => (
                                  <Link to={`/demand/view-Demand?id=${item.id}`}>
                                    <Grid item xs={12} md={12} lg={12} key={item.id}>
                                      <Card>
                                        <CardContent>
                                          <MDTypography
                                            variant="h6"
                                            color="text"
                                            fontSize="75%"
                                            textAlign="left"
                                            mt={1}
                                          >
                                            {`${index + 1}.`} Title - {item.title}
                                          </MDTypography>
                                          <MDTypography
                                            variant="h6"
                                            color="text"
                                            fontSize="75%"
                                            textAlign="left"
                                            mt={1}
                                          >
                                            Paying Amount - {item.payingAmount}
                                          </MDTypography>
                                          <MDTypography
                                            variant="h6"
                                            color="text"
                                            fontSize="75%"
                                            textAlign="left"
                                            mt={0}
                                          >
                                            Date Created - {changeDate(item.createdTime)}
                                          </MDTypography>
                                        </CardContent>
                                      </Card>
                                      &nbsp;
                                    </Grid>
                                  </Link>
                                ))}
                              </MDBox>
                            </div>
                          </Container>
                        </MDBox>
                      </div>
                    </MDBox>
                  </Paper>
                  <MDBox my={1} />
                  <Paper sx={styleDST} variant="outlined" square>
                    <MDBox sx={{ maxHeight: 195 }}>
                      <div
                        className="scrollbar scrollbar-primary mt-2 mx-auto"
                        style={scrollContainerStyle}
                      >
                        <MDBox mb={1.5}>
                          <MDBox
                            variant="gradient"
                            bgColor="primary"
                            borderRadius="lg"
                            coloredShadow="success"
                            mt={0}
                            mx={2}
                            p={1}
                            mb={2}
                            textAlign="left"
                          >
                            <MDTypography
                              variant="h4"
                              fontWeight="medium"
                              color="white"
                              textAlign="center"
                              mt={1}
                            >
                              Supply
                            </MDTypography>
                          </MDBox>
                          <Container>
                            <div className="row">
                              <MDBox>
                                {supply.map((item, index) => (
                                  <Link to={`/supply/view-Supply?id=${item.id}`}>
                                    <Grid item xs={12} md={12} lg={12} key={item.id}>
                                      <Card>
                                        <CardContent>
                                          {/* <MDTypography
                                        variant="h5"
                                        fontWeight="medium"
                                        fontSize="120%"
                                        color="info"
                                        textAlign="left"
                                        mt={1}
                                      >
                                        {item.title}
                                      </MDTypography> */}
                                          {/* <MDTypography
                                    variant="h6"
                                    color="text"
                                    fontSize="75%"
                                    textAlign="left"
                                    mt={1}
                                  >
                                    You have been selected for this Appraisal
                                  </MDTypography> */}
                                          <MDTypography
                                            variant="h6"
                                            color="text"
                                            fontSize="75%"
                                            textAlign="left"
                                            mt={1}
                                          >
                                            {`${index + 1}.`} Title - {item.title}
                                          </MDTypography>
                                          <MDTypography
                                            variant="h6"
                                            color="text"
                                            fontSize="75%"
                                            textAlign="left"
                                            mt={1}
                                          >
                                            Paying Amount - {item.payingAmount}
                                          </MDTypography>
                                          <MDTypography
                                            variant="h6"
                                            color="text"
                                            fontSize="75%"
                                            textAlign="left"
                                            mt={0}
                                          >
                                            Date Created - {changeDate(item.createdTime)}
                                          </MDTypography>
                                        </CardContent>
                                        {/* <CardActions>
                                  <div align="right">
                                    <MDButton
                                      variant="gradient"
                                      color="info"
                                      onClick={() => handleAppraise(item.id)}
                                      width="50%"
                                    >
                                      Appraise
                                    </MDButton>
                                  </div>
                                </CardActions> */}
                                      </Card>
                                      &nbsp;
                                    </Grid>
                                  </Link>
                                ))}
                              </MDBox>
                            </div>
                          </Container>
                        </MDBox>
                      </div>
                    </MDBox>
                  </Paper>
                </Grid>
              </Grid>
              <MDBox my={1} />
              <Grid container spacing={0.5}>
                <Grid item xs={6}>
                  {" "}
                </Grid>{" "}
                <Grid item xs={6}>
                  {" "}
                </Grid>
              </Grid>
              &nbsp;
            </Grid>
            <Grid item xs={4}>
              <Card style={{ height: 545, maxHeight: 545, backgroundColor: "#B2C8DF" }}>
                {/* <Card sx={{ width: "absolute" }}> */}
                <MDTypography variant="h4" fontWeight="medium" color="text" mt={1}>
                  <MDBox mt={4} mb={1} ml={12}>
                    <MDButton
                      variant="gradient"
                      onClick={handleOpen}
                      color="info"
                      width="50%"
                      align="left"
                    >
                      Create feed
                    </MDButton>
                  </MDBox>
                </MDTypography>
                <div
                  className="scrollbar scrollbar-primary mt-2 mx-auto"
                  style={scrollContainerStyle}
                >
                  {feed.map((item) => (
                    <Accordion
                      key={item.id}
                      style={{
                        width: 270,
                        margin: "20px",
                        borderRadius: "20px",
                        overflow: "hidden",
                        variant: "gradient",
                        backgroundColor: "#6E85B7",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <EditTwoToneIcon onClick={() => handleView(item)} />
                        &nbsp; &nbsp;
                        <Typography
                          gutterBottom
                          variant="h5"
                          fontSize="90%"
                          style={{ color: "FF4949" }}
                          component="div"
                        >
                          {item.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          variant="h4"
                          fontSize="80%"
                          fontWeight="light"
                          style={{ color: "white" }}
                        >
                          {item.message}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontSize="60%"
                          style={{ color: "black" }}
                          fontWeight="light"
                        >
                          {changeDate(item.createdTime)}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              </Card>
              &nbsp; &nbsp;
              {/* </Card> */}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <div>
                    {/* <Card sx={{ maxHeight: 350 }}> */}
                    <MDBox>
                      <Grid item xs={12} md={12} lg={12}>
                        <MDBox>
                          <div
                            style={{
                              width: "auto",
                              height: "auto",
                            }}
                          >
                            <ThemeProvider theme={darkTheme}>
                              {product.length > 0 && (
                                <MixedChart
                                  inkBarStyle={{ backgroundColor: "blue" }}
                                  // title="Ticket's Chart"
                                  description="ALL PRODUCT/PACKAGE SUPPLY REQUEST"
                                  chart={{
                                    labels: [
                                      `${product[0].product.name}`,
                                      `${product[1].product.name}`,
                                      // `${product[2].product.name}`,
                                    ],
                                    datasets: [
                                      {
                                        chartType: "Bar Chart",
                                        label: "TOTAL REQUEST",
                                        color: "success",
                                        data: [
                                          product[0].totalRequests,
                                          product[1].totalRequests,
                                          // product[2].totalRequests,
                                        ],
                                      },
                                    ],
                                  }}
                                />
                              )}
                            </ThemeProvider>
                          </div>
                        </MDBox>
                      </Grid>
                    </MDBox>
                    {/* </Card> */}
                  </div>
                </Card>
                &nbsp;
              </Grid>
            </Grid>
            <Grid>
              {/* <Card>
                &nbsp;
                <div
                  className="scrollbar scrollbar-primary mt-2 mx-auto"
                  style={scrollContainerStyle}
                >
                  <Container>
                    <div className="row">
                      {supply.map((item) => (
                        <Grid item xs={12} md={12} lg={12} key={item.id}>
                          <Card sx={{ maxWidth: 345 }}>
                            <CardContent>
                              {/* <MDTypography
                      variant="h5"
                      fontWeight="medium"
                      fontSize="120%"
                      color="info"
                      textAlign="left"
                      mt={1}
                    >
                      {item.personal.fname} &nbsp; {item.personal.lname}
                    </MDTypography> 

                              <MDTypography
                                variant="h6"
                                color="text"
                                fontSize="75%"
                                textAlign="left"
                                mt={1}
                              >
                                Title - {item.title}
                              </MDTypography>
                              <MDTypography
                                variant="h6"
                                color="text"
                                fontSize="75%"
                                textAlign="left"
                                mt={0}
                              >
                                Paying Amount - {item.payingAmount}
                              </MDTypography>
                              <MDTypography
                                variant="h6"
                                color="text"
                                fontSize="75%"
                                textAlign="left"
                                mt={0}
                              >
                                Date Created - {item.dateCreated}
                              </MDTypography>
                            </CardContent>
                          </Card>
                          &nbsp;
                        </Grid>
                      ))}
                    </div>
                  </Container>
                </div>
              </Card> */}
            </Grid>
          </Grid>
        </Box>
      </MDBox>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                Create Feed
              </MDTypography>
            </MDBox>
            <MDBox
              variant="gradient"
              sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              borderRadius="lg"
              coloredShadow="success"
              mx={3}
              mt={1}
              p={1}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="gradient" fontSize="60%" color="error" id="title">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="error" id="message">
                {" "}
              </MDTypography>
            </MDBox>

            <Typography sx={{ mt: 2 }}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
                value={titlex || ""}
                onChange={(e) => setTitlex(e.target.value)}
                onKeyUp={handleOnTitleKeys}
              >
                {" "}
                <TextField id="standard-basic" label="Title" variant="standard" />
              </Box>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Details"
                style={{ width: 300 }}
                value={messagex || ""}
                onChange={(e) => setmessagex(e.target.value)}
                onKeyUp={handleOnMessageKeys}
              />
              <MDBox mt={4} mb={1}>
                <MDButton
                  ml={1}
                  variant="gradient"
                  onClick={handleCreate}
                  color="info"
                  width="50%"
                  align="left"
                >
                  create
                </MDButton>
                &nbsp; &nbsp;
                <MDButton
                  pl={10}
                  variant="gradient"
                  onClick={handleClose}
                  color="error"
                  width="50%"
                  align="right"
                >
                  cancel
                </MDButton>
              </MDBox>
            </Typography>
          </Box>
        </Modal>
      </div>
      {/* <div>
        <Grid item xs={6} md={3} lg={4}>
          <Card sx={{ maxHeight: 350 }}>
            <div className="scrollbar scrollbar-primary mt-2 mx-auto" style={scrollContainerStyle}>
              <MDBox mb={1.5}>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="success"
                  mt={2}
                  mx={0}
                  p={1}
                  mb={3}
                  textAlign="left"
                >
                  <MDTypography
                    variant="h4"
                    fontWeight="medium"
                    color="white"
                    textAlign="center"
                    mt={1}
                  >
                    {/* {supplyTitle} 
                  </MDTypography>
                </MDBox>
                <Container>
                  <div className="row">
                    {supply.map((api) => (
                      <Grid container spacing={0} key={api.id}>
                        <Grid item xs={12} md={12} lg={12}>
                          <MDBox mb={2}>
                            <Link to="/supply/viewSupply">
                              <Card style={{ backgroundColor: "#318CE7" }}>
                                <CardContent>
                                  <MDTypography
                                    variant="h4"
                                    fontWeight="medium"
                                    color="white"
                                    textAlign="left"
                                    mt={1}
                                  >
                                    {api.payingAmount}
                                  </MDTypography>
                                  <div
                                    style={{
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      width: "10rem",
                                      color: "#f5f5f5",
                                      whiteSpace: "nowrap",
                                      fontSize: "80%",
                                    }}
                                  >
                                    <p>{api.dateCreated}</p>
                                  </div>
                                </CardContent>
                              </Card>{" "}
                            </Link>
                          </MDBox>
                        </Grid>
                      </Grid>
                    ))}
                  </div>
                </Container>
              </MDBox>
            </div>
          </Card>
        </Grid>
      </div> */}

      <div>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={UOpened}>
          <Card sx={style} style={cardBorder}>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                Update Feed
              </MDTypography>
            </MDBox>
            <MDBox
              variant="gradient"
              sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              borderRadius="lg"
              coloredShadow="success"
              mx={3}
              mt={1}
              p={1}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="gradient" fontSize="60%" color="error" id="title">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="error" id="message">
                {" "}
              </MDTypography>
            </MDBox>

            <Typography sx={{ mt: 2 }}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
              >
                {" "}
                <TextField
                  id="standard-basic"
                  autoComplete="off"
                  value={UTitle || ""}
                  onChange={(e) => setUTitle(e.target.value)}
                  // onKeyUp={handleOnUTitleKeys}
                  label="Title"
                  variant="standard"
                />
              </Box>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Details"
                style={{ width: 300 }}
                value={UMessage || ""}
                onChange={(e) => setUMessage(e.target.value)}
                // onKeyUp={handleOnUMessageKeys}
              />
              <MDBox mt={4} mb={1}>
                <MDButton
                  ml={1}
                  variant="gradient"
                  onClick={handleUpdateView}
                  color="info"
                  width="50%"
                  align="left"
                >
                  Edit
                </MDButton>
                &nbsp; &nbsp;
                <MDButton
                  pl={10}
                  variant="gradient"
                  onClick={() => setUOpened(false)}
                  color="error"
                  width="50%"
                  align="right"
                >
                  cancel
                </MDButton>
              </MDBox>
            </Typography>
          </Card>
        </Backdrop>
      </div>
      <div>
        {/* <Modal
          open={openn}
          onClose={handleClosee}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                Update Feed
              </MDTypography>
            </MDBox>
            <MDBox
              variant="gradient"
              sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              borderRadius="lg"
              coloredShadow="success"
              mx={3}
              mt={1}
              p={1}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="gradient" fontSize="60%" color="error" id="title">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="error" id="message">
                {" "}
              </MDTypography>
            </MDBox>

            <Typography sx={{ mt: 2 }}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
              >
                {" "}
                <TextField
                  id="standard-basic"
                  autoComplete="off"
                  value={UTitle || ""}
                  onChange={(e) => setUTitle(e.target.value)}
                  // onKeyUp={handleOnUTitleKeys}
                  label="Title"
                  variant="standard"
                />
              </Box>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Details"
                style={{ width: 300 }}
                value={UMessage || ""}
                onChange={(e) => setUMessage(e.target.value)}
                // onKeyUp={handleOnUMessageKeys}
              />
              <MDBox mt={4} mb={1}>
                <MDButton
                  ml={1}
                  variant="gradient"
                  onClick={handleUpdateView}
                  color="info"
                  width="50%"
                  align="left"
                >
                  Edit
                </MDButton>
                &nbsp; &nbsp;
                <MDButton
                  pl={10}
                  variant="gradient"
                  onClick={handleClosee}
                  color="error"
                  width="50%"
                  align="right"
                >
                  cancel
                </MDButton>
              </MDBox>
            </Typography>
          </Box>
        </Modal> */}
      </div>

      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default ViewSingleIndividual;
