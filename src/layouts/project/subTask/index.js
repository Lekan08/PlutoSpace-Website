import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import GHeaders from "getHeader";

import PHeaders from "postHeader";
import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import DeleteIcon from "@mui/icons-material/Delete";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import DatePicker from "react-datepicker";
import SubTaskComment from "layouts/project/subTask/subComment";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MDButton from "components/MDButton";
import Footer from "examples/Footer";

// eslint-disable-next-line react/prop-types
const SubTask = () => {
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [userID, setUserIDx] = useState("");
  const [items, setItems] = useState([]);
  const { allPHeaders: myHeaders } = PHeaders();
  const [subtaskDescription, setSubtaskDescription] = useState("");
  const [opened, setOpened] = useState(false);
  const [workFlow, setWorkFlow] = useState([]);

  const [costx, setCostx] = useState();
  const [userxx, setUserxx] = useState([]);
  const [subTaskTitle, setSubTaskTitle] = useState("");
  const [taskId, setTaskid] = useState("");

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const taskID = urlParams.get("id");
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = false;
    fetch(`${process.env.REACT_APP_HALIFAX_URL}/subtask/gets/${orgIDs}/${taskID}`, {
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
        setItems(result);
        console.log(result);
        if (isMounted) {
          console.log(taskID);
          setItems(result);
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
  console.log(items);

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
    console.log(currentStageIDx);

    const currentStageIdxxxx = workFlow.filter((data) => data.id === currentStageIDx);

    const OpeningDate = new Date(start).getTime();
    const ClosingDate = new Date(end).getTime();
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      projectID: items[0].projectID,
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
          const createdByx = data11.id;
          const raww = JSON.stringify({
            orgID: orgIDs,
            projectID: ids,
            subTaskID: resultr.data.subTaskID,
            actionBy: createdByx,
            actionTaken: "created this Task on",
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
  };
  // Method to handle update
  // const handleUpdate = (
  //   subTaskTitlex,
  //   subtaskDescriptionx,
  //   projectIDxx,
  //   OpeningDatex,
  //   ClosingDate,
  //   deleteFlagx,
  //   actualstmexx,
  //   actualendtxx,
  //   totalactxx,
  //   currentStageIDxx,
  //   costxx,
  //   taskIdx,
  //   userxxx
  // ) => {
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const orgIDs = data11.orgID;
  //   const raw = JSON.stringify({
  //     orgID: orgIDs,
  //     projectID: projectIDxx,
  //     title: subTaskTitlex,
  //     expectedStartedtime: OpeningDatex,
  //     actualEndTime: actualendtxx,
  //     expectedEndTime: ClosingDate,
  //     actualStartTime: actualstmexx,
  //     descrip: subtaskDescriptionx,
  //     currentStageID: currentStageIDxx,
  //     totalExpectedCost: costxx,
  //     totalActualCost: totalactxx,
  //     taskID: taskIdx,
  //     assignedTo: userxxx,
  //     deleteFlag: deleteFlagx,
  //   });
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(`${process.env.REACT_APP_HALIFAX_URL}/subtask/update`, requestOptions)
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
  //       MySwal.fire({
  //         title: result.status,
  //         type: "success",
  //         text: result.message,
  //       }).then(() => {
  //         window.location.reload();
  //       });
  //     })
  //     .catch((error) => {
  //       MySwal.fire({
  //         title: error.status,
  //         type: "error",
  //         text: error.message,
  //       });
  //     });
  // };

  // Method to filter departments

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
  // console.log(userID);
  // const changeDate = (timestamp) => {
  //   const date = new Date(timestamp);
  //   const retDate = date.toDateString();
  //   return retDate;
  // };
  console.log(items);
  const handleUpdatesub = (value) => {
    navigate(`/project/updatesubtask?id=${value}`);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "#ffffff",
    border: "3px solid #5F9DF7",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    height: "65%",
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

  const openModal = (id) => {
    console.log("This is for modal");
    setTaskid(id);
    setOpen(true);
    console.log(id);
  };
  console.log(taskId);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container>
        <Card>
          <div>
            <MDBox>
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
                    Add Subtask
                  </MDTypography>
                </MDBox>
                <Container>
                  <MDBox mx={5} mt={-3} p={2} mb={1} textAlign="center">
                    <Paper
                      component="form"
                      sx={{ p: "2px 2px", display: "flex", alignItems: "center" }}
                    >
                      <MDBox>
                        <InputBase
                          id="outlined-textarea"
                          value={subTaskTitle}
                          label="Description"
                          placeholder="Task Title"
                          onChange={(e) => setSubTaskTitle(e.target.value)}
                          sx={{
                            width: 150,
                          }}
                        />
                      </MDBox>
                      <InputBase
                        id="outlined-textarea"
                        value={subtaskDescription}
                        label="Description"
                        placeholder="Task Description"
                        onChange={(e) => setSubtaskDescription(e.target.value)}
                        sx={{
                          width: 350,
                        }}
                        multiline
                      />
                      &nbsp;
                      <MDBox>
                        <InputBase
                          id="outlined-textarea"
                          label="Amount "
                          type="number"
                          value={costx}
                          placeholder="expected cost"
                          onChange={(e) => setCostx(e.target.value)}
                          sx={{
                            width: 150,
                          }}
                        />
                      </MDBox>
                      <IconButton>
                        <AccountCircleIcon />
                      </IconButton>
                      <div>
                        <div>
                          <MDBox mx={1} textAlign="center">
                            <MDTypography
                              variant="button"
                              fontWeight="regular"
                              fontSize="60%"
                              color="text"
                            >
                              Assigned User
                            </MDTypography>
                            <Form.Select
                              value={userID}
                              onChange={(e) => setUserIDx(e.target.value)}
                              aria-label="Default select example"
                            >
                              <option value="">Assign User</option>
                              {userxx.map((api) => (
                                <option key={api.personal.id} value={api.personal.id}>
                                  {api.personal.fname} {api.personal.lname}
                                </option>
                              ))}
                            </Form.Select>
                          </MDBox>
                        </div>
                        <br />
                      </div>
                      <MDBox textAlign="center" mx={3}>
                        <Row style={{ paddingBottom: "70px" }}>
                          <Col>
                            <MDTypography>
                              <br />
                              Expected Start Time
                            </MDTypography>
                            <Container>
                              <DatePicker
                                placeholderText="MM/DD/YY"
                                style={{ marginRight: "2px" }}
                                selected={start}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                onChange={(time) => setStart(time)}
                              />
                            </Container>
                          </Col>
                          <Col>
                            <MDTypography>Expected End Time</MDTypography>
                            <Container>
                              <DatePicker
                                placeholderText="MM/DD/YY"
                                style={{ marginRight: "10px" }}
                                selected={end}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                onChange={(time) => setEnd(time)}
                              />
                            </Container>
                          </Col>
                        </Row>
                        <MDBox textAlign="center" p={3}>
                          <MDButton
                            textAlign="center"
                            color="success"
                            variant="gradient"
                            // onClick={handleUpdate}
                            size="large"
                          >
                            ADD
                          </MDButton>
                        </MDBox>
                      </MDBox>
                      <IconButton onClick={handleCreate} aria-label="save subtask">
                        <SaveIcon />
                      </IconButton>
                    </Paper>
                  </MDBox>
                </Container>
              </Card>

              <ul className="list-group mb-4">
                {items.map((taskID) => (
                  <li key={taskID.id} className="list-group-item">
                    <IconButton>
                      <AccountCircleIcon />
                    </IconButton>
                    {taskID.title}&#44; {taskID.descrip}&#44;
                    {taskID.totalExpectedCost}&#44; {changeDate(taskID.expectedStartTime)}
                    &#44;
                    {changeDate(taskID.expectedEndTime)}&#44; {taskID.assignedTo}&#44;
                    <IconButton onClick={() => handleDisable(taskID.id)}>
                      <DeleteIcon />
                    </IconButton>
                    &nbsp; &nbsp;
                    <IconButton onClick={() => handleUpdatesub(taskID.id)}>
                      <BrowserUpdatedIcon />
                    </IconButton>
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        onClick={() => openModal(taskID.id)}
                        color="info"
                        width="50%"
                        align="left"
                      >
                        Add Sub-Task Comment
                      </MDButton>
                    </MDBox>
                  </li>
                ))}
              </ul>
            </MDBox>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={opened}
            >
              <CircularProgress color="info" />
            </Backdrop>
          </div>
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
            <Grid>
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
                    float: "left",
                    cursor: "pointer",
                  }}
                />
                <SubTaskComment subTaskId={taskId} />
              </Grid>
              {/* <MDTypography>Trying to create a modal</MDTypography> */}
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

export default SubTask;
