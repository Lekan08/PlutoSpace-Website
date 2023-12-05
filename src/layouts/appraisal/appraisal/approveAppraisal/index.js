import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";

import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { Form } from "react-bootstrap";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Styles from "styles";
import "./index.css";

function ApproveApp() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  // MODAL
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
    height: "auto",
    display: "block",
    "&::-webkit-scrollbar": {
      width: "10px",
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

  const cardBorder = {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  };

  const [aQuestions, setAQuestions] = useState([
    // {
    //   id: 900,
    //   question:
    //     "polling.js:311GET http://localhost:3001/socket.io/?EIO=4&transport=polling&t=ODXX2Gf net::ERR_FAILED 200create @ polling.js:31doOpen @ polling.js:58 open @ transport.js:49open @ socket.js:16 Socket @ socket.js:10 open @ manager.js:10 (anonymous) @ manager.js:3setTimeout (async)reconnect @ manager.js:313(anonymous) @ manager.js:3(anonymous) @ manager.js:124",
    // },
  ]);
  const [appraisalJournies, setAppraisalJournies] = useState([]);
  const [appraisal, setAppraisal] = useState({});
  const [user, setUser] = useState([]);
  const [userIDx, setUserIDx] = useState("");
  const [opened, setOpened] = useState(false);
  const [UOpened, setUOpened] = useState(false);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const scrollContainerStyle = { width: "100%", maxHeight: "88%" };

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
    const id = urlParams.get("id");

    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalJourney/gets/${orgIDs}/${id}`, {
      headers,
    })
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
          setAppraisalJournies(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // eslint-disable-next-line consistent-return
  const handleClick = (e, status) => {
    setOpened(true);
    e.preventDefault();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const personalIDx = data11.personalID;

    const headers = miHeaders;

    fetch(
      `${process.env.REACT_APP_SHASHA_URL}/appraisal/approveOrDecline/${id}/${status}/${personalIDx}`,
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
  };

  useEffect(() => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/getByIds/${id}`, { headers })
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
          setAppraisal(result[0]);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const data11 = JSON.parse(localStorage.getItem("user1"));

    setOpened(true);
    const orgIDs = data11.orgID;

    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/questions/gets/${orgIDs}/${id}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        console.log(result);
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
        if (result.length !== 0) {
          const eachQuestions = [];
          // eslint-disable-next-line array-callback-return
          result.map((item) => {
            fetch(
              `${process.env.REACT_APP_SHASHA_URL}/appraisalQuestion/getByIds/${item.questionID}`,
              {
                headers,
              }
            )
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                return res.json();
              })
              .then((resultq) => {
                setOpened(false);
                if (resultq.message === "Expired Access") {
                  navigate("/authentication/sign-in");
                  window.location.reload();
                }
                if (resultq.message === "Token Does Not Exist") {
                  navigate("/authentication/sign-in");
                  window.location.reload();
                }
                if (resultq.message === "Unauthorized Access") {
                  navigate("/authentication/forbiddenPage");
                  window.location.reload();
                }
                if (isMounted) {
                  //   console.log(resultq);
                  const fdy = { id: eachQuestions.length, question: resultq[0].question.question };
                  eachQuestions.push(fdy);

                  setAQuestions((itemm) => [...itemm, fdy]);
                }
              });
          });
          setAQuestions(eachQuestions);
        } else {
          setOpened(false);
          MySwal.fire({
            title: "NO_QUESTIONS_SET",
            type: "error",
            text: "There are no questions set for this Appraisal",
          }).then(() => {
            navigate("/dashboard", { replace: true });
            window.location.reload();
          });
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const handleView = () => {
    setUOpened(true);
    // console.log(showCard);
  };
  const handleForward = () => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;

    const raw = JSON.stringify({
      id: appraisal.id,
      orgID: orgIDs,
      appraiseeID: appraisal.appraiseeID,
      createdBy: appraisal.createdBy,
      name: appraisal.name,
      status: appraisal.status,
      approvalStatus: appraisal.approvalStatus,
      approvalID: userIDx,
      overallGradingID: appraisal.overallGradingID,
      createdTime: appraisal.CreatedTime,
      deleteFlag: appraisal.deleteFlag,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/update`, requestOptions)
      .then((res) => res.json())
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
        console.log(`STATUS - ${result.status} - - - - - - MESSAGE - ${result.message}`);
        const raw1 = JSON.stringify({
          orgID: orgIDs,
          appraisalID: appraisal.id,
          empID: userIDx,
        });
        const requestOptions1 = {
          method: "POST",
          headers: myHeaders,
          body: raw1,
          redirect: "follow",
        };
        fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalJourney/add`, requestOptions1)
          .then((res) => res.json())
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
            setOpened(false);
            setUOpened(false);
            MySwal.fire({
              title: resultx.status,
              type: "success",
              text: resultx.message,
            }).then(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
            setUOpened(false);
            setOpened(false);
            MySwal.fire({
              title: error.status,
              type: "error",
              text: error.message,
            }).then(() => {
              setUOpened(true);
            });
          });
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox>
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            style={Styles.boxSx}
            // coloredShadow="info"
            mx={0}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" textAlign="center" mt={1}>
              Appraisal: {appraisal.name}
            </MDTypography>
          </MDBox>

          <Grid container spacing={3}>
            <Grid item xs={4} md={4} lg={4}>
              {" "}
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
              <MDBox
                variant="gradient"
                bgColor="secondary"
                borderRadius="lg"
                coloredShadow="secondary"
                mt={1}
                p={2}
                mb={1}
                textAlign="left"
              >
                <MDTypography
                  variant="h4"
                  fontWeight="medium"
                  color="white"
                  fontSize="85%"
                  textAlign="center"
                  mt={1}
                >
                  For Appraisee: {appraisal.appraiseeName}
                </MDTypography>
              </MDBox>{" "}
            </Grid>
          </Grid>
          <MDBox pt={0} px={4}>
            &nbsp;
            <Grid container spacing={3}>
              {aQuestions.map((api) => (
                <Grid item xs={12} md={6} lg={4} key={api.id}>
                  <div>
                    <Card
                      style={{
                        backgroundColor: "#ffffff",
                        maxHeight: 150,
                        height: 70,
                        borderRadius: 5,
                        border: "2px solid #318CE7",
                      }}
                    >
                      <div
                        className="scrollbar scrollbar-primary mt-2 mx-auto"
                        style={scrollContainerStyle}
                      >
                        <MDTypography
                          variant="h4"
                          fontWeight="medium"
                          color="text"
                          fontSize="70%"
                          textAlign="left"
                          mt={1}
                          ml={2}
                        >
                          {api.question}
                        </MDTypography>
                      </div>
                    </Card>
                  </div>
                </Grid>
              ))}
            </Grid>
          </MDBox>
        </MDBox>
        <div align="center">
          <MDBox mt={4} mb={5}>
            <MDButton
              variant="gradient"
              onClick={(e) => handleClick(e, 1)}
              color="success"
              width="50%"
            >
              Approve
            </MDButton>{" "}
            &nbsp;
            <MDButton
              variant="gradient"
              onClick={(e) => handleClick(e, 2)}
              color="error"
              width="50%"
            >
              Decline
            </MDButton>{" "}
            &nbsp;
            <MDButton variant="gradient" onClick={handleView} color="warning" width="50%">
              Foward
            </MDButton>
          </MDBox>
        </div>{" "}
      </Card>
      <br /> <br />
      <Card>
        <MDBox>
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            style={Styles.boxSx}
            // coloredShadow="info"
            mx={0}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" textAlign="center" mt={1}>
              Appraisal Journey
            </MDTypography>
          </MDBox>

          <MDBox pt={0} px={4}>
            &nbsp;
            <Grid container spacing={3}>
              {appraisalJournies.map((api, index) => {
                let bool = true;
                let bool2 = false;
                const ajLenght = appraisalJournies.length - 1;
                if (index === 0) {
                  bool = false;
                }
                if (index === ajLenght) {
                  bool2 = true;
                }
                // console.log(bool);
                return (
                  <>
                    {bool && (
                      <Grid item xs={1} md={1} lg={1}>
                        <MDBox
                          variant="gradient"
                          bgColor="secondary"
                          borderRadius="lg"
                          coloredShadow="success"
                          textAlign="center"
                          style={{
                            alignItems: "#center",
                            height: 10,
                          }}
                        >
                          {" "}
                        </MDBox>
                      </Grid>
                    )}

                    <Grid item xs={4} md={4} lg={3} key={api.id}>
                      {/* <Card
                        style={{
                          backgroundColor: "#ffffff",
                          maxHeight: 150,
                          height: 40,
                          borderRadius: 5,
                          border: "2px solid #318CE7",
                        }}
                      >
                        <MDTypography
                          variant="h4"
                          fontWeight="medium"
                          color="text"
                          fontSize="70%"
                          textAlign="left"
                          mt={1}
                          ml={2}
                        >
                          {api.question}
                        </MDTypography>
                      </Card> */}

                      <MDBox
                        variant="gradient"
                        bgColor={bool2 ? "#f96d02" : "secondary"}
                        borderRadius="lg"
                        coloredShadow="secondary"
                        mx={2}
                        mt={-3}
                        p={1}
                        mb={1}
                        textAlign="center"
                      >
                        <MDTypography
                          variant="h6"
                          fontWeight="medium"
                          color="white"
                          fontSize="65%"
                          textAlign="center"
                          mt={1}
                        >
                          {api.empName}
                        </MDTypography>
                      </MDBox>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </MDBox>
        </MDBox>
        <br />
      </Card>
      <div>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={UOpened}>
          <Card sx={style} style={cardBorder}>
            <MDBox
              variant="gradient"
              // bgColor="info"
              borderRadius="lg"
              style={Styles.boxSx}
              // coloredShadow="info"
              mx={0}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                Forward To Another Employee
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
              <MDTypography variant="gradient" fontSize="60%" color="error" id="message">
                {" "}
              </MDTypography>
            </MDBox>
            <MDBox mt={2}>
              <MDTypography
                variant="button"
                fontWeight="regular"
                fontSize="80%"
                align="left"
                color="text"
              >
                Employee
              </MDTypography>
              <Form.Select
                value={userIDx}
                onChange={(e) => setUserIDx(e.target.value)}
                aria-label="Default select example"
              >
                <option value="">--Select Employee--</option>
                {user.map((api) => (
                  <option key={api.personal.id} value={api.personal.id}>
                    {api.personal.fname} {api.personal.lname}
                  </option>
                ))}
              </Form.Select>
              <br />
            </MDBox>
            <div align="center">
              <MDBox mt={4} mb={5}>
                <MDButton
                  variant="gradient"
                  onClick={handleForward}
                  // color="info"
                  style={Styles.buttonSx}
                  width="50%"
                >
                  Approve
                </MDButton>
              </MDBox>
            </div>
          </Card>
        </Backdrop>
      </div>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default ApproveApp;
