/*
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Container } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.gif";
// import plutospaceImg from "assets/images/PlutoSpaceImg.png";
import Plutospace from "assets/images/Plutospace.png";
import Styles from "styles";

function Basic() {
  const navigate = useNavigate();

  const [usernamex, setUsername] = useState("");
  const [passwordx, setPassword] = useState("");
  const [opened, setOpened] = useState(false);

  const MySwal = withReactContent(Swal);

  const [passwordShown, setPasswordShown] = useState(false);

  // const Styles = {
  //   buttonSx: {
  //     bacgroundColor: "#f96d02",
  //     color: "#fff",
  //   },
  //   boxSx: {
  //     backgroundColor: "#f96d02",
  //     color: "#fff",
  //     width: 5000,
  //   },
  // };
  // console.log(Styles);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      localStorage.removeItem("rexxdex");
      localStorage.removeItem("user1");
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = () => {
    setOpened(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({ username: usernamex, password: passwordx });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_ZAVE_URL}/login/dologin`, requestOptions)
      .then(async (res) => {
        // console.log(res.headers);;;;
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex1", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        if (result.status === "SUCCESS") {
          localStorage.setItem("user1", JSON.stringify(result.data));
          localStorage.setItem("userOtherDets", JSON.stringify(result.otherDetailsDTO));
          localStorage.setItem("BirthDayStatus", JSON.stringify(result.wishBirthday));

          if (result.otherDetailsDTO.autopass === 1) {
            navigate("/authentication/userlogin", { replace: true });
          } else {
            navigate("/dashboard", { replace: true });
            window.location.reload();
          }
        } else {
          MySwal.fire({
            title: result.status,
            type: "error",
            text: result.message,
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

  return (
    <div>
      <BasicLayout image={bgImage}>
        <Card>
          <MDBox
            component="img"
            mt={2}
            mb={2}
            style={{ alignSelf: "center" }}
            src={Plutospace}
            alt="PlutoSpace"
            width="15rem"
          />
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={0}
            p={2}
            mb={1}
            textAlign="center"
            style={Styles.boxSx}
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Sign In
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <Container>
                  <div className="row">
                    <div className="col-sm-12">
                      <MDInput
                        type="email"
                        value={usernamex || ""}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Email"
                        fullWidth
                      />
                    </div>
                  </div>
                </Container>
              </MDBox>
              <MDBox mb={2}>
                <Container>
                  <div className="row">
                    <div className="col-sm-12">
                      <MDInput
                        type={passwordShown ? "text" : "password"}
                        value={passwordx || ""}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(ev) => ev.key === "Enter" && handleClick()}
                        label="Password"
                        fullWidth
                      />
                    </div>
                    <MDTypography
                      variant="button"
                      fontSize="60%"
                      align="right"
                      onClick={togglePassword}
                      mx={0}
                      // color="info"
                      style={Styles.textSx}
                    >
                      show password
                    </MDTypography>
                  </div>
                </Container>
              </MDBox>
              <MDButton variant="gradient" onClick={handleClick} style={Styles.buttonSx} fullWidth>
                sign In
              </MDButton>
              <MDBox mt={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Don&apos;t have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-up"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    // textGradient
                    style={Styles.textSx}
                  >
                    Sign Up
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <MDBox mb={1} mt={-1} textAlign="center">
                <MDTypography
                  component={Link}
                  to="/authentication/forgot-password"
                  variant="button"
                  // color="info"
                  style={Styles.textSx}
                  fontWeight="medium"
                >
                  Forgot Password
                </MDTypography>
                &nbsp;&nbsp;
                <MDTypography
                  component={Link}
                  to="/authentication/renew-Login"
                  variant="button"
                  // color="info"
                  style={Styles.textSx}
                  fontWeight="medium"
                >
                  Renew Subscription
                </MDTypography>
              </MDBox>
              {/* <MDBox mb={1} mt={-1} textAlign="center">
                
              </MDBox> */}
            </MDBox>
          </MDBox>
        </Card>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
          <CircularProgress color="info" />
        </Backdrop>
      </BasicLayout>
    </div>
  );
}

export default Basic;
