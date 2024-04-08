import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { Container, Form } from "react-bootstrap";

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DataTable from "examples/Tables/DataTable";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
// import Chip from "@mui/material/Chip";
// import Stack from "@mui/material/Stack";
// import DeleteIcon from "@mui/icons-material/Delete";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

import InterviewTable from "layouts/interviewSchedule/interviewTable";
import TimeZones from "./timeZones/index.json";

const locales = {
  // eslint-disable-next-line global-require
  "en-US": require("date-fns/locale/en-US"),
};
const localizers = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const style = {
  boxShadow: 2,
  overflow: "scroll",
  height: "90px",
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  p: 0.5,
  mt: 0,
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "2px",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 1px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 1px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#4285F4",
    borderRadius: "10px",
    webkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
  },
};

function InterviewSchedule() {
  // const [checkedName, setCheckedName] = useState("");
  // const [enabled, setEnabled] = useState("");
  const { columns: pColumns, rows: pRows } = InterviewTable();

  const MySwal = withReactContent(Swal);

  // const [newEvent, setNewEvent] = useState({ title: "", time: "" });
  const [allEvents, setAllEvents] = useState([]);
  const [interview, setInterview] = useState("");
  const [interviewE, setInterviewE] = useState("");
  const [reminder, setReminder] = useState("");
  const [timeZonex, setTimeZonex] = useState("");
  const [offsetx, setOffset] = useState("");
  const [link, setLink] = useState("");
  const [titlex, setTitle] = useState("");
  const [descriptionx, setDescription] = useState("");
  // const [appointmentParams, setAppointmentParams] = useState("");
  const [emailx, setEmail] = useState([]);
  // const [Uemailx, setUEmail] = useState([]);
  const [userInfox, setUserInfo] = useState([]);
  const [userNInfox, setNUserInfo] = useState([]);
  const [emailAccount, setEmailAccount] = React.useState([]);
  const [applicationx, setApplication] = React.useState([]);
  const [newApplicationx, setNewApplication] = React.useState([]);
  const [showApplications, setShowApplications] = useState(false);
  const [showNonApplications, setShowNonApplications] = useState(true);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // const handleAddParicipant = (addParti) => {
  //   // eslint-disable-next-line no-shadow
  //   setUserInfo((userInfox) =>
  //     userInfox.filter((userInfo) => userInfo.personal.id !== addParti.id)
  //   );
  //   setNUserInfo((list) => [...list, addParti]);
  //   console.log(userNInfox);
  // };

  // const handleOnPEmailKeys = () => {
  //   const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
  //   if (!emailx.match(letters)) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("email").innerHTML = "Email - input a valid email<br>";
  //   }
  //   if (emailx.match(letters)) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("email").innerHTML = "";
  //   }
  //   if (emailx.length === 0) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("email").innerHTML = "Email is required<br>";
  //   }
  // };

  const handleAddParicipant = (addParti) => {
    // eslint-disable-next-line no-shadow
    setUserInfo((userInfox) =>
      userInfox.filter((userInfo) => userInfo.personal.email !== addParti.personal.email)
    );

    setNUserInfo((list) => [...list, addParti]);
  };

  const handleRemoveParicipant = (addParti) => {
    // eslint-disable-next-line no-shadow
    setNUserInfo((userInfox) =>
      userInfox.filter((userInfo) => userInfo.personal.email !== addParti.personal.email)
    );
    setUserInfo((list) => [...list, addParti]);

    console.log(userNInfox);
  };

  const handleEmailDelete = (chipToDelete) => () => {
    setEmailAccount((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleApplicantDelete = (filteredData, chipToDelete) => () => {
    setApplication((chips) => chips.filter((chip) => chip.id !== chipToDelete));
    const filteredItems = filteredData.filter((item) => item.id === chipToDelete);

    setNewApplication((chips) => [filteredItems[0], ...chips]);
  };
  // const handleEmailParicipant = (emailx) => {
  //   // eslint-disable-next-line no-shadow
  //   setUEmail((userInfox) =>
  //     userInfox.filter((userInfo) => userInfo.personal.email !== emailx)
  //   );
  //   setUserInfo((list) => [...list, addParti]);
  // };

  useEffect(() => {
    const stDate = new Date(new Date().getFullYear(), 0, 1);
    const enDate = new Date(new Date().getFullYear(), 12, 1);
    const starDate = stDate.getTime();
    const endDate = enDate.getTime();

    console.log(stDate);
    console.log(enDate);

    const eventList = [];
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const myID = data11.personalID;
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_RAGA_URL}/appointment/getMyCalendar/${orgIDs}/${myID}?startTime=${starDate}&endTime=${endDate}`,
      { headers }
    )
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
          console.log(result);
          const interViewOnly = [];
          // eslint-disable-next-line array-callback-return
          result.map((item) => {
            if (item.purpose === "INTERVIEW") {
              interViewOnly.push(item);
            }
          });

          // eslint-disable-next-line array-callback-return
          interViewOnly.map((interviewws) => {
            const settingCalendar = {
              title: interviewws.title,
              time: new Date(interviewws.startTime),
              end: new Date(interviewws.endTime),
            };
            eventList.push(settingCalendar);
          });
          console.log(eventList);
          setAllEvents(eventList);
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
          console.log(result);
          setUserInfo(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Function for fetching jobpost
  const handleGetJobPostOrApplication = () => {
    setOpened(true);
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const jobPostID = urlParams.get("jobPostID");
    const jobApplicationID = urlParams.get("jobApplicationID");
    console.log(`jobPostID: ${jobPostID}`);
    if (jobPostID !== null && jobPostID !== "null" && jobPostID !== "") {
      fetch(`${process.env.REACT_APP_RAGA_URL}/jobApplication/getForPost/${jobPostID}`, { headers })
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
          console.log(result);
          setTitle(result[0].jobPost.title);
          setApplication(result);
          setShowApplications(true);
          setShowNonApplications(false);
        });
    } else if (
      jobApplicationID !== null &&
      jobApplicationID !== "null" &&
      jobApplicationID !== ""
    ) {
      fetch(`${process.env.REACT_APP_RAGA_URL}/jobApplication/getByIds/${jobApplicationID}`, {
        headers,
      })
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          const result = await res.text();
          if (result === null || result === undefined || result === "") {
            return {};
          }
          return JSON.parse(result);
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
          if (resultp.length > 0) {
            console.log(resultp);
            setTitle(resultp[0].jobPost.title);
            setApplication([resultp[0]]);
            setShowApplications(true);
            setShowNonApplications(false);
          }
        });
    }
  };
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      handleGetJobPostOrApplication();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // const handleOnTitleKeys = () => {
  //   const letters = /^[\w&.\- ]+$/;
  //   if (!titlex.match(letters)) {
  //     setCheckedName(false);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("title").innerHTML =
  //       "Title - input only capital, small letters and numbers<br>";
  //   }
  //   if (titlex.match(letters)) {
  //     setCheckedName(true);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("title").innerHTML = "";
  //   }
  //   if (titlex.length === 0) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("title").innerHTML = "Title is required<br>";
  //   }
  //   setEnabled(checkedName === true);
  // };
  // const handleParticipant = (appointmentTimeID) => {
  //   // handleOnTitleKeys();
  //   // if (enabled) {
  //   setOpened(true);

  //   // console.log(newEvent.time);

  //   // e.preventDefault();
  // };

  const handleInterviewEvent = (e) => {
    // handleOnTitleKeys();
    // if (enabled) {
    setOpened(true);

    // console.log(newEvent.time);

    const purposex = "INTERVIEW";

    const startimex = new Date(interview).getTime();
    const endTmex = new Date(interviewE).getTime();
    console.log(reminder);
    const reminderTimex = new Date(reminder).getTime();
    console.log(reminderTimex);
    console.log(timeZonex);
    const currTime = new Date().getTime();

    const startimeWTZ = new Date(startimex).getHours();
    const endTmeWTZ = new Date(endTmex).getHours();
    const reminderTimeWTZ = new Date(reminderTimex).getHours();
    console.log(startimeWTZ);
    console.log(endTmeWTZ);
    console.log(reminderTimeWTZ);
    console.log(offsetx);

    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    const createdByx = data11.personalID;

    const raw = JSON.stringify({
      orgID: orgIDs,
      createdBy: createdByx,
      title: titlex,
      description: descriptionx,
      purpose: purposex,
      startTime: startimex,
      endTime: endTmex,
      reminderTime: reminderTimex,
      timezone: timeZonex,
      videoMeetingLink: link,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (endTmex < startimex || endTmex < currTime || startimex < currTime) {
      MySwal.fire({
        title: "Invalid Date",
        type: "error",
        text: "Please Enter A Date From The Future",
      });

      setOpened(false);
    } else {
      fetch(`${process.env.REACT_APP_RAGA_URL}/appointment/add`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          // setAppointmentParams(result.data.id);

          setOpened(false);
          if (result.message === "Expired Access") {
            navigate("/authentication/sign-in");
          }
          if (result.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
          }
          if (result.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
          }

          const payload = [];
          // eslint-disable-next-line array-callback-return
          userNInfox.map((item) => {
            const namex = `${item.personal.fname} ${item.personal.lname}`;
            const onePayload = {
              orgID: orgIDs,
              appointmentID: result.data.id,
              name: namex,
              email: item.personal.email,
              personalID: item.personal.id,
              appointmentTime: startimex,
            };

            payload.push(onePayload);
          });
          // eslint-disable-next-line array-callback-return
          emailAccount.map((item) => {
            const onePayload = {
              orgID: orgIDs,
              appointmentID: result.data.id,
              name: item.label,
              email: item.label,
              appointmentTime: startimex,
            };

            payload.push(onePayload);
          });
          // eslint-disable-next-line array-callback-return
          applicationx.map((item) => {
            const namex = `${item.personal.fname} ${item.personal.lname}`;
            const onePayload = {
              orgID: orgIDs,
              appointmentID: result.data.id,
              name: namex,
              email: item.personal.email,
              personalID: item.personal.id,
              appointmentTime: startimex,
            };

            payload.push(onePayload);
          });

          const rawa = JSON.stringify(payload);
          console.log(payload);
          console.log(rawa);
          const requestOptionsa = {
            method: "POST",
            headers: myHeaders,
            body: rawa,
            redirect: "follow",
          };

          fetch(`${process.env.REACT_APP_RAGA_URL}/appointmentParticipant/add`, requestOptionsa)
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resulta) => {
              console.log(resulta);
              setOpened(false);
              if (resulta.message === "Expired Access") {
                navigate("/authentication/sign-in");
              }
              if (resulta.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
              }
              if (resulta.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
              }
              MySwal.fire({
                title: resulta.status,
                type: "success",
                text: resulta.message,
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
          //   MySwal.fire({
          //     title: result.status,
          //     type: "success",
          //     text: result.message,
          //   }).then(() => {
          //     console.log(appointmentParams);
          //     handleParticipant(result);
          //   });
          // })
          // .catch((error) => {
          //   setOpened(false);
          //   MySwal.fire({
          //     title: error.status,
          //     type: "error",
          //     text: error.message,
          //   });
        });
    }
    // }
  };

  // const handleAddEvent = (e) => {
  //   handleOnTitleKeys();
  //   if (enabled) {
  //     setOpened(true);

  //     console.log(newEvent.time);

  //     const end = new Date(newEvent.time);
  //     end.setHours(23, 59, 59, 999);
  //     const eventTime = end.getTime();
  //     const eventName = newEvent.title;
  //     const CurTime = new Date().getTime();
  //     setAllEvents([...allEvents, newEvent]);

  //     e.preventDefault();
  //     const data11 = JSON.parse(localStorage.getItem("user1"));
  //     const orgIDs = data11.orgID;

  //     const raw = JSON.stringify([
  //       {
  //         orgID: orgIDs,
  //         name: eventName,
  //         freeDate: eventTime,
  //       },
  //     ]);
  //     const requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };
  //     if (eventTime < CurTime) {
  //       MySwal.fire({
  //         title: "Invalid Date",
  //         type: "error",
  //         text: "Please Enter A Date From The Future",
  //       });
  //     } else {
  //       fetch(`${process.env.REACT_APP_NSUTANA_URL}/freedays/add`, requestOptions)
  //         .then(async (res) => {
  //           const aToken = res.headers.get("token-1");
  //           localStorage.setItem("rexxdex", aToken);
  //           return res.json();
  //         })
  //         .then((result) => {
  //           setOpened(false);
  //           if (result.message === "Expired Access") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (result.message === "Token Does Not Exist") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (result.message === "Unauthorized Access") {
  //             navigate("/authentication/forbiddenPage");
  //           }
  //           MySwal.fire({
  //             title: result.status,
  //             type: "success",
  //             text: result.message,
  //           }).then(() => {
  //             window.location.reload();
  //           });
  //         })
  //         .catch((error) => {
  //           setOpened(false);
  //           MySwal.fire({
  //             title: error.status,
  //             type: "error",
  //             text: error.message,
  //           });
  //         });
  //     }
  //   }
  // };

  // Method to change type
  const AddChipData = (num) => {
    if (num === 1) {
      if (emailx !== "") {
        const chipData = {
          key: emailAccount.length + 1,
          label: emailx,
        };
        setEmailAccount((list) => [chipData, ...list]);
        setEmail("");
      }
    }
  };

  const AddChipDataApp = (filteredData, value) => {
    // setApplication((list) => [chipData, ...list]);
    setNewApplication((chips) => chips.filter((chip) => chip.id !== value));
    const filteredItems = filteredData.filter((item) => item.id === value);
    console.log(value);
    console.log(filteredData);
    console.log(filteredItems);
    setApplication((chips) => [filteredItems[0], ...chips]);
  };

  const handleKeyDown = (e, num) => {
    if (e.key === "Enter") {
      e.preventDefault();
      AddChipData(num);
    }
  };

  const handleCalTimezone = (value, timeZonee) => {
    const filteredItems = TimeZones.filter((item) => item.text === value);
    setOffset(filteredItems[0].offset);
    setTimeZonex(value, timeZonee);
  };

  // const handleScheduledInterrview = (value) => {
  //   navigate(`/interview-Schedule/scheduled-Interview?id=${value}`);
  // };
  const Gen = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const createdByx = data11.personalID;
    const code = `${Math.random().toString(32).slice(10)}-${Math.random()
      .toString(32)
      .slice(10)}-${Math.random().toString(32).slice(10)}`;
    const url = `https://cairo-videochat.netlify.app/room.html?room=${code}&adm=${Number(
      createdByx
    )}`;
    setLink(url);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox component="form" role="form">
          <MDBox
            variant="gradient"
            style={{ backgroundColor: "#f96d02" }}
            borderRadius="lg"
            coloredShadow="info"
            mx={0}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Add Interview Schedule
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="email">
              {" "}
            </MDTypography>
            <></>
          </MDBox>
          <Container>
            <div className="row">
              <div className="col-sm-6">
                <MDBox mt={2} mb={2}>
                  <MDInput
                    type="text"
                    value={titlex}
                    // onKeyUp={handleOnTitleKeys}
                    onChange={(e) => setTitle(e.target.value, titlex)}
                    label="Title *"
                    variant="standard"
                    style={{ width: "90%" }}
                  />
                </MDBox>
              </div>

              <div className="col-sm-6">
                <MDBox mt={2} mb={2}>
                  <MDInput
                    type="text"
                    value={descriptionx}
                    // onKeyUp={handleOnTitleKeys}
                    onChange={(e) => setDescription(e.target.value, descriptionx)}
                    label="Description"
                    variant="standard"
                    style={{ width: "90%" }}
                  />
                </MDBox>
              </div>
            </div>
          </Container>
          <Container>
            <div className="row">
              <div className="col-sm-12">
                <div align="center">
                  <MDBox variant="gradient" mx={0} mt={2} p={2} mb={2} textAlign="center">
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                    >
                      Appointment Schedule*
                    </MDTypography>
                  </MDBox>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <TextField
                    id="datetime-local"
                    label="Start Time *"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={interview}
                    onChange={(e) => setInterview(e.target.value, interview)}
                  />
                </div>

                <div className="col-sm-3">
                  <TextField
                    id="datetime-local"
                    label="End Time *"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={interviewE}
                    onChange={(e) => setInterviewE(e.target.value, interviewE)}
                  />
                </div>

                <div className="col-sm-3">
                  <TextField
                    id="time"
                    label="Set Reminder"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={reminder}
                    onChange={(e) => setReminder(e.target.value, reminder)}
                  />{" "}
                </div>

                <div className="col-sm-3">
                  <Form.Select
                    value={timeZonex || ""}
                    aria-label="Default select example"
                    onChange={(e) => handleCalTimezone(e.target.value, timeZonex)}
                  >
                    <option>--Select Timezone--</option>
                    {TimeZones.map((apic) => (
                      <option key={apic.value} value={apic.text}>
                        {apic.text}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
            </div>
          </Container>
        </MDBox>
        <MDBox component="form" role="form">
          <MDBox variant="gradient" mx={0} mt={2} p={2} mb={2} textAlign="center">
            <MDTypography variant="h4" fontWeight="medium" color="info" mt={1}>
              Add Employees Within Organization
            </MDTypography>
          </MDBox>

          <Container>
            <div className="row">
              <div className="col-sm-6">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>--Select Employee--</Typography>
                  </AccordionSummary>
                  {userInfox.map((user) => (
                    <AccordionDetails key={user.personal.id}>
                      <Typography>
                        <Checkbox onClick={() => handleAddParicipant(user)} />
                        {user.personal.fname} {user.personal.lname}
                      </Typography>
                    </AccordionDetails>
                  ))}
                </Accordion>
              </div>

              <div className="col-sm-6">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>--Added Employee--</Typography>
                  </AccordionSummary>

                  {userNInfox.map((Nuser) => (
                    <AccordionDetails key={Nuser.personal.id}>
                      <Typography>
                        <Checkbox defaultChecked onClick={() => handleRemoveParicipant(Nuser)} />
                        {Nuser.personal.fname} {Nuser.personal.lname}
                      </Typography>
                    </AccordionDetails>
                  ))}
                </Accordion>
              </div>
            </div>
          </Container>
        </MDBox>
        &nbsp;
        {showApplications ? (
          <MDBox>
            <MDBox component="form" role="form">
              <MDBox variant="gradient" mx={0} mt={-3} p={2} mb={1} textAlign="center">
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Add Applicants
                </MDTypography>
              </MDBox>
            </MDBox>
            <Container>
              <div className="row">
                <div className="col-sm-6">
                  <MDBox variant="gradient" mx={0} mt={-3} p={1} mb={1} textAlign="center">
                    <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                      Removed Applicants
                    </MDTypography>
                  </MDBox>
                  <MDBox>
                    <Paper sx={style} component="ul">
                      {newApplicationx.map((data) => (
                        <ListItem key={data.id}>
                          <Chip
                            label={`${data.personal.fname} ${data.personal.lname}`}
                            onClick={() => AddChipDataApp(newApplicationx, data.id)}
                          />
                        </ListItem>
                      ))}
                    </Paper>
                  </MDBox>
                </div>
                <div className="col-sm-6">
                  <MDBox variant="gradient" mx={0} mt={-3} p={1} mb={1} textAlign="center">
                    <MDTypography variant="h6" fontWeight="medium" color="White" mt={1}>
                      Added Applicants
                    </MDTypography>
                  </MDBox>
                  <Paper sx={style} component="ul">
                    {applicationx.map((data) => (
                      <ListItem key={data.id}>
                        <Chip
                          label={`${data.personal.fname} ${data.personal.lname}`}
                          onDelete={handleApplicantDelete(applicationx, data.id)}
                        />
                      </ListItem>
                    ))}
                  </Paper>
                </div>
              </div>
            </Container>
          </MDBox>
        ) : (
          <MDBox />
        )}
        {showNonApplications ? (
          <MDBox>
            &nbsp;
            <MDBox component="form" role="form">
              <MDBox variant="gradient" mx={0} mt={-3} p={2} mb={1} textAlign="center">
                <MDTypography variant="h4" fontWeight="medium" color="info" mt={1}>
                  Add Participants Not In The Organization
                </MDTypography>
              </MDBox>
            </MDBox>
            <Container>
              <div className="row">
                <div className="col-sm-6">
                  <MDBox>
                    <MDInput
                      type="text"
                      label="Email *"
                      value={emailx || ""}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, 1)}
                      // onKeyUp={() => handleOnPEmailKeys()}
                      variant="standard"
                      style={{ width: "80%" }}
                    />
                    <MDButton
                      variant="gradient"
                      onClick={() => AddChipData(1)}
                      style={{ backgroundColor: "#f96d02" }}
                      width="30%"
                      align="center"
                      size="small"
                    >
                      <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                        add
                      </MDTypography>
                    </MDButton>
                  </MDBox>
                </div>
                <div className="col-sm-6">
                  <Paper sx={style} component="ul">
                    {emailAccount.map((data) => (
                      <ListItem key={data.key}>
                        <Chip label={data.label} onDelete={handleEmailDelete(data)} />
                      </ListItem>
                    ))}
                  </Paper>
                </div>
              </div>
            </Container>
          </MDBox>
        ) : (
          <MDBox />
        )}
        <MDBox mt={3} mb={5} textAlign="center">
          <MDTypography
            variant="h4"
            fontWeight="medium"
            style={{ backgroundColor: "#f96d02", marginTop: "20px" }}
            mt={8}
            mb={3}
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Generate A Video Call Link For The Interview
            </MDTypography>
          </MDTypography>
          <MDInput variant="outlined" disabled style={{ width: "50%" }} value={link} />
          <br />
          <MDButton
            variant="gradient"
            color="white"
            style={{ backgroundColor: "#f96d02", marginTop: "20px" }}
            onClick={() => Gen()}
            width="30%"
            align="center"
            size="small"
          >
            <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
              Generate
            </MDTypography>
          </MDButton>
        </MDBox>
        <Container>
          <div className="row">
            <div align="center">
              <MDBox mt={2} mb={2}>
                <MDButton
                  variant="gradient"
                  color="white"
                  onClick={handleInterviewEvent}
                  style={{ backgroundColor: "#f96d02" }}
                  width="30%"
                  align="left"
                >
                  <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                    Add Participant
                  </MDTypography>
                </MDButton>
              </MDBox>
            </div>
          </div>
        </Container>
      </Card>
      {/* <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Calendar
          </MDTypography>
        </MDBox>
        <Calendar
          localizer={localizers}
          events={allEvents}
          startAccessor="time"
          endAccessor="time"
          style={{ height: 700, margin: "50px" }}
        />
      </Card> */}
      &nbsp; &nbsp;
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox
            variant="gradient"
            style={{ backgroundColor: "#f96d02" }}
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Calendar
            </MDTypography>
          </MDBox>
          <Calendar
            localizer={localizers}
            events={allEvents}
            startAccessor="time"
            endAccessor="end"
            style={{ height: 700, margin: "50px" }}
          />
        </MDBox>
      </Card>
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
      &nbsp; &nbsp;
      {/* <Card style={{ backgroundColor: "#A0B6F5" }}>
        <MDBox pt={3}>
          <Container>
            <div className="row">
              <div align="center">
                <MDBox mt={2} mb={2}>
                  <MDButton
                    variant="gradient"
                    onClick={() => handleScheduledInterrview()}
                    color="info"
                    width="50%"
                    align="left"
                  >
                    View Scheduled Interview
                  </MDButton>
                </MDBox>
              </div>
            </div>
          </Container>
        </MDBox>
      </Card> */}
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default InterviewSchedule;
