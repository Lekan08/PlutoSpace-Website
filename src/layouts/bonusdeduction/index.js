import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import DataTable from "examples/Tables/DataTable";
import bonusdeductionData from "layouts/bonusdeduction/data/bonusDeduction";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Styles from "styles";
import Grid from "@mui/material/Grid";
import PHeaders from "postHeader";
import GHeaders from "getHeader";

import { useNavigate } from "react-router-dom";

function bonusdeduction() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = bonusdeductionData();

  const [namex, setName] = useState("");
  const [amountx, setAmount] = useState("");
  const [typex, setTypex] = useState("");
  const [currencyx, setCurrency] = useState("");
  const [setupTypex, setSetupTypex] = useState("");
  const [frequencyx, setFrequencyx] = useState("");

  const [user, setUser] = useState([]);
  const [userIDx, setUserIDx] = useState("");

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

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
          setUser(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // eslint-disable-next-line consistent-return
  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    const raw = JSON.stringify({
      orgID: orgIDs,
      name: namex,
      empID: userIDx,
      setupType: setupTypex,
      amount: amountx,
      currency: currencyx,
      type: typex,
      frequency: frequencyx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_TANTA_URL}/remunerationpackagesetup/add`, requestOptions)
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

  // eslint-disable-next-line consistent-return
  const handleOnNameKeys = (e) => {
    const letters = /^[a-zA-Z ]+$/;
    if (!namex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
    }
    if (namex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
      handleClick(e);
    }
    if (namex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name is required<br>";
    }
  };

  const handleOnChangeSymbol = (e) => {
    setTypex(e.target.value);
    const symValue = e.target.value;
    if (symValue === "FLAT") {
      setCurrency("NGN");
    } else if (symValue === "PERCENTAGE") {
      setCurrency("%");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={5} pb={9}>
          <MDBox
            variant="gradient"
            // bgColor="info"
            style={Styles.boxSx}
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Add Bonus & Deduction
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={10}>
                  <MDInput
                    type="text"
                    label="Name *"
                    value={namex || ""}
                    // className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    variant="standard"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={5}>
                  {" "}
                  <MDInput
                    type="text"
                    value={currencyx || ""}
                    onChange={(e) => setCurrency(e.target.value)}
                    disabled
                    label="Variation *"
                    variant="standard"
                    fullWidth
                  />{" "}
                </Grid>
                <Grid item xs={5}>
                  {" "}
                  <MDInput
                    type="number"
                    value={amountx || ""}
                    onChange={(e) => setAmount(e.target.value)}
                    label="Amount *"
                    variant="standard"
                    fullWidth
                  />{" "}
                </Grid>
                <Grid item xs={5}>
                  {" "}
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    fontSize="80%"
                    align="left"
                    color="text"
                  >
                    User *
                  </MDTypography>
                  <Form.Select
                    value={userIDx}
                    onChange={(e) => setUserIDx(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option value="">--Select User--</option>
                    {user.map((api) => (
                      <option key={api.personal.id} value={api.personal.id}>
                        {api.personal.fname} {api.personal.lname}
                      </option>
                    ))}
                  </Form.Select>{" "}
                </Grid>
                <Grid item xs={5}>
                  {" "}
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    fontSize="80%"
                    align="left"
                    color="text"
                  >
                    Variation *
                  </MDTypography>
                  <Form.Select
                    onChange={handleOnChangeSymbol}
                    value={typex || ""}
                    aria-label="Default select example"
                  >
                    <option>---Select Variation---</option>
                    <option value="FLAT">FLAT</option>
                    <option value="PERCENTAGE">PERCENTAGE</option>
                  </Form.Select>{" "}
                </Grid>
                <Grid item xs={5}>
                  {" "}
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    fontSize="80%"
                    align="left"
                    color="text"
                  >
                    Type *
                  </MDTypography>
                  <Form.Select
                    onChange={(e) => setSetupTypex(e.target.value)}
                    value={setupTypex || ""}
                    aria-label="Default select example"
                  >
                    <option>---Select Type---</option>
                    <option value="1">Bonus</option>
                    <option value="2">Deduction</option>
                  </Form.Select>{" "}
                </Grid>
                <Grid item xs={5}>
                  {" "}
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    fontSize="80%"
                    align="left"
                    color="text"
                  >
                    Frequency *
                  </MDTypography>
                  <Form.Select
                    onChange={(e) => setFrequencyx(e.target.value)}
                    value={frequencyx || ""}
                    aria-label="Default select example"
                  >
                    <option>---Select Frequency---</option>
                    <option value="1">One-Time</option>
                    <option value="2">Always</option>
                  </Form.Select>{" "}
                </Grid>
                <Grid item xs={5}>
                  {" "}
                  <MDBox mt={1} mb={1}>
                    <MDButton
                      variant="gradient"
                      onClick={handleOnNameKeys}
                      // color="info"
                      style={Styles.buttonSx}
                      width="50%"
                      align="left"
                    >
                      Save
                    </MDButton>
                  </MDBox>{" "}
                </Grid>
                <Grid item xs={5}>
                  {" "}
                </Grid>
              </Grid>
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

export default bonusdeduction;
