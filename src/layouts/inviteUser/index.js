// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { Container, Form } from "react-bootstrap";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import AllCountriesAndStates from "countries-states-master/countries";
import PhoneInput from "react-phone-input-2";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import React, { useState, useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Styles from "styles";
// import PHeaders from "postHeader";
// import GHeaders from "getHeader";
// Zinoleesky is fire

function InviteUser() {
  const [phonex, setPhone] = useState("");
  // const [startDate, setStartDate] = useState(new Date());
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const [idx, setId] = useState(0);
  const [orgIDx, setOrgID] = useState("");
  // const [roleIDx, setRoleID] = useState(0);
  const [fnamex, setFname] = useState("");
  const [lnamex, setLname] = useState("");
  const [onamex, setOname] = useState("");
  const [emailx, setEmail] = useState("");
  const [emaily, setOemail] = useState("");
  const [nationalityx, setNationality] = useState("");
  const [residentialStreetx, setResidentialStreet] = useState("");
  const [residentialCityx, setResidentialCity] = useState("");
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  const [maritalStatusx, setMaritalStatus] = useState("");
  const [sexx, setSex] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [deleteFlagx, setDeleteFlag] = useState(0);
  const [sysStatusx, setSysStatus] = useState("");
  const [createdTimex, setCreatedTime] = useState("");
  const [allStates, setAllStates] = useState([]);
  const [passwordx, setPassword] = useState("");
  const [retypePasswordx, setRetypePassword] = useState("");
  //   const [enabled, setEnabled] = useState("");
  const [passEnabled, setPassEnabled] = useState(true);

  const [opened, setOpened] = useState(false);

  const [checkedPemail, setCheckedPEmail] = useState("");
  const [checkedPass, setCheckedPass] = useState("");
  const [checkedFirst, setCheckedFirst] = useState("");
  const [checkedLast, setCheckedLast] = useState("");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // const { allPHeaders: myHeaders } = PHeaders();
  // const { allGHeaders: miHeaders } = GHeaders();

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const { countriesAndStates: AlCountry } = AllCountriesAndStates();

  const getPersonalInformation = (e) => {
    setEmail(e.target.value);
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    const emailpersonal = e.target.value;
    if (emailpersonal.length === 0 || !emailpersonal.match(letters)) {
      // Email Invalid
    } else {
      const raw = JSON.stringify({
        username: emailpersonal,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/getByEmail`, requestOptions)
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
          if (Object.keys(result).length !== 0) {
            if (result.id !== 0) {
              setPassEnabled(false);
              setOname(result.oname);
              setId(result.id);
              setPhone(result.pno);
              setNationality(result.nationality);
              setResidentialStreet(result.residentialStreet);
              setResidentialCity(result.residentialCity);
              const filteredItems = AlCountry.filter(
                (item) => item.name === result.residentialCountry
              );
              setAllStates(filteredItems[0].states);
              setResidentialState(result.residentialState);
              setResidentialCountry(result.residentialCountry);
              setMaritalStatus(result.maritalStatus);
              setSex(result.sex);
              setDeleteFlag(result.deleteFlag);
              setSysStatus(result.sysStatus);
              setCreatedTime(result.createdTime);

              setStartDate(
                new Date(`${result.monthOfBirth}/${result.dayOfBirth}/${result.yearOfBirth}`)
              );
              setPassword("");
              setRetypePassword("");
            } else {
              setId(0);
            }
          } else {
            setId(0);
            setPassEnabled(true);
            setOname("");
            setPhone("");
            setNationality("");
            setResidentialStreet("");
            setResidentialCity("");
            setAllStates([]);
            setResidentialState("");
            setResidentialCountry("");
            setMaritalStatus("");
            setSex("");
            setDeleteFlag("");
            setSysStatus("");
            setCreatedTime("");
            setStartDate(new Date());
            setPassword("");
            setRetypePassword("");
          }
        })
        .catch((error) => {
          setId(0);
          console.log(error);
        });
    }
  };

  const handleOnChangeNationality = (e) => {
    setNationality(e.target.value);
  };

  const handleOnChangeRCCountry = (e) => {
    const filteredItems = AlCountry.filter((item) => item.name === e.target.value);
    setAllStates(filteredItems[0].states);
    setResidentialCountry(e.target.value);
  };

  const handleOnChangeRCState = (e) => {
    setResidentialState(e.target.value);
  };

  const handleOnFirstKeys = (value) => {
    const letters = /^[a-zA-Z ]+$/;
    if (!value.match(letters)) {
      setCheckedFirst(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML =
        "First Name - input only capital and small letters<br>";
    }
    if (value.match(letters)) {
      setCheckedFirst(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML = "First Name is required<br>";
    }
  };

  const handleOnLastKeys = (value) => {
    const letters = /^[a-zA-Z ]+$/;
    if (!value.match(letters)) {
      setCheckedLast(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML =
        "Last Name - input only capital and small letters<br>";
    }
    if (value.match(letters)) {
      setCheckedLast(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML = "Last Name is required<br>";
    }
  };

  const handleOnOtherKeys = (value) => {
    const letters = /^[a-zA-Z ]+$/;
    if (!value.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("other").innerHTML =
        "Other Name - input only capital and small letters<br>";
    }
    if (value.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("other").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("other").innerHTML = "Other Name is required<br>";
    }
  };

  const handleOnPEmailKeys = (value) => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    if (!value.match(letters)) {
      setCheckedPEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email - input a valid email<br>";
    }
    if (value.match(letters)) {
      setCheckedPEmail(true);
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
    const letters = /^[a-zA-Z0-9 ,-]+$/;
    if (!value.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Street - use only [ - , ] as symbols<br>";
    }
    if (value.match(letters)) {
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
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "City - input only capital and small letters<br>";
    }
    if (value.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "City is required<br>";
    }
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
        document.getElementById("password").innerHTML = "Passwords don't match<br>";
      } else {
        setCheckedPass(true);
        // eslint-disable-next-line no-unused-expressions
        document.getElementById("password").innerHTML = "";
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

  // Checking if the person is in the organisation via email.
  // If he/she is, will just pick the data and add them to the organisation

  const checkPersonal = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const emailpersonal = urlParams.get("email");
    const rolex = urlParams.get("role");
    const orgIDD = urlParams.get("orgID");
    if (emailpersonal.length !== 0) {
      const rawp = JSON.stringify({
        username: emailpersonal,
      });
      const requestOptionsp = {
        method: "POST",
        headers: myHeaders,
        body: rawp,
        redirect: "follow",
      };
      console.log(emailpersonal.length);
      fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/getByEmail`, requestOptionsp)
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
          if (Object.keys(result).length !== 0) {
            MySwal.fire({
              title: "Do you wish to join this Organisation?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#f96d02",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Join!",
            }).then((resulty) => {
              if (resulty.isConfirmed) {
                const raw = JSON.stringify({
                  orgID: orgIDD,
                  personalID: result.id,
                  email: emailpersonal,
                  roleID: rolex,
                });
                const requestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  body: raw,
                  redirect: "follow",
                };

                fetch(`${process.env.REACT_APP_ZAVE_URL}/personalcompany/add`, requestOptions)
                  .then((res) => res.json())
                  .then((resultx) => {
                    console.log(resultx);
                    MySwal.fire({
                      title: resultx.status,
                      type: "success",
                      text: resultx.message,
                    }).then(() => {
                      navigate("/authentication/sign-in", { replace: true });
                    });
                  });
              }
            });
          } else {
            // Do nothing
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    checkPersonal();
    /* if (idx === 0) {
      setPassEnabled(true);
    } */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const fnameu = urlParams.get("fname");
    const lnameu = urlParams.get("lname");
    const emailu = urlParams.get("email");
    const orgIDu = urlParams.get("orgID");
    // const roleIDu = urlParams.get("role");
    console.log(fnameu);
    console.log(lnameu);
    console.log(emailu);
    console.log(orgIDu);
    // console.log(roleIDu);
    let isMounted = true;
    if (isMounted) {
      setFname(fnameu);
      setLname(lnameu);
      setOemail(emailu);
      setOrgID(orgIDu);
      // setRoleID(roleIDu);

      handleOnFirstKeys(fnameu);
      handleOnLastKeys(lnameu);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e) => {
    setOpened(true);
    // const user = JSON.parse(localStorage.getItem("user"));
    let dayx = "";
    let monthx = "";
    let yearx = "";
    if (startDate != null) {
      dayx = startDate.getDate();
      monthx = startDate.getMonth() + 1;
      yearx = startDate.getFullYear();
    }
    e.preventDefault();
    const araw = JSON.stringify({
      fname: fnamex,
      lname: lnamex,
      oname: onamex,
      email: emailx,
      pno: phonex,
      nationality: nationalityx,
      residentialStreet: residentialStreetx,
      residentialCity: residentialCityx,
      residentialState: residentialStatex,
      residentialCountry: residentialCountryx,
      dayOfBirth: dayx,
      monthOfBirth: monthx,
      yearOfBirth: yearx,
      maritalStatus: maritalStatusx,
      sex: sexx,
    });
    console.log(araw);
    const uraw = JSON.stringify({
      id: idx,
      fname: fnamex,
      lname: lnamex,
      oname: onamex,
      email: emailx,
      pno: phonex,
      nationality: nationalityx,
      residentialStreet: residentialStreetx,
      residentialCity: residentialCityx,
      residentialState: residentialStatex,
      residentialCountry: residentialCountryx,
      dayOfBirth: dayx,
      monthOfBirth: monthx,
      yearOfBirth: yearx,
      maritalStatus: maritalStatusx,
      sex: sexx,
      deleteFlag: deleteFlagx,
      sysStatus: sysStatusx,
      createdTime: createdTimex,
    });

    let raw = araw;

    localStorage.setItem("email1", emailx);

    let endpoint = "add";
    if (idx !== 0) {
      endpoint = "update";
      raw = uraw;
    }
    if (endpoint === "update") {
      setPassword("");
    }
    const endpointPC = "add";

    let endpointL = "add";
    if (endpoint === "update") {
      endpointL = `updateOrganization/${emailx}/${orgIDx}`;
    }
    let methodLUO = "POST";
    if (endpointL !== "add") {
      methodLUO = "GET";
    }
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(endpoint);
    fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/${endpoint}`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("personalInfo", JSON.stringify(result.data));
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const orgIDs = urlParams.get("orgID");
        const roleIDs = urlParams.get("role");
        const raw1 = JSON.stringify({
          orgID: orgIDs,
          personalID: result.data.id,
          email: emaily,
          roleID: roleIDs,
        });
        const requestOptions1 = {
          method: "POST",
          headers: myHeaders,
          body: raw1,
          redirect: "follow",
        };
        console.log(result);
        if (result.status === "SUCCESS") {
          console.log("lorem");
          fetch(`${process.env.REACT_APP_ZAVE_URL}/personalcompany/${endpointPC}`, requestOptions1)
            .then((res) => res.json())
            .then((resultx) => {
              console.log(`STATUS - ${resultx.status} - - - - - - MESSAGE - ${resultx.message}`);
              localStorage.setItem("company", JSON.stringify(resultx.data));
              // const queryString = window.location.search;
              // const urlParams = new URLSearchParams(queryString);

              const orgIDu = urlParams.get("orgID");
              const raw2 = JSON.stringify({
                orgID: orgIDu,
                empID: result.data.id,
                username: emailx,
                password: passwordx,
              });

              let requestOptions2 = {
                method: methodLUO,
                headers: myHeaders,
                body: raw2,
                redirect: "follow",
              };
              if (methodLUO === "GET") {
                requestOptions2 = {
                  method: methodLUO,
                  headers: myHeaders,
                };
                console.log("GET");
              }
              console.log(resultx);
              if (resultx.status === "SUCCESS") {
                console.log("ipsum");
                fetch(`${process.env.REACT_APP_ZAVE_URL}/login/${endpointL}`, requestOptions2)
                  .then((res) => res.json())
                  .then((resultLog) => {
                    console.log(
                      `STATUS - ${resultLog.status} - - - - - - MESSAGE - ${resultLog.message}`
                    );
                    setOpened(false);
                    MySwal.fire({
                      title: resultx.status,
                      type: "success",
                      text: resultx.message,
                    }).then(() => {
                      navigate("/authentication/sign-in", { replace: true });
                    });
                  });
              }
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

  const handleValidate = (e) => {
    handleOnFirstKeys(fnamex);
    handleOnLastKeys(lnamex);
    handleOnPEmailKeys(emailx);
    handleOnPasswordKeys(passwordx);
    handleOnRTPasswordKeys(retypePasswordx);
    if (checkedFirst && checkedLast && checkedPemail && checkedPass === true) {
      handleClick(e);
    }
  };

  /* return <Select options={options} value={value} onChange={changeHandler} />
} */

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          // bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
          style={Styles.boxSx}
        >
          <MDTypography variant="h2" fontWeight="medium" color="white" mt={1}>
            PlutoSpace
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Create an Account
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox
              variant="gradient"
              // bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={0}
              mt={0}
              p={3}
              mb={1}
              textAlign="center"
              style={Styles.boxSx}
            >
              <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                BASIC INFO
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
              <MDTypography variant="gradient" fontSize="60%" color="error" id="first">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="error" id="last">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="error" id="other">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="error" id="email">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="error" id="phone">
                {" "}
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="First Name"
                      value={fnamex || ""}
                      onKeyUp={(e) => handleOnFirstKeys(e.target.value)}
                      onChange={(e) => setFname(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="Last Name"
                      value={lnamex || ""}
                      onKeyUp={(e) => handleOnLastKeys(e.target.value)}
                      onChange={(e) => setLname(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Other Name"
                value={onamex || ""}
                onKeyUp={(e) => handleOnOtherKeys(e.target.value)}
                onChange={(e) => setOname(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Personal Email"
                value={emailx || ""}
                onKeyUp={(e) => handleOnPEmailKeys(e.target.value)}
                onChange={getPersonalInformation}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Official Email"
                value={emaily || ""}
                disabled
                onChange={(e) => setOemail(e.target.value)}
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
                      value={phonex}
                      inputStyle={{ width: "150%" }}
                      buttonStyle={{}}
                      onChange={setPhone}
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <Container>
              <div className="row">
                <div className="col-sm-8">
                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Marital Status
                    </MDTypography>
                    <Form.Select
                      onChange={(e) => setMaritalStatus(e.target.value)}
                      value={maritalStatusx || ""}
                      aria-label="Default select example"
                    >
                      <option>---Marital Status---</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                    </Form.Select>
                  </MDBox>
                </div>
              </div>
            </Container>
            <Container>
              <div className="row">
                <div className="col-sm-8">
                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Sex
                    </MDTypography>
                    <Form.Select
                      onChange={(e) => setSex(e.target.value)}
                      value={sexx || ""}
                      aria-label="Default select example"
                    >
                      <option>--- Select Sex---</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </Form.Select>
                  </MDBox>
                </div>
              </div>
            </Container>
            <MDTypography variant="button" fontWeight="regular" color="text" mt={1}>
              Date Of Birth
            </MDTypography>
            <MDBox mb={4} mt={-1}>
              <div>
                <style>
                  {`.date-picker input {
                      width: 50%
                 }`}
                </style>
                <DatePicker
                  date={startDate}
                  wrapperClassName="date-picker"
                  placeholder="Select Birth Date"
                  dateFormat="dd/MM/yyyy"
                  confirmBtnText="Confirm"
                  showCancelButton="true"
                  customStyles={{
                    placeholderText: {
                      fontSize: 5,
                    },
                    dateIcon: {
                      height: 0,
                      width: 0,
                    },
                    dateText: {
                      color: "#b3b4b5",
                      fontSize: 16,
                    },
                    dateInput: {
                      borderWidth: 0,
                    },
                  }}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-10">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={3}>
                      Nationality
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        value={nationalityx || ""}
                        aria-label="Default select example"
                        onChange={handleOnChangeNationality}
                      >
                        <option>--Select Nationality--</option>
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
            </MDBox>
            <MDBox
              variant="gradient"
              // bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={0}
              mt={0}
              p={3}
              mb={1}
              textAlign="center"
              style={Styles.boxSx}
            >
              <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                ADDRESS
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
                      value={residentialStreetx || ""}
                      onKeyUp={(e) => handleOnStreetKeys(e.target.value)}
                      onChange={(e) => setResidentialStreet(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-4">
                    <MDInput
                      type="text"
                      label="City"
                      value={residentialCityx || ""}
                      onKeyUp={(e) => handleOnCityKeys(e.target.value)}
                      onChange={(e) => setResidentialCity(e.target.value)}
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
                  <div className="row">
                    <div className="col-sm-10">
                      <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                        Country
                      </MDTypography>
                      <MDBox textAlign="right">
                        <Form.Select
                          value={residentialCountryx || ""}
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

                  <div className="col-sm-8">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      State
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        value={residentialStatex || ""}
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
            <MDBox
              variant="gradient"
              // bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={0}
              mt={0}
              p={3}
              mb={1}
              textAlign="center"
              style={Styles.boxSx}
            >
              <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                PASSWORD
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
                      disabled={passEnabled}
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </div>
              </div>
            </Container>
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
                      disabled={passEnabled}
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
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
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
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleValidate} /* color="info" */
                style={Styles.buttonSx}
                fullWidth
              >
                Create Account
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
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

export default InviteUser;
