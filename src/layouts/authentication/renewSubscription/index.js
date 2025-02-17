/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.gif";
import Footer from "examples/Footer";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { MonnifyConsumer } from "react-monnify";
import Styles from "styles";

function RenewSub() {
  const MySwal = withReactContent(Swal);

  const [namex, setName] = useState("");
  const [emailx, setEmail] = useState("");
  const [descripx, setDescripx] = useState("");
  const [currencyx, setCurrency] = useState("NGN");
  const [amountx, setAmountx] = useState(0);
  const [pnox, setPno] = useState("");
  const [bonusCheck, setBonusCheck] = useState([]);
  const [referenceSKey, setReferenceSKey] = useState();
  const [bonusSetID, setBonusSetID] = useState([]);

  const [checkedEmail, setCheckedEmail] = useState("");
  const [checkedName, setCheckedName] = useState("");
  const [checkedCity, setCheckedCity] = useState("");
  const [enabled, setEnabled] = useState("");

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const bonusStatus = "1";

  useEffect(() => {
    setReferenceSKey(`${Math.floor(Math.random() * 1000000000 + 1)}`);

    setOpened(true);
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/bonusSetting/getByStatus/${bonusStatus}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultapi) => {
        setOpened(false);
        if (resultapi.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultapi.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultapi.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          setBonusCheck(resultapi);
        }
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
    return () => {
      isMounted = false;
    };
  }, []);

  //   const honComplete = (response) => {
  //     setReferenceSKey(`${Math.floor(Math.random() * 1000000000 + 1)}`);

  //     console.log(response); // card charged successfully, get reference here
  //     if (response.paymentStatus === "PAID" && response.status === "SUCCESS") {
  //       setOpened(true);
  //       const data11 = JSON.parse(localStorage.getItem("user1"));
  //       //   bonusAmount: 10
  //       //   createdTime: 1649875827073
  //       //   deleteFlag: 0
  //       //   endTime: 1651104000000
  //       //   id: "62571b73813e040d304c13fd"
  //       //   maxTrigger: 6000
  //       //   minTrigger: 2000
  //       //   name: "Test Freebie"
  //       //   startTime: 1649894400000
  //       //   status: 0
  //       let allPayandBonus = 0;
  //       let mBonusAmount = 0;
  //       // eslint-disable-next-line radix
  //       const amountCOn = parseInt(amountx);
  //       // eslint-disable-next-line array-callback-return
  //       bonusCheck.map((checkBonus) => {
  //         if (checkBonus.minTrigger <= amountCOn && checkBonus.maxTrigger >= amountCOn) {
  //           mBonusAmount = checkBonus.bonusAmount;
  //           allPayandBonus = checkBonus.bonusAmount + amountCOn;
  //         } else if (checkBonus.minTrigger === 0 && checkBonus.maxTrigger >= amountCOn) {
  //           mBonusAmount = checkBonus.bonusAmount;
  //           allPayandBonus = checkBonus.bonusAmount + amountCOn;
  //         } else if (checkBonus.minTrigger <= amountCOn && checkBonus.maxTrigger === 0) {
  //           mBonusAmount = checkBonus.bonusAmount;
  //           allPayandBonus = checkBonus.bonusAmount + amountCOn;
  //         } else {
  //           mBonusAmount = 0;
  //           allPayandBonus = amountCOn;
  //         }
  //         // check = false;
  //       });
  //       const orgIDs = data11.orgID;
  //       const raw = JSON.stringify({
  //         orgID: orgIDs,
  //         paidAmount: amountCOn,
  //         bonusAmount: mBonusAmount,
  //         totalAmount: allPayandBonus,
  //       });
  //       const requestOptions = {
  //         method: "POST",
  //         headers: myHeaders,
  //         body: raw,
  //         redirect: "follow",
  //       };
  //       console.log(raw);
  //       fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/paymentHistory/add`, requestOptions)
  //         .then(async (res) => {
  //           const aToken = res.headers.get("token-1");
  //           localStorage.setItem("rexxdex", aToken);
  //           return res.json();
  //         })
  //         .then((result) => {
  //           if (result.message === "Expired Access") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (result.message === "Token Does Not Exist") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (result.message === "Unauthorized Access") {
  //             navigate("/authentication/forbiddenPage");
  //           }
  //           setOpened(false);
  //           MySwal.fire({
  //             title: result.status,
  //             type: "success",
  //             text: result.message,
  //           }).then(() => {
  //             window.location.reload();
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

  const handleOnNameKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!namex.match(letters)) {
      setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
    }
    if (namex.match(letters)) {
      setCheckedName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (namex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name is required<br>";
    }
    setEnabled(checkedEmail === true && checkedName === true && checkedCity === true);
  };

  const handleOnEmailKeys = () => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    if (!emailx.match(letters)) {
      setCheckedEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email - input a valid email<br>";
    }
    if (emailx.match(letters)) {
      setCheckedEmail(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (emailx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email is required<br>";
    }
    setEnabled(checkedEmail === true && checkedName === true && checkedCity === true);
  };

  const handleOnCityKeys = () => {
    const letters = /^[0-9]+$/;
    if (!amountx.match(letters)) {
      setCheckedCity(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "Amount - input only numbers<br>";
    }
    if (amountx.match(letters)) {
      setCheckedCity(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "";
    }
    if (amountx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "Amount is required<br>";
    }
    setEnabled(checkedEmail === true && checkedName === true && checkedCity === true);
  };

  const honClose = (response) => {
    handleOnNameKeys();
    handleOnEmailKeys();
    handleOnCityKeys();
    if (enabled) {
      setReferenceSKey(`${Math.floor(Math.random() * 1000000000 + 1)}`);

      if (response.message === "Transaction Successful" && response.status === "SUCCESS") {
        setOpened(true);

        let allPayandBonus = 0;
        let mBonusAmount = 0;
        // eslint-disable-next-line radix
        const amountCOn = parseInt(amountx);
        if (bonusCheck.length === 0) {
          mBonusAmount = 0;
          allPayandBonus = amountCOn;
        } else {
          // eslint-disable-next-line array-callback-return
          bonusCheck.map((checkBonus) => {
            if (checkBonus.minTrigger <= amountCOn && checkBonus.maxTrigger >= amountCOn) {
              mBonusAmount = checkBonus.bonusAmount;
              setBonusSetID(checkBonus.id);
              allPayandBonus = checkBonus.bonusAmount + amountCOn;
            } else if (checkBonus.minTrigger === 0 && checkBonus.maxTrigger >= amountCOn) {
              mBonusAmount = checkBonus.bonusAmount;
              setBonusSetID(checkBonus.id);
              allPayandBonus = checkBonus.bonusAmount + amountCOn;
            } else if (checkBonus.minTrigger <= amountCOn && checkBonus.maxTrigger === 0) {
              mBonusAmount = checkBonus.bonusAmount;
              setBonusSetID(checkBonus.id);
              allPayandBonus = checkBonus.bonusAmount + amountCOn;
            } else {
              mBonusAmount = 0;
              allPayandBonus = amountCOn;
            }
            // check = false;
          });
        }

        const data11 = JSON.parse(localStorage.getItem("renewUser1"));
        const orgIDs = data11.orgID;
        const raw = JSON.stringify({
          orgID: orgIDs,
          paidAmount: amountCOn,
          bonusAmount: mBonusAmount,
          totalAmount: allPayandBonus,
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/paymentHistory/add`, requestOptions)
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((result) => {
            if (result.message === "Expired Access") {
              navigate("/authentication/sign-in");
            }
            if (result.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
            }
            if (result.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            }
            setOpened(false);

            const raw1 = JSON.stringify({
              orgID: orgIDs,
              bonusSettingID: bonusSetID,
            });
            const requestOptions1 = {
              method: "POST",
              headers: myHeaders,
              body: raw1,
              redirect: "follow",
            };
            if (mBonusAmount !== 0) {
              fetch(
                `${process.env.REACT_APP_EKOATLANTIC_URL}/bonusHistory/add`,
                requestOptions1
              ).then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                return res.json();
              });
            }
            MySwal.fire({
              title: result.status,
              type: "success",
              text: result.message,
            }).then(() => {
              // localStorage.clear();
              navigate("/authentication/sign-in", { replace: true });
              window.location.reload();
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
    }
  };

  // const personalApiKey = "MK_TEST_JB2L9T7HMG";
  // const personalConCode = "6428086775";

  const monNey = {
    onClose: honClose,
    amount: amountx,
    currency: currencyx,
    reference: referenceSKey,
    customerFullName: namex,
    customerEmail: emailx,
    customerMobileNumber: pnox,
    apiKey: `${process.env.REACT_APP_PERSONAL_API_KEY}`,
    contractCode: `${process.env.REACT_APP_PERSONAL_CONTRACT_KEY}`,
    paymentDescription: descripx,
    isTestMode: true,
  };

  return (
    <BasicLayout image={bgImage}>
      <Container>
        <div className="row">
          <div className="col-sm-12">
            <Card>
              <MDBox pt={4} pb={3} px={2}>
                <MDBox
                  variant="gradient"
                  // bgColor="info"
                  borderRadius="lg"
                  style={Styles.boxSx}
                  // coloredShadow="info"
                  mx={2}
                  mt={-3}
                  p={2}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                    Make Payment
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
                  <MDTypography variant="gradient" fontSize="60%" color="error" id="email">
                    {" "}
                  </MDTypography>
                  <MDTypography variant="gradient" fontSize="60%" color="error" id="phone">
                    {" "}
                  </MDTypography>
                  <MDTypography variant="gradient" fontSize="60%" color="error" id="street">
                    {" "}
                  </MDTypography>
                  <MDTypography variant="gradient" fontSize="60%" color="error" id="city">
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
                            label="Name(name on receipt) *"
                            value={namex || ""}
                            onKeyUp={handleOnNameKeys}
                            onChange={(e) => setName(e.target.value)}
                            variant="standard"
                            fullWidth
                          />
                        </div>
                        <div className="col-sm-6">
                          <MDInput
                            type="text"
                            value={emailx || ""}
                            onKeyUp={handleOnEmailKeys}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email *"
                            variant="standard"
                            fullWidth
                          />
                        </div>
                      </div>
                    </Container>
                  </MDBox>
                  <MDBox mb={2}>
                    <Container>
                      <div className="row">
                        <div className="col-sm-3">
                          <MDInput
                            type="text"
                            value={currencyx || ""}
                            onChange={(e) => setCurrency(e.target.value)}
                            label="Currency *"
                            disabled
                            variant="standard"
                            fullWidth
                          />
                        </div>
                        <div className="col-sm-9">
                          <MDInput
                            type="text"
                            value={amountx || ""}
                            onKeyUp={handleOnCityKeys}
                            onChange={(e) => setAmountx(e.target.value)}
                            label="Amount *"
                            variant="standard"
                            fullWidth
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-8">
                          <MDInput
                            type="text"
                            value={descripx || ""}
                            onKeyUp={handleOnCityKeys}
                            onChange={(e) => setDescripx(e.target.value)}
                            label="Description *"
                            variant="standard"
                            fullWidth
                          />
                        </div>
                      </div>
                    </Container>
                  </MDBox>
                  <MDBox mb={2}>
                    <Container>
                      <div className="row">
                        <div className="col-sm-8">
                          <MDTypography variant="button" fontWeight="regular" color="text">
                            Phone Number *
                          </MDTypography>
                          <PhoneInput
                            value={pnox}
                            inputStyle={{ width: "100%" }}
                            buttonStyle={{}}
                            onChange={setPno}
                          />
                        </div>
                      </div>
                    </Container>
                  </MDBox>
                  <MDBox mt={4} mb={1} ml={3}>
                    <div>
                      <MonnifyConsumer {...monNey} className="btn">
                        {({ initializePayment }) => (
                          // eslint-disable-next-line react/button-has-type
                          <MDButton
                            variant="gradient"
                            onClick={() => initializePayment()}
                            // color="info"
                            style={Styles.buttonSx}
                            width="50%"
                          >
                            Pay
                          </MDButton>
                        )}
                      </MonnifyConsumer>
                    </div>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </div>
        </div>
      </Container>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </BasicLayout>
  );
}

export default RenewSub;
