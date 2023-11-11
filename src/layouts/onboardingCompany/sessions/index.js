import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { Container, Form, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
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
import OnboardingCompanyTable from "./data";

function OnboardingSession() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = OnboardingCompanyTable();
  const [opened, setOpened] = useState(false);
  const [end, setEnd] = useState("");
  const [status, setStatus] = useState(false);
  const [data, setData] = useState([]);
  const [mentorx, setMentorx] = useState("");
  const [start, setStart] = useState("");
  const [appID, setAppID] = useState([]);
  const navigate = useNavigate();
  const [userxx, setUserxx] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    setOpened(true);
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
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
          setUserxx(result);
          setOpened(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    const stat = urlParams.get("stat");
    if (Number(stat) === 2) setStatus(true);
    // const ids = JSON.parse([id]);

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const ids = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/onboarding/getByIds/${ids}`, {
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
          setData(result);
          fetch(
            `${process.env.REACT_APP_RAGA_URL}/onboardingSession/getMySessions/${result[0].orgID}/${result[0].empID}`,
            {
              headers,
            }
          )
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resultx) => {
              if (isMounted) {
                console.log(result);
                if (resultx.length > 0) {
                  setAppID(resultx);
                }
              }
            });
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const handleCreate = () => {
    console.log(data[0]);
    const OpeningDate = new Date(start).getTime();
    const ClosingDate = new Date(end).getTime();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const [filteredItems] = userxx.filter((item) => item.personal.id === mentorx);
    const [filteredItemsEmp] = userxx.filter((item) => item.personal.id === data[0].empID);
    console.log(appID);
    console.log("freshly adding");
    const raw3 = JSON.stringify({
      orgID: orgIDs,
      title: "Onboarding Meeting",
      createdBy: data11.personalID,
      description: "Onboarding Meeting",
      purpose: "ONBOARDING",
      reminderTime: OpeningDate - 600000,
      startTime: OpeningDate,
      endTime: ClosingDate,
      timezone: "(UTC+01:00) West Central Africa | Africa/Algiers",
    });
    console.log(raw3);
    const requestOptions3 = {
      method: "POST",
      headers: myHeaders,
      body: raw3,
      redirect: "follow",
    };
    setOpened(true);
    fetch(`${process.env.REACT_APP_RAGA_URL}/appointment/add`, requestOptions3)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        // setOpened(false);
        console.log(result);
        // setAppID(result.data.id);
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        const raw2 = JSON.stringify([
          {
            orgID: data[0].orgID,
            appointmentID: result.data.id,
            name: data[0].empName,
            email: filteredItemsEmp.personal.email,
            personalID: data[0].empID,
            appointmentTime: OpeningDate,
          },
          {
            orgID: data[0].orgID,
            appointmentID: result.data.id,
            name: `${filteredItems.personal.fname} ${filteredItems.personal.lname}`,
            email: filteredItems.personal.email,
            personalID: mentorx,
            appointmentTime: OpeningDate,
          },
        ]);
        console.log(raw2);
        const requestOptions2 = {
          method: "POST",
          headers: myHeaders,
          body: raw2,
          redirect: "follow",
        };
        fetch(`${process.env.REACT_APP_RAGA_URL}/appointmentParticipant/add`, requestOptions2)
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resultr) => {
            console.log(resultr);
            const raw = JSON.stringify({
              orgID: orgIDs,
              mentorID: mentorx,
              onboardingID: data[0].id,
              appointmentID: result.data.id,
            });
            console.log(raw);
            const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            fetch(`${process.env.REACT_APP_RAGA_URL}/onboardingSession/add`, requestOptions)
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                return res.json();
              })
              .then((resultx) => {
                console.log(resultx);
                setOpened(false);
                if (resultx.message === "Expired Access") {
                  navigate("/authentication/sign-in");
                  window.location.reload();
                }
                if (resultx.message === "Token Does Not Exist") {
                  navigate("/authentication/sign-in");
                  window.location.reload();
                }
                if (resultx.message === "Unauthorized Access") {
                  navigate("/authentication/forbiddenPage");
                  window.location.reload();
                }
                MySwal.fire({
                  title: resultx.status,
                  type: "success",
                  text: resultx.message,
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
          })
          .catch((error) => {
            console.log(error);
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
                Onboarding Session
              </MDTypography>
            </MDBox>
            <br />
            <MDBox>
              <Container>
                <MDBox mx={20} textAlign="center">
                  <MDTypography variant="button" fontWeight="regular" fontSize="80%" color="text">
                    Mentor
                  </MDTypography>
                  <Form.Select
                    value={mentorx}
                    onChange={(e) => setMentorx(e.target.value)}
                    aria-label="Default select example"
                    disabled={status}
                  >
                    <option value="">Select Mentor</option>
                    {userxx.map((api) => (
                      <option key={api.personal.id} value={api.personal.id}>
                        {api.personal.fname} {api.personal.lname}
                      </option>
                    ))}
                  </Form.Select>
                </MDBox>

                <MDBox textAlign="center" mx={3}>
                  <Row style={{ paddingBottom: "70px" }}>
                    <Col>
                      <MDTypography variant="p" fontWeight="light" color="secondary" fontSize="90%">
                        <br />
                        Onboarding Session Begins
                      </MDTypography>
                      <Container>
                        <DatePicker
                          placeholderText="MM/DD/YY hh:mm"
                          style={{ marginRight: "2px" }}
                          selected={start}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          showTimeSelect
                          dateFormat="MM/dd/yyyy h:mm aa"
                          dropdownMode="select"
                          onChange={(time) => setStart(time)}
                          disabled={status}
                        />
                      </Container>
                    </Col>
                    <Col>
                      <MDTypography variant="p" fontWeight="light" color="secondary" fontSize="90%">
                        <br />
                        Onboarding Session Ends
                      </MDTypography>
                      <Container>
                        <DatePicker
                          placeholderText="MM/DD/YY hh:mm"
                          style={{ marginRight: "10px" }}
                          selected={end}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          showTimeSelect
                          dateFormat="MM/dd/yyyy h:mm aa"
                          dropdownMode="select"
                          onChange={(time) => setEnd(time)}
                          disabled={status}
                        />
                      </Container>
                    </Col>
                  </Row>
                  {/* <MDBox textAlign="center" p={3}>
                    <MDButton
                      color="success"
                      variant="gradient"
                      onClick={handleCreate}
                      size="large"
                    >
                      ADD
                    </MDButton>
                  </MDBox> */}
                </MDBox>
                <br />
              </Container>
              <MDBox textAlign="center" mx={3}>
                <MDBox textAlign="center" p={3}>
                  {status ? (
                    <i style={{ color: "red", fontSize: "10px" }}>
                      This onboarding has already been terminated
                    </i>
                  ) : (
                    <MDButton
                      color="success"
                      variant="gradient"
                      onClick={handleCreate}
                      size="large"
                    >
                      ASSIGN
                    </MDButton>
                  )}
                </MDBox>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: pRows }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}
export default OnboardingSession;
