import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
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
// import AllCountriesAndStates from "countries-states-master/countries";
// import AllCountryCode from "countries-states-master/country-code";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Styles from "styles";
import TextField from "@mui/material/TextField";
// Emmybanks Code 😎👩👨‍💻🍕i chop 🍕🍔 while writting dis code

function UpdateOtherInflow() {
  const MySwal = withReactContent(Swal);

  //   const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const navigate = useNavigate();

  const [amountx, setAmount] = useState("");
  const [taxAmountx, setTaxAmount] = useState("");
  //   const [totalAmountx, setTotalAmount] = useState("");
  const [otherInflowTypex, setOtherInflowType] = useState("");
  const [oitx, setOIT] = useState([]);
  const [particularz, setParticular] = useState("");

  const [checkedAmount, setCheckedAmount] = useState("");
  const [checkedTaxAmount, setCheckedTaxAmount] = useState("");
  //   const [startAmountx, setStartAmount] = useState("");
  //   const [endTimex, setEndTime] = useState("");
  //   const [endAmountx, setEndAmount] = useState("");
  //   const [startTimex, setStartTime] = useState("");
  const [itemsx, setItems] = useState([]);

  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const handleOnAmountKeys = (value) => {
    console.log(value);
    const letters = /^[0-9 ]+$/;
    if (!value.toString().match(letters)) {
      setCheckedAmount(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = "Amount - input only numbers<br>";
    }
    if (value.toString().match(letters)) {
      setCheckedAmount(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = "";
    }
    if (value.toString().length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = "Amount is required<br>";
    }
  };
  const handleOnTaxAmountKeys = (value) => {
    const letters = /^[0-9 ]+$/;
    if (!value.toString().match(letters)) {
      setCheckedTaxAmount(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("taxamount").innerHTML = "Tax Amount - input only numbers<br>";
    }
    if (value.toString().match(letters)) {
      setCheckedTaxAmount(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("taxamount").innerHTML = "";
    }
    if (value.toString().length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("taxamount").innerHTML = "Tax Amount is required<br>";
    }
  };

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/otherInflowTypes/gets/${orgIDs}`, { headers })
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
          setOIT(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const TotalAmountx = parseInt(taxAmountx, 10) + parseInt(amountx, 10);

  const handleGet = () => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const headers = miHeaders;

    fetch(`${process.env.REACT_APP_LOUGA_URL}/otherInflow/getByIds/${id}`, { headers })
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
        // setId(result[0].id);
        // setName(result[0].amount);
        // setEmail(result[0].taxAmount);
        // setPno(result[0].totalAmount);
        // setDayOfBirth(result[0].otherInflowType.Zinoleeky);
        setItems(result);
        setAmount(result[0].amount);
        setTaxAmount(result[0].taxAmount);
        setOtherInflowType(result[0].otherInflowTypeID);
        // setOIT(result[0].particulars);
        setParticular(result[0].particulars);
        // setTotalAmount(result[0].totalAmount);
        // //   setYearOfBirth(result[0].yearOfBirth);
        // const filteredItems = AlCountry.filter((item) => item.name === result[0].country);
        // setAllStates(filteredItems[0].otherInflowType.Zinoleeky);
        // setStreet(result[0].street);
        // setCity(result[0].city);
        // setState(result[0].state);
        // setCountry(result[0].country);
        // setDeleteFlag(result[0].deleteFlag);
        // setCreatedTime(result[0].createdTime);
        // handleOnNameKeys(result[0].name);
        // handleOnEmailKeys(result[0].email);
        // handleOnStreetKeys(result[0].street);
        // handleOnCityKeys(result[0].city);

        handleOnAmountKeys(result[0].amount);
        handleOnTaxAmountKeys(result[0].taxAmount);
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
      id: itemsx[0].id,
      orgID: orgIDs,
      particulars: particularz,
      createdBy: itemsx[0].createdBy,
      amount: amountx,
      taxAmount: taxAmountx,
      totalAmount: TotalAmountx,
      createdTime: itemsx[0].createdTime,
      deleteFlag: itemsx[0].deleteFlag,
      otherInflowTypeID: otherInflowTypex,
      approverID: itemsx[0].approverID,
      approveStatus: itemsx[0].approveStatus,
      approverTime: itemsx[0].approverTime,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_LOUGA_URL}/otherInflow/update`, requestOptions)
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
    if (checkedAmount && checkedTaxAmount === true) {
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
              Update Other Inflow
            </MDTypography>
          </MDBox>
          <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="amount">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="taxamount">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      label="Amount *"
                      type="number"
                      value={amountx}
                      onKeyUp={(e) => handleOnAmountKeys(e.target.value)}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      label="Amount *"
                      type="number"
                      value={taxAmountx}
                      onKeyUp={(e) => handleOnTaxAmountKeys(e.target.value)}
                      onChange={(e) => setTaxAmount(e.target.value)}
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      id="filled-read-only-input"
                      label="Total Amount (NGN)"
                      value={TotalAmountx}
                      InputProps={{
                        readOnly: true,
                      }}
                      //   label="Amount *"
                      type="number"
                      //   value={TotalAmountx}
                      //   onKeyUp={handleOnNameKeys}
                      //   onChange={(e) => setTotalAmount(e.target.value)}
                      //   disabled
                    />
                  </div>
                  <div className="col-sm-6">
                    {/* <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      Other Inflow Type
                    </MDTypography> */}
                    <MDBox textAlign="right">
                      <Form.Select
                        value={otherInflowTypex || ""}
                        aria-label="Default select example"
                        onChange={(e) => setOtherInflowType(e.target.value)}
                      >
                        <option>--Select Other Inflow Type--</option>
                        {oitx.map((apis) => (
                          <option key={apis.id} value={apis.id}>
                            {apis.name}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                      <Form.Label style={{ fontSize: 14 }}>Portfolio</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={particularz || ""}
                        // onKeyUp={handleOnPortfolioKeys}
                        onChange={(e) => setParticular(e.target.value)}
                        rows={2}
                      />
                    </Form.Group>

                    {/* <i style={{ fontSize: "11px", color: "gray" }}>optional</i> */}
                  </div>
                </div>
              </Container>
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

export default UpdateOtherInflow;
