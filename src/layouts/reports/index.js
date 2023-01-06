import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import MDButton from "components/MDButton";
// import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Swal from "sweetalert2";
// import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CardContent from "@mui/material/CardContent";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import Modal from "@mui/material/Modal";
import Styles from "styles";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import withReactContent from "sweetalert2-react-content";

function Reports() {
  //   const MySwal = withReactContent(Swal);
  const [opened, setOpened] = useState(false);
  const [open, setOpen] = useState(false);

  const [allx, setAll] = useState([]);
  const [showButton, setShowButton] = useState("");
  const [startTimex, setStartTime] = useState("");
  const [endTimex, setEndTimexx] = useState("");
  const [checkedStartTime, setCheckedStartTime] = useState(false);
  const [checkedEndTime, setCheckedEndTime] = useState(false);
  console.log(allx);

  const handleCloseModal = () => {
    setOpen(false);
    setEndTimexx("");
    setStartTime("");
  };
  const navigate = useNavigate();
  const { allGHeaders: miHeaders } = GHeaders();

  const handleTime = (valuex) => {
    console.log(valuex);
    const sTime = new Date(valuex).getTime();
    if (!sTime) {
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("startTimex").innerHTML = "Select a Start Time <br>";

      setCheckedStartTime(false);
    }
    if (sTime) {
      console.log("working2222222");
      setCheckedStartTime(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("startTimex").innerHTML = " ";
    }
  };

  const handleTimex = (valuex) => {
    console.log(valuex);
    const ETime = new Date(valuex).getTime();
    if (!ETime) {
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("endTimex").innerHTML = "Select End Time <br>";

      setCheckedEndTime(false);
    }
    if (ETime) {
      console.log("working2222222");
      setCheckedEndTime(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("endTimex").innerHTML = " ";
    }
  };

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    let isMounted = true;
    fetch(`${process.env.REACT_APP_koka_URL}/businessTravels/getByIds/${ids}`, {
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
          if (result.length !== 0) {
            setAll(result[0].employeesName);
          } else {
            setOpened(false);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  //   const handleRemove = (value) => {
  //     const queryString = window.location.search;
  //     const urlParams = new URLSearchParams(queryString);
  //     const ids = urlParams.get("id");
  //     const headers = miHeaders;

  //     fetch(`${process.env.REACT_APP_SHASHA_URL}/businessTravels/removeParticipant/${ids}/${value}`, {
  //       headers,
  //     })
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         const resultres = await res.text();
  //         if (resultres === null || resultres === undefined || resultres === "") {
  //           return {};
  //         }
  //         return JSON.parse(resultres);
  //       })
  //       .then((result) => {
  //         // setOpened(false);
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
  //         MySwal.fire({
  //           title: result.status,
  //           type: "success",
  //           text: result.message,
  //         }).then(() => {
  //           window.location.reload();
  //         });
  //       })
  //       .catch((error) => {
  //         setOpened(false);
  //         MySwal.fire({
  //           title: error.status,
  //           type: "error",
  //           text: error.message,
  //         });
  //       });
  //   };
  //   const colors = ["#00C49F", "#0088FE", "#EB5353", "#187498", "#36AE7C"];

  // MODAL STYLE
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
    bgcolor: "#ffffff",
    border: "3px solid #5F9DF7",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    height: "55%",
    display: "flex",
    "&::-webkit-scrollbar": {
      width: 20,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "white",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#f5f5f5",
      borderRadius: 10,
    },
  };

  const handleOpenModal = (num) => {
    console.log(num);
    const number = Number(num);
    console.log(number);
    setOpen(true);
    setShowButton(number);
  };

  const handleReport = () => {
    if (showButton === 1) {
      console.log("asset report");
      console.log(startTimex);
      console.log(endTimex);
      console.log(checkedStartTime);
      console.log(checkedEndTime);
    } else if (showButton === 2) {
      console.log("company report");
    } else if (showButton === 3) {
      console.log("insurance report");
    } else if (showButton === 4) {
      console.log("sales1 report");
    } else if (showButton === 5) {
      console.log("sales2 report");
    } else if (showButton === 6) {
      console.log("sales3 report");
    } else if (showButton === 7) {
      console.log("financial1 report");
    } else if (showButton === 8) {
      console.log("financial2 report");
    } else if (showButton === 9) {
      console.log("financial3 report");
    }
  };

  const handleValidate = (e) => {
    handleTime(startTimex);
    handleTimex(endTimex);
    if (checkedStartTime && checkedEndTime === true) {
      handleReport(e);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ padding: "10px" }}>
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
              REPORTS
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
      &nbsp; &nbsp;
      <Card style={{ padding: "10px", paddingTop: "10px" }}>
        <MDTypography textAlign="center" variant="h4" fontWeight="medium" color="secondary" mt={1}>
          ASSETS REPORTS
        </MDTypography>
        &nbsp; &nbsp;
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#3F0071",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
                onClick={() => handleOpenModal(1)}
              >
                <CardContent>
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    ASSET REPORT
                  </Typography>
                </CardContent>
              </Card>
              &nbsp; &nbsp;
            </Grid>
          </Grid>
        </Box>
      </Card>
      &nbsp; &nbsp;
      <Card style={{ padding: "10px", paddingTop: "10px" }}>
        <MDTypography textAlign="center" variant="h4" fontWeight="medium" color="secondary" mt={1}>
          COMPANY REPORTS
        </MDTypography>
        &nbsp; &nbsp;
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#FB2576",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
                onClick={() => handleOpenModal(2)}
              >
                <CardContent>
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    COMPANY REPORTS
                  </Typography>
                </CardContent>
              </Card>
              &nbsp; &nbsp;
            </Grid>
          </Grid>
        </Box>
      </Card>
      &nbsp; &nbsp;
      <Card style={{ padding: "10px", paddingTop: "10px" }}>
        <MDTypography textAlign="center" variant="h4" fontWeight="medium" color="secondary" mt={1}>
          INSURANCE REPORTS
        </MDTypography>
        &nbsp; &nbsp;
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#EB5353",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
                onClick={() => handleOpenModal(3)}
              >
                <CardContent>
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    INSURANCE REPORTS
                  </Typography>
                </CardContent>
              </Card>
              &nbsp; &nbsp;
            </Grid>
          </Grid>
        </Box>
      </Card>
      &nbsp; &nbsp;
      <Card style={{ padding: "10px" }}>
        <MDTypography textAlign="center" variant="h4" fontWeight="medium" color="secondary" mt={1}>
          FINANCIAL REPORTS
        </MDTypography>
        &nbsp; &nbsp;
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#EB5353",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    Sales Reports
                  </Typography>
                </CardContent>
              </Card>
              &nbsp; &nbsp;
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#C1224F",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    Sales Reports
                  </Typography>
                </CardContent>
              </Card>
              &nbsp; &nbsp;
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#EB5353",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    Sales Reports
                  </Typography>
                </CardContent>
              </Card>
              &nbsp; &nbsp;
            </Grid>
          </Grid>
        </Box>
      </Card>
      &nbsp; &nbsp;
      <Card style={{ padding: "10px" }}>
        <MDTypography textAlign="center" variant="h4" fontWeight="medium" color="secondary" mt={1}>
          SALES REPORTS
        </MDTypography>
        &nbsp; &nbsp;
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#36AE7C",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  {/* <Typography sx={{ fontSize: 14 }} style={{ color: "white" }} gutterBottom>
                    Participant
                  </Typography> */}
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    BY REVENUE
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
                </CardActions> */}
              </Card>
              &nbsp; &nbsp;
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#FA9856",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  {/* <Typography sx={{ fontSize: 14 }} style={{ color: "white" }} gutterBottom>
                    Participant
                  </Typography> */}
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    BY QUANTITY
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
                </CardActions> */}
              </Card>
              &nbsp; &nbsp;
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#17139C",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  {/* <Typography sx={{ fontSize: 14 }} style={{ color: "white" }} gutterBottom>
                    Participant
                  </Typography> */}
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    DAILY SALES
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
                </CardActions> */}
              </Card>
              &nbsp; &nbsp;
            </Grid>
          </Grid>
        </Box>
      </Card>
      <div>
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <HighlightOffIcon
                  onClick={handleCloseModal}
                  fontSize="large"
                  style={{
                    // display: "flex",
                    padding: "5px",
                    color: "red",
                    float: "right",
                    position: "absolute",
                    left: 495,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    cursor: "pointer",
                  }}
                />
                <MDBox pt={1} pb={1} px={2}>
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
                      Select Timeframe
                    </MDTypography>
                  </MDBox>
                  <MDBox
                    mt={2}
                    mb={2}
                    sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                  >
                    <MDTypography variant="gradient" fontSize="60%" color="error" id="startTimex">
                      {" "}
                    </MDTypography>
                    <MDTypography variant="gradient" fontSize="60%" color="error" id="endTimex">
                      {" "}
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <div
                  style={{
                    display: "grid",
                    placeContent: "center",
                  }}
                >
                  <div className="col-sm-6">
                    <TextField
                      id="datetime-local"
                      label="Start Time *"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={startTimex}
                      onChange={(e) => setStartTime(e.target.value)}
                      onInput={(e) => handleTime(e.target.value)}
                      sx={{
                        width: 250,
                      }}
                    />
                  </div>
                </div>
                &nbsp; &nbsp;
                <div
                  style={{
                    display: "grid",
                    placeContent: "center",
                  }}
                >
                  <div className="col-sm-6">
                    <TextField
                      id="datetime-local"
                      label="End Time *"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={endTimex}
                      onChange={(e) => setEndTimexx(e.target.value)}
                      onInput={(e) => handleTimex(e.target.value)}
                      sx={{
                        width: 250,
                      }}
                    />
                  </div>
                </div>
                <MDBox mt={4} mb={1}>
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      onClick={handleValidate}
                      //   color="info"
                      style={Styles.buttonSx}
                      width="50%"
                      align="left"
                    >
                      Generate
                    </MDButton>
                  </MDBox>
                </MDBox>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default Reports;
