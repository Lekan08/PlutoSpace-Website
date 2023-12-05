import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { IconButton } from "@mui/material";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
  height: "auto",
  display: "block",
  "&::-webkit-scrollbar": {
    width: "6px",
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

function LeadWorkflow() {
  const MySwal = withReactContent(Swal);

  const [namex, setName] = useState("");
  const [descripx, setDescrip] = useState("");

  const [enabled, setEnabled] = useState("");

  const [chnamex, setCHName] = useState("");
  const [chdescripx, setCHDescrip] = useState("");
  const [items, setItems] = useState([]);

  const [uidx, setUID] = useState("");
  const [unamex, setUName] = useState("");
  const [udescripx, setUDescrip] = useState("");
  const [uCreatedTimex, setUCreatedTime] = useState("");
  const [uDeleteFlagx, setUDeletFlag] = useState("");

  const [showLists, setShowLists] = useState(false);

  const [opened, setOpened] = useState(false);
  const [uopened, setUOpened] = useState(false);
  const [showCheckPoint, setShowCheckPoint] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // eslint-disable-next-line consistent-return
  const handleOnNameKeys = (value) => {
    const letters = /^[a-zA-Z ]+$/;
    if (!value.match(letters)) {
      setEnabled(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
    }
    if (value.match(letters)) {
      setEnabled(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (value.length === 0) {
      setEnabled(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name is required<br>";
    }
  };

  // Method to fetch all departments
  // env.environments
  const handleGets = () => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    fetch(`${process.env.REACT_APP_RAGA_URL}/leadsWorkflow/get/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        if (Object.keys(result).length !== 0) {
          setName(result.name);
          setDescrip(result.descrip);
        }
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      //   fetches the table data
      handleGets();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // eslint-disable-next-line consistent-return
  const handleClick = (e) => {
    handleOnNameKeys(namex);
    if (enabled) {
      setOpened(true);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const raw = JSON.stringify({ orgID: orgIDs, name: namex, descrip: descripx });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_RAGA_URL}/leadsWorkflow/save`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          const resultres = await res.text();
          if (resultres === null || resultres === undefined || resultres === "") {
            return {};
          }
          return JSON.parse(resultres);
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
            handleGets();
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
    }
  };

  const handleShowCheckpoints = () => {
    if (!showCheckPoint) {
      setShowCheckPoint(true);
    } else {
      setShowCheckPoint(false);
    }
  };

  // Method to fetch all departments
  // env.environments
  const handleGetCheckpoints = () => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    fetch(`${process.env.REACT_APP_RAGA_URL}/leadCheckpoint/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        if (result.length !== 0) {
          setShowLists(true);
          setItems(result);
        }
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      //   fetches the table data
      handleGetCheckpoints();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // eslint-disable-next-line consistent-return
  const handleClickCheckpoints = (e) => {
    handleOnNameKeys(namex);
    if (enabled) {
      setOpened(true);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const raw = JSON.stringify({ orgID: orgIDs, name: chnamex, descrip: chdescripx });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_RAGA_URL}/leadCheckpoint/add`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          const resultres = await res.text();
          if (resultres === null || resultres === undefined || resultres === "") {
            return {};
          }
          return JSON.parse(resultres);
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
            if (result.status === "SUCCESS") {
              handleGetCheckpoints();
              setCHName("");
              setCHDescrip("");
            }
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
    }
  };

  const handleUpdate = () => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      id: uidx,
      name: unamex,
      descrip: udescripx,
      orgID: orgIDs,
      deleteFlag: uDeleteFlagx,
      createdTime: uCreatedTimex,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_RAGA_URL}/leadCheckpoint/update`, requestOptions)
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
        setUOpened(false);
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          if (result.status === "SUCCESS") {
            handleGetCheckpoints();
            setUName("");
            setUDescrip("");
          }
        });
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        }).then(() => {
          setUOpened(true);
        });
      });
  };

  const handleUpdateVal = (e) => {
    handleOnNameKeys(unamex);
    if (enabled === true) {
      handleUpdate(e);
    }
  };

  // Method to handle delete
  const handleDelete = (value) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f96d02",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setOpened(true);
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(`${process.env.REACT_APP_RAGA_URL}/leadCheckpoint/delete/${value}`, requestOptions)
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            const resultres = await res.text();
            if (resultres === null || resultres === undefined || resultres === "") {
              return {};
            }
            return JSON.parse(resultres);
          })
          .then((resx) => {
            setOpened(false);
            if (resx.message === "Expired Access") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            }
            MySwal.fire({
              title: resx.status,
              type: "success",
              text: resx.message,
            }).then(() => {
              if (resx.status === "SUCCESS") {
                handleGetCheckpoints();
              }
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
      }
    });
  };

  // Method to filter departments
  const handleShow = (filteredData, value) => {
    const filteredItems = filteredData.filter((item) => item.id === value);
    setUID(value);
    setUName(filteredItems[0].name);
    setUDescrip(filteredItems[0].descrip);
    setUCreatedTime(filteredItems[0].createdTime);
    setUDeletFlag(filteredItems[0].deleteFlag);

    setUOpened(true);
    handleOnNameKeys(filteredItems[0].name);
  };

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
              Lead Workflow
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="Name *"
                      value={namex || ""}
                      onKeyUp={(e) => handleOnNameKeys(e.target.value)}
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={descripx || ""}
                      onChange={(e) => setDescrip(e.target.value)}
                      label="Description"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleClick}
                color="info"
                width="50%"
                align="left"
              >
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox align="center" mt={4} mb={1}>
        <MDButton
          variant="gradient"
          onClick={handleShowCheckpoints}
          color="info"
          width="50%"
          align="left"
        >
          Lead Checkpoints
        </MDButton>
      </MDBox>
      <MDBox>
        {showCheckPoint && (
          <MDBox>
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
                    Lead Checkpoint
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
                  <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
                    {" "}
                  </MDTypography>
                </MDBox>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <Container>
                      <div className="row">
                        <div className="col-sm-6">
                          <MDInput
                            type="text"
                            label="Name *"
                            value={chnamex || ""}
                            onKeyUp={(e) => handleOnNameKeys(e.target.value)}
                            className="form-control"
                            onChange={(e) => setCHName(e.target.value)}
                            variant="standard"
                            fullWidth
                          />
                        </div>
                        <div className="col-sm-6">
                          <MDInput
                            type="text"
                            value={chdescripx || ""}
                            onChange={(e) => setCHDescrip(e.target.value)}
                            label="Description"
                            variant="standard"
                            fullWidth
                          />
                        </div>
                      </div>
                    </Container>
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      onClick={handleClickCheckpoints}
                      color="info"
                      width="50%"
                      align="left"
                    >
                      Save
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
            &nbsp;
            <MDBox pt={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  {
                    showLists && (
                      <Card style={{ backgroundColor: "white" }}>
                        &nbsp;
                        {/* <div
                  className="scrollbar scrollbar-primary mt-2 mx-auto"
                  style={scrollContainerStyle}
                > */}
                        <Container>
                          <div className="row">
                            {items.map((item) => (
                              <Grid item xs={12} md={12} lg={12} key={item.id}>
                                <Card>
                                  <CardContent>
                                    <MDTypography
                                      variant="h5"
                                      fontWeight="medium"
                                      fontSize="120%"
                                      color="info"
                                      textAlign="left"
                                      mt={1}
                                    >
                                      {item.name}
                                    </MDTypography>
                                    <MDTypography
                                      variant="h6"
                                      fontWeight="regular"
                                      fontSize="80%"
                                      color="info"
                                      textAlign="left"
                                      mt={1}
                                      mb={-3.5}
                                    >
                                      {item.descrip}
                                    </MDTypography>
                                  </CardContent>
                                  <CardActions>
                                    <div align="right">
                                      <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="primary-search-account-menu"
                                        aria-haspopup="true"
                                        color="inherit"
                                        onClick={() => handleDelete(item.id)}
                                      >
                                        <Icon
                                          fontSize="medium"
                                          sx={{ alignSelf: "center" }}
                                          color="error"
                                        >
                                          delete
                                        </Icon>
                                      </IconButton>
                                    </div>
                                    <div align="right">
                                      <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="primary-search-account-menu"
                                        aria-haspopup="true"
                                        color="inherit"
                                        onClick={() => handleShow(items, item.id)}
                                      >
                                        <Icon
                                          fontSize="medium"
                                          sx={{ alignSelf: "center" }}
                                          color="error"
                                        >
                                          edit
                                        </Icon>
                                      </IconButton>
                                    </div>
                                  </CardActions>
                                </Card>
                                &nbsp;
                              </Grid>
                            ))}
                          </div>
                        </Container>
                        {/* </div> */}
                        &nbsp;
                        <br />
                      </Card>
                    )
                    // ) : (
                    //   <Card sx={{ height: "100%" }}>
                    //     {" "}
                    //     <MDTypography variant="h3" fontWeight="bold" color="text" textAlign="center" mt={1}>
                    //       No Checkpoint
                    //     </MDTypography>
                    //     {/* <Icon
                    //       fontSize="medium"
                    //       sx={{ fontSize: 100, alignSelf: "center" }}
                    //       color="disabled"
                    //     >
                    //       sentiment_dissatisfied
                    //     </Icon> */}
                    //   </Card>
                    // )}
                  }
                </Grid>
              </Grid>
            </MDBox>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={uopened}
            >
              <Card sx={style}>
                <MDBox pt={4} pb={3}>
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
                      Update Lead Checkpoint
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
                    <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
                      {" "}
                    </MDTypography>
                  </MDBox>
                  <MDBox component="form" role="form">
                    <MDBox mb={2}>
                      <Container>
                        <div className="row">
                          <div className="col-sm-6">
                            <MDInput
                              type="text"
                              label="Name *"
                              value={unamex || ""}
                              onKeyUp={(e) => handleOnNameKeys(e.target.value)}
                              className="form-control"
                              onChange={(e) => setUName(e.target.value)}
                              variant="standard"
                              fullWidth
                            />
                          </div>
                          <div className="col-sm-6">
                            <MDInput
                              type="text"
                              value={udescripx || ""}
                              onChange={(e) => setUDescrip(e.target.value)}
                              label="Description"
                              variant="standard"
                              fullWidth
                            />
                          </div>
                        </div>
                      </Container>
                    </MDBox>
                    <MDBox mt={4} mb={1} align="center">
                      <MDButton
                        variant="gradient"
                        onClick={handleUpdateVal}
                        color="info"
                        width="50%"
                        align="left"
                      >
                        Save
                      </MDButton>
                      &nbsp;
                      <MDButton
                        variant="gradient"
                        onClick={() => setUOpened(false)}
                        color="error"
                        width="50%"
                        align="center"
                      >
                        Cancel
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Card>
            </Backdrop>
          </MDBox>
        )}
      </MDBox>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default LeadWorkflow;
