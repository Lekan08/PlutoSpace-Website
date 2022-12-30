import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

function Departments() {
  const MySwal = withReactContent(Swal);

  const [textx, setText] = useState("");
  const [amountx, setAmount] = useState("");
  const [typex, setType] = useState("");
  const [frequencyx, setFrequency] = useState("");
  const [leftUsagex, setLeftUsage] = useState("");
  const [createdByx, setCreatedBy] = useState([]);
  const [createdx, setCreated] = useState("");
  const [idx, setId] = useState("");
  const [itemsx, setItems] = useState("");

  //   const [enabled, setEnabled] = useState("");
  //   const [checkedName, setCheckedName] = useState("");

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // eslint-disable-next-line consistent-return
  const handleOnNameKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!textx.match(letters)) {
      // setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Text - input only capital and small letters<br>";
    }
    if (textx.match(letters)) {
      // setCheckedName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (textx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Text is required<br>";
    }
  };

  const handleGet = () => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const headers = miHeaders;

    fetch(`${process.env.REACT_APP_LOUGA_URL}/coupons/getByIds/${id}`, { headers })
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
        setItems(result[0].result);
        setId(result[0].id);
        setText(result[0].text);
        setAmount(result[0].amount);
        setType(result[0].type);
        setFrequency(result[0].frequency);
        setLeftUsage(result[0].leftUsage);
        setCreated(result[0].createdBy);
        // handleOnTaxAmountKeys(result[0].expireTime);
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

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      text: textx,
      amount: amountx,
      type: typex,
      frequency: frequencyx,
      leftUsage: leftUsagex,
      createdBy: createdx,
      expireTime: itemsx[0].expireTime,
      status: itemsx[0].status,
      createdTime: itemsx[0].createdTime,
      terminatedBy: itemsx[0].terminatedBy,
      terminatedTime: itemsx[0].terminatedTime,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_LOUGA_URL}/otherInflow/update`, requestOptions)
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
  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const empID = data11.personalID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getUserInfo/${orgIDs}/${empID}`, { headers })
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
          setCreatedBy(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

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
              Update Coupons
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
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="Name *"
                      value={textx || ""}
                      onKeyUp={handleOnNameKeys}
                      className="form-control"
                      onChange={(e) => setText(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={amountx}
                          label="Amount"
                          placeholder="Amount* "
                          size="small"
                          type="number"
                          onChange={(e) => setAmount(e.target.value)}
                          required
                        />
                      </FormControl>
                    </Box>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <div className="row">
                <div className="col-sm-6">
                  <MDBox>
                    <Form.Select
                      value={typex}
                      aria-label="Default select example"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="">Sales Type</option>
                      <option value="1">Flat</option>
                      <option value="2">Frequency</option>
                    </Form.Select>
                  </MDBox>
                </div>
                <div className="col-sm-6">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <TextField
                        id="filled-number"
                        value={frequencyx}
                        label="Frequency"
                        placeholder="Frequency "
                        size="small"
                        type="number"
                        onChange={(e) => setFrequency(e.target.value)}
                        required
                      />
                    </FormControl>
                  </Box>
                </div>
              </div>
            </MDBox>
            <MDBox mb={2}>
              <div className="row">
                <div className="col-sm-6">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <TextField
                        id="filled-number"
                        value={leftUsagex}
                        label="Left Usage"
                        placeholder="Left Usage "
                        size="small"
                        type="number"
                        onChange={(e) => setLeftUsage(e.target.value)}
                        required
                      />
                    </FormControl>
                  </Box>
                </div>
                <div className="col-sm-2">
                  <MDBox>
                    <Form.Select
                      value={createdx}
                      aria-label="Default select example"
                      onChange={(e) => setCreated(e.target.value)}
                    >
                      <option>Created By</option>
                      {createdByx.map((apis) => (
                        <option key={apis.id} value={apis.id}>
                          {apis.personal.fname}
                        </option>
                      ))}
                    </Form.Select>
                  </MDBox>
                </div>
              </div>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleClick}
                color="info"
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

export default Departments;
