/* eslint-disable no-unused-vars */
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { Container, Form, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TextField from "@mui/material/TextField";
import "react-datepicker/dist/react-datepicker.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import MultipleUpload from "layouts/offboardingCompany/multipleuploading";
import OffboardingCompanyTable from "./data";

function OffboardingCompany() {
  const { columns: pColumns, rows: pRows } = OffboardingCompanyTable();
  const MySwal = withReactContent(Swal);
  const [opened, setOpened] = useState(false);
  const [onboardingx, setOnboardingx] = useState("");
  const [scatter, setScatter] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const navigate = useNavigate();
  const [userxx, setUserxx] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
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
          console.log(result);
          setUserxx(result);
          setOpened(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreate = () => {
    const OpeningDate = new Date(start).getTime();
    const ClosingDate = new Date(end).getTime();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const createdByx = data11.personalID;
    const CurTime = new Date().getTime();

    const filt = scatter
      .filter((r) => r.ticked === true)
      .map((r) => ({
        orgID: orgIDs,
        empID: r.empID,
        startTime: r.startTime,
        endTime: r.endTime,
        createdBy: Number(createdByx),
      }));
    const raw = JSON.stringify(filt);
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const check = 0;
    // if (OpeningDate < CurTime) {
    //   check = 1;
    //   MySwal.fire({
    //     title: "Invalid Date",
    //     type: "error",
    //     text: "Please Enter A Date From The Future",
    //   });
    // }
    // if (ClosingDate < OpeningDate) {
    //   check = 1;
    //   MySwal.fire({
    //     title: "Invalid Ending Date",
    //     type: "error",
    //     text: "Please Enter A Date From The Future",
    //   });
    // }

    if (check === 0) {
      fetch(`${process.env.REACT_APP_RAGA_URL}/offboarding/addMultiple`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((resultr) => {
          console.log(resultr);
          if (resultr.message === "Expired Access") {
            navigate("/authentication/sign-in");
          }
          if (resultr.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
          }
          if (resultr.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
          }
          setOpened(false);
          MySwal.fire({
            title: resultr.status,
            type: "success",
            text: "Added Offboarding User(s) Successfully.",
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

  const organize = (e, val) => {
    scatter[val] = { ...scatter[val], inde: val, endTime: new Date(e.target.value).getTime() };
    setScatter(scatter);
  };
  const organize2 = (e, val, idx) => {
    scatter[val] = { ...scatter[val], startTime: new Date(e.target.value).getTime(), empID: idx };
    setScatter(scatter);
  };
  const organize3 = (e, val, ver) => {
    scatter[val] = { ...scatter[val], ticked: ver };
    setScatter(scatter);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <MDBox mx={1}>
        <Card>
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
                Add Offboarding User
              </MDTypography>
            </MDBox>
            <br />
            <MDBox>
              <Container>
                <MDBox>
                  {/* <MDTypography variant="button" fontWeight="regular" fontSize="80%" color="text">
                    Onboarding User
                  </MDTypography>
                  <Form.Select
                    value={onboardingx}
                    onChange={(e) => setOnboardingx(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option value="">Select Onboarding User</option>
                    {userxx.map((api) => (
                      <option key={api.personal.id} value={api.personal.id}>
                        {api.personal.fname} {api.personal.lname}
                      </option>
                    ))}
                  </Form.Select> */}
                  <MDTypography variant="button" fontWeight="regular" fontSize="70%" color="text">
                    Select User(s)
                  </MDTypography>
                  {userxx.map((api, indx) => (
                    <Row
                      key={api.personal.id}
                      style={{ textAlign: "left", borderBottom: "1px solid gray" }}
                    >
                      <Col style={{ paddingTop: "30px" }} sm={4}>
                        <Form.Check.Input
                          type="checkbox"
                          value={api.personal.id}
                          defaultChecked={api.isCheck}
                          onClick={(e) => organize3(e, indx, e.target.checked)}
                        />
                        <Form.Check.Label style={{ fontSize: "16px" }}>
                          &nbsp;{api.personal.fname} {api.personal.lname}
                        </Form.Check.Label>
                      </Col>
                      <Col style={{ paddingBottom: "2px" }}>
                        <div className="row">
                          <div className="col-sm-5">
                            <b style={{ fontSize: "11px" }}>offboarding starts</b>
                            <TextField
                              id="datetime-local"
                              // label="onboarding starts"
                              type="datetime-local"
                              // style={{ width: "150px" }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              // value={closing}
                              onChange={(e) => {
                                organize2(e, indx, api.personal.id);
                              }}
                            />
                          </div>

                          <div className="col-sm-4">
                            <b style={{ fontSize: "11px" }}>offboarding ends</b>
                            <TextField
                              id="datetime-local"
                              // label="onboarding starts"
                              type="datetime-local"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              // value={closing}
                              onChange={(e) => {
                                organize(e, indx);
                                // setClosingTime(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </Col>
                      &nbsp;
                    </Row>
                  ))}
                </MDBox>
                <br />
              </Container>
              <MDBox textAlign="center" mx={3}>
                <MDBox textAlign="center" p={3}>
                  <MDButton color="success" variant="gradient" onClick={handleCreate} size="large">
                    ADD
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <br />
      <MultipleUpload />
      <br />
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
      <br />
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default OffboardingCompany;
