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
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "react-select";
import Styles from "styles";
import Grid from "@mui/material/Grid";
// import makeAnimated from "react-select/animated";
import { CSVLink } from "react-csv";

function SalaryPayment() {
  const MySwal = withReactContent(Swal);

  // const animatedComponents = makeAnimated();

  const [namex, setName] = useState("");
  const [descripx, setDescrip] = useState("");
  const [namexx, setNamee] = useState("");
  const [descripxx, setDescripp] = useState("");

  const [items, setItems] = useState([]);

  const [sUser, setSUser] = useState([]);
  const [aUser, setAUser] = useState([]);

  const [allUserID, setAllUserID] = useState([]);
  const [usersID, setUsersID] = useState([]);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    const userMap = [];
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
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
          // console.log(result);
          // eslint-disable-next-line array-callback-return
          result.map((item) => {
            const fdy = {
              value: item.personal.id,
              label: `${item.personal.fname} ${item.personal.lname}`,
            };
            // console.log(fdy);
            userMap.push(fdy);
          });
          setAUser(userMap);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // useEffect(() => {
  //   const userMap = [];
  //   setOpened(true);
  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const orgIDs = data11.orgID;

  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_TANTA_URL}/payroll/gets/${orgIDs}`, { headers })
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       setOpened(false);
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
  //         console.log(result);
  //         // eslint-disable-next-line array-callback-return
  //         result.map((item) => {
  //           const fdy = {
  //             value: item.remuneration.id,
  //             label: item.empName,
  //           };
  //           console.log(fdy);
  //           userMap.push(fdy);
  //         });
  //         setSUser(userMap);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // Method to fetch all departments
  // env.environments
  const handleGets = () => {
    setOpened(true);
    const userMap = [];
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    fetch(`${process.env.REACT_APP_TANTA_URL}/payroll/gets/${orgIDs}`, { headers })
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
        console.log(result);
        setOpened(false);
        setItems(result);
        // eslint-disable-next-line array-callback-return
        result.map((item) => {
          const fdy = {
            value: item.remuneration.id,
            label: item.empName,
          };
          // console.log(fdy);
          userMap.push(fdy);
        });
        setSUser(userMap);
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      // fetches the table data
      handleGets();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      ids: allUserID,
      generatedBy: personalIDs,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_TANTA_URL}/payroll/create`, requestOptions)
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
        }
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          if (result.status === "SUCCESS") {
            window.location.reload();
          }
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
  };

  const handleAllCal = (e) => {
    e.preventDefault();

    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;

    fetch(`${process.env.REACT_APP_TANTA_URL}/payroll/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
      })
      .then((resultS) => {
        if (resultS.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (resultS.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (resultS.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
        const userIDsMap = [];
        // eslint-disable-next-line array-callback-return
        resultS.map((item) => {
          const fdy = item.remuneration.id;
          // console.log(fdy);
          userIDsMap.push(fdy);
        });
        // console.log(userIDsMap);

        const raw = JSON.stringify({
          orgID: orgIDs,
          ids: userIDsMap,
          generatedBy: personalIDs,
        });
        console.log(raw);
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        fetch(`${process.env.REACT_APP_TANTA_URL}/payroll/create`, requestOptions)
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
            // console.log(result);
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
            MySwal.fire({
              title: result.status,
              type: "success",
              text: result.message,
            }).then(() => {
              if (result.status === "SUCCESS") {
                window.location.reload();
              }
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
      });
  };

  // Method to handle diable
  const handleTerminate = (value) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const personalIDs = data11.personalID;
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f96d02",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Terminate it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setOpened(true);
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(
          `${process.env.REACT_APP_TANTA_URL}/payroll/terminate/${personalIDs}/${value}`,
          requestOptions
        )
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            const resultres = await res.text();
            if (resultres === null || resultres === undefined || resultres === "") {
              return {};
            }
            return JSON.parse(resultres);
          })
          .then((resx) => {
            if (resx.message === "Expired Access") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            }
            setOpened(false);
            MySwal.fire({
              title: resx.status,
              type: "success",
              text: resx.message,
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
    });
  };

  // Method to change type
  const changeType = (status) => {
    if (status === 1) {
      return "Initiated";
      // eslint-disable-next-line no-else-return
    } else if (status === 2) {
      return "Paid";
    } else if (status === 3) {
      return "Payment Error";
    } else if (status === 4) {
      return "Terminated";
    } else {
      return "Created";
    }
  };

  // Method to change date from timestamp
  const changeDateandTime = (timestamp) => {
    if (timestamp === 0) {
      return "No Date";
      // eslint-disable-next-line no-else-return
    } else {
      const date = new Date(timestamp);
      const retDate = date.toDateString();
      let hour = "0";
      let minutes = "0";
      let seconds = "0";

      if (date.getHours() < 10) {
        hour += date.getHours();
      } else {
        hour = date.getHours();
      }

      if (date.getMinutes() < 10) {
        minutes += date.getMinutes();
      } else {
        minutes = date.getMinutes();
      }

      if (date.getSeconds() < 10) {
        seconds += date.getSeconds();
      } else {
        seconds = date.getSeconds();
      }
      return `${retDate} ${hour}:${minutes}:${seconds}`;
    }
  };

  // Code for CSV Export
  const csvHeaders = [
    { label: "Employee's Name", key: "empName" },
    { label: "Amount ", key: "remuneration.amount" },
    { label: "Updated Amount ", key: "payroll.amount" },
    { label: "Currency", key: "payroll.currency" },
    { label: "Account Name", key: "bankAccount.acctName" },
    { label: "Account No.", key: "bankAccount.acctNo" },
    { label: "Bank Name", key: "bankAccount.bank" },
    { label: "Bank Code", key: "bankAccount.bankCode" },
    { label: "Generated By", key: "payroll.generatedByName" },
  ];

  const csvReport = {
    filename: "Salary Payment.csv",
    headers: csvHeaders,
    data: items,
  };
  // Ends here
  const pColumns = [
    { Header: "Employee's Name", accessor: "empName", align: "left" },
    { Header: "Amount (NGN)", accessor: "remuneration.amount", align: "left" },
    { Header: "Updated Amount (NGN)", accessor: "payroll.amount", align: "left" },
    { Header: "Generated By", accessor: "payroll.generatedByName", align: "left" },
    {
      Header: "Payment Status",
      accessor: "payroll.paymentStatus",
      Cell: ({ cell: { value } }) => changeType(value),
      align: "left",
    },
    { Header: "Last Retried By", accessor: "payroll.lastRetryByName", align: "left" },
    { Header: "Retried Times", accessor: "payroll.retryTimes", align: "left" },
    {
      Header: "Last Retried Time",
      accessor: "payroll.lastRetryTime",
      Cell: ({ cell: { value } }) => changeDateandTime(value),
      align: "left",
    },
    { Header: "Terminated By", accessor: "payroll.terminatedByName", align: "left" },
    {
      Header: "Terminated Time",
      accessor: "payroll.terminatedTime",
      Cell: ({ cell: { value } }) => changeDateandTime(value),
      align: "left",
    },
    {
      Header: "actions",
      accessor: "payroll.id",
      // eslint-disable-next-line react/prop-types
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
              <Dropdown.Item onClick={() => handleTerminate(value)}>Terminate</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
      align: "left",
    },
  ];

  const handleOnSelect = (select) => {
    const userIDs = [];
    // eslint-disable-next-line array-callback-return
    select.map((item) => {
      const fdy = item.value;
      // console.log(fdy);
      userIDs.push(fdy);
    });
    setAllUserID(userIDs);
    // console.log(select);
    // console.log(userIDs);
  };

  const handleAllSelect = (select) => {
    const userIDs = [];
    // eslint-disable-next-line array-callback-return
    select.map((item) => {
      const fdy = item.value;
      // console.log(fdy);
      userIDs.push(fdy);
    });
    setUsersID(userIDs);
    // console.log(select);
    // console.log(userIDs);
  };

  const handleInitiatePay = (e) => {
    // const data = [
    //   {
    //     id: 55,
    //     orgID: "62bb21f6266f37394be3a183",
    //     title: null,
    //     empID: 1,
    //     amount: 9.0e7,
    //     currency: "NGN",
    //     paySlipName: null,
    //     createdTime: 1663440991678,
    //     generatedBy: 1,
    //     paymentStatus: 0,
    //     retryTimes: 0,
    //     lastRetryTime: 0,
    //     lastRetryBy: 0,
    //     terminatedTime: 0,
    //     terminatedBy: 0,
    //   },
    // ];
    // const dattta = [
    //   {
    //     id: 55,
    //     orgID: "62bb21f6266f37394be3a183",
    //     title: null,
    //     empID: 1,
    //     amount: 9.0e7,
    //     currency: "NGN",
    //     paySlipName: null,
    //     createdTime: 1663440991678,
    //     generatedBy: 1,
    //     paymentStatus: 0,
    //     retryTimes: 0,
    //     lastRetryTime: 0,
    //     lastRetryBy: 0,
    //     terminatedTime: 1663524580803,
    //     terminatedBy: 1,
    //   },
    // ];

    if (namex === "" && descripx === "") {
      MySwal.fire({
        title: "EMPTY_TEXTFIELDS",
        type: "error",
        text: "Please fill both fields",
      });
    } else {
      setOpened(true);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const personalIDs = data11.personalID;

      const userMap = [];
      // eslint-disable-next-line array-callback-return
      items.map((item) => {
        if (item.payroll !== null) {
          if (item.bankAccount !== null) {
            if (item.payroll.paymentStatus === 0) {
              const fdy = {
                payrollID: item.payroll.id,
                destinationBankCode: item.bankAccount.bankCode,
                destinationAccountNumber: item.bankAccount.acctNo,
              };
              // console.log(fdy);
              userMap.push(fdy);
            }
          }
        }
      });
      // console.log(userMap);

      const raw = JSON.stringify({
        paymentList: userMap,
        orgID: orgIDs,
        title: namex,
        narration: descripx,
        by: personalIDs,
      });
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(
        `${process.env.REACT_APP_TANTA_URL}/payroll/initiateSalaryPayment/${personalIDs}`,
        requestOptions
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
  };

  const handleRetryPayment = (e) => {
    if (namexx === "" && descripxx === "") {
      MySwal.fire({
        title: "EMPTY_TEXTFIELDS",
        type: "error",
        text: "Please fill both fields",
      });
    } else {
      setOpened(true);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const personalIDs = data11.personalID;

      const userMap = [];
      // eslint-disable-next-line array-callback-return
      items.map((item) => {
        // eslint-disable-next-line array-callback-return
        usersID.map((ids) => {
          if (item.payroll !== null) {
            if (item.bankAccount !== null) {
              if (ids === item.payroll.empID) {
                const fdy = {
                  payrollID: item.payroll.id,
                  destinationBankCode: item.bankAccount.bankCode,
                  destinationAccountNumber: item.bankAccount.acctNo,
                };
                // console.log(fdy);
                userMap.push(fdy);
              }
            }
          }
        });
      });
      // console.log(userMap);

      const raw = JSON.stringify({
        paymentList: userMap,
        orgID: orgIDs,
        title: namexx,
        narration: descripxx,
        by: personalIDs,
      });
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_TANTA_URL}/payroll/retrySalaryPayment`, requestOptions)
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
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          }).then(() => {
            if (result.status === "SUCCESS") {
              window.location.reload();
            }
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
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container>
        <Card>
          <MDBox pt={4} pb={3}>
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
                Calculate Bonus & Deduction
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
                    <Grid container justifyContent="center" spacing={2}>
                      <Grid item xs={5}>
                        <MDBox mt={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="regular"
                            fontSize="80%"
                            align="left"
                            color="text"
                          >
                            Select User *
                          </MDTypography>
                          <Select
                            closeMenuOnSelect
                            // components={animatedComponents}
                            onChange={handleOnSelect}
                            isMulti
                            options={sUser}
                          />
                        </MDBox>
                      </Grid>

                      <Grid item xs={10}>
                        <MDBox
                          variant="gradient"
                          bgColor="white"
                          borderRadius="lg"
                          coloredShadow="info"
                          mt={3}
                          p={2}
                          mb={1}
                          textAlign="center"
                        >
                          <MDBox mt={4} mb={1}>
                            <MDButton
                              variant="gradient"
                              onClick={handleClick}
                              // color="info"
                              style={Styles.buttonSx}
                              width="50%"
                              ml={10}
                            >
                              Calculate Selected Users
                            </MDButton>
                            <MDButton
                              variant="text"
                              size="small"
                              //  color="info"
                              style={Styles.buttonSx}
                              width="50%"
                            >
                              OR
                            </MDButton>
                            <MDButton
                              variant="gradient"
                              onClick={handleAllCal}
                              // color="info"
                              style={Styles.buttonSx}
                              width="50%"
                            >
                              calculate All Users
                            </MDButton>
                          </MDBox>
                        </MDBox>
                      </Grid>
                    </Grid>
                  </div>
                </Container>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
        &nbsp;
        <Card>
          <MDBox pt={4} pb={3}>
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
                Initiate Payment
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
              <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={10}>
                  {" "}
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Title*"
                      value={namex || ""}
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>{" "}
                </Grid>

                <Grid item xs={10}>
                  {" "}
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      value={descripx || ""}
                      onChange={(e) => setDescrip(e.target.value)}
                      label="Narration*"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>{" "}
                </Grid>

                <Grid item xs={10}>
                  {" "}
                  <MDBox mb={2}>
                    <Container>
                      <div align="center">
                        <MDBox mt={4} mb={1}>
                          <MDButton
                            variant="gradient"
                            onClick={handleInitiatePay}
                            // color="info"
                            style={Styles.buttonSx}
                            width="50%"
                          >
                            Initiate
                          </MDButton>
                        </MDBox>
                      </div>
                    </Container>
                  </MDBox>{" "}
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </Card>
        &nbsp;
        <Card>
          <MDBox pt={4} pb={3}>
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
                Retry Payment
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
                <MDBox mb={0}>
                  <Container>
                    <Grid container justifyContent="center" spacing={2}>
                      <Grid item xs={5}>
                        <MDInput
                          type="text"
                          label="Title*"
                          value={namexx || ""}
                          className="form-control"
                          onChange={(e) => setNamee(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <MDInput
                          type="text"
                          value={descripxx || ""}
                          onChange={(e) => setDescripp(e.target.value)}
                          label="Narration*"
                          variant="standard"
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={10}>
                        <MDBox mt={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="regular"
                            fontSize="80%"
                            align="left"
                            color="text"
                          >
                            Select User
                          </MDTypography>
                          <Select
                            closeMenuOnSelect
                            // components={animatedComponents}
                            onChange={handleAllSelect}
                            isMulti
                            options={aUser}
                          />
                        </MDBox>
                      </Grid>

                      <Grid item xs={5}>
                        <MDBox mt={1} mb={1}>
                          <MDButton
                            variant="gradient"
                            onClick={handleRetryPayment}
                            // color="info"
                            style={Styles.buttonSx}
                            width="50%"
                          >
                            <span className="material-icons">refresh</span> &nbsp; Retry
                          </MDButton>
                        </MDBox>
                      </Grid>
                      <Grid item xs={5}>
                        {" "}
                        <></>{" "}
                      </Grid>
                    </Grid>
                  </Container>
                </MDBox>
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
        <div align="center">
          <MDBox mt={4} mb={1}>
            <CSVLink {...csvReport} style={Styles.textSx}>
              {" "}
              EXPORT AS CSV
            </CSVLink>
          </MDBox>
        </div>
      </Container>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default SalaryPayment;
