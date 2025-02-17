/* eslint-disable react/prop-types */
/* eslint-disable no-else-return */
/* eslint-disable no-var */
/* eslint-disable one-var */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import ReactiveButton from "reactive-button";
import Icon from "@mui/material/Icon";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DataTable from "examples/Tables/DataTable";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import { Call, PhoneCallback, PhoneMissed, Today } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Add from "@mui/icons-material/Add";
import MDTypography from "../../components/MDTypography/index";

export default function VideoChat() {
  const data11 = JSON.parse(localStorage.getItem("user1"));
  const navigate = useNavigate();
  const pid = data11.personalID;
  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState([]);
  const { allGHeaders: miHeaders } = GHeaders();
  const { orgID } = data11;
  useEffect(() => {
    const headers = miHeaders;
    const orgIDs = data11.orgID;
    const empID = data11.personalID;
    console.log(empID);
    let isMounted = true;
    setOpened(true);
    fetch(`${process.env.REACT_APP_RAGA_URL}/callHistory/gets/${orgIDs}/${empID}`, {
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
          console.log(result);
          setItems(result);
          setOpened(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const changeDateandTime = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    let hour = "0";
    let minutes = "0";
    let seconds = "0";

    if (date.getHours() < 10) {
      hour += date.getHours();
    } else {
      hour = date.getHours();
    }

    if (date.getMinutes() < 10) {
      minutes += date.getMinutes();
    } else {
      minutes = date.getMinutes();
    }

    if (date.getSeconds() < 10) {
      seconds += date.getSeconds();
    } else {
      seconds = date.getSeconds();
    }
    return `${retDate} ${hour}:${minutes}:${seconds}`;
  };
  // eslint-disable-next-line consistent-return
  function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      if (Math.round(elapsed / msPerHour) === 1) {
        return Math.round(elapsed / msPerMinute) + " minute ago";
      } else {
        return Math.round(elapsed / msPerMinute) + " minutes ago";
      }
    } else if (elapsed < msPerDay) {
      if (Math.round(elapsed / msPerHour) === 1) {
        return Math.round(elapsed / msPerHour) + " hour ago";
      } else {
        return Math.round(elapsed / msPerHour) + " hours ago";
      }
    } else if (elapsed < msPerMonth) {
      if (Math.round(elapsed / msPerDay) === 1) {
        return Math.round(elapsed / msPerDay) + " day ago";
      } else {
        return Math.round(elapsed / msPerDay) + " days ago";
      }
    } else if (elapsed < msPerYear) {
      if (Math.round(elapsed / msPerMonth) === 1) {
        return Math.round(elapsed / msPerMonth) + " month ago";
      } else {
        return Math.round(elapsed / msPerMonth) + " months ago";
      }
    } else if (Math.round(elapsed / msPerYear) === 1) {
      return Math.round(elapsed / msPerYear) + " year ago";
    } else {
      return Math.round(elapsed / msPerYear) + " years ago";
    }
  }

  // const currentTimeStamp = new Date().getTime();

  // console.log(timeSince(currentTimeStamp));
  const handleIcon = (value) => {
    if (Number(value) === 0) {
      return (
        <IconButton size="">
          <Call sx={{ fontSize: "200px", color: "green" }} />
        </IconButton>
      );
    }
    if (Number(value) === 1) {
      return (
        <IconButton size="">
          <PhoneCallback sx={{ fontSize: "200px", color: "green" }} />
        </IconButton>
      );
    }
    return (
      <IconButton size="">
        <PhoneMissed sx={{ fontSize: "200px", color: "red" }} />
      </IconButton>
    );
  };
  // window.location = `https://cairo-videochat.netlify.app/index.html?pid=${pid}&orgID=${orgID}`;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <MDBox
        textAlign="center"
        style={{
          // paddingTop: "5vh",
          paddingBottom: "5vh",
          // marginBottom:  "5v"
          marginRight: "auto",
          marginLeft: "auto",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Card style={{ width: "80vw" }}>
          <div className="row">
            <div className="col-sm-6">
              <Today sx={{ height: 200, width: 200, color: "#f96d02", opacity: 0.7 }} /> <br />
              <ReactiveButton
                size="large"
                shadow
                animation
                outline
                width="200px"
                onClick={() => navigate("/appointments")}
                rounded
                color="yellow"
                idleText="Schedule A Call"
              />
            </div>
            <div
              className="col-sm-6"
              // style={{ justifyContent: "center", display: "flex", alignItems: "center" }}
            >
              {/* <p style={{ marginTop: "2vh" }}>
                <br />
              </p> */}
              <Call sx={{ height: 200, width: 200, color: "#f96d02", opacity: 0.7 }} /> <br />
              <a
                href={`https://cairo-videochat.netlify.app/index.html?pid=${pid}&orgID=${orgID}`}
                target="_blank"
                rel="noreferrer"
              >
                <ReactiveButton
                  size="large"
                  outline
                  shadow
                  animation
                  width="200px"
                  rounded
                  color="yellow"
                  idleText="Call Now (instant)"
                />
              </a>
            </div>
          </div>
          <br />
        </Card>
      </MDBox>
      <br />
      <MDBox
        variant="gradient"
        // bgColor="info"
        borderRadius="lg"
        style={{ backgroundColor: "#f96d02", boxShadow: "0px 0px 10px 0px #f96d02" }}
        mx={6}
        p={1}
        coloredShadow="warning"
        mb={2}
        textAlign="center"
        shadow="10px"
      >
        <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
          History
        </MDTypography>
      </MDBox>
      <MDBox m={5}>
        <DataTable
          table={{
            columns: [
              // { Header: "Source", accessor: "source", align: "left" },
              // { Header: "Total Amount", accessor: "totalAmount", align: "left" },
              // { Header: "other members", accessor: "secondPartyName", align: "left" },
              {
                accessor: "status",
                // eslint-disable-next-line react/prop-types, no-unused-vars
                Cell: ({ cell: { value } }) => handleIcon(value),
                align: "left",
                width: 5,
              },
              {
                Header: "call link",
                accessor: "callLink",
                // eslint-disable-next-line jsx-a11y/anchor-has-content, react/prop-types
                Cell: ({ cell: { value } }) => (
                  <div>
                    <a href={value}>{value.slice(0, 70)} . . .</a>
                  </div>
                ),

                align: "left",
              },
              {
                Header: "time",
                accessor: "createdTime",
                Cell: ({ cell: { value } }) => timeDifference(new Date().getTime(), value),
                align: "left",
              },
            ],
            rows: items,
          }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
      <Footer />
    </DashboardLayout>
  );
}
