import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
// import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import Divider from "@mui/material/Divider";
// import DownloadDoneSharpIcon from "@mui/icons-material/DownloadDoneSharp";

import Grid from "@mui/material/Grid";
// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import PHeaders from "postHeader";
// import Chip from "@mui/material/Chip";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import ClearSharpIcon from "@mui/icons-material/ClearSharp";

function AddStage() {
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  const [stages, setStages] = useState([]);
  const [nstages, setNStages] = useState([]);
  const [opened, setOpened] = useState(false);
  const MySwal = withReactContent(Swal);
  const { allPHeaders: myHeaders } = PHeaders();
  const [namex, setName] = useState("");
  const [descripx, setDescrip] = useState("");
  const [idx, setIdx] = useState("");
  const [createdTimex, setCreatedTime] = useState("");
  const [deleteFlagx, setDeleteFlag] = useState("");

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: "left",
  //   color: theme.palette.text.secondary,
  //   fontWeight: "bold",
  //   fontSize: "20px",
  // }));
  const handleAddStage = (stageToMove) => {
    // eslint-disable-next-line no-shadow
    setStages((stages) => stages.filter((stage) => stage.id !== stageToMove.id));

    setNStages((list) => [...list, stageToMove]);
  };

  const handleRemoveStage = (stageToMove) => {
    // eslint-disable-next-line no-shadow
    setNStages((stages) => stages.filter((stage) => stage.id !== stageToMove.id));
    setStages((list) => [...list, stageToMove]);
  };

  const handleClick = (e) => {
    // if (enabled) {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const mystages = [];
    nstages.map((item) => mystages.push(item.id));
    console.log(mystages);
    const orgIDs = data11.orgID;
    // const stagesx = setNStages(nstages[0].id);
    const raw = JSON.stringify({
      id: idx,
      name: namex,
      orgID: orgIDs,
      descrip: descripx,
      stagesInOrder: mystages,
      createdTime: createdTimex,
      deleteFlag: deleteFlagx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_RAGA_URL}/workflow/update`, requestOptions)
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
    // }
  };

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/stage/gets/${orgIDs}`, { headers })
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
          setStages(result);
          fetch(`${process.env.REACT_APP_RAGA_URL}/workflow/getByIds/${ids}`, {
            headers,
          })
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resultp) => {
              if (resultp.message === "Expired Access") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resultp.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resultp.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
                window.location.reload();
              }
              if (isMounted) {
                console.log(resultp);
                // eslint-disable-next-line eqeqeq
                if (resultp.length != 0) {
                  setIdx(resultp[0].id);
                  setName(resultp[0].name);
                  if (resultp[0].descrip !== null) {
                    setDescrip(resultp[0].descrip);
                  }
                  if (resultp[0].stagesInOrder !== null) {
                    const stagesIds = resultp[0].stagesInOrder;
                    const newStages = [];
                    const leftStages = [];
                    // eslint-disable-next-line array-callback-return
                    result.map((it) => {
                      let check = 0;
                      // eslint-disable-next-line array-callback-return
                      stagesIds.map((sit) => {
                        if (sit === it.id) {
                          check = 1;
                          newStages.push(it);
                        }
                      });
                      if (check === 0) {
                        leftStages.push(it);
                      }
                    });

                    setNStages(newStages);
                    setStages(leftStages);
                  }

                  if (resultp[0].createdTime !== null) {
                    setCreatedTime(resultp[0].createdTime);
                  }
                  if (resultp[0].createdTime !== null) {
                    setDeleteFlag(resultp[0].deleteFlag);
                  }
                }
              }
            });
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  // useEffect(() => {
  //   setOpened(true);

  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_RAGA_URL}/stage/gets/${orgIDs}`, { headers })
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       setOpened(false);
  //       if (result.message === "Expired Access") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Token Does Not Exist") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Unauthorized Access") {
  //         navigate("/authentication/forbiddenPage");
  //         window.location.reload();
  //       }
  //       if (isMounted) {
  //         setStages(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
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
              Add Stage to WorkfLow
            </MDTypography>
          </MDBox>
          <MDBox mx={3} mt={1} p={1} mb={1}>
            <></>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mt={4} mb={1}>
              <MDButton
                onClick={handleClick}
                variant="gradient"
                color="info"
                width="50%"
                align="left"
              >
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        <div className="row">
          <div className="col-sm-5">
            <Box sx={{ flexGrow: 1 }}>
              <FormGroup style={{ padding: "20px" }}>
                {stages.map((item) => (
                  <Grid key={item.id} item xs={12}>
                    <FormControlLabel
                      control={<Checkbox />}
                      onClick={() => handleAddStage(item)}
                      label={item.name}
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
                {nstages.map((item) => (
                  <Grid key={item.id} item xs={12}>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      onClick={() => handleRemoveStage(item)}
                      label={item.name}
                    />
                  </Grid>
                ))}
              </FormGroup>
            </Box>
          </div>
        </div>
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default AddStage;
