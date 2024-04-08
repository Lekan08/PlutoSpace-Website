import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import PHeaders from "postHeader";
import Styles from "styles";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
// import DataTable from "examples/Tables/DataTable";
import Backdrop from "@mui/material/Backdrop";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "examples/Footer";
import GHeaders from "getHeader";
// import OtherInflowntable from "./data/table";
// Big Zzzz Doings
// total is task + amountt

function OtherInflow() {
  const MySwal = withReactContent(Swal);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  // const { columns: pColumns, rows: pRows } = OtherInflowntable();

  const navigate = useNavigate();

  const [opened, setOpened] = useState(false);

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
  const [checkedPaticular, setCheckedPaticular] = useState("");

  const TotalAmountx = parseInt(taxAmountx, 10) + parseInt(amountx, 10);

  const getTax = (orgIDs) => {
    const headers = miHeaders;

    fetch(`${process.env.REACT_APP_TANTA_URL}/tax/get/${orgIDs}`, { headers })
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
        console.log(result);
        if (result?.value) {
          setTaxAmount(result.value);
          setCheckedTaxAmount(true);
        }
      });
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
          if (result.length > 0) {
            setOIT(result);
            getTax(orgIDs);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

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

  const handleOnParticularKeys = (value) => {
    if (value.length === 0) {
      setCheckedPaticular(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("portfolio").innerHTML = "Particular is required<br>";
    } else {
      setCheckedPaticular(true);
    }
    // setEnabled(checkedPortfolio === true);
  };

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const idx = data11.personalID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      particulars: particularz,
      createdBy: idx,
      clientID: clientIDx,
      clientType: clientTypex,
      amount: amountx,
      taxAmount: taxAmountx,
      totalAmount: TotalAmountx,
      otherInflowTypeID: otherInflowTypex,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_LOUGA_URL}/otherInflow/add`, requestOptions)
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
        if (result.length > 0) {
          setClient(result);
        }
      });
  };

  const handleValidate = (e) => {
    if (checkedAmount === true && checkedTaxAmount === true && checkedPaticular === true) {
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
              Other Inflow
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="amount">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="taxamount">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2} mt={4}>
              <Container>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={5}>
                    <TextField
                      label="Amount (NGN)*"
                      type="number"
                      style={{ width: "100%", height: "100%" }}
                      value={amountx}
                      onKeyUp={(e) => handleOnAmountKeys(e.target.value)}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="Tax Amount (NGN)*"
                      type="number"
                      value={taxAmountx}
                      style={{ width: "100%", height: "100%" }}
                      onKeyUp={(e) => handleOnTaxAmountKeys(e.target.value)}
                      onChange={(e) => setTaxAmount(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={5}>
                    <TextField
                      id="filled-read-only-input"
                      label="Total Amount (NGN)"
                      value={TotalAmountx}
                      style={{ width: "100%", height: "100%" }}
                      InputProps={{
                        readOnly: true,
                      }}
                      type="number"
                    />{" "}
                  </Grid>

                  <Grid item xs={5}>
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
                  </Grid>

                  <Grid item xs={5}>
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
                  </Grid>

                  <Grid item xs={5}>
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
                    </MDBox>
                  </Grid>

                  <Grid item xs={10}>
                    <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                      <Form.Label style={{ fontSize: 14 }}>Particulars *</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={particularz || ""}
                        onKeyUp={(e) => handleOnParticularKeys(e.target.value)}
                        onChange={(e) => setParticular(e.target.value)}
                        rows={2}
                      />
                    </Form.Group>
                  </Grid>

                  <Grid item xs={5}>
                    {" "}
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
                    </MDBox>{" "}
                  </Grid>
                  <Grid item xs={5}>
                    <></>{" "}
                  </Grid>
                </Grid>
              </Container>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <br />
      {/* <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: pRows }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox> */}
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}
export default OtherInflow;
