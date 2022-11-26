import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Dropdown } from "react-bootstrap";
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
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

function GeneralSubscription() {
  const { allGHeaders: miHeaders } = GHeaders();
  const MySwal = withReactContent(Swal);

  const [dataTablex, setDataTable] = useState([]);
  const [startTimexx, setStartTime] = useState("");
  const [empIDsx, setEmpIDsx] = useState([]);
  const [createdBysx, setCreatedBysx] = useState([]);
  const [approvedBysx, setApprovedBysx] = useState([]);
  const [empIDsxT, setEmpIDsxT] = useState([]);
  const [createdBysxT, setCreatedBysxT] = useState([]);
  const [approvedBysxT, setApprovedBysxT] = useState([]);
  const [endTimexx, setEndTimexx] = useState("");
  //   const [totalAmountx, setTotalAmountx] = useState("");
  const [startAmountx, setStartAmountx] = useState("");
  const [endAmountx, setEndAmountx] = useState("");
  const [userInfox, setUserInfo] = useState([]);
  //   const [purposex, setPurposex] = useState("");

  //   const ITEM_HEIGHT = 48;
  //   const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        width: 260,
      },
    },
  };

  const [checkedStartTime, setCheckedStartTime] = useState(false);
  const [checkedSEndTimex, setCheckedEndTime] = useState(false);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  //   const classes = useStyles();
  //   const [selected, setSelected] = useState([]);
  //   const isAllSelected = userInfox.length > 0 && selected.length === userInfox.length;

  const { allPHeaders: myHeaders } = PHeaders();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);

    let duplicateRemoved = [];
    const empIDNeeded = [];

    value.forEach((item) => {
      if (duplicateRemoved.findIndex((o) => o.id === item.id) >= 0) {
        duplicateRemoved = duplicateRemoved.filter((x) => x.id === item.id);
      } else {
        duplicateRemoved.push(item);
        empIDNeeded.push(item.id);
      }
    });

    setEmpIDsxT(duplicateRemoved);
    setEmpIDsx(empIDNeeded);
  };

  const handleChangeCrea = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);
    let duplicateRemoved = [];
    const createdByNeeded = [];

    value.forEach((item) => {
      if (duplicateRemoved.findIndex((o) => o.id === item.id) >= 0) {
        duplicateRemoved = duplicateRemoved.filter((x) => x.id === item.id);
      } else {
        duplicateRemoved.push(item);
        createdByNeeded.push(item.id);
      }
    });

    setCreatedBysxT(duplicateRemoved);
    setCreatedBysx(createdByNeeded);
  };
  const handleChangeCreaAppr = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);
    let duplicateRemoved = [];
    const approvedByNeeded = [];

    value.forEach((item) => {
      if (duplicateRemoved.findIndex((o) => o.id === item.id) >= 0) {
        duplicateRemoved = duplicateRemoved.filter((x) => x.id === item.id);
      } else {
        duplicateRemoved.push(item);
        approvedByNeeded.push(item.id);
      }
    });

    setApprovedBysxT(duplicateRemoved);
    setApprovedBysx(approvedByNeeded);
  };

  const handleTime = (valuex) => {
    console.log(valuex);
    const sTime = new Date(valuex).getTime();
    if (!sTime) {
      setCheckedStartTime(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("startTime").innerHTML = "Select a Start Time <br>";
    }
    if (sTime) {
      console.log("working2222222");
      setCheckedStartTime(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("startTime").innerHTML = " ";
    }
  };

  const handleTimex = (valuex) => {
    console.log(valuex);
    const FETime = new Date(valuex).getTime();
    if (!FETime) {
      setCheckedEndTime(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("FETime").innerHTML = "Select an End Time <br>";
    }
    if (FETime) {
      console.log("working2222222");
      setCheckedEndTime(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("FETime").innerHTML = " ";
    }
  };

  const handleApproveOrDecline = (id, status) => {
    console.log(status);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const approverID = data11.personalID;

    MySwal.fire({
      title: "Are you sure?",
      text: "You're about to change the status. You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed === true) {
        const requestOptions = {
          method: "GET",
          headers: miHeaders,
        };
        fetch(
          `${process.env.REACT_APP_LOUGA_URL}/subscriptions/approveOrDecline/${id}/${approverID}/${status}`,
          requestOptions
        )
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

  const handleFilter = (e) => {
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const startTimex = new Date(startTimexx).getTime();
    const endTimex = new Date(endTimexx).getTime();
    const approverStatusx = -1;
    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      startTime: startTimex,
      endTime: endTimex,
      approverStatus: approverStatusx,
      empIDs: empIDsx,
      createdBys: createdBysx,
      approvedBys: approvedBysx,
      startAmount: startAmountx,
      endAmount: endAmountx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (endTimex < startTimex) {
      MySwal.fire({
        title: "Invalid Date",
        type: "error",
        text: "Your Start Time Date should come before your End Time Date",
      });
    } else {
      setOpened(true);
      fetch(`${process.env.REACT_APP_LOUGA_URL}/subscriptions/gets`, requestOptions)
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

          console.log(result);
          setDataTable(result);
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

  // method handledeleteq

  const handleValidate = (e) => {
    handleTime(startTimexx);
    handleTimex(endTimexx);
    // console.log(checkedWorkflow);
    if (checkedStartTime && checkedSEndTimex === true) {
      handleFilter(e);
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
      Header: "Approver Name",
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
              <Dropdown.Item onClick={() => handleApproveOrDecline(value, 1)}>
                Approve{" "}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleApproveOrDecline(value, 2)}>
                Decline{" "}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
      align: "left",
    },
  ];

  const style = {
    display: "grid",
    placeItems: "center",
  };

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
              General Subscriptions
            </MDTypography>
          </MDBox>
          <MDBox
            mt={2}
            mb={2}
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <MDTypography variant="gradient" fontSize="60%" color="error" id="startTime">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="FETime">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-5">
                    <TextField
                      id="datetime-local"
                      label="Start Time *"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={startTimexx}
                      onChange={(e) => setStartTime(e.target.value)}
                      onInput={(e) => handleTime(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-2">
                    <></>
                  </div>
                  <div className="col-sm-5">
                    <TextField
                      id="datetime-local"
                      label="End Time *"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={endTimexx}
                      onChange={(e) => setEndTimexx(e.target.value)}
                      onInput={(e) => handleTimex(e.target.value)}
                    />
                  </div>
                </div>
                &nbsp; &nbsp;
                <div className="row">
                  <div className="col-sm-5">
                    <TextField
                      id="filled-number"
                      value={startAmountx || ""}
                      label="Start Amount (NGN) "
                      placeholder="Amount "
                      type="number"
                      onChange={(e) => setStartAmountx(e.target.value)}
                      //   onKeyUp={(e) => handleAmount(e.target.value)}
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
                      value={endAmountx || ""}
                      label="End Amount (NGN) "
                      placeholder="Amount "
                      type="number"
                      onChange={(e) => setEndAmountx(e.target.value)}
                      //   onKeyUp={(e) => handleTaxAmount(e.target.value)}
                      sx={{
                        width: 250,
                      }}
                    />
                  </div>
                </div>
                &nbsp; &nbsp;
                <div className="row">
                  <div className="col-sm-5">
                    <FormControl sx={{ width: 250 }}>
                      <InputLabel id="demo-multiple-checkbox-label">Employee</InputLabel>
                      <Select
                        style={{ height: "40px" }}
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={empIDsxT}
                        onChange={handleChange}
                        input={<OutlinedInput label="Employee" />}
                        // eslint-disable-next-line no-shadow
                        renderValue={(selected) =>
                          selected.map((x) => `${x.fname} ${x.lname}`).join(", ")
                        }
                        MenuProps={MenuProps}
                      >
                        {userInfox.map((variant) => (
                          <MenuItem key={variant.personal.id} value={variant.personal}>
                            <Checkbox
                              checked={
                                empIDsxT.findIndex((item) => item.id === variant.personal.id) >= 0
                              }
                            />
                            <ListItemText
                              primary={`${variant.personal.fname} ${variant.personal.lname}`}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-sm-2">
                    <></>
                  </div>
                  <div className="col-sm-5">
                    <FormControl sx={{ width: 250 }}>
                      <InputLabel id="demo-multiple-checkbox-label">Created By</InputLabel>
                      <Select
                        style={{ height: "40px" }}
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={createdBysxT}
                        onChange={handleChangeCrea}
                        input={<OutlinedInput label="Created By" />}
                        // eslint-disable-next-line no-shadow
                        renderValue={(selected) =>
                          selected.map((x) => `${x.fname} ${x.lname}`).join(", ")
                        }
                        MenuProps={MenuProps}
                      >
                        {userInfox.map((variant) => (
                          <MenuItem key={variant.personal.id} value={variant.personal}>
                            <Checkbox
                              checked={
                                createdBysxT.findIndex((item) => item.id === variant.personal.id) >=
                                0
                              }
                            />
                            <ListItemText
                              primary={`${variant.personal.fname} ${variant.personal.lname}`}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                &nbsp; &nbsp;
                <div className="row">
                  <div className="col-sm-12" style={style}>
                    <FormControl sx={{ width: 450 }}>
                      <InputLabel id="demo-multiple-checkbox-label">Approved By</InputLabel>
                      <Select
                        style={{ height: "43px" }}
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={approvedBysxT}
                        onChange={handleChangeCreaAppr}
                        input={<OutlinedInput label="Approved By" />}
                        // eslint-disable-next-line no-shadow
                        renderValue={(selected) =>
                          selected.map((x) => `${x.fname} ${x.lname}`).join(", ")
                        }
                        MenuProps={MenuProps}
                      >
                        {userInfox.map((variant) => (
                          <MenuItem key={variant.personal.id} value={variant.personal}>
                            <Checkbox
                              checked={
                                approvedBysxT.findIndex(
                                  (item) => item.id === variant.personal.id
                                ) >= 0
                              }
                            />
                            <ListItemText
                              primary={`${variant.personal.fname} ${variant.personal.lname}`}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                &nbsp; &nbsp;
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
                  Filter
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

export default GeneralSubscription;
