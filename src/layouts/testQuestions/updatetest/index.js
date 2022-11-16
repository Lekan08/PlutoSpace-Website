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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Footer from "examples/Footer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Updatetest() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [items, setItems] = useState([]);
  // const [test, setTest] = useState([]);
  const [hintx, setHint] = useState("");
  const [questionx, setQuestion] = useState("");
  const [imageurlx, setImage] = useState("");
  // const [cbtKeys, setCbtKey] = useState("");
  //   console.log(imageurlx);
  const [instructionx, setInstruction] = useState("");
  const [imageKeyx, setImageKeyx] = useState("");
  const [files, setFiles] = useState("");
  const [opened, setOpened] = useState(false);

  //   useEffect(() => {
  //     const data11 = JSON.parse(localStorage.getItem("user1"));

  //     const orgIDs = data11.orgID;
  //     const headers = miHeaders;
  //     let isMounted = true;
  //     fetch(`${process.env.REACT_APP_RAGA_URL}/questions/gets/${orgIDs}`, { headers })
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         return res.json();
  //       })
  //       .then((result) => {
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
  //         if (isMounted) {
  //           setTest(result);
  //           console.log(result);
  //         }
  //       });
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);

  // ZINOLEESKY

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    const headers = miHeaders;
    let isMounted = true;
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
        if (isMounted) {
          setItems(result);
          setQuestion(result[0].question);
          setHint(result[0].hint);
          setImage(result[0].imageUrl);
          //   console.log(setImage);
          //   console.log(result[0].imageUrl);
          setInstruction(result[0].instruction);
          setImageKeyx(result[0].imageKey);
          //   console.log(result);

          // callRight();
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const base64data = reader.result;
  //     console.log(base64data);
  //   };
  //   (async () => {
  //     const response = await fetch(imageurlx);
  //     const imageBlob = await response.blob();
  //     reader.readAsDataURL(imageBlob);
  //     // console.log(response);
  //     // console.log(imageBlob);
  //   })();

  console.log(imageKeyx);

  const handleUpdate = (e, imgUrl) => {
    e.preventDefault();
    // const dateQ = new Date().getTime();
    // const cbtKey = `QuesImg${1 * 2 + 3 + dateQ}`;
    // setCbtKey(cbtKey);
    const raw = JSON.stringify({
      id: items[0].id,
      orgID: items[0].orgID,
      question: questionx,
      instruction: instructionx,
      hint: hintx,
      imageUrl: imgUrl,
      imageKey: imageKeyx,
      deleteFlag: items[0].deleteFlag,
      createdTime: items[0].createdTime,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_RAGA_URL}/questions/update`, requestOptions)
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
        // setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
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

        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("orgID", orgIdx);
        formData.append("key", cbtKey);
        formData.append("type", files[0].type);

        const raw = formData;

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
            console.log(result);
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
                  handleUpdate(e, resultx[0]);
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
      handleUpdate(e);
    }
  };

  const handleUpdate2 = (e) => {
    e.preventDefault();
    // const dateQ = new Date().getTime();
    // const cbtKey = `QuesImg${1 * 2 + 3 + dateQ}`;
    // setCbtKey(cbtKey);
    const raw = JSON.stringify({
      id: items[0].id,
      orgID: items[0].orgID,
      question: questionx,
      instruction: instructionx,
      hint: hintx,
      imageUrl: imageurlx,
      imageKey: imageKeyx,
      deleteFlag: items[0].deleteFlag,
      createdTime: items[0].createdTime,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_RAGA_URL}/questions/update`, requestOptions)
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
        // setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  // const joshRichwayz = (e) => {
  //   console.log(files);
  //   if (files[0].name !== "") {
  //     // handleImageUpload(e);
  //     handleUpdate2(e);
  //   } else {
  //     handleImageUpload(e);
  //   }
  // };
  console.log(files);

  console.log(imageurlx);
  // console.log(handleImageUpload);
  // console.log(handleUpdate2);
  const callRight = (e) => {
    if (imageurlx !== "") {
      console.log(imageurlx);
      // joshRichwayz(e);
      console.log(files);
      if (files === "") {
        handleUpdate2(e);
      } else {
        handleImageUpload(e);
      }
      // handleUpdate2(e);
      // handleImageUpload(e);
    } else if (imageurlx === "") {
      // handleUpdate2(e);
      handleImageUpload(e);
    }
  };

  // useEffect((e) => {
  //   joshRichwayz(e);
  // }, []);

  const imageChange = (e) => {
    console.log("selectedbum");
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
  console.log(files, "blast");

  //   fileChanged(file):{
  //     this.examen_bestand = file.target.files[0].name;
  // }
  //   const fileChanged = () => {
  //     // eslint-disable-next-line react/no-this-in-sfc
  //     this.examen_bestand = imageurlx;
  //   };
  //   console.log(fileChanged);

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
              Update Test Question
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
            <MDTypography variant="gradient" fontSize="60%" color="white" id="question">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={0}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                      <Form.Label style={{ fontSize: 14 }}>Questions</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={questionx || ""}
                        // onKeyUp={handleOnNameKeys}
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
                      // value={imageurlx || ""}
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
              <MDButton variant="gradient" onClick={callRight} color="info" width="50%">
                Update
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default Updatetest;
