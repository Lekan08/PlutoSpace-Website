import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import PieChart from "examples/Charts/PieChart";
import { useNavigate } from "react-router-dom";
import Footer from "examples/Footer";
// import MixedChart from "examples/Charts/MixedChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GHeaders from "getHeader";
import { useReactToPrint } from "react-to-print";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import PDF from "layouts/announcement-Dashboard/pdf";
import Styles from "styles";

export default function AppraisalDashboard() {
  const navigate = useNavigate();
  // const [graphx, setGraph] = useState([]);
  const [chartData, setChartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Total Appraisal Created",
        color: "success",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  });
  const [namex, setName] = useState("");
  const [pieChartData, setPieChartData] = useState({
    labels: ["No Grade"],
    datasets: {
      label: "Appraisal Grades",
      backgroundColors: ["#333"],
      data: [100],
    },
  });
  const [show, setShow] = useState(false);
  const { allGHeaders: miHeaders } = GHeaders();
  const onBeforeGetContentResolve = useRef();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    const yearTime = new Date().getTime();
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_SHASHA_URL}/appraisal/getAppraisalStatsForTheYear/${orgIDs}/${yearTime}`,
      {
        headers,
      }
    )
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
          console.log({ appraisalStatForTheYear: result });
          if (result.length > 0) {
            const array1 = [];
            // eslint-disable-next-line array-callback-return
            result.map((each) => {
              array1.push({ ...each, name: each.name === null ? "No Name" : each.name });
            });
            console.log({ array1 });
            const dataa = {
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
                  label: "Total Appraisal Created",
                  color: "success",
                  data: array1.map((each) => each.total),
                },
              ],
            };
            console.log({ dataa });
            console.log({ chartData });
            setChartData(dataa);
            // setGraph(array1);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    const date = new Date();
    const endTimex = new Date().getTime();
    const startTimex = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_SHASHA_URL}/appraisalGrading/getAppraisalStatsForGrade/${orgIDs}/${startTimex}/${endTimex}`,
      {
        headers,
      }
    )
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
          console.log({ resul2: result });
          if (result.length !== 0) {
            const responseLabel = [];
            const numberData = [];
            const bgColorCode = [];
            // eslint-disable-next-line array-callback-return
            result.map((datax) => {
              let colorCodeee = "#";
              const randomColor = Math.floor(Math.random() * 16777215).toString(16);
              colorCodeee += randomColor;

              numberData.push(datax.total);
              responseLabel.push(datax.name);
              bgColorCode.push(colorCodeee);
              if (datax.name === null) {
                responseLabel.push("No Name");
                return;
              }
              responseLabel.push(datax.name);
            });

            const allDataa = {
              labels: responseLabel,
              data: numberData,
              backgroundColor: bgColorCode,
            };
            console.log({ result });
            console.log({ allDataa });
            const piee = {
              labels: allDataa.labels,
              datasets: {
                label: "Appraisal Grades",
                backgroundColors: allDataa.backgroundColor,
                data: allDataa.data,
              },
            };
            setPieChartData(piee);
          }
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

  // To print page
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Appraisal_Dashboard",
    onBeforeGetContent: handleOnBeforeGetContent,
    onAfterPrint: () => window.location.reload(),
  });
  // End of Code

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
          if (result.length > 0) {
            console.log(result);
            setName(result[0].name);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />{" "}
      <MDBox mb={1}>
        <div align="center">
          <MDBox mt={2} mb={2}>
            <MDButton
              variant="gradient"
              onClick={handlePrint}
              // color="info"
              style={Styles.buttonSx}
              width="50%"
            >
              Print Page
            </MDButton>
          </MDBox>
        </div>
      </MDBox>
      <div ref={componentRef} style={{ width: "100%", height: window.innerHeight }}>
        {show ? <PDF namexxx={namex} /> : ""}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <ThemeProvider theme={darkTheme}>
                {/* {chartData.datasets.length > 0 && (
                  <MixedChart
                    inkBarStyle={{ backgroundColor: "blue" }}
                    title="Appraisal's Chart"
                    description="Analytics Insights"
                    chart={chartData}
                  />
                )} */}

                <DefaultLineChart
                  // icon={{ color: "info", component: "leaderboard" }}
                  inkBarStyle={{ backgroundColor: "blue" }}
                  title="Appraisal's Chart"
                  description="Analytics Insights Of Appraisals Done In this Year"
                  chart={chartData}
                />
              </ThemeProvider>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <Card>
                {/* {pieChartData.datasets.length > 0 && ( */}
                <PieChart
                  title="Pie Chart"
                  height="17.125rem"
                  description="Analytics Insights"
                  chart={pieChartData}
                />
                {/* )} */}
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
      &nbsp; &nbsp;
      <Footer />
    </DashboardLayout>
  );
}
