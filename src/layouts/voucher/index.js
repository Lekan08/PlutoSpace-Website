/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Dropdown, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Modal, Button, Box } from "@mui/material";
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
import MDInput from "components/MDInput";

function Voucher() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    borderRadius: "2px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    borderRadius: "20px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const MySwal = withReactContent(Swal);
  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [amountx, setAmountx] = useState(0);
  const [amountW, setAmountW] = useState("");
  const [issuedx, setIssuedx] = useState("");
  const [issueTimex, setIssueTimex] = useState("");
  const [authorizedByx, setAuthorizedByx] = useState("");
  const [paymentMethodx, setPaymentMethodx] = useState("");
  const [particularx, setParticularx] = useState("");
  const [userInfox, setUserInfo] = useState([]);
  const [uid, setUid] = useState("");
  const [approverx, setApproverx] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const empID = data11.personalID;
    let isMounted = true;
    setOpened(true);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/voucher/getForApproval/${orgIDs}/${empID}`, {
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
        console.log(result);
        setItems(result);
        setOpened(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);
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
  const handleDecisionMaking = (idx, statusx) => {
    const issuedTo = items.filter((data) => data.id === idx);
    setIssuedx(issuedTo[0].empID);
    setUid(idx);
    if (Number(statusx) === 1) {
      MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f96d02",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Approve voucher!",
      }).then((result) => {
        if (result.isConfirmed === true) {
          handleClose();
          const headers = miHeaders;
          const data11 = JSON.parse(localStorage.getItem("user1"));
          const empID = data11.personalID;
          setOpened(true);
          fetch(`${process.env.REACT_APP_LOUGA_URL}/voucher/approveOrDecline/${idx}/${statusx}`, {
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
        }
      });
    } else {
      MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f96d02",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Disapprove voucher!",
      }).then((result) => {
        if (result.isConfirmed === true) {
          const headers = miHeaders;
          const data11 = JSON.parse(localStorage.getItem("user1"));
          const empID = data11.personalID;
          setOpened(true);
          fetch(`${process.env.REACT_APP_LOUGA_URL}/voucher/approveOrDecline/${idx}/${statusx}`, {
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
        }
      });
    }
  };
  const handleForwardDecision = (idx) => {
    handleOpen();
    setUid(idx);
  };
  const handleForward = () => {
    if (
      approverx !== "" &&
      String(approverx) !== String(items.filter((data) => data.id === uid)[0].approverID)
    ) {
      setOpened(false);
      handleClose();
      MySwal.fire({
        title: "Voucher",
        text: "Would you like to create a voucher for this bill?",
        icon: "warning",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonColor: "#f96d02",
        // cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        denyButtonText: "No",
      }).then((result) => {
        if (result.isDenied === true) {
          handleClose();
          const headers = miHeaders;
          const data11 = JSON.parse(localStorage.getItem("user1"));
          setOpened(true);
          fetch(`${process.env.REACT_APP_LOUGA_URL}/bills/forward/${uid}/${approverx}`, {
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
              handleClose();
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
        } else if (result.isConfirmed === true) {
          const issuedTo = items.filter((data) => data.id === uid);
          setIssuedx(issuedTo[0].empID);
          handleClose2();
          handleOpen2();
          const headers = miHeaders;
          setOpened(true);
          fetch(`${process.env.REACT_APP_LOUGA_URL}/bills/forward/${uid}/${approverx}`, {
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
              handleClose();
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
        }
      });
    } else if (
      String(approverx) === String(items.filter((data) => data.id === uid)[0].approverID)
    ) {
      alert("You can't forward a bill to the same user");
    } else {
      alert("Please Select A User");
    }
  };
  const handleVoucher = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const createdBy = data11.personalID;
    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      billID: uid,
      amount: Number(amountx),
      amountInWords: amountW,
      paymentMethod: paymentMethodx,
      authorizedBy: Number(authorizedByx),
      particulars: particularx,
      initiatedBy: createdBy,
      issuedTo: Number(issuedx),
      issueTime: new Date(issueTimex).getTime(),
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(requestOptions);
    handleClose2();
    setOpened(true);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/voucher/add`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result2) => {
        console.log(result2);
      });
  };
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
              Voucher Attention
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
        </MDBox>
        <DataTable
          table={{
            columns: [
              { Header: "Particulars", accessor: "particulars", align: "left" },
              {
                Header: "Amount",
                accessor: "amount",
                align: "left",
              },
              {
                Header: "Issued To",
                accessor: "issueToName",
                align: "left",
              },
              {
                Header: "Payment Method",
                accessor: "paymentMethod",
                align: "left",
              },
              {
                Header: "Initiated By",
                accessor: "initiatedByName",
                align: "left",
              },
              {
                Header: "Status",
                accessor: "status",
                Cell: ({ cell: { value } }) => status(value),
                align: "left",
              },
              {
                Header: "Issue Time",
                accessor: "issueTime",
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
                        <Dropdown.Item onClick={() => handleDecisionMaking(value, 1)}>
                          Approve
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDecisionMaking(value, 2)}>
                          Decline
                        </Dropdown.Item>
                        {/* <Dropdown.Item onClick={() => handleForwardDecision(value)}>
                          Forward Approval
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
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ width: 800, textAlign: "center", ...style }}>
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            style={{ backgroundColor: "#f96d02" }}
            mx={5}
            mt={1}
            p={1}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
              Forward Bill Approval To
            </MDTypography>
          </MDBox>
          <div
            className="col-sm-10"
            style={{ padding: "1.8rem", marginLeft: "auto", marginRight: "auto" }}
          >
            <Form.Select
              value={approverx}
              aria-label="Default select example"
              //   onChange={(e) => setAssignTo(e.target.value)}
              onInput={(e) => setApproverx(e.target.value)}
            >
              <option value="">--Should be approved by--</option>
              {userInfox.map((item) => (
                <option key={item.personal.id} value={item.personal.id}>
                  {item.personal.fname} {item.personal.lname}
                </option>
              ))}
            </Form.Select>
          </div>
          <MDButton color="warning" onClick={handleForward}>
            Forward
          </MDButton>
          &nbsp;&nbsp;&nbsp;
          <MDButton
            variant="outlined"
            onClick={() => {
              handleClose();
              setOpened(false);
            }}
            color="error"
          >
            Cancel
          </MDButton>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ width: 700, ...style2 }}>
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            style={{ backgroundColor: "#f96d02" }}
            mx={5}
            mt={1}
            p={1}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
              Voucher
            </MDTypography>
          </MDBox>
          <TextField
            variant="standard"
            label="Amount (NGN)"
            value={amountx}
            onChange={(e) => setAmountx(e.target.value)}
            sx={{
              width: 300,
            }}
          />
          <TextField
            variant="standard"
            label="Amount In Words"
            value={amountW}
            onChange={(e) => setAmountW(e.target.value)}
            sx={{
              width: 600,
              marginBottom: 1,
            }}
          />
          <br />
          <TextField
            id="outlined-textarea"
            rows={2}
            value={particularx || ""}
            label="Particulars"
            onChange={(e) => setParticularx(e.target.value)}
            sx={{
              width: 600,
            }}
            multiline
            required
          />
          <br />
          <div className="row">
            <div className="col-sm-6" style={{ paddingTop: "1rem", paddingBottom: "1.8rem" }}>
              <Form.Select
                value={authorizedByx}
                aria-label="Default select example"
                onChange={(e) => setAuthorizedByx(e.target.value)}
              >
                <option value="">Authorized By</option>
                {userInfox.map((item) => (
                  <option key={item.personal.id} value={item.personal.id}>
                    {item.personal.fname} {item.personal.lname}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col-sm-6" style={{ paddingTop: "1rem", paddingBottom: "1.8rem" }}>
              <Form.Select
                value={paymentMethodx}
                aria-label="Default select example"
                onChange={(e) => setPaymentMethodx(e.target.value)}
              >
                <option value="">Payment Method</option>
                <option value="CASH">Cash</option>
                <option value="CHEQUE">Cheque</option>
              </Form.Select>
            </div>
          </div>
          <div className="col-sm-5">
            <b style={{ fontSize: "11px" }}>offboarding starts</b>
            <TextField
              id="datetime-local"
              // label="onboarding starts"
              type="datetime-local"
              // style={{ width: "150px" }}
              InputLabelProps={{
                shrink: true,
              }}
              value={issueTimex}
              onChange={(e) => {
                setIssueTimex(e.target.value);
              }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <MDButton color="warning" onClick={handleVoucher}>
              Submit
            </MDButton>
            &nbsp;&nbsp;&nbsp;
            <MDButton
              variant="outlined"
              onClick={() => {
                handleClose2();
                setOpened(false);
              }}
              color="error"
            >
              Cancel
            </MDButton>
          </div>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default Voucher;
