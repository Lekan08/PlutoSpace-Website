import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import BillJourney from "./bill-Progress";

function MyBills() {
  const { allGHeaders: miHeaders } = GHeaders();
  const MySwal = withReactContent(Swal);

  const [dataTablex, setDataTable] = useState([]);
  const [extraInfox, setExtraInfox] = useState("");
  const [paidAmountx, setPaidAmountx] = useState("");
  const [approverx, setApproverx] = useState("");
  const [openBJ, setOpenBJ] = useState(false);
  const [taxAmountx, setTaxAmountx] = useState("");
  const [amountx, setAmountx] = useState("");
  const [userInfox, setUserInfo] = useState([]);
  const [assignedTox, setAssignTo] = useState("");
  const [purposex, setPurposex] = useState("");
  const [files, setFiles] = useState("");
  const [billID, setBillID] = useState("");
  const [carryBJID, setCarryBJID] = useState("");
  const [open, setOpen] = useState(false);
  const handleCloseModal = () => setOpen(false);

  const [checkedTaxAmountx, setCheckedTaxAmount] = useState(false);
  const [checkedPaidAmountx, setCheckedPaidAmount] = useState(false);
  const [checkedAmountx, setCheckedAmountx] = useState(false);
  const [checkAssignx, setCheckedAssign] = useState(false);
  const [checkPurpose, setCheckedPurpose] = useState(false);

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
      document.getElementById("assign").innerHTML = "Assign bill to user <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedAssign(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("assign").innerHTML = " ";
    }
  };

  const handlePurpose = (valuex) => {
    console.log(valuex);
    console.log("working");
    if (!valuex) {
      setCheckedPurpose(false);
      console.log("auhfcgeafig");
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("purpose").innerHTML = "Purpose is required <br>";
    }
    if (valuex) {
      console.log("working2222222");
      setCheckedPurpose(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("purpose").innerHTML = " ";
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
      taxAmount: Number(taxAmountx),
      totalAmount: Number(totalAmountx),
      paidAmount: Number(paidAmountx),
      purpose: purposex,
      extraInformation: extraInfox,
      approverID: approverx,
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
    fetch(`${process.env.REACT_APP_LOUGA_URL}/bills/add`, requestOptions)
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
        if (result.status === "SUCCESS") {
          const rawBJ = JSON.stringify({
            billID: result.data.id,
            actionBy: currentlyLogegdIn,
          });
          console.log(raw);
          const requestOptionsBJ = {
            method: "POST",
            headers: myHeaders,
            body: rawBJ,
            redirect: "follow",
          };
          console.log(requestOptionsBJ);
          fetch(`${process.env.REACT_APP_LOUGA_URL}/billsJourney/add`, requestOptionsBJ)
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resultBJ) => {
              console.log(resultBJ);
              setOpened(false);
              if (resultBJ.message === "Expired Access") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resultBJ.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resultBJ.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
                window.location.reload();
              }
              console.log(result.message);
            });
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

  const handleImageUpload = (e) => {
    // handleClose();
    if (files !== "" && files !== 0) {
      if (files === undefined) {
        MySwal.fire({
          title: "INVALID_INPUT",
          type: "error",
          text: "Please input a file",
          // })  //.then(() => {
          // handleOpen();
        });
      } else {
        setOpened(true);
        e.preventDefault();
        // Headers for upload image
        const GenToken = localStorage.getItem("rexxdex1");
        const apiiToken = localStorage.getItem("rexxdex");

        if (apiiToken !== "null" && apiiToken !== null) {
          localStorage.setItem("rexxdex1", apiiToken);
        }
        const iiHeaders = new Headers();
        iiHeaders.append("Token-1", GenToken);

        const data11 = JSON.parse(localStorage.getItem("user1"));
        // const personalIDs = data11.id;
        const orgIdx = data11.orgID;
        // const imgKey = `PROF_PIC_EMP-${personalIDs}`;
        // console.log(imgKey);

        const dateQ = new Date().getTime();
        const billsKey = `billsDoc${1 * 2 + 3 + dateQ}`;
        console.log(billsKey);
        console.log(files);
        const formDataxx = new FormData();
        formDataxx.append("file", files[0]);
        formDataxx.append("orgID", orgIdx);
        formDataxx.append("key", billsKey);
        formDataxx.append("type", files[0].type);

        const raw = formDataxx;
        console.log(raw);

        const requestOptions = {
          method: "POST",
          headers: iiHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/uploadFile`, requestOptions)
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
            console.log(result);
            if (result.status === "SUCCESS") {
              console.log(billID);

              const requestOptionsS = {
                method: "GET",
                headers: miHeaders,
              };

              fetch(
                `${process.env.REACT_APP_LOUGA_URL}/bills/addDocument/${billID}/${billsKey}`,
                requestOptionsS
              )
                .then(async (res) => {
                  const aToken = res.headers.get("token-1");
                  localStorage.setItem("rexxdex", aToken);
                  return res.json();
                })
                .then((resultr) => {
                  setOpened(false);
                  if (resultr.message === "Expired Access") {
                    navigate("/authentication/sign-in");
                    window.location.reload();
                  }
                  if (resultr.message === "Token Does Not Exist") {
                    navigate("/authentication/sign-in");
                    window.location.reload();
                  }
                  if (resultr.message === "Unauthorized Access") {
                    navigate("/authentication/forbiddenPage");
                    window.location.reload();
                  }
                  handleCloseModal();
                  MySwal.fire({
                    title: resultr.status,
                    type: "success",
                    text: resultr.message,
                  }).then(() => {
                    window.location.reload();
                  });
                  console.log(resultr);
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
            // .then(() => {
            //   if (result.status !== "SUCCESS") {
            //     handleOpen();
            //   }
            //   console.log("SUCCESS");
            // });
          });
      }
    }
  };

  const handleOpenModal = (id) => {
    const checkDataAttached = dataTablex.filter((data) => data.id === id);
    console.log(id);
    if (checkDataAttached[0].attachedDocs !== null) {
      if (checkDataAttached[0].attachedDocs.length === 0) {
        setBillID(id);
        setOpen(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Sorry...",
          text: " Document Already Attached",
        });
      }
    } else {
      setBillID(id);
      setOpen(true);
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

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);
    const orgIDs = data11.orgID;
    const empID = data11.personalID;
    console.log(empID);
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/bills/getForEmp/${orgIDs}/${empID}`, {
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
        fetch(`${process.env.REACT_APP_LOUGA_URL}/bills/delete/${id}`, requestOptions)
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
  const handledeleteBillDoc = (id) => {
    const filterFirstedd = dataTablex.filter((data) => data.id === id);
    console.log(filterFirstedd);
    const checkDoc = filterFirstedd[0].attachedDocs;
    console.log(checkDoc);
    if (checkDoc !== null) {
      if (checkDoc.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No Document Attached to this Bill",
        });
      } else {
        const documentID = filterFirstedd[0].attachedDocs[0];
        console.log(documentID);
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
            fetch(
              `${process.env.REACT_APP_LOUGA_URL}/bills/removeDocument/${id}/${documentID}`,
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
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No Document Attached to this Bill",
      });
    }
  };
  const handleValidate = (e) => {
    handleAmount(amountx);
    handleTaxAmount(taxAmountx);
    handlePaidAmountx(paidAmountx);
    handleonAssign(assignedTox);
    handlePurpose(purposex);
    // console.log(checkedWorkflow);
    if (
      checkedTaxAmountx &&
      checkedAmountx &&
      checkPurpose &&
      checkAssignx &&
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

  // eslint-disable-next-line consistent-return
  const openInNewTab = (id) => {
    let docKey = "";
    const checkDataAttached = dataTablex.filter((data) => data.id === id);
    console.log(id);
    if (checkDataAttached[0].attachedDocs !== null) {
      if (checkDataAttached[0].attachedDocs.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No Document Attached to this Bill",
        });
      } else {
        // eslint-disable-next-line prefer-destructuring
        docKey = checkDataAttached[0].attachedDocs[0];
        console.log(docKey);
        const data11 = JSON.parse(localStorage.getItem("user1"));

        const orgIDs = data11.orgID;
        const headers = miHeaders;
        fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getByKey/${orgIDs}/${docKey}`, {
          headers,
        })
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
            console.log(result.name);
            fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${result.name}`, {
              headers,
            })
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

                // if (isMounted) {
                console.log(`link [${resultx[0]}]`);
                const url = resultx[0];
                window.open(url, "_blank", "noopener,noreferrer");
              });
          });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No Document Attached to this Bill",
      });
    }
  };

  // MODAL STYLE
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
    bgcolor: "#ffffff",
    border: "3px solid #5F9DF7",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    height: "50%",
    display: "flex",
    "&::-webkit-scrollbar": {
      width: 20,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "white",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#f5f5f5",
      borderRadius: 10,
    },
  };

  const handleOpenBJ = (value) => {
    setCarryBJID(value);
    setOpenBJ(true);
  };
  const handleCloseModalBJ = () => {
    setOpenBJ(false);
  };
  // Table for Data

  const pColumns = [
    {
      Header: "Purpose ",
      accessor: "purpose",
      align: "left",
    },
    {
      Header: "Extra Information",
      accessor: "extraInformation",
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
              <Dropdown.Item onClick={() => navigate(`/my-Bills/update-My-Bills?id=${value}`)}>
                Update
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleOpenModal(value)}>Attach Document</Dropdown.Item>
              <Dropdown.Item onClick={() => handleOpenBJ(value)}>Bill Journey</Dropdown.Item>
              <Dropdown.Item onClick={() => handledeleteBillDoc(value)}>
                Delete Attached Document
              </Dropdown.Item>
              <Dropdown.Item onClick={() => openInNewTab(value)}>
                View Attached Document
              </Dropdown.Item>

              <Dropdown.Item onClick={() => handledeleteq(value)}>Delete Bill</Dropdown.Item>
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
        <MDBox pt={4} pb={3}>
          <MDBox
            variant="gradient"
            // bgColor="info"
            borderRadius="lg"
            style={Styles.boxSx}
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              My Bills
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="purpose">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="assign">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={5}>
                    <TextField
                      id="filled-number"
                      value={amountx || ""}
                      label="Amount (NGN) "
                      placeholder="Amount "
                      type="number"
                      onChange={(e) => setAmountx(e.target.value)}
                      onKeyUp={(e) => handleAmount(e.target.value)}
                      style={{ width: "100%", height: "100%" }}
                      required
                    />
                  </Grid>

                  <Grid item xs={5}>
                    <TextField
                      id="filled-number"
                      value={taxAmountx || ""}
                      label="Tax Amount (NGN) "
                      placeholder="Amount "
                      type="number"
                      onChange={(e) => setTaxAmountx(e.target.value)}
                      onKeyUp={(e) => handleTaxAmount(e.target.value)}
                      style={{ width: "100%", height: "100%" }}
                      required
                    />
                  </Grid>

                  <Grid item xs={5}>
                    <TextField
                      id="filled-read-only-input"
                      label="Total Amount (NGN)"
                      value={totalAmountx || " "}
                      InputProps={{
                        readOnly: true,
                      }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={5}>
                    <TextField
                      id="filled-number"
                      value={paidAmountx || ""}
                      label="Paid Amount (NGN) "
                      placeholder="Paid Amount "
                      type="number"
                      onChange={(e) => setPaidAmountx(e.target.value)}
                      onKeyUp={(e) => handlePaidAmountx(e.target.value)}
                      style={{ width: "100%", height: "100%" }}
                      required
                    />
                  </Grid>

                  <Grid item xs={10}>
                    <TextField
                      id="outlined-textarea"
                      rows={2}
                      value={purposex || ""}
                      label="Purpose "
                      placeholder="Purpose "
                      onChange={(e) => setPurposex(e.target.value)}
                      onKeyUp={(e) => handlePurpose(e.target.value)}
                      style={{ width: "100%", height: "100%" }}
                      multiline
                      required
                    />
                  </Grid>

                  <Grid item xs={10}>
                    <TextField
                      id="outlined-textarea"
                      rows={2}
                      value={extraInfox || ""}
                      label="Extra Informaton "
                      placeholder="Extra Informaton "
                      onChange={(e) => setExtraInfox(e.target.value)}
                      style={{ width: "100%", height: "100%" }}
                      multiline
                    />
                  </Grid>

                  <Grid item xs={5}>
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
                  </Grid>

                  <Grid item xs={5}>
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
                  </Grid>

                  <Grid item xs={5}>
                    <MDBox mt={1} mb={1}>
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
                  </Grid>

                  <Grid item xs={5}>
                    <></>
                  </Grid>
                </Grid>
              </Container>
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
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <HighlightOffIcon
                  onClick={handleCloseModal}
                  fontSize="large"
                  style={{
                    // display: "flex",
                    padding: "5px",
                    color: "red",
                    float: "right",
                    position: "absolute",
                    left: 500,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    cursor: "pointer",
                  }}
                />
                <MDBox pt={1} pb={1} px={2}>
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
                      Upload Document
                    </MDTypography>
                  </MDBox>
                  <MDBox
                    mt={2}
                    mb={2}
                    sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                  >
                    <MDTypography variant="gradient" fontSize="60%" color="white" id="document">
                      {" "}
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <div className="col-sm-6">
                  {/* <input type="file" ref={ref} /> */}
                  <MDInput type="file" files={files} onChange={(e) => setFiles(e.target.files)} />
                  <p id="imageVal" style={{ color: "red", fontSize: 13 }}>
                    <i> </i>
                  </p>
                </div>
                <MDBox mt={4} mb={1}>
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      onClick={handleImageUpload}
                      //   color="info"
                      style={Styles.buttonSx}
                      width="50%"
                      align="left"
                    >
                      Save
                    </MDButton>
                  </MDBox>
                </MDBox>
              </Grid>
            </Grid>
          </Box>
        </Modal>

        <Modal
          open={openBJ}
          onClose={handleCloseModalBJ}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <BillJourney id={carryBJID} />
        </Modal>
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

export default MyBills;
