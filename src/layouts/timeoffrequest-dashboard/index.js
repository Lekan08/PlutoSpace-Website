import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
// import PieChart from "examples/Charts/PieChart";
import { useNavigate } from "react-router-dom";
import Footer from "examples/Footer";
import MixedChart from "examples/Charts/MixedChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GHeaders from "getHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import PHeaders from "postHeader";
import { useReactToPrint } from "react-to-print";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import PDF from "layouts/businesstravel-dashboard/pdf";

export default function TimeOffRequestsDashboard() {
  //   const MySwal = withReactContent(Swal);
  //   const { allPHeaders: myHeaders } = PHeaders();
  //   const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  const [graphx, setGraph] = useState([]);
  // const [piex, setPie] = useState([]);
  const { allGHeaders: miHeaders } = GHeaders();
  const { allPHeaders: myHeaders } = PHeaders();
  //   const [itemsx, setItems] = useState([]);
  //   const [allx, setAll] = useState([]);
  const [pCard, setPCard] = useState("");
  const [aCard, setACard] = useState("");
  const [aEOL, setAEOL] = useState("");
  const [namex, setName] = useState("");
  const [show, setShow] = useState(false);
  const onBeforeGetContentResolve = useRef();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    // const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;

    const date = new Date();
    // const yearTime = new Date().getTime();
    const endTimex = new Date().getTime();
    const startTimex = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const raw = JSON.stringify({
      orgID: orgIDs,
      startTime: startTimex,
      endTime: endTimex,
      empID: personalIDs,
      //   type: "string",
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/getTimeOffRequestStartsAcrossTheYear`,
      requestOptions
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
        console.log(result);
        if (isMounted) {
          if (result.length !== 0) {
            setGraph(result);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;

    const date = new Date();
    // const yearTime = new Date().getTime();
    const endTimex = new Date().getTime();
    const startTimex = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const raw = JSON.stringify({
      orgID: orgIDs,
      startTime: startTimex,
      endTime: endTimex,
      empID: personalIDs,
      //   type: "string",
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/getTotalEmployeesOnTimeOff`,
      requestOptions
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
        console.log(result);
        if (isMounted) {
          if (result.length !== 0) {
            setPCard(result);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    // const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    // const personalIDs = data11.personalID;

    const date = new Date();
    // const yearTime = new Date().getTime();
    const endTimex = new Date().getTime();
    const startTimex = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const raw = JSON.stringify({
      orgID: orgIDs,
      startTime: startTimex,
      endTime: endTimex,
      empID: 0,
      //   type: "string",
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/getTotalEmployeesOnTimeOff`,
      requestOptions
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
        console.log(result);
        if (isMounted) {
          if (result.length !== 0) {
            setACard(result);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;

    const date = new Date();
    // const yearTime = new Date().getTime();
    const endTimex = new Date().getTime();
    const startTimex = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const raw = JSON.stringify({
      orgID: orgIDs,
      startTime: startTimex,
      endTime: endTimex,
      empID: personalIDs,
      //   type: "string",
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/getApprovedVsCompleted`,
      requestOptions
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
        console.log(result);
        if (isMounted) {
          //   if (result.length !== 0) {
          //     setGraph(result);
          //   }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    // const personalIDs = data11.personalID;

    const date = new Date();
    // const yearTime = new Date().getTime();
    const endTimex = new Date().getTime();
    const startTimex = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const raw = JSON.stringify({
      orgID: orgIDs,
      startTime: startTimex,
      endTime: endTimex,
      empID: 0,
      //   type: "string",
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/getTotalTimeOffTransaction`,
      requestOptions
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
        console.log(result);
        if (isMounted) {
          if (result.length !== 0) {
            setAEOL(result);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  //   useEffect(() => {
  //     const headers = miHeaders;
  //     const data11 = JSON.parse(localStorage.getItem("user1"));
  //     const orgIDs = data11.orgID;

  //     const date = new Date();
  //     const endTimex = new Date().getTime();
  //     const startTimex = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  //     let isMounted = true;
  //     fetch(
  //       `${process.env.REACT_APP_SHASHA_URL}/businessTravels/getTotalActualStats/${orgIDs}/${startTimex}/${endTimex}`,
  //       {
  //         headers,
  //       }
  //     )
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         return res.json();
  //       })
  //       .then((result) => {
  //         if (result.message === "Expired Access") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (result.message === "Token Does Not Exist") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (result.message === "Unauthorized Access") {
  //           navigate("/authentication/forbiddenPage");
  //           window.location.reload();
  //         }
  //         console.log(result);
  //         if (isMounted) {
  //           if (result !== {}) {
  //             setAll(result);
  //             const responseLabel = [];
  //             const numberData = [];
  //             const bgColorCode = [];
  //             setItems(result);
  //             // eslint-disable-next-line array-callback-return
  //             itemsx.map((datax) => {
  //               let colorCodeee = "#";
  //               const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  //               colorCodeee += randomColor;

  //               numberData.push(datax.total);
  //               responseLabel.push(datax.name);
  //               bgColorCode.push(colorCodeee);
  //             });

  //             // const allDataa = {
  //             //   labels: responseLabel,
  //             //   data: numberData,
  //             //   backgroundColor: bgColorCode,
  //             // };
  //             console.log(result);
  //             // setPie(allDataa);
  //           }
  //         }
  //       });
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);

  // const colors = ["#00C49F", "#0088FE", "#EB5353", "#187498", "#36AE7C"];

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
    documentTitle: "Time-Off_Dashboard",
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
          console.log(result);
          setName(result[0].name);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: "Business_Travel_Dashboard",
  // });

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
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <Card style={{ backgroundColor: "#17139C" }}>
                <CardContent>
                  <Typography
                    style={{ color: "white" }}
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Leave Completed
                  </Typography>
                  <Typography
                    style={{ color: "white", textAlign: "center" }}
                    variant="h3"
                    component="div"
                  >
                    {pCard}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card style={{ backgroundColor: "#FA9856" }}>
                <CardContent>
                  <Typography
                    style={{ color: "white" }}
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Leave Completed For All Users
                  </Typography>
                  <Typography
                    style={{ color: "white", textAlign: "center" }}
                    variant="h3"
                    component="div"
                  >
                    <></>
                    {aCard}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card style={{ backgroundColor: "#00C49F" }}>
                <CardContent>
                  <Typography
                    style={{ color: "white" }}
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Employees That Went on Leave
                  </Typography>
                  <Typography
                    style={{ color: "white", textAlign: "center" }}
                    variant="h3"
                    component="div"
                  >
                    <></>
                    {aEOL}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}> */}
            {/* <Grid item xs={12} md={6} lg={6}>
            <Card style={{ backgroundColor: "#00C49F" }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} style={{ color: "white" }} gutterBottom>
                  Total Employees That Went on Leave
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  style={{ color: "white", textAlign: "center" }}
                >
                  {aEOL}
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button
                  onClick={() => handleRemove(api.id)}
                  style={{ color: "white" }}
                  startIcon={<DeleteIcon />}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
            &nbsp; &nbsp;
          </Grid> */}
            {/* </Grid>
          </Box> */}
            <Grid item xs={12} md={12} lg={12}>
              <ThemeProvider theme={darkTheme}>
                {graphx.length > 0 && (
                  <MixedChart
                    inkBarStyle={{ backgroundColor: "blue" }}
                    title="Time-Off Requests"
                    description="Leave Time-Off"
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
                      datasets: {
                        chartType: "Bar Chart",
                        label: "Total Recall",
                        color: "success",
                        data: [
                          graphx[0].total,
                          graphx[1].total,
                          graphx[2].total,
                          graphx[3].total,
                          graphx[4].total,
                          graphx[5].total,
                          graphx[6].total,
                          graphx[7].total,
                          graphx[8].total,
                          graphx[9].total,
                          graphx[10].total,
                          graphx[11].total,
                        ],
                      },
                      //   {
                      //     chartType: "Bar Chart",
                      //     label: "Total Expected Amount",
                      //     color: "info",
                      //     data: [
                      //       graphx[0].totalExpectedAmount,
                      //       graphx[1].totalExpectedAmount,
                      //       graphx[2].totalExpectedAmount,
                      //       graphx[3].totalExpectedAmount,
                      //       graphx[4].totalExpectedAmount,
                      //       graphx[5].totalExpectedAmount,
                      //       graphx[6].totalExpectedAmount,
                      //       graphx[7].totalExpectedAmount,
                      //       graphx[8].totalExpectedAmount,
                      //       graphx[9].totalExpectedAmount,
                      //       graphx[10].totalExpectedAmount,
                      //       graphx[11].totalExpectedAmount,
                      //     ],
                      //   },
                    }}
                  />
                )}
              </ThemeProvider>
            </Grid>
            {/* <Grid item xs={12} md={12} lg={12}>
            <ThemeProvider theme={darkTheme}>
              {graphx.length > 0 && (
                <MixedChart
                  inkBarStyle={{ backgroundColor: "blue" }}
                  title="Business Travels Chart"
                  description="Total Actual Days And Total Expected Days Insights"
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
                        label: "Total Actual Days",
                        color: "success",
                        data: [
                          graphx[0].totalActualDays,
                          graphx[1].totalActualDays,
                          graphx[2].totalActualDays,
                          graphx[3].totalActualDays,
                          graphx[4].totalActualDays,
                          graphx[5].totalActualDays,
                          graphx[6].totalActualDays,
                          graphx[7].totalActualDays,
                          graphx[8].totalActualDays,
                          graphx[9].totalActualDays,
                          graphx[10].totalActualDays,
                          graphx[11].totalActualDays,
                        ],
                      },
                      {
                        chartType: "Bar Chart",
                        label: "Total Expected Days",
                        color: "info",
                        data: [
                          graphx[0].totalExpectedDays,
                          graphx[1].totalExpectedDays,
                          graphx[2].totalExpectedDays,
                          graphx[3].totalExpectedDays,
                          graphx[4].totalExpectedDays,
                          graphx[5].totalExpectedDays,
                          graphx[6].totalExpectedDays,
                          graphx[7].totalExpectedDays,
                          graphx[8].totalExpectedDays,
                          graphx[9].totalExpectedDays,
                          graphx[10].totalExpectedDays,
                          graphx[11].totalExpectedDays,
                        ],
                      },
                    ],
                  }}
                />
              )}
            </ThemeProvider>
          </Grid> */}
          </Grid>
        </Box>
      </div>
      &nbsp; &nbsp;
      <Footer />
    </DashboardLayout>
  );
}
