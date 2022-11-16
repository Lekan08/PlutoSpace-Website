import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@mui/material/Grid";
// // import Icon from "@mui/material/Icon";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Divider } from "@mui/material";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
// import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
// import html2PDF from "jspdf-html2canvas";
// import jsPDF from "jspdf";
import JsPDF from "jspdf";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

function ViewApplication() {
  //   const MySwal = withReactContent(Swal);

  const [fnamex, setFname] = useState("");
  const [lnamex, setLname] = useState("");
  const [onamex, setOname] = useState("");
  const [emailx, setEmail] = useState("");
  const [phonex, setPhone] = useState("");
  const [residentialCityx, setResidentialCity] = useState("");
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");

  const [skillsx, setSkills] = useState([]);
  const [educationx, setEducation] = useState([]);
  const [workHistoryx, setWorkHistory] = useState([]);
  const [positionHeldx, setPositionHeld] = useState([]);

  const [opened, setOpened] = useState(false);

  const [showUser, setShowUser] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showWorkHistory, setShowWorkHistory] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showPositionHeld, setShowPositionHeld] = useState(false);

  const navigate = useNavigate();

  const { allGHeaders: miHeaders } = GHeaders();

  const changeDateandTime = (stimestamp, etimestamp) => {
    const sdate = new Date(stimestamp);
    let sdayx = "";
    let smonthx = "";
    let syearx = "";
    if (sdate !== null) {
      sdayx = sdate.getDate();
      smonthx = sdate.getMonth() + 1;
      syearx = sdate.getFullYear();
    }

    const edate = new Date(etimestamp);
    let edayx = "";
    let emonthx = "";
    let eyearx = "";
    if (edate !== null) {
      edayx = edate.getDate();
      emonthx = edate.getMonth() + 1;
      eyearx = edate.getFullYear();
    }
    return `${syearx}/${smonthx}/${sdayx} - ${eyearx}/${emonthx}/${edayx}`;
  };

  const getPersonalInfo = (id) => {
    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/get/${id}`, { headers })
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
        console.log(resultp);
        if (resultp.length > 0) {
          setShowUser(true);
        }
        setFname(resultp[0].fname);
        setLname(resultp[0].lname);
        setOname(resultp[0].oname);
        setEmail(resultp[0].email);
        setPhone(resultp[0].pno);
        setResidentialCity(resultp[0].residentialCity);
        setResidentialState(resultp[0].residentialState);
        setResidentialCountry(resultp[0].residentialCountry);
      });
  };

  const getRemainInfo = (id) => {
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/resume/getForEmployee/${id}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
        console.log(result);
        if (result === null) {
          setSkills([]);
          setWorkHistory([]);
          setEducation([]);
          setPositionHeld([]);
        } else {
          setSkills(result.skills);
          setWorkHistory(result.workHistories);
          setEducation(result.educations);
          setPositionHeld(result.positionHelds);
        }
        if (result.skills.length > 0) {
          setShowSkills(true);
        }
        if (result.workHistories.length > 0) {
          setShowWorkHistory(true);
        }
        if (result.educations.length > 0) {
          setShowEducation(true);
        }
        if (result.positionHelds.length > 0) {
          setShowPositionHeld(true);
        }
      });
  };

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/jobApplication/getByIds/${ids}`, { headers })
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
        if (isMounted) {
          console.log(resultp);
          if (resultp.length > 0) {
            getPersonalInfo(resultp[0].personal.id);
            getRemainInfo(resultp[0].personal.id);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // const printDocument = () => {
  //   const input = document.getElementById("divToPrint");
  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     // eslint-disable-next-line new-cap
  //     const pdf = new jsPDF();
  //     pdf.addImage(imgData, "JPEG", 0, 0);
  //     // pdf.output('dataurlnewwindow');
  //     pdf.save(`${fnamex}_${onamex}_${lnamex}_Application.pdf`);
  //   });
  // };

  // function printDoc() {
  //   setOpened(true);
  //   const page = document.getElementById("divToPrint");
  //   html2PDF(page, {
  //     jsPDF: {
  //       format: "a4",
  //     },
  //     imageType: "image/jpeg",
  //     output: `./${fnamex}_${onamex}_${lnamex}_Application.pdf`,
  //   });
  //   setOpened(false);
  // }

  const printDoc = () => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setTimeout(() => {
        setOpened(true);
      }, 100);

      const divToPrint = document.querySelector("#divToPrint");
      html2canvas(divToPrint).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg");
        const imgWidth = 190;
        const pageHeight = 290;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        const doc = new JsPDF("pt", "mm");
        let position = 0;
        doc.addImage(imgData, "PNG", 10, 0, imgWidth, imgHeight + 25);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight + 25);
          heightLeft -= pageHeight;
        }
        doc.save(`${fnamex}_${onamex}_${lnamex}_Application.pdf`);
        setOpened(false);
      });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={printDoc} color="info" width="50%" align="left">
                Export
              </MDButton>
            </MDBox>
            <Paper
              id="divToPrint"
              sx={{
                display: "flex",
                "& > :not(style)": {
                  width: 2480,
                  height: 3508,
                  maxWidth: 2480,
                  maxHeight: 3508,
                },
              }}
              variant="outlined"
              square
            >
              <Paper
                style={{
                  backgroundColor: "info",
                  width: 720,
                  height: 3508,
                  maxWidth: 720,
                  maxHeight: 3508,
                }}
                variant="outlined"
                square
              >
                {showUser ? (
                  <MDBox>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12} lg={12}>
                        <MDTypography
                          variant="h3"
                          fontWeight="medium"
                          color="black"
                          ml={2}
                          mt={3}
                          mb={-3}
                        >
                          {`${fnamex} ${lnamex} ${onamex}`}
                          <Divider />
                        </MDTypography>
                      </Grid>
                    </Grid>
                    <br />
                    <MDBox id="personalInfo">
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                          <Stack direction="row" spacing={1} ml={2} mb={-4}>
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                              }}
                              style={{
                                backgroundColor: "black",
                              }}
                            >
                              <Icon fontSize="medium" color="white">
                                person
                              </Icon>
                            </Avatar>
                            <MDTypography variant="h4" fontWeight="medium" color="black">
                              Personal Information
                              <Divider />
                            </MDTypography>
                          </Stack>
                        </Grid>
                      </Grid>
                      <br />
                      <MDBox>
                        <MDTypography variant="h5" fontWeight="medium" color="black" ml={2} mt={1}>
                          Email
                        </MDTypography>
                        <MDTypography variant="h6" fontWeight="light" color="black" ml={2}>
                          {emailx}{" "}
                        </MDTypography>
                      </MDBox>
                      <MDBox>
                        <MDTypography variant="h5" fontWeight="medium" color="black" ml={2} mt={2}>
                          Phone
                        </MDTypography>
                        <MDTypography variant="h6" fontWeight="light" color="black" ml={2}>
                          {phonex}{" "}
                        </MDTypography>
                      </MDBox>
                      <MDBox>
                        <MDTypography variant="h5" fontWeight="medium" color="black" ml={2} mt={2}>
                          Residental Area
                        </MDTypography>
                        <MDTypography variant="h6" fontWeight="light" color="black" ml={2}>
                          {`${residentialCityx} ${residentialStatex}, ${residentialCountryx}`}{" "}
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                    <br />
                  </MDBox>
                ) : (
                  <MDBox />
                )}
                {showSkills ? (
                  <MDBox>
                    <MDBox id="skills">
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                          <Stack direction="row" spacing={1} ml={2} mb={-2}>
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                              }}
                              style={{
                                backgroundColor: "black",
                              }}
                            >
                              <Icon fontSize="medium" color="white">
                                accessibility
                              </Icon>
                            </Avatar>
                            <MDTypography variant="h4" fontWeight="medium" color="black">
                              Skills
                              <Divider />
                            </MDTypography>
                          </Stack>
                        </Grid>
                      </Grid>
                      <MDBox ml={2}>
                        {skillsx.map((item) => (
                          <MDBox key={item.id}>
                            <MDTypography
                              variant="h5"
                              fontWeight="medium"
                              color="black"
                              ml={2}
                              mt={2}
                            >
                              {item.name}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="light" color="black" ml={2}>
                              {item.descrip}{" "}
                            </MDTypography>
                          </MDBox>
                        ))}
                      </MDBox>
                    </MDBox>
                    <br />
                  </MDBox>
                ) : (
                  <MDBox />
                )}
                <MDBox mb={5}> &nbsp;</MDBox>
              </Paper>
              <Paper
                style={{
                  color: "318CE7",
                  width: 1760,
                  height: 3508,
                  maxWidth: 1760,
                  maxHeight: 3508,
                }}
                variant="outlined"
                square
              >
                <MDBox ml={2} mb={-2} mt={8} />
                {showWorkHistory ? (
                  <MDBox>
                    <MDBox id="workHistory">
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                          <Stack direction="row" spacing={1} ml={2} mb={-2} mt={5}>
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                              }}
                              style={{
                                backgroundColor: "black",
                              }}
                            >
                              <Icon fontSize="medium" color="white">
                                work_history
                              </Icon>
                            </Avatar>
                            <MDTypography variant="h4" fontWeight="medium" color="black">
                              Work History
                              <Divider />
                            </MDTypography>
                          </Stack>
                        </Grid>
                      </Grid>
                      <MDBox ml={2}>
                        {workHistoryx.map((item) => (
                          <MDBox key={item.id}>
                            <MDTypography
                              variant="h5"
                              fontWeight="medium"
                              color="black"
                              ml={2}
                              mt={2}
                            >
                              {item.name}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="medium" color="black" ml={2}>
                              {item.position}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="light" color="black" ml={2}>
                              {item.descrip}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="light" color="black" ml={2}>
                              {changeDateandTime(item.startTime, item.endTime)}
                            </MDTypography>
                          </MDBox>
                        ))}
                      </MDBox>
                    </MDBox>
                  </MDBox>
                ) : (
                  <MDBox />
                )}
                {showEducation ? (
                  <MDBox>
                    <MDBox id="education">
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                          <Stack direction="row" spacing={1} ml={2} mb={-2} mt={5}>
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                              }}
                              style={{
                                backgroundColor: "black",
                              }}
                            >
                              <Icon fontSize="medium" color="white">
                                school
                              </Icon>
                            </Avatar>
                            <MDTypography variant="h4" fontWeight="medium" color="black">
                              Education
                              <Divider />
                            </MDTypography>
                          </Stack>
                        </Grid>
                      </Grid>
                      <MDBox ml={2}>
                        {educationx.map((item) => (
                          <MDBox key={item.id}>
                            <MDTypography
                              variant="h5"
                              fontWeight="medium"
                              color="black"
                              ml={2}
                              mt={2}
                            >
                              {item.specialization}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="medium" color="black" ml={2}>
                              {item.name}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="light" color="black" ml={2}>
                              {item.degree} {item.grade}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="light" color="black" ml={2}>
                              {changeDateandTime(item.startTime, item.endTime)}{" "}
                            </MDTypography>
                          </MDBox>
                        ))}
                      </MDBox>
                    </MDBox>
                  </MDBox>
                ) : (
                  <MDBox />
                )}
                {showPositionHeld ? (
                  <MDBox>
                    <MDBox id="positionHeld">
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                          <Stack direction="row" spacing={1} ml={2} mb={-2} mt={5}>
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                              }}
                              style={{
                                backgroundColor: "black",
                              }}
                            >
                              <Icon fontSize="medium" color="white">
                                person_outline
                              </Icon>
                            </Avatar>
                            <MDTypography variant="h4" fontWeight="medium" color="black">
                              Position Held
                              <Divider />
                            </MDTypography>
                          </Stack>
                        </Grid>
                      </Grid>
                      <br />
                      <MDBox ml={2}>
                        {positionHeldx.map((item) => (
                          <MDBox key={item.id}>
                            <MDTypography
                              variant="h5"
                              fontWeight="medium"
                              color="black"
                              ml={2}
                              mt={2}
                            >
                              {item.name}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="medium" color="black" ml={2}>
                              {item.place}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="light" color="black" ml={2}>
                              {item.descrip}{" "}
                            </MDTypography>
                            <MDTypography variant="h6" fontWeight="light" color="black" ml={2}>
                              {changeDateandTime(item.startTime, item.endTime)}{" "}
                            </MDTypography>
                          </MDBox>
                        ))}
                      </MDBox>
                    </MDBox>
                  </MDBox>
                ) : (
                  <MDBox />
                )}
                <MDBox mb={5} />
              </Paper>
            </Paper>
          </MDBox>
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewApplication;
