/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
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

function UpdateSingleIndividual() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [idz, setIdz] = useState("");
  const [labelz, setLabelz] = useState("");
  const [idxx, setIdxx] = useState("");
  const [idx, setIdx] = useState("");
  const [namex, setName] = useState("");
  const [lnamex, setLnamex] = useState("");
  const [titlex, setTitlex] = useState("");
  const [onamex, setOnamex] = useState("");
  const [streetx, setStreet] = useState("");
  const [cityx, setCity] = useState("");
  // const [statex, setState] = useState("");
  const [items, setItems] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");

  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      width: "300px",
      borderBottom: "1px dotted pink",
      color: "black",
      padding: 0,
      fontSize: 15,
      marginLeft: 60,
      marginTop: 0,
    }),
  };
  const [emailx, setEmail] = useState("");
  const [pnox, setPno] = useState("");
  const [twitterx, setTwitter] = useState("");
  const [facebookx, setFacebook] = useState("");
  const [instagramx, setInstagram] = useState("");
  const [linkedInx, setLinkedIn] = useState("");
  const [portfoliox, setPortfolio] = useState("");
  const [websitex, setWebsite] = useState("");
  const [industryx, setIndustryx] = useState("");
  const [maritalx, setMaritalx] = useState("");
  const [corporateID, setCorporateID] = useState([]);
  const options = corporateID.map((d) => ({
    value: d.id,
    label: d.name,
  }));
  options.unshift({ value: "", label: "None" });
  // eslint-disable-next-line no-unused-vars
  const [day, setDay] = useState("");
  const [startDate, setStartDate] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [month, setMonth] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [year, setYear] = useState("");
  const [createdt, setCreatedt] = useState("");
  const [imageUrlx, setImageUrlx] = useState("");
  const [imageKeyx, setImageKeyx] = useState("");
  const [deletex, setDeletex] = useState("");
  const [occupationx, setOccupationx] = useState("");
  // const [createdByx, setCreatedBy] = useState("");
  // const [accountOwnerIDx, setAccountOwnerID] = useState("");
  const [duty, setDutyRelieverx] = useState("");

  const [checkedName, setCheckedName] = useState("");
  const [checkedCity, setCheckedCity] = useState("");
  // const [checkedState, setCheckedState] = useState("");
  // const [checkedCountry, setCheckedCountry] = useState("");
  const [checkedPortfolio, setCheckedPortfolio] = useState("");
  const [clientLevel, setClientLevel] = useState("");

  const [user, setUser] = useState([]);

  const [enabled, setEnabled] = useState("");
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const ids = data11.id;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    setOpened(true);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/getByIds/${ids}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        console.log(result);
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
            setOpened(true);
            const da = result[0].dayOfBirth;
            const ma = result[0].monthOfBirth;
            const ya = result[0].yearOfBirth;
            // console.log(`${da}/${ma}/${ya}`);
            const dantex = `"${ma}/${da}/${ya}"`;
            const dx = new Date(dantex);
            console.log(dantex);
            console.log(dx);
            if (dantex === `"0/0/0"`) {
              setStartDate(new Date());
            } else {
              setStartDate(dx);
            }
            // setStartDate(dx);
            // setDay(result[0].dayOfBirth);
            // setMonth(result[0].monthOfBirth);
            // setYear(result[0].yearOfBirth);
            setOpened(false);
            // console.log(day);
            // const dt = new Date(daten);
            // console.log(dt);
            // result.map((idk) =>
            //   setDaten(`"${idk.dayOfBirth}/${idk.monthOfBirth}/${idk.yearOfBirth}"`)
            // );
            if (result[0].corporateName === "") {
              setLabelz("None");
            } else {
              setLabelz(result[0].corporateName);
            }
            setIdz(result[0].corporateID);
            console.log(labelz);
            const x = JSON.stringify(result[0].corporateID);
            setIdx(result[0].id);
            setName(result[0].fname);
            setLnamex(result[0].lname);
            setOnamex(result[0].oname);
            setTitlex(result[0].title);
            setStreet(result[0].street);
            setCity(result[0].city);
            const saa = result[0].state;
            if (saa !== null) {
              const filteredItemsc = AlCountry.filter((item) => item.name === result[0].country);
              setAllStates(filteredItemsc[0].states);
              setResidentialState(result[0].state);
              setResidentialCountry(result[0].country);
            }
            setEmail(result[0].email);
            setPno(result[0].pno);
            setTwitter(result[0].twitter);
            setFacebook(result[0].facebook);
            setInstagram(result[0].instagram);
            setLinkedIn(result[0].linkedIn);
            setPortfolio(result[0].portfolio);
            setWebsite(result[0].website);
            setIndustryx(result[0].industry);
            setMaritalx(result[0].maritalStatus);
            setOccupationx(result[0].occupation);
            setDutyRelieverx(result[0].accountOwnerID);
            setDeletex(result[0].deleteFlag);
            setCreatedt(result[0].createdTime);
            setImageUrlx(result[0].imageUrl);
            setImageKeyx(result[0].imageKey);
            setIdxx(result[0].corporateID);
            setClientLevel(result[0].clientLevel.id);
            console.log(x);
            console.log(idxx);
            setOpened(false);
          } else {
            setIdx(null);
          }
        }
      });
    fetch(`${process.env.REACT_APP_LOUGA_URL}/corporate/gets/${orgIDs}`, { headers })
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
          setCorporateID(result);
        }
      });
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
    console.log(enabled);
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
  // const handleOnStateKeys = () => {
  //   const letters = /^[a-zA-Z ]+$/;
  //   if (!cityx.match(letters)) {
  //     setCheckedState(false);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("state").innerHTML =
  //       "State - input only capital and small letters<br>";
  //   }
  //   if (cityx.match(letters)) {
  //     setCheckedState(true);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("state").innerHTML = "";
  //   }
  //   // if (cityx.length === 0) {
  //   //   // eslint-disable-next-line no-unused-expressions
  //   //   document.getElementById("city").innerHTML = "Name is required<br>";
  //   // }
  //   setEnabled(checkedState === true);
  // };
  // const handleOnCountryKeys = () => {
  //   const letters = /^[a-zA-Z ]+$/;
  //   if (!countryx.match(letters)) {
  //     setCheckedCountry(false);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("country").innerHTML =
  //       "State - input only capital and small letters<br>";
  //   }
  //   if (countryx.match(letters)) {
  //     setCheckedCountry(true);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("country").innerHTML = "";
  //   }
  //   // if (cityx.length === 0) {
  //   //   // eslint-disable-next-line no-unused-expressions
  //   //   document.getElementById("city").innerHTML = "Name is required<br>";
  //   // }
  //   setEnabled(checkedCountry === true);
  // };
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
      setCheckedName(true);
    }
    setEnabled(checkedPortfolio === true);
  };

  const handleUpdate = (e) => {
    let dayx = "";
    let monthx = "";
    let yearx = "";
    if (startDate != null) {
      dayx = startDate.getDate();
      monthx = startDate.getMonth() + 1;
      yearx = startDate.getFullYear();
    } else {
      dayx = 0;
      monthx = 0;
      yearx = 0;
    }
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      fname: namex,
      lname: lnamex,
      oname: onamex,
      title: titlex,
      street: streetx,
      city: cityx,
      state: residentialStatex,
      country: residentialCountryx,
      email: emailx,
      pno: pnox,
      dayOfBirth: dayx,
      monthOfBirth: monthx,
      yearOfBirth: yearx,
      twitter: twitterx,
      facebook: facebookx,
      imageUrl: imageUrlx,
      imageKey: imageKeyx,
      instagram: instagramx,
      linkedIn: linkedInx,
      portfolio: portfoliox,
      website: websitex,
      occupation: occupationx,
      maritalStatus: maritalx,
      corporateID: idz,
      industry: industryx,
      createdBy: personalIDs,
      clientLevelID: clientLevel,
      accountOwnerID: duty,
      createdTime: createdt,
      deleteFlag: deletex,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/update`, requestOptions)
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
          navigate(`/Individual`);
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
  };

  const handleChanges = (selectedOption) => {
    // this.setState({ selectedOption });
    setIdz(selectedOption.value);
    setLabelz(selectedOption.label);
    console.log(`Option selected:`, selectedOption);
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
        <MDBox pt={4} pb={3} px={30}>
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
              Update Individual
            </MDTypography>
          </MDBox>
          <MDBox
            variant="gradient"
            bgColor="error"
            borderRadius="lg"
            coloredShadow="success"
            mx={3}
            mt={1}
            p={1}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="gradient" fontSize="60%" color="white" id="name">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="city">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="state">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="country">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="email">
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
                      label="First Name"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={lnamex || ""}
                      onChange={(e) => setLnamex(e.target.value)}
                      onKeyUp={handleOnNameKeys}
                      label="Last Name"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={onamex || ""}
                      onChange={(e) => setOnamex(e.target.value)}
                      onKeyUp={handleOnNameKeys}
                      label="Other Name"
                      variant="standard"
                      fullWidth
                    />

                    <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-10">
                    <MDBox textAlign="center">
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
                        color="text"
                      >
                        Title
                      </MDTypography>
                      <Form.Select
                        value={titlex}
                        onChange={(e) => setTitlex(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">--Select Title--</option>
                        <option value="Bishop">Bishop</option>
                        <option value="Chancellor">Chancellor</option>
                        <option value="Comrade">Comrade</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Engineer">Engineer</option>
                        <option value="Excellency">Excellency</option>
                        <option value="Honorable">Honorable</option>
                        <option value="Imam">Imam</option>
                        <option value="Master">Master</option>
                        <option value="Miss">Miss</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Reverend">Reverend</option>
                        <option value="Pastor">Pastor</option>
                        <option value="Professor">Professor</option>
                        <option value="Pope">Pope</option>
                        <option value="Vice-Chancellor">Vice-Chancellor</option>
                        <option value="Other">Others...</option>
                      </Form.Select>
                    </MDBox>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={streetx || ""}
                      onChange={(e) => setStreet(e.target.value)}
                      label="Street"
                      variant="standard"
                      fullWidth
                    />

                    <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                  </div>
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

                      <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
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

                      <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                    </div>
                  </div>
                </div>
              </Container>
            </MDBox>
            <br />
            <MDBox>
              <Container>
                <div className="row">
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

                    <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                  </div>

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

                    <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                  </div>
                </div>
                <br />
                <MDBox textAlign="center">
                  <MDTypography variant="h4" fontWeight="medium" fontSize="55%">
                    Date Of Birth
                  </MDTypography>
                  <DatePicker
                    date={startDate}
                    wrapperClassName="date-picker"
                    placeholder="Select Birth Date"
                    dateFormat="MM/dd/yyyy"
                    confirmBtnText="Confirm"
                    showCancelButton="true"
                    customStyles={{
                      placeholderText: {
                        fontSize: 5,
                      },
                      dateIcon: {
                        height: 0,
                        width: 0,
                      },
                      dateText: {
                        color: "#b3b4b5",
                        fontSize: 16,
                      },
                      dateInput: {
                        borderWidth: 0,
                      },
                    }}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                  <br />

                  <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                </MDBox>
              </Container>
            </MDBox>
            <br />
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={twitterx || ""}
                      onChange={(e) => setTwitter(e.target.value)}
                      label="Twitter"
                      variant="standard"
                      fullWidth
                    />
                    <MDTypography variant="h4" fontWeight="light" fontSize="55%">
                      (Optional)
                    </MDTypography>
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={facebookx || ""}
                      onChange={(e) => setFacebook(e.target.value)}
                      label="Facebook"
                      variant="standard"
                      fullWidth
                    />
                    <MDTypography variant="h4" fontWeight="light" fontSize="55%">
                      (Optional)
                    </MDTypography>
                  </div>

                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={instagramx || ""}
                      onChange={(e) => setInstagram(e.target.value)}
                      label="Instagram"
                      variant="standard"
                      fullWidth
                    />
                    <MDTypography variant="h4" fontWeight="light" fontSize="55%">
                      (Optional)
                    </MDTypography>
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={linkedInx || ""}
                      onChange={(e) => setLinkedIn(e.target.value)}
                      label="Linkedin"
                      variant="standard"
                      fullWidth
                    />
                    <MDTypography variant="h4" fontWeight="light" fontSize="55%">
                      (Optional)
                    </MDTypography>
                  </div>
                </div>
              </Container>
            </MDBox>
            <div className="row">
              <Container>
                <div className="col-sm-10">
                  <Container>
                    <MDInput
                      type="text"
                      value={websitex || ""}
                      onChange={(e) => setWebsite(e.target.value)}
                      label="Website"
                      variant="standard"
                      fullWidth
                    />
                    <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                  </Container>
                </div>
              </Container>
            </div>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                      <Form.Label style={{ fontSize: 14 }}>Portfolio</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={portfoliox || ""}
                        onKeyUp={handleOnPortfolioKeys}
                        onChange={(e) => setPortfolio(e.target.value)}
                        rows={2}
                      />
                    </Form.Group>

                    <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
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
                      value={occupationx || ""}
                      onChange={(e) => setOccupationx(e.target.value)}
                      label="Occupation"
                      variant="standard"
                      fullWidth
                    />

                    <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                  </div>
                  <div className="col-sm-6">
                    <MDBox textAlign="center">
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
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
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox textAlign="center" align="center">
              <Container>
                <div className="row">
                  <MDBox mt={4}>
                    <MDBox textAlign="center">
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
                        color="text"
                      >
                        Marital Status
                      </MDTypography>
                      <Form.Select
                        value={maritalx}
                        onChange={(e) => setMaritalx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </Form.Select>
                    </MDBox>
                  </MDBox>

                  <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                </div>
              </Container>
              <Container>
                <div className="row">
                  <MDBox mt={4}>
                    <MDBox textAlign="center">
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
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
                    </MDBox>
                  </MDBox>
                </div>
                <br />
              </Container>
              <Container>
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  fontSize="80%"
                  textAlign="center"
                  color="text"
                >
                  Corporate Name
                </MDTypography>
                <Select
                  // value={options.filter((option) => option.label === "Some label")}
                  options={options}
                  styles={customStyles}
                  onChange={handleChanges}
                  value={{
                    label: labelz,
                    value: idz,
                  }}
                  // defaultValue={{
                  //   label: labelz,
                  // }}
                />

                <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1} textAlign="center">
              <MDButton variant="gradient" onClick={handleUpdate} color="info" width="50%">
                Update
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default UpdateSingleIndividual;
