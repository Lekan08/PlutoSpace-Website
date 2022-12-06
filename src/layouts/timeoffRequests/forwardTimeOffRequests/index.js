import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import { Form } from "react-bootstrap";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

function ForwardTimeOff() {
  const [currentHolder, setCurrentHolder] = useState("");
  const [employeeRecord, setEmployeeRecord] = useState([]);

  const [user, setUser] = useState([]);
  const { allPHeaders: myHeaders } = PHeaders();

  const MySwal = withReactContent(Swal);
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const currentholderID = urlParams.get("id");

    const raw = JSON.stringify({
      orgID: orgIDs,
      employeeTimeOffTransactionID: currentholderID,
      currentHolderID: currentHolder,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeoffjourney/add`, requestOptions)
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

        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          const raw2 = JSON.stringify({
            id: employeeRecord[0].id,
            orgID: employeeRecord[0].orgID,
            empID: employeeRecord[0].empID,
            empSetupID: employeeRecord[0].empSetupID,
            noOfDaysRequested: employeeRecord[0].noOfDaysRequested,
            noOfDaysApproved: employeeRecord[0].noOfDaysApproved,
            startDate: employeeRecord[0].startDate,
            endDate: employeeRecord[0].endDate,
            resumptionDate: employeeRecord[0].resumptionDate,
            dutyRelieverID: employeeRecord[0].dutyRelieverID,
            createdDate: employeeRecord[0].createdTime,
            purpose: employeeRecord[0].purpose,
            deleteFlag: employeeRecord[0].deleteFlag,
            approverID: currentHolder,
            adminID: employeeRecord[0].adminID,
            reasonForDisapproval: employeeRecord[0].reasonForDisapproval,
          });
          const requestOptions2 = {
            method: "POST",
            headers: myHeaders,
            body: raw2,
            redirect: "follow",
          };

          fetch(
            `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/update`,
            requestOptions2
          )
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resultx) => {
              if (resultx.message === "Expired Access") {
                navigate("/authentication/sign-in");
              }
              if (resultx.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
              }
              if (resultx.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
              }
              MySwal.fire({
                title: resultx.status,
                type: "success",
                text: resultx.message,
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
        });
      });
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

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const ids = urlParams.get("id");

  useEffect(() => {
    const headers = miHeaders;

    let isMounted = true;
    fetch(`${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/getByIds/${ids}`, {
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
          setEmployeeRecord(result);
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
            mx={0}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Forward Time Off Requests
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mt={2}>
              <MDTypography
                variant="button"
                fontWeight="regular"
                fontSize="80%"
                align="left"
                color="text"
              >
                Time Off Category
              </MDTypography>
              <Form.Select
                value={currentHolder || ""}
                onChange={(e) => setCurrentHolder(e.target.value)}
                aria-label="Default select example"
              >
                <option value="">Select User</option>
                {user.map((api) => (
                  <option key={api.personal.id} value={api.personal.id}>
                    {api.personal.fname} {api.personal.lname}
                  </option>
                ))}
              </Form.Select>
              <br />
            </MDBox>
            <MDBox mt={2} mb={2}>
              <MDButton
                variant="gradient"
                onClick={handleClick}
                color="info"
                width="50%"
                align="left"
              >
                Forward
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default ForwardTimeOff;
