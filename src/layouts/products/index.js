import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
// import Card from "@mui/material/Card";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import Styles from "styles";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Accordion from "react-bootstrap/Accordion";
import Csv from "layouts/products/csv";
import ProductTableData from "layouts/products/table/productTableData";
import Grid from "@mui/material/Grid";

function Products() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = ProductTableData();
  const [namex, setName] = useState("");
  const [descriptionx, setDescriptionx] = useState("");
  const [pricePerQuantityx, setPricePerQuantity] = useState("");
  const [enabled, setEnabled] = useState("");
  const [checkedName, setCheckedName] = useState("");

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();

  // eslint-disable-next-line consistent-return
  const handleOnNameKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!namex.match(letters)) {
      setCheckedName(false);
      document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
    }
    if (namex.match(letters)) {
      setCheckedName(true);
      document.getElementById("name").innerHTML = "";
    }
    if (namex.length === 0) {
      document.getElementById("name").innerHTML = "Prodducts is required<br>";
    }

    setEnabled(checkedName === true);
  };

  // setEnabled(checkedName === true);

  const handleClick = (e) => {
    handleOnNameKeys();
    if (enabled) {
      setOpened(true);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const personalIDs = data11.personalID;
      const orgIDs = data11.orgID;
      const raw = JSON.stringify({
        orgID: orgIDs,
        name: namex,
        description: descriptionx,
        createdBy: personalIDs,
        pricePerQuantity: pricePerQuantityx,
      });
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_LOUGA_URL}/products/add`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          console.log(result);
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

  const pdfColumns = [
    { Header: "name", accessor: "name", align: "left" },
    { Header: "description", accessor: "description", align: "left" },
    { Header: "price Per Quantity", accessor: "pricePerQuantity", align: "left" },
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
        doc.autoTable(exportColumns, pRows);
        doc.save("ProductTableData.pdf");
      });
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <MDBox
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
              Add Product
            </MDTypography>
          </MDBox> */}
      {/* <MDBox
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
              {" "}
            </MDTypography>
          </MDBox> */}
      {/* <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="Name *"
                      value={namex || ""}
                      onKeyUp={handleOnNameKeys}
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={descriptionx || ""}
                      onChange={(e) => setDescriptionx(e.target.value)}
                      label="Description *"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={pricePerQuantityx || ""}
                      onChange={(e) => setPricePerQuantity(e.target.value)}
                      label="PricePerQuantity *"
                      variant="standard"
                      fullWidth
                    />
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
                Save
              </MDButton>
            </MDBox>
          </MDBox> */}
      {/* <MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton variant="gradient" onClick={handleOpen} color="info" width="50%" align="center">
            Add Filters
          </MDButton>
        </MDBox>
      </MDBox> */}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="1">
          <Accordion.Header>Add Product</Accordion.Header>
          <Accordion.Body>
            <Paper elevation={3}>
              <br />
              <MDBox pt={4} pb={3}>
                <MDBox
                  variant="gradient"
                  // bgColor="info"
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
                    Add Product
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
                  <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
                    {" "}
                  </MDTypography>
                </MDBox>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <Container>
                      <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={5}>
                          <MDInput
                            type="text"
                            label="Name *"
                            value={namex || ""}
                            onKeyUp={handleOnNameKeys}
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            variant="standard"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <MDInput
                            type="text"
                            value={descriptionx || ""}
                            onChange={(e) => setDescriptionx(e.target.value)}
                            label="Description "
                            variant="standard"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <MDInput
                            type="text"
                            value={pricePerQuantityx || ""}
                            onChange={(e) => setPricePerQuantity(e.target.value)}
                            label="Price Per Quantity (NGN)*"
                            variant="standard"
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={5}>
                          <></>
                        </Grid>

                        <Grid item xs={5}>
                          <MDBox mt={1} mb={1}>
                            <MDButton
                              variant="gradient"
                              onClick={handleClick}
                              // color="info"
                              style={Styles.buttonSx}
                              width="50%"
                              align="left"
                            >
                              Save
                            </MDButton>
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
            </Paper>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Csv />
      &nbsp;
      <MDBox mt={4} mb={1}>
        <MDButton
          variant="gradient"
          onClick={exportPDF}
          style={Styles.buttonSx}
          width="50%"
          align="center"
        >
          Export pdf
        </MDButton>
      </MDBox>
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

export default Products;
