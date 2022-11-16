// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

export default function SupplyTable() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

  // const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  const handleUpdateSupply = (value) => {
    navigate(`/supply/update-Supply?id=${value}`);
  };

  // Method to handle update
  // Method to handle diable
  function handleDisable(id) {
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
      confirmButtonText: "Yes, Terminate it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };
        fetch(
          `${process.env.REACT_APP_LOUGA_URL}/supply/terminate/${id}/${terminatedBy}`,
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
  }
  // Method to handle confirm
  // const handleConfirm = (id) => {
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const personalIDs = data11.personalID;
  //   const approvedBy = personalIDs;
  //   const status = 1;
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
  //       const headers = miHeaders;
  //       fetch(
  //         `${process.env.REACT_APP_LOUGA_URL}/supply/approveOrDecline/${id}/${approvedBy}/${status}`,
  //         {
  //           headers,
  //         }
  //       )
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
  // Method to handle approved
  const handleapprove = (id) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIDs = data11.personalID;
    const approvedBy = personalIDs;
    const status = 1;
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
        const headers = miHeaders;
        fetch(
          `${process.env.REACT_APP_LOUGA_URL}/supply/approveOrDecline/${id}/${approvedBy}/${status}`,
          {
            headers,
          }
        )
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

  // Method to handle approved
  const handleDisapprove = (id) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIDs = data11.personalID;
    const approvedBy = personalIDs;
    const status = 2;
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
        const headers = miHeaders;
        fetch(
          `${process.env.REACT_APP_LOUGA_URL}/supply/approveOrDecline/${id}/${approvedBy}/${status}`,
          {
            headers,
          }
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
  // Method to handle Disapproved
  // function handleDisapproved(id) {
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const personalIDs = data11.personalID;
  //   const terminatedBy = personalIDs;
  //   MySwal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, Terminate it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const requestOptions = {
  //         method: "DELETE",
  //         headers: miHeaders,
  //       };
  //       fetch(
  //         `${process.env.REACT_APP_LOUGA_URL}/supply/terminate/${id}/${terminatedBy}`,
  //         requestOptions
  //       )
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
  // }
  // function handleDisapproved(id) {
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const personalIDs = data11.personalID;
  //   const terminatedBy = personalIDs;
  //   MySwal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, Terminate it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const requestOptions = {
  //         method: "DELETE",
  //         headers: miHeaders,
  //       };
  //       fetch(
  //         `${process.env.REACT_APP_LOUGA_URL}/supply/terminate/${id}/${terminatedBy}`,
  //         requestOptions
  //       )
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
  // }
  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };
  //   const changeStartTime = (timestamp) => {
  //     // const startTime = new Date(timestamp);
  //   };
  //   const changeStartTime = (timestamp) => {
  //     const date = new Date(timestamp);
  //     const retDate = date.Time();
  //     return retDate;
  //   };
  //   const changeEndTime = (timestamp) => {
  //     const date = new time(timestamp);
  //     const retTime = date.time();
  //     return retTime;
  //   };
  // date1 = new DateTime(timestamp);
  // const getCurrentDate = () => new Date().getTime();

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    // const startTime = new Date(timestamp);
    // // console.log(startTime);
    // // const startTimex = startTime(timestamp);
    // // console.log(startTimex);
    // const endTime = new Date(timestamp);
    // console.log(endTime);
    // const endTimex = endTime(timestamp);
    // console.log(endTimex);
    const date = new Date();
    const startTime = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const endTime = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();

    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_LOUGA_URL}/supply/gets/${orgIDs}?startTime=${startTime}&endTime=${endTime}`,
      {
        headers,
      }
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
          console.log(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // eslint-disable-next-line consistent-return
  const handleOnClientType = (clientType) => {
    if (clientType === 1) {
      return "Individual";
    }
    if (clientType === 2) {
      return "Corporate";
    }
  };
  // eslint-disable-next-line consistent-return
  // const handleStatus = (status) => {
  //   if (status === 0) {
  //     return "";
  //   }
  //   if (status === 1) {
  //     return "APPROVED";
  //   }
  //   if (status === 2) {
  //     return "DISAPPROVED";
  //   }
  // };
  // Method to change Color

  const changeCol = (status) => {
    if (status === 1) {
      return "#3CCF4E";
    }
    if (status === 2) {
      return "#FF0000";
    }
    return "#FFFFFF";
  };
  const changeStatusCol = (value) => {
    if (value === 1) {
      return "APPROVED";
    }
    if (value === 2) {
      return "DISAPPROVED";
    }
    return "#00e600";
  };

  const handleViewSupply = (value) => {
    navigate(`/supply/view-Supply?id=${value}`);
  };

  // Return tableclienttype supplying branchgname client name supplying branch name paying amoumt approvbyname

  return {
    columns: [
      { Header: "Title", accessor: "title", align: "left" },
      { Header: "Quantity", accessor: "quantity", align: "left" },
      { Header: "Client Name", accessor: "clientName", align: "left" },
      {
        Header: "Client Type",
        accessor: "clientType",
        Cell: ({ cell: { value } }) => handleOnClientType(value),
        align: "left",
      },
      { Header: "Supplying Branch Name", accessor: "supplyingBranchName", align: "left" },
      { Header: "Decision Made By", accessor: "approvedByName", align: "left" },
      {
        Header: "Date Created",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeDate(value),
        align: "left",
      },
      {
        Header: "Status",
        accessor: "status",

        // eslint-disable-next-line react/prop-types
        Cell: ({ cell: { value } }) => (
          <span className="badge badge-pill" style={{ backgroundColor: changeCol(value) }}>
            {changeStatusCol(value)}
          </span>
        ),
        //   // eslint-disable-next-line react/prop-types
        //   // Cell: ({ cell: { status } }) => (
        //   //   <span className="badge badge-pill" style={{ backgroundColor: changeStatusCol(status) }}>
        //   //     {changeStatusCol(status)}
        //   //   </span>
        //   // ),
        //   align: "left",
        // },
        // {
        //   Header: "Status",
        //   accessor: "status",
        //   Cell: ({ cell: { value } }) => handleStatus(value),
        //   align: "left",
      },
      {
        Header: "actions",
        accessor: "id",
        // eslint-disable-next-line react/prop-types
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
                <Dropdown.Item onClick={() => handleUpdateSupply(value)}>Update</Dropdown.Item>
                <Dropdown.Item onClick={() => handleViewSupply(value)}>View Supply</Dropdown.Item>
                {/* <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item> */}
                {/* <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item> */}
                {/* <Dropdown.Item onClick={() => handleConfirm(value)}>Confirm</Dropdown.Item> */}
                <Dropdown.Item onClick={() => handleapprove(value)}>Approve</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisapprove(value)}>Disapprove</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable(value)}>Terminate</Dropdown.Item>
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
