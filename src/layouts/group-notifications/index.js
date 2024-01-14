/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import "bootstrap/dist/css/bootstrap.min.css";
import PHeaders from "postHeader";
import Styles from "styles";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Footer from "examples/Footer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function GroupNotifications() {
  // const [rolName, setRolName] = useState("");
  // console.log(rolName);
  // const [serviceVal, setServiceVal] = useState("");
  const MySwal = withReactContent(Swal);
  const [services, setServices] = useState([]);
  const [rService, setRService] = useState("");
  const [Ntype, setNtype] = useState("");
  const [groupName, setGroupName] = useState("");
  const [vPermissions, setVPermissions] = useState([]);
  const [settings, setSettings] = useState({ set: "Show Settings" });

  const [showSAll, setSAll] = useState(false);
  const [checkSelAll, setcheckSelAll] = useState(true);
  // console.log(rolName);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    if (id === null) {
      navigate("/authentication/sign-in");
    }
  }, []);

  // useEffect(() => {
  //   setOpened(true);
  //   const headers = miHeaders;
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const id = urlParams.get("id");
  //   const idVal = JSON.parse([id]);
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_SHASHA_URL}/groups/getByIds/${idVal}`, { headers })
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((resultg) => {
  //       setOpened(false);
  //       if (resultg.message === "Expired Access") {
  //         navigate("/authentication/sign-in");
  //       }
  //       if (resultg.message === "Token Does Not Exist") {
  //         navigate("/authentication/sign-in");
  //       }
  //       if (resultg.message === "Unauthorized Access") {
  //         navigate("/authentication/forbiddenPage");
  //       }
  //       if (isMounted) {
  //         setRolName(resultg[0].name);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  const permissionsList = [];

  const handleOnButton = () => {
    setOpened(true);
    if (Ntype === "" && rService === "") {
      MySwal.fire({
        title: "You didn't select any option!",
        icon: "error",
      });
      setOpened(false);
    } else if (rService === "") {
      MySwal.fire({
        title: "You didn't select any service!",
        icon: "error",
      });
      setOpened(false);
    } else if (Ntype === "") {
      MySwal.fire({
        title: "You didn't select any notification type!",
        icon: "error",
      });
      setOpened(false);
    } else if (Ntype === "--Select Notification Type--" && rService === "--Select Service--") {
      MySwal.fire({
        title: "You didn't select any option!",
        icon: "error",
      });
      setOpened(false);
    } else if (Ntype === "--Select Notification Type--") {
      MySwal.fire({
        title: "You didn't select any notification type!",
        icon: "error",
      });
      setOpened(false);
    } else if (rService === "--Select Service--") {
      MySwal.fire({
        title: "You didn't select any service!",
        icon: "error",
      });
      setOpened(false);
    } else {
      setSettings({ set: `Showing ${Ntype} notification settings for ${rService}` });
      const headers = miHeaders;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const idVal = urlParams.get("id");

      const apiValue = rService;
      // const typeVal = Ntype;
      // console.log(typeVal);
      setVPermissions([]);
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      // setRService(value);
      // setServiceVal(apiValue);
      fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/permissions/getForService/${apiValue}`, {
        headers,
      })
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((resulta) => {
          if (resulta.message === "Expired Access") {
            navigate("/authentication/sign-in");
          }
          if (resulta.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
          }
          if (resulta.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
          }
          fetch(
            `${process.env.REACT_APP_EKOATLANTIC_URL}/notificationType/getForGroupByType/${orgIDs}/${idVal}/${Ntype}`,
            {
              headers,
            }
          )
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resultrpg) => {
              setOpened(false);
              if (resultrpg.message === "Expired Access") {
                navigate("/authentication/sign-in");
              }
              if (resultrpg.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
              }
              if (resultrpg.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
              }

              let countPerm = 0;
              // eslint-disable-next-line array-callback-return
              resulta.map((permission) => {
                let check = false;
                let notID = "";

                if (resultrpg != null) {
                  // eslint-disable-next-line array-callback-return
                  resultrpg.map((rolPermi) => {
                    if (rolPermi.permissionCall === permission.actionCall) {
                      // if (rolPermi.isCheck === 1) {
                      check = true;
                      countPerm += 1;
                      notID = rolPermi.id;
                      // }
                    }
                    // check = false;
                  });
                }

                const pObj = {
                  id: notID,
                  name: permission.displayName,
                  isCheck: check,
                  actionCall: permission.actionCall,
                  descrip: permission.descrip,
                };

                permissionsList.push(pObj);
              });
              if (resulta.length !== 0) {
                setSAll(true);
                if (countPerm === resulta.length) {
                  setcheckSelAll(false);
                } else {
                  setcheckSelAll(true);
                }
              } else {
                setSAll(false);
              }
              console.log(permissionsList);
              setVPermissions(permissionsList);
            });
        });
    }
  };

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/services/gets`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultapi) => {
        setOpened(false);
        if (resultapi.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultapi.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultapi.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          setServices(resultapi);

          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          setGroupName(urlParams.get("name"));
          // const permm = localStorage.getItem("permVal");
          // if (permm !== null) {
          //   setRService(permm);
          //   handleOnButton(permm);
          // }
        }
        setOpened(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnClick = (e, api) => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idVal = urlParams.get("id");
    const typeVal = Ntype;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const permCall = api.actionCall;

    const saved = e.target.checked;
    if (saved) {
      const raw = JSON.stringify({
        orgID: orgIDs,
        groupID: idVal,
        type: typeVal,
        permissionCall: permCall,
      });
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/notificationType/save`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((resultrp) => {
          if (resultrp.message === "Expired Access") {
            navigate("/authentication/sign-in");
          }
          if (resultrp.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
          }
          if (resultrp.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
          }
          setOpened(false);
        });
    } else {
      const requestOptions = {
        method: "DELETE",
        headers: miHeaders,
      };

      fetch(
        `${process.env.REACT_APP_EKOATLANTIC_URL}/notificationType/delete/${api.id}`,
        requestOptions
      )
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((resx) => {
          setOpened(false);

          if (resx.message === "Expired Access") {
            navigate("/authentication/sign-in");
          }
          if (resx.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
          }
          if (resx.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
          }
        });
    }
  };
  // eslint-disable-next-line no-unused-vars
  const handleSelectAll = (v) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idVal = urlParams.get("id");
    if (v === 1) {
      setOpened(true);
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      const selectAllPrems = [];
      // eslint-disable-next-line array-callback-return
      vPermissions.map((item) => {
        const fdy = {
          orgID: orgIDs,
          groupID: idVal,
          type: Ntype,
          permissionCall: item.actionCall,
          // isCheck: isChecked,
        };
        selectAllPrems.push(fdy);
      });
      const raw = JSON.stringify(selectAllPrems);
      // console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/notificationType/addMultiple`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((resultrp) => {
          if (resultrp.message === "Expired Access") {
            navigate("/authentication/sign-in");
          }
          if (resultrp.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
          }
          if (resultrp.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
          }
          setOpened(false);
          MySwal.fire({
            title: "Success",
            icon: "success",
            text: "All notifications for this service have been enabled successfully",
          }).then(() => window.location.reload());
        });
    } else {
      console.log(vPermissions);

      const requestOptions = {
        method: "DELETE",
        headers: miHeaders,
      };

      fetch(
        `${process.env.REACT_APP_EKOATLANTIC_URL}/notificationType/delete/${idVal}/${Ntype}`,
        requestOptions
      )
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((resx) => {
          setOpened(false);

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
            title: "Success",
            icon: "success",
            text: "All notifications for this service have been removed successfully",
          }).then(() => window.location.reload());
        });
    }
  };

  // const rolName = JSON.parse([id]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Container>
          <MDBox
            variant="gradient"
            style={{ backgroundColor: "#f96d02" }}
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              {groupName}
            </MDTypography>
          </MDBox>
        </Container>
        <MDBox mx={2} mt={3} p={2} mb={1} textAlign="center">
          &nbsp;
          <div>
            <Container>
              <Row>
                <Col xs={0}>
                  <MDTypography variant="h6" fontWeight="medium" color="secondary" mt={0}>
                    Notification Type
                  </MDTypography>
                  <MDBox mx={0} textAlign="center">
                    <Container>
                      <Form.Select
                        aria-label="Default select example"
                        value={Ntype}
                        // textAlign="center"
                        // onChange={(e) => handleOnButton(e.target.value)}
                        onChange={(e) => setNtype(e.target.value)}
                      >
                        <option>--Select Notification Type--</option>
                        <option value="EMAIL">Email</option>
                        <option value="INAPP">In-App</option>
                        {/* <option value="SMS">SMS</option>
                        <option value="WHATSAPP">WhatsApp</option> */}
                      </Form.Select>
                    </Container>
                  </MDBox>
                </Col>
                <Col xs={0}>
                  <MDTypography variant="h6" fontWeight="medium" color="secondary" mt={0}>
                    Select A Service
                  </MDTypography>
                  <MDBox mx={0} textAlign="center">
                    <Container>
                      <Form.Select
                        aria-label="Default select example"
                        value={rService}
                        // textAlign="right"
                        // onChange={(e) => handleOnButton(e.target.value)}
                        onChange={(e) => setRService(e.target.value)}
                      >
                        <option>--Select Service--</option>
                        {services.map((api) => (
                          <option key={api.id} value={api.name}>
                            {api.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Container>
                  </MDBox>
                </Col>
                <MDBox textAlign="center">
                  <br />
                  <MDButton
                    align="center"
                    style={Styles.buttonSx}
                    variant="gradient"
                    width={5}
                    onClick={handleOnButton}
                  >
                    Show Settings
                  </MDButton>
                </MDBox>
              </Row>
            </Container>
          </div>
        </MDBox>
      </Card>
      &nbsp;
      <Container>
        <Card>
          <MDTypography variant="h4" fontWeight="medium" color="secondary" mx={4} mt={5}>
            {settings.set}
          </MDTypography>
          <MDBox pt={0} px={4}>
            &nbsp;
            {showSAll ? (
              <div align="left" style={{ display: "flex", margin: 10 }}>
                <MDBox mt={0} mb={4} mr={5}>
                  <MDButton
                    variant="gradient"
                    value={1}
                    onClick={(e) => handleSelectAll(1)}
                    color="warning"
                    width="50%"
                  >
                    Select All
                  </MDButton>
                </MDBox>
                <MDBox mt={0} mb={4}>
                  <MDButton
                    variant="gradient"
                    value={0}
                    onClick={(e) => handleSelectAll(2)}
                    color="warning"
                    width="50%"
                  >
                    UnSelect All
                  </MDButton>
                </MDBox>
                <br />
              </div>
            ) : (
              <MDBox mt={0} mb={1} />
            )}
            <Form>
              {vPermissions.map((api, indx) => (
                // eslint-disable-next-line react/no-array-index-key
                <Row key={indx}>
                  <div className="mb-3">
                    <Form.Check.Input
                      type="checkbox"
                      defaultChecked={api.isCheck}
                      onClick={(e) => handleOnClick(e, api)}
                    />
                    <Form.Check.Label>&nbsp;{api.name}</Form.Check.Label>
                    &nbsp;
                    <Container>
                      <h6>{api.descrip}</h6>
                    </Container>
                  </div>
                </Row>
              ))}
            </Form>
          </MDBox>
        </Card>
      </Container>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
      <Footer />
    </DashboardLayout>
  );
}

export default GroupNotifications;
