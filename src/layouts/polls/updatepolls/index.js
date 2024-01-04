import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Styles from "styles";

function Updatepolls() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupIDx, setGroupIDx] = useState("");
  const [questionx, setQuestionx] = useState("");
  const [opened, setOpened] = useState(false);
  // const [status, setStatus] = useState("");

  const getGroups = () => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
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
        console.log(result);
        setOpened(false);
        setGroups(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pollGetByIDs = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_KUBU_URL}/poll/getByIds/${ids}`, { headers })
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
        setItems(result);
        setQuestionx(result[0].question);
        setGroupIDx(result[0].groupID);
        getGroups();
        if (result[0].status === 0 || result[0].status === "0") {
          // do nothing
        } else {
          setOpened(false);
          MySwal.fire({
            title: "Poll Opened",
            icon: "info",
            type: "info",
            text: `You can't update an opened/closed poll`,
          }).then(() => {
            navigate("/polls");
          });
        }
      });
  };

  useEffect(() => {
    setOpened(true);
    let isMounted = true;
    if (isMounted) {
      pollGetByIDs();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdate = () => {
    const raw = JSON.stringify({
      id: items[0].id,
      orgID: items[0].orgID,
      groupID: groupIDx,
      question: questionx,
      status: items[0].status,
      deleteFlag: items[0].deleteFlag,
      createdTime: items[0].createdTime,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_KUBU_URL}/poll/update`, requestOptions)
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
              Update Polls
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
          </MDBox>
          <MDBox mb={2}>
            <Container>
              <div className="row">
                <div className="col-sm-6">
                  <MDInput
                    type="text"
                    label="Question *"
                    value={questionx || ""}
                    // onKeyUp={handleOnTitleKeys}
                    onChange={(e) => setQuestionx(e.target.value)}
                    variant="standard"
                    fullWidth
                  />
                </div>
              </div>
            </Container>
          </MDBox>
          <MDBox>
            <Container>
              <div className="row">
                <div className="col-sm-6">
                  <MDBox mb={2}>
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      Select Group
                    </MDTypography>
                    <Form.Select
                      value={groupIDx || ""}
                      onChange={(e) => setGroupIDx(e.target.value)}
                      aria-label="Default select example"
                    >
                      <option value="">Select Group</option>
                      {groups.map((api) => (
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
              onClick={(e) => handleUpdate(e)}
              // color="info"
              style={Styles.buttonSx}
              width="50%"
              align="center"
            >
              Update
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default Updatepolls;
