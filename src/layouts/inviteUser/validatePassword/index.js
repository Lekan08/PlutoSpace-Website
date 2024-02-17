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
import { useNavigate } from "react-router-dom";

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
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
// import plutospaceImg from "assets/images/PlutoSpaceImg.png";
// import Plutospace from "assets/images/Plutospace.png";
import Styles from "styles";

function ValidatePassword() {
  const navigate = useNavigate();

  //   const [usernamex, setUsername] = useState("");
  //   const [passwordx, setPassword] = useState("");
  const [opened, setOpened] = useState(false);
  const [passwordx, setPassword] = useState("");
  const [retypePasswordx, setRetypePassword] = useState("");
  const [checkedPass, setCheckedPass] = useState("");
  //   const [configPrice, setConfigPrice] = useState("");

  const MySwal = withReactContent(Swal);

  const [passwordShown, setPasswordShown] = useState(false);
  const [show, setShow] = useState(false);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const getPersonalInformation = () => {
    // const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    // const emailpersonal = e.target.value;
    // if (emailpersonal.length === 0 || !emailpersonal.match(letters)) {
    //   // Email Invalid
    // } else {
    const usernamex = JSON.parse(localStorage.getItem("PEmail"));
    console.log(usernamex);
    const raw = JSON.stringify({
      username: usernamex,
      //   password: "string",
      //   npassword: "string",
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_ZAVE_URL}/login/getByEmail`, requestOptions)
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
        console.log(result);
        // if (Object.keys(result).length !== 0) {
        //   if (result.id !== 0) {
        //     console.log(result.id);
        //     setShow(true);
        //   } else {
        //     setShow(false);
        //   }
        // } else {
        //   setShow(false);
        // }
        if (result.message !== "Login Details Exist") {
          console.log(result);
          setShow(true);
        } else {
          setShow(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // }
  };

  useEffect(() => {
    getPersonalInformation();
  }, []);

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

  const handleOnPasswordKeys = (value) => {
    const passwordValidate = new RegExp("^(?=.*[a-z!@#$%^&*.,])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!value.match(passwordValidate)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML =
        "Password - Password must be at least 8 characters, must include a capital letter, small letter, a number and any of these symbol (!@#$%^&*.,)<br>";
      setCheckedPass(false);
    }
    if (value.match(passwordValidate)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML = "";
      setCheckedPass(true);
    }
    if (retypePasswordx.length !== 0) {
      if (retypePasswordx !== value) {
        setCheckedPass(false);
        // eslint-disable-next-line no-unused-expressions
        document.getElementById("rtPassword").innerHTML = "Passwords don't match<br>";
      } else {
        setCheckedPass(true);
        // eslint-disable-next-line no-unused-expressions
        document.getElementById("rtPassword").innerHTML = "";
      }
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("password").innerHTML = "Password is required<br>";
    }
  };

  const handleOnRTPasswordKeys = (value) => {
    if (value === passwordx) {
      setCheckedPass(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("rtPassword").innerHTML = "";
    } else {
      setCheckedPass(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("rtPassword").innerHTML = "Passwords don't match<br>";
    }
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

  const result = JSON.parse(localStorage.getItem("newResult"));
  const user = JSON.parse(localStorage.getItem("personalInfo"));
  console.log(user);
  console.log(result);

  const handleClick = () => {
    setOpened(true);
    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const orgIDu = urlParams.get("orgID");

    const raw2 = JSON.stringify({
      orgID: orgIDu,
      empID: user.id,
      username: user.email,
      password: passwordx,
    });
    const requestOptions2 = {
      method: "POST",
      headers: myHeaders,
      body: raw2,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_ZAVE_URL}/login/add`, requestOptions2)
      .then((res) => res.json())
      .then((resultLog) => {
        console.log(`STATUS - ${resultLog.status} - - - - - - MESSAGE - ${resultLog.message}`);
        setOpened(false);
        MySwal.fire({
          title: resultLog.status,
          type: "success",
          text: resultLog.message,
        }).then(() => {
          navigate("/authentication/sign-in", { replace: true });
        });
      });
  };

  const handleValidate = (e) => {
    // handleOnFirstKeys(fnamex);
    // handleOnLastKeys(lnamex);
    // handleOnOtherKeys(onamex);
    // handleOnPEmailKeys(emailx);
    // handleOnOEmailKeys(emaily);
    // handleOnStreetKeys(residentialStreetx);
    // handleOnCityKeys(residentialCityx);
    handleOnPasswordKeys(passwordx);
    handleOnRTPasswordKeys(retypePasswordx);
    if (checkedPass === true) {
      handleClick(e);
    }
  };

  const handleNextPage = () => {
    navigate(`/authentication/sign-in`, { replace: true });
  };

  return (
    <div>
      <BasicLayout image={bgImage}>
        <Card>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox
              variant="gradient"
              // bgColor="info"
              style={Styles.boxSx}
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Password
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
              <MDTypography variant="gradient" fontSize="60%" color="error" id="password">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="error" id="rtPassword">
                {" "}
              </MDTypography>
            </MDBox>
            {show ? (
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-12">
                        <MDBox mb={2}>
                          <MDInput
                            type={passwordShown ? "text" : "password"}
                            label="Password"
                            value={passwordx || ""}
                            onKeyUp={(e) => handleOnPasswordKeys(e.target.value)}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
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
                          label="Retype Password"
                          value={retypePasswordx || ""}
                          onKeyUp={(e) => handleOnRTPasswordKeys(e.target.value)}
                          onChange={(e) => setRetypePassword(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                      <MDTypography
                        variant="button"
                        fontSize="60%"
                        align="right"
                        onClick={togglePassword}
                        mx={0}
                        color="info"
                      >
                        show password
                      </MDTypography>
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
            ) : (
              <Card>
                <MDTypography variant="gradient" fontSize="100%">
                  Use your Personal Email and Password to Login
                </MDTypography>
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    onClick={handleNextPage}
                    // color="info"
                    style={Styles.buttonSx}
                    width="50%"
                  >
                    Next
                  </MDButton>
                </MDBox>
              </Card>
            )}
          </MDBox>
        </Card>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
          <CircularProgress color="info" />
        </Backdrop>
      </BasicLayout>
    </div>
  );
}

export default ValidatePassword;
