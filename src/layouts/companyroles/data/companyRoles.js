/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import PHeaders from "postHeader";
import GHeaders from "getHeader";

export default function ComRole() {
  const MySwal = withReactContent(Swal);
  // const axios = require("axios");
  const [items, setItems] = useState([]);

  // use of navigate button
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // Method to handle update
  const handleUpdate = (idx, namex, descripx, deleteFlagx, createdTimex) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      name: namex,
      descrip: descripx,
      deleteFlag: deleteFlagx,
      craetedTime: createdTimex,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_KUBU_URL}/role/update`, requestOptions)
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
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
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

  // Method to filter departments
  const handleShow = (filteredData, value) => {
    let namex = "";
    let descripx = "";
    let createdTimex = 0;
    let deleteFlagx = 0;
    // Avoid filter for empty string
    if (!value) {
      namex = "";
      descripx = "";
      createdTimex = 0;
      deleteFlagx = 0;
    } else {
      const filteredItems = filteredData.filter((item) => item.id === value);

      namex = filteredItems[0].name;
      descripx = filteredItems[0].descrip;
      createdTimex = filteredItems[0].createdTime;
      deleteFlagx = filteredItems[0].deleteFlag;
    }
    MySwal.fire({
      title: "Update Company Role",
      html: `<table><tr><td>
        <label for="name">Name</label></td>
        <td><input type="text" class="swal2-input" id="name" value="${namex}" placeholder="Name"></td></tr>
        <tr><td><label for="description">Description</label></td>
        <td><input type="text" class="swal2-input" id="descrip" value="${descripx}" placeholder="Description"></td>`,
      confirmButtonText: "Save",
      showCancelButton: true,
      confirmButtonColor: "#f96d02",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name").value;
        const descrip = Swal.getPopup().querySelector("#descrip").value;
        const id = value;
        if (!name) {
          Swal.showValidationMessage(`Please enter name`);
        }
        handleUpdate(id, name, descrip, deleteFlagx, createdTimex);
      },
    });
  };

  // Method to handle diable
  const handleDisable = (value) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f96d02",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(`${process.env.REACT_APP_KUBU_URL}/role/delete/${value}`, requestOptions)
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

  // Method to fetch all companyroles
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/role/gets/${orgIDs}`, { headers })
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

  return {
    columns: [
      { Header: "name", accessor: "name", align: "left" },
      { Header: "description", accessor: "descrip", align: "left" },
      {
        Header: "actions",
        accessor: "id",
        Cell: ({ cell: { value } }) => (
          <div
            style={{
              width: "100%",
              backgroundColor: "#f96d02",
              borderRadius: "2px",
            }}
          >
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <Icon sx={{ fontWeight: "light" }}>settings</Icon>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(`/Company-Roles/Add-Steps?id=${value}`)}>
                  Add Company Steps
                </Dropdown.Item>
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
