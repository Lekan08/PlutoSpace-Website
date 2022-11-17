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

function Project() {
  const { allGHeaders: miHeaders } = GHeaders();
  const MySwal = withReactContent(Swal);
  // const { columns: pColumns, rows: pRows } = taxData();

  const [dataTablex, setDataTable] = useState([]);
  const [descriptionx, setDescription] = useState("");
  const [namex, setNamex] = useState("");
  const [startTimexx, setStartTime] = useState("");
  const [foreCastedEndTimexx, setForeCastedEndTime] = useState("");
  const [workflowIDx, setWorkflowIDx] = useState("");
  const [workflow, setWorkflow] = useState([]);

  const [checkedName, setCheckedName] = useState("");
  const [checkedWorkflow, setCheckedWorkflow] = useState(false);
  const [checkedForecastedEndTime, setCheckedForecastedEndTime] = useState(false);
  const [checkedStartTime, setCheckedStartTime] = useState(false);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();

  // eslint-disable-next-line consistent-return
  const handleOnNameKeys = () => {
    const letters = /^[a-zA-Z0-9 ]+$/;
    if (!namex.match(letters)) {
      setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name - input only leters and numbers<br>";
    }
    if (namex.match(letters)) {
      setCheckedName(true);
      console.log("chech");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (namex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name is required<br>";
    }
  };

  const handleOnWorkflowIDx = (valuex) => {
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("workflow").innerHTML = "Select a Workflow <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedWorkflow(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("workflow").innerHTML = " ";
    }
  };

  const handleTime = (valuex) => {
    console.log(valuex);
    const sTime = new Date(valuex).getTime();
    if (!sTime) {
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

  const handleTimex = (valuex) => {
    console.log(valuex);
    const FETime = new Date(valuex).getTime();
    if (!FETime) {
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("FETime").innerHTML = "Select a Forecasted End Time <br>";
    }
    if (FETime) {
      console.log("working2222222");
      setCheckedForecastedEndTime(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("FETime").innerHTML = " ";
    }
  };

  // eslint-disable-next-line consistent-return
  const handleClick = (e) => {
    console.log(workflowIDx);
    console.log(startTimexx);
    console.log(foreCastedEndTimexx);
    const startTimex = new Date(startTimexx).getTime();
    const foreCastedEndTimex = new Date(foreCastedEndTimexx).getTime();
    const currTime = new Date().getTime();
    console.log(startTimex);
    console.log(foreCastedEndTimex);

    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const createdByx = data11.personalID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      name: namex,
      descrip: descriptionx,
      workflowID: workflowIDx,
      createdBy: createdByx,
      startTime: startTimex,
      forecastedEndTime: foreCastedEndTimex,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (foreCastedEndTimex < startTimex || foreCastedEndTimex < currTime || startTimex < currTime) {
      MySwal.fire({
        title: "Invalid Date",
        type: "error",
        text: "Please Enter A Date From The Future",
      });
    } else {
      setOpened(true);
      fetch(`${process.env.REACT_APP_HALIFAX_URL}/project/add`, requestOptions)
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
            setDataTable(result);
          }
        }
      });

    // Method to handle diable

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
          if (result.length !== 0) {
            console.log(result);
            setWorkflow(result);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // const handleUpdate = (idx, values, createdTimex, deleteFlagx) => {
  //     const data11 = JSON.parse(localStorage.getItem("user1"));

  //     const orgIDs = data11.orgID;

  //     const raw = JSON.stringify({
  //       id: idx,
  //       orgID: orgIDs,
  //       value: values,
  //       //   descrip: descripx,
  //       createdTime: createdTimex,
  //       deleteFlag: deleteFlagx,
  //     });

  //     const requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };

  //     fetch(`${process.env.REACT_APP_TANTA_URL}/tax/update`, requestOptions)
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         return res.json();
  //       })
  //       .then((result) => {
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
  //         MySwal.fire({
  //           title: result.status,
  //           type: "success",
  //           text: result.message,
  //         }).then(() => {
  //           window.location.reload();
  //         });
  //       })
  //       .catch((error) => {
  //         MySwal.fire({
  //           title: error.status,
  //           type: "error",
  //           text: error.message,
  //         });
  //       });
  //   };

  // Method to filter departments
  //   const handleShow = (filteredData, value) => {
  //     console.log(filteredData);
  //     console.log(value);
  //     let valuexxx = 0;
  //     // let descripx = "";
  //     let createdTime = 0;
  //     let deleteFlag = 0;
  //     // Avoid filter for empty string
  //     if (!value) {
  //       valuexxx = 0;
  //       //   descripx = "";
  //       createdTime = 0;
  //       deleteFlag = 0;
  //     } else {
  //       valuexxx = filteredData.value;
  //       //   descripx = filteredItems[0].descrip;
  //       createdTime = filteredData.createdTime;
  //       deleteFlag = filteredData.deleteFlag;
  //     }

  //     MySwal.fire({
  //       title: "Update Amount (%)",
  //       html: `<input type="number"  step= "0.01" id="name" value="${valuexxx}" class="swal2-input" placeholder="Amount">\
  //            `,
  //       confirmButtonText: "Save",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       preConfirm: () => {
  //         const valuexx = Swal.getPopup().querySelector("#name").value;
  //         // const descrip = Swal.getPopup().querySelector("#descrip").value;
  //         const id = value;
  //         const Number = /^[0-9.]+$/;

  //         if (valuexx.length > 0 && !valuexx.match(Number)) {
  //           Swal.showValidationMessage(`Please enter an amount <br> Amount can't be negative`);
  //         } else {
  //           // eslint-disable-next-line no-lonely-if
  //           if (valuexx === "0") {
  //             Swal.showValidationMessage(`Please enter an amount greater than zero(0)`);
  //           } else {
  //             handleUpdate(id, valuexx, createdTime, deleteFlag);
  //           }
  //         }
  //       },
  //     });
  //   };
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
        fetch(`${process.env.REACT_APP_HALIFAX_URL}/project/delete/${id}`, requestOptions)
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
    handleOnNameKeys(namex);
    handleOnWorkflowIDx();
    handleTimex(foreCastedEndTimexx);
    handleTime(startTimexx);
    console.log(checkedName);
    console.log(checkedWorkflow);
    if (checkedName && checkedWorkflow && checkedStartTime && checkedForecastedEndTime === true) {
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
  const changeStatus = (status) => {
    if (status === 0) {
      return " ";
    }
    if (status === 1) {
      return "PAID";
    }
    if (status === 2) {
      return "DECLINED";
    }
  };

  // Table for Data

  const pColumns = [
    {
      Header: "Name ",
      accessor: "name",
      align: "left",
    },
    {
      Header: "Description ",
      accessor: "descrip",
      align: "left",
    },
    {
      Header: "Start Time",
      accessor: "startTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "Forecasted End Time",
      accessor: "forecastedEndTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ cell: { value } }) => changeStatus(value),
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
              <Dropdown.Item onClick={() => navigate(`/project/update-Project?id=${value}`)}>
                Update
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate(`/project/view-Project?id=${value}`)}>
                View
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
              Create Project
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
            mb={3}
            textAlign="center"
          >
            <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="workflow">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="startTime">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="FETime">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <TextField
                      id="outlined-textarea"
                      rows={2}
                      value={namex || ""}
                      onKeyUp={handleOnNameKeys}
                      label="Title *"
                      placeholder="Project Title"
                      onChange={(e) => setNamex(e.target.value)}
                      sx={{
                        width: 550,
                      }}
                      multiline
                    />
                  </div>
                  &nbsp; &nbsp;
                  <div className="col-sm-12">
                    <TextField
                      id="outlined-textarea"
                      rows={2}
                      value={descriptionx}
                      label="Description"
                      placeholder="Project Description"
                      onChange={(e) => setDescription(e.target.value)}
                      sx={{
                        width: 550,
                      }}
                      multiline
                    />
                    &nbsp; &nbsp;
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
                          label="Forecasted End Time *"
                          type="datetime-local"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={foreCastedEndTimexx}
                          onChange={(e) => setForeCastedEndTime(e.target.value)}
                          onInput={(e) => handleTimex(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-1">
                    <></>
                  </div>
                  <div className="col-sm-10">
                    &nbsp; &nbsp;
                    <p>Select Workflow *</p>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => setWorkflowIDx(e.target.value)}
                      onInput={(e) => handleOnWorkflowIDx(e.target.value)}
                    >
                      <option>--Select Workflow--</option>
                      {workflow.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <div className="col-sm-1">
                    <></>
                  </div>
                  {/* <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={descripx || ""}
                      onChange={(e) => setDescrip(e.target.value)}
                      label="Description"
                      variant="standard"
                      fullWidth
                    />
                  </div> */}
                </div>
              </Container>
            </MDBox>
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

export default Project;
