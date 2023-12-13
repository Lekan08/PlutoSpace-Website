import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Styles from "styles";
import Grid from "@mui/material/Grid";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

function EditSalaryAdvance() {
  const MySwal = withReactContent(Swal);

  const [amountx, setAmount] = useState("");
  const [approver, setApprover] = useState(0);

  const [user, setUser] = useState([]);
  const [salaryAdvance, setSalaryAdvance] = useState({});

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

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

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    let isMounted = true;
    fetch(`${process.env.REACT_APP_TANTA_URL}/salaryAdvance/getByIds/${ids}`, { headers })
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
          setSalaryAdvance(result[0]);
          setAmount(` ${result[0].amount}`);
          setApprover(result[0].approverID);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // eslint-disable-next-line consistent-return
  const handleClick = (e) => {
    e.preventDefault();
    setOpened(true);
    const letters = /^[0-9]+$/;
    const amt = amountx.trim();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const approverCompare = ` ${approver}`;
    const personalCompare = ` ${data11.personalID}`;
    if (salaryAdvance.status !== 0) {
      setOpened(false);
      MySwal.fire({
        title: "UPDATE_DISALLOWED",
        type: "error",
        text: "You Cannot Update A Request After Decision Is Already Made",
      }).then(() => {
        window.location.reload();
      });
    } else if (amt.length === 0) {
      setOpened(false);
      MySwal.fire({
        title: "AMOUNT_EMPTY",
        type: "error",
        text: "Please Fill In Amount",
      }).then(() => {
        window.location.reload();
      });
    } else if (!amt.match(letters)) {
      setOpened(false);
      MySwal.fire({
        title: "AMOUNT_INVALID",
        type: "error",
        text: "Amount Value Is Invalid",
      }).then(() => {
        window.location.reload();
      });
    } else if (approverCompare === personalCompare) {
      setOpened(false);
      MySwal.fire({
        title: "APPROVER_REJECTED",
        type: "error",
        text: "You Cannot Set Yourself As The Approver Of Your Request",
      }).then(() => {
        window.location.reload();
      });
    } else {
      const raw = JSON.stringify({
        id: salaryAdvance.id,
        orgID: salaryAdvance.orgID,
        empID: salaryAdvance.empID,
        amount: amt,
        createdTime: salaryAdvance.createdTime,
        deleteFlag: salaryAdvance.deleteFlag,
        comment: salaryAdvance.comment,
        approverID: approver,
        status: salaryAdvance.status,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_TANTA_URL}/salaryAdvance/update`, requestOptions)
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
    }
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
              Update Salary Advance
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
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={10}>
                    <MDInput
                      type="text"
                      label="Amount (No Decimal Places) *"
                      value={amountx || ""}
                      className="form-control"
                      onChange={(e) => setAmount(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={10}>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                    >
                      Approver *
                    </MDTypography>
                    <Form.Select
                      value={approver}
                      onChange={(e) => setApprover(e.target.value)}
                      aria-label="Default select example"
                    >
                      <option value="">--Select Approver--</option>
                      {user.map((api) => (
                        <option key={api.personal.id} value={api.personal.id}>
                          {api.personal.fname} {api.personal.lname}
                        </option>
                      ))}
                    </Form.Select>
                  </Grid>

                  <Grid item xs={5}>
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        onClick={(e) => handleClick(e)}
                        // color="info"
                        style={Styles.buttonSx}
                        width="50%"
                        align="left"
                      >
                        Save
                      </MDButton>
                    </MDBox>
                  </Grid>
                  <Grid item xs={5}>
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

export default EditSalaryAdvance;
