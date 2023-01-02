import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import { useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import GHeaders from "getHeader";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import accountingLoader from "./accountingLoader.gif";

function AccountHistory() {
  const { allGHeaders: miHeaders } = GHeaders();

  const [accountDetails, setAccountDetails] = useState([]);
  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    setOpened(true);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/accounting/gets/${orgIDs}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
          console.log(result);
          if (result.length !== 0) {
            console.log(result);
            setAccountDetails(result);
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePDF = (value) => {
    console.log(value);
  };

  // Method to change type
  const changeType = (valuee) => {
    let colorr = "#000000";
    let typex = "";
    const num = Number(valuee);
    if (num === 1) {
      colorr = "#B01E68";
      typex = "DAILY";
    } else if (num === 2) {
      colorr = "#DC3535";
      typex = "MONTHLY";
    } else if (num === 3) {
      colorr = "#F49D1A";
      typex = "YEARLY";
    }
    const colorChange = {
      value: typex,
      color: colorr,
    };
    return colorChange;
  };

  //  Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  const ValuesToCommaIndented = (values) => {
    const num = Number(values);
    return num.toLocaleString(undefined);
  };

  const changeColor = (valuee) => {
    let colorr = "#f96d02";
    if (valuee > 0) {
      colorr = "#4E9F3D";
    } else if (valuee < 0) {
      colorr = "#CF0A0A";
    }
    const colorChange = {
      value: ValuesToCommaIndented(valuee),
      color: colorr,
    };
    return colorChange;
  };

  // Table for Data
  const pColumns = [
    {
      Header: "Closing Balance ",
      accessor: "closingBalance",
      // eslint-disable-next-line react/prop-types
      Cell: ({ cell: { value } }) => (
        <span
          className="badge badge-pill"
          style={{ backgroundColor: changeColor(value).color, fontSize: "100%" }}
        >
          {changeColor(value).value}
        </span>
      ),
      align: "left",
    },
    {
      Header: "Type",
      accessor: "type",
      // eslint-disable-next-line react/prop-types
      Cell: ({ cell: { value } }) => (
        <span
          className="badge badge-pill"
          style={{ backgroundColor: changeType(value).color, fontSize: "100%" }}
        >
          {changeType(value).value}
        </span>
      ),
      align: "left",
    },
    {
      Header: "Created By",
      accessor: "createdByName",
      align: "left",
    },
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
              <Dropdown.Item onClick={() => handlePDF(value)}>Download As PDF</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
      align: "left",
    },
  ];

  return (
    <>
      <Card>
        <MDBox pt={4} pb={3} px={30}>
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            style={{ backgroundColor: "#f96d02" }}
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Account History
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: accountDetails }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox>
      <Footer />{" "}
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={accountingLoader}
              alt="work"
              style={{
                height: "50%",
                width: "35%",
              }}
            />
            {/* <CircularProgress color="info" /> */}
          </div>
        </>
      </Backdrop>
    </>
  );
}

export default AccountHistory;
