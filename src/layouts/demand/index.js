import React, { useState, useEffect } from "react";
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

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import DemandTable from "layouts/demand/demandTable";

function Demand() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = DemandTable();

  const [titlex, setTitle] = useState("");
  const [quantityx, setQuantity] = useState("");
  // const [descripx, setDescrip] = useState("");
  const [checkedTitle, setCheckedTitle] = useState("");
  const [checkedQuantity, setCheckedQuantity] = useState("");
  const [checkedBonus, setCheckedBonus] = useState("");
  // const [checkedVatAmount, setCheckedVatAmount] = useState("");
  // const [enabled, setEnabled] = useState("");
  // const [createdx, setCreated] = useState([]);
  // const [appDeclinx, setAppDeclin] = useState("");
  const [statusTYpex, setStatusType] = useState("");
  // const [approvex, setApprove] = useState("");
  // const [terminatex, setTerminate] = useState("");
  const [bonusAmountx, setBonusAmount] = useState("");
  const [productIDx, setproductID] = useState("");
  const [pricePQ, setpricePQ] = useState("");
  const [valuex, setValue] = useState("");
  // const [vatAmountx] = useState("");
  const [individual, setIndividual] = useState("");
  const [individualx, setIndividualx] = useState("");
  const [corporate, setCorporate] = useState("");
  const [indiCorpo, setIndiCorpo] = useState([]);
  const [product, setProduct] = useState([]);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const handlepricePQ = (e) => {
    const filteredItems = product.filter((item) => item.id === e.target.value);
    setpricePQ(filteredItems[0].pricePerQuantity);
    setproductID(e.target.value);
  };
  // eslint-disable-next-line no-eval
  const totalAmountx = eval(quantityx * pricePQ);
  // eslint-disable-next-line no-eval
  const vatAmountx = eval((valuex.value / 100) * totalAmountx);
  // eslint-disable-next-line no-eval
  const payAmountx = eval(vatAmountx + totalAmountx - bonusAmountx);

  // const handleTotalAmount = (e) => {
  //   // eslint-disable-next-line no-eval
  //   const ans = eval(quantityx * pricePQ);
  //   setTotalAmountx(ans);

  //   setQuantity(e.target.value);
  // };
  // const changeStartTime = (timestamp) => {
  //   const startTime = new Date(timestamp);
  // };
  // useEffect(() => {
  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const orgIDs = data11.orgID;

  //   // const startTime = new Date(timestamp);
  //   // // const startTimex = startTime(timestamp);
  //   // const endTime = new Date(timestamp);
  //   // const endTimex = endTime(timestamp);
  //   let isMounted = true;
  //   fetch(
  //     `${process.env.REACT_APP_LOUGA_URL}/supply/gets/${orgIDs}?startTime=${changeStartTime}&endTime=${endTime}`,
  //     {
  //       headers,
  //     }
  //   )
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
  //         // setItems(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // const handleOnTitleKeys = () => {
  //   const letter = /^[a-zA-Z ]+$/;
  //   if (!titlex.match(letter)) {
  //     setCheckedTitle(false);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("title").innerHTML =
  //       "Name - input only capital and small letters<br>";
  //   }
  //   if (titlex.match(letter)) {
  //     setCheckedTitle(true);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("title").innerHTML = "";
  //   }
  //   if (titlex.length === 0) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("title").innerHTML = "Title is required<br>";
  //   }
  //   setEnabled(checkedTitle === true);
  // };

  const handleOnTitleKeys = (value) => {
    const letters = /^[a-zA-Z ]+$/;
    if (!value.match(letters)) {
      setCheckedTitle(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML =
        "Name - input only capital and small letters<br>";
    }
    if (value.match(letters)) {
      setCheckedTitle(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML = "";
    }
    if (value.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML = "Title is required<br>";
    }
  };

  const handleOnQuantityKeys = (valuee) => {
    const number = /^[0-9]+$/;
    const value = valuee.toString();
    if (!value.match(number)) {
      setCheckedQuantity(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("quantity").innerHTML = "Quantity - input only numbers<br>";
    }
    if (value.match(number)) {
      setCheckedQuantity(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("quantity").innerHTML = "";
    }
    if (value.length === 0) {
      setCheckedQuantity(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("quantity").innerHTML = "Quantity is required<br>";
    }
  };
  const handleOnBonusAmountKeys = (valuee) => {
    const number = /^[0-9.]+$/;
    const value = valuee.toString();
    if (!value.match(number)) {
      setCheckedBonus(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("bonusamount").innerHTML = "Bonus - input only numbers<br>";
    }
    if (value.match(number)) {
      setCheckedBonus(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("bonusamount").innerHTML = "";
    }
    if (value.length === 0) {
      setCheckedBonus(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("bonusamount").innerHTML = "";
    }
  };

  // const handleOnQuantityKeys = () => {
  //   const number = /^[0-9]+$/;
  //   const quantityxx = quantityx.toString();
  //   if (!quantityxx.match(number)) {
  //     setCheckedQuantity(false);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("quantity").innerHTML = "Quantity - input only numbers<br>";
  //   }
  //   if (quantityxx.match(number)) {
  //     setCheckedQuantity(true);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("quantity").innerHTML = "";
  //   }
  //   if (quantityxx.length === 0) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("quantity").innerHTML = "Quantity is required<br>";
  //   }
  //   setEnabled(checkedQuantity === true);
  // };
  // const handleOnPPQuantityKeys = () => {
  //   const number = /^[0-9 ]+$/;
  //   if (!ppQuantityx.match(number)) {
  //     setCheckedPPQuantity(false);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("ppquantity").innerHTML =
  //       "Price Per Quantity - input only numbers<br>";
  //   }
  //   if (ppQuantityx.match(number)) {
  //     setCheckedPPQuantity(true);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("ppquantity").innerHTML = "";
  //   }
  //   if (ppQuantityx.length === 0) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("ppquantity").innerHTML = "Price Per Quantity is required<br>";
  //   }
  //   setEnabled(checkedPPQuantity === true);
  // };
  // const handleOnVatAmountKeys = () => {
  //   const number = /^[0-9 ]+$/;
  //   if (!vatAmountx.match(number)) {
  //     setCheckedVatAmount(false);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("vatamount").innerHTML = "VatAmount - input only numbers<br>";
  //   }
  //   if (vatAmountx.match(number)) {
  //     setCheckedVatAmount(true);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("vatamount").innerHTML = "";
  //   }
  //   if (vatAmountx.length === 0) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("vatamount").innerHTML = "VatAmount is required<br>";
  //   }
  //   setEnabled(checkedVatAmount === true);
  // };
  // const handleOnBonusAmountKeys = () => {
  //   const number = /^[0-9.]+$/;
  //   if (!bonusAmountx.match(number)) {
  //     setCheckedBonusAmount(false);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("bonusamount").innerHTML = "Bonus amount - input only numbers<br>";
  //   }
  //   if (bonusAmountx.match(number)) {
  //     setCheckedBonusAmount(true);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("bonusamount").innerHTML = "";
  //   }
  //   if (bonusAmountx.length === 0) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("bonusamount").innerHTML = "";
  //   }
  //   setEnabled(checkedBonusAmount === true);
  // };

  // useEffect(() => {
  //   const headers = miHeaders;

  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
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
  //         setCreated(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // const totalx = quantityx * ppQuantityx;
  // eslint-disable-next-line no-eval

  const handleClick = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const idx = data11.id;

    const raw = JSON.stringify({
      title: titlex,
      clientID: individual,
      clientType: statusTYpex,
      orgID: orgIDs,
      productID: productIDx,
      quantity: quantityx,
      pricePerQuantity: pricePQ,
      totalAmount: totalAmountx,
      payingAmount: payAmountx,
      vatAmount: vatAmountx,
      bonusAmount: bonusAmountx,
      createdBy: idx,
      // status: statusTYpex,
      // approvedBy: approvex,
      // // approvedTime: 0,
      // terminatedBy: terminatex,
      // terminatedTime: 0,
      // demandID: 0,

      // orgID: string,
      // clientID: string,
      // clientType: 0,
      // supplyingBranchID: string,
      // quantity: 0,
      // pricePerQuantity: 0,
      // totalAmount: 0,
      // vatAmount: 0,
      // payingAmount: 0,
      // bonusAmount: 0,
      // createdBy: 0,
      // createdTime: 0,
      // status: 0,
      // approvedBy: 0,
      // approvedTime: 0,
      // terminatedBy: 0,
      // terminatedTime: 0,
      // demandID: "string",
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_LOUGA_URL}/demands/add`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
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
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  const trying = (e) => {
    // const statusTYpexx = e.target.value;
    setStatusType(e.target.value);
    const ifstate = e.target.value;
    if (ifstate === "1") {
      setIndiCorpo(individualx);
    } else if (ifstate === "2") {
      setIndiCorpo(corporate);
    }
  };

  // if (statusTYpex === 1) {
  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    // const clientID = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/gets/${orgIDs}`, {
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
          setIndividualx(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  // } else {
  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    // const clientID = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/corporate/gets/${orgIDs}`, {
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
          setCorporate(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  // }
  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    // const clientID = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_TANTA_URL}/tax/get/${orgIDs}`, {
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
          setValue(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  // }
  useEffect(() => {
    handleOnBonusAmountKeys(bonusAmountx);
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    // const clientID = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/products/gets/${orgIDs}`, {
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
          setProduct(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleValidate = (e) => {
    handleOnTitleKeys(titlex);
    handleOnQuantityKeys(quantityx);
    handleOnBonusAmountKeys(bonusAmountx);
    if (checkedTitle && checkedQuantity && checkedBonus === true) {
      handleClick(e);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={20}>
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
              Add Demand
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
            <MDTypography variant="gradient" fontSize="60%" color="white" id="title">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="quantity">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="ppquantity">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="vatamount">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="productType">
              {" "}
            </MDTypography>
            <MDTypography variant="gradient" fontSize="60%" color="white" id="bonusamount">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={0}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      label="Title *"
                      value={titlex || ""}
                      onKeyUp={(e) => handleOnTitleKeys(e.target.value)}
                      onChange={(e) => setTitle(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>

                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={quantityx || ""}
                      onKeyUp={(e) => handleOnQuantityKeys(e.target.value)}
                      onChange={(e) => setQuantity(e.target.value)}
                      label="Quantity *"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            &nbsp;
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
                        Client Type *
                      </MDTypography>
                      <Form.Select onChange={trying} aria-label="Default select example">
                        <option value="">--Select Client Type--</option>
                        {/* <option value="0">Leeds</option> */}
                        <option value="1">Individual</option>
                        <option value="2">Corporate</option>
                      </Form.Select>
                    </MDBox>
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={bonusAmountx || ""}
                      label="Bonus Amount (NGN)"
                      variant="standard"
                      fullWidth
                      onKeyUp={(e) => handleOnBonusAmountKeys(e.target.value)}
                      onChange={(e) => setBonusAmount(e.target.value)}
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      textAlign="center"
                      color="text"
                    >
                      Select Client *
                    </MDTypography>
                    <br />
                    <Form.Select
                      value={individual}
                      onChange={(e) => setIndividual(e.target.value)}
                      aria-label="Default select example"
                    >
                      <option value="">--Select Client--</option>
                      {indiCorpo.map((api) => (
                        <option key={api.id} value={api.id}>
                          {api.name} {api.fname} {api.lname}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <div className="col-sm-6">
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      fontSize="80%"
                      textAlign="center"
                      color="text"
                    >
                      Product Type *
                    </MDTypography>
                    <br />
                    <Form.Select
                      value={productIDx}
                      onChange={(e) => handlepricePQ(e)}
                      aria-label="Default select example"
                    >
                      <option value="">--Product Type--</option>
                      {product.map((api) => (
                        <option key={api.id} value={api.id}>
                          {api.name} ({api.description})
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>
              </Container>
              &nbsp;
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={pricePQ}
                      // onKeyUp={handleOnPPQuantityKeys}
                      onChange={(e) => setpricePQ(e.target.value)}
                      label="Price Per Quantity (NGN)"
                      variant="standard"
                      fullWidth
                      disabled
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={totalAmountx || ""}
                      // onChange={(e) => setQuantity(e.target.value)}
                      label="Total Amount (NGN)"
                      variant="standard"
                      fullWidth
                      disabled
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            &nbsp;
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={vatAmountx || ""}
                      // onKeyUp={handleOnVatAmountKeys}
                      // onChange={(e) => setVatAmount(e.target.value)}
                      label="V.A.T (NGN)"
                      variant="standard"
                      fullWidth
                      disabled
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={payAmountx || ""}
                      // onKeyUp={handleOnVatAmountKeys}
                      // onChange={(e) => setVatAmount(e.target.value)}
                      label="Paying Amount (NGN)"
                      variant="standard"
                      fullWidth
                      disabled
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
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

export default Demand;
