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
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
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

function ViewDemand() {
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
  // const [product, setProduct] = useState([]);

  // const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  //   const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

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
    fetch(`${process.env.REACT_APP_LOUGA_URL}/demands/getByIds/${ids}`, {
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
          console.log(result);
          // eslint-disable-next-line eqeqeq
          //   if (result.length != 0) {
          // setIdx(result[0].id);
          setAll(result);
          //   setTitle(result[0].title);
          //   setQuantity(result[0].quantity);
          //   setPPQuantity(result[0].pricePerQuantity);
          //   setIndividual(result[0].clientType);
          //   setSupplyingBranchName(result[0].supplyingBranchName);
          //   setVatAmount(result[0].vatAmount);
          //   setBonusAmount(result[0].bonusAmount);
          //   setClientNamex(result[0].clientName);
          //   setTotal(result[0].totalAmount);
          // setSupplyingBranchID(result[0].supplyingBranchID);
          // setDeletex(result[0].deleteFlag);
          // setApprovex(result[0].approverID);
          // setAdminx(result[0].adminID);
          // setReasonx(result[0].reasonForDisapproval);
          // setStatusx(result[0].status);
          //   } else {
          //     setIdx(null);
          //   }
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

  // useEffect(() => {
  //   const headers = miHeaders;

  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   // const clientID = data11.id;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/products/gets/${orgIDs}`, {
  //     headers,
  //   })
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
  //         setProduct(result);
  //         console.log(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // eslint-disable-next-line no-shadow, consistent-return

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ backgroundColor: "#CCC1FF" }}>
        <MDBox pt={4} pb={3} px={10}>
          {allx.map((item) => (
            <Box sx={{ flexGrow: 1 }} key={item.id}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Item>
                    <h5>Title</h5> {item.title}
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <h5>Client Name</h5> {item.clientName}
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <h5>Quantity</h5>
                    {item.quantity.toLocaleString()}
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <h5>Price Per Quantity (NGN)</h5>{" "}
                    {item.pricePerQuantity.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <h5>Total Amount (NGN)</h5>{" "}
                    {item.totalAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <h5>Bonus Amount (NGN)</h5>{" "}
                    {item.bonusAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <h5>V.A.T (NGN)</h5>{" "}
                    {item.vatAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    {" "}
                    <h5>Product Type</h5>
                    {item.productName}
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <h5>Client Type</h5>
                    {handleOnClient(item.clientType)}
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

export default ViewDemand;
