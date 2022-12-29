/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { Container, Form, Row, Col } from "react-bootstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DatePicker from "react-datepicker";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";

export default function AppointmentOffboardingSession() {
  const navigate = useNavigate();
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [opened, setOpened] = useState(false);
  const [users, setUsers] = useState([]);
  const [annoy, setAnnoy] = useState(0);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const ids = urlParams.get("id");
  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const myid = data11.personalID;
    const headers = miHeaders;
    let isMounted = true;
    setOpened(true);
    fetch(
      `${process.env.REACT_APP_RAGA_URL}/offboardingSession/getSessionsAttachedToAppointment/${orgIDs}/${ids}`,
      { headers }
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
          setUsers(result);
          setOpened(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [annoy]);
  const mark = (apie, status) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const myid = data11.personalID;
    const headers = miHeaders;
    console.log(apie, status);
    setOpened(true);
    fetch(`${process.env.REACT_APP_RAGA_URL}/offboardingSession/mark/${apie.id}/${status}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        // eslint-disable-next-line no-unused-expressions
        setAnnoy(annoy + 1);
        console.log(result);
        setOpened(false);
      });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <MDBox mx={10}>
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
                Offboarding Session
              </MDTypography>
            </MDBox>
            <br />
            <MDBox>
              <Container>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  Warning: Offboarding Sessions can only be marked once!
                </p>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <th style={{ borderBottom: "1px solid gray" }}>Employees</th>
                      <th
                        style={{
                          borderLeft: "1px solid gray",
                          borderBottom: "1px solid gray",
                          paddingLeft: "20px",
                        }}
                      >
                        Attended
                      </th>
                      <th
                        style={{
                          borderLeft: "1px solid gray",
                          borderBottom: "1px solid gray",
                          paddingLeft: "20px",
                        }}
                      >
                        Failed To Attend
                      </th>
                    </tr>
                    {/* <tr> */}
                    {users.map((r) => (
                      <React.Fragment key={r.id}>
                        <tr>
                          <td>{r.offboardingDTO.empName}</td>
                          <td style={{ borderLeft: "1px solid gray", paddingLeft: "20px" }}>
                            <Form.Check.Input
                              type="checkbox"
                              value={r.id}
                              // eslint-disable-next-line react/jsx-boolean-value
                              defaultChecked={r.status === 1 && true}
                              disabled={r.status !== 0 && true}
                              onClick={() => mark(r, 1)}
                            />
                          </td>
                          <td style={{ borderLeft: "1px solid gray", paddingLeft: "20px" }}>
                            {" "}
                            <Form.Check.Input
                              type="checkbox"
                              defaultChecked={r.status === 2 && true}
                              disabled={r.status !== 0 && true}
                              value={r.id}
                              //   defaultChecked={api.isCheck}
                              onClick={() => mark(r, 2)}
                            />
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </Container>
              <MDBox textAlign="center" mt={5}>
                {/* <MDBox textAlign="center" p={3}>
                  <MDButton color="success" variant="gradient" size="large">
                    MARK
                  </MDButton>
                </MDBox> */}
              </MDBox>
              <br />
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}
