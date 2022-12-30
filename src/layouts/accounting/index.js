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
import NoTransaction from "./NoTransaction.png";

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

  // Document Upload
  // const handlePDFUpload = (e, files) => {
  //   console.log(files);
  //   if (files !== "" && files !== 0) {
  //     if (files === undefined) {
  //       MySwal.fire({
  //         title: "INVALID_INPUT",
  //         type: "error",
  //         text: "Please input a file",
  //         // })  //.then(() => {
  //         // handleOpen();
  //       });
  //     } else {
  //       setOpened(true);
  //       e.preventDefault();
  //       // Headers for upload image
  //       const GenToken = localStorage.getItem("rexxdex1");
  //       const apiiToken = localStorage.getItem("rexxdex");

  //       if (apiiToken !== "null" && apiiToken !== null) {
  //         localStorage.setItem("rexxdex1", apiiToken);
  //       }
  //       const iiHeaders = new Headers();
  //       iiHeaders.append("Token-1", GenToken);

  //       const data11 = JSON.parse(localStorage.getItem("user1"));
  //       // const personalIDs = data11.id;
  //       const orgIdx = data11.orgID;
  //       // const imgKey = `PROF_PIC_EMP-${personalIDs}`;
  //       // console.log(imgKey);

  //       const dateQ = new Date().getTime();
  //       const accountKey = `accountDoc${1 * 2 + 3 + dateQ}`;
  //       console.log(accountKey);
  //       console.log(files);
  //       const formDataxx = new FormData();
  //       formDataxx.append("file", files[0]);
  //       formDataxx.append("orgID", orgIdx);
  //       formDataxx.append("key", accountKey);
  //       formDataxx.append("type", files[0].type);

  //       const raw = formDataxx;
  //       console.log(raw);

  //       const requestOptions = {
  //         method: "POST",
  //         headers: iiHeaders,
  //         body: raw,
  //         redirect: "follow",
  //       };

  //       fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/uploadFile`, requestOptions)
  //         .then(async (res) => {
  //           const aToken = res.headers.get("token-1");
  //           localStorage.setItem("rexxdex", aToken);
  //           return res.json();
  //         })
  //         .then((result) => {
  //           setOpened(false);
  //           if (result.message === "Expired Access") {
  //             navigate("/authentication/sign-in");
  //             window.location.reload();
  //           }
  //           if (result.message === "Token Does Not Exist") {
  //             navigate("/authentication/sign-in");
  //             window.location.reload();
  //           }
  //           if (result.message === "Unauthorized Access") {
  //             navigate("/authentication/forbiddenPage");
  //             window.location.reload();
  //           }
  //           console.log(result);
  //           if (result.status === "SUCCESS") {
  //             const orgIDs = data11.orgID;
  //             const createdByx = data11.personalID;

  //             const rawAccount = JSON.stringify({
  //               orgID: orgIDs,
  //               createdBy: createdByx,
  //               closingBalance: totalBalance,
  //               type: typexxx,
  //               documentKey: accountKey,
  //             });
  //             console.log(rawAccount);
  //             const requestOptionsXS = {
  //               method: "POST",
  //               headers: myHeaders,
  //               body: rawAccount,
  //               redirect: "follow",
  //             };

  //             setOpened(true);
  //             fetch(`${process.env.REACT_APP_LOUGA_URL}/accounting/add`, requestOptionsXS)
  //               .then(async (res) => {
  //                 const aToken = res.headers.get("token-1");
  //                 localStorage.setItem("rexxdex", aToken);
  //                 return res.json();
  //               })
  //               .then((resultxp) => {
  //                 console.log(resultxp);
  //                 setOpened(false);
  //                 if (resultxp.message === "Expired Access") {
  //                   navigate("/authentication/sign-in");
  //                   window.location.reload();
  //                 }
  //                 if (resultxp.message === "Token Does Not Exist") {
  //                   navigate("/authentication/sign-in");
  //                   window.location.reload();
  //                 }
  //                 if (resultxp.message === "Unauthorized Access") {
  //                   navigate("/authentication/forbiddenPage");
  //                   window.location.reload();
  //                 }
  //                 MySwal.fire({
  //                   title: resultxp.status,
  //                   type: "success",
  //                   text: resultxp.message,
  //                 }).then(() => {
  //                   // window.location.reload();
  //                 });
  //                 console.log(resultxp);
  //               })
  //               .catch((error) => {
  //                 setOpened(false);
  //                 MySwal.fire({
  //                   title: error.status,
  //                   type: "error",
  //                   text: error.message,
  //                 });
  //               });
  //           }
  //           // .then(() => {
  //           //   if (result.status !== "SUCCESS") {
  //           //     handleOpen();
  //           //   }
  //           //   console.log("SUCCESS");
  //           // });
  //         });
  //     }
  //   }
  // };

  //  Method to change date from timestamp
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
      totalAmount: val.totalAmount,
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
            let URL = result[0].displayURI;
            if (result[0].displayURI === null) {
              URL = "https://i.ibb.co/5FG72RG/defaulto.png";
            }
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

            fetch(`${process.env.REACT_APP_LOUGA_URL}/accounting/generate`, requestOptions)
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                return res.json();
              })
              .then((resultAccGenerate) => {
                setOpened(false);
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
                  const createdByx = data11.personalID;

                  const rawAccount = JSON.stringify({
                    orgID: orgIDs,
                    createdBy: createdByx,
                    closingBalance: totalBalance,
                    type: typexxx,
                    documentKey: resultAccGenerate,
                  });
                  console.log(rawAccount);
                  const requestOptionsXS = {
                    method: "POST",
                    headers: myHeaders,
                    body: rawAccount,
                    redirect: "follow",
                  };

                  setOpened(true);
                  fetch(`${process.env.REACT_APP_LOUGA_URL}/accounting/add`, requestOptionsXS)
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
                console.log(resultAccGenerate);
                MySwal.fire({
                  title: resultAccGenerate.status,
                  type: "success",
                  text: resultAccGenerate.message,
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
        }
      });

    return () => {
      isMounted = false;
    };

    // // eslint-disable-next-line new-cap, no-unreachable
    // const doc = new jsPDF();
    // doc.text("Accounting Details", 20, 10);
    // doc.autoTable({
    //   theme: "grid",
    //   columns: [
    //     {
    //       header: "Crreated Time",
    //       dataKey: "changeDate(createdTime)",
    //     },
    //     {
    //       header: "Particulars",
    //       dataKey: "particulars",
    //     },
    //     { header: "Source", dataKey: "source" },
    //     {
    //       header: "Category",
    //       dataKey: "category",
    //     },
    //     {
    //       header: "Total Amount (NGN)",
    //       dataKey: "totalAmount",
    //     },
    //   ],
    //   body: runAccData,
    // });
    // // doc.text(`Total Income = NGN${totalIncome.toLocaleString(undefined)}`, 10, 5);
    // // doc.text(`Total Expenses = NGN${totalExpenses.toLocaleString(undefined)}`, 10, 5);
    // // doc.text(`Total Balance = NGN${totalBalance.toLocaleString(undefined)}`, 10, 5);
    // console.log(orgIDDet);
    // const accountingDocuments = "./uploads/";
    // const dateNow = new Date().getTime();
    // const fileName = doc.save(`ACCT-${dateNow}-${orgIDDet}.pdf`);
    // const filePath = `${accountingDocuments}${fileName}`;
    // console.log(filePath);
    // handlePDFUpload(e, doc);
  };

  // const columns = [
  //   {
  //     name: "category",
  //     label: "Category",
  //     align: "left",
  //     options: {
  //       filter: true,
  //       sort: true,
  //     },
  //   },
  //   {
  //     name: "source",
  //     label: "Source",
  //     align: "left",
  //     options: {
  //       filter: true,
  //       sort: true,
  //     },
  //   },
  //   {
  //     name: "totalAmount",
  //     label: "Total Amount (NGN)",
  //     align: "left",
  //     options: {
  //       filter: true,
  //       sort: true,
  //     },
  //   },
  // ];
  // const data = [
  //   ["Joe James", "Test Corp", "Yonkers", "NY"],
  //   ["John Walsh", "Test Corp", "Hartford", "CT"],
  //   ["Bob Herm", "Test Corp", "Tampa", "FL"],
  //   ["James Houston", "Test Corp", "Dallas", "TX"],
  // ];

  // const options = {
  //   filterType: "checkbox",
  //   rowsPerPage: [10],
  //   rowsPerPageOptions: [10, 20, 50, 90],
  //   jumpToPage: true,
  //   selectableRows: "none",
  //   textLabels: {
  //     pagination: {
  //       next: "Next >",
  //       previous: "< Previous",
  //       rowsPerPage: "Total items Per Page",
  //       displayRows: "OF",
  //     },
  //   },
  //   onChangePage(currentPage) {
  //     console.log({ currentPage });
  //   },
  //   onChangeRowsPerPage(numberOfRows) {
  //     console.log({ numberOfRows });
  //   },
  // };

  // eslint-disable-next-line consistent-return
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const orgIDs = data11.orgID;
  //   const createdByx = data11.personalID;

  //   const raw = JSON.stringify({
  //     orgID: orgIDs,
  //     createdBy: createdByx,
  //     closingBalance: totalBalance,
  //     type: typexxx,
  //     documentKey: "string",
  //   });
  //   console.log(raw);
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   setOpened(true);
  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/accounting/add`, requestOptions)
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       setOpened(false);
  //       if (result.message === "Expired Access") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Token Does Not Exist") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Unauthorized Access") {
  //         navigate("/authentication/forbiddenPage");
  //         window.location.reload();
  //       }
  //       MySwal.fire({
  //         title: result.status,
  //         type: "success",
  //         text: result.message,
  //       }).then(() => {
  //         downloadPdf();
  //         // window.location.reload();
  //       });
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       setOpened(false);
  //       MySwal.fire({
  //         title: error.status,
  //         type: "error",
  //         text: error.message,
  //       });
  //     });
  // };

  // eslint-disable-next-line consistent-return
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
                  {/* &nbsp; &nbsp;
                  <table
                    style={{
                      border: "2px solid #f96d02",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <caption style={{ fontSize: "30px" }}>Account Details</caption>
                    <caption style={{ fontSize: "30px" }}>Closing Balance</caption>
                    <tr
                      style={{
                        padding: "0.25rem 1rem",
                        border: "1px solid rgb(190, 190, 190)",
                        textAlign: "center",
                      }}
                    >
                      <th
                        style={{
                          padding: "0.25rem 1rem",
                          border: "1px solid rgb(190, 190, 190)",
                          textAlign: "center",
                        }}
                      >
                        Source
                      </th>
                      <th
                        style={{
                          padding: "0.25rem 1rem",
                          border: "1px solid rgb(190, 190, 190)",
                          textAlign: "center",
                        }}
                      >
                        Category
                      </th>
                      <th
                        style={{
                          padding: "0.25rem 1rem",
                          border: "1px solid rgb(190, 190, 190)",
                          textAlign: "center",
                        }}
                      >
                        Total Amount (NGN)
                      </th>
                    </tr>
                    <tbody>
                      {runAccData.map((val, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <tr key={index}>
                          <td
                            style={{
                              padding: "0.25rem 1rem",
                              border: "1px solid rgb(190, 190, 190)",
                              textAlign: "center",
                            }}
                          >
                            {val.source}
                          </td>
                          <td
                            style={{
                              padding: "0.25rem 1rem",
                              border: "1px solid rgb(190, 190, 190)",
                              textAlign: "center",
                            }}
                          >
                            {val.category}
                          </td>
                          <td
                            style={{
                              padding: "0.25rem 1rem",
                              border: "1px solid rgb(190, 190, 190)",
                              textAlign: "center",
                            }}
                          >
                            {val.totalAmount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table> */}
                </MDBox>
              </div>
              {/* <MDBox mt={4} mb={1} ml></MDBox> */}
            </>
          ) : (
            <>
              {noTransactionsMade === true && (
                <div>
                  <img src={NoTransaction} alt="No Transaction" />
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
