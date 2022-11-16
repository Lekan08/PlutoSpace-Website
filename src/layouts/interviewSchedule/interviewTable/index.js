// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
// import TimeZZones from "layouts/interviewSchedule/timeZones/index.json";
// import CircularProgress from "@mui/material/CircularProgress";

export default function InterviewTable() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();
  // Method to handle update
  // const handleUpdate = (value) => {
  //   console.log(items.startTime);
  //   const startTimexx = new Date(items.startTime).getTime();
  //   const endTimexx = new Date(items.endTime).getTime();
  //   const reminderxx = new Date(items.reminderTime).getTime();

  //   const raw = JSON.stringify({
  //     id: value,
  //     orgID: items.ordID,
  //     createdBy: items.createdBy,
  //     createdTime: items.createdTime,
  //     title: items.title,
  //     description: items.description,
  //     purpose: items.purpose,
  //     startTime: startTimexx,
  //     endTime: endTimexx,
  //     reminderTime: reminderxx,
  //     timezone: items.timezone,
  //     deleteFlag: items.deleteFlag,
  //   });
  //   console.log(raw);
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(`${process.env.REACT_APP_RAGA_URL}/appointment/update`, requestOptions)
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

  // Method to filter departments

  // Method to handle diable
  const handleDisable = (value) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(`${process.env.REACT_APP_RAGA_URL}/appointment/cancel/${value}`, requestOptions)
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

  // Method to change date from timestamp

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

  // Method to fetch all departments
  // env.environments
  useEffect(() => {
    const stDate = new Date(new Date().getFullYear(), 0, 1);
    const enDate = new Date(new Date().getFullYear(), 12, 1);
    const starDate = stDate.getTime();
    const endDate = enDate.getTime();

    const eventList = [];
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const myID = data11.personalID;
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_RAGA_URL}/appointment/getMyCalendar/${orgIDs}/${myID}?startTime=${starDate}&endTime=${endDate}`,
      { headers }
    )
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
          const interViewOnly = [];
          // eslint-disable-next-line array-callback-return
          result.map((item) => {
            if (item.purpose === "INTERVIEW") {
              interViewOnly.push(item);
            }
          });

          // eslint-disable-next-line array-callback-return
          interViewOnly.map((interviewws) => {
            const settingCalendar = {
              title: interviewws.title,
              time: new Date(interviewws.startTime),
              end: new Date(interviewws.endTime),
              id: interviewws.id,
              createdBy: interviewws.createdBy,
              createdTime: interviewws.createdTime,
              deleteFlag: interviewws.deleteFlag,
              description: interviewws.description,
              orgID: interviewws.orgID,
              purpose: interviewws.purpose,
              reminderTime: interviewws.reminderTime,
              timezone: interviewws.timezone,
            };
            eventList.push(settingCalendar);
          });
          console.log(eventList);
          setItems(eventList);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  //   const handleCondition = (value) => {
  //     navigate(`/stage/Stage-Condition?id=${value}`);
  //   };
  // Return table
  return {
    columns: [
      { Header: "Titles", accessor: "title", align: "left" },

      {
        Header: "Start Time",
        accessor: "time",
        Cell: ({ cell: { value } }) => changeDateandTime(value),
        align: "left",
      },
      {
        Header: "End Time",
        accessor: "end",
        Cell: ({ cell: { value } }) => changeDateandTime(value),
        align: "left",
      },
      { Header: "Timezone", accessor: "timezone", align: "left" },
      {
        Header: "actions",
        accessor: "id",
        // eslint-disable-next-line react/prop-types
        Cell: ({ cell: { value } }) => (
          <div
            style={{
              width: "100%",
              backgroundColor: "#dadada",
              borderRadius: "2px",
            }}
          >
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <Icon sx={{ fontWeight: "light" }}>settings</Icon>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => navigate(`/interview-Schedule/interview-Date?id=${value}`)}
                >
                  Change Interview Date
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable(value)}>Cancel</Dropdown.Item>
                {/* <Dropdown.Item onClick={() => handleCondition(value)}>
                  Stage Conditions
                </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ),
        align: "left",
      },
    ],

    rows: items,
  };
}
