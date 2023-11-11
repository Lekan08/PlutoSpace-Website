/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/button-has-type */
/* eslint-disable no-plusplus */
/* eslint-disable object-shorthand */
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { Container, Form } from "react-bootstrap";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
// import Checkbox from "@mui/material/Checkbox";
// import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import timezones from "layouts/appointments/timezones.json";

function UpdateCalendar() {
  // eslint-disable-next-line prefer-const
  const [checkedName, setCheckedName] = useState("");
  const [enabled, setEnabled] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [enabled2, setEnabled2] = useState(false);
  const [applicantx, setApplicantx] = useState([]);
  const MySwal = withReactContent(Swal);
  const timezonex = timezones;
  const [newEvent, setNewEvent] = useState({ title: "", time: "", end: "" });
  const [opened, setOpened] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [updates, setUpdates] = useState([]);
  const navigate = useNavigate();
  const purpose = "APPOINTMENT";
  const storedArray = JSON.parse(sessionStorage.getItem("items"));
  const [check, setCheck] = useState([]);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [duty, setDutyRelieverx] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState([]);
  const [remind, setRemind] = useState(0);
  const [reminde, setReminde] = useState("");
  const [timezone, setTimezone] = useState("");
  const [created, setCreated] = useState(0);
  const [idx, setIdx] = useState("");
  const [link, setLink] = useState("");
  const addEm = (api) => {
    // const applicantr = [];
    const mapper = {
      orgID: api.orgID,
      name: api.name,
      email: api.email,
      personalID: api.personalID,
    };
    applicantx.push(mapper);
    setApplicantx(applicantx);
  };
  const deleteEm = (api) => {
    for (let i = applicantx.length - 1; i >= 0; --i) {
      if (applicantx[i].personalID === api.personalID) {
        applicantx.splice(i, 1);
      }
    }
  };
  const applicant = (e, api) => {
    // e.preventDefault();
    if (e.target.checked === true) {
      addEm(api);
    }
    if (e.target.checked === false) {
      deleteEm(api);
    }
    console.log(applicantx);
  };
  function timezoneConverter(timestamp) {
    const selectedTimeZone = storedArray.timezone.split("|")[1].slice(1);
    const selectedTime = new Date(timestamp);
    const convertedTime = new Date(selectedTime).toLocaleString("en-US", {
      timeZone: selectedTimeZone,
    });
    const realTime = new Date(convertedTime).getTime();
    return realTime;
  }
  function timezoneConverter2(timestamp) {
    const selectedTimeZone = timezone.split("|")[1].slice(1);
    const selectedTime = new Date(timestamp);
    const convertedTime = new Date(selectedTime).toLocaleString("en-US", {
      timeZone: selectedTimeZone,
    });
    const realTime = new Date(convertedTime).getTime();
    return realTime;
  }

  useEffect(() => {
    console.log(storedArray);
    const date = new Date(storedArray.startTime);
    const endx = new Date(storedArray.endTime);
    const reminderr = new Date(storedArray.reminderTime);
    if (storedArray.timezone.split("|")[1]) {
      console.log("splited");
      setTimezone(`${storedArray.timezone.split("|")[0]}|${storedArray.timezone.split("|")[1]}`);
      setNewEvent({
        time: timezoneConverter(date),
        title: storedArray.title,
        end: timezoneConverter(endx),
      });
      setRemind(timezoneConverter(storedArray.reminderTime));
    } else {
      console.log("error");
      setTimezone(storedArray.timezone);
      setNewEvent({
        time: date,
        title: storedArray.title,
        end: endx,
      });
      setRemind(storedArray.reminderTime);
    }
    setDescription(storedArray.description);
    setCreated(storedArray.createdTime);
    setIdx(storedArray.id);
    setLink(storedArray.videoMeetingLink);
    setReminde(reminderr);
    // console.log("timezone", `${timeArr[0]}|${timeArr[1]}`);
    setDutyRelieverx(storedArray.createdBy);
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
          const app = result;
          const another = app.map((r) => ({
            key: r.personal.id,
            orgID: r.personalCompany.orgID,
            name: `${r.personal.fname} ${r.personal.lname}`,
            email: r.personal.email,
            personalID: r.personal.id,
            checked: false,
          }));
          setUser(another);
          const usee = another;
          setOpened(false);
          const ids = storedArray.id;
          fetch(`${process.env.REACT_APP_RAGA_URL}/appointmentParticipant/gets/${orgIDs}/${ids}`, {
            headers,
          })
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resultx) => {
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
              if (isMounted) {
                // console.log(result);
                // setUpdates(resultx);
                const mark = resultx.map((r) => ({
                  key: r.personalID,
                  orgID: r.orgID,
                  appointmentTime: r.appointmentTime,
                  name: r.name,
                  email: r.email,
                  personalID: r.personalID,
                  checked: true,
                }));
                const arr3 = mark.concat(usee);
                for (const key in arr3) {
                  if (arr3[key].checked === true) {
                    addEm(arr3[key]);
                  }
                }
                const obj = arr3.filter(
                  (value, index, self) => index === self.findIndex((t) => t.key === value.key)
                );
                setCheck(obj);
                // for (const key in result) {

                // }
                setOpened(false);
              }
            });
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnTitleKeys = () => {
    const letters = /^[a-zA-Z0-9 -']+$/;
    if (!newEvent.title.match(letters)) {
      setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML =
        "Title - input only capital, small letters and numbers<br>";
    }
    if (newEvent.title.match(letters)) {
      setCheckedName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML = "";
    }
    if (newEvent.title.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML = "Title is required<br>";
    }
    setEnabled(checkedName === true);
    setCheckedName(true);
  };

  const handleAddEvent = (e) => {
    handleOnTitleKeys();
    if (newEvent.title.length > 0) {
      setEnabled2(true);
    } else {
      setEnabled2(false);
    }
    console.log(enabled);
    const letters = /^[a-zA-Z0-9 -']+$/;
    if (newEvent.title.length > 0 && newEvent.title.match(letters)) {
      setOpened(true);
      const requestOptionsd = {
        method: "DELETE",
        headers: miHeaders,
      };
      const data11z = JSON.parse(localStorage.getItem("user1"));
      const orgIDx = data11z.orgID;
      fetch(
        `${process.env.REACT_APP_RAGA_URL}/appointmentParticipant/removeAll/${orgIDx}/${idx}`,
        requestOptionsd
      )
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((resy) => {
          console.log(resy);
          const start = new Date(newEvent.time);
          const end = new Date(newEvent.end);
          const endTime = end.getTime();
          const eventTime = start.getTime();
          const eventName = newEvent.title;
          const CurTime = new Date().getTime();
          // setAllEvents([...allEvents, newEvent]);
          e.preventDefault();
          const data11 = JSON.parse(localStorage.getItem("user1"));
          const orgIDs = data11.orgID;

          const raw = JSON.stringify({
            id: idx,
            orgID: orgIDs,
            title: eventName,
            createdBy: duty,
            description: description,
            purpose: purpose,
            reminderTime: timezoneConverter2(remind),
            startTime: timezoneConverter2(eventTime),
            endTime: timezoneConverter2(endTime),
            timezone: timezone,
            createdTime: created,
          });
          console.log(raw);
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
          if (eventTime < CurTime || endTime < CurTime) {
            MySwal.fire({
              title: "Invalid Date",
              type: "error",
              text: "Please Enter A Date From The Future",
            });
            setOpened(false);
          } else if (eventTime < remind) {
            MySwal.fire({
              title: "Invalid Date",
              type: "error",
              text: "Reminder must be before the appointment starts",
            });
            setOpened(false);
          } else {
            fetch(`${process.env.REACT_APP_RAGA_URL}/appointment/update`, requestOptions)
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                return res.json();
              })
              .then((result) => {
                setOpened(false);
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
                // applicantx.forEach((r) => {
                //   // eslint-disable-next-line no-param-reassign
                //   r.appointmentID = result.data.id;
                // });

                const time = new Date(newEvent.time).getTime();
                // raww = applicantx.map((r) => )
                const raww = applicantx.map((r) => ({
                  ...r,
                  appointmentTime: timezoneConverter2(time),
                  appointmentID: idx,
                }));
                const raw2 = JSON.stringify(raww);
                console.log(raw2);
                const requestOptions2 = {
                  method: "POST",
                  headers: myHeaders,
                  body: raw2,
                  redirect: "follow",
                };
                fetch(
                  `${process.env.REACT_APP_RAGA_URL}/appointmentParticipant/add`,
                  requestOptions2
                )
                  .then(async (res) => {
                    const aToken = res.headers.get("token-1");
                    localStorage.setItem("rexxdex", aToken);
                    return res.json();
                  })
                  .then((resultr) => {
                    console.log(resultr);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                MySwal.fire({
                  title: result.status,
                  type: "success",
                  text: result.message,
                }).then(() => {
                  navigate(`/appointments`);
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
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const reminder = (time) => {
    const stamp = new Date(time);
    const stamper = stamp.getTime();
    setReminde(time);
    setRemind(stamper);
  };
  const ends = (time) => {
    setNewEvent({ ...newEvent, end: time });
    console.log(time);
  };
  const Gen = () => {
    if (duty !== "") {
      const code = `${Math.random().toString(32).slice(10)}-${Math.random()
        .toString(32)
        .slice(10)}-${Math.random().toString(32).slice(10)}`;
      const url = `https://cairo-videochat.netlify.app/room.html?room=${code}&adm=${duty}`;
      setLink(url);
    } else {
      MySwal.fire({
        title: "Error",
        type: "error",
        text: "Please Select Account Owner Before Generating A Link",
      });
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <Card>
        <MDBox component="form" role="form">
          <MDBox
            variant="gradient"
            bgColor="warning"
            borderRadius="lg"
            coloredShadow="info"
            mx={0}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Update Appointment
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="title">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="date">
              {" "}
            </MDTypography>
          </MDBox>
          <div align="center">
            <MDBox mt={2} mb={2}>
              <MDInput
                type="text"
                value={newEvent.title}
                onKeyUp={handleOnTitleKeys}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                label="Title"
                variant="standard"
                style={{ width: "30%" }}
              />
            </MDBox>
            <div style={{ width: "700px" }}>
              <Form.Group className="mb-1" controlId="exampleForm.ControlTextArea">
                <Form.Label style={{ fontSize: 14 }}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                  label="Description"
                  variant="standard"
                />
              </Form.Group>
            </div>
            <br />
            <Container>
              <div className="row">
                <div className="col-sm-6">
                  <div align="center">
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                      mt={2}
                    >
                      Appointment Starts
                    </MDTypography>
                    <DatePicker
                      placeholderText="MM/DD/YY hh:mm"
                      style={{ marginRight: "10px" }}
                      selected={newEvent.time}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      showTimeSelect
                      dateFormat="MM/dd/yyyy h:mm aa"
                      dropdownMode="select"
                      onChange={(time) => setNewEvent({ ...newEvent, time })}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div align="center">
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                      mt={2}
                    >
                      Appointment Ends
                    </MDTypography>
                    <DatePicker
                      placeholderText="MM/DD/YY hh:mm"
                      style={{ marginRight: "10px" }}
                      selected={newEvent.end}
                      peekNextMonth
                      dateFormat="MM/dd/yyyy h:mm aa"
                      showMonthDropdown
                      showYearDropdown
                      showTimeSelect
                      dropdownMode="select"
                      onChange={(time) => ends(time)}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="col-sm-6">
                <div align="center">
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    fontSize="80%"
                    align="left"
                    color="text"
                    mt={2}
                  >
                    Remind me on
                  </MDTypography>
                  <DatePicker
                    placeholderText="MM/DD/YY hh:mm"
                    style={{ marginRight: "10px" }}
                    selected={reminde}
                    peekNextMonth
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showMonthDropdown
                    showYearDropdown
                    showTimeSelect
                    dropdownMode="select"
                    onChange={(time) => reminder(time)}
                  />
                </div>
              </div>
            </Container>
            <div className="col-sm-6">
              <MDBox mt={4}>
                <MDBox textAlign="center">
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
                    value={duty}
                    onChange={(e) => {
                      setDutyRelieverx(e.target.value);
                      setLink("");
                    }}
                    aria-label="Default select example"
                  >
                    <option value="">Select Account Owner</option>
                    {user.map((api) => (
                      <option key={api.key} value={api.key}>
                        {api.name}
                      </option>
                    ))}
                  </Form.Select>
                </MDBox>
              </MDBox>
            </div>
            <div className="col-sm-6">
              <MDBox mt={4}>
                <MDBox textAlign="center">
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    fontSize="80%"
                    textAlign="center"
                    color="text"
                  >
                    Time Zone
                  </MDTypography>
                  <Form.Select
                    value={timezone}
                    onChange={(e) => {
                      setTimezone(e.target.value);
                      console.log(e.target.value);
                    }}
                    aria-label="Default select example"
                  >
                    <option value="">Select Time Zone</option>
                    {timezonex.map((api) => (
                      <option key={api.value} value={[`${api.text} | ${api.utc[0]}`]}>
                        {api.text}
                      </option>
                    ))}
                  </Form.Select>
                </MDBox>
              </MDBox>
            </div>
            <br />
            <hr />
            <MDBox>
              <MDTypography variant="h5" fontWeight="medium" color="warning" mt={8} mb={3}>
                Generate A Video Call Link For The Appointment
              </MDTypography>
              <MDInput variant="outlined" disabled style={{ width: "60%" }} value={link} />
              <br />
              <MDButton
                variant="gradient"
                style={{ marginTop: "20px" }}
                color="warning"
                onClick={() => Gen()}
                width="50%"
                align="center"
                size="small"
              >
                Generate
              </MDButton>
            </MDBox>
            <br />
            <MDBox mt={2} mb={2}>
              <MDButton
                variant="gradient"
                onClick={handleAddEvent}
                color="warning"
                width="50%"
                align="left"
              >
                Update appointment
              </MDButton>
            </MDBox>
          </div>
        </MDBox>
      </Card>
      &nbsp;
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="warning" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default UpdateCalendar;
