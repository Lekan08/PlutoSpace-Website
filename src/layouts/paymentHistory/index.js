/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import { Container, Dropdown } from "react-bootstrap";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Styles from "styles";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import IHeaders from "imgHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { MonnifyConsumer } from "react-monnify";

function PaymentHis() {
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

  const [items, setItems] = useState([]);
  const [auditSDate, setAuditSDate] = useState("");
  const [auditEDate, setAuditEDate] = useState("");
  const [concaBalance, setConcaBalance] = useState("");

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const { allIHeaders: iiHeaders } = IHeaders();

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };
  const bonusStatus = "1";

  useEffect(() => {
    setOpened(true);

    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/gets/${orgIDs}`, {
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
          console.log(resultapi);
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

  useEffect(() => {
    setOpened(true);

    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/paymentHistory/getBalance/${orgIDs}`, {
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
          let comBalance = 0;
          if (resultapi.length === 0) {
            comBalance = 0;
          } else {
            comBalance = resultapi.balance;
          }

          let parts = 0;
          if (comBalance > 0) {
            parts = comBalance.toString().split(".");
          }
          const numberPart = parts[0];
          const decimalPart = parts[1];
          const thousands = /\B(?=(\d{3})+(?!\d))/g;
          let value = 0;
          if (comBalance > 0) {
            value = numberPart.replace(thousands, ",") + (decimalPart ? `.${decimalPart}` : "");
          }
          setConcaBalance(`NGN ${value}`);
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
          if (resultapi.message === "Your Organization Has Not Made Any Payment") {
            setBonusCheck([]);
          } else {
            setBonusCheck(resultapi);
          }
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

  // const honComplete = (response) => {
  //   setReferenceSKey(`${Math.floor(Math.random() * 1000000000 + 1)}`);

  //   console.log(response); // card charged successfully, get reference here
  //   if (response.paymentStatus === "PAID" && response.status === "SUCCESS") {
  //     setOpened(true);
  //     const data11 = JSON.parse(localStorage.getItem("user1"));
  //     //   bonusAmount: 10
  //     //   createdTime: 1649875827073
  //     //   deleteFlag: 0
  //     //   endTime: 1651104000000
  //     //   id: "62571b73813e040d304c13fd"
  //     //   maxTrigger: 6000
  //     //   minTrigger: 2000
  //     //   name: "Test Freebie"
  //     //   startTime: 1649894400000
  //     //   status: 0
  //     let allPayandBonus = 0;
  //     let mBonusAmount = 0;
  //     // eslint-disable-next-line radix
  //     const amountCOn = parseInt(amountx);
  //     // eslint-disable-next-line array-callback-return
  //     bonusCheck.map((checkBonus) => {
  //       if (checkBonus.minTrigger <= amountCOn && checkBonus.maxTrigger >= amountCOn) {
  //         mBonusAmount = checkBonus.bonusAmount;
  //         allPayandBonus = checkBonus.bonusAmount + amountCOn;
  //       } else if (checkBonus.minTrigger === 0 && checkBonus.maxTrigger >= amountCOn) {
  //         mBonusAmount = checkBonus.bonusAmount;
  //         allPayandBonus = checkBonus.bonusAmount + amountCOn;
  //       } else if (checkBonus.minTrigger <= amountCOn && checkBonus.maxTrigger === 0) {
  //         mBonusAmount = checkBonus.bonusAmount;
  //         allPayandBonus = checkBonus.bonusAmount + amountCOn;
  //       } else {
  //         mBonusAmount = 0;
  //         allPayandBonus = amountCOn;
  //       }
  //       // check = false;
  //     });
  //     const orgIDs = data11.orgID;
  //     const raw = JSON.stringify({
  //       orgID: orgIDs,
  //       paidAmount: amountCOn,
  //       bonusAmount: mBonusAmount,
  //       totalAmount: allPayandBonus,
  //     });
  //     const requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };
  //     console.log(raw);
  //     fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/paymentHistory/add`, requestOptions)
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         return res.json();
  //       })
  //       .then((result) => {
  //         if (result.message === "Expired Access") {
  //           navigate("/authentication/sign-in");
  //         }
  //         if (result.message === "Token Does Not Exist") {
  //           navigate("/authentication/sign-in");
  //         }
  //         if (result.message === "Unauthorized Access") {
  //           navigate("/authentication/forbiddenPage");
  //         }
  //         setOpened(false);
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
  //   }
  // };

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
    const letters = /^[-+]?[0-9]+.[0-9]+$/;
    if (!amountx.match(letters)) {
      setCheckedCity(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "Amount - input a valid Amount<br>";
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
    console.log(response);
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

        const data11 = JSON.parse(localStorage.getItem("user1"));
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
  console.log(`${process.env.REACT_APP_PERSONAL_API_KEY}`);
  console.log(`${process.env.REACT_APP_PERSONAL_CONTRACT_KEY}`);
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

  const handleClick = () => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;

    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const curDay = new Date().getTime();

    const auditConSDate = new Date(auditSDate).getTime();
    const auditConEDate = new Date(auditEDate).getTime();
    let nStartTime = firstDay;
    let nEndTime = curDay;
    if (auditSDate === "") {
      nStartTime = firstDay;
    } else {
      nStartTime = auditConSDate;
    }
    if (auditEDate === "") {
      nEndTime = curDay;
    } else {
      nEndTime = auditConEDate;
    }
    const raw = JSON.stringify({
      orgID: orgIDs,
      startDate: nStartTime,
      endDate: nEndTime,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/paymentHistory/getFilter`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
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
        setItems(result);
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      //   fetches the table data
      handleClick();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleGenReceipt = (filteredData, value) => {
    const headers = miHeaders;
    let receiptNumber = "";
    // Avoid filter for empty string
    if (!value) {
      receiptNumber = "";
    } else {
      const filteredItems = filteredData.filter((item) => item.id === value);

      receiptNumber = filteredItems[0].receiptNo;
    }
    console.log(filteredData);
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const paymentHisValue = value;
    const raw = JSON.stringify({
      orgID: orgIDs,
      receiptNo: receiptNumber,
      paymentHistoryID: paymentHisValue,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/paymentReceipt/generate`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resx) => {
        if (resx.status === "SUCCESS") {
          if (resx.message === "Expired Access") {
            navigate("/authentication/sign-in");
          }
          if (resx.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
          }
          if (resx.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
          }
          console.log(resx);
          fetch(
            `${process.env.REACT_APP_EKOATLANTIC_URL}/media/getByKey/${orgIDs}/${resx.data.receiptNo}`,
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
            .then((resxx) => {
              if (resxx.message === "Expired Access") {
                navigate("/authentication/sign-in");
              }
              if (resxx.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
              }
              if (resxx.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
              }

              const raw1 = JSON.stringify({
                name: resxx.name,
              });
              console.log(raw1);
              const requestOptions1 = {
                method: "POST",
                headers: iiHeaders,
                body: raw1,
                redirect: "follow",
              };

              fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/download`, requestOptions1)
                .then((res) => res.blob())
                .then((resx1) => {
                  const objectURL = URL.createObjectURL(resx1);
                  console.log(objectURL);

                  // (C2) TO "FORCE DOWNLOAD"
                  const anchor = document.createElement("a");
                  anchor.href = objectURL;
                  anchor.download = resxx.name;
                  anchor.click();

                  // (C3) CLEAN UP
                  window.URL.revokeObjectURL(objectURL);

                  MySwal.fire({
                    title: "SUCCESS",
                    type: "success",
                    text: "Download Successful",
                  });
                })
                .catch((error) => {
                  MySwal.fire({
                    title: error.status,
                    type: "error",
                    text: error.message,
                  });
                });
            });
        }
      })
      .catch((error) => {
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  const pColumns = [
    { Header: "Organization", accessor: "orgName", align: "left" },
    { Header: "Paid Amount", accessor: "paidAmount", align: "left" },
    { Header: "Bonus Amount", accessor: "bonusAmount", align: "left" },
    { Header: "Total Amount", accessor: "totalAmount", align: "left" },
    { Header: "Balance", accessor: "balance", align: "left" },
    {
      Header: "Last Updated",
      accessor: "lastUpdatedTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "Date Created",
      accessor: "createdTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "actions",
      accessor: "id",
      Cell: ({ cell: { value } }) => (
        <div
          style={{
            width: "100%",
            backgroundColor: "#dadada",
            borderRadius: "2px",
          }}
        >
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <Icon sx={{ fontWeight: "light" }}>settings</Icon>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleGenReceipt(items, value)}>
                Generate Receipt
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
      align: "center",
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container>
        <div className="row">
          <div className="col-sm-5">
            <Card>
              <MDBox
                variant="gradient"
                // bgColor="info"
                style={Styles.boxSx}
                borderRadius="lg"
                coloredShadow="success"
                mt={2}
                mx={0}
                p={1}
                textAlign="left"
              >
                <MDTypography
                  variant="h4"
                  fontWeight="medium"
                  color="white"
                  textAlign="center"
                  mt={1}
                >
                  Balance
                </MDTypography>
              </MDBox>
              <MDBox
                variant="gradient"
                bgColor="white"
                borderRadius="lg"
                coloredShadow="success"
                mx={3}
                mt={2}
                p={6}
                mb={1}
                textAlign="left"
              >
                <MDTypography variant="h1" fontWeight="medium" color="info" textAlign="center">
                  {concaBalance}
                </MDTypography>
              </MDBox>
            </Card>
          </div>
          <div className="col-sm-7">
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
                            label="Name (name on receipt) *"
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
                  <MDBox mt={4} mb={1}>
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
        &nbsp;
        <Card>
          <MDBox pt={4} pb={3} px={30}>
            <MDBox
              variant="gradient"
              // bgColor="info"
              style={Styles.boxSx}
              borderRadius="lg"
              coloredShadow="success"
              mx={1}
              mt={2}
              p={2}
              mb={1}
              textAlign="left"
            >
              <MDTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                textAlign="center"
                mt={1}
              >
                Payment History
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
            </MDBox>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <Container>
                  <div align="center">
                    {" "}
                    <div className="row">
                      <div className="col-sm-6">
                        <MDBox mt={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="regular"
                            fontSize="80%"
                            align="left"
                            color="text"
                          >
                            Start Date
                          </MDTypography>
                          <DatePicker
                            placeholderText="MM/DD/YY"
                            style={{ marginRight: "10px" }}
                            selected={auditSDate}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            onChange={(time) => setAuditSDate(time)}
                          />{" "}
                        </MDBox>{" "}
                      </div>
                      <div className="col-sm-6">
                        <MDBox mt={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="regular"
                            fontSize="80%"
                            align="left"
                            color="text"
                          >
                            End Date
                          </MDTypography>
                          <DatePicker
                            placeholderText="MM/DD/YY"
                            style={{ marginRight: "10px" }}
                            selected={auditEDate}
                            onChange={(time) => setAuditEDate(time)}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                          />{" "}
                        </MDBox>
                      </div>
                    </div>
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        onClick={handleClick}
                        // color="info"
                        style={Styles.buttonSx}
                        width="50%"
                        align="center"
                      >
                        Add Filters
                      </MDButton>
                    </MDBox>
                  </div>
                </Container>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
        &nbsp;
        <MDBox>
          <DataTable
            table={{ columns: pColumns, rows: items }}
            isSorted
            entriesPerPage
            showTotalEntries
            noEndBorder
            canSearch
          />
        </MDBox>
      </Container>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default PaymentHis;
