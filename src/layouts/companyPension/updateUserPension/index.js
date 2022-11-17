import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import MDButton from "components/MDButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import PHeaders from "postHeader";
import GHeaders from "getHeader";

export default function UpdateUserPension() {
  const MySwal = withReactContent(Swal);
  const [salary, setSalary] = useState(0);
  const [amountx, setAmount] = useState({ amount: 0, calculated: 0 });
  const [currencyx, setCurrency] = useState("NGN");
  const [integrationx, setIntegration] = useState({});
  const [typex, setTypex] = useState("");
  const [owner, setOwner] = useState(0);
  const [updates, setUpdates] = useState([]);
  const [userIDx, setUserIDx] = useState("");
  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  useEffect(() => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get("id");
    const pid = urlParams.get("pid");
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/pensions/getByIds/${uid}`, {
      headers,
    })
      .then(async (resx) => {
        const aToken = resx.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultr = await resx.text();
        if (resultr === null || resultr === undefined || resultr === "") {
          return {};
        }
        return JSON.parse(resultr);
      })
      .then((resultx) => {
        console.log(resultx);
        setAmount({ calculated: resultx[0].amount, amount: resultx[0].amount });
        setOwner(resultx[0].createdBy);
        setIntegration(resultx[0].integration);
        setUserIDx(resultx[0].integration.empName);
        setUpdates(resultx);
        // if (resultx.id) {
        // } else
        //   MySwal.fire({
        //     title: "No Pension Integration",
        //     type: "error",
        //     text: "Selected User must be integrated with a pension provider first.",
        //   }).then(() => {
        //     // window.location.reload();
        //     navigate("/company-pension");
        //   });
      });
    fetch(`${process.env.REACT_APP_TANTA_URL}/basicremuneration/getForEmp/${orgIDs}/${pid}`, {
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
      .then((resultba) => {
        setOpened(false);
        if (resultba.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultba.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultba.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          if (resultba.id) {
            setSalary(resultba.amount);
            setCurrency(resultba.currency);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  // eslint-disable-next-line consistent-return
  const handleTypex = () => {
    if (typex === "") {
      document.getElementById("typex").innerHTML = "Variation is required <br>";
      return false;
    }
    if (typex !== "") {
      document.getElementById("typex").innerHTML = "";
      return true;
    }
  };
  // eslint-disable-next-line consistent-return
  const handleAmount = () => {
    if (amountx.amount === 0 || amountx.amount === "") {
      document.getElementById("amount").innerHTML = "Amount is required <br>";
      return false;
    }
    if (amountx.amount !== 0) {
      document.getElementById("amount").innerHTML = "";
      return true;
    }
  };
  const handleAdd = (e) => {
    handleTypex();
    handleAmount();
    if (handleTypex() && handleAmount()) {
      setOpened(true);
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const empIDX = urlParams.get("pid");
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      // const ownerx = data11.personalID;
      const raw = JSON.stringify({
        id: updates[0].id,
        createdByName: updates[0].createdByName,
        createdTime: updates[0].createdTime,
        orgID: orgIDs,
        integration: integrationx,
        amount: amountx.calculated,
        createdBy: Number(owner),
        payTime: updates[0].payTime,
        status: updates[0].status,
        terminatedBy: updates[0].terminatedBy,
        terminatedByName: updates[0].terminatedByName,
        terminatedTime: updates[0].terminatedTime,
      });
      console.log(raw);
      const [fname, lname] = userIDx.split(" ");
      console.log(
        `deleteByName/${updates[0].orgID}/${Number(integrationx.empID)}/${fname}_${lname}_PENSION_${
          updates[0].id
        }`
      );
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/pensions/update`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          console.log(result);
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
          const requestOptionsD = {
            method: "DELETE",
            headers: miHeaders,
          };
          fetch(
            `${process.env.REACT_APP_TANTA_URL}/remunerationpackagesetup/deleteByName/${
              updates[0].orgID
            }/${Number(integrationx.empID)}/${fname}_${lname}_PENSION_${updates[0].id}`,
            requestOptionsD
          )
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((result2) => {
              setOpened(false);
              console.log(result2);
              const raw2 = JSON.stringify({
                orgID: orgIDs,
                name: `${fname}_${lname}_PENSION_${updates[0].id}`,
                empID: Number(empIDX),
                setupType: 2,
                amount: Number(amountx.amount),
                currency: currencyx,
                type: typex,
                frequency: 1,
              });
              console.log(raw2);
              const requestOptions2 = {
                method: "POST",
                headers: myHeaders,
                body: raw2,
                redirect: "follow",
              };
              fetch(
                `${process.env.REACT_APP_TANTA_URL}/remunerationpackagesetup/add`,
                requestOptions2
              )
                .then(async (res) => {
                  const aToken = res.headers.get("token-1");
                  localStorage.setItem("rexxdex", aToken);
                  return res.json();
                })
                .then((result3) => {
                  setOpened(false);
                  console.log(result3);
                });
            });
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          }).then(() => {
            navigate("/company-pension");
          });
          // console.log(result);
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

  const calculate = (e) => {
    if (typex === "PERCENTAGE")
      setAmount({ calculated: Number(e.target.value / 100) * salary, amount: e.target.value });
    else setAmount({ calculated: e.target.value, amount: e.target.value });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox textAlign="center" mx={9}>
        <Card style={{ width: "900px" }}>
          <Container>
            <MDBox pt={4} pb={3} px={3} mx={20}>
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
                  Update Pension For {userIDx}
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
                <MDTypography variant="gradient" fontSize="60%" color="error" id="typex">
                  {" "}
                </MDTypography>
                <MDTypography variant="gradient" fontSize="60%" color="error" id="amount">
                  {" "}
                </MDTypography>
              </MDBox>
              <MDBox component="form" role="form" name="form">
                <MDBox mb={2} mt={5}>
                  <div className="row">
                    <div className="col-sm-6">
                      <MDInput
                        type="text"
                        value={currencyx || ""}
                        onChange={(e) => setCurrency(e.target.value)}
                        label="Currency *"
                        disabled
                        variant="standard"
                        fullWidth
                      />
                    </div>
                    <div className="col-sm-6">
                      <Form.Select
                        value={typex || ""}
                        aria-label="Default select example"
                        onChange={(e) => {
                          setAmount({ amount: 0, calculated: 0 });
                          setTypex(e.target.value);
                        }}
                        style={{ width: "258px", marginTop: "5px" }}
                      >
                        <option value="">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--Select Variation--
                        </option>
                        <option value="FLAT">Flat</option>
                        <option value="PERCENTAGE">Percentage</option>
                      </Form.Select>
                    </div>
                    <br />
                  </div>
                </MDBox>
              </MDBox>
            </MDBox>
            <MDBox textAlign="center" mx={23}>
              <div className="row">
                <div className="col-sm-6">
                  <MDInput
                    type="number"
                    label="Amount*"
                    value={amountx.amount}
                    onChange={calculate}
                    variant="standard"
                    fullWidth
                  />
                </div>
                <div className="col-sm-6">
                  <MDInput
                    type="text"
                    value={amountx.calculated}
                    label="Calculated Amount From Salary"
                    disabled
                    variant="standard"
                    fullWidth
                  />
                </div>
              </div>
              <br />
            </MDBox>
            <MDBox mt={4} mb={1} textAlign="center">
              <MDButton variant="gradient" color="info" width="50%" onClick={handleAdd}>
                Update
              </MDButton>
            </MDBox>
          </Container>
        </Card>
      </MDBox>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}
