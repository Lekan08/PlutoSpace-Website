/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import DataTable from "examples/Tables/DataTable";
import Papa from "papaparse";
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
import example from "./example.PNG";

function AccountingCSV() {
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
  const [disab, setDisab] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [file, setFile] = useState([]);
  const [document, setDocument] = useState("");

  const handlePost = () => {
    const raw = JSON.stringify(file);
    console.log(raw);
    console.log(document);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(`${process.env.REACT_APP_LOUGAx_URL}/accounts/postTransactionThroughFile`, requestOptions)
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
        setOpened(false);
        if (resultx.status === "SUCCESS") {
          MySwal.fire({
            title: resultx.status,
            type: "success",
            text: resultx.message,
          }).then(() => {
            navigate("/general-ledger");
          });
        } else if (resultx.status === "INVALID_ACTION") {
          MySwal.fire({
            title: resultx.status,
            type: "success",
            text: "You Cannot Post To The Same Account More Than Once For A Transaction",
          });
        } else {
          MySwal.fire({
            title: resultx.status,
            type: "success",
            text: resultx.message,
          });
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
  };

  const changeHandler = (event) => {
    setDocument(event.target.files[0]);
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const createdBy = data11.personalID;
    console.log(event.target.files);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete(results) {
        const obj = results.data;
        const transactions = obj.map((r) => ({
          accountID: r.accountNumber,
          particulars: r.particulars,
          calculationType: r.calculationType === "to" ? "+" : "-",
          source: r.source.toUpperCase(),
          requestID: event.target.files[0].name,
          linkingPostKey: event.target.files[0].name,
          postedBy: createdBy,
          postedAmount: Number(r.amount),
          debitOrCredit: Number(r.amount) > 0 ? 1 : 0,
        }));
        console.log(obj);
        setFile(transactions);
      },
    });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px="10vw">
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
              Post Transactions Using CSV
            </MDTypography>
          </MDBox>
          <div className="row" style={{ padding: "3%" }}>
            <br />
            <MDBox
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="row" style={{ paddingTop: 20 }}>
                <center>
                  <u>Before Proceeding Read carefully:</u>
                </center>

                <MDBox p={3} mt={2}>
                  <MDTypography
                    variant="h4"
                    fontWeight="regular"
                    fontSize="75%"
                    // textAlign="center"
                    color="text"
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;The first line/row in your csv file must be exactly the
                    same as the words in the image below in row 1 A - C (should be camelCase when
                    necessary. The first row order does not matter, in essence, you may have name or
                    state or city at any position you want) and your further details in each row
                    should be corresponding to the content of the first row (i.e under
                    &apos;accountNumber&apos; you should have bank account details e.t.c...). Debits
                    should be negative numbers while Credits should be positive numbers and there
                    should be no space at the headers. The Unique code for the file is automatically
                    the name of the file and can be found in the Document Library
                    <br />
                  </MDTypography>
                </MDBox>
                <img
                  className="img"
                  style={{ width: "60vw", marginRight: "auto", marginLeft: "auto" }}
                  src={example}
                  alt="example"
                />
              </div>
            </MDBox>
            <MDBox textAlign="center" p={5}>
              <MDTypography
                variant="h4"
                fontWeight="regular"
                fontSize="75%"
                textAlign="center"
                color="text"
              >
                <input
                  type="file"
                  name="file"
                  accept=".csv"
                  onChange={changeHandler}
                  style={{ display: "block", margin: "10px auto" }}
                  //   multiple
                />
              </MDTypography>
            </MDBox>
          </div>

          <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              onClick={handlePost}
              style={Styles.buttonSx}
              disabled={disab}
            >
              Post Transactions
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
      </MDBox>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={accountingLoader}
              alt="work"
              style={{
                height: "50%",
                width: "35%",
              }}
            />
            <div
              className="row"
              style={{
                position: "absolute",
                marginTop: "9rem",
              }}
            >
              Please wait, this may take some time...
            </div>
          </div>
        </>
      </Backdrop>
    </DashboardLayout>
  );
}

export default AccountingCSV;
