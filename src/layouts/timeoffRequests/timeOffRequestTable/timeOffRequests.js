/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

export default function TimeOffRequestData() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const handleUpdate = (
    idx,
    empSetupIdx,
    daysx,
    daysapprovex,
    startx,
    endx,
    resumex,
    dutyrelieverx,
    createdx,
    purposex,
    deletex,
    approvex,
    adminx,
    reasonx,
    statusx,
    empIDx
  ) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const personalIds = data11.personalID;

    if (approvex !== personalIds) {
      MySwal.fire({
        title: "PROCESS_DENIED",
        type: "success",
        text: "You Are Not Permitted To Approve This Request",
      }).then(() => {
        window.location.reload();
      });
    } else if (reasonx !== null && reasonx !== "") {
      MySwal.fire({
        title: "PROCESS_DENIED",
        type: "success",
        text: "Decision Already Made For This Request",
      }).then(() => {
        window.location.reload();
      });
    } else {
      const raw = JSON.stringify({
        id: idx,
        orgID: orgIDs,
        empID: empIDx,
        empSetupID: empSetupIdx,
        noOfDaysRequested: daysx,
        noOfDaysApproved: daysapprovex,
        startDate: startx,
        endDate: endx,
        resumptionDate: resumex,
        dutyRelieverID: dutyrelieverx,
        createdDate: createdx,
        purpose: purposex,
        deleteFlag: deletex,
        approverID: approvex,
        adminID: adminx,
        reasonForDisapproval: reasonx,
        status: statusx,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/update`,
        requestOptions
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
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
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
  };

  const handleShow = (filteredData, value) => {
    let empSetupIdx = "";
    let empIDx = "";
    let daysx = "";
    let daysapprovex = "";
    let startx = "";
    let endx = "";
    let resumex = "";
    let dutyrelieverx = "";
    let createdx = "";
    let purposex = "";
    let deletex = "";
    let approvex = "";
    let adminx = "";
    let reasonx = "";
    // Avoid filter for empty string
    if (!value) {
      empSetupIdx = "";
      empIDx = "";
      daysx = "";
      daysapprovex = "";
      startx = "";
      endx = "";
      resumex = "";
      dutyrelieverx = "";
      createdx = "";
      purposex = "";
      deletex = "";
      approvex = "";
      adminx = "";
      reasonx = "";
    } else {
      const filteredItems = filteredData.filter((item) => item.id === value);
      empSetupIdx = filteredItems[0].empSetupID;
      empIDx = filteredItems[0].empID;
      daysx = filteredItems[0].noOfDaysRequested;
      daysapprovex = filteredItems[0].noOfDaysApproved;
      startx = filteredItems[0].startDate;
      endx = filteredItems[0].endDate;
      resumex = filteredItems[0].resumptionDate;
      dutyrelieverx = filteredItems[0].dutyRelieverID;
      createdx = filteredItems[0].createdDate;
      purposex = filteredItems[0].purpose;
      deletex = filteredItems[0].deleteFlag;
      approvex = filteredItems[0].approverID;
      adminx = filteredItems[0].adminID;
      reasonx = filteredItems[0].reasonForDisapproval;
    }
    // const sDate = new Date(startx);
    // startx = sDate.getDate();
    // const eDate = new Date(endx);
    // endx = eDate.getDate();

    // const changeTime = (timestamp) => {
    //   const startDate = new Date(timestamp);
    //   const retTime = startDate.toDateString();
    //   return retTime;
    // };

    MySwal.fire({
      title: "Approve Time Off Request",
      html: `<table><tr><td>
      <tr><td><label for="days">Days Requested</label></td>
      <td><input type="text" class="swal2-input" id="days" value="${daysx}" placeholder="Days Requested" disabled></td></tr><br>
      <tr><td><br></td></tr>
      <tr><td><label for="daysapproved">Days Approved</label></td>
      <td><input type="text" class="swal2-input" id="daysapproved" value="${daysapprovex}" placeholder="Purpose"></td></tr></table>`,
      confirmButtonText: "Save",
      showCancelButton: true,
      confirmButtonColor: "#f96d02",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const daysRequested = Swal.getPopup().querySelector("#days").value;
        const daysapproved = Swal.getPopup().querySelector("#daysapproved").value;
        const id = value;
        const numbers = /^[0-9]+$/;
        if (daysapproved <= 0 && !daysapproved.match(numbers)) {
          Swal.showValidationMessage(`Please enter a number`);
        } else {
          handleUpdate(
            id,
            empSetupIdx,
            daysRequested,
            daysapproved,
            startx,
            endx,
            resumex,
            dutyrelieverx,
            createdx,
            purposex,
            deletex,
            approvex,
            adminx,
            reasonx,
            1,
            empIDx
          );
        }
      },
    });
  };

  // Method to handle diable
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

        fetch(
          `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/delete/${id}`,
          requestOptions
        )
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

  // Method to change type
  const changeType = (status) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIds = data11.personalID;
    const filteredItems = items.filter((item) => item.id === status);
    if (filteredItems[0].status === "2") {
      return "Decision Made";
    }
    if (filteredItems[0].status === "2") {
      return MySwal.fire({
        title: "Timeoff Request",
        type: "success",
        text: "Time off Request Approved",
      });
    }
    if (filteredItems[0].status === "1") {
      return "Decision Made";
      // eslint-disable-next-line no-else-return
    } else if (filteredItems[0].status === "0" && filteredItems[0].empID === personalIds) {
      return "Created";
    } else {
      return "Requires Attention";
    }
  };

  const changeCol = (status) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIds = data11.personalID;
    const filteredItems = items.filter((item) => item.id === status);
    if (filteredItems[0].status === "2") {
      return "#FAFA33";
    }
    if (filteredItems[0].status === "1") {
      return "#FAFA33";
      // eslint-disable-next-line no-else-return
    } else if (filteredItems[0].status === "0" && filteredItems[0].empID === personalIds) {
      return "#0096FF";
    } else {
      return "#FF0000";
    }
  };

  // Method to fetch all timeofftype
  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIds = data11.personalID;
    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    if (
      data11.roleID !== "0" &&
      data11.roleID !== "" &&
      data11.roleID !== "null" &&
      data11.roleID !== null
    ) {
      fetch(
        `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/getAllForEmp/${orgIDs}/${personalIds}`,
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
            setItems(result);
          }
        });
    } else {
      fetch(`${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/getAll/${orgIDs}`, {
        headers,
      })
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
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
          if (isMounted) {
            setItems(resultx);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  const handleUpdateLeave = (idx, daysCompletedx) => {
    const app = items[0].noOfDaysApproved;

    if (daysCompletedx <= app) {
      MySwal.fire({
        title: "PROCESS_DENIED",
        type: "error",
        text: "Days Completed Can`t be more than days approved",
      }).then(() => {
        window.location.reload();
      });
    } else {
      const headers = miHeaders;

      fetch(
        `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/recall/${idx}/${daysCompletedx}`,
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
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
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
  };

  const handleLeave = (filteredData, value) => {
    let completedDaysx = "";
    if (!value) {
      completedDaysx = "";
    } else {
      const filteredItems = filteredData.filter((item) => item.id === value);
      completedDaysx = filteredItems[0].noOfDaysApproved;
    }

    MySwal.fire({
      title: "Days For Leave Completed",
      html: `<table><tr><td>
      <tr><td><label for="days">Days Completed</label></td>
      <td><input type="text" class="swal2-input" id="days" value="${completedDaysx}" placeholder="Days Requested"></td></tr></table>`,
      confirmButtonText: "Save",
      showCancelButton: true,
      confirmButtonColor: "#f96d02",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const daysCompleted = Swal.getPopup().querySelector("#days").value;
        const id = value;
        const numbers = /^[0-9]+$/;
        if (daysCompleted <= 0 && !daysCompleted.match(numbers)) {
          Swal.showValidationMessage(`Please enter a number`);
        } else {
          handleUpdateLeave(id, daysCompleted);
        }
      },
    });
  };

  const handleDisapprove = (value) => {
    navigate(`/timeoff-Requests/disapprove?id=${value}`);
  };

  // Return table
  return {
    columns: [
      { Header: "Employee's Name", accessor: "empName", align: "left" },
      { Header: "Duty Reliever's Name", accessor: "dutyRelieverName", align: "left" },
      { Header: "Approver's Name", accessor: "approverName", align: "left" },
      { Header: "Days Requested", accessor: "noOfDaysRequested", align: "left" },
      { Header: "Days Approved", accessor: "noOfDaysApproved", align: "left" },
      {
        Header: "Start Date",
        accessor: "startDate",
        Cell: ({ cell: { value } }) => changeDate(value),
        align: "left",
      },
      {
        Header: "End Date",
        accessor: "endDate",
        Cell: ({ cell: { value } }) => changeDate(value),
        align: "left",
      },
      { Header: "Purpose", accessor: "purpose", align: "left" },
      {
        Header: "Status",
        accessor: "empSetupID",
        Cell: ({ cell: { row } }) => (
          <span
            className="badge badge-pill"
            style={{ backgroundColor: changeCol(row.original.id) }}
          >
            {changeType(row.original.id)}
          </span>
        ),
        align: "left",
      },
      {
        Header: "actions",
        accessor: "id",
        Cell: ({ cell: { value } }) => (
          <div
            style={{
              width: "100%",
              backgroundColor: "#f5f5f5",
              borderRadius: "2px",
            }}
          >
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <Icon sx={{ fontWeight: "light" }}>settings</Icon>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    navigate(`/time-off-Requests/update-time-off-Requests?id=${value}`)
                  }
                >
                  Update
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
                <Dropdown.Item onClick={() => handleShow(items, value)}>Approve</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisapprove(value)}>Disapprove</Dropdown.Item>
                <Dropdown.Item onClick={() => handleLeave(items, value)}>
                  Leave Recall
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    navigate(`/time-off-Requests/time-off-Request-Journey?id=${value}`)
                  }
                >
                  Time Off Request Journey
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    navigate(`/time-off-Requests/forward-Time-Off-Requests?id=${value}`)
                  }
                >
                  Forward Time Off Request
                </Dropdown.Item>
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
