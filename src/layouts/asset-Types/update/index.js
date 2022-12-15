/* eslint-disable no-lone-blocks */
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
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Styles from "styles";

function UpdateAssetTypes() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const [namex, setName] = useState("");
  const [descripx, setDescrip] = useState("");
  const [typex, setType] = useState("");
  const [ratex, setRate] = useState("");
  const [maximumLifeCyclex, setMaximumLifeCycle] = useState("");
  const [createdTimex, setCreatedTime] = useState("");
  const [idx, setId] = useState("");
  const [deletex, setDeleteFlag] = useState("");

  const [checkedName, setCheckedName] = useState("");
  const [checkedNumber, setCheckedNumber] = useState("");
  const [checkedMaximum, setCheckedMaximum] = useState("");
  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const handleOnNameKeys = (value) => {
    const letters = /^[a-zA-Z ]+$/;
    if (!value.toString().match(letters)) {
      setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
    }
    if (value.toString().match(letters)) {
      setCheckedName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (value.toString().length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name is required<br>";
    }
  };
  const handleOnRateKeys = (value) => {
    const numbers = /^[0-9 ]+$/;
    if (!value.toString().match(numbers)) {
      setCheckedNumber(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("rate").innerHTML = "Rate - input only numbers<br>";
    }
    if (value.toString().match(numbers)) {
      setCheckedNumber(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("rate").innerHTML = "";
    }
    if (value.toString().length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("rate").innerHTML = "Rate is required<br>";
    }
  };
  const handleOnMaximumKeys = (value) => {
    const numbers = /^[0-9 ]+$/;
    if (!value.toString().match(numbers)) {
      setCheckedMaximum(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("maximum").innerHTML = "Maximum Life Cycle - input only numbers<br>";
    }
    if (value.toString().match(numbers)) {
      setCheckedMaximum(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("maximum").innerHTML = "";
    }
    if (value.toString().length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("maximum").innerHTML = "Maximum Life Cycle is required<br>";
    }
  };

  const handleGet = () => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const headers = miHeaders;

    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/assetTypes/getByIds/${id}`, { headers })
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
        if (result.length !== 0) {
          setId(result[0].id);
          setName(result[0].name);
          setDescrip(result[0].descrip);
          setType(result[0].type);
          setRate(result[0].rate);
          setMaximumLifeCycle(result[0].maximumLifeCycle);
          setCreatedTime(result[0].createdTime);
          setDeleteFlag(result[0].deleteFlag);

          handleOnRateKeys(result[0].rate);
          handleOnNameKeys(result[0].name);
          handleOnMaximumKeys(result[0].maximumLifeCycle);
        }
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
      name: namex,
      descrip: descripx,
      type: typex,
      rate: ratex,
      maximumLifeCycle: maximumLifeCyclex,
      createdTime: createdTimex,
      deleteFlag: deletex,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/assetTypes/update`, requestOptions)
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

  const handleValidate = (e) => {
    if (checkedName && checkedNumber && checkedMaximum === true) {
      handleClick(e);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
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
              Update Asset Types
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="rate">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="maximum">
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
                      label="Name"
                      value={namex || ""}
                      onKeyUp={(e) => handleOnNameKeys(e.target.value)}
                      onChange={(e) => setName(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="Description"
                      value={descripx || ""}
                      onChange={(e) => setDescrip(e.target.value)}
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
                    <MDBox>
                      <Form.Select
                        value={typex || ""}
                        aria-label="Default select example"
                        name="salesID"
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="">Type</option>
                        <option value="1">Depreciating</option>
                        <option value="2">Appreciating</option>
                      </Form.Select>
                    </MDBox>
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="Rate %"
                      value={ratex || ""}
                      onKeyUp={(e) => handleOnRateKeys(e.target.value)}
                      onChange={(e) => setRate(e.target.value)}
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
                      type="number"
                      label="Maximum Life Cycle"
                      value={maximumLifeCyclex || ""}
                      onKeyUp={(e) => handleOnMaximumKeys(e.target.value)}
                      onChange={(e) => setMaximumLifeCycle(e.target.value)}
                      variant="standard"
                      placeholder="Numbers in Month"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleValidate}
                style={Styles.buttonSx}
                width="50%"
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

export default UpdateAssetTypes;
