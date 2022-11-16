/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import MixedChart from "examples/Charts/MixedChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import PDF from "layouts/businesstravel-dashboard/pdf";
import { useReactToPrint } from "react-to-print";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";

function DemandStat() {
  const navigate = useNavigate();
  const { allGHeaders: miHeaders } = GHeaders();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const [opened, setOpened] = useState(false);
  const [totalDemand, setTotalDemand] = useState([]);
  const yearz = new Date().getFullYear();
  const [dAmt, setDAmt] = useState([]);
  const [VAT, setVAmt] = useState([]);
  const [Pay, setPAmt] = useState([]);
  const [Bo, setBo] = useState([]);
  const [req, setReq] = useState([]);

  const [namex, setName] = useState("");
  const onBeforeGetContentResolve = useRef();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const year = Date.parse(new Date());
    let isMounted = true;
    if (data11 === null) {
      navigate("/authentication/sign-in");
      window.location.reload();
    } else {
      setOpened(true);
      const orgIDs = data11.orgID;
      fetch(`${process.env.REACT_APP_LOUGA_URL}/demands/getForYear/${orgIDs}/${year}`, {
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
            const well = result;
            const month = new Date().getMonth();
            const totalDA = [];
            const totalVAT = [];
            const totalBo = [];
            const totalPay = [];
            const totalReq = [];
            for (const key in well) {
              totalDA.push(well[key].totalTotalAmount);
              totalVAT.push(well[key].totalVatAmount);
              totalBo.push(well[key].totalBonusAmount);
              totalPay.push(well[key].totalPayingAmount);
              totalReq.push(well[key].totalRequests);
            }
            setDAmt(totalDA);
            setVAmt(totalVAT);
            setReq(totalReq);
            setPAmt(totalPay);
            setBo(totalBo);
            setTotalDemand(result[month]);
            console.log([totalDA, totalVAT, totalPay, totalBo, totalReq]);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);
  // eslint-disable-next-line no-unused-vars
  function randit() {
    setOpened(false);
  }

  useEffect(() => {
    const id = setTimeout(() => {
      if (show) {
        // Resolves the Promise, telling `react-to-print` it is time to gather the content of the page for printing
        onBeforeGetContentResolve.current();
      }
    }, 2000);
    return () => {
      clearTimeout(id);
    };
  }, [show, onBeforeGetContentResolve]);

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/company/get/${orgIDs}`, {
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
          console.log(result);
          setName(result[0].name);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnBeforeGetContent = () =>
    new Promise((resolve) => {
      // `react-to-print` will wait for this Promise to resolve before continuing
      // Load data
      onBeforeGetContentResolve.current = resolve;
      setShow(true); // When data is done loading
    });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Demand Stats",
    onBeforeGetContent: handleOnBeforeGetContent,
    onAfterPrint: () => window.location.reload(),
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2}>
        <div align="center" width="100%">
          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" onClick={handlePrint} color="info" width="50%">
              Print page
            </MDButton>
          </MDBox>
        </div>
      </MDBox>
      <div ref={componentRef} style={{ width: "100%", height: window.innerHeight }}>
        {show ? <PDF namexxx={namex} /> : ""}
        &nbsp; &nbsp;
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Card style={{ backgroundColor: "#187498" }}>
                <CardContent>
                  <Typography
                    style={{ color: "white" }}
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Demand Conversation Rate
                  </Typography>
                  <Typography
                    style={{ color: "white", textAlign: "center" }}
                    variant="h5"
                    component="div"
                  >
                    {totalDemand.totalBonusAmount && (
                      <>
                        <br />
                      </>
                    )}
                    &nbsp;
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button style={{ color: "white" }} size="small">
                    <></>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card style={{ backgroundColor: "#C1224F" }}>
                <CardContent>
                  <Typography
                    style={{ color: "white" }}
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Demand Requests This Month
                  </Typography>
                  <Typography
                    style={{ color: "white", textAlign: "center" }}
                    variant="h5"
                    component="div"
                  >
                    <br />
                    {totalDemand.totalRequests}
                    <></>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button style={{ color: "white" }} size="small">
                    <></>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card style={{ backgroundColor: "#EB5353" }}>
                <CardContent>
                  <Typography
                    style={{ color: "white" }}
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Demand Quantity Conversion Rate
                  </Typography>
                  <Typography
                    style={{ color: "white", textAlign: "center" }}
                    variant="h5"
                    component="div"
                  >
                    {totalDemand.totalTotalAmount && (
                      <>
                        <br />
                      </>
                    )}
                    &nbsp;
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button style={{ color: "white" }} size="small">
                    <></>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card style={{ backgroundColor: "#36AE7C" }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} style={{ color: "white" }} gutterBottom>
                    Total Demand Bonus This Month
                  </Typography>
                  <Typography
                    style={{ color: "white", textAlign: "center" }}
                    variant="h5"
                    component="div"
                  >
                    <br />
                    {totalDemand.totalBonusAmount && <>(NGN) {totalDemand.totalBonusAmount}</>}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button style={{ color: "white" }} size="small">
                    <></>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            {/* &nbsp; &nbsp; */}
            <Grid item xs={12} md={6} lg={6}>
              <Card style={{ backgroundColor: "#17139C" }}>
                <CardContent>
                  <Typography
                    style={{ color: "white" }}
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Demand Amount This Month
                  </Typography>
                  <Typography
                    style={{ color: "white", textAlign: "center" }}
                    variant="h5"
                    component="div"
                  >
                    <br />
                    {totalDemand.totalTotalAmount && <>(NGN) {totalDemand.totalTotalAmount}</>}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button style={{ color: "white" }} size="small">
                    <></>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <br />
        &nbsp; &nbsp;
        <Grid item xs={12} md={12} lg={12}>
          <ThemeProvider theme={darkTheme}>
            {Bo.length > 1 && (
              <MixedChart
                inkBarStyle={{ backgroundColor: "blue" }}
                title="Demand's Chart"
                description="Analytics Insights"
                chart={{
                  labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                  // x: {
                  //   title: { display: true, text: "Months", padding: 20 },
                  // },
                  // y: {
                  //   title: {
                  //     display: true,
                  //     text: "Amount",
                  //     // color: "black",
                  //     fontSize: 20,
                  //     padding: 20,
                  //   },
                  //   //   ticks: {
                  //   //     min: 0, // minimum value
                  //   //     max: 1000, // maximum value
                  //   //   },
                  // },
                  datasets: [
                    {
                      chartType: "Bar Chart",
                      label: "Total Demand Amount",
                      color: "success",
                      data: dAmt,
                    },
                    {
                      chartType: "Bar Chart",
                      label: "Total Bonus Amount",
                      color: "info",
                      data: Bo,
                    },
                    {
                      chartType: "Bar Chart",
                      label: "Total Paying Amount",
                      color: "warning",
                      data: Pay,
                    },
                    {
                      chartType: "Bar Chart",
                      label: "Total VAT Amount",
                      color: "pink",
                      data: VAT,
                    },
                    {
                      chartType: "Bar Chart",
                      label: "Total Demand Requests",
                      color: "error",
                      data: req,
                    },
                  ],
                }}
              />
            )}
          </ThemeProvider>
        </Grid>
      </div>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
      <br />
      <Container>
        <Footer />
      </Container>
    </DashboardLayout>
  );
}

export default DemandStat;
