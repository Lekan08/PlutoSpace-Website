/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Styles from "styles";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";

function UpdateAssets() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const [itemx, setItem] = useState("");
  const [assetTypeIDx, setAssetTypeID] = useState("");
  const [showClients, setShowClients] = useState(false);
  const [clientx, setClient] = useState([]);
  const [clientTypex, setClientTypex] = useState("");
  const [clientIDx, setClientIDx] = useState("");
  const [itemsx, setItems] = useState([]);
  const [itemWorthx, setItemWorth] = useState("");
  const [createdTimex, setCreatedTime] = useState("");
  const [idx, setId] = useState("");
  const [deletex, setDeleteFlag] = useState("");
  const [closingWorthx, setClosingWorth] = useState("");
  const [closedTimex, setClosedTime] = useState("");
  const [closedByx, setClosedBy] = useState("");
  const [statusx, setStatus] = useState("");
  const [createdByx, setCreatedBy] = useState("");
  const [getAllBranch, setGetAllBranch] = useState([]);
  const [branchx, setBranch] = useState("");
  const [serialNox, setSerialNo] = useState("");
  const [manufacturerx, setManufacturer] = useState("");
  const [user, setUser] = useState([]);
  const [assignedTox, setAssignedTo] = useState("");
  const [componentsx, setComponents] = useState("");
  const [newword, setNewword] = useState([]);
  const [itemBoughtDatex, setItemBoughtDate] = useState("");
  const [itemWarrantyDatex, setItemWarrantyDate] = useState("");
  const [attachDocs, setAttachDocs] = useState("");

  const [checkedItem, setCheckedItem] = useState("");
  const [checkedItemWorth, setCheckedItemWorth] = useState("");
  const [checkedAssigned, setCheckedAssigned] = useState("");
  const [checkedAssetsTypes, setCheckedAssetsTypes] = useState("");
  //   const [checkedMaximum, setCheckedMaximum] = useState("");
  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  //   const handleOnNameKeys = (value) => {
  //     const letters = /^[a-zA-Z ]+$/;
  //     if (!value.toString().match(letters)) {
  //       setCheckedName(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
  //     }
  //     if (value.toString().match(letters)) {
  //       setCheckedName(true);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("name").innerHTML = "";
  //     }
  //     if (value.toString().length === 0) {
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("name").innerHTML = "Name is required<br>";
  //     }
  //   };
  //   const handleOnRateKeys = (value) => {
  //     const numbers = /^[0-9 ]+$/;
  //     if (!value.toString().match(numbers)) {
  //       setCheckedNumber(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("rate").innerHTML = "Rate - input only numbers<br>";
  //     }
  //     if (value.toString().match(numbers)) {
  //       setCheckedNumber(true);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("rate").innerHTML = "";
  //     }
  //     if (value.toString().length === 0) {
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("rate").innerHTML = "Rate is required<br>";
  //     }
  //   };
  //   const handleOnMaximumKeys = (value) => {
  //     const numbers = /^[0-9 ]+$/;
  //     if (!value.toString().match(numbers)) {
  //       setCheckedMaximum(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("maximum").innerHTML = "Maximum Life Cycle - input only numbers<br>";
  //     }
  //     if (value.toString().match(numbers)) {
  //       setCheckedMaximum(true);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("maximum").innerHTML = "";
  //     }
  //     if (value.toString().length === 0) {
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("maximum").innerHTML = "Maximum Life Cycle is required<br>";
  //     }
  //   };

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;

    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/assetTypes/gets/${orgIDs}`, { headers })
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
        if (isMounted) {
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
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
        if (isMounted) {
          setUser(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnItemKeys = (value) => {
    const letters = /^[a-zA-Z ]+$/;
    if (!value.match(letters)) {
      setCheckedItem(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("item").innerHTML = "Item - input only capital and small letters<br>";
    }
    if (value.match(letters)) {
      setCheckedItem(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("item").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("item").innerHTML = "Item is required<br>";
    }
  };
  const handleOnItemWorthKeys = (value) => {
    const letters = /^[0-9 ]+$/;
    if (value.toString().match(letters)) {
      setCheckedItemWorth(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("itemWorth").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("itemWorth").innerHTML = "Rate is required<br>";
    }
  };
  console.log(checkedAssigned);
  const handleOnAssignedKeys = (value) => {
    setAssignedTo(value);
    console.log(value);
    const Validate = "--Assigned*--";
    if (value.toString().match(Validate)) {
      setCheckedAssigned(false);
    }
    if (!value.toString().match(Validate)) {
      setCheckedAssigned(true);
    }
  };
  const handleOnAssetTypeKeys = (value) => {
    setAssetTypeID(value);
    const Validate = "--Assets Types--";
    if (value.match(Validate)) {
      setCheckedAssetsTypes(false);
    }
    if (!value.match(Validate)) {
      setCheckedAssetsTypes(true);
    }
  };
  // const handleOnManfacturerKeys = (value) => {
  //   const letters = /^[a-zA-Z ]+$/;
  //   if (!value.match(letters)) {
  //     setCheckedManufacturer(false);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("manufacturer").innerHTML =
  //       "Item - input only capital and small letters<br>";
  //   }
  //   if (value.match(letters)) {
  //     setCheckedManufacturer(true);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("manufacturer").innerHTML = "";
  //   }
  // };

  const handleChangeClient = (value) => {
    const callClientType = value.toString();
    setClientTypex(callClientType);
    let clientTyppe = "";
    if (callClientType === "1") {
      setShowClients(true);
      clientTyppe = "individual";
    } else if (callClientType === "2") {
      setShowClients(false);
      clientTyppe = "corporate";
    } else if (value === "--Select Client Type--") {
      setClient([]);
      return; // exit the function early to avoid further errors
    }
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    fetch(`${process.env.REACT_APP_LOUGA_URL}/${clientTyppe}/gets/${orgIDs}`, { headers })
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
        setClient(result);
      });
  };

  const handleGet = () => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const headers = miHeaders;

    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/assets/getByIds/${id}`, { headers })
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
        if (result.length !== 0) {
          setId(result[0].id);
          setItem(result[0].item);
          setItemWorth(result[0].itemWorth);
          setAssetTypeID(result[0].assetTypeID);
          if (result[0].clientType !== 0) {
            handleChangeClient(result[0].clientType);
          }
          setClientTypex(result[0].clientType);
          setCreatedTime(result[0].createdTime);
          setDeleteFlag(result[0].deleteFlag);
          setStatus(result[0].status);
          setClientIDx(result[0].clientID);
          setClosedBy(result[0].closedBy);
          setClosedTime(result[0].closedTime);
          setClosingWorth(result[0].closingWorth);
          setCreatedBy(result[0].createdBy);
          setBranch(result[0].branchID);
          setSerialNo(result[0].serialNumber);
          setManufacturer(result[0].manufacturer);
          setItemBoughtDate(result[0].itemBoughtDate);
          setItemWarrantyDate(result[0].itemWarrantyDate);
          setAssignedTo(result[0].assignedTo);
          setAttachDocs(result[0].attachedDocs);

          setNewword(result[0].components);
          handleOnItemWorthKeys(result[0].itemWorth);
          handleOnItemKeys(result[0].item);
          handleOnAssignedKeys(result[0].assignedTo);
          handleOnAssetTypeKeys(result[0].assetTypeID);
          //   handleOnMaximumKeys(result[0].maximumLifeCycle);
        }
      });
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      handleGet();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/branch/gets/${orgIDs}`, { headers })
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
        if (isMounted) {
          setGetAllBranch(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleKeyword = () => {
    if (componentsx === "" || componentsx === " ") {
      // eslint-disable-next-line no-unused-expressions
      null;
    } else {
      setNewword([...newword, componentsx]);
      setComponents("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleKeyword();
      setComponents("");
    }
  };
  const handleDelete = () => {
    const All = newword;
    All.pop();
    setNewword(All);
    setOpened(true);
    setTimeout(() => {
      setOpened(false);
    }, 1);
  };

  // eslint-disable-next-line consistent-return
  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const boughtDate = new Date(itemBoughtDatex).getTime();
    const warrantyDate = new Date(itemWarrantyDatex).getTime();
    // const Docs = [];
    // attachDocs.map((docs) => {

    // })
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      item: itemx,
      clientType: clientTypex,
      clientID: clientIDx,
      assetTypeID: assetTypeIDx,
      itemWorth: itemWorthx,
      createdBy: createdByx,
      status: statusx,
      closedBy: closedByx,
      closedTime: closedTimex,
      closingWorth: closingWorthx,
      createdTime: createdTimex,
      deleteFlag: deletex,
      itemBoughtDate: boughtDate,
      itemWarrantyDate: warrantyDate,
      branchID: branchx,
      serialNumber: serialNox,
      manufacturer: manufacturerx,
      components: newword,
      assignedTo: assignedTox,
      attachedDocs: attachDocs,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/assets/update`, requestOptions)
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
        setOpened(false);
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
  };
  const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z]+$/;

  const handleValidate = (e) => {
    console.log(checkedItem);
    console.log(checkedItemWorth);
    console.log(checkedAssigned);
    console.log(checkedAssetsTypes);
    if (checkedItem && checkedItemWorth && checkedAssigned && checkedAssetsTypes === true) {
      handleClick(e);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3}>
          <MDBox
            variant="gradient"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
            style={Styles.boxSx}
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Update Asset
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="item">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="itemWorth">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="maximum">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={5}>
                    <MDInput
                      type="text"
                      label="Item *"
                      value={itemx || ""}
                      onKeyUp={(e) => handleOnItemKeys(e.target.value)}
                      onChange={(e) => setItem(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                      mt={0}
                    >
                      Assets Types *
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        value={assetTypeIDx}
                        onChange={(e) => handleOnAssetTypeKeys(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">--Assets Types--</option>
                        {itemsx.map((api) => (
                          <option key={api.id} value={api.id}>
                            {api.name}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </Grid>

                  <Grid item xs={5}>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                      mt={0}
                    >
                      Client Type
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        onChange={(e) => handleChangeClient(e.target.value)}
                        value={clientTypex || ""}
                        aria-label="Default select example"
                      >
                        <option>--Select Client Type--</option>
                        <option value="1">Individual</option>
                        <option value="2">Corporate</option>
                      </Form.Select>
                    </MDBox>
                  </Grid>
                  <Grid item xs={5}>
                    <MDBox mt={0}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        Client
                      </MDTypography>{" "}
                      {showClients ? (
                        <Form.Select
                          value={clientIDx}
                          onChange={(e) => setClientIDx(e.target.value)}
                          aria-label="Default select example"
                        >
                          <option value="">--Select User--</option>
                          {clientx.map((api) => (
                            <option key={api.id} value={api.id}>
                              {api.title} {api.fname} {api.lname}
                            </option>
                          ))}
                        </Form.Select>
                      ) : (
                        <Form.Select
                          value={clientIDx}
                          onChange={(e) => setClientIDx(e.target.value)}
                          aria-label="Default select example"
                        >
                          <option value="">--Select User--</option>
                          {clientx.map((api) => (
                            <option key={api.id} value={api.id}>
                              {api.name}
                            </option>
                          ))}
                        </Form.Select>
                      )}
                      <br />
                    </MDBox>
                  </Grid>
                  <Grid item xs={5}>
                    <Box sx={{ minWidth: 100 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={itemWorthx}
                          label="Item Worth *"
                          placeholder="Item Worth"
                          type="number"
                          size="small"
                          name="Item Worth*"
                          onChange={(e) => setItemWorth(e.target.value)}
                          onKeyUp={(e) => handleOnItemWorthKeys(e.target.value)}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={5}>
                    <MDBox>
                      <Form.Select
                        value={branchx}
                        aria-label="Default select example"
                        name="branchID"
                        onChange={(e) => setBranch(e.target.value)}
                      >
                        <option>Branch</option>
                        {getAllBranch.map((apis) => (
                          <option key={apis.id} value={apis.id}>
                            {apis.name}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </Grid>
                  <Grid item xs={5}>
                    <Box sx={{ minWidth: 100 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={serialNox}
                          label="Serial Number"
                          placeholder="Serial Number"
                          type="number"
                          size="small"
                          name="Serial Number*"
                          onChange={(e) => setSerialNo(e.target.value)}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={5}>
                    <MDInput
                      type="text"
                      label="Manufacturer"
                      value={manufacturerx || ""}
                      // onKeyUp={(e) => handleOnManfacturerKeys(e.target.value)}
                      onChange={(event) => {
                        const { value } = event.target;
                        if (value !== "" && !ALPHA_NUMERIC_DASH_REGEX.test(value)) {
                          return;
                        }
                        setManufacturer(value);
                      }}
                      variant="standard"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <MDBox mt={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        Item Bought Date
                      </MDTypography>
                      <DatePicker
                        placeholderText="Item Bought Date"
                        style={{ marginRight: "10px" }}
                        selected={itemBoughtDatex}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onChange={(boughtdate) => setItemBoughtDate(boughtdate)}
                      />{" "}
                    </MDBox>
                  </Grid>
                  <Grid item xs={5}>
                    <MDBox mt={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        Item Warranty Date
                      </MDTypography>
                      <DatePicker
                        placeholderText="Item Warranty Date"
                        style={{ marginRight: "10px" }}
                        selected={itemWarrantyDatex}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onChange={(warrantydate) => setItemWarrantyDate(warrantydate)}
                      />{" "}
                    </MDBox>
                  </Grid>
                  <Grid item xs={5}>
                    <MDBox>
                      <Form.Select
                        value={assignedTox}
                        aria-label="Default select example"
                        name="branchID"
                        onChange={(e) => handleOnAssignedKeys(e.target.value)}
                      >
                        <option value="0">--Assigned To *--</option>
                        {user.map((apis) => (
                          <option key={apis.personal.id} value={apis.personal.id}>
                            {apis.personal.fname} {apis.personal.lname}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </Grid>
                  <Grid item xs={5}>
                    <MDTypography variant="p" fontWeight="regular" color="secondary" fontSize="90%">
                      {/* <i className="optional"> (optional) </i>
                      <br />
                      Keywords */}
                      <TextField
                        label="Add Components "
                        type="text"
                        value={componentsx}
                        onChange={(e) => setComponents(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                      />
                      &nbsp;
                      <Button size="sm" variant="success" onClick={handleKeyword}>
                        Add
                      </Button>
                      &nbsp;
                      <Button size="sm" variant="danger" onClick={handleDelete}>
                        Remove
                      </Button>
                      {newword.map((item) => (
                        <React.Fragment key={item}>
                          <Chip size="small" label={item} color="success" variant="outlined" />
                          &nbsp;
                        </React.Fragment>
                      ))}
                      <br /> <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={5}>
                    <MDBox mt={1} mb={1}>
                      <MDButton
                        variant="gradient"
                        onClick={handleValidate}
                        style={Styles.buttonSx}
                        width="50%"
                      >
                        Update
                      </MDButton>
                    </MDBox>
                  </Grid>
                  <Grid item xs={5}>
                    <></>
                  </Grid>
                </Grid>
              </Container>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default UpdateAssets;
