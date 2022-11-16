/*
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
// import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import { Container } from "react-bootstrap";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";

// Authentication layout components
// import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
// import bgImage from "assets/images/bg-sign-in-basic.gif";
// import plutospaceImg from "assets/images/PlutoSpaceImg.png";
import emoji1 from "layouts/authentication/chat-Rating/emoji1.png";
import emoji2 from "layouts/authentication/chat-Rating/emoji2.png";
import neutral from "layouts/authentication/chat-Rating/neutral.png";
import slightlySmiling4 from "layouts/authentication/chat-Rating/slightlySmiling4.png";
import blush5 from "layouts/authentication/chat-Rating/blush5.png";
import Grid from "@mui/material/Grid";
import PHeaders from "postHeader";
// import Typography from "@mui/material/Typography";
// import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
// import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PageLayout from "examples/LayoutContainers/PageLayout";
import MDBox from "components/MDBox";
import plutospaceImg from "assets/images/PlutoSpaceImg.png";
import Typography from "@mui/material/Typography";

function ChatRating() {
  const { allPHeaders: myHeaders } = PHeaders();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [opened, setOpened] = useState(false);

  const handleRate = (e, ratingx) => {
    console.log(ratingx);
    setOpened(true);
    e.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const orgIDx = urlParams.get("orgID");
    const ticketIDx = urlParams.get("ticketID");
    const agentIDx = urlParams.get("agentID");
    console.log(orgIDx);
    console.log(ticketIDx);
    console.log(agentIDx);
    const raw = JSON.stringify({
      orgID: orgIDx,
      rating: ratingx,
      ticketID: ticketIDx,
      agentID: agentIDx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_SHASHA_URL}/chatRatings/add`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setOpened(false);
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          // window.location.reload();
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
    <div>
      <PageLayout
      //    image={bgImage}
      >
        <Grid item xs={12} md={12} lg={12}>
          <Container>
            <Card>
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                p={2}
                mt={2}
                mb={1}
                textAlign="center"
              >
                <MDBox component="img" src={plutospaceImg} alt="PlutoSpace" width="15rem" />
              </MDBox>
              <Typography
                variant="h3"
                mt={6}
                mb={5}
                style={{
                  textAlign: "center",
                }}
              >
                Tap an Emoji to Rate your Agent
              </Typography>
              <Box sx={{ flexGrow: 1 }} mb={20}>
                <Grid container>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Grid item xs={2}>
                      <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        float="right"
                        onClick={(e) => handleRate(e, 1)}
                        style={{
                          textAlign: "right",
                          float: "right",
                          color: "#728483",
                        }}
                      >
                        <img
                          src={emoji1}
                          alt="sad"
                          style={{
                            height: "100%",
                            width: "100%",
                          }}
                        />
                      </IconButton>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        float="right"
                        onClick={(e) => handleRate(e, 2)}
                        style={{
                          textAlign: "right",
                          float: "right",
                          color: "#728483",
                        }}
                      >
                        <img
                          src={emoji2}
                          alt="unhappy"
                          style={{
                            height: "100%",
                            width: "100%",
                          }}
                        />
                      </IconButton>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        float="right"
                        onClick={(e) => handleRate(e, 3)}
                        style={{
                          textAlign: "right",
                          float: "right",
                          color: "#728483",
                        }}
                      >
                        <img
                          src={neutral}
                          alt="neutral"
                          style={{
                            height: "100%",
                            width: "100%",
                          }}
                        />
                      </IconButton>
                    </Grid>
                    <Grid item xs={2}>
                      {" "}
                      <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        float="right"
                        onClick={(e) => handleRate(e, 4)}
                        style={{
                          textAlign: "right",
                          float: "right",
                          color: "#728483",
                        }}
                      >
                        <img
                          src={slightlySmiling4}
                          alt="happy"
                          style={{
                            height: "100%",
                            width: "100%",
                          }}
                        />
                      </IconButton>
                    </Grid>
                    <Grid item xs={2}>
                      {" "}
                      <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        float="right"
                        onClick={(e) => handleRate(e, 5)}
                        style={{
                          textAlign: "right",
                          float: "right",
                          color: "#728483",
                        }}
                      >
                        <img
                          src={blush5}
                          alt="very happy"
                          style={{
                            height: "100%",
                            width: "100%",
                          }}
                        />
                      </IconButton>
                    </Grid>
                  </div>
                </Grid>
              </Box>
            </Card>
          </Container>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={opened}
          >
            <CircularProgress color="info" />
          </Backdrop>
        </Grid>
      </PageLayout>
    </div>
  );
}

export default ChatRating;
