import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate, Link } from "react-router-dom";

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
import Paper from "@mui/material/Paper";
// ZINOLEESKY

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
  const [UOpened, setUOpened] = useState(false);
  const [supply, setSupply] = useState([]);
  const [demand, setDemand] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [assetsx, setAssets] = useState([]);

  const [supplyNo, setSupplyNo] = useState("");
  const [demandNo, setDemandNo] = useState("");
  const [ticketNo, setTicketNo] = useState("");
  const [demandSupplyNo, setDemandSupplyNo] = useState("");

  const [ctitlex, setCTitlex] = useState("");
  const [namex, setName] = useState("");
  const [lastEngagementTime, setLastEngagementTime] = useState("");
  const [product, setProduct] = useState([]);

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
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
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
          // eslint-disable-next-line eqeqeq
          if (result.length != 0) {
            setName(result[0].fname);
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
    const endTime = new Date().getTime();
    const startTime = new Date(date.getFullYear(), date.getMonth() - 1, 1).getTime();

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
          if (result.length !== 0) {
            setSupply(result);
            setSupplyNo(result.length);
          } else {
            setSupplyNo(0);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    const clientIDs = ids;

    const clientTypes = 1;
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
          if (result.length === 0) {
            setDemand([]);
            setDemandNo(0);
          } else {
            setDemand(result);
            setDemandNo(result.length);
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
          if (result.length === 0) {
            setDemandSupplyNo(0);
          } else {
            setDemandSupplyNo(result.length);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleView = (filteredData) => {
    setUID(filteredData.id);
    setUTitle(filteredData.title);
    setUMessage(filteredData.message);
    setUTime(filteredData.createdTime);

    setUOpened(true);
  };

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    const clientIDs = ids;

    const clientTypes = 1;
    const date = new Date(1654902000000);
    const endTimex = new Date().getTime();
    const startTimex = new Date(date.getFullYear(), date.getMonth() - 1, 1).getTime();

    const raw = JSON.stringify({
      orgID: orgIDs,
      startTime: startTimex,
      endTime: endTimex,
      clientType: clientTypes,
      clientID: clientIDs,
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
        if (isMounted) {
          setProduct(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // const changeDateandTime = (timestamp) => {
  //   const date = new Date(timestamp);
  //   const retDate = date.toDateString();
  //   let hour = "0";
  //   let minutes = "0";
  //   let seconds = "0";

  //   if (date.getHours() < 10) {
  //     hour += date.getHours();
  //   } else {
  //     hour = date.getHours();
  //   }

  //   if (date.getMinutes() < 10) {
  //     minutes += date.getMinutes();
  //   } else {
  //     minutes = date.getMinutes();
  //   }

  //   if (date.getSeconds() < 10) {
  //     seconds += date.getSeconds();
  //   } else {
  //     seconds = date.getSeconds();
  //   }
  //   let newDate = `${retDate} ${hour}:${minutes}:${seconds} AM`;
  //   if (hour > "12") {
  //     const nHour = parseInt(hour, 10) - 12;
  //     newDate = `${retDate} ${nHour}:${minutes}:${seconds} PM`;
  //   }
  //   return newDate;
  // };

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    const clientID = ids;

    const clientType = 1;
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
        if (isMounted) {
          console.log(result);
          const date = new Date(result);
          const numOfDays = date.getDate();
          setLastEngagementTime(numOfDays);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

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

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    const clientID = ids;

    const clientType = 1;
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_JOHANNESBURG_URL}/assets/getForClient/${orgIDs}/${clientType}/${clientID} `,
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
        if (isMounted) {
          setAssets(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

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
                        {lastEngagementTime} day(s) ago.
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
                                            {`${index + 1}.`} Agent&apos;s Name - {item.agentName}
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
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <div>
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
                                  description="ALL PRODUCT/PACKAGE SUPPLY REQUEST"
                                  chart={{
                                    labels: [
                                      `${product[0].product.name}`,
                                      `${product[1].product.name}`,
                                    ],
                                    datasets: [
                                      {
                                        chartType: "Bar Chart",
                                        label: "TOTAL REQUEST",
                                        color: "success",
                                        data: [product[0].totalRequests, product[1].totalRequests],
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
                  </div>
                </Card>
                &nbsp;
              </Grid>
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
      <MDBox my={1} />
      <Grid container spacing={0.5}>
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
                      Assets
                    </MDTypography>
                  </MDBox>
                  <Container>
                    <div className="row">
                      <MDBox>
                        {assetsx.map((item) => (
                          // <Link to={`/Tickets/Chats?id=${item.id}`}>
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
                                  Item - {item.item}
                                </MDTypography>
                                <MDTypography
                                  variant="h6"
                                  color="text"
                                  fontSize="75%"
                                  textAlign="left"
                                  mt={1}
                                >
                                  Item Worth - {item.itemWorth}
                                </MDTypography>
                              </CardContent>
                            </Card>
                            &nbsp;
                          </Grid>
                          // </Link>
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
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default ViewSingleIndividual;
