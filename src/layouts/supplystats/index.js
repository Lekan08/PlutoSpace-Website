import React, { useState, useEffect } from "react";
// import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// eslint-disable-next-line no-unused-vars
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import Chip from "@mui/material/Chip";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Footer from "examples/Footer";
import Barch from "layouts/supplystats/chart/bar";

// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

function Supplystat() {
  const navigate = useNavigate();
  const { allGHeaders: miHeaders } = GHeaders();
  const [opened, setOpened] = useState(false);
  const [totalSupply, setTotalSupply] = useState([]);
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const year = Date.parse(new Date());
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
            setTotalSupply(result[month]);
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
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4} lg={4}>
            <Card style={{ backgroundColor: "#187498" }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} style={{ color: "white" }} gutterBottom>
                  Total supply Requests
                </Typography>
                <Typography
                  style={{ color: "white", textAlign: "center" }}
                  variant="h3"
                  component="div"
                >
                  {totalSupply.totalRequests}
                </Typography>
              </CardContent>
              <CardActions>
                <Button style={{ color: "white" }} size="small">
                  <></>
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6} md={4} lg={4}>
            <Card style={{ backgroundColor: "#36AE7C" }}>
              <CardContent>
                <Typography
                  style={{ color: "white" }}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Total supply Amount
                </Typography>
                <Typography
                  style={{ color: "white", textAlign: "center" }}
                  variant="h3"
                  component="div"
                >
                  {totalSupply.totalTotalAmount}
                </Typography>
              </CardContent>
              <CardActions>
                <Button style={{ color: "white" }} size="small">
                  <></>
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6} md={4} lg={4}>
            <Card style={{ backgroundColor: "#C1224F" }}>
              <CardContent>
                <Typography
                  style={{ color: "white" }}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Total supply Bonus (NGN)
                </Typography>
                <Typography
                  style={{ color: "white", textAlign: "center" }}
                  variant="h3"
                  component="div"
                >
                  {totalSupply.totalTotalAmount}
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
          <Grid item xs={6} md={6} lg={6}>
            <Card style={{ backgroundColor: "#EB5353" }}>
              <CardContent>
                <Typography
                  style={{ color: "white" }}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Total supply Bonus (NGN)
                </Typography>
                <Typography
                  style={{ color: "white", textAlign: "center" }}
                  variant="h3"
                  component="div"
                >
                  {totalSupply.totalBonusAmount}
                </Typography>
              </CardContent>
              <CardActions>
                <Button style={{ color: "white" }} size="small">
                  <></>
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={6} md={6} lg={6}>
            <Card style={{ backgroundColor: "#17139C" }}>
              <CardContent>
                <Typography
                  style={{ color: "white" }}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Total VAT Amount (NGN)
                </Typography>
                <Typography
                  style={{ color: "white", textAlign: "center" }}
                  variant="h3"
                  component="div"
                >
                  {totalSupply.totalVatAmount}
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
        &nbsp; &nbsp;
      </Box>
      <div style={{ marginRight: 20 }}>
        <Barch />
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

export default Supplystat;
