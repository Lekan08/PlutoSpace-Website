// import React, { useState, useEffect } from "react";
// import MDBox from "components/MDBox";
// // import MDInput from "components/MDInput";
// // import DataTable from "examples/Tables/DataTable";
// import MDTypography from "components/MDTypography";
// // import TextField from "@mui/material/TextField";
// // import MDButton from "components/MDButton";
// // import Card from "@mui/material/Card";
// import { Card } from "@mui/material";
// // eslint-disable-next-line no-unused-vars
// import { Container, Form, Row, Col, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// // import Chip from "@mui/material/Chip";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";
// import GHeaders from "getHeader";
// import { useNavigate } from "react-router-dom";

// // import Swal from "sweetalert2";
// // import withReactContent from "sweetalert2-react-content";

// function Supplystat() {
//   const navigate = useNavigate();
//   const { allGHeaders: miHeaders } = GHeaders();
//   const [opened, setOpened] = useState(false);
//   const [totalSupply, setTotalSupply] = useState([]);
//   useEffect(() => {
//     const headers = miHeaders;
//     const data11 = JSON.parse(localStorage.getItem("user1"));
//     const year = Date.parse(new Date());
//     let isMounted = true;
//     const month = new Date().getMonth();
//     if (data11 === null) {
//       navigate("/authentication/sign-in");
//       window.location.reload();
//     } else {
//       const orgIDs = data11.orgID;
//       fetch(`${process.env.REACT_APP_LOUGA_URL}/supply/getForYear/${orgIDs}/${year}`, {
//         headers,
//       })
//         .then(async (res) => {
//           const aToken = res.headers.get("token-1");
//           localStorage.setItem("rexxdex", aToken);
//           return res.json();
//         })
//         .then((result) => {
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
//           if (isMounted) {
//             setTotalSupply(result[month]);
//           }
//         });
//     }

//     return () => {
//       isMounted = false;
//     };
//   }, []);
//   // eslint-disable-next-line no-unused-vars
//   function randit() {
//     setOpened(false);
//   }
//   return (
//     <Card>
//       <br />
//       <MDBox
//         variant="gradient"
//         bgColor="white"
//         borderRadius="lg"
//         coloredShadow="success"
//         mt={-0.8}
//         mx={-1}
//         p={0.8}
//         mb={3}
//         textAlign="left"
//       >
//         <MDTypography
//           variant="h6"
//           fontSize="80%"
//           fontWeight="medium"
//           color="text"
//           textAlign="center"
//           mt={0.5}
//           p={1}
//         >
//           Monthly Supply Statistics
//         </MDTypography>
//       </MDBox>
//       <MDTypography
//         variant="h6"
//         fontWeight="bold"
//         fontSize="13px"
//         color="text"
//         textAlign="center"
//         mt={1}
//       >
//         supply Quantity Conversion Rate :
//         <br />
//         Total supply Requests : {totalSupply.totalRequests}
//         <br />
//         Total supply Amount (NGN): {totalSupply.totalTotalAmount}
//         <br />
//         Total supply Bonus (NGN) : {totalSupply.totalBonusAmount}
//         <br />
//         Total VAT Amount (NGN) : {totalSupply.totalVatAmount}
//       </MDTypography>
//       <br />
//       <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
//         <CircularProgress color="info" />
//       </Backdrop>
//     </Card>
//   );
// }

// export default Supplystat;
