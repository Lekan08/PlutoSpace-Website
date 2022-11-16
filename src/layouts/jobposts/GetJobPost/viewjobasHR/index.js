// @mui material components

// Soft UI Dashboard React components
// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";

// import MDBox from "components/MDBox";
import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import withReactContent from "sweetalert2-react-content";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import "react-datepicker/dist/react-datepicker.css";
import GHeaders from "getHeader";
import Backdrop from "@mui/material/Backdrop";
// import Swal from "sweetalert2";
// import PHeaders from "postHeader";
import CircularProgress from "@mui/material/CircularProgress";

function ViewParticularjob() {
  //   const MySwal = withReactContent(Swal);
  const [jobPost, setJobPost] = useState([]);
  const [jobApplication, setjobApplication] = useState([]);
  // const MySwal = withReactContent(Swal);
  const [opened, setOpened] = useState(false);
  // const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { allGHeaders: miHeaders } = GHeaders();
  // const { allPHeaders: myHeaders } = PHeaders();

  // Method to change date from timestamp
  // const changeDate = (timestamp) => {
  //   const date = new Date(timestamp);
  //   const retDate = date.toDateString();
  //   return retDate;
  // };

  const handleGetJobPostOrApplication = () => {
    setOpened(true);
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const jobPostID = urlParams.get("jobPostID");
    const jobApplicationID = urlParams.get("jobApplicationID");
    console.log(`jobPostID: ${jobPostID}`);
    if (jobPostID !== null && jobPostID !== "null" && jobPostID !== "")
      if (jobApplicationID !== null && jobApplicationID !== "null" && jobPostID !== "") {
        fetch(
          `${process.env.REACT_APP_RAGA_URL}/jobApplicationStageResult/getForApplication/${jobPostID}/${jobApplicationID}`,
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
            console.log(result);
            setjobApplication(result[0].jobApplicationID);
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

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/jobPost/getByIds/${ids}`, { headers })
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
          setJobPost(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={30}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={1}
            mt={2}
            p={2}
            mb={1}
            textAlign="left"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" textAlign="center" mt={1}>
              View Job Application History (HR)
            </MDTypography>
          </MDBox>
          <MDBox>
            <Container>
              <div className="row">
                <div className="col-sm-12">
                  {jobPost.length > 0 && (
                    <Card sx={{ maxWidth: 800 }}>
                      <CardContent>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="120%"
                          textAlign="left"
                          mt={0}
                        >
                          jobPost: {jobPost[0].location}
                        </MDTypography>
                      </CardContent>
                    </Card>
                  )}
                </div>
                <div>
                  {jobApplication.length > 0 && (
                    <Card sx={{ maxWidth: 800 }}>
                      <CardContent>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="120%"
                          textAlign="left"
                          mt={0}
                        >
                          {/* jobApplicationID: {jobApplication[0].jobApplication} */}
                        </MDTypography>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </Container>
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default ViewParticularjob;
