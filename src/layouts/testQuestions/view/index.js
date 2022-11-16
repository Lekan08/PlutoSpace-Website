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
// Big Zzzz

function ViewTestQuestions() {
  //   const MySwal = withReactContent(Swal);
  //   const { columns: pColumns, rows: pRows } = SupplyTable();

  //   const [titlex, setTitle] = useState("");
  //   const [quantityx, setQuantity] = useState("");
  // const [descripx, setDescrip] = useState("");
  //   const [checkedTitle, setCheckedTitle] = useState("");
  //   const [checkedQuantity, setCheckedQuantity] = useState("");
  //   const [clientNamex, setClientNamex] = useState("");
  // const [createdx, setCreatedx] = useState("");
  // const [supplyingBranx, setSupplyingBran] = useState("");
  const [allx, setAll] = useState([]);

  //   const [imageKeyx, setImageKey] = useState("");
  //   console.log(imageKeyx);

  //   const [link, setLink] = useState("");
  //   const [isImg, setIsImg] = useState(false);
  // const [showImagex, setShowImage] = useState("");

  // const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  //   const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // const scrollContainerStyle = { width: "100%", maxHeight: "60%" };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    const headers = miHeaders;
    // let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/questions/getByIds/${ids}`, { headers })
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
        console.log(result);
        setAll(result);
        // const okShowImage = result[0].imageUrl;
        // fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${okShowImage}`, {
        //   headers,
        // })
        //   .then(async (res) => {
        //     const aToken = res.headers.get("token-1");
        //     localStorage.setItem("rexxdex", aToken);
        //     return res.json();
        //   })
        //   .then((resultx) => {
        //     if (result.message === "Expired Access") {
        //       navigate("/authentication/sign-in");
        //       window.location.reload();
        //     }
        //     if (resultx.message === "Token Does Not Exist") {
        //       navigate("/authentication/sign-in");
        //       window.location.reload();
        //     }
        //     if (resultx.message === "Unauthorized Access") {
        //       navigate("/authentication/forbiddenPage");
        //       window.location.reload();
        //     }
        //     console.log(resultx);
        //     setShowImage(resultx);
        // console.log(`link [${resultx[0]}]`);
        // if (resultx.length === 0) {
        //   MySwal.fire({
        //     title: "INVALID_IMAGE",
        //     type: "error",
        //     text: "There is no image present",
        //   });
        // } else {
        //   handleClick(e, resultx[0]);
        //     // }
        //   });
        // if (isMounted) {
        //   setAll(result);
        //   setImageKey(result[0].imageUrl);
        //   console.log(result);
        //   console.log(result[0].imageUrl);
        //   //   setQuestion(result[0].question);
        //   //   setHint(result[0].hint);
        //   //   setImage(result[0].imageUrl);
        //   //   //   console.log(setImage);
        //   //   //   console.log(result[0].imageUrl);
        //   //   setInstruction(result[0].instruction);
        //   //   setImageKeyx(result[0].imageKey);
        //   //   console.log(result);
        // }
      });
    // return () => {
    //   isMounted = false;
    // };
  }, []);
  // eslint-disable-next-line consistent-return
  //   const handleOnClient = (clientTypes) => {
  //     if (clientTypes === 1) {
  //       return "Individual";
  //     }
  //     if (clientTypes === 2) {
  //       return "Corporate";
  //     }
  //   };

  //   useEffect(() => {
  //     // const queryString = window.location.search;
  //     // const urlParams = new URLSearchParams(queryString);
  //     // const ids = urlParams.get("id");
  //     // const flieName = allx[0].imageKey;

  //     const headers = miHeaders;
  //     let isMounted = true;
  //     fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${imageKeyx}`, {
  //       headers,
  //     })
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
  //         console.log(result);
  //         if (isMounted) {
  //           setShowImage(result);
  //           console.log(result);
  //           //   setQuestion(result[0].question);
  //           //   setHint(result[0].hint);
  //           //   setImage(result[0].imageUrl);
  //           //   //   console.log(setImage);
  //           //   //   console.log(result[0].imageUrl);
  //           //   setInstruction(result[0].instruction);
  //           //   setImageKeyx(result[0].imageKey);
  //           //   console.log(result);
  //         }
  //       });
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);

  //   useEffect(() => {
  //     const headers = miHeaders;
  //     fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${im}`, {
  //       headers,
  //     })
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         return res.json();
  //       })
  //       .then((resultx) => {
  //         if (resultx.message === "Expired Access") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (resultx.message === "Token Does Not Exist") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (resultx.message === "Unauthorized Access") {
  //           navigate("/authentication/forbiddenPage");
  //           window.location.reload();
  //         }
  //         if (isMounted) {
  //           setShowImage(resultx[0]);
  //           console.log(`link [${resultx[0]}]`);
  //           //   setOpened(false);
  //           //   if (resultx.length === 0) {
  //           //     console.log("nothing");
  //           //     setIsImg(false);
  //           //   } else {
  //           //     setIsImg(true);
  //           //     console.log("something");
  //           //   }
  //         }
  //       });
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);

  //   useEffect(() => {
  //     const headers = miHeaders;
  //     // const ids = JSON.parse([id]);

  //     // const data11 = JSON.parse(localStorage.getItem("user1"));

  //     // const ids = data11.id;
  //     const data11 = JSON.parse(localStorage.getItem("user1"));

  //     const orgIDs = data11.orgID;
  //     let isMounted = true;
  //     // setOpened(true);
  //     fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getByKey/${orgIDs}/${orgIDs}`, {
  //       headers,
  //     })
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         const result = await res.text();
  //         if (result === null || result === undefined || result === "") {
  //           return {};
  //         }
  //         return JSON.parse(result);
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
  //         // eslint-disable-next-line no-unused-vars
  //         const im = result.name;
  //         fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${im}`, {
  //           headers,
  //         })
  //           .then(async (res) => {
  //             const aToken = res.headers.get("token-1");
  //             localStorage.setItem("rexxdex", aToken);
  //             return res.json();
  //           })
  //           .then((resultx) => {
  //             if (resultx.message === "Expired Access") {
  //               navigate("/authentication/sign-in");
  //               window.location.reload();
  //             }
  //             if (resultx.message === "Token Does Not Exist") {
  //               navigate("/authentication/sign-in");
  //               window.location.reload();
  //             }
  //             if (resultx.message === "Unauthorized Access") {
  //               navigate("/authentication/forbiddenPage");
  //               window.location.reload();
  //             }
  //             if (isMounted) {
  //               setLink(resultx[0]);
  //               console.log(`link [${resultx[0]}]`);
  //               // setOpened(false);
  //               if (resultx.length === 0) {
  //                 console.log("nothing");
  //                 setIsImg(false);
  //               } else {
  //                 setIsImg(true);
  //                 console.log("something");
  //               }
  //             }
  //           });
  //       });
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 50,
    },
    preview: {
      marginTop: 50,
      display: "flex",
      flexDirection: "column",
    },
    image: { maxWidth: "100%", maxHeight: 320, borderRadius: 20 },
    delete: {
      cursor: "pointer",
      padding: 5,
      background: "blue",
      color: "white",
      border: "none",
      borderRadius: 5,
      width: 200,
    },
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <Card>
        <MDBox pt={4} pb={3} px={20}> */}
      {/* <div className="scrollbar scrollbar-primary mt-2 mx-auto" style={scrollContainerStyle}> */}
      <Container>
        <div className="row">
          {allx.map((item) => (
            <Grid item xs={20} md={12} lg={20} key={item.id}>
              <Card sx={{ maxWidth: 900 }}>
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
                      View Test Question
                    </MDTypography>
                  </MDBox>
                  <MDTypography
                    variant="h6"
                    color="text"
                    fontSize="75%"
                    textAlign="left"
                    mt={1}
                    // style={{ backgroundColor: "#ADD8E6" }}
                  >
                    Question - {item.question}
                  </MDTypography>
                  <hr />
                  <br />
                  <MDTypography variant="h6" color="text" fontSize="75%" textAlign="left" mt={0}>
                    Hint - {item.hint}
                  </MDTypography>
                  <hr />
                  <br />
                  <MDTypography
                    variant="h6"
                    color="text"
                    fontSize="75%"
                    textAlign="left"
                    mt={0}
                    // style={{ backgroundColor: "#ADD8E6" }}
                  >
                    Instruction - {item.instruction}
                  </MDTypography>
                  <hr />
                  <br />
                  <MDTypography variant="h6" color="text" fontSize="75%" textAlign="left" mt={0}>
                    Image - <img src={allx[0].imageUrl} style={styles.image} alt="Thumb" />
                  </MDTypography>
                </CardContent>
              </Card>
              &nbsp;
            </Grid>
          ))}
        </div>
      </Container>
      {/* </div> */}
      {/* </MDBox>
      </Card> */}
    </DashboardLayout>
  );
}

export default ViewTestQuestions;
