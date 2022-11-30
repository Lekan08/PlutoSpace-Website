import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import DataTable from "examples/Tables/DataTable";
import InsurancePlanData from "layouts/insurancePlans/data/insurancePlansTableData";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
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
import Styles from "styles";

function InsurancePlans() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = InsurancePlanData();

  const [titlex, setTitle] = useState("");
  const [descripx, setDescrip] = useState("");
  const [damageClientContributionx, setDamageClientContribution] = useState("");
  const [monthlyContributionx, setMonthlyContribution] = useState("");
  const [yearlyContributionx, setYearlyContribution] = useState("");

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();

  // eslint-disable-next-line consistent-return
  const handleClick = (e) => {
    const letters = /^[a-zA-Z0-9 ]+$/;
    const PricePCval = /^[0-9.]+$/;
    if (!titlex.match(letters)) {
      document.getElementById("name").innerHTML =
        "Title - input only capital, small letters and numbers<br>";
    } else if (
      (damageClientContributionx.length > 0 && !damageClientContributionx.match(PricePCval)) ||
      (monthlyContributionx.length > 0 && !monthlyContributionx.match(PricePCval)) ||
      (yearlyContributionx.length > 0 && !yearlyContributionx.match(PricePCval)) ||
      (damageClientContributionx.length > 0 && Number(damageClientContributionx) > 100) ||
      (monthlyContributionx.length > 0 && Number(monthlyContributionx) > 100) ||
      (yearlyContributionx.length > 0 && Number(yearlyContributionx) > 100)
    ) {
      document.getElementById("name").innerHTML =
        "Please enter valid inputs for title, damage client contribution, monthly contribution and yearly contribution<br>";
    } else {
      document.getElementById("name").innerHTML = "";
      setOpened(true);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const damageCompanyContributionx = 100 - Number(damageClientContributionx);
      const raw = JSON.stringify({
        orgID: orgIDs,
        title: titlex,
        descrip: descripx,
        damageClientContribution: damageClientContributionx,
        damageCompanyContribution: damageCompanyContributionx,
        monthlyContribution: monthlyContributionx,
        yearlyContribution: yearlyContributionx,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insurancePlan/add`, requestOptions)
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
              Add Insurance Plan
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
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="Title *"
                      value={titlex || ""}
                      className="form-control"
                      onChange={(e) => setTitle(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={descripx || ""}
                      onChange={(e) => setDescrip(e.target.value)}
                      label="Description"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
              <Container>
                <div className="row">
                  <div className="col-sm-4">
                    <MDInput
                      type="text"
                      label="Client Damage Contribution (in %) *"
                      value={damageClientContributionx || "0"}
                      className="form-control"
                      onChange={(e) => setDamageClientContribution(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-4">
                    <MDInput
                      type="text"
                      label="Client Monthly Contribution (in %)"
                      value={monthlyContributionx || "0"}
                      className="form-control"
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-4">
                    <MDInput
                      type="text"
                      label="Client Yearly Contribution (in %)"
                      value={yearlyContributionx || "0"}
                      className="form-control"
                      onChange={(e) => setYearlyContribution(e.target.value)}
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
                onClick={handleClick}
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

export default InsurancePlans;
