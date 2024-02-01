/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
import React, { useState, useEffect } from "react";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Paper from "@mui/material/Paper";
import Accordion from "react-bootstrap/Accordion";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import ReactiveButton from "reactive-button";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Icon } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DataTable from "examples/Tables/DataTable";
import withReactContent from "sweetalert2-react-content";
// eslint-disable-next-line no-unused-vars
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import LeadTable from "./data";
// import TextField from "@mui/material/TextField";

import twitter from "./twitter.jpg";
import "./Css.css";

export default function Leads() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = LeadTable();

  const navigate = useNavigate();
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const hide = true;
  const [token, setToken] = useState("");
  // const [red, setRed] = useState(true);
  const [warns, setWarns] = useState("");
  const [channel, setChannel] = useState("");
  const [otherx, setOtherx] = useState("");

  const [usernamex, setUsername] = useState("");
  const [passwordx, setPassword] = useState("");
  // const [passwordShown, setPasswordShown] = useState(false);
  // const togglePassword = () => {
  //   // When the handler is invoked
  //   // inverse the boolean state of passwordShown
  //   setPasswordShown(!passwordShown);
  // };

  const [others, setOthers] = useState(false);
  const [name, setName] = useState("");
  const [names, setNames] = useState(false);
  const [field, setField] = useState(false);
  const [channelID, setChannelID] = useState("");
  const [keywordx, setKeywordx] = useState("");
  const [newword, setNewword] = useState([]);
  // const array3 = newword.concat(newwordMent);
  //   const MenuItems = {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //       "X-RapidAPI-Key": "f317e9dfd0msh67d3b1976594e44p165dfcjsn3ce3633d20a3",
  //       "X-RapidAPI-Host": "twitter154.p.rapidapi.com",
  //     },
  //     body: '{"query":"careful","limit":20,"section":"top","language":"en","min_likes":20,"min_retweets":20,"start_date":"2022-01-01"}',
  //   };

  //   fetch("https://twitter154.p.rapidapi.com/search/search", MenuItems)
  //     .then((response) => response.json())
  //     .then((response) => console.log(response))
  //     .catch((err) => console.error(err));
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgID = data11.orgID;
    let isMounted = true;
    setOpened(true);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/leadsSettings/gets/${orgID}`, {
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
        if (isMounted) {
          // eslint-disable-next-line eqeqeq
          if (result.length != 0) {
            console.log(result.twitterAccounts);
            if (result.twitterAccounts !== undefined) {
              // console.log(result.);
              setNewword(result.twitterAccounts);
            }
            if (result.emailAccounts !== undefined && result.emailAccounts.length > 1) {
              console.log(result.emailAccounts);
              setUsername(result.emailAccounts[0]);
              setPassword(result.emailAccounts[1]);
            }
            setToken(result.bearerToken);
            setOpened(false);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const handleKeyword = () => {
    if (keywordx === "" || keywordx === " " || newword.length > 1) {
      // eslint-disable-next-line no-unused-expressions
      null;
    } else {
      setNewword([...newword, keywordx]);
      setKeywordx("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newword.length < 2) {
      handleKeyword();
      setKeywordx("");
    }
  };
  const handleDelete = () => {
    const All = newword;
    All.pop();
    setNewword(All);
    setOpened(true);
    setTimeout(() => {
      setOpened(false);
    }, 1);
  };
  const handleChange = (event) => {
    setChannel(event.target.value);
    if (event.target.value === "Others") {
      setOthers(true);
      setField(true);
    } else {
      setOthers(false);
      setField(false);
      setOtherx("");
    }
  };
  const setOth = (e) => {
    setOtherx(e.target.value);
    if (e.target.value === "") {
      setField(true);
    } else {
      setField(false);
    }
  };
  const handleClick = () => {
    if (others && otherx.length > 0 && names === false) {
      setField(false);
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgID = data11.orgID;
      const raw = JSON.stringify({
        orgID: orgID,
        name: name,
        channel: others ? `Others: ${otherx}` : channel,
        channelUserID: channelID,
        // converted: false,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      console.log(raw);
      if (name !== "") {
        fetch(`${process.env.REACT_APP_LOUGA_URL}/lead/add`, requestOptions)
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
              if (result.status === "EMPTY_TEXTFIELD") {
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
    } else if (names === false && field === false) {
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgID = data11.orgID;
      const raw = JSON.stringify({
        orgID: orgID,
        name: name,
        channel: others ? `Others: ${otherx}` : channel,
        channelUserID: channelID,
        // converted: false,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      console.log(raw);
      if (name !== "") {
        fetch(`${process.env.REACT_APP_LOUGA_URL}/lead/add`, requestOptions)
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
              if (result.status === "EMPTY_TEXTFIELD") {
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
  };
  // const checker = () => {
  //   if (usernamex.length > 0 && passwordx.length < 1) {
  //     setRed(true);
  //     setWarns("password is required");
  //     return false;
  //   }
  //   if (usernamex.length === 0 && passwordx.length > 0) {
  //     setRed(true);
  //     setWarns("username is required");
  //     return false;
  //   }
  // };
  const handleUpdate = () => {
    if (usernamex.length > 0 && passwordx.length < 1) {
      setWarns("password is required");
    } else if (usernamex.length === 0 && passwordx.length > 0) {
      setWarns("username is required");
    } else {
      const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
      if (!usernamex.match(letters) && usernamex.length > 0 && passwordx.length > 0) {
        setWarns("input a valid email");
      } else {
        setWarns("");
        MySwal.fire({
          title: "Are you sure?",
          text: "Confirm To Save Leads Settings",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f96d02",
          cancelButtonColor: "#d33",
          confirmButtonText: "Save",
        }).then((resultx) => {
          if (resultx.isConfirmed === true) {
            const data11 = JSON.parse(localStorage.getItem("user1"));
            const orgID = data11.orgID;
            const raw = JSON.stringify({
              orgID: orgID,
              twitterAccounts: newword,
              emailAccounts: passwordx.length > 0 ? [usernamex, passwordx] : [],
              bearerToken: token,
            });
            const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };
            console.log(raw);
            fetch(`${process.env.REACT_APP_LOUGA_URL}/leadsSettings/save`, requestOptions)
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
                  if (result.status === "EMPTY_TEXTFIELD") {
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
        });
      }
    }
  };
  const Namer = (e) => {
    setName(e);
    if (name.indexOf(" ") === -1) {
      setNames(true);
    } else {
      setNames(false);
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Paper elevation={3}>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <h4 className="center">Add Lead Manually</h4>
            </Accordion.Header>
            <Accordion.Body>
              <Container>
                <MDBox textAlign="center" fontSize="80%">
                  <div className="col-sm-10">
                    <b>Full Name :</b>{" "}
                    <MDInput
                      type="text"
                      value={name || ""}
                      onChange={(e) => Namer(e.target.value)}
                      variant="standard"
                      className="stretch"
                    />
                    <br />
                    {names && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        Must contain at least first name and last name separated with spaces.
                      </p>
                    )}
                    <br />
                    <Box>
                      <FormControl sx={{ m: 1, minWidth: 287 }}>
                        <InputLabel id="demo-simple-select-label" className="rest">
                          <b>Channel</b>
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={channel}
                          onChange={handleChange}
                          label="channel"
                          className="long"
                          size="large"
                        >
                          <MenuItem value="Facebook">Facebook</MenuItem>
                          <MenuItem value="Email">Email</MenuItem>
                          <MenuItem value="Instagram">Instagram</MenuItem>
                          <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                          <MenuItem value="Quora">Quora</MenuItem>
                          <MenuItem value="Reddit">Reddit</MenuItem>
                          <MenuItem value="Skype">Skype</MenuItem>
                          <MenuItem value="SnapChat">SnapChat</MenuItem>
                          <MenuItem value="Telegram">Telegram</MenuItem>
                          <MenuItem value="TikTok">TikTok</MenuItem>
                          <MenuItem value="Twitter">Twitter</MenuItem>
                          <MenuItem value="WeChat">WeChat</MenuItem>
                          <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                          <MenuItem value="Youtube">YouTube</MenuItem>
                          <MenuItem value="Others">Others</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    {others ? (
                      <div>
                        <br />
                        <MDInput
                          type="text"
                          value={otherx || ""}
                          onChange={(e) => setOth(e)}
                          label="Other Channel"
                          //   fullWidth
                          className="short"
                        />
                        {field && <p style={{ color: "red", fontSize: "12px" }}>field required</p>}
                        <br />
                      </div>
                    ) : null}
                    <br />
                    <b>Channel I.D. :</b>{" "}
                    <MDInput
                      type="text"
                      value={channelID || ""}
                      onChange={(e) => setChannelID(e.target.value)}
                      placeholder="e.g space@gmail.com or usernames"
                      variant="standard"
                      className="stretch"
                    />
                    <br />
                    <br />
                    <ReactiveButton
                      size="large"
                      outline
                      shadow
                      animation
                      width="200px"
                      rounded
                      color="teal"
                      onClick={handleClick}
                      idleText="Create Lead"
                    />
                  </div>
                </MDBox>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <h4 className="center">Leads Settings</h4>
            </Accordion.Header>
            <Accordion.Body>
              <MDBox textAlign="center" fontSize="80%">
                {/* Leads from Twitter
                    <hr /> */}
                <MDTypography
                  variant="h6"
                  fontWeight="regular"
                  // fontSize="80%"
                  textAlign="center"
                  color="text"
                  p={2}
                >
                  Twitter #hashtags and @mentions To Listen To
                </MDTypography>
                {newword.map((item) => (
                  <React.Fragment key={item}>
                    <Chip size="small" label={item} color="success" variant="outlined" />
                    &nbsp;
                  </React.Fragment>
                ))}
                <br /> <br />
                {/* Twitter Keywords To Listen To :{" "} */}
                <div className="row">
                  <MDBox mx={-48}>
                    <img
                      className="img"
                      src={twitter}
                      alt="twitterlogo"
                      style={{ width: "44px", height: "40px" }}
                    />
                  </MDBox>
                  <div className="col-sm-6">
                    <MDBox mx={-2} mt={2}>
                      <MDBox mb={2}>
                        <MDInput
                          placeholder="e.g #space, @space"
                          type="text"
                          size="small"
                          className="shortest"
                          value={keywordx}
                          onChange={(e) => setKeywordx(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e)}
                          disabled={newword.length > 1}
                        />
                        &nbsp;
                        <ReactiveButton
                          size="small"
                          animation
                          width="50px"
                          rounded
                          color="green"
                          onClick={handleKeyword}
                          idleText="Add"
                        />
                        &nbsp;
                        <ReactiveButton
                          size="small"
                          animation
                          width="50px"
                          rounded
                          color="red"
                          onClick={handleDelete}
                          idleText="Remove"
                        />
                        <br />
                        <br />
                        {!hide && (
                          <>
                            <br />
                            <b>Bearer Token : </b>{" "}
                            <MDInput
                              type="text"
                              value={token || ""}
                              onChange={(e) => setToken(e.target.value)}
                              placeholder="generated from developer twitter"
                              variant="standard"
                              className="stretch"
                            />
                          </>
                        )}
                      </MDBox>
                    </MDBox>
                  </div>
                </div>
                <br />
                <hr />
                <MDTypography
                  variant="h6"
                  fontWeight="regular"
                  // fontSize="80%"
                  textAlign="center"
                  color="text"
                  p={2}
                >
                  Organization&apos;s email account to get leads from
                </MDTypography>
                <br /> <br />
                <div className="row">
                  <MDBox mx={-48}>
                    <Icon fontSize="large">email</Icon>
                  </MDBox>
                  <div className="col-sm-6">
                    <MDBox mx={-2} mt={-2}>
                      <MDBox mb={2}>
                        <Container>
                          <div className="row">
                            <div className="col-sm-12">
                              <MDInput
                                type="email"
                                value={usernamex || ""}
                                onChange={(e) => setUsername(e.target.value)}
                                label="Email"
                                size="small"
                                fullWidth
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
                                // type={passwordShown ? "text" : "password"}
                                value={passwordx || ""}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={(ev) => ev.key === "Enter" && handleClick()}
                                label="Password"
                                size="small"
                                fullWidth
                              />
                            </div>
                            {/* <MDTypography
                              variant="button"
                              fontSize="70%"
                              align="right"
                              // onClick={togglePassword}
                              mx={0}
                              color="info"
                            >
                              show password
                            </MDTypography> */}
                          </div>
                        </Container>
                      </MDBox>
                      <p style={{ color: "red", fontSize: "11px" }}>{warns}</p>
                    </MDBox>
                  </div>
                </div>
                <br />
                <ReactiveButton
                  size="large"
                  shadow
                  animation
                  width="100px"
                  rounded
                  color="dark"
                  onClick={handleUpdate}
                  idleText="Save"
                />
                <br />
              </MDBox>
              <br />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Paper>
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
