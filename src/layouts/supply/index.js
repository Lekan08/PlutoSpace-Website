import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
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
import SupplyTable from "layouts/supply/supplytable.js";
// Zinoleesky

function supply() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = SupplyTable();
  const [titlex, setTitle] = useState("");
  const [quantityx, setQuantity] = useState("");
  const [checkedTitle, setCheckedTitle] = useState("");
  const [checkedQuantity, setCheckedQuantity] = useState("");
  const [valuex, setValue] = useState("");
  const [enabled, setEnabled] = useState("");
  const [supplybranx, setSupplybran] = useState([]);
  const [supplyingBranx, setSupplyingBran] = useState("");
  const [bonusAmountx, setBonusAmount] = useState("");

  const [productIDx, setproductID] = useState("");
  const [showClients, setShowClients] = useState(false);
  const [clientx, setClient] = useState([]);
  const [clientTypex, setClientTypex] = useState("");
  const [clientIDx, setClientIDx] = useState("");
  const [product, setProduct] = useState([]);
  const [pricePQ, setpricePQ] = useState("");

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
  const ans = eval(quantityx * pricePQ);

  // eslint-disable-next-line no-eval
  const vatAmountx = eval((valuex.value / 100) * ans);
  // eslint-disable-next-line no-eval
  const payAmountx = eval(vatAmountx + ans - bonusAmountx);

  function handleOnTitleKeys() {
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
  }
  const handleOnQuantityKeys = () => {
    const number = /^[0-9 ]+$/;
    if (!quantityx.match(number)) {
      setCheckedQuantity(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("quantity").innerHTML = "Quantity - input only numbers<br>";
    }
    if (quantityx.match(number)) {
      setCheckedQuantity(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("quantity").innerHTML = "";
    }
    if (quantityx.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("quantity").innerHTML = "Quantity is required<br>";
    }
    setEnabled(checkedQuantity === true);
  };

  const handlePayVAT = (requestIDx) => {
    if (enabled) {
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const idx = data11.personalID;
      const raw = JSON.stringify({
        orgID: orgIDs,
        empID: idx,
        requestID: requestIDx,
        amount: vatAmountx,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_TANTA_URL}/taxRemittance/add`, requestOptions)
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
        });
    }
  };

  const handleClick = (e) => {
    handleOnTitleKeys();
    handleOnQuantityKeys();
    if (enabled) {
      setOpened(true);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const idx = data11.personalID;
      const raw = JSON.stringify({
        title: titlex,
        orgID: orgIDs,
        clientID: clientIDx,
        clientType: clientTypex,
        supplyingBranchID: supplyingBranx,
        quantity: quantityx,
        pricePerQuantity: pricePQ,
        totalAmount: ans,
        vatAmount: vatAmountx,
        payingAmount: payAmountx,
        bonusAmount: bonusAmountx,
        createdBy: idx,
        productID: productIDx,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_LOUGA_URL}/supply/add`, requestOptions)
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
          })
            .then(() => {
              handlePayVAT(result.data.id);
            })
            .then(() => {
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
    }
  };
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

  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
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
          setSupplybran(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChangeClient = (value) => {
    const callClientType = value.toString();
    setClientTypex(callClientType);
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

  const exportColumns = [
    {
      Header: "Title",
      accessor: "title",
      align: "left",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
      align: "left",
    },
    {
      Header: "Approve By",
      accessor: "approvedByName",
      align: "left",
    },
    {
      Header: "Paying Amount",
      accessor: "payingAmount",
      align: "left",
    },
    {
      Header: "Paying Amount",
      accessor: "payingAmount",
      align: "left",
    },
    {
      Header: "Supplying Branch Name",
      accessor: "supplyingBranchName",
      align: "left",
    },
    {
      Header: "Client Name",
      accessor: "clientName",
      align: "left",
    },
  ];

  const newCloums = exportColumns.map((Col) => ({
    title: Col.Header,
    dataKey: Col.accessor,
  }));
  const exportPDF = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        // eslint-disable-next-line new-cap
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(newCloums, pRows);
        doc.save("supplytable.pdf");
      });
    });
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
            <MDTypography variant="h4" fontWeight="medium" color="RED" mt={1}>
              Add Supply
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
                      onKeyUp={handleOnTitleKeys}
                      onChange={(e) => setTitle(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </div>

                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={quantityx || ""}
                      onKeyUp={handleOnQuantityKeys}
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
                        value={clientTypex || ""}
                        aria-label="Default select example"
                      >
                        <option>--Select Client Type--</option>
                        <option value="1">Individual</option>
                        <option value="2">Corporate</option>
                      </Form.Select>
                    </MDBox>
                  </div>
                  <div className="col-sm-6">
                    <MDBox mt={0}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                      >
                        Client *
                      </MDTypography>{" "}
                      {showClients ? (
                        <Form.Select
                          value={clientIDx}
                          onChange={(e) => setClientIDx(e.target.value)}
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
                          value={clientIDx}
                          onChange={(e) => setClientIDx(e.target.value)}
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
                      Supplying Branch *
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        value={supplyingBranx}
                        onChange={(e) => setSupplyingBran(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">--Supplying Branch--</option>
                        {supplybranx.map((api) => (
                          <option key={api.id} value={api.id}>
                            {api.name}
                          </option>
                        ))}
                      </Form.Select>
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
            </MDBox>
            &nbsp;
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={bonusAmountx || ""}
                      onChange={(e) => setBonusAmount(e.target.value)}
                      label="Bonus Amount (NGN)"
                      variant="standard"
                      fullWidth
                    />
                  </div>

                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={pricePQ || ""}
                      onChange={(e) => setpricePQ(e.target.value)}
                      label="Price Per Quantity (NGN) *"
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
                      value={ans || ""}
                      label="Total Amount (NGN)"
                      variant="standard"
                      fullWidth
                      disabled
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={vatAmountx || ""}
                      label="V.A.T Amount (NGN)"
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
                      value={payAmountx || ""}
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
                onClick={handleClick}
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
      &nbsp;
      <MDBox mt={4} mb={1}>
        <MDButton variant="gradient" onClick={exportPDF} color="info" width="50%" align="center">
          Export pdf
        </MDButton>
      </MDBox>
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

export default supply;
