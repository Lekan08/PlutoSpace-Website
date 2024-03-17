import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import PHeaders from "postHeader";
import Styles from "styles";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "examples/Footer";
import GHeaders from "getHeader";
import Paper from "@mui/material/Paper";
import Accordion from "react-bootstrap/Accordion";
import OtherInflowntable from "./data/table";
// Big Zzzz Doings
// total is task + amountt

function OtherInflow() {
  const MySwal = withReactContent(Swal);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const { columns: pColumns, rows: pRows } = OtherInflowntable();

  const navigate = useNavigate();

  const [opened, setOpened] = useState(false);

  const [amountx, setAmount] = useState("");
  const [taxAmountx, setTaxAmount] = useState("");
  //   const [totalAmountx, setTotalAmount] = useState("");
  const [otherInflowTypex, setOtherInflowType] = useState("");
  const [oitx, setOIT] = useState([]);
  const [particularz, setParticular] = useState("");

  const [checkedAmount, setCheckedAmount] = useState("");
  const [checkedTaxAmount, setCheckedTaxAmount] = useState("");
  const [checkedPaticular, setCheckedPaticular] = useState("");

  const [startAmountx, setStartAmount] = useState("");
  const [endTimex, setEndTime] = useState("");
  const [endAmountx, setEndAmount] = useState("");
  const [startTimex, setStartTime] = useState("");

  const TotalAmountx = parseInt(taxAmountx, 10) + parseInt(amountx, 10);

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
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

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
  const handleOnPortfolioKeys = () => {
    if (particularz.length === 0) {
      setCheckedPaticular(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("portfolio").innerHTML = "A text is required<br>";
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

  const handleFilter = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const idx = data11.personalID;
    const raw = JSON.stringify({
      startTime: startTimex,
      endTime: endTimex,
      approverStatus: 0,
      orgID: orgIDs,
      createdBys: [idx],
      approvedBys: [0],
      startAmount: startAmountx,
      endAmount: endAmountx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_LOUGA_URL}/otherInflow/gets`, requestOptions)
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
    if (checkedAmount && checkedTaxAmount && checkedPaticular === true) {
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
              Other Inflow Type
            </MDTypography>
          </MDBox>
          <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="amount">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="taxamount">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="portfolio">
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
                        onKeyUp={handleOnPortfolioKeys}
                        onChange={(e) => setParticular(e.target.value)}
                        rows={2}
                      />
                    </Form.Group>

                    <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
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
      <br />
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="1">
          <Accordion.Header>Filter Other Inflow</Accordion.Header>
          <Accordion.Body>
            <Paper elevation={3}>
              <br />
              <MDBox textAlign="center" mt={3}>
                <Container>
                  <div className="row">
                    {/* <div className="col-sm-5">
                    <MDBox mt={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        Start Date
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
                    </MDBox>
                  </div> */}
                    <div className="col-sm-3">
                      <TextField
                        id="datetime-local"
                        label="Start Time *"
                        type="datetime-local"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={startTimex}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </div>
                    <br />
                    &nbsp; &nbsp;
                    <div className="col-sm-3">
                      <TextField
                        id="datetime-local"
                        label="End Time *"
                        type="datetime-local"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={endTimex}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </div>
                    <br />
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-sm-3">
                      <TextField
                        label="Start Amount *"
                        type="number"
                        value={startAmountx}
                        // onKeyUp={handleOnAmountKeys}
                        onChange={(e) => setStartAmount(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-3">
                      <TextField
                        label="End Amount *"
                        type="number"
                        value={endAmountx}
                        // onKeyUp={handleOnTaxAmountKeys}
                        onChange={(e) => setEndAmount(e.target.value)}
                      />
                    </div>
                  </div>
                </Container>
                {/* <u>Before Proceeding Read carefully:</u> */}
                {/* <MDBox p={3} mt={2}>
                        <MDTypography
                          variant="h4"
                          fontWeight="regular"
                          fontSize="75%"
                          textAlign="center"
                          color="text"
                        >
                          &nbsp;&nbsp;&nbsp;&nbsp;The first line/row in your csv file must be
                          exactly the same as the words in the image below in row 1 A - U (should be
                          camelCase when necessary. The first row order does not matter, in essence,
                          you may have fname or lname or title at any position you want) and your
                          further details in each row should be corresponding to the content of the
                          first row (i.e under &apos;fname&apos; you should have first name e.t.c...{" "}
                          <br /> please open image in new tab to zoom in for a clearer view)
                        </MDTypography>
                      </MDBox> */}
                <br />
                {/* <MDBox textAlign="center" p={5}>
                        <MDTypography
                          variant="h4"
                          fontWeight="regular"
                          fontSize="75%"
                          textAlign="center"
                          color="text"
                        >
                          <input
                            type="file"
                            name="file"
                            accept=".csv"
                            onChange={changeHandler}
                            style={{ display: "block", margin: "10px auto" }}
                          />
                        </MDTypography> */}
                {/* </MDBox> */}
                <Button onClick={handleFilter} variant="success">
                  Upload
                </Button>
                <br />
              </MDBox>
            </Paper>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
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
export default OtherInflow;
