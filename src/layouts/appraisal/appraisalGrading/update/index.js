import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Swal from "sweetalert2";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import withReactContent from "sweetalert2-react-content";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function AppraisalUpdate() {
  const MySwal = withReactContent(Swal);

  const { allGHeaders: miHeaders } = GHeaders();
  const { allPHeaders: myHeaders } = PHeaders();

  const navigate = useNavigate();

  const [idx, setIdx] = useState("");
  const [valuex, setValuex] = useState("");
  const [gradex, setGradex] = useState("");
  const [colorCodex, setColorCodex] = useState("");
  const [minScorex, setMinScorex] = useState("");
  const [maxScorex, setMaxScorex] = useState("");
  const [createdTimex, setCreatedTimex] = useState("");
  const [deleteFlagx, setDeleteFlagx] = useState("");

  const [checkedValue, setCheckedValue] = useState("");
  const [checkedGrade, setCheckedGrade] = useState("");
  const [checkedMinScore, setCheckedMinScore] = useState("");
  const [checkedMaxScore, setCheckedMaxScore] = useState("");

  const [opened, setOpened] = useState(false);

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

  const handleOnMinScoreKeys = (valuexx) => {
    const value = valuexx.toString();
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

  const handleOnMaxScoreKeys = (valuexx) => {
    const value = valuexx.toString();
    console.log(value);
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

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const ids = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalGrading/getByIds/${ids}`, {
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
          setOpened(false);
          // eslint-disable-next-line eqeqeq
          if (result.length != 0) {
            setIdx(result[0].id);
            setValuex(result[0].value);
            setGradex(result[0].grade);
            setColorCodex(result[0].colorCode);
            setMinScorex(result[0].minScore);
            setMaxScorex(result[0].maxScore);
            setDeleteFlagx(result[0].deleteFlag);
            setCreatedTimex(result[0].createdTime);
            handleOnValueKeys(result[0].value);
            handleOnGradeKeys(result[0].grade);
            handleOnMinScoreKeys(result[0].minScore);
            handleOnMaxScoreKeys(result[0].maxScore);
          } else {
            setIdx(null);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdate = () => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    // const ids = data11.id;
    // const personalIds = data11.personalID;
    const orgIDs = data11.orgID;

    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      value: valuex,
      grade: gradex,
      colorCode: colorCodex,
      minScore: minScorex,
      maxScore: maxScorex,
      createdTime: createdTimex,
      deleteFlag: deleteFlagx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalGrading/update`, requestOptions)
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
        handleUpdate(e);
      }
    }
  };

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
              Update Appraisal Grade
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
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="gradient" fontSize="60%" color="white" id="name">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="email">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="phone">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="street">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="city">
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
                      onChange={(e) => setValuex(e.target.value)}
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
                      onChange={(e) => setGradex(e.target.value)}
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
                      onChange={(e) => setMinScorex(e.target.value)}
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
                      onChange={(e) => setMaxScorex(e.target.value)}
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
                      value={colorCodex || ""}
                      onChange={(e) => setColorCodex(e.target.value)}
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
              <MDButton variant="gradient" onClick={handleValidate} color="info" width="50%">
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default AppraisalUpdate;
