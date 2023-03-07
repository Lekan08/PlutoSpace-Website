import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
// import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Styles from "styles";

function AccountSheet() {
  const MySwal = withReactContent(Swal);

  //   const [namex, setName] = useState("");
  //   const [descripx, setDescrip] = useState("");

  //   const [enabled, setEnabled] = useState("");
  //   const [checkedName, setCheckedName] = useState("");
  const [items, setItems] = useState([]);
  const [account, setAccount] = useState({});

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  //   const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const getPostedTransactionsByAccountID = (accountID) => {
    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const orgIDs = data11.orgID;
    setOpened(true);
    const headers = miHeaders;
    const startTime = new Date("2020/02/02").getTime();
    const endTime = new Date().getTime();

    // const date = new Date();
    // const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    // const curDay = new Date().getTime();

    fetch(
      `${process.env.REACT_APP_LOUGA_URL}/accounts/getPostedTransaction/${accountID}/${startTime}/${endTime}`,
      {
        headers,
      }
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
        console.log(result);
        console.log(account);
        if (result.status !== 500) {
          // if (Object.keys(result).length !== 0) {
          if (result.length !== 0) {
            setItems(result);
          } else {
            setItems([]);
          }
        }

        setOpened(false);
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

  const thousandSeperator = (number) => {
    let value = 0;
    if (number !== 0) {
      let parts = 0;
      parts = number.toString().split(".");
      const numberPart = parts[0];
      const decimalPart = parts[1];
      const thousands = /\B(?=(\d{3})+(?!\d))/g;
      if (number !== 0) {
        value = numberPart.replace(thousands, ",") + (decimalPart ? `.${decimalPart}` : "");
      }
    }
    return value;
  };

  const handleGetByIDs = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const orgIDs = data11.orgID;
    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/accounts/getByIds/${id}`, {
      headers,
    })
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
        console.log(result);
        console.log(items);
        if (result.status !== 500) {
          // if (Object.keys(result).length !== 0) {
          if (result.length !== 0) {
            setAccount(result[0]);
            getPostedTransactionsByAccountID(result[0].id);
          } else {
            setAccount({});
          }
        }

        setOpened(false);
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

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      //   fetches the table data
      handleGetByIDs();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3}>
          <MDBox
            variant="gradient"
            //   bgColor="info"
            style={Styles.boxSx}
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Spreadsheet
            </MDTypography>
          </MDBox>
          <MDBox>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                overflow: "scroll",
              }}
            >
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px #0f0f0f solid",
                  paddingTop: "2%",
                  width: "90%",
                  height: "80vh",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <table
                  style={{
                    fontFamily: "Arial",
                    fontSize: "small",
                    textAlign: "left",
                    border: "1px solid #0f0f0f",
                    width: "90%",
                  }}
                >
                  <tbody>
                    <tr>
                      <th
                        colSpan={5}
                        style={{
                          textAlign: "center",
                          border: "1px solid #0f0f0f",
                          color: "black",
                          textTransform: "uppercase",
                        }}
                      >
                        {account.name}
                      </th>
                    </tr>
                    <tr>
                      <th style={{ border: "1px solid #0f0f0f", color: "black" }}>DATE</th>
                      <th style={{ border: "1px solid #0f0f0f", color: "black" }}>PARTICULARS</th>
                      <th style={{ border: "1px solid #0f0f0f", color: "black" }}>DR</th>
                      <th style={{ border: "1px solid #0f0f0f", color: "black" }}>CR</th>
                      <th style={{ border: "1px solid #0f0f0f", color: "black" }}>BALANCE</th>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #0f0f0f", color: "black" }} />
                      <td style={{ border: "1px solid #0f0f0f", color: "black" }}>
                        OPENING BALANCE
                      </td>
                      <td
                        style={{ textAlign: "end", border: "1px solid #0f0f0f", color: "black" }}
                      />
                      <td
                        style={{ textAlign: "end", border: "1px solid #0f0f0f", color: "black" }}
                      />
                      <td style={{ textAlign: "end", border: "1px solid #0f0f0f", color: "black" }}>
                        {thousandSeperator(account.startingBalance || 0)}
                      </td>
                    </tr>
                    {items.map((eachItem) => (
                      <tr>
                        <td style={{ border: "1px solid #0f0f0f", color: "black" }}>
                          {changeDate(eachItem.postedTime)}
                        </td>
                        <td
                          style={{
                            border: "1px solid #0f0f0f",
                            color: "black",
                            textTransform: "uppercase",
                          }}
                        >
                          {eachItem.particular}
                        </td>
                        <td
                          style={{ textAlign: "end", border: "1px solid #0f0f0f", color: "black" }}
                        >
                          {eachItem.debitOrCredit === 0 &&
                            thousandSeperator(eachItem.postedAmount || 0)}
                        </td>
                        <td
                          style={{ textAlign: "end", border: "1px solid #0f0f0f", color: "black" }}
                        >
                          {eachItem.debitOrCredit === 1 &&
                            thousandSeperator(eachItem.postedAmount || 0)}
                        </td>
                        <td
                          style={{ textAlign: "end", border: "1px solid #0f0f0f", color: "black" }}
                        />
                      </tr>
                    ))}
                    <tr>
                      <td style={{ border: "1px solid #0f0f0f", color: "black" }} />
                      <td style={{ border: "1px solid #0f0f0f", color: "black" }} />
                      <td
                        style={{ textAlign: "end", border: "1px solid #0f0f0f", color: "black" }}
                      />
                      <td
                        style={{ textAlign: "end", border: "1px solid #0f0f0f", color: "black" }}
                      />
                      <td style={{ textAlign: "end", border: "1px solid #0f0f0f", color: "black" }}>
                        {thousandSeperator(account.currentBalance || 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default AccountSheet;
