/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Accordion from "react-bootstrap/Accordion";
import Paper from "@mui/material/Paper";
import { Container, Form, Button } from "react-bootstrap";
import Select from "react-select";
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

import example from "./example.jpg";
import "../Force.css";

function Csv() {
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [corporateID, setCorporateID] = useState([]);
  const options = corporateID.map((d) => ({
    value: d.id,
    label: d.name,
  }));
  options.unshift({ value: "", label: "None" });
  const [corp, setCorp] = useState("");
  const [duty, setDutyRelieverx] = useState("");
  const [user, setUser] = useState([]);
  const [file, setFile] = useState([]);
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      width: "300px",
      borderBottom: "1px dotted pink",
      color: "black",
      padding: 0,
      fontSize: 15,
      marginLeft: 60,
      marginTop: 0,
    }),
  };
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
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/corporate/gets/${orgIDs}`, { headers })
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
          setCorporateID(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete(results) {
        const data11 = JSON.parse(localStorage.getItem("user1"));
        const orgIDs = data11.orgID;
        const personalIDs = data11.personalID;
        const dutyx = Number(duty);
        const obj = results.data;
        const objx = obj.map(
          ({
            fname,
            lname,
            oname,
            title,
            street,
            city,
            state,
            country,
            email,
            pno,
            dayOfBirth,
            monthOfBirth,
            yearOfBirth,
            twitter,
            facebook,
            linkedIn,
            instagram,
            portfolio,
            website,
            occupation,
            maritalStatus,
            // eslint-disable-next-line arrow-body-style
          }) => {
            return {
              fname,
              lname,
              oname,
              title,
              street,
              city,
              state,
              country,
              email,
              dayOfBirth: Number(dayOfBirth),
              monthOfBirth: Number(monthOfBirth),
              yearOfBirth: Number(yearOfBirth),
              twitter,
              facebook,
              linkedIn,
              instagram,
              portfolio,
              website,
              occupation,
              maritalStatus,
              // eslint-disable-next-line no-eval
              pno: `${Number(pno)}` ? `${Number(pno)}` : "invalid",
            };
          }
        );

        objx.forEach((element) => {
          element.orgID = orgIDs;
          element.corporateID = corp;
          element.createdBy = dutyx;
          element.accountOwnerID = personalIDs;
        });
        const objc = objx.map(
          ({
            orgID,
            corporateID,
            createdBy,
            accountOwnerID,
            fname,
            lname,
            oname,
            title,
            street,
            city,
            state,
            country,
            email,
            pno,
            dayOfBirth,
            monthOfBirth,
            yearOfBirth,
            twitter,
            facebook,
            linkedIn,
            instagram,
            portfolio,
            website,
            occupation,
            maritalStatus,
            // eslint-disable-next-line arrow-body-style
          }) => {
            return {
              fname,
              lname,
              oname,
              title,
              street,
              city,
              state,
              pno: String(pno),
              country,
              email,
              dayOfBirth,
              monthOfBirth,
              yearOfBirth,
              twitter,
              facebook,
              linkedIn,
              instagram,
              portfolio,
              website,
              occupation,
              maritalStatus,
              orgID,
              corporateID,
              createdBy,
              accountOwnerID,
            };
          }
        );
        const why = JSON.stringify(objc);
        setFile(why);
      },
    });
  };
  const handleChanges = (selectedOption) => {
    setCorp(selectedOption.value);
  };
  const handleUpload = () => {
    const raw = file;
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/add`, requestOptions)
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
          <Accordion.Header>Add Multiple Individual Clients (CSV files only)</Accordion.Header>
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
                  <div className="col-sm-6">
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
                  </div>
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
                    same as the words in the image below in row 1 A - U (should be camelCase when
                    necessary. The first row order does not matter, in essence, you may have fname
                    or lname or title at any position you want) and your further details in each row
                    should be corresponding to the content of the first row (i.e under
                    &apos;fname&apos; you should have first name e.t.c... <br /> please open image
                    in new tab to zoom in for a clearer view)
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
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
          <CircularProgress color="info" />
        </Backdrop>
      </Accordion>
    </div>
  );
}

export default Csv;
