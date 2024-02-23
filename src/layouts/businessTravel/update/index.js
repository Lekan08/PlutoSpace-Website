import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AllCountriesAndStates from "countries-states-master/countries";
// import AllCountryCode from "countries-states-master/country-code";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// signature Zinoleesky //

import { useNavigate } from "react-router-dom";

function UpdateBusinessTravel() {
  const MySwal = withReactContent(Swal);

  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const navigate = useNavigate();

  const [purposex, setPurpose] = useState("");
  const [startDate, setStartDate] = useState("");
  const [noOfDaysRequestedx, setNoOfDaysRequested] = useState("");
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  const [addressx, setAddress] = useState("");
  const [allStates, setAllStates] = useState([]);
  const [cityx, setCity] = useState("");
  const [expectedExpensesx, setExpectedExpenses] = useState("");
  const [actualExpensesx, setActualExpenses] = useState("");
  const [actualDaysSpentx, setActualDaysSpent] = useState("");
  const [extraInformationx, setExtraInformation] = useState("");
  const [check, setUser] = useState([]);
  const [duty, setDuty] = useState("");
  const [idx, setId] = useState("");
  const [employee, setEmployee] = useState("");
  // const [check, setCheck] = useState([]);
  const [deleteFlagx, setDeleteFlag] = useState("");
  const [noOfDaysApprovedx, setnoOfDaysApproved] = useState("");
  const [statusx, setStatus] = useState("");
  const [approvalStatusx, setApprovalStatus] = useState("");
  const [approveTimex, setApproveTime] = useState("");
  const [createdTimex, setCreatedTime] = useState("");
  // const [enabled, setEnabled] = useState("");

  const [checkedName, setCheckedName] = useState("");
  const [checkedAddress, setCheckedAddress] = useState("");
  const [checkedCity, setCheckedCity] = useState("");
  // const [checkedExtra, setCheckedExtra] = useState("");
  const [checkedExpense, setCheckedExpense] = useState("");
  const [checkedAExpense, setCheckedAExpense] = useState("");
  const [checkedDaySpent, setCheckedDaySpent] = useState("");
  const [checkedDayRequest, setCheckedDayRequest] = useState("");

  //   const [checkedEmail, setCheckedEmail] = useState("");
  //   const [checkedStreet, setCheckedStreet] = useState("");
  //   const [checkedName, setCheckedName] = useState("");
  //   const [checkedCity, setCheckedCity] = useState("");
  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const handleOnChangeRCCountry = (e) => {
    const filteredItems = AlCountry.filter((item) => item.name === e.target.value);
    setAllStates(filteredItems[0].states);
    setResidentialCountry(e.target.value);
  };
  // const handleOnChangeRCState = (e) => {
  //   setResidentialState(e.target.value);
  // };

  const handleOnPurposeKeys = (value) => {
    console.log(value);
    const Number = /^[a-zA-Z ]+$/;
    if (!value.match(Number)) {
      setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("purpose").innerHTML =
        "Purpose - input only capital and small letters<br>";
    }
    if (value.match(Number)) {
      setCheckedName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("purpose").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("purpose").innerHTML = "Purpose is required<br>";
    }
    // setEnabled(checkedName === true);
  };

  const handleOnAddressKeys = (value) => {
    const Number = /^[a-zA-Z ]+$/;
    if (!value.match(Number)) {
      setCheckedAddress(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("address").innerHTML =
        "Address - input only capital and small letters<br>";
    }
    if (value.match(Number)) {
      setCheckedAddress(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("address").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("address").innerHTML = "Address is required<br>";
    }
    // setEnabled(checkedAddress === true);
  };

  // const handleOnAddressKeys = (value) => {
  //   const letters = /^[a-zA-Z ]+$/;
  //   if (!value.match(letters)) {
  //     setCheckedAddress(false);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("address").innerHTML =
  //       "Address - input only capital and small letters<br>";
  //   }
  //   if (value.match(letters)) {
  //     setCheckedAddress(true);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("address").innerHTML = "";
  //   }
  //   if (value.length === 0) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("address").innerHTML = "Address is required<br>";
  //   }
  //   setEnabled(checkedAddress === true);
  // };
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
    // setEnabled(checkedCity === true);
  };
  // const handleOnExtraKeys = (value) => {
  //   const letters = /^[a-zA-Z ]+$/;
  //   if (!value.match(letters)) {
  //     setCheckedExtra(false);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("xtrainfo").innerHTML =
  //       "ExtraInformation - input only capital and small letters<br>";
  //   }
  //   if (value.match(letters)) {
  //     setCheckedExtra(true);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("xtrainfo").innerHTML = "";
  //   }
  //   if (value.length === 0) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("xtrainfo").innerHTML = "ExtraInformation is required<br>";
  //   }
  //   setEnabled(checkedExtra === true);
  // };

  const handleOnExpensesKeys = (value) => {
    // const approverCompare = value.toString();
    console.log(value);
    // console.log(approverCompare);
    const number = /^[0-9 ]+$/;
    if (!value.toString().match(number)) {
      setCheckedExpense(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("xpense").innerHTML = "Expected Expenses - input only numbers<br>";
    }
    if (value.toString().match(number)) {
      setCheckedExpense(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("xpense").innerHTML = "";
    }
    if (value.toString().length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("xpense").innerHTML = "Expected Expenses is required<br>";
    }
    // setEnabled(checkedCity === true);
  };

  // const handleOnExpensesKeys = (value) => {
  //   console.log(value);
  //   const letters = /^[0-9 ]+$/;
  //   if (!value.match(letters)) {
  //     setCheckedExpense(false);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("xpense").innerHTML = "Expected Expenses - input only numbers<br>";
  //   }
  //   if (value.match(letters)) {
  //     setCheckedExpense(true);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("xpense").innerHTML = "";
  //   }
  //   if (value.length === 0) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("xpense").innerHTML = "Expected Expenses is required<br>";
  //   }
  //   // setEnabled(checkedExpense === true);
  // };
  const handleOnAExpensesKeys = (value) => {
    // const approverCompare = Number(value);
    const numbers = /^[0-9 ]+$/;
    if (!value.toString().match(numbers)) {
      setCheckedAExpense(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("Axpense").innerHTML = "Actual Expenses - input only numbers<br>";
    }
    if (value.toString().match(numbers)) {
      setCheckedAExpense(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("Axpense").innerHTML = "";
    }
    if (value.toString().length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("Axpense").innerHTML = "Actual Expenses is required<br>";
    }
    // setEnabled(checkedAExpense === true);
  };
  const handleOnActualDay = (value) => {
    const Number = /^[0-9 ]+$/;
    if (!value.toString().match(Number)) {
      setCheckedDaySpent(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("dayspent").innerHTML = "Days Spent - input only numbers<br>";
    }
    if (value.toString().match(Number)) {
      setCheckedDaySpent(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("dayspent").innerHTML = "";
    }
    if (value.toString().length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("dayspent").innerHTML = "Days Spent is required<br>";
    }
    // setEnabled(checkedDaySpent === true);
  };
  const handleOnRequestKeys = (value) => {
    const Number = /^[0-9 ]+$/;
    if (!value.toString().match(Number)) {
      setCheckedDayRequest(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("dayrequest").innerHTML = "Days Requested - input only numbers<br>";
    }
    if (value.toString().match(Number)) {
      setCheckedDayRequest(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("dayrequest").innerHTML = "";
    }
    if (value.toString().length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("dayrequest").innerHTML = "Days Reqested is required<br>";
    }
    // setEnabled(checkedDayRequest === true);
  };
  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
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
          setUser(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleGet = () => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const headers = miHeaders;

    fetch(`${process.env.REACT_APP_SHASHA_URL}/businessTravels/getByIds/${id}`, { headers })
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
        if (result.length !== 0) {
          setId(result[0].id);
          setPurpose(result[0].purpose);
          setStartDate(result[0].startTime);
          setExtraInformation(result[0].extraInformation);
          setDuty(result[0].approverID);
          setActualDaysSpent(result[0].actualDaysSpent);
          setActualExpenses(result[0].actualExpenses);
          setAddress(result[0].location.address);
          setResidentialState(result[0].location.state);
          setCity(result[0].location.city);
          setResidentialCountry(result[0].location.country);
          setNoOfDaysRequested(result[0].noOfDaysRequested);
          setExpectedExpenses(result[0].expectedExpenses);
          setEmployee(result[0].employees);
          setDeleteFlag(result[0].setdeleteFlag);
          setnoOfDaysApproved(result[0].noOfDaysApproved);
          setStatus(result[0].status);
          setApprovalStatus(result[0].approvalStatus);
          setApproveTime(result[0].approveTime);
          setCreatedTime(result[0].createdTime);
          // handleOnChangeRCCountry(result[0].location.country);

          handleOnPurposeKeys(result[0].purpose);
          handleOnAddressKeys(result[0].location.address);
          handleOnExpensesKeys(result[0].expectedExpenses);
          handleOnCityKeys(result[0].location.city);
          handleOnAExpensesKeys(result[0].actualExpenses);
          handleOnActualDay(result[0].actualDaysSpent);
          handleOnRequestKeys(result[0].noOfDaysRequested);
        }
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
    // handleOnPurposeKeys(e);
    // handleOnAddressKeys();
    // handleOnCityKeys();
    // handleOnExtraKeys();
    // handleOnAExpensesKeys();
    // handleOnExpensesKeys();
    // handleOnActualDay();
    // handleOnRequestKeys();
    // if (enabled) {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;
    const startCDate = new Date(startDate).getTime();
    console.log(employee);
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      createdBy: personalIDs,
      startTime: startCDate,
      noOfDaysRequested: noOfDaysRequestedx,
      noOfDaysApproved: noOfDaysApprovedx,
      employees: employee,
      location: {
        address: addressx,
        city: cityx,
        state: residentialStatex,
        country: residentialCountryx,
      },
      expectedExpenses: expectedExpensesx,
      actualExpenses: actualExpensesx,
      actualDaysSpent: actualDaysSpentx,
      purpose: purposex,
      extraInformation: extraInformationx,
      approverID: duty,
      deleteFlag: deleteFlagx,
      status: statusx,
      approvalStatus: approvalStatusx,
      approveTime: approveTimex,
      createdTime: createdTimex,

      // {
      //   "createdTime": 0,
      //   "noOfDaysRequested": 0,
      //   "noOfDaysApproved": 0,
      //   "location": {
      //     "address": "string",
      //     "city": "string",
      //     "state": "string",
      //     "country": "string"
      //   },
      //   "expectedExpenses": 0,
      //   "actualExpenses": 0,
      //   "actualDaysSpent": 0,
      //   "status": 0,
      //   "purpose": "string",
      //   "extraInformation": "string",
      //   "attachedDocs": [
      //     "string"
      //   ],
      //   "approverID": 0,
      //   "approveTime": 0,
      //   "approvalStatus": 0,
      //   "deleteFlag": 0
      // }
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_SHASHA_URL}/businessTravels/update`, requestOptions)
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
    // }
  };

  const handleValidate = (e) => {
    if (
      checkedName &&
      checkedCity &&
      checkedDaySpent &&
      // checkedExtra &&
      checkedAddress &&
      checkedExpense &&
      checkedDayRequest &&
      checkedAExpense === true
    ) {
      handleClick(e);
    }
  };

  // console.log(checkedName);
  // console.log(checkedAddress);
  // console.log(checkedAExpense);
  // console.log(checkedExtra);
  // console.log(checkedDayRequest);
  // console.log(checkedExpense);
  // console.log(checkedDaySpent);
  // console.log(checkedCity);

  // const handleValidate = (e) => {
  //   handleOnPurposeKeys(purposex);
  //   handleOnAddressKeys(addressx);
  //   handleOnCityKeys(cityx);
  //   handleOnExtraKeys(extraInformationx);
  //   handleOnExpensesKeys(expectedExpensesx);
  //   handleOnAExpensesKeys(actualExpensesx);
  //   handleOnActualDay(actualDaysSpentx);
  //   handleOnRequestKeys(noOfDaysRequestedx);
  //   if (
  //     checkedName &&
  //     checkedAddress &&
  //     checkedAExpense &&
  //     checkedExtra &&
  //     checkedDayRequest &&
  //     checkedDaySpent &&
  //     checkedCity &&
  //     checkedExpense === true
  //   ) {
  //     handleClick(e);
  //   }
  // };

  // const handleValidate = (e) => {
  //   handleOnTitleKeys(titlex);
  //   handleOnQuantityKeys(quantityx);
  //   handleOnBonusAmountKeys(bonusAmountx);
  //   if (checkedTitle && checkedQuantity && checkedBonusAmount === true) {
  //     handleUpdate(e);
  //   }
  // };
  // useEffect(() => {
  //   handleOnTitleKeys(titlex);
  //   handleOnQuantityKeys(quantityx);
  //   handleOnBonusAmountKeys(bonusAmountx);
  //   setTotalAmount(UtotalAmountx);
  //   setVatAmount(UvatAmountx);
  //   setPayingAmount(UpayAmountx);
  // }, [quantityx]);
  // useEffect(() => {
  //   handleOnExpensesKeys(expectedExpensesx);
  //   handleOnAExpensesKeys(actualExpensesx);
  //   handleOnActualDay(actualDaysSpentx);
  //   handleOnRequestKeys(noOfDaysRequestedx);
  // }, [extraInformationx]);

  // useEffect(() => {
  //   handleOnPurposeKeys(purposex);
  //   handleOnAddressKeys(addressx);
  //   handleOnCityKeys(cityx);
  //   handleOnExtraKeys(extraInformationx);
  //   handleOnExpensesKeys(expectedExpensesx);
  //   handleOnAExpensesKeys(actualExpensesx);
  //   handleOnActualDay(actualDaysSpentx);
  //   handleOnRequestKeys(noOfDaysRequestedx);
  // }, [purposex]);
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
              Update Business Trip
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="purpose">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="address">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="city">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="xpense">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="Axpense">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="dayspent">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="dayrequest">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <MDInput
                      type="text"
                      label="Purpose *"
                      value={purposex || ""}
                      onKeyUp={(e) => handleOnPurposeKeys(e.target.value)}
                      onChange={(e) => setPurpose(e.target.value)}
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
                      Country *
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
                  <div className="col-sm-6">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      State *
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        value={residentialStatex || ""}
                        aria-label="Default select example"
                        // onChange={handleOnChangeRCState}
                        onChange={(e) => setResidentialState(e.target.value)}
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
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="Address *"
                      value={addressx}
                      onKeyUp={(e) => handleOnAddressKeys(e.target.value)}
                      onChange={(e) => setAddress(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="City *"
                      value={cityx || ""}
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
                  <div>
                    <MDInput
                      type="text"
                      value={extraInformationx}
                      // onKeyUp={(e) => handleOnExtraKeys(e.target.value)}
                      onChange={(e) => setExtraInformation(e.target.value)}
                      label="Extra Information "
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
                      value={expectedExpensesx}
                      onKeyUp={(e) => handleOnExpensesKeys(e.target.value)}
                      onChange={(e) => setExpectedExpenses(e.target.value)}
                      label="Expected Expenses *"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={actualExpensesx}
                      onKeyUp={(e) => handleOnAExpensesKeys(e.target.value)}
                      onChange={(e) => setActualExpenses(e.target.value)}
                      label="Actual Expenses *"
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
                      value={actualDaysSpentx}
                      onKeyUp={(e) => handleOnActualDay(e.target.value)}
                      onChange={(e) => setActualDaysSpent(e.target.value)}
                      label="Actual Day Spent *"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={noOfDaysRequestedx || ""}
                      onKeyUp={(e) => handleOnRequestKeys(e.target.value)}
                      onChange={(e) => setNoOfDaysRequested(e.target.value)}
                      label="No of Days Requested *"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <div className="row">
                <div className="col-sm-6">
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    fontSize="80%"
                    align="left"
                    color="text"
                  >
                    Start TIme *
                  </MDTypography>
                  <DatePicker
                    placeholderText="Start Date"
                    style={{ marginRight: "10px" }}
                    selected={startDate}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    onChange={(start) => setStartDate(start)}
                  />
                </div>
                <div className="col-sm-6">
                  <Container>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      textAlign="center"
                      color="text"
                    >
                      Approver Name *
                    </MDTypography>
                    <br />
                    <Form.Select
                      value={duty}
                      onChange={(e) => setDuty(e.target.value)}
                      aria-label="Default select example"
                    >
                      <option value="">Select Account Owner</option>
                      {check.map((api) => (
                        <option key={api.personal.id} value={api.personal.id}>
                          {api.personal.fname} {api.personal.lname}
                        </option>
                      ))}
                    </Form.Select>
                  </Container>
                </div>
              </div>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={handleValidate} color="info" width="50%">
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

export default UpdateBusinessTravel;
