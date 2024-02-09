/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState, useEffect } from "react";

// react-router components
import { useLocation, Link, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
// import DeleteIcon from '@mui/icons-material/Delete';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
// import NotificationItem from "examples/Items/NotificationItem";

// imports for the drawer
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import GHeaders from "getHeader";
// import PHeaders from "postHeader";
import LogoutIcon from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 PRO React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import MDTypography from "components/MDTypography";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState([]);
  //   {
  //     id: 1,
  //     name: "andrew",
  //     message: "created a group",
  //     createdTime: new Date("2022-11-14").getTime(),
  //   },
  //   {
  //     id: 2,
  //     name: "daniel",
  //     message: "invited for a birthday party",
  //     createdTime: new Date("2022-11-16").getTime(),
  //   },
  //   {
  //     id: 3,
  //     name: "danga",
  //     message: "created a job post",
  //     createdTime: new Date("2022-11-13").getTime(),
  //   },
  //   {
  //     id: 4,
  //     name: "Joshua",
  //     message: "just drop a message in announcement",
  //     createdTime: new Date("2022-11-17").getTime(),
  //   },
  //   {
  //     id: 5,
  //     name: "emmy banks",
  //     message: "preparing for an official trip",
  //     createdTime: new Date("2022-11-18").getTime(),
  //   },
  // ]);
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  // const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  // const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  // const handleCloseMenu = () => setOpenMenu(false);

  // // Render the notifications menu
  // const renderMenu = () => (
  //   <Menu
  //     anchorEl={openMenu}
  //     anchorReference={null}
  //     anchorOrigin={{
  //       vertical: "bottom",
  //       horizontal: "left",
  //     }}
  //     open={Boolean(openMenu)}
  //     onClose={handleCloseMenu}
  //     sx={{ mt: 2 }}
  //   >
  //     <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
  //     <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
  //     <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
  //   </Menu>
  // );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  // const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [state, setState] = React.useState({
    right: false,
  });

  // <div
  //   // eslint-disable-next-line react/no-danger
  //   dangerouslySetInnerHTML={{
  //     __html: items.notification,
  //   }}
  // />;

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   const raw = JSON.stringify({
  //     orgID: orgIDs,
  //     permissionCall: "permissionCallx",
  //     actionBy: "actionByx",
  //     type: "typex",
  //     icon: "curImage",
  //   });
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };
  //   fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/notification/send`, requestOptions)
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       if (result.message === "Expired Access") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Token Does Not Exist") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Unauthorized Access") {
  //         navigate("/authentication/forbiddenPage");
  //         window.location.reload();
  //       }
  //       MySwal.fire({
  //         title: result.status,
  //         type: "success",
  //         text: result.message,
  //       }).then(() => {
  //         window.location.reload();
  //       });
  //     })
  //     .catch((error) => {
  //       MySwal.fire({
  //         title: error.status,
  //         type: "error",
  //         text: error.message,
  //       });
  //     });
  // };
  // console.log(handleClick);

  const handleGets = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const empIDs = data11.personalID;
    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/notification/getForEmp/${orgIDs}/${empIDs}`, {
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
        // console.log(result);
        if (result) {
          console.log("##############NOTIFICATION", result);
          if (result.length !== 0) {
            setItems((item) => [...item, result]);
            // console.log((item) => [item]);
            // console.log(result);
            // setMainItems(result);
          }
        }

        setOpened(false);
      });
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      handleGets();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDisable = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f96d02",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };
        fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/notification/delete/${id}`, requestOptions)
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
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

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const drawer = (anchor) => (
    <Box
      // sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <MDBox pt={4} pb={3} px={3}>
        <MDBox
          variant="gradient"
          // bgColor="info"
          style={{ backgroundColor: "#f96d02" }}
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Notifications
          </MDTypography>
        </MDBox>
        <MDBox>
          {/* eslint-disable-next-line arrow-body-style */}
          {items.map((item) => {
            // const data = item;
            // console.log(items[0]);
            // console.log(items);
            // console.log(item.groupName);
            // console.log(data);
            // console.log(item[0].msg);

            return (
              <MDBox
                style={{
                  display: "flex",
                  flaxDirection: "row",
                  padding: 10,
                  justifyCotent: "space-between",
                  margin: 5,
                }}
                key={item[0].id}
              >
                <MDBox
                  style={{
                    width: "100%",
                  }}
                >
                  <MDBox
                    style={{
                      display: "flex",
                      flaxDirection: "row",
                      justifyCotent: "space-between",
                    }}
                    key={item[0].id}
                  >
                    <div
                      style={{ fontSize: "14px" }}
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{
                        __html: item[0].msg,
                      }}
                    />
                    {/* <MDTypography variant="h6" fontWeight="medium" color="text" mt={1} mr={1}>
                      {item[0].msg}
                    </MDTypography> */}
                    <MDTypography variant="h6" fontWeight="regular" color="text" mt={1}>
                      {item[0].question}
                    </MDTypography>
                  </MDBox>
                  <MDTypography variant="h6" fontWeight="medium" color="text" mt={1}>
                    {/* {new Date(data.createdTime).toLocaleString()} */}
                  </MDTypography>
                </MDBox>

                <IconButton
                  onClick={() => handleDisable(item[0].id)}
                  size="large"
                  color="info"
                  disableRipple
                >
                  <Icon>delete</Icon>
                </IconButton>
              </MDBox>
            );
          })}
        </MDBox>
      </MDBox>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </Box>
  );

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            {/* <MDBox pr={1}>
              <MDInput label="Search here" />
            </MDBox> */}
            <MDBox color={light ? "white" : "inherit"}>
              <Link to="/user-Profile">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>account_circle</Icon>
                </IconButton>
              </Link>
              <Link to="/company-Profile">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>corporate_fare</Icon>
                </IconButton>
              </Link>
              <Link to="/payment">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>savings</Icon>
                </IconButton>
              </Link>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
              <Link to="/authentication/sign-in">
                <LogoutIcon size="BIG" color="black" disableRipple>
                  <Icon>Logout</Icon>
                </LogoutIcon>
              </Link>
              <>
                {["right"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    {/* <> */}
                    <IconButton
                      size="small"
                      disableRipple
                      color="inherit"
                      sx={navbarIconButton}
                      aria-controls="notification-menu"
                      aria-haspopup="true"
                      variant="contained"
                      onClick={toggleDrawer(anchor, true)}
                    >
                      <Icon sx={iconsStyle}>notifications</Icon>
                    </IconButton>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                      sx={{
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 460 },
                      }}
                    >
                      {drawer(anchor)}
                    </Drawer>
                    {/* </> */}
                  </React.Fragment>
                ))}
              </>
              {/* <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton>
              {renderMenu()} */}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
