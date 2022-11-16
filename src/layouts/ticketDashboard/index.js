import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import Footer from "examples/Footer";
import MixedChart from "examples/Charts/MixedChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GHeaders from "getHeader";
import { useReactToPrint } from "react-to-print";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import PDF from "layouts/announcement-Dashboard/pdf";
// import Backdrop from "@mui/material/Backdrop";

export default function TicketDashboard() {
  //   const MySwal = withReactContent(Swal);
  const { allPHeaders: myHeaders } = PHeaders();
  //   const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  const [ticketCreated, setTicketCreated] = useState("");
  const [ticketCurrOpened, setTicketCurrOpened] = useState("");
  const [ticketASS, setTicketAss] = useState("");
  const [ticketUnASS, setTicketUnAss] = useState("");
  const [show, setShow] = useState(false);
  const [isResolved, setIsResolved] = useState("");
  const [averageRating, setAverageRating] = useState("");
  const [graphx, setGraph] = useState([]);
  const [namex, setName] = useState("");
  const { allGHeaders: miHeaders } = GHeaders();
  const onBeforeGetContentResolve = useRef();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    // const headers = myHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    const date = new Date();
    const endTimex = date.setHours(23, 59, 59, 999);
    const startTimex = date.setHours(0, 0, 0, 0);

    const raw = JSON.stringify({
      orgID: orgIDs,
      startTime: startTimex,
      endTime: endTimex,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/tickets/getFiltered`, requestOptions)
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
          // setSupply(result);
          if (result.length > 0) {
            setTicketCreated(result);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // const headers = myHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    const date = new Date();
    const endTimex = new Date().getTime();
    const startTimex = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const raw = JSON.stringify({
      orgID: orgIDs,
      startTime: startTimex,
      endTime: endTimex,
      isOpen: "Y",
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/tickets/getFiltered`, requestOptions)
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
          // setSupply(result);
          if (result.length > 0) {
            setTicketCurrOpened(result);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // const headers = myHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    const date = new Date();
    const endTimex = new Date().getTime();
    const startTimex = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const isAssignedx = data11.personalID;

    const raw = JSON.stringify({
      orgID: orgIDs,
      startTime: startTimex,
      endTime: endTimex,
      agentID: isAssignedx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/tickets/getFiltered`, requestOptions)
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
          // setSupply(result);
          if (result.length > 0) {
            setTicketAss(result);
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
    const empID = data11.personalID;
    const date = new Date();
    const endTimex = new Date().getTime();
    const startTimex = new Date(date.getFullYear(), date.getMonth(), 1).getTime();

    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_SHASHA_URL}/chatRatings/getAgentAverageRating/${orgIDs}/${empID}?startTime=${startTimex}&endTime=${endTimex}`,
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
          console.log(result);
          setAverageRating(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // const headers = myHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    const date = new Date();
    const endTimex = new Date().getTime();
    const startTimex = new Date(date.getFullYear(), date.getMonth(), 1).getTime();

    const raw = JSON.stringify({
      orgID: orgIDs,
      startTime: startTimex,
      endTime: endTimex,
      isAssigned: "N",
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/tickets/getFiltered`, requestOptions)
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
          // setSupply(result);
          if (result.length > 0) {
            setTicketUnAss(result);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    const date = new Date();
    const endTimex = new Date().getTime();
    const startTimex = new Date(date.getFullYear(), date.getMonth(), 1).getTime();

    const raw = JSON.stringify({
      orgID: orgIDs,
      startTime: startTimex,
      endTime: endTimex,
      isResolved: "Y",
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/tickets/getFiltered`, requestOptions)
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
          // setSupply(result);
          if (result.length > 0) {
            setIsResolved(result);
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
    const yearTime = new Date().getTime();
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/tickets/getDashboardGraph/${orgIDs}/${yearTime}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
      })
      .then((result) => {
        console.log(result);
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
          setGraph(result);
          console.log(result);
          // eslint-disable-next-line no-restricted-syntax
          // for (const key in graph) {
          //   TA.push(graph[key].totalCreated);
          //   TR.push(graph[key].totalResolved);
          // }

          console.log(averageRating);
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
          console.log(result);
          setName(result[0].name);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={1}>
        <div align="center">
          <MDBox mt={2} mb={2}>
            <MDButton variant="gradient" onClick={handlePrint} color="info" width="50%">
              Print Page
            </MDButton>
          </MDBox>
        </div>
      </MDBox>
      <div ref={componentRef} style={{ width: "100%", height: window.innerHeight }}>
        {show ? <PDF namexxx={namex} /> : ""}
        &nbsp;
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <Card style={{ backgroundColor: "#187498" }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} style={{ color: "white" }} gutterBottom>
                    Today&apos;s Ticket (s)
                  </Typography>
                  <Typography
                    style={{ color: "white", textAlign: "center" }}
                    variant="h3"
                    component="div"
                  >
                    {ticketCreated.length.toLocaleString(undefined)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button style={{ color: "white" }} size="small">
                    <></>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card style={{ backgroundColor: "#36AE7C" }}>
                <CardContent>
                  <Typography
                    style={{ color: "white" }}
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Open Ticket (s)
                  </Typography>
                  <Typography
                    style={{ color: "white", textAlign: "center" }}
                    variant="h3"
                    component="div"
                  >
                    {ticketCurrOpened.length.toLocaleString(undefined)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button style={{ color: "white" }} size="small">
                    <></>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card style={{ backgroundColor: "#C1224F" }}>
                <CardContent>
                  <Typography
                    style={{ color: "white" }}
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Assigned To Me
                  </Typography>
                  <Typography
                    style={{ color: "white", textAlign: "center" }}
                    variant="h3"
                    component="div"
                  >
                    {ticketASS.length.toLocaleString(undefined)}
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
            <Grid item xs={12} md={6} lg={3}>
              <Card style={{ backgroundColor: "#EB5353" }}>
                <CardContent>
                  <Typography
                    style={{ color: "white" }}
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Uassigned Ticket (s)
                  </Typography>
                  <Typography
                    style={{ color: "white", textAlign: "center" }}
                    variant="h3"
                    component="div"
                  >
                    {ticketUnASS.length.toLocaleString(undefined)}
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
              <Card style={{ backgroundColor: "#17139C" }}>
                <CardContent>
                  <Typography
                    style={{ color: "white" }}
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Ticket Resolved
                  </Typography>
                  <Typography
                    style={{ color: "white", textAlign: "center" }}
                    variant="h3"
                    component="div"
                  >
                    {isResolved.length.toLocaleString(undefined)}
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
              <Card style={{ backgroundColor: "#FA9856" }}>
                <CardContent>
                  <Typography
                    style={{ color: "white" }}
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Monthly Average Rating
                  </Typography>
                  <Typography
                    style={{ color: "white", textAlign: "center" }}
                    variant="h3"
                    component="div"
                  >
                    <></>
                    {averageRating.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button style={{ color: "white" }} size="small">
                    <></>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <ThemeProvider theme={darkTheme}>
                {graphx.length > 0 && (
                  <MixedChart
                    inkBarStyle={{ backgroundColor: "blue" }}
                    title="Ticket's Chart"
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
                          label: "Total Ticket Created",
                          color: "success",
                          data: [
                            graphx[0].totalCreated,
                            graphx[1].totalCreated,
                            graphx[2].totalCreated,
                            graphx[3].totalCreated,
                            graphx[4].totalCreated,
                            graphx[5].totalCreated,
                            graphx[6].totalCreated,
                            graphx[7].totalCreated,
                            graphx[8].totalCreated,
                            graphx[9].totalCreated,
                            graphx[10].totalCreated,
                            graphx[11].totalCreated,
                          ],
                        },
                        {
                          chartType: "Bar Chart",
                          label: "Ticket's Resolved",
                          color: "info",
                          data: [
                            graphx[0].totalResolved,
                            graphx[1].totalResolved,
                            graphx[2].totalResolved,
                            graphx[3].totalResolved,
                            graphx[4].totalResolved,
                            graphx[5].totalResolved,
                            graphx[6].totalResolved,
                            graphx[7].totalResolved,
                            graphx[8].totalResolved,
                            graphx[9].totalResolved,
                            graphx[10].totalResolved,
                            graphx[11].totalResolved,
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
      </div>
      <Footer />
    </DashboardLayout>
  );
}
