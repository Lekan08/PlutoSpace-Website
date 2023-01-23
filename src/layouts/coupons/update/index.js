import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Styles from "styles";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UpdateCoupons() {
  const MySwal = withReactContent(Swal);

  const [textx, setText] = useState("");
  const [amountx, setAmount] = useState("");
  const [typex, setType] = useState("");
  const [frequencyx, setFrequency] = useState("");
  const [leftUsagex, setLeftUsage] = useState("");
  const [idx, setId] = useState("");
  const [itemsx, setItems] = useState("");
  const [expireTimex, setExpireTime] = useState("");

  const [checkedAmount, setCheckedAmount] = useState("");
  // const [checkedText, setCheckedText] = useState("");
  const [checkedFrequency, setCheckedFrequency] = useState("");
  const [checkedLeftUsage, setCheckedLeftUsage] = useState("");

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const handleOnAmountKeys = (value) => {
    if (value.length === 0) {
      setCheckedAmount(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = "Amount is required<br>";
    }
    if (value.length !== 0) {
      setCheckedAmount(true);
    }
  };
  const handleOnFrequencyKeys = (value) => {
    if (value.length === 0) {
      setCheckedFrequency(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("frequency").innerHTML = "Amount is required<br>";
    }
    if (value.length !== 0) {
      setCheckedFrequency(true);
    }
  };

  const handleOnLeftUsageKeys = (value) => {
    if (value.length === 0) {
      setCheckedLeftUsage(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("leftUsage").innerHTML = "Left Usage is required<br>";
    }
    if (value.length !== 0) {
      setCheckedLeftUsage(true);
    }
  };

  const handleGet = () => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const headers = miHeaders;

    fetch(`${process.env.REACT_APP_LOUGA_URL}/coupons/getByIds/${id}`, { headers })
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
        setItems(result);
        setId(result[0].id);
        setText(result[0].text);
        setAmount(result[0].amount);
        setType(result[0].type);
        setFrequency(result[0].frequency);
        setLeftUsage(result[0].leftUsage);
        const date = new Date(result[0].expireTime);
        setExpireTime(date);
        // setTimezone(`${storedArray.timezone.split("|")[0]}|${storedArray.timezone.split("|")[1]}`);
        // setNewEvent({
        //   time: timezoneConverter(date),
        //   // title: storedArray.title,
        //   // end: timezoneConverter(endx),
        // });

        handleOnFrequencyKeys(result[0].frequency);
        handleOnLeftUsageKeys(result[0].leftUsage);
        handleOnAmountKeys(result[0].amount);
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
      text: textx,
      amount: amountx,
      type: typex,
      frequency: frequencyx,
      leftUsage: leftUsagex,
      createdBy: itemsx[0].createdBy,
      expireTime: itemsx[0].expireTime,
      status: itemsx[0].status,
      createdTime: itemsx[0].createdTime,
      terminatedBy: itemsx[0].terminatedBy,
      terminatedTime: itemsx[0].terminatedTime,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_LOUGA_URL}/coupons/update`, requestOptions)
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

  const handleValidate = (e) => {
    if (checkedAmount && checkedFrequency && checkedLeftUsage === true) {
      handleClick(e);
    }
  };

  console.log(expireTimex);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={30}>
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
            style={Styles.boxSx}
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Update Coupons
            </MDTypography>
          </MDBox>
          <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="amount">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="frequency">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="leftUsage">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row" />
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <div className="row">
                <div className="col-sm-6">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <TextField
                        id="filled-number"
                        value={frequencyx}
                        onKeyUp={handleOnFrequencyKeys}
                        label="Frequency"
                        placeholder="Frequency "
                        size="small"
                        type="number"
                        onChange={(e) => setFrequency(e.target.value)}
                        required
                      />
                    </FormControl>
                  </Box>
                </div>
                <div className="col-sm-6">
                  <MDBox>
                    <Form.Select
                      value={typex}
                      aria-label="Default select example"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="">Sales Type</option>
                      <option value="1">Flat</option>
                      <option value="2">Frequency</option>
                    </Form.Select>
                  </MDBox>
                </div>
              </div>
            </MDBox>
            <MDBox>
              <div className="row">
                <div className="col-sm-6">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <TextField
                        id="filled-number"
                        value={amountx}
                        label="Amount (NGN)"
                        placeholder="Amount (NGN)*"
                        onKeyUp={handleOnAmountKeys}
                        size="small"
                        type="number"
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </FormControl>
                  </Box>
                </div>
                <div className="col-sm-6">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <TextField
                        id="filled-number"
                        value={leftUsagex}
                        label="Left Usage"
                        onKeyUp={handleOnLeftUsageKeys}
                        placeholder="Left Usage "
                        size="small"
                        type="number"
                        onChange={(e) => setLeftUsage(e.target.value)}
                        required
                      />
                    </FormControl>
                  </Box>
                </div>
              </div>
            </MDBox>
            <MDBox>
              <div className="row">
                {/* <div className="col-sm-5">
                  <div align="center">
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="center"
                      color="text"
                      mt={2}
                    >
                      Expire Time
                    </MDTypography>
                    <DatePicker
                      placeholderText="MM/DD/YY hh:mm"
                      style={{ marginRight: "10px" }}
                      selected={expireTimex.time}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      showTimeSelect
                      dateFormat="MM/dd/yyyy h:mm aa"
                      dropdownMode="select"
                      onChange={(time) => setExpireTime({ ...expireTimex, time })}
                    />
                  </div>
                </div> */}
                <div className="col-sm-5">
                  <MDBox mt={2}>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                    >
                      Expire Time
                    </MDTypography>
                    <DatePicker
                      placeholderText="Start Date"
                      style={{ marginRight: "10px" }}
                      selected={expireTimex}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      onChange={(start) => setExpireTime(start)}
                    />
                  </MDBox>
                </div>
                {/* <div className="col-sm-2">
                  <MDBox>
                    <Form.Select
                      value={createdx}
                      aria-label="Default select example"
                      onChange={(e) => setCreated(e.target.value)}
                    >
                      <option>Created By</option>
                      {createdByx.map((apis) => (
                        <option key={apis.id} value={apis.id}>
                          {apis.personal.fname}
                        </option>
                      ))}
                    </Form.Select>
                  </MDBox>
                </div> */}
              </div>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleValidate}
                // color="info"
                width="50%"
                align="left"
                style={Styles.buttonSx}
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

export default UpdateCoupons;
