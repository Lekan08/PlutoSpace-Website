/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import MDButton from "components/MDButton";
// import { Form } from "react-bootstrap";
import MDInput from "components/MDInput";
import GHeaders from "getHeader";
import IHeaders from "imgHeader";
import Footer from "examples/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import DownloadIcon from "@mui/icons-material/Download";
// import IHeaders from "imgHeader";

// document library images
import DocPng from "assets/document-pngs/DocPng.png";
import ExcelPng from "assets/document-pngs/ExcelPng.png";
import PdfPng from "assets/document-pngs/PdfPng.png";
import PowerPointPng from "assets/document-pngs/PowerPointPng.png";
import WordPng from "assets/document-pngs/WordPng.png";
import ImagePng from "assets/document-pngs/imagePng.png";
import RollingGif from "assets/images/Rolling.gif";

import ClearIcon from "@mui/icons-material/Clear";
import Styles from "styles";

function AssetAttachDocument() {
  const [files, setFiles] = useState("");
  const [open, setOpenn] = React.useState(false);
  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState([]);
  // const [docs, setDocs] = useState([]);
  const [imageUrl, setImageUrl] = useState(RollingGif);
  const [allResult, setAllResult] = useState("");
  // const [showFrame, setShowFrame] = useState(false);
  const [name, setName] = useState([]);

  const [viewDoc, setViewDoc] = React.useState(false);

  const { allGHeaders: miHeaders } = GHeaders();
  const { allIHeaders: iiHeadersx } = IHeaders();

  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();
  const handleOpen = () => setOpenn(true);
  const handleClose = () => {
    setFiles("");
    setOpenn(false);
  };

  const handleViewClose = () => {
    setViewDoc(false);
    setImageUrl(RollingGif);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 0,
    overflow: "scroll",
    height: "auto",
    maxHeight: "50vh",
    display: "block",

    "&::-webkit-scrollbar": {
      width: "6px",
      height: "2px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 1px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 1px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#4285F4",
      webkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
    },
  };

  const viewDocStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 0,
    overflow: "scroll",
    height: "50%",
    width: "50%",
    maxHeight: "40vh",
    display: "block",

    "&::-webkit-scrollbar": {
      width: "6px",
      height: "2px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 1px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 1px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#4285F4",
      webkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
    },
  };

  const cardBorder = {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  };

  const formData = new FormData();

  const imageChange = (e) => {
    console.log(e);
    const selectedFile = e.target.files[0];

    // Check if a file is selected
    if (selectedFile) {
      // Get the file extension
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

      // Allowed file extensions
      const allowedExtensions = ["pdf", "jpg", "jpeg", "png", "gif"];

      // Check if the file extension is in the allowed list
      if (allowedExtensions.includes(fileExtension)) {
        console.log("File is valid:", selectedFile);

        setFiles(e.target.files);
      } else {
        setOpenn(false);
        MySwal.fire({
          icon: "error",
          title: "Invalid File Type",
          text: "Please upload a valid image (jpg, jpeg, png, gif) or PDF file.",
        });

        // Clear the input to prevent uploading the invalid file
        e.target.value = "";
      }
    }

    // if (e.target.files[0].size > 522240) {
    //   alert("File should not exceed 500kb");
    //   // setDisabled(true);
    // } else {
    // setImgType(e.target.files[0].type);
    // setImgChanged(true);
    // setDisabled(false);
    // }
  };

  console.log(allResult);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    // const personalIds = data11.personalID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/assets/getByIds/${id}`, { headers })
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
        if (result !== "") {
          // const dannyff = result[0].attachedDocs;
          //   console.log(dannyff);
          //   console.log(result);
          if (isMounted) {
            const value = result[0].attachedDocs;
            if (result.length !== 0) {
              setAllResult(result);
              if (result !== "") {
                if (result[0].attachedDocs !== null) {
                  const myDocs = [];

                  const data11 = JSON.parse(localStorage.getItem("user1"));
                  const orgIDs = data11.orgID;
                  // eslint-disable-next-line array-callback-return
                  value.map((rolPermi) => {
                    fetch(
                      `${process.env.REACT_APP_EKOATLANTIC_URL}/media/getByKey/${orgIDs}/${rolPermi}`,
                      { headers }
                    )
                      .then(async (res) => {
                        const aToken = res.headers.get("token-1");
                        localStorage.setItem("rexxdex", aToken);
                        return res.json();
                      })
                      .then((resultx) => {
                        setOpened(false);
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
                        console.log(resultx);
                        myDocs.push(resultx);
                      });
                    setItems(myDocs);
                  });
                }
              }
            }
            // }
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  console.log(imageUrl);

  const handleClick = (e, imgId) => {
    // if (enabled) {
    e.preventDefault();
    console.log(imgId);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/assets/addDocument/${idx}/${imgId}`, {
      headers,
    })
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
    // }
  };

  const handleImageUpload = (e) => {
    handleClose();
    if (files !== "" && files !== 0) {
      console.log(files);
      if (files === undefined) {
        MySwal.fire({
          title: "INVALID_INPUT",
          type: "error",
          text: "Please input a file",
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
        const cbtKey = `AssetDocs${1 * 2 + 3 + dateQ}`;
        console.log(cbtKey);

        // const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("orgID", orgIdx);
        formData.append("key", cbtKey);
        formData.append("type", files[0].type);

        const raw = formData;
        console.log(raw);
        console.log("file", files[0]);

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
            if (result.data === null) {
              MySwal.fire({
                title: "INVALID_IMAGE",
                type: "error",
                text: "There is no image present",
              });
            } else {
              handleClick(e, result.data.key);
              console.log(result.data.key);
            }
            // const im = result.data.name;
            // const headers = miHeaders;
            // fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${im}`, {
            //   headers,
            // })
            //   .then(async (res) => {
            //     const aToken = res.headers.get("token-1");
            //     localStorage.setItem("rexxdex", aToken);
            //     return res.json();
            //   })
            //   .then((resultx) => {
            //     if (resultx.message === "Expired Access") {
            //       navigate("/authentication/sign-in");
            //       window.location.reload();
            //     }
            //     if (resultx.message === "Token Does Not Exist") {
            //       navigate("/authentication/sign-in");
            //       window.location.reload();
            //     }
            //     if (resultx.message === "Unauthorized Access") {
            //       navigate("/authentication/forbiddenPage");
            //       window.location.reload();
            //     }

            //     // if (isMounted) {
            //     console.log(`link [${resultx[0]}]`);
            //     if (resultx.length === 0) {
            //       MySwal.fire({
            //         title: "INVALID_IMAGE",
            //         type: "error",
            //         text: "There is no image present",
            //       });
            //     } else {
            //       handleClick(e, result.data.id);
            //       console.log(result.data.id);
            //     }
            //     // }
            //   });
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
      console.log("console");
    }
  };

  const chackValidate = (e) => {
    if (files !== "") {
      handleImageUpload(e);
    } else {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("imageVal").innerHTML = "input a document<br>";
    }
  };

  const handleDelete = (value, index) => {
    console.log(value);
    console.log(index);
    handleClose();
    // const filteredItems = items.filter((item) => item.id === value);
    // console.log(filteredItems);
    MySwal.fire({
      title: `Are you sure you want to permanently delete?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f96d02",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((resultd) => {
      if (resultd.isConfirmed) {
        handleClose();
        setOpened(true);

        const requestOptionsd = {
          method: "DELETE",
          headers: miHeaders,
        };
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const idx = urlParams.get("id");

        fetch(
          `${process.env.REACT_APP_JOHANNESBURG_URL}/assets/removeDocument/${idx}/${value}`,
          requestOptionsd
        )
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resxx) => {
            if (resxx.message === "Expired Access") {
              navigate("/authentication/sign-in");
            }
            if (resxx.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
            }
            if (resxx.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            }
            setOpened(false);
            MySwal.fire({
              title: resxx.status,
              type: "success",
              text: resxx.message,
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
    });
  };

  const handleDownload = (value, index) => {
    // const filteredItems = items.filter((item) => item.id === value);
    // console.log(filteredItems);
    // const docKey = filteredItems[0].attachedDocs[index];
    // console.log(filteredItems[0].attachedDocs);
    console.log(value);
    console.log(index);
    // console.log(filteredItems);
    // console.log(docKey);
    handleClose();
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getByKey/${orgIDs}/${value}`, {
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
        const raw1 = JSON.stringify({
          name: result.name,
        });
        console.log(raw1);
        const requestOptions1 = {
          method: "POST",
          headers: iiHeadersx,
          body: raw1,
          redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/download`, requestOptions1)
          .then((res) => res.blob())
          .then((resultxx) => {
            if (resultxx.message === "Expired Access") {
              navigate("/authentication/sign-in");
              window.location.reload();
            }
            if (resultxx.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
              window.location.reload();
            }
            if (resultxx.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
              window.location.reload();
            }
            console.log(resultxx);
            const objectURL = URL.createObjectURL(resultxx);
            console.log(objectURL);

            // (C2) TO "FORCE DOWNLOAD"
            const anchor = document.createElement("a");
            anchor.href = objectURL;
            anchor.download = result.name;
            anchor.click();

            // (C3) CLEAN UP
            window.URL.revokeObjectURL(objectURL);
            setOpened(false);
          });
      });
  };

  const handleView = (value, index) => {
    const filteredItems = items.filter((item) => item.id === value);
    console.log(items);
    console.log(value);
    console.log(index);
    console.log(filteredItems);
    // const docKey = "DOC-1664892565964-ORG-62bb21f6266f37394be3a183";
    handleClose();
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getByKey/${orgIDs}/${value}`, {
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
        const TYPE = result.type;
        if (result.name) {
          setName(result.name);
          fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${result.name}`, {
            headers,
          })
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              const resultres = await res.text();
              if (resultres === null || resultres === undefined || resultres === "") {
                return {};
              }
              return JSON.parse(resultres);
            })
            .then((resultxx) => {
              setOpened(false);
              if (resultxx.message === "Expired Access") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resultxx.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resultxx.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
                window.location.reload();
              }
              console.log(resultxx);
              if (resultxx.length > 0) {
                console.log(resultxx[0]);
                const docType = TYPE;
                const docUrl = resultxx[0];
                const mdocsUrlStart = "https://view.officeapps.live.com/op/embed.aspx?src=";
                const mdocsUrlEnd = "";
                if (
                  docType === "image/png" ||
                  docType === "image/jpg" ||
                  docType === "image/jpeg" ||
                  docType === "image/gif" ||
                  docType === "text/plain"
                ) {
                  setImageUrl(`${docUrl}`);
                  setViewDoc(true);
                } else if (docType === "application/msword") {
                  setImageUrl(`${mdocsUrlStart}${docUrl}${mdocsUrlEnd}`);
                  setViewDoc(true);
                } else if (
                  docType ===
                  "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                ) {
                  setImageUrl(`${mdocsUrlStart}${docUrl}${mdocsUrlEnd}`);
                  setViewDoc(true);
                } else if (docType === "application/pdf") {
                  console.log("rtyukjhgvcx");
                  setImageUrl(`${docUrl}`);
                  setViewDoc(true);
                } else if (
                  docType === "text/csv" ||
                  docType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ) {
                  setImageUrl(`${mdocsUrlStart}${docUrl}${mdocsUrlEnd}`);
                  setViewDoc(true);
                } else {
                  console.log("it entered");
                  setViewDoc(false);
                  MySwal.fire({
                    title: "INVALID_ACTION",
                    type: "error",
                    text: "Sorry this document can't be previewed, try downloading the document.",
                  });
                }
              } else {
                MySwal.fire({
                  title: "DOCUMENT_NON_EXIST",
                  type: "error",
                  text: "This document does not exist",
                });
              }
            });
        } else {
          MySwal.fire({
            title: "DOCUMENT_NON_EXIST",
            type: "error",
            text: "This document does not exist",
          });
        }
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ height: "auto", maxHeight: "100vh", borderRadius: 1 }}>
        <AppBar position="static" style={Styles.boxSx}>
          <Toolbar disableGutters>
            <Typography variant="h4" component="div" sx={{ ml: 5, mr: 1, color: "inherit" }}>
              Attach Documents
            </Typography>
            <Button onClick={() => handleOpen()} sx={{ color: "inherit" }}>
              <Box component="div" sx={{ display: "contents" }}>
                <AddIcon sx={{ mr: 0.5, ml: 2 }} />
                <Typography variant="h6" sx={{ color: "inherit", ml: 0, mr: 1 }}>
                  New
                </Typography>
              </Box>
            </Button>
          </Toolbar>
        </AppBar>
      </Card>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <Card sx={style} style={cardBorder}>
          <MDBox>
            <MDTypography id="modal-modal-title" variant="h6" component="h2">
              Upload Document
            </MDTypography>{" "}
            <MDTypography
              variant="button"
              fontWeight="regular"
              fontSize="80%"
              align="right"
              color="text"
            >
              Document
            </MDTypography>
            <br />
            <MDInput type="file" files={files} onChange={imageChange} />
            <p id="imageVal" style={{ color: "red", fontSize: 13 }}>
              <i> </i>
            </p>
            <MDBox mt={0} mb={1}>
              <MDButton
                variant="gradient"
                onClick={chackValidate}
                color="info"
                width="50%"
                align="left"
              >
                Upload
              </MDButton>
              &nbsp;
              <MDButton
                variant="gradient"
                onClick={handleClose}
                color="error"
                width="50%"
                align="center"
              >
                Cancel
              </MDButton>
            </MDBox>
          </MDBox>
        </Card>
      </Backdrop>
      &nbsp; &nbsp;
      <Card style={{ padding: "10px" }}>
        &nbsp; &nbsp;
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {items.map((api, index) => {
              //  const docName = api.name;
              console.log(api);
              console.log(index);
              if (api !== null) {
                const docType = api.type;
                //  const docSize = api.size;
                //  const docDate = api.createdTime;
                let pngType;
                if (
                  docType === "image/png" ||
                  docType === "image/jpg" ||
                  docType === "image/jpeg" ||
                  docType === "image/gif"
                ) {
                  pngType = ImagePng;
                } else if (docType === "application/msword") {
                  pngType = WordPng;
                } else if (
                  docType ===
                  "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                ) {
                  pngType = PowerPointPng;
                } else if (docType === "application/pdf") {
                  pngType = PdfPng;
                } else if (
                  docType === "text/csv" ||
                  docType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ) {
                  pngType = ExcelPng;
                } else {
                  pngType = DocPng;
                }
                return (
                  <>
                    {api !== null ? (
                      <Grid key={api} item xs={12} md={6} lg={3}>
                        <Card style={{ backgroundColor: "#EB5353" }}>
                          {api.displayName}
                          <Button
                            id="demo-customized-button"
                            aria-controls="demo-customized-menu"
                            aria-haspopup="true"
                            aria-expanded="true"
                            disableElevation
                            sx={{ color: "inherit" }}
                            onClick={() => handleView(api, index)}
                          >
                            <CardContent>
                              <img src={pngType} alt="Icon" width="78" height="78" />
                            </CardContent>
                          </Button>
                          <CardActions>
                            <Button
                              onClick={() => handleDelete(api, index)}
                              style={{ color: "white" }}
                              startIcon={<DeleteIcon />}
                            >
                              Remove
                            </Button>
                            <Button
                              onClick={() => handleDownload(api, index)}
                              style={{ color: "white" }}
                              startIcon={<DownloadIcon />}
                            >
                              Download
                            </Button>
                          </CardActions>
                        </Card>{" "}
                        &nbsp; &nbsp;{" "}
                      </Grid>
                    ) : (
                      <MDBox />
                    )}
                  </>
                );
              }
            })}
          </Grid>
        </Box>
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={viewDoc}>
        <Card sx={viewDocStyle}>
          {" "}
          <MDBox>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={() => handleViewClose()}
            >
              <ClearIcon sx={{ color: "red" }} />
            </IconButton>
          </MDBox>
          <MDBox>
            <iframe
              id="msdoc-iframe"
              title="msdoc-iframe"
              src={imageUrl}
              width="100%"
              height="100%"
              styles={{ maxHeight: "80vh", maxWidth: "80vh" }}
              className=""
              display="block"
              position="relative"
            />
            <h1>Pure{name}</h1>
          </MDBox>
        </Card>
      </Backdrop>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}
export default AssetAttachDocument;
