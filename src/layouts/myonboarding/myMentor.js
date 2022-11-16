/* eslint-disable no-unused-vars */
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { Container, Form, Dropdown } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Icon from "@mui/material/Icon";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";

export default function Mentor() {
  const MySwal = withReactContent(Swal);
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [table, setTable] = useState([]);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [add, setAdd] = useState(0);
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

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const myid = data11.personalID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/onboardingSession/getMySessions/${orgIDs}/${myid}`, {
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
          setTable(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  // eslint-disable-next-line consistent-return
  const handleStatus = (status) => {
    if (status === 0) {
      return "NOT COMPLETED";
    }
    if (status === 1) {
      return "COMPLETED";
    }
    if (status === 2) return "FAILED TO ATTEND";
  };
  const handleCOMPLETED = (id) => {
    const [filteredData] = table.filter((item) => item.id === id);
    console.log(filteredData);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      id: filteredData.onboardingDTO.id,
      empID: filteredData.onboardingDTO.empID,
      startTime: filteredData.onboardingDTO.startTime,
      endTime: filteredData.onboardingDTO.endTime,
      status: 1,
      createdBy: filteredData.onboardingDTO.createdBy,
      deleteFlag: filteredData.onboardingDTO.deleteFlag,
      terminatedBy: filteredData.onboardingDTO.terminatedBy,
      terminatedTime: filteredData.onboardingDTO.terminatedTime,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_RAGA_URL}/onboarding/update`, requestOptions)
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
  const handleCOMPLETED2 = (id) => {
    const [filteredData] = table.filter((item) => item.id === id);
    console.log(filteredData);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      id: filteredData.onboardingDTO.id,
      empID: filteredData.onboardingDTO.empID,
      startTime: filteredData.onboardingDTO.startTime,
      endTime: filteredData.onboardingDTO.endTime,
      status: 2,
      createdBy: filteredData.onboardingDTO.createdBy,
      deleteFlag: filteredData.onboardingDTO.deleteFlag,
      terminatedBy: filteredData.onboardingDTO.terminatedBy,
      terminatedTime: filteredData.onboardingDTO.terminatedTime,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_RAGA_URL}/onboarding/update`, requestOptions)
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
  //   const handleterminate = (id) => {
  //     const data11 = JSON.parse(localStorage.getItem("user1"));
  //     const personalIDs = data11.personalID;
  //     const terminatedBy = personalIDs;
  //     MySwal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         const requestOptions = {
  //           method: "DELETE",
  //           headers: miHeaders,
  //         };

  //         fetch(
  //           `${process.env.REACT_APP_RAGA_URL}/onboarding/terminate/${id}/${terminatedBy}`,
  //           requestOptions
  //         )
  //           .then(async (res) => {
  //             const aToken = res.headers.get("token-1");
  //             localStorage.setItem("rexxdex", aToken);
  //             return res.json();
  //           })
  //           .then((resx) => {
  //             if (resx.message === "Expired Access") {
  //               navigate("/authentication/sign-in");
  //             }
  //             if (resx.message === "Token Does Not Exist") {
  //               navigate("/authentication/sign-in");
  //             }
  //             if (resx.message === "Unauthorized Access") {
  //               navigate("/authentication/forbiddenPage");
  //             }
  //             MySwal.fire({
  //               title: resx.status,
  //               type: "success",
  //               text: resx.message,
  //             }).then(() => {
  //               window.location.reload();
  //             });
  //           })
  //           .catch((error) => {
  //             MySwal.fire({
  //               title: error.status,
  //               type: "error",
  //               text: error.message,
  //             });
  //           });
  //       }
  //     });
  //   };

  return (
    <MDBox>
      <MDBox component="form" role="form" mx={10}>
        <MDBox
          variant="gradient"
          bgColor="success"
          borderRadius="lg"
          coloredShadow="warning"
          mx={10}
          p={1}
          mb={0}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white">
            Mentors Assigned To Me
          </MDTypography>
        </MDBox>
      </MDBox>
      <br />
      <Card>
        <DataTable
          table={{
            columns: [
              { Header: "Mentor Name", accessor: "mentorName", align: "left" },
              {
                Header: "Meeting Begins",
                accessor: "onboardingDTO.startTime",
                Cell: ({ cell: { value } }) => changeDateandTime(value),
                align: "left",
              },
              {
                Header: "Meeting Ends",
                accessor: "onboardingDTO.endTime",
                Cell: ({ cell: { value } }) => changeDateandTime(value),
                align: "left",
              },
              {
                Header: "Status",
                accessor: "onboardingDTO.status",
                Cell: ({ cell: { value } }) => handleStatus(value),
                align: "left",
              },
              // {
              //   Header: "actions",
              //   accessor: "id",
              //   // eslint-disable-next-line react/prop-types
              //   Cell: ({ cell: { value } }) => (
              //     <div
              //       style={{
              //         width: "100%",
              //         backgroundColor: "#dadada",
              //         borderRadius: "2px",
              //       }}
              //     >
              //       <Dropdown>
              //         <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              //           <Icon sx={{ fontWeight: "light" }}>settings</Icon>
              //         </Dropdown.Toggle>

              //         <Dropdown.Menu>
              //           <Dropdown.Item onClick={() => handleCOMPLETED(value)}>
              //             Mark As Completed
              //           </Dropdown.Item>
              //           <Dropdown.Item onClick={() => handleCOMPLETED2(value)}>
              //             Mark As Failed
              //           </Dropdown.Item>
              //         </Dropdown.Menu>
              //       </Dropdown>
              //     </div>
              //   ),
              //   align: "left",
              // },
            ],
            rows: table,
          }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </Card>
      <br />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </MDBox>
  );
}
