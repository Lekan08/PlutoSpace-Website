import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { Accordion, Container, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import Styles from "styles";
import { useNavigate } from "react-router-dom";
import MDInput from "components/MDInput";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AllCountriesAndStates from "countries-states-master/countries";
import { TextField } from "@mui/material";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import PensionProviderz from "./data";
import UserPension from "./usersPensionIntegration";
import "./Css.css";

function Pension() {
  const { columns: pColumns, rows: pRows } = PensionProviderz();
  const { columns: peColumns, rows: peRows } = UserPension();
  const MySwal = withReactContent(Swal);
  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const [opened, setOpened] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [changes, setChanges] = useState({
    name: "",
    email: "",
    country: "",
    state: "",
    pno: "",
    address: "",
  });
  const [pensionSettings, setPensionSettings] = useState(0);
  const [allStates, setAllStates] = useState([]);
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  const navigate = useNavigate();
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    setOpened(true);
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/pensionSetting/get/${orgIDs}`, { headers })
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
        if (result.amount) {
          setPensionSettings(result.amount);
        } else {
          setPensionSettings(0);
          console.log("not set");
        }
        setOpened(false);
      });
  }, []);
  const handleOnChangeRCCountry = (e) => {
    const filteredItems = AlCountry.filter((item) => item.name === e.target.value);
    setAllStates(filteredItems[0].states);
    setResidentialCountry(e.target.value);
  };

  const handleOnChangeRCState = (e) => {
    setResidentialState(e.target.value);
  };
  const handleOnNameKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!changes.name.match(letters)) {
      setEnabled(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
      return false;
    }
    if (changes.name.match(letters)) {
      setEnabled(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
      return true;
    }
    if (changes.name.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name is required<br>";
      setEnabled(false);
      return false;
    }
    return null;
  };
  const handleOnEmailKeys = () => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    if (!changes.email.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email - input a valid email<br>";
      setEnabled(false);
      return false;
    }
    if (changes.email.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
      setEnabled(true);
      return true;
    }
    if (changes.email.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email is required<br>";
      setEnabled(false);
      return false;
    }
    return null;
  };
  const handleCreate = () => {
    handleOnNameKeys();
    handleOnEmailKeys();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      name: changes.name,
      address: changes.address,
      city: changes.city,
      state: residentialStatex,
      country: residentialCountryx,
      pno: changes.pno,
      email: changes.email,
    });
    if (enabled && handleOnNameKeys() && handleOnEmailKeys()) {
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/pensionProviders/add`, requestOptions)
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

  const handleSave = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      amount: Number(pensionSettings),
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/pensionSetting/save`, requestOptions)
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
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <MDBox mx={0}>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <h4 className="center">Pension Providers</h4>
            </Accordion.Header>
            <Accordion.Body>
              <MDBox textAlign="center" fontSize="100%">
                <br />
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
                </MDBox>
                <br />
                <MDBox p={2} textAlign="center">
                  <Container>
                    <div className="row">
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Name"
                          value={changes.name}
                          onKeyUp={handleOnNameKeys}
                          onChange={(e) => setChanges({ ...changes, name: e.target.value })}
                          variant="standard"
                          style={{ width: "390px" }}
                        />
                      </div>
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Email"
                          value={changes.email}
                          onKeyUp={handleOnEmailKeys}
                          onChange={(e) => setChanges({ ...changes, email: e.target.value })}
                          variant="standard"
                          style={{ width: "390px" }}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-sm-6">
                        <MDTypography variant="button" fontWeight="regular" color="text">
                          Phone Number
                        </MDTypography>
                        <PhoneInput
                          value={changes.pno}
                          inputStyle={{ width: "100%" }}
                          buttonStyle={{}}
                          onChange={(e) => setChanges({ ...changes, pno: e })}
                        />
                      </div>
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="City"
                          value={changes.city || ""}
                          //   onKeyUp={handleOnTitleKeys}
                          onChange={(e) => setChanges({ ...changes, city: e.target.value })}
                          variant="standard"
                          style={{ width: "390px", marginTop: "21px" }}
                        />
                      </div>
                    </div>

                    <br />
                    <div className="row">
                      <div className="col-sm-6">
                        <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                          Country
                        </MDTypography>
                        <MDBox textAlign="right">
                          <Form.Select
                            value={residentialCountryx || ""}
                            aria-label="Default select example"
                            onChange={handleOnChangeRCCountry}
                          >
                            <option>--Select Country--</option>
                            {AlCountry.map((apic) => (
                              <option key={apic.code3} value={apic.name}>
                                {apic.name}
                              </option>
                            ))}
                          </Form.Select>
                        </MDBox>
                      </div>
                      <div className="col-sm-6">
                        <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                          State
                        </MDTypography>
                        <MDBox textAlign="right">
                          <Form.Select
                            value={residentialStatex || ""}
                            aria-label="Default select example"
                            onChange={handleOnChangeRCState}
                          >
                            <option>--Select State--</option>
                            {allStates.map((apis) => (
                              <option key={apis.code} value={apis.name}>
                                {apis.name}
                              </option>
                            ))}
                          </Form.Select>
                        </MDBox>
                      </div>
                    </div>
                    <br />
                    <MDBox mt={4} mb={1} textAlign="center">
                      <MDButton
                        variant="gradient"
                        onClick={handleCreate}
                        // color="info"
                        style={Styles.buttonSx}
                        width="50%"
                      >
                        Add
                      </MDButton>
                    </MDBox>
                    <br />
                    <hr />
                    <br />
                    <MDTypography variant="gradient" fontSize="60%">
                      Pension Providers
                    </MDTypography>
                    <MDBox pt={0}>
                      <DataTable
                        table={{ columns: pColumns, rows: pRows }}
                        isSorted
                        entriesPerPage
                        showTotalEntries
                        noEndBorder
                        canSearch
                      />
                    </MDBox>
                  </Container>
                </MDBox>
              </MDBox>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <h4 className="center">Company Pension Amount</h4>
            </Accordion.Header>
            <Accordion.Body>
              <MDBox textAlign="center" fontSize="80%">
                <MDBox mx={20} variant="gradient" ml={30}>
                  <Card style={{ width: "501px", marginLeft: "0px" }}>
                    <MDBox component="form" role="form" mx={10}>
                      <MDBox
                        variant="gradient"
                        bgColor="info"
                        borderRadius="lg"
                        coloredShadow="info"
                        mx={0}
                        mt={2}
                        p={1}
                        mb={0}
                        textAlign="center"
                      >
                        <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                          Pension Percentage
                        </MDTypography>
                      </MDBox>
                      <MDBox p={2} textAlign="center">
                        <Container>
                          <MDTypography variant="h6" fontWeight="medium" mt={3} mb={-3}>
                            Amount
                          </MDTypography>
                          <br />
                          <TextField
                            label=" "
                            type="number"
                            // endAdornment={<InputAdornment position="end">%</InputAdornment>}
                            value={pensionSettings}
                            style={{ width: "80px" }}
                            onChange={(e) => setPensionSettings(e.target.value)}
                          />
                          &nbsp;<b className="upp">%</b>
                          <br />
                          <MDBox mt={4} mb={1} textAlign="center">
                            <MDButton
                              variant="gradient"
                              color="info"
                              width="50%"
                              onClick={handleSave}
                            >
                              Save
                            </MDButton>
                          </MDBox>
                        </Container>
                      </MDBox>
                    </MDBox>
                  </Card>
                </MDBox>
              </MDBox>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <h4 className="center">Pension Integration</h4>
            </Accordion.Header>
            <Accordion.Body>
              <MDBox textAlign="center" fontSize="80%">
                <hr />
                <br />
                <MDTypography variant="gradient" fontSize="80%">
                  Employees And Their Pension Providers
                </MDTypography>
                <Card>
                  <MDBox pt={0}>
                    <DataTable
                      table={{ columns: peColumns, rows: peRows }}
                      isSorted
                      entriesPerPage
                      showTotalEntries
                      noEndBorder
                      canSearch
                    />
                  </MDBox>
                </Card>
              </MDBox>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </MDBox>
      <br />
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default Pension;
