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
  const [amount, setAmount] = useState("");
  const [all, setAll] = useState([]);
  const [all2, setAll2] = useState([]);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [account, setAccount] = useState("");
  const [amount2, setAmount2] = useState("");
  const [account2, setAccount2] = useState("");
  const [opened, setOpened] = useState(false);
  const [guise, setguise] = useState("");
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

  const handlePost = () => {
    if (totalCredit === totalDebit && totalCredit === Number(st[0].totalAmount)) {
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const idx = JSON.parse(sessionStorage.getItem("transaction"));
      const createdBy = data11.personalID;
      const others = [];
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const key in all) {
        others.push(all[key]);
      }
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const key in all2) {
        others.push(all2[key]);
      }
      const magic = others.map((items) => ({
        accountID: items.account,
        particulars: idx[0].particulars ? idx[0].particulars : idx[0].source,
        postedAmount: Number(items.amount),
        debitOrCredit: items.debitOrCredit,
        requestID: idx[0].requestID,
        linkingPostKey: idx[0].requestID,
        source: idx[0].source,
        postedBy: createdBy,
      }));
      const rawl = [
        {
          accountID: account,
          particulars: idx[0].particulars ? idx[0].particulars : idx[0].source,
          postedAmount: Number(amount),
          debitOrCredit: 0,
          requestID: idx[0].requestID,
          linkingPostKey: idx[0].requestID,
          source: idx[0].source,
          postedBy: createdBy,
        },
        {
          accountID: account2,
          particulars: idx[0].particulars ? idx[0].particulars : idx[0].source,
          postedAmount: Number(amount2),
          debitOrCredit: 1,
          requestID: idx[0].requestID,
          linkingPostKey: idx[0].requestID,
          source: idx[0].source,
          postedBy: createdBy,
        },
      ];
      if (
        rawl.find((r) => r.postedAmount === "" || r.accountID === "") ||
        magic.find((r) => r.postedAmount === 0 || "" || !r.accountID)
      ) {
        MySwal.fire({
          title: "Error",
          type: "danger",
          text: "Fill All Empty Required Fields (required fields have an asterisk after them)",
        });
      } else {
        const raw = JSON.stringify(rawl.concat(magic));
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
            const LedgerInfo = JSON.parse(localStorage.getItem("LedgerInfox"));
            const objWithIdIndex = LedgerInfo.findIndex(
              (obj) => obj.requestID === idx[0].requestID
            );

            if (objWithIdIndex > -1) {
              LedgerInfo.splice(objWithIdIndex, 1);
              const newf = JSON.stringify(LedgerInfo);
              localStorage.setItem("LedgerInfox", newf);
            }
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
      }
    } else if (totalCredit !== totalDebit) {
      MySwal.fire({
        title: "Error",
        type: "error",
        text: "Total Debit Must Be The Same As Total Credit",
      });
    } else {
      MySwal.fire({
        title: "Error",
        type: "error",
        text: "Total Credit/Debit Must Be The Same As Balance",
      });
    }
  };
  const addCredit = () => {
    all.push({ usef: all.length, amount: 0, debitOrCredit: 1 });
    setAll(all);
    setguise(Math.random() * 10000);
  };
  const remove = (item) => {
    setTotalCredit(totalCredit - Number(all[item].amount));
    all.splice(item, 1);
    setAll(all);
    setguise(Math.random() * 10000);
  };
  const addDebit = () => {
    all2.push({ usef: all2.length, amount: 0, debitOrCredit: 0 });
    setAll2(all2);
    setguise(Math.random() * 10000);
  };
  const remove2 = (item) => {
    setTotalDebit(totalDebit - Number(all2[item].amount));
    all2.splice(item, 1);
    setAll2(all2);
    setguise(Math.random() * 10000);
  };
  const handleTotalDebit = (v, r) => {
    let total = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < all2.length; i++) {
      total += all2[i].amount;
    }
    if (r === 1) {
      setTotalDebit(total + Number(amount));
    } else setTotalDebit(total + Number(v));
  };
  const handleTotalCredit = (v, r) => {
    let total = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < all.length; i++) {
      total += all[i].amount;
    }
    if (r === 1) {
      setTotalCredit(total + Number(amount2));
    } else setTotalCredit(total + Number(v));
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
                borderRight: "#f96d02 solid 3px",
              }}
            >
              <div className="col-sm-6">
                <Card
                  style={{
                    backgroundColor: "#36AE7C",
                    width: "33vw",
                    marginLeft: 10,
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <CardContent>
                    <Typography
                      style={{ color: "white" }}
                      sx={{ fontSize: 17, fontWeight: 800 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {st[0].particulars}
                    </Typography>
                  </CardContent>
                </Card>
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
                <MDInput
                  type="number"
                  label="Amount (NGN) "
                  value={amount || ""}
                  // onKeyUp={handleOnNameKeys}
                  className="form-control"
                  onChange={(e) => {
                    setAmount(e.target.value);
                    handleTotalDebit(e.target.value, 0);
                  }}
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
                  <option value="">--Select Account-- *</option>
                  {accountInfo.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </MDBox>
              {all2.map((items, indx) => (
                <MDBox mx={1} key={items.usef}>
                  <hr />
                  <MDInput
                    type="number"
                    label="Amount (NGN) "
                    // onKeyUp={handleOnNameKeys}
                    className="form-control"
                    onChange={(e) => {
                      all2[indx].amount = Number(e.target.value);
                      setAll2(all2);
                      handleTotalDebit(e.target.value, 1);
                    }}
                    variant="standard"
                    style={{
                      marginTop: "7px",
                      width: "23vw",
                    }}
                    required
                  />
                  <Fab
                    color="error"
                    onClick={() => remove2(indx)}
                    aria-label="add"
                    style={{
                      fontSize: "15px",
                      marginTop: "50px",
                      marginLeft: "20px",
                      color: "white",
                    }}
                    size="small"
                  >
                    x
                  </Fab>
                  <Form.Select
                    aria-label="Default select example"
                    style={{
                      marginTop: "20px",
                      width: "27vw",
                    }}
                    onChange={(e) => {
                      all2[indx].account = e.target.value;
                      setAll2(all2);
                    }}
                  >
                    <option value="">--Select Account-- *</option>
                    {accountInfo.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </MDBox>
              ))}
              <Fab
                color="warning"
                onClick={() => addDebit()}
                aria-label="add"
                style={{ marginLeft: "20px", fontSize: "27px", marginTop: "30px" }}
              >
                <AddIcon style={{ color: "white" }} />
              </Fab>
              <br />
              <MDInput
                label="Total(NGN)"
                value={totalDebit}
                disabled
                style={{ marginLeft: "20px", fontSize: "27px", marginTop: "30px" }}
              />
            </Grid>

            <Grid item xs={6} style={{ paddingLeft: "2vw" }}>
              <div className="col-sm-6">
                <Card
                  style={{
                    backgroundColor: "#C1224F",
                    width: "25vw",
                    marginLeft: "5rem",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <CardContent>
                    <Typography
                      style={{ color: "white" }}
                      sx={{ fontSize: 17, fontWeight: 800 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Balance (NGN) : {st[0].totalAmount}
                    </Typography>
                  </CardContent>
                </Card>
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
                <MDInput
                  type="number"
                  label="Amount (NGN) "
                  value={amount2 || ""}
                  // onKeyUp={handleOnNameKeys}
                  className="form-control"
                  onChange={(e) => {
                    setAmount2(e.target.value);
                    handleTotalCredit(e.target.value, 0);
                  }}
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
                  <option value="">--Select Account-- *</option>
                  {accountInfo.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </MDBox>
              {all.map((items, indx) => (
                <MDBox mx={1} key={items.usef}>
                  <hr />
                  <MDInput
                    type="number"
                    label="Amount (NGN) "
                    // onKeyUp={handleOnNameKeys}
                    className="form-control"
                    onChange={(e) => {
                      all[indx].amount = Number(e.target.value);
                      setAll(all);
                      handleTotalCredit(e.target.value, 1);
                    }}
                    variant="standard"
                    style={{
                      marginTop: "7px",
                      width: "23vw",
                    }}
                    required
                  />
                  <Fab
                    color="error"
                    onClick={() => remove(indx)}
                    aria-label="add"
                    style={{
                      fontSize: "15px",
                      marginTop: "50px",
                      marginLeft: "20px",
                      color: "white",
                    }}
                    size="small"
                  >
                    x
                  </Fab>
                  <Form.Select
                    aria-label="Default select example"
                    style={{
                      marginTop: "20px",
                      width: "27vw",
                    }}
                    onChange={(e) => {
                      all[indx].account = e.target.value;
                      setAll(all);
                    }}
                  >
                    <option value="">--Select Account-- *</option>
                    {accountInfo.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </MDBox>
              ))}
              <Fab
                color="warning"
                onClick={() => addCredit()}
                aria-label="add"
                style={{ fontSize: "27px", marginTop: "30px" }}
              >
                <AddIcon style={{ color: "white" }} />
              </Fab>
              <br />
              <MDInput
                label="Total(NGN)"
                value={totalCredit}
                disabled
                style={{ marginLeft: "20px", fontSize: "27px", marginTop: "30px" }}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={4} mb={1} style={{ marginLeft: "auto", marginRight: "auto", display: "flex" }}>
          <MDButton variant="gradient" style={Styles.buttonSx} onClick={() => handlePost()}>
            Post
          </MDButton>
        </MDBox>
      </Card>
      <div style={{ visibility: "hidden", fontSize: 0 }}>{guise}</div>
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
