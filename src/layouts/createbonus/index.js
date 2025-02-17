// import React, { useState } from "react";
// import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
// import DataTable from "examples/Tables/DataTable";
// import createbonusData from "layouts/createbonus/data/createBonus";
// import MDButton from "components/MDButton";
// import Card from "@mui/material/Card";
// import { Container, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import MDTypography from "components/MDTypography";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";

// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import PHeaders from "postHeader";
// import { useNavigate } from "react-router-dom";

// function createbonus() {
//   const MySwal = withReactContent(Swal);
//   const { columns: pColumns, rows: pRows } = createbonusData();

//   const [namex, setName] = useState("");
//   const [amountx, setAmount] = useState("");
//   const [currencyx, setCurrency] = useState("");
//   const [setupTypex, setSetupTypex] = useState("");
//   const [frequencyx, setFrequencyx] = useState("");

//   const [enabled, setEnabled] = useState("");
//   const [checkedName, setCheckedName] = useState("");

//   const [opened, setOpened] = useState(false);
//   const navigate = useNavigate();

//   const { allPHeaders: myHeaders } = PHeaders();

//   // eslint-disable-next-line consistent-return
//   const handleOnNameKeys = () => {
//     const letters = /^[a-zA-Z ]+$/;
//     if (!namex.match(letters)) {
//       setCheckedName(false);
//       // eslint-disable-next-line no-unused-expressions
//       document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
//     }
//     if (namex.match(letters)) {
//       setCheckedName(true);
//       // eslint-disable-next-line no-unused-expressions
//       document.getElementById("name").innerHTML = "";
//     }
//     if (namex.length === 0) {
//       // eslint-disable-next-line no-unused-expressions
//       document.getElementById("name").innerHTML = "Name is required<br>";
//     }
//     setEnabled(checkedName === true);
//   };

//   // eslint-disable-next-line consistent-return
//   const handleClick = (e) => {
//     setOpened(true);
//     e.preventDefault();
//     const data11 = JSON.parse(localStorage.getItem("user1"));

//     // const changeType = (setupType) => {
//     //   if (setupType === 1) {
//     //     return "Bonus";
//     //   } else if (setupType === 2) {
//     //     return "Deduction";
//     //   }
//     // };

//     const orgIDs = data11.orgID;
//     const personalids = data11.personalID;
//     const raw = JSON.stringify({
//       orgID: orgIDs,
//       name: namex,
//       empID: personalids,
//       setupType: setupTypex,
//       amount: amountx,
//       currency: currencyx,
//       frequency: frequencyx,
//     });
//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };

//     if (setupTypex === 1) {
//       return "Bonus";
//     }
//     if (setupTypex === 2) {
//       return "Deduction";
//     }

//     if (frequencyx === 1) {
//       return "One-Time";
//     }
//     if (frequencyx === 2) {
//       return "Always";
//     }

//     fetch(`${process.env.REACT_APP_TANTA_URL}/remunerationpackagesetup/add`, requestOptions)
//       .then(async (res) => {
//         const aToken = res.headers.get("token-1");
//         localStorage.setItem("rexxdex", aToken);
//         return res.json();
//       })
//       .then((result) => {
//         setOpened(false);
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

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Card>
//         <MDBox pt={4} pb={3} px={30}>
//           <MDBox
//             variant="gradient"
//             bgColor="info"
//             borderRadius="lg"
//             coloredShadow="info"
//             mx={2}
//             mt={-3}
//             p={2}
//             mb={1}
//             textAlign="center"
//           >
//             <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
//               BONUS/DEDUCTION
//             </MDTypography>
//           </MDBox>
//           <MDBox
//             variant="gradient"
//             sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//             borderRadius="lg"
//             coloredShadow="success"
//             mx={3}
//             mt={1}
//             p={1}
//             mb={1}
//             textAlign="center"
//           >
//             <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
//               {" "}
//             </MDTypography>
//           </MDBox>
//           <MDBox component="form" role="form">
//             <MDBox mb={4}>
//               <Container>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <MDInput
//                       type="text"
//                       label="Name *"
//                       value={namex || ""}
//                       onKeyUp={handleOnNameKeys}
//                       className="form-control"
//                       onChange={(e) => setName(e.target.value)}
//                       variant="standard"
//                       fullWidth
//                     />
//                   </div>
//                   <div className="col-sm-6">
//                     <MDInput
//                       type="text"
//                       value={amountx || ""}
//                       onChange={(e) => setAmount(e.target.value)}
//                       label="Amount"
//                       variant="standard"
//                       fullWidth
//                     />
//                     <div className="col-sm-6">
//                       <MDInput
//                         type="text"
//                         value={currencyx || ""}
//                         onChange={(e) => setCurrency(e.target.value)}
//                         label="Currency"
//                         variant="standard"
//                         fullWidth
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </Container>
//               <Container>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <Form.Select
//                       onChange={(e) => setSetupTypex(e.target.value)}
//                       value={setupTypex || ""}
//                       aria-label="Default select example"
//                     >
//                       <option value="1">Bonus</option>
//                       <option value="2">Deduction</option>
//                     </Form.Select>
//                   </div>

//                   <div className="col-sm-6">
//                     <Form.Select
//                       onChange={(e) => setFrequencyx(e.target.value)}
//                       value={frequencyx || ""}
//                       aria-label="Default select example"
//                     >
//                       <option>---frequency---</option>
//                       <option value="1">One-Time</option>
//                       <option value="2">Always</option>
//                     </Form.Select>
//                   </div>
//                 </div>
//               </Container>
//             </MDBox>
//             <MDBox mt={4} mb={1}>
//               <MDButton
//                 variant="gradient"
//                 onClick={handleClick}
//                 disabled={!enabled}
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
//       <MDBox pt={3}>
//         <DataTable
//           table={{ columns: pColumns, rows: pRows }}
//           isSorted
//           entriesPerPage
//           showTotalEntries
//           noEndBorder
//           canSearch
//         />
//       </MDBox>
//       <Footer />
//       <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
//         <CircularProgress color="info" />
//       </Backdrop>
//     </DashboardLayout>
//   );
// }

// export default createbonus;
