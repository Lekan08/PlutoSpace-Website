/*
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import { Container } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
// import plutospaceImg from "assets/images/PlutoSpaceImg.png";
// import Plutospace from "assets/images/Plutospace.png";
import Styles from "styles";

function ValidateEmail() {
  const navigate = useNavigate();

  //   const [usernamex, setUsername] = useState("");
  //   const [passwordx, setPassword] = useState("");
  const [opened, setOpened] = useState(false);

  //   const MySwal = withReactContent(Swal);

  //   const [oEmail, setOEmail] = useState("");
  const [pEmail, setPEmail] = useState("");
  const [checkedPemail, setCheckedPEmail] = useState("");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //   const getPersonalInformation = () => {
  //     // const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
  //     // const emailpersonal = e.target.value;
  //     // if (emailpersonal.length === 0 || !emailpersonal.match(letters)) {
  //     //   // Email Invalid
  //     // } else {
  //     const raw = JSON.stringify({
  //       username: "emailpersonal",
  //     });
  //     const requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };
  //     fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/getByEmail`, requestOptions)
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
  //         console.log(result);
  //         if (Object.keys(result).length !== 0) {
  //           if (result.id !== 0) {
  //             console.log(result);
  //             setOfficialEmail("result");
  //           } else {
  //             setShow(false);
  //           }
  //         } else {
  //           setShow(false);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     // }
  //   };

  //   useEffect(() => {
  //     let isMounted = true;
  //     if (isMounted) {
  //       localStorage.removeItem("rexxdex");
  //       localStorage.removeItem("user1");
  //     }
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);

  //   const resultt = JSON.parse(localStorage.gf
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const getOfficialEmail = urlParams.get("email");

  //   const handleClick = () => {
  //     setOpened(true);
  //     // const myHeaders = new Headers();
  //     // myHeaders.append("Content-Type", "application/json");

  //     const raw2 = JSON.stringify({
  //       orgID: result.data.id,
  //       empID: user.id,
  //       username: user.email,
  //       password: passwordx,
  //     });
  //     const requestOptions2 = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw2,
  //       redirect: "follow",
  //     };
  //     fetch(`${process.env.REACT_APP_ZAVE_URL}/login/add`, requestOptions2)
  //       .then((res) => res.json())
  //       .then((resultLog) => {
  //         console.log(`STATUS - ${resultLog.status} - - - - - - MESSAGE - ${resultLog.message}`);
  //         const raw4 = JSON.stringify({
  //           orgID: result.data.id,
  //           paidAmount: configPrice,
  //           bonusAmount: 0,
  //           totalAmount: configPrice,
  //         });
  //         const requestOptions4 = {
  //           method: "POST",
  //           headers: myHeaders,
  //           body: raw4,
  //           redirect: "follow",
  //         };
  //         fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/paymentHistory/add`, requestOptions4)
  //           .then((res) => res.json())
  //           .then((resultPH) => {
  //             console.log(`STATUS - ${resultPH.status} - - - - - - MESSAGE - ${resultPH.message}`);
  //             setOpened(false);
  //             MySwal.fire({
  //               title: result.status,
  //               type: "success",
  //               text: result.message,
  //             })
  //               .then(() => {
  //                 navigate(`/Create-Branch?orgID=${result.data.id}`, { replace: true });
  //               })
  //               .catch((error) => {
  //                 setOpened(false);
  //                 MySwal.fire({
  //                   title: error.status,
  //                   type: "error",
  //                   text: error.message,
  //                 });
  //               });
  //           });
  //       });
  //   };

  const getAllParams = urlParams;
  console.log(getAllParams);

  const checkPersonal = () => {
    setOpened(true);
    localStorage.setItem("PEmail", JSON.stringify(pEmail));
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    const fName = urlParams.get("fname");
    const lName = urlParams.get("lname");
    const emailpersonal = urlParams.get("email");
    const role = urlParams.get("role");
    const orgID = urlParams.get("orgID");
    // const rolex = urlParams.get("role");
    // const orgIDD = urlParams.get("orgID");
    if (emailpersonal.length !== 0) {
      const rawp = JSON.stringify({
        username: emailpersonal,
      });
      const requestOptionsp = {
        method: "POST",
        headers: myHeaders,
        body: rawp,
        redirect: "follow",
      };
      console.log(emailpersonal.length);
      fetch(`${process.env.REACT_APP_ZAVE_URL}/personal/getByEmail`, requestOptionsp)
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
          console.log(result);
          //   const getAllParams = urlParams;
          console.log(getAllParams);
          if (Object.keys(result).length !== 0) {
            localStorage.setItem("personalInfo", JSON.stringify(result));
            navigate(
              `/authentication/inviteUser?fname=${fName}&lname=${lName}&email=${emailpersonal}&role=${role}&orgID=${orgID}`,
              { replace: true }
            );
          } else {
            navigate(
              `/authentication/inviteUser?fname=${fName}&lname=${lName}&email=${emailpersonal}&role=${role}&orgID=${orgID}`,
              { replace: true }
            );
            // Do nothing
          }
        })
        .catch((error) => {
          setOpened(false);
          console.log(error);
        });
    }
  };

  const handleOnPEmailKeys = (value) => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    if (!value.match(letters)) {
      setCheckedPEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email - input a valid email<br>";
    }
    if (value.match(letters)) {
      setCheckedPEmail(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email is required<br>";
    }
  };

  const handleValidate = (e) => {
    // handleOnFirstKeys(fnamex);
    // handleOnLastKeys(lnamex);
    // handleOnOtherKeys(onamex);
    // handleOnPEmailKeys(emailx);
    // handleOnOEmailKeys(emaily);
    // handleOnStreetKeys(residentialStreetx);
    // handleOnCityKeys(residentialCityx);
    // handleOnPasswordKeys(passwordx);
    // handleOnRTPasswordKeys(retypePasswordx);
    handleOnPEmailKeys(pEmail);
    if (checkedPemail === true) {
      checkPersonal(e);
    }
  };

  return (
    <div>
      <BasicLayout image={bgImage}>
        <Card>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox
              variant="gradient"
              // bgColor="info"
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
                Password
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
              <MDTypography variant="gradient" fontSize="60%" color="error" id="email">
                {" "}
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-12">
                        <MDInput
                          type="email"
                          value={getOfficialEmail || ""}
                          //   onChange={(e) => setOEmail(e.target.value)}
                          label="Official Email"
                          fullWidth
                          disabled
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-12">
                        <MDInput
                          type="email"
                          value={pEmail || ""}
                          onChange={(e) => setPEmail(e.target.value)}
                          label="Personal Email"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <MDButton
                  variant="gradient"
                  onClick={handleValidate}
                  style={Styles.buttonSx}
                  fullWidth
                >
                  Next
                </MDButton>
                {/* <MDBox mb={1} mt={-1} textAlign="center">
                
              </MDBox> */}
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
          <CircularProgress color="info" />
        </Backdrop>
      </BasicLayout>
    </div>
  );
}

export default ValidateEmail;
