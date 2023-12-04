import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { Form } from "react-bootstrap";
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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Paper } from "@mui/material";
import MDButton from "components/MDButton";

function UserPension() {
  const MySwal = withReactContent(Swal);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const namex = urlParams.get("name");
  const [updates, setUpdates] = useState({});
  const [opened, setOpened] = useState(false);
  const [providers, setProviders] = useState([]);
  const [changes, setChanges] = useState("");
  const [deleteID, setDeleteID] = useState("");
  const [add, setAdd] = useState(true);
  const navigate = useNavigate();
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  useEffect(() => {
    const id = urlParams.get("id");
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const headers = miHeaders;
    setOpened(true);
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/pensionProviders/gets/${orgIDs}`, {
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
        fetch(
          `${process.env.REACT_APP_JOHANNESBURG_URL}/pensionIntegration/getForEmp/${orgIDs}/${id}`,
          {
            headers,
          }
        )
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
            if (resultx) {
              setUpdates(resultx);
              setDeleteID(resultx.id);
              result.forEach((r) => {
                if (resultx.providerID === r.id) {
                  setChanges(r.id);
                  setAdd(false);
                }
              });
              setProviders(result);
            }
          });
        setOpened(false);
      });
  }, []);
  const handleCreate = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    if (add) {
      setOpened(true);
      const raw = JSON.stringify({
        orgID: orgIDs,
        empID: Number(urlParams.get("id")),
        providerID: changes,
      });
      // console.log(enabled);
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/pensionIntegration/add`, requestOptions)
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
    } else {
      setOpened(true);
      const raw = JSON.stringify({
        id: updates.id,
        orgID: orgIDs,
        empID: Number(urlParams.get("id")),
        providerID: changes,
        deleteFlag: updates.deleteFlag,
        createdTime: updates.createdTime,
      });
      // console.log(enabled);
      if (updates.providerID === changes) {
        alert("No changes made!");
        setOpened(false);
      } else {
        console.log(raw);
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/pensionIntegration/update`, requestOptions)
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
    }
  };
  const handleDelete = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f96d02",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed === true) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };
        fetch(
          `${process.env.REACT_APP_JOHANNESBURG_URL}/pensionIntegration/delete/${deleteID}`,
          requestOptions
        )
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
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <MDBox mx={20} variant="gradient" bgColor="info">
        <Paper elevation={8}>
          <Card style={{ width: "700px", marginLeft: "21px" }}>
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
                  Pension Provider For {namex}
                </MDTypography>
              </MDBox>
              <br />
              <MDBox p={2} textAlign="center" mx={10}>
                <MDBox textAlign="center">
                  <Form.Select
                    value={changes || ""}
                    aria-label="Default select example"
                    onChange={(e) => setChanges(e.target.value)}
                  >
                    <option value="">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--Select Pension
                      Provider--
                    </option>
                    {providers.map((apic) => (
                      <option key={apic.id} value={apic.id}>
                        {apic.name}
                      </option>
                    ))}
                  </Form.Select>
                </MDBox>
                <br />
                <MDBox mt={4} mb={1} textAlign="center">
                  <MDButton variant="gradient" onClick={handleCreate} color="info" width="50%">
                    {add ? "Add" : "Update"}
                  </MDButton>
                  &nbsp;&nbsp;&nbsp;
                  {!add && (
                    <MDButton variant="gradient" onClick={handleDelete} color="error" width="50%">
                      Remove
                    </MDButton>
                  )}
                </MDBox>
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

export default UserPension;
