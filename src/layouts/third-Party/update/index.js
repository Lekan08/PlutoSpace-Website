import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
import AllCountriesAndStates from "countries-states-master/countries";
import TextField from "@mui/material/TextField";

// eslint-disable-next-line react/prop-types
function UpdateThirdParty({ updateValue }) {
  const { allGHeaders: miHeaders } = GHeaders();
  const MySwal = withReactContent(Swal);
  // const { columns: pColumns, rows: pRows } = taxData();

  const [namex, setNamex] = useState("");
  const [Ucountryx, setUcountryx] = useState("");
  const [idx, setID] = useState("");
  const [uCreatedTimex, setCreatedTimex] = useState();
  const [UDeleteFlagx, setDeleteflagx] = useState();
  const [uOrgIDx, setOrgIDx] = useState("");
  const [UphoneNumberx, setUPhoneNumberx] = useState("");
  const [Uemailx, setUemailx] = useState("");
  const [Utypex, setUtypex] = useState("");
  const [Ustreetx, setUstreetx] = useState("");
  const [Ucityx, setUcityx] = useState("");
  const [Ustatex, setUstatex] = useState("");
  const [UallStates, setUAllStates] = useState([]);

  const [UcheckedName, UsetCheckedName] = useState(false);
  const [UcheckedCountry, UsetCheckedCountry] = useState(false);
  const [UcheckedCity, UsetCheckedCity] = useState(false);
  const [UcheckedEmail, UsetCheckedEmail] = useState(false);
  const [UcheckedStreet, UsetCheckedStreet] = useState(false);
  const [UcheckedPhoneNumber, UsetCheckedPhoneNumber] = useState(false);
  const [UcheckedType, setUCheckedType] = useState(false);
  const [UcheckedState, setUCheckedState] = useState(false);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { countriesAndStates: UAlCountry } = AllCountriesAndStates();

  // eslint-disable-next-line consistent-return
  const UhandleName = (valuex) => {
    setNamex(valuex);

    if (!valuex) {
      UsetCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name cannot be empty <br>";
    }
    if (valuex) {
      UsetCheckedName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = " ";
    }
  };

  const handleUOnChangeRCCountry = (e) => {
    const filteredItems = UAlCountry.filter((item) => item.name === e.target.value);
    setUAllStates(filteredItems[0].states);
    setUcountryx(e.target.value);
  };

  const UhandlePhoneNumber = (valuex) => {
    setUPhoneNumberx(valuex);

    if (!valuex) {
      UsetCheckedPhoneNumber(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("phoneNumber").innerHTML = "Input your Phone Number <br>";
    }
    if (valuex) {
      UsetCheckedPhoneNumber(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("phoneNumber").innerHTML = " ";
    }
  };

  const UhandleOnCountrySelect = (valuex) => {
    if (!valuex) {
      UsetCheckedCountry(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("country").innerHTML = "Select your Country<br>";
    }
    if (valuex) {
      UsetCheckedCountry(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("country").innerHTML = " ";
    }
  };

  const UhandleCity = (valuex) => {
    setUcityx(valuex);

    if (!valuex) {
      UsetCheckedCity(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "CIty cannot be empty <br>";
    }
    if (valuex) {
      UsetCheckedCity(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = " ";
    }
  };

  const UhandleStateSelect = (valuex) => {
    setUstatex(valuex);
    if (!valuex) {
      setUCheckedState(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("state").innerHTML = "Select your State<br>";
    }
    if (valuex) {
      setUCheckedState(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("state").innerHTML = " ";
    }
  };

  const UhandleStreet = (valuex) => {
    setUstreetx(valuex);

    if (!valuex) {
      UsetCheckedStreet(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Street cannot be empty <br>";
    }
    if (valuex) {
      UsetCheckedStreet(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = " ";
    }
  };

  const UhandleEmailSelect = (valuex) => {
    setUemailx(valuex);
    if (!valuex) {
      UsetCheckedEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Input an Email<br>";
    }
    if (valuex) {
      UsetCheckedEmail(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = " ";
    }
  };

  const UhandleOnChangeRCState = (e) => {
    setUstatex(e.target.value);
  };

  const UhandleType = (valuex) => {
    setUtypex(valuex);

    if (!valuex) {
      setUCheckedType(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("type").innerHTML = "Select Type <br>";
    }
    if (valuex) {
      setUCheckedType(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("type").innerHTML = " ";
    }
  };

  // eslint-disable-next-line consistent-return
  const handleUClick = (e) => {
    e.preventDefault();
    const raw = JSON.stringify({
      id: idx,
      orgID: uOrgIDx,
      name: namex,
      pno: UphoneNumberx,
      email: Uemailx,
      type: Utypex,
      street: Ustreetx,
      city: Ucityx,
      state: Ustatex,
      country: Ucountryx,
      createdTime: uCreatedTimex,
      deleteFlag: UDeleteFlagx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_LOUGA_URL}/thirdParty/update`, requestOptions)
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
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          window.location.reload();
        });
        console.log(result);
      })
      .catch((error) => {
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  useEffect(() => {
    const headers = miHeaders;
    let isMounted = true;
    console.log(updateValue);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/thirdParty/getByIds/${updateValue}`, { headers })
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
          console.log(result);
          setNamex(result[0].name);
          setOrgIDx(result[0].orgID);
          setUcityx(result[0].city);
          setID(result[0].id);
          setCreatedTimex(result[0].createdTime);
          setDeleteflagx(result[0].deleteFlag);
          setUtypex(result[0].type);
          setUPhoneNumberx(result[0].pno);
          setUemailx(result[0].email);
          setUcountryx(result[0].country);
          setUstreetx(result[0].street);
          setUstatex(result[0].state);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUValidate = (e) => {
    if (
      UcheckedCountry &&
      UcheckedName &&
      UcheckedCity &&
      UcheckedEmail &&
      UcheckedStreet &&
      UcheckedPhoneNumber &&
      UcheckedType &&
      UcheckedState === true
    ) {
      handleUClick(e);
    }
  };

  useEffect(() => {
    UhandleName(namex);
    // handleOnWorkflowIDx(workflowIDx);
  }, [namex]);
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
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
          Update Third Party
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
        mb={3}
        textAlign="center"
      >
        <MDTypography variant="gradient" fontSize="60%" color="white" id="name">
          {" "}
        </MDTypography>
        <MDTypography variant="gradient" fontSize="60%" color="white" id="phoneNumber">
          {" "}
        </MDTypography>
        <MDTypography variant="gradient" fontSize="60%" color="white" id="email">
          {" "}
        </MDTypography>
        <MDTypography variant="gradient" fontSize="60%" color="white" id="country">
          {" "}
        </MDTypography>
        <MDTypography variant="gradient" fontSize="60%" color="white" id="state">
          {" "}
        </MDTypography>
        <MDTypography variant="gradient" fontSize="60%" color="white" id="city">
          {" "}
        </MDTypography>
        <MDTypography variant="gradient" fontSize="60%" color="white" id="street">
          {" "}
        </MDTypography>
        <MDTypography variant="gradient" fontSize="60%" color="white" id="type">
          {" "}
        </MDTypography>
      </MDBox>
      <MDBox component="form" role="form">
        <MDBox mb={2}>
          <Container>
            <div className="row">
              <div className="col-sm-12">
                <TextField
                  id="outlined-textarea"
                  value={namex || ""}
                  label="Name "
                  placeholder="Name "
                  onKeyUp={(e) => UhandleName(e.target.value)}
                  sx={{
                    width: 684,
                  }}
                  multiline
                  required
                />
              </div>
            </div>
            &nbsp; &nbsp;
            <div className="row">
              <div className="col-sm-4">
                <TextField
                  label=" Phone Number "
                  type="number"
                  sx={{
                    width: 330,
                  }}
                  value={UphoneNumberx}
                  onChange={(e) => UhandlePhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="col-sm-2">
                <></>
              </div>
              <div className="col-sm-6">
                <TextField
                  label=" Email "
                  placeholder="Email "
                  type="email"
                  sx={{
                    width: 333,
                  }}
                  value={Uemailx}
                  onChange={(e) => UhandleEmailSelect(e.target.value)}
                  required
                />
              </div>
            </div>
            &nbsp; &nbsp;
            <div className="row">
              <div className="col-sm-6">
                <Form.Select
                  aria-label="Default select example"
                  value={Ucountryx || ""}
                  onInput={handleUOnChangeRCCountry}
                  onChange={(e) => UhandleOnCountrySelect(e.target.value)}
                >
                  <option value="">--Select Country *--</option>
                  {UAlCountry.map((apic) => (
                    <option key={apic.code3} value={apic.name}>
                      {apic.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-sm-6">
                <Form.Select
                  aria-label="Default select example"
                  onInput={(e) => UhandleStateSelect(e.target.value)}
                  onChange={UhandleOnChangeRCState}
                >
                  <option value="">--Select State *--</option>

                  {UallStates.map((apis) => (
                    <option key={apis.code} value={apis.name}>
                      {apis.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
            &nbsp; &nbsp;{" "}
            <div className="row">
              <div className="col-sm-4">
                <TextField
                  label="City "
                  placeholder="CIty "
                  type="name"
                  sx={{
                    width: 342,
                  }}
                  value={Ucityx}
                  onChange={(e) => UhandleCity(e.target.value)}
                  required
                />
              </div>

              <div className="col-sm-2">
                <></>
              </div>
              <div className="col-sm-4">
                <TextField
                  id="outlined-textarea"
                  value={Ustreetx || ""}
                  label="Street "
                  placeholder="Street "
                  sx={{
                    width: 333,
                  }}
                  multiline
                  required
                  onChange={(e) => UhandleStreet(e.target.value)}
                />
              </div>
            </div>
            &nbsp; &nbsp;
            <div className="row">
              <div className="col-sm-6">
                <Form.Select
                  value={Utypex}
                  aria-label="Default select example"
                  onChange={(e) => UhandleType(e.target.value)}
                >
                  <option value="">--Type *--</option>
                  <option value="Vendor">VENDOR</option>
                  <option value="Contractor">CONTRACTOR</option>
                </Form.Select>
              </div>{" "}
              &nbsp; &nbsp;
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  onClick={handleUValidate}
                  color="info"
                  width="50%"
                  align="left"
                >
                  Update
                </MDButton>
              </MDBox>
            </div>
          </Container>
        </MDBox>
      </MDBox>
    </>
  );
}

export default UpdateThirdParty;
