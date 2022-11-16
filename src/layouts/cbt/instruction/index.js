import React from "react";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function WelcomeCbt() {
  const navigate = useNavigate();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const cbtIDs = urlParams.get("id");
  const handleNavigate = () => {
    navigate(`/cbt/takeCbt/?id=${cbtIDs}`);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={3}>
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
              CBT
            </MDTypography>
          </MDBox>
          <p>Welcome TO CBT</p>
          <h3>
            Please Note, once you have started you cant stop untill you are done and you will be
            timed
          </h3>
          <h3>Once you closed the browser your answer will be submitted</h3>
          <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              onClick={handleNavigate}
              // disabled={!enabled}
              color="info"
              width="50%"
            >
              Next
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default WelcomeCbt;
