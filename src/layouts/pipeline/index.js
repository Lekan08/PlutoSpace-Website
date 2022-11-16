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
// import Grid from "@mui/material/Grid";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import PHeaders from "postHeader";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import uuid from "react-uuid";

export default function Pipeline() {
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  const [workFlow, setWorkFlow] = useState([]);
  const [workFlowStage, setWorkFlowStage] = useState([]);
  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();
  // const MySwal = withReactContent(Swal);
  // const [cast, setCast] = useState(false);
  // const [display, setDisplay] = useState(false);

  // const itemsFromBackend = [
  //   { id: uuid(), content: "First task" },
  //   { id: uuid(), content: "Second task" },
  //   { id: uuid(), content: "Third task" },
  //   { id: uuid(), content: "Fourth task" },
  //   { id: uuid(), content: "Fifth task" },
  // ];

  // const itemsFromBackends = [
  //   { id: uuid(), content: "Second task" },
  //   { id: uuid(), content: "Third task" },
  //   { id: uuid(), content: "Fourth task" },
  // ];

  // const generationx = {
  //   [uuid()]: {
  //     name: "Requested",
  //     items: itemsFromBackend,
  //   },
  //   [uuid()]: {
  //     name: "To do",
  //     items: [],
  //   },
  //   [uuid()]: {
  //     name: "In Progress",
  //     items: itemsFromBackends,
  //   },
  //   [uuid()]: {
  //     name: "Done",
  //     items: [],
  //   },
  // };

  // const [columnsFromBackend, setColumnsFromBackend] = useState(generationx);

  const updateProperties = (dataToFilter, stageIDX) => {
    console.log(dataToFilter);
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      id: dataToFilter[0].id,
      orgID: orgIDs,
      jobPostID: dataToFilter[0].jobPostID,
      empID: dataToFilter[0].empID,
      workflowID: dataToFilter[0].workflowID,
      stageID: stageIDX,
      cbtID: dataToFilter[0].cbtID,
      appointmentID: dataToFilter[0].appointmentID,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_RAGA_URL}/jobApplicationStage/update`, requestOptions)
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
        console.log(resultr.status);
      })
      .catch((error) => {
        console.log(error.status);
      });
  };

  const onDragEnd = (result, columns, setColumns) => {
    console.log(result);
    console.log(result.draggableId);
    const stageIDX = result.destination.droppableId;
    console.log(stageIDX);
    const filteredData = workFlowStage.filter((filter) => result.draggableId === filter.id);
    console.log(filteredData);
    updateProperties(filteredData, stageIDX);
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

  //   const handleWorkStage = () => {
  //     // const callClientType = value.toString();
  //     // // setClientTypex(callClientType);
  //     // setUClientTypex(callClientType);
  //     // console.log(callClientType);
  //     // let clientTyppe = "";
  //     // if (callClientType === "1") {
  //     //   setShowClients(true);
  //     //   clientTyppe = "individual";
  //     // } else if (callClientType === "2") {
  //     //   setShowClients(false);
  //     //   clientTyppe = "corporate";
  //     // }
  //     // setOpened(true);
  //     const headers = miHeaders;
  //     const data11 = JSON.parse(localStorage.getItem("user1"));
  //     const orgIDs = data11.orgID;

  //     fetch(`${process.env.REACT_APP_RAGA_URL}/stage/gets/${orgIDs}`, { headers })
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         const resultres = await res.text();
  //         if (resultres === null || resultres === undefined || resultres === "") {
  //           return {};
  //         }
  //         return JSON.parse(resultres);
  //       })
  //       .then((result) => {
  //         // setOpened(false);
  //         if (result.message === "Expired Access") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (result.message === "Token Does Not Exist") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (result.message === "Unauthorized Access") {
  //           navigate("/authentication/forbiddenPage");
  //           window.location.reload();
  //         }
  //         console.log(result);
  //         setClient(result);
  //       });
  //   };
  // const handleStagesInWorkFlow = (e) => {
  //   setWorkFlow(e.target.value);
  //   const headers = miHeaders;

  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const ids = urlParams.get("id");
  // const ids = JSON.parse([id]);

  // const data11 = JSON.parse(localStorage.getItem("user1"));

  // const ids = data11.id;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_RAGA_URL}/stage/getByIds/${ids}`, {
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
  //       if (isMounted) {
  //         console.log(result);
  //         setWorkFlowStage(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // };

  const handleStagesInWorkFlow = (value) => {
    // This also does the same work like the filter method below but the filter gives more data
    // const drag = {};
    // const objID = [];
    // const objName = [];
    // console.log(objID);
    // // eslint-disable-next-line array-callback-return, consistent-return
    // workFlow.map((work) => {
    //   if (value === work.id) {
    //     console.log(work.stagesInOrder);
    //     // eslint-disable-next-line array-callback-return
    //     work.stagesInOrder.map((item) => {
    //       objID.push(item);
    //       // eslint-disable-next-line array-callback-return
    //       objID.map((shop, index) => {
    //         drag[index] = `${shop}`;
    //       });
    //       // return setCast(obj);
    //     });
    //     // eslint-disable-next-line array-callback-return
    //     work.stagesInOrderName.map((item) => {
    //       objName.push(item);
    //     });
    //   }
    // });

    // console.log(objID);
    // console.log(objName);
    // console.log(objID.splice(3, 1));

    // console.log(obj);
    // console.log(drag);
    // eslint-disable-next-line array-callback-return, consistent-return
    // workFlow.map((work) => {

    // });

    const firstFilter = workFlow.filter((work) => work.id === value);
    console.log(firstFilter);
    let namesOfStages = [];
    if (firstFilter[0].stages.length !== 0) {
      namesOfStages = firstFilter[0].stages.map((mapper) => {
        return {
          id: mapper.id,
          name: mapper.name,
        };
      });

      console.log(namesOfStages);
    }
    // const drag = {};

    // namesOfStages.forEach((item, index) => {
    //   drag[index] = `${item}`;
    // });
    // console.log(drag);

    const workflowID = value;
    console.log(workflowID);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    setOpened(true);

    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_RAGA_URL}/jobApplicationStage/getForWorkflow/${orgIDs}/${workflowID}`,
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
          // const child = [];
          console.log(result);
          // eslint-disable-next-line array-callback-return
          // result.map((no) => {
          //   const cat = {
          //     id: no.id,
          //     personal: no.personal,
          //     stage: no.stage,
          //     stageID: no.stageID,
          //     cbtID: no.cbtID,
          //     content: no.personal.fname,
          //   };
          //   child.push(cat);
          //   console.log(child);
          // });
          setWorkFlowStage(result);
          const obj = {};
          namesOfStages.forEach((item, index) => {
            console.log(index);
            console.log(item.id);
            const stageAppResult = [];
            result.forEach((itemm) => {
              console.log(itemm.stageID);
              if (item.id === itemm.stageID) {
                console.log(`it worked with stage id ${itemm.stageID} and id ${item.id}`);
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

          console.log(obj);
          // const generationxx = {
          //   [uuid()]: {
          //     name: drag[0],
          //     items: result,
          //   },
          //   [uuid()]: {
          //     name: drag[1],
          //     items: [],
          //   },
          //   [uuid()]: {
          //     name: drag[2],
          //     items: [],
          //   },
          //   [uuid()]: {
          //     name: drag[3],
          //     items: [],
          //   },
          //   [uuid()]: {
          //     name: drag[4],
          //     items: [],
          //   },
          //   // cast,
          // };
          console.log(obj);
          // setColumnsFromBackend(generationxx);
          setColumns(obj);
        }
      });
    return () => {
      isMounted = false;
    };
  };

  // const handleStagesInWorkFlow = (e, value) => {
  //   const workflowID = value.id;
  //   setWorkFlowStage(e.target.value);
  //   // if (enabled) {
  //   setOpened(true);
  //   const headers = miHeaders;

  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const ids = urlParams.get("id");
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   let isMounted = true;
  //   fetch(
  //     `${process.env.REACT_APP_RAGA_URL}/jobApplicationStage/getForWorkflow/${orgIDs}/${workflowID}`,
  //     { headers }
  //   )
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       setOpened(false);
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
  //         // setStages(result);
  //         fetch(`${process.env.REACT_APP_RAGA_URL}/workflow/getByIds/${ids}`, {
  //           headers,
  //         })
  //           .then(async (res) => {
  //             const aToken = res.headers.get("token-1");
  //             localStorage.setItem("rexxdex", aToken);
  //             return res.json();
  //           })
  //           .then((resultp) => {
  //             console.log(resultp);
  //             if (resultp.message === "Expired Access") {
  //               navigate("/authentication/sign-in");
  //               window.location.reload();
  //             }
  //             if (resultp.message === "Token Does Not Exist") {
  //               navigate("/authentication/sign-in");
  //               window.location.reload();
  //             }
  //             if (resultp.message === "Unauthorized Access") {
  //               navigate("/authentication/forbiddenPage");
  //               window.location.reload();
  //             }
  //             if (isMounted) {
  //               // eslint-disable-next-line eqeqeq
  //               // if (resultp.length != 0) {
  //               //   setIdx(resultp[0].id);
  //               //   setName(resultp[0].name);
  //               //   if (resultp[0].descrip !== null) {
  //               //     setDescrip(resultp[0].descrip);
  //               //   }
  //               console.log(resultp);
  //               if (resultp[0].stagesInOrder !== null) {
  //                 const stagesIds = resultp[0].stagesInOrder;
  //                 const newStages = [];
  //                 const leftStages = [];
  //                 // eslint-disable-next-line array-callback-return
  //                 result.map((it) => {
  //                   let check = 0;
  //                   // eslint-disable-next-line array-callback-return
  //                   stagesIds.map((sit) => {
  //                     if (sit === it.id) {
  //                       check = 1;
  //                       newStages.push(it);
  //                     }
  //                   });
  //                   if (check === 0) {
  //                     leftStages.push(it);
  //                   }
  //                 });

  //                 setWorkFlowStage(newStages);
  //                 // }
  //               }
  //             }
  //           });
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // };

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

  // This code nah machala code for giving different color code
  // But it is not needed now 😉😉
  // const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  const style = {
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    // backgroundColor: "#A460ED",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 20,
    overflow: "scroll",
    height: "300%",
    width: "100%",
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card mt={1} style={{ height: "100px", width: "100%" }}>
        <Container>
          <div>
            <MDTypography
              variant="h6"
              textAlign="center"
              fontWeight="medium"
              color="secondary"
              mt={1}
            >
              Select A Workflow
            </MDTypography>
            <MDBox mx={34} textAlign="right">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => handleStagesInWorkFlow(e.target.value)}
              >
                <option>--Select Workflow--</option>
                {workFlow.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </MDBox>
          </div>
        </Container>{" "}
      </Card>
      &nbsp;&nbsp;
      <div>
        {workFlowStage.length > 0 && (
          <Card mt={1} style={style}>
            <Container>
              <div style={{ display: "flex", justifyContent: "left", height: "100%" }}>
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
                          mx={2}
                          mt={-3}
                          p={2}
                          mb={1}
                          textAlign="center"
                        >
                          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                            {column.name}
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
                                    background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                                    padding: 4,
                                    width: 250,
                                    minHeight: 500,
                                    borderRadius: 10,
                                  }}
                                >
                                  {column.items.map((item, index) => {
                                    return (
                                      <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provideds, snapshots) => (
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
                                              minHeight: "50px",
                                              borderRadius: 10,
                                              backgroundColor: snapshots.isDragging
                                                ? "#263B4A"
                                                : "#318CE7",
                                              color: "white",
                                              ...provideds.draggableProps.style,
                                            }}
                                          >
                                            {item.personal.fname} {item.personal.lname} <br />
                                            {item.jobPost.industry}
                                            <br />
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
          </Card>
        )}
      </div>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}
