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

function DemandUpdate() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [idx, setIdx] = useState("");
  const [checkedTitle, setCheckedTitle] = useState("");
  const [checkedQuantity, setCheckedQuantity] = useState("");
  const [checkedBonusAmount, setCheckedBonusAmount] = useState("");
  // const [enabled, setEnabled] = useState("");
  const [titlex, setTitle] = useState("");
  const [quantityx, setQuantity] = useState("");
  // const [clientNamex, setClientName] = useState("");
  //   const [clientTypex, setClientType] = useState("");
  //   const [supplyingBranchNamex, setSupplyingBranchName] = useState("");
  // const [statusTYpex, setStatusType] = useState("");
  const [UValue, setUValue] = useState("");
  const [ppQuantityx, setPPQuantity] = useState("");
  const [product, setProduct] = useState([]);
  const [productIDx, setProductID] = useState("");
  const [vatAmountx, setVatAmount] = useState("");
  const [bonusAmountx, setBonusAmount] = useState("");
  const [totalAmountx, setTotalAmount] = useState("");
  const [payAmountx, setPayingAmount] = useState("");
  const [deleteFlagx, setdeleteFlagx] = useState("");
  const [approvedTimex, setapprovedTimex] = useState("");
  const [approvedByx, setApprovedBy] = useState("");
  const [statusx, setStatus] = useState("");
  const [terminatedByx, setTerminatedBy] = useState("");
  const [terminatedTimex, setTerminatedTime] = useState("");
  const [createdTimex, setcreatedTime] = useState("");

  const [showClients, setShowClients] = useState(false);
  const [uclientIDx, setUClientIDx] = useState("");
  const [clientx, setClient] = useState([]);
  const [uclientTypex, setUClientTypex] = useState("");

  // const uppQuantityx = (e, val) => {
  //   // eslint-disable-next-line no-use-before-define
  //   handlepricePQ(e, val);
  // };

  // eslint-disable-next-line no-eval
  const handlepricePQ = (e, val) => {
    if (val === 0) {
      const filteredItems = product.filter((item) => item.id === e.target.value);
      setPPQuantity(filteredItems[0].pricePerQuantity);
      // eslint-disable-next-line no-eval
      setTotalAmount(eval(quantityx * filteredItems[0].pricePerQuantity));
      // eslint-disable-next-line no-eval
      setVatAmount(eval((UValue.value / 100) * (quantityx * filteredItems[0].pricePerQuantity)));
      // eslint-disable-next-line no-eval
      setPayingAmount(
        // eslint-disable-next-line no-eval
        eval(
          (UValue.value / 100) * (quantityx * filteredItems[0].pricePerQuantity) +
            quantityx * filteredItems[0].pricePerQuantity -
            bonusAmountx
        )
      );
      //   const [opened, setOpened] = useState(false);
      setProductID(e.target.value);
      // return;
    }
  };

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
          setUValue(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
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

  const handleChangeClient = (value) => {
    const callClientType = value.toString();
    // setClientTypex(callClientType);
    setUClientTypex(callClientType);
    let clientTyppe = "";
    if (callClientType === "1") {
      setShowClients(true);
      clientTyppe = "individual";
    } else if (callClientType === "2") {
      setShowClients(false);
      clientTyppe = "corporate";
    }
    // setOpened(true);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

    fetch(`${process.env.REACT_APP_LOUGA_URL}/${clientTyppe}/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        setClient(result);
      });
  };

  // Method to fetch all timeofftype
  // Method to fetch all timeofftype
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
          // eslint-disable-next-line eqeqeq
          if (result.length != 0) {
            setIdx(result[0].id);
            setTitle(result[0].title);
            setQuantity(result[0].quantity);
            setPPQuantity(result[0].pricePerQuantity);
            // setIndividual(result[0].clientType);
            setUClientTypex(result[0].clientType);
            setUClientIDx(result[0].clientID);
            setProductID(result[0].productID);
            handleChangeClient(result[0].clientType);
            setVatAmount(result[0].vatAmount);
            setBonusAmount(result[0].bonusAmount);
            setTotalAmount(result[0].totalAmount);
            setPayingAmount(result[0].payingAmount);
            setdeleteFlagx(result[0].deleteFlag);
            setcreatedTime(result[0].createdTime);
            setapprovedTimex(result[0].approvedTime);
            setApprovedBy(result[0].approvedBy);
            setStatus(result[0].status);
            setTerminatedBy(result[0].terminatedBy);
            setTerminatedTime(result[0].terminatedTime);
          } else {
            setIdx(null);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

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
      setCheckedBonusAmount(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("bonusamount").innerHTML = "Bonus - input only numbers<br>";
    }
    if (value.match(number)) {
      setCheckedBonusAmount(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("bonusamount").innerHTML = "";
    }
    if (value.length === 0) {
      setCheckedBonusAmount(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("bonusamount").innerHTML = "";
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const idxx = data11.id;

    const raw = JSON.stringify({
      id: idx,
      title: titlex,
      clientID: uclientIDx,
      clientType: uclientTypex,
      orgID: orgIDs,
      productID: productIDx,
      // supplyingBranchID: supplyingBranchIDx,
      quantity: quantityx,
      pricePerQuantity: ppQuantityx,
      totalAmount: totalAmountx,
      payingAmount: payAmountx,
      vatAmount: vatAmountx,
      bonusAmount: bonusAmountx,
      createdBy: idxx,
      createdTime: createdTimex,
      terminatedTime: terminatedTimex,
      terminatedBy: terminatedByx,
      status: statusx,
      approvedTime: approvedTimex,
      approvedBy: approvedByx,
      deleteFlag: deleteFlagx,

      //         clientID": "string",
      //   "clientType": 0,
      //   "supplyingBranchID": "string",
      //   "quantity": 0,
      //   "pricePerQuantity": 0,
      //   "totalAmount": 0,
      //   "vatAmount": 0,
      //   "payingAmount": 0,
      //   "bonusAmount": 0,
      //   "createdBy": 0,
      //   "createdTime": 0,
      //   "status": 0,
      //   "approvedBy": 0,
      //   "approvedTime": 0,
      //   "terminatedBy": 0,
      //   "terminatedTime": 0,
      //   "demandID": "string"
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_LOUGA_URL}/demands/update`, requestOptions)
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

  const handleValidate = (e) => {
    handleOnTitleKeys(titlex);
    handleOnQuantityKeys(quantityx);
    handleOnBonusAmountKeys(bonusAmountx);
    if (checkedTitle && checkedQuantity && checkedBonusAmount === true) {
      handleUpdate(e);
    }
  };
  // eslint-disable-next-line no-eval
  const UtotalAmountx = eval(quantityx * ppQuantityx);
  // eslint-disable-next-line no-eval
  const UvatAmountx = eval((UValue.value / 100) * UtotalAmountx);
  // eslint-disable-next-line no-eval
  const UpayAmountx = eval(UvatAmountx + UtotalAmountx - bonusAmountx);

  useEffect(() => {
    handleOnTitleKeys(titlex);
    handleOnQuantityKeys(quantityx);
    handleOnBonusAmountKeys(bonusAmountx);
    setTotalAmount(UtotalAmountx);
    setVatAmount(UvatAmountx);
    setPayingAmount(UpayAmountx);
  }, [quantityx]);
  useEffect(() => {
    setTotalAmount(UtotalAmountx);
    setVatAmount(UvatAmountx);
    setPayingAmount(UpayAmountx);
  }, [bonusAmountx]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="row">
        <div className="col-sm-2">&nbsp;</div>
        <div className="col-sm-8" align="center">
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="success"
                  mx={2}
                  mt={-6}
                  p={3}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                    Update Demand
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
                  <MDTypography variant="gradient" fontSize="60%" color="error" id="title">
                    {" "}
                  </MDTypography>
                  <MDTypography variant="gradient" fontSize="60%" color="error" id="quantity">
                    {" "}
                  </MDTypography>
                  <MDTypography variant="gradient" fontSize="60%" color="error" id="ppquantity">
                    {" "}
                  </MDTypography>
                  <MDTypography variant="gradient" fontSize="60%" color="error" id="vatamount">
                    {" "}
                  </MDTypography>
                  <MDTypography variant="gradient" fontSize="60%" color="error" id="totalamount">
                    {" "}
                  </MDTypography>
                  <MDTypography variant="gradient" fontSize="60%" color="error" id="bonusamount">
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
                          <MDTypography
                            variant="button"
                            fontWeight="regular"
                            fontSize="80%"
                            align="left"
                            color="text"
                            mt={0}
                          >
                            Client Type *
                          </MDTypography>
                          <MDBox textAlign="right">
                            <Form.Select
                              onChange={(e) => handleChangeClient(e.target.value)}
                              value={uclientTypex || ""}
                              aria-label="Default select example"
                            >
                              <option>--Select Client Type--</option>
                              <option value="1">Individual</option>
                              <option value="2">Corperate</option>
                            </Form.Select>
                          </MDBox>
                        </div>
                        <div className="col-sm-6">
                          <MDInput
                            type="text"
                            value={bonusAmountx || ""}
                            onKeyUp={(e) => handleOnBonusAmountKeys(e.target.value)}
                            onChange={(e) => setBonusAmount(e.target.value)}
                            label="Bonus Amount (NGN)"
                            variant="standard"
                            fullWidth
                          />
                        </div>
                      </div>
                    </Container>
                    <Container>
                      <div className="row">
                        <div className="col-sm-6">
                          <MDBox mt={0}>
                            <MDTypography
                              variant="button"
                              fontWeight="regular"
                              fontSize="80%"
                              align="left"
                              color="text"
                            >
                              Select Client *
                            </MDTypography>{" "}
                            {showClients ? (
                              <Form.Select
                                value={uclientIDx}
                                onChange={(e) => setUClientIDx(e.target.value)}
                                aria-label="Default select example"
                              >
                                <option value="">--Select User--</option>
                                {clientx.map((api) => (
                                  <option key={api.id} value={api.id}>
                                    {api.title} {api.fname} {api.lname}
                                  </option>
                                ))}
                              </Form.Select>
                            ) : (
                              <Form.Select
                                value={uclientIDx}
                                onChange={(e) => setUClientIDx(e.target.value)}
                                aria-label="Default select example"
                              >
                                <option value="">--Select User--</option>
                                {clientx.map((api) => (
                                  <option key={api.id} value={api.id}>
                                    {api.name}
                                  </option>
                                ))}
                              </Form.Select>
                            )}
                          </MDBox>
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
                            onChange={(e) => handlepricePQ(e, 0)}
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
                  </MDBox>
                  &nbsp;
                  <MDBox>
                    <Container>
                      <div className="row">
                        <div className="col-sm-6">
                          <MDInput
                            type="text"
                            value={ppQuantityx || ""}
                            onChange={(e) => setPPQuantity(e.target.value)}
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
                            onChange={(e) => setTotalAmount(e.target.value)}
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
                            onChange={(e) => setVatAmount(e.target.value)}
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
                            onChange={(e) => setPayingAmount(e.target.value)}
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
                      // disabled={!enabled}
                      color="info"
                      width="50%"
                      align="center"
                    >
                      Update
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DemandUpdate;
