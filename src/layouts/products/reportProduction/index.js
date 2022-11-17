import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
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
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import ReportProductionTable from "layouts/products/reportProduction/data";

function ReportProduction() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = ReportProductionTable();
  // const [namex, setName] = useState("");
  // const [descriptionx, setDescriptionx] = useState("");
  // const [pricePerQuantityx, setPricePerQuantity] = useState("");
  const [enabled, setEnabled] = useState("");
  const [checkedName, setCheckedName] = useState("");
  // const [table, setTable] = useState("");

  // const [statusx, setStatus] = useState("");
  const [quantityx, setQuantity] = useState("");
  const [typex, setType] = useState("");
  const [branchx, setBranch] = useState([]);
  const [branx, setBranx] = useState("");
  // const [branId, setBranId] = useState("");
  const [vibeReport, setVibeReport] = useState([]);
  const [branxx, setBranxx] = useState("");

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // eslint-disable-next-line consistent-return
  const handleOnQuantityKeys = () => {
    const letters = /^[0-9 ]+$/;
    if (!quantityx.match(letters)) {
      setCheckedName(false);
      document.getElementById("quantity").innerHTML = "Quantity - input only numbers<br>";
    }
    if (quantityx.match(letters)) {
      setCheckedName(true);
      document.getElementById("quantity").innerHTML = "";
    }
    if (quantityx.length === 0) {
      document.getElementById("quantity").innerHTML = "Quantity is required<br>";
    }

    setEnabled(checkedName === true);
  };

  useEffect(() => {
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productIDx = urlParams.get("id");
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const productID = productIDx;
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/productBranch/gets/${orgIDs}/${productID}`, {
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
          // setTable(resultx);
          setBranch(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  // console.log(branId);

  const handleClick = (e) => {
    handleOnQuantityKeys();
    if (enabled) {
      setOpened(true);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const personalIDs = data11.personalID;
      const orgIDs = data11.orgID;

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const ids = urlParams.get("id");

      const reportTimex = new Date().getTime();

      const raw = JSON.stringify({
        orgID: orgIDs,
        productID: ids,
        branchID: branx,
        type: typex,
        quantity: quantityx,
        reporterID: personalIDs,
        reportingTime: reportTimex,
        // approverID: 0,
        // approverTime: 0,
        // approverComment: 0,
        // status: statusx,

        //         "productID": "string",
        //   "branchID": "string",
        //   "type": 0,
        //   "quantity": 0,
        //   "reporterID": 0,
        //   "reportingTime": 0,
        //   "approverID": 0,
        //   "approverTime": 0,
        //   "approverComment": "string",
        //   "status": 0
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_LOUGA_URL}/production/add`, requestOptions)
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
  };

  // useEffect(() => {
  //   const headers = miHeaders;
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const productIDx = urlParams.get("id");
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   // const productID = productIDx;
  //   const orgIDs = data11.orgID;
  //   let isMounted = true;
  //   fetch(
  //     `${process.env.REACT_APP_LOUGA_URL}/production/getForProductBranch/${orgIDs}?productID=${productIDx}&branchID=${branx}`,
  //     {
  //       headers,
  //     }
  //   )
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       if (result.message === "Expired Access") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Token Does Not Exist") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Unauthorized Access") {
  //         navigate("/authentication/forbiddenPage");
  //         window.location.reload();
  //       }
  //       if (isMounted) {
  //         // setTable(resultx);
  //         setBranch(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
  // eslint-disable-next-line consistent-return
  const handleOnChangeStatus = (type) => {
    if (type === 0) {
      return "Reported";
    }
    if (type === 1) {
      return "Approve";
    }
    if (type === 2) {
      return "Decline";
    }
  };
  // eslint-disable-next-line consistent-return
  const handleOnChangeType = (type) => {
    if (type === 0) {
      return "Addition";
    }
    if (type === 1) {
      return "Deduction";
    }
  };

  const converter = vibeReport.map((newt) => ({
    // id: newt.id,
    // amount: twoDecimal(newt.amount),
    // createdTime: changeDate(newt.createdTime),
    quantity: newt.quantity,
    branchName: newt.branchName,
    status: handleOnChangeStatus(newt.status),
    type: handleOnChangeType(newt.type),
  }));
  console.log(converter);
  console.log(vibeReport);

  const pdfColumns = [
    { Header: "Quantity", accessor: "quantity", align: "left" },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ cell: { value } }) => handleOnChangeStatus(value),
      align: "left",
    },
    {
      Header: "Type",
      accessor: "type",
      Cell: ({ cell: { value } }) => handleOnChangeType(value),
      align: "left",
    },
    { Header: "Branch Name", accessor: "branchName", align: "left" },
  ];

  const exportColumns = pdfColumns.map((Col) => ({
    title: Col.Header,
    dataKey: Col.accessor,
  }));

  const exportPDF = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        // eslint-disable-next-line new-cap
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, converter);
        doc.save("ProductionReport.pdf");
      });
    });
  };

  const handleChangeClient = (value) => {
    const callClientType = value.toString();
    setBranxx(callClientType);
    console.log(value);
    // console.log(branxx);
    // setUClientTypex(callClientType);
    // let clientTyppe = "";
    // if (callClientType === "1") {
    //   setShowClients(true);
    //   clientTyppe = "individual";
    // } else if (callClientType === "2") {
    //   setShowClients(false);
    //   clientTyppe = "corporate";
    // }
    setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productIDx = urlParams.get("id");

    fetch(
      `${process.env.REACT_APP_LOUGA_URL}/production/getForProductBranch/${orgIDs}?productID=${productIDx}&branchID=${value}`,
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
        setVibeReport(result);
      });
  };

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
              Production Report
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="quantity">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <MDInput
                      type="text"
                      label="Quantity *"
                      value={quantityx || ""}
                      onKeyUp={handleOnQuantityKeys}
                      className="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  {/* <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={quantityx || ""}
                      onChange={(e) => setQuantity(e.target.value)}
                      label="Description"
                      variant="standard"
                      setType
                      fullWidth
                    />
                  </div> */}
                  {/* <div className="col-sm-6">
                    <MDBox textAlign="center">
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
                        color="text"
                      >
                        Status
                      </MDTypography>
                      <Form.Select
                        value={statusx}
                        onChange={(e) => setStatus(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">--Select Status--</option>
                        <option value="0">Reported</option>
                        <option value="1">Approve</option>
                        <option value="2">Decline</option>
                      </Form.Select>
                    </MDBox>
                  </div> */}
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDBox textAlign="left">
                      <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                        Type *
                      </MDTypography>
                      <MDBox textAlign="right">
                        <Form.Select
                          value={typex}
                          onChange={(e) => setType(e.target.value)}
                          aria-label="Default select example"
                        >
                          <option value="">--Select Type--</option>
                          <option value="0">Addition</option>
                          <option value="1">Deduction</option>
                        </Form.Select>
                      </MDBox>
                    </MDBox>
                  </div>
                  <div className="col-sm-6">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      Branch *
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        value={branx || ""}
                        aria-label="Default select example"
                        onChange={(e) => setBranx(e.target.value)}
                      >
                        <option>--Select Branch--</option>
                        {branchx.map((apis) => (
                          <option key={apis.branchID} value={apis.branchID}>
                            {apis.branchName}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleClick}
                color="info"
                width="50%"
                align="left"
              >
                Report
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      &nbsp; &nbsp;
      <Card>
        <MDBox>
          <Container>
            <div className="col-sm-6">
              <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                Branch *
              </MDTypography>
              <MDBox textAlign="right">
                <Form.Select
                  value={branxx || ""}
                  aria-label="Default select example"
                  // onChange={(e) => setBranx(e.target.value)}
                  onChange={(e) => handleChangeClient(e.target.value)}
                >
                  <option>--Select Branch--</option>
                  {branchx.map((apis) => (
                    <option key={apis.branchID} value={apis.branchID}>
                      {apis.branchName}
                    </option>
                  ))}
                </Form.Select>
              </MDBox>
            </div>
          </Container>

          <MDBox mt={4} mb={1} align="center">
            <MDButton
              variant="gradient"
              onClick={exportPDF}
              color="info"
              width="50%"
              align="center"
            >
              Export pdf
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
      <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: pRows }}
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

export default ReportProduction;
