/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";

import React, { useState, useEffect, useCallback } from "react";
// import { Row } from "react-bootstrap";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Checkbox from "@mui/material/Checkbox";
// import AccordionDetails from "@mui/material/AccordionDetails";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

import { Icon } from "@mui/material";
import { Dropdown } from "react-bootstrap";
import CalendarData from "./data";

const locales = {
  // eslint-disable-next-line global-require
  "en-US": require("date-fns/locale/en-US"),
};
const localizers = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function MyCalendar() {
  // eslint-disable-next-line prefer-const
  const { columns: pColumns, rows: pRows } = CalendarData();
  const [allEvents, setAllEvents] = useState([]);
  const eventPropGetter = useCallback(
    (event) => ({
      ...(event.title.search("ㅤ") > 0 && {
        style: {
          backgroundColor: "#d98cd9",
          color: "white",
        },
      }),
    }),
    []
  );
  const [opened, setOpened] = useState(false);
  const d = new Date(new Date().getFullYear(), 0, 1);
  const s = new Date(new Date().getFullYear(), 12, 1);
  const strt = d.getTime();
  const end = s.getTime();
  const navigate = useNavigate();
  const { allGHeaders: miHeaders } = GHeaders();
  useEffect(() => {
    const eventList = [];
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const perso = data11.personalID;
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_RAGA_URL}/appointment/getMyCalendar/${orgIDs}/${perso}?startTime=${strt}&endTime=${end}`,
      { headers }
    )
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
        if (isMounted) {
          // eslint-disable-next-line array-callback-return
          result.map((item) => {
            if (item.purpose === "APPOINTMENT") {
              const fdy = {
                title: `${item.title}ㅤ`,
                time: new Date(item.startTime),
                end: new Date(item.endTime),
              };
              eventList.push(fdy);
            } else {
              const fdy = {
                title: `${item.title}   `,
                time: new Date(item.startTime),
                end: new Date(item.endTime),
              };
              eventList.push(fdy);
            }
          });
          setAllEvents(eventList);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <Card>
        <MDBox
          variant="gradient"
<<<<<<< HEAD
          style={{ backgroundColor: "#f96d02" }}
=======
          bgColor="warning"
>>>>>>> f574790b6b1013db910ba12185b307f6b7ba39da
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            My Calendar
          </MDTypography>
        </MDBox>
        <div style={{ textAlign: "right" }}>
          <Dropdown size="sm">
            <Dropdown.Toggle variant="transparent" id="dropdown-basic">
              <Icon fontSize="small">settings</Icon>&nbsp;&nbsp;&nbsp;&nbsp;
            </Dropdown.Toggle>
            &nbsp;&nbsp;
            <Dropdown.Menu>
              <Dropdown.Item
                style={{ fontSize: "13px" }}
                onClick={() => navigate("/Calendar-Accessors")}
              >
                Who Can See My Calendar?
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <br />
        <MDBox textAlign="center" fontSize="66%" mt={-3}>
          Appointments:&nbsp;
          <b
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "6px",
              background: "#d98cd9",
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </b>
          , Interviews:&nbsp;
          <b
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "6px",
              background: "#1a75ff",
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </b>
        </MDBox>
        <Calendar
          localizer={localizers}
          eventPropGetter={eventPropGetter}
          events={allEvents}
          startAccessor="time"
          endAccessor="end"
          style={{ height: 700, margin: "50px", fontSize: "13px" }}
        />
      </Card>
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

export default MyCalendar;
