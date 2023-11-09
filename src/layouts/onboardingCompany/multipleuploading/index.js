/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Accordion from "react-bootstrap/Accordion";
import Paper from "@mui/material/Paper";
import { Container, Form, Button } from "react-bootstrap";
// import Select from "react-select";
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import MDTypography from "components/MDTypography";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
// import MDButton from "components/MDButton";

import example from "./example.png";
import "./Force.css"; // ./example.jpg

function MultipleUpload() {
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [duty, setDutyRelieverx] = useState("");
  const [user, setUser] = useState([]);
  const [file, setFile] = useState([]);
  const [opened, setOpened] = useState(false);
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
  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const orgIDs = data11.orgID;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/corporate/gets/${orgIDs}`, { headers })
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       if (result.message === "Expired Access") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Token Does Not Exist") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Unauthorized Access") {
  //         navigate("/authentication/forbiddenPage");
  //         window.location.reload();
  //       }
  //       if (isMounted) {
  //         console.log(result);
  //         setCorporateID(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete(results) {
        const data11 = JSON.parse(localStorage.getItem("user1"));
        const orgIDs = data11.orgID;
        const personalIDs = data11.personalID;
        const dutyx = duty;
        // const date = new Date(start);
        // const startx = start;
        // const endx = end;
        //         orgID": "string",
        // "empID": 0,
        // "startTime": 0,
        // "endTime": 0,
        // "status": 0,
        // "createdBy": 0,
        // "deleteFlag": 0,
        // "terminatedBy": 0,
        // "terminatedTime": 0
        const obj = results.data;
        console.log(obj);
        const objx = obj.map(
          ({
            empID,
            startTime,
            endTime,
            orgID,
            createdBy,
            // eslint-disable-next-line arrow-body-style
          }) => {
            console.log(startTime);
            console.log(endTime);
            const nstart = new Date(startTime);
            console.log(nstart);
            const nend = new Date(endTime);
            console.log(nend);
            return {
              empID,
              startTime: nstart.getTime(),
              endTime: nend.getTime(),
              orgID,
              createdBy,
            };
          }
        );
        console.log(objx);

        objx.forEach((element) => {
          element.orgID = orgIDs;
          element.createdBy = dutyx;
          element.empID = personalIDs;
          // "empID": 0,
          // "startTime": 0,
          // "endTime": 0,
          // "status": 0,
          // "createdBy": 0,
          // "deleteFlag": 0,
          // "terminatedBy": 0,
          // "terminatedTime": 0
        });
        const objc = objx.map(
          ({
            orgID,
            // corporateID,
            createdBy,
            startTime,
            endTime,
            empID,
            // eslint-disable-next-line arrow-body-style
          }) => {
            return {
              empID,
              startTime,
              endTime,
              orgID,
              createdBy,
            };
          }
        );
        console.log(objx);
        const why = JSON.stringify(objc);
        console.log(why);
        setFile(why);
      },
    });
  };
  const handleUpload = () => {
    const raw = file;
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    fetch(`${process.env.REACT_APP_RAGA_URL}/onboarding/addMultiple`, requestOptions)
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
  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Add Multiple Upload On My Onboarding</Accordion.Header>
          <Accordion.Body>
            <Paper elevation={3}>
              <MDBox textAlign="center" mt={3}>
                <div className="row">
                  <div className="col-sm-6">
                    <Container>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
                        color="text"
                      >
                        Account Owner
                      </MDTypography>
                      <br />
                      <Form.Select
                        value={duty}
                        onChange={(e) => setDutyRelieverx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Select Account Owner</option>
                        {user.map((api) => (
                          <option key={api.personal.id} value={api.personal.id}>
                            {api.personal.fname} {api.personal.lname}
                          </option>
                        ))}
                      </Form.Select>
                    </Container>
                  </div>
                  <br />
                  {/* <div className="col-sm-6">
                    <Container>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
                        color="text"
                      >
                        Corporate Name
                      </MDTypography>

                      <Select options={options} onChange={handleChanges} styles={customStyles} />

                      <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                    </Container>
                    <br />
                  </div> */}
                  {/* <MDBox textAlign="center" mx={3}>
                    <Row style={{ paddingBottom: "70px" }}>
                      <Col>
                        <MDTypography
                          variant="p"
                          fontWeight="light"
                          color="secondary"
                          fontSize="90%"
                        >
                          <br />
                          Onboarding Begins
                        </MDTypography>
                        <Container>
                          <DatePicker
                            placeholderText="MM/DD/YY hh:mm"
                            style={{ marginRight: "2px" }}
                            selected={start}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            showTimeSelect
                            dateFormat="MM/dd/yyyy h:mm aa"
                            dropdownMode="select"
                            onChange={(time) => setStart(time)}
                          />
                        </Container>
                      </Col>
                      <Col>
                        <MDTypography
                          variant="p"
                          fontWeight="light"
                          color="secondary"
                          fontSize="90%"
                        >
                          <br />
                          Onboarding Ends
                        </MDTypography>
                        <Container>
                          <DatePicker
                            placeholderText="MM/DD/YY hh:mm"
                            style={{ marginRight: "10px" }}
                            selected={end}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            showTimeSelect
                            dateFormat="MM/dd/yyyy h:mm aa"
                            dropdownMode="select"
                            onChange={(time) => setEnd(time)}
                          />
                        </Container>
                      </Col>
                    </Row>
                    {/* <MDBox textAlign="center" p={3}>
                      <MDButton
                        color="success"
                        variant="gradient"
                        onClick={handleCreate}
                        size="large"
                      >
                        ADD
                      </MDButton>
                    </MDBox>
                  </MDBox> */}
                </div>
                <u>Before Proceeding Read carefully:</u>
                <MDBox p={3} mt={2}>
                  <MDTypography
                    variant="h4"
                    fontWeight="regular"
                    fontSize="75%"
                    textAlign="center"
                    color="text"
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;The first line/row in your csv file must be exactly the
                    same as the words in the image below in row 1 (The first row order does not
                    matter, in essence, you may have start time or end time or title at any position
                    you want) and your further details in each row should be corresponding to the
                    content of the first row (i.e under &apos;Start Time&apos; you should have
                    starting date and time e.t.c... <br /> please open image in new tab to zoom in
                    for a clearer view)
                  </MDTypography>
                </MDBox>
                <img className="img" src={example} alt="example" />
                <br />
                <MDBox textAlign="center" p={5}>
                  <MDTypography
                    variant="h4"
                    fontWeight="regular"
                    fontSize="75%"
                    textAlign="center"
                    color="text"
                  >
                    <input
                      type="file"
                      name="file"
                      accept=".csv"
                      onChange={changeHandler}
                      style={{ display: "block", margin: "10px auto" }}
                    />
                  </MDTypography>
                </MDBox>
                <Button onClick={handleUpload} variant="success">
                  Upload
                </Button>
              </MDBox>
              <br />
              <br />
            </Paper>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3" onClick={() => navigate("/onboarding/multi-sessions")}>
          <Accordion.Header>Add Multiple Onboarding Sessions</Accordion.Header>
        </Accordion.Item>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
          <CircularProgress color="info" />
        </Backdrop>
      </Accordion>
    </div>
  );
}

export default MultipleUpload;
