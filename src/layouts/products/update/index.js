import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Styles from "styles";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
// import DatePicker from "react-datepicker";
import MDButton from "components/MDButton";

function Updateproducts() {
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const MySwal = withReactContent(Swal);
  const [namex, setName] = useState("");
  const [idx, setIdx] = useState("");
  const [createdTimex, setCreatedTime] = useState("");
  const [deleteFlagx, setDeleteFlag] = useState("");
  const [descriptionx, setdescriptionx] = useState("");
  const [pricePerQuantityx, setPricePerQuantityx] = useState("");
  const [enabled, setEnabled] = useState("");
  const [checkedName, setCheckedName] = useState("");

  const [opened, setOpened] = useState(false);
  console.log(opened);
  const navigate = useNavigate();

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
      document.getElementById("name").innerHTML = "Products is required<br>";
    }

    setEnabled(checkedName === true);
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
  //         if (result.length === 0) {
  //           setName(result[0].namee);
  //           console.log(result);
  //           setdescriptionx(result[0].description);
  //           setPricePerQuantityx(result[0].pricePerQuantity);
  //         } else {
  //           setName(result);
  //           setdescriptionx(result);
  //           setPricePerQuantityx(result);
  //           console.log(result);
  //         }
  //         // setSupplybran(result);
  //       }
  //       console.log(result);
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  //   const handleChangeproduct = (value) => {
  //     setOpened(true);
  //     const headers = miHeaders;
  //     const data11 = JSON.parse(localStorage.getItem("user1"));
  //     const orgIDs = data11.orgID;

  //     fetch(`${process.env.REACT_APP_LOUGA_URL}/${Products}/gets/${orgIDs}`, { headers })
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         const resultres = await res.text();
  //         if (resultres === null || resultres === undefined || resultres === "") {
  //           return {};
  //         }
  //         return JSON.parse(resultres);
  //       })
  //       .then((result) => {
  //         setOpened(false);
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
  //         setClient(result);
  //       });
  //   };

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const ids = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/products/getByIds/${ids}`, {
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
          console.log(namex);
          setIdx(result[0].id);
          setName(result[0].name);
          setCreatedTime(result[0].createdTime);
          setDeleteFlag(result[0].deleteFlag);
          setPricePerQuantityx(result[0].pricePerQuantity);
          setdescriptionx(result[0].description);
        }
        console.log(result);
      });
    return () => {
      isMounted = false;
    };
  }, []);
  //   const handleOnTitleKeys = () => {
  //     const letter = /^[a-zA-Z ]+$/;
  //     if (!titlex.match(letter)) {
  //       setCheckedTitle(false);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("title").innerHTML =
  //         "Name - input only capital and small letters<br>";
  //     }
  //     if (titlex.match(letter)) {
  //       setCheckedTitle(true);
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("title").innerHTML = "";
  //     }
  //     if (titlex.length === 0) {
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("title").innerHTML = "Title is required<br>";
  //     }
  //     setEnabled(checkedTitle === true);

  const handleUpdate = (e) => {
    handleOnNameKeys();
    if (enabled) {
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      // const idx = data11.id;
      const personalIDs = data11.personalID;
      const raw = JSON.stringify({
        id: idx,
        orgID: orgIDs,
        name: namex,
        description: descriptionx,
        createdBy: personalIDs,
        createdTime: createdTimex,
        deleteFlag: deleteFlagx,
        pricePerQuantity: pricePerQuantityx,
      });
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_LOUGA_URL}/products/update`, requestOptions)
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

  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   // const clientID = data11.id;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/productsgets/${orgIDs}`, {
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
  //         if (result.length === 0) {
  //           setName([]);
  //           setdescriptionx([]);
  //           setPricePerQuantityx([]);
  //         } else {
  //           setName(result);
  //           setdescriptionx(result);
  //           setPricePerQuantityx(result);
  //         }
  //         // setSupplybran(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={30}>
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
              Update Products
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
                      onChange={(e) => setdescriptionx(e.target.value)}
                      label="Description "
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={pricePerQuantityx || ""}
                      onChange={(e) => setPricePerQuantityx(e.target.value)}
                      label="Price Per Quantity (₦)*"
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
                onClick={handleUpdate}
                style={Styles.buttonSx}
                width="50%"
                align="left"
              >
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}
export default Updateproducts;
