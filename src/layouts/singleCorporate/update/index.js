import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import AllCountriesAndStates from "countries-states-master/countries";

// import SingleCorporateTable from "./data";
// ZINOLEESKY

function UpdateSingleCorporate() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const [idx, setIdx] = useState("");
  const [namex, setName] = useState("");
  const [streetx, setStreet] = useState("");
  const [cityx, setCity] = useState("");
  //   const [statex, setState] = useState("");
  //   const [countryx, setCountry] = useState("");
  const [emailx, setEmail] = useState("");
  const [pnox, setPno] = useState("");
  const [yearOfEstablishmentx, setYearOfEstablishment] = useState("");
  const [twitterx, setTwitter] = useState("");
  const [facebookx, setFacebook] = useState("");
  const [instagramx, setInstagram] = useState("");
  const [linkedInx, setLinkedIn] = useState("");
  const [portfoliox, setPortfolio] = useState("");
  const [websitex, setWebsite] = useState("");
  const [industryx, setIndustry] = useState("");
  const [createdx, setCreatedx] = useState("");
  const [deletex, setDeletex] = useState("");
  // const [createdByx, setCreatedBy] = useState("");
  // const [accountOwnerIDx, setAccountOwnerID] = useState("");
  const [duty, setDutyRelieverx] = useState("");

  const [checkedName, setCheckedName] = useState("");
  const [checkedCity, setCheckedCity] = useState("");
  //   const [checkedState, setCheckedState] = useState("");
  //   const [checkedCountry, setCheckedCountry] = useState("");
  const [checkedPortfolio, setCheckedPortfolio] = useState("");

  const [allStates, setAllStates] = useState([]);
  const [items, setItems] = useState([]);
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  const [clientLevel, setClientLevel] = useState("");

  const { countriesAndStates: AlCountry } = AllCountriesAndStates();

  const [user, setUser] = useState([]);

  const [enabled, setEnabled] = useState("");
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

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
    setEnabled(checkedName === true);
  };
  const handleOnCityKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!cityx.match(letters)) {
      setCheckedCity(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "City - input only capital and small letters<br>";
    }
    if (cityx.match(letters)) {
      setCheckedCity(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "";
    }
    // if (cityx.length === 0) {
    //   // eslint-disable-next-line no-unused-expressions
    //   document.getElementById("city").innerHTML = "Name is required<br>";
    // }
    setEnabled(checkedCity === true);
  };
  //   const handleOnStateKeys = () => {
  //     const letters = /^[a-zA-Z ]+$/;
  //     if (!cityx.match(letters)) {
  //       setCheckedState(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("state").innerHTML =
  //         "State - input only capital and small letters<br>";
  //     }
  //     if (cityx.match(letters)) {
  //       setCheckedState(true);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("state").innerHTML = "";
  //     }
  //     // if (cityx.length === 0) {
  //     //   // eslint-disable-next-line no-unused-expressions
  //     //   document.getElementById("city").innerHTML = "Name is required<br>";
  //     // }
  //     setEnabled(checkedState === true);
  //   };
  //   const handleOnCountryKeys = () => {
  //     const letters = /^[a-zA-Z ]+$/;
  //     if (!countryx.match(letters)) {
  //       setCheckedCountry(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("country").innerHTML =
  //         "State - input only capital and small letters<br>";
  //     }
  //     if (countryx.match(letters)) {
  //       setCheckedCountry(true);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("country").innerHTML = "";
  //     }
  //     // if (cityx.length === 0) {
  //     //   // eslint-disable-next-line no-unused-expressions
  //     //   document.getElementById("city").innerHTML = "Name is required<br>";
  //     // }
  //     setEnabled(checkedCountry === true);
  //   };
  const handleOnEmailKeys = () => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    if (!emailx.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email - input a valid email<br>";
    }
    if (emailx.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (emailx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email is required<br>";
    }
  };
  const handleOnPortfolioKeys = () => {
    if (portfoliox.length === 0) {
      setCheckedPortfolio(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("portfolio").innerHTML = "A text is required<br>";
    } else {
      setCheckedPortfolio(true);
    }
    setEnabled(checkedPortfolio === true);
  };
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

  const handleUpdate = (e) => {
    handleOnNameKeys();
    if (enabled) {
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      const personalIDs = data11.personalID;
      const raw = JSON.stringify({
        id: idx,
        orgID: orgIDs,
        name: namex,
        street: streetx,
        city: cityx,
        state: residentialStatex,
        country: residentialCountryx,
        email: emailx,
        pno: pnox,
        yearOfEstablishment: yearOfEstablishmentx,
        twitter: twitterx,
        facebook: facebookx,
        instagram: instagramx,
        linkedIn: linkedInx,
        portfolio: portfoliox,
        website: websitex,
        industry: industryx,
        createdBy: personalIDs,
        accountOwnerID: duty,
        clientLevelID: clientLevel,
        createdTime: createdx,
        deleteFlag: deletex,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_LOUGA_URL}/corporate/update`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          // setOpened(false);
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
          // setOpened(false);
          MySwal.fire({
            title: error.status,
            type: "error",
            text: error.message,
          });
        });
    }
  };

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const ids = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/corporate/getByIds/${ids}`, {
      headers,
    })
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
        console.log(result);
        if (isMounted) {
          // eslint-disable-next-line eqeqeq
          if (result.length != 0) {
            setIdx(result[0].id);
            setName(result[0].name);
            setStreet(result[0].street);
            setCity(result[0].city);
            const filteredItems = AlCountry.filter((item) => item.name === result[0].country);
            setAllStates(filteredItems[0].states);
            setResidentialState(result[0].state);
            setResidentialCountry(result[0].country);
            setEmail(result[0].email);
            setPno(result[0].pno);
            setYearOfEstablishment(result[0].yearOfEstablishment);
            setTwitter(result[0].twitter);
            setFacebook(result[0].facebook);
            setInstagram(result[0].instagram);
            setLinkedIn(result[0].linkedIn);
            setPortfolio(result[0].portfolio);
            setWebsite(result[0].website);
            setIndustry(result[0].industry);
            setDutyRelieverx(result[0].accountOwnerID);
            setCreatedx(result[0].createdDate);
            setDeletex(result[0].deleteFlag);
            setClientLevel(result[0].clientLevel.id);
          } else {
            setIdx(null);
          }
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
    fetch(`${process.env.REACT_APP_LOUGA_URL}/clientLevels/gets/${orgIDs}`, { headers })
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

  const handleCheckYear = (e) => {
    const dateQ = new Date().getFullYear();
    if (yearOfEstablishmentx > dateQ) {
      MySwal.fire({
        title: "INVALID_DATE",
        type: "error",
        text: "Please input a valid date",
      });
    } else if (residentialStatex === 0) {
      MySwal.fire({
        title: "Empty_TextField",
        type: "error",
        text: "Please choose a state",
      });
    } else if (streetx === 0) {
      MySwal.fire({
        title: "Empty_TextField",
        type: "error",
        text: "Please choose a street",
      });
    } else {
      handleUpdate(e);
    }
  };

  const handleOnChangeRCCountry = (e) => {
    const filteredItems = AlCountry.filter((item) => item.name === e.target.value);
    setAllStates(filteredItems[0].states);
    setResidentialCountry(e.target.value);
  };

  const handleOnChangeRCState = (e) => {
    setResidentialState(e.target.value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Update Corporate
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="city">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="state">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="country">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="email">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={0}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={namex || ""}
                      onChange={(e) => setName(e.target.value)}
                      onKeyUp={handleOnNameKeys}
                      label="Name *"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={emailx || ""}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyUp={handleOnEmailKeys}
                      label="Email"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <br />
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Phone Number
                    </MDTypography>
                    <PhoneInput
                      value={pnox}
                      inputStyle={{ width: "100%" }}
                      buttonStyle={{}}
                      onChange={setPno}
                    />
                  </div>
                  <br />
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
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
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
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={streetx || ""}
                      // onChange={setIndustry}
                      onChange={(e) => setStreet(e.target.value)}
                      label="Street *"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <br />
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={cityx || ""}
                      onChange={(e) => setCity(e.target.value)}
                      onKeyUp={handleOnCityKeys}
                      label="City"
                      variant="standard"
                      fullWidth
                    />
                  </div>

                  <br />
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={twitterx || ""}
                      // onChange={setTwitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      label="Twitter"
                      variant="standard"
                      fullWidth
                    />
                    <MDTypography variant="h4" fontWeight="medium" fontSize="55%">
                      (Optional)
                    </MDTypography>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={facebookx || ""}
                      // onChange={setFacebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      label="Facebook"
                      variant="standard"
                      fullWidth
                    />
                    <MDTypography variant="h4" fontWeight="medium" fontSize="55%">
                      (Optional)
                    </MDTypography>
                  </div>

                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={instagramx || ""}
                      // onChange={setInstagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      label="Instagram"
                      variant="standard"
                      fullWidth
                    />
                    <MDTypography variant="h4" fontWeight="medium" fontSize="55%">
                      (Optional)
                    </MDTypography>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={linkedInx || ""}
                      // onChange={setLinkedIn}
                      onChange={(e) => setLinkedIn(e.target.value)}
                      label="Linkedin"
                      variant="standard"
                      fullWidth
                    />
                    <MDTypography variant="h4" fontWeight="medium" fontSize="55%">
                      (Optional)
                    </MDTypography>
                  </div>

                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={websitex || ""}
                      // onChange={setWebsite}
                      onChange={(e) => setWebsite(e.target.value)}
                      label="Website"
                      variant="standard"
                      fullWidth
                    />
                    <MDTypography variant="h4" fontWeight="medium" fontSize="55%">
                      (Optional)
                    </MDTypography>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                      <Form.Label style={{ fontSize: 14 }}>portfolio (optional)</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={portfoliox || ""}
                        onKeyUp={handleOnPortfolioKeys}
                        onChange={(e) => setPortfolio(e.target.value)}
                        rows={2}
                      />
                    </Form.Group>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDTypography
                      variant="p"
                      textAlign="center"
                      fontWeight="regular"
                      color="secondary"
                      fontSize="90%"
                    >
                      Industry
                    </MDTypography>
                    <MDBox>
                      <Form.Select
                        aria-label="Default select example"
                        value={industryx}
                        // textAlign="center"
                        onChange={(e) => setIndustry(e.target.value)}
                      >
                        <option>--Select Industry--</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Chemical Industry">Chemical Industry</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Construction">Construction</option>
                        <option value="Education">Education</option>
                        <option value="Financial Services">Financial Services</option>
                        <option value="Fisheries">Fisheries</option>
                        <option value="Food">Food</option>
                        <option value="Forestry">Forestry</option>
                        <option value="Health Services">Health Services</option>
                        <option value="Hotels">Hotels</option>
                        <option value="Metal Production">Metal Production</option>
                        <option value="Mining">Mining</option>
                        <option value="Mechanical and Electricitical Engineering">
                          Mechanical and Electrical Engineering
                        </option>
                        <option value="Media - Culture">Media - Culture</option>
                        <option value="Oil and Gas production">Oil and Gas production</option>
                        <option value="Postals and Telecommunication">
                          Postals and Telecommunication
                        </option>
                        <option value="Public Service">Public Service</option>
                        <option value="Shipping and Ports">Shipping and Ports</option>
                        <option value="Textiles"> Textiles, Clothing, Leather </option>
                        <option value="Transport: road, railways">
                          Transport (road, railways)
                        </option>
                        <option value="Transport Equipment Manufacturing">
                          Transport Equipment Manufacturing
                        </option>
                        <option value="utilities: water, gas, electricity">
                          Utilities:Water, Gas, Electricity
                        </option>
                      </Form.Select>
                    </MDBox>

                    {/* <MDInput
                      type="text"
                      value={industryx || ""}
                      // onChange={setIndustry}
                      onChange={(e) => setIndustry(e.target.value)}
                      label="Industry *"
                      variant="standard"
                      fullWidth
                    /> */}
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={yearOfEstablishmentx || ""}
                      // onChange={setYearOfEstablishment}
                      onChange={(e) => setYearOfEstablishment(e.target.value)}
                      label="Year Of Establishment"
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
                        Account Owner
                      </MDTypography>
                      <Form.Select
                        value={duty}
                        onChange={(e) => setDutyRelieverx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Select Account Owner</option>
                        {user.map((api) => (
                          <option key={api.personal.id} value={api.personal.id}>
                            {api.personal.fname} {api.personal.lname}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
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
                        Client Level
                      </MDTypography>
                      <Form.Select
                        value={clientLevel}
                        onChange={(e) => setClientLevel(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Select Client Level</option>
                        {items.map((api) => (
                          <option key={api.id} value={api.id}>
                            {api.name} ({api.descrip})
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={handleCheckYear} color="info" width="50%">
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default UpdateSingleCorporate;
