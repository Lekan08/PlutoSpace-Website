/* eslint-disable no-param-reassign */
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
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DataTable from "examples/Tables/DataTable";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import timezones from "layouts/appointments/timezones.json";
import CalendarData from "./data";

function Appointments() {
  // eslint-disable-next-line prefer-const
  const [checkedName, setCheckedName] = useState("");
  const [enabled, setEnabled] = useState("");
  const { columns: pColumns, rows: pRows } = CalendarData();
  const [applicantx, setApplicantx] = useState([]);
  const [emailx, setEmail] = useState([]);
  const MySwal = withReactContent(Swal);
  const timezonex = timezones;
  const [newEvent, setNewEvent] = useState({ title: "", time: "", end: "" });
  // eslint-disable-next-line no-unused-vars
  const [allEvents, setAllEvents] = useState([]);

  const [emailAccount, setEmailAccount] = React.useState([]);
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const purpose = "APPOINTMENT";
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [duty, setDutyRelieverx] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState([]);
  const [remind, setRemind] = useState(0);
  const [reminde, setReminde] = useState("");
  const [timezone, setTimezone] = useState("");
  const [validate, setValidate] = useState("");
  const [errorx, setError] = useState(false);
  // const changeDate = (timestamp) => {
  //   const date = new Date(timestamp);
  //   const retDate = date.toDateString();
  //   return retDate;
  // };
  function timezoneConverter(timestamp) {
    const selectedTimeZone = timezone.split("|")[1].slice(1);
    const selectedTime = new Date(timestamp);
    const convertedTime = new Date(selectedTime).toLocaleString("en-US", {
      timeZone: selectedTimeZone,
    });
    const realTime = new Date(convertedTime).getTime();
    return realTime;
  }
  // const [appID, setAppID] = useState("");
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
          setUser(result);
          setOpened(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    const eventList = [];
    const d = new Date(new Date().getFullYear(), 0, 1);
    const s = new Date(new Date().getFullYear(), 12, 1);
    const strt = d.getTime();
    const end = s.getTime();
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const perso = data11.personalID;
    // console.log(data11);
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_RAGA_URL}/appointment/getMyCalendar/${orgIDs}/${perso}?startTime=${strt}&endTime=${end}`,
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
          const data = result;
          const dara = [];
          data.forEach((r) => {
            if (r.purpose === "APPOINTMENT") {
              dara.push(r);
            }
          });
          // eslint-disable-next-line array-callback-return
          dara.map((item) => {
            const fdy = {
              title: item.title,
              time: new Date(item.startTime),
              end: new Date(item.endTime),
            };
            eventList.push(fdy);
          });
          setAllEvents(eventList);
          // const resultx = result;
          // const apu = resultx.map((item) => ({
          //   title: item.name,
          //   time: new Date(item.freeDate),
          // }));
          // console.log(apu);
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
  };

  const start = new Date(newEvent.time);
  const end = new Date(newEvent.end);
  const endTime = end.getTime();
  const eventTime = start.getTime();
  const eventName = newEvent.title;
  const CurTime = new Date().getTime();

  const handleAddEvent = (e) => {
    handleOnTitleKeys();
    // console.log(newEvent);
    // const eventList = [];
    // const hoe = eventList.push(newEvent);
    // setAllEvents(hoe);
    if (enabled) {
      setOpened(true);
      // setAllEvents([...allEvents, newEvent]);
      // console.log(allEvents);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;

      const raw = JSON.stringify({
        orgID: orgIDs,
        title: eventName,
        createdBy: duty,
        description: description,
        purpose: purpose,
        reminderTime: remind,
        startTime: eventTime,
        endTime: endTime,
        timezone: timezone,
        videoMeetingLink: link,
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
        fetch(`${process.env.REACT_APP_RAGA_URL}/appointment/add`, requestOptions)
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
              appointmentTime: timezoneConverter(time),
              appointmentID: result.data.id,
            }));
            // eslint-disable-next-line array-callback-return
            emailAccount.map((item) => {
              const onePayload = {
                orgID: orgIDs,
                appointmentID: result.data.id,
                name: item.label,
                email: item.label,
                appointmentTime: timezoneConverter(time),
              };

              raww.push(onePayload);
            });
            const raw2 = JSON.stringify(raww);
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
              })
              .catch((error) => {
                console.log(error);
              });
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
    }
  };

  const handleValidate = (e) => {
    if (eventName && description && eventTime && endTime && remind && timezone && duty !== "") {
      handleAddEvent(e);
      setEnabled(true);
    } else {
      setEnabled(false);
      MySwal.fire({
        title: "EMPTY_TEXTFIELDS",
        type: "error",
        text: "Fill Empty_TextFields",
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
  const addEm = (api) => {
    // const applicantr = [];
    const mapper = {
      orgID: api.personalCompany.orgID,
      name: `${api.personal.fname} ${api.personal.lname}`,
      email: api.personal.email,
      personalID: api.personal.id,
    };
    applicantx.push(mapper);
    setApplicantx(applicantx);
  };
  const deleteEm = (api) => {
    for (let i = applicantx.length - 1; i >= 0; --i) {
      if (applicantx[i].personalID === api.personal.id) {
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
  const AddChipData = (num) => {
    if (num === 1) {
      if (emailx !== "") {
        const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
        if (!emailx.match(letters)) {
          setError(true);
          setValidate("input a valid email");
        }
        if (emailx.match(letters)) {
          setError(false);
          const chipData = {
            key: Math.floor(Math.random() * 1000),
            label: emailx,
          };
          setEmailAccount((list) => [chipData, ...list]);
          setEmail("");
        }
      }
    }
  };
  const handleKeyDown = (e, num) => {
    if (e.key === "Enter") {
      e.preventDefault();
      AddChipData(num);
    }
  };
  const handleEmailDelete = (chipToDelete) => () => {
    setEmailAccount((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    console.log(emailAccount);
  };

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
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Schedule An Appointment
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

              <div style={{ marginRight: "auto", marginLeft: "auto" }}>
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  fontSize="80%"
                  // align="left"
                  color="text"
                  mt={2}
                >
                  Reminder
                </MDTypography>{" "}
                <br />
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
                      <option key={api.personal.id} value={api.personal.id}>
                        {api.personal.fname} {api.personal.lname}
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
            <div className="col-sm-5">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Select Participants</Typography>
                </AccordionSummary>
                <Form>
                  {user.map((api) => (
                    <div key={api.personal.id} className="mb-3">
                      <Form.Check.Input
                        type="checkbox"
                        // defaultChecked={checked}
                        onClick={(e) => applicant(e, api)}
                      />
                      <Form.Check.Label>
                        &nbsp;{api.personal.fname} {api.personal.lname}
                      </Form.Check.Label>
                    </div>
                  ))}
                </Form>
              </Accordion>
            </div>
            <br />
            <hr />
            <MDBox mt={3} mb={3}>
              &nbsp;
              <MDBox component="form" role="form">
                <MDBox variant="gradient" mx={2} mt={-3} p={2} mb={1} textAlign="center">
                  <MDTypography variant="h5" fontWeight="medium" color="warning" mt={1}>
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
                        color="warning"
                        width="50%"
                        align="center"
                        size="small"
                      >
                        Add
                      </MDButton>
                      <br />
                      {errorx && <i style={{ color: "red", fontSize: "12px" }}>{validate}</i>}
                    </MDBox>
                  </div>
                  <div className="col-sm-6">
                    <Paper sx={style} component="ul">
                      {emailAccount.map((data) => (
                        <ListItem key={data.index}>
                          <Chip label={data.label} onDelete={handleEmailDelete(data)} />
                        </ListItem>
                      ))}
                    </Paper>
                  </div>
                </div>
              </Container>
            </MDBox>
            <hr />
            <MDBox>
              <MDTypography variant="h5" fontWeight="medium" color="warning" mt={8} mb={3}>
                Generate A Video Call Link For The Appointment
              </MDTypography>
              <MDInput variant="outlined" disabled style={{ width: "90%" }} value={link} />
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
                onClick={handleValidate}
                color="warning"
                width="50%"
                align="left"
              >
                Add appointment
              </MDButton>
            </MDBox>
          </div>
        </MDBox>
      </Card>
      &nbsp;
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
        <CircularProgress color="warning" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default Appointments;
