// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

export default function SupplyTable() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  const handleUpdateSupply = (value) => {
    navigate(`/supply/update-Supply?id=${value}`);
  };

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

  // Method to handle disapproved
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

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
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
        Header: "Date Created",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeDate(value),
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
