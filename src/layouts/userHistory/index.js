/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import { Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
// import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  height: "auto",
  maxHeight: "auto",
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

function UserAudit() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);
  const [services, setServices] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [auditServ, setAuditServ] = useState("");
  const [auditPerm, setAuditPerm] = useState("");
  const [auditSDate, setAuditSDate] = useState("");
  const [auditEDate, setAuditEDate] = useState("");

  const [limitx, setLimit] = useState(100);
  const [limitChanged, setLimitChanged] = useState(true);

  const [user, setUser] = useState([]);
  const [userIDx, setUserIDx] = useState(JSON.parse(localStorage.getItem("user1")).personalID);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const [open, setOpenn] = useState(false);
  const handleOpen = () => setOpenn(true);
  const handleClose = () => {
    setOpenn(false);
  };

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // // Method to change date from timestamp
  // const changeDate = (timestamp) => {
  //   const date = new Date(timestamp);
  //   const retDate = date.toDateString();
  //   return retDate;
  // };

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
          setUser(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/services/gets`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
      })
      .then((resultapi) => {
        setOpened(false);
        if (resultapi.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultapi.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultapi.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          setServices(resultapi);
        }
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnChange = (e) => {
    setOpened(true);
    const headers = miHeaders;
    const apiValue = e.target.value;
    setAuditServ(e.target.value);
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/permissions/getForService/${apiValue}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
      })
      .then((resulta) => {
        setOpened(false);
        if (resulta.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resulta.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resulta.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        setPermissions(resulta);
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

  const handleOnPermChange = (e) => {
    setAuditPerm(e.target.value);
  };

  const handleClick = () => {
    setOpened(true);
    // e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const auditConSDate = new Date(auditSDate).getTime();
    const auditConEDate = new Date(auditEDate).getTime();
    // const date = new Date();
    // const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const curDay = new Date().getTime();
    const firstDay = new Date(new Date().setDate(new Date().getDate() - 1)).getTime();

    let nStartTime = firstDay;
    let nEndTime = curDay;
    if (auditSDate === "") {
      nStartTime = firstDay;
    } else {
      nStartTime = auditConSDate;
    }
    if (auditEDate === "") {
      nEndTime = curDay;
    } else {
      nEndTime = auditConEDate;
    }
    let limmit = limitx;
    if (limitx === 0 || limitx === "") {
      limmit = 100;
    }
    const raw = JSON.stringify({
      userID: userIDx,
      orgID: orgIDs,
      service: auditServ,
      actionCall: auditPerm,
      startTime: nStartTime,
      endTime: nEndTime,
      limit: limmit,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/audit/getFilter`, requestOptions)
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
        setItems(result);
        handleClose();
      })
      .catch((error) => {
        setOpened(false);
        handleClose();
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
      handleClick();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnLimitKeys = (value) => {
    if (value > 5000) {
      setLimitChanged(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("limit").innerHTML = "Limit should not exceed 5000<br>";
    } else {
      setLimitChanged(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("limit").innerHTML = "";
    }
  };

  const handleValidate = () => {
    if (limitChanged) {
      handleClick();
    }
  };

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

  const changeColor = (valuee) => {
    let colorr = "#000000";
    if (valuee === "Ekoatlantic") {
      colorr = "#19A700";
    } else if (valuee === "Shasha") {
      colorr = "#39FF14";
    } else if (valuee === "Zave") {
      colorr = "#FF0000";
    } else if (valuee === "Kubu") {
      colorr = "#FFC000";
    } else if (valuee === "Tanta") {
      colorr = "#FFFC0D";
    } else if (valuee === "Nsutana") {
      colorr = "#FF00FF";
    } else if (valuee === "Raga") {
      colorr = "#00FFFF";
    } else if (valuee === "Louga") {
      colorr = "#04D9FF";
    } else if (valuee === "Johannesburg") {
      colorr = "#0165FC";
    } else if (valuee === "Halifax") {
      colorr = "#FE6700";
    } else {
      colorr = "#000000";
    }
    const colorChange = {
      value: valuee,
      color: colorr,
    };
    return colorChange;
  };

  const changeCost = (value) => {
    const costt = `₦${value}`;
    return costt;
  };

  const changeActionCall = (value) => {
    const returnVal = (
      <div
        style={{
          overflowWrap: "break-word",
          width: "15rem",
          marginBottom: -10,
        }}
      >
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", width: "11rem" }}>
              <MDTypography
                variant="inherit"
                fontWeight="medium"
                fontSize="100%"
                align="left"
                color="text"
                noWrap
              >
                {value}
              </MDTypography>
            </span>
          </AccordionSummary>
          <AccordionDetails>
            <MDTypography
              variant="inherit"
              fontWeight="regular"
              fontSize="100%"
              align="left"
              color="text"
            >
              {value}
            </MDTypography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
    return returnVal;
  };

  const pColumns = [
    { Header: "Employee", accessor: "userName", align: "left" },
    {
      Header: "Service",
      accessor: "service",
      Cell: ({ cell: { value } }) => (
        <span
          className="badge badge-pill"
          style={{ backgroundColor: changeColor(value).color, fontSize: "100%" }}
        >
          {changeColor(value).value}
        </span>
      ),
      align: "left",
    },
    {
      Header: "Actions",
      accessor: "actionCallDisplayName",
      Cell: ({ cell: { value } }) => changeActionCall(value),
      align: "left",
    },
    {
      Header: "Cost (NGN)",
      accessor: "price",
      Cell: ({ cell: { value } }) => changeCost(value),
      align: "left",
    },
    {
      Header: "Date Executed",
      accessor: "executionTime",
      Cell: ({ cell: { value } }) => changeDateandTime(value),
      align: "left",
    },
  ];

  // Return table
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <Card>
          <div align="center">
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="outlined"
                onClick={handleOpen}
                color="info"
                width="50%"
                align="center"
              >
                Add Filters
              </MDButton>
            </MDBox>
          </div>
          <DataTable
            table={{ columns: pColumns, rows: items }}
            isSorted
            entriesPerPage
            showTotalEntries
            noEndBorder
            canSearch
          />
        </Card>
      </MDBox>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <Card sx={style} style={cardBorder}>
          <MDBox>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={() => handleClose()}
            >
              <ClearIcon sx={{ color: "red" }} />
            </IconButton>
          </MDBox>
          <MDBox>
            {/* <MDBox pt={4} pb={3} px={30}> */}
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={1}
              mt={2}
              p={2}
              mb={1}
              sx={{ width: "auto" }}
              textAlign="left"
            >
              <MDTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                textAlign="center"
                mt={1}
              >
                Filter
              </MDTypography>
            </MDBox>
            <MDBox
              variant="gradient"
              bgColor="error"
              borderRadius="lg"
              coloredShadow="success"
              mx={3}
              mt={1}
              p={1}
              mb={1}
              sx={{ width: "auto" }}
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
                            Start Date *
                          </MDTypography>
                          <DatePicker
                            placeholderText="MM/DD/YY"
                            style={{ marginRight: "10px" }}
                            selected={auditSDate}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            onChange={(time) => setAuditSDate(time)}
                          />{" "}
                        </MDBox>{" "}
                      </div>
                      {/* &nbsp; */}
                      <div className="col-sm-6">
                        <MDBox mt={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="regular"
                            fontSize="80%"
                            align="left"
                            color="text"
                          >
                            End Date *
                          </MDTypography>
                          <DatePicker
                            placeholderText="MM/DD/YY"
                            style={{ marginRight: "10px" }}
                            selected={auditEDate}
                            onChange={(time) => setAuditEDate(time)}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                          />{" "}
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
                      >
                        User
                      </MDTypography>
                      <Form.Select
                        value={userIDx}
                        onChange={(e) => setUserIDx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">--Select User--</option>
                        {user.map((api) => (
                          <option key={api.personal.id} value={api.personal.id}>
                            {api.personal.fname} {api.personal.lname}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                    <div className="row">
                      <div className="col-sm-6">
                        <MDBox mt={-1}>
                          <MDTypography
                            variant="button"
                            fontWeight="regular"
                            fontSize="80%"
                            align="left"
                            color="text"
                          >
                            Services
                          </MDTypography>
                          <Form.Select
                            aria-label="Default select example"
                            onChange={handleOnChange}
                          >
                            <option>--Select Service--</option>
                            {services.map((api) => (
                              <option key={api.id} value={api.name}>
                                {api.name}
                              </option>
                            ))}
                          </Form.Select>
                        </MDBox>
                      </div>
                      <div className="col-sm-6">
                        <MDBox mt={1}>
                          <MDTypography
                            variant="button"
                            fontWeight="regular"
                            fontSize="80%"
                            align="left"
                            color="text"
                          >
                            Permissions
                          </MDTypography>
                          <Form.Select
                            aria-label="Default select example"
                            onChange={handleOnPermChange}
                          >
                            <option>--Select Permissions--</option>
                            {permissions.map((api) => (
                              <option key={api.id} value={api.actionCall}>
                                {api.displayName}
                              </option>
                            ))}
                          </Form.Select>
                        </MDBox>{" "}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <MDBox mb={2}>
                          <MDInput
                            type="number"
                            label="Limit"
                            value={limitx || ""}
                            onKeyUp={(e) => handleOnLimitKeys(e.target.value)}
                            onChange={(e) => setLimit(e.target.value)}
                            variant="standard"
                            fullWidth
                          />
                          <p id="limit" style={{ color: "red", fontSize: 13 }}>
                            <i> </i>
                          </p>
                        </MDBox>{" "}
                      </div>
                    </div>
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        onClick={handleValidate}
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
            {/* </MDBox> */}
          </MDBox>
        </Card>
      </Backdrop>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default UserAudit;
