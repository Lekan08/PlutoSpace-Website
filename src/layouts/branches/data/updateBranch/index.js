import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Styles from "styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AllCountriesAndStates from "countries-states-master/countries";
// import AllCountryCode from "countries-states-master/country-code";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PHeaders from "postHeader";
import GHeaders from "getHeader";

import { useNavigate } from "react-router-dom";

function UpdateBranch() {
  const MySwal = withReactContent(Swal);

  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const navigate = useNavigate();

  const [idx, setId] = useState("");
  const [namex, setName] = useState("");
  const [emailx, setEmail] = useState("");
  const [streetx, setStreet] = useState("");
  const [cityx, setCity] = useState("");
  const [statex, setState] = useState("");
  const [countryx, setCountry] = useState("");
  const [pnox, setPno] = useState("");
  const [deleteFlagx, setDeleteFlag] = useState(0);
  const [createdTimex, setCreatedTime] = useState(0);
  const [allStates, setAllStates] = useState([]);

  const [checkedEmail, setCheckedEmail] = useState("");
  const [checkedStreet, setCheckedStreet] = useState("");
  const [checkedName, setCheckedName] = useState("");
  const [checkedCity, setCheckedCity] = useState("");
  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const handleOnChangeRCCountry = (e) => {
    const filteredItems = AlCountry.filter((item) => item.name === e.target.value);
    setAllStates(filteredItems[0].states);
    setCountry(e.target.value);
  };

  const handleOnChangeRCState = (e) => {
    setState(e.target.value);
  };

  const handleOnNameKeys = (value) => {
    const letters = /^[a-zA-Z0-9 ]+$/;
    if (!value.match(letters)) {
      setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
    }
    if (value.match(letters)) {
      setCheckedName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name is required<br>";
    }
  };

  const handleOnEmailKeys = (value) => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    if (!value.match(letters)) {
      setCheckedEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email - input a valid email<br>";
    }
    if (value.match(letters)) {
      setCheckedEmail(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email is required<br>";
    }
  };

  const handleOnStreetKeys = (value) => {
    // eslint-disable-next-line no-invalid-regexp
    const letters = /^[a-zA-Z0-9 .,-]+$/;
    if (!value.match(letters)) {
      setCheckedStreet(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Street - use only [ - . , ] as symbols<br>";
    }
    if (value.match(letters)) {
      setCheckedStreet(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Street is required<br>";
    }
  };

  const handleOnCityKeys = (value) => {
    const letters = /^[a-zA-Z ]+$/;
    if (!value.match(letters)) {
      setCheckedCity(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "City - input only capital and small letters<br>";
    }
    if (value.match(letters)) {
      setCheckedCity(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "City is required<br>";
    }
  };

  const handleGet = () => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const headers = miHeaders;

    fetch(`${process.env.REACT_APP_KUBU_URL}/branch/get/${id}`, { headers })
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
        console.log(result);
        setId(result[0].id);
        setName(result[0].name);
        setEmail(result[0].email);
        setPno(result[0].pno);
        //   setDayOfBirth(result[0].dayOfBirth);
        //   setMonthOfBirth(result[0].monthOfBirth);
        //   setYearOfBirth(result[0].yearOfBirth);
        const filteredItems = AlCountry.filter((item) => item.name === result[0].country);
        setAllStates(filteredItems[0].states);
        setStreet(result[0].street);
        setCity(result[0].city);
        setState(result[0].state);
        setCountry(result[0].country);
        setDeleteFlag(result[0].deleteFlag);
        setCreatedTime(result[0].createdTime);
        handleOnNameKeys(result[0].name);
        handleOnEmailKeys(result[0].email);
        handleOnStreetKeys(result[0].street);
        handleOnCityKeys(result[0].city);
      });
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      handleGet();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      name: namex,
      email: emailx,
      street: streetx,
      city: cityx,
      state: statex,
      country: countryx,
      pno: pnox,
      deleteFlag: deleteFlagx,
      createdTime: createdTimex,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_KUBU_URL}/branch/update`, requestOptions)
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
        setOpened(false);
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          navigate("/branches");
          // window.location.reload();
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
    if (checkedName && checkedStreet && checkedEmail && checkedCity === true) {
      handleClick(e);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox
            variant="gradient"
            style={{ backgroundColor: "#f96d02" }}
            borderRadius="lg"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Update Branch
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
                      label="Name*"
                      value={namex || ""}
                      onKeyUp={(e) => handleOnNameKeys(e.target.value)}
                      onChange={(e) => setName(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={emailx || ""}
                      onKeyUp={(e) => handleOnEmailKeys(e.target.value)}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email*"
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
                    <MDInput
                      type="text"
                      value={streetx || ""}
                      onKeyUp={(e) => handleOnStreetKeys(e.target.value)}
                      onChange={(e) => setStreet(e.target.value)}
                      label="Street*"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-4">
                    <MDInput
                      type="text"
                      value={cityx || ""}
                      onKeyUp={(e) => handleOnCityKeys(e.target.value)}
                      onChange={(e) => setCity(e.target.value)}
                      label="City*"
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
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      Country*
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        value={countryx || ""}
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
                  <div className="col-sm-6">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      State*
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        value={statex || ""}
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
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-8">
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Phone Number*
                    </MDTypography>
                    <PhoneInput
                      value={pnox}
                      countryCode={+234}
                      inputStyle={{ width: "100%" }}
                      buttonStyle={{}}
                      onChange={setPno}
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                style={Styles.buttonSx}
                variant="gradient"
                onClick={handleValidate}
                width="50%"
              >
                Save
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

export default UpdateBranch;
