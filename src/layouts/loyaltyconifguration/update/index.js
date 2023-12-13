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
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
// Emmybanks Code 😎👩👨‍💻🍕i chop 🍕🍔 while writting dis code

function UpdateLoyaltyConiguration() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const [amountx, setAmount] = useState("");
  const [categoryx, setCategory] = useState("");
  const [typex, setType] = useState("");
  const [itemsx, setItems] = useState("");
  const [noOfCountx, setNoOfCount] = useState("");
  const [bonusAmountx, setBonusAmount] = useState("");

  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [checkedAmount, setCheckedAmount] = useState("");

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

  // eslint-disable-next-line consistent-return
  //   const handleOnCategory = (clientType) => {
  //     if (clientType === 0) {
  //       return "Count";
  //     }
  //     if (clientType === 1) {
  //       return "Cost";
  //     }
  //   };

  const handleGet = () => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const headers = miHeaders;

    fetch(`${process.env.REACT_APP_LOUGA_URL}/salesLoyaltiesSettings/getByIds/${id}`, { headers })
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
        setType(result[0].type);
        setCategory(result[0].category);
        setBonusAmount(result[0].thresholdAmount);
        setNoOfCount(result[0].noOfCounts);
        // handleOnCategory()
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
      id: itemsx[0].id,
      orgID: orgIDs,
      category: categoryx,
      type: typex,
      amount: amountx,
      thresholdAmount: bonusAmountx,
      noOfCounts: noOfCountx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_LOUGA_URL}/salesLoyaltiesSettings/update`, requestOptions)
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
              Update Loyalty Configuration
            </MDTypography>
          </MDBox>
          <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="amount">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
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
                      Category*
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        onChange={(e) => setCategory(e.target.value)}
                        value={categoryx}
                        aria-label="Default select example"
                      >
                        <option>--Select Category--</option>
                        <option value="0">Count</option>
                        <option value="1">Cost</option>
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
                        Type*
                      </MDTypography>{" "}
                      <Form.Select
                        value={typex}
                        onChange={(e) => setType(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">--Select Type--</option>
                        <option value="0">Flat</option>
                        <option value="1">Percentage</option>
                      </Form.Select>
                      <br />
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <Box sx={{ minWidth: 100 }}>
                      <FormControl fullWidth>
                        <TextField
                          label="Bonus Amount (NGN)"
                          type="number"
                          value={bonusAmountx}
                          //   onKeyUp={(e) => handleOnAmountKeys(e.target.value)}
                          onChange={(e) => setBonusAmount(e.target.value)}
                        />
                      </FormControl>
                    </Box>
                  </div>
                  <div className="col-sm-6">
                    <Box sx={{ minWidth: 100 }}>
                      <FormControl fullWidth>
                        <TextField
                          label="Threshold Amount*"
                          type="number"
                          value={noOfCountx}
                          //   onKeyUp={(e) => handleOnAmountKeys(e.target.value)}
                          onChange={(e) => setNoOfCount(e.target.value)}
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
                    <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
                      <FormControl fullWidth>
                        <TextField
                          label="Amount (NGN)*"
                          type="number"
                          value={amountx}
                          onKeyUp={(e) => handleOnAmountKeys(e.target.value)}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </FormControl>
                    </Box>
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

export default UpdateLoyaltyConiguration;
