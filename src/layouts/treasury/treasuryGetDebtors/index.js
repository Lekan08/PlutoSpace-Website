import React, { useState } from "react";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import { Form, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Styles from "styles";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// Zinoleesky

function TreasuryDebtors() {
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();

  const [opened, setOpened] = useState(false);

  const [dataTable, setDataTable] = useState([]);
  const [recurringTypex, setRecurringType] = useState("");

  //   useEffect(() => {
  //     const data11 = JSON.parse(localStorage.getItem("user1"));

  //     const orgIDs = data11.orgID;
  //     const headers = miHeaders;
  //     const currentYear = new Date().getFullYear(); // 2023

  //     const previousYear = currentYear - 1;
  //     let isMounted = true;
  //     fetch(`${process.env.REACT_APP_LOUGA_URL}/treasury/getDebtors/${orgIDs}/${previousYear}`, {
  //       headers,
  //     })
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         return res.json();
  //       })
  //       .then((result) => {
  //         if (result.message === "Expired Access") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (result.message === "Token Does Not Exist") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (result.message === "Unauthorized Access") {
  //           navigate("/authentication/forbiddenPage");
  //           window.location.reload();
  //         }
  //         console.log(result);
  //         if (isMounted) {
  //           setDataTable(result);
  //         }
  //       });
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);

  const handleFilter = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const isMounted = true;
    const headers = miHeaders;
    if (recurringTypex === "Daily") {
      const aDate = new Date();
      const startOfTheDay = new Date(aDate.getTime() - (aDate.getTime() % 86400000));
      console.log(startOfTheDay);
      const timeStamp = new Date().getTime(startOfTheDay);
      console.log(timeStamp);
      fetch(`${process.env.REACT_APP_LOUGA_URL}/treasury/getDebtors/${orgIDs}/${timeStamp}`, {
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
          if (isMounted) {
            setDataTable(result);
          }
        });
    } else if (recurringTypex === "Weekly") {
      const dt = new Date(); // current date of week
      const currentWeekDay = dt.getDay();
      // eslint-disable-next-line eqeqeq
      const lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
      const wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
      const wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6));
      console.log(wkEnd);
      const timeStamp = new Date().getTime(wkEnd);
      console.log(timeStamp);
      fetch(`${process.env.REACT_APP_LOUGA_URL}/treasury/getDebtors/${orgIDs}/${timeStamp}`, {
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
          if (isMounted) {
            setDataTable(result);
          }
        });
    } else if (recurringTypex === "Monthly") {
      const date = new Date();
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      console.log(firstDay);
      const timeStamp = new Date().getTime(firstDay);
      console.log(timeStamp);
      fetch(`${process.env.REACT_APP_LOUGA_URL}/treasury/getDebtors/${orgIDs}/${timeStamp}`, {
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
          if (isMounted) {
            setDataTable(result);
          }
        });
    } else if (recurringTypex === "Yearly") {
      const currentYear = new Date().getFullYear(); // 2023

      const previousYear = currentYear - 1;
      console.log(previousYear);
      fetch(`${process.env.REACT_APP_LOUGA_URL}/treasury/getDebtors/${orgIDs}/${previousYear}`, {
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
          if (isMounted) {
            setDataTable(result);
          }
        });
    }
  };
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
      Header: "Treasury Type",
      accessor: "type.name",
      align: "left",
    },
    {
      Header: "Amount",
      accessor: "amount",
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
    // {
    //   Header: "Actions",
    //   accessor: "id",
    //   // eslint-disable-next-line react/prop-types
    //   Cell: ({ cell: { value } }) => (
    //     <div
    //       style={{
    //         width: "100%",
    //         backgroundColor: "#f96d02",
    //         borderRadius: "2px",
    //       }}
    //     >
    //       <Dropdown>
    //         <Dropdown.Toggle variant="secondary" id="dropdown-basic">
    //           <Icon sx={{ fontWeight: "light" }}>settings</Icon>
    //         </Dropdown.Toggle>

    //         <Dropdown.Menu>
    //           <Dropdown.Item onClick={() => handleUpdate(value, dataTablex)}>Update </Dropdown.Item>
    //           <Dropdown.Item onClick={() => handleDelete(value)}>Delete </Dropdown.Item>
    //           <Dropdown.Item onClick={() => handleapprove(value)}>Approve </Dropdown.Item>
    //         </Dropdown.Menu>
    //       </Dropdown>
    //     </div>
    //   ),
    //   align: "left",
    // },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={30}>
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
            style={Styles.boxSx}
          >
            <MDTypography variant="h4" fontWeight="regular" color="white" mt={1}>
              Filter Debtors
            </MDTypography>
          </MDBox>
          <br />
          <MDBox component="form" role="form">
            <MDBox mb={0}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDTypography
                      variant="p"
                      textAlign="center"
                      fontWeight="regular"
                      color="secondary"
                      fontSize="90%"
                    >
                      No Of Times *
                    </MDTypography>
                    <MDBox>
                      <Form.Select
                        value={recurringTypex}
                        onChange={(e) => setRecurringType(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option>--Recurring Type--</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                      </Form.Select>
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <br />
            <MDBox style={{ paddingBottom: "5px" }}>
              <Button onClick={handleFilter} style={Styles.buttonSx}>
                Filter
              </Button>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox pt={3}>
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

export default TreasuryDebtors;
