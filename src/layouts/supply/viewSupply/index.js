import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
// import MDInput from "components/MDInput";
// import DataTable from "examples/Tables/DataTable";
// import MDTypography from "components/MDTypography";
// import systemRolesTable from "layouts/systemRoles/data/systemRolesTables";
// import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
// import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import CardContent from "@mui/material/CardContent";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
// import SupplyTable from "layouts/supply/supplytable.js";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

function ViewSupply() {
  //   const MySwal = withReactContent(Swal);
  //   const { columns: pColumns, rows: pRows } = SupplyTable();

  //   const [titlex, setTitle] = useState("");
  //   const [quantityx, setQuantity] = useState("");
  // const [descripx, setDescrip] = useState("");
  //   const [checkedTitle, setCheckedTitle] = useState("");
  //   const [checkedQuantity, setCheckedQuantity] = useState("");
  //   const [checkedPPQuantity, setCheckedPPQuantity] = useState("");
  //   const [checkedVatAmount, setCheckedVatAmount] = useState("");
  //   const [checkedBonusAmount, setCheckedBonusAmount] = useState("");
  //   const [enabled, setEnabled] = useState("");
  // const [createdx, setCreated] = useState([]);
  // const [appDeclinx, setAppDeclin] = useState("");
  //   const [statusTYpex, setStatusType] = useState("");
  //   const [createdx, setCreatedx] = useState("");
  //   const [ppQuantityx, setPPQuantity] = useState("");
  //   // const [supplybranx, setSupplybran] = useState([]);
  //   const [supplyingBranchName, setSupplyingBranchName] = useState("");
  //   const [vatAmountx, setVatAmount] = useState("");
  //   const [ans, setTotal] = useState("");
  //   const [bonusAmountx, setBonusAmount] = useState("");
  //   const [individual, setIndividual] = useState("");
  //   //   const [individualx, setIndividualx] = useState("");
  //   //   const [corporate, setCorporate] = useState("");
  //   //   const [indiCorpo, setIndiCorpo] = useState([]);
  //   const [clientNamex, setClientNamex] = useState("");
  // const [createdx, setCreatedx] = useState("");
  // const [supplyingBranx, setSupplyingBran] = useState("");
  const [allx, setAll] = useState([]);

  // const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  //   const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // const scrollContainerStyle = { width: "100%", maxHeight: "60%" };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "black",
  }));

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const ids = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/supply/getByIds/${ids}`, {
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
          // eslint-disable-next-line eqeqeq
          //   if (result.length != 0) {
          // setIdx(result[0].id);
          setAll(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  // eslint-disable-next-line consistent-return
  const handleOnClient = (clientTypes) => {
    if (clientTypes === 1) {
      return "Individual";
    }
    if (clientTypes === 2) {
      return "Corporate";
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <Card>
        <MDBox pt={4} pb={3} px={20}>
          <div className="scrollbar scrollbar-primary mt-2 mx-auto" style={scrollContainerStyle}>
            <Container>
              <div className="row">
                {allx.map((item) => (
                  <Grid item xs={12} md={12} lg={12} key={item.id}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardContent>
                        <MDBox
                          variant="gradient"
                          bgColor="info"
                          borderRadius="lg"
                          coloredShadow="success"
                          mt={2}
                          mx={0}
                          p={1}
                          mb={3}
                          textAlign="left"
                        >
                          <MDTypography
                            variant="h4"
                            fontWeight="medium"
                            color="white"
                            textAlign="center"
                            mt={1}
                          >
                            {item.clientName}
                          </MDTypography>
                        </MDBox>
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={1}
                        >
                          Title - {item.title}
                        </MDTypography>
                        <hr />
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          Client Name - {item.clientName}
                        </MDTypography>
                        <hr />
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          Price Per Quantity - {item.pricePerQuantity}
                        </MDTypography>
                        <hr />
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          Client Type - {handleOnClient(item.clientType)}
                        </MDTypography>
                        <hr />
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={1}
                        >
                          Supplying Branch Name - {item.supplyingBranchName}
                        </MDTypography>
                        <hr />
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          VatAmount - {item.vatAmount}
                        </MDTypography>
                        <hr />
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={1}
                        >
                          Bonus Amount - {item.bonusAmount}
                        </MDTypography>
                        <hr />
                        <MDTypography
                          variant="h6"
                          color="text"
                          fontSize="75%"
                          textAlign="left"
                          mt={0}
                        >
                          Total Amount - {item.totalAmount}
                        </MDTypography>
                      </CardContent>
                    </Card>
                    &nbsp;
                  </Grid>
                ))}
              </div>
            </Container>
          </div>
        </MDBox>
      </Card> */}
      <Card style={{ backgroundColor: "#CCC1FF" }}>
        <MDBox pt={4} pb={3} px={10}>
          {allx.map((item) => (
            <Box sx={{ flexGrow: 1 }} key={item.id}>
              {/* <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="success"
                mt={2}
                mx={0}
                p={1}
                mb={3}
                textAlign="left"
              >
                <MDTypography
                  variant="h4"
                  fontWeight="medium"
                  color="white"
                  textAlign="center"
                  mt={1}
                >
                  {/* {item.clientName}
                  {/* npass 68472553 
                </MDTypography>
              </MDBox> */}
              <Grid container spacing={2}>
                <Grid item xs={7}>
                  <Item>
                    <h5>Title</h5> {item.title}
                  </Item>
                </Grid>
                <Grid item xs={5}>
                  <Item>
                    <h5>Quantity</h5>
                    {item.quantity.toLocaleString()}
                  </Item>
                </Grid>
                <Grid item xs={5}>
                  <Item>
                    <h5>Client Type</h5>
                    {handleOnClient(item.clientType)}
                  </Item>
                </Grid>
                <Grid item xs={7}>
                  <Item>
                    <h5>Client Name</h5> {item.clientName}
                  </Item>
                </Grid>

                <Grid item xs={6}>
                  <Item>
                    <h5>Supply Branch Name</h5> {item.supplyingBranchName}
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    {" "}
                    <h5>Product Type</h5>
                    {item.productName}
                  </Item>
                </Grid>
                <Grid item xs={5}>
                  <Item>
                    <h5>Bonus Amount (NGN)</h5> {item.bonusAmount}
                  </Item>
                </Grid>
                <Grid item xs={7}>
                  <Item>
                    <h5>Price Per Quantity (NGN)</h5> {item.pricePerQuantity}
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <h5>Total Amount (NGN)</h5> {item.totalAmount}
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <h5>V.A.T (NGN)</h5> {item.vatAmount}
                  </Item>
                </Grid>

                <Grid item xs={12}>
                  <Item>
                    <h5>Paying Amount (NGN)</h5>{" "}
                    {item.payingAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Item>
                </Grid>
              </Grid>
            </Box>
          ))}
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default ViewSupply;
