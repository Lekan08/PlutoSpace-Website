import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
// import MDInput from "components/MDInput";
// import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
// import systemRolesTable from "layouts/systemRoles/data/systemRolesTables";
// import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CardContent from "@mui/material/CardContent";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
// import SupplyTable from "layouts/supply/supplytable.js";

function Viewproducts() {
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
  const scrollContainerStyle = { width: "100%", maxHeight: "60%" };

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const clientID = data11.id;
    let isMounted = true;
    // eslint-disable-next-line no-irregular-whitespace
    fetch(`${process.env.REACT_APP_LOUGA_URL}/products/getByIds/${ids}`, {
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
        setAll(result);
        if (isMounted) {
          setAll(result);
          // if (result.length === 0) {
          //   // eslint-disable-next-line no-undef
          //   setName([]);
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
      <Card>
        <MDBox pt={4} pb={3} px={20}>
          <div className="scrollbar scrollbar-primary mt-2 mx-auto" style={scrollContainerStyle}>
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
                            VIEW PRODUCT
                          </MDTypography>
                        </MDBox>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="120%"
                          textAlign="left"
                          mt={1}
                        >
                          Name - {item.name}
                        </MDTypography>
                        <hr />
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="120%"
                          textAlign="left"
                          mt={1}
                        >
                          Description - {item.description}
                        </MDTypography>
                        <hr />
                        <MDTypography
                          variant="h6"
                          color="text₦"
                          fontSize="120%"
                          textAlign="left"
                          mt={0}
                        >
                          Price Per Quantity (₦) - {item.pricePerQuantity}
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
          </div>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default Viewproducts;
