import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import TextField from "@mui/material/TextField";
import TimeZones from "layouts/interviewSchedule/timeZones/index.json";
// import DatePicker from "react-datepicker";
import MDButton from "components/MDButton";
import Footer from "examples/Footer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function InterviewDate() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [idx, setIdx] = useState("");
  const [titlex, setTitle] = useState("");
  const [purposex, setPurpose] = useState("");
  const [timeZonex, setTimeZonex] = useState("");
  const [createdByx, setCreatedBY] = useState("");
  const [createdTimex, setCreatedTime] = useState("");
  //   const [supplyingBranchNamex, setSupplyingBranchName] = useState("");
  // const [statusTYpex, setStatusType] = useState("");

  const [descriptionx, setDescription] = useState("");
  const [startTimex, setStartTime] = useState("");
  const [endTimex, setEndTime] = useState("");
  const [reminderTimex, setReminder] = useState("");
  const [deleteFlagx, setDeleteFlag] = useState("");
  const [opened, setOpened] = useState(false);

  // Method to fetch all AppointmentTime
  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/appointment/getByIds/${ids}`, {
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
          console.log(result);
          // eslint-disable-next-line eqeqeq
          if (result.length != 0) {
            setIdx(result[0].id);
            setTitle(result[0].title);
            setPurpose(result[0].purpose);
            setCreatedBY(result[0].createdBy);
            setDescription(result[0].description);
            setStartTime(result[0].startTime);
            setEndTime(result[0].endTime);
            setReminder(result[0].reminderTime);
            setDeleteFlag(result[0].deleteFlag);
            setTimeZonex(result[0].timezone);
            setCreatedTime(result[0].createdTime);
          } else {
            setIdx(null);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const changeDateandTime = (timestamp) => {
    const date = new Date(timestamp);
    let month = "0";
    if (date.getMonth() + 1 < 10) {
      const mymonth = date.getMonth() + 1;
      month += mymonth;
    } else {
      const mymonth = date.getMonth() + 1;
      month = mymonth;
    }
    let day = "0";
    if (date.getDate() < 10) {
      day += date.getDate();
    } else {
      day = date.getDate();
    }
    const retDate = `${date.getFullYear()}-${month}-${day}`;

    let hour = "0";
    let minutes = "0";

    if (date.getHours() < 10) {
      hour += date.getHours();
    } else {
      hour = date.getHours();
    }

    if (date.getMinutes() < 10) {
      minutes += date.getMinutes();
    } else {
      minutes = date.getMinutes();
    }

    return `${retDate}T${hour}:${minutes}`;
  };

  const handleUpdate = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const startTimexx = new Date(startTimex).getTime();
    const endTimexx = new Date(endTimex).getTime();
    const reminderTimexx = new Date(reminderTimex).getTime();
    const currTime = new Date().getTime();
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      createdBy: createdByx,
      createdTime: createdTimex,
      title: titlex,
      description: descriptionx,
      purpose: purposex,
      startTime: startTimexx,
      endTime: endTimexx,
      reminderTime: reminderTimexx,
      timezone: timeZonex,
      deleteFlag: deleteFlagx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (endTimexx < startTimexx || endTimexx < currTime || startTimexx < currTime) {
      MySwal.fire({
        title: "Invalid Date",
        type: "error",
        text: "Please Enter A Date From The Future",
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
          // setOpened(false);
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
      <div className="row">
        <div className="col-sm-2">&nbsp;</div>
        <div className="col-sm-8" align="center">
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="success"
                  mx={2}
                  mt={-6}
                  p={3}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                    Change Interview Date
                  </MDTypography>
                </MDBox>

                <MDBox component="form">
                  <MDBox mb={2} mt={5}>
                    <Container>
                      <div className="row">
                        <div className="col-sm-6">
                          <TextField
                            id="datetime-local"
                            label="Start Time *"
                            type="datetime-local"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={changeDateandTime(startTimex)}
                            onChange={(e) => setStartTime(e.target.value, startTimex)}
                          />
                        </div>

                        <div className="col-sm-6">
                          <TextField
                            id="datetime-local"
                            label="End Time *"
                            type="datetime-local"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={changeDateandTime(endTimex)}
                            onChange={(e) => setEndTime(e.target.value, endTimex)}
                          />
                        </div>
                      </div>
                    </Container>
                  </MDBox>
                  &nbsp;
                  <MDBox>
                    <Container>
                      <div className="row">
                        <div className="col-sm-6">
                          <TextField
                            id="datetime-local"
                            label="Set Reminder "
                            type="datetime-local"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={changeDateandTime(reminderTimex)}
                            onChange={(e) => setReminder(e.target.value, reminderTimex)}
                          />
                        </div>
                        <div className="col-sm-6">
                          <Form.Select
                            value={timeZonex || ""}
                            aria-label="Default select example"
                            onChange={(e) => setTimeZonex(e.target.value, timeZonex)}
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
                    </Container>
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      onClick={handleUpdate}
                      // disabled={!enabled}
                      color="info"
                      width="50%"
                      align="center"
                    >
                      Update
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </div>
      </div>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default InterviewDate;
