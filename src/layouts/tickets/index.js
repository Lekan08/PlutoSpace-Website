import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form, Dropdown } from "react-bootstrap";
import Icon from "@mui/material/Icon";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// imports for modal
import Modal from "@mui/material/Modal";

function Tickets() {
  const MySwal = withReactContent(Swal);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 0,
    overflow: "scroll",
    height: "70vh",
    display: "block",

    "&::-webkit-scrollbar": {
      width: "6px",
      height: "2px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 1px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 1px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#4285F4",
      webkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
    },
  };

  const cardBorder = {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  };

  // modal
  const stylee = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "#ffffff",
    // border: "2px solid #000",
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
  };

  //   {
  //     "id": "string",

  //     "orgID": "string",
  //     "agentID": 0,
  //     "clientID": "string",
  //     "clientType": 0,
  //     "channel": "string",
  //     "priority": "string",

  //     "web, whatsapp, twitter, instagram"

  // "1 individual"
  // "2 Coperate"

  //     "status": 0,
  //     "reassignedTo": 0,
  //     "closingComment": "string",
  //     "resolutionTime": 0,
  //     "openedTime": 0,
  //     "closedTime": 0,
  //     "createdTime": 0,
  //     "lastChatTime": 0,
  //     "reopened": true,
  //     "resolved": true
  //   }

  const [clientIDx, setClientIDx] = useState("");
  const [clientx, setClient] = useState([]);
  const [clientTypex, setClientTypex] = useState("");
  const [priorityx, setPriority] = useState("");
  const [channelx, setChannel] = useState("");

  const [agents, setAgents] = useState([]);
  const [agentIDx, setAgentIDx] = useState("");

  const [uidx, setUId] = useState("");
  const [uagentIDx, setUAgentIDx] = useState("");
  const [uclientIDx, setUClientIDx] = useState("");
  const [uclientTypex, setUClientTypex] = useState("");
  const [upriorityx, setUPriority] = useState("");
  const [uchannelx, setUChannel] = useState("");
  const [ureassignedTox, setUReassignedTo] = useState("");
  const [ureassignedTimex, setUReassignedTime] = useState("");
  const [ustatusx, setUStatus] = useState("");
  const [uclosingCommentx, setUClosingComment] = useState("");
  const [uresolutionTimex, setUResolutionTime] = useState("");
  const [uopenedTimex, setUOpenedTime] = useState("");
  const [uclosedTimex, setUClosedTime] = useState("");
  const [ucreatedTimex, setUCreatedTime] = useState("");
  const [ulastChatTimex, setULastChatTime] = useState("");
  const [ureopenedx, setUReopened] = useState(true);
  const [uresolvedx, setUResolved] = useState(true);

  const [showUpdate, setShowUpdate] = useState(false);
  const [uopened, setUOpened] = useState(false);
  const handleUClose = () => {
    setUOpened(false);
    setShowUpdate(false);
  };

  const [startTimex, setStartTime] = useState("");
  const [endTimex, setEndTime] = useState("");

  const [showClients, setShowClients] = useState(false);

  const [openn, setOpenn] = React.useState(false);
  const handleOpen = () => setOpenn(true);
  const handleClose = () => setOpenn(false);

  const [items, setItems] = useState([]);

  const [opened, setOpened] = useState(false);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  const handleGets = () => {
    handleClose();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    setOpened(true);
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const curDay = new Date().getTime();

    const startTimee = new Date(startTimex).getTime();
    const endTimee = new Date(endTimex).getTime();
    let nStartTime = firstDay;
    let nEndTime = curDay;
    if (startTimex === "") {
      nStartTime = firstDay;
    } else {
      nStartTime = startTimee;
    }
    if (endTimex === "") {
      nEndTime = curDay;
    } else {
      nEndTime = endTimee;
    }
    const raw = JSON.stringify({
      orgID: orgIDs,
      startTime: nStartTime,
      endTime: nEndTime,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    fetch(`${process.env.REACT_APP_SHASHA_URL}/tickets/getFiltered`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        handleClose();
        console.log(result);
        if (result.status !== 500) {
          if (Object.keys(result).length !== 0) {
            if (result.length !== 0) {
              setItems(result);
            } else {
              setItems([]);
            }
          }
        }

        setOpened(false);
      })
      .catch((error) => {
        handleClose();
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        }).then(() => {
          handleOpen();
        });
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      //   fetches the table data
      handleGets();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
          if (result.status !== 500) {
            if (result.length !== 0) {
              setAgents(result);
            }
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    setOpened(true);
    e.preventDefault();
    const raw = JSON.stringify({
      orgID: orgIDs,
      agentID: agentIDx,
      clientID: clientIDx,
      clientType: clientTypex,
      channel: channelx,
      priority: priorityx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_SHASHA_URL}/tickets/add`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          setClientIDx("");
          setClient([]);
          setClientTypex("");
          setPriority("");
          setChannel("");
          setAgentIDx("");
          handleGets();
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

  const handleUpdate = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      id: uidx,
      orgID: orgIDs,
      agentID: uagentIDx,
      reassignedTo: ureassignedTox,
      reassignedTime: ureassignedTimex,
      clientID: uclientIDx,
      clientType: uclientTypex,
      channel: uchannelx,
      status: ustatusx,
      closingComment: uclosingCommentx,
      resolutionTime: uresolutionTimex,
      openedTime: uopenedTimex,
      closedTime: uclosedTimex,
      priority: upriorityx,
      createdTime: ucreatedTimex,
      lastChatTime: ulastChatTimex,
      reopened: ureopenedx,
      resolved: uresolvedx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_SHASHA_URL}/tickets/update`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        setUOpened(false);
        setShowUpdate(false);
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
        setShowUpdate(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        }).then(() => {
          setUOpened(true);
          setShowUpdate(true);
        });
      });
  };

  // Method to handle Reopen
  const handleReopenTicket = (val) => {
    const requestOptions = {
      method: "GET",
      headers: miHeaders,
    };

    fetch(`${process.env.REACT_APP_SHASHA_URL}/tickets/reOpen/${val}`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
      })
      .then((resx) => {
        if (resx.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resx.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resx.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        MySwal.fire({
          title: resx.status,
          type: "success",
          text: resx.message,
        }).then(() => {
          handleGets();
        });
      })
      .catch((error) => {
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  // Method to handle Resolve
  const handleResolveTicket = (val) => {
    const requestOptions = {
      method: "GET",
      headers: miHeaders,
    };

    fetch(`${process.env.REACT_APP_SHASHA_URL}/tickets/resolve/${val}`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
      })
      .then((resx) => {
        if (resx.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resx.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resx.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        MySwal.fire({
          title: resx.status,
          type: "success",
          text: resx.message,
        }).then(() => {
          handleGets();
        });
      })
      .catch((error) => {
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  // Method to handle diable
  const handleCloseTicket = (val) => {
    const requestOptions = {
      method: "GET",
      headers: miHeaders,
    };

    fetch(`${process.env.REACT_APP_SHASHA_URL}/tickets/close/${val}`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
      })
      .then((resx) => {
        if (resx.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resx.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resx.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        MySwal.fire({
          title: resx.status,
          type: "success",
          text: resx.message,
        }).then(() => {
          handleGets();
        });
      })
      .catch((error) => {
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  const handleChangeClient = (value) => {
    const callClientType = value.toString();
    setClientTypex(callClientType);
    setUClientTypex(callClientType);
    console.log(callClientType);
    let clientTyppe = "";
    if (callClientType === "1") {
      setShowClients(true);
      clientTyppe = "individual";
    } else if (callClientType === "2") {
      setShowClients(false);
      clientTyppe = "corporate";
    }
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    fetch(`${process.env.REACT_APP_LOUGA_URL}/${clientTyppe}/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        setClient(result);
      });
  };

  // Method to filter tickets
  const handleShow = (filteredData, value) => {
    const result = filteredData.filter((item) => item.id === value);
    console.log(items);
    setOpened(true);
    console.log(result);
    setUId(value);
    setUAgentIDx(result[0].agentID);
    setUClientTypex(result[0].clientType);
    handleChangeClient(result[0].clientType);
    setUClientIDx(result[0].clientID);
    setUPriority(result[0].priority);
    setUChannel(result[0].channel);
    setUReassignedTo(result[0].reassignedTo);
    setUReassignedTime(result[0].reassignedTime);
    setUStatus(result[0].status);
    setUClosingComment(result[0].closingComment);
    setUResolutionTime(result[0].resolutionTime);
    setUOpenedTime(result[0].openedTime);
    setUClosedTime(result[0].closedTime);
    setUCreatedTime(result[0].createdTime);
    setULastChatTime(result[0].lastChatTime);
    setUReopened(result[0].reopened);
    setUResolved(result[0].resolved);
    setOpened(false);
    setUOpened(true);
    setShowUpdate(true);
  };

  // Method to change type
  const changeTrueOrFalse = (status) => {
    if (status === true) {
      return "True";
      // eslint-disable-next-line no-else-return
    } else {
      return "False";
    }
  };

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    if (timestamp === 0) {
      return "No Date";
      // eslint-disable-next-line no-else-return
    } else {
      const date = new Date(timestamp);
      const retDate = date.toDateString();
      return retDate;
    }
  };

  //   agentName: "The Six Wise Men";
  //   channel: "Whatsapp";
  //   clientID: "62c36848e7739813af54a879";
  //   clientType: 2;
  //   closedTime: 0;
  //   closingComment: null;
  //   createdTime: 1658362214977;
  //   id: "62d8996609a8c05cb8b208e8";
  //   lastChatTime: 1658362214977;
  //   openedTime: 1658362214977;
  //   orgID: "62bb21f6266f37394be3a183";
  //   priority: "High";
  //   reassignedTime: 0;
  //   reassignedTo: 0;
  //   reassignedToName: null;
  //   reopened: false;
  //   resolutionTime: 0;
  //   resolved: false;
  //   status: 0;

  const pColumns = [
    {
      Header: "Agent's Name",
      accessor: "agentName",
      align: "left",
    },
    {
      Header: "Channel",
      accessor: "channel",
      align: "left",
    },
    {
      Header: "Priority",
      accessor: "priority",
      align: "left",
    },
    {
      Header: "Reassigned To Name",
      accessor: "reassignedToName",
      align: "left",
    },
    {
      Header: "Reassigned Time",
      accessor: "reassignedTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "Option",
      accessor: "optionValue",
      align: "left",
    },
    {
      Header: "Opened Time",
      accessor: "openedTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "Closed Time",
      accessor: "closedTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "Date Created",
      accessor: "createdTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "Reopened ?",
      accessor: "reopened",
      Cell: ({ cell: { value } }) => changeTrueOrFalse(value),
      align: "left",
    },
    {
      Header: "Resolved ?",
      accessor: "resolved",
      Cell: ({ cell: { value } }) => changeTrueOrFalse(value),
      align: "left",
    },
    {
      Header: "Resolution Time",
      accessor: "resolutionTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "actions",
      accessor: "id",
      // eslint-disable-next-line react/prop-types
      Cell: ({ cell: { value } }) => (
        <div
          style={{
            width: "100%",
            backgroundColor: "#dadada",
            borderRadius: "2px",
          }}
        >
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic-button">
              <Icon sx={{ fontWeight: "light" }}>settings</Icon>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/Tickets/Chats")}>View</Dropdown.Item>
              <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item>
              <Dropdown.Item onClick={() => handleResolveTicket(value)}>Resolve</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCloseTicket(value)}>
                {/* {value ? "Close" : "Reopen"} */}Close
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleReopenTicket(value)}>Reopen</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
      align: "center",
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={30}>
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
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Add Ticket
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div align="center">
                  {" "}
                  <div className="row">
                    <div className="col-sm-6">
                      <MDBox mt={0}>
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          fontSize="80%"
                          align="left"
                          color="text"
                        >
                          Agent
                        </MDTypography>
                        <Form.Select
                          value={agentIDx}
                          onChange={(e) => setAgentIDx(e.target.value)}
                          aria-label="Default select example"
                        >
                          <option value="">--Select Agent--</option>
                          {agents.map((api) => (
                            <option key={api.personal.id} value={api.personal.id}>
                              {api.personal.fname} {api.personal.lname}
                            </option>
                          ))}
                        </Form.Select>
                        <br />
                      </MDBox>
                    </div>
                    <div className="col-sm-6">
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                        mt={0}
                      >
                        Priority
                      </MDTypography>
                      <MDBox textAlign="right">
                        <Form.Select
                          onChange={(e) => setPriority(e.target.value)}
                          value={priorityx || ""}
                          aria-label="Default select example"
                        >
                          <option>---Select Priority---</option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                          <option value="Critical">Critical</option>
                        </Form.Select>
                      </MDBox>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                        mt={0}
                      >
                        Client Type
                      </MDTypography>
                      <MDBox textAlign="right">
                        <Form.Select
                          onChange={(e) => handleChangeClient(e.target.value)}
                          value={clientTypex || ""}
                          aria-label="Default select example"
                        >
                          <option>---Select Client Type---</option>
                          <option value="1">Individual</option>
                          <option value="2">Corporate</option>
                        </Form.Select>
                      </MDBox>
                    </div>
                    <div className="col-sm-6">
                      <MDBox mt={0}>
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          fontSize="80%"
                          align="left"
                          color="text"
                        >
                          Client
                        </MDTypography>{" "}
                        {showClients ? (
                          <Form.Select
                            value={clientIDx}
                            onChange={(e) => setClientIDx(e.target.value)}
                            aria-label="Default select example"
                          >
                            <option value="">--Select Client--</option>
                            {clientx.map((api) => (
                              <option key={api.id} value={api.id}>
                                {api.title} {api.fname} {api.lname}
                              </option>
                            ))}
                          </Form.Select>
                        ) : (
                          <Form.Select
                            value={clientIDx}
                            onChange={(e) => setClientIDx(e.target.value)}
                            aria-label="Default select example"
                          >
                            <option value="">--Select Client--</option>
                            {clientx.map((api) => (
                              <option key={api.id} value={api.id}>
                                {api.name}
                              </option>
                            ))}
                          </Form.Select>
                        )}
                        <br />
                      </MDBox>
                    </div>
                  </div>
                  <MDBox mt={2}>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                      mt={2}
                    >
                      Channel
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        onChange={(e) => setChannel(e.target.value)}
                        value={channelx || ""}
                        aria-label="Default select example"
                      >
                        <option>---Select Channel---</option>
                        <option value="Web">Web</option>
                        <option value="Whatsapp">Whatsapp</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Twitter">Twitter</option>
                      </Form.Select>
                    </MDBox>
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      onClick={handleClick}
                      color="info"
                      width="50%"
                      align="center"
                    >
                      Save
                    </MDButton>
                  </MDBox>
                </div>
              </Container>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      &nbsp;
      <MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton variant="gradient" onClick={handleOpen} color="info" width="50%" align="center">
            Add Filters
          </MDButton>
        </MDBox>
        <DataTable
          table={{ columns: pColumns, rows: items }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox>
      {showUpdate ? (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={uopened}>
          <Card sx={style} style={cardBorder}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="success"
                mx={1}
                mt={2}
                p={2}
                mb={1}
                textAlign="left"
              >
                <MDTypography
                  variant="h4"
                  fontWeight="medium"
                  color="white"
                  textAlign="center"
                  mt={1}
                >
                  Update Ticket
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
                <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
                  {" "}
                </MDTypography>
              </MDBox>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <Container>
                    <div align="center">
                      {" "}
                      <div className="row">
                        <div className="col-sm-6">
                          <MDBox mt={0}>
                            <MDTypography
                              variant="button"
                              fontWeight="regular"
                              fontSize="80%"
                              align="left"
                              color="text"
                            >
                              Agent
                            </MDTypography>
                            <Form.Select
                              value={uagentIDx}
                              onChange={(e) => setUAgentIDx(e.target.value)}
                              aria-label="Default select example"
                            >
                              <option value="">--Select Agent--</option>
                              {agents.map((api) => (
                                <option key={api.personal.id} value={api.personal.id}>
                                  {api.personal.fname} {api.personal.lname}
                                </option>
                              ))}
                            </Form.Select>
                            <br />
                          </MDBox>
                        </div>
                        <div className="col-sm-6">
                          <MDTypography
                            variant="button"
                            fontWeight="regular"
                            fontSize="80%"
                            align="left"
                            color="text"
                            mt={0}
                          >
                            Priorty
                          </MDTypography>
                          <MDBox textAlign="right">
                            <Form.Select
                              onChange={(e) => setUPriority(e.target.value)}
                              value={upriorityx || ""}
                              aria-label="Default select example"
                            >
                              <option>---Select Priority---</option>
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                              <option value="Critical">Critical</option>
                            </Form.Select>
                          </MDBox>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <MDTypography
                            variant="button"
                            fontWeight="regular"
                            fontSize="80%"
                            align="left"
                            color="text"
                            mt={0}
                          >
                            Client Type
                          </MDTypography>
                          <MDBox textAlign="right">
                            <Form.Select
                              onChange={(e) => handleChangeClient(e.target.value)}
                              value={uclientTypex || ""}
                              aria-label="Default select example"
                            >
                              <option>---Select Client Type---</option>
                              <option value="1">Individual</option>
                              <option value="2">Corperate</option>
                            </Form.Select>
                          </MDBox>
                        </div>
                        <div className="col-sm-6">
                          <MDBox mt={0}>
                            <MDTypography
                              variant="button"
                              fontWeight="regular"
                              fontSize="80%"
                              align="left"
                              color="text"
                            >
                              Client
                            </MDTypography>{" "}
                            {showClients ? (
                              <Form.Select
                                value={uclientIDx}
                                onChange={(e) => setUClientIDx(e.target.value)}
                                aria-label="Default select example"
                              >
                                <option value="">--Select Client--</option>
                                {clientx.map((api) => (
                                  <option key={api.id} value={api.id}>
                                    {api.title} {api.fname} {api.lname}
                                  </option>
                                ))}
                              </Form.Select>
                            ) : (
                              <Form.Select
                                value={uclientIDx}
                                onChange={(e) => setUClientIDx(e.target.value)}
                                aria-label="Default select example"
                              >
                                <option value="">--Select Client--</option>
                                {clientx.map((api) => (
                                  <option key={api.id} value={api.id}>
                                    {api.name}
                                  </option>
                                ))}
                              </Form.Select>
                            )}
                            <br />
                          </MDBox>
                        </div>
                      </div>
                      <MDBox mt={2}>
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          fontSize="80%"
                          align="left"
                          color="text"
                          mt={2}
                        >
                          Channel
                        </MDTypography>
                        <MDBox textAlign="right">
                          <Form.Select
                            onChange={(e) => setUChannel(e.target.value)}
                            value={uchannelx || ""}
                            aria-label="Default select example"
                          >
                            <option>---Select Channel---</option>
                            <option value="Web">Web</option>
                            <option value="Whatsapp">Whatsapp</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Twitter">Twitter</option>
                          </Form.Select>
                        </MDBox>
                      </MDBox>
                      <MDBox mt={4} mb={1}>
                        <MDButton
                          variant="gradient"
                          onClick={handleUpdate}
                          color="info"
                          width="50%"
                          align="center"
                        >
                          Save
                        </MDButton>
                        &nbsp;
                        <MDButton
                          variant="gradient"
                          onClick={handleUClose}
                          color="error"
                          width="50%"
                          align="center"
                        >
                          Cancel
                        </MDButton>
                      </MDBox>
                    </div>
                  </Container>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </Backdrop>
      ) : (
        <MDBox />
      )}
      {/* modal for tickets filter */}
      <div>
        <Modal
          open={openn}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MDBox sx={stylee}>
            <MDBox pt={4} pb={3} px={7}>
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="success"
                mx={1}
                mt={2}
                p={2}
                mb={1}
                textAlign="left"
              >
                <MDTypography
                  variant="h4"
                  fontWeight="medium"
                  color="white"
                  textAlign="center"
                  mt={1}
                >
                  Add Filters
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
                <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
                  {" "}
                </MDTypography>
              </MDBox>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <Container>
                    <div align="center">
                      {" "}
                      <div className="row">
                        <div className="col-sm-6">
                          <MDBox mt={2}>
                            <MDTypography
                              variant="button"
                              fontWeight="regular"
                              fontSize="80%"
                              align="left"
                              color="text"
                            >
                              Start Date
                            </MDTypography>
                            <DatePicker
                              placeholderText="MM/DD/YY"
                              style={{ marginRight: "10px" }}
                              selected={startTimex}
                              peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              onChange={(time) => setStartTime(time)}
                            />{" "}
                          </MDBox>{" "}
                        </div>
                        <div className="col-sm-6">
                          <MDBox mt={2}>
                            <MDTypography
                              variant="button"
                              fontWeight="regular"
                              fontSize="80%"
                              align="left"
                              color="text"
                            >
                              End Date
                            </MDTypography>
                            <DatePicker
                              placeholderText="MM/DD/YY"
                              style={{ marginRight: "10px" }}
                              selected={endTimex}
                              onChange={(time) => setEndTime(time)}
                              peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                            />{" "}
                          </MDBox>
                        </div>
                      </div>
                      <MDBox mt={4} mb={1}>
                        <MDButton
                          variant="gradient"
                          onClick={handleGets}
                          color="info"
                          width="50%"
                          align="center"
                        >
                          Add Filters
                        </MDButton>
                      </MDBox>
                    </div>
                  </Container>
                </MDBox>
              </MDBox>
            </MDBox>
          </MDBox>
        </Modal>
      </div>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default Tickets;
