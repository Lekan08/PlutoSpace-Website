import * as React from "react";
import { useState } from "react";
// import Fab from "@material-ui/core/Fab";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import MDTypography from "components/MDTypography";
import { Container, Form } from "react-bootstrap";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PHeaders from "postHeader";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import clockIn from "./clockIn.png";
// import MDButton from "components/MDButton";
// import Icon from "@mui/material/Icon";

export default function TimeSheetAuto() {
  const [open, setOpen] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();
  const handleClose = () => setOpen(false);
  const { allGHeaders: miHeaders } = GHeaders();
  const [taskIDx, setTaskIDx] = useState("");
  const [checkedTask, setCheckedTask] = useState(false);
  const [projectIDx, setProjectIDx] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [checkedProject, setCheckedProject] = useState(false);
  const [subTaskList, setSubTaskList] = useState([]);
  const [subTaskIDx, setSubTaskIDx] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [opened, setOpened] = useState(false);
  const [checkInS, setCheckInS] = useState(true);
  const [commentx, setCommentx] = useState("");
  const [durationSpent, setDurationSpent] = useState("");
  const [endDeleteFlag, setEndDeleteFlag] = useState("");
  const [endstartTimex, setEndstartTimex] = useState("");
  const [endcommentx, setEndcommentx] = useState("");
  const [endsubTaskIDx, setEndsubTaskIDx] = useState("");
  const [endtaskIDx, setEndtaskIDx] = useState("");
  const [endprojectIDx, setEndprojectIDx] = useState("");
  const [endID, setEndID] = useState("");
  const navigate = useNavigate();

  const handleOnProjectSelect = (valuex) => {
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("project1").innerHTML = "Select Project you're working on <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedProject(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("project1").innerHTML = " ";
    }
  };

  // MODAL STYLE
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
    bgcolor: "#ffffff",
    border: "3px solid #5F9DF7",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    height: "80%",
    display: "flex",
    "&::-webkit-scrollbar": {
      width: 20,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "white",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#f5f5f5",
      borderRadius: 10,
    },
  };
  const handleOnTaskSelect = (valuex) => {
    setTaskIDx(valuex);
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("task1").innerHTML = "Select Task you're working on <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedTask(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("task1").innerHTML = " ";
    }
  };

  // eslint-disable-next-line consistent-return
  const hamdleCurrEmp = () => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    if (data11 !== null) {
      const orgIDs = data11.orgID;
      let isMounted = true;
      const empID = data11.personalID;
      fetch(`${process.env.REACT_APP_HALIFAX_URL}/timesheet/getEmpCurrent/${orgIDs}/${empID}`, {
        headers,
      })
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
          if (isMounted) {
            console.log(result);
            if (Object.keys(result).length > 0) {
              console.log(result);
              const currrentTime = new Date().getTime();
              console.log(currrentTime);
              console.log(result.startTime);
              const durationxxx = Math.abs(currrentTime - result.startTime);
              console.log(durationxxx);
              setDurationSpent(durationxxx);
              setEndID(result.id);
              setEndprojectIDx(result.projectID);
              setEndtaskIDx(result.taskID);
              setEndsubTaskIDx(result.subTaskID);
              setEndcommentx(result.comment);
              setEndstartTimex(result.startTime);
              setEndDeleteFlag(result.deleteFlag);
              setCheckInS(false);
            } else {
              setCheckInS(true);
            }
          }
        });

      // Method to handle diable

      return () => {
        isMounted = false;
      };
    }
  };

  // eslint-disable-next-line consistent-return
  const handleClick = (e) => {
    const startTimex = new Date().getTime();
    console.log(startTimex);
    console.log(taskIDx);

    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const currentlyLogegdIn = data11.personalID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      projectID: projectIDx,
      taskID: taskIDx,
      subTaskID: subTaskIDx,
      comment: commentx,
      startTime: startTimex,
      empID: currentlyLogegdIn,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    setOpened(true);
    fetch(`${process.env.REACT_APP_HALIFAX_URL}/timesheet/add`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        console.log(result);
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
        if (result.status === "SUCCESS") {
          setSubTaskList([]);
          setProjectList([]);
          setTaskList([]);
          setCommentx("");
          hamdleCurrEmp();
        }
        console.log(result);
      });
  };

  const handleEndTimeSheet = (e) => {
    const currrentTime = new Date().getTime();

    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const currentlyLogegdIn = data11.personalID;
    const raw = JSON.stringify({
      id: endID,
      orgID: orgIDs,
      projectID: endprojectIDx,
      taskID: endtaskIDx,
      subTaskID: endsubTaskIDx,
      comment: endcommentx,
      startTime: endstartTimex,
      endTime: currrentTime,
      empID: currentlyLogegdIn,
      deleteFlag: endDeleteFlag,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    setOpened(true);
    fetch(`${process.env.REACT_APP_HALIFAX_URL}/timesheet/update`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        console.log(result);
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
        if (result.status === "SUCCESS") {
          setSubTaskList([]);
          setProjectList([]);
          setTaskList([]);
          setCommentx("");
          setCheckInS(true);
        }
        console.log(result);
      });
  };

  const handleValidate = (e) => {
    handleOnProjectSelect(projectIDx);
    handleOnTaskSelect(taskIDx);
    // console.log(checkedWorkflow);
    if (checkedProject && checkedTask === true) {
      handleClick(e);
    }
  };

  // eslint-disable-next-line consistent-return
  const handleGetProject = () => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    if (orgIDs !== "") {
      fetch(`${process.env.REACT_APP_HALIFAX_URL}/project/gets/${orgIDs}`, { headers })
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
          if (isMounted) {
            if (result.length !== 0) {
              console.log(result);
              setProjectList(result);
            }
          }
        });

      // Method to handle diable

      return () => {
        isMounted = false;
      };
    }
  };

  // eslint-disable-next-line consistent-return
  const handleTask = (value) => {
    handleOnTaskSelect();
    setProjectIDx(value);
    console.log(value);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    if (value === "") {
      setTaskList([]);
    } else {
      fetch(`${process.env.REACT_APP_HALIFAX_URL}/task/gets/${orgIDs}/${value}`, { headers })
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
          if (isMounted) {
            if (result.length !== 0) {
              console.log(result);
              setTaskList(result);
            } else {
              setTaskList([]);
              setTaskIDx("");
            }
          }
        });

      return () => {
        isMounted = false;
      };
    }
  };
  // eslint-disable-next-line consistent-return
  const handleSubTask = (taskID) => {
    setSubTaskIDx(taskID);
    // handleOnTaskSelect(taskID);
    if (taskID === "") {
      setSubTaskList([]);
    } else {
      const headers = miHeaders;
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      let isMounted = true;
      fetch(`${process.env.REACT_APP_HALIFAX_URL}/subtask/gets/${orgIDs}/${taskID}`, { headers })
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
          if (isMounted) {
            if (result.length !== 0) {
              console.log(result);
              setSubTaskList(result);
            } else {
              setSubTaskList([]);
              setSubTaskIDx("");
            }
          }
        });

      // Method to handle diable

      return () => {
        isMounted = false;
      };
    }
  };
  const handling = () => {
    hamdleCurrEmp();
    handleGetProject();
    setOpen(true);
  };

  const changeTime = (timestamp) => {
    const timeSeconds = timestamp / 1000;
    const timeHour = Math.abs(timeSeconds / 3600);
    const mainHour = Math.trunc(timeHour);
    const timeHourRemain = timeSeconds % 3600;
    const timeMin = Math.abs(timeHourRemain / 60);
    const mainMin = Math.trunc(timeMin);
    const retHours = mainHour < 10 ? `0${mainHour}h` : `${mainHour}h`;
    const retMinutes = mainMin < 10 ? `0${mainMin}m` : `${mainMin}m`;
    return `${retHours} : ${retMinutes}`;
  };

  return (
    <>
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="3.25rem"
        height="3.25rem"
        bgColor="white"
        shadow="sm"
        borderRadius="50%"
        position="fixed"
        right="6rem"
        bottom="2rem"
        zIndex={99}
        color="dark"
        sx={{ cursor: "pointer" }}
        onClick={() => handling()}
      >
        <AccessTimeFilledIcon />
      </MDBox>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <HighlightOffIcon
                  onClick={handleClose}
                  fontSize="large"
                  style={{
                    // display: "flex",
                    padding: "5px",
                    color: "red",
                    float: "right",
                    position: "absolute",
                    left: 490,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    cursor: "pointer",
                  }}
                />

                {checkInS ? (
                  <>
                    <MDBox pt={1} pb={1} px={2}>
                      <MDBox
                        variant="gradient"
                        bgColor="info"
                        borderRadius="lg"
                        coloredShadow="info"
                        mx={2}
                        mt={-3}
                        p={1}
                        mb={1}
                        textAlign="center"
                      >
                        <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
                          Timesheet
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
                        mb={3}
                        textAlign="center"
                      >
                        <MDTypography variant="gradient" fontSize="60%" color="white" id="name">
                          {" "}
                        </MDTypography>
                        <MDTypography
                          variant="gradient"
                          fontSize="60%"
                          color="white"
                          id="startTime"
                        >
                          {" "}
                        </MDTypography>
                        <MDTypography variant="gradient" fontSize="60%" color="white" id="project1">
                          {" "}
                        </MDTypography>
                        <MDTypography variant="gradient" fontSize="60%" color="white" id="task1">
                          {" "}
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                    <Container>
                      <div className="col-sm-10">
                        <TextField
                          id="outlined-textarea"
                          rows={2}
                          value={commentx || ""}
                          label="Comment "
                          placeholder="Comment "
                          onChange={(e) => setCommentx(e.target.value)}
                          sx={{
                            width: 450,
                          }}
                          multiline
                        />
                      </div>
                      &nbsp; &nbsp;
                      <div className="row">
                        <div className="col-sm-6">
                          <Form.Select
                            aria-label="Default select example"
                            onChange={(e) => handleTask(e.target.value)}
                            onInput={(e) => handleOnProjectSelect(e.target.value)}
                          >
                            <option value="">--Select Project *--</option>
                            {projectList.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                        <div className="col-sm-6">
                          <Form.Select
                            aria-label="Default select example"
                            onInput={(e) => handleOnTaskSelect(e.target.value)}
                            onChange={(e) => handleSubTask(e.target.value)}
                            // onChange={(e) => handleSubTask(e.target.value)}
                          >
                            <option value="">--Select Task *--</option>
                            {taskList.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.title}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                      </div>
                      &nbsp; &nbsp;
                      <div className="row">
                        <div className="col-sm-6">
                          <Form.Select
                            aria-label="Default select example"
                            onChange={(e) => setSubTaskIDx(e.target.value)}
                          >
                            <option value="">--Select Subtask--</option>
                            {subTaskList.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                      </div>
                    </Container>
                    <MDBox mt={4} mb={1}>
                      <MDBox mt={4} mb={1}>
                        <Button
                          variant="contained"
                          onClick={handleValidate}
                          endIcon={<AccessTimeIcon color="white" />}
                          style={{ color: "white" }}
                        >
                          Clock In
                        </Button>
                      </MDBox>
                    </MDBox>
                  </>
                ) : (
                  <>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={clockIn}
                        alt="work"
                        style={{
                          height: "70%",
                          width: "70%",
                        }}
                      />
                    </div>
                    <MDTypography
                      variant="h6"
                      textAlign="center"
                      fontWeight="light"
                      style={{ color: "#00ff00" }}
                      mt={1}
                    >
                      You have succesfully clocked in
                    </MDTypography>
                    <MDTypography
                      variant="h6"
                      textAlign="center"
                      fontWeight="light"
                      color="secondary"
                      mt={1}
                    >
                      Duration Spent : {changeTime(durationSpent)}
                    </MDTypography>
                    <MDBox mt={2} mb={1}>
                      <MDBox mt={1} mb={1}>
                        <Button
                          variant="contained"
                          onClick={handleEndTimeSheet}
                          endIcon={<AccessTimeIcon color="white" />}
                          style={{ color: "white" }}
                        >
                          Clock Out
                        </Button>
                      </MDBox>
                    </MDBox>
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
          <CircularProgress color="info" />
        </Backdrop>
      </div>
    </>
  );
}
