import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import { Dropdown } from "react-bootstrap";
import Icon from "@mui/material/Icon";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import "bootstrap/dist/css/bootstrap.min.css";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Export() {
  const [items, setItems] = useState([]);

  const [opened, setOpened] = useState(false);

  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/supply/gets/${orgIDs}`, { headers })
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
        setOpened(false);
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

  {
    const pColumns = [
      {
        Header: "title",
        accessor: "title",
        align: "left",
      },
      {
        Header: "quantity",
        accessor: "quantity",
        align: "left",
      },
      {
        Header: "Client Name",
        accessor: "clientName",
        align: "left",
      },
      {
        Header: "Client Type",
        accessor: "clientType",
        align: "left",
      },
      {
        Header: "supplying Branch Name",
        accessor: "supplyingBranchName",
        align: "left",
      },
      {
        Header: "Decision Made By",
        accessor: "approvedByName",
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
              <Dropdown.Toggle variant="secondary" id="dropdown-basic-button">
                <Icon sx={{ fontWeight: "light" }}>settings</Icon>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/Tickets/Chats")}>view</Dropdown.Item>
                <Dropdown.Item onClick={() => value} />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ),
        align: "center",
      },
    ];

    return (
      <DashboardLayout>
        <DashboardNavbar />
        &nbsp;
        <MDBox>
          <DataTable
            table={{ columns: pColumns, rows: items }}
            isSorted
            entriesPerPage
            showTotalEntries
            noEndBorder
            canSearch
          />
        </MDBox>
        <Footer />
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
          <CircularProgress color="info" />
        </Backdrop>
      </DashboardLayout>
    );
  }
}

export default Export;
