import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Form } from "react-bootstrap";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DataTable from "examples/Tables/DataTable";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import TimeOffRequestData from "layouts/timeoffRequests/timeOffRequestTable/timeOffRequests";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Styles from "styles";
// Dem no aw we do it every december 😎 --ZINO

function TimeOff() {
  const [purposex, setPurpose] = useState("");
  const [adminIdx, setAdminIdx] = useState("");
  const [duty, setDutyRelieverx] = useState("");
  const [titlex, setTitilex] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [resumptionDate, setresumptionDate] = useState("");
  const [approvex, setApprover] = useState("");

  const [user, setUser] = useState([]);
  const [empSetup, setEmpSetup] = useState([]);
  const [empSetupIdx, setEmpSetupId] = useState("");
  const { columns: pColumns, rows: pRows } = TimeOffRequestData();

  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const getAllEmployeeTimeOffSetup = (headers, orgIDs) => {
    fetch(`${process.env.REACT_APP_NSUTANA_URL}/employeetimeoffsetup/getAll/${orgIDs}`, {
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
        setOpened(false);
        if (result?.length > 0) {
          setEmpSetup(result);
        } else {
          setEmpSetup([]);
        }
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

  const getAllUserInfo = (headers, orgIDs) => {
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
        getAllEmployeeTimeOffSetup(headers, orgIDs);
        if (result?.length > 0) {
          setUser(result);
        } else {
          setUser([]);
        }
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
    setOpened(true);
    let isMounted = true;
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    if (isMounted) {
      getAllUserInfo(headers, orgIDs);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const addTimeOffJourney = (eTOTId, currentholderID, orgIDs) => {
    const raw2 = JSON.stringify({
      orgID: orgIDs,
      employeeTimeOffTransactionID: eTOTId.data.id,
      currentHolderID: currentholderID,
    });
    const requestOptions2 = {
      method: "POST",
      headers: myHeaders,
      body: raw2,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeoffjourney/add`, requestOptions2)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resulty) => {
        setOpened(false);
        if (resulty.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resulty.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resulty.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (resulty.status === "SUCCESS") {
          MySwal.fire({
            title: eTOTId.status,
            type: "success",
            text: eTOTId.message,
          }).then(() => {
            window.location.reload();
          });
        } else {
          MySwal.fire({
            title: eTOTId.status,
            type: "error",
            text: eTOTId.message,
          });
        }
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

  const addTimeOffRequest = (requestOptions, currentholderID, orgIDs) => {
    fetch(`${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/add`, requestOptions)
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
        if (resultx.status === "SUCCESS") {
          addTimeOffJourney(resultx, currentholderID, orgIDs);
        } else {
          setOpened(false);
          MySwal.fire({
            title: resultx.status,
            type: "error",
            text: resultx.message,
          });
        }
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

  const handleAddEvent = (e) => {
    setOpened(true);
    const startCDate = new Date(startDate).getTime();
    const endCDate = new Date(endDate).getTime();
    const resumptionCDate = new Date(resumptionDate).getTime();
    const CurTime = new Date().getTime();
    const headers = miHeaders;

    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIds = data11.personalID;
    const orgIDs = data11.orgID;

    fetch(
      `${process.env.REACT_APP_NSUTANA_URL}/freedays/getBetween/${orgIDs}/${startCDate}/${endCDate}`,
      { headers }
    )
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

        const numberOfFreedays = result.length;
        const startDateandendDate = endCDate - startCDate;
        const varx = 24 * 60 * 60 * 1000;
        const numofdays = Math.ceil(startDateandendDate / varx) - numberOfFreedays;

        const currentholderID = data11.personalID;

        const raw = JSON.stringify({
          orgID: orgIDs,
          empID: personalIds,
          empSetupID: empSetupIdx,
          noOfDaysRequested: numofdays,
          startDate: startCDate,
          endDate: endCDate,
          resumptionDate: resumptionCDate,
          dutyRelieverID: duty,
          purpose: purposex,
          approverID: approvex,
          adminID: adminIdx,
        });
        console.log(raw);
        console.log({ data: raw, currentTimestamp: new Date().getTime() });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        let check = 0;
        if (startCDate < CurTime) {
          check = 1;
          setOpened(false);
          MySwal.fire({
            title: "Invalid Date",
            type: "error",
            text: "Please Enter A Start Date From The Future",
          });
          return;
        }
        if (endCDate < startCDate) {
          check = 1;
          setOpened(false);
          MySwal.fire({
            title: "Invalid Ending Date",
            type: "error",
            text: "Please Enter An End Date From The Future",
          });
          return;
        }
        if (resumptionCDate < endCDate) {
          check = 1;
          setOpened(false);
          MySwal.fire({
            title: "Invalid Resuming Date",
            type: "error",
            text: "Please Enter A Resumption Date After The End Date",
          });
          return;
        }

        if (check === 0) {
          addTimeOffRequest(requestOptions, currentholderID, orgIDs);
        }
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            style={Styles.boxSx}
            // coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Time Off Requests
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="requested">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="starting">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="ending">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="resuming">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="purpose">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="title">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <MDBox mt={2}>
                      <MDInput
                        type="text"
                        value={titlex || ""}
                        onChange={(e) => setTitilex(e.target.value)}
                        label="Title*"
                        variant="standard"
                        style={{ width: "100%" }}
                      />
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-5">
                    <MDBox mt={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        Start Date*
                      </MDTypography>
                      <DatePicker
                        placeholderText="Start Date"
                        style={{ marginRight: "10px" }}
                        selected={startDate}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onChange={(start) => setStartDate(start)}
                      />
                    </MDBox>
                  </div>
                  <div className="col-sm-2" />
                  <div className="col-sm-5">
                    <MDBox mt={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        End Date*
                      </MDTypography>
                      <DatePicker
                        placeholderText="End Date"
                        selected={endDate}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onChange={(end) => setEndDate(end)}
                      />
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-5">
                    <MDBox mt={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        Resumption Date*
                      </MDTypography>
                      <DatePicker
                        placeholderText="Resumption Date"
                        style={{ marginRight: "10px" }}
                        selected={resumptionDate}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        onChange={(resumptiondate) => setresumptionDate(resumptiondate)}
                      />{" "}
                    </MDBox>
                  </div>
                  <div className="col-sm-2" />
                  <div className="col-sm-5">
                    <MDBox mt={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        Time Off Category*
                      </MDTypography>
                      <Form.Select
                        onChange={(e) => setEmpSetupId(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Select Timeoff Category</option>
                        {empSetup.map((api) => (
                          <option key={api.setup.id} value={api.setup.id}>
                            {api.timeOffTypeCondition.name}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDBox mt={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        Duty Reliever*
                      </MDTypography>
                      <Form.Select
                        value={duty}
                        onChange={(e) => setDutyRelieverx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Select Duty Reliever</option>
                        {user.map((api) => (
                          <option key={api.personal.id} value={api.personal.id}>
                            {api.personal.fname} {api.personal.lname}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                  </div>
                  <div className="col-sm-6">
                    <MDBox mt={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        Select Admin*
                      </MDTypography>
                      <Form.Select
                        value={adminIdx || ""}
                        onChange={(e) => setAdminIdx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Select Admin</option>
                        {user.map((api) => (
                          <option key={api.personal.id} value={api.personal.id}>
                            {api.personal.fname} {api.personal.lname}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="col-sm-6">
                  <MDBox mt={2}>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      align="left"
                      color="text"
                    >
                      Select Approver*
                    </MDTypography>
                    <Form.Select
                      value={approvex || ""}
                      onChange={(e) => setApprover(e.target.value)}
                      aria-label="Default select example"
                    >
                      <option value="">Select Approver</option>
                      {user.map((api) => (
                        <option key={api.personal.id} value={api.personal.id}>
                          {api.personal.fname} {api.personal.lname}
                        </option>
                      ))}
                    </Form.Select>
                    <br />
                  </MDBox>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <MDBox mt={2}>
                      <MDInput
                        type="text"
                        value={purposex || ""}
                        onChange={(e) => setPurpose(e.target.value)}
                        label="Purpose*"
                        variant="standard"
                        style={{ width: "100%" }}
                      />
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={2} mb={2}>
              <MDButton
                variant="gradient"
                onClick={(e) => {
                  if (
                    titlex === "" ||
                    startDate === "" ||
                    endDate === "" ||
                    resumptionDate === "" ||
                    approvex === "" ||
                    adminIdx === "" ||
                    duty === "" ||
                    purposex === ""
                    // || empSetupIdx === ""
                  ) {
                    MySwal.fire({
                      title: "EMPTY_TEXTFIELDS",
                      type: "error",
                      text: "Please Fill All Fields",
                    });
                  } else {
                    handleAddEvent(e);
                  }
                }}
                // color="info"
                style={Styles.buttonSx}
                width="50%"
                align="left"
              >
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: pRows }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default TimeOff;
