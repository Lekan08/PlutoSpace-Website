/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
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
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
// import Checklist from "../viewOnboardingChecklist";
// ZINOLEESKY

function OffboardingChecklist() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [itemsx, setItems] = useState([]);
  const [nitemsx, setNItems] = useState([]);

  const [show, setShow] = useState(false);

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

    fetch(`${process.env.REACT_APP_RAGA_URL}/offboardingSession/addChecklist`, requestOptions)
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
    console.log(data11);
    if (data11.roleID === "0") {
      setShow(true);
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const idx = urlParams.get("id");
      // const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const headers = miHeaders;
      let isMounted = true;
      fetch(`${process.env.REACT_APP_RAGA_URL}/offboardingSession/getMySessions/${orgIDs}/${idx}`, {
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
            // const queryString = window.location.search;
            // const urlParams = new URLSearchParams(queryString);
            // const idx = urlParams.get("id");
            const particularChecklist = result.filter((val) => val.id === idx);
            console.log(particularChecklist);
            if (particularChecklist.length !== 0) {
              const resss = [];
              // setChecklist(result);
              // const id = result.map((each) => each.id);
              // eslint-disable-next-line array-callback-return
              particularChecklist.map((each) => {
                const { checklists } = each;
                if (checklists) {
                  console.log(checklists);
                  checklists.map((item) => {
                    resss.push({ ...item, id: each.id });
                  });
                  // resss.push(each.id);
                } else {
                  console.log("suppppp");
                }
              });
              console.log(resss);
              // if (resss )
              // const ebukss = resss.filter((each) => each.done);

              const rightCheck = [];
              const leftCheck = [];
              resss.map((value) => {
                console.log(value);
                if (value.done === false) {
                  // setItems(resss);
                  rightCheck.push(value);
                } else {
                  leftCheck.push(value);
                  // setNItems(resss);
                }
              });
              rightCheck.map((val) => {
                console.log(val);
                setItems(rightCheck);
              });
              console.log(rightCheck);

              leftCheck.map((val) => {
                console.log(val);
                setNItems(leftCheck);
              });
              // console.log(ebukss);
              // if (ebukss === false) {
              //   setItems(resss);
              // }
            }
          }
        });
      return () => {
        isMounted = false;
      };
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={30}>
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
              Offboarding Checklist
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
              <MDButton variant="gradient" onClick={handleClick} color="warning" width="50%">
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      &nbsp; &nbsp;
      {show ? (
        <MDBox>
          <Card>
            <MDTypography
              variant="h4"
              textAlign="left"
              fontWeight="medium"
              color="secondary"
              mx={4}
              mt={2}
            >
              Checklist
            </MDTypography>
            <div className="row">
              <div className="col-sm-5">
                <Box sx={{ flexGrow: 1 }}>
                  <FormGroup style={{ padding: "20px" }}>
                    {itemsx.map((item) => (
                      <Grid key={item.id} item xs={12}>
                        <FormControlLabel
                          control={<Checkbox />}
                          // onClick={(e) => handleOnClick(e, item)}
                          // onKeyUp={() => handleAddQues(item)}
                          label={item.checker}
                        />
                      </Grid>
                    ))}
                  </FormGroup>
                </Box>
              </div>
              <div className="col-sm-2" style={{ backgroundColor: "#offwhite" }}>
                <></>
              </div>

              <div className="col-sm-5">
                <Box sx={{ flexGrow: 1 }}>
                  <FormGroup style={{ padding: "20px" }}>
                    {nitemsx.map((item) => (
                      <Grid key={item.id} item xs={12}>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          // onClick={(e) => handleOnClick(e, item)}
                          // onKeyUp={() => handleRemoveQues(item)}
                          label={item.checker}
                        />
                      </Grid>
                    ))}
                  </FormGroup>
                </Box>
              </div>
            </div>
            {/* </MDBox> */}
          </Card>
        </MDBox>
      ) : (
        <></>
      )}
      &nbsp;
      {/* <Checklist /> */}
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default OffboardingChecklist;
