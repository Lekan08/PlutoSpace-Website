import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Styles from "styles";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "examples/Footer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
// zinoleesky wrote this part of d code called treasuryContribution

function UpdateTreasuryContribution() {
  const MySwal = withReactContent(Swal);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  const [cashAmountx, setCashAmount] = useState("");
  const [checkAmountx, setCheckAmount] = useState("");
  const [paymentTimeForx, setPaymentTimeFor] = useState("");
  const [cardAmountx, setCardAmount] = useState("");
  const [items, setItems] = useState("");

  const [opened, setOpened] = useState(false);
  const [checkedAmount, setCheckedAmount] = useState("");

  const handleOnAmountKeys = (value) => {
    const letters = /^[0-9 ]+$/;
    if (!value.toString().match(letters)) {
      setCheckedAmount(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Amount - input only numbers<br>";
    }
    if (value.toString().match(letters)) {
      setCheckedAmount(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (value.toString().length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Amount is required<br>";
    }
  };

  useEffect(() => {
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/treasuryContributions/getByIds/${ids}`, { headers })
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
        console.log(result);
        if (isMounted) {
          setItems(result);
          setCashAmount(result[0].cashAmount);
          setCheckAmount(result[0].checkAmount);
          setCardAmount(result[0].cardAmount);
          setPaymentTimeFor(result[0].paymentTimeFor);

          handleOnAmountKeys(result[0].cashAmount);
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
    const idx = data11.personalID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    const amountxr = urlParams.get("amount");
    // eslint-disable-next-line no-eval
    const TOTAL = eval(Number(cashAmountx) + Number(checkAmountx) + Number(cardAmountx));
    console.log(TOTAL);
    console.log(amountxr);
    const finalTotal = Number(TOTAL);
    const finalAmount = Number(amountxr);
    const paymentTime = new Date().getTime(paymentTimeForx);
    if (finalTotal === finalAmount) {
      console.log("correct");
      setOpened(true);
      const raw = JSON.stringify({
        id: items[0].id,
        orgID: orgIDs,
        treasuryID: ids,
        cashAmount: cashAmountx,
        checkAmount: checkAmountx,
        cardAmount: cardAmountx,
        paymentTimeFor: paymentTime,
        createdBy: idx,

        status: items[0].status,
        createdTime: items[0].createdTime,
        approvedBy: items[0].approvedBy,
        approvedTime: items[0].approvedTime,
        deleteFlag: items[0].deleteFlag,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      console.log(raw);
      fetch(`${process.env.REACT_APP_LOUGA_URL}/treasuryContributions/update`, requestOptions)
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
    } else {
      setOpened(false);
      MySwal.fire({
        title: "Cannot Perform Request",
        type: "error",
        text: "Your Cash Amount,Card Amount and Check Amount must all equal your Treasury Amount",
      });
    }
  };

  const handleValidate = (e) => {
    if (checkedAmount === true) {
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
              Update Treasury Contribution
            </MDTypography>
          </MDBox>
          <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={cashAmountx}
                          onChange={(e) => setCashAmount(e.target.value)}
                          onKeyUp={(e) => handleOnAmountKeys(e.target.value)}
                          label="Cash Amount (NGN)"
                          placeholder="Cash Amount (NGN)"
                          type="number"
                        />
                      </FormControl>
                    </Box>
                  </div>
                  <div className="col-sm-6">
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={checkAmountx}
                          onChange={(e) => setCheckAmount(e.target.value)}
                          onKeyUp={(e) => handleOnAmountKeys(e.target.value)}
                          label="Check Amount (NGN)"
                          placeholder="Check Amount (NGN)"
                          type="number"
                        />
                      </FormControl>
                    </Box>
                  </div>
                </div>
              </Container>
            </MDBox>

            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <Box sx={{ minWidth: 100 }} style={{ paddingTop: "15px" }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={cardAmountx}
                          label="Card Amount"
                          placeholder="Card Amount"
                          type="number"
                          onChange={(e) => setCardAmount(e.target.value)}
                        />
                      </FormControl>
                    </Box>
                  </div>
                  {/* <div className="col-sm-6">
                    <TextField
                      id="datetime-local"
                      label="Start Time *"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={paymentTimeForx}
                      onChange={(e) => setPaymentTimeFor(e.target.value)}
                      //   onInput={(e) => handleTime(e.target.value)}
                    />
                  </div> */}
                  <div className="col-sm-6">
                    <MDBox mt={2}>
                      {/* <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        Payment Time
                      </MDTypography> */}
                      <DatePicker
                        placeholderText="Payment Time for"
                        style={{ marginRight: "10px" }}
                        selected={paymentTimeForx}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onChange={(paymentTimeFor) => setPaymentTimeFor(paymentTimeFor)}
                      />{" "}
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleValidate}
                width="50%"
                align="left"
                style={Styles.buttonSx}
              >
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
export default UpdateTreasuryContribution;
