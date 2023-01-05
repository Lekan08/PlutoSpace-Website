import * as React from "react";
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
// import DataTable from "examples/Tables/DataTable";
// import taxData from "layouts/tax/data/taxTableData";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
// import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
// import MUIDataTable from "mui-datatables";
// import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import { Container } from "react-bootstrap";
import DataTable from "examples/Tables/DataTable";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
// import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Styles from "styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// import HtmlTable from "./htmlTable";
import AccountHistory from "./accountHistory";
import accountingLoader from "./accountingLoader.gif";
import NoTransaction from "./transactionNotMade.png";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Accounting() {
  const { allGHeaders: miHeaders } = GHeaders();
  const MySwal = withReactContent(Swal);
  // const { columns: pColumns, rows: pRows } = taxData();

  const [opened, setOpened] = useState(false);
  const [display, setDisplay] = useState(false);
  const [runAccData, setRunAccData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [typexxx, setTypexx] = useState("");
  // const [orgIDDet, setOrgIDDet] = useState("");
  const [totalBalanceValue, setTotalBalanceValue] = useState(0);
  const [noTransactionsMade, setNoTransactionsMade] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const [valuesx, setValuesx] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValuesx(newValue);
  };

  const ValuesToCommaIndented = (values) => {
    const num = Number(values);
    return num.toLocaleString(undefined);
  };

  const changeColor = (valuee) => {
    let colorr = "#000000";
    if (valuee === "INCOME") {
      colorr = "#4E9F3D";
    } else if (valuee === "EXPENSES") {
      colorr = "#CF0A0A";
    }
    const colorChange = {
      value: valuee,
      color: colorr,
    };
    return colorChange;
  };

  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  // Method for date
  const changeDatePDF = (timestamp) => {
    const date = new Date(timestamp);
    const analyzedDate = ` ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    return analyzedDate;
  };
  // To handle pdf download
  const downloadPdf = (e) => {
    const itemszx = runAccData.map((val) => ({
      createdTime: changeDatePDF(val.createdTime),
      source: val.source,
      particulars: val.particulars,
      category: val.category,
      totalAmount: val.totalAmount.toLocaleString(undefined),
    }));
    console.log(itemszx);

    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    e.preventDefault();
    setOpened(true);
    fetch(`${process.env.REACT_APP_KUBU_URL}/company/get/${orgIDs}`, {
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
            fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getByKey/${orgIDs}/${orgIDs}`, {
              headers,
            })
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                return res.json();
              })
              .then((resultme) => {
                if (resultme.message === "Expired Access") {
                  navigate("/authentication/sign-in");
                  window.location.reload();
                }
                if (resultme.message === "Token Does Not Exist") {
                  navigate("/authentication/sign-in");
                  window.location.reload();
                }
                if (resultme.message === "Unauthorized Access") {
                  navigate("/authentication/forbiddenPage");
                  window.location.reload();
                }
                console.log(resultme.name);
                fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${resultme.name}`, {
                  headers,
                })
                  .then(async (res) => {
                    const aToken = res.headers.get("token-1");
                    localStorage.setItem("rexxdex", aToken);
                    return res.json();
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

                    console.log(`link [${resultx[0]}]`);
                    // eslint-disable-next-line prefer-destructuring
                    let URL = resultx[0];

                    if (URL === "") {
                      URL = "https://i.ibb.co/5FG72RG/defaulto.png";
                      const raw = JSON.stringify({
                        company: {
                          id: result[0].id,
                          name: result[0].name,
                          street: result[0].street,
                          city: result[0].city,
                          state: result[0].state,
                          country: result[0].country,
                          pno: result[0].pno,
                          email: result[0].email,
                          profilePic: URL,
                        },
                        balanceBroughtForward: totalBalanceValue.toLocaleString(undefined),
                        balanceBroughtForwardTime: changeDatePDF(new Date().getTime()),
                        availableBalance: totalBalance.toLocaleString(undefined),
                        availableBalanceTime: changeDatePDF(new Date().getTime()),
                        items: itemszx,
                      });
                      console.log(raw);
                      const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow",
                      };

                      fetch(
                        `${process.env.REACT_APP_EKOATLANTIC_URL}/accounting/generate`,
                        requestOptions
                      )
                        .then(async (res) => {
                          const aToken = res.headers.get("token-1");
                          localStorage.setItem("rexxdex", aToken);
                          return res.json();
                        })
                        .then((resultAccGenerate) => {
                          if (resultAccGenerate.message === "Expired Access") {
                            navigate("/authentication/sign-in");
                            window.location.reload();
                          }
                          if (resultAccGenerate.message === "Token Does Not Exist") {
                            navigate("/authentication/sign-in");
                            window.location.reload();
                          }
                          if (resultAccGenerate.message === "Unauthorized Access") {
                            navigate("/authentication/forbiddenPage");
                            window.location.reload();
                          }
                          console.log(resultAccGenerate);
                          if (resultAccGenerate.status === "SUCCESS") {
                            console.log(resultAccGenerate.data.id);
                            const createdByx = data11.personalID;

                            const rawAccount = JSON.stringify({
                              orgID: orgIDs,
                              createdBy: createdByx,
                              closingBalance: totalBalance,
                              type: typexxx,
                              documentKey: resultAccGenerate.data.key,
                            });
                            console.log(rawAccount);
                            const requestOptionsXS = {
                              method: "POST",
                              headers: myHeaders,
                              body: rawAccount,
                              redirect: "follow",
                            };

                            fetch(
                              `${process.env.REACT_APP_LOUGA_URL}/accounting/add`,
                              requestOptionsXS
                            )
                              .then(async (res) => {
                                const aToken = res.headers.get("token-1");
                                localStorage.setItem("rexxdex", aToken);
                                return res.json();
                              })
                              .then((resultxp) => {
                                console.log(resultxp);
                                setOpened(false);
                                if (resultxp.message === "Expired Access") {
                                  navigate("/authentication/sign-in");
                                  window.location.reload();
                                }
                                if (resultxp.message === "Token Does Not Exist") {
                                  navigate("/authentication/sign-in");
                                  window.location.reload();
                                }
                                if (resultxp.message === "Unauthorized Access") {
                                  navigate("/authentication/forbiddenPage");
                                  window.location.reload();
                                }
                                if (resultxp.status === "SUCCESS") {
                                  fetch(
                                    `${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${resultAccGenerate.data.name}`,
                                    {
                                      headers,
                                    }
                                  )
                                    .then(async (res) => {
                                      const aToken = res.headers.get("token-1");
                                      localStorage.setItem("rexxdex", aToken);
                                      return res.json();
                                    })
                                    .then((resultxme2) => {
                                      if (resultxme2.message === "Expired Access") {
                                        navigate("/authentication/sign-in");
                                        window.location.reload();
                                      }
                                      if (resultxme2.message === "Token Does Not Exist") {
                                        navigate("/authentication/sign-in");
                                        window.location.reload();
                                      }
                                      if (resultxme2.message === "Unauthorized Access") {
                                        navigate("/authentication/forbiddenPage");
                                        window.location.reload();
                                      }

                                      // if (isMounted) {
                                      console.log(`link [${resultxme2[0]}]`);
                                      const url = resultxme2[0];
                                      if (url !== "") {
                                        const objectURL = url;
                                        console.log(objectURL);

                                        // (C2) TO "FORCE DOWNLOAD"
                                        const anchor = document.createElement("a");
                                        anchor.href = objectURL;
                                        anchor.download = resultAccGenerate.data.name;
                                        anchor.click();

                                        // (C3) CLEAN UP
                                        window.URL.revokeObjectURL(objectURL);
                                      }
                                    });
                                }
                                MySwal.fire({
                                  title: resultxp.status,
                                  type: "success",
                                  text: resultxp.message,
                                }).then(() => {
                                  // window.location.reload();
                                });
                                console.log(resultxp);
                              })
                              .catch((error) => {
                                setOpened(false);
                                MySwal.fire({
                                  title: error.status,
                                  type: "error",
                                  text: error.message,
                                });
                              });
                          }
                        })
                        .catch((error) => {
                          MySwal.fire({
                            title: error.status,
                            type: "error",
                            text: error.message,
                          });
                        });
                    } else {
                      const raw = JSON.stringify({
                        company: {
                          id: result[0].id,
                          name: result[0].name,
                          street: result[0].street,
                          city: result[0].city,
                          state: result[0].state,
                          country: result[0].country,
                          pno: result[0].pno,
                          email: result[0].email,
                          profilePic: URL,
                        },
                        balanceBroughtForward: totalBalanceValue.toLocaleString(undefined),
                        balanceBroughtForwardTime: changeDatePDF(new Date().getTime()),
                        availableBalance: totalBalance.toLocaleString(undefined),
                        availableBalanceTime: changeDatePDF(new Date().getTime()),
                        items: itemszx,
                      });
                      console.log(raw);
                      const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow",
                      };

                      fetch(
                        `${process.env.REACT_APP_EKOATLANTIC_URL}/accounting/generate`,
                        requestOptions
                      )
                        .then(async (res) => {
                          const aToken = res.headers.get("token-1");
                          localStorage.setItem("rexxdex", aToken);
                          return res.json();
                        })
                        .then((resultAccGenerate) => {
                          if (resultAccGenerate.message === "Expired Access") {
                            navigate("/authentication/sign-in");
                            window.location.reload();
                          }
                          if (resultAccGenerate.message === "Token Does Not Exist") {
                            navigate("/authentication/sign-in");
                            window.location.reload();
                          }
                          if (resultAccGenerate.message === "Unauthorized Access") {
                            navigate("/authentication/forbiddenPage");
                            window.location.reload();
                          }
                          console.log(resultAccGenerate);
                          if (resultAccGenerate.status === "SUCCESS") {
                            console.log(resultAccGenerate.data.id);
                            const createdByx = data11.personalID;

                            const rawAccount = JSON.stringify({
                              orgID: orgIDs,
                              createdBy: createdByx,
                              closingBalance: totalBalance,
                              type: typexxx,
                              documentKey: resultAccGenerate.data.key,
                            });
                            console.log(rawAccount);
                            const requestOptionsXS = {
                              method: "POST",
                              headers: myHeaders,
                              body: rawAccount,
                              redirect: "follow",
                            };

                            setOpened(true);
                            fetch(
                              `${process.env.REACT_APP_LOUGA_URL}/accounting/add`,
                              requestOptionsXS
                            )
                              .then(async (res) => {
                                const aToken = res.headers.get("token-1");
                                localStorage.setItem("rexxdex", aToken);
                                return res.json();
                              })
                              .then((resultxp) => {
                                console.log(resultxp);
                                setOpened(false);
                                if (resultxp.message === "Expired Access") {
                                  navigate("/authentication/sign-in");
                                  window.location.reload();
                                }
                                if (resultxp.message === "Token Does Not Exist") {
                                  navigate("/authentication/sign-in");
                                  window.location.reload();
                                }
                                if (resultxp.message === "Unauthorized Access") {
                                  navigate("/authentication/forbiddenPage");
                                  window.location.reload();
                                }
                                if (resultxp.status === "SUCCESS") {
                                  fetch(
                                    `${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${resultAccGenerate.data.name}`,
                                    {
                                      headers,
                                    }
                                  )
                                    .then(async (res) => {
                                      const aToken = res.headers.get("token-1");
                                      localStorage.setItem("rexxdex", aToken);
                                      return res.json();
                                    })
                                    .then((resultxme2) => {
                                      if (resultxme2.message === "Expired Access") {
                                        navigate("/authentication/sign-in");
                                        window.location.reload();
                                      }
                                      if (resultxme2.message === "Token Does Not Exist") {
                                        navigate("/authentication/sign-in");
                                        window.location.reload();
                                      }
                                      if (resultxme2.message === "Unauthorized Access") {
                                        navigate("/authentication/forbiddenPage");
                                        window.location.reload();
                                      }

                                      // if (isMounted) {
                                      console.log(`link [${resultxme2[0]}]`);
                                      const url = resultxme2[0];
                                      if (url !== "") {
                                        const objectURL = url;
                                        console.log(objectURL);

                                        // (C2) TO "FORCE DOWNLOAD"
                                        const anchor = document.createElement("a");
                                        anchor.href = objectURL;
                                        anchor.download = resultAccGenerate.data.name;
                                        anchor.click();

                                        // (C3) CLEAN UP
                                        window.URL.revokeObjectURL(objectURL);
                                      }
                                    });
                                }
                                MySwal.fire({
                                  title: resultxp.status,
                                  type: "success",
                                  text: resultxp.message,
                                }).then(() => {
                                  // window.location.reload();
                                });
                                console.log(resultxp);
                              })
                              .catch((error) => {
                                setOpened(false);
                                MySwal.fire({
                                  title: error.status,
                                  type: "error",
                                  text: error.message,
                                });
                              });
                          }
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
              });
          }
        }
      });

    return () => {
      isMounted = false;
    };
  };

  const handleRunCal = (typex) => {
    console.log(typex);
    setTypexx(typex);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    // setOrgIDDet(orgIDs);
    let isMounted = true;
    setOpened(true);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/accounting/getLast/${orgIDs}/${typex}`, { headers })
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
          if (result.length !== 0) {
            setTotalBalanceValue(result.closingBalance);
            console.log(result);
          }
        }
      });
    fetch(`${process.env.REACT_APP_LOUGA_URL}/accounting/runAccounts/${orgIDs}/${typex}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultr) => {
        setOpened(false);
        if (resultr.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (resultr.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (resultr.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
        if (isMounted) {
          if (resultr.length !== 0) {
            setDisplay(true);
            setRunAccData(resultr);
            console.log(resultr);
            const incomeFIltered = resultr.filter((os) => os.category === "INCOME");
            const expensesFiltered = resultr.filter((os) => os.category === "EXPENSES");
            console.log(incomeFIltered);
            console.log(expensesFiltered);
            if (incomeFIltered.length !== 0) {
              const incomeValues = incomeFIltered.map((income) => income.totalAmount);
              console.log(incomeValues);
              setTotalIncome(incomeValues.reduce((a, b) => a + b, 0));
            }
            if (expensesFiltered.length !== 0) {
              const expensesValues = expensesFiltered.map((income) => income.totalAmount);
              console.log(expensesValues);
              setTotalExpenses(expensesValues.reduce((a, b) => a + b, 0));
            }
          } else setNoTransactionsMade(true);
        }
      });

    return () => {
      isMounted = false;
    };
  };

  useEffect(() => {
    setTotalBalance(totalBalanceValue + totalIncome - totalExpenses);
  }, [totalBalanceValue, totalIncome, totalExpenses]);

  const pColumns = [
    {
      Header: "Created Time ",
      accessor: "createdTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "Particulars ",
      accessor: "particulars",
      align: "left",
    },
    {
      Header: "Source ",
      accessor: "source",
      align: "left",
    },
    {
      Header: "Category",
      accessor: "category",
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
      Header: "Total Amount (NGN)",
      accessor: "totalAmount",
      Cell: ({ cell: { value } }) => ValuesToCommaIndented(value),
      align: "left",
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={valuesx}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ bgcolor: "#f96d02" }}
          >
            <Tab label="Process Account" {...a11yProps(0)} />
            <Tab label="Account History" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={valuesx} index={0}>
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
                  Accounting
                </MDTypography>
              </MDBox>
            </MDBox>
            <Container>
              <MDBox mt={4} mb={4} ml={17}>
                <div className="row">
                  <div className="col-sm-4">
                    <MDButton
                      variant="gradient"
                      onClick={() => handleRunCal(1)}
                      style={{ backgroundColor: "#B01E68", color: "#fff" }}
                      width="50%"
                      align="left"
                      ml={5}
                      mr={5}
                    >
                      Daily
                    </MDButton>
                  </div>
                  <div className="col-sm-4">
                    <MDButton
                      variant="gradient"
                      onClick={() => handleRunCal(2)}
                      style={{ backgroundColor: "#DC3535", color: "#fff" }}
                      width="50%"
                      align="center"
                      ml={5}
                      mr={5}
                    >
                      Monthly
                    </MDButton>
                  </div>
                  <div className="col-sm-4">
                    <MDButton
                      variant="gradient"
                      onClick={() => handleRunCal(3)}
                      style={{ backgroundColor: "#F49D1A", color: "#fff" }}
                      width="50%"
                      align="right"
                    >
                      Yearly
                    </MDButton>
                  </div>
                </div>
              </MDBox>
            </Container>
          </Card>
          &nbsp; &nbsp;
          {display ? (
            <>
              <Card>
                <MDBox mt={4} mb={4} ml={17}>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="center">
                        <h4>TOTAL INCOME</h4>
                      </div>
                      <MDBox
                        variant="gradient"
                        // bgColor="info"
                        borderRadius="lg"
                        style={{ backgroundColor: "#4E9F3D" }}
                        mx={2}
                        p={2}
                        mb={1}
                        textAlign="center"
                      >
                        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                          ₦ {totalIncome.toLocaleString(undefined)}
                        </MDTypography>
                      </MDBox>
                    </div>
                    <div className="col-sm-2">
                      <></>
                    </div>
                    <div className="col-sm-4">
                      <div className="center">
                        <h4>TOTAL EXPENSES</h4>
                      </div>
                      <MDBox
                        variant="gradient"
                        // bgColor="info"
                        borderRadius="lg"
                        style={{ backgroundColor: "#CF0A0A" }}
                        mx={2}
                        p={2}
                        mb={1}
                        textAlign="center"
                      >
                        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                          ₦ {totalExpenses.toLocaleString(undefined)}
                        </MDTypography>
                      </MDBox>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="row">
                    <div className="col-sm-3">
                      <></>
                    </div>
                    <div className="col-sm-4">
                      <div className="center">
                        <h4>TOTAL BALANCE</h4>
                      </div>
                      <MDBox
                        variant="gradient"
                        // bgColor="info"
                        borderRadius="lg"
                        style={{ backgroundColor: `${totalBalance >= 0 ? "#4E9F3D" : "#CF0A0A"}` }}
                        mx={2}
                        p={2}
                        mb={1}
                        textAlign="center"
                      >
                        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                          ₦ {totalBalance.toLocaleString(undefined)}
                        </MDTypography>
                      </MDBox>
                    </div>
                    <div className="col-sm-3">
                      <></>
                    </div>
                  </div>
                </MDBox>
              </Card>
              <div>
                <MDBox pt={3}>
                  <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
                    {" "}
                    <MDButton
                      variant="gradient"
                      onClick={downloadPdf}
                      style={Styles.buttonSx}
                      width="50%"
                      align="center"
                      ml={15}
                      mr={5}
                    >
                      Process Account
                    </MDButton>
                  </div>
                  &nbsp; &nbsp;
                  <DataTable
                    table={{ columns: pColumns, rows: runAccData }}
                    isSorted
                    entriesPerPage
                    showTotalEntries
                    noEndBorder
                    canSearch
                  />
                </MDBox>
              </div>
            </>
          ) : (
            <>
              {noTransactionsMade === true && (
                <div style={{ textAlign: "center" }}>
                  <MDTypography
                    textAlign="center"
                    variant="h4"
                    fontWeight="medium"
                    color="error"
                    mt={1}
                  >
                    NO TRANSACTION MADE YET
                  </MDTypography>
                  <img
                    src={NoTransaction}
                    alt="No Transaction"
                    style={{ height: "400px", width: "400px" }}
                  />
                </div>
              )}
            </>
          )}
          <Footer />
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={opened}
          >
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
        </TabPanel>
        <TabPanel value={valuesx} index={1}>
          <AccountHistory />
        </TabPanel>
      </Box>
    </DashboardLayout>
  );
}

export default Accounting;
