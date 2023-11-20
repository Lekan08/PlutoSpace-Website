import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
// import DataTable from "examples/Tables/DataTable";
// import taxData from "layouts/tax/data/taxTableData";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Styles from "styles";
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
import GHeaders from "getHeader";
// import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function ProjectUpdate() {
  const { allGHeaders: miHeaders } = GHeaders();
  const MySwal = withReactContent(Swal);
  // const { columns: pColumns, rows: pRows } = taxData();

  const [descriptionx, setDescription] = useState("");
  const [namex, setNamex] = useState("");
  const [startTimexx, setStartTime] = useState("");
  const [foreCastedEndTimexx, setForeCastedEndTime] = useState("");
  const [idx, setID] = useState("");
  const [createdTimex, setCreatedTimex] = useState("");
  const [deleteFlagx, setDeleteflagx] = useState("");
  const [terminatedByx, setTerminatedByx] = useState("");
  const [terminatedTimex, setTerminatedTimex] = useState("");
  const [statusx, setStatusx] = useState("");
  const [actualEndTimex, setActualEndTimex] = useState("");
  const [endedByx, setEndedByx] = useState("");
  const [workflowIDx, setWorkflowIDx] = useState("");
  const [createdByx, setCreatedByx] = useState("");
  const [workflow, setWorkflow] = useState([]);

  const [checkedName, setCheckedName] = useState("");
  const [checkedWorkflow, setCheckedWorkflow] = useState(false);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();

  // eslint-disable-next-line consistent-return
  const handleOnNameKeys = (value) => {
    const letters = /^[a-zA-Z0-9 ]+$/;
    if (!value.match(letters)) {
      setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name - input only leters and numbers<br>";
    }
    if (value.match(letters)) {
      setCheckedName(true);
      console.log("chech");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name is required<br>";
    }
  };

  const handleOnWorkflowIDx = (valuex) => {
    setWorkflowIDx(valuex);
    console.log(valuex);
    console.log("working");
    if (valuex === "") {
      setCheckedWorkflow(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("workflow").innerHTML = "Select a Workflow <br>";
    }
    if (valuex !== "") {
      console.log("working2222222");
      setCheckedWorkflow(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("workflow").innerHTML = " ";
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
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      name: namex,
      descrip: descriptionx,
      workflowID: workflowIDx,
      createdBy: createdByx,
      createdTime: createdTimex,
      deleteFlag: deleteFlagx,
      terminatedBy: terminatedByx,
      terminatedTime: terminatedTimex,
      status: statusx,
      startTime: startTimex,
      forecastedEndTime: foreCastedEndTimex,
      actualEndTime: actualEndTimex,
      endedBy: endedByx,
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
      fetch(`${process.env.REACT_APP_HALIFAX_URL}/project/update`, requestOptions)
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
    let isMounted = true;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

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
          console.log(result);
          setNamex(result[0].name);
          setWorkflowIDx(result[0].workflowID);
          setDescription(result[0].descrip);
          setID(result[0].id);
          setCreatedTimex(result[0].createdTime);
          setDeleteflagx(result[0].deleteFlag);
          setTerminatedByx(result[0].terminatedBy);
          setTerminatedTimex(result[0].terminatedTime);
          setStatusx(result[0].status);
          setActualEndTimex(result[0].actualEndTime);
          setForeCastedEndTime(result[0].forecastedEndTime);
          setStartTime(result[0].startTime);
          setEndedByx(result[0].endedBy);
          setCreatedByx(result[0].createdBy);
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

  const handleValidate = (e) => {
    // handleOnNameKeys(namex);
    // handleOnWorkflowIDx(workflowIDx);
    console.log(checkedName);
    console.log(checkedWorkflow);
    if (checkedName && checkedWorkflow === true) {
      handleClick(e);
    }
  };

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

  useEffect(() => {
    handleOnNameKeys(namex);
    handleOnWorkflowIDx(workflowIDx);
  }, [namex, workflowIDx]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox
            variant="gradient"
            style={{ backgroundColor: "#f96d02" }}
            // bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Update Project
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
            marginBottom={2.5}
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
                  <div className="col-sm-3">
                    <TextField
                      id="datetime-local"
                      label="Start Time *"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={changeDateandTime(startTimexx)}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <></>
                  </div>
                  <div className="col-sm-3">
                    <TextField
                      id="datetime-local"
                      label="Forecasted End Time *"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={changeDateandTime(foreCastedEndTimexx)}
                      onChange={(e) => setForeCastedEndTime(e.target.value)}
                    />
                  </div>
                </div>{" "}
                &nbsp; &nbsp;
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      id="outlined-textarea"
                      rows={1}
                      value={namex || ""}
                      onKeyUp={(e) => handleOnNameKeys(e.target.value)}
                      label="Title *"
                      placeholder="Project Title"
                      onChange={(e) => setNamex(e.target.value)}
                      sx={{
                        width: 400,
                      }}
                      multiline
                    />
                  </div>
                  <div className="col-sm-6">
                    <Form.Select
                      value={workflowIDx}
                      aria-label="Default select example"
                      onInput={(e) => handleOnWorkflowIDx(e.target.value)}
                    >
                      <option value="">--Select Workflow *--</option>
                      {workflow.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  &nbsp; &nbsp;
                  <div className="col-sm-12">
                    <TextField
                      id="outlined-textarea"
                      rows={1}
                      value={descriptionx}
                      label="Description"
                      placeholder="Project Description"
                      onChange={(e) => setDescription(e.target.value)}
                      sx={{
                        width: 950,
                      }}
                      multiline
                    />
                    &nbsp; &nbsp;
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
                // color="info"
                style={Styles.buttonSx}
                width="50%"
                align="left"
              >
                Update
              </MDButton>
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

export default ProjectUpdate;
