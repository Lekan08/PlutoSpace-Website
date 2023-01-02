/* eslint-disable react/prop-types */
import React, { useState } from "react";

import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Form } from "react-bootstrap";
// import Icon from "@mui/material/Icon";

// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";

// import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import IHeaders from "imgHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Iframe from "react-iframe";

// // imports for modal
// import Modal from "@mui/material/Modal";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import DownloadIcon from "@mui/icons-material/Download";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import { DeleteForever } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";

// announcement images
import DocPng from "assets/document-pngs/DocPng.png";
import ExcelPng from "assets/document-pngs/ExcelPng.png";
import PdfPng from "assets/document-pngs/PdfPng.png";
import PowerPointPng from "assets/document-pngs/PowerPointPng.png";
import WordPng from "assets/document-pngs/WordPng.png";
import ImagePng from "assets/document-pngs/imagePng.png";
import RollingGif from "assets/images/Rolling.gif";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

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
  height: "90%",
  width: "90%",
  maxHeight: "90vh",
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 10,
  borderRadius: 5,
  overflow: "scroll",
  // overflowY: "auto",
  height: "auto",
  maxHeight: "70vh",
  display: "block",

  "&::-webkit-scrollbar": {
    width: "6px",
    height: "2px",
    display: "none",
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
  // borderTopLeftRadius: 20,
  // borderBottomLeftRadius: 20,
};

