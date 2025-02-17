import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
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
import DatePicker from "react-datepicker";
import MDButton from "components/MDButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Styles from "styles";

function TimeoffRequestUpdate() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [idx, setIdx] = useState("");
  const [empSetup, setEmpSetup] = useState([]);
  const [empSetupIdx, setEmpSetupId] = useState("");
  const [daysx, setDaysx] = useState("");
  const [daysapprovex, setDaysapprovex] = useState("");
  const [startx, setStartx] = useState("");
  const [endx, setEndx] = useState("");
  const [resumex, setResumex] = useState("");
  const [dutyrelieverx, setDutyrelieverx] = useState("");
  const [createdx, setCreatedx] = useState("");
  const [purposex, setPurposex] = useState("");
  const [deletex, setDeletex] = useState("");
  const [approvex, setApprovex] = useState("");
  const [adminx, setAdminx] = useState("");
  const [reasonx, setReasonx] = useState("");
  const [statusx, setStatusx] = useState("");

  const [user, setUser] = useState([]);
  const [opened, setOpened] = useState(false);

  // Method to fetch all timeofftype
  const getAllEmployeeTimeOffTransaction = () => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
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
        setOpened(false);
        if (result.length !== 0) {
          setIdx(result[0].id);
          setEmpSetupId(result[0].empSetupID);
          setDaysx(result[0].noOfDaysRequested);
          setDaysapprovex(result[0].noOfDaysApproved);
          setStartx(result[0].startDate);
          setEndx(result[0].endDate);
          setResumex(result[0].resumptionDate);
          setDutyrelieverx(result[0].dutyRelieverID);
          setCreatedx(result[0].createdDate);
          setPurposex(result[0].purpose);
          setDeletex(result[0].deleteFlag);
          setApprovex(result[0].approverID);
          setAdminx(result[0].adminID);
          setReasonx(result[0].reasonForDisapproval);
          setStatusx(result[0].status);
        } else {
          setIdx(null);
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
        getAllEmployeeTimeOffTransaction(headers, orgIDs);
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

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
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
        if (isMounted) {
          setEmpSetup(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdate = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIds = data11.id;
    const orgIDs = data11.orgID;

    const startCDate = new Date(startx).getTime();
    const endCDate = new Date(endx).getTime();
    const resumptionCDate = new Date(resumex).getTime();
    const CurTime = new Date().getTime();

    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      empID: personalIds,
      empSetupID: empSetupIdx,
      noOfDaysRequested: daysx,
      noOfDaysApproved: daysapprovex,
      startDate: startCDate,
      endDate: endCDate,
      resumptionDate: resumptionCDate,
      dutyRelieverID: dutyrelieverx,
      createdDate: createdx,
      purpose: purposex,
      deleteFlag: deletex,
      approverID: approvex,
      adminID: adminx,
      reasonForDisapproval: reasonx,
      status: statusx,
    });
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
      fetch(
        `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/update`,
        requestOptions
      )
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
  };

  // const handleOnPurposeKeys = () => {
  //   const letters = /^[a-zA-Z ]+$/;
  //   if (!purposex.match(letters)) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("purpose").innerHTML =
  //       "Purpose - input only capital and small letters<br>";
  //   }
  //   if (purposex.match(letters)) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("purpose").innerHTML = "";
  //     handleUpdate();
  //   }
  //   if (purposex.length === 0) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("purpose").innerHTML = "Purpose is required<br>";
  //   }
  //   // setEnabled(checkedTitle === true);
  // };

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
                  mx={2}
                  mt={-6}
                  p={3}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                    Update Time Off-Requests
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
                  <MDTypography variant="gradient" fontSize="60%" color="error" id="title">
                    {" "}
                  </MDTypography>
                  <MDTypography variant="gradient" fontSize="60%" color="error" id="purpose">
                    {" "}
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
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
                            Start Date
                          </MDTypography>
                          <DatePicker
                            placeholderText="Start Date"
                            style={{ marginRight: "10px" }}
                            selected={startx}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            onChange={(start) => setStartx(start)}
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
                            End Date
                          </MDTypography>
                          <DatePicker
                            placeholderText="End Date"
                            selected={endx}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            onChange={(end) => setEndx(end)}
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
                            Resumption Date
                          </MDTypography>
                          <DatePicker
                            placeholderText="Resumption Date"
                            style={{ marginRight: "10px" }}
                            selected={resumex}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            onChange={(resumptiondate) => setResumex(resumptiondate)}
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
                            Time Off Category
                          </MDTypography>
                          <Form.Select
                            onChange={(e) => setEmpSetupId(e.target.value)}
                            aria-label="Default select example"
                            value={empSetupIdx}
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
                      <div className="col-sm-5">
                        <MDBox mt={2}>
                          <MDTypography
                            variant="button"
                            fontWeight="regular"
                            fontSize="80%"
                            align="left"
                            color="text"
                          >
                            Duty Reliever
                          </MDTypography>
                          <Form.Select
                            value={dutyrelieverx}
                            onChange={(e) => setDutyrelieverx(e.target.value)}
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
                            Select Admin
                          </MDTypography>
                          <Form.Select
                            value={adminx || ""}
                            onChange={(e) => setAdminx(e.target.value)}
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
                    <div className="col-sm-12">
                      <MDBox mt={2}>
                        <MDInput
                          type="text"
                          value={purposex || ""}
                          onChange={(e) => setPurposex(e.target.value)}
                          label="Purpose"
                          variant="standard"
                          style={{ width: "100%" }}
                        />
                      </MDBox>
                    </div>
                  </Container>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    onClick={() => {
                      if (
                        startx === "" ||
                        endx === "" ||
                        resumex === "" ||
                        empSetupIdx === "" ||
                        adminx === "" ||
                        dutyrelieverx === "" ||
                        purposex === ""
                        // || empSetupIdx === ""
                      ) {
                        MySwal.fire({
                          title: "EMPTY_TEXTFIELDS",
                          type: "error",
                          text: "Please Fill All Fields",
                        });
                      } else {
                        handleUpdate();
                      }
                    }}
                    // color="info"
                    style={Styles.buttonSx}
                    width="50%"
                    align="center"
                  >
                    Update
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </div>
      </div>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default TimeoffRequestUpdate;
