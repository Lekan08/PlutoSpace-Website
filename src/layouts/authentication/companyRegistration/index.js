/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Container, Form } from "react-bootstrap";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import React, { useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AllCountriesAndStates from "countries-states-master/countries";
import Styles from "styles";
import GHeaders from "getHeader";

function CompanyReg() {
  const { countriesAndStates: AlCountry } = AllCountriesAndStates();

  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const [namex, setName] = useState("");
  const [emailx, setEmail] = useState("");

  const [pnox, setPno] = useState("");
  const [descripx, setDescrip] = useState("");
  const [Streetx, setStreet] = useState("");
  const [Cityx, setCity] = useState("");
  const [Statex, setState] = useState("");
  const [Countryx, setCountry] = useState("");
  const [allStates, setAllStates] = useState([]);
  // const [configPrice, setConfigPrice] = useState("");

  const [checkedComEmail, setCheckedComEmail] = useState("");
  const [checkedComStreet, setCheckedComStreet] = useState("");
  const [checkedComName, setCheckedComName] = useState("");
  const [checkedComCity, setCheckedComCity] = useState("");

  const [opened, setOpened] = useState(false);

  const { allGHeaders: miHeaders } = GHeaders();

  const handleOnComNameKeys = (value) => {
    const letters = /^[a-zA-Z0-9 ]+$/;
    if (!value.match(letters)) {
      setCheckedComName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML =
        "Company Name - input only capital and small letters<br>";
    }
    if (value.match(letters)) {
      setCheckedComName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (value.length === 0) {
      setCheckedComName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Company Name is required<br>";
    }
  };

  const handleOnComEmailKeys = (value) => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    if (!value.match(letters)) {
      setCheckedComEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email - input a valid email<br>";
    }
    if (value.match(letters)) {
      setCheckedComEmail(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (value.length === 0) {
      setCheckedComEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email is required<br>";
    }
  };

  const handleOnStreetKeys = (value) => {
    // eslint-disable-next-line no-invalid-regexp
    const letters = /^[a-zA-Z0-9 .,-]+$/;
    if (!value.match(letters)) {
      setCheckedComStreet(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Street - use only [ - . , ] as symbols<br>";
    }
    if (value.match(letters)) {
      setCheckedComStreet(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "";
    }
    if (value.length === 0) {
      setCheckedComStreet(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Street is required<br>";
    }
  };

  const handleOnCityKeys = (value) => {
    const letters = /^[a-zA-Z ]+$/;
    if (!value.match(letters)) {
      setCheckedComCity(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "City - input only capital and small letters<br>";
    }
    if (value.match(letters)) {
      setCheckedComCity(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "";
    }
    if (value.length === 0) {
      setCheckedComCity(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "City is required<br>";
    }
  };

  const handleClick = (e) => {
    setOpened(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const user = JSON.parse(localStorage.getItem("user"));
    e.preventDefault();
    const raw = JSON.stringify({
      name: namex,
      email: emailx,
      pno: pnox,
      descrip: descripx,
      street: Streetx,
      city: Cityx,
      state: Statex,
      country: Countryx,
      createdBy: user.id,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_KUBU_URL}/company/add`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.status === "SUCCESS") {
          console.log("success");
          const raw1 = JSON.stringify({
            orgID: result.data.id,
            personalID: user.id,
            email: localStorage.getItem("email1"),
          });
          const requestOptions1 = {
            method: "POST",
            headers: myHeaders,
            body: raw1,
            redirect: "follow",
          };
          fetch(`${process.env.REACT_APP_ZAVE_URL}/personalcompany/add`, requestOptions1)
            .then((res) => res.json())
            .then((resultx) => {
              if (resultx.status !== "SUCCESS") {
                fetch(`${process.env.REACT_APP_KUBU_URL}/company/delete/${result.data.id}`, {
                  method: "DELETE",
                  headers: miHeaders,
                })
                  .then((res) => res.json())
                  .then((delResult) => {
                    console.log(
                      `STATUS - ${delResult.status} - - - - - - MESSAGE - ${delResult.message}`
                    );
                  })
                  .then(() => {
                    setOpened(false);
                    MySwal.fire({
                      title: "ERROR IN CREATING COMPANY ACCOUNT",
                      type: "error",
                      text: "Please create the acount again",
                    });
                  });
              } else {
                console.log(`STATUS - ${resultx.status} - - - - - - MESSAGE - ${resultx.message}`);
                localStorage.setItem("company", JSON.stringify(resultx.data));
                localStorage.setItem("newResult", JSON.stringify(result));
                navigate(`/Complete-Sign-up?OrgID=${result.data.id}`, { replace: true });
                // const raw2 = JSON.stringify({
                //   orgID: result.data.id,
                //   empID: user.id,
                //   username: user.email,
                //   password: localStorage.getItem("pass1"),
                // });
                // const requestOptions2 = {
                //   method: "POST",
                //   headers: myHeaders,
                //   body: raw2,
                //   redirect: "follow",
                // };
                // fetch(`${process.env.REACT_APP_ZAVE_URL}/login/add`, requestOptions2)
                //   .then((res) => res.json())
                //   .then((resultLog) => {
                //     console.log(
                //       `STATUS - ${resultLog.status} - - - - - - MESSAGE - ${resultLog.message}`
                //     );
                //     const raw4 = JSON.stringify({
                //       orgID: result.data.id,
                //       paidAmount: configPrice,
                //       bonusAmount: 0,
                //       totalAmount: configPrice,
                //     });
                //     const requestOptions4 = {
                //       method: "POST",
                //       headers: myHeaders,
                //       body: raw4,
                //       redirect: "follow",
                //     };
                //     fetch(
                //       `${process.env.REACT_APP_EKOATLANTIC_URL}/paymentHistory/add`,
                //       requestOptions4
                //     )
                //       .then((res) => res.json())
                //       .then((resultPH) => {
                //         console.log(
                //           `STATUS - ${resultPH.status} - - - - - - MESSAGE - ${resultPH.message}`
                //         );
                //         setOpened(false);
                //         MySwal.fire({
                //           title: result.status,
                //           type: "success",
                //           text: result.message,
                //         }).then(() => {
                //           navigate(`/Create-Branch?orgID=${result.data.id}`, { replace: true });
                //         });
                //       });
                //   });
              }
            })
            .catch((error) => {
              console.log("catchh");
              setOpened(false);
              MySwal.fire({
                title: error.status,
                type: "error",
                text: error.message,
              });
            });
        } else {
          console.log("failled");
          setOpened(false);
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          });
        }
      })
      .catch((error) => {
        console.log("failled4");
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  const handleValidate = (e) => {
    handleOnComNameKeys(namex);
    handleOnComEmailKeys(emailx);
    handleOnStreetKeys(Streetx);
    handleOnCityKeys(Cityx);
    if (checkedComName && checkedComEmail && checkedComStreet && checkedComCity === true) {
      handleClick(e);
    }
  };

  const handleOnChangeRCCountry = (e) => {
    const filteredItems = AlCountry.filter((item) => item.name === e.target.value);
    setAllStates(filteredItems[0].states);
    setCountry(e.target.value);
  };

  const handleOnChangeRCState = (e) => {
    setState(e.target.value);
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          // bgColor="info"
          style={Styles.boxSx}
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h2" fontWeight="medium" color="white" mt={1}>
            PlutoSpace
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Register Company
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox
              variant="gradient"
              // bgColor="info"
              style={Styles.boxSx}
              borderRadius="lg"
              coloredShadow="success"
              mx={0}
              mt={0}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                COMPANY INFO
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
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Company Name"
                value={namex || ""}
                onKeyUp={(e) => handleOnComNameKeys(e.target.value)}
                onChange={(e) => setName(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Company Email"
                value={emailx || ""}
                onKeyUp={(e) => handleOnComEmailKeys(e.target.value)}
                onChange={(e) => setEmail(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-8">
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Phone Number
                    </MDTypography>
                    <PhoneInput
                      value={pnox}
                      inputStyle={{ width: "150%" }}
                      buttonStyle={{}}
                      onChange={setPno}
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Description"
                value={descripx || ""}
                onChange={(e) => setDescrip(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox
              variant="gradient"
              // bgColor="info"
              style={Styles.boxSx}
              borderRadius="lg"
              coloredShadow="success"
              mx={0}
              mt={0}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                COMPANY ADDRESS
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
              <MDTypography variant="gradient" fontSize="60%" color="error" id="street">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="error" id="city">
                {" "}
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-8">
                    <MDInput
                      type="text"
                      label="Street"
                      onKeyUp={(e) => handleOnStreetKeys(e.target.value)}
                      value={Streetx || ""}
                      onChange={(e) => setStreet(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-4">
                    <MDInput
                      type="text"
                      label="City"
                      value={Cityx || ""}
                      onKeyUp={(e) => handleOnCityKeys(e.target.value)}
                      onChange={(e) => setCity(e.target.value)}
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
                  <div className="col-sm-8">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      Country
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        value={Countryx || ""}
                        aria-label="Default select example"
                        onChange={handleOnChangeRCCountry}
                      >
                        <option>--Select Country--</option>
                        {AlCountry.map((apic) => (
                          <option key={apic.code3} value={apic.name}>
                            {apic.name}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </div>
                </div>
              </Container>
              <Container>
                <div className="row">
                  <div className="col-sm-8">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      State
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        value={Statex || ""}
                        aria-label="Default select example"
                        onChange={handleOnChangeRCState}
                      >
                        <option>--Select State--</option>
                        {allStates.map((apis) => (
                          <option key={apis.code} value={apis.name}>
                            {apis.name}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleValidate}
                // color="info"
                style={Styles.buttonSx}
                fullWidth
              >
                Register
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  // color="info"
                  style={Styles.textSx}
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </CoverLayout>
  );
}

export default CompanyReg;
