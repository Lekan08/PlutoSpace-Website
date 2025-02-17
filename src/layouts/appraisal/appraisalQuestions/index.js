import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Styles from "styles";
import AQuestionsData from "./data/AQuestionsTableData";
import AppCsv from "./csv";

function AppraisalQues() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = AQuestionsData();

  const navigate = useNavigate();

  const [questionx, setQuestion] = useState("");
  const [hintx, setHint] = useState("");
  const [inputTypex, setInputType] = useState("");

  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      question: questionx,
      hint: hintx,
      inputType: inputTypex,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalQuestion/add`, requestOptions)
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
        setOpened(false);
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

  const handleValidate = (e) => {
    if (questionx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Question is required<br>";
    } else {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (inputTypex === "") {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("questionType").innerHTML = "Question Type is required<br>";
    } else {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("questionType").innerHTML = "";
    }
    if (questionx.length !== 0 && inputTypex !== "") {
      handleClick(e);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="1">
          <Accordion.Header>Add Single Appraisal Question</Accordion.Header>
          <Accordion.Body>
            <Card>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox
                  variant="gradient"
                  // bgColor="info"
                  borderRadius="lg"
                  style={Styles.boxSx}
                  // coloredShadow="info"
                  mx={2}
                  mt={-3}
                  p={2}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                    Add Appraisal Question
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
                >
                  <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
                    {" "}
                  </MDTypography>
                  <MDTypography variant="gradient" fontSize="60%" color="error" id="questionType">
                    {" "}
                  </MDTypography>
                </MDBox>
                <MDBox component="form" role="form">
                  <MDBox mb={0}>
                    <Container>
                      <div className="row">
                        <div className="col-sm-12">
                          <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                            <Form.Label style={{ fontSize: 14 }}>Questions*</Form.Label>
                            <Form.Control
                              as="textarea"
                              value={questionx || ""}
                              onChange={(e) => setQuestion(e.target.value)}
                              rows={2}
                            />
                          </Form.Group>
                        </div>
                      </div>
                    </Container>
                  </MDBox>
                  <MDBox mb={2}>
                    <Container>
                      <div className="row">
                        <div className="col-sm-12">
                          <MDInput
                            type="text"
                            value={hintx || ""}
                            onChange={(e) => setHint(e.target.value)}
                            label="Hint"
                            variant="standard"
                            fullWidth
                          />
                          <MDTypography variant="h4" fontWeight="medium" fontSize="55%">
                            (Hint is not Compulsory)
                          </MDTypography>
                        </div>
                      </div>
                    </Container>
                  </MDBox>
                  <MDBox mb={2}>
                    <Container>
                      <div className="row">
                        <div className="col-sm-8">
                          <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                            Question Type*
                          </MDTypography>
                          <MDBox textAlign="right">
                            <Form.Select
                              onChange={(e) => setInputType(e.target.value)}
                              value={inputTypex || ""}
                              aria-label="Default select example"
                            >
                              <option value="">---Question Type---</option>
                              <option value="Text">Text</option>
                              <option value="Option">Option</option>
                            </Form.Select>
                          </MDBox>
                        </div>
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
                    >
                      Save
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>{" "}
          </Accordion.Body>
        </Accordion.Item>
        <AppCsv />
      </Accordion>
      <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: pRows }}
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

export default AppraisalQues;
