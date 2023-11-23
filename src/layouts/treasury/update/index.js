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
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Styles from "styles";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Footer from "examples/Footer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// zinoleesky wrote this part of d code called treasuryTpe

function UpdateTreasury() {
  const MySwal = withReactContent(Swal);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  const [amountx, setAmount] = useState("");
  const [treasureTypex, setTreasureTypex] = useState("");
  const [items, setItems] = useState("");

  const [showClients, setShowClients] = useState(false);
  const [uclientIDx, setUClientIDx] = useState("");
  const [clientx, setClient] = useState([]);
  const [uclientTypex, setUClientTypex] = useState("");
  const [treasureType, setTreasureType] = useState([]);

  const [opened, setOpened] = useState(false);
  const [checkedAmount, setCheckedAmount] = useState("");

  const handleOnAmountKeys = (value) => {
    console.log(value);

    // Check if value is a string
    if (typeof value !== "string") {
      setCheckedAmount(true);
      return; // exit the function early to avoid further errors
    }

    const letters = /^[0-9 ]+$/;
    if (!value.match(letters)) {
      setCheckedAmount(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Amount - input only numbers<br>";
    }
    if (value.match(letters)) {
      setCheckedAmount(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Amount is required<br>";
    }
  };

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/treasuryTypes/gets/${orgIDs}`, { headers })
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
          setTreasureType(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChangeClient = (value) => {
    const callClientType = value.toString();
    setUClientTypex(callClientType);
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

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    console.log(ids);
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/treasury/getByIds/${ids}`, { headers })
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
          console.log(result);
          setItems(result);
          setTreasureTypex(result[0].treasuryTypeID);
          setAmount(result[0].amount);
          setUClientTypex(result[0].clientType);
          setUClientIDx(result[0].clientID);
          handleChangeClient(result[0].clientType);
          handleOnAmountKeys(result[0].amount);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdate = (e) => {
    setOpened(true);
    e.preventDefault();

    const raw = JSON.stringify({
      id: items[0].id,
      orgID: items[0].orgID,
      clientID: uclientIDx,
      clientType: uclientTypex,
      treasuryTypeID: treasureTypex,
      amount: amountx,
      lastContributionTime: items[0].lastContributionTime,
      createdBy: items[0].createdBy,
      createdTime: items[0].createdTime,
      status: items[0].status,
      approvedBy: items[0].approvedBy,
      approvedTime: items[0].approvedTime,
      terminatedBy: items[0].terminatedBy,
      terminatedTime: items[0].terminatedTime,
      deleteFlag: items[0].deleteFlag,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/treasury/update`, requestOptions)
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
      handleUpdate(e);
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
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
            style={Styles.boxSx}
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Update Treasury
            </MDTypography>
          </MDBox>{" "}
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={5}>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                      mt={0}
                    >
                      Client Type *
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        onChange={(e) => handleChangeClient(e.target.value)}
                        value={uclientTypex || ""}
                        aria-label="Default select example"
                      >
                        <option>---Select Client Type---</option>
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
                        Client *
                      </MDTypography>{" "}
                      {showClients ? (
                        <Form.Select
                          value={uclientIDx}
                          onChange={(e) => setUClientIDx(e.target.value)}
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
                          value={uclientIDx}
                          onChange={(e) => setUClientIDx(e.target.value)}
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
                  </Grid>

                  <Grid item xs={5}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={amountx}
                          onChange={(e) => setAmount(e.target.value)}
                          onKeyUp={(e) => handleOnAmountKeys(e.target.value)}
                          label="Amount (NGN)"
                          placeholder="Amount (NGN)"
                          type="number"
                          required
                        />
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={5}>
                    {/* <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                      mt={0}
                    >
                      Client Treasury Type
                    </MDTypography> */}
                    <MDBox textAlign="right">
                      <Form.Select
                        value={treasureTypex}
                        onChange={(e) => setTreasureTypex(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">--Select Treasury Type *--</option>
                        {treasureType.map((api) => (
                          <option key={api.id} value={api.id}>
                            {api.name}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </Grid>

                  <Grid item xs={5}>
                    <MDBox mt={1} mb={1}>
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
export default UpdateTreasury;
