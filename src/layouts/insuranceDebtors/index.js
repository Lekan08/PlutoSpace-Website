/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "react-datepicker/dist/react-datepicker.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Icon from "@mui/material/Icon";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
// import InsuranceDamageTable from "layouts/insurance/damage/data/insuranceDamageTableData";

function InsuranceDebtors() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insurance/getDueContributions/${orgIDs}`, {
      headers,
    })
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
          console.log(result);
          setItems(result);
          setOpened(false);
        }
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
    return () => {
      isMounted = false;
    };
  }, []);

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
  const handleInsuranceContribution = (value) => {
    navigate(`/insurance/contribution?id=${value}`);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={4} px="10vw">
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            style={{ backgroundColor: "#f96d02" }}
            mx={6}
            mt={1}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Due Insurance Contributions
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox pt={3}>
        {/* <DataTable
          table={{ columns: pColumns, rows: pRows }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        /> */}
        <MDBox>
          <DataTable
            table={{
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
                          <Dropdown.Item onClick={() => handleInsuranceContribution(value)}>
                            Make Contribution
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  ),
                  align: "left",
                },
              ],
              rows: items,
            }}
            isSorted
            entriesPerPage
            showTotalEntries
            noEndBorder
            canSearch
          />
        </MDBox>
      </MDBox>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default InsuranceDebtors;
