import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import GHeaders from "getHeader";

import PHeaders from "postHeader";
import React, { useEffect, useState, useRef } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import DeleteIcon from "@mui/icons-material/Delete";
// import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
// import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
// import IconButton from "@mui/material/IconButton";
// import InputBase from "@mui/material/InputBase";
// import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
// import DatePicker from "react-datepicker";
// import SubTaskComment from "layouts/project/subtask/subComment";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MDInput from "components/MDInput";

import CardContent from "@mui/material/CardContent";
import MDButton from "components/MDButton";
import Footer from "examples/Footer";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import SubtaskAudit1 from "layouts/project/subtaskAud";
import Icon from "@mui/material/Icon";
import { deepOrange, deepPurple, green, pink, yellow } from "@mui/material/colors";
import CommentCard from "./subtaskComment";

// eslint-disable-next-line react/prop-types
const Subtask = () => {
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [userID, setUserIDx] = useState("");
  const [items, setItems] = useState([]);
  const { allPHeaders: myHeaders } = PHeaders();
  const [subtaskDescription, setSubtaskDescription] = useState("");
  const [opened, setOpened] = useState(false);
  const [workFlow, setWorkFlow] = useState([]);

  const [costx, setCostx] = useState();
  const [userxx, setUserxx] = useState([]);
  const [subTaskTitle, setSubTaskTitle] = useState("");
  const [modalActualStartTime, setModalActualStartTime] = useState();
  const [modalActualEndTime, setModalActualEndTime] = useState();
  const [checkedTitle, setCheckedTitle] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescrip, setModalDescrip] = useState("");
  const [modalAssignedTox, setModalAssignTo] = useState("");
  const [taskCarrierUpdate, setTaskCarrierUpdate] = useState("");
  const [userInfox, setUserInfo] = useState([]);
  const [modalExpectedStartTime, setModalExpectedStartTime] = useState("");
  const [modalExpectedEndTime, setModalExpectedEndTime] = useState("");
  const [modalCost, setModalCost] = useState(0);
  const [modalTotalActualCost, setModalTotalActualCost] = useState("");
  const [subtaskId, setSubtaskId] = useState("");
  const [subtaskComment, setSubtaskComment] = useState("");

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [checkedDescription, setCheckedDescription] = useState(false);

  const colorName = [deepPurple[500], pink[500], green[500], deepOrange[500], yellow[500]];

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  };
  const handleSubtaskTitle = (valuex) => {
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedTitle(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("subtaskTitle").innerHTML = "Subtask Title is required <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedTitle(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("subtaskTitle").innerHTML = " ";
    }
  };
  const handleSubtaskDescription = (valuex) => {
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedDescription(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("subtaskDescription").innerHTML =
        "Subtask Description is required <br>";
    }
    if (valuex) {
      setCheckedDescription(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("subtaskDescription").innerHTML = " ";
    }
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const taskID = urlParams.get("id");
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_HALIFAX_URL}/subtask/gets/${orgIDs}/${taskID}`, {
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
          if (result.lenght !== 0) {
            console.log(taskID);
            setItems(result);
          }
          console.log(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Method to change date from timestamp
  // const changeDate = (timestamp) => {
  //   const date = new Date(timestamp);
  //   const retDate = date.toDateString();
  //   return retDate;
  // };

  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    setOpened(false);
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
          setUserxx(result);
          setOpened(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDisable = (value) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(`${process.env.REACT_APP_HALIFAX_URL}/subtask/delete/${value}`, requestOptions)
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
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
    });
  };
  const handleCreate = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const currentStageIDx = urlParams.get("workflowID");
    const taskIDx = urlParams.get("id");
    const projectIDs = urlParams.get("projectId");
    console.log(currentStageIDx);

    const OpeningDate = new Date(startTime).getTime();
    const ClosingDate = new Date(endTime).getTime();
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const currentStageIdxxxx = workFlow.filter((data) => data.id === currentStageIDx);
    if (currentStageIdxxxx) {
      if (ClosingDate < OpeningDate) {
        MySwal.fire({
          title: "Invalid Date",
          type: "error",
          text: "Your Start Time should come before your End Time",
        });

        setOpened(false);
      } else {
        console.log(currentStageIdxxxx);

        const raw = JSON.stringify({
          orgID: orgIDs,
          projectID: projectIDs,
          title: subTaskTitle,
          descrip: subtaskDescription,
          assignedTo: userID,
          expectedStartTime: OpeningDate,
          expectedEndTime: ClosingDate,
          currentStageID: currentStageIdxxxx[0].stages[0].id,
          totalExpectedCost: costx,
          taskID: taskIDx,
        });

        console.log(raw);
        console.log(userID);

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_HALIFAX_URL}/subtask/add`, requestOptions)
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resultr) => {
            if (resultr.message === "Expired Access") {
              navigate("/authentication/sign-in");
            }
            if (resultr.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
            }
            if (resultr.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            }
            setOpened(false);
            MySwal.fire({
              title: resultr.status,
              type: "success",
              text: resultr.message,
            }).then(() => {
              window.location.reload();
            });
            console.log(resultr);
            if (resultr.data !== null) {
              // const queryString = window.location.search;
              // const urlParams = new URLSearchParams(queryString);
              const ids = urlParams.get("id");
              // const data11 = JSON.parse(localStorage.getItem("user1"));
              const createdByx = data11.personalID;
              const raww = JSON.stringify({
                orgID: orgIDs,
                projectID: ids,
                subTaskID: resultr.data.id,
                actionBy: createdByx,
                actionTaken: "created this Subtaskask on",
              });
              console.log(raw);
              const requestOptionsx = {
                method: "POST",
                headers: myHeaders,
                body: raww,
                redirect: "follow",
              };
              fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskAudit/add`, requestOptionsx)
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
                  console.log(result.status);
                })
                .catch((errorr) => {
                  setOpened(false);
                  console.log(errorr.status);
                });
            }
          })
          .catch((error) => {
            MySwal.fire({
              title: error.status,
              type: "error",
              text: error.message,
            });
          });
      }
    }
  };

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
          setUserInfo(result);
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
    fetch(`${process.env.REACT_APP_RAGA_URL}/workflow/gets/${orgIDs}`, { headers })
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
          setWorkFlow(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // MODAL STYLE
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "#ffffff",
    border: "3px solid #5F9DF7",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    height: "70%",
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

  useEffect(() => {
    console.log(modalAssignedTox);
    // setShowButton(true);
  }, [modalActualStartTime, modalTotalActualCost, modalDescrip, modalTitle, modalAssignedTox]);

  const handleUpdateSubtask = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const taskIDx = urlParams.get("id");

    const data11 = JSON.parse(localStorage.getItem("user1"));
    const createdByx = data11.personalID;

    const modalActualStartTimex = new Date(modalActualStartTime).getTime();
    const modalActualEndTimex = new Date(modalActualEndTime).getTime();
    console.log(modalActualStartTimex);
    console.log(modalActualEndTimex);
    if (modalActualEndTimex < modalActualStartTimex) {
      setOpen(false);
      MySwal.fire({
        title: "Invalid Date",
        type: "error",
        text: "Your Actual Start Time Date should come before your Actual End Time Date",
      }).then(() => {
        setOpen(true);
      });
    } else {
      setOpened(true);
      const raw = JSON.stringify({
        id: taskCarrierUpdate[0].id,
        orgID: taskCarrierUpdate[0].orgID,
        projectID: taskCarrierUpdate[0].projectID,
        title: modalTitle,
        descrip: modalDescrip,
        assignedTo: modalAssignedTox,
        expectedStartTime: modalExpectedStartTime,
        expectedEndTime: modalExpectedEndTime,
        actualStartTime: modalActualStartTimex,
        actualEndTime: modalActualEndTimex,
        totalExpectedCost: Number(modalCost),
        totalActualCost: modalTotalActualCost,
        currentStageID: taskCarrierUpdate[0].currentStageID,
        taskID: taskIDx,
        deleteFlag: taskCarrierUpdate[0].deleteFlag,
      });

      console.log(raw);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_HALIFAX_URL}/subtask/update`, requestOptions)
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
            const raww = JSON.stringify({
              orgID: taskCarrierUpdate[0].orgID,
              projectID: taskCarrierUpdate[0].projectID,
              subTaskID: result.data.id,
              actionBy: createdByx,
              actionTaken: "updated Subtask on",
            });
            handleClose();
            MySwal.fire({
              title: result.status,
              type: "success",
              text: result.message,
            }).then(() => {
              window.location.reload();
            });
            console.log(result);

            console.log(raw);
            const requestOptionsx = {
              method: "POST",
              headers: myHeaders,
              body: raww,
              redirect: "follow",
            };
            fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskAudit/add`, requestOptionsx)
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                return res.json();
              })
              .then((resultr) => {
                console.log(result);
                setOpened(false);
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
                console.log(resultr.status);
              })
              .catch((errorr) => {
                setOpened(false);

                console.log(errorr.status);
              });
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
    }
  };
  const changeDateandTime = (timestamp) => {
    if (timestamp === 0) {
      return "";
    }
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

  const handleValidate = (e) => {
    handleSubtaskTitle(subTaskTitle);
    handleSubtaskDescription(subtaskDescription);
    if (checkedTitle && checkedDescription === true) {
      handleCreate(e);
    }
  };

  const handleOpenModal = (id) => {
    setOpen(true);
    setSubtaskId(id);
    console.log(id);
    const filterFirstedd = items.filter((data) => data.id === id);
    setTaskCarrierUpdate(filterFirstedd);
    console.log(filterFirstedd);
    setModalCost(filterFirstedd[0].totalExpectedCost);
    setModalTitle(filterFirstedd[0].title);
    setModalDescrip(filterFirstedd[0].descrip);
    setModalExpectedStartTime(filterFirstedd[0].expectedStartTime);
    setModalExpectedEndTime(filterFirstedd[0].expectedEndTime);
    setModalActualStartTime(filterFirstedd[0].actualStartTime);
    setModalActualEndTime(filterFirstedd[0].actualStartTime);
    setModalTotalActualCost(filterFirstedd[0].totalActualCost);
    setModalAssignTo(filterFirstedd[0].assignedTo);
  };

  const colors = ["#00C49F", "#0088FE", "#EB5353", "#187498", "#36AE7C"];

  const handleCommentButton = (e) => {
    e.preventDefault();

    if (subtaskComment.length > 0) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const projectIDs = urlParams.get("projectId");
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const createdByx = data11.personalID;

      const orgIDs = data11.orgID;
      const raw = JSON.stringify({
        orgID: orgIDs,
        projectID: projectIDs,
        subTaskID: subtaskId,
        comment: subtaskComment,
        empID: createdByx,
      });
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      setOpened(true);
      setOpen(false);
      fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskComment/add`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          setOpened(false);
          setOpen(true);
          setSubtaskComment("");
          scrollToBottom();
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
          console.log(result.status);
        })
        .catch((error) => {
          setOpened(false);
          setOpen(true);

          console.log(error.status);
        });
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={5}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Subtask
            </MDTypography>
          </MDBox>{" "}
          <MDBox
            mt={2}
            mb={2}
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <MDTypography variant="gradient" fontSize="60%" color="error" id="subtaskTitle">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="subtaskDescription">
              {" "}
            </MDTypography>
          </MDBox>
          <Grid container spacing={2}>
            <MDBox p={3} mt={3}>
              {/* <Grid
                item
                xs={6}
                md={10}
                // style={{ backgroundColor: "ButtonFace", minHeight: "550px" }}
              > */}
              <MDBox>
                <div className="row">
                  <div className="col-sm" style={{ paddingBottom: "15px" }}>
                    <TextField
                      id="title"
                      label="Title *"
                      value={subTaskTitle}
                      placeholder="Subask Title"
                      onChange={(e) => setSubTaskTitle(e.target.value)}
                      onKeyUp={(e) => handleSubtaskTitle(e.target.value)}
                      rows={2}
                      sx={{
                        width: 400,
                      }}
                      multiline
                    />
                  </div>
                  &nbsp; &nbsp;
                  <div className="col-sm">
                    <TextField
                      id="title"
                      label="Subtask Description *"
                      value={subtaskDescription}
                      placeholder="Subask Description"
                      onChange={(e) => setSubtaskDescription(e.target.value)}
                      onKeyUp={(e) => handleSubtaskDescription(e.target.value)}
                      rows={2}
                      sx={{
                        width: 400,
                      }}
                      multiline
                    />
                  </div>
                </div>
                &nbsp; &nbsp;
                <div className="row">
                  <Grid item xs={6}>
                    <TextField
                      id="filled-read-only-input"
                      label="Expected Cost (NGN)"
                      value={costx}
                      onChange={(e) => setCostx(e.target.value)}
                      sx={{
                        width: 400,
                      }}
                    />
                  </Grid>
                  &nbsp; &nbsp;
                  <Grid item xs={5}>
                    <Form.Select
                      aria-label="Default select example"
                      value={userID}
                      onChange={(e) => setUserIDx(e.target.value)}
                    >
                      <option>--Assign to--</option>
                      {userxx.map((item) => (
                        <option key={item.personal.id} value={item.personal.id}>
                          {item.personal.fname} {item.personal.lname}
                        </option>
                      ))}
                    </Form.Select>
                  </Grid>
                </div>
                &nbsp; &nbsp;
                <div className="row">
                  <Grid item xs={6}>
                    <TextField
                      id="datetime-local"
                      label="Expected Start Time"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        width: 400,
                      }}
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </Grid>
                  &nbsp; &nbsp;
                  <Grid item xs={4}>
                    <TextField
                      id="datetime-local"
                      label="Expected End Time"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        width: 400,
                      }}
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </Grid>
                </div>
                &nbsp; &nbsp;
                <MDBox textAlign="center" p={3}>
                  <MDButton
                    textAlign="center"
                    color="success"
                    variant="gradient"
                    onClick={handleValidate}
                    size="large"
                  >
                    ADD
                  </MDButton>
                </MDBox>
              </MDBox>
              {/* </Grid> */}
            </MDBox>
            {/* <Grid item xs={6} md={2} style={{ backgroundColor: "ButtonFace", minHeight: "550px" }}>
              Name
            </Grid> */}
          </Grid>
        </Card>
        &nbsp; &nbsp;
        <Card style={{ padding: "10px" }}>
          &nbsp; &nbsp;
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {items.map((api, i) => (
                <Grid key={api.id} item xs={12} md={6} lg={3}>
                  <Card
                    style={{
                      backgroundColor: colors[i % 5],
                      maxHeight: "170px",
                      minHeight: "170px",
                    }}
                  >
                    <CardContent
                      style={{
                        minHeight: "125px",
                        cursor: "grab",
                      }}
                      onClick={() => handleOpenModal(api.id)}
                    >
                      {/* <Typography sx={{ fontSize: 14 }} style={{ color: "white" }} gutterBottom>
                        Participant
                      </Typography> */}
                      <Typography variant="h5" component="div" style={{ color: "white" }}>
                        {api.title.substr(0, 47)}
                      </Typography>
                    </CardContent>
                    <CardActions style={{ marginTop: "auto", textAlign: "center" }}>
                      <Stack direction="row" spacing={2}>
                        <Button
                          onClick={() => handleDisable(api.id)}
                          style={{ color: "white" }}
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                        {api.assignedToName ? (
                          <Avatar sx={{ bgcolor: colorName[i % 5], width: 33, height: 33 }}>
                            {api.assignedToName.substring(0, 2).toUpperCase()}
                          </Avatar>
                        ) : (
                          <></>
                        )}
                      </Stack>
                    </CardActions>
                  </Card>
                  &nbsp; &nbsp;
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      </Container>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                md={6}
                // style={{ backgroundColor: "ButtonFace", minHeight: "550px" }}
              >
                <TextField
                  id="title"
                  label="Title *"
                  value={modalTitle}
                  InputProps={{ style: { fontSize: 20 } }}
                  placeholder="Task Title"
                  onChange={(e) => setModalTitle(e.target.value)}
                  rows={2}
                  sx={{
                    width: 400,
                  }}
                  multiline
                />
                <br />
                <br />
                <TextField
                  id="descrip"
                  label="Description"
                  value={modalDescrip}
                  InputProps={{ style: { fontSize: 20 } }}
                  placeholder="Task Description"
                  onChange={(e) => setModalDescrip(e.target.value)}
                  rows={2}
                  sx={{
                    width: 400,
                  }}
                  multiline
                />
                {/* if na here i go put my code for comment */}
                {/* <div
                  style={{
                    backgroundColor: "ButtonFace",
                    padding: "10px",
                    borderRadius: "10px",
                    margin: "10px",
                    fontSize: "13px",
                  }}
                > */}
                &nbsp; &nbsp;{" "}
                <div className="col-md-3">
                  <TextField
                    id="datetime-local"
                    label="Actual Start Time"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      width: 400,
                    }}
                    value={changeDateandTime(modalActualStartTime)}
                    onChange={(e) => setModalActualStartTime(e.target.value)}
                  />
                </div>
                &nbsp; &nbsp;
                <div className="col-md-3">
                  <TextField
                    id="datetime-local"
                    label="Actual End Time"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      width: 400,
                    }}
                    value={changeDateandTime(modalActualEndTime)}
                    onChange={(e) => setModalActualEndTime(e.target.value)}
                  />
                </div>
                &nbsp; &nbsp;
                <div className="col-md-3">
                  <TextField
                    id="filled-read-only-input"
                    label="Actual Cost (NGN)"
                    value={modalTotalActualCost}
                    sx={{
                      width: 400,
                    }}
                    onChange={(e) => setModalTotalActualCost(e.target.value)}
                  />
                </div>
                &nbsp; &nbsp;
                <div className="col-sm-8">
                  <Form.Select
                    value={modalAssignedTox}
                    aria-label="Default select example"
                    onChange={(e) => setModalAssignTo(e.target.value)}
                  >
                    <option>--Assign to--</option>
                    {userInfox.map((item) => (
                      <option key={item.personal.id} value={item.personal.id}>
                        {item.personal.fname} {item.personal.lname}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                &nbsp; &nbsp;
                <div className="col-sm-2">
                  {modalCost > 0 ? (
                    <TextField
                      id="filled-read-only-input"
                      label="Expected Cost (NGN)"
                      value={modalCost}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        width: 400,
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                &nbsp; &nbsp;
                <div className="col-sm-3">
                  {modalExpectedStartTime > 0 ? (
                    <TextField
                      id="datetime-local"
                      label="Expected Start Time"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                      value={changeDateandTime(modalExpectedStartTime)}
                      sx={{
                        width: 400,
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                &nbsp; &nbsp;
                <div className="col-sm-3">
                  {modalExpectedEndTime > 0 ? (
                    <TextField
                      id="datetime-local"
                      label="Expected End Time"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        width: 400,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                      value={changeDateandTime(modalExpectedEndTime)}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                &nbsp; &nbsp;
                <MDButton
                  variant="gradient"
                  onClick={handleUpdateSubtask}
                  color="info"
                  width="50%"
                  align="center"
                  size="small"
                >
                  Update
                </MDButton>
                <br />
              </Grid>{" "}
              <Grid
                item
                xs={6}
                md={6}
                // style={{ backgroundColor: "ButtonFace", minHeight: "550px" }}
              >
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
                <SubtaskAudit1 taskId={subtaskId} /> <br />
                <br />
                <MDInput
                  //   label={updating ? "Updating a comment" : "Add a comment"}
                  label="Add a comment"
                  size="small"
                  style={{ width: "15rem" }}
                  value={subtaskComment}
                  onChange={(e) => setSubtaskComment(e.target.value)}
                />{" "}
                &nbsp;
                <MDButton color="info" size="small" onClick={(e) => handleCommentButton(e)}>
                  <Icon fontSize="small">send</Icon>
                </MDButton>
                <CommentCard subTaskaskID={subtaskId} />
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
};

export default Subtask;
