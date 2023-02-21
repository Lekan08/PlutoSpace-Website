import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

function ViewCreditFacility() {
  const [allx, setAll] = useState([]);

  const navigate = useNavigate();

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
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/creditFacility/getByIds/${ids}`, {
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
      <Card style={{ backgroundColor: "#CCC1FF" }}>
        <MDBox pt={4} pb={3} px={10}>
          {allx.map((item) => (
            <Box sx={{ flexGrow: 1 }} key={item.id}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Item>
                    <h5>Client Name</h5> {item.clientName}
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <h5>Client Type</h5>
                    {handleOnClient(item.clientType)}
                  </Item>
                </Grid>

                <Grid item xs={6}>
                  <Item>
                    <h5>Product Type</h5> {item.type}
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    {" "}
                    <h5>Original Amount (₦)</h5>
                    {item.originalAmount}
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item>
                    <h5>Balance (₦)</h5> {item.balance}
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

export default ViewCreditFacility;
