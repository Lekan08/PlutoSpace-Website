import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
// import systemRolesTable from "layouts/systemRoles/data/systemRolesTables";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Styles from "styles";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import productsBranchTable from "layouts/products/products-Branch/table/branchTable";

function ProductsBranch() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = productsBranchTable();

  const [,] = useState("");
  const [quantityx, setQuantityx] = useState("");
  // const [perPerQuantityx, setDescrip] = useState("");
  const [branchIDx, setBranchIDx] = useState("");
  const [branches, setBranches] = useState([]);
  // const [enabled] = useState("");
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  // const [checkedName, setCheckedName] = useState("");

  const handleOnQuantityKeys = () => {
    const number = /^[0-9 ]+$/;
    if (!quantityx.match(number)) {
      setQuantityx(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("quantity").innerHTML = "Quantity - input only numbers<br>";
    }
  };

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/branch/gets/${orgIDs}`, {
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
        if (isMounted) {
          console.log(result);
          setBranches(result);
          console.log(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e) => {
    handleOnQuantityKeys();
    console.log("doski1");
    console.log("doski");
    setOpened(true);
    e.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productIDx = urlParams.get("id");
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      quantity: quantityx,
      branchID: branchIDx,
      productID: productIDx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_LOUGA_URL}/productBranch/add`, requestOptions)
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

  return (
    <DashboardLayout>
      <>
        <DashboardNavbar />
        <Card>
          <MDBox pt={4} pb={3} px={20}>
            <MDBox
              variant="gradient"
              // bgColor="info"
              style={{ backgroundColor: "#f96d02" }}
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Add Branch To Product
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
          </MDBox>
          <Container>
            <MDTypography
              variant="button"
              fontWeight="regular"
              fontSize="80%"
              textAlign="center"
              color="text"
            >
              Products Branch
            </MDTypography>
            <br />
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={8}>
                <Form.Select
                  value={branchIDx}
                  onChange={(e) => setBranchIDx(e.target.value)}
                  aria-label="Default select example"
                >
                  <option value="">Select Branch</option>
                  {branches.map((api) => (
                    <option key={api.id} value={api.id}>
                      {api.name}
                    </option>
                  ))}
                </Form.Select>
              </Grid>
              <Grid item xs={8}>
                <MDInput
                  type="text"
                  value={quantityx || ""}
                  onKeyUp={handleOnQuantityKeys}
                  onChange={(e) => setQuantityx(e.target.value)}
                  label="Quantity *"
                  variant="standard"
                  fullWidth
                />
              </Grid>{" "}
              <Grid item xs={8}>
                <MDBox mt={1} mb={1}>
                  <MDButton
                    variant="gradient"
                    onClick={handleClick}
                    //  color="info"
                    style={Styles.buttonSx}
                    width="50%"
                    align="left"
                  >
                    Save
                  </MDButton>
                </MDBox>
              </Grid>
            </Grid>
          </Container>
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
      </>
    </DashboardLayout>
  );
}

export default ProductsBranch;

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
  {/* <MDTypography variant="gradient" fontSize="60%" color="error" id="title">
  {" "}
</MDTypography> */}
  <MDTypography variant="gradient" fontSize="60%" color="error" id="quantity">
    {" "}
  </MDTypography>
  <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
    Add Branch To Product
  </MDTypography>
</MDBox>;
