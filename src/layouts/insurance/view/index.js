import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewInsurance() {
  const navigate = useNavigate();

  const { allGHeaders: miHeaders } = GHeaders();

  const [clientTypex, setClientType] = useState(0);
  const [clientName, setClientName] = useState("");
  const [itemWorthx, setItemWorth] = useState("");
  const [typex, setTypex] = useState("");
  const [planx, setPlanx] = useState("");
  const [itemx, setItem] = useState("");
  const [accountOwnerx, setAccountOwner] = useState("");
  const [statusx, setStatus] = useState("");
  const [terminatedByName, setTerminatedByName] = useState("");
  const [terminatedTimex, setTerminatedTime] = useState("");
  const [createdTimex, setCreatedTime] = useState("");
  const [terminatingCommentx, setTerminatingComment] = useState("");

  const [opened, setOpened] = useState(false);

  //  const scrollContainerStyle = { width: "100%", maxHeight: "60%" };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "black",
  }));

  // Method to fetch particular insurance
  useEffect(() => {
    setOpened(true);
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
          // eslint-disable-next-line eqeqeq
          if (result.length != 0) {
            setClientType(result[0].clientType);
            setClientName(result[0].clientName);
            setTypex(result[0].type.name);
            setPlanx(result[0].plan.title);
            setItem(result[0].item);
            setItemWorth(result[0].itemWorth);
            setAccountOwner(result[0].accountOwnerName);
            setCreatedTime(result[0].createdTime);
            setStatus(result[0].status);
            setTerminatedTime(result[0].terminatedTime);
            setTerminatingComment(result[0].terminatingComment);
            setTerminatedByName(result[0].terminatedByName);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    if (timestamp <= 0) return "";
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  // Method to change display for status
  const changeStatus = (status) => {
    if (status === 0) {
      return "Running";
    }
    return "Terminated";
  };

  const changeCol = (status) => {
    if (status === 0) {
      return "#0096FF";
    }
    return "#FF0000";
  };

  // Method to change display for client type
  const changeTypeDisplay = (value) => {
    if (value === 1) {
      return "Individual";
    }

    return "Corporate";
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox>
          <Container>
            <div className="row">
              <div className="col-sm-12">
                <Card style={{ backgroundColor: "#A0CEF7" }}>
                  <MDBox pt={4} pb={3} px={10}>
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
                      <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                        View Insurance
                      </MDTypography>
                    </MDBox>
                    <MDBox component="form" role="form">
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Item>
                              <h5>To Insure *</h5>
                              {itemx}
                            </Item>
                          </Grid>
                          <Grid item xs={6}>
                            <Item>
                              <h5>Item Worth * (NGN)</h5>
                              {itemWorthx}
                            </Item>
                          </Grid>
                          <Grid item xs={3}>
                            <Item>
                              <h5>Status</h5>
                              <span
                                className="badge badge-pill"
                                style={{ backgroundColor: changeCol(statusx) }}
                              >
                                {changeStatus(statusx)}
                              </span>
                            </Item>
                          </Grid>
                          <Grid item xs={3}>
                            <Item>
                              <h5>Client Type</h5> {changeTypeDisplay(clientTypex)}
                            </Item>
                          </Grid>
                          <Grid item xs={6}>
                            <Item>
                              <h5>Client</h5> {clientName}
                            </Item>
                          </Grid>
                          <Grid item xs={6}>
                            <Item>
                              <h5>Insurance Type *</h5>
                              {typex}
                            </Item>
                          </Grid>
                          <Grid item xs={6}>
                            <Item>
                              <h5>Insurance Plan *</h5>
                              {planx}
                            </Item>
                          </Grid>
                          <Grid item xs={3}>
                            <Item>
                              <h5>Date Created</h5>
                              {changeDate(createdTimex)}
                            </Item>
                          </Grid>
                          <Grid item xs={6}>
                            <Item>
                              <h5>Terminated By</h5>
                              {terminatedByName}
                            </Item>
                          </Grid>
                          <Grid item xs={3}>
                            <Item>
                              {" "}
                              <h5>Date Terminated</h5>
                              {changeDate(terminatedTimex)}
                            </Item>
                          </Grid>
                          <Grid item xs={12}>
                            <Item>
                              <h5>Terminating Comment</h5>
                              {terminatingCommentx}
                            </Item>
                          </Grid>
                          <Grid item xs={6}>
                            <Item>
                              <h5>Account Owner *</h5>
                              {accountOwnerx}
                            </Item>
                          </Grid>
                          <Grid item xs={6} />
                        </Grid>
                      </Box>
                    </MDBox>
                  </MDBox>
                </Card>
              </div>
            </div>
          </Container>
        </MDBox>
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default ViewInsurance;
