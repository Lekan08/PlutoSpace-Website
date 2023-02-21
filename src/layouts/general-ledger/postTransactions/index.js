/* eslint-disable object-shorthand */
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
import { Grid, TextField } from "@mui/material";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
// import InsuranceDamageTable from "layouts/insurance/damage/data/insuranceDamageTableData";
import Styles from "styles";
import accountingLoader from "../accountingLoader.gif";

function PostTransactions() {
  const MySwal = withReactContent(Swal);
  // const { columns: pColumns, rows: pRows } = InsuranceDamageTable();
  const [accountInfo, setAccountInfo] = React.useState([]);
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
  const [particulars, setParticulars] = useState("");
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [particulars2, setParticulars2] = useState("");
  const [amount2, setAmount2] = useState("");
  const [account2, setAccount2] = useState("");
  const [opened, setOpened] = useState(false);
  const [disab, setDisab] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  useEffect(() => {
    setOpened(true);
    const transaction = sessionStorage.getItem("transaction");
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/accounts/gets/${orgIDs}`, { headers })
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
          setAccountInfo(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const handlePost = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const idx = JSON.parse(sessionStorage.getItem("transaction"));
    const createdBy = data11.personalID;
    const raw = JSON.stringify([
      {
        accountID: account,
        particulars: particulars,
        postedAmount: Number(amount),
        debitOrCredit: 0,
        requestID: idx[0].requestID,
        linkingPostKey: idx[0].requestID,
        source: idx[0].source,
        postedBy: createdBy,
      },
      {
        accountID: account2,
        particulars: particulars2,
        postedAmount: Number(amount2),
        debitOrCredit: 1,
        requestID: idx[0].requestID,
        linkingPostKey: idx[0].requestID,
        source: idx[0].source,
        postedBy: createdBy,
      },
    ]);
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    setOpened(true);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/accounts/postTransaction`, requestOptions)
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
        console.log(resultx);
        const LedgerInfo = JSON.parse(localStorage.getItem("LedgerInfo"));
        const objWithIdIndex = LedgerInfo.findIndex((obj) => obj.requestID === idx[0].requestID);

        if (objWithIdIndex > -1) {
          LedgerInfo.splice(objWithIdIndex, 1);
          const newf = JSON.stringify(LedgerInfo);
          localStorage.setItem("LedgerInfo", newf);
        }
        MySwal.fire({
          title: resultx.status,
          type: "success",
          text: resultx.message,
        }).then(() => {
          navigate("/general-ledger");
        });
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
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox>
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            style={{ backgroundColor: "#f96d02" }}
            mx={12}
            mt={4}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Post Transaction
            </MDTypography>
          </MDBox>
          <Grid container spacing={2}>
            <Grid
              item
              xs={6}
              style={{
                // display: "flex",
                // marginLeft: "auto",
                // marginRight: "auto",
                borderRight: "#f96d02 solid 4px",
              }}
            >
              <div className="col-sm-6">
                <MDBox
                  variant="gradient"
                  // bgColor="info"
                  borderRadius="lg"
                  style={{ backgroundColor: "#f96d02" }}
                  mb={1}
                  mx={1}
                  width="33vw"
                  textAlign="center"
                >
                  <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                    Debit
                  </MDTypography>
                </MDBox>
              </div>
              <MDBox mx={1}>
                <TextField
                  id="outlined-textarea"
                  rows={3}
                  value={particulars || ""}
                  label="Particulars"
                  onChange={(e) => setParticulars(e.target.value)}
                  sx={{
                    marginTop: "10px",
                    width: "30vw",
                  }}
                  multiline
                  required
                />
                <MDInput
                  type="number"
                  label="Amount (NGN) "
                  value={amount || ""}
                  // onKeyUp={handleOnNameKeys}
                  className="form-control"
                  onChange={(e) => setAmount(e.target.value)}
                  variant="standard"
                  style={{
                    marginTop: "7px",
                    width: "23vw",
                  }}
                  required
                />
                <Form.Select
                  value={account}
                  aria-label="Default select example"
                  style={{
                    marginTop: "20px",
                    width: "27vw",
                  }}
                  onChange={(e) => setAccount(e.target.value)}
                >
                  <option value="">--Select Account--</option>
                  {accountInfo.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </MDBox>
            </Grid>

            <Grid item xs={6} style={{ paddingLeft: "2vw" }}>
              <div className="col-sm-6">
                <MDBox
                  variant="gradient"
                  // bgColor="info"
                  borderRadius="lg"
                  style={{ backgroundColor: "#f96d02" }}
                  mb={1}
                  width="35vw"
                  textAlign="center"
                >
                  <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                    Credit
                  </MDTypography>
                </MDBox>
              </div>
              <MDBox mx={1}>
                <TextField
                  id="outlined-textarea"
                  rows={3}
                  value={particulars2 || ""}
                  label="Particulars"
                  onChange={(e) => setParticulars2(e.target.value)}
                  sx={{
                    marginTop: "10px",
                    width: "30vw",
                  }}
                  multiline
                  required
                />
                <MDInput
                  type="number"
                  label="Amount (NGN) "
                  value={amount2 || ""}
                  // onKeyUp={handleOnNameKeys}
                  className="form-control"
                  onChange={(e) => setAmount2(e.target.value)}
                  variant="standard"
                  style={{
                    marginTop: "7px",
                    width: "23vw",
                  }}
                  required
                />
                <Form.Select
                  value={account2}
                  aria-label="Default select example"
                  style={{
                    marginTop: "20px",
                    width: "27vw",
                  }}
                  onChange={(e) => setAccount2(e.target.value)}
                >
                  <option value="">--Select Account--</option>
                  {accountInfo.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={4} mb={1} style={{ marginLeft: "auto", marginRight: "auto", display: "flex" }}>
          <MDButton variant="gradient" style={Styles.buttonSx} onClick={() => handlePost()}>
            Post
          </MDButton>
        </MDBox>
      </Card>

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

export default PostTransactions;
