import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Icon from "@mui/material/Icon";
import GHeaders from "getHeader";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function CreditFacility() {
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();

  const [opened, setOpened] = useState(false);

  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    setOpened(true);
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/creditFacility/gets/${orgIDs}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
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
        console.log(result);
        if (isMounted) {
          setDataTable(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  console.log(dataTable);

  //  Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
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

  const pColumns = [
    {
      Header: "Client Name",
      accessor: "clientName",
      align: "left",
    },
    {
      Header: "Client Type",
      accessor: "clientType",
      Cell: ({ cell: { value } }) => handleOnClientType(value),
      align: "left",
    },
    {
      Header: "Type",
      accessor: "type",
      align: "left",
    },
    {
      Header: "Balance",
      accessor: "balance",
      align: "left",
    },
    // {
    //   Header: "Payment Time For ",
    //   accessor: "paymentTimeFor",
    //   Cell: ({ cell: { value } }) => changeDate(value),
    //   align: "left",
    // },
    {
      Header: "Created Time",
      accessor: "createdTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "Actions",
      accessor: "id",
      // eslint-disable-next-line react/prop-types
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
              <Dropdown.Item onClick={() => navigate(`/credit-Facility/make-payment?id=${value}`)}>
                Make Payment
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate(`/credit-Facility/view?id=${value}`)}>
                View
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
      align: "left",
    },
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Credit Facility
          </MDTypography>
        </MDBox>
        <DataTable
          table={{ columns: pColumns, rows: dataTable }}
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

export default CreditFacility;
