import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
// import DatePicker from "react-datepicker";
import MDButton from "components/MDButton";
// signature Zino //

function UpdateReportProduction() {
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const MySwal = withReactContent(Swal);
  const [idx, setIdx] = useState("");
  const [branx, setBranx] = useState("");
  // const [statusx, setStatus] = useState("");
  const [quantityx, setQuantity] = useState("");
  const [typex, setType] = useState("");
  const [branchx, setBranch] = useState([]);
  // const [enabled, setEnabled] = useState("");
  const [checkedName, setCheckedName] = useState("");
  const [productIDx, setProductId] = useState("");
  // console.log(branx);

  //   const [opened, setOpened] = useState(false);
  //   console.log(opened);
  const navigate = useNavigate();

  // eslint-disable-next-line consistent-return
  const handleOnQuantityKeys = (value) => {
    const letters = /^[0-9 ]+$/;
    if (!value.toString().match(letters)) {
      setCheckedName(false);
      document.getElementById("quantity").innerHTML = "Quantity - input only numbers<br>";
    }
    if (value.toString().match(letters)) {
      setCheckedName(true);
      document.getElementById("quantity").innerHTML = "";
    }
    if (value.toString().length === 0) {
      document.getElementById("quantity").innerHTML = "Quantity is required<br>";
    }

    // setEnabled(checkedName === true);
  };

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const ids = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/production/getByIds/${ids}`, {
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
        const data11 = JSON.parse(localStorage.getItem("user1"));
        const orgIDs = data11.orgID;
        const idiot = result[0].productID;
        fetch(`${process.env.REACT_APP_LOUGA_URL}/productBranch/gets/${orgIDs}/${idiot}`, {
          headers,
        })
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resultx) => {
            if (resultx.message === "Expired Access") {
              navigate("/authentication/sign-in");
              window.location.reload();
            }
            if (resultx.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
              window.location.reload();
            }
            if (resultx.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
              window.location.reload();
            }
            // console.log(resultx);
            if (isMounted) {
              setBranch(resultx);
            }
          });
        // console.log(result);
        if (result.length !== 0) {
          // console.log(result);
          setIdx(result[0].id);
          setBranx(result[0].branchID);
          setType(result[0].type);
          setQuantity(result[0].quantity);
          // setStatus(result[0].status);
          setProductId(result[0].productID);

          handleOnQuantityKeys(result[0].quantity);
        }
        // console.log(result);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // eslint-disable-next-line consistent-return
  // const handleOnChangeStatus = (value) => {
  //   const status = value.toString();
  //   setStatus(status);
  //   if (status === 0) {
  //     return "Reported";
  //   }
  //   if (status === 1) {
  //     return "Approve";
  //   }
  //   if (status === 2) {
  //     return "Decline";
  //   }
  // };
  // eslint-disable-next-line consistent-return
  const handleOnChangeType = (value) => {
    const type = value.toString();
    setType(type);
    if (type === 0) {
      return "Addition";
    }
    if (type === 1) {
      return "Deduction";
    }
  };

  //   useEffect(() => {
  //     const headers = miHeaders;
  //     // const queryString = window.location.search;
  //     // const urlParams = new URLSearchParams(queryString);
  //     // const productIDx = urlParams.get("id");
  //     const data11 = JSON.parse(localStorage.getItem("user1"));
  //     // const productID = productIDx;
  //     const orgIDs = data11.orgID;
  //     let isMounted = true;
  //     fetch(`${process.env.REACT_APP_LOUGA_URL}/productBranch/gets/${orgIDs}/${productIDx}`, {
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
  //         if (isMounted) {
  //           setBranch(result);
  //         }
  //       });
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);

  const handleUpdate = (e) => {
    // handleOnQuantityKeys();
    // if (enabled) {
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    // const idx = data11.id;
    const personalIDs = data11.personalID;
    const reportTimex = new Date().getTime();

    //   const queryString = window.location.search;
    //   const urlParams = new URLSearchParams(queryString);
    //   const ids = urlParams.get("id");

    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      productID: productIDx,
      branchID: branx,
      type: typex,
      quantity: quantityx,
      // status: statusx,
      reporterID: personalIDs,
      reportingTime: reportTimex,
    });
    // console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_LOUGA_URL}/production/update`, requestOptions)
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
    // }
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

  const handleValidate = (e) => {
    if (checkedName === true) {
      handleUpdate(e);
    }
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
              Update Production Report
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
                        onChange={(e) => handleOnChangeStatus(e.target.value)}
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
                    <MDBox textAlign="center">
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
                        color="text"
                      >
                        Type *
                      </MDTypography>
                      <Form.Select
                        value={typex}
                        onChange={(e) => handleOnChangeType(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">--Select Type--</option>
                        <option value="0">Addition</option>
                        <option value="1">Deduction</option>
                      </Form.Select>
                    </MDBox>
                  </div>
                  <div className="col-sm-6">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      Branch
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        value={branx || ""}
                        aria-label="Default select example"
                        onChange={(e) => setBranx(e.target.value)}
                        // onChange={(e) => setSupplyingBranchName(e.target.value)}
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
          </MDBox>
          <MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleValidate}
                color="info"
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
export default UpdateReportProduction;
