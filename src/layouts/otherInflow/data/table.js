/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GHeaders from "getHeader";
// import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
// import Styles from "styles";
// big Zzz dey write code abegg

export default function OtherInflowntable() {
  const { allGHeaders: miHeaders } = GHeaders();
  //   const { allPHeaders: myHeaders } = PHeaders();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const changeBranchDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const idx = data11.personalID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/otherInflow/getForEmp/${orgIDs}/${idx}`, { headers })
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
        console.log(result);
        if (isMounted) {
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

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

        fetch(`${process.env.REACT_APP_LOUGA_URL}/otherInflow/delete/${val}`, requestOptions)
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

  const handleUpdate = (value) => {
    navigate(`/other-Inflow/update?id=${value}`);
  };

  const handleApprove = (id) => {
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
          `${process.env.REACT_APP_LOUGA_URL}/otherInflow/approveOrDecline/${id}/${approvedBy}/${status}`,
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

  const changeStatus2 = (value) => {
    console.log(value);
    console.log(value.id);
    console.log(value.toString());
    // const Opp = value.toString();
    if (value === 1) {
      return "Approved";
    }
    if (value === 2) {
      return "Disapproved";
    }
    if (value === 0) {
      return "No Decision Made";
    }
    // return "No Decision Made";
  };

  const changeStatusCol2 = (value) => {
    // const Opp = value.toString();
    if (value === 1) {
      return "	#808000";
    }
    if (value === 2) {
      return "#f96d02";
    }
    if (value === 0) {
      return "#800000";
    }
    // return "#ff0000";
  };

  const handleDisApprove = (id) => {
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
          `${process.env.REACT_APP_LOUGA_URL}/otherInflow/approveOrDecline/${id}/${approvedBy}/${status}`,
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

  //   const handleUpdate = (idx, namex, descripx, createdTimex, deleteFlagx) => {
  //     const data11 = JSON.parse(localStorage.getItem("user1"));

  //     const orgIDs = data11.orgID;
  //     const raw = JSON.stringify({
  //       id: idx,
  //       orgID: orgIDs,
  //       name: namex,
  //       descrip: descripx,
  //       createdTime: createdTimex,
  //       deleteFlag: deleteFlagx,
  //     });
  //     const requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };

  //     fetch(`${process.env.REACT_APP_LOUGA_URL}/otherInflowTypes/update`, requestOptions)
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         const resultres = await res.text();
  //         if (resultres === null || resultres === undefined || resultres === "") {
  //           return {};
  //         }
  //         return JSON.parse(resultres);
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
  //         MySwal.fire({
  //           title: result.status,
  //           type: "success",
  //           text: result.message,
  //         }).then(() => {
  //           window.location.reload();
  //         });
  //       })
  //       .catch((error) => {
  //         MySwal.fire({
  //           title: error.status,
  //           type: "error",
  //           text: error.message,
  //         });
  //       });
  //   };

  //   // Method to filter other inflows
  //   const handleShow = (filteredData, value) => {
  //     let namex = "";
  //     let descripx = "";
  //     let createdTime = 0;
  //     let deleteFlag = 0;
  //     // Avoid filter for empty string
  //     if (!value) {
  //       namex = "";
  //       descripx = "";
  //       createdTime = 0;
  //       deleteFlag = 0;
  //     } else {
  //       const filteredItems = filteredData.filter((item) => item.id === value);

  //       namex = filteredItems[0].name;
  //       descripx = filteredItems[0].descrip;
  //       createdTime = filteredItems[0].createdTime;
  //       deleteFlag = filteredItems[0].deleteFlag;
  //     }

  //     MySwal.fire({
  //       title: "Update Other Inflow Type",
  //       html: ` <table><tr><td>
  //            <label for="Name">Name</label></td>
  //            <td><input type="text" id="name" value="${namex}" class="swal2-input" placeholder="Name"></td></tr><br>
  //            <tr><td><label for="descrip">Description</label></td>
  //            <td><input type="text" class="swal2-input" id="descrip" value="${descripx}" placeholder="Description"></td></tr>
  //            </td></tr></table>`,
  //       confirmButtonText: "Save",
  //       showCancelButton: true,
  //       confirmButtonColor: "#f96d02",
  //       cancelButtonColor: "#d33",
  //       preConfirm: () => {
  //         const name = Swal.getPopup().querySelector("#name").value;
  //         const descrip = Swal.getPopup().querySelector("#descrip").value;
  //         const id = value;
  //         if (!name) {
  //           Swal.showValidationMessage(`Please enter name`);
  //         }
  //         handleUpdate(id, name, descrip, createdTime, deleteFlag);
  //       },
  //     });
  //   };

  return {
    columns: [
      { Header: "Amount", accessor: "amount", align: "left" },
      { Header: "Tax Amount", accessor: "taxAmount", align: "left" },
      { Header: "Total Amount", accessor: "totalAmount", align: "left" },
      { Header: "Other Inflow Type", accessor: "otherInflowType.name", align: "left" },
      { Header: "Particulars", accessor: "particulars", align: "left" },
      //   { Header: "Approved Status", accessor: "approveStatus", align: "left" },
      {
        Header: "Date Created",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeBranchDate(value),
        align: "left",
      },
      {
        Header: "Approver Status",
        accessor: "approveStatus",
        // eslint-disable-next-line react/prop-types
        Cell: ({ cell: { value } }) => (
          <span className="badge badge-pill" style={{ backgroundColor: changeStatusCol2(value) }}>
            {changeStatus2(value)}
          </span>
        ),
        align: "left",
      },
      //   {
      //     Header: "Approved Status",
      //     accessor: "approveStatus",
      //     // eslint-disable-next-line react/prop-types
      //     Cell: ({ cell: { row } }) => (
      //       <span
      //         className="badge badge-pill"
      //         style={{ backgroundColor: changeStatusCol2(row.original.approveStatus.toString()) }}
      //         // eslint-disable-next-line react/jsx-no-comment-textnodes
      //       >
      //         {changeStatus2(row.original.approveStatus.toString())}
      //       </span>
      //     ),
      //     align: "left",
      //   },
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
                <Dropdown.Item onClick={() => handleUpdate(value)}>Update</Dropdown.Item>
                <Dropdown.Item onClick={() => handleApprove(value, items)}>Approve</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisApprove(value, items)}>
                  Disapprove
                </Dropdown.Item>
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
