/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
// import MDButton from "components/MDButton";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
// import { id } from "date-fns/locale";

export default function AppraisalData() {
  // const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  // const axios = require("axios");
  const [items, setItems] = useState([]);
  // const [id, setId] = useState("");
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  // Method to change date from timestamp
  const changeBranchDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  // Function to get cell value
  // const getCellValue = (value) => {
  //   setId(value);
  // };
  // Method to fetch all Branch
  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/gets/${orgIDs}`, { headers })
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
          console.log({ appraisalsResult: result });
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleView = (value) => {
    const filteredItems = items.filter((item) => item.id === value);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    if (filteredItems[0].status !== 0 && filteredItems[0].status !== 1) {
      MySwal.fire({
        title: "APPRAISAL_CLOSED",
        type: "error",
        text: "This Appraisal Is Already Closed",
      });
    } else if (filteredItems[0].createdBy !== data11.personalID) {
      MySwal.fire({
        title: "APPRAISAL_CONFLICT",
        type: "error",
        text: "This Appraisal Cannot Be Updated By You",
      });
    } else {
      navigate(`/Update-Appraisals?id=${value}`);
    }
  };

  const handleQuestions = (value) => {
    console.log(items);
    const filteredItems = items.filter((item) => item.id === value);
    console.log(filteredItems[0].status);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    if (filteredItems[0].status !== 0 && filteredItems[0].status !== 1) {
      MySwal.fire({
        title: "APPRAISAL_CLOSED",
        type: "error",
        text: "This Appraisal Is Already Closed",
      });
    } else if (filteredItems[0].appraiseeID === data11.personalID) {
      MySwal.fire({
        title: "APPRAISAL_CONFLICT",
        type: "error",
        text: "This Questions Cannot Be Set By You",
      });
    } else {
      navigate(`/Set-Appraisal-Questions?id=${value}`);
    }
  };

  const handleAppraisers = (value) => {
    const filteredItems = items.filter((item) => item.id === value);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    if (filteredItems[0].status !== 0 && filteredItems[0].status !== 1) {
      MySwal.fire({
        title: "APPRAISAL_CLOSED",
        type: "error",
        text: "This Appraisal Is Already Closed",
      });
    } else if (filteredItems[0].appraiseeID === data11.personalID) {
      MySwal.fire({
        title: "APPRAISAL_CONFLICT",
        type: "error",
        text: "This Appraisers Cannot Be Set By You",
      });
    } else {
      navigate(`/Set-Appraisal-Appraisers?id=${value}`);
    }
  };

  const handleGrading = (value) => {
    const filteredItems = items.filter((item) => item.id === value);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    if (filteredItems[0].status !== 0 && filteredItems[0].status !== 1) {
      MySwal.fire({
        title: "APPRAISAL_CLOSED",
        type: "error",
        text: "This Appraisal Is Already Closed",
      });
    } else if (filteredItems[0].appraiseeID === data11.personalID) {
      MySwal.fire({
        title: "APPRAISAL_CONFLICT",
        type: "error",
        text: "This Appraisal Cannot Be Graded By You",
      });
    } else {
      navigate(`/Grade-Appraisal?id=${value}`);
    }
  };

  const handleResults = (value) => {
    const filteredItems = items.filter((item) => item.id === value);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    if (
      data11.roleID === "0" &&
      data11.roleID === "" &&
      data11.roleID === "null" &&
      data11.roleID === null
    ) {
      navigate(`/Appraisals/Result?id=${value}`);
    } else if (filteredItems[0].appraiseeID === data11.personalID) {
      navigate(`/Appraisals/Result?id=${value}`);
    } else if (filteredItems[0].status === 0 && filteredItems[0].status === 1) {
      MySwal.fire({
        title: "APPRAISAL_CONFLICT",
        type: "error",
        text: "This Appraisal's Process Hasn't ended",
      });
    } else {
      // navigate(`/Appraisals/Result?id=${value}`);
      MySwal.fire({
        title: "APPRAISAL_CONFLICT",
        type: "error",
        text: "This Appraisal Result Cannot Be Viewed By You",
      });
    }
  };

  const handleApprove = (value) => {
    console.log(items);
    const filteredItems = items.filter((item) => item.id === value);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    if (
      filteredItems[0].createdBy === data11.personalID ||
      filteredItems[0].approvalID === data11.personalID
    ) {
      navigate(`/Appraisals/Approve-Appraisal?id=${value}`);
    } else {
      // navigate(`/Appraisals/Result?id=${value}`);
      MySwal.fire({
        title: "APPRAISAL_CONFLICT",
        type: "error",
        text: "This Appraisal Cannot Be Approved By You",
      });
    }
  };

  const handleOpen = (value) => {
    const filteredItems = items.filter((item) => item.id === value);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    if (filteredItems[0].appraiseeID === data11.personalID) {
      MySwal.fire({
        title: "APPRAISAL_CONFLICT",
        type: "error",
        text: "This Appraisal Result Cannot Be Opened By You",
      });
    } else if (filteredItems[0].status !== 0 && filteredItems[0].status !== 1) {
      MySwal.fire({
        title: "APPRAISAL_CLOSED",
        type: "error",
        text: "This Appraisal Is Already Closed",
      });
    } else {
      const headers = miHeaders;

      fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/openOrClose/${value}/1`, {
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

  const handleClose = (value) => {
    const filteredItems = items.filter((item) => item.id === value);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    if (filteredItems[0].appraiseeID === data11.personalID) {
      MySwal.fire({
        title: "APPRAISAL_CONFLICT",
        type: "error",
        text: "This Appraisal Result Cannot Be Closed By You",
      });
    } else {
      const headers = miHeaders;

      fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/openOrClose/${value}/2`, {
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

  const handleDisable = (value) => {
    const filteredItems = items.filter((item) => item.id === value);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    if (filteredItems[0].appraiseeID === data11.personalID) {
      MySwal.fire({
        title: "APPRAISAL_CONFLICT",
        type: "error",
        text: "This Appraisal Result Cannot Be Disabled By You",
      });
    } else {
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

          fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/delete/${value}`, requestOptions)
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
    }
  };

  const changeStatus = (value) => {
    if (value === 0) {
      return "Created";
      // eslint-disable-next-line no-else-return
    } else if (value === 1) {
      return "Open";
    }
    return "Closed";
  };

  const changeAppStatus = (value) => {
    if (value === 1) {
      return "Approved";
      // eslint-disable-next-line no-else-return
    } else if (value === 2) {
      return "Declined";
    }
    return "No Decision Made";
  };

  return {
    columns: [
      { Header: "appraisee Name", accessor: "appraiseeName", align: "left" },
      { Header: "Name", accessor: "name", align: "left" },
      { Header: "created By", accessor: "createdByName", align: "left" },
      {
        Header: "Status",
        accessor: "status",
        // eslint-disable-next-line react/prop-types
        Cell: ({ cell: { value } }) => <span>{changeStatus(value)}</span>,
        align: "left",
      },
      {
        Header: "Approval Status",
        accessor: "approvalStatus",
        // eslint-disable-next-line react/prop-types
        Cell: ({ cell: { value } }) => <span>{changeAppStatus(value)}</span>,
        align: "left",
      },
      {
        Header: "Date Created",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeBranchDate(value),
        align: "left",
      },
      {
        Header: "actions",
        accessor: "id",
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
                <Dropdown.Item onClick={() => handleView(value)}>Update</Dropdown.Item>
                <Dropdown.Item onClick={() => handleQuestions(value)}>Set Questions</Dropdown.Item>
                <Dropdown.Item onClick={() => handleAppraisers(value)}>
                  Set Appraisers
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleApprove(value)}>Approve/Decline</Dropdown.Item>
                <Dropdown.Item onClick={() => handleOpen(value)}>Open</Dropdown.Item>
                <Dropdown.Item onClick={() => handleGrading(value)}>Grade Appraisal</Dropdown.Item>
                <Dropdown.Item onClick={() => handleClose(value)}>Close</Dropdown.Item>
                <Dropdown.Item onClick={() => handleResults(value)}>View Result</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ),
        align: "center",
      },
    ],

    rows: items,
  };
}
