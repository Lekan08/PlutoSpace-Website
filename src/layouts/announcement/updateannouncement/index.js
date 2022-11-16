import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";

function UpdateAnnouncement() {
  const MySwal = withReactContent(Swal);

  const [titlex, setTitle] = useState("");
  const [messagex, setMessage] = useState("");
  const [groupidx, setGroupIdx] = useState("");
  const [annoucementTypeIDx, setAnnoucementTypeID] = useState("");
  const [deletex, setDeletex] = useState("");
  const [createbyx, setCreatebyx] = useState("");
  const [createx, setCreatex] = useState("");
  const [idx, setIdx] = useState("");

  const [allAnnouncementType, setAllAnnouncementType] = useState([]);

  const [user, setUser] = useState([]);

  const [checkedTitle, setCheckedTitle] = useState("");
  const [checkedMessage, setCheckedMessage] = useState("");

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/groups/gets/${orgIDs}`, { headers })
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

  // Method to fetch all announcementtype
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/announcementtype/getAll/${orgIDs}`, { headers })
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
          setAllAnnouncementType(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnTitleKeys = (value) => {
    const letters = /^[a-zA-Z ('") ]+$/;
    console.log(value);
    if (value.match(letters)) {
      setCheckedTitle(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML = "";
    } else {
      setCheckedTitle(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML =
        "Title should include only Capital letters, Small letters, apostrophe, brackets and quotes ";
    }
    if (value.length === 0) {
      setCheckedTitle(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML = "Title is required<br>";
    }
  };

  const handleOnMessageKeys = (value) => {
    console.log(value);
    if (value.length === 0) {
      setCheckedMessage(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("message").innerHTML = "Message is required<br>";
    } else {
      setCheckedMessage(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("message").innerHTML = "";
    }
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/announcement/getByIds/${ids}`, { headers })
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
          // setItems(result);
          setIdx(result[0].announcement.id);
          setTitle(result[0].announcement.title);
          setMessage(result[0].announcement.message);
          setGroupIdx(result[0].announcement.groupID);
          setCreatebyx(result[0].announcement.createdBy);
          setDeletex(result[0].announcement.deleteFlag);
          setCreatex(result[0].announcement.createdTime);
          setAnnoucementTypeID(result[0].announcementType.id);
          handleOnMessageKeys(result[0].announcement.message);
          handleOnTitleKeys(result[0].announcement.title);
        }
        console.log(result);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnChangeAnnounceType = (e) => {
    setAnnoucementTypeID(e.target.value);
  };

  const handleUpdate = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    // const ids = data11.id;
    // const personalIds = data11.id;
    const orgIDs = data11.orgID;

    const raw = JSON.stringify({
      id: idx,
      title: titlex,
      message: messagex,
      orgID: orgIDs,
      groupID: groupidx,
      announcementTypeID: annoucementTypeIDx,
      createdBy: createbyx,
      createdTime: createx,
      deleteFlag: deletex,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_SHASHA_URL}/announcement/update`, requestOptions)
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
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        });
      })
      .catch((error) => {
        // setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  const handleValidate = (e) => {
    handleOnMessageKeys(messagex);
    handleOnTitleKeys(titlex);
    if (checkedTitle && checkedMessage === true) {
      if (annoucementTypeIDx === "") {
        document.getElementById("message").innerHTML = "Announcement Type is required<br>";
      } else {
        handleUpdate(e);
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Update Announcement
            </MDTypography>
          </MDBox>
          <MDBox
            variant="gradient"
            bgColor="error"
            borderRadius="lg"
            coloredShadow="success"
            mx={3}
            mt={1}
            p={1}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="gradient" fontSize="60%" color="white" id="title">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="message">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form" name="form1">
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

                  <div className="col-sm-6">
                    <Form.Group className="mb-1" controlId="exampleForm.ControlTextArea">
                      <Form.Label style={{ fontSize: 14 }}>Message*</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={messagex || ""}
                        onKeyUp={(e) => handleOnMessageKeys(e.target.value)}
                        onChange={(e) => setMessage(e.target.value)}
                        label="Message*"
                        variant="standard"
                      />
                    </Form.Group>
                  </div>
                </div>
              </Container>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDBox mt={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        color="text"
                      >
                        Annoucement Type*
                      </MDTypography>
                      <MDBox textAlign="right">
                        <Form.Select
                          value={annoucementTypeIDx || ""}
                          aria-label="Default select example"
                          onChange={handleOnChangeAnnounceType}
                        >
                          <option>--Select Announcement Type--</option>
                          {allAnnouncementType.map((apic) => (
                            <option key={apic.id} value={apic.id}>
                              {apic.name}
                            </option>
                          ))}
                        </Form.Select>
                      </MDBox>
                    </MDBox>
                  </div>
                  <div className="col-sm-6">
                    <MDBox mt={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="right"
                        color="text"
                      >
                        Group <i>(optional)</i>
                      </MDTypography>
                      <Form.Select
                        value={groupidx || ""}
                        onChange={(e) => setGroupIdx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Select Group</option>
                        {user.map((api) => (
                          <option key={api.group.id} value={api.group.id}>
                            {api.group.name}
                          </option>
                        ))}
                      </Form.Select>
                      <br />
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={(e) => handleValidate(e)}
                // disabled={!enabled}
                color="info"
                width="50%"
              >
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default UpdateAnnouncement;
