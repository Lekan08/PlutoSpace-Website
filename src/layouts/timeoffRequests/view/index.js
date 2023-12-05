import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
import { useState, useEffect } from "react";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DatePicker from "react-datepicker";
import Styles from "styles";
// Girl i want to be dancing with you forever

function View() {
  const navigate = useNavigate();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const ids = urlParams.get("id");

  const { allGHeaders: miHeaders } = GHeaders();

  const [empSetupID, setEmpSetupID] = useState("");
  const [noOfDaysRequested, setNoOfDaysRequested] = useState("");
  const [noOfDaysApprovedx, setNoOfDaysApproved] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dutyRelieverID, setDutyRelieverID] = useState("");
  const [purposey, setPurposey] = useState("");
  const [approverID, setApproverID] = useState("");

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
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          setEmpSetupID(result[0].empName);
          setNoOfDaysRequested(result[0].noOfDaysRequested);
          setNoOfDaysApproved(result[0].noOfDaysApproved);
          setStartDate(result[0].startDate);
          setEndDate(result[0].endDate);
          setDutyRelieverID(result[0].dutyRelieverName);
          setPurposey(result[0].purpose);
          setApproverID(result[0].approverName);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="row">
        <div className="col-sm-2">&nbsp;</div>
        <div className="col-sm-8" align="center">
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox
                  variant="gradient"
                  // bgColor="info"
                  borderRadius="lg"
                  style={Styles.boxSx}
                  // coloredShadow="info"
                  mx={0}
                  mt={-6}
                  p={3}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                    View Time Off-Requests
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Employee's"
                          disabled
                          value={empSetupID || ""}
                          onChange={(e) => setEmpSetupID(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Duty Reliever"
                          disabled
                          value={dutyRelieverID || ""}
                          onChange={(e) => setDutyRelieverID(e.target.value)}
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
                          label="Approvers"
                          disabled
                          value={approverID || ""}
                          onChange={(e) => setApproverID(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>

                      <div className="col-sm-6">
                        <MDInput
                          type="text"
                          label="Days Requested"
                          disabled
                          value={noOfDaysRequested || ""}
                          onChange={(e) => setNoOfDaysRequested(e.target.value)}
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
                          label="Days Approved"
                          value={noOfDaysApprovedx || ""}
                          onChange={(e) => setNoOfDaysApproved(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                  &nbsp;
                  <Container>
                    <div className="row">
                      <div className="col-sm-6">
                        <style>
                          {`.date-picker input {
                              width: 50%
                              align: left
                            }`}
                        </style>
                        <DatePicker
                          date={startDate}
                          wrapperClassName="date-picker"
                          placeholder="Select Birth Date"
                          disabled
                          dateFormat="MM/dd/yyyy"
                          confirmBtnText="Confirm"
                          showCancelButton="true"
                          customStyles={{
                            placeholderText: {
                              fontSize: 5,
                            },
                            dateIcon: {
                              height: 0,
                              width: 0,
                            },
                            dateText: {
                              color: "#b3b4b5",
                              fontSize: 16,
                            },
                            dateInput: {
                              borderWidth: 0,
                            },
                          }}
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </div>

                      <div className="col-sm-6">
                        <style>
                          {`.date-picker input {
                              width: 50%
                              align: left
                            }`}
                        </style>
                        <DatePicker
                          date={endDate}
                          wrapperClassName="date-picker"
                          placeholder="Select Birth Date"
                          disabled
                          dateFormat="MM/dd/yyyy"
                          confirmBtnText="Confirm"
                          showCancelButton="true"
                          customStyles={{
                            placeholderText: {
                              fontSize: 5,
                            },
                            dateIcon: {
                              height: 0,
                              width: 0,
                            },
                            dateText: {
                              color: "#b3b4b5",
                              fontSize: 16,
                            },
                            dateInput: {
                              borderWidth: 0,
                            },
                          }}
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <MDBox mb={2} mx={0}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-8">
                        <MDInput
                          type="text"
                          label="Purpose"
                          disabled
                          value={purposey || ""}
                          onChange={(e) => setPurposey(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default View;
