import { Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import { Container } from "react-bootstrap";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import MDTypography from "components/MDTypography";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function ViewResultsAdmin() {
  const MySwal = withReactContent(Swal);
  const { allGHeaders: miHeaders } = GHeaders();

  const scrollContainerStyle = { width: "100%", maxHeight: "60%" };
  const navigate = useNavigate();
  const [cbtResult, setCbtResult] = useState([]);

  useEffect(() => {
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    let isMounted = true;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    if (
      data11.roleID !== "0" &&
      data11.roleID !== "" &&
      data11.roleID !== "null" &&
      data11.roleID !== null
    ) {
      MySwal.fire({
        title: "Access_Blocked",
        type: "error",
        text: "Only Admin can view a result",
      }).then(() => {
        navigate(`/cbt`);
      });
      //   navigate(`/cbt`);
    } else {
      fetch(`${process.env.REACT_APP_RAGA_URL}/cbt/getCBTResults/${ids}`, {
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
          console.log(result);
          if (isMounted) {
            if (result.length !== 0) {
              setCbtResult(result);
            } else {
              MySwal.fire({
                title: "Empty_Records",
                type: "error",
                text: "No CBT Test has been taken",
              }).then(() => {
                navigate(`/cbt`);
              });
            }
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        {cbtResult.questions !== null ? (
          <div className="scrollbar scrollbar-primary mt-2 mx-auto" style={scrollContainerStyle}>
            <MDBox mb={1.5}>
              <Container>
                <div className="row">
                  {cbtResult.map((item) => (
                    <Grid container spacing={0}>
                      <Grid item xs={12} md={12} lg={12}>
                        {/* <Link to={`/polls/vote-Polls?id=${api.id}`}> */}
                        <Card style={{ backgroundColor: "#318CE7" }}>
                          <CardContent>
                            <MDTypography
                              variant="h6"
                              color="white"
                              fontSize="75%"
                              textAlign="left"
                              mt={1}
                            >
                              Answers - {item.answers}
                            </MDTypography>
                            <MDTypography
                              variant="h6"
                              color="white"
                              fontSize="75%"
                              textAlign="left"
                              mt={0}
                            >
                              Final Score - {item.finalScore}
                            </MDTypography>
                            <MDTypography
                              variant="h6"
                              color="white"
                              fontSize="75%"
                              textAlign="left"
                              mt={0}
                            >
                              Grading - {item.grading}
                            </MDTypography>
                            <MDTypography
                              variant="h6"
                              color="white"
                              fontSize="75%"
                              textAlign="left"
                              mt={0}
                            >
                              Questions -{item.questions}
                            </MDTypography>
                          </CardContent>
                        </Card>{" "}
                        &nbsp; &nbsp;
                        {/* </Link> */}
                      </Grid>
                    </Grid>
                  ))}
                </div>
              </Container>
            </MDBox>
          </div>
        ) : (
          <MDBox />
        )}
      </Card>
    </DashboardLayout>
  );
}
export default ViewResultsAdmin;
