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
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Styles from "styles";

function TicketClientSettings() {
  const MySwal = withReactContent(Swal);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
    // overflow: "scroll",
    height: "auto",
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
    // borderTopLeftRadius: 20,
    // borderBottomLeftRadius: 20,
  };

  const [idx, setId] = useState("");
  const [clientLevel, setClientLevel] = useState("");

  const [averageResoluTime, setAverageResoluTime] = React.useState(
    dayjs(`${new Date().getFullYear()}-01-01T00:00:00.000Z`)
  );
  const [clientLevelss, setClientLevelss] = useState([]);

  const [uaverageResoluTime, setUAverageResoluTime] = React.useState(
    dayjs(`${new Date().getFullYear()}-01-01T00:00:00.000Z`)
  );
  const [uclientLevel, setUClientLevel] = useState("");
  const [createdTimex, setCreatedTimex] = useState("");
  const [deleteFlagx, setDeleteFlagx] = useState("");

  //   const [startTimex, setStartTime] = useState("");
  //   const [endTimex, setEndTime] = useState("");

  const [showUpdate, setShowUpdate] = useState(false);
  const [uopened, setUOpened] = useState(false);
  const handleUClose = () => {
    setUOpened(false);
    setShowUpdate(false);
  };
  const [opened, setOpened] = useState(false);
  const [checkARLT, setCheckARLT] = useState(false);
  const [checkUARLT, setCheckUARLT] = useState(false);

  const [items, setItems] = useState([]);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  // Method to filter tickets
  const handleGets = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/ticketClientSettings/gets/${orgIDs}`, { headers })
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
        console.log(result);
        if (result.length !== 0) {
          setItems(result);
        } else {
          setItems([]);
        }
        setOpened(false);
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
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/clientLevels/gets/${orgIDs}`, { headers })
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
            setClientLevelss(result);
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
    // Method to change date to timestamp
    // eslint-disable-next-line consistent-return
    const changeRTime = (timestamp) => {
      if (timestamp !== "") {
        const date = new Date(timestamp);
        const retDate = date.getTime();
        return retDate;
      }
    };
    const raw = JSON.stringify({
      orgID: orgIDs,
      resolutionTime: changeRTime(averageResoluTime),
      clientLevelID: clientLevel,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_SHASHA_URL}/ticketClientSettings/add`, requestOptions)
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
          if (result.status === "SUCCESS") {
            handleGets();
            setClientLevel("");
            setAverageResoluTime(`${new Date().getFullYear()}-01-01T00:00:00.000Z`);
          }
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

    // Method to change date to timestamp
    // eslint-disable-next-line consistent-return
    const changeRTime = (timestamp) => {
      if (timestamp !== "") {
        const date = new Date(timestamp);
        const retDate = date.getTime();
        return retDate;
      }
    };
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      resolutionTime: changeRTime(uaverageResoluTime),
      clientLevelID: uclientLevel,
      createdTime: createdTimex,
      deleteFlag: deleteFlagx,
    });
    // console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_SHASHA_URL}/ticketClientSettings/update`, requestOptions)
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
          if (result.status === "SUCCESS") {
            window.location.reload();
          }
        });
      })
      .catch((error) => {
        setOpened(false);
        setShowUpdate(false);
        setOpened(false);
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

  const handleValidate = (e) => {
    e.preventDefault();
    if (clientLevel !== "" && checkARLT === true) {
      handleClick(e);
    }
  };

  const handleUValidate = (e) => {
    e.preventDefault();
    if (uclientLevel !== "" && checkUARLT === true) {
      handleUpdate(e);
    }
  };

  //   const handleOnSelect = (select) => {
  //     const userIDs = [];
  //     // eslint-disable-next-line array-callback-return
  //     select.map((item) => {
  //       const fdy = item.value;
  //       console.log(fdy);
  //       userIDs.push(fdy);
  //     });
  //     setAllUserID(userIDs);
  //     console.log(select);
  //     console.log(userIDs);
  //   };

  const handleChangeResolTime = (newValue, num) => {
    if (num === 1) {
      if (newValue === null || newValue === "null") {
        // eslint-disable-next-line no-unused-expressions
        document.getElementById("resolVal").innerHTML = "input a resolution time<br>";
        setCheckARLT(false);
      } else {
        let minuteVal = newValue.$m;
        const hourVal = newValue.$H;
        let secondVal = newValue.$s;
        const concaZero = "0";
        if (secondVal === 6) {
          secondVal = concaZero + secondVal;
        }
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(minuteVal)) {
          // eslint-disable-next-line no-unused-expressions
          document.getElementById("resolVal").innerHTML = "input a valid time<br>";
          setCheckARLT(false);
        } else {
          // eslint-disable-next-line no-lonely-if
          if (hourVal > 0) {
            // eslint-disable-next-line no-unused-expressions
            document.getElementById("resolVal").innerHTML = "minutes cannot be greater than 59<br>";
            setCheckARLT(false);
          } else {
            console.log("Worked👍🏿");
            // eslint-disable-next-line no-unused-expressions
            document.getElementById("resolVal").innerHTML = "";
            setCheckARLT(true);
            const datee = `${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`;
            setAverageResoluTime(datee);
          }
        }
        const datee = new Date(
          `${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`
        );

        if (hourVal === 0) {
          // eslint-disable-next-line no-restricted-globals
          if (!isNaN(newValue.$d)) {
            if (new Date(newValue.$d).getMinutes() < 10) {
              minuteVal = `0${new Date(newValue.$d).getMinutes()}`;
              // console.log("new Date(newValue.$d).getSeconds()");
              // console.log(new Date(newValue.$d).getSeconds());
            }
            if (new Date(newValue.$d).getSeconds() < 10) {
              secondVal = `0${new Date(newValue.$d).getSeconds()}`;
              // console.log("new Date(newValue.$d).getSeconds()");
              // console.log(new Date(newValue.$d).getSeconds());
            }
            // eslint-disable-next-line no-unused-expressions
            document.getElementById("resolVal").innerHTML = "";
            setCheckARLT(true);
            setAverageResoluTime(
              `${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`
            );
            // eslint-disable-next-line no-restricted-globals
          } else if (!isNaN(datee)) {
            if (new Date(newValue.$d).getMinutes() < 10) {
              minuteVal = `0${new Date(newValue.$d).getMinutes()}`;
              // console.log("new Date(newValue.$d).getSeconds()");
              // console.log(new Date(newValue.$d).getSeconds());
            }
            if (new Date(newValue.$d).getSeconds() < 10) {
              secondVal = `0${new Date(newValue.$d).getSeconds()}`;
            }
            // eslint-disable-next-line no-unused-expressions
            document.getElementById("resolVal").innerHTML = "";
            setCheckARLT(true);
            setAverageResoluTime(
              `${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`
            );
          } else {
            // eslint-disable-next-line no-unused-expressions
            document.getElementById("resolVal").innerHTML = "input a valid time<br>";
            setCheckARLT(false);
          }
        }
      }
    } else if (num === 2) {
      if (newValue === null || newValue === "null") {
        // eslint-disable-next-line no-unused-expressions
        document.getElementById("respoVal").innerHTML = "input a response time<br>";
        setCheckUARLT(false);
      } else {
        let minuteVal = newValue.$m;
        const hourVal = newValue.$H;
        let secondVal = newValue.$s;
        const concaZero = "0";
        if (secondVal === 6) {
          secondVal = concaZero + secondVal;
        }
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(minuteVal)) {
          // eslint-disable-next-line no-unused-expressions
          document.getElementById("respoVal").innerHTML = "input a valid time<br>";
          setCheckUARLT(false);
        } else {
          // eslint-disable-next-line no-lonely-if
          if (hourVal > 0) {
            // eslint-disable-next-line no-unused-expressions
            document.getElementById("respoVal").innerHTML = "minutes cannot be greater than 59<br>";
            setCheckUARLT(false);
          } else {
            console.log("Worked👍🏿");
            // eslint-disable-next-line no-unused-expressions
            document.getElementById("respoVal").innerHTML = "";
            setCheckUARLT(true);
            const datee = `${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`;
            setUAverageResoluTime(datee);
          }
        }

        const datee = new Date(
          `${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`
        );

        if (hourVal === 0) {
          // eslint-disable-next-line no-restricted-globals
          if (!isNaN(newValue.$d)) {
            if (new Date(newValue.$d).getMinutes() < 10) {
              minuteVal = `0${new Date(newValue.$d).getMinutes()}`;
              // console.log("new Date(newValue.$d).getSeconds()");
              // console.log(new Date(newValue.$d).getSeconds());
            }
            if (new Date(newValue.$d).getSeconds() < 10) {
              secondVal = `0${new Date(newValue.$d).getSeconds()}`;
              // console.log("new Date(newValue.$d).getSeconds()");
              // console.log(new Date(newValue.$d).getSeconds());
            }
            // eslint-disable-next-line no-unused-expressions
            document.getElementById("respoVal").innerHTML = "";
            setCheckUARLT(true);
            setUAverageResoluTime(
              `${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`
            );
            // eslint-disable-next-line no-restricted-globals
          } else if (!isNaN(datee)) {
            if (new Date(newValue.$d).getMinutes() < 10) {
              minuteVal = `0${new Date(newValue.$d).getMinutes()}`;
              // console.log("new Date(newValue.$d).getSeconds()");
              // console.log(new Date(newValue.$d).getSeconds());
            }
            if (new Date(newValue.$d).getSeconds() < 10) {
              secondVal = `0${new Date(newValue.$d).getSeconds()}`;
            }
            // eslint-disable-next-line no-unused-expressions
            document.getElementById("respoVal").innerHTML = "";
            setCheckUARLT(true);
            setUAverageResoluTime(
              `${new Date().getFullYear()}-01-01T00:${minuteVal}:${secondVal}.000Z`
            );
          } else {
            // eslint-disable-next-line no-unused-expressions
            document.getElementById("respoVal").innerHTML = "input a valid time<br>";
            setCheckUARLT(false);
          }
        }
      }
    }
  };

  // Method to handle diable
  const handleDisable = (val) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f96d02",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setOpened(true);
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(
          `${process.env.REACT_APP_SHASHA_URL}/ticketClientSettings/delete/${val}`,
          requestOptions
        )
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
            setOpened(false);
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
            setOpened(false);
            MySwal.fire({
              title: error.status,
              type: "error",
              text: error.message,
            });
          });
      }
    });
  };

  // Method to filter tickets
  const handleShow = (filteredData, value) => {
    const result = filteredData.filter((item) => item.id === value);
    setOpened(true);
    console.log(result);
    // Method to change date to timestamp
    // eslint-disable-next-line consistent-return
    const changeRTime = (timestamp) => {
      if (timestamp !== "") {
        const date = new Date(timestamp);
        const yearVal = date.getFullYear();

        let minuteVal = "0";
        let secondVal = "0";

        if (date.getSeconds() < 10) {
          secondVal += date.getSeconds();
        } else {
          secondVal = date.getSeconds();
        }

        if (date.getMinutes() < 10) {
          minuteVal += date.getMinutes();
        } else {
          minuteVal = date.getMinutes();
        }
        const retDate = `${yearVal}-01-01T00:${minuteVal}:${secondVal}.000Z`;
        return retDate;
      }
    };
    setId(result[0].id);
    setUAverageResoluTime(changeRTime(result[0].resolutionTime));
    setCheckUARLT(true);
    setUClientLevel(result[0].clientLevelID);
    setDeleteFlagx(result[0].deleteFlag);
    setCreatedTimex(result[0].createdTime);
    setOpened(false);
    setUOpened(true);
    setShowUpdate(true);
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

  const changeMinAndSec = (timestamp) => {
    if (timestamp === 0) {
      return "No Date";
      // eslint-disable-next-line no-else-return
    } else {
      const date = new Date(timestamp);
      const minuteVal = date.getMinutes();
      const secondVal = date.getSeconds();
      const retDate = `${minuteVal} Minute(s) ${secondVal} Second(s)`;
      return retDate;
    }
  };

  const pColumns = [
    {
      Header: "Client Level",
      accessor: "clientLevelName",
      align: "left",
    },
    {
      Header: "Resolution Time",
      accessor: "resolutionTime",
      Cell: ({ cell: { value } }) => changeMinAndSec(value),
      align: "left",
    },
    {
      Header: "Date Created",
      accessor: "createdTime",
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
              <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
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
        <MDBox pt={4} pb={3} px={5}>
          <MDBox
            variant="gradient"
            //   bgColor="info"
            style={Styles.boxSx}
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Client Ticket Settings
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
          <MDBox p={3} mt={1}>
            <MDTypography
              variant="h4"
              fontWeight="regular"
              fontSize="75%"
              textAlign="center"
              color="info"
            >
              &nbsp;&nbsp;&nbsp;&nbsp;Set The Average Resolution Time For Each Client Level (They
              are in minutes and seconds)
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDBox mt={0}>
                      <MDBox textAlign="center">
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          fontSize="80%"
                          textAlign="center"
                          color="text"
                        >
                          Client Level
                        </MDTypography>
                        <Form.Select
                          value={clientLevel}
                          onChange={(e) => setClientLevel(e.target.value)}
                          aria-label="Default select example"
                        >
                          <option value="">Select Client Level</option>
                          {clientLevelss.map((api) => (
                            <option key={api.id} value={api.id}>
                              {api.name} ({api.descrip})
                            </option>
                          ))}
                        </Form.Select>
                      </MDBox>
                    </MDBox>
                  </div>
                  <div className="col-sm-6">
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      //   fontSize="80%"
                      textAlign="center"
                      color="text"
                    >
                      Resolution Time
                    </MDTypography>
                    <MDBox mt={0}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          disableOpenPicker
                          views={["minutes", "seconds"]}
                          inputFormat="mm:ss"
                          mask="__:__"
                          minutesStep={1}
                          className="timeCss"
                          value={averageResoluTime}
                          onChange={(newValue) => {
                            handleChangeResolTime(newValue, 1);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                      <MDTypography
                        variant="h4"
                        fontWeight="regular"
                        fontSize="55%"
                        textAlign="left"
                        color="error"
                        id="resolVal"
                      >
                        {" "}
                      </MDTypography>
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <div align="center">
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  onClick={handleValidate}
                  // color="info"
                  width="50%"
                  align="center"
                  style={Styles.buttonSx}
                >
                  Save
                </MDButton>
              </MDBox>
            </div>
          </MDBox>
        </MDBox>
      </Card>
      &nbsp;
      <MDBox>
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
                //   bgColor="info"
                style={Styles.boxSx}
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MDTypography
                  variant="h4"
                  fontWeight="medium"
                  color="white"
                  textAlign="center"
                  mt={1}
                >
                  Update Client Ticket Settings
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
                      <MDBox>
                        <Container>
                          <div className="row">
                            <div className="col-sm-6">
                              <MDBox mt={0}>
                                <MDBox textAlign="center">
                                  <MDTypography
                                    variant="button"
                                    fontWeight="regular"
                                    fontSize="80%"
                                    textAlign="center"
                                    color="text"
                                  >
                                    Client Level
                                  </MDTypography>
                                  <Form.Select
                                    value={uclientLevel}
                                    onChange={(e) => setUClientLevel(e.target.value)}
                                    aria-label="Default select example"
                                  >
                                    <option value="">Select Client Level</option>
                                    {clientLevelss.map((api) => (
                                      <option key={api.id} value={api.id}>
                                        {api.name} ({api.descrip})
                                      </option>
                                    ))}
                                  </Form.Select>
                                </MDBox>
                              </MDBox>
                            </div>
                            <div className="col-sm-6">
                              <MDTypography
                                variant="button"
                                fontWeight="regular"
                                fontSize="80%"
                                textAlign="center"
                                color="text"
                              >
                                Resolution Time
                              </MDTypography>
                              <MDBox mt={0}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <TimePicker
                                    disableOpenPicker
                                    views={["minutes", "seconds"]}
                                    inputFormat="mm:ss"
                                    mask="__:__"
                                    label=""
                                    minutesStep={1}
                                    value={uaverageResoluTime}
                                    onChange={(newValue) => {
                                      handleChangeResolTime(newValue, 2);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                  />
                                </LocalizationProvider>
                                <MDTypography
                                  variant="h4"
                                  fontWeight="regular"
                                  fontSize="55%"
                                  textAlign="left"
                                  color="error"
                                  id="respoVal"
                                >
                                  {" "}
                                </MDTypography>
                              </MDBox>
                            </div>
                          </div>
                        </Container>
                      </MDBox>
                      <MDBox mt={4} mb={1}>
                        <MDButton
                          variant="gradient"
                          onClick={handleUValidate}
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
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default TicketClientSettings;
