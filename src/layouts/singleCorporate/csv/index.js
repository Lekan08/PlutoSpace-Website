/* eslint-disable import/no-unresolved */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Accordion from "react-bootstrap/Accordion";
import Paper from "@mui/material/Paper";
import { Button, Container, Form } from "react-bootstrap";
// import Select from "react-select";
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import MDTypography from "components/MDTypography";
import Swal from "sweetalert2";

import Styles from "styles";

import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import example from "./example.PNG";
import "../Force.css";

function Csv() {
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
  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete(results) {
        const data11 = JSON.parse(localStorage.getItem("user1"));
        const orgIDs = data11.orgID;
        const personalIDs = data11.personalID;
        const dutyx = Number(duty);
        const obj = results.data;
        console.log(obj);
        function convertIntObj(obj) {
          const res = [];
          for (const key in obj) {
            res[key] = {};
            for (const prop in obj[key]) {
              const parsed = parseInt(obj[key][prop], 10);
              // eslint-disable-next-line no-restricted-globals
              res[key][prop] = isNaN(parsed) ? obj[key][prop] : parsed;
            }
          }
          return res;
        }

        const result = convertIntObj(obj);
        console.log(result);
        result.forEach((element) => {
          // eslint-disable-next-line no-param-reassign
          element.orgID = orgIDs;
          // eslint-disable-next-line no-param-reassign
          // element.corporateID = corp;
          // eslint-disable-next-line no-param-reassign
          element.createdBy = dutyx;
          // eslint-disable-next-line no-param-reassign
          element.accountOwnerID = personalIDs;
        });
        const why = JSON.stringify(result);
        setFile(why);
        // const wow = JSON.stringify(resultx);
        // console.log(wow);

        // console.log("Object result", result);

        // const x = results.data;
        // const y = x.forEach((element) => {
        //   // eslint-disable-next-line no-param-reassign
        //   element.b = "qux";
        // });
        // console.log(y)
        // const p = JSON.stringify(results.data);
        // console.log(p);
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
    fetch(`${process.env.REACT_APP_LOUGA_URL}/corporate/add`, requestOptions)
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
          <Accordion.Header>Add Multiple Corporate Excel Sheet (CSV files only)</Accordion.Header>
          <Accordion.Body>
            <Paper elevation={3}>
              <MDBox textAlign="center" mt={3}>
                <MDBox mx={25}>
                  {/* <div className="row">
                    <div className="col-sm-8"> */}
                  <Container>
                    <br />
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
                  {/* </div>
                  </div> */}
                </MDBox>
                <br />
                <br />
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
                    same as the words in the image below in row 1 A - N (should be camelCase when
                    necessary. The first row order does not matter, in essence, you may have name or
                    state or city at any position you want) and your further details in each row
                    should be corresponding to the content of the first row (i.e under
                    &apos;name&apos; you should have full name e.t.c... <br /> please open image in
                    new tab to zoom in for a clearer view)
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
                <Button onClick={handleUpload}                                                                                                                                                    variant="success">
                  Upload
                </Button>
              </MDBox>
              <br />
              <br />
            </Paper>
          </Accordion.Body>
        </Accordion.Item>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
          <CircularProgress color="info" />
        </Backdrop>
      </Accordion>
    </div>
  );
}

export default Csv;
