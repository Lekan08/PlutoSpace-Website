/* eslint-disable react/button-has-type */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import DataTable from "examples/Tables/DataTable";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
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
import { Fab, Grid, TextField } from "@mui/material";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
// import InsuranceDamageTable from "layouts/insurance/damage/data/insuranceDamageTableData";
import Styles from "styles";
import AddIcon from "@mui/icons-material/Add";
import accountingLoader from "../accountingLoader.gif";

function PostTransactions() {
  const MySwal = withReactContent(Swal);
  // const { columns: pColumns, rows: pRows } = InsuranceDamageTable();
  const [accountInfo, setAccountInfo] = React.useState([]);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const [fields, setFields] = useState([{ id: 0 }]);

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
        console.log(result);
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
  const st = JSON.parse(sessionStorage.getItem("transaction"));
  console.log(st);

  const handPostTrans = () => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const createdBy = data11.personalID;
    console.log(data11);
    const idx = JSON.parse(sessionStorage.getItem("transaction"));

    const raw = JSON.stringify(
      fields.map((field, index) => ({
        accountID: field[`account${index}`],
        particulars: idx[0].particulars ? idx[0].particulars : idx[0].source,
        debitOrCredit: Number(field[`debitOrCredit${index}`]),
        postedBy: createdBy,
        requestID: idx[0].requestID,
        source: idx[0].source,
        linkingPostKey: idx[0].requestID,
        postedAmount: Number(field[`amount${index}`]),
        calculationType: field[`calculationType${index}`],
      }))
    );
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

        if (resultx.status === "SUCCESS") {
          const LedgerInfo = JSON.parse(localStorage.getItem("LedgerInfox"));
          const objWithIdIndex = LedgerInfo.findIndex((obj) => obj.requestID === idx[0].requestID);

          if (objWithIdIndex > -1) {
            LedgerInfo.splice(objWithIdIndex, 1);
            const newf = JSON.stringify(LedgerInfo);
            localStorage.setItem("LedgerInfox", newf);
          }
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

  const handleAddField = () => {
    const lastId = fields[fields.length - 1].id;
    setFields([...fields, { id: lastId + 1 }]);
  };

  const handleDeleteField = (idToDelete) => {
    const updatedFields = fields.filter((field) => field.id !== idToDelete);
    setFields(updatedFields);
  };

  const handleInputChange = (id, event) => {
    const updatedFields = fields.map((field) => {
      if (field.id === id) {
        return { ...field, [event.target.name]: event.target.value };
      }
      return field;
    });
    setFields(updatedFields);
    console.log(updatedFields);
  };

  const renderFields = () =>
    fields.map((field) => (
      <>
        <div className="row" style={{ marginTop: "3vw", marginBottom: "3vw" }} key={field.id}>
          <div className="col-sm-3">
            <MDBox
              style={{
                marginLeft: "1vw",
              }}
            >
              <TextField
                id="number"
                name={`amount${field.id}`}
                label="Amount (NGN) "
                placeholder="Amount (NGN) "
                onChange={(event) => handleInputChange(field.id, event)}
                sx={{
                  width: "20vw",
                }}
                required
              />
            </MDBox>
          </div>
          <div className="col-sm-3">
            <MDBox>
              <Form.Select
                aria-label="Default select example"
                onChange={(event) => handleInputChange(field.id, event)}
                name={`debitOrCredit${field.id}`}
              >
                <option value="">--Debit/Credit-- *</option>
                <option value={0}>Debit</option>
                <option value={1}>Credit</option>
              </Form.Select>
            </MDBox>
          </div>
          <div className="col-sm-3">
            <MDBox>
              <Form.Select
                aria-label="Default select example"
                onChange={(event) => handleInputChange(field.id, event)}
                name={`account${field.id}`}
              >
                <option value="">--Select Account-- *</option>
                {accountInfo.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </MDBox>
          </div>

          <div className="col-sm-3">
            <MDBox
              style={{
                marginRight: "1vw",
              }}
            >
              <Form.Select
                aria-label="Default select example"
                onChange={(event) => handleInputChange(field.id, event)}
                name={`calculationType${field.id}`}
              >
                <option value="">--Calculation Type-- *</option>
                <option value="-">From (-)</option>
                <option value="+">To (+)</option>
              </Form.Select>
            </MDBox>
            <div style={{ display: "flex", justifyContent: "right", padding: "1vw" }}>
              {fields.length > 1 ? (
                <Fab
                  color="error"
                  onClick={() => handleDeleteField(field.id)}
                  aria-label="add"
                  style={{
                    fontSize: "15px",
                    marginTop: "10px",
                    color: "white",
                  }}
                  size="small"
                >
                  x
                </Fab>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </>
    ));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <Card>
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{
                backgroundColor: `${st[0].totalAmount > 0 ? "#36AE7C" : "#f30000"}`,
                width: "50vw",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <CardContent>
                <Typography
                  style={{ color: "white" }}
                  sx={{ fontSize: 17, fontWeight: 800, textAlign: "center" }}
                  color="text.secondary"
                  gutterBottom
                >
                  {st[0].particulars}
                </Typography>
                <Typography
                  style={{ color: "white" }}
                  sx={{ fontSize: 17, fontWeight: 800, textAlign: "center" }}
                  color="text.secondary"
                  gutterBottom
                >
                  Balance (NGN) : {st[0].totalAmount.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </div>

          <div>
            {renderFields()}
            <Fab
              color="warning"
              onClick={handleAddField}
              aria-label="add"
              style={{ marginLeft: "20px", fontSize: "27px", marginTop: "10px" }}
            >
              <AddIcon style={{ color: "white" }} />
            </Fab>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <MDBox
              mt={4}
              mb={1}
              style={{ marginLeft: "auto", marginRight: "auto", display: "flex" }}
            >
              <MDButton variant="gradient" style={Styles.buttonSx} onClick={() => handPostTrans()}>
                Post
              </MDButton>
            </MDBox>
          </div>
          <></>
        </Card>
      </div>
      <div style={{ visibility: "hidden", fontSize: 0 }}>guise</div>
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
          </div>
        </>
      </Backdrop>
    </DashboardLayout>
  );
}

export default PostTransactions;
