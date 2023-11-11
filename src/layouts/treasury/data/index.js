import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GHeaders from "getHeader";
// import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
// big zz dey write abegg

export default function TreasuryTable() {
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
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/treasury/gets/${orgIDs}`, { headers })
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

        fetch(`${process.env.REACT_APP_LOUGA_URL}/treasury/delete/${val}`, requestOptions)
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

  const handleShow = (value) => {
    navigate(`/treasury/update?id=${value}`);
  };

  // eslint-disable-next-line consistent-return
  const handleOnClientType = (clientType) => {
    if (clientType === 1) {
      return "Individual";
    }
    if (clientType === 2) {
      return "Corporate";
    }
  };

  const changeStatus = (value) => {
    if (value === 1) {
      return "Approved";
      // eslint-disable-next-line no-else-return
    } else if (value === 2) {
      return "Declined";
    }
    return "No Decision Made";
  };

  const handleTreasuryContribution = (value, amount) => {
    console.log(amount);
    // const amountxx = amount.filter(items.id === value);
    const amountxx = amount.filter((x) => x.id === value);
    console.log(amountxx);
    const finalAmount = amountxx[0].amount;
    console.log(finalAmount);
    navigate(`/treasury/treasury-Contribution?id=${value}&amount=${finalAmount}`);
  };

  // Method to handle approved
  const handleapprove = (id) => {
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
        fetch(`${process.env.REACT_APP_LOUGA_URL}/treasury/approve/${id}/${approvedBy}`, {
          headers,
        })
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

  return {
    columns: [
      { Header: "Amount", accessor: "amount", align: "left" },
      { Header: "Client Name", accessor: "clientName", align: "left" },
      { Header: "Treasury Type", accessor: "type.name", align: "left" },
      {
        Header: "Client Type",
        accessor: "clientType",
        Cell: ({ cell: { value } }) => handleOnClientType(value),
        align: "left",
      },
      {
        Header: "Status",
        accessor: "clientType",
        Cell: ({ cell: { value } }) => changeStatus(value),
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
                <Dropdown.Item onClick={() => handleShow(value)}>Update</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
                <Dropdown.Item onClick={() => handleapprove(value)}>Approve </Dropdown.Item>
                <Dropdown.Item onClick={() => handleTreasuryContribution(value, items)}>
                  Treasury Contribution
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
