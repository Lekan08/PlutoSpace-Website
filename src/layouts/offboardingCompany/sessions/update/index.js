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
import MDButton from "components/MDButton";

function UpdateOffboardingSession() {
  const MySwal = withReactContent(Swal);
  const [opened, setOpened] = useState(false);
  const [end, setEnd] = useState("");
  const [mentorx, setMentorx] = useState("");
  const [start, setStart] = useState("");
  const storedArray = JSON.parse(sessionStorage.getItem("boarding"));
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
          console.log(storedArray);
          setMentorx(storedArray.mentorID);
          setEnd(new Date(storedArray.appointment.endTime));
          setStart(new Date(storedArray.appointment.startTime));
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  //   const handleOnTitleKeys = () => {
  //     const letter = /^[a-zA-Z ]+$/;
  //     if (!titlex.match(letter)) {
  //       setCheckedTitle(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("title").innerHTML =
  //         "Name - input only capital and small letters<br>";
  //     }
  //     if (titlex.match(letter)) {
  //       setCheckedTitle(true);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("title").innerHTML = "";
  //     }
  //     if (titlex.length === 0) {
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("title").innerHTML = "Title is required<br>";
  //     }
  //     setEnabled(checkedTitle === true);
  // const handleDelete = () => {
  //   MySwal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed === true) {
  //       const requestOptions = {
  //         method: "DELETE",
  //         headers: miHeaders,
  //       };
  //       fetch(
  //         `${process.env.REACT_APP_RAGA_URL}/onboardingSession/delete/${appID[0].id}`,
  //         requestOptions
  //       )
  //         .then((res) => res.json())
  //         .then((resx) => {
  //           if (resx.message === "Expired Access") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (resx.message === "Token Does Not Exist") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (resx.message === "Unauthorized Access") {
  //             navigate("/authentication/forbiddenPage");
  //           }
  //           MySwal.fire({
  //             title: resx.status,
  //             type: "success",
  //             text: resx.message,
  //           }).then(() => {
  //             window.location.reload();
  //           });
  //         })
  //         .catch((error) => {
  //           MySwal.fire({
  //             title: error.status,
  //             type: "error",
  //             text: error.message,
  //           });
  //         });
  //     }
  //   });
  // };
  const handleCreate = () => {
    const OpeningDate = new Date(start).getTime();
    const ClosingDate = new Date(end).getTime();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const [filteredItems] = userxx.filter((item) => item.personal.id === mentorx);
    const [filteredItemsEmp] = userxx.filter(
      (item) => item.personal.id === storedArray.offboardingDTO.empID
    );
    console.log(
      storedArray.mentorID,
      mentorx,
      storedArray.appointment.startTime,
      start.getTime(),
      storedArray.appointment.endTime,
      end.getTime()
    );
    if (
      storedArray.mentorID === mentorx &&
      storedArray.appointment.startTime === start.getTime() &&
      storedArray.appointment.endTime === end.getTime()
    )
      alert("no changes made");
    else {
      console.log("updating");
      setOpened(true);
      const requestOptions = {
        method: "DELETE",
        headers: miHeaders,
      };
      fetch(
        `${process.env.REACT_APP_RAGA_URL}/appointment/cancel/${storedArray.appointmentID}`,
        requestOptions
      )
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((ressx) => {
          console.log(ressx);
        });
      fetch(
        `${process.env.REACT_APP_RAGA_URL}/appointmentParticipant/removeAll/${storedArray.orgID}/${storedArray.appointmentID}`,
        requestOptions
      )
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((resy) => {
          console.log(resy);
        });
      const raw3 = JSON.stringify({
        orgID: orgIDs,
        title: "Offboarding Meeting",
        createdBy: data11.personalID,
        description: "Offboarding Meeting",
        purpose: "OFFBOARDING",
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
              orgID: storedArray.orgID,
              appointmentID: result.data.id,
              name: storedArray.offboardingDTO.empName,
              email: filteredItemsEmp.personal.email,
              personalID: storedArray.offboardingDTO.empID,
              appointmentTime: OpeningDate,
            },
            {
              orgID: storedArray.orgID,
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
                id: storedArray.id,
                offboardingID: storedArray.offboardingID,
                appointmentID: result.data.id,
                status: storedArray.status,
              });
              console.log(raw);
              const requestOptions5 = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };

              fetch(`${process.env.REACT_APP_RAGA_URL}/offboardingSession/update`, requestOptions5)
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
                    navigate(-1);
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
    }
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
              bgColor="warning"
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
                <MDBox mx={20} textAlign="center">
                  <MDTypography variant="button" fontWeight="regular" fontSize="80%" color="text">
                    Mentor
                  </MDTypography>
                  <Form.Select
                    value={mentorx}
                    onChange={(e) => setMentorx(e.target.value)}
                    aria-label="Default select example"
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
                        Offboarding Begins
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
                        />
                      </Container>
                    </Col>
                    <Col>
                      <MDTypography variant="p" fontWeight="light" color="secondary" fontSize="90%">
                        <br />
                        Offboarding Ends
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
                  <MDButton color="success" variant="gradient" onClick={handleCreate} size="large">
                    UPDATE
                  </MDButton>
                </MDBox>
              </MDBox>
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
export default UpdateOffboardingSession;
