import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Container, Form } from "react-bootstrap";
import MDInput from "components/MDInput";

import Styles from "styles";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";
import MattersArisingTable from "layouts/mattersArising/data/mattersArising";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function MattersArising() {
  const MySwal = withReactContent(Swal);
  const [titlex, setTitle] = useState("");
  const [messagex, setMessage] = useState("");
  const [levelx, setLevel] = useState("");

  const [checkedMessage, setCheckedMessage] = useState(false);

  const { columns: pColumns, rows: pRows } = MattersArisingTable();

  const [checkedTitle, setCheckedTitle] = useState(false);
  const [opened, setOpened] = useState(false);
  // const [checkedMessage, setCheckedMessage] = useState("");
  // const [enabled, setEnabled] = useState("");
  const [raisedto, setRaisedTO] = useState("");

  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const handleOnTitleKeys = (value) => {
    const letters = /^[a-zA-Z ]+$/;
    if (!value.match(letters)) {
      setCheckedTitle(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML =
        "Title - input only capital and small letters<br>";
    }
    if (value.match(letters)) {
      setCheckedTitle(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML = "Title is required<br>";
    }
    // setEnabled(checkedTitle === true && checkedMessage === true);
  };

  const handleOnMessageKeys = (value) => {
    if (value.length === 0) {
      setCheckedMessage(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("message").innerHTML = "Message is required<br>";
    } else {
      setCheckedMessage(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("message").innerHTML = "";
    }
    // setEnabled(checkedTitle === true && checkedMessage === true);
  };

  const handleClick = (e) => {
    if (levelx === "") {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("level").innerHTML = "Level is required<br>";
    } else {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("level").innerHTML = "";
    }
    if (raisedto === "") {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("raisedTo").innerHTML = "Raised To is required<br>";
    } else {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("raisedTo").innerHTML = "";
    }
    if (checkedTitle === true && checkedMessage === true && levelx !== "" && raisedto !== "") {
      setOpened(true);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      const ids = data11.personalID;

      const raw = JSON.stringify({
        orgID: orgIDs,
        title: titlex,
        message: messagex,
        level: levelx,
        raisedBy: ids,
        raisedTo: raisedto,
        // escalatedTo: 0,
        //   status: 0,
        //   escalationTime: 0,
        //   reasonForEscalation: "string",
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_SHASHA_URL}/concern/add`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          setOpened(false);
          if (result.message === "Expired Access") {
            navigate("/authentication/sign-in");
          }
          if (result.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
          }
          if (result.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
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
          setOpened(false);
          MySwal.fire({
            title: error.status,
            type: "error",
            text: error.message,
          });
        });
    }
  };

  useEffect(() => {
    const headers = miHeaders;
    setOpened(true);

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
        setOpened(false);
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
          setUser(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // const handleOnMessageKeys = () => {
  //   const letters = /^[a-zA-Z ,.?;:'#*!()" ]+$/;
  //   if (!messagex.match(letters)) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("message").innerHTML =
  //       "Message - input only capital and small letters<br>";
  //   }
  //   if (messagex.match(letters)) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("message").innerHTML = "";
  //   }
  //   if (messagex.length === 0) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("message").innerHTML = "Message is required<br>";
  //   }
  //   // setEnabled(checkedMessage === true);
  // };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox
            variant="gradient"
            style={{ backgroundColor: "#f96d02" }}
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Matters Arising
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="message">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="level">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="raisedTo">
              {" "}
            </MDTypography>
          </MDBox>
          {/* <MDBox component="form" role="form" name="form1"> */}
          <MDBox mb={2}>
            <Container>
              <div className="row">
                <div className="col-sm-6">
                  <MDInput
                    type="text"
                    label="Title*"
                    value={titlex || ""}
                    onKeyUp={(e) => handleOnTitleKeys(e.target.value)}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="standard"
                    fullWidth
                  />
                </div>

                {/* <Container>
                <div className="row"> */}
                <div className="col-sm-6">
                  <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                    <Form.Label style={{ fontSize: 14 }}>Message*</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={messagex || ""}
                      onKeyUp={(e) => handleOnMessageKeys(e.target.value)}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={2}
                    />
                  </Form.Group>
                </div>
                {/* </div>
                 </Container> */}

                {/* <div className="col-sm-6">
                  <MDInput
                    type="text"
                    label="Message *"
                    value={messagex || ""}
                    onKeyUp={handleOnMessageKeys}
                    onChange={(e) => setMessage(e.target.value)}
                    variant="standard"
                    fullWidth
                  />
                </div> */}
              </div>
            </Container>
          </MDBox>
          <MDBox>
            {/* <MDBox mb={2}> */}
            <Container>
              <div className="row">
                <div className="col-sm-6">
                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Level*
                    </MDTypography>
                    <Form.Select
                      aria-label="Default select example"
                      value={levelx || ""}
                      onChange={(e) => setLevel(e.target.value)}
                    >
                      <option>---Level---</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="HIGH">High</option>
                      <option value="Critical">Critical</option>
                    </Form.Select>
                  </MDBox>
                </div>
                <div className="col-sm-6">
                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Raised To*
                    </MDTypography>
                    <Form.Select
                      value={raisedto}
                      onChange={(e) => setRaisedTO(e.target.value)}
                      aria-label="Default select example"
                    >
                      <option value="">Select Raised To</option>
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
              {/* </Container>
                <MDBox>
                  <Container> */}
              {/* <div className="row"> */}
            </Container>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleClick}
                style={Styles.buttonSx}
                width="50%"
                align="center"
              >
                Add
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        {/* </MDBox> */}
        {/* </MDBox> */}
        {/* </div> */}
        {/* </Container>
              </MDBox>
            </MDBox> */}
        {/* </MDBox>
        </MDBox> */}
        {/* </MDBox> */}
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
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
      <Footer />
    </DashboardLayout>
  );
}

export default MattersArising;
