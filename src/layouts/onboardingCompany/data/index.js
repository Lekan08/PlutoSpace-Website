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
import GHeaders from "getHeader";
// import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import PHeaders from "postHeader";
// import TextWrapper from "react-text-wrapper";

export default function OnboardingCompanyTable() {
  const { allGHeaders: miHeaders } = GHeaders();
  const { allPHeaders: myHeaders } = PHeaders();
  // const [createdByx, setCreatedByx] = useState("");
  // const { allPHeaders: myHeaders } = PHeaders();
  // const axios = require("axios");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const MySwal = withReactContent(Swal);

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

  const handleDisable = (id) => {
    const headers = miHeaders;
    const filteredItems = items.filter((item) => item.id === id);
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
          `${process.env.REACT_APP_RAGA_URL}/onboardingSession/getMySessions/${filteredItems[0].orgID}/${filteredItems[0].empID}`,
          {
            headers,
          }
        )
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((results) => {
            console.log(results, "del");
            const appID = results[0]?.appointmentID;
            fetch(
              `${process.env.REACT_APP_RAGA_URL}/onboarding/delete/${filteredItems[0].id}`,
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
            fetch(
              `${process.env.REACT_APP_RAGA_URL}/onboardingSession/delete/${results[0].id}`,
              requestOptions
            )
              .then((res) => res.json())
              .then((resx) => {
                console.log(resx);
              })
              .catch((error) => {
                MySwal.fire({
                  title: error.status,
                  type: "error",
                  text: error.message,
                });
              });
            fetch(`${process.env.REACT_APP_RAGA_URL}/appointment/cancel/${appID}`, requestOptions)
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                return res.json();
              })
              .then((ressx) => {
                console.log(ressx);
              });
            fetch(
              `${process.env.REACT_APP_RAGA_URL}/appointmentParticipant/removeAll/${results[0].orgID}/${appID}`,
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
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  const handleterminate = (id) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIDs = data11.personalID;
    const terminatedBy = personalIDs;
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(
          `${process.env.REACT_APP_RAGA_URL}/onboarding/terminate/${id}/${terminatedBy}`,
          requestOptions
        )
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

  const handleCOMPLETED = (id) => {
    const filteredData = items.filter((item) => item.id === id);
    console.log(filteredData);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      id: filteredData[0].id,
      empID: filteredData[0].empID,
      startTime: filteredData[0].startTime,
      endTime: filteredData[0].endTime,
      status: 1,
      createdBy: filteredData[0].createdBy,
      deleteFlag: filteredData[0].deleteFlag,
      terminatedBy: filteredData[0].terminatedBy,
      terminatedTime: filteredData[0].terminatedTime,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
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

  // const handleCOMPLETED2 = (id) => {
  //   const filteredData = items.filter((item) => item.id === id);
  //   console.log(filteredData);
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const orgIDs = data11.orgID;
  //   const raw = JSON.stringify({
  //     orgID: orgIDs,
  //     id: filteredData[0].id,
  //     empID: filteredData[0].empID,
  //     startTime: filteredData[0].startTime,
  //     endTime: filteredData[0].endTime,
  //     status: 2,
  //     createdBy: filteredData[0].createdBy,
  //     deleteFlag: filteredData[0].deleteFlag,
  //     terminatedBy: filteredData[0].terminatedBy,
  //     terminatedTime: filteredData[0].terminatedTime,
  //   });
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };
  //   MySwal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, Confirm it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       fetch(`${process.env.REACT_APP_RAGA_URL}/onboarding/update`, requestOptions)
  //         .then(async (res) => {
  //           const aToken = res.headers.get("token-1");
  //           localStorage.setItem("rexxdex", aToken);
  //           return res.json();
  //         })
  //         .then((resx) => {
  //           if (resx.message === "Expired Access") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (resx.message === "Token Does Not Exist") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (resx.message === "Unauthorized Access") {
  //             navigate("/authentication/forbiddenPage");
  //           }
  //           MySwal.fire({
  //             title: resx.status,
  //             type: "success",
  //             text: resx.message,
  //           }).then(() => {
  //             window.location.reload();
  //           });
  //         })
  //         .catch((error) => {
  //           MySwal.fire({
  //             title: error.status,
  //             type: "error",
  //             text: error.message,
  //           });
  //         });
  //     }
  //   });
  // };

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/onboarding/gets/${orgIDs}`, { headers })
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

  // eslint-disable-next-line consistent-return
  const handleStatus = (status) => {
    if (status === 0) {
      return "PENDING";
    }
    if (status === 1) {
      return "COMPLETED";
    }
    if (status === 2) return "TERMINATED";
  };
  const handleUpdate = (value) => {
    navigate(`/company-onboarding/update-Onboarding?id=${value}`);
  };
  const handleSessions = (value) => {
    const filteredItems = items.filter((item) => item.id === value);
    console.log(filteredItems);
    navigate(
      `/onboarding/sessions?id=${value}&pid=${filteredItems[0].empID}&stat=${filteredItems[0].status}`
    );
  };

  // const handleAddChecklist = (filteredData, value) => {
  //   // console.log(value);
  //   let cbttime = "";
  //   let filteredItems = [];
  //   // Avoid filter for empty string
  //   if (!value) {
  //     cbttime = "";
  //     filteredItems = [];
  //   } else {
  //     filteredItems = filteredData.filter((item) => item.id === value);
  //     console.log(filteredItems);

  //     cbttime = new Date(filteredItems[0].deadline);
  //   }

  //   MySwal.fire({
  //     title: "Onboarding Checklist",
  //     html: `<div text-align="left"><b>Description:</b> <textarea rows="4" cols="8" class="form-control" id="descrip">${descripx}</textarea></div>`,
  //     confirmButtonText: "Save",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     preConfirm: () => {
  //       const time = Swal.getPopup().querySelector("#time").value;
  //       if (!time) {
  //         Swal.showValidationMessage(`Set a Specific Time`);
  //       } else {
  //         Swal.resetValidationMessage();
  //         // console.log(time);

  //         const data11 = JSON.parse(localStorage.getItem("user1"));
  //         const cbtTimex = new Date(time).getTime();
  //         // console.log(cbtTimex);

  //         const orgIDs = data11.orgID;
  //         const raw = JSON.stringify({
  //           id: filteredItems[0].id,
  //           title: filteredItems[0].title,
  //           orgID: orgIDs,
  //           duration: filteredItems[0].duration,
  //           descrip: filteredItems[0].descrip,
  //           status: filteredItems[0].status,
  //           jobPostID: filteredItems[0].jobPostID,
  //           deadline: cbtTimex,
  //           createdTime: filteredItems[0].createdTime,
  //           deleteFlag: filteredItems[0].deleteFlag,
  //         });

  //         // console.log(raw);
  //         const requestOptions = {
  //           method: "POST",
  //           headers: myHeaders,
  //           body: raw,
  //           redirect: "follow",
  //         };

  //         fetch(`${process.env.REACT_APP_RAGA_URL}/cbt/update`, requestOptions)
  //           .then(async (res) => {
  //             const aToken = res.headers.get("token-1");
  //             localStorage.setItem("rexxdex", aToken);
  //             return res.json();
  //           })
  //           .then((result) => {
  //             if (result.message === "Expired Access") {
  //               navigate("/authentication/sign-in");
  //               window.location.reload();
  //             }
  //             if (result.message === "Token Does Not Exist") {
  //               navigate("/authentication/sign-in");
  //               window.location.reload();
  //             }
  //             if (result.message === "Unauthorized Access") {
  //               navigate("/authentication/forbiddenPage");
  //               window.location.reload();
  //             }
  //             MySwal.fire({
  //               title: result.status,
  //               type: "success",
  //               text: result.message,
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
  //     },
  //   });
  // };

  const handleAddChecklist = (value) => {
    console.log(value);
    navigate(`/onboardingChecklist?id=${value}`);
  };

  return {
    columns: [
      { Header: "CREATED BY ", accessor: "createdByName", align: "left" },
      { Header: "EMPLOYEE ", accessor: "empName", align: "left" },
      {
        Header: "Begins",
        accessor: "startTime",
        Cell: ({ cell: { value } }) => changeDateandTime(value),
        align: "left",
      },
      {
        Header: "Ends",
        accessor: "endTime",
        Cell: ({ cell: { value } }) => changeDateandTime(value),
        align: "left",
      },
      { Header: "TERMINATED BY ", accessor: "terminatedBy", align: "left" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell: { value } }) => handleStatus(value),
        align: "left",
      },
      {
        Header: "actions",
        accessor: "id",
        // eslint-disable-next-line no-unused-vars
        Cell: ({ cell: { value } }) => (
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
                <Dropdown.Item onClick={() => handleSessions(value)}>
                  Onboarding Sessions
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleUpdate(value)}>Update Onboarding</Dropdown.Item>
                <Dropdown.Item onClick={() => handleterminate(value, 2)}>Terminate</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCOMPLETED(value, 1)}>
                  Mark As Completed
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleAddChecklist(value)}>
                  Add Checklist
                </Dropdown.Item>
                {/* <Dropdown.Item onClick={() => handleCOMPLETED2(value, 2)}>
                  Mark As Not COMPLETED
                </Dropdown.Item> */}
                <Dropdown.Item onClick={() => handleDisable(value)}>Delete</Dropdown.Item>
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
