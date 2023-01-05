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

function RecruitmentUpdate() {
  const MySwal = withReactContent(Swal);

  const { allGHeaders: miHeaders } = GHeaders();
  const { allPHeaders: myHeaders } = PHeaders();

  const navigate = useNavigate();

  const [opened, setOpened] = useState(false);

  const [idx, setIdx] = useState("");
  const [valuex, setValuex] = useState("");
  const [gradex, setGradex] = useState("");
  const [colorCodex, setColorCodex] = useState("");
  const [minScorex, setMinScorex] = useState("");
  const [maxScorex, setMaxScorex] = useState("");
  const [createdTimex, setCreatedTimex] = useState("");
  const [deleteFlagx, setDeleteFlagx] = useState("");

  const handleOnValueKeys = () => {
    const letters = /^[A-Z]+$/;
    if (!valuex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Score Value - input only capital letters<br>";
    }
    if (valuex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (valuex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Score Value is required<br>";
    }
  };

  const handleOnGradeKeys = () => {
    const letters = /^[A-Z]+$/;
    if (!gradex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Grade - input only capital letters <br>";
    }
    if (gradex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (gradex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Grade is required<br>";
    }
  };

  const handleOnMinScoreKeys = () => {
    // eslint-disable-next-line no-invalid-regexp
    const Numbers = /^[0-9]+$/;
    const numbxx = minScorex.toString();

    if (!numbxx.match(Numbers)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Minimum Score - input only numbers<br>";
    }
    if (numbxx.match(Numbers)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "";
    }
    if (numbxx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Minimum Score is required<br>";
    }
  };

  const handleOnMaxScoreKeys = () => {
    const Numbers = /^[0-9]+$/;
    const numbxx = maxScorex.toString();
    if (!numbxx.match(Numbers)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "Maximum Score - input only numbers<br>";
    }
    if (numbxx.match(Numbers)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "";
    }
    if (numbxx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "Maximum Score is required<br>";
    }
  };

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const ids = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/recruitmentGrading/getByIds/${ids}`, {
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
          } else {
            setIdx(null);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdate = (e) => {
    setOpened(true);
    e.preventDefault();
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

    fetch(`${process.env.REACT_APP_RAGA_URL}/recruitmentGrading/update`, requestOptions)
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
    const Numbers = /^[0-9]+$/;
    const letters = /^[A-Z ]+$/;
    const numbxx = minScorex.toString();
    const numbxxx = maxScorex.toString();

    if (
      valuex.match(letters) &&
      gradex.match(letters) &&
      numbxx.match(Numbers) &&
      numbxxx.match(Numbers)
    ) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "";
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "";
      if (valuex.length > 0 && gradex.length > 0 && numbxx.length > 0 && numbxxx.length > 0) {
        handleUpdate(e);
      } else {
        MySwal.fire({
          title: "EMPTY_TEXT_FIELD",
          type: "error",
          text: "Please Fill All Fields",
        });
      }
    } else if (!valuex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Score Value - input only capital letters<br>";
    } else if (!gradex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Grade - input only capital letters <br>";
    } else if (!numbxx.match(Numbers)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Minimum Score - input only numbers<br>";
    } else if (!numbxxx.match(Numbers)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "Maximum Score - input only numbers<br>";
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
              Update Recruitment Grade
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
                      label="Score Value *"
                      value={valuex || ""}
                      onKeyUp={handleOnValueKeys}
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
                      onKeyUp={handleOnGradeKeys}
                      onChange={(e) => setGradex(e.target.value)}
                      label="Grade"
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
                      value={minScorex}
                      onKeyUp={handleOnMinScoreKeys}
                      onChange={(e) => setMinScorex(e.target.value)}
                      label="Minimum Score"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={maxScorex}
                      onKeyUp={handleOnMaxScoreKeys}
                      onChange={(e) => setMaxScorex(e.target.value)}
                      label="Maximum Score"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            &nbsp;
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
                    <Form.Select
                      aria-label="Default select example"
                      width="50%"
                      mx={34}
                      value={colorCodex}
                      onChange={(e) => setColorCodex(e.target.value)}
                    >
                      <option>Select Color *</option>
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
                onClick={(e) => handleValidate(e)}
                // disabled={!enabled}
                color="info"
                width="50%"
                align="center"
              >
                Update
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

export default RecruitmentUpdate;
