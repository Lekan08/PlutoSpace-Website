/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Icon from "@mui/material/Icon";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { TextField } from "@mui/material";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
// import InsuranceDamageTable from "layouts/insurance/damage/data/insuranceDamageTableData";
import Styles from "styles";
import accountingLoader from "./accountingLoader.gif";

function GeneralLedger() {
  const MySwal = withReactContent(Swal);
  // const { columns: pColumns, rows: pRows } = InsuranceDamageTable();
  const [gets, setGets] = useState(false);
  const [IDX, setIDX] = useState();
  const [items, setItems] = useState([]);
  const [open2, setOpen2] = React.useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: "20px",
    boxShadow: 100,
    p: 4,
  };
  const [user, setUser] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    const fetched = JSON.parse(localStorage.getItem("fetched"));
    const LedgerInfo = JSON.parse(localStorage.getItem("LedgerInfo"));
    if (fetched) {
      setStart(fetched[0]);
      setEnd(fetched[1]);
      setGets(true);
      setItems(LedgerInfo);
    }
    console.log(fetched, LedgerInfo);
  }, []);

  // eslint-disable-next-line consistent-return
  const handleGets = () => {
    if (start && end) {
      setOpened(true);
      const headers = miHeaders;
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const strt = new Date(start).getTime();
      const ends = new Date(end).getTime();
      const orgIDs = data11.orgID;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const ids = urlParams.get("id");
      let isMounted = true;
      fetch(
        `${process.env.REACT_APP_LOUGA_URL}/accounting/runAccountsBetween/${orgIDs}?startTime=${strt}&endTime=${ends}`,
        { headers }
      )
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
            setGets(true);
            setOpened(false);
            const LedgerInfo = JSON.stringify(result);
            const fetched = JSON.stringify([start, end]);
            console.log(LedgerInfo, fetched);
            localStorage.setItem("fetched", fetched);
            localStorage.setItem("LedgerInfo", LedgerInfo);
          }
        });
      return () => {
        isMounted = false;
      };
    }
  };
  // Method to change date from timestamp
  const changeDateandTime = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    let hour = "0";
    let minutes = "0";
    let seconds = "0";

    if (date.getHours() < 10) {
      hour += date.getHours();
    } else {
      hour = date.getHours();
    }

    if (date.getMinutes() < 10) {
      minutes += date.getMinutes();
    } else {
      minutes = date.getMinutes();
    }

    if (date.getSeconds() < 10) {
      seconds += date.getSeconds();
    } else {
      seconds = date.getSeconds();
    }
    return `${retDate} ${hour}:${minutes}:${seconds}`;
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={20}>
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            style={{ backgroundColor: "#f96d02" }}
            mx={6}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              General Ledger
            </MDTypography>
          </MDBox>
          <div className="row" style={{ padding: "3%" }}>
            <MDTypography variant="h5" fontWeight="medium" mt={1} style={{ textAlign: "center" }}>
              <u>Generate Transactions</u>
            </MDTypography>
            <br />
            <br />
            <MDBox
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="col-sm-6">
                <div className="col-sm-3">
                  <TextField
                    id="datetime-local"
                    label="From *"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </div>
                <i style={{ color: "red", fontSize: "60%" }}>required</i>
              </div>
              <div className="col-sm-6" style={{ paddingLeft: "100px" }}>
                <div className="col-sm-3">
                  <TextField
                    id="datetime-local"
                    label="To *"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </div>
                <i style={{ color: "red", fontSize: "60%" }}>required</i>
              </div>
            </MDBox>
          </div>
          <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              onClick={handleGets}
              //   color="info"
              style={Styles.buttonSx}
              // width="50%"
              // align="left"
            >
              Fetch
            </MDButton>
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
        {gets && (
          <MDBox>
            <DataTable
              table={{
                columns: [
                  { Header: "Source", accessor: "source", align: "left" },
                  { Header: "Total Amount", accessor: "totalAmount", align: "left" },
                  { Header: "particulars", accessor: "particulars", align: "left" },
                  {
                    Header: "Created Date",
                    accessor: "createdTime",
                    Cell: ({ cell: { value } }) => changeDateandTime(value),
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
                            <Dropdown.Item>Post Transaction</Dropdown.Item>
                            {/* <Dropdown.Item onClick={() => handleUpdateInsuranceDamage(value)}>
                              Update
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDecisionInsurance(value, 1)}>
                              Approve
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDecisionInsurance(value, 2)}>
                              Decline
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleForward(value)}>
                              Forward Decision
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDisable(value)}>
                              Disable
                            </Dropdown.Item> */}
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
        )}
      </MDBox>
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

export default GeneralLedger;
