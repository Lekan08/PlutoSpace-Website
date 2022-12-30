import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import TextField from "@mui/material/TextField";
// import DatePicker from "react-datepicker";
import MDButton from "components/MDButton";
import Footer from "examples/Footer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function UpdateTimesheet() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [idx, setIdx] = useState("");
  const [empIDx, setEmpID] = useState("");
  const [commentx, setComment] = useState("");
  const [subTaskIDx, setSubTaskID] = useState("");
  const [taskIDx, setTaskID] = useState("");
  const [projectIDx, setProjectID] = useState("");

  const [startTimex, setStartTime] = useState("");
  const [endTimex, setEndTime] = useState("");
  const [deleteFlagx, setDeleteFlag] = useState("");
  const [opened, setOpened] = useState(false);
  // const [checkedStartTime, setCheckedStartTime] = useState(false);
  const [subTaskList, setSubTaskList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [checkedProject, setCheckedProject] = useState(false);
  const [checkedTask, setCheckedTask] = useState(false);
  const [projectList, setProjectList] = useState([]);
  // const [checkedEndTime, setCheckedEndTime] = useState(false);

  // Timesheet
  const handleOnProjectSelect = (valuex) => {
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedProject(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("project").innerHTML = "Select Project you're working on <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedProject(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("project").innerHTML = " ";
    }
  };
  const handleOnTaskSelect = (valuex) => {
    setTaskID(valuex);
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedTask(false);
      console.log("show");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("task").innerHTML = "Select Task you're working on <br>";
    }
    if (valuex) {
      console.log("dont show yet");
      setCheckedTask(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("task").innerHTML = " ";
    }
  };

  useEffect(() => {
    handleOnProjectSelect(projectIDx);
    handleOnTaskSelect(taskIDx);
  }, [taskIDx]);

  // Method to fetch all AppointmentTime
  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_HALIFAX_URL}/timesheet/getByIds/${ids}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      // eslint-disable-next-line consistent-return
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
          // eslint-disable-next-line eqeqeq
          if (result.length != 0) {
            setIdx(result[0].id);
            setProjectID(result[0].projectID);
            setTaskID(result[0].taskID);
            setSubTaskID(result[0].subTaskID);
            setComment(result[0].comment);
            setStartTime(result[0].startTime);
            setEndTime(result[0].endTime);
            setDeleteFlag(result[0].deleteFlag);
            setEmpID(result[0].empID);
            const proje = result[0].projectID;
            const tas = result[0].taskID;

            if (proje !== "") {
              fetch(`${process.env.REACT_APP_HALIFAX_URL}/task/gets/${orgIDs}/${proje}`, {
                headers,
              })
                .then(async (resr) => {
                  const aToken = resr.headers.get("token-1");
                  localStorage.setItem("rexxdex", aToken);
                  return resr.json();
                })
                .then((resultr) => {
                  if (resultr.message === "Expired Access") {
                    navigate("/authentication/sign-in");
                    window.location.reload();
                  }
                  if (resultr.message === "Token Does Not Exist") {
                    navigate("/authentication/sign-in");
                    window.location.reload();
                  }
                  if (resultr.message === "Unauthorized Access") {
                    navigate("/authentication/forbiddenPage");
                    window.location.reload();
                  }
                  if (isMounted) {
                    console.log(resultr);
                    if (resultr.length !== 0) {
                      console.log(resultr);
                      setTaskList(resultr);
                    }
                  }
                });
              return () => {
                isMounted = false;
              };
            }

            if (tas !== "") {
              fetch(`${process.env.REACT_APP_HALIFAX_URL}/subtask/gets/${orgIDs}/${tas}`, {
                headers,
              })
                .then(async (resrp) => {
                  const aToken = resrp.headers.get("token-1");
                  localStorage.setItem("rexxdex", aToken);
                  return resrp.json();
                })
                .then((resultrp) => {
                  if (resultrp.message === "Expired Access") {
                    navigate("/authentication/sign-in");
                    window.location.reload();
                  }
                  if (resultrp.message === "Token Does Not Exist") {
                    navigate("/authentication/sign-in");
                    window.location.reload();
                  }
                  if (resultrp.message === "Unauthorized Access") {
                    navigate("/authentication/forbiddenPage");
                    window.location.reload();
                  }
                  if (isMounted) {
                    console.log(resultrp);
                    if (result.length !== 0) {
                      console.log(resultrp);
                      setTaskList(resultrp);
                    }
                  }
                });
              return () => {
                isMounted = false;
              };
            }
          } else {
            setIdx(null);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const changeDateandTime = (timestamp) => {
    const date = new Date(timestamp);
    let month = "0";
    if (date.getMonth() + 1 < 10) {
      const mymonth = date.getMonth() + 1;
      month += mymonth;
    } else {
      const mymonth = date.getMonth() + 1;
      month = mymonth;
    }
    let day = "0";
    if (date.getDate() < 10) {
      day += date.getDate();
    } else {
      day = date.getDate();
    }
    const retDate = `${date.getFullYear()}-${month}-${day}`;

    let hour = "0";
    let minutes = "0";

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

    return `${retDate}T${hour}:${minutes}`;
  };

  // eslint-disable-next-line consistent-return
  const handleTask = (value) => {
    handleOnTaskSelect();
    setProjectID(value);
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
              setTaskID("");
            }
          }
        });

      return () => {
        isMounted = false;
      };
    }
  };

  const handleUpdate = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const startTimexx = new Date(startTimex).getTime();
    const endTimexx = new Date(endTimex).getTime();
    const currTime = new Date().getTime();
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      projectID: projectIDx,
      taskID: taskIDx,
      subTaskID: subTaskIDx,
      comment: commentx,
      startTime: startTimexx,
      endTime: endTimexx,
      empID: empIDx,
      deleteFlag: deleteFlagx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (endTimexx < startTimexx || endTimexx < currTime || startTimexx < currTime) {
      MySwal.fire({
        title: "Invalid Date",
        type: "error",
        text: "Please Enter A Date From The Future",
      });
      setOpened(false);
    } else {
      fetch(`${process.env.REACT_APP_HALIFAX_URL}/timesheet/update`, requestOptions)
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
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          // setOpened(false);
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
    let isMounted = true;
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

    return () => {
      isMounted = false;
    };
  }, []);

  // eslint-disable-next-line consistent-return
  const handleSubTask = (taskID) => {
    setTaskID(taskID);
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
              setSubTaskID("");
            }
          }
        });

      // Method to handle diable

      return () => {
        isMounted = false;
      };
    }
  };

  const handleValidate = (e) => {
    handleOnProjectSelect(projectIDx);
    handleOnTaskSelect(taskIDx);
    console.log(taskIDx);
    // console.log(checkedWorkflow);
    if (checkedProject && checkedTask === true) {
      handleUpdate(e);
    }
  };

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
            <MDTypography variant="gradient" fontSize="60%" color="white" id="startTime">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="project">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="task">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-5">
                    <TextField
                      id="datetime-local"
                      label="Start Time *"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={changeDateandTime(startTimex)}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-2">
                    <></>
                  </div>
                  <div className="col-sm-5">
                    <TextField
                      id="datetime-local"
                      label="End Time"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={changeDateandTime(endTimex)}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
                &nbsp; &nbsp;
                <div className="col-sm-12">
                  <TextField
                    id="outlined-textarea"
                    rows={2}
                    value={commentx || ""}
                    label="Comment "
                    placeholder="Comment "
                    onChange={(e) => setComment(e.target.value)}
                    sx={{
                      width: 500,
                    }}
                    multiline
                  />
                </div>
                &nbsp; &nbsp;
                <div className="row">
                  <div className="col-sm-6">
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => handleOnProjectSelect(e.target.value)}
                      onInput={(e) => handleTask(e.target.value)}
                      value={projectIDx}
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
                      value={taskIDx}
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
                      onChange={(e) => setSubTaskID(e.target.value)}
                      value={subTaskIDx}
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
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  onClick={handleValidate}
                  color="info"
                  width="50%"
                  align="left"
                >
                  Update
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>

      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default UpdateTimesheet;
