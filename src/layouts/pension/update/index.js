import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { Container, Form } from "react-bootstrap";
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
import { useNavigate } from "react-router-dom";
import MDInput from "components/MDInput";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AllCountriesAndStates from "countries-states-master/countries";
import { Paper } from "@mui/material";
import MDButton from "components/MDButton";

function Pension() {
  const MySwal = withReactContent(Swal);
  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const [opened, setOpened] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [enabled, setEnabled] = useState(false);
  const [changes, setChanges] = useState({
    name: "",
    email: "",
    country: "",
    state: "",
    pno: "",
    address: "",
  });
  const [allStates, setAllStates] = useState([]);
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  const navigate = useNavigate();
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const headers = miHeaders;
    setOpened(true);
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/pensionProviders/getByIds/${id}`, { headers })
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
        setChanges(result[0]);
        const saa = result[0].state;
        if (saa !== null) {
          const filteredItemsc = AlCountry.filter((item) => item.name === result[0].country);
          setAllStates(filteredItemsc[0].states);
          setResidentialState(result[0].state);
          setResidentialCountry(result[0].country);
        }
        setOpened(false);
      });
  }, []);
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
  const handleOnChangeRCCountry = (e) => {
    const filteredItems = AlCountry.filter((item) => item.name === e.target.value);
    setAllStates(filteredItems[0].states);
    setResidentialCountry(e.target.value);
  };

  const handleOnChangeRCState = (e) => {
    setResidentialState(e.target.value);
  };
  const handleCreate = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      id: changes.id,
      orgID: orgIDs,
      name: changes.name,
      address: changes.address,
      city: changes.city,
      state: residentialStatex,
      country: residentialCountryx,
      pno: changes.pno,
      email: changes.email,
      createdTime: changes.createdTime,
      deleteFlag: changes.deleteFlag,
    });
    // console.log(enabled);
    if (handleOnNameKeys() && handleOnEmailKeys()) {
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/pensionProviders/update`, requestOptions)
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
            navigate("/Pension");
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
      <br />
      <MDBox mx={20} variant="gradient" bgColor="info">
        <Paper elevation={8}>
          <Card style={{ width: "700px", marginLeft: "13px" }}>
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
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Update Pension Provider
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
              </MDBox>
              <br />
              <MDBox p={2}>
                <Container>
                  <MDInput
                    type="text"
                    label="Name"
                    value={changes.name}
                    onKeyUp={handleOnNameKeys}
                    onChange={(e) => setChanges({ ...changes, name: e.target.value })}
                    variant="standard"
                    style={{ width: "400px" }}
                  />
                  <br />
                  <MDInput
                    type="text"
                    label="Email"
                    value={changes.email}
                    onKeyUp={handleOnEmailKeys}
                    onChange={(e) => setChanges({ ...changes, email: e.target.value })}
                    variant="standard"
                    style={{ width: "400px", marginTop: "12px" }}
                  />
                  <br />
                  <MDInput
                    type="text"
                    label="Address"
                    value={changes.address || ""}
                    //   onKeyUp={handleOnTitleKeys}
                    onChange={(e) => setChanges({ ...changes, address: e.target.value })}
                    variant="standard"
                    style={{ width: "400px", marginTop: "12px" }}
                  />
                  <br />
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
                    <MDInput
                      type="text"
                      label="City"
                      value={changes.city || ""}
                      //   onKeyUp={handleOnTitleKeys}
                      onChange={(e) => setChanges({ ...changes, city: e.target.value })}
                      variant="standard"
                      style={{ width: "200px", marginTop: "21px", marginLeft: "21px" }}
                    />
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
                    <MDButton variant="gradient" onClick={handleCreate} color="info" width="50%">
                      Update
                    </MDButton>
                  </MDBox>
                  <br />
                </Container>
              </MDBox>
            </MDBox>
          </Card>
        </Paper>
      </MDBox>
      <br />
      <br />
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default Pension;
