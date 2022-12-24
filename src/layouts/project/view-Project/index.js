/* eslint-disable arrow-body-style */
import * as React from "react";
import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Footer from "examples/Footer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import PHeaders from "postHeader";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
// import Divider from "@mui/material/Divider";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import Swal from "sweetalert2";
// import Subtask from "layouts/project/subtask";
import withReactContent from "sweetalert2-react-content";
import Grid from "@mui/material/Grid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import Button from "@mui/material/Button";
// import EditIcon from "@mui/icons-material/Edit";
// import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
// import Typography from "@mui/material/Typography";
import TaskAudit from "layouts/project/taskAudit";

export default function Pipeline() {
  const MySwal = withReactContent(Swal);
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  const [workFlow, setWorkFlow] = useState([]);
  const [userInfox, setUserInfo] = useState([]);
  const [assignedTox, setAssignTo] = useState("");
  const [opened, setOpened] = useState(false);
  const [open, setOpen] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();
  const [namex, setNamex] = useState("");
  const [modalCost, setModalCost] = useState(0);
  const [workflowDetailx, setWorkflowDetailx] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskNamex, setTaskNamex] = useState("");
  const [projectIDx, setProjectIDx] = useState("");
  const [costx, setCostx] = useState(0);
  const [projectGet, setProjectGet] = useState("");
  const [taskGet, setTaskGet] = useState("");
  const [taskCarrierUpdate, setTaskCarrierUpdate] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescrip, setModalDescrip] = useState("");
  const [modalExpectedStartTime, setModalExpectedStartTime] = useState("");
  const [modalActualStartTime, setModalActualStartTime] = useState("");
  const [modalTotalActualCost, setModalTotalActualCost] = useState("");
  const [taskId, setTaskid] = useState("");
  // const [alreadyComm, setALreadyComm] = useState(false);
  const [items, setItems] = useState([]);
  const [subTask, setSubtask] = useState(false);
  const [expectedStartTime, setExpectedStartTime] = useState("");
  const [expectedEndTime, setExpectedEndTime] = useState("");
  const [modalExpectedEndTime, setModalExpectedEndTime] = useState("");
  const [modalAssignedTox, setModalAssignTo] = useState("");
  // const [, setShowButton] = useState(false);
  // const [commentxxx, setCommentxxxx] = useState();
  const handleClose = () => setOpen(false);

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  const handleUpdateTask = () => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const createdByx = data11.id;

    const modalActualStartTimex = new Date(modalActualStartTime).getTime();

    const raw = JSON.stringify({
      id: taskCarrierUpdate[0].id,
      orgID: orgIDs,
      projectID: taskCarrierUpdate[0].projectID,
      title: modalTitle,
      descrip: modalDescrip,
      assignedTo: modalAssignedTox,
      expectedStartTime: modalExpectedStartTime,
      expectedEndTime: modalExpectedEndTime,
      actualStartTime: modalActualStartTimex,
      actualEndTime: taskCarrierUpdate[0].actualEndTime,
      totalExpectedCost: Number(modalCost),
      totalActualCost: modalTotalActualCost,
      currentStageID: taskCarrierUpdate[0].currentStageID,
      prerequisiteTaskID: taskCarrierUpdate[0].prerequisiteTaskID,
      deleteFlag: taskCarrierUpdate[0].deleteFlag,
    });

    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_HALIFAX_URL}/task/update`, requestOptions)
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
        handleClose();
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          window.location.reload();
        });
        console.log(result);
        if (result.data !== null) {
          const raww = JSON.stringify({
            orgID: orgIDs,
            projectID: projectIDx,
            taskID: result.data.id,
            actionBy: createdByx,
            actionTaken: "updated this Task on",
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
        console.log(setSubtask);
        console.log(subTask);
        if (isMounted) {
          console.log(taskID);
          setItems([]);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log("is it rendering");
    console.log(modalAssignedTox);
    // setShowButton(true);
  }, [modalActualStartTime, modalTotalActualCost, modalDescrip, modalTitle, modalAssignedTox]);

  const addTask = () => {
    const expectedStartTimex = new Date(expectedStartTime).getTime();
    const expectedEndTimex = new Date(expectedEndTime).getTime();
    const currTime = new Date().getTime();
    console.log(workFlow);
    const currentStageIdx = workFlow.filter((data) => data.id === projectGet[0].workflowID);

    console.log(currentStageIdx);
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const createdByx = data11.id;
    const raw = JSON.stringify({
      orgID: orgIDs,
      projectID: projectIDx,
      title: taskNamex,
      descrip: taskDescription,
      assignedTo: assignedTox,
      expectedStartTime: expectedStartTimex,
      expectedEndTime: expectedEndTimex,
      currentStageID: currentStageIdx[0].stages[0].id,
      totalExpectedCost: costx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    if (
      expectedEndTimex < expectedStartTimex ||
      expectedEndTimex < currTime ||
      expectedStartTimex < currTime
    ) {
      MySwal.fire({
        title: "Invalid Date",
        type: "error",
        text: "Please Enter A Date From The Future",
      });

      setOpened(false);
    } else {
      fetch(`${process.env.REACT_APP_HALIFAX_URL}/task/add`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((resultr) => {
          console.log(resultr);
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
          MySwal.fire({
            title: resultr.status,
            type: "success",
            text: resultr.message,
          }).then(() => {
            window.location.reload();
          });
          console.log(resultr);
          if (resultr.data !== null) {
            const raww = JSON.stringify({
              orgID: orgIDs,
              projectID: projectIDx,
              taskID: resultr.data.id,
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
          setOpened(false);
          MySwal.fire({
            title: error.status,
            type: "error",
            text: error.message,
          });
        });
    }
  };
  const onDragTask = (filteredData, onDragCurrentStageIDx) => {
    console.log(onDragCurrentStageIDx);

    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const createdByx = data11.id;
    const raw = JSON.stringify({
      id: filteredData[0].id,
      orgID: orgIDs,
      projectID: filteredData[0].projectID,
      title: filteredData[0].title,
      descrip: filteredData[0].descrip,
      assignedTo: filteredData[0].assignedTo,
      expectedStartTime: filteredData[0].expectedStartTime,
      expectedEndTime: filteredData[0].expectedEndTime,
      actualStartTime: filteredData[0].actualStartTime,
      actualEndTime: filteredData[0].actualEndTime,
      totalExpectedCost: filteredData[0].totalExpectedCost,
      totalActualCost: filteredData[0].totalActualCost,
      currentStageID: onDragCurrentStageIDx,
      prerequisiteTaskID: filteredData[0].prerequisiteTaskID,
      deleteFlag: filteredData[0].deleteFlag,
    });

    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_HALIFAX_URL}/task/update`, requestOptions)
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
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        setOpened(false);
        console.log(result.status);
        if (result.data !== null) {
          const raww = JSON.stringify({
            orgID: orgIDs,
            projectID: projectIDx,
            taskID: result.data.id,
            actionBy: createdByx,
            actionTaken: "changed this Task stage on",
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
        console.log(error.status);
      });
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

  const onDragEnd = (result, columns, setColumns) => {
    console.log(result);
    console.log(result.draggableId);

    let currentStageIDx = result.source.droppableId;
    console.log(currentStageIDx);
    if (result.destination !== null) {
      console.log("flash");
      currentStageIDx = result.destination.droppableId;
    }
    console.log(currentStageIDx);
    const filteredData = taskGet.filter((filter) => result.draggableId === filter.id);
    console.log(filteredData);
    onDragTask(filteredData, currentStageIDx);
    console.log("drag");
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const [columns, setColumns] = useState({});

  useEffect(() => {
    const headers = miHeaders;
    let isMounted = true;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    setProjectIDx(ids);

    fetch(`${process.env.REACT_APP_HALIFAX_URL}/project/getByIds/${ids}`, { headers })
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
          // setWorkflowDetails(result);
          setProjectGet(result);
          console.log(result);
          setNamex(result[0].name);
          //   setWorkflowIDx(result[0].workflowID);
          //   setDescription(result[0].descrip);
          //   setID(result[0].id);
          //   setCreatedTimex(result[0].createdTime);
          //   setDeleteflagx(result[0].deleteFlag);
          //   setTerminatedByx(result[0].terminatedBy);
          //   setTerminatedTimex(result[0].terminatedTime);
          //   setStatusx(result[0].status);
          //   setActualEndTimex(result[0].actualEndTime);
          //   setForeCastedEndTime(result[0].forecastedEndTime);
          //   setStartTime(result[0].startTime);
          //   setEndedByx(result[0].endedBy);
          //   setCreatedByx(result[0].createdBy);
          fetch(`${process.env.REACT_APP_RAGA_URL}/workflow/gets/${orgIDs}`, { headers })
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resultp) => {
              if (resultp.message === "Expired Access") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resultp.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resultp.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
                window.location.reload();
              }
              if (isMounted) {
                console.log(resultp);
                setWorkFlow(resultp);
                fetch(`${process.env.REACT_APP_HALIFAX_URL}/task/gets/${orgIDs}/${ids}`, {
                  headers,
                })
                  .then(async (res) => {
                    const aToken = res.headers.get("token-1");
                    localStorage.setItem("rexxdex", aToken);
                    const resultr = await res.text();
                    if (resultr === null || resultr === undefined || resultr === "") {
                      return {};
                    }
                    return JSON.parse(resultr);
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
                      setTaskGet(resultr);
                      console.log(resultr);
                      const firstFilter = resultp.filter(
                        (data) => result[0].workflowID === data.id
                      );
                      let workflowDetails = [];
                      if (firstFilter[0].stages.length !== 0) {
                        workflowDetails = firstFilter[0].stages.filter((data) => {
                          return {
                            id: data.id,
                            name: data.name,
                          };
                        });
                      }
                      setWorkflowDetailx(workflowDetails);
                      console.log(workflowDetails);
                      if (result.length !== 0) {
                        const obj = {};
                        workflowDetails.forEach((item, index) => {
                          console.log(index);
                          console.log(item.id);
                          const stageAppResult = [];
                          resultr.forEach((itemm) => {
                            console.log(itemm.currentStageID);
                            if (item.id === itemm.currentStageID) {
                              console.log(
                                `it worked with stage id ${itemm.stageID} and id ${item.id}`
                              );
                              // eslint-disable-next-line no-unused-expressions
                              stageAppResult.push(itemm);
                            }
                          });
                          console.log(stageAppResult);
                          Object.assign(obj, {
                            [item.id]: {
                              name: `${item.name}`,
                              items: stageAppResult,
                            },
                          });
                        });

                        setColumns(obj);
                      }
                      console.log(resultr);
                    }
                  });
              }
            });
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

  const style = {
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 20,
    overflow: "scroll",
    height: "300%",
    width: "100%",
    display: "block",
  };

  // const updateGetById = () => {
  //   const headers = miHeaders;

  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const ids = urlParams.get("id");
  //   // const data11 = JSON.parse(localStorage.getItem("user1"));

  //   // const orgIDs = data11.orgID;
  //   // console.log(taskId);
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskComment/getByIds/${ids}`, {
  //     headers,
  //   })
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
  //       console.log(result);
  //       if (isMounted) {
  //         // eslint-disable-next-line eqeqeq
  //         if (result !== 0 && result !== "" && result !== []) {
  //           setBigZzzz(result);
  //           // updateGetById(id);
  //         }
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // };

  // const zinoUpdates = (e) => {
  //   // handleOnNameKeys();
  //   // if (enabled) {
  //   setOpened(true);
  //   e.preventDefault();
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   // const personalIds = data11.personalID;

  //   // const queryString = window.location.search;
  //   // const urlParams = new URLSearchParams(queryString);
  //   // const ids = urlParams.get("id");

  //   const raw = JSON.stringify({
  //     id: items[0].id,
  //     orgID: orgIDs,
  //     projectID: items[0].projectID,
  //     taskID: items[0].taskID,
  //     subTaskID: "string",
  //     comment: zino,
  //     empID: items[0].empID,
  //     createdTime: items[0].createdTime,
  //     deleteFlag: items[0].deleteFlag,
  //   });
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };
  //   console.log(raw);
  //   fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskComment/update`, requestOptions)
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
  //       setOpened(false);
  //       // MySwal.fire({
  //       //   title: result.status,
  //       //   type: "success",
  //       //   text: result.message,
  //       // }).then(() => {
  //       //   window.location.reload();
  //       // });
  //     })
  //     .then(() => {
  //       window.location.reload();
  //     });
  //   // .catch((error) => {
  //   //   setOpened(false);
  //   //   MySwal.fire({
  //   //     title: error.status,
  //   //     type: "error",
  //   //     text: error.message,
  //   //   });
  //   // });
  //   // }
  // };

  // const setCommentxxxx = (id) => {
  //   const headers = miHeaders;

  //   // const queryString = window.location.search;
  //   // const urlParams = new URLSearchParams(queryString);
  //   // const ids = urlParams.get("id");
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   console.log(taskId);
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskComment/getForTask/${orgIDs}/${id}`, {
  //     headers,
  //   })
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
  //       console.log(result);
  //       if (isMounted) {
  //         // eslint-disable-next-line eqeqeq
  //         if (result !== 0 && result !== "" && result !== []) {
  //           setZino(result);
  //           // setBigZzzz(result);
  //           // setItems(result);
  //           // zinoUpdates(id);
  //         }
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // };
  // console.log(zino);

  // eslint-disable-next-line no-unused-vars

  // const setCommentxxxx = (id) => {
  //   const headers = miHeaders;

  //   // const queryString = window.location.search;
  //   // const urlParams = new URLSearchParams(queryString);
  //   // const ids = urlParams.get("id");
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   console.log(taskId);
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskComment/getForTask/${orgIDs}/${id}`, {
  //     headers,
  //   })
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
  //       console.log(result);
  //       if (isMounted) {
  //         // eslint-disable-next-line eqeqeq
  //         if (result.length === 0) {
  //           setALreadyComm(true);
  //         } else if (result !== 0 && result !== "" && result !== []) {
  //           setZino(result[0].comment);
  //         }
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // };
  // console.log(zino);

  const openModal = (id) => {
    console.log("This is for modal");
    setTaskid(id);
    setSubtask(id);
    // setCommentxxxx(id);
    // updateGetById(id);
    // handleDelete(id);
    setOpen(true);
    console.log(id);
    const filterFirstedd = taskGet.filter((data) => data.id === id);
    setTaskCarrierUpdate(filterFirstedd);
    console.log(filterFirstedd);
    setModalCost(filterFirstedd[0].totalExpectedCost);
    setModalTitle(filterFirstedd[0].title);
    setModalDescrip(filterFirstedd[0].descrip);
    setModalExpectedStartTime(filterFirstedd[0].expectedStartTime);
    setModalExpectedEndTime(filterFirstedd[0].expectedEndTime);
    setModalActualStartTime(filterFirstedd[0].actualStartTime);
    setModalTotalActualCost(filterFirstedd[0].totalActualCost);
    setModalAssignTo(filterFirstedd[0].assignedTo);
  };

  // const handleClick = (e) => {
  //   // handleOnNameKeys();
  //   // if (enabled) {
  //   setOpened(true);
  //   e.preventDefault();
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   const personalIds = data11.personalID;

  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const ids = urlParams.get("id");

  //   const raw = JSON.stringify({
  //     orgID: orgIDs,
  //     projectID: ids,
  //     taskID: taskId,
  //     subTaskID: "string",
  //     // comment: commentx,
  //     empID: personalIds,
  //   });
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };
  //   console.log(raw);
  //   fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskComment/add`, requestOptions)
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
  //       setOpened(false);
  //       // MySwal.fire({
  //       //   title: result.status,
  //       //   type: "success",
  //       //   text: result.message,
  //       // }).then(() => {
  //       //   window.location.reload();
  //       // });
  //     })
  //     .then(() => {
  //       window.location.reload();
  //     });
  //   // .catch((error) => {
  //   //   setOpened(false);
  //   //   MySwal.fire({
  //   //     title: error.status,
  //   //     type: "error",
  //   //     text: error.message,
  //   //   });
  //   // });
  //   // }
  // };
  // console.log(handleClick);
  console.log(taskId);
  const handleViewSupply = () => {
    navigate(`/project/subtask?id=${taskId}&workflowID=${projectGet[0].workflowID}`);
  };
  // console.log(currentStageID);
  console.log(taskId);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={1} mb={1} style={{ height: "350px", width: "100%", backgroundColor: "#ffffff" }}>
        <Container>
          <div>
            <MDTypography variant="h4" textAlign="left" fontWeight="bold" color="secondary" mt={1}>
              {namex}
              <FormatListBulletedIcon />
              <DashboardIcon />
            </MDTypography>

            <MDTypography
              variant="h6"
              textAlign="center"
              fontWeight="medium"
              color="secondary"
              mt={1}
              mb={4}
            >
              Create A Task
            </MDTypography>
            <MDBox mx={34} textAlign="right">
              <></>
            </MDBox>
            <div className="row">
              <div className="col-sm-6">
                <TextField
                  id="outlined-textarea"
                  label="Title *"
                  value={taskNamex}
                  placeholder="Task Title"
                  onChange={(e) => setTaskNamex(e.target.value)}
                  rows={2}
                  sx={{
                    width: 500,
                  }}
                  multiline
                />
              </div>
              <div className="col-sm-1">
                <></>
              </div>
              <div className="col-sm-5">
                <TextField
                  id="outlined-textarea"
                  rows={2}
                  value={taskDescription}
                  label="Description"
                  placeholder="Task Description"
                  onChange={(e) => setTaskDescription(e.target.value)}
                  sx={{
                    width: 400,
                  }}
                  multiline
                />
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-3">
              <TextField
                label=" Expected Cost (NGN) "
                type="number"
                value={costx}
                onChange={(e) => setCostx(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <TextField
                id="datetime-local"
                label="Expected Start Time"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                value={expectedStartTime}
                onChange={(e) => setExpectedStartTime(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <TextField
                id="datetime-local"
                label="Expected End Time"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                value={expectedEndTime}
                onChange={(e) => setExpectedEndTime(e.target.value)}
              />
            </div>
            <div className="col-sm-3">
              <Form.Select
                value={assignedTox}
                aria-label="Default select example"
                onChange={(e) => setAssignTo(e.target.value)}
              >
                <option>--Assign to--</option>
                {userInfox.map((item) => (
                  <option key={item.personal.id} value={item.personal.id}>
                    {item.personal.fname} {item.personal.lname}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" onClick={addTask} color="info" width="50%" align="left">
              Save
            </MDButton>
          </MDBox>
        </Container>
      </MDBox>
      &nbsp;&nbsp;
      <div>
        {workflowDetailx.length > 0 ? (
          <Card mt={1} style={style}>
            <MDBox sx={{ maxHeight: "600px" }}>
              <Container>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    height: "100%",
                  }}
                >
                  <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([columnId, column]) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                          key={columnId}
                        >
                          <br />
                          <br />
                          <MDBox
                            variant="gradient"
                            bgColor="info"
                            borderRadius="lg"
                            coloredShadow="info"
                            mx={1}
                            mt={1}
                            p={1}
                            mb={1}
                            textAlign="center"
                            width="207px"
                            height="50px"
                          >
                            <MDTypography fontSize="20px" fontWeight="medium" color="white" mt={1}>
                              {column.name.toUpperCase()}
                            </MDTypography>
                          </MDBox>
                          <br />
                          <div style={{ margin: 8 }}>
                            <Droppable droppableId={columnId} key={columnId}>
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    // eslint-disable-next-line react/jsx-props-no-spreading
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                      background: snapshot.isDraggingOver ? "lightblue" : "#FAF9F6",
                                      padding: 4,
                                      width: 250,
                                      minHeight: 1500,
                                      borderRadius: 10,
                                    }}
                                  >
                                    {column.items.map((item, index) => {
                                      return (
                                        <Draggable
                                          key={item.id}
                                          draggableId={item.id}
                                          index={index}
                                        >
                                          {(provideds, snapshots) => (
                                            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                                            <div
                                              ref={provideds.innerRef}
                                              // eslint-disable-next-line react/jsx-props-no-spreading
                                              {...provideds.draggableProps}
                                              // eslint-disable-next-line react/jsx-props-no-spreading
                                              {...provideds.dragHandleProps}
                                              style={{
                                                userSelect: "none",
                                                padding: 16,
                                                margin: "0 0 8px 0",
                                                minHeight: "70px",
                                                borderRadius: 10,
                                                fontSize: "15px",
                                                backgroundColor: snapshots.isDragging
                                                  ? "#263B4A"
                                                  : "#318CE7",
                                                color: "white",
                                                ...provideds.draggableProps.style,
                                              }}
                                              onClick={() => openModal(item.id)}
                                              // onKeyUp={() => }
                                            >
                                              {item.title}
                                            </div>
                                          )}
                                        </Draggable>
                                      );
                                    })}
                                    {provided.placeholder}
                                  </div>
                                );
                              }}
                            </Droppable>
                          </div>
                        </div>
                      );
                    })}
                  </DragDropContext>
                </div>
              </Container>
            </MDBox>
          </Card>
        ) : (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={3}>
              <Card style={{ width: "500px", height: "100px", itemAlign: "center" }}>
                <HighlightOffIcon
                  fontSize="large"
                  style={{
                    padding: "5px",
                  }}
                />
                <MDTypography
                  variant="h4"
                  textAlign="center"
                  fontWeight="bold"
                  color="secondary"
                  mt={1}
                >
                  Please Add Stages to workflow
                </MDTypography>
              </Card>
            </Grid>
          </Grid>
        )}
      </div>
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
                <div
                  style={{
                    backgroundColor: "ButtonFace",
                    padding: "10px",
                    borderRadius: "10px",
                    margin: "10px",
                    fontSize: "13px",
                  }}
                >
                  <br />
                  Expected Cost :
                  <TextField
                    label="(NGN) "
                    type="number"
                    value={modalCost}
                    size="small"
                    onChange={(e) => setModalCost(e.target.value)}
                  />
                </div>
                <MDButton
                  variant="gradient"
                  onClick={handleUpdateTask}
                  color="info"
                  width="50%"
                  align="center"
                  size="small"
                >
                  Update
                </MDButton>
                &nbsp; &nbsp;
                <MDButton
                  variant="gradient"
                  onClick={handleViewSupply}
                  color="info"
                  width="50%"
                  align="left"
                >
                  Create SubTask
                </MDButton>
                <br />
                <br />
                <container>
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
                        {/* <IconButton onClick={() => handleDisable(taskID.id)}>
                          <DeleteIcon />
                        </IconButton>
                        &nbsp; &nbsp;
                        <IconButton onClick={() => handleUpdatesub(taskID.id)}>
                          <BrowserUpdatedIcon />
                        </IconButton> */}
                      </li>
                    ))}
                  </ul>
                </container>
                <br />
              </Grid>
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
                <TaskAudit taskId={taskId} />
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
}
