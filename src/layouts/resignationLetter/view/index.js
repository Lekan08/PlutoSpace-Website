import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Styles from "styles";
// import ResignationLetterData from "./data";
// ZINOLEESKY

function ViewResignationLetter() {
  //   const MySwal = withReactContent(Swal);
  //   const { columns: pColumns, rows: pRows } = ResignationLetterData();

  const navigate = useNavigate();

  const [textx, setText] = useState("");
  const [image, setImage] = useState([{ externalUrl: "" }]);

  //   const [checkedName, setCheckedName] = useState("");
  //   const [enabled, setEnabled] = useState("");
  //   const [opened, setOpened] = useState(false);

  const { allGHeaders: miHeaders } = GHeaders();
  //   const { allPHeaders: myHeaders } = PHeaders();

  console.log(image);
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/resignationLetter/getByIds/${idx}`, { headers })
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
          setText(result[0].text);
          if (result[0].externalUrl !== null) {
            setImage(result);
          }
          console.log(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 50,
    },
    preview: {
      marginTop: 50,
      display: "flex",
      flexDirection: "column",
    },
    image: { maxWidth: "100%", maxHeight: 320, borderRadius: 20 },
    delete: {
      cursor: "pointer",
      padding: 5,
      background: "blue",
      color: "white",
      border: "none",
      borderRadius: 5,
      width: 200,
    },
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
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
            style={Styles.boxSx}
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Resignation Letter
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
            <MDTypography variant="gradient" fontSize="60%" color="error" id="question">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={0}>
              <Container>
                <div className="row">
                  <div className="col-sm-12">
                    <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                      <Form.Label style={{ fontSize: 15 }}>Letter Of Resignation</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={textx || ""}
                        // onKeyUp={handleOnNameKeys}
                        onChange={(e) => setText(e.target.value)}
                        disabled
                        // InputProps={{
                        //   readOnly: true,
                        // }}
                        rows={8}
                      />
                    </Form.Group>
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <MDTypography variant="h6" color="text" fontSize="75%" textAlign="left" mt={0}>
                  Document -
                  {image[0].externalUrl ? (
                    <img src={image[0].externalUrl} style={styles.image} alt="Thumb" />
                  ) : null}
                </MDTypography>
              </Container>
            </MDBox>
            {/* <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleImageUpload}
                // color="info"
                width="50%"
                align="left"
                style={Styles.buttonSx}
              >
                Save
              </MDButton>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
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

export default ViewResignationLetter;
