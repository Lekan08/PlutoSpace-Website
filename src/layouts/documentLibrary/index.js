import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Form } from "react-bootstrap";
// import Icon from "@mui/material/Icon";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";

import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// imports for modal
// import Modal from "@mui/material/Modal";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import AddIcon from "@mui/icons-material/Add";
// import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
// import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Styles from "styles";
import ContentView from "./libraryView/contentView";
import IconView from "./libraryView/iconView";

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  borderRadius: "0px",
  "& .MuiTabs-indicator": {
    // backgroundColor: "#1890ff",
    borderRadius: "0px",
    borderBottom: "5px solid #f96d02",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,
  [theme.breakpoints.up("sm")]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: "rgba(0, 0, 0, 0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    color: "#40a9ff",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#1890ff",
    fontWeight: theme.typography.fontWeightMedium,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#ffffff",
  },
}));

function DocumentLibrary() {
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

  const DocViewScrollstyle = {
    boxShadow: 24,
    p: 4,
    borderRadius: 0,
    overflow: "scroll",
    height: "auto",
    maxHeight: "100vh",

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
    // borderTopLeftRadius: 20,
    // borderBottomLeftRadius: 20,
  };
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const [viewType, setViewType] = useState(false);
  const handleCloseUserMenu = (value) => {
    setAnchorElUser(null);
    if (value === 1) {
      setViewType(true);
    } else if (value === 2) {
      setViewType(false);
    }
  };

  const MySwal = withReactContent(Swal);

  const [files, setFiles] = useState("");

  const [open, setOpenn] = React.useState(false);
  const handleOpen = () => setOpenn(true);
  const handleClose = () => {
    setFiles("");
    setOpenn(false);
  };

  const [groupidx, setGroupIdx] = useState("");
  const [groups, setGroups] = useState([]);
  const [accessLevelx, setAccessLevel] = useState("");
  const [value, setValue] = React.useState(0);

  const [items, setItems] = useState([]);
  const [mainItems, setMainItems] = useState([]);

  const [opened, setOpened] = useState(false);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  // Method to filter tickets
  const handleGets = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;
    setOpened(true);
    const headers = miHeaders;
    fetch(
      `${process.env.REACT_APP_EKOATLANTIC_URL}/documentLibrary/getForEmp/${orgIDs}/${personalIDs}`,
      { headers }
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        if (result.length !== 0) {
          setItems(result);
          setMainItems(result);
        } else {
          setItems([]);
          setMainItems([]);
        }
        setOpened(false);
      });
  };

  // Method to filter tickets
  const handleGetsGroup = () => {
    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const orgIDs = data11.orgID;
    console.log(groups);
    const allGroupID = groups.map((group) => group.group.id);
    console.log(allGroupID);
    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/documentLibrary/getByGroups/${allGroupID}`, {
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
        if (result.length !== 0) {
          setItems(result);
          setMainItems(result);
        } else {
          setItems([]);
          setMainItems([]);
        }
        setOpened(false);
      });
  };

  // Method to filter tickets
  const handleGetsOrg = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    // const personalIDs = data11.personalID;
    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/documentLibrary/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        if (result.length !== 0) {
          setItems(result);
          setMainItems(result);
        } else {
          setItems([]);
          setMainItems([]);
        }

        setOpened(false);
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      //   fetches the table data
      handleGets();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/groups/getForEmp/${orgIDs}/${personalIDs}`, {
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
        if (isMounted) {
          if (result) {
            if (result.length !== 0) {
              setGroups(result);
            }
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDocUpload = (e) => {
    handleClose();
    // if (imageUrl) {
    // MySwal.fire({
    //   title: "INVALID_ACTION",
    //   type: "error",
    //   text: "You can't upload a picture again, please change the image",
    // });
    // } else {
    console.log(files);
    if (!files) {
      MySwal.fire({
        title: "INVALID_INPUT",
        type: "error",
        text: "Please input a file",
      }).then(() => {
        handleOpen();
      });
    } else {
      console.log(files[0]);
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
      console.log(data11);
      const personalIDs = data11.personalID;
      const orgIDs = data11.orgID;

      const mOrgID = orgIDs;

      setOpened(true);
      const rawDL = JSON.stringify({
        orgID: orgIDs,
        empID: personalIDs,
        accessLevel: parseInt(accessLevelx, 10),
        groupID: groupidx,
        type: files[0].type,
        size: files[0].size,
        name: files[0].name,
      });
      const requestOptionsDL = {
        method: "POST",
        headers: myHeaders,
        body: rawDL,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/documentLibrary/add`, requestOptionsDL)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((resultDL) => {
          if (resultDL.message === "Expired Access") {
            navigate("/authentication/sign-in");
            window.location.reload();
          }
          if (resultDL.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
            window.location.reload();
          }
          if (resultDL.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
            window.location.reload();
          }

          console.log(resultDL);
          console.log(`STATUS - ${resultDL.status} - - - - - - MESSAGE - ${resultDL.message}`);
          if (resultDL.status !== "SUCCESS") {
            handleOpen();
          } else {
            const upFileData = resultDL.data;
            const formData = new FormData();
            formData.append("file", files[0]);
            formData.append("orgID", mOrgID);
            formData.append("key", upFileData.key);
            formData.append("type", files[0].type);

            const raw = formData;
            console.log(raw);

            // const raw = JSON.stringify({
            //   mediaDTO: {
            //     multipartFile: formData,
            //     key: imgKey,
            //     type: files[0].type,
            //   },
            // });
            const requestOptions = {
              method: "POST",
              headers: iiHeaders,
              body: raw,
              redirect: "follow",
            };

            fetch(`http://monoverse.plutospace.space/media/uploadFile`, requestOptions)
              // fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/uploadFile`, requestOptions)
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
                console.log(`STATUS - ${result.status} - - - - - - MESSAGE - ${result.message}`);
                if (result.status === "SUCCESS") {
                  MySwal.fire({
                    title: resultDL.status,
                    type: "success",
                    text: resultDL.message,
                  }).then(() => {
                    handleClose();
                    // setValue(0);
                    // handleGets();
                    // setGroupIdx("");
                    window.location.reload();
                  });
                }
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
          }
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
    // }
  };

  const checkUDoc = (e) => {
    if (files !== "" && accessLevelx !== "") {
      if (accessLevelx === "1") {
        if (groupidx === "") {
          // eslint-disable-next-line no-unused-expressions
          document.getElementById("groupVal").innerHTML = "please choose a group<br>";
          return;
        }
      }
      handleDocUpload(e);
    } else {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("imageVal").innerHTML =
        "input a document and choose an access level<br>";
    }
  };

  const previewImage = (e) => {
    setFiles(e.target.files);
    // if (e.target.files[0].size > 522240) {
    //   setImgChanged(false);
    //   // eslint-disable-next-line no-unused-expressions
    //   document.getElementById("imageVal").innerHTML = "File should not exceed 500kb<br>";
    // } else if (
    //   e.target.files[0].type !== "image/png" &&
    //   e.target.files[0].type !== "image/jpg" &&
    //   e.target.files[0].type !== "image/jpeg" &&
    //   e.target.files[0].type !== "image/gif"
    // ) {
    //   setImgChanged(false);
    //   // eslint-disable-next-line no-unused-expressions
    //   document.getElementById("imageVal").innerHTML =
    //     "use only JPG, JPEG, PNG, JFIF or GIF image formats<br>";
    // } else {
    //   console.log(e.target.files[0]);
    //   setSelectedImage(e.target.files[0]);
    //   setImgChanged(true);
    //   // eslint-disable-next-line no-unused-expressions
    //   document.getElementById("imageVal").innerHTML = "";
    // }
  };

  // const handleDeleteImage = () => {
  //   if (!imageUrl) {
  //     MySwal.fire({
  //       title: "INVALID_IMAGE",
  //       type: "error",
  //       text: "Sorry there is no image to delete",
  //     }).then(() => {
  //       handleOpen();
  //     });
  //   } else {
  //     const requestOptions = {
  //       method: "DELETE",
  //       headers: miHeaders,
  //     };
  //     const data11 = JSON.parse(localStorage.getItem("user1"));
  //     const orgIDs = data11.orgID;
  //     const personalIDs = data11.personalID;
  //     const mOrgID = orgIDs;
  //     const imgKey = `PROF_PIC_EMP-${personalIDs}`;
  //     fetch(
  //       `${process.env.REACT_APP_EKOATLANTIC_URL}/media/delete/${mOrgID}/${imgKey}`,
  //       requestOptions
  //     )
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         const result = await res.text();
  //         if (result === null || result === undefined || result === "") {
  //           return {};
  //         }
  //         return JSON.parse(result);
  //       })
  //       .then((resx) => {
  //         console.log(resx);
  //         // if (resx.message === "Expired Access") {
  //         //   navigate("/authentication/sign-in");
  //         // }
  //         // if (resx.message === "Token Does Not Exist") {
  //         //   navigate("/authentication/sign-in");
  //         // }
  //         if (resx.message === "Unauthorized Access") {
  //           navigate("/authentication/forbiddenPage");
  //         }
  //         // } else {
  //         //   navigate("/authentication/sign-in");
  //         // }
  //         MySwal.fire({
  //           title: resx.status,
  //           type: "success",
  //           text: resx.message,
  //         }).then(() => {
  //           console.log("SUCCESS");
  //           handleGetDoc();
  //         });
  //       })
  //       .catch((error) => {
  //         MySwal.fire({
  //           title: error.status,
  //           type: "error",
  //           text: error.message,
  //         });
  //       });
  //   }
  // };

  // const Search = styled("div")(({ theme }) => ({
  //   position: "relative",
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   "&:hover": {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  //   marginLeft: 0,
  //   width: "100%",
  //   [theme.breakpoints.up("sm")]: {
  //     marginLeft: theme.spacing(1),
  //     width: "auto",
  //   },
  // }));

  // const SearchIconWrapper = styled("div")(({ theme }) => ({
  //   padding: theme.spacing(0, 2),
  //   height: "100%",
  //   position: "absolute",
  //   pointerEvents: "none",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // }));

  // const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //   color: "inherit",
  //   "& .MuiInputBase-input": {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     // vertical padding + font size from searchIcon
  //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //     transition: theme.transitions.create("width"),
  //     width: "100%",
  //     [theme.breakpoints.up("sm")]: {
  //       width: "12ch",
  //       "&:focus": {
  //         width: "20ch",
  //       },
  //     },
  //   },
  // }));

  const handleChangeTab = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    if (newValue === 0) {
      handleGets();
    } else if (newValue === 1) {
      handleGetsGroup();
    } else if (newValue === 2) {
      handleGetsOrg();
    }
  };

  // Function to search table
  const searchFunc = (val) => {
    console.log(val);
    console.log(mainItems);
    // const input = document.getElementById("search").value;
    const input = val;
    console.log(input);
    const filter = input.toUpperCase();
    const jsonData = [];
    // eslint-disable-next-line array-callback-return
    mainItems.map((item) => {
      let docName = item.name;
      if (docName == null) {
        docName = "";
      }
      if (
        item.name.toUpperCase().indexOf(filter) > -1 ||
        docName.toUpperCase().indexOf(filter) > -1
      ) {
        jsonData.push(item);
      }
    });
    setItems(jsonData);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ height: "auto", maxHeight: "100vh", borderRadius: 1 }}>
        <AppBar position="static" color="info">
          <Toolbar disableGutters style={Styles.boxSx}>
            <Typography variant="h4" component="div" sx={{ ml: 5, mr: 1, color: "inherit" }}>
              Documents
            </Typography>
            <Button onClick={() => handleOpen()} sx={{ color: "inherit" }}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <AddIcon style={{ marginRight: 2, color: "white" }} />
                <Typography
                  // variant="h6"
                  style={{
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  New
                </Typography>
              </Box>
            </Button>
            {/* <AddIcon sx={{ mr: 0.5, ml: 2 }} />
            <Button sx={{ color: "inherit", ml: -3, mr: 2 }}>New</Button> */}
            <Typography sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }} />
            <TextField
              id="outlined-search"
              placeholder="Search"
              type="search"
              sx={{ input: { backgroundColor: "white" } }}
              onKeyUp={(e) => searchFunc(e.target.value)}
              InputProps={{
                style: { color: "red", backgroundColor: "white" },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "white" }} />
                  </InputAdornment>
                ),
              }}
            />
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onKeyUp={(e) => searchFunc(e.target.value)}
              />
            </Search> */}
            <Button onClick={handleOpenUserMenu}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "5px",
                  backgroundColor: "#ffffff",
                  borderRadius: "5px",
                }}
              >
                <ViewComfyIcon color="info" style={{ marginRight: 2, color: "#777" }} />
                <Typography
                  // variant="h6"
                  style={{
                    color: "#777",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  view
                </Typography>
              </Box>
            </Button>

            <Box sx={{ mr: 4 }} />
            <Box sx={{ flexGrow: 0 }}>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => handleCloseUserMenu(1)}>
                  <Typography textAlign="center">List</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleCloseUserMenu(2)}>
                  <Typography textAlign="center">Icon</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: "40vw" }}>
          <Box sx={{ bgcolor: "#fff" }}>
            <AntTabs value={value} onChange={handleChangeTab} aria-label="ant example" centered>
              <AntTab label="personal" />
              <AntTab label="group" />
              <AntTab label="organisation" />
            </AntTabs>
          </Box>
        </Box>
        <MDBox sx={DocViewScrollstyle}>
          {viewType ? (
            <ContentView items={items} groups={groups} level={value} />
          ) : (
            <IconView items={items} groups={groups} level={value} />
          )}
        </MDBox>
      </Card>
      &nbsp;
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <MDBox style={{ overflow: "hidden" }}>
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
              <MDInput type="file" files={files} onChange={previewImage} />
              <MDBox mt={2}>
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  fontSize="80%"
                  align="right"
                  color="text"
                >
                  Access Level
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
                <p id="imageVal" style={{ color: "red", fontSize: 13 }}>
                  <i> </i>
                </p>
              </MDBox>
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
                  <p id="groupVal" style={{ color: "red", fontSize: 13 }}>
                    <i> </i>
                  </p>
                </MDBox>
              )}
              <MDBox mt={0} mb={1}>
                <MDButton
                  variant="gradient"
                  onClick={checkUDoc}
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
        </MDBox>
      </Backdrop>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default DocumentLibrary;
