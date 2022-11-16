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
import SupplyTable from "layouts/supply/supplytable.js";
// Zinoleesky

function ConvertDemandToSupply() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = SupplyTable();
  const [titlex, setTitle] = useState("");
  const [quantityx, setQuantity] = useState("");
  // const [descripx, setDescrip] = useState("");
  const [checkedTitle, setCheckedTitle] = useState("");
  const [checkedQuantity, setCheckedQuantity] = useState("");
  // const [checkedPPQuantity, setCheckedPPQuantity] = useState("");
  // const [checkedVatAmount, setCheckedVatAmount] = useState("");
  // const [checkedBonusAmount, setCheckedBonusAmount] = useState("");
  // const [valuex, setValue] = useState("");
  const [enabled, setEnabled] = useState("");
  // const [createdx, setCreated] = useState([]);
  // const [appDeclinx, setAppDeclin] = useState("");
  // const [statusTYpex, setStatusType] = useState("");
  // const [createdxx, setCreatedx] = useState("");
  // const [approvex, setApprove] = useState("");
  // const [terminatex, setTerminate] = useState("");
  // const [ppQuantityx, setPPQuantity] = useState("");
  const [supplybranx, setSupplybran] = useState([]);
  const [supplyingBranx, setSupplyingBran] = useState("");
  const [vatAmountx, setVatAmount] = useState("");
  const [bonusAmountx, setBonusAmount] = useState("");

  // const [individual, setIndividual] = useState("");
  // const [individualx, setIndividualx] = useState("");
  // const [corporate, setCorporate] = useState("");
  // const [indiCorpo, setIndiCorpo] = useState([]);

  const [productIDx, setproductID] = useState("");
  const [showClients, setShowClients] = useState(false);
  // const [uclientTypex, setUClientTypex] = useState("");
  const [clientx, setClient] = useState([]);
  const [clientTypex, setClientTypex] = useState("");
  const [clientIDx, setClientIDx] = useState("");
  const [product, setProduct] = useState([]);
  const [newRows, setNewRow] = useState([]);
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
  const payAmountx = eval(vatAmountx + ans - bonusAmountx);

  // const changeStartTime = (timestamp) => {
  //   const startTime = new Date(timestamp);
  // };
  // useEffect(() => {
  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const orgIDs = data11.orgID;

  //   // const startTime = new Date(timestamp);
  //   // // console.log(startTime);
  //   // // const startTimex = startTime(timestamp);
  //   // // console.log(startTimex);
  //   // const endTime = new Date(timestamp);
  //   // console.log(endTime);
  //   // const endTimex = endTime(timestamp);
  //   // console.log(endTimex);

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
  //         console.log(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

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
  // useEffect(() => {
  //   const headers = miHeaders;

  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const ids = urlParams.get("id");
  //   // const ids = JSON.parse([id]);

  //   // const data11 = JSON.parse(localStorage.getItem("user1"));

  //   // const ids = data11.id;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/demands/getByIds/${ids}`, {
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
  //         console.log(result);
  //         // eslint-disable-next-line eqeqeq
  //         if (result.length != 0) {
  //           // setIdx(result[0].id);
  //           // setTitle(result[0].title);
  //           // setQuantity(result[0].quantity);
  //           // setPPQuantity(result[0].pricePerQuantity);
  //           // // setIndividual(result[0].clientType);
  //           // setUClientTypex(result[0].clientType);
  //           // setUClientIDx(result[0].clientID);
  //           // setProductID(result[0].productID);
  //           // handleChangeClient(result[0].clientType);
  //           // setVatAmount(result[0].vatAmount);
  //           // setBonusAmount(result[0].bonusAmount);
  //           // setTotalAmount(result[0].totalAmount);
  //           // setPayingAmount(result[0].payingAmount);
  //           // setCreatedx(result[0].clientName);
  //           // setSupplyingBranchID(result[0].supplyingBranchID);
  //           // setDeletex(result[0].deleteFlag);
  //           // setApprovex(result[0].approverID);
  //           // setAdminx(result[0].adminID);
  //           // setReasonx(result[0].reasonForDisapproval);
  //           // setStatusx(result[0].status);
  //         } else {
  //           // setIdx(null);
  //         }
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
  // const handleOnPPQuantityKeys = () => {
  //   const number = /^[0-9 ]+$/;
  //   if (!pricePQ.match(number)) {
  //     setCheckedPPQuantity(false);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("ppquantity").innerHTML =
  //       "Price Per Quantity - input only numbers<br>";
  //   }
  //   if (pricePQ.match(number)) {
  //     setCheckedPPQuantity(true);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("ppquantity").innerHTML = "";
  //   }
  //   if (pricePQ.length === 0) {
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
  //   const number = /^[0-9 ]+$/;
  //   if (!bonusAmountx.match(number)) {
  //     setCheckedBonusAmount(false);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("bonusamount").innerHTML = "bonusamount - input only numbers<br>";
  //   }
  //   if (bonusAmountx.match(number)) {
  //     setCheckedBonusAmount(true);
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("bonusamount").innerHTML = "";
  //   }
  //   if (bonusAmountx.length === 0) {
  //     // eslint-disable-next-line no-unused-expressions
  //     document.getElementById("bonusamount").innerHTML = "bonusamount is required<br>";
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
    handleOnTitleKeys();
    handleOnQuantityKeys();
    // handleOnPPQuantityKeys();
    // handleOnBonusAmountKeys();
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
        // approverID: approvex,
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
    }
  };

  const handleChangeClient = (value) => {
    console.log(value);
    const callClientType = value.toString();
    setClientTypex(callClientType);
    // setUClientTypex(callClientType);
    let clientTyppe = "";
    if (callClientType === "1") {
      setShowClients(true);
      clientTyppe = "individual";
    } else if (callClientType === "2") {
      setShowClients(false);
      clientTyppe = "corporate";
    }
    console.log(clientTyppe);
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
        console.log(result);
      });
  };

  // eslint-disable-next-line consistent-return
  const handleOnClientType = (clientType) => {
    if (clientType === 1) {
      return "Individual";
    }
    if (clientType === 2) {
      return "Corporate";
    }
  };
  const changeStatus = (value) => {
    if (value === 1) {
      return "APPROVED";
    }
    if (value === 2) {
      return "DISAPPROVED";
    }
    return "CREATED";
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const newwRows = [];
      console.log(pRows);
      // eslint-disable-next-line array-callback-return
      pRows.map((item) => {
        // const newItems = {
        //   approvedBy: item.approvedBy,
        //   approvedByName: "Fanty Tolu",
        //   approvedTime: 1667328474614,
        //   bonusAmount: 0,
        //   clientID: "63480b2fafb08d6bcc1ed32a",
        //   clientName: "ghjgnv gfh",
        //   clientType: handleOnClientType(item.clientType),
        //   createdBy: 80,
        //   createdByName: "Fanty Tolu",
        //   createdTime: 1667328448124,
        //   demandID: null,
        //   demandTitle: "",
        //   id: "636169c051aacf356aac757b",
        //   orgID: "63454a8aa706bd117091a369",
        //   payingAmount: 1100,
        //   pricePerQuantity: 500,
        //   productID: "6346ac528ec31b1242e7389d",
        //   productName: "tolpcb",
        //   quantity: 2,
        //   status: changeStatus(item.status),
        //   supplyingBranchID: "634ec73211cdb05c439dc606",
        //   supplyingBranchName: "Oluwatobi ",
        //   terminatedBy: 0,
        //   terminatedByName: null,
        //   terminatedTime: 0,
        //   title: "Week",
        //   totalAmount: 1000,
        //   vatAmount: 100,
        // };

        // // eslint-disable-next-line no-param-reassign
        // item.status = changeStatus(item.status);
        // // eslint-disable-next-line no-param-reassign
        // item.clientType = handleOnClientType(item.clientType);

        const newItems = {
          ...item,
          clientType: handleOnClientType(item.clientType),
          status: changeStatus(item.status),
        };
        newwRows.push(newItems);
      });
      setNewRow(newwRows);
    }

    return () => {
      isMounted = false;
    };
  }, [pRows]);

  useEffect(() => {
    console.log(clientx);
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
        console.log(result);
        if (isMounted) {
          if (result.length !== null) {
            setQuantity(result[0].quantity);
            const demandTitle = result[0].title;
            setTitle(demandTitle);
            setproductID(result[0].productID);
            // const demandpricePerQuantity = result[0].pricePerQuantity;
            setpricePQ(result[0].pricePerQuantity);
            // const demandclientTypex = result[0].clientType;
            setClientTypex(result[0].clientType);
            const demandStatus = result[0].supplyingBranchID;
            setSupplyingBran(demandStatus);
            // const demandvatAmount = result[0].vatAmount;
            setVatAmount(result[0].vatAmount);
            // const demandbonusAmount = result[0].bonusAmount;
            setBonusAmount(result[0].bonusAmount);
            // const demandclientID = result[0].clientName;
            setClientIDx(result[0].clientID);

            console.log(result[0].clientType);
            handleChangeClient(result[0].clientType);
          }
          // setIdx(result[0].id);
          //   setTitle(result[0].title);
          //   setQuantity(result[0].quantity);
          //   setPPQuantity(result[0].pricePerQuantity);
          //   setIndividual(result[0].clientType);
          //   setSupplyingBranchName(result[0].supplyingBranchName);
          //   setVatAmount(result[0].vatAmount);
          //   setBonusAmount(result[0].bonusAmount);
          //   setClientNamex(result[0].clientName);
          //   setTotal(result[0].totalAmount);
          // setSupplyingBranchID(result[0].supplyingBranchID);
          // setDeletex(result[0].deleteFlag);
          // setApprovex(result[0].approverID);
          // setAdminx(result[0].adminID);
          // setReasonx(result[0].reasonForDisapproval);
          // setStatusx(result[0].status);
          //   } else {
          //     setIdx(null);
          //   }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  // eslint-disable-next-line consistent-return

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
          console.log(result);
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
          // setValue(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // const trying = (e) => {
  //   // const statusTYpexx = e.target.value;
  //   setStatusType(e.target.value);
  //   const ifstate = e.target.value;
  //   if (ifstate === "1") {
  //     setIndiCorpo(individualx);
  //   } else if (ifstate === "2") {
  //     setIndiCorpo(corporate);
  //   }
  // };

  // if (statusTYpex === 1) {
  // useEffect(() => {
  //   const headers = miHeaders;

  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const orgIDs = data11.orgID;
  //   // const clientID = data11.id;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/gets/${orgIDs}`, {
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
  //         setIndividualx(result);
  //         console.log(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
  // } else {
  // useEffect(() => {
  //   const headers = miHeaders;

  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const orgIDs = data11.orgID;
  //   // const clientID = data11.id;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/corporate/gets/${orgIDs}`, {
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
  //         setCorporate(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
  // }

  useEffect(() => {
    console.log(product);
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    // const clientID = data11.id;
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

  // useEffect(() => {
  //   handleChangeClient();
  // }, []);

  // const ppppp = pRows.map((psquare) => ({
  //   title: psquare.title,
  //   quantity: psquare.quantity,
  //   clientName: psquare.clientName,
  //   clientType: handleChangeClient(psquare.clientType),
  //   supplyingBranchName: psquare.supplyingBranchName,
  //   approvedByName: psquare.approvedByName,
  //   status: psquare.status,
  // }));
  // console.log(ppppp);

  //           variant="gradient"
  //           bgColor="info"
  //           borderRadius="lg"
  //           coloredShadow="info"
  //           mx={2}
  //           mt={-3}
  //           p={2}
  //           mb={1}
  //           textAlign="center"
  //         >
  //           <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
  //             Add Supply
  //           </MDTypography>
  //         </MDBox>
  //         <MDBox
  //           variant="gradient"
  //           bgColor="error"
  //           borderRadius="lg"
  //           coloredShadow="success"
  //           mx={3}
  //           mt={1}
  //           p={1}
  //           mb={1}
  //           textAlign="center"
  //         ></MDBox>
  // <MDBox component="form" role="form">
  //           <Container>
  //             <div className="col-sm-6">
  //               <MDBox mt={2}>
  //                 <MDTypography
  //                   variant="button"
  //                   fontWeight="regular"
  //                   fontSize="80%"
  //                   align="left"
  //                   color="text"
  //                 >
  //                   Select Approver
  //                 </MDTypography>
  //                 <Form.Select
  //                   value={approvex || ""}
  //                   onChange={(e) => setApprover(e.target.value)}
  //                   aria-label="Default select example"
  //                 >
  //                   <option value="">Select Approver</option>
  //                   {/* {user.map((api) => (
  //                     <option key={api.personal.id} value={api.personal.id}>
  //                       {api.personal.fname} {api.personal.lname}
  //                     </option>
  //                   ))} */}
  //                 </Form.Select>
  //                 <br />
  //               </MDBox>
  //             </div>
  //           </Container>
  //           <MDBox mb={0}>
  //             <Container>
  //               <div className="row">
  //                 <div className="col-sm-6">
  //                   <MDInput
  //                     type="text"
  //                     label="Title"
  //                     value={titlex || ""}
  //                     onKeyUp={handleOnTitleKeys}
  //                     onChange={(e) => setTitle(e.target.value)}
  //                     variant="standard"
  //                     fullWidth
  //                   />
  //                 </div>

  //                 <div className="col-sm-6">
  //                   <MDInput
  //                     type="text"
  //                     value={quantityx || ""}
  //                     onKeyUp={handleOnQuantityKeys}
  //                     onChange={(e) => setQuantity(e.target.value)}
  //                     label="Quantity"
  //                     variant="standard"
  //                     fullWidth
  //                   />
  //                 </div>
  //               </div>
  //             </Container>
  //           </MDBox>
  //           &nbsp;
  //           <MDBox>
  //             <Container>
  //               <div className="row">
  //                 <div className="col-sm-6">
  //                   <MDInput
  //                     type="text"
  //                     value={ppQuantityx || ""}
  //                     onKeyUp={handleOnPPQuantityKeys}
  //                     onChange={(e) => setPPQuantity(e.target.value)}
  //                     label="Price Per Quantity"
  //                     variant="standard"
  //                     fullWidth
  //                   />
  //                 </div>

  //                 <div className="col-sm-6">
  //                   <MDInput
  //                     type="text"
  //                     value={ans || ""}
  //                     // onChange={(e) => setTotal(e.target.value)}
  //                     label="Total Amount"
  //                     variant="standard"
  //                     fullWidth
  //                     disabled
  //                   />
  //                 </div>
  //               </div>
  //             </Container>
  //           </MDBox>
  //           &nbsp;
  //           <MDBox>
  //             <Container>
  //               <div className="row">
  //                 <div className="col-sm-6">
  //                   <MDInput
  //                     type="text"
  //                     value={vatAmountx || ""}
  //                     onKeyUp={handleOnVatAmountKeys}
  //                     onChange={(e) => setVatAmount(e.target.value)}
  //                     label="Vat Amount"
  //                     variant="standard"
  //                     fullWidth
  //                   />
  //                 </div>

  //                 <div className="col-sm-6">
  //                   <MDInput
  //                     type="text"
  //                     value={bonusAmountx || ""}
  //                     onKeyUp={handleOnBonusAmountKeys}
  //                     onChange={(e) => setBonusAmount(e.target.value)}
  //                     label="Bonus Amount"
  //                     variant="standard"
  //                     fullWidth
  //                   />
  //                 </div>
  //               </div>
  //             </Container>
  //           </MDBox>
  //           &nbsp;
  //           <MDBox>
  //             <Container>
  //               <div className="row">
  //                 <div className="col-sm-6">
  //                   <MDTypography
  //                     variant="button"
  //                     fontWeight="regular"
  //                     fontSize="80%"
  //                     align="left"
  //                     color="text"
  //                     mt={0}
  //                   >
  //                     Client Type
  //                   </MDTypography>
  //                   <MDBox textAlign="right">
  //                     <Form.Select
  //                       onChange={(e) => handleChangeClient(e.target.value)}
  //                       value={clientTypex || ""}
  //                       aria-label="Default select example"
  //                     >
  //                       <option>---Select Client Type---</option>
  //                       <option value="1">Individual</option>
  //                       <option value="2">Corperate</option>
  //                     </Form.Select>
  //                   </MDBox>
  //                 </div>
  //                 <div className="col-sm-6">
  //                   <MDBox mt={0}>
  //                     <MDTypography
  //                       variant="button"
  //                       fontWeight="regular"
  //                       fontSize="80%"
  //                       align="left"
  //                       color="text"
  //                     >
  //                       Client
  //                     </MDTypography>{" "}
  //                     {showClients ? (
  //                       <Form.Select
  //                         value={clientIDx}
  //                         onChange={(e) => setClientIDx(e.target.value)}
  //                         aria-label="Default select example"
  //                       >
  //                         <option value="">--Select User--</option>
  //                         {clientx.map((api) => (
  //                           <option key={api.id} value={api.id}>
  //                             {api.title} {api.fname} {api.lname}
  //                           </option>
  //                         ))}
  //                       </Form.Select>
  //                     ) : (
  //                       <Form.Select
  //                         value={clientIDx}
  //                         onChange={(e) => setClientIDx(e.target.value)}
  //                         aria-label="Default select example"
  //                       >
  //                         <option value="">--Select User--</option>
  //                         {clientx.map((api) => (
  //                           <option key={api.id} value={api.id}>
  //                             {api.name}
  //                           </option>
  //                         ))}
  //                       </Form.Select>
  //                     )}
  //                     <br />
  //                   </MDBox>
  //                 </div>
  //               </div>
  //             </Container>
  //           </MDBox>
  //           <MDBox>
  //             <Container>
  //               <div className="row">
  //                 <div className="col-sm-6">
  //                   <Container>
  //                     <MDTypography
  //                       variant="button"
  //                       fontWeight="regular"
  //                       fontSize="80%"
  //                       textAlign="center"
  //                       color="text"
  //                     >
  //                       Supplying Branch
  //                     </MDTypography>
  //                     <br />
  //                     <Form.Select
  //                       value={supplyingBranx}
  //                       onChange={(e) => setSupplyingBran(e.target.value)}
  //                       aria-label="Default select example"
  //                     >
  //                       <option value="">Supplying Branch</option>
  //                       {supplybranx.map((api) => (
  //                         <option key={api.id} value={api.id}>
  //                           {api.name}
  //                         </option>
  //                       ))}
  //                     </Form.Select>
  //                   </Container>
  //                 </div>
  //               </div>
  //             </Container>
  //           </MDBox>
  //           <MDBox mt={4} mb={1}>
  //             <MDButton
  //               variant="gradient"
  //               onClick={handleClick}
  //               color="info"
  //               width="50%"
  //               align="left"
  //             >
  //               Save
  //             </MDButton>
  //           </MDBox>
  //         </MDBox>
  // const saveASExcelFile = (excelBuffer, fileName) => {
  //   console.log("third");
  //   import("file-saver").then((FileSaver) => {
  //     const EXCEL_TYPE =
  //       "application/vnd.openXmlformats-officedocument.spreadsheetml.sheet;chartset=UTF-8";
  //     const EXCEL_EXTENSION = ".xlsx";
  //     const data = new Blob([Buffer], {
  //       type: EXCEL_TYPE,
  //     });
  //     FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`);
  //   });
  // };
  // const exportExcel = () => {
  //   console.log("first");
  //   import("xlsx").then((xlsx) => {
  //     const worksheet = xlsx.utils.table_to_sheet(DataTable, {
  //       raw: true,
  //       cellDates: true,
  //       dateNF: "yyyy-mm-dd",
  //       sheetRows: 1,
  //     });
  //     console.log(worksheet);
  //     const workBook = { sheets: { data: worksheet }, sheetNames: ["data"] };
  //     console.log("first");
  //     const excelBuffer = xlsx.write(workBook, {
  //       bodyType: "xlsx",
  //       type: "array",
  //     });
  //     console.log("second");
  //     saveASExcelFile(excelBuffer, "data");
  //   });
  // };

  // eslint-disable-next-line consistent-return
  // const handleOnClientType = (clientType) => {
  //   console.log(clientType);
  //   if (clientType === 1) {
  //     return "Individual";
  //   }
  //   if (clientType === 2) {
  //     return "Corporate";
  //   }
  // };

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
      Header: "Client Name",
      accessor: "clientName",
      align: "left",
    },
    {
      Header: "Client Type",
      accessor: "clientType",
      Cell: ({ cell: { value } }) => handleOnClientType(value),
      align: "left",
    },
    {
      Header: "Supplying Branch Name",
      accessor: "supplyingBranchName",
      align: "left",
    },
    {
      Header: "Approve By",
      accessor: "approvedByName",
      align: "left",
    },
    {
      Header: "Status",
      accessor: "status",
      align: "left",
    },
  ];

  const newCloums = exportColumns.map((Col) => ({
    title: Col.Header,
    dataKey: Col.accessor,
  }));
  console.log(newCloums);
  // {

  // }
  console.log(exportColumns);

  console.log(newRows);
  const exportPDF = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        // eslint-disable-next-line new-cap
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(newCloums, newRows);
        doc.save("supplytable.pdf");
      });
    });
  };
  console.log(clientx);

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
              Add Supply
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
            <MDTypography variant="gradient" fontSize="60%" color="white" id="totalamount">
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
            {/* <MDBox>
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
                          {/* Idividual
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
            </MDBox> */}
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
                      // onKeyUp={handleOnBonusAmountKeys}
                      onChange={(e) => setBonusAmount(e.target.value)}
                      label="Bonus Amount(NGN)"
                      variant="standard"
                      fullWidth
                    />
                  </div>

                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={pricePQ || ""}
                      // onKeyUp={handleOnPPQuantityKeys}
                      onChange={(e) => setpricePQ(e.target.value)}
                      label="Price Per Quantity(NGN) *"
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
                      // onChange={(e) => setTotal(e.target.value)}
                      label="Total Amount"
                      variant="standard"
                      fullWidth
                      disabled
                    />
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={vatAmountx || ""}
                      // onKeyUp={handleOnVatAmountKeys}
                      // onChange={(e) => setVatAmount(e.target.value)}
                      label="Vat Amount(NGN)"
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
        {/* <MDButton variant="gradient" onClick={exportExcel} color="info" width="50%" align="center">
          Export excel
        </MDButton> */}
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

export default ConvertDemandToSupply;
