/* eslint-disable prettier/prettier */
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import GHeaders from "getHeader";
import DatePicker from "react-datepicker";
import PHeaders from "postHeader";
import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Updatesub() {
  const { allGHeaders: miHeaders } = GHeaders();

  const MySwal = withReactContent(Swal);
  const [OpeningDatex, setStart] = useState("");
  const [ClosingDatex, setEnd] = useState("");
  const [userID, setUserIDx] = useState("");
  console.log(userID);

  // const [workFlow, setWorkFlow] = useState([]);
  const [deleteFlagx, setDeleteFlag] = useState("");
  const { allPHeaders: myHeaders } = PHeaders();
  const [subtaskDescription, setSubtaskDescription] = useState("");
  const [opened, setOpened] = useState(false);
  const [actualstmexx, setActualStartTimex] = useState("");
  const [costx, setCostx] = useState("");
  const [projectID, setProjectID] = useState("");
  const [actualEndTimexx, setActualEndTimexx] = useState("");
  const [idx, setIdx] = useState("");
  const [costxx, setCostxx] = useState("");
  const [userxx, setUserxx] = useState([]);
  const [items, setItems] = useState([]);

  const [subTaskTitle, setSubTaskTitle] = useState("");

  const navigate = useNavigate();




  // useEffect(() => {
  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_RAGA_URL}/workflow/gets/${orgIDs}`, { headers })
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
  //         `setWorkFlow`(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // // }, []);
  // useEffect(() => {
  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const orgIDs = data11.orgID;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_HALIFAX_URL}/project/gets/${orgIDs}`, { headers })
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       const result = await res.text();
  //       if (result === null || result === undefined || result === "") {
  //         return {};
  //       }
  //       return JSON.parse(result);
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
  //         if (result.length !== 0) {
  //           console.log(projectID);
  //           setProjectID(result);
  //         }
  //       }
  //     });

  //   // Method to handle diable

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const ids = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_HALIFAX_URL}/subtask/getByIds/${ids}`, {
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
          setItems(result);
          console.log(result);
          setIdx(result[0].id);
          setSubTaskTitle(result[0].title);
          setCostx(result[0].totalExpectedCost);
          setDeleteFlag(result[0].deleteFlag);
          setSubtaskDescription(result[0].descrip);
          setStart(result[0].expectedStartTime);
          setProjectID(result[0].projectID);
          setEnd(result[0].expectedEndTime);
          setUserIDx(result[0].assignedTo);
          setCostxx(result[0].totalActualCost);
          setActualStartTimex(result[0].actualStartTime);
          setActualEndTimexx(result[0].actualEndTime);
        }
        console.log(result);
        console.log(projectID);
      });
    return () => {
      isMounted = false;
    };
  }, []);
  //   const handleOnTitleKeys = () => {
  //     const letter = /^[a-zA-Z ]+$/;
  //     if (!titlex.match(letter)) {
  //       setCheckedTitle(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("title").innerHTML =
  //         "Name - input only capital and small letters<br>";
  //     }
  //     if (titlex.match(letter)) {
  //       setCheckedTitle(true);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("title").innerHTML = "";
  //     }
  //     if (titlex.length === 0) {
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("title").innerHTML = "Title is required<br>";
  //     }
  //     setEnabled(checkedTitle === true);
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
  // useEffect(() => {
  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_RAGA_URL}/workflow/gets/${orgIDs}`, { headers })
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
  //         setWorkFlow(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  const handleUpdate = (e) => {

    e.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    // const currentStageIDxx = urlParams.get("workflowID");
    const taskIDx = urlParams.get("id");
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    // console.log(projectID);
    // const currentStageIdxx = workFlow.filter((data) => data.id === currentStageIDxx);
    const openingDate = new Date(OpeningDatex).getTime();
    const closingDate = new Date(ClosingDatex).getTime();
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      projectID: items[0].projectID,
      title: subTaskTitle,
      descrip: subtaskDescription,
      assignedTo: userID,
      expectedStartTime: openingDate,
      expectedEndTime: closingDate,
      actualStartTime: actualstmexx,
      actualEndTime: actualEndTimexx,
      totalExpectedCost: costx,
      totalActualCost: costxx,
      currentStageID: items[0].currentStageID,
      taskID: taskIDx,
      deleteFlag: deleteFlagx,
    });

    // "id": "string",
    // "orgID": "string",
    // "projectID": "string",
    // "title": "string",
    // "descrip": "string",
    // "assignedTo": 0,
    // "expectedStartTime": 0,
    // "expectedEndTime": 0,
    // "actualStartTime": 0,
    // "actualEndTime": 0,
    // "totalExpectedCost": 0,
    // "totalActualCost": 0,
    // "currentStageID": "string",
    // "taskID": "string",
    // "deleteFlag": 0
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
        // setOpened(false);
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
                    Update Subtask
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
                      <div>
                        <div>
                          <MDBox mx={1} textAlign="center">
                            {/* <div className="col">
                              <div className="col-sm-2">
                                <TextField
                                  id="datetime-local"
                                  label="Expected End Time *"
                                  type="datetime-local"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  value={ChangeDateandTime(OpeningDatex)}
                                  onChange={(e) => setStart(e.target.value)}
                                />
                              </div>
                            </div> */}
                            <div className="col">
                              <div className="col-sm-12">
                                <Container>
                                  <MDTypography>Expected Start Time</MDTypography>
                                  <DatePicker
                                    placeholderText="MM/DD/YY hh:mm"
                                    style={{ marginRight: "10px" }}
                                    selected={OpeningDatex}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    showTimeSelect
                                    dateFormat="MM/dd/yyyy h:mm aa"
                                    dropdownMode="select"
                                    onChange={(time) => setStart(time)}
                                  />
                                </Container>
                              </div>
                            </div>
                          </MDBox>
                        </div>
                      </div>
                      <div>
                        <div>
                          <MDBox mx={1} textAlign="center">
                            <div className="col">
                              <div className="col-sm-12">
                                <Container>
                                  <MDTypography>Expected End Time</MDTypography>
                                  <DatePicker
                                    label="Expected End Time *"
                                    placeholderText="MM/DD/YY hh:mm"
                                    style={{ marginRight: "10px" }}
                                    selected={ClosingDatex}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    showTimeSelect
                                    dateFormat="MM/dd/yyyy h:mm aa"
                                    dropdownMode="select"
                                    onChange={(time) => setEnd(time)}
                                  />
                                </Container>
                              </div>
                            </div>
                          </MDBox>
                        </div>
                      </div>
                      <IconButton onClick={(e) => handleUpdate(e)}>
                        <SaveIcon />
                      </IconButton>
                    </Paper>
                  </MDBox>
                </Container>
              </Card>


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
    </DashboardLayout>
  );
};

export default Updatesub;
