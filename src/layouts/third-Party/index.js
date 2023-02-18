import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import Modal from "@mui/material/Modal";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import GHeaders from "getHeader";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AllCountriesAndStates from "countries-states-master/countries";
import DataTable from "examples/Tables/DataTable";
import UpdateThirdParty from "layouts/third-Party/update";

function ThirdParty() {
  const { allGHeaders: miHeaders } = GHeaders();
  const { countriesAndStates: AlCountry } = AllCountriesAndStates();
  const MySwal = withReactContent(Swal);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [dataTablex, setDataTable] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [phoneNumberx, setPhoneNumberx] = useState("");
  const [statex, setStatex] = useState("");
  const [emailx, setEmailx] = useState("");
  const [countryx, setCountryx] = useState("");
  const [typex, setTypex] = useState("");
  const [namex, setNamex] = useState("");
  const [cityx, setCityx] = useState("");
  const [streetx, setStreetx] = useState("");
  const [updateValue, setUpdateValue] = useState("");

  const [checkedCountry, setCheckedCountry] = useState(false);
  const [checkedState, setCheckedState] = useState(false);
  const [checkedEmail, setCheckedEmail] = useState(false);
  //   const [checkedStartTime, setCheckedStartTime] = useState(false);
  const [checkedName, setCheckedName] = useState(false);
  const [checkedCity, setCheckedCity] = useState(false);
  const [checkedPhoneNumber, setCheckedPhoneNumber] = useState(false);
  const [checkedType, setCheckedType] = useState(false);
  const [checkedStreet, setCheckedStreet] = useState(false);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();

  const handleOnChangeRCCountry = (e) => {
    const filteredItems = AlCountry.filter((item) => item.name === e.target.value);
    setAllStates(filteredItems[0].states);
    setCountryx(e.target.value);
  };

  const handleOnChangeRCState = (e) => {
    setStatex(e.target.value);
  };
  // Timesheet
  const handleOnCountrySelect = (valuex) => {
    if (!valuex) {
      setCheckedCountry(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("country").innerHTML = "Select your Country<br>";
    }
    if (valuex) {
      setCheckedCountry(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("country").innerHTML = " ";
    }
  };

  const handleStateSelect = (valuex) => {
    setStatex(valuex);
    if (!valuex) {
      setCheckedState(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("state").innerHTML = "Select your State<br>";
    }
    if (valuex) {
      setCheckedState(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("state").innerHTML = " ";
    }
  };

  const handleEmailSelect = (valuex) => {
    setEmailx(valuex);
    if (!valuex) {
      setCheckedEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Input an Email<br>";
    }
    if (valuex) {
      setCheckedEmail(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = " ";
    }
  };

  const handleName = (valuex) => {
    setNamex(valuex);

    if (!valuex) {
      setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name cannot be empty <br>";
    }
    if (valuex) {
      setCheckedName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = " ";
    }
  };

  const handleStreet = (valuex) => {
    setStreetx(valuex);

    if (!valuex) {
      setCheckedStreet(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = "Street cannot be empty <br>";
    }
    if (valuex) {
      setCheckedStreet(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("street").innerHTML = " ";
    }
  };

  const handleCity = (valuex) => {
    setCityx(valuex);

    if (!valuex) {
      setCheckedCity(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = "CIty cannot be empty <br>";
    }
    if (valuex) {
      setCheckedCity(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("city").innerHTML = " ";
    }
  };

  const handlePhoneNumber = (valuex) => {
    setPhoneNumberx(valuex);

    if (!valuex) {
      setCheckedPhoneNumber(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("phoneNumber").innerHTML = "Input your Phone Number <br>";
    }
    if (valuex) {
      setCheckedPhoneNumber(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("phoneNumber").innerHTML = " ";
    }
  };

  const handleType = (valuex) => {
    setTypex(valuex);

    if (!valuex) {
      setCheckedType(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("type").innerHTML = "Select Type <br>";
    }
    if (valuex) {
      setCheckedType(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("type").innerHTML = " ";
    }
  };

  // eslint-disable-next-line consistent-return
  const handleClick = (e) => {
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      name: namex,
      pno: phoneNumberx,
      email: emailx,
      type: typex,
      street: streetx,
      city: cityx,
      state: statex,
      country: countryx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/thirdParty/add`, requestOptions)
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

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/thirdParty/gets/${orgIDs}`, {
      headers,
    })
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
          if (result.length !== 0) {
            setDataTable(result);
          }
        }
      });

    // Method to handle diable

    return () => {
      isMounted = false;
    };
  }, []);

  // method handledeleteq

  const handledeleteq = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed === true) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };
        setOpened(true);
        fetch(`${process.env.REACT_APP_LOUGA_URL}/thirdParty/delete/${id}`, requestOptions)
          .then((res) => res.json())
          .then((resx) => {
            setOpened(false);
            if (resx.message === "Expired Access") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            }
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

  const handleUpdate = (value) => {
    setUpdateValue(value);
    setOpen(true);
  };

  const handleValidate = (e) => {
    handleName(namex);
    handleCity(cityx);
    handleOnCountrySelect(countryx);
    handleStateSelect(statex);
    handlePhoneNumber(phoneNumberx);
    handleEmailSelect(emailx);
    handleStreet(streetx);
    handleType(typex);
    if (
      checkedCountry &&
      checkedName &&
      checkedCity &&
      checkedEmail &&
      checkedStreet &&
      checkedPhoneNumber &&
      checkedType &&
      checkedState === true
    ) {
      handleClick(e);
    }
  };

  //  Method to change date from timestamp
  // eslint-disable-next-line consistent-return
  const changeDate = (timestamp) => {
    if (timestamp === 0) {
      return "";
    }
    if (timestamp > 0) {
      const date = new Date(timestamp);
      const retDate = date.toDateString();
      return retDate;
    }
  };
  // Method to change status
  // eslint-disable-next-line consistent-return
  // const changeStatus = (status) => {
  //   if (status === 0) {
  //     return " ";
  //   }
  //   if (status === 1) {
  //     return "PAID";
  //   }
  //   if (status === 2) {
  //     return "DECLINED";
  //   }
  // };

  // Table for Data

  const pColumns = [
    {
      Header: "Name ",
      accessor: "name",
      align: "left",
    },
    {
      Header: "Phone Number ",
      accessor: "pno",
      align: "left",
    },
    {
      Header: "Email",
      accessor: "email",
      align: "left",
    },
    {
      Header: "Type ",
      accessor: "type",
      align: "left",
    },
    {
      Header: "Country ",
      accessor: "country",
      align: "left",
    },
    {
      Header: "State ",
      accessor: "state",
      align: "left",
    },
    {
      Header: "City ",
      accessor: "city",
      align: "left",
    },
    {
      Header: "Street ",
      accessor: "street",
      align: "left",
    },
    {
      Header: "Created Time",
      accessor: "createdTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "Actions",
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
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <Icon sx={{ fontWeight: "light" }}>settings</Icon>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleUpdate(value)}>Update</Dropdown.Item>

              <Dropdown.Item onClick={() => handledeleteq(value)}>Delete</Dropdown.Item>
              {/* <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
      align: "left",
    },
  ];

  // MODAL STYLE
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "#ffffff",
    border: "3px solid #5F9DF7",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    height: "80%",
    display: "flex",
    "&::-webkit-scrollbar": {
      width: 20,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "white",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#f5f5f5",
      borderRadius: 10,
    },
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={20}>
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
              Third Party
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
                      onChange={(e) => handleName(e.target.value)}
                      sx={{
                        width: 730,
                      }}
                      multiline
                      required
                    />
                  </div>
                </div>
                &nbsp;
                <div className="row">
                  <div className="col-sm-4">
                    <TextField
                      label=" Phone Number "
                      type="number"
                      sx={{
                        width: 344,
                      }}
                      value={phoneNumberx}
                      onChange={(e) => handlePhoneNumber(e.target.value)}
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
                        width: 362,
                      }}
                      value={emailx}
                      onChange={(e) => handleEmailSelect(e.target.value)}
                      required
                    />
                  </div>
                </div>
                &nbsp;
                <div className="row">
                  <div className="col-sm-6">
                    <Form.Select
                      aria-label="Default select example"
                      value={countryx || ""}
                      onInput={handleOnChangeRCCountry}
                      onChange={(e) => handleOnCountrySelect(e.target.value)}
                    >
                      <option value="">--Select Country *--</option>
                      {AlCountry.map((apic) => (
                        <option key={apic.code3} value={apic.name}>
                          {apic.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <div className="col-sm-6">
                    <Form.Select
                      aria-label="Default select example"
                      onInput={(e) => handleStateSelect(e.target.value)}
                      onChange={handleOnChangeRCState}
                    >
                      <option value="">--Select State *--</option>

                      {allStates.map((apis) => (
                        <option key={apis.code} value={apis.name}>
                          {apis.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>
                &nbsp; &nbsp;
                <div className="row">
                  <div className="col-sm-4">
                    <TextField
                      label="City "
                      placeholder="CIty "
                      type="name"
                      sx={{
                        width: 342,
                      }}
                      value={cityx}
                      onChange={(e) => handleCity(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-sm-2">
                    <></>
                  </div>
                  <div className="col-sm-4">
                    <TextField
                      id="outlined-textarea"
                      value={streetx || ""}
                      label="Street "
                      placeholder="Street "
                      sx={{
                        width: 362,
                      }}
                      multiline
                      required
                      onChange={(e) => handleStreet(e.target.value)}
                    />
                  </div>
                </div>
                &nbsp; &nbsp;
                <div className="row">
                  <div className="col-sm-6">
                    <Form.Select
                      value={typex}
                      aria-label="Default select example"
                      onChange={(e) => handleType(e.target.value)}
                    >
                      <option value="">--Type *--</option>
                      <option value="Vendor">VENDOR</option>
                      <option value="Contractor">CONTRACTOR</option>
                    </Form.Select>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  onClick={handleValidate}
                  color="info"
                  width="50%"
                  align="left"
                >
                  Save
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: dataTablex }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <HighlightOffIcon
              onClick={handleClose}
              fontSize="large"
              style={{
                // display: "flex",
                padding: "5px",
                color: "red",
                float: "right",
                position: "absolute",
                left: 490,
                right: 0,
                top: 0,
                bottom: 0,
                cursor: "pointer",
              }}
            />{" "}
            <UpdateThirdParty updateValue={updateValue} />
          </Box>
        </Modal>
      </div>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default ThirdParty;
