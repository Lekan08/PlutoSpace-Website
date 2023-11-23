/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
import React, { useState, useEffect } from "react";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Paper from "@mui/material/Paper";
import Accordion from "react-bootstrap/Accordion";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import ReactiveButton from "reactive-button";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Icon, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import DataTable from "examples/Tables/DataTable";
import withReactContent from "sweetalert2-react-content";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

export default function MultiSessionOffboarding() {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [items, setItems] = useState([]);
  // const [red, setRed] = useState(true);
  const [userxx, setUserxx] = useState([]);
  const [mentorx, setMentorx] = useState(0);
  const [otherx, setOtherx] = useState("");

  const [opening, setOpening] = useState(0);
  const [closing, setClosing] = useState(0);
  const [tickers, setTickers] = useState([]);
  const [filtTick, setFiltTick] = useState([]);
  const [names, setNames] = useState(false);
  const [field, setField] = useState(false);
  const [channelID, setChannelID] = useState("");
  const [keywordx, setKeywordx] = useState("");
  const [newword, setNewword] = useState([]);
  const [opened, setOpened] = useState(false);
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
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/offboarding/gets/${orgIDs}`, { headers })
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
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const handleCreate = () => {
    if (mentorx.length > 0) {
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      const raw3 = JSON.stringify({
        orgID: orgIDs,
        title: "Offboarding Meeting",
        createdBy: data11.personalID,
        description: "Offboarding Meeting",
        purpose: "OFFBOARDING",
        reminderTime: opening - 600000,
        startTime: opening,
        endTime: closing,
        timezone: "(UTC+01:00) West Central Africa | Africa/Algiers",
      });
      // console.log(raw3);
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
          console.log(result);
          if (result.message === "Expired Access") {
            navigate("/authentication/sign-in");
          }
          if (result.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
          }
          if (result.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
          }
          filtTick.push({
            orgID: data11.orgID,
            appointmentID: result.data.id,
            name: `${userxx.find((z) => z.personal.id === mentorx).personal.fname} ${
              userxx.find((z) => z.personal.id === mentorx).personal.lname
            }`,
            email: userxx.find((z) => z.personal.id === mentorx).personal.email,
            personalID: mentorx,
            appointmentTime: opening,
            rc: true,
          });
          const raw2 = JSON.stringify(
            filtTick
              .filter((r) => r.rc === true)
              .map((r) => ({
                orgID: r.orgID,
                appointmentID: result.data.id,
                name: r.name,
                personalID: r.personalID,
                appointmentTime: opening,
                email: r.email,
              }))
              .filter(
                (value, index, self) =>
                  index === self.findIndex((t) => t.personalID === value.personalID)
              )
          );
          console.log("participants", raw2);
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
              // console.log(resultr);
              const raw = JSON.stringify(
                filtTick.map((r) => ({
                  orgID: orgIDs,
                  mentorID: mentorx,
                  offboardingID: r.offboardingID,
                  appointmentID: result.data.id,
                }))
              );
              // console.log("sessions", raw);
              const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };

              fetch(
                `${process.env.REACT_APP_RAGA_URL}/offboardingSession/addMultiple`,
                requestOptions
              )
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
                    text: "Added Offboarding Session(s) successfully",
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
    } else console.log("no mentor");
  };
  const pwush = (c, details, indx) => {
    tickers[indx] = { id: indx, checked: c, ids: details };
    setTickers(tickers);
    const go = [];
    tickers.map((r) => {
      const ment = {
        rc: r.checked,
        orgID: r.ids.orgID,
        name: r.ids.empName,
        personalID: r.ids.empID,
        appointmentTime: opening,
        offboardingID: r.ids.id,
        email: userxx.find((z) => z.personal.id === r.ids.empID).personal.email,
      };
      return go.push(ment);
    });
    console.log(go);
    setFiltTick(go);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Paper elevation={3}>
        <div style={{ paddingTop: "20px" }} />
        <MDBox
          variant="gradient"
          bgColor="warning"
          borderRadius="lg"
          coloredShadow="info"
          mx={20}
          p={1}
          mb={5}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Create Offboarding Sessions for multiple Users
          </MDTypography>
        </MDBox>
        <Container>
          <MDBox textAlign="center" fontSize="80%">
            <div>
              {" "}
              <MDBox mx={40} textAlign="center">
                <MDTypography variant="button" fontWeight="regular" fontSize="80%" color="text">
                  Mentor
                </MDTypography>
                <Form.Select
                  // value={mentorx}
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
              <br /> <br />
              <hr />
              <b>Select Time :</b> <br />
              <Row>
                <Col style={{ paddingBottom: "2px" }}>
                  <div className="row">
                    <div className="col-sm-6">
                      <b style={{ fontSize: "11px" }}>offboarding session starts</b> <br />
                      <TextField
                        id="datetime-local"
                        // label="onboarding starts"
                        type="datetime-local"
                        // style={{ width: "150px" }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        // value={closing}
                        onChange={(e) => {
                          setOpening(new Date(e.target.value).getTime());
                        }}
                      />
                    </div>
                    <div className="col-sm-6">
                      <b style={{ fontSize: "11px" }}>offboarding session ends</b> <br />
                      <TextField
                        id="datetime-local"
                        // label="onboarding starts"
                        type="datetime-local"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        // value={closing}
                        onChange={(e) => {
                          setClosing(new Date(e.target.value).getTime());
                        }}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <hr />
              <br />
              <b>Select Offboarding Users :</b> <br />
              {items.map((api, indx) => {
                if (api.status !== 2)
                  return (
                    <Row key={api.id} style={{ textAlign: "left", borderBottom: "1px solid gray" }}>
                      <Col style={{ paddingTop: "10px" }} sm={4}>
                        <Form.Check.Input
                          type="checkbox"
                          value={api.id}
                          // defaultChecked={api.isCheck}
                          onClick={(e) => pwush(e.target.checked, api, indx)}
                        />
                        <Form.Check.Label style={{ fontSize: "16px" }}>
                          &nbsp;{api.empName}
                        </Form.Check.Label>
                      </Col>
                      &nbsp;
                    </Row>
                  );
                return null;
              })}
              <br />
              <ReactiveButton
                size="large"
                outline
                shadow
                animation
                width="200px"
                rounded
                color="teal"
                onClick={handleCreate}
                idleText="Create Sessions"
              />
            </div>
          </MDBox>
          <br />
        </Container>
      </Paper>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}
