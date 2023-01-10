/* eslint-disable no-eval */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Styles from "styles";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { IconButton } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Add from "@mui/icons-material/Add";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { useReactToPrint } from "react-to-print";
import { MonnifyConsumer } from "react-monnify";
import PhoneInput from "react-phone-input-2";
// import houseOfTara from "./HouseOfTara.jpg";
// import "./Force.css";
// zinoleesky wrote this part of d code called sales
// incase another Printing {https://stackblitz.com/edit/react-print-receipt?file=index.js}

function Sales() {
  const MySwal = withReactContent(Swal);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [individualx, setIndividual] = useState([]);
  const [indix, setIndi] = useState("");
  const [namex, setName] = useState("");
  const [lnamex, setLnamex] = useState("");
  const [titlex, setTitle] = useState("");

  const [checkedName, setCheckedName] = useState("");
  const [user, setUser] = useState([]);
  const [commentx, setComment] = useState("");

  const [emailx, setEmail] = useState("");
  const currencyx = "NGN";
  const [pnox, setPno] = useState("");
  const [indiName, setIndiName] = useState("");
  const [referenceSKey, setReferenceSKey] = useState();
  const [listenn, setListenn] = useState(false);

  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [productx, setProduct] = useState([]);
  const [productBranx, setProductBran] = useState([]);
  const [bonusAmountxx, setBonusAmount] = useState("");
  const [subTotalAmountx, setSubTotalAmount] = useState([]);
  const [allTax, setAllTax] = useState("");
  const [cashPaymentx, setCashPayment] = useState("");
  const [cardPaymentx, setCardPayment] = useState("");
  const [transferPaymentx, setTransferPayment] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const [cashierx, setCashier] = useState([]);
  const [checkedEmail, setCheckedEmail] = useState("");
  const [checkedPortfolio, setCheckedPortfolio] = useState("");
  const [servicex, setService] = useState([]);
  const [showClients, setShowClients] = useState(false);
  const onBeforeGetContentResolve = useRef();
  <style type="text/css" media="print">
    {"\
  @page{ size: portrait; } \
  "}
  </style>;

  const [counter, setCounter] = useState([
    {
      saleType: Number(""),
      salesID: "",
      branchID: "",
      pricePerUnit: Number(""),
      quantity: Number(""),
      amount: Number(""),
      taxAmount: Number(""),
      totalAmount: Number(""),
    },
  ]);
  console.log(user);

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/gets/${orgIDs}`, { headers })
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
          setIndividual(result);
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
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
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
          setUser(result);
          setOpened(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#ffffff",
    border: "3px solid #5F9DF7",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    height: "55%",
    display: "flex",
    "&::-webkit-scrollbar": {
      width: 40,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "white",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#f5f5f5",
      borderRadius: 10,
    },
  };

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/branch/gets/${orgIDs}`, { headers })
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
          setProductBran(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const TOTAL = eval(subTotalAmountx + allTax - bonusAmountxx);

  const handleOnNameKeys = () => {
    const letters = /^[a-zA-Z ]+$/;
    if (!namex.match(letters)) {
      setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name - input only capital and small letters<br>";
    }
    if (namex.match(letters)) {
      setCheckedName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "";
    }
    if (namex.length === 0) {
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("name").innerHTML = "Name is required<br>";
    }
    // setEnabled(checkedName === true);
  };
  const handleOnEmailKeys = (value) => {
    const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
    const nylon = value.target.value.toString();
    if (!nylon.match(letters)) {
      setCheckedEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email - input a valid email<br>";
    }
    if (nylon.match(letters)) {
      setCheckedEmail(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "";
    }
    if (nylon.length === 0) {
      setCheckedEmail(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("email").innerHTML = "Email is required<br>";
    }
  };
  const openModal = () => {
    setOpen(true);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleIndividual = (e) => {
    if (pnox !== "") {
      setOpened(true);
      e.preventDefault();
      // handleClose();

      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      const personalIDs = data11.personalID;
      const raw = JSON.stringify([
        {
          orgID: orgIDs,
          fname: namex,
          lname: lnamex,
          title: titlex,
          createdBy: personalIDs,
          accountOwnerID: personalIDs,
        },
      ]);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/add`, requestOptions)
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
          setOpened(false);
          handleClose();
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
    } else {
      alert("Please fill the required input(s)");
    }
  };

  // eslint-disable-next-line consistent-return
  const handleChangeProdServ = (value) => {
    const chnageToString = value.toString();
    if (chnageToString === "1") {
      setShowClients(true);
    } else if (chnageToString === "2") {
      setShowClients(false);
    }
    if (chnageToString === "1") {
      setOpened(true);
      const headers = miHeaders;
      let isMounted = true;
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;

      fetch(`${process.env.REACT_APP_LOUGA_URL}/products/gets/${orgIDs}`, { headers })
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
          console.log(result);
          if (isMounted) {
            setProduct(result);
          }
        });
      return () => {
        isMounted = false;
      };
    }
    if (chnageToString === "2") {
      const headers = miHeaders;
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      fetch(`${process.env.REACT_APP_LOUGA_URL}/companyServices/gets/${orgIDs}`, { headers })
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
          console.log(result);
          setService(result);
        });
    }
    if (chnageToString === "3") {
      setProduct([]);
      setService([]);
    }
  };

  const handleFormChange = (event, index) => {
    console.log(event.target.value, "event");
    console.log(index, "index");
    const data = [...counter];
    data[index][event.target.name] = event.target.value;
    if (event.target.name === "pricePerUnit") {
      data[index].amount = parseInt(data[index].quantity, 10) * parseInt(event.target.value, 10);
      data[index].totalAmount =
        parseInt(data[index].quantity, 10) * parseInt(event.target.value, 10) +
        parseInt(data[index].taxAmount, 10);
      // parseInt(event.target.value, 10)
      const zoom = counter.map((item) => item.pricePerUnit * item.quantity);
      setSubTotalAmount(eval(zoom.join("+")));
      // eslint-disable-next-line no-eval
    } else if (event.target.name === "quantity") {
      data[index].amount =
        parseInt(data[index].pricePerUnit, 10) * parseInt(event.target.value, 10);
      data[index].totalAmount =
        parseInt(data[index].pricePerUnit, 10) * parseInt(event.target.value, 10) +
        parseInt(data[index].taxAmount, 10);
      const zoom = counter.map((item) => item.pricePerUnit * item.quantity);
      setSubTotalAmount(eval(zoom.join("+")));
      // eslint-disable-next-line no-eval
    } else if (event.target.name === "product") {
      data[index][event.target.name] = event.target.value;
    } else if (event.target.name === "taxAmount") {
      data[index].totalAmount = parseInt(data[index].amount, 10) + parseInt(event.target.value, 10);
      const zoom = counter.map((item) => item.taxAmount);
      setAllTax(eval(zoom.join("+")));
    } else if (event.target.name === "quantity") {
      data[index].totalAmount =
        parseInt(data[index].pricePerUnit, 10) * parseInt(event.target.value, 10);
    } else if (event.target.name === "salesID") {
      handleChangeProdServ(event.target.value);
      console.log("testing");
    }
    setCounter(data);
  };

  const addFields = () => {
    const object = {
      saleType: Number(""),
      salesID: "",
      branchID: "",
      pricePerUnit: Number(""),
      quantity: Number(""),
      amount: Number(""),
      taxAmount: Number(""),
      totalAmount: Number(""),
      product: Number(""),
    };
    setCounter([...counter, object]);
  };
  const removeFields = (index) => {
    const data = [...counter];
    data.splice(index, 1);
    setCounter(data);
  };

  // useEffect(() => {
  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/products/gets/${orgIDs}`, { headers })
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
  //         setProduct(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
  const Payment = eval(
    Number(cashPaymentx) + Number(cardPaymentx) + Number(transferPaymentx) - Number(subTotalAmountx)
  );
  const Pay = () => {
    setShowPayment(true);
  };
  const handleOnBeforeGetContent = () =>
    new Promise((resolve) => {
      // `react-to-print` will wait for this Promise to resolve before continuing
      // Load data
      onBeforeGetContentResolve.current = resolve;
      setShowPrint(true); // When data is done loading
    });
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: handleOnBeforeGetContent,
    onAfterPrint: () => window.location.reload(),
  });
  useEffect(() => {
    const id = setImmediate(() => {
      if (showPrint) {
        // Resolves the Promise, telling `react-to-print` it is time to gather the content of the page for printing
        onBeforeGetContentResolve.current();
      }
    });
    return () => {
      clearTimeout(id);
    };
  }, [showPrint, onBeforeGetContentResolve]);

  console.log(handlePrint);

  const handleClick = (e) => {
    if (Payment === 0) {
      setOpened(true);
      e.preventDefault();
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const idx = data11.personalID;
      const raw = JSON.stringify({
        orgID: orgIDs,
        individualID: indix,
        items: counter,
        bonusAmount: bonusAmountxx,
        subTotalAmount: subTotalAmountx,
        totalAmount: TOTAL,
        createdBy: idx,
        comment: commentx,
        receiptStatus: 1,
        cardPaymentAmount: cardPaymentx,
        transferPaymentAmount: transferPaymentx,
        cashPaymentAmount: cashPaymentx,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_LOUGA_URL}/sales/add`, requestOptions)
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
          // if (result.status === "SUCCESS") {
          //   // handlePrint();
          // }
          if (result.status === "SUCCESS") {
            handlePrint();
            const allResult = result.data;
            const raw2 = JSON.stringify({
              orgID: orgIDs,
              type: "SALES",
              requestID: allResult.id,
              balance: allResult.subTotalAmount,
              createdBy: allResult.createdBy,
              clientID: allResult.individualID,
              originalAmount: allResult.subTotalAmount,
            });
            const requestOptions2 = {
              method: "POST",
              headers: myHeaders,
              body: raw2,
              redirect: "follow",
            };
            fetch(`${process.env.REACT_APP_LOUGA_URL}/creditFacility/add`, requestOptions2)
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                const resultx = await res.text();
                if (resultx === null || resultx === undefined || resultx === "") {
                  return {};
                }
                return JSON.parse(resultx);
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
                console.log(resultx);
                setOpened(false);
                MySwal.fire({
                  title: resultx.status,
                  type: "success",
                  text: resultx.message,
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
          console.log(result);
          setOpened(false);
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
  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const empID = data11.personalID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getUserInfo/${orgIDs}/${empID}`, { headers })
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
          setCashier(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setReferenceSKey(`${Math.floor(Math.random() * 1000000000 + 1)}`);
    }

    return () => {
      isMounted = false;
    };
  }, [listenn]);

  const honClose = (response) => {
    setListenn(!listenn);
    setReferenceSKey(`${Math.floor(Math.random() * 1000000000 + 1)}`);

    if (response.message === "Transaction Successful" && response.status === "SUCCESS") {
      // call api after success from monnify
    }
  };

  const monNey = {
    onClose: honClose,
    amount: cardPaymentx,
    currency: currencyx,
    reference: referenceSKey,
    customerFullName: indiName,
    customerEmail: emailx,
    customerMobileNumber: pnox,
    apiKey: `${process.env.REACT_APP_PERSONAL_API_KEY}`,
    contractCode: `${process.env.REACT_APP_PERSONAL_CONTRACT_KEY}`,
    paymentDescription: commentx,
    isTestMode: true,
  };

  const handleOnPortfolioKeys = () => {
    if (commentx.length === 0) {
      setCheckedPortfolio(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("portfolio").innerHTML = "A text is required<br>";
    } else {
      setCheckedPortfolio(true);
    }
  };

  const handleValidate = (e) => {
    if (checkedName && checkedEmail === true) {
      handleIndividual(e);
    }
  };
  const handleValidate2 = (e) => {
    if (checkedPortfolio === true) {
      handleClick(e);
    }
  };

  // useEffect(() => {
  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/companyServices/gets/${orgIDs}`, { headers })
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
  //       console.log(result);
  //       if (isMounted) {
  //         set(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div ref={componentRef}>
        {showPrint ? (
          <>
            <div align="center">
              <h6>Reprinted</h6>
              <h2>House Of Tara</h2>
              <h3>
                <b>HOUSE OF TARA INTL LIMITED LEKKI</b>
              </h3>
              <p>13A Road 12, Onikepe Akande Street</p>
              <p>Off Admiralty Road, Lekki Phase 1, Lagos</p>
            </div>
            <div style={{ paddingLeft: "160px" }}>
              <p>
                Cashier: {cashierx.personal.fname} {cashierx.personal.lname}
              </p>
            </div>
            <div align="center">
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Ext Price</th>
                  </tr>
                </thead>
                <tbody>
                  {counter.map((row, index) => (
                    <>
                      <tr>
                        {/* {} */}
                        <td>{counter[index].product}</td>
                        <td>{counter[index].quantity}</td>
                        <td>{counter[index].pricePerUnit}</td>
                        <td>
                          {parseInt(counter[index].pricePerUnit, 10) *
                            parseInt(counter[index].quantity, 10)}
                        </td>
                      </tr>
                      <tr>
                        {/* <td />
                        <td />
                        {/* <td>Subtotal</td> 
                        {/* <td>N23,200.00</td>
                      </tr>
                      <tr>
                        Local Sales Tax
                        <td />
                        <td>0% Tax:</td>
                        <td>+N0.00</td> */}
                      </tr>
                    </>
                  ))}
                  <tr>
                    <td />
                    <td />
                    <td>Subtotal</td>
                    <td>N{subTotalAmountx}</td>
                  </tr>
                  <tr>
                    Local Sales Tax
                    <td />
                    <td>{allTax}% Tax:</td>
                    <td>+N{allTax}.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <br /> */}
            <div style={{ paddingLeft: "350px" }}>
              <b>Receipt Total: {subTotalAmountx} </b>
            </div>
            <p align="center">Charges Inclusive of 7.5% VAT</p>
            <p align="center">
              {" "}
              Thank you for shopping with us, Products purchased in good condition are not
              returnable
            </p>
            <h4 align="center">Have a great day |||</h4>
          </>
        ) : (
          ""
        )}
      </div>
      <Card>
        <MDBox style={{ paddingLeft: "450px" }}>
          <Container>
            <div className="row" style={{ paddingLeft: "450px" }}>
              <div className="col-sm-12">
                <MDTypography
                  variant="button"
                  //   style={{ paddingLeft: "300px" }}
                  fontWeight="regular"
                  color="text"
                  mt={8}
                >
                  Individual
                </MDTypography>
                <MDBox>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => openModal()}
                  >
                    <PersonAddIcon sx={{ color: "#f96d02" }} />
                  </IconButton>
                </MDBox>
                <MDBox>
                  <Form.Select
                    value={indix || ""}
                    aria-label="Default select example"
                    onChange={(e) => {
                      setIndi(e.target.value);
                      const { value } = e.target;
                      const fData = individualx.filter((indii) => indii.id === value);
                      setIndiName(`${fData[0].fname} ${fData[0].lname}`);
                      if (fData[0].email) {
                        setEmail(`${fData[0].email}`);
                      } else {
                        setEmail("");
                      }
                      if (fData[0].pno) {
                        setPno(`${fData[0].pno}`);
                      } else {
                        setPno("");
                      }
                    }}
                  >
                    <option>--Select Individual--</option>
                    {individualx.map((apis) => (
                      <option key={apis.id} value={apis.id}>
                        {apis.fname} {apis.lname}
                      </option>
                    ))}
                  </Form.Select>
                </MDBox>
              </div>
            </div>
          </Container>
        </MDBox>
        <br />
        &nbsp; &nbsp;
        <MDBox>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={addFields}
          >
            <Add sx={{ color: "#f96d02" }} />
          </IconButton>
        </MDBox>
        <Card style={{ backgroundColor: "#CCC1FF" }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Item>
                <b>saleType</b>
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>
                <b>Product</b>
              </Item>
            </Grid>
            <Grid item xs={2}>
              <Item>
                <b>Branch</b>
              </Item>
            </Grid>
            <Grid item xs={2}>
              <Item>
                <b>Price Per Unit (NGN)</b>
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>
                <h6>
                  <b>Quantity</b>
                </h6>
              </Item>
            </Grid>
            <Grid item xs={2}>
              <Item>
                <b>Amount (NGN)</b>
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>
                <b>Tax Amount</b>
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>
                <b>Total Amount (NGN)</b>
              </Item>
            </Grid>
          </Grid>
        </Card>
        &nbsp;
        <Grid>
          <div className="row">
            {counter.map((form, index) => {
              const amountxx = parseInt(form.pricePerUnit, 10) * parseInt(form.quantity, 10);
              const branchx = form.branchID;
              const totalAmountxx = parseInt(form.amount, 10) + parseInt(form.taxAmount, 10);
              const taxAmoun = parseInt(form.taxAmount, 10);
              return (
                <>
                  <div className="col-sm-2">
                    {/* <MDInput
      type="text"
      value={namex || ""}
      onChange={(e) => setName(e.target.value)}
      // onKeyUp={handleOnNameKeys}
      label="First Name"
      variant="standard"
      fullWidth
    /> */}
                    {/* <TextField
      id="outlined-error-helper-text"
      label="Error"
      // defaultValue="Hello World"
      // helperText="Incorrect entry."
    /> */}
                    <MDBox>
                      <Form.Select
                        value={form.salesID}
                        aria-label="Default select example"
                        name="salesID"
                        onChange={(event) => handleFormChange(event, index)}
                      >
                        <option value="">Sales Type</option>
                        <option value="1">Product</option>
                        <option value="2">Company Service</option>
                        <option value="3">Custom Sales</option>
                      </Form.Select>
                    </MDBox>

                    {/* <input onChange={(e) => setName(e.target.value)} value={namex || ""} type="text" /> */}
                  </div>
                  <div className="col-sm-1">
                    {showClients ? (
                      <MDBox>
                        <Form.Select
                          value={form.product}
                          aria-label="Default select example"
                          name="product"
                          onChange={(event) => handleFormChange(event, index)}
                        >
                          <option>Product</option>
                          {productx.map((apis) => (
                            <option key={apis.id} value={apis.name}>
                              {apis.name}
                            </option>
                          ))}
                        </Form.Select>
                      </MDBox>
                    ) : (
                      <MDBox>
                        <Form.Select
                          value={form.product}
                          aria-label="Default select example"
                          name="product"
                          onChange={(event) => handleFormChange(event, index)}
                        >
                          <option>Company Services</option>
                          {servicex.map((apis) => (
                            <option key={apis.id} value={apis.name}>
                              {apis.name}
                            </option>
                          ))}
                        </Form.Select>
                      </MDBox>
                    )}
                  </div>
                  <div className="col-sm-2">
                    <MDBox>
                      <Form.Select
                        value={branchx}
                        aria-label="Default select example"
                        name="branchID"
                        onChange={(event) => handleFormChange(event, index)}
                      >
                        <option>Branch</option>
                        {productBranx.map((apis) => (
                          <option key={apis.id} value={apis.id}>
                            {apis.name}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </div>
                  <div className="col-sm-2">
                    {/* <TextField
      id="outlined-error-helper-text"
      label="First Name"
      // defaultValue="Hello World"
      // helperText="Incorrect entry."
    /> */}
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={form.pricePerUnit}
                          label="Price Per Unit"
                          placeholder="Pice Per Unit "
                          size="small"
                          name="pricePerUnit"
                          // key={c}
                          // className={index}
                          type="number"
                          onChange={(event) => handleFormChange(event, index)}
                          // onChange={(e) => setPPQuantity(e.target.value)}
                          // onKeyUp={(e) => handleTaxAmount(e.target.value)}
                          required
                        />
                      </FormControl>
                    </Box>
                  </div>
                  <div className="col-sm-1">
                    <Box sx={{ minWidth: 100 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={form.quantity}
                          label="Quantity "
                          placeholder="Quantity "
                          name="quantity"
                          // key={c}
                          // className={index}
                          type="number"
                          size="small"
                          onChange={(event) => handleFormChange(event, index)}
                          // onChange={(e) => setQuantity(e.target.value)}
                          // onKeyUp={(e) => handleTaxAmount(e.target.value)}
                          required
                        />
                      </FormControl>
                    </Box>
                  </div>
                  <div className="col-sm-2">
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={amountxx}
                          label="Amount "
                          placeholder="Amount "
                          name="Amount"
                          // key={c}
                          // className={index}
                          size="small"
                          type="number"
                          // onChange={handleOnSelect2}
                          // onChange={(e) => handleOnlastChange(e)}
                          // onKeyUp={(e) => setAmount(e.target.value)}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </FormControl>
                    </Box>
                  </div>
                  <div className="col-sm-1">
                    {/* <Box sx={{ minWidth: 100 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={taxAmoun}
                          label="Tax Amount (NGN) "
                          placeholder="Tax Amount "
                          type="number"
                          name="taxAmount"
                          size="small"
                          onChange={(event) => handleFormChange(event, index)}
                          // onKeyUp={(e) => handleTaxAmount(e.target.value)}
                          required
                        />
                      </FormControl>
                    </Box> */}
                    <Box sx={{ minWidth: 100 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={taxAmoun}
                          label="Tax Amount (NGN) "
                          placeholder="Tax Amount "
                          size="small"
                          name="taxAmount"
                          // key={c}
                          // className={index}
                          type="number"
                          onChange={(event) => handleFormChange(event, index)}
                          // onChange={(e) => setPPQuantity(e.target.value)}
                          // onKeyUp={(e) => handleTaxAmount(e.target.value)}
                          required
                        />
                      </FormControl>
                    </Box>
                  </div>
                  <div className="col-sm-1">
                    <Box sx={{ minWidth: 100 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={totalAmountxx}
                          label="Total Amount "
                          placeholder="Total Amount "
                          type="number"
                          size="small"
                          name="totalAmount"
                          // onChange={(event) => handleFormChange(event, index)}
                          // onKeyUp={(e) => handleTaxAmount(e.target.value)}
                          // required
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </FormControl>
                    </Box>
                  </div>
                  <MDBox>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={() => removeFields(index)}
                    >
                      <CancelPresentationIcon sx={{ color: "#f96d02" }} />
                    </IconButton>
                  </MDBox>
                  <br />
                </>
              );
            })}
          </div>
          &nbsp; &nbsp;
        </Grid>
        <MDBox>
          <Container>
            <div className="row">
              <div className="col-sm-3">
                <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
                  <FormControl fullWidth>
                    <TextField
                      id="filled-number"
                      value={bonusAmountxx}
                      label="Bonus Amount "
                      placeholder="Bonus Amount "
                      type="number"
                      onChange={(e) => setBonusAmount(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </div>
              <div className="col-sm-3" />
              <div className="col-sm-3">
                <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
                  <FormControl fullWidth>
                    <TextField
                      id="filled-number"
                      value={subTotalAmountx}
                      label="Total Amount "
                      placeholder="Total Amount "
                      type="number"
                      name="totalAmount"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                </Box>
              </div>
            </div>
          </Container>
        </MDBox>
        <br />
        &nbsp; &nbsp;
        <MDBox style={{ paddingLeft: "30px" }}>
          <Container>
            <div className="row">
              <div className="col-sm-12">
                <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                  <Form.Label style={{ fontSize: 14 }}>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={commentx || ""}
                    onKeyUp={handleOnPortfolioKeys}
                    onChange={(e) => setComment(e.target.value)}
                    rows={2}
                  />
                </Form.Group>
              </div>
            </div>
          </Container>
        </MDBox>
        <br />
        &nbsp; &nbsp;
        <MDBox>
          {showPayment ? (
            <Container>
              <div className="row">
                <div className="col-sm-3">
                  <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
                    <FormControl fullWidth>
                      <MDTypography
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        style={Styles.textSx}
                      >
                        {/* Cash Payment: */}
                      </MDTypography>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="filled-number"> Cash Payment (NGN): </label>
                      <TextField
                        id="filled-number"
                        value={cashPaymentx}
                        label="Amount"
                        placeholder="Amount"
                        type="number"
                        onChange={(e) => setCashPayment(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
                    <FormControl fullWidth>
                      <MDTypography
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        style={Styles.textSx}
                      >
                        {/* Transfer Payment: */}
                      </MDTypography>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="filled-number"> Transfer Payment (NGN): </label>
                      <TextField
                        id="filled-number"
                        value={transferPaymentx}
                        label="Amount"
                        placeholder="Amount"
                        type="number"
                        onChange={(e) => setTransferPayment(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <Box sx={{ minWidth: 100 }} style={{ paddingTop: "40px" }}>
                    <MDTypography
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      style={Styles.textSx}
                    >
                      {/* Card Payment: */}
                    </MDTypography>
                    <FormControl fullWidth>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="filled-number"> Card Payment (NGN): </label>
                      <TextField
                        id="filled-number"
                        value={cardPaymentx}
                        label="Amount"
                        placeholder="Amount"
                        type="number"
                        onChange={(e) => setCardPayment(e.target.value)}
                      />
                      <div>
                        <MonnifyConsumer {...monNey} className="btn">
                          {({ initializePayment }) => (
                            // eslint-disable-next-line react/button-has-type
                            <MDButton
                              variant="gradient"
                              onClick={() => initializePayment()}
                              color="info"
                              width="50%"
                            >
                              Pay using card
                            </MDButton>
                          )}
                        </MonnifyConsumer>
                      </div>
                    </FormControl>
                    {/* <MDBox mt={4} mb={1}>
                      <div>
                        <MonnifyConsumer {...monNey} className="btn">
                          {({ initializePayment }) => (
                            // eslint-disable-next-line react/button-has-type
                            <MDButton
                              variant="gradient"
                              onClick={() => initializePayment()}
                              color="info"
                              width="50%"
                            >
                              Pay
                            </MDButton>
                          )}
                        </MonnifyConsumer>
                      </div>
                    </MDBox> */}
                  </Box>
                </div>
              </div>
            </Container>
          ) : (
            <></>
          )}

          <MDBox style={{ paddingTop: "40px", paddingLeft: "400px" }}>
            <Container>
              <div className="row">
                <div className="col-sm-3">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <TextField
                        id="filled-number"
                        value={Payment}
                        label="Balance (NGN)"
                        placeholder="Balance (NGN)"
                        type="number"
                        name="balance"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </FormControl>
                  </Box>
                </div>
              </div>
            </Container>
          </MDBox>
        </MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton
            variant="gradient"
            onClick={Pay}
            style={Styles.buttonSx}
            width="50%"
            align="left"
          >
            Pay
          </MDButton>
        </MDBox>
        <MDBox mt={4} mb={1} align="center">
          <MDButton
            variant="gradient"
            onClick={handleValidate2}
            style={Styles.buttonSx}
            width="50%"
            align="left"
          >
            Print
          </MDButton>
        </MDBox>
      </Card>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Grid>
              <Grid item xs={6} md={6}>
                {" "}
                <HighlightOffIcon
                  onClick={handleClose}
                  fontSize="large"
                  style={{
                    padding: "5px",
                    color: "red",
                    float: "right",
                    cursor: "pointer",
                  }}
                />
                <MDBox>
                  <MDBox component="form" role="form">
                    <MDBox
                      variant="gradient"
                      borderRadius="lg"
                      coloredShadow="success"
                      mx={0}
                      mt={0}
                      p={3}
                      mb={1}
                      textAlign="center"
                      style={Styles.boxSx}
                    >
                      <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                        Add New Individual
                      </MDTypography>
                    </MDBox>
                    <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
                        {" "}
                      </MDTypography>
                      <MDTypography variant="gradient" fontSize="60%" color="error" id="email">
                        {" "}
                      </MDTypography>
                      <MDBox mb={0}>
                        <Container>
                          <div className="row">
                            <div className="col-sm-6">
                              <MDInput
                                type="text"
                                value={namex || ""}
                                onChange={(e) => setName(e.target.value)}
                                onKeyUp={handleOnNameKeys}
                                label="First Name"
                                variant="standard"
                                fullWidth
                              />
                            </div>
                            <div className="col-sm-6">
                              <MDInput
                                type="text"
                                value={lnamex || ""}
                                onChange={(e) => setLnamex(e.target.value)}
                                label="Last Name"
                                variant="standard"
                                fullWidth
                              />
                            </div>
                          </div>
                          &nbsp; &nbsp;
                          <div className="row">
                            <div className="col-sm-10">
                              <MDTypography
                                variant="button"
                                fontWeight="regular"
                                fontSize="80%"
                                textAlign="center"
                                color="text"
                              >
                                Title
                              </MDTypography>
                              <Form.Select
                                value={titlex}
                                onChange={(e) => setTitle(e.target.value)}
                                aria-label="Default select example"
                              >
                                <option value="">--Select Title--</option>
                                <option value="Bishop">Bishop</option>
                                <option value="Chancellor">Chancellor</option>
                                <option value="Comrade">Comrade</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Engineer">Engineer</option>
                                <option value="Excellency">Excellency</option>
                                <option value="Honorable">Honorable</option>
                                <option value="Imam">Imam</option>
                                <option value="Master">Master</option>
                                <option value="Miss">Miss</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Reverend">Reverend</option>
                                <option value="Pastor">Pastor</option>
                                <option value="Professor">Professor</option>
                                <option value="Pope">Pope</option>
                                <option value="Vice-Chancellor">Vice-Chancellor</option>
                                <option value="Other">Others...</option>
                              </Form.Select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <MDInput
                                type="text"
                                value={emailx || ""}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyUp={handleOnEmailKeys}
                                label="Email"
                                variant="standard"
                                fullWidth
                              />
                            </div>

                            <div className="col-sm-6">
                              <MDTypography variant="button" fontWeight="regular" color="text">
                                Phone Number
                              </MDTypography>
                              <PhoneInput
                                value={pnox}
                                inputStyle={{ width: "100%" }}
                                buttonStyle={{}}
                                onChange={setPno}
                              />
                            </div>
                          </div>
                        </Container>
                      </MDBox>
                    </MDBox>
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        onClick={handleValidate}
                        style={Styles.buttonSx}
                        width="50%"
                        align="left"
                      >
                        Save
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
      <br />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}
export default Sales;
