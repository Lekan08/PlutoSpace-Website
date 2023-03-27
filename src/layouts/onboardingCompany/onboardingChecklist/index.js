import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
// import Checklist from "../viewOnboardingChecklist";
// ZINOLEESKY

function OnboardingChecklist() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    const raw = JSON.stringify({ id: idx, checker: text });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_RAGA_URL}/onboardingSession/addChecklist`, requestOptions)
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
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const myid = data11.personalID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/onboardingSession/getMySessions/${orgIDs}/${myid}`, {
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
          // if (result.length !== 0) {
          //   const resss = [];
          //   // setChecklist(result);
          //   // const id = result.map((each) => each.id);
          //   result.map((each) => {
          //     const { checklists } = each;
          //     if (checklists) {
          //       console.log(checklists);
          //       checklists.map((item) => {
          //         resss.push({ ...item, id: each.id });
          //       });
          //       // resss.push(each.id);
          //     } else {
          //       console.log("suppppp");
          //     }
          //   });
          //   console.log(resss);
          //   // if (resss )
          //   // const ebukss = resss.filter((each) => each.done);

          //   resss.map((value) => {
          //     console.log(value);
          //     if (value.done === false) {
          //       setItems(resss);
          //     } else {
          //       setNItems(resss);
          //     }
          //   });
          //   // console.log(ebukss);
          //   // if (ebukss === false) {
          //   //   setItems(resss);
          //   // }
          // }
          //   setTable(result);
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
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Onboarding Checklist
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="question">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={0}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                      <Form.Label style={{ fontSize: 14 }}>Text</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={text || ""}
                        // onKeyUp={handleOnNameKeys}
                        onChange={(e) => setText(e.target.value)}
                        rows={2}
                      />
                    </Form.Group>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={handleClick} color="info" width="50%">
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      &nbsp;
      {/* <Checklist /> */}
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default OnboardingChecklist;
