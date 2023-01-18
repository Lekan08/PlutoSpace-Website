import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
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

  const navigate = useNavigate();

  const [amountx, setAmount] = useState("");
  const [taxAmountx, setTaxAmount] = useState("");
  const [otherInflowTypex, setOtherInflowType] = useState("");
  const [oitx, setOIT] = useState([]);
  const [particularz, setParticular] = useState("");
  const [showClients, setShowClients] = useState(false);
  const [clientx, setClient] = useState([]);
  const [clientTypex, setClientTypex] = useState("");
  const [clientIDx, setClientIDx] = useState("");

  const [checkedAmount, setCheckedAmount] = useState("");
  const [checkedTaxAmount, setCheckedTaxAmount] = useState("");
  const [itemsx, setItems] = useState([]);

  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const handleOnAmountKeys = (value) => {
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

  const handleChangeClient = (value) => {
    const callClientType = value.toString();
    setClientTypex(callClientType);
    let clientTyppe = "";
    if (callClientType === "1") {
      setShowClients(true);
      clientTyppe = "individual";
    } else if (callClientType === "2") {
      setShowClients(false);
      clientTyppe = "corporate";
    }
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    fetch(`${process.env.REACT_APP_LOUGA_URL}/${clientTyppe}/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        setClient(result);
      });
  };

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
        setItems(result);
        setAmount(result[0].amount);
        setTaxAmount(result[0].taxAmount);
        setOtherInflowType(result[0].otherInflowTypeID);
        setParticular(result[0].particulars);
        if (result[0].clientType !== 0) {
          handleChangeClient(result[0].clientType);
        }
        setClientTypex(result[0].clientType);
        setClientIDx(result[0].clientID);
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
                      type="number"
                    />
                  </div>
                  <div className="col-sm-6">
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
                  <div className="col-sm-6">
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                      mt={0}
                    >
                      Client Type
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        onChange={(e) => handleChangeClient(e.target.value)}
                        value={clientTypex || ""}
                        aria-label="Default select example"
                      >
                        <option>--Select Client Type--</option>
                        <option value="1">Individual</option>
                        <option value="2">Corporate</option>
                      </Form.Select>
                    </MDBox>
                  </div>
                  <div className="col-sm-6">
                    <MDBox mt={0}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        Client
                      </MDTypography>{" "}
                      {showClients ? (
                        <Form.Select
                          value={clientIDx}
                          onChange={(e) => setClientIDx(e.target.value)}
                          aria-label="Default select example"
                        >
                          <option value="">--Select User--</option>
                          {clientx.map((api) => (
                            <option key={api.id} value={api.id}>
                              {api.title} {api.fname} {api.lname}
                            </option>
                          ))}
                        </Form.Select>
                      ) : (
                        <Form.Select
                          value={clientIDx}
                          onChange={(e) => setClientIDx(e.target.value)}
                          aria-label="Default select example"
                        >
                          <option value="">--Select User--</option>
                          {clientx.map((api) => (
                            <option key={api.id} value={api.id}>
                              {api.name}
                            </option>
                          ))}
                        </Form.Select>
                      )}
                      <br />
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
