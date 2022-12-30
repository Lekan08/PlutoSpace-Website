// import React from "react";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import { Form } from "react-bootstrap";

// const TimeSheetManual = () => (
//     const [projectIDx, setProjectIDx ] = useState("");

//     return(
//         <>
//     <DashboardLayout>
//       <DashboardNavbar />
//       <div className="col-sm-10">
//         &nbsp; &nbsp;
//         <p>Select Workflow *</p>
//         <Form.Select
//           aria-label="Default select example"
//           onChange={(e) => setWorkflowIDx(e.target.value)}
//           onInput={(e) => handleOnWorkflowIDx(e.target.value)}
//         >
//           <option>--Select Workflow--</option>
//           {workflow.map((item) => (
//             <option key={item.id} value={item.id}>
//               {item.name}
//             </option>
//           ))}
//         </Form.Select>
//       </div>
//     </DashboardLayout>
//   </>
//     )

// );

// export default TimeSheetManual;

import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
// import DataTable from "examples/Tables/DataTable";
// import taxData from "layouts/tax/data/taxTableData";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import GHeaders from "getHeader";
// import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DataTable from "examples/Tables/DataTable";

function TimeSheetManual() {
  const { allGHeaders: miHeaders } = GHeaders();
  const MySwal = withReactContent(Swal);
  // const { columns: pColumns, rows: pRows } = taxData();

  const [dataTablex, setDataTable] = useState([]);
  const [commentx, setCommentx] = useState("");
  const [startTimexx, setStartTime] = useState("");
  const [endTimex, setEndTimex] = useState("");
  const [projectIDx, setProjectIDx] = useState("");
  const [taskIDx, setTaskIDx] = useState("");
  const [subTaskIDx, setSubTaskIDx] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [subTaskList, setSubTaskList] = useState([]);

  const [checkedProject, setCheckedProject] = useState(false);
  const [checkedTask, setCheckedTask] = useState(false);
  const [checkedStartTime, setCheckedStartTime] = useState(false);
  const [checkedEndTime, setCheckedEndTime] = useState(false);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
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
    setTaskIDx(valuex);
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedTask(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("task").innerHTML = "Select Task you're working on <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedTask(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("task").innerHTML = " ";
    }
  };

  const handleTime = (valuex) => {
    console.log(valuex);
    const sTime = new Date(valuex).getTime();
    if (!sTime) {
      setCheckedStartTime(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("startTime").innerHTML = "Select a Start Time <br>";
    }
    if (sTime) {
      console.log("working2222222");
      setCheckedStartTime(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("startTime").innerHTML = " ";
    }
  };

  const handleTimexx = (valuex) => {
    console.log(valuex);
    const sTime = new Date(valuex).getTime();
    if (!sTime) {
      setCheckedEndTime(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("endTime").innerHTML = "Select an End Time <br>";
    }
    if (sTime) {
      console.log("working2222222");
      setCheckedEndTime(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("endTime").innerHTML = " ";
    }
  };

  // eslint-disable-next-line consistent-return
  const handleClick = (e) => {
    console.log(projectIDx);
    console.log(startTimexx);
    console.log(endTimex);
    const startTimex = new Date(startTimexx).getTime();
    const endTimexxx = new Date(endTimex).getTime();
    const currTime = new Date().getTime();
    console.log(startTimex);
    console.log(endTimexxx);
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
      endTime: endTimexxx,
      empID: currentlyLogegdIn,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (startTimex < currTime) {
      MySwal.fire({
        title: "Invalid Date",
        type: "error",
        text: "Please Enter A Date From The Future",
      });
    } else {
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
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          }).then(() => {
            window.location.reload();
          });
          console.log(result);
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
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const empID = data11.personalID;
    const stDate = new Date(new Date().getFullYear(), 0, 1);
    const enDate = new Date(new Date().getFullYear(), 12, 1);
    const startTime = stDate.getTime();
    const endTime = enDate.getTime();
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_HALIFAX_URL}/timesheet/getForEmp/${orgIDs}/${empID}?startTime=${startTime}&endTime=${endTime}`,
      {
        headers,
      }
    )
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
          if (result.length !== 0) {
            console.log(result);
            setDataTable(result);
          }
        }
      });

    // Method to handle diable

    return () => {
      isMounted = false;
    };
  }, []);

  // eslint-disable-next-line consistent-return
  const handleTask = (value) => {
    handleOnTaskSelect();
    setProjectIDx(value);
    console.log(value !== "");
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

      // Method to handle diable

      return () => {
        isMounted = false;
      };
    }
  };

  // eslint-disable-next-line consistent-return
  const handleSubTask = (taskID) => {
    setTaskIDx(taskID);
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

    // Method to handle diable

    return () => {
      isMounted = false;
    };
  }, []);

  // method handledeleteq

  const handledeleteq = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed === true) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };
        fetch(`${process.env.REACT_APP_HALIFAX_URL}/timesheet/delete/${id}`, requestOptions)
          .then((res) => res.json())
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
  const handleValidate = (e) => {
    handleTime(startTimexx);
    handleTimexx(endTimex);
    handleOnProjectSelect(projectIDx);
    handleOnTaskSelect(taskIDx);
    // console.log(checkedWorkflow);
    if (checkedProject && checkedStartTime && checkedEndTime && checkedTask === true) {
      handleClick(e);
    }
  };

  //  Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };
  // Method to change status
  // eslint-disable-next-line consistent-return
  // const changeStatus = (status) => {
  //   if (status === 0) {
  //     return " ";
  //   }
  //   if (status === 1) {
  //     return "PAID";
  //   }
  //   if (status === 2) {
  //     return "DECLINED";
  //   }
  // };

  // Table for Data

  const pColumns = [
    {
      Header: "Project ",
      accessor: "projectTitle",
      align: "left",
    },
    {
      Header: "Task ",
      accessor: "taskTitle",
      align: "left",
    },
    {
      Header: "Sub-Task ",
      accessor: "subTaskTitle",
      align: "left",
    },
    {
      Header: "Comment ",
      accessor: "comment",
      align: "left",
    },
    {
      Header: "Start Time",
      accessor: "startTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "End Time",
      accessor: "endTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "Duration",
      accessor: "duration",
      align: "left",
    },
    {
      Header: "Actions",
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
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <Icon sx={{ fontWeight: "light" }}>settings</Icon>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate(`/timesheet/update-Timesheet?id=${value}`)}>
                Update
              </Dropdown.Item>

              <Dropdown.Item onClick={() => handledeleteq(value)}>Delete</Dropdown.Item>
              {/* <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
      align: "left",
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
            <MDTypography variant="gradient" fontSize="60%" color="white" id="endTime">
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
                      value={startTimexx}
                      onChange={(e) => setStartTime(e.target.value)}
                      onInput={(e) => handleTime(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-2">
                    <></>
                  </div>
                  <div className="col-sm-5">
                    <TextField
                      id="datetime-local"
                      label="End Time *"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={endTimex}
                      onChange={(e) => setEndTimex(e.target.value)}
                      onInput={(e) => handleTimexx(e.target.value)}
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
                    onChange={(e) => setCommentx(e.target.value)}
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
                  Save
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: dataTablex }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox>

      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default TimeSheetManual;
