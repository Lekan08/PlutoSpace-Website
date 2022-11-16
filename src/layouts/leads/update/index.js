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
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// eslint-disable-next-line no-unused-vars
import { Container, Form, Row, Col, Button } from "react-bootstrap";
// eslint-disable-next-line import/no-unresolved
import "../Css.css";

export default function UpdateLeads() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [channel, setChannel] = useState("");
  const [channelID, setChannelID] = useState("");
  const [converted, setConverted] = useState(false);
  const [createdTime, setCreatedTime] = useState(0);
  const [deleteFlag, setDeleteFlag] = useState(0);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [field, setField] = useState(false);
  const [names, setNames] = useState(false);
  const [opened, setOpened] = useState(false);
  const [otherx, setOtherx] = useState("");
  const [others, setOthers] = useState(false);
  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const ids = data11.id;
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
            setConverted(result[0].converted);
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
                if (veri.length < 1) {
                  setField(true);
                }
                setOtherx(veri);
              } else setChannel(result[0].channel);
              setOpened(false);
            } else setChannel(result[0].channel);
            setOpened(false);
          }
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
      console.log("others and something");
      setField(false);
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgID = data11.orgID;
      const raw = JSON.stringify({
        id: id,
        orgID: orgID,
        name: name,
        channel: others ? `Others: ${otherx}` : channel,
        channelUserID: channelID,
        converted: converted,
        deleteFlag: deleteFlag,
        createdTime: createdTime,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      console.log(raw);
      fetch(`${process.env.REACT_APP_LOUGA_URL}/lead/update`, requestOptions)
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
    } else if (names === false && field === false) {
      console.log("others and something");
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgID = data11.orgID;
      const raw = JSON.stringify({
        id: id,
        orgID: orgID,
        name: name,
        channel: others ? `Others: ${otherx}` : channel,
        channelUserID: channelID,
        converted: converted,
        deleteFlag: deleteFlag,
        createdTime: createdTime,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      console.log(raw);
      fetch(`${process.env.REACT_APP_LOUGA_URL}/lead/update`, requestOptions)
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
      <Paper elevation={7}>
        <br />
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={2}
          p={2}
          mb={3}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Update Lead
          </MDTypography>
        </MDBox>
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
                idleText="Update Lead"
              />
            </div>
            <br />
          </MDBox>
        </Container>
      </Paper>
      <br />
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}
