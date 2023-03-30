import React, { useState } from "react";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Container, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import Card from "@mui/material/Card";
// import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "examples/Footer";
// import Select from "react-select";
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";
import Styles from "styles";
import Accordion from "react-bootstrap/Accordion";
import Paper from "@mui/material/Paper";
// 😴😫☺😎😍🥱windows .
// na the 🐐 of all time dis code 😎

export default function LoyaltyTable() {
  //   const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();

  const [opened, setOpened] = useState(false);

  const [showClients, setShowClients] = useState(false);
  const [clientx, setClient] = useState([]);
  const [clientTypex, setClientTypex] = useState("");
  const [clientIDx, setClientIDx] = useState("");
  const [table, setTable] = useState([]);

  //   const handleOnSelect = (select) => {
  //     const usseerr = [];

  //     // eslint-disable-next-line array-callback-return
  //     select.map((items) => {
  //       const newx = items.value;
  //       usseerr.push(newx);
  //     });
  //     setApprov(usseerr);
  //   };
  //   const handleOnSelect2 = (select) => {
  //     const usseerr = [];

  //     // eslint-disable-next-line array-callback-return
  //     select.map((items) => {
  //       const newx = items.value;
  //       usseerr.push(newx);
  //     });
  //     setApprov2(usseerr);
  //   };

  const handleGetFilter = () => {
    setOpened(true);
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const id = urlParams.get("id");
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;

    const headers = miHeaders;
    let isMounted = true;

    fetch(
      `${process.env.REACT_APP_LOUGA_URL}/salesLoyalties/getForClient/${orgIDs}/${clientIDx}/${clientTypex}`,
      { headers }
    )
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
          if (result !== "") {
            setTable([result]);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  };
  const handleChangeClient = (value) => {
    const callClientType = value.toString();
    setClientTypex(callClientType);
    let clientTyppe = "";
    if (callClientType === "1") {
      setShowClients(true);
      clientTyppe = "individual";
    } else if (callClientType === "2") {
      setShowClients(false);
      clientTyppe = "corporate";
    }
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    fetch(`${process.env.REACT_APP_LOUGA_URL}/${clientTyppe}/gets/${orgIDs}`, { headers })
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
        setClient(result);
      });
  };

  {
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
      { Header: "Client Name", accessor: "clientID", align: "left" },
      {
        Header: "Client Type",
        accessor: "clientType",
        Cell: ({ cell: { value } }) => handleOnClientType(value),
        align: "left",
      },
      {
        Header: "Sales Count",
        accessor: "salesCount",
        align: "left",
      },
    ];

    return (
      //   <DashboardLayout>
      //     <DashboardNavbar />
      <div>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Get Loyalty</Accordion.Header>
            <Accordion.Body>
              <Paper elevation={3}>
                <br />
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
                      Filter Loyalty
                    </MDTypography>
                  </MDBox>
                  <br />
                  <MDBox component="form" role="form">
                    <MDBox mb={0}>
                      <Container>
                        <div className="row">
                          <div className="col-sm-6">
                            <MDTypography
                              variant="button"
                              fontWeight="regular"
                              fontSize="80%"
                              align="left"
                              color="text"
                              mt={0}
                            >
                              Client Type *
                            </MDTypography>
                            <MDBox textAlign="right">
                              <Form.Select
                                onChange={(e) => handleChangeClient(e.target.value)}
                                value={clientTypex || ""}
                                aria-label="Default select example"
                              >
                                <option>--Select Client Type--</option>
                                <option value="1">Individual</option>
                                <option value="2">Corporate</option>
                              </Form.Select>
                            </MDBox>
                          </div>
                          <div className="col-sm-6">
                            <MDBox mt={0}>
                              <MDTypography
                                variant="button"
                                fontWeight="regular"
                                fontSize="80%"
                                align="left"
                                color="text"
                              >
                                Client *
                              </MDTypography>{" "}
                              {showClients ? (
                                <Form.Select
                                  value={clientIDx}
                                  onChange={(e) => setClientIDx(e.target.value)}
                                  aria-label="Default select example"
                                >
                                  <option value="">--Select User--</option>
                                  {clientx.map((api) => (
                                    <option key={api.id} value={api.id}>
                                      {api.title} {api.fname} {api.lname}
                                    </option>
                                  ))}
                                </Form.Select>
                              ) : (
                                <Form.Select
                                  value={clientIDx}
                                  onChange={(e) => setClientIDx(e.target.value)}
                                  aria-label="Default select example"
                                >
                                  <option value="">--Select User--</option>
                                  {clientx.map((api) => (
                                    <option key={api.id} value={api.id}>
                                      {api.name}
                                    </option>
                                  ))}
                                </Form.Select>
                              )}
                              <br />
                            </MDBox>
                          </div>
                        </div>
                      </Container>
                    </MDBox>
                    <br />
                    <MDBox style={{ paddingBottom: "5px" }}>
                      <Button onClick={handleGetFilter} style={Styles.buttonSx}>
                        Filter
                      </Button>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Paper>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <MDBox pt={3}>
          <DataTable
            table={{ columns: pColumns, rows: table }}
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
      </div>
      //   </DashboardLayout>
    );
  }
}
//  LoyaltyTable;
