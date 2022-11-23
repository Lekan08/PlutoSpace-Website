// import React, { useEffect, useState } from "react";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";
// import Card from "@mui/material/Card";
// import { Container, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import MDTypography from "components/MDTypography";
// import PHeaders from "postHeader";
// import GHeaders from "getHeader";
// import Styles from "styles";
// import TextField from "@mui/material/TextField";
// // zinoleesky wrote this part of d code called sales

// function Sales() {
//   const { allPHeaders: myHeaders } = PHeaders();
//   const { allGHeaders: miHeaders } = GHeaders();

//   const [branId, setBranId] = useState([]);
//   const [branx, setBranx] = useState("");
//   const [quantityx, setQuantity] = useState("");
//   const [ppQuantity, setPPQuantity] = useState("");
//   const [amountx, setAmount] = useState(0);
//   const [taskAmountx, setTaskAmount] = useState(0);

//   useEffect(() => {
//     const data11 = JSON.parse(localStorage.getItem("user1"));

//     const orgIDs = data11.orgID;
//     const headers = miHeaders;
//     let isMounted = true;
//     fetch(`${process.env.REACT_APP_KUBU_URL}/branch/gets/${orgIDs}`, { headers })
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
//           setBranId(result);
//         }
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const handleClick = (e) => {
//     handleOnTitleKeys();
//     handleOnQuantityKeys();
//     // handleOnPPQuantityKeys();
//     // handleOnBonusAmountKeys();
//     if (enabled) {
//       setOpened(true);
//       e.preventDefault();
//       const data11 = JSON.parse(localStorage.getItem("user1"));

//       const orgIDs = data11.orgID;
//       const idx = data11.personalID;
//       const raw = JSON.stringify({
//         orgID: orgIDs,
//         individualID: idx,
//         items: [
//           {
//             saleType: 0,
//             salesID: string,
//             branchID: branx,
//             pricePerUnit: ppQuantity,
//             quantity: quantityx,
//             amount: amountx,
//             taxAmount: taskAmountx,
//             totalAmount: totalAmountx,
//           },
//         ],
//         bonusAmount: 0,
//         subTotalAmount: 0,
//         totalAmount: 0,
//         createdBy: idx,
//         comment: string,
//         receiptStatus: 0,
//       });
//       const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow",
//       };

//       fetch(`${process.env.REACT_APP_LOUGA_URL}/sales/add`, requestOptions)
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
//           })
//             .then(() => {
//               console.log(result.data.id);
//               handlePayVAT(result.data.id);
//               // window.location.reload();
//             })
//             .then(() => {
//               window.location.reload();
//             });
//         })
//         .catch((error) => {
//           MySwal.fire({
//             title: error.status,
//             type: "error",
//             text: error.message,
//           });
//         });
//     }
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Card>
//         <MDBox pt={4} pb={3} px={30}>
//           <MDBox
//             variant="gradient"
//             // bgColor="info"
//             borderRadius="lg"
//             coloredShadow="info"
//             mx={2}
//             mt={-3}
//             p={2}
//             mb={1}
//             textAlign="center"
//             style={Styles.boxSx}
//           >
//             <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
//               Sales
//             </MDTypography>
//           </MDBox>
//           <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//             <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
//               {" "}
//             </MDTypography>
//           </MDBox>
//           <MDBox component="form" role="form">
//             <MDBox mb={2}>
//               <Container>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     {/* <MDInput
//                       type="text"
//                       label="Quantity *"
//                       value={quantityx || ""}
//                       onKeyUp={handleOnNameKeys}
//                       className="form-control"
//                       onChange={(e) => setQuantity(e.target.value)}
//                       variant="standard"
//                       fullWidth
//                     /> */}
//                     <TextField
//                       label="Amount *"
//                       type="number"
//                       value={amountx}
//                       onKeyUp={handleOnNameKeys}
//                       onChange={(e) => setAmount(e.target.value)}
//                     />
//                   </div>
//                   <div className="col-sm-6">
//                     {/* <MDInput
//                       type="text"
//                       value={ppQuantity || ""}
//                       onChange={(e) => setPPQuantity(e.target.value)}
//                       label="Price Per Quantity"
//                       variant="standard"
//                       fullWidth
//                     /> */}
//                     <TextField
//                       label="Price Per Quantity "
//                       type="number"
//                       value={ppQuantity}
//                       onChange={(e) => setPPQuantity(e.target.value)}
//                     />
//                   </div>
//                 </div>
//               </Container>
//             </MDBox>
//             <MDBox mb={2}>
//               <Container>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     {/* <MDInput
//                       type="text"
//                       label="Quantity *"
//                       value={amountx || ""}
//                       onKeyUp={handleOnNameKeys}
//                       className="form-control"
//                       onChange={(e) => setAmount(e.target.value)}
//                       variant="standard"
//                       fullWidth
//                     /> */}
//                     <TextField
//                       label="Quantity *"
//                       type="number"
//                       value={quantityx}
//                       onChange={(e) => setQuantity(e.target.value)}
//                     />
//                   </div>
//                   <div className="col-sm-6">
//                     {/* <MDInput
//                       type="text"
//                       value={ppQuantity || ""}
//                       onChange={(e) => setPPQuantity(e.target.value)}
//                       label="Price Per Quantity"
//                       variant="standard"
//                       fullWidth
//                     /> */}
//                     <TextField
//                       label="Price Per Quantity "
//                       type="number"
//                       value={taskAmountx}
//                       onChange={(e) => setAmount(e.target.value)}
//                     />
//                   </div>
//                 </div>
//               </Container>
//             </MDBox>
//             <MDBox>
//               <Container>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
//                       Branch
//                     </MDTypography>
//                     <MDBox textAlign="right">
//                       <Form.Select
//                         value={branx || ""}
//                         aria-label="Default select example"
//                         onChange={setBranx}
//                       >
//                         <option>--Select Branch--</option>
//                         {branId.map((apis) => (
//                           <option key={apis.id} value={apis.id}>
//                             {apis.name}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     </MDBox>
//                   </div>
//                 </div>
//               </Container>
//             </MDBox>
//             <MDBox mt={4} mb={1}>
//               <MDButton
//                 variant="gradient"
//                 onClick={handleClick}
//                 color="info"
//                 width="50%"
//                 align="left"
//               >
//                 Save
//               </MDButton>
//             </MDBox>
//           </MDBox>
//         </MDBox>
//       </Card>
//     </DashboardLayout>
//   );
// }
// export default Sales;
