import React, { useState } from "react";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import withReactContent from "sweetalert2-react-content";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function MarkAsCompleted() {
  const MySwal = withReactContent(Swal);
  const [opened, setOpened] = useState(false);

  const [extraInfo, setExtraInfo] = useState("");
  const [actualExpensesx, setActualExpensesx] = useState("");
  const [actualDaysSpentx, setActualDaysSpentx] = useState("");
  const navigate = useNavigate();
  const { allPHeaders: myHeaders } = PHeaders();
  const [checkedActualDSpent, setActualDSpent] = useState(false);
  const [checkedActualEx, setActualEx] = useState(false);

  const handleOnActualDaySpent = (value) => {
    const number = /^[0-9. ]+$/;
    if (!value.match(number)) {
      setActualDSpent(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("actualDSpent").innerHTML = " input only numbers <br>";
    }
    if (value.match(number)) {
      setActualDSpent(true);
      console.log("chech");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("actualDSpent").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("actualDSpent").innerHTML = "Actual Day Spent is required <br>";
    }
  };

  const handleOnActualExpenses = (value) => {
    const number = /^[0-9. ]+$/;
    if (!value.match(number)) {
      setActualEx(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("actualEx").innerHTML = " input only numbers <br>";
    }
    if (value.match(number)) {
      setActualEx(true);
      console.log("chech");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("actualEx").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("actualEx").innerHTML = "Actual Expenses is required <br>";
    }
  };

  const handleMarkAsCompleted = (e) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    console.log(ids);
    setOpened(true);
    e.preventDefault();

    const raw = JSON.stringify({
      id: ids,
      actualExpenses: actualExpensesx,
      actualDaysSpent: actualDaysSpentx,
      extraInformation: extraInfo,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_SHASHA_URL}/businessTravels/markAsCompleted`, requestOptions)
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
  const handleValidate = (e) => {
    handleOnActualDaySpent(actualDaysSpentx);
    handleOnActualExpenses(actualExpensesx);
    console.log(checkedActualDSpent);
    console.log(checkedActualEx);
    if (checkedActualDSpent && checkedActualEx === true) {
      handleMarkAsCompleted(e);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ padding: "10px" }}>
        <MDBox pt={4} pb={3} px={30}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Mark As Completed
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="actualDSpent">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="actualEx">
              {" "}
            </MDTypography>
          </MDBox>
        </MDBox>
        &nbsp; &nbsp;
        <Container>
          <div className="row">
            <div className="col-sm-6">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                &nbsp; &nbsp;
                <TextField
                  onChange={(e) => setActualDaysSpentx(e.target.value)}
                  onKeyUp={(e) => handleOnActualDaySpent(e.target.value)}
                  value={actualDaysSpentx}
                  type="number"
                  label="Actual Day Spent"
                  color="secondary"
                  focused
                />
              </Box>
            </div>
            <div className="col-sm-6">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                &nbsp; &nbsp;
                <TextField
                  onChange={(e) => setActualExpensesx(e.target.value)}
                  onKeyUp={(e) => handleOnActualExpenses(e.target.value)}
                  value={actualExpensesx}
                  type="number"
                  label="Actual Expenses "
                  color="secondary"
                  focused
                />
              </Box>
            </div>
          </div>
          &nbsp; &nbsp;
          <div className="row">
            <div className="col-sm-12">
              <TextField
                id="outlined-textarea"
                rows={4}
                value={extraInfo || ""}
                label="Extra Information "
                placeholder="Business Travel Extra Information"
                onChange={(e) => setExtraInfo(e.target.value)}
                sx={{
                  width: 900,
                }}
                multiline
              />
            </div>
          </div>
          <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              onClick={handleValidate}
              color="info"
              width="50%"
              align="left"
            >
              Save
            </MDButton>
          </MDBox>
        </Container>
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default MarkAsCompleted;
