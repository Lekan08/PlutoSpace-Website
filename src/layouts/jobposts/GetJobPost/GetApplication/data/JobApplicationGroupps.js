// eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components

import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

export default function JobApplicationGroupp() {
  const [items, setItems] = useState([]);
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };
  // Method to fetch all timeofftype
  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    console.log(id);
    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/jobApplication/getForPost/${id}`, { headers })
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

  // Return table
  return {
    columns: [
      { Header: "employeeID", accessor: "empID", align: "left" },
      { Header: "Type", acccessor: "type", align: "left" },
      { Header: "Application Time", accessor: "applicationTime", align: "left" },
      { Header: "Status", accessor: "status", align: "left" },
      { Header: "Rescinded", accessor: "rescinded", align: "left" },
      {
        Header: "Date Created",
        accessor: "rescindedTime",
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
                <Dropdown.Item onClick={() => navigate(`/View-Group?id=${value}`)}>
                  View job post
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
