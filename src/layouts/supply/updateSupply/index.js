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
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import Styles from "styles";

function SupplyUpdate() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [idx, setIdx] = useState("");
  const [checkedTitle, setCheckedTitle] = useState("");
  const [ceatedByx, setCreatedBy] = useState("");
  const [OrgIdx, setOrgID] = useState("");
  const [checkedQuantity, setCheckedQuantity] = useState("");
  const [checkedPPQuantity, setCheckedPPQuantity] = useState("");
  const [checkedVatAmount, setCheckedVatAmount] = useState("");
  const [checkedBonusAmount, setCheckedBonusAmount] = useState("");
  const [enabled, setEnabled] = useState("");
  const [titlex, setTitle] = useState("");
  const [quantityx, setQuantity] = useState("");
  const [supplybranx, setSupplybran] = useState([]);
  const [supplyingBranchName, setSupplyingBranchName] = useState("");
  const [vatAmountx, setVatAmount] = useState("");
  const [bonusAmountx, setBonusAmount] = useState("");
  const [supplyingBranchIDx, setSupplyingBranchID] = useState("");

  const [showClients, setShowClients] = useState(false);
  const [uclientIDx, setUClientIDx] = useState("");
  const [clientx, setClient] = useState([]);
  const [uclientTypex, setUClientTypex] = useState("");

  const [product, setProduct] = useState([]);
  const [productIDx, setProductID] = useState("");
  const [pricePQ, setpricePQ] = useState("");

  const [createdTimex, setCreatedTimex] = useState("");
  const [statusx, setStatusx] = useState("");
  const [approvedByx, setApprovedByx] = useState("");
  const [approvedTimex, setApprovedTimex] = useState("");
  const [terminatedByx, setTerminatedByx] = useState("");
  const [terminatedTimex, setTerminatedTimex] = useState("");
  const [demandIdx, setDemandID] = useState("");

  const [opened, setOpened] = useState(false);
  console.log(opened);

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
        if (isMounted) {
          if (result.length === 0) {
            setSupplybran([]);
          } else {
            setSupplybran(result);
          }
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

  const handlepricePQ = (e) => {
    const filteredItems = product.filter((item) => item.id === e.target.value);
    setpricePQ(filteredItems[0].pricePerQuantity);
    setProductID(e.target.value);
  };

  const handleChangeClient = (value) => {
    const callClientType = value.toString();
    setUClientTypex(callClientType);
    let clientTyppe = "";
    if (callClientType === "1") {
      setShowClients(true);
      clientTyppe = "individual";
    } else if (callClientType === "2") {
      setShowClients(false);
      clientTyppe = "corporate";
    }
    setOpened(true);
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
        setClient(result);
      });
  };

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/supply/getByIds/${ids}`, {
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
            console.log(result);
            setIdx(result[0].id);
            setOrgID(result[0].orgID);
            setCreatedBy(result[0].createdBy);
            setTitle(result[0].title);
            setQuantity(result[0].quantity);
            setpricePQ(result[0].pricePerQuantity);
            setUClientTypex(result[0].clientType);
            setUClientIDx(result[0].clientID);
            setSupplyingBranchName(result[0].supplyingBranchID);
            handleChangeClient(result[0].clientType);
            setVatAmount(result[0].vatAmount);
            setBonusAmount(result[0].bonusAmount);
            setProductID(result[0].productID);
            setSupplyingBranchID(result[0].supplyingBranchID);
            setDemandID(result[0].demandID);
            setTerminatedTimex(result[0].terminatedTime);
            setTerminatedByx(result[0].terminatedBy);
            setApprovedTimex(result[0].approvedTime);
            setApprovedByx(result[0].approvedBy);
            setStatusx(result[0].status);
            setCreatedTimex(result[0].createdTime);
          } else {
            setIdx(null);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnTitleKeys = () => {
    const letter = /^[a-zA-Z ]+$/;
    if (!titlex.match(letter)) {
      setCheckedTitle(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML =
        "Name - input only capital and small letters<br>";
    }
    if (titlex.match(letter)) {
      setCheckedTitle(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML = "";
    }
    if (titlex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("title").innerHTML = "Title is required<br>";
    }
    setEnabled(checkedTitle === true);
  };

  const handleOnQuantityKeys = () => {
    const number = /^[0-9 ]+$/;
    const metoostring = quantityx.toString();
    if (!metoostring.match(number)) {
      setCheckedQuantity(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("quantity").innerHTML = "Quantity - input only numbers<br>";
    }
    if (metoostring.match(number)) {
      setCheckedQuantity(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("quantity").innerHTML = "";
    }
    if (metoostring.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("quantity").innerHTML = "Quantity is required<br>";
    }
    setEnabled(checkedQuantity === true);
  };
  const handleOnPPQuantityKeys = () => {
    const number = /^[0-9 ]+$/;
    const metoostringpp = pricePQ.toString();
    if (!metoostringpp.match(number)) {
      setCheckedPPQuantity(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("ppquantity").innerHTML =
        "Price Per Quantity - input only numbers<br>";
    }
    if (metoostringpp.match(number)) {
      setCheckedPPQuantity(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("ppquantity").innerHTML = "";
    }
    if (metoostringpp.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("ppquantity").innerHTML = "Price Per Quantity is required<br>";
    }
    setEnabled(checkedPPQuantity === true);
  };
  const handleOnVatAmountKeys = () => {
    const number = /^[0-9. ]+$/;
    const vatToString = vatAmountx.toString();
    if (!vatToString.match(number)) {
      setCheckedVatAmount(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("vatamount").innerHTML = "VatAmount - input only numbers<br>";
    }
    if (vatToString.match(number)) {
      setCheckedVatAmount(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("vatamount").innerHTML = "";
    }
    if (vatToString.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("vatamount").innerHTML = "VatAmount is required<br>";
    }
    setEnabled(checkedVatAmount === true);
  };
  const handleOnBonusAmountKeys = () => {
    const number = /^[0-9 ]+$/;
    const bonusTostring = bonusAmountx.toString();
    if (!bonusTostring.match(number)) {
      setCheckedBonusAmount(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("bonusamount").innerHTML = "bonusamount - input only numbers<br>";
    }
    if (bonusTostring.match(number)) {
      setCheckedBonusAmount(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("bonusamount").innerHTML = "";
    }
    if (bonusTostring.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("bonusamount").innerHTML = "bonusamount is required<br>";
    }
    setEnabled(checkedBonusAmount === true);
  };

  // eslint-disable-next-line no-eval
  const ans = eval(quantityx * pricePQ);
  // eslint-disable-next-line no-eval
  const payAmountx = eval(vatAmountx + ans - bonusAmountx);

  const handleUpdate = (e) => {
    handleOnTitleKeys();
    handleOnQuantityKeys();
    handleOnPPQuantityKeys();
    handleOnVatAmountKeys();
    handleOnBonusAmountKeys();
    if (enabled) {
      e.preventDefault();

      const raw = JSON.stringify({
        id: idx,
        title: titlex,
        orgID: OrgIdx,
        clientID: uclientIDx,
        clientType: uclientTypex,
        productID: productIDx,
        supplyingBranchID: supplyingBranchIDx,
        quantity: quantityx,
        pricePerQuantity: pricePQ,
        totalAmount: ans,
        vatAmount: vatAmountx,
        payingAmount: payAmountx,
        bonusAmount: bonusAmountx,
        createdBy: ceatedByx,
        createdTime: createdTimex,
        status: statusx,
        approvedBy: approvedByx,
        approvedTime: approvedTimex,
        terminatedBy: terminatedByx,
        terminatedTime: terminatedTimex,
        demandID: demandIdx,
      });
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_LOUGA_URL}/supply/update`, requestOptions)
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
            navigate("/supply");
          });
        })
        .catch((error) => {
          MySwal.fire({
            title: error.status,
            type: "error",
            text: error.message,
          });
        });
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3}>
          <MDBox component="form" role="form">
            <MDBox
              variant="gradient"
              // bgColor="info"
              style={Styles.boxSx}
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-6}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                Update Supply
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
                  <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={5}>
                      <MDInput
                        type="text"
                        label="Title"
                        value={titlex || ""}
                        onKeyUp={handleOnTitleKeys}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="standard"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={5}>
                      <MDInput
                        type="text"
                        value={quantityx || ""}
                        onKeyUp={handleOnQuantityKeys}
                        onChange={(e) => setQuantity(e.target.value)}
                        label="Quantity"
                        variant="standard"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={5}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                        mt={0}
                      >
                        Client Type
                      </MDTypography>
                      <MDBox textAlign="right">
                        <Form.Select
                          onChange={(e) => handleChangeClient(e.target.value)}
                          value={uclientTypex || ""}
                          aria-label="Default select example"
                        >
                          <option>---Select Client Type---</option>
                          <option value="1">Individual</option>
                          <option value="2">Corperate</option>
                        </Form.Select>
                      </MDBox>
                    </Grid>

                    <Grid item xs={5}>
                      <MDBox mt={0}>
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          fontSize="80%"
                          align="left"
                          color="text"
                        >
                          Client
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
                        <br />
                      </MDBox>
                    </Grid>

                    <Grid item xs={5}>
                      <MDBox mb={2}>
                        <MDTypography variant="button" fontWeight="regular" color="text">
                          Supplying Branch
                        </MDTypography>
                        <Form.Select
                          value={supplyingBranchName || ""}
                          onChange={(e) => setSupplyingBranchName(e.target.value)}
                          aria-label="Default select example"
                        >
                          <option value="">Supplying Branch</option>
                          {supplybranx.map((api) => (
                            <option key={api.id} value={api.id}>
                              {api.name}
                            </option>
                          ))}
                        </Form.Select>
                        <br />
                      </MDBox>
                    </Grid>

                    <Grid item xs={5}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
                        color="text"
                      >
                        Product Type *
                      </MDTypography>

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
                    </Grid>

                    <Grid item xs={5}>
                      <MDInput
                        type="text"
                        value={bonusAmountx || ""}
                        onKeyUp={handleOnBonusAmountKeys}
                        onChange={(e) => setBonusAmount(e.target.value)}
                        label="Bonus Amount (NGN)"
                        variant="standard"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={5}>
                      <MDInput
                        type="text"
                        value={pricePQ || ""}
                        onKeyUp={handleOnPPQuantityKeys}
                        onChange={(e) => setpricePQ(e.target.value)}
                        label="Price Per Quantity (NGN)"
                        variant="standard"
                        fullWidth
                        disabled
                      />
                    </Grid>

                    <Grid item xs={5}>
                      <MDInput
                        type="text"
                        value={ans || ""}
                        label="Total Amount (NGN)"
                        variant="standard"
                        fullWidth
                        disabled
                      />
                    </Grid>

                    <Grid item xs={5}>
                      <MDInput
                        type="text"
                        value={vatAmountx || ""}
                        onKeyUp={handleOnVatAmountKeys}
                        onChange={(e) => setVatAmount(e.target.value)}
                        label="V.A.T Amount (NGN)"
                        variant="standard"
                        fullWidth
                        disabled
                      />
                    </Grid>

                    <Grid item xs={5}>
                      <MDInput
                        type="text"
                        value={payAmountx || ""}
                        label="Paying Amount (NGN)"
                        variant="standard"
                        fullWidth
                        disabled
                      />
                    </Grid>

                    <Grid item xs={5}>
                      <></>
                    </Grid>

                    <Grid item xs={5}>
                      {" "}
                      <MDBox mt={1} mb={1}>
                        <MDButton
                          variant="gradient"
                          onClick={handleUpdate}
                          // disabled={!enabled}
                          // color="info"
                          style={Styles.buttonSx}
                          width="50%"
                          align="center"
                        >
                          Update
                        </MDButton>
                      </MDBox>
                    </Grid>

                    <Grid item xs={5}>
                      <></>
                    </Grid>
                  </Grid>
                </Container>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default SupplyUpdate;
