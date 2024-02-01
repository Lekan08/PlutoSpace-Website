import React, { useState, useEffect } from "react";
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
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Styles from "styles";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TestData from "./data/testtable";
// ZINOLEESKY

function TestQuestion() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = TestData();

  const navigate = useNavigate();

  const [questionx, setQuestion] = useState("");
  // const [cbtKeys, setCbtKey] = useState("");
  const [hintx, setHint] = useState("");
  const [instructionx, setInstruction] = useState("");
  // const [imageurlx, setImage] = useState("");

  const [checkedName, setCheckedName] = useState("");
  const [enabled, setEnabled] = useState("");
  const [opened, setOpened] = useState(false);
  // const [imgType, setImgType] = useState("");
  // const [selectedImage, setSelectedImage] = useState();
  const [files, setFiles] = useState("");
  const [allx, setAll] = useState([]);
  const [open, setOpen] = React.useState(false);
  const { allGHeaders: miHeaders } = GHeaders();
  const { allPHeaders: myHeaders } = PHeaders();

  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const formData = new FormData();

  // const onfileChange = (e) => {

  const handleClick = (e, imgUrl) => {
    handleOnNameKeys();
    if (enabled) {
      setOpened(true);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const dateQ = new Date().getTime();
      const cbtKey = `QuesImg${1 * 2 + 3 + dateQ}`;
      console.log(cbtKey);
      // setCbtKey(cbtKey);
      const raw = JSON.stringify({
        orgID: orgIDs,
        question: questionx,
        instruction: instructionx,
        hint: hintx,
        imageUrl: imgUrl,
        imageKey: cbtKey,
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
            setOpened(true);
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

  const handleImageUpload = (e) => {
    // handleClose();
    if (files !== "" && files !== 0) {
      if (files === undefined) {
        MySwal.fire({
          title: "INVALID_INPUT",
          type: "error",
          text: "Please input a file",
          // })  //.then(() => {
          // handleOpen();
        });
      } else {
        setOpened(true);
        e.preventDefault();
        // Headers for upload image
        const GenToken = localStorage.getItem("rexxdex1");
        const apiiToken = localStorage.getItem("rexxdex");

        if (apiiToken !== "null" && apiiToken !== null) {
          localStorage.setItem("rexxdex1", apiiToken);
        }
        const iiHeaders = new Headers();
        iiHeaders.append("Token-1", GenToken);

        const data11 = JSON.parse(localStorage.getItem("user1"));
        // const personalIDs = data11.id;
        const orgIdx = data11.orgID;
        // const imgKey = `PROF_PIC_EMP-${personalIDs}`;
        // console.log(imgKey);

        const dateQ = new Date().getTime();
        const cbtKey = `QuesImg${1 * 2 + 3 + dateQ}`;
        console.log(cbtKey);

        // const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("orgID", orgIdx);
        formData.append("key", cbtKey);
        formData.append("type", files[0].type);

        const raw = formData;
        console.log(raw);

        const requestOptions = {
          method: "POST",
          headers: iiHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/uploadFile`, requestOptions)
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((result) => {
            setOpened(false);
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
            const im = result.data.name;
            const headers = miHeaders;
            fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${im}`, {
              headers,
            })
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                return res.json();
              })
              .then((resultx) => {
                if (resultx.message === "Expired Access") {
                  navigate("/authentication/sign-in");
                  window.location.reload();
                }
                if (resultx.message === "Token Does Not Exist") {
                  navigate("/authentication/sign-in");
                  window.location.reload();
                }
                if (resultx.message === "Unauthorized Access") {
                  navigate("/authentication/forbiddenPage");
                  window.location.reload();
                }

                // if (isMounted) {
                console.log(`link [${resultx[0]}]`);
                if (resultx.length === 0) {
                  MySwal.fire({
                    title: "INVALID_IMAGE",
                    type: "error",
                    text: "There is no image present",
                  });
                } else {
                  handleClick(e, resultx[0]);
                }
                // }
              });
            // .then(() => {
            //   if (result.status !== "SUCCESS") {
            //     handleOpen();
            //   }
            //   console.log("SUCCESS");
            // });
          });
      }
    } else {
      handleClick(e);
    }
  };
  //   // console.log(e.target.files[0]);
  //   if (e.target && e.target.files[0]) {
  //     formData.append("file", e.target.files[0]);
  //   }
  // };

  // const handleSubmit = (e) => {
  //   const dateQ = new Date().getTime();

  //   const cbtKey = `QuesImg${1 * 2 + 3 + dateQ}`;
  //   console.log(cbtKey);
  //   setCbtKey(cbtKey);
  //   const imgType = e.target.files[0].type;
  //   console.log(imgType);
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   const raw = JSON.stringify({
  //     mediaDTO: {
  //       multipartFile: formData,
  //       orgID: orgIDs,
  //       key: cbtKey,
  //       type: imgType,
  //     },
  //   });
  //   console.log(raw);
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };
  //   fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/upload`, requestOptions)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleImageUpload = (e) => {
  //   console.log(selectedImage);
  //   // if (isImg === false) {
  //   if (selectedImage === "meow") {
  //     console.log("selected image");
  //   } else {
  //     setOpened(true);
  //     console.log("uploading");
  //     e.preventDefault();
  //     // Headers for upload image
  //     const GenToken = localStorage.getItem("rexxdex1");
  //     const apiiToken = localStorage.getItem("rexxdex");

  //     if (apiiToken !== "null" && apiiToken !== null) {
  //       localStorage.setItem("rexxdex1", apiiToken);
  //     }
  //     const iiHeaders = new Headers();
  //     iiHeaders.append("Token-1", GenToken);

  //     const data11 = JSON.parse(localStorage.getItem("user1"));

  //     const orgIDs = data11.orgID;
  //     const imgKey = orgIDs;
  //     setCbtKey(imgKey);
  //     console.log(imgKey);
  //     // const formData = new FormData();
  //     formData.append("file", selectedImage);
  //     formData.append("orgID", orgIDs);
  //     formData.append("key", imgKey);
  //     formData.append("type", imgType);

  //     const raw = formData;
  //     console.log(raw);
  //     const requestOptions = {
  //       // mode: "no-cors",
  //       method: "POST",
  //       headers: iiHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };

  //     fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/uploadFile`, requestOptions)
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         return res.json();
  //       })
  //       .then((result) => {
  //         setOpened(false);
  //         console.log(result);
  //         if (result.message === "Expired Access") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (result.message === "Token Does Not Exist") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (result.message === "Unauthorized Access") {
  //           navigate("/authentication/forbiddenPage");
  //           window.location.reload();
  //         }
  //         setOpened(false);
  //         MySwal.fire({
  //           title: result.status,
  //           type: "success",
  //           text: result.message,
  //         }).then(() => {
  //           if (result.status === "RECORD_EXISTS") {
  //             console.log("empty");
  //           } else window.location.reload();
  //         });
  //       })
  //       .catch((error) => {
  //         setOpened(false);
  //         MySwal.fire({
  //           title: error.status,
  //           type: "error",
  //           text: error.message,
  //         });
  //       });
  //   }
  //   // }
  // };

  const imageChange = (e) => {
    if (e.target.files[0].size > 522240) {
      alert("File should not exceed 500kb");
      // setDisabled(true);
    } else {
      setFiles(e.target.files);
      // setImgType(e.target.files[0].type);
      // setImgChanged(true);
      // setDisabled(false);
    }
  };

  //   state = {
  //     file: null
  //   }

  //   handleFile;(e){
  //     this.setState({file: e})
  //   }

  // const handleonChange = (e) => {
  //   setImage(e.target.value);
  //   onfileChange(e);
  //   handleSubmit(e);
  //   console.log(e.target.value);
  //   console.log(e.target.files);
  // };

  // const handleOnBoth = (e) => {
  //   handleImageUpload(e.target.value);
  //   handleClick(e.target.value);
  // };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    overflow: "scroll",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    const headers = miHeaders;
    // let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/questions/getByIds/${ids}`, { headers })
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
        setAll(result);
      });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox
            variant="gradient"
            // bgColor="info"
            style={Styles.boxSx}
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Add Test Question
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
                      onChange={imageChange}
                      // value={imageurlx || ""}
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
              <MDButton
                variant="gradient"
                onClick={handleImageUpload}
                style={Styles.buttonSx}
                /* color="info" */ width="50%"
              >
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="row">
            {allx.map((item) => (
              <Grid item xs={20} md={12} lg={20} key={item.id}>
                <Card sx={{ maxWidth: 900 }}>
                  <CardContent>
                    <MDBox
                      variant="gradient"
                      bgColor="info"
                      borderRadius="lg"
                      coloredShadow="success"
                      mt={2}
                      mx={0}
                      p={1}
                      mb={3}
                      textAlign="left"
                    >
                      <MDTypography
                        variant="h4"
                        fontWeight="medium"
                        color="white"
                        textAlign="center"
                        mt={1}
                      >
                        View Test Question
                      </MDTypography>
                    </MDBox>
                    <MDTypography
                      variant="h6"
                      color="text"
                      fontSize="75%"
                      textAlign="left"
                      mt={1}
                      // style={{ backgroundColor: "#ADD8E6" }}
                    >
                      Question - {item.question}
                    </MDTypography>
                    <hr />
                    <br />
                    <MDTypography variant="h6" color="text" fontSize="75%" textAlign="left" mt={0}>
                      Hint - {item.hint}
                    </MDTypography>
                    <hr />
                    <br />
                    <MDTypography
                      variant="h6"
                      color="text"
                      fontSize="75%"
                      textAlign="left"
                      mt={0}
                      // style={{ backgroundColor: "#ADD8E6" }}
                    >
                      Instruction - {item.instruction}
                    </MDTypography>
                    <hr />
                    <br />
                    <MDTypography variant="h6" color="text" fontSize="75%" textAlign="left" mt={0}>
                      {/* Image - <img src={allx[0].imageUrl} style={styles.image} alt="Thumb" /> */}
                    </MDTypography>
                  </CardContent>
                </Card>
                &nbsp;
              </Grid>
            ))}
          </div>
        </Box>
      </Modal>
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

export default TestQuestion;
