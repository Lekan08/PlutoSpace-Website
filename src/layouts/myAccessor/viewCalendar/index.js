import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

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

function ViewCalendar() {
  // eslint-disable-next-line prefer-const
  const [allEvents, setAllEvents] = useState([]);
  const [name, setName] = useState("");
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
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    const namex = urlParams.get("name");
    setName(namex);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_RAGA_URL}/appointment/getMyCalendar/${orgIDs}/${ids}?startTime=${strt}&endTime=${end}`,
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
            {name}&apos;s Calendar
          </MDTypography>
        </MDBox>
        <br />
        <MDBox textAlign="center" fontSize="66%">
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
          events={allEvents}
          eventPropGetter={eventPropGetter}
          startAccessor="time"
          endAccessor="end"
          style={{ height: 700, margin: "50px", fontSize: "13px" }}
        />
      </Card>
      <br />
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default ViewCalendar;
