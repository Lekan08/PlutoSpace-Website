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

export default function InsuranceTableData() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  const handleUpdateInsurance = (value) => {
    navigate(`/insurance/update?id=${value}`);
  };

  const handleViewInsurance = (value) => {
    navigate(`/insurance/view?id=${value}`);
  };

  const handleInsuranceContribution = (value) => {
    navigate(`/insurance/contribution?id=${value}`);
  };

  const handleInsuranceDamage = (value) => {
    navigate(`/insurance/damage?id=${value}`);
  };

  // Method to handle diable
  const handleDisable = (idx, commentx) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f96d02",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, terminate it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const data11 = JSON.parse(localStorage.getItem("user1"));

        const personalIds = data11.personalID;
        const raw = JSON.stringify({
          id: idx,
          terminatedBy: personalIds,
          terminatingComment: commentx,
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insurance/terminate`, requestOptions)
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
      }
    });
  };

  // Method to handle terminate
  const handleTerminate = (value) => {
    MySwal.fire({
      title: "Terminate Insurance",
      html: ` <table><tr><td>
           <label for="comment">Comment*</label></td>
           <td><input type="text" id="comment" class="swal2-input"></td></tr><br>
           </table>`,
      confirmButtonText: "Save",
      showCancelButton: true,
      confirmButtonColor: "#f96d02",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const comment = Swal.getPopup().querySelector("#comment").value;
        if (!comment) {
          Swal.showValidationMessage(`Please enter reason for declining`);
        } else {
          Swal.resetValidationMessage();
          handleDisable(value, comment);
        }
      },
    });
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
      return "Running";
    }
    return "Terminated";
  };

  const changeCol = (status) => {
    const filteredItems = items.filter((item) => item.id === status);
    if (filteredItems[0].status === 0) {
      return "#0096FF";
    }
    return "#FF0000";
  };

  // Method to change display for client type
  const changeTypeDisplay = (value) => {
    if (value === 1) {
      return "Individual";
    }

    return "Corporate";
  };

  // Method to fetch all insurances
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insurance/gets/${orgIDs}`, { headers })
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
          console.log(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Return table
  return {
    columns: [
      {
        Header: "client type",
        accessor: "clientType",
        Cell: ({ cell: { value } }) => changeTypeDisplay(value),
        align: "left",
      },
      { Header: "client", accessor: "clientName", align: "left" },
      { Header: "insurance type", accessor: "type.name", align: "left" },
      { Header: "insurance plan", accessor: "plan.title", align: "left" },
      { Header: "to insure", accessor: "item", align: "left" },
      { Header: "worth (in NGN)", accessor: "itemWorth", align: "left" },
      { Header: "account owner", accessor: "accountOwnerName", align: "left" },
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
      {
        Header: "Created Date",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeDate(value),
        align: "left",
      },
      { Header: "terminated by", accessor: "terminatedByName", align: "left" },
      {
        Header: "Terminated Date",
        accessor: "terminatedTime",
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
                <Dropdown.Item onClick={() => handleUpdateInsurance(value)}>Update</Dropdown.Item>
                <Dropdown.Item onClick={() => handleViewInsurance(value)}>View</Dropdown.Item>
                <Dropdown.Item onClick={() => handleInsuranceContribution(value)}>
                  Contributions
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleInsuranceDamage(value)}>Damages</Dropdown.Item>
                <Dropdown.Item onClick={() => handleTerminate(value)}>Terminate</Dropdown.Item>
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
