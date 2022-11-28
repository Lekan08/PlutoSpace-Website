/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState } from "react";
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
// import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { styled } from "@mui/material/styles";
// import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { IconButton } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Add from "@mui/icons-material/Add";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
// import { style } from "@mui/system";
// import { NoBackpackSharp } from "@mui/icons-material";
// zinoleesky wrote this part of d code called sales

function Sales() {
  const MySwal = withReactContent(Swal);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  //   const [branId, setBranId] = useState([]);
  //   const [branx, setBranx] = useState("");
  //   const [quantityx, setQuantity] = useState("");
  //   const [ppQuantity, setPPQuantity] = useState("");
  //   const [amountx, setAmount] = useState(0);
  //   const [taskAmountx, setTaskAmount] = useState(0);

  const [individualx, setIndividual] = useState([]);
  const [indix, setIndi] = useState("");
  //   const [craze, setCraze] = useState(false);
  const [namex, setName] = useState("");
  const [lnamex, setLnamex] = useState("");
  const [titlex, setTitle] = useState("");

  const [checkedName, setCheckedName] = useState("");
  const [enabled, setEnabled] = useState("");
  //   const [emailx, setEmail] = useState("");
  // const [pnox, setPno] = useState("");
  // const [maritalx, setMaritalx] = useState("");
  //   const [duty, setDutyRelieverx] = useState("");
  const [user, setUser] = useState([]);
  const [commentx, setComment] = useState("");

  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [salesTypex, setSalesType] = useState("");
  const [pPQuantityx, setPPQuantity] = useState("");
  const [quantityx, setQuantity] = useState("");
  const [amountx, setAmount] = useState("");
  const [taxAmountx, setTaxAmount] = useState("");
  const [amountNotChange, setAmountNotChange] = useState("");
  const [amountNotChange2, setAmountNotChange2] = useState("");

  const [counter, setCounter] = useState([
    { salesType: "", pPQuantity: "", quantity: "", amount: "", taxAmountx: "", bonusAmount: "" },
  ]);
  const [counter2, setCounter2] = useState([]);
  const [view, setView] = useState([]);
  // const [ppp, setppp] = useState(0);
  console.log(user);
  console.log(enabled);
  console.log(Number(amountNotChange));
  console.log(amountNotChange2);
  console.log(setAmountNotChange2);
  console.log(view);
  // console.log(ppp);
  // eslint-disable-next-line no-lone-blocks
  // {
  //   view.map(
  //     (apis) =>
  //       // <option key={apis.code} value={apis.name}>
  //       apis.amountx
  //     // console.log(apis.amountx);
  //     // </option>
  //   );
  // }
  console.log(view.map((apis) => apis.amountx));

  //   useEffect(() => {
  //     const data11 = JSON.parse(localStorage.getItem("user1"));

  //     const orgIDs = data11.orgID;
  //     const headers = miHeaders;
  //     let isMounted = true;
  //     fetch(`${process.env.REACT_APP_KUBU_URL}/branch/gets/${orgIDs}`, { headers })
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
  //           setBranId(result);
  //         }
  //       });
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);

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
          console.log(result);
          setIndividual(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnlastChange = (e) => {
    //   // amountNotChange;
    const abc = e;
    console.log(abc);
    // abc[e.target.className] = e.target.value;
    // setAmount({ ...amountx, abc });
    setAmount(abc);
    console.log(e);
    console.log({ amountx, abc });
  };

  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    // setOpened(true);
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
        if (amountNotChange2 !== "") {
          handleOnlastChange(amountNotChange2);
          // setAmount(amountNotChange2);
          console.log(amountNotChange2);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
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
  //       console.log(result);
  //       if (isMounted) {
  //         const newMap = [];

  //         // eslint-disable-next-line array-callback-return
  //         result.map((item) => {
  //           const NewMapp = {
  //             value: item.personal.id,
  //             label: `${item.personal.fname}`,
  //           };
  //           newMap.push(NewMapp);
  //         });
  //         setUser(newMap);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

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
    height: "35%",
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

  console.log(salesTypex);

  const handleNewInput = () => {
    setCounter(counter + 1);
    setCounter2(counter);
    console.log(counter);
    const item = {
      saleType: [salesTypex],
      branchID: "",
      pricePerUnit: "",
      quantity: "",
      amount: [amountx],
      taxAmount: "",
      totalAmount: "",
      id: counter,
    };

    console.log(item);
    console.log(counter2);
    console.log(item.amount.amountx);
    console.log(item.amount);
    setView(item.amount);
    // console.log(counter.current);
  };

  // if (counter === item.id) {

  // }

  const array = [];
  array.push(counter2);
  console.log(array);
  const handleRemoveInput = () => {
    setCounter(counter - 1);
    console.log(counter);
  };
  console.log(handleNewInput);
  console.log(pPQuantityx);
  console.log(quantityx);
  // const amountx = parseInt(pPQuantityx, 10) * parseInt(quantityx, 10);
  console.log(amountx);
  // setAmountNotChange2(amountxx);

  const handleClick = (e) => {
    // handleOnTitleKeys();
    // handleOnQuantityKeys();
    // handleOnPPQuantityKeys();
    // handleOnBonusAmountKeys();
    // Amount * taxamount - bonus
    // if (enabled) {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    //   const idx = data11.personalID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      individualID: "duty",
      items: [
        {
          saleType: salesTypex,
          salesID: "string",
          branchID: "branx",
          pricePerUnit: pPQuantityx,
          quantity: quantityx,
          amount: "amountx",
          taxAmount: taxAmountx,
          totalAmount: "totalAmountx",
        },
      ],
      bonusAmount: 0,
      subTotalAmount: 0,
      totalAmount: 0,
      createdBy: "idx",
      comment: commentx,
      receiptStatus: 0,
    });
    console.log(raw);
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
            console.log(result.data.id);
            //   handlePayVAT(result.data.id);
            // window.location.reload();
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
    // }
  };

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
    setEnabled(checkedName === true);
  };
  //   const handleOnEmailKeys = () => {
  //     const letters = new RegExp("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[a-zA-Z]$");
  //     if (!emailx.match(letters)) {
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("email").innerHTML = "Email - input a valid email<br>";
  //     }
  //     if (emailx.match(letters)) {
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("email").innerHTML = "";
  //     }
  //     if (emailx.length === 0) {
  //       // eslint-disable-next-line no-unused-expressions
  //       document.getElementById("email").innerHTML = "Email is required<br>";
  //     }
  //   };

  const openModal = (id) => {
    console.log("This is for modal");
    // setTaskid(id);
    setOpen(true);
    console.log(id);
  };
  const handleOnChange = (e) => {
    const abc = {};
    abc[e.target.className] = e.target.value;
    setSalesType({ ...salesTypex, ...abc });
    console.log({ ...salesTypex, ...abc });
  };
  const handleOnChange2 = (e) => {
    console.log(e);
    console.log(pPQuantityx);
    const abc = parseInt(e, 10) * parseInt(quantityx, 10);
    const belgium = e * quantityx;
    console.log(abc);
    console.log(belgium);
    // abc[e.target.className] = e.target.value;
    setPPQuantity(e);
    const invest = Number(abc);
    console.log(invest);
    setAmountNotChange(belgium);
    // setAmount(quantityx * e);
  };
  // console.log(setAmount);
  // const handleOnChange4 = (e) => {
  //   console.log(e);
  //   // const abc = e;
  //   // abc = e.target.value;
  //   // setAmount(e);
  //   console.log({ ...amountx, ...e });
  // };

  // const callback = (e) => {
  //   useEffect(() => {
  //     let isMounted = true;
  //     if (isMounted) {
  //       // handleOnlastChange(e);
  //       console.log(e);
  //     }
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);
  // };
  // console.log(handleOnlastChange);
  // useEffect(() => {
  //   // let isMounted = true;
  //   // if (isMounted) {
  //   //   // handleOnlastChange(amountNotChange2);
  //   console.log(amountNotChange2);
  //   // }
  //   // return () => {
  //   //   isMounted = false;
  //   // };
  // }, []);
  if (amountNotChange2 !== "") {
    console.log(amountNotChange2);
    // useEffect(() => {
    //   // let isMounted = true;
    //   // if (isMounted) {
    //   handleOnlastChange(amountNotChange2);
    //   console.log(amountNotChange2);
    //   // }
    //   // return () => {
    //   //   isMounted = false;
    //   // };
    // }, [amountx]);
  }
  const handleOnChange3 = (e) => {
    // const abc = {};
    // abc[e.target.className] = e.target.value;
    setQuantity(e.target.value);
    // setAmount(e.target.value * pPQuantityx);
    console.log(pPQuantityx * e.target.value);
    setAmountNotChange2(pPQuantityx * e.target.value);
    const movvvv = parseInt(pPQuantityx, 10) * parseInt(e.target.value, 10);
    console.log(movvvv);
    console.log(e.target.value);
    if (movvvv !== "") {
      console.log(e.target.value * pPQuantityx);
      console.log(amountNotChange2);
      console.log(amountNotChange);
      console.log(movvvv);
      // callback(movvvv);
      // useEffect(() => {
      // let isMounted = true;
      // if (isMounted) {
      handleOnlastChange(movvvv);
      // }
      // return () => {
      //   isMounted = false;
      // };
      // }, []);
    }
  };
  // const handleOnChange4 = () => {
  //   // const abc = {};
  //   // abc[e.target.className] = e.target.value;
  //   // setQuantity(e.target.value);
  //   // setAmount(quantityx * pPQuantityx);
  //   console.log(quantityx * pPQuantityx);
  // };

  console.log(handleOnNameKeys);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleIndividual = (e) => {
    if (namex.length > 1) {
      setOpened(true);
      e.preventDefault();
      // handleClose();

      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      const personalIDs = data11.personalID;
      // const dutyx = Number(duty);
      const raw = JSON.stringify([
        {
          orgID: orgIDs,
          fname: namex,
          lname: lnamex,
          title: titlex,
          // clientLevelID: clientLevel,
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

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);
  // };
  // style={{ tr {
  //     background-color: #dddddd;
  //   }}}

  const handleFormChange = (event, index) => {
    console.log(event, index);
  };

  function load(e) {
    handleOnlastChange(e);
    // id = 1;
    console.log(e);
  }
  console.log(load);
  console.log(salesTypex);
  console.log(quantityx);
  console.log(pPQuantityx);
  // // eslint-disable-next-line no-lone-blocks
  // {
  //   Object.keys(amountx).map((c) => (
  //     <p>{salesTypex[c]}</p>
  //     console.log(c);
  //     // setdiots(c),
  //   ));
  // }

  // handleAddRow = () => {
  //   const item = {
  //     saleType: "",
  //     branchID: "",
  //     pricePerUnit: "",
  //     quantity: "",
  //     amount: "",
  //     taxAmount: "",
  //     totalAmount: "",
  //   };
  //   console.log(item);
  //   // this.setState = {
  //   //   // eslint-disable-next-line react/destructuring-assignment, react/no-this-in-sfc
  //   //   rows: this.state.rows.slice(0, -1),
  //   // };
  // };
  // console.log(handleAddRow);
  // handleRemoveRow = () => {
  //   // eslint-disable-next-line react/destructuring-assignment
  //   this.state.rows.slice(0, -1);
  // };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <Card>
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
              Sales
            </MDTypography>
          </MDBox>
          <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MDTypography variant="gradient" fontSize="60%" color="error" id="name">
              {" "}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    {/* <MDInput
                      type="text"
                      label="Quantity *"
                      value={quantityx || ""}
                      onKeyUp={handleOnNameKeys}
                      className="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                      variant="standard"
                      fullWidth
                    /> 
                    <TextField
                      label="Amount *"
                      type="number"
                      value={amountx}
                      onKeyUp={handleOnNameKeys}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    {/* <MDInput
                      type="text"
                      value={ppQuantity || ""}
                      onChange={(e) => setPPQuantity(e.target.value)}
                      label="Price Per Quantity"
                      variant="standard"
                      fullWidth
                    /> 
                    <TextField
                      label="Price Per Quantity "
                      type="number"
                      value={ppQuantity}
                      onChange={(e) => setPPQuantity(e.target.value)}
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox mb={2}>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    {/* <MDInput
                      type="text"
                      label="Quantity *"
                      value={amountx || ""}
                      onKeyUp={handleOnNameKeys}
                      className="form-control"
                      onChange={(e) => setAmount(e.target.value)}
                      variant="standard"
                      fullWidth
                    /> 
                    <TextField
                      label="Quantity *"
                      type="number"
                      value={quantityx}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    {/* <MDInput
                      type="text"
                      value={ppQuantity || ""}
                      onChange={(e) => setPPQuantity(e.target.value)}
                      label="Price Per Quantity"
                      variant="standard"
                      fullWidth
                    /> 
                    <TextField
                      label="Price Per Quantity "
                      type="number"
                      value={taskAmountx}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
              </Container>
            </MDBox>
            <MDBox>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                      Branch
                    </MDTypography>
                    <MDBox textAlign="right">
                      <Form.Select
                        value={branx || ""}
                        aria-label="Default select example"
                        onChange={setBranx}
                      >
                        <option>--Select Branch--</option>
                        {branId.map((apis) => (
                          <option key={apis.id} value={apis.id}>
                            {apis.name}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      label="Task Amount "
                      type="number"
                      value={taskAmountx}
                      onChange={(e) => setTaskAmount(e.target.value)}
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
      </Card> */}
      <Card>
        {/* <MDBox style={{ paddingLeft: "200px" }}>
          <MDButton variant="gradient" onClick={() => openModal()}>
            Add New Individual
          </MDButton>
        </MDBox> */}
        <MDBox style={{ paddingLeft: "450px" }}>
          <Container>
            <div className="row" style={{ paddingLeft: "700px" }}>
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
                {/* <IconButton onClick={() => openModal()}>
                  <PersonAddIcon />
                </IconButton> */}
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
                    onChange={setIndi}
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
          {/* <MDBox mt={1} style={{ paddingLeft: "700px" }}>
            <MDTypography variant="button" color="text">
              Individual not in organization yet ?
              {/* <MDTypography
                component={Link}
                // to="/authentication/sign-up"
                onClick={}
                variant="button"
                color="info"
                fontWeight="medium"
                // textGradient
                style={Styles.textSx}
              >
                Add New Individual
              </MDTypography>
              <MDButton variant="gradient" onClick={() => openModal()}>
                Add New Individual
              </MDButton>
            </MDTypography>
          </MDBox> */}
        </MDBox>
        {/* <MDBox>
          {/* startAction= */}
        {/* <IconButton
            onClick={handleNewInput}
            aria-label="Add"
            size="sm"
            variant="plain"
            color="neutral"
          > */}
        {/* <Add /> */}
        {/* </IconButton>
        </MDBox> */}
        <br />
        &nbsp; &nbsp;
        <MDBox>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={() => handleNewInput()}
          >
            <Add sx={{ color: "#f96d02" }} />
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={() => handleRemoveInput()}
          >
            <CancelPresentationIcon sx={{ color: "#f96d02" }} />
          </IconButton>
        </MDBox>
        <Card style={{ backgroundColor: "#CCC1FF" }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Item>
                <b>saleType</b>
              </Item>
              {/* branchID: "branx",
            pricePerUnit: "ppQuantity",
            quantity: "quantityx",
            amount: "amountx",
            taxAmount: "taskAmountx",
            totalAmount: "totalAmountx", */}
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
            <Grid item xs={2}>
              <Item>
                <b>Bonus Amount (NGN)</b>
              </Item>
            </Grid>
          </Grid>
        </Card>
        {/* <br /> */}
        &nbsp;
        <Grid>
          {/* <Container> */}
          {Object.keys(amountx).map((c) => (
            <p>{salesTypex[c]}</p>
            // setdiots(c),
          ))}
          {counter.map((form, index) => (
            <div className="row" key={index()}>
              {/* <div>{setppp(id)}</div> */}
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

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-select-small">Sales Type</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={form.salesType}
                      // key={c}
                      label="Age"
                      sx={{ minHeight: 40 }}
                      // fullWidth
                      onChange={handleFormChange}
                      // onChange={(e) => handleOnChange(e.target.value)}
                    >
                      <MenuItem value="1">Product</MenuItem>
                      <MenuItem value="2">Company Sales</MenuItem>
                      <MenuItem value="3">Custom Service</MenuItem>
                      {/* <MenuItem value="4">Thirty</MenuItem> */}
                    </Select>
                  </FormControl>
                </Box>

                {/* <input onChange={(e) => setName(e.target.value)} value={namex || ""} type="text" /> */}
              </div>
              <div className="col-sm-2">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-error-helper-text"
                      label="First Name"
                      size="small"
                      // defaultValue="Hello World"
                      // helperText="Incorrect entry."
                    />
                  </FormControl>
                </Box>
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
                      value={form.pPQuantity}
                      label="Pice Per Quantity "
                      placeholder="Pice Per Quantity "
                      size="small"
                      // key={c}
                      // className={index}
                      type="number"
                      onChange={(e) => handleOnChange2(e.target.value)}
                      // onChange={(e) => setPPQuantity(e.target.value)}
                      // onKeyUp={(e) => handleTaxAmount(e.target.value)}

                      required
                    />
                  </FormControl>
                </Box>

                {/* <TextField
                    label="Tax Amount *"
                    type="number"
                    value={taxAmountx}
                    onKeyUp={(e) => handleOnTaxAmountKeys(e.target.value)}
                    onChange={(e) => setTaxAmount(e.target.value)}
                  /> */}
              </div>
              <div className="col-sm-1">
                <Box sx={{ minWidth: 100 }}>
                  <FormControl fullWidth>
                    <TextField
                      id="filled-number"
                      value={form.quantity}
                      label="Quantity "
                      placeholder="Quantity "
                      // key={c}
                      // className={index}
                      type="number"
                      size="small"
                      onChange={handleOnChange3}
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
                      value={form.amount}
                      label="Amount "
                      placeholder="Amount "
                      // key={c}
                      // className={index}
                      size="small"
                      type="number"
                      onChange={(e) => setAmount(e)}
                      // onChange={(e) => handleOnlastChange(e)}
                      // onKeyUp={(e) => setAmount(e.target.value)}

                      InputProps={{
                        readOnly: true,
                      }}
                      // disabled
                    />
                  </FormControl>
                </Box>
              </div>
              <div className="col-sm-1">
                <Box sx={{ minWidth: 100 }}>
                  <FormControl fullWidth>
                    <TextField
                      id="filled-number"
                      value={form.taxAmountx}
                      label="Tax Amount (NGN) "
                      placeholder="Tax Amount "
                      type="number"
                      size="small"
                      onChange={(e) => setTaxAmount(e.target.value)}
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
                      value={form.bonusAmount || ""}
                      label="Bonus Amount "
                      placeholder="Bonus Amount "
                      type="number"
                      size="small"
                      onChange={(e) => setTaxAmount(e.target.value)}
                      // onKeyUp={(e) => handleTaxAmount(e.target.value)}

                      required
                    />
                  </FormControl>
                </Box>
              </div>
            </div>
          ))}
          &nbsp; &nbsp;
          {/* </Container> */}
        </Grid>
        <br />
        <div>
          <Card>
            <table>
              <tr>
                <th>Sales Type</th>
                <th>Branch</th>
                <th>Price Per Unit (NGN)</th>
                <th>Quantity</th>
                <th>Amount (NGN)</th>
                <th>Tax Amount</th>
                <th>Bonus Amount (NGN)</th>
              </tr>
              {Array.from(Array(counter)).map(() => (
                <tr style={{ backgroundColor: "#dddddd" }}>
                  {/* <td>{idx}</td> */}
                  <td>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Sales Type</InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          // value={salesTypex || ""}
                          // key={c}
                          label="Age"
                          sx={{ minHeight: 40 }}
                          // fullWidth
                          onChange={handleOnChange}
                          // onChange={(e) => handleOnChange(e.target.value)}
                        >
                          <MenuItem value="1">Product</MenuItem>
                          <MenuItem value="2">Company Sales</MenuItem>
                          <MenuItem value="3">Custom Service</MenuItem>
                          {/* <MenuItem value="4">Thirty</MenuItem> */}
                        </Select>
                      </FormControl>
                    </Box>
                  </td>
                  <td>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-error-helper-text"
                          label="First Name"
                          size="small"
                          // defaultValue="Hello World"
                          // helperText="Incorrect entry."
                        />
                      </FormControl>
                    </Box>
                  </td>

                  <td>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          // value={pPQuantityx || ""}
                          label="Pice Per Quantity "
                          placeholder="Pice Per Quantity "
                          size="small"
                          // key={c}
                          // className={index}
                          type="number"
                          onChange={(e) => handleOnChange2(e.target.value)}
                          // onChange={(e) => setPPQuantity(e.target.value)}
                          // onKeyUp={(e) => handleTaxAmount(e.target.value)}

                          required
                        />
                      </FormControl>
                    </Box>
                  </td>
                  <td>
                    <Box sx={{ minWidth: 100 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          // value={quantityx || ""}
                          label="Quantity "
                          placeholder="Quantity "
                          // key={c}
                          // className={index}
                          type="number"
                          size="small"
                          onChange={handleOnChange3}
                          // onChange={(e) => setQuantity(e.target.value)}
                          // onKeyUp={(e) => handleTaxAmount(e.target.value)}

                          required
                        />
                      </FormControl>
                    </Box>
                  </td>
                  <td>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          // value={amountx || ""}
                          label="Amount "
                          placeholder="Amount "
                          // key={c}
                          // className={index}
                          size="small"
                          type="number"
                          // onChange={(e) => handleOnChange4(e.target.value)}
                          // onKeyUp={(e) => handleTaxAmount(e.target.value)}

                          InputProps={{
                            readOnly: true,
                          }}
                          // disabled
                        />
                      </FormControl>
                    </Box>
                  </td>
                  <td>
                    <Box sx={{ minWidth: 100 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={taxAmountx || ""}
                          label="Tax Amount (NGN) "
                          placeholder="Tax Amount "
                          type="number"
                          size="small"
                          onChange={(e) => setTaxAmount(e.target.value)}
                          // onKeyUp={(e) => handleTaxAmount(e.target.value)}

                          required
                        />
                      </FormControl>
                    </Box>
                  </td>
                  <td>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <TextField
                          id="filled-number"
                          value={taxAmountx || ""}
                          label="Bonus Amount "
                          placeholder="Bonus Amount "
                          type="number"
                          size="small"
                          onChange={(e) => setTaxAmount(e.target.value)}
                          // onKeyUp={(e) => handleTaxAmount(e.target.value)}

                          required
                        />
                      </FormControl>
                    </Box>
                  </td>
                </tr>
              ))}
            </table>
          </Card>
        </div>
        <div>
          {/* <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <input />
              </tr>
              <tr>
                <input />
              </tr>
            </tbody>
          </table> */}
          {/* <table>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Country</th>
            </tr>
            <tr>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>

              <td>
                <input />
              </td>
            </tr>
            <input />
            <tr>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>Italy</td>
            </tr>
          </table> */}
        </div>
        &nbsp; &nbsp;
        <MDBox style={{ paddingLeft: "30px" }}>
          <Container>
            <div className="row">
              <div className="col-sm-12">
                <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                  <Form.Label style={{ fontSize: 14 }}>Portfolio</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={commentx || ""}
                    // onKeyUp={handleOnPortfolioKeys}
                    onChange={(e) => setComment(e.target.value)}
                    rows={2}
                  />
                </Form.Group>

                <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
              </div>
            </div>
          </Container>
        </MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton
            variant="gradient"
            onClick={handleClick}
            style={Styles.buttonSx}
            width="50%"
            align="left"
          >
            Save
          </MDButton>
        </MDBox>
        {/* <Grid>
          <Grid>
            <li className="list-group-item" item xs={8}>
              machala
            </li>
            <li className="list-group-item" item xs={4}>
              machala2
            </li>
          </Grid>
        </Grid> */}
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
              <Grid
                item
                xs={6}
                md={6}
                // style={{ backgroundColor: "ButtonFace", minHeight: "550px" }}
              >
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
                {/* <SubTaskComment subTaskId={taskId} /> */}
                <MDBox>
                  <MDBox component="form" role="form">
                    {/* <SidenavCollapse */}
                    <MDBox mb={0}>
                      <Container>
                        <div className="row">
                          <div className="col-sm-6">
                            <MDInput
                              type="text"
                              value={namex || ""}
                              onChange={(e) => setName(e.target.value)}
                              // onKeyUp={handleOnNameKeys}
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
                              // onKeyUp={handleOnNameKeys}
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
                      </Container>
                    </MDBox>
                    {/* <MDBox>
                      <Container>
                        <div className="row">
                          <div className="col-sm-10">
                            <MDBox textAlign="center">
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
                            </MDBox>
                          </div>
                        </div>
                      </Container>
                    </MDBox> */}
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        onClick={handleIndividual}
                        // color="info"
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
              {/* <MDTypography>Trying to create a modal</MDTypography> */}
            </Grid>
          </Box>
        </Modal>
      </div>
      {/* {craze ? (
        <Card />
      ) : (
        <MDBox>
          <MDBox component="form" role="form">
          <SidenavCollapse
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
                      onKeyUp={handleOnNameKeys}
                      label="Last Name"
                      variant="standard"
                      fullWidth
                    />
                  </div>
                  {/* <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={onamex || ""}
                      onChange={(e) => setOnamex(e.target.value)}
                      onKeyUp={handleOnNameKeys}
                      label="Other Name"
                      variant="standard"
                      fullWidth
                    />
                    <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                  </div> 
                </div>
                <br />
                {/* <div className="row">
                  <div className="col-sm-10">
                    <MDBox textAlign="center">
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
                        onChange={(e) => setTitlex(e.target.value)}
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
                    </MDBox>
                  </div>
                </div> */}
      <br />
      {/* <div className="row">
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={streetx || ""}
                      onChange={(e) => setStreet(e.target.value)}
                      label="Street"
                      variant="standard"
                      fullWidth
                    />

                    <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                  </div>
                  <div className="col-sm-6">
                    <MDInput
                      type="text"
                      value={cityx || ""}
                      onChange={(e) => setCity(e.target.value)}
                      onKeyUp={handleOnCityKeys}
                      label="City"
                      variant="standard"
                      fullWidth
                    />

                    <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                        Country
                      </MDTypography>
                      <MDBox textAlign="right">
                        <Form.Select
                          value={residentialCountryx || ""}
                          aria-label="Default select example"
                          onChange={handleOnChangeRCCountry}
                        >
                          <option>--Select Country--</option>
                          {AlCountry.map((apic) => (
                            <option key={apic.code3} value={apic.name}>
                              {apic.name}
                            </option>
                          ))}
                        </Form.Select>
                      </MDBox>

                      <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                    </div>
                    <div className="col-sm-6">
                      <MDTypography variant="button" fontWeight="regular" color="text" mt={2}>
                        State
                      </MDTypography>
                      <MDBox textAlign="right">
                        <Form.Select
                          value={residentialStatex || ""}
                          aria-label="Default select example"
                          onChange={handleOnChangeRCState}
                        >
                          <option>--Select State--</option>
                          {allStates.map((apis) => (
                            <option key={apis.code} value={apis.name}>
                              {apis.name}
                            </option>
                          ))}
                        </Form.Select>
                      </MDBox>

                      <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                    </div>
                  </div>
                </div> 
              </Container>
            </MDBox>
            <br />
            <MDBox>
              <Container>
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

                    <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
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

                    <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                  </div>
                </div>
                <br />
                {/* <MDBox textAlign="center">
                  <MDTypography variant="h4" fontWeight="medium" fontSize="55%">
                    Date Of Birth
                  </MDTypography>
                  <DatePicker
                    date={startDate}
                    wrapperClassName="date-picker"
                    placeholder="Select Birth Date"
                    dateFormat="MM/dd/yyyy"
                    confirmBtnText="Confirm"
                    showCancelButton="true"
                    customStyles={{
                      placeholderText: {
                        fontSize: 5,
                      },
                      dateIcon: {
                        height: 0,
                        width: 0,
                      },
                      dateText: {
                        color: "#b3b4b5",
                        fontSize: 16,
                      },
                      dateInput: {
                        borderWidth: 0,
                      },
                    }}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                  <br />
                  <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                </MDBox>
              </Container>
            </MDBox>
            <br />
            <MDBox textAlign="center" align="center">
              <Container>
                <div className="row">
                  <MDBox mt={4}>
                    <MDBox textAlign="center">
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
                        color="text"
                      >
                        Marital Status
                      </MDTypography>
                      <Form.Select
                        value={maritalx}
                        onChange={(e) => setMaritalx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </Form.Select>
                    </MDBox>
                  </MDBox>

                  <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                </div>
              </Container>
              <Container>
                <div className="row">
                  <MDBox mt={4}>
                    <MDBox textAlign="center">
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
                        color="text"
                      >
                        Account Owner
                      </MDTypography>
                      <Form.Select
                        value={duty}
                        onChange={(e) => setDutyRelieverx(e.target.value)}
                        aria-label="Default select example"
                      >
                        <option value="">Select Account Owner</option>
                        {user.map((api) => (
                          <option key={api.personal.id} value={api.personal.id}>
                            {api.personal.fname} {api.personal.lname}
                          </option>
                        ))}
                      </Form.Select>
                    </MDBox>
                  </MDBox>
                </div>
              </Container>
              <br />
              {/* <Container>
                <div className="row">
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    fontSize="80%"
                    textAlign="center"
                    color="text"
                  >
                    Corporate Name
                  </MDTypography>
                  <Select options={options} onChange={handleChanges} styles={customStyles} />
                  <i style={{ fontSize: "11px", color: "gray" }}>optional</i>
                </div>
              </Container> 
            </MDBox>
            <MDBox mt={4} mb={1} textAlign="center">
              <MDButton variant="gradient" onClick={handleClick} color="info" width="50%">
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      )} */}
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}
export default Sales;
