import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import CbtQuestion from "./data/questiontable";
// ZINOLEESKY

function Question() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = CbtQuestion();

  const navigate = useNavigate();

  const [questionx, setQuestion] = useState("");
  const [instructionx, setInstruction] = useState("");
  const [hintx, setHint] = useState("");
  const [imageurlx, setImage] = useState("");
  const [cbtKeys, setCbtKey] = useState("");

  const [checkedName, setCheckedName] = useState("");

  //   const [checkedName, setCheckedName] = useState("");
  const [enabled, setEnabled] = useState("");
  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();

  //   const handleOnNameKeys = () => {
  //     if (questionx.length === 0) {
  //       setCheckedName(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("question").innerHTML = "A question is required<br>";
  //     } else {
  //       setCheckedName(true);
  //     }
  //     setEnabled(checkedName === true);
  //   };
  //   const handleOnQuestionKeys = () => {
  //     if (questionx.length === 0) {
  //       setCheckedQuestion(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("question").innerHTML = "A text is required<br>";
  //     } else {
  //       setQuestion(true);
  //     }
  //     setEnabled(checkedQuestion === true);
  //   };
  const handleOnNameKeys = () => {
    if (questionx.length === 0) {
      setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("question").innerHTML = "A question is required<br>";
    } else {
      setCheckedName(true);
    }
    setEnabled(checkedName === true);
  };

  const handleClick = (e) => {
    handleOnNameKeys();
    if (enabled) {
      setOpened(true);
      e.preventDefault();
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const questionIDs = urlParams.get("id");
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const raw = JSON.stringify({
        orgID: orgIDs,
        cbtID: questionIDs,
        question: questionx,
        instruction: instructionx,
        hint: hintx,
        imageUrl: imageurlx,
        imageKey: cbtKeys,
      });
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_RAGA_URL}/questions/add`, requestOptions)
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
    }
  };

  const formData = new FormData();

  const handleSubmit = (e) => {
    const dateQ = new Date().getTime();

    const cbtKey = `QuesImg${1 * 2 + 3 + dateQ}`;
    console.log(cbtKey);
    setCbtKey(cbtKey);
    const imgType = e.target.files[0].type;
    console.log(imgType);
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      mediaDTO: {
        multipartFile: formData,
        orgID: orgIDs,
        key: cbtKey,
        type: imgType,
      },
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/upload`, requestOptions)
      .then((res) => {
        console.log(res);
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onfileChange = (e) => {
    // console.log(e.target.files[0]);
    if (e.target && e.target.files[0]) {
      formData.append("file", e.target.files[0]);
    }
  };
  const handleonChange = (e) => {
    setImage(e.target.value);
    onfileChange(e);
    handleSubmit(e);
    console.log(e.target.value);
    console.log(e.target.files);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={30}>
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
              Add Question
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="question">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={0}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                      <Form.Label style={{ fontSize: 14 }}>Question</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={questionx || ""}
                        onKeyUp={handleOnNameKeys}
                        onChange={(e) => setQuestion(e.target.value)}
                        rows={2}
                      />
                    </Form.Group>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <MDInput
                      type="text"
                      value={hintx || ""}
                      onChange={(e) => setHint(e.target.value)}
                      label="Hint"
                      variant="standard"
                      fullWidth
                    />
                    <MDTypography variant="h4" fontWeight="medium" fontSize="55%">
                      (Hint is not Compulsory)
                    </MDTypography>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  {/* <div className="col-sm-12">
                    <MDInput
                      type="file"
                      name="upload"
                      accept="image/*"
                      value={imageurlx || ""}
                      // label="Upload Image"
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div> */}

                  <div className="col-sm-12">
                    <MDInput
                      type="file"
                      name="file_upload"
                      onChange={handleonChange}
                      value={imageurlx || ""}
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <MDInput
                      type="text"
                      value={instructionx || ""}
                      onChange={(e) => setInstruction(e.target.value)}
                      label="Instruction"
                      variant="standard"
                      fullWidth
                    />
                    <MDTypography variant="h4" fontWeight="medium" fontSize="55%">
                      (Instruction is not Compulsory)
                    </MDTypography>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={handleClick} color="info" width="50%">
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

export default Question;
