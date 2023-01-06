import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import MDButton from "components/MDButton";
// import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
// import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CardContent from "@mui/material/CardContent";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import Modal from "@mui/material/Modal";
import Styles from "styles";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import withReactContent from "sweetalert2-react-content";

function Reports() {
  const MySwal = withReactContent(Swal);
  const [opened, setOpened] = useState(false);
  const [open, setOpen] = useState(false);

  const [allx, setAll] = useState([]);
  const [showButton, setShowButton] = useState("");
  const [startTimex, setStartTime] = useState("");
  const [endTimex, setEndTimexx] = useState("");
  const [checkedStartTime, setCheckedStartTime] = useState(false);
  const [checkedEndTime, setCheckedEndTime] = useState(false);
  console.log(allx);

  const handleCloseModal = () => {
    setOpen(false);
    setEndTimexx("");
    setStartTime("");
  };
  const navigate = useNavigate();
  const { allGHeaders: miHeaders } = GHeaders();
  const { allPHeaders: myHeaders } = PHeaders();

  const handleTime = (valuex) => {
    console.log(valuex);
    const sTime = new Date(valuex).getTime();
    if (!sTime) {
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("startTimex").innerHTML = "Select a Start Time <br>";

      setCheckedStartTime(false);
    }
    if (sTime) {
      console.log("working2222222");
      setCheckedStartTime(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("startTimex").innerHTML = " ";
    }
  };

  const handleTimex = (valuex) => {
    console.log(valuex);
    const ETime = new Date(valuex).getTime();
    if (!ETime) {
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("endTimex").innerHTML = "Select End Time <br>";

      setCheckedEndTime(false);
    }
    if (ETime) {
      console.log("working2222222");
      setCheckedEndTime(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("endTimex").innerHTML = " ";
    }
  };

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    let isMounted = true;
    fetch(`${process.env.REACT_APP_koka_URL}/businessTravels/getByIds/${ids}`, {
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
          if (result.length !== 0) {
            setAll(result[0].employeesName);
          } else {
            setOpened(false);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  //   const handleRemove = (value) => {
  //     const queryString = window.location.search;
  //     const urlParams = new URLSearchParams(queryString);
  //     const ids = urlParams.get("id");
  //     const headers = miHeaders;

  //     fetch(`${process.env.REACT_APP_SHASHA_URL}/businessTravels/removeParticipant/${ids}/${value}`, {
  //       headers,
  //     })
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         const resultres = await res.text();
  //         if (resultres === null || resultres === undefined || resultres === "") {
  //           return {};
  //         }
  //         return JSON.parse(resultres);
  //       })
  //       .then((result) => {
  //         // setOpened(false);
  //         if (result.message === "Expired Access") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (result.message === "Token Does Not Exist") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (result.message === "Unauthorized Access") {
  //           navigate("/authentication/forbiddenPage");
  //           window.location.reload();
  //         }
  //         MySwal.fire({
  //           title: result.status,
  //           type: "success",
  //           text: result.message,
  //         }).then(() => {
  //           window.location.reload();
  //         });
  //       })
  //       .catch((error) => {
  //         setOpened(false);
  //         MySwal.fire({
  //           title: error.status,
  //           type: "error",
  //           text: error.message,
  //         });
  //       });
  //   };
  //   const colors = ["#00C49F", "#0088FE", "#EB5353", "#187498", "#36AE7C"];

  // MODAL STYLE
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
    bgcolor: "#ffffff",
    border: "3px solid #5F9DF7",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    height: "55%",
    display: "flex",
    "&::-webkit-scrollbar": {
      width: 20,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "white",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#f5f5f5",
      borderRadius: 10,
    },
  };

  const handleOpenModal = (num) => {
    console.log(num);
    const number = Number(num);
    console.log(number);
    setOpen(true);
    setShowButton(number);
  };
  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    let isMounted = true;
    fetch(`${process.env.REACT_APP_kUBU_URL}/businessTravels/getByIds/${ids}`, {
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
          if (result.length !== 0) {
            setAll(result[0].employeesName);
          } else {
            setOpened(false);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAssetList = (e) => {
    // Zino part Do not associate ur self by touching anything.
    setOpened(true);
    e.preventDefault();
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const startTime = new Date(startTimex).getTime();
    const endTime = new Date(endTimex).getTime();
    let isMounted = true;
    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const orgIDs = data11.orgID;
    fetch(
      `${process.env.REACT_APP_JOHANNESBURG_URL}/assets/getBetween/${orgIDs}?startTime=${startTime}&endTime=${endTime}`,
      {
        headers,
      }
    )
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
        // setItems(result);
        console.log(result);
        const allMAP = result;
        if (result !== "") {
          const itemz = result.map((each) => ({
            dateAcquired: each.createdTime,
            name: each.item,
            category: each.type.name,
            currentValue: each.currentWorth,
            worth: each.itemWorth,
          }));
          const zoom = result.map((item) => item.itemWorth);
          console.log(itemz);
          console.log(zoom);
          // eslint-disable-next-line no-eval
          console.log(eval(zoom.join("+")));
          // eslint-disable-next-line no-eval
          const viewTotal = eval(zoom.join("+"));
          console.log(viewTotal);

          // const headers = miHeaders;
          // const data11 = JSON.parse(localStorage.getItem("user1"));
          // const orgIDs = data11.orgID;
          // let isMounted = true;
          e.preventDefault();
          setOpened(true);
          fetch(`${process.env.REACT_APP_KUBU_URL}/company/get/${orgIDs}`, {
            headers,
          })
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resultxp) => {
              if (resultxp.message === "Expired Access") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resultxp.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resultxp.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
                window.location.reload();
              }
              if (isMounted) {
                console.log(result);
                console.log(resultxp);
                if (result.length !== 0) {
                  fetch(
                    `${process.env.REACT_APP_EKOATLANTIC_URL}/media/getByKey/${orgIDs}/${orgIDs}`,
                    {
                      headers,
                    }
                  )
                    .then(async (res) => {
                      const aToken = res.headers.get("token-1");
                      localStorage.setItem("rexxdex", aToken);
                      return res.json();
                    })
                    .then((resultme) => {
                      if (resultme.message === "Expired Access") {
                        navigate("/authentication/sign-in");
                        window.location.reload();
                      }
                      if (resultme.message === "Token Does Not Exist") {
                        navigate("/authentication/sign-in");
                        window.location.reload();
                      }
                      if (resultme.message === "Unauthorized Access") {
                        navigate("/authentication/forbiddenPage");
                        window.location.reload();
                      }
                      console.log(resultme.name);
                      fetch(
                        `${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${resultme.name}`,
                        {
                          headers,
                        }
                      )
                        .then(async (res) => {
                          const aToken = res.headers.get("token-1");
                          localStorage.setItem("rexxdex", aToken);
                          return res.json();
                        })
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
                          const urlx = resultx[0];
                          window.open(urlx, "_blank", "noopener,noreferrer");

                          console.log(`link [${resultx[0]}]`);
                          // eslint-disable-next-line prefer-destructuring
                          let URL = resultx[0];

                          if (URL === "") {
                            URL = "https://i.ibb.co/5FG72RG/defaulto.png";
                            const raw = JSON.stringify({
                              company: {
                                id: resultxp[0].id,
                                name: resultxp[0].name,
                                street: resultxp[0].street,
                                city: resultxp[0].city,
                                state: resultxp[0].state,
                                country: resultxp[0].country,
                                pno: resultxp[0].pno,
                                email: resultxp[0].email,
                                profilePic: URL,
                              },
                              total: viewTotal,
                              items: itemz,
                            });
                            const requestOptions = {
                              method: "POST",
                              headers: myHeaders,
                              body: raw,
                              redirect: "follow",
                            };
                            fetch(
                              `${process.env.REACT_APP_JOHANNESBURG_URL}/assetTypes/add`,
                              requestOptions
                            )
                              .then(async (res) => {
                                const aToken = res.headers.get("token-1");
                                localStorage.setItem("rexxdex", aToken);
                                const resultxx = await res.text();
                                if (
                                  resultxx === null ||
                                  resultxx === undefined ||
                                  resultxx === ""
                                ) {
                                  return {};
                                }
                                return JSON.parse(resultx);
                              })
                              .then((resultxx) => {
                                if (resultxx.message === "Expired Access") {
                                  navigate("/authentication/sign-in");
                                  window.location.reload();
                                }
                                if (resultxx.message === "Token Does Not Exist") {
                                  navigate("/authentication/sign-in");
                                  window.location.reload();
                                }
                                if (resultxx.message === "Unauthorized Access") {
                                  navigate("/authentication/forbiddenPage");
                                  window.location.reload();
                                }
                                if (resultxx.status === "SUCCESS") {
                                  fetch(
                                    `${process.env.REACT_APP_EKOATLANTIC_URL}/reports/generate/asset-list`,
                                    requestOptions
                                  )
                                    .then(async (res) => {
                                      const aToken = res.headers.get("token-1");
                                      localStorage.setItem("rexxdex", aToken);
                                      return res.json();
                                    })
                                    .then((resultxme2) => {
                                      if (resultxme2.message === "Expired Access") {
                                        navigate("/authentication/sign-in");
                                        window.location.reload();
                                      }
                                      if (resultxme2.message === "Token Does Not Exist") {
                                        navigate("/authentication/sign-in");
                                        window.location.reload();
                                      }
                                      if (resultxme2.message === "Unauthorized Access") {
                                        navigate("/authentication/forbiddenPage");
                                        window.location.reload();
                                      }

                                      // if (isMounted) {
                                      console.log(`link [${resultxme2[0]}]`);
                                      const url = resultxme2[0];
                                      if (url !== "") {
                                        const objectURL = url;
                                        console.log(objectURL);

                                        // (C2) TO "FORCE DOWNLOAD"
                                        const anchor = document.createElement("a");
                                        anchor.href = objectURL;
                                        anchor.download = resultxx.data.name;
                                        anchor.click();

                                        // (C3) CLEAN UP
                                        window.URL.revokeObjectURL(objectURL);
                                      }
                                    });
                                }
                                // setOpened(false);
                                // MySwal.fire({
                                //   title: result.status,
                                //   type: "success",
                                //   text: result.message,
                                // }).then(() => {
                                //   window.location.reload();
                                // });
                              })
                              .catch((error) => {
                                setOpened(false);
                                MySwal.fire({
                                  title: error.status,
                                  type: "error",
                                  text: error.message,
                                });
                              });
                          } else {
                            const raw = JSON.stringify({
                              company: {
                                id: resultxp[0].id,
                                name: resultxp[0].name,
                                street: resultxp[0].street,
                                city: resultxp[0].city,
                                state: resultxp[0].state,
                                country: resultxp[0].country,
                                pno: resultxp[0].pno,
                                email: resultxp[0].email,
                                profilePic: URL,
                              },
                              total: viewTotal,
                              items: itemz,
                            });
                            console.log(viewTotal);
                            console.log(raw);
                            console.log(allMAP);
                            const requestOptions = {
                              method: "POST",
                              headers: myHeaders,
                              body: raw,
                              redirect: "follow",
                            };
                            fetch(
                              `${process.env.REACT_APP_EKOATLANTIC_URL}/reports/generate/asset-list`,
                              requestOptions
                            )
                              .then(async (res) => {
                                const aToken = res.headers.get("token-1");
                                localStorage.setItem("rexxdex", aToken);
                                return res.json();
                              })
                              .then((resultxxx) => {
                                if (resultxxx.message === "Expired Access") {
                                  navigate("/authentication/sign-in");
                                  window.location.reload();
                                }
                                if (resultxxx.message === "Token Does Not Exist") {
                                  navigate("/authentication/sign-in");
                                  window.location.reload();
                                }
                                if (resultxxx.message === "Unauthorized Access") {
                                  navigate("/authentication/forbiddenPage");
                                  window.location.reload();
                                }
                                console.log(resultxxx);
                                if (resultxxx.status === "SUCCESS") {
                                  console.log(resultxxx.data.id);
                                  fetch(
                                    `${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${resultxxx.data.name}`,
                                    {
                                      headers,
                                    }
                                  )
                                    .then(async (res) => {
                                      const aToken = res.headers.get("token-1");
                                      localStorage.setItem("rexxdex", aToken);
                                      return res.json();
                                    })
                                    .then((resultxme2) => {
                                      if (resultxme2.message === "Expired Access") {
                                        navigate("/authentication/sign-in");
                                        window.location.reload();
                                      }
                                      if (resultxme2.message === "Token Does Not Exist") {
                                        navigate("/authentication/sign-in");
                                        window.location.reload();
                                      }
                                      if (resultxme2.message === "Unauthorized Access") {
                                        navigate("/authentication/forbiddenPage");
                                        window.location.reload();
                                      }
                                      const urls = resultxme2[0];
                                      window.open(urls, "_blank", "noopener,noreferrer");

                                      // if (isMounted) {
                                      console.log(`link [${resultxme2[0]}]`);
                                      const url = resultxme2[0];
                                      if (url !== "") {
                                        const objectURL = url;
                                        console.log(objectURL);

                                        // (C2) TO "FORCE DOWNLOAD"
                                        const anchor = document.createElement("a");
                                        anchor.href = objectURL;
                                        anchor.download = resultxxx.data.name;
                                        anchor.click();

                                        // (C3) CLEAN UP
                                        window.URL.revokeObjectURL(objectURL);
                                      }
                                      MySwal.fire({
                                        title: resultxp.status,
                                        type: "success",
                                        text: resultxp.message,
                                      }).then(() => {
                                        // window.location.reload();
                                      });
                                      console.log(resultxp);
                                    })
                                    .catch((error) => {
                                      setOpened(false);
                                      MySwal.fire({
                                        title: error.status,
                                        type: "error",
                                        text: error.message,
                                      });
                                    });
                                }
                              })
                              .catch((error) => {
                                MySwal.fire({
                                  title: error.status,
                                  type: "error",
                                  text: error.message,
                                });
                              });
                          }
                        });
                    });
                }
              }
            });
        }
      });
    return () => {
      isMounted = false;
    };
  };

  const handleReport = (e) => {
    if (showButton === 1) {
      console.log("asset report");
      console.log(startTimex);
      console.log(endTimex);
      console.log(checkedStartTime);
      console.log(checkedEndTime);
    } else if (showButton === 2) {
      console.log("company report");
    } else if (showButton === 3) {
      console.log("insurance report");
    } else if (showButton === 4) {
      console.log("sales1 report");
    } else if (showButton === 5) {
      console.log("sales2 report");
    } else if (showButton === 6) {
      console.log("sales3 report");
    } else if (showButton === 7) {
      console.log("financial1 report");
    } else if (showButton === 8) {
      console.log("financial2 report");
    } else if (showButton === 9) {
      console.log("financial3 report");
    } else if (showButton === 10) {
      console.log("asset__list");
      handleAssetList(e);
    }
  };

  const handleValidate = (e) => {
    handleTime(startTimex);
    handleTimex(endTimex);
    if (checkedStartTime && checkedEndTime === true) {
      handleReport(e);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ padding: "10px" }}>
        <MDBox pt={4} pb={3} px={30}>
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            style={{ backgroundColor: "#f96d02" }}
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              REPORTS
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
      &nbsp; &nbsp;
      <Card style={{ padding: "10px", paddingTop: "10px" }}>
        <MDTypography textAlign="center" variant="h4" fontWeight="medium" color="secondary" mt={1}>
          ASSETS REPORTS
        </MDTypography>
        &nbsp; &nbsp;
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#3F0071",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
                onClick={() => handleOpenModal(1)}
              >
                <CardContent>
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    ASSET REPORT
                  </Typography>
                </CardContent>
              </Card>
              &nbsp; &nbsp;
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#EB5353",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
                onClick={() => handleOpenModal(10)}
                // onClick={handleClick}
              >
                <CardContent>
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    Asset-List Reports
                  </Typography>
                </CardContent>
              </Card>
              &nbsp; &nbsp;
            </Grid>
          </Grid>
        </Box>
      </Card>
      &nbsp; &nbsp;
      <Card style={{ padding: "10px", paddingTop: "10px" }}>
        <MDTypography textAlign="center" variant="h4" fontWeight="medium" color="secondary" mt={1}>
          COMPANY REPORTS
        </MDTypography>
        &nbsp; &nbsp;
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#FB2576",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
                onClick={() => handleOpenModal(2)}
              >
                <CardContent>
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    COMPANY REPORTS
                  </Typography>
                </CardContent>
              </Card>
              &nbsp; &nbsp;
            </Grid>
          </Grid>
        </Box>
      </Card>
      &nbsp; &nbsp;
      <Card style={{ padding: "10px", paddingTop: "10px" }}>
        <MDTypography textAlign="center" variant="h4" fontWeight="medium" color="secondary" mt={1}>
          INSURANCE REPORTS
        </MDTypography>
        &nbsp; &nbsp;
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#EB5353",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
                onClick={() => handleOpenModal(3)}
              >
                <CardContent>
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    INSURANCE REPORTS
                  </Typography>
                </CardContent>
              </Card>
              &nbsp; &nbsp;
            </Grid>
          </Grid>
        </Box>
      </Card>
      &nbsp; &nbsp;
      <Card style={{ padding: "10px" }}>
        <MDTypography textAlign="center" variant="h4" fontWeight="medium" color="secondary" mt={1}>
          FINANCIAL REPORTS
        </MDTypography>
        &nbsp; &nbsp;
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#EB5353",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    Sales Reports
                  </Typography>
                </CardContent>
              </Card>
              &nbsp; &nbsp;
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#C1224F",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    Sales Reports
                  </Typography>
                </CardContent>
              </Card>
              &nbsp; &nbsp;
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#EB5353",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    Sales Reports
                  </Typography>
                </CardContent>
              </Card>
              &nbsp; &nbsp;
            </Grid>
          </Grid>
        </Box>
      </Card>
      &nbsp; &nbsp;
      <Card style={{ padding: "10px" }}>
        <MDTypography textAlign="center" variant="h4" fontWeight="medium" color="secondary" mt={1}>
          SALES REPORTS
        </MDTypography>
        &nbsp; &nbsp;
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#36AE7C",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  {/* <Typography sx={{ fontSize: 14 }} style={{ color: "white" }} gutterBottom>
                    Participant
                  </Typography> */}
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    BY REVENUE
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button
                    onClick={() => handleRemove(api.id)}
                    style={{ color: "white" }}
                    startIcon={<DeleteIcon />}
                  >
                    Remove
                  </Button>
                </CardActions> */}
              </Card>
              &nbsp; &nbsp;
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#FA9856",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  {/* <Typography sx={{ fontSize: 14 }} style={{ color: "white" }} gutterBottom>
                    Participant
                  </Typography> */}
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    BY QUANTITY
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button
                    onClick={() => handleRemove(api.id)}
                    style={{ color: "white" }}
                    startIcon={<DeleteIcon />}
                  >
                    Remove
                  </Button>
                </CardActions> */}
              </Card>
              &nbsp; &nbsp;
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "#17139C",
                  minHeight: "150px",
                  maxHeight: "150px",
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  {/* <Typography sx={{ fontSize: 14 }} style={{ color: "white" }} gutterBottom>
                    Participant
                  </Typography> */}
                  <Typography
                    className="center"
                    variant="h5"
                    component="div"
                    style={{ color: "white", marginTop: "40px" }}
                  >
                    DAILY SALES
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button
                    onClick={() => handleRemove(api.id)}
                    style={{ color: "white" }}
                    startIcon={<DeleteIcon />}
                  >
                    Remove
                  </Button>
                </CardActions> */}
              </Card>
              &nbsp; &nbsp;
            </Grid>
          </Grid>
        </Box>
      </Card>
      <div>
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <HighlightOffIcon
                  onClick={handleCloseModal}
                  fontSize="large"
                  style={{
                    // display: "flex",
                    padding: "5px",
                    color: "red",
                    float: "right",
                    position: "absolute",
                    left: 495,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    cursor: "pointer",
                  }}
                />
                <MDBox pt={1} pb={1} px={2}>
                  <MDBox
                    variant="gradient"
                    // bgColor="info"
                    borderRadius="lg"
                    style={{ backgroundColor: "#f96d02" }}
                    mx={2}
                    mt={-3}
                    p={2}
                    mb={1}
                    textAlign="center"
                  >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                      Select Timeframe
                    </MDTypography>
                  </MDBox>
                  <MDBox
                    mt={2}
                    mb={2}
                    sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                  >
                    <MDTypography variant="gradient" fontSize="60%" color="error" id="startTimex">
                      {" "}
                    </MDTypography>
                    <MDTypography variant="gradient" fontSize="60%" color="error" id="endTimex">
                      {" "}
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <div
                  style={{
                    display: "grid",
                    placeContent: "center",
                  }}
                >
                  <div className="col-sm-6">
                    <TextField
                      id="datetime-local"
                      label="Start Time *"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={startTimex}
                      onChange={(e) => setStartTime(e.target.value)}
                      onInput={(e) => handleTime(e.target.value)}
                      sx={{
                        width: 250,
                      }}
                    />
                  </div>
                </div>
                &nbsp; &nbsp;
                <div
                  style={{
                    display: "grid",
                    placeContent: "center",
                  }}
                >
                  <div className="col-sm-6">
                    <TextField
                      id="datetime-local"
                      label="End Time *"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={endTimex}
                      onChange={(e) => setEndTimexx(e.target.value)}
                      onInput={(e) => handleTimex(e.target.value)}
                      sx={{
                        width: 250,
                      }}
                    />
                  </div>
                </div>
                <MDBox mt={4} mb={1}>
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      onClick={handleValidate}
                      //   color="info"
                      style={Styles.buttonSx}
                      width="50%"
                      align="left"
                    >
                      Generate
                    </MDButton>
                  </MDBox>
                </MDBox>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default Reports;
