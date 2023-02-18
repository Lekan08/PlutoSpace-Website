import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
// import MDInput from "components/MDInput";
// import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
// import systemRolesTable from "layouts/systemRoles/data/systemRolesTables";
// import MDButton from "components/MDButton";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";

function Viewcredit() {
  // const { allGHeaders: miHeaders } = GHeaders();
  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: "center",
  //   color: "black",
  // }));
  // const [originalAmountx, setoriginalAmount] = useState("");
  // const [type, settype] = useState("");
  // const [createdTimex, setCreatedTime] = useState("");
  // const [clientNamex, setclientName] = useState("");
  // const [balancex, setbalancex] = useState("");
  // const [clientTypex, setclientTypex] = useState("");

  // const navigate = useNavigate();
  // const [allx, setAll] = useState([]);

  // // eslint-disable-next-line consistent-return
  // //   const handleOnNameKeys = () => {
  // //     const letters = /^[a-zA-Z ]+$/;
  // //     if (!namex.match(letters)) {
  // //       setCheckedName(false);
  // //       document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
  // //     }
  // //     if (namex.match(letters)) {
  // //       setCheckedName(true);
  // //       document.getElementById("name").innerHTML = "";
  // //     }
  // //     if (namex.length === 0) {
  // //       document.getElementById("name").innerHTML = "Prodducts is required<br>";
  // //     }

  // //     setEnabled(checkedName === true);
  // //   };

  // //   const handleUpdate = (e) => {
  // //     if (enabled) {
  // //       e.preventDefault();
  // //       const data11 = JSON.parse(localStorage.getItem("user1"));
  // //       const orgIDs = data11.orgID;
  // //       const idx = data11.id;
  // //       const personalIDs = data11.personalID;
  // //       const raw = JSON.stringify({
  // //         id: idx,
  // //         orgID: orgIDs,
  // //         name: namex,
  // //         description: descriptionx,
  // //         createdBy: personalIDs,
  // //         pricePerQuantity: pricePerQuantityx,
  // //       });
  // //       const requestOptions = {
  // //         method: "POST",
  // //         headers: myHeaders,
  // //         body: raw,
  // //         redirect: "follow",
  // //       };

  // //       fetch(`${process.env.REACT_APP_LOUGA_URL}/products/update`, requestOptions)
  // //         .then(async (res) => {
  // //           const aToken = res.headers.get("token-1");
  // //           localStorage.setItem("rexxdex", aToken);
  // //           return res.json();
  // //         })
  // //         .then((result) => {
  // //           // setOpened(false);
  // //           if (result.message === "Expired Access") {
  // //             navigate("/authentication/sign-in");
  // //             window.location.reload();
  // //           }
  // //           if (result.message === "Token Does Not Exist") {
  // //             navigate("/authentication/sign-in");
  // //             window.location.reload();
  // //           }
  // //           if (result.message === "Unauthorized Access") {
  // //             navigate("/authentication/forbiddenPage");
  // //             window.location.reload();
  // //           }
  // //           MySwal.fire({
  // //             title: result.status,
  // //             type: "success",
  // //             text: result.message,
  // //           }).then(() => {
  // //             window.location.reload();
  // //           });
  // //         })
  // //         .catch((error) => {
  // //           // setOpened(false);
  // //           MySwal.fire({
  // //             title: error.status,
  // //             type: "error",
  // //             text: error.message,
  // //           });
  // //         });
  // //     }
  // //   };

  // // eslint-disable-next-line consistent-return
  // const handleOnClientType = (clientType) => {
  //   if (clientType === 1) {
  //     return "Individual";
  //   }
  //   if (clientType === 2) {
  //     return "Corporate";
  //   }
  // };

  // useEffect(() => {
  //   const headers = miHeaders;

  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const ids = urlParams.get("id");
  //   // const ids = JSON.parse([id]);

  //   // const data11 = JSON.parse(localStorage.getItem("user1"));

  //   // const ids = data11.id;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/creditFacility/getByIds/${ids}`, {
  //     headers,
  //   })
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       console.log(result);
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
  //         setAll(result);
  //         console.log(result);
  //         //   console.log(namex);
  //         settype(result[0].type);
  //         setclientName(result[0].clientName);
  //         setCreatedTime(result[0].createdTime);
  //         setclientTypex(result[0].clientType);
  //         setoriginalAmount(result[0].originalAmount);
  //         setbalancex(result[0].balance);
  //       }
  //       console.log(result);
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
  //   const { allPHeaders: myHeaders } = PHeaders();
  //   const { allGHeaders: miHeaders } = GHeaders();

  //   const MySwal = withReactContent(Swal);
  //   const [namex, setName] = useState("");
  //   const [descriptionx, setDescriptionx] = useState("");
  //   const [pricePerQuantityx, setPricePerQuantity] = useState("");
  //   const [enabled, setEnabled] = useState("");
  //   const [checkedName, setCheckedName] = useState("");

  //   const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const [allx, setAll] = useState([]);

  // eslint-disable-next-line consistent-return
  //   const handleOnNameKeys = () => {
  //     const letters = /^[a-zA-Z ]+$/;
  //     if (!namex.match(letters)) {
  //       setCheckedName(false);
  //       document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
  //     }
  //     if (namex.match(letters)) {
  //       setCheckedName(true);
  //       document.getElementById("name").innerHTML = "";
  //     }
  //     if (namex.length === 0) {
  //       document.getElementById("name").innerHTML = "Prodducts is required<br>";
  //     }

  //     setEnabled(checkedName === true);
  //   };

  //   const handleUpdate = (e) => {
  //     if (enabled) {
  //       e.preventDefault();
  //       const data11 = JSON.parse(localStorage.getItem("user1"));
  //       const orgIDs = data11.orgID;
  //       const idx = data11.id;
  //       const personalIDs = data11.personalID;
  //       const raw = JSON.stringify({
  //         id: idx,
  //         orgID: orgIDs,
  //         name: namex,
  //         description: descriptionx,
  //         createdBy: personalIDs,
  //         pricePerQuantity: pricePerQuantityx,
  //       });
  //       const requestOptions = {
  //         method: "POST",
  //         headers: myHeaders,
  //         body: raw,
  //         redirect: "follow",
  //       };

  //       fetch(`${process.env.REACT_APP_LOUGA_URL}/products/update`, requestOptions)
  //         .then(async (res) => {
  //           const aToken = res.headers.get("token-1");
  //           localStorage.setItem("rexxdex", aToken);
  //           return res.json();
  //         })
  //         .then((result) => {
  //           // setOpened(false);
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
  //             window.location.reload();
  //           });
  //         })
  //         .catch((error) => {
  //           // setOpened(false);
  //           MySwal.fire({
  //             title: error.status,
  //             type: "error",
  //             text: error.message,
  //           });
  //         });
  //     }
  //   };
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const clientID = data11.id;
    let isMounted = true;
    // eslint-disable-next-line no-irregular-whitespace
    fetch(`${process.env.REACT_APP_LOUGA_URL}/creditFacility/getByIds/${ids}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        console.log(result);
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
        setAll(result);
        console.log(result);
        if (isMounted) {
          setAll(result);
          // if (result.length === 0) {
          //   // eslint-disable-next-line no-undef
          //   setName([])
          //   // eslint-disable-next-line no-undef
          //   setDescriptionx([]);
          //   // eslint-disable-next-line no-undef
          //   setPricePerQuantity([]);
          // } else {
          //   // eslint-disable-next-line no-undef
          //   setName(result);
          //   // eslint-disable-next-line no-undef
          //   setDescriptionx(result);
          //   // eslint-disable-next-line no-undef
          //   setPricePerQuantity(result);
          // }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container>
        <div className="row">
          {allx.map((item) => (
            <Grid item xs={12} md={12} lg={12} key={item.id}>
              <Card sx={{ maxWidth: 650 }}>
                <CardContent>
                  <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="success"
                    mt={2}
                    mx={0}
                    p={1}
                    mb={3}
                    textAlign="left"
                  >
                    <MDTypography
                      variant="h4"
                      fontWeight="medium"
                      color="white"
                      textAlign="center"
                      mt={1}
                    >
                      VIEW CREDIT
                    </MDTypography>
                  </MDBox>
                  <MDTypography variant="h6" color="text" fontSize="120%" textAlign="left" mt={1}>
                    clientName - {item.clientName}
                  </MDTypography>
                  <hr />
                  <MDTypography variant="h6" color="text" fontSize="120%" textAlign="left" mt={1}>
                    clientType - {item.clientType}
                  </MDTypography>
                  <hr />
                  <MDTypography variant="h6" color="text" fontSize="120%" textAlign="left" mt={1}>
                    TYPE PRODUCT - {item.type}
                  </MDTypography>
                  <hr />
                  <MDTypography variant="h6" color="text₦" fontSize="120%" textAlign="left" mt={0}>
                    Original Amount (₦) - {item.originalAmount}
                  </MDTypography>
                  <hr />
                  <MDTypography variant="h6" color="text₦" fontSize="120%" textAlign="left" mt={0}>
                    Balance (₦) - {item.balance}
                  </MDTypography>
                </CardContent>
                {/* <CardActions>
                                <div align="right">
                                  <MDButton
                                    variant="gradient"
                                    color="info"
                                    onClick={() => handleAppraise(item.id)}
                                    width="50%"
                                  >
                                    Appraise
                                  </MDButton>
                                </div>
                              </CardActions> */}
              </Card>
              &nbsp;
            </Grid>
          ))}
        </div>
      </Container>
    </DashboardLayout>
  );
}

export default Viewcredit;
