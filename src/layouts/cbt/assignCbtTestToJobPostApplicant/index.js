import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
// import CardContent from "@mui/material/CardContent";
// ZINOLEESKY

// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";

// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
// import TextField from "@mui/material/TextField";
// import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
// import "./index.css";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
// import Button from "@mui/material/Button";
// import edit from "./edit/index";
// import Divider from "@mui/material/Divider";
// import CardActions from "@mui/material/CardActions";
// import Button from "@mui/material/Button";
// import { green } from "@mui/material/colors";
// import AccountCircle from "@mui/icons-material/AccountCircle";

function AssignCbtTestToJobPost() {
  const MySwal = withReactContent(Swal);
  // const scrollContainerStyle = { width: "100%", maxHeight: "60%" };

  // const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  // const [opened, setOpened] = useState(false);
  const [jobPostx, setJobPost] = useState([]);
  const [jobx, setJobx] = useState("");
  const [items, setItems] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [day, setDay] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [month, setMonth] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [year, setYear] = useState("");
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const handleOnClick = (e) => {
    // setOpened(true);
    e.preventDefault();
    // const data11 = JSON.parse(localStorage.getItem("user1"));
    // const orgIDs = data11.orgID;
    // const personalIDs = data11.personalID;
    if (items[0].jobPostID !== null && items[0].jobPostID !== "") {
      MySwal.fire({
        // title: "Poll Not Opened",
        icon: "info",
        type: "info",
        text: `A job post has been attached already`,
      }).then(() => {
        navigate("/cbt");
      });
    } else {
      const raw = JSON.stringify({
        id: items[0].id,
        title: items[0].title,
        orgID: items[0].orgID,
        descrip: items[0].descrip,
        status: items[0].status,
        jobPostID: jobx,
        deadline: items[0].deadline,
        createdTime: items[0].createdTime,
        deleteFlag: items[0].deleteFlag,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_RAGA_URL}/cbt/update`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          // setOpened(false);
          // handleClosee();
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
          // setOpened(false);
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
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/cbt/getByIds/${ids}`, { headers })
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
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // const headers = myHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    const date = new Date();
    const endTimex = new Date().getTime();
    const startTimex = new Date(date.getFullYear(), date.getMonth() - 1, 1).getTime();

    const raw = JSON.stringify({
      orgID: orgIDs,
      createdTimeStartTime: startTimex,
      createdTimeEndTime: endTimex,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/jobPost/getFiltered`, requestOptions)
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
          // setSupply(result);
          if (result.length > "") {
            setJobPost(result);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Card>
              <MDBox mb={2}>
                <Container>
                  <div className="row">
                    <div className="col-sm-8">
                      <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                        Job Post
                      </MDTypography>
                      <MDBox textAlign="right">
                        <Form.Select
                          value={jobx || ""}
                          aria-label="Default select example"
                          onChange={(e) => setJobx(e.target.value)}
                        >
                          <option>--Select Job Post--</option>
                          {jobPostx.map((apic) => (
                            <option key={apic.id} value={apic.id}>
                              {apic.title}
                            </option>
                          ))}
                        </Form.Select>
                      </MDBox>
                    </div>
                  </div>
                </Container>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" onClick={handleOnClick} color="info" width="50%">
                  Save
                </MDButton>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop> */}
    </DashboardLayout>
  );
}

export default AssignCbtTestToJobPost;
