import React, { useEffect, useState } from "react";
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
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import InsuranceDamageTable from "layouts/insurance/damage/data/insuranceDamageTableData";
import Styles from "styles";

function InsuranceDamage() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = InsuranceDamageTable();

  const [damageAmountx, setDamageAmount] = useState("0");
  const [insurances, setInsurances] = useState([]);
  const [checkDamageAmount, setCheckDamageAmount] = useState(true);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // Method to fetch particular insurance
  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    let isMounted = true;
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insurance/getByIds/${ids}`, {
      headers,
    })
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
          setInsurances(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnDamageAmountKeys = (valuee) => {
    const number = /^[0-9.]+$/;
    const value = valuee.toString();
    if (!value.match(number)) {
      setCheckDamageAmount(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = "Damage Amount - input only numbers<br>";
    }
    if (value.match(number)) {
      setCheckDamageAmount(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = "";
    }
    if (value.length === 0) {
      setCheckDamageAmount(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = "Damage Amount is required<br>";
    }
  };

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();

    // Calculating Damage Contribution
    const companyContributionPercent = insurances[0].plan.damageCompanyContribution / 100;
    const companyContribution = companyContributionPercent * damageAmountx;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const personalIds = data11.personalID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    const raw = JSON.stringify({
      orgID: orgIDs,
      insuranceID: ids,
      damageAmount: damageAmountx,
      damageContribution: companyContribution,
      createdBy: personalIds,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insuranceDamageRequest/add`, requestOptions)
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
    handleOnDamageAmountKeys(damageAmountx);
    if (checkDamageAmount === true) {
      handleClick(e);
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
              Add Insurance Damage Request
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
                      label="Damage Amount (NGN)"
                      value={damageAmountx || "0"}
                      onChange={(e) => setDamageAmount(e.target.value)}
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

export default InsuranceDamage;
