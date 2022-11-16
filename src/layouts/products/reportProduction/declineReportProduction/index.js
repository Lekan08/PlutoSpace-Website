import React, { useState } from "react";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
// import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

function DeclineReportProduction() {
  const MySwal = withReactContent(Swal);
  // const [namex, setName] = useState("");
  // const [descriptionx, setDescriptionx] = useState("");
  // const [pricePerQuantityx, setPricePerQuantity] = useState("");
  //  const [enabled, setEnabled] = useState("");
  // const [checkedName, setCheckedName] = useState("");

  const [commentx, setComment] = useState("");

  // const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  // const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // eslint-disable-next-line consistent-return
  //   const handleOnCommentKeys = () => {
  //     const letters = /^[0-9 ]+$/;
  //     if (!quantityx.match(letters)) {
  //       setCheckedName(false);
  //       document.getElementById("quantity").innerHTML = "Quantity - input only numbers<br>";
  //     }
  //     if (quantityx.match(letters)) {
  //       setCheckedName(true);
  //       document.getElementById("quantity").innerHTML = "";
  //     }
  //     if (quantityx.length === 0) {
  //       document.getElementById("quantity").innerHTML = "Quantity is required<br>";
  //     }

  //     setEnabled(checkedName === true);
  //   };

  //   useEffect(() => {
  //     const headers = miHeaders;
  //     const queryString = window.location.search;
  //     const urlParams = new URLSearchParams(queryString);
  //     const productIDx = urlParams.get("id");
  //     const data11 = JSON.parse(localStorage.getItem("user1"));
  //     const productID = productIDx;
  //     const orgIDs = data11.orgID;
  //     let isMounted = true;
  //     fetch(`${process.env.REACT_APP_LOUGA_URL}/productBranch/gets/${orgIDs}/${productID}`, {
  //       headers,
  //     })
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         return res.json();
  //       })
  //       .then((result) => {
  //         if (result.message === "Expired Access") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (result.message === "Token Does Not Exist") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (result.message === "Unauthorized Access") {
  //           navigate("/authentication/forbiddenPage");
  //           window.location.reload();
  //         }
  //         console.log(result);
  //         if (isMounted) {
  //           setBranch(result);
  //         }
  //       });
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);

  //   const handleDisapproveReport = () => {
  //     // const data11 = JSON.parse(localStorage.getItem("user1"));
  //     // const personalIDs = data11.personalID;
  //     // const approvedBy = personalIDs;
  //     const queryString = window.location.search;
  //     const urlParams = new URLSearchParams(queryString);
  //     const idx = urlParams.get("id");
  //     const status = 2;
  //     MySwal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, Confirm it!",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         const requestOptions = {
  //           method: "GET",
  //           headers: miHeaders,
  //         };
  //         fetch(
  //           `${process.env.REACT_APP_LOUGA_URL}/production/approveOrDecline/${idx}/${status}/?comment=${commentx}`,
  //           {
  //             requestOptions,
  //           }
  //         )
  //           .then(async (res) => {
  //             const aToken = res.headers.get("token-1");
  //             localStorage.setItem("rexxdex", aToken);
  //             return res.json();
  //           })
  //           .then((resx) => {
  //             console.log(resx);
  //             if (resx.message === "Expired Access") {
  //               navigate("/authentication/sign-in");
  //             }
  //             if (resx.message === "Token Does Not Exist") {
  //               navigate("/authentication/sign-in");
  //             }
  //             if (resx.message === "Unauthorized Access") {
  //               navigate("/authentication/forbiddenPage");
  //             }
  //             MySwal.fire({
  //               title: resx.status,
  //               type: "success",
  //               text: resx.message,
  //             }).then(() => {
  //               window.location.reload();
  //             });
  //           })
  //           .catch((error) => {
  //             MySwal.fire({
  //               title: error.status,
  //               type: "error",
  //               text: error.message,
  //             });
  //           });
  //       }
  //     });
  //   };

  const handleDisapproveReport = () => {
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    const status = 2;

    fetch(
      `${process.env.REACT_APP_LOUGA_URL}/production/approveOrDecline/${idx}/${status}/?comment=${commentx}`,
      { headers }
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        // setOpened(false);
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
        // setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
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
              Decline Production Report
            </MDTypography>
          </MDBox>
          <MDBox
            variant="gradient"
            bgColor="error"
            borderRadius="lg"
            coloredShadow="success"
            mx={3}
            mt={1}
            p={1}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="gradient" fontSize="60%" color="white" id="quantity">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    {/* <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      textAlign="center"
                      color="text"
                    >
                      Reason For Declining
                    </MDTypography> */}
                    <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                      <Form.Label style={{ fontSize: 14 }}>Reason For Declining</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={commentx || ""}
                        // onKeyUp={handleOnCommentKeys}
                        onChange={(e) => setComment(e.target.value)}
                        rows={2}
                      />
                    </Form.Group>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleDisapproveReport}
                color="info"
                width="50%"
                align="left"
              >
                Disapprove
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      &nbsp;
      {/* <MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton variant="gradient" onClick={handleOpen} color="info" width="50%" align="center">
            Add Filters
          </MDButton>
        </MDBox>
      </MDBox> */}
      {/* <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: pRows }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox> */}
      <Footer />
      {/* <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop> */}
    </DashboardLayout>
  );
}

export default DeclineReportProduction;
