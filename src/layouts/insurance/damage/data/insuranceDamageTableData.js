// Soft UI Dashboard React components
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

export default function InsuranceDamageTableData() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  // Method to handle update
  const handleUpdate = (idx, cash, card, check) => {
    const filteredItems = items.filter((item) => item.id === idx);
    const raw = JSON.stringify({
      id: idx,
      orgID: filteredItems[0].orgID,
      insuranceID: filteredItems[0].insuranceID,
      cashPaymentAmount: cash,
      cardPaymentAmount: card,
      checkPaymentAmount: check,
      createdTime: filteredItems[0].createdTime,
      createdBy: filteredItems[0].createdBy,
      status: filteredItems[0].status,
      approvedBy: filteredItems[0].approvedBy,
      approvedTime: filteredItems[0].approvedTime,
      approvedComment: filteredItems[0].approvedComment,
      deleteFlag: filteredItems[0].deleteFlag,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insuranceContribution/update`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        MySwal.fire({
          title: resultx.status,
          type: "success",
          text: resultx.message,
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
  };

  const handleUpdateInsuranceDamage = (value) => {
    let cashx = 0;
    let cardx = 0;
    let checkx = 0;
    // Avoid filter for empty string
    if (!value) {
      cashx = 0;
      cardx = 0;
      checkx = 0;
    } else {
      const filteredItems = items.filter((item) => item.id === value);

      cashx = filteredItems[0].cashPaymentAmount;
      cardx = filteredItems[0].cardPaymentAmount;
      checkx = filteredItems[0].checkPaymentAmount;
    }
    MySwal.fire({
      title: "Update Insurance Contribution",
      html: ` <table><tr><td>
                 <label for="cash">Cash (NGN)</label></td>
                 <td><input type="text" id="cash" value="${cashx}" class="swal2-input"></td></tr><br>
                 <tr><td>
                 <label for="cash">Card (NGN)</label></td>
                 <td><input type="text" id="card" value="${cardx}" class="swal2-input"></td></tr><br>
                 <tr><td>
                 <label for="cash">Check (NGN)</label></td>
                 <td><input type="text" id="check" value="${checkx}" class="swal2-input"></td></tr><br>
                 </table>`,
      confirmButtonText: "Save",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const cash = Swal.getPopup().querySelector("#cash").value;
        const card = Swal.getPopup().querySelector("#card").value;
        const check = Swal.getPopup().querySelector("#check").value;
        const number = /^[0-9.]+$/;
        if (
          (cash.length > 0 && !cash.match(number)) ||
          (card.length > 0 && !card.match(number)) ||
          (check.length > 0 && !check.match(number))
        ) {
          Swal.showValidationMessage(`Please enter valid inputs for cash, card and check payments`);
        } else if (Number(card) === 0 && Number(cash) === 0 && Number(check) === 0) {
          Swal.showValidationMessage(`Amount is required whether check or cash or card`);
        } else {
          Swal.resetValidationMessage();
          handleUpdate(value, cash, card, check);
        }
      },
    });
  };

  // Method to handle disable
  const handleDisable = (value) => {
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
          `${process.env.REACT_APP_JOHANNESBURG_URL}/insuranceDamageRequest/delete/${value}`,
          requestOptions
        )
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

  // Method to handle decision making
  const handleDecisionMaking = (idx, commentx, statusx) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const personalIds = data11.personalID;
    const raw = JSON.stringify({
      id: idx,
      approvedBy: personalIds,
      status: statusx,
      approvedComment: commentx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_JOHANNESBURG_URL}/insuranceDamageRequest/approveOrDecline`,
      requestOptions
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        MySwal.fire({
          title: resultx.status,
          type: "success",
          text: resultx.message,
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
  };

  // Method to handle decision making on insurance damage request
  const handleDecisionInsurance = (value, status) => {
    if (status === 1) {
      MySwal.fire({
        title: "Approve Insurance Damage Request",
        html: ` <table><tr><td>
                 <label for="comment">Comment*</label></td>
                 <td><input type="text" id="comment" class="swal2-input"></td></tr><br>
                 </table>`,
        confirmButtonText: "Save",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        preConfirm: () => {
          const comment = Swal.getPopup().querySelector("#comment").value;
          if (!comment) {
            Swal.showValidationMessage(`Please enter reason for approving`);
          } else {
            Swal.resetValidationMessage();
            handleDecisionMaking(value, comment, status);
          }
        },
      });
    } else {
      MySwal.fire({
        title: "Decline Insurance Damage Request",
        html: ` <table><tr><td>
                     <label for="comment">Comment*</label></td>
                     <td><input type="text" id="comment" class="swal2-input"></td></tr><br>
                     </table>`,
        confirmButtonText: "Save",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        preConfirm: () => {
          const comment = Swal.getPopup().querySelector("#comment").value;
          if (!comment) {
            Swal.showValidationMessage(`Please enter reason for declining`);
          } else {
            Swal.resetValidationMessage();
            handleDecisionMaking(value, comment, status);
          }
        },
      });
    }
  };

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    if (timestamp <= 0) return "";
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  // Method to change display for status
  const changeStatus = (status) => {
    const filteredItems = items.filter((item) => item.id === status);
    if (filteredItems[0].status === 0) {
      return "Created";
    }
    if (filteredItems[0].status === 1) {
      return "Approved";
    }
    return "Declined";
  };

  const changeCol = (status) => {
    const filteredItems = items.filter((item) => item.id === status);
    if (filteredItems[0].status === 0) {
      return "#0096FF";
    }
    if (filteredItems[0].status === 1) {
      return "#00FF00";
    }
    return "#FF0000";
  };

  // Method to fetch all insurance damage requests
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_JOHANNESBURG_URL}/insuranceDamageRequest/getForInsurance/${orgIDs}/${ids}`,
      { headers }
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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

  // Return table
  return {
    columns: [
      { Header: "created by", accessor: "createdByName", align: "left" },
      { Header: "damage amount (in NGN)", accessor: "damageAmount", align: "left" },
      { Header: "damage contribution (in NGN)", accessor: "damageContribution", align: "left" },
      {
        Header: "Created Date",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeDate(value),
        align: "left",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell: { row } }) => (
          <span
            className="badge badge-pill"
            style={{ backgroundColor: changeCol(row.original.id) }}
          >
            {changeStatus(row.original.id)}
          </span>
        ),
        align: "left",
      },
      { Header: "decision by", accessor: "approvedByName", align: "left" },
      {
        Header: "Decision Date",
        accessor: "approvedTime",
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
              backgroundColor: "#dadada",
              borderRadius: "2px",
            }}
          >
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <Icon sx={{ fontWeight: "light" }}>settings</Icon>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleUpdateInsuranceDamage(value)}>
                  Update
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDecisionInsurance(value, 1)}>
                  Approve
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDecisionInsurance(value, 2)}>
                  Decline
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ),
        align: "left",
      },
    ],

    rows: items,
  };
}
