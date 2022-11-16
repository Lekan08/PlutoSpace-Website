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
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";

function Updateonboarding() {
  const MySwal = withReactContent(Swal);
  const [opened, setOpened] = useState(false);
  // const [createdByxx] = useState("");
  const [idx, setIdx] = useState("");
  const [terminatedByx, setTerminatedBy] = useState("");
  const [terminatedTimex, setTerminatedTime] = useState("");
  const [onboardingx, setOnboardingx] = useState("");
  const [deleteFlagx, setDeleteFlag] = useState("");
  const [status, setstatus] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const navigate = useNavigate();
  const [userxx, setUserxx] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

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
        }
      });
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
          console.log(result);
          setIdx(result[0].id);
          setEnd(result[0].endTime);
          setStart(result[0].startTime);
          setOnboardingx(result[0].empID);
          setDeleteFlag(result[0].deleteFlag);
          setTerminatedBy(result[0].terminatedBy);
          setTerminatedTime(result[0].terminatedTime);
          setstatus(result[0].status);
        }
        console.log(result);
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

  const handleUpdate = () => {
    const OpeningDate = new Date(start).getTime();
    const ClosingDate = new Date(end).getTime();
    console.log(onboardingx, start, end, OpeningDate, status, ClosingDate);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const createdByxx = data11.personalID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      id: idx,
      empID: Number(onboardingx),
      startTime: OpeningDate,
      endTime: ClosingDate,
      status: 1,
      createdBy: Number(createdByxx),
      deleteFlag: deleteFlagx,
      terminatedBy: terminatedByx,
      terminatedTime: terminatedTimex,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_RAGA_URL}/onboarding/update`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        // setOpened(false);
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
        console.log(result);
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
                Update Onboarding User
              </MDTypography>
            </MDBox>
            <br />
            <MDBox>
              <Container>
                <MDBox mx={2}>
                  <div className="row">
                    <div className="col-sm-0">
                      {/* <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
                        color="text"
                      >
                        Account Owner
                      </MDTypography>
                      <Form.Select
                        value={createdByx}
                        onChange={(e) => setCreatedByx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Select Account Owner</option>
                        {userxx.map((api) => (
                          <option key={api.personal.id} value={api.personal.id}>
                            {api.personal.fname} {api.personal.lname}
                          </option>
                        ))}
                      </Form.Select> */}
                    </div>
                    <MDBox>
                      <div className="col-sm-6" style={{ marginLeft: "auto", marginRight: "auto" }}>
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          fontSize="80%"
                          textAlign="center"
                          color="text"
                        >
                          Onboarding User
                        </MDTypography>
                        <Form.Select
                          value={onboardingx}
                          onChange={(e) => setOnboardingx(e.target.value)}
                          aria-label="Default select example"
                        >
                          <option value="">Select Onboarding User</option>
                          {userxx.map((api) => (
                            <option key={api.personal.id} value={api.personal.id}>
                              {api.personal.fname} {api.personal.lname}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                    </MDBox>
                  </div>
                </MDBox>
                <br />
              </Container>

              <MDBox textAlign="center" mx={3}>
                <Row style={{ paddingBottom: "70px" }}>
                  <Col>
                    <MDTypography
                      variant="p"
                      textAlign="center"
                      fontWeight="light"
                      color="secondary"
                      fontSize="90%"
                    >
                      <br />
                      Onboarding Begins
                    </MDTypography>
                    <Container>
                      <DatePicker
                        placeholderText="MM/DD/YY"
                        style={{ marginRight: "2px" }}
                        selected={start}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onChange={(time) => setStart(time)}
                      />
                    </Container>
                  </Col>
                  <Col>
                    <MDTypography
                      variant="p"
                      textAlign="center"
                      fontWeight="light"
                      color="secondary"
                      fontSize="90%"
                    >
                      <br />
                      Onboarding Ends
                    </MDTypography>
                    <Container>
                      <DatePicker
                        placeholderText="MM/DD/YY"
                        style={{ marginRight: "10px" }}
                        selected={end}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onChange={(time) => setEnd(time)}
                      />
                    </Container>
                  </Col>
                </Row>
                <MDBox textAlign="center" p={3}>
                  <MDButton
                    textAlign="center"
                    color="success"
                    variant="gradient"
                    onClick={handleUpdate}
                    size="large"
                  >
                    ADD
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
export default Updateonboarding;
