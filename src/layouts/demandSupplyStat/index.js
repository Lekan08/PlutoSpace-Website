import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Footer from "examples/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MixedChart from "examples/Charts/MixedChart";

function DemandSupply() {
  const navigate = useNavigate();
  const { allGHeaders: miHeaders } = GHeaders();
  const [supply, setSupply] = useState([]);
  const [demand, setDemand] = useState([]);
  const [LDemand, setLDemand] = useState([]);
  const [LSupply, setLSupply] = useState([]);
  const [DemandGraph, setDemandGraph] = useState([]);
  const [SupplyGraph, setSupplyGraph] = useState([]);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const year = Date.parse(new Date());
    console.log(year);
    let isMounted = true;
    const month = new Date().getMonth();
    if (data11 === null) {
      navigate("/authentication/sign-in");
      window.location.reload();
    } else {
      const orgIDs = data11.orgID;
      fetch(`${process.env.REACT_APP_LOUGA_URL}/supply/getForYear/${orgIDs}/${year}`, {
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
            if (result !== null) {
              setSupplyGraph(result);
              const thisMonth = result[month];
              if (thisMonth.supplies !== null && thisMonth.supplies !== "null") {
                setLSupply(thisMonth.supplies.length);
              } else {
                setLSupply(0);
              }
              setSupply(result[month]);

              console.log(SupplyGraph);
            }
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const year = Date.parse(new Date());
    const month = new Date().getMonth();
    let isMounted = true;
    if (data11 === null) {
      navigate("/authentication/sign-in");
      window.location.reload();
    } else {
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
            if (result !== null) {
              setDemandGraph(result);
              setDemand(result[month]);
              const demandThisMonth = result[month];
              if (demandThisMonth.demands !== null && demandThisMonth.demands !== "null") {
                setLDemand(demandThisMonth.demands.length);
              } else {
                setLDemand(0);
              }
            }
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <Card style={{ backgroundColor: "#FA2FB5" }}>
              <CardContent>
                <Typography
                  style={{ color: "white" }}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Offset Amount (NGN)
                </Typography>
                {supply.totalPayingAmount > 0 && demand.totalPayingAmount > 0 && (
                  <Typography
                    style={{ color: "white", textAlign: "center" }}
                    variant="h3"
                    component="div"
                  >
                    {(supply.totalPayingAmount - demand.totalPayingAmount).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <></>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Card style={{ backgroundColor: "#31087B" }}>
              <CardContent>
                <Typography
                  style={{ color: "white" }}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Demand/ Supply Stat
                </Typography>
                {LSupply > 0 && LDemand > 0 && (
                  <Typography
                    style={{ color: "white", textAlign: "center" }}
                    variant="h3"
                    component="div"
                  >
                    {LDemand} / {LSupply}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <></>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <ThemeProvider theme={darkTheme}>
              {DemandGraph.length > 0 && SupplyGraph.length > 0 && (
                <MixedChart
                  inkBarStyle={{ backgroundColor: "blue" }}
                  title="Demand/ Supply Chart"
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
                    datasets: [
                      {
                        chartType: "Bar Chart",
                        label: "Demands",
                        color: "success",
                        data: [
                          DemandGraph[0].totalPayingAmount,
                          DemandGraph[1].totalPayingAmount,
                          DemandGraph[2].totalPayingAmount,
                          DemandGraph[3].totalPayingAmount,
                          DemandGraph[4].totalPayingAmount,
                          DemandGraph[5].totalPayingAmount,
                          DemandGraph[6].totalPayingAmount,
                          DemandGraph[7].totalPayingAmount,
                          DemandGraph[8].totalPayingAmount,
                          DemandGraph[9].totalPayingAmount,
                          DemandGraph[10].totalPayingAmount,
                          DemandGraph[11].totalPayingAmount,
                        ],
                      },
                      {
                        chartType: "Bar Chart",
                        label: "Supplies",
                        color: "error",
                        data: [
                          SupplyGraph[0].totalPayingAmount,
                          SupplyGraph[1].totalPayingAmount,
                          SupplyGraph[2].totalPayingAmount,
                          SupplyGraph[3].totalPayingAmount,
                          SupplyGraph[4].totalPayingAmount,
                          SupplyGraph[5].totalPayingAmount,
                          SupplyGraph[6].totalPayingAmount,
                          SupplyGraph[7].totalPayingAmount,
                          SupplyGraph[8].totalPayingAmount,
                          SupplyGraph[9].totalPayingAmount,
                          SupplyGraph[10].totalPayingAmount,
                          SupplyGraph[11].totalPayingAmount,
                        ],
                      },
                    ],
                  }}
                />
              )}
            </ThemeProvider>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </DashboardLayout>
  );
}

export default DemandSupply;
