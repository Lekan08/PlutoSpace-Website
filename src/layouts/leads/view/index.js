/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
import React, { useState, useEffect } from "react";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Paper from "@mui/material/Paper";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import Backdrop from "@mui/material/Backdrop";
import ReactiveButton from "reactive-button";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
// import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Sel from "@mui/material/Select";
import Sele from "react-select";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// eslint-disable-next-line no-unused-vars
import { Container, Form, Row, Col, Button } from "react-bootstrap";
// eslint-disable-next-line import/no-unresolved
import "../Css.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import CardContent from "@mui/material/CardContent";

import download from "./download.png";

export default function ViewLead() {
  const MySwal = withReactContent(Swal);

  const [showLists, setShowLists] = useState(false);

  const [open2, setOpen2] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      width: "259px",
      borderBottom: "1px dotted pink",
      color: "black",
      padding: 0,
      fontSize: 15,
      marginLeft: 10,
      marginTop: 37,
    }),
    // control: () => ({
    //   width: "300px",
    //   color: "grey",
    //   height: "20px",
    // }),
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "5px solid #cceeff",
    borderRadius: "20px",
    boxShadow: 100,
    p: 4,
  };
  const navigate = useNavigate();
  const hide = true;
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [channel, setChannel] = useState("");
  const [industryx, setIndustryx] = useState("");
  const [duty, setDutyRelieverx] = useState("");
  const [duty2, setDutyRelieverx2] = useState("");
  const [user, setUser] = useState([]);
  const [corporateID, setCorporateID] = useState([]);
  const options = corporateID.map((d) => ({
    value: d.id,
    label: d.name,
  }));
  options.unshift({ value: "", label: "None" });
  // eslint-disable-next-line no-unused-vars
  const [corp, setCorp] = useState("");
  const [titlex, setTitlex] = useState("");
  const [channelID, setChannelID] = useState("");
  // const [converted, setConverted] = useState(false);
  const [createdTime, setCreatedTime] = useState(0);
  const [deleteFlag, setDeleteFlag] = useState(0);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [opened, setOpened] = useState(false);
  const [otherx, setOtherx] = useState("");
  const [others, setOthers] = useState(false);

  const [leadWorkflowIDx, setLeadWorkflowID] = useState("");
  const [checkPointHBool, setCheckPointHBool] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgID = data11.orgID;
    let isMounted = true;
    setOpened(true);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/lead/getByIds/${ids}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
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
        if (isMounted) {
          //   eslint-disable-next-line eqeqeq
          if (result.length != 0) {
            setOpened(true);
            setId(result[0].id);
            setName(result[0].name);
            // setChannel(result[0].channel);
            setChannelID(result[0].channelUserID);
            // setConverted(result[0].converted);
            setDeleteFlag(result[0].deleteFlag);
            setCreatedTime(result[0].createdTime);
            const verify = result[0].channel;
            const verifyx = verify.match(/Others:/g);
            if (verifyx) {
              const verifyy = verifyx[0];
              if (verifyy.length > 1) {
                setOthers(true);
                setChannel("Others");
                const veri = verify.slice(8, 50);
                setOtherx(veri);
              } else setChannel(result[0].channel);
              setOpened(false);
            } else setChannel(result[0].channel);
            setOpened(false);
          }
        }
      });
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgID}`, { headers })
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
          setUser(result);
          setOpened(false);
        }
      });
    fetch(`${process.env.REACT_APP_LOUGA_URL}/corporate/gets/${orgID}`, { headers })
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
          console.log(result);
          setCorporateID(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const handleChange = (event) => {
    setChannel(event.target.value);
    if (event.target.value === "Others") {
      setOthers(true);
    } else {
      setOthers(false);
      setOtherx("");
    }
  };
  // const handleClick = () => {
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const orgID = data11.orgID;
  //   const raw = JSON.stringify({
  //     id: id,
  //     orgID: orgID,
  //     name: name,
  //     channel: others ? `Others: ${otherx}` : channel,
  //     channelUserID: channelID,
  //     converted: converted,
  //     deleteFlag: deleteFlag,
  //     createdTime: createdTime,
  //   });
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   console.log(raw);
  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/lead/update`, requestOptions)
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
  //       setOpened(false);
  //       MySwal.fire({
  //         title: result.status,
  //         type: "success",
  //         text: result.message,
  //       }).then(() => {
  //         navigate(`/leads`);
  //       });
  //     })
  //     .catch((error) => {
  //       setOpened(false);
  //       MySwal.fire({
  //         title: error.status,
  //         type: "error",
  //         text: error.message,
  //       });
  //     });
  // };
  const handleChanges = (selectedOption) => {
    setCorp(selectedOption.value);
    console.log(`Option selected:`, selectedOption);
  };
  const handleConvertI = () => {
    handleOpen();
  };
  const handleConvertC = () => {
    handleOpen2();
  };
  const handleCorporate = () => {
    handleClose2();
    setOpened(true);
    const names = name;
    const dutyx = Number(duty2);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;
    const raw = JSON.stringify([
      {
        orgID: orgIDs,
        name: names,
        createdBy: dutyx,
        accountOwnerID: personalIDs,
        industry: industryx,
      },
    ]);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/corporate/add`, requestOptions)
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
        if (result.status === "SUCCESS") {
          const rawx = JSON.stringify({
            id: id,
            orgID: orgIDs,
            name: name,
            channel: others ? `Others: ${otherx}` : channel,
            channelUserID: channelID,
            converted: true,
            deleteFlag: deleteFlag,
            createdTime: createdTime,
          });
          const requestOptionsx = {
            method: "POST",
            headers: myHeaders,
            body: rawx,
            redirect: "follow",
          };
          console.log(rawx);
          fetch(`${process.env.REACT_APP_LOUGA_URL}/lead/update`, requestOptionsx)
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resultx) => {
              console.log(resultx);
              setOpened(false);
            });
        } else {
          setOpened(false);
        }
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          navigate(`/leads`);
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
  };
  const handleIndividual = () => {
    handleClose();
    setOpened(true);
    const names = name;
    const arr = names.split(" ");
    const fnamex = arr[0];
    const lnamex = arr[1];
    const onamex = arr[2];
    const dutyx = Number(duty);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const personalIDs = data11.personalID;
    const raw = JSON.stringify([
      {
        orgID: orgIDs,
        fname: fnamex,
        lname: lnamex || fnamex,
        oname: onamex,
        title: titlex,
        corporateID: corp,
        createdBy: dutyx,
        accountOwnerID: personalIDs,
      },
    ]);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/add`, requestOptions)
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
        if (result.status === "SUCCESS") {
          const rawx = JSON.stringify({
            id: id,
            orgID: orgIDs,
            name: name,
            channel: others ? `Others: ${otherx}` : channel,
            channelUserID: channelID,
            converted: true,
            deleteFlag: deleteFlag,
            createdTime: createdTime,
          });
          const requestOptionsx = {
            method: "POST",
            headers: myHeaders,
            body: rawx,
            redirect: "follow",
          };
          console.log(rawx);
          fetch(`${process.env.REACT_APP_LOUGA_URL}/lead/update`, requestOptionsx)
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resultx) => {
              console.log(resultx);
              setOpened(false);
            });
        } else {
          setOpened(false);
        }
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          navigate(`/leads`);
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
  };

  useEffect(() => {
    let isMounted = true;
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    fetch(`${process.env.REACT_APP_RAGA_URL}/leadsWorkflow/get/${orgIDs}`, { headers })
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
        if (isMounted) {
          if (Object.keys(result).length !== 0) {
            setLeadWorkflowID(result.id);
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Method to fetch all departments
  // env.environments
  const handleGets = () => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    const leadIDx = ids;
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    fetch(`${process.env.REACT_APP_RAGA_URL}/leadCheckpoint/gets/${orgIDs}`, { headers })
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
        if (result.length !== 0) {
          fetch(
            `${process.env.REACT_APP_RAGA_URL}/leadCheckpointHistory/gets/${orgIDs}/${leadIDx}`,
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
              // console.log(resultx);
              let checkPHCount = 0;
              const newCheckpointArray = [];
              if (result.length !== 0) {
                // eslint-disable-next-line array-callback-return
                result.map((checkP) => {
                  let checkedd = false;
                  let checkPHID = "";
                  // eslint-disable-next-line array-callback-return
                  resultx.map((checkPH) => {
                    if (checkP.id === checkPH.checkpointID) {
                      checkPHCount += 1;
                      checkedd = true;
                      checkPHID = checkPH.id;
                    }
                  });

                  const fdy = {
                    checked: checkedd,
                    createdTime: checkP.createdTime,
                    deleteFlag: checkP.deleteFlag,
                    descrip: checkP.descrip,
                    id: checkP.id,
                    name: checkP.name,
                    orgID: checkP.orgID,
                    leadCheckpointHistoryID: checkPHID,
                  };
                  newCheckpointArray.push(fdy);
                });

                setShowLists(true);
                setItems(newCheckpointArray);
                if (checkPHCount === result.length) {
                  setCheckPointHBool(true);
                } else {
                  setCheckPointHBool(false);
                }
                setOpened(false);
              }
            });
        }
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

  const handleAddCheckHis = (apix) => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    const leadIDx = ids;

    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    const checkPointIDx = apix.id;

    const raw = JSON.stringify({
      orgID: orgIDs,
      leadID: leadIDx,
      leadWorkflowID: leadWorkflowIDx,
      checkpointID: checkPointIDx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_RAGA_URL}/leadCheckpointHistory/add`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultrp) => {
        setOpened(false);
        if (resultrp.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultrp.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultrp.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        MySwal.fire({
          title: resultrp.status,
          type: "success",
          text: resultrp.message,
        }).then(() => {
          handleGets();
        });
      })
      .catch((error) => {
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  const handleRemoveCheckHis = (apix) => {
    setOpened(true);
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const id = urlParams.get("id");
    // const idVal = JSON.parse([id]);

    const checkPointHistoryIDx = apix.leadCheckpointHistoryID;

    const requestOptions = {
      method: "DELETE",
      headers: miHeaders,
    };

    fetch(
      `${process.env.REACT_APP_RAGA_URL}/leadCheckpointHistory/remove/${checkPointHistoryIDx}`,
      requestOptions
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultrp) => {
        setOpened(false);
        if (resultrp.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultrp.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultrp.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        MySwal.fire({
          title: resultrp.status,
          type: "success",
          text: resultrp.message,
        }).then(() => {
          handleGets();
        });
      })
      .catch((error) => {
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  const handleAddOrRemoveCPH = (e, apix) => {
    const checks = e.target.checked;
    // console.log(checks);
    if (checks) {
      handleAddCheckHis(apix);
    } else {
      handleRemoveCheckHis(apix);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Paper elevation={7}>
        <br />
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={4}
          mt={-2}
          p={1}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h5" fontWeight="medium" color="white">
            Leads View
          </MDTypography>
        </MDBox>
        <br />
        <br />
        <Container>
          <MDBox textAlign="center" fontSize="80%">
            <img className="opa" src={download} alt="ok" />
            <br />
            <div className="row">
              <div className="col-sm-6">
                <b>Full Name : </b> <br />
                <MDInput
                  type="text"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                  variant="standard"
                  className="name"
                  disabled
                />
              </div>
              {others ? (
                <div className="col-sm-6">
                  <b>Channel :</b> <br />
                  <MDInput
                    type="text"
                    value={otherx || ""}
                    onChange={(e) => setOtherx(e.target.value)}
                    //   fullWidth
                    variant="standard"
                    disabled
                  />
                  <br />
                </div>
              ) : (
                <div className="col-sm-6">
                  <b>Channel :</b> <br />
                  <MDInput
                    type="text"
                    value={channel || ""}
                    variant="standard"
                    //   className="stretch"
                    disabled
                  />
                  <br />
                  {hide ? null : (
                    <Box>
                      <FormControl sx={{ m: 1, minWidth: 287 }}>
                        <Sel
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={channel}
                          onChange={handleChange}
                          label=""
                          className="bold"
                          size="large"
                          disabled
                        >
                          <MenuItem value="Facebook">Facebook</MenuItem>
                          <MenuItem value="Youtube">YouTube</MenuItem>
                          <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                          <MenuItem value="Instagram">Instagram</MenuItem>
                          <MenuItem value="WeChat">WeChat</MenuItem>
                          <MenuItem value="TikTok">TikTok</MenuItem>
                          <MenuItem value="Telegram">Telegram</MenuItem>
                          <MenuItem value="SnapChat">SnapChat</MenuItem>
                          <MenuItem value="Twitter">Twitter</MenuItem>
                          <MenuItem value="Quora">Quora</MenuItem>
                          <MenuItem value="Reddit">Reddit</MenuItem>
                          <MenuItem value="Skype">Skype</MenuItem>
                          <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                          <MenuItem value="Others">Others</MenuItem>
                        </Sel>
                      </FormControl>
                    </Box>
                  )}
                </div>
              )}
            </div>
            <br />
            <br />
            <b>Channel I.D. :</b> <br />
            <MDInput
              type="text"
              value={channelID || ""}
              onChange={(e) => setChannelID(e.target.value)}
              placeholder="e.g space@gmail.com or usernames"
              variant="standard"
              className="stretch"
              disabled
            />
            <br />
            <MDBox pt={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  {
                    showLists && (
                      <MDBox>
                        &nbsp;
                        {/* <div
                  className="scrollbar scrollbar-primary mt-2 mx-auto"
                  style={scrollContainerStyle}
                > */}
                        <Container>
                          <div className="row">
                            {items.map((item) => (
                              <Grid item xs={12} md={12} lg={12} key={item.id}>
                                <Grid container spacing={1}>
                                  <Grid item xs={1} md={1} lg={1}>
                                    <div>
                                      <Checkbox
                                        checked={item.checked}
                                        onClick={(e) => handleAddOrRemoveCPH(e, item)}
                                      />
                                    </div>
                                    {/* <Form.Check.Input type="checkbox" /> */}
                                  </Grid>
                                  <Grid item xs={8} md={8} lg={8}>
                                    <Card>
                                      <CardContent>
                                        <MDTypography
                                          variant="h5"
                                          fontWeight="medium"
                                          fontSize="120%"
                                          color="info"
                                          textAlign="left"
                                          mt={1}
                                        >
                                          {item.name}
                                        </MDTypography>
                                        <MDTypography
                                          variant="h6"
                                          fontWeight="regular"
                                          fontSize="80%"
                                          color="info"
                                          textAlign="left"
                                          mt={1}
                                          mb={-3.5}
                                        >
                                          {item.descrip}
                                        </MDTypography>
                                      </CardContent>
                                      &nbsp;
                                    </Card>
                                    &nbsp;
                                  </Grid>
                                </Grid>
                              </Grid>
                            ))}
                          </div>
                        </Container>
                        {/* </div> */}
                      </MDBox>
                    )
                    // ) : (
                    //   <Card sx={{ height: "100%" }}>
                    //     {" "}
                    //     <MDTypography variant="h3" fontWeight="bold" color="text" textAlign="center" mt={1}>
                    //       No Checkpoint
                    //     </MDTypography>
                    //     {/* <Icon
                    //       fontSize="medium"
                    //       sx={{ fontSize: 100, alignSelf: "center" }}
                    //       color="disabled"
                    //     >
                    //       sentiment_dissatisfied
                    //     </Icon> */}
                    //   </Card>
                    // )}
                  }
                </Grid>
              </Grid>
            </MDBox>
            <br />
            <br />
            <br />
            {checkPointHBool && (
              <MDBox textAlign="center" mx={16}>
                <div className="row">
                  <div className="col-sm-6">
                    <ReactiveButton
                      size="large"
                      // outline
                      shadow
                      animation
                      width="200px"
                      rounded
                      color="teal"
                      onClick={handleConvertC}
                      idleText="Convert to Corporate Client"
                    />
                  </div>
                  <div className="col-sm-6">
                    <ReactiveButton
                      size="large"
                      // outline
                      shadow
                      animation
                      width="200px"
                      rounded
                      color="teal"
                      onClick={handleConvertI}
                      idleText="Convert to Individual Client"
                    />
                  </div>
                </div>
              </MDBox>
            )}
          </MDBox>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open2}
            onClose={handleClose2}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open2}>
              <MDBox sx={style}>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="50px"
                  coloredShadow="info"
                  mx={4}
                  mt={-2}
                  p={1}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h5" fontWeight="medium" color="white">
                    Convert This Lead To A Corporate Client
                  </MDTypography>
                </MDBox>
                <MDTypography id="transition-modal-description" sx={{ mt: 2 }}>
                  <MDBox mt={2}>
                    <MDBox textAlign="center">
                      <br />
                      <FormControl sx={{ m: 1, minWidth: 287 }}>
                        <InputLabel id="demo-simple-select-label" className="rest">
                          <b>Industry</b>
                        </InputLabel>
                        <Sel
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Industry"
                          className="long"
                          size="large"
                          value={industryx}
                          onChange={(e) => setIndustryx(e.target.value)}
                        >
                          <MenuItem value="Agriculture">Agriculture</MenuItem>
                          <MenuItem value="Chemical Industry">Chemical Industry</MenuItem>
                          <MenuItem value="Commerce">Commerce</MenuItem>
                          <MenuItem value="Construction">Construction</MenuItem>
                          <MenuItem value="Education">Education</MenuItem>
                          <MenuItem value="Financial Services">Financial Services</MenuItem>
                          <MenuItem value="Fisheries">Fisheries</MenuItem>
                          <MenuItem value="Food">Food</MenuItem>
                          <MenuItem value="Forestry">Forestry</MenuItem>
                          <MenuItem value="Health Services">Health Services</MenuItem>
                          <MenuItem value="Hotels">Hotels</MenuItem>
                          <MenuItem value="Metal Production">Metal Production</MenuItem>
                          <MenuItem value="Mining">Mining</MenuItem>
                          <MenuItem value="Mechanical and Electricitical Engineering">
                            Mechanical and Electrical Engineering
                          </MenuItem>
                          <MenuItem value="Media - Culture">Media - Culture</MenuItem>
                          <MenuItem value="Oil and Gas production">Oil and Gas production</MenuItem>
                          <MenuItem value="Postals and Telecommunication">
                            Postals and Telecommunication
                          </MenuItem>
                          <MenuItem value="Public Service">Public Service</MenuItem>
                          <MenuItem value="Shipping and Ports">Shipping and Ports</MenuItem>
                          <MenuItem value="Textiles"> Textiles, Clothing, Leather </MenuItem>
                          <MenuItem value="Transport: road, railways">
                            Transport (road, railways)
                          </MenuItem>
                          <MenuItem value="Transport Equipment Manufacturing">
                            Transport Equipment Manufacturing
                          </MenuItem>
                          <MenuItem value="utilities: water, gas, electricity">
                            Utilities:Water, Gas, Electricity
                          </MenuItem>
                          <MenuItem value="others">Others...</MenuItem>
                        </Sel>
                      </FormControl>
                      <FormControl sx={{ m: 1, minWidth: 287 }}>
                        <InputLabel id="demo-simple-select-label" className="rest">
                          <b>Account Owner</b>
                        </InputLabel>
                        <Sel
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={duty2}
                          onChange={(e) => setDutyRelieverx2(e.target.value)}
                          label="Account Owner"
                          className="long"
                          size="large"
                        >
                          {user.map((api) => (
                            <MenuItem key={api.personal.id} value={api.personal.id}>
                              {api.personal.fname} {api.personal.lname}
                            </MenuItem>
                          ))}
                        </Sel>
                      </FormControl>
                      <br />
                      <MDBox textAlign="center">
                        <br />
                        <br />
                        <div className="row">
                          <div className="col-sm-6">
                            <ReactiveButton
                              size="large"
                              outline
                              shadow
                              animation
                              width="200px"
                              rounded
                              color="green"
                              onClick={handleCorporate}
                              idleText="Convert"
                            />
                          </div>
                          <div className="col-sm-6">
                            <ReactiveButton
                              size="large"
                              outline
                              shadow
                              animation
                              width="200px"
                              rounded
                              color="red"
                              onClick={handleClose2}
                              idleText="Cancel"
                            />
                          </div>
                        </div>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </MDTypography>
              </MDBox>
            </Fade>
          </Modal>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <MDBox sx={style}>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="50px"
                  coloredShadow="info"
                  mx={4}
                  mt={-2}
                  p={1}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h5" fontWeight="medium" color="white">
                    Convert This Lead To An Individual Client
                  </MDTypography>
                </MDBox>
                <MDTypography id="transition-modal-description" sx={{ mt: 2 }}>
                  <MDBox mt={2}>
                    <MDBox textAlign="center">
                      <br />
                      <FormControl sx={{ m: 1, minWidth: 287 }}>
                        <InputLabel id="demo-simple-select-label" className="rest">
                          <b>Account Owner</b>
                        </InputLabel>
                        <Sel
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={duty}
                          onChange={(e) => setDutyRelieverx(e.target.value)}
                          label="Account Owner"
                          className="long"
                          size="large"
                        >
                          {user.map((api) => (
                            <MenuItem key={api.personal.id} value={api.personal.id}>
                              {api.personal.fname} {api.personal.lname}
                            </MenuItem>
                          ))}
                        </Sel>
                      </FormControl>
                      <br />
                      <MDBox textAlign="center">
                        <br />
                        <FormControl sx={{ m: 1, minWidth: 287 }}>
                          <InputLabel id="demo-simple-select-label" className="rest">
                            <b>Title</b>
                          </InputLabel>
                          <Sel
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={titlex}
                            onChange={(e) => setTitlex(e.target.value)}
                            label="Title"
                            className="long"
                            size="large"
                          >
                            <MenuItem value="Bishop">Bishop</MenuItem>
                            <MenuItem value="Chancellor">Chancellor</MenuItem>
                            <MenuItem value="Comrade">Comrade</MenuItem>
                            <MenuItem value="Doctor">Doctor</MenuItem>
                            <MenuItem value="Engineer">Engineer</MenuItem>
                            <MenuItem value="Excellency">Excellency</MenuItem>
                            <MenuItem value="Honorable">Honorable</MenuItem>
                            <MenuItem value="Imam">Imam</MenuItem>
                            <MenuItem value="Master">Master</MenuItem>
                            <MenuItem value="Miss">Miss</MenuItem>
                            <MenuItem value="Mr">Mr</MenuItem>
                            <MenuItem value="Mrs">Mrs</MenuItem>
                            <MenuItem value="Reverend">Reverend</MenuItem>
                            <MenuItem value="Pastor">Pastor</MenuItem>
                            <MenuItem value="Professor">Professor</MenuItem>
                            <MenuItem value="Pope">Pope</MenuItem>
                            <MenuItem value="Vice-Chancellor">Vice-Chancellor</MenuItem>
                            <MenuItem value="Other">Others...</MenuItem>
                          </Sel>
                        </FormControl>
                        <br />
                        <br />
                        <MDTypography
                          variant="h5"
                          fontWeight="regular"
                          fontSize="80%"
                          textAlign="center"
                          color="text"
                        >
                          <b> Corporate Name </b>
                        </MDTypography>
                        <MDBox textAlign="center" mx={15}>
                          <Sele
                            styles={customStyles}
                            options={options}
                            onChange={handleChanges}
                            height="5px"
                            className="longSel"
                          />
                        </MDBox>
                        <br />
                        <br />
                        <br />
                        <div className="row">
                          <div className="col-sm-6">
                            <ReactiveButton
                              size="large"
                              outline
                              shadow
                              animation
                              width="200px"
                              rounded
                              color="green"
                              onClick={handleIndividual}
                              idleText="Convert"
                            />
                          </div>
                          <div className="col-sm-6">
                            <ReactiveButton
                              size="large"
                              outline
                              shadow
                              animation
                              width="200px"
                              rounded
                              color="red"
                              onClick={handleClose}
                              idleText="Cancel"
                            />
                          </div>
                        </div>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </MDTypography>
              </MDBox>
            </Fade>
          </Modal>
        </Container>
        <br />
        <br />
      </Paper>
      <br />
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}
