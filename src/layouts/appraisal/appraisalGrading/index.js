import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import AppraisalGradeData from "layouts/appraisal/appraisalGrading/data/appraisalGradingData";
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
import Styles from "styles";

function AppraisalGrade() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = AppraisalGradeData();

  const navigate = useNavigate();

  const [valuex, setValue] = useState("");
  const [gradex, setGrade] = useState("");
  const [minScorex, setMinScore] = useState("");
  const [maxScorex, setMaxScore] = useState("");
  const [colorCodex, setColorCode] = useState("");

  const [checkedValue, setCheckedValue] = useState("");
  const [checkedGrade, setCheckedGrade] = useState("");
  const [checkedMinScore, setCheckedMinScore] = useState("");
  const [checkedMaxScore, setCheckedMaxScore] = useState("");
  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();

  const handleOnValueKeys = (value) => {
    const letters = /^[A-Z ]+$/;
    if (!value.match(letters)) {
      setCheckedValue(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Score Value - input only capital letters<br>";
    }
    if (value.match(letters)) {
      setCheckedValue(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (value.length === 0) {
      setCheckedValue(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Score Value is required<br>";
    }
  };

  const handleOnGradeKeys = (value) => {
    const letters = /^[A-Z0-9]+$/;
    if (!value.match(letters)) {
      setCheckedGrade(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML =
        "Grade - input only capital letters and numbers<br>";
    }
    if (value.match(letters)) {
      setCheckedGrade(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (value.length === 0) {
      setCheckedGrade(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Grade is required<br>";
    }
  };

  const handleOnMinScoreKeys = (value) => {
    // eslint-disable-next-line no-invalid-regexp
    const letters = /^[0-9]+$/;
    if (!value.match(letters)) {
      setCheckedMinScore(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Minimum Score - input only numbers<br>";
    }
    if (value.match(letters)) {
      setCheckedMinScore(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "";
    }
    if (value.length === 0) {
      setCheckedMinScore(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Minimum Score is required<br>";
    }
  };

  const handleOnMaxScoreKeys = (value) => {
    const letters = /^[0-9]+$/;
    if (!value.match(letters)) {
      setCheckedMaxScore(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "Maximum Score - input only numbers<br>";
    }
    if (value.match(letters)) {
      setCheckedMaxScore(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "";
    }
    if (value.length === 0) {
      setCheckedMaxScore(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "Maximum Score is required<br>";
    }
  };

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      value: valuex,
      grade: gradex,
      colorCode: colorCodex,
      minScore: minScorex,
      maxScore: maxScorex,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalGrading/add`, requestOptions)
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
    handleOnValueKeys(valuex);
    handleOnGradeKeys(gradex);
    handleOnMinScoreKeys(minScorex);
    handleOnMaxScoreKeys(maxScorex);
    if (checkedValue && checkedGrade && checkedMinScore && checkedMaxScore === true) {
      if (colorCodex === "") {
        // eslint-disable-next-line no-unused-expressions
        document.getElementById("city").innerHTML = "Color is required<br>";
      } else {
        // eslint-disable-next-line no-unused-expressions
        document.getElementById("city").innerHTML = "";
        handleClick(e);
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
              Add Appraisal Grade
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="email">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="phone">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="street">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="city">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="Score Value*"
                      value={valuex || ""}
                      placeholder="e.g PASS, FAIL"
                      onKeyUp={(e) => handleOnValueKeys(e.target.value)}
                      onChange={(e) => setValue(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      placeholder="e.g A, B, C, D"
                      value={gradex || ""}
                      onKeyUp={(e) => handleOnGradeKeys(e.target.value)}
                      onChange={(e) => setGrade(e.target.value)}
                      label="Grade*"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={minScorex || ""}
                      onKeyUp={(e) => handleOnMinScoreKeys(e.target.value)}
                      onChange={(e) => setMinScore(e.target.value)}
                      label="Minimum Score*"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={maxScorex || ""}
                      onKeyUp={(e) => handleOnMaxScoreKeys(e.target.value)}
                      onChange={(e) => setMaxScore(e.target.value)}
                      label="Maximum Score*"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  {/* <div className="col-sm-6">
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Color:
                    </MDTypography>
                    <input
                      type="color"
                      className="form-control"
                      style={{ width: "70%" }}
                      onChange={(e) => setColorCode(e.target.value)}
                    />
                  </div> */}

                  <div className="col-sm-6">
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Color*
                    </MDTypography>
                    <Form.Select
                      aria-label="Default select example"
                      width="50%"
                      mx={34}
                      onChange={(e) => setColorCode(e.target.value)}
                    >
                      <option value="">---Select Color---</option>
                      <option value="danger">Red</option>
                      <option value="warning">Yellow</option>
                      <option value="info">Blue</option>
                      <option value="success">Green</option>
                    </Form.Select>
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
      </Card>
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

export default AppraisalGrade;
