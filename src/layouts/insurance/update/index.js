import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import MDButton from "components/MDButton";
import Styles from "styles";

function UpdateInsurance() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [idx, setIdx] = useState("");
  const [clientTypex, setClientType] = useState(0);
  const [clientIDx, setClientID] = useState("");
  const [clientName, setClientName] = useState("");
  const [itemWorthx, setItemWorth] = useState("");
  const [checkItemWorth, setCheckItemWorth] = useState(false);
  const [type, setType] = useState([]);
  const [typex, setTypex] = useState("");
  const [plan, setPlan] = useState([]);
  const [planx, setPlanx] = useState("");
  const [itemx, setItem] = useState("");
  const [accountOwnerx, setAccountOwner] = useState("");
  const [users, setUsers] = useState([]);
  const [statusx, setStatus] = useState("");
  const [terminatedByx, setTerminatedBy] = useState("");
  const [terminatedTimex, setTerminatedTime] = useState("");
  const [createdTimex, setCreatedTime] = useState("");
  const [terminatingCommentx, setTerminatingComment] = useState("");

  const [opened, setOpened] = useState(false);

  const handleOnItemWorthKeys = (valuee) => {
    const number = /^[0-9]+$/;
    const value = valuee.toString();
    if (!value.match(number)) {
      setCheckItemWorth(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("itemworth").innerHTML = "Item Worth - input only numbers<br>";
    }
    if (value.match(number)) {
      setCheckItemWorth(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("itemworth").innerHTML = "";
    }
    if (value.length === 0) {
      setCheckItemWorth(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("itemworth").innerHTML = "Item Worth is required<br>";
    }
  };

  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    setOpened(true);
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
          setUsers(result);
          setOpened(false);
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
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insuranceType/gets/${orgIDs}`, {
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
        if (isMounted) {
          setType(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const selectPlan = (value) => {
    // const filteredItems = type.filter((item) => item.id === value);
    const headers = miHeaders;
    // const selectedPlanIDs = filteredItems[0].planIDs;

    let isMounted = true;
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insurancePlan/getByIds/${value}`, {
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
        if (isMounted) {
          setPlan(result);
        }
      });
    return () => {
      isMounted = false;
    };
  };

  const typeSetPlan = (e) => {
    setTypex(e.target.value);
    const ifstate = e.target.value;
    const filteredItems = type.filter((item) => item.id === ifstate);
    const selectedPlanIDs = filteredItems[0].planIDs;
    selectPlan(selectedPlanIDs);
  };

  // Method to fetch particular insurance
  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    let isMounted = true;
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insurance/getByIds/${ids}`, {
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
        if (isMounted) {
          // eslint-disable-next-line eqeqeq
          if (result.length != 0) {
            setIdx(result[0].id);
            setClientType(result[0].clientType);
            setClientID(result[0].clientID);
            setClientName(result[0].clientName);
            setTypex(result[0].typeID);
            setPlanx(result[0].planID);
            setItem(result[0].item);
            setItemWorth(result[0].itemWorth);
            setAccountOwner(result[0].accountOwnerID);
            setCreatedTime(result[0].createdTime);
            setStatus(result[0].status);
            setTerminatedBy(result[0].terminatedBy);
            setTerminatedTime(result[0].terminatedTime);
            setTerminatingComment(result[0].terminatingComment);
            selectPlan(result[0].planID);
          } else {
            setIdx(null);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdate = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;

    const raw = JSON.stringify({
      id: idx,
      clientID: clientIDx,
      clientType: clientTypex,
      orgID: orgIDs,
      typeID: typex,
      planID: planx,
      item: itemx,
      itemWorth: itemWorthx,
      accountOwnerID: accountOwnerx,
      createdTime: createdTimex,
      status: statusx,
      terminatedBy: terminatedByx,
      terminatedTime: terminatedTimex,
      terminatingComment: terminatingCommentx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insurance/update`, requestOptions)
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
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  const handleValidate = (e) => {
    handleOnItemWorthKeys(itemWorthx);
    if (checkItemWorth === true) {
      handleUpdate(e);
    }
  };

  // Method to change display for client type
  const changeTypeDisplay = (value) => {
    if (value === 1) {
      return "Individual";
    }

    return "Corporate";
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={20}>
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            style={{ backgroundColor: "#f96d02" }}
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
              Update Insurance
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="itemworth">
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
                      label="To Insure *"
                      value={itemx || ""}
                      onChange={(e) => setItem(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={itemWorthx || ""}
                      onKeyUp={(e) => handleOnItemWorthKeys(e.target.value)}
                      onChange={(e) => setItemWorth(e.target.value)}
                      label="Item Worth (NGN) *"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            &nbsp;
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDBox>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
                        color="text"
                      >
                        Client Type:
                      </MDTypography>
                      &nbsp;&nbsp;
                      {changeTypeDisplay(clientTypex)}
                    </MDBox>
                    <br />
                  </div>
                  <div className="col-sm-6">
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      textAlign="center"
                      color="text"
                    >
                      Client Name:
                    </MDTypography>
                    &nbsp;&nbsp; {clientName}
                    <br />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDBox>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
                        color="text"
                      >
                        Insurance Type *
                      </MDTypography>
                      <br />
                      <Form.Select
                        value={typex}
                        onChange={typeSetPlan}
                        aria-label="Default select example"
                      >
                        <option value="">--Select Insurance Type--</option>
                        {type.map((api) => (
                          <option key={api.id} value={api.id}>
                            {api.name}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </div>
                  <div className="col-sm-6">
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      textAlign="center"
                      color="text"
                    >
                      Insurance Plan *
                    </MDTypography>
                    <br />
                    <Form.Select
                      value={planx}
                      onChange={(e) => setPlanx(e.target.value)}
                      aria-label="Default select example"
                    >
                      <option value="">--Select Insurance Plan--</option>
                      {plan.map((api) => (
                        <option key={api.id} value={api.id}>
                          {api.title}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>
              </Container>
            </MDBox>
            &nbsp;
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      textAlign="center"
                      color="text"
                    >
                      Account Owner *
                    </MDTypography>
                    <br />
                    <Form.Select
                      value={accountOwnerx}
                      onChange={(e) => setAccountOwner(e.target.value)}
                      aria-label="Default select example"
                    >
                      <option value="">--Select Account Owner--</option>
                      {users.map((api) => (
                        <option key={api.personal.id} value={api.personal.id}>
                          {api.personal.fname} {api.personal.lname}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <div className="col-sm-6" />
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleValidate}
                //   color="info"
                style={Styles.buttonSx}
                width="50%"
                align="left"
              >
                Update
              </MDButton>
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

export default UpdateInsurance;
