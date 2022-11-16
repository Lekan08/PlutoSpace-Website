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

export default function DemandTable() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);
  // const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  // Method to handle update
  // Method to filter departments
  // const handleShow = (filteredData, value) => {
  //   let valuex = 0;
  //   // let descripx = "";
  //   let createdTime = 0;
  //   let deleteFlag = 0;
  //   // Avoid filter for empty string
  //   if (!value) {
  //     valuex = 0;
  //     //   descripx = "";
  //     createdTime = 0;
  //     deleteFlag = 0;
  //   } else {
  //     const filteredItems = filteredData.filter((item) => item.id === value);
  //     valuex = filteredItems[0].value;
  //     //   descripx = filteredItems[0].descrip;
  //     createdTime = filteredItems[0].createdTime;
  //     deleteFlag = filteredItems[0].deleteFlag;
  //   }
  //   MySwal.fire({
  //     title: "Update Amount",
  //     html: `<input type="number"  step= "0.01" id="name" value="${valuex}" class="swal2-input" placeholder="Amount">\
  //            `,
  //     confirmButtonText: "Save",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     preConfirm: () => {
  //       const valuexx = Swal.getPopup().querySelector("#name").value;
  //       // const descrip = Swal.getPopup().querySelector("#descrip").value;
  //       const id = value;
  //       const Number = /^[0-9.]+$/;
  //       if (valuexx.length > 0 && !valuexx.match(Number)) {
  //         Swal.showValidationMessage(`Please enter an amount <br> Amount can't be negative`);
  //       } else {
  //         // eslint-disable-next-line no-lonely-if
  //         if (valuexx === "0") {
  //           Swal.showValidationMessage(`Please enter an amount greater than zero(0)`);
  //         } else {
  //           handleUpdate(id, valuexx, createdTime, deleteFlag);
  //         }
  //       }
  //     },
  //   });
  // };
  // Method to handle diable

  // const handleDisable = (id) => {
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
  //       fetch(`${process.env.REACT_APP_LOUGA_URL}/demands/delete/${id}`, requestOptions)
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

  // Method to filter handledemandtosupply
  // const handleDemandToSupply = (filteredData, value) => {
  //   let titlex = 0;
  //   let uclientIDx = 0;
  //   let uclientTypex = 0;
  //   let quantityx = 0;
  //   let totalAmountx = 0;
  //   let ppQuantityx = 0;
  //   let productIDx = 0;
  //   let payAmountx = 0;
  //   let vatAmountx = 0;
  //   let bonusAmountx = 0;
  //   // Avoid filter for empty string
  //   if (!value) {
  //     titlex = 0;
  //     uclientIDx = 0;
  //     uclientTypex = 0;
  //     quantityx = 0;
  //     totalAmountx = 0;
  //     ppQuantityx = 0;
  //     productIDx = 0;
  //     payAmountx = 0;
  //     vatAmountx = 0;
  //     bonusAmountx = 0;
  //   } else {
  //     const filteredItems = filteredData.filter((item) => item.id === value);

  //     titlex = filteredItems[0].title;
  //     uclientIDx = filteredItems[0].uclientID;
  //     uclientTypex = filteredItems[0].uclientType;
  //     quantityx = filteredItems[0].quantity;
  //     ppQuantityx = filteredItems[0].ppQuantity;
  //     totalAmountx = filteredItems[0].totalAmount;
  //     productIDx = filteredItems[0].productID;
  //     payAmountx = filteredItems[0].payAmount;
  //     vatAmountx = filteredItems[0].vatAmount;
  //     bonusAmountx = filteredItems[0].bonusAmount;
  //   }

  //   MySwal.fire({
  //     title: "Demand to supply",
  //     confirmButtonText: "Save",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     preConfirm: () => {
  //       const id = value;
  //       handleDemandToSupplyx(
  //         id,
  //         titlex,
  //         quantityx,
  //         ppQuantityx,
  //         payAmountx,
  //         productIDx,
  //         vatAmountx,
  //         uclientIDx,
  //         bonusAmountx,
  //         totalAmountx,
  //         uclientTypex
  //       );
  //     },
  //   });
  // };
  // Method to handle approve
  const handleApproveDisapprove = (id, status) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIDs = data11.personalID;
    const approvedBy = personalIDs;
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
          `${process.env.REACT_APP_LOUGA_URL}/demands/approveOrDecline/${id}/${approvedBy}/${status}`,
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
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/demands/gets/${orgIDs}`, {
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
        console.log(result);
        if (isMounted) {
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdateDemand = (value) => {
    navigate(`/demand/update-Demand?id=${value}`);
  };
  const handleDemandToSupplyx = (value) => {
    navigate(`/demand/convertDemandToSupply?id=${value}`);
  };

  const handleViewDemand = (value) => {
    navigate(`/demand/view-Demand?id=${value}`);
  };
  // eslint-disable-next-line consistent-return
  const handleOnClient = (clientTypes) => {
    if (clientTypes === 1) {
      return "Individual";
    }
    if (clientTypes === 2) {
      return "Corporate";
    }
  };
  // eslint-disable-next-line consistent-return
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
      return "REJECTED";
    }
    return "#00e600";
  };

  // Return tableclienttype supplying branchgname client name supplying branch name paying amoumt approvbyname
  return {
    columns: [
      { Header: "Title", accessor: "title", align: "left" },
      { Header: "Quantity", accessor: "quantity", align: "left" },
      { Header: "Product Name", accessor: "productName", align: "left" },
      { Header: "Client Name", accessor: "clientName", align: "left" },
      {
        Header: "Client Type",
        accessor: "clientType",
        Cell: ({ cell: { value } }) => handleOnClient(value),
        align: "left",
      },
      { Header: "Paying Amount", accessor: "payingAmount", align: "left" },
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
                <Dropdown.Item onClick={() => handleUpdateDemand(value)}>Update</Dropdown.Item>
                <Dropdown.Item onClick={() => handleViewDemand(value)}>View</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDemandToSupplyx(value)}>
                  Demand To Supply
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleApproveDisapprove(value, 1)}>
                  Approve
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleApproveDisapprove(value, 2)}>
                  Disapprove
                </Dropdown.Item>
                {/* <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item> */}
                {/* <Dropdown.Item onClick={() => handleDisable(value)}>Decline</Dropdown.Item> */}
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
