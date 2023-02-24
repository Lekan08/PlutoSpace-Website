import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "examples/Footer";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
// import Icon from "@mui/material/Icon";
// import Select from "react-select";
import Styles from "styles";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";

function MakePayment() {
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [opened, setOpened] = useState(false);
  const [dataTablex, setDataTablex] = useState([]);
  const [amountx, setAmount] = useState("");
  const [notex] = useState("");
  const [collectedByx, setCollectedBy] = useState("");
  const [userInfox, setUserInfo] = useState([]);

  const [checkedAmountx, setCheckedAmountx] = useState(false);
  const [checkedCollectedByx, setCheckedCollectedByx] = useState(false);

  const handleAmount = (valuex) => {
    if (!valuex) {
      setCheckedAmountx(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = "Amount is required";
    }
    if (valuex) {
      setCheckedAmountx(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = " ";
    }
  };
  const handleCollectedBy = (valuex) => {
    setCollectedBy(valuex);
    if (!valuex) {
      setCheckedCollectedByx(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("collectedBy").innerHTML = "Collected by is required<br>";
    }
    if (valuex) {
      setCheckedCollectedByx(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("collectedBy").innerHTML = " ";
    }
  };

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    const raw = JSON.stringify({
      id: ids,
      amount: amountx,
      collectedBy: collectedByx,
      notes: notex,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_LOUGA_URL}/creditFacility/makePayment`, requestOptions)
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
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          window.location.reload();
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

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
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
          setUserInfo(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleGet = () => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const headers = miHeaders;

    fetch(`${process.env.REACT_APP_LOUGA_URL}/creditFacility/getByIds/${id}`, { headers })
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
        if (result.length !== 0) {
          if (result[0].payments !== null && result[0].payments.length > 0) {
            setDataTablex(result[0].payments);
          }
          setAmount(result[0].itemamount);
          setCollectedBy(result[0].itemCollectedBy);
        }
        console.log(result);
      }, []);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      handleGet();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };
  const handleValidate = (e) => {
    handleAmount(amountx);
    handleCollectedBy(collectedByx);
    if (checkedAmountx && checkedCollectedByx === true) {
      handleClick(e);
    }
  };

  const pColumns = [
    {
      Header: "Amount (NGN)",
      accessor: "amount",
      align: "left",
    },
    {
      Header: "Collected By",
      accessor: "collectedByName",
      align: "left",
    },
    {
      Header: "Collection Time",
      accessor: "collectionTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    // {
    //   Header: "Actions",
    //   accessor: "id",
    //   // eslint-disable-next-line react/prop-types
    //   Cell: ({ cell: { value } }) => (
    //     <div
    //       style={{
    //         width: "100%",
    //         backgroundColor: "#f96d02",
    //         borderRadius: "2px",
    //       }}
    //     >
    //       <Dropdown>
    //         <Dropdown.Toggle variant="secondary" id="dropdown-basic">
    //           <Icon sx={{ fontWeight: "light" }}>settings</Icon>
    //         </Dropdown.Toggle>

    //         {/* <Dropdown.Menu>
    //           <Dropdown.Item onClick={() => navigate(`/my-Bills/update-My-Bills?id=${value}`)}>
    //             Update
    //           </Dropdown.Item>
    //         </Dropdown.Menu> */}
    //       </Dropdown>
    //     </div>
    //   ),
    //   align: "left",
    // },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={30}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Make Payment
            </MDTypography>
          </MDBox>
          <MDBox
            variant="gradient"
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            borderRadius="lg"
            coloredShadow="success"
            mx={3}
            mt={1}
            p={1}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="gradient" fontSize="60%" color="error" id="amount">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="collectedBy">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      id="filled-number"
                      value={amountx}
                      label="Amount (NGN) "
                      placeholder="Amount "
                      type="number"
                      onChange={(e) => setAmount(e.target.value)}
                      onKeyUp={(e) => handleAmount(e.target.value)}
                      sx={{
                        width: 200,
                      }}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <Form.Select
                      value={collectedByx}
                      aria-label="Default select example"
                      //   onChange={(e) => setCollectedBy(e.target.value)}
                      onInput={(e) => handleCollectedBy(e.target.value)}
                    >
                      <option>--Collected By--</option>
                      {userInfox.map((item) => (
                        <option key={item.personal.id} value={item.personal.id}>
                          {item.personal.fname} {item.personal.lname}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  onClick={handleValidate}
                  color="info"
                  style={Styles.buttonSx}
                  width="50%"
                  align="left"
                >
                  Pay
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: dataTablex }}
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
    </DashboardLayout>
  );
}

export default MakePayment;
