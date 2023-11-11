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

export default function AssignedOnboarding() {
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

  //   useEffect(() => {
  //     const headers = miHeaders;
  //     const data11 = JSON.parse(localStorage.getItem("user1"));

  //     const orgIDs = data11.orgID;
  //     let isMounted = true;
  //     setOpened(true);
  //     fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         return res.json();
  //       })
  //       .then((result) => {
  //         if (result.message === "Expired Access") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (result.message === "Token Does Not Exist") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (result.message === "Unauthorized Access") {
  //           navigate("/authentication/forbiddenPage");
  //           window.location.reload();
  //         }
  //         if (isMounted) {
  //           const user = result.map((r) => ({
  //             grantedFor: r.personal.id,
  //             grantedForName: `${r.personal.fname} ${r.personal.lname}`,
  //             orgID: r.personalCompany.orgID,
  //             checked: false,
  //           }));
  //           const userx = user;
  //           const perso = data11.personalID;
  //           fetch(`${process.env.REACT_APP_RAGA_URL}/appointmentAccess/gets/${orgIDs}/${perso}`, {
  //             headers,
  //           })
  //             .then(async (res) => {
  //               const aToken = res.headers.get("token-1");
  //               localStorage.setItem("rexxdex", aToken);
  //               return res.json();
  //             })
  //             .then((rex) => {
  //               setTable(rex);
  //             });
  //           fetch(
  //             `${process.env.REACT_APP_RAGA_URL}/appointmentAccess/getsOpposite/${orgIDs}/${perso}`,
  //             {
  //               headers,
  //             }
  //           )
  //             .then(async (res) => {
  //               const aToken = res.headers.get("token-1");
  //               localStorage.setItem("rexxdex", aToken);
  //               return res.json();
  //             })
  //             .then((rex) => {
  //               if (rex.message === "Expired Access") {
  //                 navigate("/authentication/sign-in");
  //                 window.location.reload();
  //               }
  //               if (rex.message === "Token Does Not Exist") {
  //                 navigate("/authentication/sign-in");
  //                 window.location.reload();
  //               }
  //               if (rex.message === "Unauthorized Access") {
  //                 navigate("/authentication/forbiddenPage");
  //                 window.location.reload();
  //               }
  //               function alphabetical(a, b) {
  //                 if (a.grantedForName.toUpperCase() < b.grantedForName.toUpperCase()) {
  //                   return -1;
  //                 }
  //                 if (a.grantedForName.toUpperCase() > b.grantedForName.toUpperCase()) {
  //                   return 1;
  //                 }
  //                 return 0;
  //               }
  //               if (isMounted) {
  //                 console.log(rex);
  //                 const myAccessor = rex;
  //                 const setcheck = myAccessor.map((rr) => ({
  //                   ...rr,
  //                   checked: true,
  //                 }));
  //                 const mixed = setcheck.concat(userx);
  //                 const proper = mixed.filter(
  //                   (value, index, self) =>
  //                     index === self.findIndex((t) => t.grantedFor === value.grantedFor)
  //                 );
  //                 proper.sort(alphabetical);
  //                 console.log(proper);
  //                 setUsers(proper);
  //                 setOpened(false);
  //               }
  //             });
  //         }
  //       });
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, [add]);
  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const myid = data11.personalID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_RAGA_URL}/onboardingSession/getAssignedSessions/${orgIDs}/${myid}`,
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
      return "NOT ATTENDED";
    }
    if (status === 1) {
      return "ATTENDED";
    }
    if (status === 2) return "FAILED TO ATTEND";
  };
  const handleCOMPLETED = (id) => {
    const [filteredData] = table.filter((item) => item.id === id);
    console.log(filteredData);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      id: filteredData.id,
      orgID: orgIDs,
      status: 1,
      appointmentID: filteredData.appointmentID,
      mentorID: filteredData.mentorID,
      onboardingID: filteredData.onboardingID,
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
        fetch(`${process.env.REACT_APP_RAGA_URL}/onboardingSession/update`, requestOptions)
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
      id: filteredData.id,
      orgID: orgIDs,
      status: 2,
      appointmentID: filteredData.appointmentID,
      mentorID: filteredData.mentorID,
      onboardingID: filteredData.onboardingID,
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
        fetch(`${process.env.REACT_APP_RAGA_URL}/onboardingSession/update`, requestOptions)
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
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <MDBox component="form" role="form" mx={10}>
        <MDBox
          variant="gradient"
          bgColor="warning"
          borderRadius="lg"
          coloredShadow="info"
          mx={0}
          mt={2}
          p={1}
          mb={0}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Onboarding Users Assigned To Me
          </MDTypography>
        </MDBox>
      </MDBox>
      <br />
      <Card>
        <DataTable
          table={{
            columns: [
              { Header: "Name", accessor: "onboardingDTO.empName", align: "left" },
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
                        <Dropdown.Item onClick={() => handleCOMPLETED(value)}>
                          Mark As Completed
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleCOMPLETED2(value)}>
                          Mark As Failed
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                ),
                align: "left",
              },
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
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}
