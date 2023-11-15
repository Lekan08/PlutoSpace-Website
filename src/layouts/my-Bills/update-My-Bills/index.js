import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
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
import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
import TextField from "@mui/material/TextField";
import Styles from "styles";
import Grid from "@mui/material/Grid";

function UpdateMyBills() {
  const { allGHeaders: miHeaders } = GHeaders();
  const MySwal = withReactContent(Swal);

  const [extraInfox, setExtraInfox] = useState("");
  const [paidAmountx, setPaidAmountx] = useState("");
  //   const [totalAmountx, setTotalAmountx] = useState("");
  const [taxAmountx, setTaxAmountx] = useState("");
  const [approverx, setApproverx] = useState("");
  const [amountx, setAmountx] = useState("");
  const [userInfox, setUserInfo] = useState([]);
  const [imageURL, setImageUrl] = useState([]);
  const [assignedTox, setAssignTo] = useState("");
  const [createdTimeee, setCreatedTime] = useState("");
  const [approveTimexx, setApproveTime] = useState("");
  const [approvalStatusxx, setApprovalStatus] = useState("");
  const [deleteFlagxx, setDeleteFlag] = useState("");

  const [purposex, setPurposex] = useState("");
  const [idx, setId] = useState("");

  const [checkedTaxAmountx, setCheckedTaxAmount] = useState(false);
  const [checkedPaidAmountx, setCheckedPaidAmount] = useState(false);
  const [checkedAmountx, setCheckedAmountx] = useState(false);
  const [checkAssignx, setCheckedAssign] = useState(false);
  const [checkPurpose, setCheckedPurpose] = useState(false);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const totalAmountx = parseInt(taxAmountx, 10) + parseInt(amountx, 10);

  const { allPHeaders: myHeaders } = PHeaders();

  const handleonAssign = (valuex) => {
    setAssignTo(valuex);
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedAssign(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("assign").innerHTML = "Assign bill to user <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedAssign(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("assign").innerHTML = " ";
    }
  };

  //   const formData = new FormData();
  console.log(assignedTox);
  const handlePurpose = (valuex) => {
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedPurpose(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("purpose").innerHTML = "Purpose is required <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedPurpose(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("purpose").innerHTML = " ";
    }
  };

  const handleTaxAmount = (valuex) => {
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedTaxAmount(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("taxAmount").innerHTML = "Tax Amount is required <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedTaxAmount(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("taxAmount").innerHTML = " ";
    }
  };

  const handlePaidAmountx = (valuex) => {
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedPaidAmount(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("paidAmount").innerHTML = "Paid Amount is required <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedPaidAmount(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("paidAmount").innerHTML = " ";
    }
  };

  const handleAmount = (valuex) => {
    console.log(valuex);
    if (!valuex) {
      setCheckedAmountx(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = "Amount is required";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedAmountx(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = " ";
    }
  };

  // eslint-disable-next-line consistent-return
  const handleClick = (e) => {
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const currentlyLogegdIn = data11.personalID;
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      empID: assignedTox,
      createdBy: currentlyLogegdIn,
      createdTime: createdTimeee,
      amount: amountx,
      taxAmount: taxAmountx,
      totalAmount: totalAmountx,
      paidAmount: paidAmountx,
      purpose: purposex,
      extraInformation: extraInfox,
      attachedDocs: imageURL,
      approveTime: approveTimexx,
      approvalStatus: approvalStatusxx,
      deleteFlag: deleteFlagxx,
      approverID: approverx,
    });

    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(requestOptions);

    setOpened(true);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/bills/update`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        console.log(result);
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
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          window.location.reload();
        });
        console.log(result);
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

  useEffect(() => {
    setOpened(true);
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
        if (isMounted) {
          console.log(result);
          setUserInfo(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    handlePurpose(purposex);
    handlePaidAmountx(paidAmountx);
    handleAmount(amountx);
    handleonAssign(assignedTox);
    handleTaxAmount(taxAmountx);
  }, [assignedTox, purposex, paidAmountx, amountx, taxAmountx]);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/bills/getByIds/${ids}`, {
      headers,
    })
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
        if (isMounted) {
          console.log(result);
          if (result.length !== 0) {
            console.log(result);
            setTaxAmountx(result[0].taxAmount);
            setId(result[0].id);
            setAmountx(result[0].amount);
            setPaidAmountx(result[0].paidAmount);
            setPurposex(result[0].purpose);
            setExtraInfox(result[0].extraInformation);
            setAssignTo(result[0].empID);
            setCreatedTime(result[0].createdTime);
            setApproveTime(result[0].approveTime);
            setApprovalStatus(result[0].approvalStatus);
            setDeleteFlag(result[0].deleteFlag);
            setApproverx(result[0].approverID);
            setImageUrl(result[0].attachedDocs);
            console.log(result[0].attachedDocs);
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleValidate = (e) => {
    // handleAmount(amountx);
    // handleTaxAmount(taxAmountx);
    // handlePaidAmountx(paidAmountx);
    // handleonAssign(assignedTox);
    // handlePurpose(purposex);
    console.log(checkedTaxAmountx);
    console.log(checkedPaidAmountx);
    console.log(checkPurpose);
    console.log(checkAssignx);
    console.log(checkedAmountx);
    if (
      checkedTaxAmountx &&
      checkedAmountx &&
      checkPurpose &&
      checkAssignx &&
      checkedPaidAmountx === true
    ) {
      handleClick(e);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3}>
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            style={Styles.boxSx}
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              My Bills
            </MDTypography>
          </MDBox>
          <MDBox
            mt={2}
            mb={2}
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <MDTypography variant="gradient" fontSize="60%" color="error" id="amount">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="taxAmount">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="paidAmount">
              {" "}
            </MDTypography>{" "}
            <MDTypography variant="gradient" fontSize="60%" color="error" id="purpose">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="assign">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={5}>
                    <TextField
                      id="filled-number"
                      value={amountx || ""}
                      label="Amount (NGN) "
                      placeholder="Amount "
                      type="number"
                      onChange={(e) => setAmountx(e.target.value)}
                      onKeyUp={(e) => handleAmount(e.target.value)}
                      style={{ width: "100%", height: "100%" }}
                      required
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      id="filled-number"
                      value={taxAmountx || ""}
                      label="Tax Amount (NGN) "
                      placeholder="Amount "
                      type="number"
                      onChange={(e) => setTaxAmountx(e.target.value)}
                      onKeyUp={(e) => handleTaxAmount(e.target.value)}
                      style={{ width: "100%", height: "100%" }}
                      required
                    />
                  </Grid>

                  <Grid item xs={5}>
                    <TextField
                      id="filled-read-only-input"
                      label="Total Amount (NGN)"
                      value={totalAmountx || " "}
                      InputProps={{
                        readOnly: true,
                      }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={5}>
                    <TextField
                      id="filled-number"
                      value={paidAmountx || ""}
                      label="Paid Amount (NGN) "
                      placeholder="Paid Amount "
                      type="number"
                      onChange={(e) => setPaidAmountx(e.target.value)}
                      onKeyUp={(e) => handlePaidAmountx(e.target.value)}
                      style={{ width: "100%", height: "100%" }}
                      required
                    />
                  </Grid>

                  <Grid item xs={10}>
                    <TextField
                      id="outlined-textarea"
                      rows={2}
                      value={purposex || ""}
                      label="Purpose "
                      placeholder="Purpose "
                      onChange={(e) => setPurposex(e.target.value)}
                      onKeyUp={(e) => handlePurpose(e.target.value)}
                      style={{ width: "100%", height: "100%" }}
                      multiline
                      required
                    />
                  </Grid>

                  <Grid item xs={10}>
                    <TextField
                      id="outlined-textarea"
                      rows={2}
                      value={extraInfox || ""}
                      label="Extra Informaton "
                      placeholder="Extra Informaton "
                      onChange={(e) => setExtraInfox(e.target.value)}
                      style={{ width: "100%", height: "100%" }}
                      multiline
                    />
                  </Grid>

                  <Grid item xs={5}>
                    <Form.Select
                      value={assignedTox}
                      aria-label="Default select example"
                      //   onChange={(e) => setAssignTo(e.target.value)}
                      onInput={(e) => handleonAssign(e.target.value)}
                    >
                      <option value="">--Assign to--</option>
                      {userInfox.map((item) => (
                        <option key={item.personal.id} value={item.personal.id}>
                          {item.personal.fname} {item.personal.lname}
                        </option>
                      ))}
                    </Form.Select>
                  </Grid>

                  <Grid item xs={5}>
                    <Form.Select
                      value={approverx}
                      aria-label="Default select example"
                      //   onChange={(e) => setAssignTo(e.target.value)}
                      onInput={(e) => setApproverx(e.target.value)}
                    >
                      <option value="">--Should be approved by--</option>
                      {userInfox.map((item) => (
                        <option key={item.personal.id} value={item.personal.id}>
                          {item.personal.fname} {item.personal.lname}
                        </option>
                      ))}
                    </Form.Select>
                  </Grid>

                  <Grid item xs={5}>
                    <MDBox mt={1} mb={1}>
                      <MDBox mt={4} mb={1}>
                        <MDButton
                          variant="gradient"
                          onClick={handleValidate}
                          //   color="info"
                          style={Styles.buttonSx}
                          width="50%"
                          align="left"
                        >
                          Update
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </Grid>

                  <Grid item xs={5}>
                    <></>
                  </Grid>
                </Grid>
              </Container>
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

export default UpdateMyBills;
