import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
// import { Container, Form } from "react-bootstrap";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";

import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
// import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { StackedChart } from "examples/Charts/BarCharts/StackedBarChart";

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  borderRadius: "0px",
  "& .MuiTabs-indicator": {
    // backgroundColor: "#1890ff",
    borderRadius: "0px",
    borderBottom: "5px solid #1890ff",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,
  [theme.breakpoints.up("sm")]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: "rgba(0, 0, 0, 0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    color: "#40a9ff",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#1890ff",
    fontWeight: theme.typography.fontWeightMedium,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#ffffff",
  },
}));

// const viewAppStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 0,
//   overflow: "scroll",
//   height: "90%",
//   width: "90%",
//   maxHeight: "90vh",
//   display: "block",

//   "&::-webkit-scrollbar": {
//     width: "6px",
//     height: "2px",
//   },
//   "&::-webkit-scrollbar-track": {
//     boxShadow: "inset 0 0 1px rgba(0,0,0,0.00)",
//     webkitBoxShadow: "inset 0 0 1px rgba(0,0,0,0.00)",
//   },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: "#4285F4",
//     webkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
//   },
// };

function AppraisalHistory() {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [appraisals, setAppraisals] = useState([]);
  const [mainItems, setMainItems] = useState([]);
  const [appraisalResults, setAppraisalResults] = useState([]);

  const [datax, setDatax] = useState([]);

  const [valuex, setValuex] = React.useState(0);

  const [opened, setOpened] = useState(false);
  //   const [viewApp, setViewApp] = React.useState(false);

  //   const handleViewClose = () => {
  //     setViewApp(false);
  //   };

  //   const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const changeChartCol = (value) => {
    if (value === "danger") {
      return "#FF0E0E";
      // eslint-disable-next-line no-else-return
    } else if (value === "warning") {
      return "#FFBB33";
      // eslint-disable-next-line no-else-return
    } else if (value === "info") {
      return "#0000FF";
    } else if (value === "success") {
      return "#42ba96";
    } else {
      return "#333333";
    }
  };

  const getAppResults = (appData, appIDs) => {
    console.log(setOpened);
    const headers = miHeaders;

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const orgIDs = data11.orgID;
    // const personalIDs = data11.personalID;
    fetch(
      `${process.env.REACT_APP_SHASHA_URL}/appraisalGrading/result/getByAppraisalIDs/${appIDs}`,
      {
        headers,
      }
    )
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
        //   if (result.code === 200) {
        if (result.length !== 0) {
          setAppraisalResults(result);
          const appRes = result;
          const chartData = [];
          // eslint-disable-next-line array-callback-return
          appData.map((appx) => {
            // eslint-disable-next-line array-callback-return
            appRes.map((appr) => {
              if (appx.id === appr.result.appraisalID) {
                const fdy = {
                  label: appx.name,
                  passedScore: appr.result.score,
                  failedScore: appr.grading.maxScore - appr.result.score,
                  backgroundColor: changeChartCol(appr.grading.colorCode),
                };
                chartData.push(fdy);
              }
            });
          });

          //   const labels = ["January", "February", "March", "April", "May", "June"];

          //   const dattta = {
          //     labels,
          //     datasets: [
          //       {
          //         label: "Scored",
          //         data: [65, 89, 17, 60, 34, 23],
          //         backgroundColor: ["#0000FF", "#42ba96", "#FF0E0E", "#FFBB33", "#FF0E0E", "#FF0E0E"],
          //       },
          //       {
          //         label: "Failed",
          //         data: [35, 11, 83, 40, 66, 77],
          //         backgroundColor: "#777777",
          //       },
          //     ],
          //   };
          const datta = {
            labels: chartData.map((cht) => cht.label),
            datasets: [
              {
                label: "Score",
                data: chartData.map((cht) => cht.passedScore),
                backgroundColor: chartData.map((cht) => cht.backgroundColor),
              },
              {
                label: "Failed",
                data: chartData.map((cht) => cht.failedScore),
                backgroundColor: "#333333",
              },
            ],
          };
          setDatax(datta);
        }
        //   }
      });
  };

  useEffect(() => {
    console.log(setOpened);
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/getForEmp/${orgIDs}/${personalIDs}`, {
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
          //   if (result.code === 200) {
          if (result.length !== 0) {
            setAppraisals(result);
            setMainItems(result);

            const appIDs = result.map((aIDs) => aIDs.id);
            console.log(appIDs);
            getAppResults(result, appIDs);
          }
          //   }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  //   // eslint-disable-next-line consistent-return
  //   const handleClick = (e) => {
  //     handleOnNameKeys();
  //     if (enabled) {
  //       setOpened(true);
  //       e.preventDefault();
  //       const data11 = JSON.parse(localStorage.getItem("user1"));

  //       const orgIDs = data11.orgID;
  //       const raw = JSON.stringify({
  //         id: items.id,
  //         deleteFlag: items.deleteFlag,
  //         status: items.status,
  //         createdTime: items.createdTime,
  //         orgID: orgIDs,
  //         appraiseeID: appraiseeIDx,
  //         createdBy: items.createdBy,
  //         name: namex,
  //       });
  //       const requestOptions = {
  //         method: "POST",
  //         headers: myHeaders,
  //         body: raw,
  //         redirect: "follow",
  //       };

  //       fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/update`, requestOptions)
  //         .then(async (res) => {
  //           const aToken = res.headers.get("token-1");
  //           localStorage.setItem("rexxdex", aToken);
  //           return res.json();
  //         })
  //         .then((result) => {
  //           setOpened(false);
  //           if (result.message === "Expired Access") {
  //             navigate("/authentication/sign-in");
  //             window.location.reload();
  //           }
  //           if (result.message === "Token Does Not Exist") {
  //             navigate("/authentication/sign-in");
  //             window.location.reload();
  //           }
  //           if (result.message === "Unauthorized Access") {
  //             navigate("/authentication/forbiddenPage");
  //             window.location.reload();
  //           }
  //           MySwal.fire({
  //             title: result.status,
  //             type: "success",
  //             text: result.message,
  //           }).then(() => {
  //             // window.location.reload();
  //             navigate(`/Appraisals`);
  //           });
  //         })
  //         .catch((error) => {
  //           setOpened(false);
  //           MySwal.fire({
  //             title: error.status,
  //             type: "error",
  //             text: error.message,
  //           });
  //         });
  //     }
  //   };

  const changeDate = (time) => {
    const date = new Date(time);
    console.log(date);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const datee = date.getDate();
    const yDate = `${datee}th, ${year}`;
    return (
      <MDBox>
        <MDTypography
          style={{
            color: "#fff",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "25px",
            textAlign: "center",
          }}
        >
          {month}
        </MDTypography>
        <MDTypography style={{ color: "#fff", fontSize: "15px", textAlign: "center" }}>
          {yDate}
        </MDTypography>
      </MDBox>
    );
  };

  const changeStatus = (value) => {
    if (value === 0) {
      return "Created";
      // eslint-disable-next-line no-else-return
    } else if (value === 1) {
      return "Open";
    }
    return "Closed";
  };

  const changeAppStatus = (value) => {
    if (value === 1) {
      return "Approved";
      // eslint-disable-next-line no-else-return
    } else if (value === 2) {
      return "Declined";
    }
    return "No Decision Made";
  };

  const changeCol = (value) => {
    if (value === 2) {
      return "#FF0E0E";
      // eslint-disable-next-line no-else-return
    } else if (value === 1) {
      return "#42ba96";
    } else {
      return "#333";
    }
  };

  //   const handleSet = (value) => {
  //     console.log(value);
  //     if (appraisalResults.length === 0) {
  //       MySwal.fire({
  //         title: "NO_RESULT",
  //         type: "error",
  //         text: "No result present for this appraisal",
  //       });
  //     } else {
  //       const filteredItems = appraisalResults.filter((item) => item.appraisalID === value);
  //       console.log(filteredItems[0]);
  //     }
  //   };

  const handleChangeTab = (event, newValue) => {
    console.log(newValue);
    setValuex(newValue);
    if (newValue === 0) {
      //   handleGets();
    } else if (newValue === 1) {
      if (appraisalResults.length === 0) {
        MySwal.fire({
          title: "NO_RESULT",
          type: "error",
          text: "There is no result present for any appraisal",
        }).then(() => {
          setValuex(0);
        });
      }
    }
  };

  // Function to search table
  const searchFunc = (val) => {
    console.log(val);
    console.log(mainItems);
    // const input = document.getElementById("search").value;
    const input = val;
    console.log(input);
    const filter = input.toUpperCase();
    const jsonData = [];
    // eslint-disable-next-line array-callback-return
    mainItems.map((item) => {
      let docName = item.name;
      if (docName == null) {
        docName = "";
      }
      if (
        item.name.toUpperCase().indexOf(filter) > -1 ||
        docName.toUpperCase().indexOf(filter) > -1
      ) {
        jsonData.push(item);
      }
    });
    setAppraisals(jsonData);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Box sx={{ width: "40vw" }}>
          <Box sx={{ bgcolor: "#fff" }}>
            <AntTabs value={valuex} onChange={handleChangeTab} aria-label="ant example" centered>
              <AntTab label="Plain" />
              <AntTab label="Chart" />
            </AntTabs>
          </Box>
        </Box>
        {valuex === 0 && (
          <MDBox>
            <MDBox
              style={{
                padding: "10px",
                margin: "10px",
                display: "flex",
                //   justifyContent: "space-between",
                flexDirection: "column",
                borderRadius: "5px",
              }}
            >
              <MDBox
                style={{
                  marginLeft: "5px",
                  marginRight: "5px",
                  alignSelf: "flex-end",
                  // borderRight: "3px solid white",
                }}
              >
                {/* <MDTypography
              style={{
                color: "#777",
                textTransform: "capitalize",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              Search
            </MDTypography> */}
                <TextField
                  id="outlined-search"
                  placeholder="Search Appraisal"
                  type="search"
                  sx={{ input: { backgroundColor: "white" } }}
                  onKeyUp={(e) => searchFunc(e.target.value)}
                  InputProps={{
                    style: { color: "red", backgroundColor: "white" },
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "white" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </MDBox>
            </MDBox>
            <MDBox>
              {appraisals.map((appraisal) => {
                const appraisalName = appraisal.name;
                const creatorName = appraisal.createdByName;
                return (
                  <MDBox
                    style={{
                      padding: "10px",
                      margin: "10px",
                      display: "flex",
                      //   justifyContent: "space-between",
                      flexDirection: "row",
                      backgroundColor: changeCol(appraisal.approvalStatus),
                      borderRadius: "5px",
                    }}
                  >
                    <MDBox
                      //   ml={5}
                      //   mr={5}
                      style={{
                        marginLeft: "5px",
                        marginRight: "5px",
                        width: "10%",
                        alignSelf: "center",
                        // borderRight: "3px solid white",
                      }}
                    >
                      {changeDate(appraisal.createdTime)}
                    </MDBox>
                    <MDBox
                      //   ml={5}
                      //   mr={5}
                      style={{
                        borderRight: "3px solid white",
                      }}
                    />
                    <MDBox
                      style={{
                        marginLeft: "5px",
                        marginRight: "5px",
                        width: "70%",
                        alignSelf: "center",
                        // borderRight: "3px solid white",
                      }}
                    >
                      <MDTypography
                        style={{
                          color: "#fff",
                          textTransform: "capitalize",
                          //   fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        Appraisal:{" "}
                        <span
                          style={{
                            color: "#fff",
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          {appraisalName}
                        </span>
                      </MDTypography>
                      <MDTypography
                        style={{
                          color: "#fff",
                          textTransform: "capitalize",
                          //   fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        creator name:{" "}
                        <span
                          style={{
                            color: "#fff",
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          {creatorName}
                        </span>
                      </MDTypography>
                      <MDTypography
                        style={{
                          color: "#fff",
                          textTransform: "capitalize",
                          //   fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        Staus:{" "}
                        <span
                          style={{
                            color: "#fff",
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          {changeStatus(appraisal.status)}
                        </span>
                      </MDTypography>
                    </MDBox>
                    {/* <MDBox
                  style={{
                    marginLeft: "5px",
                    marginRight: "5px",
                    width: "10%",
                    alignSelf: "flex-end",
                    // borderRight: "3px solid white",
                  }}
                >
                  <Button
                    style={{ backgroundColor: "#fff" }}
                    onClick={() => handleSet(appraisal.id)}
                  >
                    VIEW
                  </Button>
                </MDBox> */}
                    <MDBox
                      //   ml={5}
                      //   mr={5}
                      style={{
                        borderRight: "3px solid white",
                      }}
                    />
                    <MDBox
                      //   ml={5}
                      //   mr={5}
                      style={{
                        marginLeft: "5px",
                        marginRight: "5px",
                        width: "15%",
                        alignSelf: "center",
                        // borderRight: "3px solid white",
                      }}
                    >
                      <MDTypography
                        style={{
                          color: "#fff",
                          textTransform: "capitalize",
                          //   fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        Approval Staus:{" "}
                        <MDTypography
                          style={{
                            color: "#fff",
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          {changeAppStatus(appraisal.approvalStatus)}
                        </MDTypography>
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                );
              })}
            </MDBox>
          </MDBox>
        )}
        {valuex === 1 && (
          <MDBox>
            <StackedChart data={datax} />
          </MDBox>
        )}
      </Card>
      <Footer />
      {/* <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={viewApp}>
        <Card sx={viewAppStyle}>
          {" "}
          <MDBox>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={() => handleViewClose()}
            >
              <ClearIcon sx={{ color: "red" }} />
            </IconButton>
          </MDBox>
          <MDBox>
            <MDTypography>put in here</MDTypography>
          </MDBox>
        </Card>
      </Backdrop> */}
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default AppraisalHistory;
