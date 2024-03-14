import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import { Form } from "react-bootstrap";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import React, { useState, useEffect } from "react";
// import DataTable from "examples/Tables/DataTable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
// import ForwardTimeOffRequests from "layouts/timeoffRequests/forwardTimeOffRequests/table/forwardadd";
import Styles from "styles";

function ForwardApproval() {
  const [purposex, setPurpose] = useState("");
  const [startDate, setStartDate] = useState("");
  const [noOfDaysRequestedx, setNoOfDaysRequested] = useState("");
  const [residentialStatex, setResidentialState] = useState("");
  const [residentialCountryx, setResidentialCountry] = useState("");
  const [addressx, setAddress] = useState("");
  //   const [allStates, setAllStates] = useState([]);
  const [cityx, setCity] = useState("");
  const [expectedExpensesx, setExpectedExpenses] = useState("");
  const [actualExpensesx, setActualExpenses] = useState("");
  const [actualDaysSpentx, setActualDaysSpent] = useState("");
  const [extraInformationx, setExtraInformation] = useState("");
  //   const [check, setUser] = useState([]);
  const [duty, setDuty] = useState("");
  const [idx, setId] = useState("");
  const [employee, setEmployee] = useState("");
  // const [check, setCheck] = useState([]);
  const [deleteFlagx, setDeleteFlag] = useState("");
  const [noOfDaysApprovedx, setnoOfDaysApproved] = useState("");
  const [statusx, setStatus] = useState("");
  const [approvalStatusx, setApprovalStatus] = useState("");
  const [approveTimex, setApproveTime] = useState("");
  const [createdTimex, setCreatedTime] = useState("");
  const [createdx, setCreated] = useState("");

  const [approvalx, setApproval] = useState(0);
  const [user, setAUser] = useState([]);
  // const { columns: pColumns, rows: pRows } = ForwardTimeOffRequests();

  const { allPHeaders: myHeaders } = PHeaders();

  const MySwal = withReactContent(Swal);
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  const handleGet = () => {
    // setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const headers = miHeaders;

    fetch(`${process.env.REACT_APP_SHASHA_URL}/businessTravels/getByIds/${id}`, { headers })
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
        console.log(result);
        if (result.length !== 0) {
          setId(result[0].id);
          setPurpose(result[0].purpose);
          setStartDate(result[0].startTime);
          setExtraInformation(result[0].extraInformation);
          setDuty(result[0].approverID);
          setActualDaysSpent(result[0].actualDaysSpent);
          setActualExpenses(result[0].actualExpenses);
          setAddress(result[0].location.address);
          setResidentialState(result[0].location.state);
          setCity(result[0].location.city);
          setResidentialCountry(result[0].location.country);
          setNoOfDaysRequested(result[0].noOfDaysRequested);
          setExpectedExpenses(result[0].expectedExpenses);
          setEmployee(result[0].employees);
          setDeleteFlag(result[0].setdeleteFlag);
          setnoOfDaysApproved(result[0].noOfDaysApproved);
          setStatus(result[0].status);
          setApprovalStatus(result[0].approvalStatus);
          setApproveTime(result[0].approveTime);
          setCreatedTime(result[0].createdTime);
          setCreated(result[0].createdBy);
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

  const handleForward = (e) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;
    const startCDate = new Date(startDate).getTime();
    console.log(employee);
    const approverCompare = Number(approvalx);
    if (
      personalIDs === approverCompare ||
      approverCompare === createdx ||
      duty === approverCompare
    ) {
      console.log(personalIDs);
      console.log(createdx);
      console.log(duty);
      console.log(approverCompare);
      e.preventDefault();
      // const approvedBy = personalIDs;
      // const status = 1;
      console.log(idx);
      // console.log(items);

      MySwal.fire({
        title: "INVALID_USER",
        type: "error",
        text: "You Cannot Forward To This User",
      });
    } else {
      MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f96d02",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const raw = JSON.stringify({
            id: idx,
            orgID: orgIDs,
            createdBy: personalIDs,
            startTime: startCDate,
            noOfDaysRequested: noOfDaysRequestedx,
            noOfDaysApproved: noOfDaysApprovedx,
            employees: employee,
            location: {
              address: addressx,
              city: cityx,
              state: residentialStatex,
              country: residentialCountryx,
            },
            expectedExpenses: expectedExpensesx,
            actualExpenses: actualExpensesx,
            actualDaysSpent: actualDaysSpentx,
            purpose: purposex,
            extraInformation: extraInformationx,
            approverID: approvalx,
            deleteFlag: deleteFlagx,
            status: statusx,
            approvalStatus: approvalStatusx,
            approveTime: approveTimex,
            createdTime: createdTimex,
          });
          const requestOptions = {
            //   method: "DELETE",
            //   headers: miHeaders,
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
          fetch(`${process.env.REACT_APP_SHASHA_URL}/businessTravels/update`, requestOptions)
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resx) => {
              console.log(resx);
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
        console.log(result);
      });
    }
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
        console.log(result);
        if (isMounted) {
          setAUser(result);
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
            style={Styles.boxSx}
            borderRadius="lg"
            coloredShadow="info"
            mx={0}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Forward For Approval
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
                Forward for Approval
              </MDTypography>
              <Form.Select
                value={approvalx || 0}
                onChange={(e) => setApproval(e.target.value)}
                aria-label="Default select example"
              >
                <option value="0">Select User</option>
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
                onClick={handleForward}
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

export default ForwardApproval;
