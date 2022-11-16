// // import Card from "@mui/material/Card";
// import { Container, Form, Row, Col } from "react-bootstrap";
// import MDButton from "components/MDButton";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
// import Avatar from "@mui/material/Avatar";
// import Typography from "@mui/material/Typography";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import StepNavigation from "./stepNavigation";
// import GHeaders from "getHeader";
// import PHeaders from "postHeader";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import DatePicker from "react-datepicker";
// import { useNavigate } from "react-router-dom";
// import MDButton from "components/MDButton";
// import DataTable from "examples/Tables/DataTable";
// import OnboardingCompanyTable from "./data";
// import React, { useState } from "react";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-datepicker/dist/react-datepicker.css";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
import Mentor from "./myMentor";
import "./index.css";
import "./App.css";

function OnboardingCompany() {
  const [namex, setName] = useState("");
  const [emailx, setEmail] = useState("");
  const [streetx, setStreet] = useState("");
  const [cityx, setCity] = useState("");
  const [statex, setState] = useState("");
  const [countryx, setCountry] = useState("");
  const [pnox, setPno] = useState("");
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const { allGHeaders: miHeaders } = GHeaders();

  // //   const { columns: pColumns, rows: pRows } = OnboardingCompanyTable();
  // //   const MySwal = withReactContent(Swal);
  // const [opened] = useState(false);
  // const labelArray = [
  //   "Step 1",
  //   "Step 2",
  //   "Step 3",
  //   "Step 4",
  //   "Step 5",
  //   "Step 6",
  //   "Step 7",
  //   "Step 8",
  // ];
  // const [currentStep, updateCurrentStep] = useState(1);
  // function updateStep(step) {
  //   updateCurrentStep(step);
  // }
  // const StyledPaper = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(2),
  //   maxWidth: 400,
  //   color: theme.palette.text.primary,
  // }));
  // const message1 = `YOU ARE WELCOME TO OUR COMPANY🎈🎈🎈🎈. `;
  // const message2 = `HOPE NECCESARY DOCUMENT HAS BEEIN SUBMITED FOR PROCESSING. `;
  // const message3 = `MAKE SURE YOU SEE YOUR MENTOR FOR THE NEXT MEETING. `;
  //         MySwal.fire({
  //           title: resultr.status,
  //           type: "success",
  //           text: resultr.message,
  //         }).then(() => {
  //           window.location.reload();
  //         });
  //       })
  //       .catch((error) => {
  //         MySwal.fire({
  //           title: error.status,
  //           type: "error",
  //           text: error.message,
  //         });
  //       });
  //   };
  useEffect(() => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const headers = miHeaders;

    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/company/get/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultp) => {
        setOpened(false);
        if (resultp.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultp.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultp.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          setName(resultp[0].name);
          setEmail(resultp[0].email);
          setStreet(resultp[0].street);
          setCity(resultp[0].city);
          setState(resultp[0].state);
          setCountry(resultp[0].country);
          setPno(resultp[0].pno);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="warning"
            mx={10}
            p={1}
            mb={0}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white">
              Company Name: {namex}
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="warning"
              mx={10}
              p={1}
              mb={0}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white">
                Address: {streetx}&#44; {cityx}&#44; {statex}&#44; {countryx}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="warning"
              mx={10}
              p={1}
              mb={0}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white">
                Email: {emailx}&#44; Phone Number: {pnox}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </Grid>
      {/* <MDBox mx={10}>
        <Card style={{ width: "900px" }}>
          <MDBox component="form" role="form" mx={10}>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={0}
              mt={2}
              p={1}
              mb={0}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                MY ONBOARDING PROCESS
              </MDTypography>
            </MDBox>
            <br />{" "}
            <div className="App" style={{ marginBottom: "20px" }}>
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={0}
                mt={2}
                p={1}
                mb={0}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  MY ONBOARDING PROCESS
                </MDTypography>
              </MDBox>
              <p>Selected Step: {currentStep}</p>
              <MDButton
                // className="primaryButton"
                color="warning"
                disabled={currentStep === 1}
                onClick={() => updateStep(currentStep - 1)}
              >
                Previous Step
              </MDButton>
              &nbsp; &nbsp;
              <MDButton
                // className="primaryButton"
                color="success"
                disabled={currentStep === labelArray.length}
                onClick={() => updateStep(currentStep + 1)}
              >
                Next Step
              </MDButton>
            </div>
            <div>
              <Card style={{ width: "700px" }}>
                <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
                  <StyledPaper
                    sx={{
                      my: 1,
                      mx: "auto",
                      p: 4,
                    }}
                  >
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar>1</Avatar>
                      </Grid>
                      <Grid item xs zeroMinWidth>
                        <Typography noWrap>{message1}</Typography>
                      </Grid>
                    </Grid>
                  </StyledPaper>
                  <StyledPaper
                    sx={{
                      my: 1,
                      mx: "auto",
                      p: 4,
                    }}
                  >
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar>2</Avatar>
                      </Grid>
                      <Grid item xs>
                        <Typography noWrap>{message2}</Typography>
                      </Grid>
                    </Grid>
                  </StyledPaper>
                  <StyledPaper
                    sx={{
                      my: 1,
                      mx: "auto",
                      p: 4,
                    }}
                  >
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar>3</Avatar>
                      </Grid>
                      <Grid item xs>
                        <Typography>{message3}</Typography>
                      </Grid>
                    </Grid>
                  </StyledPaper>
                </Box>
                <div>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                  </FormGroup>
                </div>
              </Card>
            </div>
            {/* <MDBox>
              <Container>
                <MDBox mx={2}>
                  <div className="row">
                    <div className="col-sm-6">
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
                        color="text"
                      >
                        Account Owner
                      </MDTypography>
                      <Form.Select
                        value={createdByx}
                        onChange={(e) => setCreatedByx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Select Account Owner</option>
                        {userxx.map((api) => (
                          <option key={api.personal.id} value={api.personal.id}>
                            {api.personal.fname} {api.personal.lname}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                    <div className="col-sm-6">
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
                        color="text"
                      >
                        Onboarding User
                      </MDTypography>
                      <Form.Select
                        value={onboardingx}
                        onChange={(e) => setOnboardingx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Select Account Owner</option>
                        {userxx.map((api) => (
                          <option key={api.personal.id} value={api.personal.id}>
                            {api.personal.fname} {api.personal.lname}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </div>
                </MDBox>
                <br />
              </Container>

              <MDBox textAlign="center" mx={3}>
                <Row style={{ paddingBottom: "70px" }}>
                  <Col>
                    <MDTypography
                      variant="p"
                      textAlign="center"
                      fontWeight="light"
                      color="secondary"
                      fontSize="90%"
                    >
                      <br />
                      Onboarding Begins
                    </MDTypography>
                    <Container>
                      <DatePicker
                        placeholderText="MM/DD/YY"
                        style={{ marginRight: "2px" }}
                        selected={start}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onChange={(time) => setStart(time)}
                      />
                    </Container>
                  </Col>
                  <Col>
                    <MDTypography
                      variant="p"
                      textAlign="center"
                      fontWeight="light"
                      color="secondary"
                      fontSize="90%"
                    >
                      <br />
                      Onboarding Ends
                    </MDTypography>
                    <Container>
                      <DatePicker
                        placeholderText="MM/DD/YY"
                        style={{ marginRight: "10px" }}
                        selected={end}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onChange={(time) => setEnd(time)}
                      />
                    </Container>
                  </Col>
                </Row>
                <MDBox textAlign="center" p={3}>
                  <MDButton
                    textAlign="center"
                    color="success"
                    variant="gradient"
                    onClick={handleCreate}
                    size="large"
                  >
                    Add Onboarding
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox> */}
      {/* </MDBox> */}
      {/* </Card> */}
      {/* </MDBox> */}
      <br />
      {/* <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: pRows }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox> */}
      <br />
      <Mentor />
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default OnboardingCompany;