function IconView({ items, groups, level }) {
  const [iiidd, setIIIDD] = useState("");
  console.log(level);
  const [accessLevelx, setAccessLevel] = useState("");

  React.useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setAccessLevel(`${level}`);
    }

    return () => {
      isMounted = false;
    };
  }, [level]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleShowMenu = (event, value) => {
    setAnchorEl(event.currentTarget);
    setIIIDD(value);
    console.log(value);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const MySwal = withReactContent(Swal);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allIHeaders: iiHeaders } = IHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  // const [imageUrl, setImageUrl] = useState(
  //   "C:/Users/HP/PlutospaceERP-/src/assets/images/Infinity.gif"
  // );
  const [imageUrl, setImageUrl] = useState(RollingGif);

  const [groupidx, setGroupIdx] = useState("");
  const [documentIDx, setDocumentIDx] = useState("");

  const [opened, setOpened] = useState(false);
  const [openn, setOpenn] = React.useState(false);
  const [viewDoc, setViewDoc] = React.useState(false);
  const handleOpen = (value) => {
    setDocumentIDx(value);
    setAnchorEl(null);
    setOpenn(true);
  };
  const handleCloseG = () => {
    setOpenn(false);
  };
  const handleClosee = () => {
    setOpenn(false);
  };

  const handleViewClose = () => {
    setViewDoc(false);
    setImageUrl(RollingGif);
  };

  const handleDelete = (value) => {
    handleClose();
    const filteredItems = items.filter((item) => item.id === value);
    MySwal.fire({
      title: `Are you sure you want to permanently delete ${filteredItems[0].name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((resultd) => {
      if (resultd.isConfirmed) {
        handleClose();
        setOpened(true);
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };
        const data11 = JSON.parse(localStorage.getItem("user1"));
        const orgIDs = data11.orgID;
        const mOrgID = orgIDs;
        const docKey = filteredItems[0].key;
        fetch(
          `${process.env.REACT_APP_EKOATLANTIC_URL}/media/delete/${mOrgID}/${docKey}`,
          requestOptions
        )
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            const result = await res.text();
            if (result === null || result === undefined || result === "") {
              return {};
            }
            return JSON.parse(result);
          })
          .then((resx) => {
            console.log(resx);
            // if (resx.message === "Expired Access") {
            //   navigate("/authentication/sign-in");
            // }
            // if (resx.message === "Token Does Not Exist") {
            //   navigate("/authentication/sign-in");
            // }
            if (resx.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            }
            // } else {
            //   navigate("/authentication/sign-in");
            // }
            console.log(`STATUS - ${resx.status} - - - - - - MESSAGE - ${resx.message}`);

            if (resx.status !== "SUCCESS") {
              setOpened(false);
              MySwal.fire({
                title: "DELETE_UNSUCCESSFUL",
                type: "error",
                text: "Document Delete Was Unsuccessful",
              });
            } else {
              const requestOptionsd = {
                method: "DELETE",
                headers: miHeaders,
              };

              fetch(
                `${process.env.REACT_APP_EKOATLANTIC_URL}/documentLibrary/delete/${value}`,
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
          })
          .catch((error) => {
            console.log(`STATUS - ${error.status} - - - - - - MESSAGE - ${error.message}`);
          });
      }
    });
  };
  // sup
  const handleView = (value) => {
    const filteredItems = items.filter((item) => item.id === value);
    console.log(value);
    console.log(filteredItems);
    const docKey = filteredItems[0].key;
    // const docKey = "DOC-1664892565964-ORG-62bb21f6266f37394be3a183";
    handleClose();
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getByKey/${orgIDs}/${docKey}`, {
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
        if (result.name) {
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
              if (resultxx.length > 0) {
                console.log(resultxx[0]);
                const docType = filteredItems[0].type;
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

  // Method to handle update
  const handleShare = (value) => {
    handleClose();
    handleClosee();
    setOpened(true);
    const filteredItems = items.filter((item) => item.id === value);
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      id: filteredItems[0].id,
      orgID: orgIDs,
      empID: filteredItems[0].empID,
      key: filteredItems[0].key,
      accessLevel: parseInt(accessLevelx, 10),
      groupID: groupidx,
      type: filteredItems[0].type,
      size: filteredItems[0].size,
      name: filteredItems[0].name,
      createdTime: filteredItems[0].createdTime,
      deleteFlag: filteredItems[0].deleteFlag,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/documentLibrary/update`, requestOptions)
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
        }).then(() => {
          handleOpen();
        });
      });
  };

  const checkUDoc = () => {
    if (accessLevelx !== "") {
      if (accessLevelx === "1") {
        if (groupidx === "") {
          // eslint-disable-next-line no-unused-expressions
          document.getElementById("groupVal").innerHTML = "please choose a group<br>";
          return;
        }
      }
      handleShare(documentIDx);
    } else {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("imageVal").innerHTML = "choose an access level<br>";
    }
  };

  const handleDownload = (value) => {
    const filteredItems = items.filter((item) => item.id === value);
    const docKey = filteredItems[0].key;
    handleClose();
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getByKey/${orgIDs}/${docKey}`, {
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
          headers: iiHeaders,
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

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  // Method to change date from timestamp
  const changeSize = (bytes) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  };

  return (
    <MDBox>
      <Grid container spacing={3}>
        {items.map((item) => {
          const docName = item.name;
          const docType = item.type;
          const docSize = item.size;
          const docDate = item.createdTime;
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
            docType === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
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
            <Grid item xs={12} md={6} lg={3} key={item.id}>
              <div>
                <Button
                  id="demo-customized-button"
                  aria-controls={open ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  disableElevation
                  sx={{ color: "inherit" }}
                  onClick={(e) => handleShowMenu(e, item.id)}
                >
                  <img src={pngType} alt="Icon" width="78" height="78" />
                  <MDBox textAlign="center">
                    <div
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "10rem",
                        marginBottom: -10,
                      }}
                    >
                      <MDTypography
                        variant="inherit"
                        fontWeight="medium"
                        fontSize="100%"
                        align="left"
                        color="text"
                        noWrap
                      >
                        {docName}
                      </MDTypography>
                    </div>
                    <br />
                    <MDTypography
                      variant="inherit"
                      fontWeight="regular"
                      fontSize="100%"
                      align="left"
                      color="text"
                      mb={-2}
                      noWrap
                    >
                      {changeSize(docSize)}
                    </MDTypography>
                    <br />
                    <MDTypography
                      variant="inherit"
                      fontWeight="regular"
                      fontSize="100%"
                      align="left"
                      color="text"
                      noWrap
                    >
                      {changeDate(docDate)}
                    </MDTypography>
                  </MDBox>
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  value={iiidd}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleView(iiidd)} disableRipple>
                    <SlideshowIcon />
                    View
                  </MenuItem>
                  <MenuItem onClick={() => handleOpen(iiidd)} disableRipple>
                    <ChangeCircleOutlinedIcon />
                    Change Access Level
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem onClick={() => handleDownload(iiidd)} disableRipple>
                    <DownloadIcon />
                    Download
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(iiidd)} disableRipple>
                    <DeleteForever />
                    Delete
                  </MenuItem>
                </StyledMenu>
              </div>
            </Grid>
          );
        })}
      </Grid>
      &nbsp;
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openn}>
        <Card sx={style} style={cardBorder}>
          <MDBox>
            <MDTypography id="modal-modal-title" variant="h6" component="h2">
              Change Access Level
            </MDTypography>
            <MDBox mt={2}>
              <MDTypography
                variant="button"
                fontWeight="regular"
                fontSize="80%"
                align="right"
                color="text"
              >
                Access Level <i>(optional)</i>
              </MDTypography>
              <Form.Select
                value={accessLevelx || ""}
                onChange={(e) => setAccessLevel(e.target.value)}
                aria-label="Default select example"
              >
                <option value="">Select Access Level</option>
                <option value="0">Personal</option>
                <option value="1">Group</option>
                <option value="2">Organisation</option>
              </Form.Select>
              <br />
            </MDBox>
            <p id="imageVal" style={{ color: "red", fontSize: 13 }}>
              <i> </i>
            </p>
            {accessLevelx === "1" && (
              <MDBox mt={0}>
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  fontSize="80%"
                  align="right"
                  color="text"
                >
                  Group
                </MDTypography>
                <Form.Select
                  value={groupidx || ""}
                  onChange={(e) => setGroupIdx(e.target.value)}
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
            )}
            <p id="groupVal" style={{ color: "red", fontSize: 13 }}>
              <i> </i>
            </p>
            <MDBox mt={0} mb={1}>
              <MDButton
                variant="gradient"
                onClick={() => checkUDoc()}
                color="info"
                width="50%"
                align="left"
              >
                Upload
              </MDButton>
              &nbsp;
              <MDButton
                variant="gradient"
                onClick={handleCloseG}
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
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={viewDoc}>
        <Card sx={viewDocStyle}>
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
        </Card>
      </Backdrop>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </MDBox>
  );
}

export default IconView;
