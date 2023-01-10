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
import Footer from "examples/Footer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DataTable from "examples/Tables/DataTable";
import TreasuryTable from "./data";
// zinoleesky wrote this part of d code called treasuryTpe

function Treasury() {
  const MySwal = withReactContent(Swal);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const { columns: pColumns, rows: pRows } = TreasuryTable();

  const navigate = useNavigate();

  const [amountx, setAmount] = useState("");
  const [treasureTypex, setTreasureTypex] = useState("");

  const [showClients, setShowClients] = useState(false);
  const [uclientIDx, setUClientIDx] = useState("");
  const [clientx, setClient] = useState([]);
  const [uclientTypex, setUClientTypex] = useState("");
  const [treasureType, setTreasureType] = useState([]);

  const [opened, setOpened] = useState(false);
  const [checkedAmount, setCheckedAmount] = useState("");

  const handleOnAmountKeys = (value) => {
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

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const idx = data11.personalID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      clientID: uclientIDx,
      clientType: uclientTypex,
      treasuryTypeID: treasureTypex,
      amount: amountx,
      //   lastContributionTime: 0,
      createdBy: idx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/treasury/add`, requestOptions)
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
              Treasury
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
                        value={uclientTypex || ""}
                        aria-label="Default select example"
                      >
                        <option>---Select Client Type---</option>
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
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
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
                        />
                      </FormControl>
                    </Box>
                  </div>
                  <div className="col-sm-6">
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
                        <option value="">--Select Treasury Type--</option>
                        {treasureType.map((api) => (
                          <option key={api.id} value={api.id}>
                            {api.name}
                          </option>
                        ))}
                      </Form.Select>
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
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
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
export default Treasury;
