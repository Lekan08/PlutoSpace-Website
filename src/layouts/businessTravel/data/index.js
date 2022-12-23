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
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MDBox from "components/MDBox";
// import Card from "@mui/material/Card";
// import MDTypography from "components/MDTypography";
// import { Container, Form } from "react-bootstrap";

export default function BusinessData() {
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  // const axios = require("axios");
  const [items, setItems] = useState([]);
  // const [id, setId] = useState("");
  const navigate = useNavigate();

  //   const [applicantx, setApplicantx] = useState([]);
  //   const [userx, setUser] = useState([]);
  // const [open, setOpen] = useState(false);
  // const handleClose = () => setOpen(false);

  const MySwal = withReactContent(Swal);

  // Method to handle diable
  const handleDisable = (val) => {
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

        fetch(`${process.env.REACT_APP_SHASHA_URL}/businessTravels/delete/${val}`, requestOptions)
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            const resultres = await res.text();
            if (resultres === null || resultres === undefined || resultres === "") {
              return {};
            }
            return JSON.parse(resultres);
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
    const personalIds = data11.personalID;
    const headers = miHeaders;
    let isMounted = true;
    if (
      data11.roleID !== "0" &&
      data11.roleID !== "" &&
      data11.roleID !== "null" &&
      data11.roleID !== null
    ) {
      fetch(
        `${process.env.REACT_APP_SHASHA_URL}/businessTravels/getForEmp/${orgIDs}/${personalIds}`,
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
          console.log("result");
          if (isMounted) {
            setItems(result);
          }
        });
    } else {
      fetch(`${process.env.REACT_APP_SHASHA_URL}/businessTravels/gets/${orgIDs}`, { headers })
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
          console.log("resultx");
          if (isMounted) {
            setItems(resultx);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  //   const getAllUser = (id) => {
  //     const headers = miHeaders;

  //     // const data11 = JSON.parse(localStorage.getItem("user1"));

  //     // const orgIDs = data11.orgID;
  //     let isMounted = true;
  //     fetch(`${process.env.REACT_APP_SHASHA_URL}/businessTravels/getByIds/${id}`, { headers })
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
  //         console.log(result);
  //         if (isMounted) {
  //           // setUser(result);
  //           setViewP(result);
  //         }
  //       });
  //     return () => {
  //       isMounted = false;
  //     };
  //   };

  //   const addEm = (api) => {
  //     // const applicantr = [];
  //     const mapper = {
  //       orgID: api.personalCompany.orgID,
  //       name: `${api.personal.fname} ${api.personal.lname}`,
  //       email: api.personal.email,
  //       personalID: api.personal.id,
  //     };
  //     applicantx.push(mapper);
  //     setApplicantx(applicantx);
  //   };

  console.log(items);
  const handleapprove = (idx) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIDs = data11.personalID;
    const orgIDs = data11.orgID;
    // const approvedBy = personalIDs;
    // const status = 1;
    console.log(idx);
    console.log(items);
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
        const raw = JSON.stringify({
          id: idx,
          orgID: orgIDs,
          createdBy: personalIDs,
          startTime: items[0].startTime,
          noOfDaysRequested: items[0].noOfDaysRequested,
          noOfDaysApproved: items[0].noOfDaysApproved,
          employees: items[0].employees,
          status: items[0].status,
          approveTime: items[0].approveTime,
          createdTime: items[0].createdTime,
          location: {
            address: items[0].location.address,
            city: items[0].location.city,
            state: items[0].location.state,
            country: items[0].location.country,
          },
          expectedExpenses: items[0].expectedExpenses,
          actualExpenses: items[0].actualExpenses,
          actualDaysSpent: items[0].actualDaysSpent,
          purpose: items[0].purpose,
          extraInformation: items[0].extraInformationx,
          approverID: items[0].approverID,
          approvalStatus: 1,
          deleteFlag: items[0].deleteFlag,
        });
        console.log(raw);
        const requestOptions = {
          //   method: "DELETE",
          //   headers: miHeaders,
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        fetch(`${process.env.REACT_APP_SHASHA_URL}/businessTravels/update`, requestOptions)
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resx) => {
            console.log(resx);
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
  const handleDisapprove = (idx) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIDs = data11.personalID;
    const orgIDs = data11.orgID;
    // const approvedBy = personalIDs;
    // const status = 1;
    console.log(idx);
    console.log(items);
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
        const raw = JSON.stringify({
          id: idx,
          orgID: orgIDs,
          createdBy: personalIDs,
          startTime: items[0].startTime,
          noOfDaysRequested: items[0].noOfDaysRequested,
          noOfDaysApproved: items[0].noOfDaysApproved,
          employees: items[0].employees,
          status: items[0].status,
          approveTime: items[0].approveTime,
          createdTime: items[0].createdTime,
          location: {
            address: items[0].location.address,
            city: items[0].location.city,
            state: items[0].location.state,
            country: items[0].location.country,
          },
          expectedExpenses: items[0].expectedExpenses,
          actualExpenses: items[0].actualExpenses,
          actualDaysSpent: items[0].actualDaysSpent,
          purpose: items[0].purpose,
          extraInformation: items[0].extraInformationx,
          approverID: items[0].approverID,
          approvalStatus: 2,
          deleteFlag: items[0].deleteFlag,
        });
        const requestOptions = {
          //   method: "DELETE",
          //   headers: miHeaders,
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        fetch(`${process.env.REACT_APP_SHASHA_URL}/businessTravels/update`, requestOptions)
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resx) => {
            console.log(resx);
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

  const changeStatus = (value) => {
    if (value === 1) {
      return "Approved";
    }
    if (value === 2) {
      return "Disapproved";
    }
    return "No Decision Made";
  };

  //  1 completed 0 not completed
  // approval status

  const changeStatusCol = (value) => {
    if (value === 1) {
      return "#0000ff";
    }
    if (value === 2) {
      return "#0096FF";
    }
    return "#ff0000";
  };

  // eslint-disable-next-line consistent-return
  const changeStatus2 = (value) => {
    if (value === 1) {
      return "Completed";
    }
    if (value === 0) {
      return "Not Completed";
    }
    // return "No Decision Made";
  };

  // eslint-disable-next-line consistent-return
  const changeStatusCol2 = (value) => {
    if (value === 1) {
      return "	#808000";
    }
    if (value === 0) {
      return "#800000";
    }
    // return "#ff0000";
  };

  // const handleForward = (idx) => {
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const personalIDs = data11.personalID;
  //   const orgIDs = data11.orgID;
  //   // const approvedBy = personalIDs;
  //   // const status = 1;
  //   console.log(idx);
  //   console.log(items);
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
  //       const raw = JSON.stringify({
  //         id: idx,
  //         orgID: orgIDs,
  //         createdBy: personalIDs,
  //         startTime: items[0].startTime,
  //         noOfDaysRequested: items[0].noOfDaysRequested,
  //         employees: items[0].employees,
  //         location: {
  //           address: items[0].address,
  //           city: items[0].city,
  //           state: items[0].state,
  //           country: items[0].country,
  //         },
  //         expectedExpenses: items[0].expectedExpenses,
  //         actualExpenses: items[0].actualExpenses,
  //         actualDaysSpent: items[0].actualDaysSpent,
  //         purpose: items[0].purpose,
  //         extraInformation: items[0].extraInformationx,
  //         approverID: items[0].approverID,
  //         approvalStatus: 2,
  //         deleteFlag: items[0].deleteFlag,
  //       });
  //       const requestOptions = {
  //         //   method: "DELETE",
  //         //   headers: miHeaders,
  //         method: "POST",
  //         headers: myHeaders,
  //         body: raw,
  //         redirect: "follow",
  //       };
  //       fetch(`${process.env.REACT_APP_SHASHA_URL}/businessTravels/update`, requestOptions)
  //         .then(async (res) => {
  //           const aToken = res.headers.get("token-1");
  //           localStorage.setItem("rexxdex", aToken);
  //           return res.json();
  //         })
  //         .then((resx) => {
  //           console.log(resx);
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

  return {
    columns: [
      { Header: "Purpose", accessor: "purpose", align: "left" },
      { Header: "No Of Days Requested", accessor: "noOfDaysRequested", align: "left" },
      { Header: "No of Days Approved", accessor: "noOfDaysApproved", align: "left" },
      { Header: "Expected Expenses", accessor: "expectedExpenses", align: "left" },
      { Header: "Actual Expenses", accessor: "actualExpenses", align: "left" },
      { Header: "Extra Infromation", accessor: "extraInformation", align: "left" },
      { Header: "Decision Made By", accessor: "approverName", align: "left" },
      {
        Header: "Date Created",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeBranchDate(value),
        align: "left",
      },
      {
        Header: "Approval Status",
        // accessor: "approvalStatus",
        // Cell: ({ cell: { row } }) => (
        //   <span
        //     className="badge badge-pill"
        //     style={{ backgroundColor: changeCol(row.approvalStatus) }}
        //   >
        //     {changeType(row.id)}
        //   </span>
        // ),
        accessor: "approvalStatus",
        // eslint-disable-next-line react/prop-types
        Cell: ({ cell: { value } }) => (
          <span className="badge badge-pill" style={{ backgroundColor: changeStatusCol(value) }}>
            {changeStatus(value)}
          </span>
        ),
        align: "left",
      },
      {
        Header: "Status",
        accessor: "status",
        // eslint-disable-next-line react/prop-types
        Cell: ({ cell: { value } }) => (
          <span className="badge badge-pill" style={{ backgroundColor: changeStatusCol2(value) }}>
            {changeStatus2(value)}
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
              backgroundColor: "#dadada",
              borderRadius: "2px",
            }}
          >
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <Icon sx={{ fontWeight: "light" }}>settings</Icon>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate(`/business-travel/update?id=${value}`)}>
                  View/Update
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleapprove(value)}>Approve</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisapprove(value)}>Disapprove</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(`/business-travel/view?id=${value}`)}>
                  View Paticipant
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate(`/business-travel/forward-for-approval?id=${value}`)}
                >
                  Forward For Approval
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate(`/business-travel/mark-as-completed?id=${value}`)}
                >
                  Mark As Completed
                </Dropdown.Item>
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
