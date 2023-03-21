import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
// import DataTable from "examples/Tables/DataTable";
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
// import ResignationLetterData from "./data";
// ZINOLEESKY

function UpdateResignationLetter() {
  const MySwal = withReactContent(Swal);
  //   const { columns: pColumns, rows: pRows } = ResignationLetterData();

  const navigate = useNavigate();

  const [textx, setText] = useState("");
  const [files, setFiles] = useState("");
  const [items, setItems] = useState([]);

  //   const [checkedName, setCheckedName] = useState("");
  //   const [enabled, setEnabled] = useState("");
  const [opened, setOpened] = useState(false);

  const { allGHeaders: miHeaders } = GHeaders();
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
          // callRight();
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  //   const handleClick = (e, externalUrlx) => {
  //     setOpened(true);
  //     e.preventDefault();
  //     const data11 = JSON.parse(localStorage.getItem("user1"));

  //     const orgIDs = data11.orgID;
  //     const empIDx = data11.personalID;
  //     console.log(data11);
  //     const x = Date();
  //     const decisionTimex = new Date(x).getTime();
  //     console.log(decisionTimex);
  //     // setCbtKey(cbtKey);
  //     const raw = JSON.stringify({
  //       orgID: orgIDs,
  //       externalUrl: externalUrlx,
  //       text: textx,
  //       empID: empIDx,
  //       // status: 0,
  //       decisionBy: empIDx,
  //       decisionTime: decisionTimex,
  //       //   withdrawalTime: 0,
  //     });
  //     console.log(raw);
  //     const requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };
  //     fetch(`${process.env.REACT_APP_RAGA_URL}/resignationLetter/update`, requestOptions)
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
  //         setOpened(false);
  //         MySwal.fire({
  //           title: result.status,
  //           type: "success",
  //           text: result.message,
  //         }).then(() => {
  //           window.location.reload();
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
  //   };
  const handleClick = (e, externalUrlx) => {
    e.preventDefault();
    const x = Date();
    const decisionTimex = new Date(x).getTime();
    const raw = JSON.stringify({
      //   id: items[0].id,
      //   orgID: items[0].orgID,
      //   question: questionx,
      //   instruction: instructionx,
      //   hint: hintx,
      //   imageUrl: imgUrl,
      //   imageKey: imageKeyx,
      //   deleteFlag: items[0].deleteFlag,
      //   createdTime: items[0].createdTime,

      orgID: items[0].orgID,
      externalUrl: externalUrlx,
      text: textx,
      empID: items[0].empIDx,
      // status: 0,
      decisionBy: items[0].empIDx,
      decisionTime: decisionTimex,
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

        const formData = new FormData();
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
                console.log(`externalUrl [${resultx[0]}]`);
                if (resultx.length === 0) {
                  MySwal.fire({
                    title: "INVALID_IMAGE",
                    type: "error",
                    text: "There is no image present",
                  });
                } else {
                  console.log(`externalUrl [${resultx[0]}]`);
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={30}>
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
            style={Styles.boxSx}
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Update Resignation Letter
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
                      <Form.Label style={{ fontSize: 15 }}>Text</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={textx || ""}
                        // onKeyUp={handleOnNameKeys}
                        onChange={(e) => setText(e.target.value)}
                        rows={8}
                      />
                    </Form.Group>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
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
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleImageUpload}
                // color="info"
                width="50%"
                align="left"
                style={Styles.buttonSx}
              >
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

export default UpdateResignationLetter;
