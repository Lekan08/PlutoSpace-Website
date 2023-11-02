/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import BusinessData from "layouts/businessTravel/data";
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
import "react-phone-input-2/lib/style.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GHeaders from "getHeader";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function BusinessTravel() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = BusinessData();
  const { allGHeaders: miHeaders } = GHeaders();

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
  const [userx, setUser] = useState([]);
  const [duty, setDuty] = useState("");
  const [applicantx, setApplicantx] = useState([]);

  const [checkedName, setCheckedName] = useState("");
  const [checkedAddress, setCheckedAddress] = useState("");
  const [checkedCity, setCheckedCity] = useState("");
  // const [checkedExtra, setCheckedExtra] = useState("");
  const [checkedExpense, setCheckedExpense] = useState("");
  const [checkedAExpense, setCheckedAExpense] = useState("");
  const [checkedDaySpent, setCheckedDaySpent] = useState("");
  const [checkedDayRequest, setCheckedDayRequest] = useState("");
  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();

  const handleOnChangeRCCountry = (e) => {
    const filteredItems = AlCountry.filter((item) => item.name === e.target.value);
    setAllStates(filteredItems[0].states);
    setResidentialCountry(e.target.value);
  };

  const handleOnChangeRCState = (e) => {
    setResidentialState(e.target.value);
  };

  const handleOnPurposeKeys = (value) => {
    const letters = /^[a-zA-Z ]+$/;
    if (!value.match(letters)) {
      setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("purpose").innerHTML =
        "Purpose - input only capital and small letters<br>";
    }
    if (value.match(letters)) {
      setCheckedName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("purpose").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("purpose").innerHTML = "Purpose is required<br>";
    }
  };
  const handleOnAddressKeys = (value) => {
    const letters = /^[a-zA-Z0-9 ]+$/;
    if (!value.match(letters)) {
      setCheckedAddress(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("address").innerHTML = "Address - input only numbers and letters<br>";
    }
    if (value.match(letters)) {
      setCheckedAddress(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("address").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("address").innerHTML = "Address is required<br>";
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
  // };
  const handleOnExpensesKeys = (value) => {
    const letters = /^[0-9 ]+$/;
    if (!value.match(letters)) {
      setCheckedExpense(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("xpense").innerHTML = "Expected Expenses - input only numbers<br>";
    }
    if (value.match(letters)) {
      setCheckedExpense(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("xpense").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("xpense").innerHTML = "Expected Expenses is required<br>";
    }
  };
  const handleOnAExpensesKeys = (value) => {
    const Number = /^[0-9 ]+$/;
    if (!value.match(Number)) {
      setCheckedAExpense(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("Axpense").innerHTML = "Actual Expenses - input only numbers<br>";
    }
    if (value.match(Number)) {
      setCheckedAExpense(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("Axpense").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("Axpense").innerHTML = "Actual Expenses is required<br>";
    }
  };
  const handleOnActualDay = (value) => {
    const Number = /^[0-9 ]+$/;
    if (!value.match(Number)) {
      setCheckedDaySpent(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("dayspent").innerHTML = "Days Spent - input only numbers<br>";
    }
    if (value.match(Number)) {
      setCheckedDaySpent(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("dayspent").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("dayspent").innerHTML = "Days Spent is required<br>";
    }
  };
  const handleOnRequestKeys = (value) => {
    const Number = /^[0-9 ]+$/;
    if (!value.match(Number)) {
      setCheckedDayRequest(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("dayrequest").innerHTML = "Days Requested - input only numbers<br>";
    }
    if (value.match(Number)) {
      setCheckedDayRequest(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("dayrequest").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("dayrequest").innerHTML = "Days Reqested is required<br>";
    }
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

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;
    const startCDate = new Date(startDate).getTime();
    const raww = applicantx.map((api) => api.personalID);
    raww.push(personalIDs);
    const raw = JSON.stringify({
      orgID: orgIDs,
      createdBy: personalIDs,
      startTime: startCDate,
      noOfDaysRequested: noOfDaysRequestedx,
      employees: raww,
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
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_SHASHA_URL}/businessTravels/add`, requestOptions)
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
  };

  const addEm = (api) => {
    const mapper = {
      orgID: api.personalCompany.orgID,
      name: `${api.personal.fname} ${api.personal.lname}`,
      email: api.personal.email,
      personalID: api.personal.id,
    };
    applicantx.push(mapper);
    setApplicantx(applicantx);
  };
  const deleteEm = (api) => {
    // eslint-disable-next-line no-plusplus
    for (let i = applicantx.length - 1; i >= 0; --i) {
      if (applicantx[i].personalID === api.personal.id) {
        applicantx.splice(i, 1);
      }
    }
  };

  const applicant = (e, api) => {
    if (e.target.checked === true) {
      addEm(api);
    }
    if (e.target.checked === false) {
      deleteEm(api);
    }
  };

  const handleValidate = (e) => {
    if (
      checkedName &&
      checkedAddress &&
      checkedAExpense &&
      // checkedExtra &&
      checkedDayRequest &&
      checkedDaySpent &&
      checkedCity &&
      checkedExpense === true
    ) {
      handleClick(e);
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
              Business Travel
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="xtrainfo">
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
                <div className="col-sm-5">
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    fontSize="80%"
                    align="left"
                    color="text"
                  >
                    Start TIme
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
                      Approver Name
                    </MDTypography>
                    <br />
                    <Form.Select
                      value={duty}
                      onChange={(e) => setDuty(e.target.value)}
                      aria-label="Default select example"
                    >
                      <option value="">Select Approver</option>
                      {userx.map((api) => (
                        <option key={api.personal.id} value={api.personal.id}>
                          {api.personal.fname} {api.personal.lname}
                        </option>
                      ))}
                    </Form.Select>
                  </Container>
                </div>
              </div>
            </MDBox>
            <br />
            <MDBox>
              <Container>
                <div className="col-sm-12">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Select Participants</Typography>
                    </AccordionSummary>
                    <Form>
                      {userx.map((api) => (
                        <div key={api.personal.id} className="mb-3">
                          <Form.Check.Input
                            type="checkbox"
                            // defaultChecked={checked}
                            onClick={(e) => applicant(e, api)}
                          />
                          <Form.Check.Label>
                            &nbsp;{api.personal.fname} {api.personal.lname}
                          </Form.Check.Label>
                        </div>
                      ))}
                    </Form>
                  </Accordion>
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

export default BusinessTravel;
