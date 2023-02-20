/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form, Dropdown } from "react-bootstrap";
import Icon from "@mui/material/Icon";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import "./index.scss";
import "./index.css";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Styles from "styles";

import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

function Accounts() {
  const MySwal = withReactContent(Swal);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 0,
    overflow: "scroll",
    height: "90%",
    width: "90%",
    minHeight: 500,
    minWidth: 500,
    maxHeight: 700,
    maxWidth: 700,
    display: "block",

    "&::-webkit-scrollbar": {
      width: "6px",
      height: "2px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 1px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 1px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#4285F4",
      webkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
    },
  };

  const cardBorder = {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  };

  //   {
  //     "id": "string",

  //     "orgID": "string",
  //     "agentID": 0,
  //     "clientID": "string",
  //     "clientType": 0,
  //     "channel": "string",
  //     "priority": "string",

  //     "web, whatsapp, twitter, instagram"

  // "1 individual"
  // "2 Coperate"

  //     "status": 0,
  //     "reassignedTo": 0,
  //     "closingComment": "string",
  //     "resolutionTime": 0,
  //     "openedTime": 0,
  //     "closedTime": 0,
  //     "createdTime": 0,
  //     "lastChatTime": 0,
  //     "reopened": true,
  //     "resolved": true
  //   }

  const [type, setType] = useState("");
  const [superAccountID, setSuperAccountID] = useState("");
  const [debitOrCredit, setDebitOrCredit] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [descrip, setDescrip] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startingBalance, setStartingBalance] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  //   const [currentBalance, setCurrentBalance] = useState(startingBalance);
  const currentBalance = startingBalance;
  const [isSubAccount, setIsSubAccount] = useState(false);

  const [uidx, setUId] = useState("");
  const [uType, setUType] = useState("");
  const [uSuperAccountID, setUSuperAccountID] = useState("");
  const [uDebitOrCredit, setUDebitOrCredit] = useState("");
  const [uNumber, setUNumber] = useState("");
  const [uName, setUName] = useState("");
  const [uDescrip, setUDescrip] = useState("");
  const [uStartTime, setUStartTime] = useState("");
  const [uStartingBalance, setUStartingBalance] = useState("");
  const [uCategory, setUCategory] = useState("");
  const [uCurrentBalance, setUCurrentBalance] = useState("");
  const [uTransactions, setUTransactions] = useState([]);
  const [uDeleteFlag, setUDeleteFlag] = useState("");

  const accountTypes = [
    {
      name: "ASSETS",
      value: "ASSETS",
      categories: [
        { name: "CURRENT", value: "CURRENT" },
        { name: "FIXED", value: "FIXED" },
        { name: "OPERATING COST", value: "OPERATING_COST" },
        { name: "NON OPERATING COST", value: "NON_OPERATING_COST" },
      ],
    },
    {
      name: "EQUITY",
      value: "EQUITY",
      categories: [],
    },
    {
      name: "EXPENSES",
      value: "EXPENSES",
      categories: [],
    },
    {
      name: "INCOME",
      value: "INCOME",
      categories: [],
    },
    {
      name: "LIABILITY",
      value: "LIABILITY",
      categories: [
        { name: "CURRENT", value: "CURRENT" },
        { name: "FIXED", value: "FIXED" },
        { name: "OPERATING COST", value: "OPERATING_COST" },
        { name: "NON OPERATING COST", value: "NON_OPERATING_COST" },
      ],
    },
  ];

  const [showUpdate, setShowUpdate] = useState(false);
  const [uopened, setUOpened] = useState(false);
  //   const handleUClose = () => {
  //     setUOpened(false);
  //     setShowUpdate(false);
  //   };

  //   const [showClients, setShowClients] = useState(false);

  const [items, setItems] = useState([]);

  const [opened, setOpened] = useState(false);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  const showMessage = (alertTitle, alertType, alertText) => {
    MySwal.fire({
      title: alertTitle,
      type: alertType,
      text: alertText,
    });
  };

  const changeDateTime = (timestamp) => {
    let date = new Date();
    if (timestamp) date = new Date(timestamp);
    let month = "0";
    if (date.getMonth() + 1 < 10) {
      const mymonth = date.getMonth() + 1;
      month += mymonth;
    } else {
      const mymonth = date.getMonth() + 1;
      month = mymonth;
    }
    let day = "0";
    if (date.getDate() < 10) {
      day += date.getDate();
    } else {
      day = date.getDate();
    }
    const retDate = `${date.getFullYear()}-${month}-${day}`;

    let hour = "0";
    let minutes = "0";

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

    return `${retDate}T${hour}:${minutes}`;
  };

  const handleGets = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    setOpened(true);
    const headers = miHeaders;
    // const date = new Date();
    // const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    // const curDay = new Date().getTime();

    // const startTimee = new Date(startTimex).getTime();
    // const endTimee = new Date(endTimex).getTime();
    // let nStartTime = firstDay;
    // let nEndTime = curDay;
    // if (startTimex === "") {
    //   nStartTime = firstDay;
    // } else {
    //   nStartTime = startTimee;
    // }
    // if (endTimex === "") {
    //   nEndTime = curDay;
    // } else {
    //   nEndTime = endTimee;
    // }
    fetch(`${process.env.REACT_APP_LOUGA_URL}/accounts/gets/${orgIDs}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        if (result.status !== 500) {
          // if (Object.keys(result).length !== 0) {
          if (result.length !== 0) {
            setItems(result);
          } else {
            setItems([]);
          }
          // }
        }

        setOpened(false);
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
        // }).then(() => {
        //   handleOpen();
        // });
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      //   fetches the table data
      handleGets();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e) => {
    if (
      name === "" ||
      descrip === "" ||
      type === "" ||
      debitOrCredit === "" ||
      startTime === "" ||
      startingBalance === ""
    ) {
      showMessage("EMPTY_TEXTFIELDS", "error", "please fill all the fields with asterisks");
      return;
    }
    if (type === "ASSETS" || type === "LIABILITY") {
      if (category === "") {
        showMessage("EMPTY_TEXTFIELDS", "error", "please fill all the fields with asterisks");
        return;
      }
    }

    if (isSubAccount) {
      if (superAccountID === "") {
        showMessage("EMPTY_TEXTFIELDS", "error", "please fill all the fields with asterisks");
        return;
      }
    }

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const { orgID } = data11;
    setOpened(true);
    e.preventDefault();

    const startTimee = new Date(startTime).getTime();
    const raw = JSON.stringify({
      orgID,
      type,
      superAccountID,
      debitOrCredit: parseInt(debitOrCredit, 10),
      number,
      name,
      descrip,
      startTime: startTimee,
      startingBalance,
      category,
      currentBalance,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_LOUGA_URL}/accounts/add`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        setOpened(false);
        // if (result.status === "SUCCESS") {
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          if (result.status === "SUCCESS") {
            setName("");
            setDescrip("");
            setCategory("");
            setCategories([]);
            setType("");
            setDebitOrCredit("");
            setStartTime("");
            setIsSubAccount(false);
            setNumber("");
            setStartingBalance("");
            handleGets();
          }
        });
        // }
        //  else if ((result.status = "RECORD_NON_UNIQUE")) {
        //   MySwal.fire({
        //     title: result.status,
        //     type: "success",
        //     text: result.message,
        //   });
        // } else {
        //   MySwal.fire({
        //     title: result.status,
        //     type: "success",
        //     text: result.message,
        //   });
        // }
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

  const handleUpdate = (e) => {
    if (
      uName === "" ||
      uDescrip === "" ||
      uType === "" ||
      uDebitOrCredit === "" ||
      uStartTime === "" ||
      uStartingBalance === ""
    ) {
      showMessage("EMPTY_TEXTFIELDS", "error", "please fill all the fields with asterisks");
      return;
    }
    if (uType === "ASSETS" || uType === "LIABILITY") {
      if (uCategory === "") {
        showMessage("EMPTY_TEXTFIELDS", "error", "please fill all the fields with asterisks");
        return;
      }
    }

    if (isSubAccount) {
      if (uSuperAccountID === "") {
        showMessage("EMPTY_TEXTFIELDS", "error", "please fill all the fields with asterisks");
        return;
      }
    }

    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const startTimee = new Date(uStartTime).getTime();
    const raw = JSON.stringify({
      id: uidx,
      orgID: orgIDs,
      type: uType,
      superAccountID: uSuperAccountID,
      debitOrCredit: parseInt(uDebitOrCredit, 10),
      number: uNumber,
      name: uName,
      descrip: uDescrip,
      startTime: startTimee,
      startingBalance: uStartingBalance,
      deleteFlag: uDeleteFlag,
      category: uCategory,
      currentBalance: uCurrentBalance,
      transactions: uTransactions,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_LOUGA_URL}/accounts/update`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        setOpened(false);
        setUOpened(false);
        setShowUpdate(false);
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          if (result.status === "SUCCESS") {
            setIsSubAccount(false);
            setCategories([]);
            handleGets();
          } else {
            setUOpened(true);
            setShowUpdate(true);
          }
        });
      })
      .catch((error) => {
        setOpened(false);
        setShowUpdate(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        }).then(() => {
          setUOpened(true);
          setShowUpdate(true);
        });
      });
  };

  // Method to handle Reopen
  const handleDelete = (val) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setOpened(true);
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(`${process.env.REACT_APP_LOUGA_URL}/accounts/delete/${val}`, requestOptions)
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
              handleGets();
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

  // Method to filter tickets
  const handleShow = (filteredData, value) => {
    const result = filteredData.filter((item) => item.id === value);
    console.log(items);
    setOpened(true);
    console.log(result);
    setUId(value);
    setUType(result[0].type);
    // eslint-disable-next-line array-callback-return
    accountTypes.map((each) => {
      if (each.value === result[0].type) setCategories(each.categories);
    });
    if (result[0].superAccountID) {
      setIsSubAccount(true);
    } else {
      setIsSubAccount(false);
    }
    setUSuperAccountID(result[0].superAccountID);
    setUDebitOrCredit(`${result[0].debitOrCredit}`);
    setUNumber(result[0].number);
    setUName(result[0].name);
    setUDescrip(result[0].descrip);
    setUStartingBalance(result[0].startingBalance);
    setUCurrentBalance(result[0].currentBalance);
    setUStartTime(changeDateTime(result[0].startTime));
    setUCategory(result[0].category);
    setUTransactions(result[0].transactions);
    setUDeleteFlag(result[0].deleteFlag);
    setOpened(false);
    setUOpened(true);
    setShowUpdate(true);
  };

  // // Method to change type
  // const changeTrueOrFalse = (status) => {
  //   if (status === true) {
  //     return "True";
  //     // eslint-disable-next-line no-else-return
  //   } else {
  //     return "False";
  //   }
  // };

  // // Method to change date from timestamp
  // const changeDate = (timestamp) => {
  //   if (timestamp === 0) {
  //     return "No Date";
  //     // eslint-disable-next-line no-else-return
  //   } else {
  //     const date = new Date(timestamp);
  //     const retDate = date.toDateString();
  //     return retDate;
  //   }
  // };

  const changeDateAndTime = (timestamp) => {
    if (timestamp === 0) {
      return "No Date";
    }
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
  };

  const pColumns = [
    {
      Header: "Number",
      accessor: "number",
      align: "left",
    },
    {
      Header: "Name",
      accessor: "name",
      align: "left",
    },
    {
      Header: "Description",
      accessor: "descrip",
      align: "left",
    },
    {
      Header: "Type",
      accessor: "type",
      align: "left",
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell: { value } }) => value || "NO CATEGORY",
      align: "left",
    },
    {
      Header: "Debit/Credit",
      accessor: "debitOrCredit",
      Cell: ({ cell: { value } }) => (value === 0 ? "DEBIT" : "CREDIT"),
      align: "left",
    },
    // {
    //   Header: "Super Account Name",
    //   accessor: "superAccountName",
    //   Cell: ({ cell: { value } }) => value || "NOT A SUB ACCOUNT",
    //   align: "left",
    // },
    {
      Header: "Starting Balance",
      accessor: "startingBalance",
      align: "left",
    },
    {
      Header: "Current Balance",
      accessor: "currentBalance",
      align: "left",
    },
    {
      Header: "Start Time",
      accessor: "startTime",
      Cell: ({ cell: { value } }) => changeDateAndTime(value),
      align: "left",
    },
    {
      Header: "actions",
      accessor: "id",
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
            <Dropdown.Toggle variant="secondary" id="dropdown-basic-button">
              <Icon sx={{ fontWeight: "light" }}>settings</Icon>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate(`/accounts/account-Sheet?id=${value}`)}>
                View Sheet
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDelete(value)}>Delete</Dropdown.Item>
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
      <Card>
        <MDBox pt={4} pb={3} px={10}>
          <MDBox
            variant="gradient"
            //   bgColor="info"
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
              Create Account
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
                <div
                // align="center"
                >
                  <div className="row">
                    <div className="col-sm-6">
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        // fontSize="80%"
                        style={{ fontSize: 15 }}
                        align="left"
                        color="text"
                      >
                        Type
                        <span style={{ color: "red" }}>*</span>
                      </MDTypography>
                      <Form.Select
                        value={type}
                        onChange={(e) => {
                          // eslint-disable-next-line array-callback-return
                          accountTypes.map((each) => {
                            if (each.value === e.target.value) setCategories(each.categories);
                          });
                          setType(e.target.value);
                        }}
                        aria-label="Default select example"
                      >
                        <option value="">--Select Type--</option>
                        {accountTypes.map((each, index) => (
                          <option key={index} value={each.value}>
                            {each.name}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </div>
                    <div className="col-sm-6">
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        // fontSize="80%"
                        style={{ fontSize: 15 }}
                        align="left"
                        color="text"
                        mt={0}
                      >
                        Category
                        {type === "ASSETS" && (
                          <span color="red" style={{ color: "red" }}>
                            *
                          </span>
                        )}
                        {type === "LIABILITY" && (
                          <span color="red" style={{ color: "red" }}>
                            *
                          </span>
                        )}
                      </MDTypography>
                      <MDBox textAlign="right">
                        <Form.Select
                          onChange={(e) => setCategory(e.target.value)}
                          value={category || ""}
                          aria-label="Default select example"
                        >
                          <option value="">--Select Category--</option>
                          {categories.map((each, index) => (
                            <option key={index} value={each.value}>
                              {each.name}
                            </option>
                          ))}
                        </Form.Select>
                      </MDBox>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <MDBox
                        mt={-2}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          // height: 100,
                        }}
                      >
                        <MDBox
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                            justifyContent: "flex-end",
                          }}
                        >
                          <MDBox>
                            <MDTypography
                              variant="button"
                              fontWeight="regular"
                              // fontSize="80%"
                              style={{ fontSize: 15 }}
                              align="left"
                              color="text"
                            >
                              Name
                              <span style={{ color: "red" }}>*</span>
                            </MDTypography>
                            <MDInput
                              type="text"
                              // label="Name*"
                              placeholder="Name"
                              value={name || ""}
                              onChange={(e) => setName(e.target.value)}
                              // error
                              variant="outlined"
                              // helperText="Incorrect entry."
                              fullWidth
                            />
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </div>
                    <div className="col-sm-6">
                      <MDBox
                        mt={-2}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          // height: 100,
                        }}
                      >
                        <MDBox
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                            justifyContent: "flex-end",
                          }}
                        >
                          <MDBox>
                            <MDTypography
                              variant="button"
                              fontWeight="regular"
                              // fontSize="80%"
                              style={{ fontSize: 15 }}
                              align="left"
                              color="text"
                            >
                              Description
                              <span style={{ color: "red" }}>*</span>
                            </MDTypography>
                            <MDInput
                              type="text"
                              // label="Description"
                              placeholder="Description"
                              value={descrip || ""}
                              onChange={(e) => setDescrip(e.target.value)}
                              // error
                              variant="outlined"
                              // helperText="Incorrect entry."
                              fullWidth
                            />
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <MDBox
                        mt={2}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          height: 100,
                        }}
                      >
                        <MDBox
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                            justifyContent: "flex-end",
                          }}
                        >
                          <MDBox>
                            <FormControl>
                              <FormLabel
                                style={{ fontSize: 15 }}
                                id="demo-radio-buttons-group-label"
                              >
                                Sub Account?
                              </FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="false"
                                name="radio-buttons-group"
                                value={`${isSubAccount}`}
                                onChange={(e) => {
                                  // eslint-disable-next-line no-unused-expressions
                                  e.target.value === "true"
                                    ? setIsSubAccount(true)
                                    : setIsSubAccount(false);
                                }}
                              >
                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                              </RadioGroup>
                            </FormControl>
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </div>
                    <div className="col-sm-6">
                      {isSubAccount && (
                        <MDBox
                          mt={2}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            height: 100,
                          }}
                        >
                          <MDBox
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              flex: 1,
                              justifyContent: "flex-end",
                            }}
                          >
                            <MDBox>
                              <MDTypography
                                variant="button"
                                fontWeight="regular"
                                // fontSize="80%"
                                style={{ fontSize: 15 }}
                                align="left"
                                color="text"
                              >
                                Super Account
                                <span style={{ color: "red" }}>*</span>
                              </MDTypography>
                              <Form.Select
                                value={superAccountID}
                                onChange={(e) => setSuperAccountID(e.target.value)}
                                aria-label="Default select example"
                              >
                                <option value="">--Select a super acount--</option>
                                {items.map((each) => (
                                  <option key={each.id} value={each.id}>
                                    {each.name}
                                  </option>
                                ))}
                              </Form.Select>
                            </MDBox>
                          </MDBox>
                        </MDBox>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      {" "}
                      <MDBox
                        mt={2}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          height: 100,
                        }}
                      >
                        <MDBox
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                            justifyContent: "flex-end",
                          }}
                        >
                          <MDBox>
                            <FormControl>
                              <FormLabel
                                style={{ fontSize: 15 }}
                                id="demo-radio-buttons-group-label"
                              >
                                Debit/Credit
                                <span style={{ color: "red" }}>*</span>
                              </FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                //   defaultValue="false"
                                name="radio-buttons-group"
                                value={debitOrCredit}
                                onChange={(e) => {
                                  setDebitOrCredit(e.target.value);
                                }}
                              >
                                <FormControlLabel value="0" control={<Radio />} label="Debit" />
                                <FormControlLabel value="1" control={<Radio />} label="Credit" />
                              </RadioGroup>
                            </FormControl>
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </div>
                    <div className="col-sm-6">
                      <MDBox
                        mt={2}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          height: 100,
                        }}
                      >
                        <MDBox
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                            justifyContent: "flex-end",
                          }}
                        >
                          <MDBox>
                            <MDTypography
                              variant="button"
                              fontWeight="regular"
                              // fontSize="80%"
                              style={{ fontSize: 15 }}
                              align="left"
                              color="text"
                            >
                              Starting Balance
                              <span style={{ color: "red" }}>*</span>
                            </MDTypography>
                            <MDInput
                              type="number"
                              // label="Starting Balance*"
                              placeholder="Starting Balance"
                              value={startingBalance || ""}
                              onChange={(e) => setStartingBalance(e.target.value)}
                              // error
                              variant="outlined"
                              // helperText="Incorrect entry."
                              fullWidth
                            />
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <MDBox
                        // mt={2}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          height: 100,
                        }}
                      >
                        <MDBox
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                            justifyContent: "flex-end",
                          }}
                        >
                          <MDBox>
                            <MDTypography
                              variant="button"
                              fontWeight="regular"
                              // fontSize="80%"
                              style={{ fontSize: 15 }}
                              align="left"
                              color="text"
                            >
                              Start Time
                              <span style={{ color: "red" }}>*</span>
                            </MDTypography>
                            <MDInput
                              id="datetime-local"
                              type="datetime-local"
                              inputProps={{
                                step: 1,
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              // label="Number*"
                              placeholder="Start Time"
                              value={startTime || ""}
                              onChange={(e) => setStartTime(e.target.value)}
                              variant="outlined"
                              fullWidth
                            />
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </div>
                    <div className="col-sm-6">
                      <MDBox
                        // mt={2}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          height: 100,
                        }}
                      >
                        <MDBox
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                            justifyContent: "flex-end",
                          }}
                        >
                          <MDBox>
                            <MDTypography
                              variant="button"
                              fontWeight="regular"
                              // fontSize="80%"
                              style={{ fontSize: 15 }}
                              align="left"
                              color="text"
                            >
                              Number
                            </MDTypography>
                            <MDInput
                              type="number"
                              // label="Number*"
                              placeholder="Number"
                              value={number || ""}
                              onChange={(e) => setNumber(e.target.value)}
                              variant="outlined"
                              fullWidth
                            />
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </div>
                  </div>
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      onClick={handleClick}
                      style={Styles.buttonSx}
                      // color="info"
                      width="50%"
                      align="center"
                    >
                      Save
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
      {showUpdate ? (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={uopened}>
          <Card sx={style} style={cardBorder}>
            {" "}
            <MDBox>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                onClick={() => setUOpened(false)}
              >
                <ClearIcon sx={{ color: "red" }} />
              </IconButton>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox
                variant="gradient"
                //   bgColor="info"
                style={Styles.boxSx}
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MDTypography
                  variant="h4"
                  fontWeight="medium"
                  color="white"
                  textAlign="center"
                  mt={1}
                >
                  Update Account
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
              </MDBox>{" "}
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <Container>
                    <div
                    // align="center"
                    >
                      <div className="row">
                        <div className="col-sm-6">
                          <MDTypography
                            variant="button"
                            fontWeight="regular"
                            // fontSize="80%"
                            style={{ fontSize: 15 }}
                            align="left"
                            color="text"
                          >
                            Type
                            <span style={{ color: "red" }}>*</span>
                          </MDTypography>
                          <Form.Select
                            value={uType}
                            onChange={(e) => {
                              // eslint-disable-next-line array-callback-return
                              accountTypes.map((each) => {
                                if (each.value === e.target.value) setCategories(each.categories);
                              });
                              setUType(e.target.value);
                            }}
                            aria-label="Default select example"
                          >
                            <option value="">--Select Type--</option>
                            {accountTypes.map((each, index) => (
                              <option key={index} value={each.value}>
                                {each.name}
                              </option>
                            ))}
                          </Form.Select>
                          <br />
                        </div>
                        <div className="col-sm-6">
                          <MDTypography
                            variant="button"
                            fontWeight="regular"
                            // fontSize="80%"
                            style={{ fontSize: 15 }}
                            align="left"
                            color="text"
                            mt={0}
                          >
                            Category
                            {type === "ASSETS" && (
                              <span color="red" style={{ color: "red" }}>
                                *
                              </span>
                            )}
                            {type === "LIABILITY" && (
                              <span color="red" style={{ color: "red" }}>
                                *
                              </span>
                            )}
                          </MDTypography>
                          <MDBox textAlign="right">
                            <Form.Select
                              onChange={(e) => setUCategory(e.target.value)}
                              value={uCategory || ""}
                              aria-label="Default select example"
                            >
                              <option value="">--Select Category--</option>
                              {categories.map((each, index) => (
                                <option key={index} value={each.value}>
                                  {each.name}
                                </option>
                              ))}
                            </Form.Select>
                          </MDBox>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <MDBox
                            mt={-2}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              // height: 100,
                            }}
                          >
                            <MDBox
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                                justifyContent: "flex-end",
                              }}
                            >
                              <MDBox>
                                <MDTypography
                                  variant="button"
                                  fontWeight="regular"
                                  // fontSize="80%"
                                  style={{ fontSize: 15 }}
                                  align="left"
                                  color="text"
                                >
                                  Name
                                  <span style={{ color: "red" }}>*</span>
                                </MDTypography>
                                <MDInput
                                  type="text"
                                  // label="Name*"
                                  placeholder="Name"
                                  value={uName || ""}
                                  onChange={(e) => setUName(e.target.value)}
                                  // error
                                  variant="outlined"
                                  // helperText="Incorrect entry."
                                  fullWidth
                                />
                              </MDBox>
                            </MDBox>
                          </MDBox>
                        </div>
                        <div className="col-sm-6">
                          <MDBox
                            mt={-2}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              // height: 100,
                            }}
                          >
                            <MDBox
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                                justifyContent: "flex-end",
                              }}
                            >
                              <MDBox>
                                <MDTypography
                                  variant="button"
                                  fontWeight="regular"
                                  // fontSize="80%"
                                  style={{ fontSize: 15 }}
                                  align="left"
                                  color="text"
                                >
                                  Description
                                  <span style={{ color: "red" }}>*</span>
                                </MDTypography>
                                <MDInput
                                  type="text"
                                  // label="Description"
                                  placeholder="Description"
                                  value={uDescrip || ""}
                                  onChange={(e) => setUDescrip(e.target.value)}
                                  // error
                                  variant="outlined"
                                  // helperText="Incorrect entry."
                                  fullWidth
                                />
                              </MDBox>
                            </MDBox>
                          </MDBox>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <MDBox
                            mt={2}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              height: 100,
                            }}
                          >
                            <MDBox
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                                justifyContent: "flex-end",
                              }}
                            >
                              <MDBox>
                                <FormControl>
                                  <FormLabel
                                    style={{ fontSize: 15 }}
                                    id="demo-radio-buttons-group-label"
                                  >
                                    Sub Account?
                                  </FormLabel>
                                  <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="false"
                                    name="radio-buttons-group"
                                    value={`${isSubAccount}`}
                                    onChange={(e) => {
                                      // eslint-disable-next-line no-unused-expressions
                                      e.target.value === "true"
                                        ? setIsSubAccount(true)
                                        : setIsSubAccount(false);
                                    }}
                                  >
                                    <FormControlLabel
                                      value="true"
                                      control={<Radio />}
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      value="false"
                                      control={<Radio />}
                                      label="No"
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </MDBox>
                            </MDBox>
                          </MDBox>
                        </div>
                        <div className="col-sm-6">
                          {isSubAccount && (
                            <MDBox
                              mt={2}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                height: 100,
                              }}
                            >
                              <MDBox
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  flex: 1,
                                  justifyContent: "flex-end",
                                }}
                              >
                                <MDBox>
                                  <MDTypography
                                    variant="button"
                                    fontWeight="regular"
                                    // fontSize="80%"
                                    style={{ fontSize: 15 }}
                                    align="left"
                                    color="text"
                                  >
                                    Super Account
                                    <span style={{ color: "red" }}>*</span>
                                  </MDTypography>
                                  <Form.Select
                                    value={uSuperAccountID}
                                    onChange={(e) => setUSuperAccountID(e.target.value)}
                                    aria-label="Default select example"
                                  >
                                    <option value="">--Select a super acount--</option>
                                    {items.map((each) => (
                                      <option key={each.id} value={each.id}>
                                        {each.name}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </MDBox>
                              </MDBox>
                            </MDBox>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          {" "}
                          <MDBox
                            mt={2}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              height: 100,
                            }}
                          >
                            <MDBox
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                                justifyContent: "flex-end",
                              }}
                            >
                              <MDBox>
                                <FormControl>
                                  <FormLabel
                                    style={{ fontSize: 15 }}
                                    id="demo-radio-buttons-group-label"
                                  >
                                    Debit/Credit
                                    <span style={{ color: "red" }}>*</span>
                                  </FormLabel>
                                  <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    //   defaultValue="false"
                                    name="radio-buttons-group"
                                    value={uDebitOrCredit}
                                    onChange={(e) => {
                                      setUDebitOrCredit(e.target.value);
                                    }}
                                  >
                                    <FormControlLabel value="0" control={<Radio />} label="Debit" />
                                    <FormControlLabel
                                      value="1"
                                      control={<Radio />}
                                      label="Credit"
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </MDBox>
                            </MDBox>
                          </MDBox>
                        </div>
                        <div className="col-sm-6">
                          <MDBox
                            mt={2}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              height: 100,
                            }}
                          >
                            <MDBox
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                                justifyContent: "flex-end",
                              }}
                            >
                              <MDBox>
                                <MDTypography
                                  variant="button"
                                  fontWeight="regular"
                                  // fontSize="80%"
                                  style={{ fontSize: 15 }}
                                  align="left"
                                  color="text"
                                >
                                  Starting Balance
                                  <span style={{ color: "red" }}>*</span>
                                </MDTypography>
                                <MDInput
                                  type="number"
                                  // label="Starting Balance*"
                                  placeholder="Starting Balance"
                                  value={uStartingBalance || ""}
                                  onChange={(e) => setUStartingBalance(e.target.value)}
                                  // error
                                  disabled
                                  variant="outlined"
                                  // helperText="Incorrect entry."
                                  fullWidth
                                />
                              </MDBox>
                            </MDBox>
                          </MDBox>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <MDBox
                            // mt={2}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              height: 100,
                            }}
                          >
                            <MDBox
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                                justifyContent: "flex-end",
                              }}
                            >
                              <MDBox>
                                <MDTypography
                                  variant="button"
                                  fontWeight="regular"
                                  // fontSize="80%"
                                  style={{ fontSize: 15 }}
                                  align="left"
                                  color="text"
                                >
                                  Start Time
                                  <span style={{ color: "red" }}>*</span>
                                </MDTypography>
                                <MDInput
                                  id="datetime-local"
                                  type="datetime-local"
                                  inputProps={{
                                    step: 1,
                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  // label="Number*"
                                  placeholder="Start Time"
                                  value={uStartTime || ""}
                                  onChange={(e) => setUStartTime(e.target.value)}
                                  variant="outlined"
                                  fullWidth
                                />
                              </MDBox>
                            </MDBox>
                          </MDBox>
                        </div>
                        <div className="col-sm-6">
                          <MDBox
                            // mt={2}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              height: 100,
                            }}
                          >
                            <MDBox
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                                justifyContent: "flex-end",
                              }}
                            >
                              <MDBox>
                                <MDTypography
                                  variant="button"
                                  fontWeight="regular"
                                  // fontSize="80%"
                                  style={{ fontSize: 15 }}
                                  align="left"
                                  color="text"
                                >
                                  Number
                                </MDTypography>
                                <MDInput
                                  type="number"
                                  // label="Number*"
                                  placeholder="Number"
                                  value={uNumber || ""}
                                  onChange={(e) => setUNumber(e.target.value)}
                                  variant="outlined"
                                  fullWidth
                                />
                              </MDBox>
                            </MDBox>
                          </MDBox>
                        </div>
                      </div>
                      <MDBox mt={4} mb={1}>
                        <MDButton
                          variant="gradient"
                          onClick={handleUpdate}
                          style={Styles.buttonSx}
                          // color="info"
                          width="50%"
                          align="center"
                        >
                          Save
                        </MDButton>
                      </MDBox>
                    </div>
                  </Container>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </Backdrop>
      ) : (
        <MDBox />
      )}
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default Accounts;
