import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
// import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Divider } from "@mui/material";
// import { Container, Form } from "react-bootstrap";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";

import "bootstrap/dist/css/bootstrap.min.css";
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function ViewResult() {
  const navigate = useNavigate();

  const [gradex, setGrade] = useState("");
  const [valuex, setValue] = useState("");
  const [colorx, setColor] = useState("");
  const [scorex, setScore] = useState("");

  const [opened, setOpened] = useState(false);

  // const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalGrading/result/getByAppraisalIDs/${id}`, {
      headers,
    })
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
          setScore(result[0].result.score);
          setGrade(result[0].grading.grade);
          setColor(result[0].grading.colorCode);
          setValue(result[0].grading.value);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const changeCol = (value) => {
    if (value === "danger") {
      return "#FF0E0E";
      // eslint-disable-next-line no-else-return
    } else if (value === "warning") {
      return "#FFBB33";
      // eslint-disable-next-line no-else-return
    } else if (value === "info") {
      return "#0000FF";
    } else if (value === "success") {
      return "#42ba96";
    } else {
      return "#ffffff";
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3}>
        <Grid item xs={14} md={4} lg={4}>
          <MDBox />
        </Grid>
        <Grid item xs={14} md={4} lg={4}>
          <Card
            sx={{
              maxHeight: 500,
              maxWidth: 300,
              backgroundColor: `${changeCol(colorx)}`,
              border: 10,
              borderColor: "#ffffff",
            }}
          >
            {/* <div className="scrollbar scrollbar-primary mt-2 mx-auto" style={scrollContainerStyle}> */}
            <CardContent>
              <MDTypography variant="h6" color="white" fontSize="150px" textAlign="left" mt={0}>
                {gradex}
              </MDTypography>
              <Divider />
              <MDTypography variant="h6" color="white" fontSize="30px" textAlign="left" mt={-10}>
                {valuex}
              </MDTypography>
              <Divider />
              <MDTypography variant="h6" color="white" fontSize="70px" textAlign="left" mt={-6}>
                {scorex}
              </MDTypography>
            </CardContent>
            &nbsp; &nbsp;
            {/* </div> */}
          </Card>
        </Grid>{" "}
        <Grid item xs={14} md={4} lg={4}>
          <MDBox />
        </Grid>
      </Grid>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default ViewResult;
