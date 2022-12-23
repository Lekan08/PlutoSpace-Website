/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import AssetsData from "layouts/assets/data";
import MDButton from "components/MDButton";
// import Card from "@mui/material/Card";
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
import Accordion from "react-bootstrap/Accordion";
import Paper from "@mui/material/Paper";
import Csv from "./csv";

function Assets() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = AssetsData();

  const navigate = useNavigate();

  const [itemx, setItem] = useState("");
  const [assetTypeIDx, setAssetTypeID] = useState("");
  const [showClients, setShowClients] = useState(false);
  const [clientx, setClient] = useState([]);
  const [clientTypex, setClientTypex] = useState("");
  const [clientIDx, setClientIDx] = useState("");
  const [itemsx, setItems] = useState([]);
  const [itemWorthx, setItemWorth] = useState("");
  const [itemWarrantyDatex, setItemWarrantyDate] = useState("");
  const [itemBoughtDatex, setItemBoughtDate] = useState("");
  const [getAllBranch, setGetAllBranch] = useState([]);
  const [branchx, setBranch] = useState("");
  const [serialNox, setSerialNo] = useState("");
  const [manufacturerx, setManufacturer] = useState("");
  const [user, setUser] = useState([]);
  const [assignedTox, setAssignedTo] = useState("");
  const [componentsx, setComponents] = useState("");
  const [newword, setNewword] = useState([]);

  const [checkedItem, setCheckedItem] = useState("");
  const [checkedItemWorth, setCheckedItemWorth] = useState("");
  // const [checkedManufacturer, setCheckedManufacturer] = useState("");
  const [opened, setOpened] = useState(false);

  const { allGHeaders: miHeaders } = GHeaders();
  const { allPHeaders: myHeaders } = PHeaders();

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
    if (value.match(letters)) {
      setCheckedItemWorth(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("itemWorth").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("itemWorth").innerHTML = "Rate is required<br>";
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
  //   if (value !== "") {
  //     if (value.match(letters)) {
  //       setCheckedManufacturer(true);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("manufacturer").innerHTML = "";
  //     }
  //   }
  // };

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

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const idx = data11.personalID;
    const boughtDate = new Date(itemBoughtDatex).getTime();
    const warrantyDate = new Date(itemWarrantyDatex).getTime();
    if (warrantyDate < boughtDate) {
      MySwal.fire({
        title: "Invalid Date",
        type: "error",
        text: "Please Enter A Date From The Future",
      });
    } else {
      const raw = JSON.stringify({
        orgID: orgIDs,
        item: itemx,
        clientType: clientTypex,
        clientID: clientIDx,
        assetTypeID: assetTypeIDx,
        itemWorth: itemWorthx,
        createdBy: idx,
        itemBoughtDate: boughtDate,
        itemWarrantyDate: warrantyDate,
        branchID: branchx,
        serialNumber: serialNox,
        manufacturer: manufacturerx,
        components: newword,
        assignedTo: assignedTox,
      });
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/assets/add`, requestOptions)
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
    }
  };

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

  const handleValidate = (e) => {
    if (checkedItem && checkedItemWorth === true) {
      handleClick(e);
    }
  };

  const handleOnValidateClient = (e) => {
    if (clientTypex === "") {
      if (clientIDx === "") {
        handleValidate(e);
      }
    }
    if (clientTypex !== "") {
      if (clientIDx !== "") {
        handleValidate(e);
      }
    }
    if (clientTypex !== "") {
      if (clientIDx === "") {
        MySwal.fire({
          title: "Cannot Complete Requests",
          type: "error",
          text: "If a Client Type is selected, you should select a Client",
        });
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="1">
          <Accordion.Header>Add Single Individual Client</Accordion.Header>
          <Accordion.Body>
            <Paper elevation={3}>
              <br />
              <MDBox pt={4} pb={3} px={30}>
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
                    Assets
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
                  <MDTypography variant="gradient" fontSize="60%" color="error" id="manufacturer">
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
                            label="Item *"
                            value={itemx || ""}
                            onKeyUp={(e) => handleOnItemKeys(e.target.value)}
                            onChange={(e) => setItem(e.target.value)}
                            variant="standard"
                            fullWidth
                          />
                        </div>
                        <div className="col-sm-6">
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
                              onChange={(e) => setAssetTypeID(e.target.value)}
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
                        </div>
                      </div>
                    </Container>
                  </MDBox>
                  <MDBox>
                    <Container>
                      <div className="row">
                        <div className="col-sm-6">
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
                        </div>
                        <div className="col-sm-6">
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
                        </div>
                      </div>
                    </Container>
                  </MDBox>
                  <MDBox mb={2}>
                    <Container>
                      <div className="row">
                        <div className="col-sm-6">
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
                        </div>
                        <div className="col-sm-6">
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
                        </div>
                      </div>
                    </Container>
                  </MDBox>
                  <MDBox>
                    <Container>
                      <div className="row">
                        <div className="col-sm-6">
                          <Box sx={{ minWidth: 100 }}>
                            <FormControl fullWidth>
                              <TextField
                                id="filled-number"
                                value={serialNox}
                                label="Serial Number *"
                                placeholder="Serial Number"
                                type="number"
                                size="small"
                                name="Serial Number*"
                                onChange={(e) => setSerialNo(e.target.value)}
                              />
                            </FormControl>
                          </Box>
                        </div>
                        <div className="col-sm-6">
                          <MDInput
                            type="text"
                            label="Manufacturer"
                            value={manufacturerx || ""}
                            // onKeyUp={(e) => handleOnManfacturerKeys(e.target.value)}
                            onChange={(e) => setManufacturer(e.target.value)}
                            variant="standard"
                            fullWidth
                          />
                        </div>
                      </div>
                    </Container>
                  </MDBox>
                  <MDBox>
                    <Container>
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
                        </div>
                      </div>
                    </Container>
                  </MDBox>
                  &nbsp; &nbsp;
                  <MDBox>
                    <Container>
                      <div className="row">
                        <div className="col-sm-6">
                          <MDBox>
                            <Form.Select
                              value={assignedTox}
                              aria-label="Default select example"
                              name="branchID"
                              onChange={(e) => setAssignedTo(e.target.value)}
                            >
                              <option>--Assigned To--</option>
                              {user.map((apis) => (
                                <option key={apis.personal.id} value={apis.personal.id}>
                                  {apis.personal.fname} {apis.personal.lname}
                                </option>
                              ))}
                            </Form.Select>
                          </MDBox>
                        </div>
                        <div className="col-sm-6">
                          <MDTypography
                            variant="p"
                            fontWeight="regular"
                            color="secondary"
                            fontSize="90%"
                          >
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
                                <Chip
                                  size="small"
                                  label={item}
                                  color="success"
                                  variant="outlined"
                                />
                                &nbsp;
                              </React.Fragment>
                            ))}
                            <br /> <br />
                          </MDTypography>
                        </div>
                      </div>
                    </Container>
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      onClick={handleOnValidateClient}
                      style={Styles.buttonSx}
                      width="50%"
                    >
                      Save
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Paper>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Csv />
      <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: pRows }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default Assets;
