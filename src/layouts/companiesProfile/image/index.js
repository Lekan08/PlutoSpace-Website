/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import defaulto from "./defaulto.png";

function CompanyImage() {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const { allGHeaders: miHeaders } = GHeaders();
  const [link, setLink] = useState("");
  const [isImg, setIsImg] = useState(false);
  const [imgType, setImgType] = useState("");
  const [dis, setDisabled] = useState(false);
  const [imgChanged, setImgChanged] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [opened, setOpened] = useState(false);

  // This function will be triggered when the file field change
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 50,
    },
    preview: {
      marginTop: 50,
      display: "flex",
      flexDirection: "column",
    },
    image: { maxWidth: "100%", maxHeight: 320, borderRadius: 20 },
    delete: {
      cursor: "pointer",
      padding: 5,
      background: "blue",
      color: "white",
      border: "none",
      borderRadius: 5,
      width: 200,
    },
  };
  useEffect(() => {
    const headers = miHeaders;
    // const ids = JSON.parse([id]);

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const ids = data11.id;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    // setOpened(true);
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getByKey/${orgIDs}/${orgIDs}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
        // eslint-disable-next-line no-unused-vars
        const im = result.name;
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
            if (isMounted) {
              setLink(resultx[0]);
              console.log(`link [${resultx[0]}]`);
              setOpened(false);
              if (resultx.length === 0) {
                console.log("nothing");
                setIsImg(false);
              } else {
                setIsImg(true);
                console.log("something");
              }
            }
          });
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const handleImageUpload = (e) => {
    console.log(selectedImage);
    if (isImg === false) {
      if (selectedImage === "meow") {
        console.log("selected image");
      } else {
        setOpened(true);
        console.log("uploading");
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

        const orgIDs = data11.orgID;
        const imgKey = orgIDs;
        console.log(imgKey);
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("orgID", orgIDs);
        formData.append("key", imgKey);
        formData.append("type", imgType);

        const raw = formData;
        console.log(raw);
        const requestOptions = {
          // mode: "no-cors",
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
            console.log(result);
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
              if (result.status === "RECORD_EXISTS") {
                console.log("empty");
              } else window.location.reload();
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
    }
    if (isImg === true) {
      if (selectedImage === "meow") {
        console.log("selected image");
      } else {
        setOpened(true);
        console.log("deleting then uploading");
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

        const orgIDs = data11.orgID;
        const imgKey = orgIDs;
        console.log(imgKey);
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("orgID", orgIDs);
        formData.append("key", imgKey);
        formData.append("type", imgType);

        const raw = formData;
        console.log(raw);
        const requestOptions = {
          method: "POST",
          headers: iiHeaders,
          body: raw,
          redirect: "follow",
        };

        const requestOptions1 = {
          method: "DELETE",
          headers: miHeaders,
        };
        fetch(
          `${process.env.REACT_APP_EKOATLANTIC_URL}/media/delete/${orgIDs}/${orgIDs}`,
          requestOptions1
        )
          .then((res) => res.json())
          .then((resx) => {
            if (resx.message === "Expired Access") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            }
            console.log(resx);
            fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/uploadFile`, requestOptions)
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                return res.json();
              })
              .then((result) => {
                setOpened(false);
                console.log(result);
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
                  if (result.status === "RECORD_EXISTS") {
                    console.log("empty");
                  } else window.location.reload();
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
          });
      }
    }
  };
  const handleDelete = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    MySwal.fire({
      title: "Are you sure?",
      text: "You are about to delete your company profile image!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed === true) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };
        fetch(
          `${process.env.REACT_APP_EKOATLANTIC_URL}/media/delete/${orgIDs}/${orgIDs}`,
          requestOptions
        )
          .then((res) => res.json())
          .then((resx) => {
            if (resx.message === "Expired Access") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            }
            MySwal.fire({
              title: resx.status,
              type: "success",
              text: resx.message,
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
      }
    });
  };
  const imageChange = (e) => {
    if (e.target.files[0].size > 522240) {
      alert("File should not exceed 500kb");
      setDisabled(true);
    } else {
      setSelectedImage(e.target.files[0]);
      setImgType(e.target.files[0].type);
      setImgChanged(true);
      setDisabled(false);
    }
  };
  // This function will be triggered when the "Remove This Image" button is clicked

  return (
    <div>
      <MDBox
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        mx={3}
        mt={3}
        // p={2}
        // mb={1}
        textAlign="center"
      >
        <MDTypography variant="h6" fontWeight="medium" color="white">
          Image
        </MDTypography>
      </MDBox>
      <br />
      <MDBox textAlign="center">
        {imgChanged ? (
          <img src={URL.createObjectURL(selectedImage)} style={styles.image} alt="Thumb" />
        ) : isImg ? (
          <img src={link} style={styles.image} alt="Thumb" />
        ) : (
          <img src={defaulto} style={styles.image} alt="Thumb" />
        )}
        <br />
      </MDBox>
      <MDBox component="form" role="form">
        <div style={styles.container}>
          <MDBox mb={2} textAlign="center">
            <Container>
              <div className="row">
                <div>
                  <p style={{ color: "red", fontSize: 13 }}>
                    <i>file must not be larger than 500kb</i>
                  </p>
                  <MDInput type="file" name="file_upload" onChange={imageChange} />
                </div>
                <br />
              </div>
            </Container>
          </MDBox>
          {/* {selectedImage && (
            <div>
              <div style={styles.preview}>
                <img src={URL.createObjectURL(selectedImage)} style={styles.image} alt="Thumb" />
                <br />
              </div>
            </div>
          )} */}
        </div>
        <MDBox mt={4} mb={1} textAlign="center">
          <MDButton
            variant="gradient"
            onClick={handleImageUpload}
            color="info"
            width="50%"
            disabled={dis}
          >
            Upload
          </MDButton>
          &nbsp;&nbsp;
          {isImg ? (
            <>
              <MDButton variant="gradient" onClick={handleDelete} color="error" width="50%">
                Remove
              </MDButton>
            </>
          ) : null}
        </MDBox>
      </MDBox>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </div>
  );
}

export default CompanyImage;
