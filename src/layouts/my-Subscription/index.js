import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import GHeaders from "getHeader";
import TextField from "@mui/material/TextField";
import DataTable from "examples/Tables/DataTable";
import Styles from "styles";

function MySubscription() {
  const { allGHeaders: miHeaders } = GHeaders();
  const MySwal = withReactContent(Swal);

  const [dataTablex, setDataTable] = useState([]);
  const [typex, setType] = useState("");
  const [paidAmountx, setPaidAmountx] = useState("");
  //   const [totalAmountx, setTotalAmountx] = useState("");
  const [taxAmountx, setTaxAmountx] = useState("");
  const [amountx, setAmountx] = useState("");
  const [assignedTox, setAssignTo] = useState("");
  const [particularsx, setParticularsx] = useState("");
  const [pricePerUnitx, setPricePerUnit] = useState("");
  const [frequencyx, setFrequency] = useState("");
  const [userInfox, setUserInfo] = useState([]);

  const [checkedTaxAmountx, setCheckedTaxAmount] = useState(false);
  const [checkedPaidAmountx, setCheckedPaidAmount] = useState(false);
  const [checkedAmountx, setCheckedAmountx] = useState(false);
  const [checkAssignx, setCheckedAssign] = useState(false);
  const [checkParticulars, setCheckedParticular] = useState(false);
  const [checkCheckedType, setCheckedType] = useState(false);
  const [checkCheckedPricePerUnit, setCheckedPricePerUnit] = useState(false);
  const [checkCheckedFrequencyTime, setCheckedFrequencyTime] = useState(false);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const totalAmountx = parseInt(taxAmountx, 10) + parseInt(amountx, 10);

  const { allPHeaders: myHeaders } = PHeaders();

  const handleonAssign = (valuex) => {
    setAssignTo(valuex);
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedAssign(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("assign").innerHTML = "Assign Subscription to user <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedAssign(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("assign").innerHTML = " ";
    }
  };

  const handleParticulars = (valuex) => {
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedParticular(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("particulars").innerHTML = "Particulars is required <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedParticular(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("particulars").innerHTML = " ";
    }
  };
  const handleType = (valuex) => {
    setType(valuex);
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedType(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("type").innerHTML = "Subscription Type is required <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedType(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("type").innerHTML = " ";
    }
  };

  const handleTaxAmount = (valuex) => {
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedTaxAmount(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("taxAmount").innerHTML = "Tax Amount is required <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedTaxAmount(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("taxAmount").innerHTML = " ";
    }
  };

  const handlePaidAmountx = (valuex) => {
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedPaidAmount(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("paidAmount").innerHTML = "Paid Amount is required <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedPaidAmount(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("paidAmount").innerHTML = " ";
    }
  };

  const handleFrequencyTime = (valuex) => {
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedFrequencyTime(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("frequency").innerHTML = "Subscription Period is required <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedFrequencyTime(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("frequency").innerHTML = " ";
    }
  };
  const handlePricePerUnit = (valuex) => {
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedPricePerUnit(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("pricePerUnit").innerHTML = "Price per period is required <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedPricePerUnit(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("pricePerUnit").innerHTML = " ";
    }
  };

  const handleAmount = (valuex) => {
    console.log(valuex);
    if (!valuex) {
      setCheckedAmountx(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = "Amount is required";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedAmountx(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("amount").innerHTML = " ";
    }
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
          console.log(result);
          setUserInfo(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // eslint-disable-next-line consistent-return
  const handleClick = (e) => {
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const currentlyLogegdIn = data11.personalID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      empID: assignedTox,
      createdBy: currentlyLogegdIn,
      amount: amountx,
      taxAmount: taxAmountx,
      totalAmount: totalAmountx,
      paidAmount: paidAmountx,
      particulars: particularsx,
      type: typex,
      frequency: frequencyx,
      pricePerUnit: pricePerUnitx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(requestOptions);

    setOpened(true);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/subscriptions/add`, requestOptions)
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

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const empID = data11.personalID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/subscriptions/getForEmp/${orgIDs}/${empID}`, {
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
            console.log(result);
            setDataTable(result);
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // method handledeleteq

  const handledeleteq = (id) => {
    console.log(id);
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed === true) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };
        fetch(`${process.env.REACT_APP_LOUGA_URL}/subscriptions/delete/${id}`, requestOptions)
          .then((res) => res.json())
          .then((resx) => {
            if (resx.message === "Expired Access") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            }
            MySwal.fire({
              title: resx.status,
              type: "success",
              text: resx.message,
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
    });
  };

  const handleValidate = (e) => {
    handleAmount(amountx);
    handleTaxAmount(taxAmountx);
    handlePaidAmountx(paidAmountx);
    handleonAssign(assignedTox);
    handleParticulars(particularsx);
    handleType(typex);
    handleFrequencyTime(typex);
    handlePricePerUnit(pricePerUnitx);
    // console.log(checkedWorkflow);
    if (
      checkedTaxAmountx &&
      checkedAmountx &&
      checkParticulars &&
      checkAssignx &&
      checkCheckedType &&
      checkCheckedPricePerUnit &&
      checkCheckedFrequencyTime &&
      checkedPaidAmountx === true
    ) {
      handleClick(e);
    }
  };

  // Method to change status
  // eslint-disable-next-line consistent-return
  const status = (statusx) => {
    const num = Number(statusx);
    if (num === 0) {
      return "UNDECIDED";
    }
    if (num === 1) {
      return "APPROVED";
    }
    if (num === 2) {
      return "DECLINED";
    }
  };

  //  Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  // Table for Data

  const pColumns = [
    {
      Header: "Particulars ",
      accessor: "particulars",
      align: "left",
    },
    {
      Header: "Type",
      accessor: "type",
      align: "left",
    },
    {
      Header: "Subscription Period",
      accessor: "frequency",
      align: "left",
    },
    {
      Header: "Price Per Period",
      accessor: "pricePerUnit",
      align: "left",
    },
    {
      Header: "Amount",
      accessor: "amount",
      align: "left",
    },
    {
      Header: "Tax Amount",
      accessor: "taxAmount",
      align: "left",
    },
    {
      Header: "Paid Amount",
      accessor: "paidAmount",
      align: "left",
    },
    {
      Header: "Created By",
      accessor: "createdByName",
      align: "left",
    },
    {
      Header: "Assigned To",
      accessor: "empName",
      align: "left",
    },
    {
      Header: "Decision Made By",
      accessor: "approverName",
      align: "left",
    },
    {
      Header: "Approver Status",
      accessor: "approvalStatus",
      Cell: ({ cell: { value } }) => status(value),
      align: "left",
    },
    {
      Header: "Created Time",
      accessor: "createdTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "Actions",
      accessor: "id",
      // eslint-disable-next-line react/prop-types
      Cell: ({ cell: { value } }) => (
        <div
          style={{
            width: "100%",
            backgroundColor: "#f96d02",
            borderRadius: "2px",
          }}
        >
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <Icon sx={{ fontWeight: "light" }}>settings</Icon>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => navigate(`/subscription/update-Subscription?id=${value}`)}
              >
                Update
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handledeleteq(value)}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
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
              Subscription
            </MDTypography>
          </MDBox>
          <MDBox
            mt={2}
            mb={2}
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <MDTypography variant="gradient" fontSize="60%" color="error" id="amount">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="taxAmount">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="paidAmount">
              {" "}
            </MDTypography>{" "}
            <MDTypography variant="gradient" fontSize="60%" color="error" id="particulars">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="type">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="frequency">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="pricePerUnit">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="assign">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-5">
                    <TextField
                      id="filled-number"
                      value={amountx || ""}
                      label="Amount (NGN) "
                      placeholder="Amount "
                      type="number"
                      onChange={(e) => setAmountx(e.target.value)}
                      onKeyUp={(e) => handleAmount(e.target.value)}
                      sx={{
                        width: 250,
                      }}
                      required
                    />
                  </div>
                  <div className="col-sm-2">
                    <></>
                  </div>
                  <div className="col-sm-5">
                    <TextField
                      id="filled-number"
                      value={taxAmountx || ""}
                      label="Tax Amount (NGN) "
                      placeholder="Amount "
                      type="number"
                      onChange={(e) => setTaxAmountx(e.target.value)}
                      onKeyUp={(e) => handleTaxAmount(e.target.value)}
                      sx={{
                        width: 250,
                      }}
                      required
                    />
                  </div>
                </div>
                &nbsp; &nbsp;
                <div className="row">
                  <div className="col-sm-5">
                    <TextField
                      id="filled-read-only-input"
                      label="Total Amount of Subscription (NGN)"
                      value={totalAmountx || " "}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        width: 250,
                      }}
                    />
                  </div>
                  <div className="col-sm-2">
                    <></>
                  </div>
                  <div className="col-sm-5">
                    <TextField
                      id="filled-number"
                      value={paidAmountx || ""}
                      label="Paid Amount (NGN) "
                      placeholder="Paid Amount "
                      type="number"
                      onChange={(e) => setPaidAmountx(e.target.value)}
                      onKeyUp={(e) => handlePaidAmountx(e.target.value)}
                      sx={{
                        width: 250,
                      }}
                      required
                    />
                  </div>
                </div>
                &nbsp; &nbsp;
                <div className="col-sm-12">
                  <TextField
                    id="outlined-textarea"
                    rows={2}
                    value={particularsx || ""}
                    label="Particulars "
                    placeholder="Particulars "
                    onChange={(e) => setParticularsx(e.target.value)}
                    onKeyUp={(e) => handleParticulars(e.target.value)}
                    sx={{
                      width: 600,
                    }}
                    multiline
                    required
                  />
                </div>
                &nbsp; &nbsp;
                <div className="row">
                  <div className="col-sm-6">
                    <Form.Select
                      value={typex}
                      aria-label="Default select example"
                      //   onChange={(e) => setAssignTo(e.target.value)}
                      onInput={(e) => handleType(e.target.value)}
                    >
                      <option value="">--Type of Subscription--</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </Form.Select>
                  </div>

                  <div className="col-sm-6">
                    <TextField
                      id="filled-number"
                      value={frequencyx || ""}
                      label="Subscription Period "
                      placeholder="Subscription Period "
                      type="number"
                      onChange={(e) => setFrequency(e.target.value)}
                      onKeyUp={(e) => handleFrequencyTime(e.target.value)}
                      sx={{
                        width: 300,
                      }}
                      required
                    />
                  </div>
                </div>
                &nbsp; &nbsp;
                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                      id="filled-number"
                      value={pricePerUnitx || ""}
                      label="Price per Period (NGN) "
                      placeholder="Amount to be paid for each period "
                      type="number"
                      onChange={(e) => setPricePerUnit(e.target.value)}
                      onKeyUp={(e) => handlePricePerUnit(e.target.value)}
                      sx={{
                        width: 250,
                      }}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <Form.Select
                      value={assignedTox}
                      aria-label="Default select example"
                      //   onChange={(e) => setAssignTo(e.target.value)}
                      onInput={(e) => handleonAssign(e.target.value)}
                    >
                      <option value="">--Assign to--</option>
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
                  //   color="info"
                  style={Styles.buttonSx}
                  width="50%"
                  align="left"
                >
                  Save
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
      <div>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
          <CircularProgress color="info" />
        </Backdrop>
      </div>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default MySubscription;
