/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";
import MDInput from "components/MDInput";
import Icon from "@mui/material/Icon";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import "react-datepicker/dist/react-datepicker.css";
import GHeaders from "getHeader";
import PHeaders from "postHeader";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  // overflow: "scroll",
  height: "auto",
  maxHeight: "50vh",
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
  // borderTopLeftRadius: 20,
  // borderBottomLeftRadius: 20,
};

function ViewJobApplications() {
  const [application, setApplication] = useState([]);
  // const [statusx, setStatus] = useState("");
  const [fnamex, setName] = useState("");
  const [emailx, setEmail] = useState("");
  const [lNamex, setLastName] = useState("");
  const [roleIDs, setRoleID] = useState(0);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [items, setItems] = useState([]);
  const [company, setCompany] = useState([]);

  const [opened, setOpened] = useState(false);

  const [curID, setCurID] = useState("");
  const [open, setOpenn] = useState(false);
  const handleOpen = (filteredData, id) => {
    const filteredItems = filteredData.filter((item) => item.id === id);

    setName(filteredItems[0].personal.fname);
    setLastName(filteredItems[0].personal.lname);
    setCurID(id);
    setOpenn(true);
  };

  const handleClose = () => {
    setOpenn(false);
  };

  const MySwal = withReactContent(Swal);

  // Method to change date from timestamp
  const handleView = (value) => {
    navigate(`/View-Application?id=${value}`);
  };

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/jobApplication/getForPost/${ids}`, { headers })
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
        console.log(result);
        if (isMounted) {
          setApplication(result);
          /// setStatus(result[0].status);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDz = data11.orgID;
    // const idVal = JSON.parse([orgIDz]);
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/company/get/${orgIDz}`, { headers })
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
        if (isMounted) {
          setCompany(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnFirstKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!fnamex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML =
        "First Name - input only capital and small letters<br>";
    }
    if (fnamex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML = "";
    }
    if (fnamex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("first").innerHTML = "First Name is required<br>";
    }
  };

  const handleOnLastKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!lNamex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML =
        "Last Name - input only capital and small letters<br>";
    }
    if (lNamex.match(letters)) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML = "";
    }
    if (lNamex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("last").innerHTML = "Last Name is required<br>";
    }
  };

  const handleOnPEmailKeys = () => {
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

  // eslint-disable-next-line consistent-return
  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();

    const letterNumber = /^[0-9a-zA-Z]+$/;
    if (fnamex.length > 0 && !fnamex.match(letterNumber)) {
      MySwal.fire({
        title: "NAME_ERROR",
        type: "error",
        text: "Input First Name Invalid",
      });
      return false;
    }
    if (lNamex.length > 0 && !lNamex.match(letterNumber)) {
      MySwal.fire({
        title: "NAME_ERROR",
        type: "error",
        text: "Input Last Name Invalid",
      });
      return false;
    }
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDz = data11.orgID;
    const raw = JSON.stringify({
      roleID: parseInt(roleIDs, 10),
      fname: fnamex,
      email: emailx,
      lname: lNamex,
      companyName: company[0].name,
      orgID: orgIDz,
      erp: true,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_ZAVE_URL}/login/invite`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        handleClose();
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        }).then(() => {
          handleOpen();
        });
      });
  };
  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/roles/getForOrganization/${orgIDs}`, { headers })
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
        if (isMounted) {
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // eslint-disable-next-line consistent-return
  const handleHired = (e) => {
    setOpened(true);
    const headers = miHeaders;

    const letterNumber = /^[0-9a-zA-Z]+$/;
    if (fnamex.length > 0 && !fnamex.match(letterNumber)) {
      MySwal.fire({
        title: "NAME_ERROR",
        type: "error",
        text: "Input First Name Invalid",
      });
      return false;
    }
    if (lNamex.length > 0 && !lNamex.match(letterNumber)) {
      MySwal.fire({
        title: "NAME_ERROR",
        type: "error",
        text: "Input Last Name Invalid",
      });
      return false;
    }

    fetch(`${process.env.REACT_APP_RAGA_URL}/jobApplication/markHired/${curID}`, { headers })
      .then((res) => res.json())
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
        handleClose();
        console.log(`STATUS - ${resx.status} - - - - - - MESSAGE - ${resx.message}`);
        if (resx.status === "SUCCESS") {
          handleClick(e);
          //   const data11 = JSON.parse(localStorage.getItem("user1"));
          //   const orgIDs = data11.orgID;
          //   const personalIDs = data11.personalID;
          //   let applicantEmail = "";
          //   const filteredItems = filteredData.filter((item) => item.id === id);

          //   applicantEmail = filteredItems[0].personal.email;
          //   const raw1 = JSON.stringify({
          //     orgID: orgIDs,
          //     personalID: personalIDs,
          //     email: applicantEmail,
          //   });
          //   const requestOptions1 = {
          //     method: "POST",
          //     headers: myHeaders,
          //     body: raw1,
          //     redirect: "follow",
          //   };
          //   fetch(`${process.env.REACT_APP_ZAVE_URL}/personalcompany/add`, requestOptions1)
          //     .then((res) => res.json())
          //     .then(() => {
          //       // resultpc
          //       setOpened(true);
          //       // MySwal.fire({
          //       //   title: resultpc.status,
          //       //   type: "success",
          //       //   text: resultpc.message,
          //       // }).then(() => {
          //       MySwal.fire({
          //         title: resx.status,
          //         type: "success",
          //         text: resx.message,
          //       }).then(() => {
          //         window.location.reload();
          //       });
          //       // });
          //     });
        } else {
          MySwal.fire({
            title: resx.status,
            type: "success",
            text: resx.message,
          });
        }
      })
      .catch((error) => {
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        }).then(() => {
          handleOpen();
        });
      });
  };

  const handleRejected = (id) => {
    // setOpened(false);
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject Applicant!",
    }).then((result) => {
      if (result.isConfirmed) {
        const headers = miHeaders;
        fetch(`${process.env.REACT_APP_RAGA_URL}/jobApplication/markRejected/${id}`, { headers })
          .then((res) => res.json())
          .then((resx) => {
            // setOpened(true);
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
            MySwal.fire({
              title: error.status,
              type: "error",
              text: error.message,
            });
          });
      }
    });
  };

  // eslint-disable-next-line consistent-return
  // const changeStatus = (status) => {
  //   if (status === "HIRED") {
  //     return "HIRED";
  //     // eslint-disable-next-line no-else-return
  //   } else if (status === "REJECTED") {
  //     return "REJECTED";
  //   }
  // };
  // eslint-disable-next-line consistent-return
  const changeStatusCol = (status) => {
    if (status === "HIRED") {
      return "#0000ff";
      // eslint-disable-next-line no-else-return
    }
    if (status === "REJECTED") {
      return "#ff0000";
    }
    return "#00e600";
  };

  const pColumns = [
    { Header: "First Name", accessor: "personal.fname", align: "left" },
    { Header: "Last Name", accessor: "personal.lname", align: "left" },
    { Header: "Email", accessor: "personal.email", align: "left" },
    { Header: "Phone Number", accessor: "personal.pno", align: "left" },
    { Header: "Nationality", accessor: "personal.nationality", align: "left" },
    { Header: "Marital Status", accessor: "personal.maritalStatus", align: "left" },
    {
      Header: "Status",
      accessor: "status",
      // Cell: ({ cell: { value } }) => changeStatusCol(value),
      Cell: ({ cell: { value } }) => (
        <span className="badge badge-pill" style={{ backgroundColor: changeStatusCol(value) }}>
          {value}
        </span>
      ),
      // eslint-disable-next-line react/prop-types
      // Cell: ({ cell: { status } }) => (
      //   <span className="badge badge-pill" style={{ backgroundColor: changeStatusCol(status) }}>
      //     {changeStatusCol(status)}
      //   </span>
      // ),
      align: "left",
    },
    {
      Header: "actions",
      accessor: "id",
      Cell: ({ cell: { value } }) => (
        <div
          style={{
            width: "100%",
            backgroundColor: "#f5f5f5",
            borderRadius: "2px",
          }}
        >
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <Icon sx={{ fontWeight: "light" }}>settings</Icon>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleView(value)}>View Applicant</Dropdown.Item>
              <Dropdown.Item onClick={() => handleOpen(application, value)}>
                Hire Applicant
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => navigate(`/interview-Schedule?jobApplicationID=${value}`)}
              >
                Schedule Interview
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleRejected(value)}>Reject Applicant</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
      align: "left",
    },
  ];

  // Return table
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={30}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={1}
            mt={2}
            p={2}
            mb={1}
            textAlign="left"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" textAlign="center" mt={1}>
              Job Applicants
            </MDTypography>
          </MDBox>
        </MDBox>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
          <Card sx={style} style={cardBorder}>
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
                Invite User
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
              <MDTypography variant="gradient" fontSize="60%" color="white" id="first">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="white" id="last">
                {" "}
              </MDTypography>
              <MDTypography variant="gradient" fontSize="60%" color="white" id="email">
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
                        label="First Name *"
                        value={fnamex || ""}
                        onKeyUp={handleOnFirstKeys}
                        onChange={(e) => setName(e.target.value)}
                        variant="standard"
                        fullWidth
                      />
                    </div>
                    <div className="col-sm-6">
                      <MDInput
                        type="text"
                        value={lNamex || ""}
                        onKeyUp={handleOnLastKeys}
                        onChange={(e) => setLastName(e.target.value)}
                        label="Last Name *"
                        variant="standard"
                        fullWidth
                      />
                    </div>
                  </div>
                </Container>
              </MDBox>
              <MDBox mb={2}>
                <Container>
                  <div className="row">
                    <div className="col-sm-6">
                      <MDInput
                        type="text"
                        value={emailx || ""}
                        onKeyUp={handleOnPEmailKeys}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Official Email *"
                        variant="standard"
                        fullWidth
                      />
                    </div>
                    <div className="col-sm-6">
                      <Form.Select
                        aria-label="Default select example"
                        width="50%"
                        mx={34}
                        onChange={(e) => setRoleID(e.target.value)}
                      >
                        <option>Select Roles *</option>
                        <option value="0">Admin</option>
                        {items.map((api) => (
                          <option key={api.id} value={api.id}>
                            {api.name}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </div>
                </Container>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" onClick={handleHired} color="info" width="50%">
                  Invite
                </MDButton>
                &nbsp;
                <MDButton
                  variant="gradient"
                  onClick={handleClose}
                  color="error"
                  width="50%"
                  align="center"
                >
                  Cancel
                </MDButton>
              </MDBox>
            </MDBox>
          </Card>
        </Backdrop>
        <MDBox pt={3}>
          <DataTable
            table={{ columns: pColumns, rows: application }}
            isSorted
            entriesPerPage
            showTotalEntries
            noEndBorder
            canSearch
          />
        </MDBox>
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default ViewJobApplications;
