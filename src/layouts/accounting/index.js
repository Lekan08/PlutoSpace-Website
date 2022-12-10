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
// import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
// import Button from "@mui/material/Button";
import Styles from "styles";
import accountingLoader from "./accountingLoader.gif";

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
  const [totalBalanceValue, setTotalBalanceValue] = useState(0);
  // const [changeColor, setChangeColor] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();

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
  const handleClick = (e) => {
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const createdByx = data11.personalID;

    const raw = JSON.stringify({
      orgID: orgIDs,
      createdBy: createdByx,
      closingBalance: totalBalance,
      type: typexxx,
      documentKey: "string",
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    setOpened(true);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/accounting/add`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        console.log(result);
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
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          window.location.reload();
        });
        console.log(result);
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  // eslint-disable-next-line consistent-return
  const handleRunCal = (typex) => {
    console.log(typex);
    setTypexx(typex);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
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
    setOpened(true);
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
          }
        }
      });

    return () => {
      isMounted = false;
    };
  };

  useEffect(() => {
    setTotalBalance(totalBalanceValue + totalIncome - totalExpenses);
  }, [totalBalanceValue, totalIncome, totalExpenses]);

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

  const pColumns = [
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
                  onClick={handleClick}
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
          {/* <MDBox mt={4} mb={1} ml></MDBox> */}
        </>
      ) : (
        <></>
      )}
      <Footer />
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
    </DashboardLayout>
  );
}

export default Accounting;
