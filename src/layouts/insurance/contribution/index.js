import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import InsuranceContributionTable from "layouts/insurance/contribution/data/insuranceContributionTableData";
import Styles from "styles";

function InsuranceContribution() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = InsuranceContributionTable();

  const [cash, setCash] = useState("0");
  const [card, setCard] = useState("0");
  const [check, setCheck] = useState("0");
  const [checkCash, setCheckCash] = useState(true);
  const [checkCard, setCheckCard] = useState(true);
  const [checkCheck, setCheckCheck] = useState(true);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();

  const handleOnCashKeys = (valuee) => {
    const number = /^[0-9.]+$/;
    const value = valuee.toString();
    if (!value.match(number)) {
      setCheckCash(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("cash").innerHTML = "Cash - input only numbers<br>";
    }
    if (value.match(number)) {
      setCheckCash(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("cash").innerHTML = "";
    }
  };

  const handleOnCheckKeys = (valuee) => {
    const number = /^[0-9.]+$/;
    const value = valuee.toString();
    if (!value.match(number)) {
      setCheckCheck(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("check").innerHTML = "Check - input only numbers<br>";
    }
    if (value.match(number)) {
      setCheckCheck(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("check").innerHTML = "";
    }
  };

  const handleOnCardKeys = (valuee) => {
    const number = /^[0-9.]+$/;
    const value = valuee.toString();
    if (!value.match(number)) {
      setCheckCard(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("card").innerHTML = "Card - input only numbers<br>";
    }
    if (value.match(number)) {
      setCheckCard(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("card").innerHTML = "";
    }
  };

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const personalIds = data11.personalID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    const raw = JSON.stringify({
      orgID: orgIDs,
      insuranceID: ids,
      cashPaymentAmount: cash,
      cardPaymentAmount: card,
      checkPaymentAmount: check,
      createdBy: personalIds,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insuranceContribution/add`, requestOptions)
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
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  const handleValidate = (e) => {
    handleOnCardKeys(card);
    handleOnCashKeys(cash);
    handleOnCheckKeys(check);
    if (checkCard === true && checkCash === true && checkCheck === true) {
      if (Number(card) === 0 && Number(cash) === 0 && Number(check) === 0) {
        document.getElementById("general").innerHTML =
          "Amount is required whether check or cash or card<br>";
      } else {
        document.getElementById("general").innerHTML = "";
        handleClick(e);
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={20}>
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
              Add Insurance Contribution
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="cash">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="card">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="check">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="general">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={0}>
              <Container>
                <div className="row">
                  <div className="col-sm-8">
                    <MDInput
                      type="text"
                      label="Cash Payment Amount (NGN)"
                      value={cash || "0"}
                      onChange={(e) => setCash(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            &nbsp;
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-8">
                    <MDInput
                      type="text"
                      label="Check Payment Amount (NGN)"
                      value={check || "0"}
                      onChange={(e) => setCheck(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            &nbsp;
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-8">
                    <MDInput
                      type="text"
                      label="Card Payment Amount (NGN)"
                      value={card || "0"}
                      onChange={(e) => setCard(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleValidate}
                //   color="info"
                style={Styles.buttonSx}
                width="50%"
                align="left"
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

export default InsuranceContribution;
