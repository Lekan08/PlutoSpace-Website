import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Styles from "styles";
import Grid from "@mui/material/Grid";

function VuUserProrate() {
  const MySwal = withReactContent(Swal);

  const [idx, setId] = useState("");
  const [orgIDx, setOrgID] = useState("");
  const [statusx, setStatus] = useState("");
  const [noOfDaysx, setNoOfDays] = useState("");
  const [totalNumOfDayx, setTotalNumOfDays] = useState("");
  const [createdDatex, setCreatedDate] = useState("");
  const [deletedflagx, setDeletedflag] = useState("");

  const [user, setUser] = useState([]);
  const [userIDx, setUserIDx] = useState("");

  const [opened, setOpened] = useState(false);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_TANTA_URL}/prorateRemuneration/getByIds/${id}`, { headers })
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
          setId(result[0].id);
          setOrgID(result[0].orgID);
          setUserIDx(result[0].empID);
          setStatus(result[0].status);
          setNoOfDays(result[0].noOfDays);
          setTotalNumOfDays(result[0].totalNumberOfDays);
          setCreatedDate(result[0].createdTime);
          setDeletedflag(result[0].deleteFlag);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
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
          setUser(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDx,
      empID: userIDx,
      status: statusx,
      noOfDays: noOfDaysx,
      totalNumberOfDays: totalNumOfDayx,
      createdTime: createdDatex,
      deleteFlag: deletedflagx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_TANTA_URL}/prorateRemuneration/update`, requestOptions)
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
        setOpened(false);
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3}>
          <MDBox
            variant="gradient"
            // bgColor="info"
            style={Styles.boxSx}
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Salary Prorate
            </MDTypography>
          </MDBox>
          <MDBox
            variant="gradient"
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            borderRadius="lg"
            coloredShadow="success"
            mx={3}
            mt={1}
            p={1}
            mb={3}
            textAlign="center"
          >
            <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={0}>
              <Container>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={5}>
                    <MDInput
                      type="text"
                      value={noOfDaysx || ""}
                      onChange={(e) => setNoOfDays(e.target.value)}
                      label="Number Of Days"
                      variant="standard"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <MDInput
                      type="text"
                      value={totalNumOfDayx || ""}
                      onChange={(e) => setTotalNumOfDays(e.target.value)}
                      label="Total Number Of Days *"
                      variant="standard"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={5}>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                    >
                      User *
                    </MDTypography>
                    <Form.Select
                      value={userIDx}
                      onChange={(e) => setUserIDx(e.target.value)}
                      aria-label="Default select example"
                    >
                      <option value="">--Select User--</option>
                      {user.map((api) => (
                        <option key={api.personal.id} value={api.personal.id}>
                          {api.personal.fname} {api.personal.lname}
                        </option>
                      ))}
                    </Form.Select>
                  </Grid>

                  <Grid item xs={5}>
                    <></>
                  </Grid>
                  <Grid item xs={5}>
                    <MDBox mt={1} mb={1}>
                      <MDButton
                        variant="gradient"
                        onClick={handleClick}
                        // color="info"
                        style={Styles.buttonSx}
                        width="50%"
                      >
                        Save
                      </MDButton>
                    </MDBox>
                  </Grid>
                  <Grid item xs={5}>
                    {" "}
                    <></>
                  </Grid>
                </Grid>
              </Container>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default VuUserProrate;
