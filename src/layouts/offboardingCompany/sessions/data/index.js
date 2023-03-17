import { useEffect, useState } from "react";
// import MDButton from "components/MDButton";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GHeaders from "getHeader";
// import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
// import PHeaders from "postHeader";
// import TextWrapper from "react-text-wrapper";

export default function OffboardingSessionTable() {
  const { allGHeaders: miHeaders } = GHeaders();
  //   const { allPHeaders: myHeaders } = PHeaders();
  // const { allPHeaders: myHeaders } = PHeaders();
  // const axios = require("axios");
  const [items, setItems] = useState([]);
  // const [id, setId] = useState("");
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const MySwal = withReactContent(Swal);

  // Method to change date from timestamp
  const changeDateandTime = (timestamp) => {
    // eslint-disable-next-line no-console
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

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    // const personalIDs = data11.personalID;
    // const mentorID = personalIDs;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pid = urlParams.get("pid");
    console.log("pid", pid);
    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/offboardingSession/getMySessions/${orgIDs}/${pid}`, {
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
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDisable2 = (id) => {
    const [filteredItems] = items.filter((item) => item.id === id);
    console.log(filteredItems);
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed === true) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };
        fetch(
          `${process.env.REACT_APP_RAGA_URL}/appointment/cancel/${filteredItems.appointmentID}`,
          requestOptions
        )
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((ressx) => {
            console.log(ressx);
          });
        fetch(
          `${process.env.REACT_APP_RAGA_URL}/appointmentParticipant/removeAll/${filteredItems.orgID}/${filteredItems.appointmentID}`,
          requestOptions
        )
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resy) => {
            console.log(resy);
          });
        fetch(`${process.env.REACT_APP_RAGA_URL}/offboardingSession/delete/${id}`, requestOptions)
          .then((res) => res.json())
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

  // eslint-disable-next-line consistent-return
  const handleStatus = (status) => {
    if (status === 0) {
      return "PENDING";
    }
    if (status === 1) {
      return "ATTENDED";
    }
    if (status === 2) return "FAILED TO ATTEND";
  };
  //   const handleUpdate = (value) => {
  //     navigate(`/onboardingCompany/updateonboarding?id=${value}`);
  //   };
  const handleUpdate = (value) => {
    const filteredItems = items.filter((item) => item.id === value);
    console.log(filteredItems);
    window.sessionStorage.setItem("boarding", JSON.stringify(filteredItems[0]));
    navigate(`/offboarding/sessions/update?id=${value}`);
  };
  const handleAddChecklist = (value) => {
    console.log(value);
    navigate(`/offboardingChecklist?id=${value}`);
  };

  return {
    columns: [
      { Header: "Mentor's Name ", accessor: "mentorName", align: "left" },
      {
        Header: "Begins",
        accessor: "appointment.startTime",
        Cell: ({ cell: { value } }) => changeDateandTime(value),
        align: "left",
      },
      {
        Header: "Ends",
        accessor: "appointment.endTime",
        Cell: ({ cell: { value } }) => changeDateandTime(value),
        align: "left",
      },
      //   { Header: "TERMINATED BY ", accessor: "terminatedBy", align: "left" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell: { value } }) => handleStatus(value),
        align: "left",
      },
      {
        Header: "actions",
        accessor: "id",
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => (
          <div
            style={{
              width: "100%",
              backgroundColor: "#dadada",
              borderRadius: "2px",
            }}
          >
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic-button">
                <Icon sx={{ fontWeight: "light" }}>settings</Icon>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleUpdate(value)}>Update Session</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable2(value)}>Delete</Dropdown.Item>
                <Dropdown.Item onClick={() => handleAddChecklist(value)}>
                  Add Checklist
                </Dropdown.Item>
                {/* <Dropdown.Item onClick={() => handleterminate(value)}>Terminate</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCOMPLETED(value, 1)}>
                  Mark As Completed
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable(value)}>Delete</Dropdown.Item> */}
              </Dropdown.Menu>{" "}
            </Dropdown>
          </div>
        ),
        align: "center",
      },
    ],

    rows: items,
  };
}
