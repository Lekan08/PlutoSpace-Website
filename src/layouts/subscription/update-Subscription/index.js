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

function UpdateMySubscription() {
  const { allGHeaders: miHeaders } = GHeaders();
  const MySwal = withReactContent(Swal);

  const [typex, setTypex] = useState("");
  const [paidAmountx, setPaidAmountx] = useState("");
  //   const [totalAmountx, setTotalAmountx] = useState("");
  const [taxAmountx, setTaxAmountx] = useState("");
  const [amountx, setAmountx] = useState("");
  const [userInfox, setUserInfo] = useState([]);
  const [billsx, setBillsx] = useState([]);
  const [assignedTox, setAssignTo] = useState("");
  const [createdTimeee, setCreatedTime] = useState("");
  const [approverIDDDD, setApproverID] = useState("");
  const [approveTimexx, setApproveTime] = useState("");
  const [approvalStatusxx, setApprovalStatus] = useState("");
  const [deleteFlagxx, setDeleteFlag] = useState("");
  const [pricePerUnitx, setPricePerUnitx] = useState("");
  const [frequencyx, setFrequencyx] = useState("");

  const [particularsx, setParticularsx] = useState("");
  const [idx, setId] = useState("");

  const [checkedTaxAmountx, setCheckedTaxAmount] = useState(false);
  const [checkedPaidAmountx, setCheckedPaidAmount] = useState(false);
  const [checkedAmountx, setCheckedAmountx] = useState(false);
  const [checkAssignx, setCheckedAssign] = useState(false);
  const [checkParticulars, setCheckedParticular] = useState(false);
  const [checkCheckedType, setCheckedType] = useState(false);
  const [checkCheckedPricePerUnit, setCheckedPricePerUnit] = useState(false);
  const [checkCheckedFrequencyTime, setCheckedFrequencyTime] = useState(false);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const totalAmountx = parseInt(taxAmountx, 10) + parseInt(amountx, 10);

  const { allPHeaders: myHeaders } = PHeaders();

  const handleonAssign = (valuex) => {
    console.log(valuex);
    if (!valuex) {
      setCheckedAssign(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("assign").innerHTML = "Assign bill to user <br>";
    }
    if (valuex) {
      setCheckedAssign(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("assign").innerHTML = " ";
    }
  };
  const handleFrequencyTime = (valuex) => {
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedFrequencyTime(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("frequency").innerHTML = "Subscription Period is required <br>";
    }
    if (valuex) {
      setCheckedFrequencyTime(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("frequency").innerHTML = " ";
    }
  };
  const handlePricePerUnit = (valuex) => {
    console.log(valuex);
    if (!valuex) {
      setCheckedPricePerUnit(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("pricePerUnit").innerHTML = "Price per period is required <br>";
    }
    if (valuex) {
      setCheckedPricePerUnit(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("pricePerUnit").innerHTML = " ";
    }
  };

  const handleType = (valuex) => {
    setTypex(valuex);
    console.log(valuex);
    if (!valuex) {
      setCheckedType(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("type").innerHTML = "Subscription Type is required <br>";
    }
    if (valuex) {
      setCheckedType(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("type").innerHTML = " ";
    }
  };

  //   const formData = new FormData();

  const handleParticulars = (valuex) => {
    console.log(valuex);
    if (!valuex) {
      setCheckedParticular(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("particulars").innerHTML = "Particulars is required <br>";
    }
    if (valuex) {
      setCheckedParticular(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("particulars").innerHTML = " ";
    }
  };

  const handleTaxAmount = (valuex) => {
    console.log(valuex);
    if (!valuex) {
      setCheckedTaxAmount(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("taxAmount").innerHTML = "Tax Amount is required <br>";
    }
    if (valuex) {
      setCheckedTaxAmount(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("taxAmount").innerHTML = " ";
    }
  };

  const handlePaidAmountx = (valuex) => {
    console.log(valuex);
    if (!valuex) {
      setCheckedPaidAmount(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("paidAmount").innerHTML = "Paid Amount is required <br>";
    }
    if (valuex) {
      setCheckedPaidAmount(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("paidAmount").innerHTML = " ";
    }
  };

  const handleAmount = (valuex) => {
    console.log(valuex);
    if (!valuex) {
      setCheckedAmountx(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = "Amount is required";
    }
    if (valuex) {
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
      particulars: particularsx,
      type: typex,
      frequency: frequencyx,
      pricePerUnit: pricePerUnitx,
      bills: billsx,
      approverID: approverIDDDD,
      approveTime: approveTimexx,
      deleteFlag: deleteFlagxx,
      approvalStatus: approvalStatusxx,
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
    fetch(`${process.env.REACT_APP_LOUGA_URL}/subscriptions/update`, requestOptions)
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
    handleAmount(amountx);
    handleTaxAmount(taxAmountx);
    handlePaidAmountx(paidAmountx);
    handleParticulars(particularsx);
    handleType(typex);
    handleFrequencyTime(frequencyx);
    handlePricePerUnit(pricePerUnitx);
    handleonAssign(assignedTox);
  }, [
    paidAmountx,
    amountx,
    taxAmountx,
    pricePerUnitx,
    particularsx,
    frequencyx,
    typex,
    pricePerUnitx,
    assignedTox,
  ]);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/subscriptions/getByIds/${ids}`, {
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
            setParticularsx(result[0].particulars);
            setTypex(result[0].type);
            setAssignTo(result[0].empID);
            console.log(result[0].empID);
            setCreatedTime(result[0].createdTime);
            setApproverID(result[0].approverID);
            setApproveTime(result[0].approveTime);
            setApprovalStatus(result[0].approvalStatus);
            setDeleteFlag(result[0].deleteFlag);
            setBillsx(result[0].bills);
            setFrequencyx(result[0].frequency);
            setPricePerUnitx(result[0].pricePerUnit);
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleValidate = (e) => {
    console.log(checkedTaxAmountx);
    console.log(checkedAmountx);
    console.log(checkParticulars);
    console.log(checkAssignx);
    console.log(checkCheckedType);
    console.log(checkCheckedPricePerUnit);
    console.log(checkCheckedFrequencyTime);
    console.log(checkedPaidAmountx);
    if (
      checkedTaxAmountx &&
      checkedAmountx &&
      checkParticulars &&
      checkAssignx &&
      checkCheckedType &&
      checkCheckedPricePerUnit &&
      checkCheckedFrequencyTime &&
      checkedPaidAmountx === true
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
            // bgColor="info"
            borderRadius="lg"
            style={{ backgroundColor: "#f96d02" }}
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Update Subscription
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="particulars">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="type">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="frequency">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="pricePerUnit">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="assign">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-5">
                    <TextField
                      id="filled-number"
                      value={amountx || ""}
                      label="Amount (NGN) "
                      placeholder="Amount "
                      type="number"
                      onChange={(e) => setAmountx(e.target.value)}
                      onKeyUp={(e) => handleAmount(e.target.value)}
                      sx={{
                        width: 250,
                      }}
                      required
                    />
                  </div>
                  <div className="col-sm-2">
                    <></>
                  </div>
                  <div className="col-sm-5">
                    <TextField
                      id="filled-number"
                      value={taxAmountx || ""}
                      label="Tax Amount (NGN) "
                      placeholder="Amount "
                      type="number"
                      onChange={(e) => setTaxAmountx(e.target.value)}
                      onKeyUp={(e) => handleTaxAmount(e.target.value)}
                      sx={{
                        width: 250,
                      }}
                      required
                    />
                  </div>
                </div>
                &nbsp; &nbsp;
                <div className="row">
                  <div className="col-sm-5">
                    <TextField
                      id="filled-read-only-input"
                      label="Total Amount of Subscription (NGN)"
                      value={totalAmountx || " "}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        width: 250,
                      }}
                    />
                  </div>
                  <div className="col-sm-2">
                    <></>
                  </div>
                  <div className="col-sm-5">
                    <TextField
                      id="filled-number"
                      value={paidAmountx || ""}
                      label="Paid Amount (NGN) "
                      placeholder="Paid Amount "
                      type="number"
                      onChange={(e) => setPaidAmountx(e.target.value)}
                      onKeyUp={(e) => handlePaidAmountx(e.target.value)}
                      sx={{
                        width: 250,
                      }}
                      required
                    />
                  </div>
                </div>
                &nbsp; &nbsp;
                <div className="col-sm-12">
                  <TextField
                    id="outlined-textarea"
                    rows={2}
                    value={particularsx || ""}
                    label="Particulars "
                    placeholder="Particulars "
                    onChange={(e) => setParticularsx(e.target.value)}
                    onKeyUp={(e) => handleParticulars(e.target.value)}
                    sx={{
                      width: 600,
                    }}
                    multiline
                    required
                  />
                </div>
                &nbsp; &nbsp;
                <div className="row">
                  <div className="col-sm-6">
                    <Form.Select
                      value={typex}
                      aria-label="Default select example"
                      //   onChange={(e) => setAssignTo(e.target.value)}
                      onInput={(e) => handleType(e.target.value)}
                    >
                      <option value="">--Type of Subscription--</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </Form.Select>
                  </div>

                  <div className="col-sm-6">
                    <TextField
                      id="filled-number"
                      value={frequencyx || ""}
                      label="Subscription Period "
                      placeholder="Subscription Period "
                      type="number"
                      onChange={(e) => setFrequencyx(e.target.value)}
                      onKeyUp={(e) => handleFrequencyTime(e.target.value)}
                      sx={{
                        width: 300,
                      }}
                      required
                    />
                  </div>
                </div>
                &nbsp; &nbsp;
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      id="filled-number"
                      value={pricePerUnitx || ""}
                      label="Price per Period (NGN) "
                      placeholder="Amount to be paid for each period "
                      type="number"
                      onChange={(e) => setPricePerUnitx(e.target.value)}
                      onKeyUp={(e) => handlePricePerUnit(e.target.value)}
                      sx={{
                        width: 250,
                      }}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <Form.Select
                      value={assignedTox || " "}
                      aria-label="Default select example"
                      onChange={(e) => setAssignTo(e.target.value)}
                      onInput={(e) => handleonAssign(e.target.value)}
                    >
                      <option value="">--Assign to--</option>
                      {userInfox.map((item) => (
                        <option key={item.personal.id} value={item.personal.id}>
                          {item.personal.fname} {item.personal.lname}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
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

export default UpdateMySubscription;
