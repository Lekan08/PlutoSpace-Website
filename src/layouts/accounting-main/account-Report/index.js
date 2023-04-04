/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid, Card, CardContent } from "@mui/material";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Footer from "examples/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CardMedia from "@mui/material/CardMedia";
import Styles from "styles";
import accountingLoader from "./accountingLoader.gif";
import IncomeReport from "./incomeReport.jpg";

// import { Grid } from "@mui/material";
// import CardContent from "assets/theme/components/card/cardContent";

function AccountReport() {
  const MySwal = withReactContent(Swal);

  //   const [items, setItems] = useState([]);
  //   const [superAccounts, setSuperAccounts] = useState([]);

  const [opened, setOpened] = useState(false);
  const [userProfile, setUserProfilePic] = useState("");
  const [companyDetails, setCompayDetails] = useState("");

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  const showMessage = (alertTitle, alertType, alertText) => {
    MySwal.fire({
      title: alertTitle,
      type: alertType,
      text: alertText,
    });
  };

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    const companyInfo = fetch(`${process.env.REACT_APP_KUBU_URL}/company/get/${orgIDs}`, {
      headers,
    }).then(async (res) => {
      const aToken = res.headers.get("token-1");
      localStorage.setItem("rexxdex", aToken);
      const resultres = await res.text();
      if (resultres === null || resultres === undefined || resultres === "") {
        return {};
      }
      return JSON.parse(resultres);
    });

    const profilePicLink = fetch(
      `${process.env.REACT_APP_EKOATLANTIC_URL}/media/getByKey/${orgIDs}/${orgIDs}`,
      {
        headers,
      }
    ).then(async (res) => {
      const aToken = res.headers.get("token-1");
      localStorage.setItem("rexxdex", aToken);
      const resultres = await res.text();
      if (resultres === null || resultres === undefined || resultres === "") {
        return {};
      }
      return JSON.parse(resultres);
    });

    Promise.all([companyInfo, profilePicLink]).then((results) => {
      const [companyInfo, profilePicLink] = results;
      console.log(results);

      setOpened(false);
      if (companyInfo.message === "Expired Access" || profilePicLink.message === "Expired Access") {
        navigate("/authentication/sign-in");
        window.location.reload();
      }
      if (
        companyInfo.message === "Token Does Not Exist" ||
        profilePicLink.message === "Token Does Not Exist"
      ) {
        navigate("/authentication/sign-in");
        window.location.reload();
      }
      if (
        companyInfo.message === "Unauthorized Access" ||
        profilePicLink.message === "Unauthorized Access"
      ) {
        navigate("/authentication/forbiddenPage");
        window.location.reload();
      }
      if (isMounted) {
        setCompayDetails(companyInfo);
        console.log(companyInfo);
        console.log(profilePicLink);
        fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${profilePicLink.name}`, {
          headers,
        })
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

            console.log(`link [${resultx[0]}]`);
            setUserProfilePic(resultx[0]);

            console.log(userProfile);
          });
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = () => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    setOpened(true);
    const IncomeStatementAPI = `${process.env.REACT_APP_LOUGA_URL}/accounts/getIncomeStatement/${orgIDs}`;
    const incomeStatementPDF = `${process.env.REACT_APP_EKOATLANTIC_URL}/reports/generate/income-statement`;

    fetch(IncomeStatementAPI, {
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
          console.log(incomeStatementPDF);
          console.log(companyDetails);
          const raw = JSON.stringify({
            company: {
              id: companyDetails[0].id,
              name: companyDetails[0].name,
              street: companyDetails[0].street,
              city: companyDetails[0].city,
              state: companyDetails[0].state,
              country: companyDetails[0].country,
              pno: companyDetails[0].pno,
              email: companyDetails[0].email,
              // eslint-disable-next-line no-unneeded-ternary
              profilePic: userProfile ? userProfile : "https://i.ibb.co/5FG72RG/defaulto.png",
            },
            incomeTotal: result.incomeTotal.toLocaleString(undefined),
            incomeTotalNumber: result.incomeTotalNumber.toLocaleString(undefined),
            costOfGoodsTotal: result.costOfGoodsTotal.toLocaleString(undefined),
            costOfGoodsTotalNumber: Number(result.costOfGoodsTotalNumber),
            operatingCostTotal: result.operatingCostTotal.toLocaleString(undefined),
            operatingCostTotalNumber: Number(result.operatingCostTotalNumber),
            nonOperatingCostTotal: result.nonOperatingCostTotal.toLocaleString(undefined),
            nonOperatingCostTotalnumber: Number(result.costOfGoodsTotalNumber),
            incomeItems: result.incomeItems,
            costOfGoodsItems: result.costOfGoodsItems,
            operatingCostItems: result.operatingCostItems,
            nonOperatingCostItems: result.nonOperatingCostItems,
          });
          console.log(raw);
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
          fetch(incomeStatementPDF, requestOptions)
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

              if (isMounted) {
                if (result.status === "SUCCESS") {
                  fetch(
                    `${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${result.data.name}`,
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

                      // if (isMounted) {
                      console.log(`link [${resultxme2[0]}]`);
                      const url = resultxme2[0];
                      if (url !== "") {
                        const objectURL = url;
                        console.log(objectURL);

                        // (C2) TO "FORCE DOWNLOAD"
                        const anchor = document.createElement("a");
                        anchor.href = objectURL;
                        anchor.download = result.data.name;
                        anchor.click();

                        // (C3) CLEAN UP
                        window.URL.revokeObjectURL(objectURL);
                      }
                    })
                    .catch((error) => {
                      showMessage(error.status, "error", error.message);
                    });
                } else if (result.status === "FAILURE") {
                  showMessage(result.status, "error", result.message);
                }
              }
            })
            .catch((error) => {
              showMessage(error.status, "error", error.message);
            });
        }
      })
      .catch((error) => {
        showMessage(error.status, "error", error.message);
      });
    return () => {
      isMounted = false;
    };
  };

  //   const handleRunCal = () => {
  //     console.log(typex);
  //     setTypexx(typex);
  //     const headers = miHeaders;
  //     const data11 = JSON.parse(localStorage.getItem("user1"));

  //     const orgIDs = data11.orgID;
  //     const IncomeStatementAPI = `${process.env.REACT_APP_LOUGA_URL}/accounts/getIncomeStatement/${orgIDs}`;
  //     const apiUrl2 = "https://api.example.com/api2";
  //     let isMounted = true;
  //     setOpened(true);
  //     fetch(`${process.env.REACT_APP_LOUGA_URL}/accounting/getLast/${orgIDs}/${typex}`, { headers })
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         return res.json();
  //       })
  //       .then((result) => {
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
  //         if (isMounted) {
  //           if (result.length !== 0) {
  //             setTotalBalanceValue(result.closingBalance);
  //             console.log(result);
  //           }
  //         }
  //       });

  //     const request1 = fetch(
  //       `${process.env.REACT_APP_LOUGA_URL}/accounting/runAccountsExpense/${orgIDs}/${typex}`,
  //       {
  //         headers,
  //       }
  //     ).then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       const resultres = await res.text();
  //       if (resultres === null || resultres === undefined || resultres === "") {
  //         return {};
  //       }
  //       return JSON.parse(resultres);
  //     });

  //     const request2 = fetch(
  //       `${process.env.REACT_APP_LOUGA_URL}/accounting/runAccountsIncome/${orgIDs}/${typex}`,
  //       {
  //         headers,
  //       }
  //     ).then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       const resultres = await res.text();
  //       if (resultres === null || resultres === undefined || resultres === "") {
  //         return {};
  //       }
  //       return JSON.parse(resultres);
  //     });

  //     Promise.all([request1, request2])
  //       .then((results) => {
  //         const [result1, result2] = results;
  //         console.log(results);

  //         setOpened(false);
  //         if (result1.message === "Expired Access" || result2.message === "Expired Access") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (
  //           result1.message === "Token Does Not Exist" ||
  //           result2.message === "Token Does Not Exist"
  //         ) {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (
  //           result1.message === "Unauthorized Access" ||
  //           result2.message === "Unauthorized Access"
  //         ) {
  //           navigate("/authentication/forbiddenPage");
  //           window.location.reload();
  //         }
  //         if (isMounted) {
  //           const mergedArray = result1.concat(result2);
  //           if (mergedArray.length === 0) {
  //             setNoTransactionsMade(true);
  //           }
  //           if (mergedArray.length !== 0) {
  //             setRunAccDataTa(
  //               mergedArray.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime))
  //             );
  //           }
  //           if (result1.length !== 0) {
  //             // setExpensesData(result1);
  //             setDisplay(true);
  //             setTotalExpenses(result1.reduce((a, b) => a + b.totalAmount, 0));
  //             console.log(result1);
  //           }
  //           if (result2.length !== 0) {
  //             setDisplay(true);
  //             // setIncomeData(result2);
  //             setTotalIncome(result2.reduce((a, b) => a + b.totalAmount, 0));
  //             console.log(result2);
  //           }
  //         }
  //       })
  //       .catch((error) => {
  //         setOpened(false);
  //         MySwal.fire({
  //           title: error.status,
  //           type: "error",
  //           text: error.message,
  //         });
  //       });

  //     return () => {
  //       isMounted = false;
  //     };
  //   };

  //   const handleGets = () => {
  //     const data11 = JSON.parse(localStorage.getItem("user1"));

  //     const orgIDs = data11.orgID;
  //     setOpened(true);
  //     const headers = miHeaders;
  //     fetch(`${process.env.REACT_APP_LOUGA_URL}/accounts/gets/${orgIDs}`, {
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
  //         console.log(result);
  //         if (result.status !== 500) {
  //           // if (Object.keys(result).length !== 0) {
  //           if (result.length !== 0) {
  //             setItems(result);
  //           } else {
  //             setItems([]);
  //           }
  //           // }
  //         }

  //         setOpened(false);
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

  //   const handleGetSuperAccount = () => {
  //     const data11 = JSON.parse(localStorage.getItem("user1"));

  //     const orgIDs = data11.orgID;
  //     setOpened(true);
  //     const headers = miHeaders;
  //     fetch(`${process.env.REACT_APP_LOUGA_URL}/accounts/getSuperAccounts/${orgIDs}`, {
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
  //         console.log(result);
  //         if (result.status !== 500) {
  //           // if (Object.keys(result).length !== 0) {
  //           if (result.length !== 0) {
  //             setSuperAccounts(result);
  //           } else {
  //             setSuperAccounts([]);
  //           }
  //           // }
  //         }

  //         setOpened(false);
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={5}>
          <MDBox
            variant="gradient"
            //   bgColor="info"
            style={Styles.boxSx}
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Account&rsquo;s Report
            </MDTypography>
          </MDBox>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="290"
                    image={IncomeReport}
                    alt="IncomeReport Image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Income Statement Report
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      onClick={handleClick}
                      style={Styles.buttonSx}
                      // color="info"
                      width="50%"
                      align="center"
                    >
                      Run Report
                    </MDButton>
                  </MDBox>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={6} md={6}>
              <Card
                style={{
                  backgroundColor: "#d9534f",

                  minHeight: "30vw",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <Typography
                  style={{ color: "white" }}
                  sx={{ fontSize: 20, fontWeight: 800, textAlign: "center", paddingTop: "5vw" }}
                  color="text.secondary"
                  gutterBottom
                >
                  Balance Sheet Report
                </Typography>
                <Button variant="contained" sx={{ color: "fff" }}>
                  Contained
                </Button>
              </Card>
            </Grid>
            {/* <Grid
              item
              xs={6}
              style={{
                // display: "flex",
                // marginLeft: "auto",
                // marginRight: "auto",
                borderRight: "#f96d02 solid 3px",
              }}
            ></Grid>

            <Grid item xs={6} style={{ paddingLeft: "2vw" }}></Grid> */}
          </Grid>
        </MDBox>
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={accountingLoader}
              alt="work"
              style={{
                height: "50%",
                width: "35%",
              }}
            />
            <div
              className="row"
              style={{
                position: "absolute",
                marginTop: "9rem",
              }}
            >
              Please wait, this may take some time...
            </div>
          </div>
        </>
      </Backdrop>
    </DashboardLayout>
  );
}

export default AccountReport;
