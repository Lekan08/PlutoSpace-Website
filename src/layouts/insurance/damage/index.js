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
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
// import InsuranceDamageTable from "layouts/insurance/damage/data/insuranceDamageTableData";
import Styles from "styles";

function InsuranceDamage() {
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
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [damageAmountx, setDamageAmount] = useState("0");
  const [insurances, setInsurances] = useState([]);
  const [user, setUser] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [ownerx, setOwnerx] = useState("");
  const [ownerx2, setOwnerx2] = useState("");
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // Method to fetch particular insurance
  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    let isMounted = true;
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insurance/getByIds/${ids}`, {
      headers,
    })
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
          setInsurances(result);
          console.log(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    setOpened(true);
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
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
          setUser(result);
          setOpened(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnDamageAmountKeys = (valuee) => {
    const number = /^[0-9.]+$/;
    const value = String(valuee);
    if (!value.match(number)) {
      document.getElementById("amount").innerHTML = "Damage Amount - input only numbers<br>";
      return false;
    }
    if (value.match(number) && valuee !== "0") {
      document.getElementById("amount").innerHTML = "";
      return true;
    }
    if (value === "0") {
      document.getElementById("amount").innerHTML = "Damage Amount is required<br>";
      return false;
    }
    return false;
  };

  const handleClick = (e) => {
    if (handleOnDamageAmountKeys(damageAmountx)) {
      setOpened(true);
      e.preventDefault();

      // Calculating Damage Contribution
      const companyContributionPercent = insurances[0].plan.damageCompanyContribution / 100;
      const companyContribution = companyContributionPercent * damageAmountx;
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const personalIds = data11.personalID;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const ids = urlParams.get("id");
      const raw = JSON.stringify({
        orgID: orgIDs,
        insuranceID: ids,
        damageAmount: Number(damageAmountx),
        damageContribution: Number(companyContribution),
        createdBy: personalIds,
        approvedBy: Number(ownerx),
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      console.log(raw);
      fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insuranceDamageRequest/add`, requestOptions)
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
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
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
  };

  const handleValidate = (e) => {
    handleOnDamageAmountKeys(damageAmountx);
    handleClick(e);
  };
  // eslint-disable-next-line consistent-return
  const handleGets = () => {
    if (start && end) {
      setOpened(true);
      const headers = miHeaders;
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const strt = start.getTime();
      const ends = end.getTime();
      const orgIDs = data11.orgID;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const ids = urlParams.get("id");
      let isMounted = true;
      fetch(
        `${process.env.REACT_APP_JOHANNESBURG_URL}/insuranceDamageRequest/getForInsurance/${orgIDs}/${ids}?startTime=${strt}&endTime=${ends}`,
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
            setItems(result);
            setGets(true);
            setOpened(false);
            console.log(result);
          }
        });
      return () => {
        isMounted = false;
      };
    }
  };

  const handleUpdateInsuranceDamage = (value) => {
    const filteredItems = items.filter((item) => item.id === value);
    console.log(filteredItems);
    navigate(`/insurance/damage/update?id=${value}`);
  };
  // Method to handle disable
  const handleDisable = (value) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIds = data11.personalID;
    const [filteredItems] = items.filter((item) => item.id === value);
    if (filteredItems.approvedBy === personalIds) {
      MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setOpened(true);
          const requestOptions = {
            method: "DELETE",
            headers: miHeaders,
          };

          fetch(
            `${process.env.REACT_APP_JOHANNESBURG_URL}/insuranceDamageRequest/delete/${value}`,
            requestOptions
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
              setOpened(false);
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
    } else {
      MySwal.fire({
        title: "ERROR",
        type: "success",
        text: "You're not in charge of this decision",
      });
    }
  };

  // Method to handle decision making
  const handleDecisionMaking = (idx, commentx, statusx) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const personalIds = data11.personalID;
    const raw = JSON.stringify({
      id: idx,
      approvedBy: personalIds,
      status: statusx,
      approvedComment: commentx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    fetch(
      `${process.env.REACT_APP_JOHANNESBURG_URL}/insuranceDamageRequest/approveOrDecline`,
      requestOptions
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
        MySwal.fire({
          title: resultx.status,
          type: "success",
          text: resultx.message,
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
  };
  const handleForward = (value) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIds = data11.personalID;
    const [filteredItems] = items.filter((item) => item.id === value);
    setIDX(value);
    if (filteredItems.approvedBy === personalIds) {
      handleOpen2();
      console.log("aiitings");
    } else {
      MySwal.fire({
        title: "ERROR",
        type: "success",
        text: "You're not in charge of this decision",
      });
    }
  };
  const handleForwardDecision = () => {
    setOpened(true);
    const raw = JSON.stringify({});
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(IDX);
    fetch(
      `${process.env.REACT_APP_JOHANNESBURG_URL}/insuranceDamageRequest/forward/${IDX}/${ownerx2}`,
      requestOptions
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
        handleClose2();
        setOpened(false);
        MySwal.fire({
          title: resultx.status,
          type: "success",
          text: resultx.message,
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
  // Method to handle decision making on insurance damage request
  const handleDecisionInsurance = (value, status) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIds = data11.personalID;
    const [filteredItems] = items.filter((item) => item.id === value);
    if (status === 1 && filteredItems.approvedBy === personalIds) {
      MySwal.fire({
        title: "Approve Insurance Damage Request",
        html: ` <table><tr><td>
                 <label for="comment">Comment*</label></td>
                 <td><input type="text" id="comment" class="swal2-input"></td></tr><br>
                 </table>`,
        confirmButtonText: "Save",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        preConfirm: () => {
          const comment = Swal.getPopup().querySelector("#comment").value;
          if (!comment) {
            Swal.showValidationMessage(`Please enter reason for approving`);
          } else {
            Swal.resetValidationMessage();
            handleDecisionMaking(value, comment, status);
          }
        },
      });
    } else if (status === 2 && filteredItems.approvedBy === personalIds) {
      MySwal.fire({
        title: "Decline Insurance Damage Request",
        html: ` <table><tr><td>
                     <label for="comment">Comment*</label></td>
                     <td><input type="text" id="comment" class="swal2-input"></td></tr><br>
                     </table>`,
        confirmButtonText: "Save",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        preConfirm: () => {
          const comment = Swal.getPopup().querySelector("#comment").value;
          if (!comment) {
            Swal.showValidationMessage(`Please enter reason for declining`);
          } else {
            Swal.resetValidationMessage();
            handleDecisionMaking(value, comment, status);
          }
        },
      });
    } else {
      MySwal.fire({
        title: "ERROR",
        type: "success",
        text: "You're not in charge of this decision",
      });
    }
  };

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    if (timestamp <= 0) return "";
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  // Method to change display for status
  const changeStatus = (status) => {
    const filteredItems = items.filter((item) => item.id === status);
    if (filteredItems[0].status === 0) {
      return "Created";
    }
    if (filteredItems[0].status === 1) {
      return "Approved";
    }
    return "Declined";
  };

  const changeCol = (status) => {
    const filteredItems = items.filter((item) => item.id === status);
    if (filteredItems[0].status === 0) {
      return "#0096FF";
    }
    if (filteredItems[0].status === 1) {
      return "#00FF00";
    }
    return "#FF0000";
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
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Add Insurance Damage Request
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="user">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="check">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="general">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={0}>
              <Container>
                <div className="row">
                  <div className="col-sm-8">
                    <MDInput
                      type="text"
                      label="Damage Amount (NGN)"
                      value={damageAmountx || "0"}
                      onChange={(e) => setDamageAmount(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox textAlign="left">
              <MDBox mt={4} textAlign="left">
                <MDBox>
                  <MDTypography variant="button" fontWeight="regular" fontSize="80%" color="text">
                    Should be Approved By
                  </MDTypography>
                  <Form.Select
                    style={{ width: "20rem" }}
                    value={ownerx}
                    onChange={(e) => setOwnerx(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option value="">Select User</option>
                    {user.map((api) => (
                      <option key={api.personal.id} value={api.personal.id}>
                        {api.personal.fname} {api.personal.lname}
                      </option>
                    ))}
                  </Form.Select>
                </MDBox>
              </MDBox>
            </MDBox>
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
          <br />
          <hr />
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            style={{ backgroundColor: "#f96d02" }}
            mx={2}
            mt={10}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Generate Insurance Damage Request History
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
          </MDBox>

          <div className="row" style={{ padding: "5%" }}>
            <div className="col-sm-6">
              <MDTypography
                variant="button"
                fontWeight="regular"
                fontSize="80%"
                align="left"
                color="text"
                mt={2}
              >
                From
              </MDTypography>
              <DatePicker
                placeholderText="MM/DD/YY"
                style={{ marginRight: "10px" }}
                selected={start}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                onChange={(time) => setStart(time)}
              />
              <i style={{ color: "red", fontSize: "60%" }}>required</i>
            </div>
            <div className="col-sm-6">
              <MDTypography
                variant="button"
                fontWeight="regular"
                fontSize="80%"
                align="left"
                color="text"
                mt={2}
              >
                To
              </MDTypography>
              <DatePicker
                placeholderText="MM/DD/YY"
                style={{ marginRight: "10px" }}
                selected={end}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                onChange={(time) => setEnd(time)}
              />
              <i style={{ color: "red", fontSize: "60%" }}>required</i>
            </div>
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
              Generate History
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
                  { Header: "created by", accessor: "createdByName", align: "left" },
                  { Header: "damage amount (in NGN)", accessor: "damageAmount", align: "left" },
                  {
                    Header: "damage contribution (in NGN)",
                    accessor: "damageContribution",
                    align: "left",
                  },
                  {
                    Header: "Created Date",
                    accessor: "createdTime",
                    Cell: ({ cell: { value } }) => changeDate(value),
                    align: "left",
                  },
                  {
                    Header: "Status",
                    accessor: "status",
                    Cell: ({ cell: { row } }) => (
                      <span
                        className="badge badge-pill"
                        style={{ backgroundColor: changeCol(row.original.id) }}
                      >
                        {changeStatus(row.original.id)}
                      </span>
                    ),
                    align: "left",
                  },
                  { Header: "decision by", accessor: "approvedByName", align: "left" },
                  {
                    Header: "Decision Date",
                    accessor: "approvedTime",
                    Cell: ({ cell: { value } }) => changeDate(value),
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
                            <Dropdown.Item onClick={() => handleUpdateInsuranceDamage(value)}>
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
                            </Dropdown.Item>
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
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open2}
          onClose={handleClose2}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open2}>
            <MDBox sx={style}>
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
                  Forward Decision To
                </MDTypography>
              </MDBox>
              <MDTypography id="transition-modal-description" sx={{ mt: 2 }}>
                <MDBox mt={2}>
                  <MDBox textAlign="center">
                    <br />
                    <MDBox textAlign="left">
                      <MDBox mt={1} textAlign="center">
                        <MDBox>
                          <Form.Select
                            style={{ width: "20rem", marginRight: "auto", marginLeft: "auto" }}
                            value={ownerx2}
                            onChange={(e) => setOwnerx2(e.target.value)}
                            aria-label="Default select example"
                          >
                            <option value="">Select User</option>
                            {user.map((api) => (
                              <option key={api.personal.id} value={api.personal.id}>
                                {api.personal.fname} {api.personal.lname}
                              </option>
                            ))}
                          </Form.Select>
                        </MDBox>
                        <div
                          className="row"
                          style={{
                            paddingTop: "2rem",
                            textAlign: "center",
                            marginRight: "auto",
                            marginLeft: "auto",
                          }}
                        >
                          <div className="col-sm-6">
                            <MDButton
                              variant="gradient"
                              onClick={handleForwardDecision}
                              //   color="info"
                              style={Styles.buttonSx}
                              width="50%"
                              align="left"
                            >
                              Save
                            </MDButton>
                          </div>
                          <div className="col-sm-6">
                            <MDButton
                              variant="gradient"
                              onClick={handleClose2}
                              //   color="info"
                              style={Styles.buttonSx}
                              width="50%"
                              align="left"
                            >
                              Cancel
                            </MDButton>
                          </div>
                        </div>
                      </MDBox>
                    </MDBox>
                    <br />
                    <MDBox textAlign="center">
                      <br />
                      <br />
                      {/* <div className="row">
                        <div className="col-sm-6">
                          <ReactiveButton
                            size="large"
                            outline
                            shadow
                            animation
                            width="200px"
                            rounded
                            color="green"
                            onClick={handleCorporate}
                            idleText="Convert"
                          />
                        </div>
                        <div className="col-sm-6">
                          <ReactiveButton
                            size="large"
                            outline
                            shadow
                            animation
                            width="200px"
                            rounded
                            color="red"
                            onClick={handleClose2}
                            idleText="Cancel"
                          />
                        </div>
                      </div> */}
                    </MDBox>
                  </MDBox>
                </MDBox>
              </MDTypography>
            </MDBox>
          </Fade>
        </Modal>
      </MDBox>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default InsuranceDamage;
