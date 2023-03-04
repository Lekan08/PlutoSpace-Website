import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Container, Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "examples/Footer";
import Select from "react-select";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";
import Styles from "styles";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { useReactToPrint } from "react-to-print";
import Icon from "@mui/material/Icon";

// Big Zzzz new doins 👏👏😀
// 😴😫☺😎😍🥱windows .
// na the 🐐 of all time write dis code 😎

function FilterSales() {
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();

  const [opened, setOpened] = useState(false);

  const [startAmountx, setStartAmount] = useState("");
  const [endTimex, setEndTime] = useState("");
  const [endAmountx, setEndAmount] = useState("");
  const [startTimex, setStartTime] = useState("");
  const [gOI, setGOI] = useState([]);
  const [userx, setUser] = useState([]);
  const [approv, setApprov] = useState([]);
  const [approv2, setApprov2] = useState([]);
  const [individual, setIndividual] = useState([]);
  const [flash, setFlash] = useState([]);
  const [showPrint, setShowPrint] = useState(false);
  const [cashierx, setCashier] = useState([]);
  const [taxAmount, setTaxAmount] = useState([]);

  const onBeforeGetContentResolve = useRef();
  <style type="text/css" media="print">
    {"\
@page{ size: portrait; } \
"}
  </style>;

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
          const newMap = [];

          // eslint-disable-next-line array-callback-return
          result.map((item) => {
            const NewMapp = {
              value: item.personal.id,
              label: `${item.personal.fname}`,
            };
            newMap.push(NewMapp);
          });
          setUser(newMap);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

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
          const newMap = [];

          // eslint-disable-next-line array-callback-return
          result.map((item) => {
            const NewMapp = {
              value: item.id,
              label: `${item.fname} ${item.lname}`,
            };
            newMap.push(NewMapp);
          });
          setIndividual(newMap);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnSelect = (select) => {
    const usseerr = [];

    // eslint-disable-next-line array-callback-return
    select.map((items) => {
      const newx = items.value;
      usseerr.push(newx);
    });
    setApprov(usseerr);
  };
  const handleOnSelect2 = (select) => {
    const usseerr = [];

    // eslint-disable-next-line array-callback-return
    select.map((items) => {
      const newx = items.value;
      usseerr.push(newx);
    });
    setApprov2(usseerr);
  };

  const handleFilter = (e) => {
    setOpened(true);
    e.preventDefault();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const newStart = new Date(startTimex).getTime();
    const newEnd = new Date(endTimex).getTime();
    let isMounted = true;
    const raw = JSON.stringify({
      orgID: orgIDs,
      individualIDs: approv,
      startTotalAmount: startAmountx,
      endTotalAmount: endAmountx,
      createdBys: approv2,
      startTime: newStart,
      endTime: newEnd,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_LOUGA_URL}/sales/gets`, requestOptions)
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
        if (isMounted) {
          if (result !== "") {
            console.log(result);
            setGOI(result);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  };

  console.log(flash);

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
  console.log(handlePrint);
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

  // eslint-disable-next-line consistent-return
  const handleOnChange = (value) => {
    if (gOI !== []) {
      const vibes = gOI.filter((item) => item.id === value);
      // return console.log(gOI);
      console.log(vibes);

      if (vibes !== []) {
        setFlash(vibes);
        const zoom = vibes[0].items.map((val) => val.taxAmount);
        console.log(zoom);
        // eslint-disable-next-line no-eval
        setTaxAmount(eval(zoom.join("+")));
        handlePrint();
      }
    }
  };
  // handlePrint;

  // eslint-disable-next-line no-lone-blocks
  {
    const pColumns = [
      {
        Header: "Bonus Amount",
        accessor: "bonusAmount",
        align: "left",
      },
      {
        Header: "Card Payment Amount",
        accessor: "cardPaymentAmount",
        align: "left",
      },
      {
        Header: "Cash Payment Amount",
        accessor: "cashPaymentAmount",
        align: "left",
      },
      {
        Header: "Total Amount",
        accessor: "totalAmount",
        align: "left",
      },
      {
        Header: "Sub Total Amount",
        accessor: "subTotalAmount",
        align: "left",
      },
      {
        Header: "Individual First Name",
        accessor: "individual.fname",
        align: "left",
      },
      {
        Header: "Individual Last Name",
        accessor: "individual.lname",
        align: "left",
      },
      {
        Header: "Individual Phone Number",
        accessor: "individual.pno",
        align: "left",
      },
      {
        Header: "Created By",
        accessor: "createdByName",
        align: "left",
      },
      {
        Header: "Comment",
        accessor: "comment",
        align: "left",
      },
      {
        Header: "actions",
        accessor: "id",
        // eslint-disable-next-line react/prop-types
        Cell: ({ cell: { value } }) => (
          <div
            style={{
              width: "100%",
              backgroundColor: "#dadada",
              borderRadius: "2px",
            }}
          >
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic-button">
                <Icon sx={{ fontWeight: "light" }}>settings</Icon>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleOnChange(value)}>Print Receipt</Dropdown.Item>
                {/* <Dropdown.Item onClick={() => handleUpdate(value)}>Update</Dropdown.Item> */}
                {/* <Dropdown.Item onClick={() => handleDisable2(value)}>Delete</Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ),
        align: "center",
      },
    ];

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
                    {flash[0].items.map((row) => (
                      <>
                        <tr>
                          {/* {} */}
                          <td>{row.salesName}</td>
                          <td>{row.quantity}</td>
                          <td>{row.pricePerUnit}</td>
                          <td>{parseInt(row.pricePerUnit, 10) * parseInt(row.quantity, 10)}</td>
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
                      <td>N{flash[0].subTotalAmount}</td>
                    </tr>
                    <tr>
                      Local Sales Tax
                      <td />
                      <td>{taxAmount}% Tax:</td>
                      <td>+N{taxAmount}.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <br /> */}
              <div style={{ paddingLeft: "350px" }}>
                <b>Receipt Total: {flash[0].totalAmount} </b>
              </div>
              <p align="center">Charges Inclusive of {taxAmount}% VAT</p>
              <p align="center">
                {" "}
                Thank you for shopping with us, Products purchased in good condition are not
                returnable
              </p>
              <h4 align="center">Have a great day |||</h4>
              <h4 align="center">Receipt Number: {flash[0].receiptNo}</h4>
            </>
          ) : (
            ""
          )}
        </div>
        <Card>
          <MDBox pt={4} pb={3} px={30}>
            <MDBox
              variant="gradient"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
              style={Styles.boxSx}
            >
              <MDTypography variant="h4" fontWeight="regular" color="white" mt={1}>
                Filter Sales
              </MDTypography>
            </MDBox>
            <br />
            <MDBox component="form" role="form">
              <MDBox mb={0}>
                <Container>
                  <div className="row">
                    <div className="col-sm-6">
                      <Box sx={{ minWidth: 100 }}>
                        <FormControl fullWidth>
                          <TextField
                            label="Start Total Amount(NGN)"
                            type="number"
                            value={startAmountx}
                            onChange={(e) => setStartAmount(e.target.value)}
                          />
                        </FormControl>
                      </Box>
                    </div>
                    <br />
                    <div className="col-sm-6">
                      <Box sx={{ minWidth: 100 }}>
                        <FormControl fullWidth>
                          <TextField
                            label="End Total Amount(NGN)"
                            type="number"
                            value={endAmountx}
                            onChange={(e) => setEndAmount(e.target.value)}
                          />
                        </FormControl>
                      </Box>
                    </div>
                  </div>
                </Container>
              </MDBox>
              <br />
              <MDBox>
                <Container>
                  <div className="row">
                    <div className="col-sm-6">
                      <Box sx={{ minWidth: 100 }}>
                        <FormControl fullWidth>
                          <TextField
                            id="datetime-local"
                            label="Start Time *"
                            type="datetime-local"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={startTimex}
                            onChange={(e) => setStartTime(e.target.value)}
                          />
                        </FormControl>
                      </Box>
                    </div>
                    <br />
                    <div className="col-sm-6">
                      <Box sx={{ minWidth: 100 }}>
                        <FormControl fullWidth>
                          <TextField
                            id="datetime-local"
                            label="End Time *"
                            type="datetime-local"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={endTimex}
                            onChange={(e) => setEndTime(e.target.value)}
                          />
                        </FormControl>
                      </Box>
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
                        Select Individuals
                      </MDTypography>
                      <Select
                        isMulti
                        name="colors"
                        options={individual}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleOnSelect}
                      />
                    </div>
                    <div className="col-sm-6">
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        textAlign="center"
                        color="text"
                      >
                        Created By
                      </MDTypography>
                      <Select
                        isMulti
                        name="colors"
                        options={userx}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleOnSelect2}
                      />
                    </div>
                  </div>
                </Container>
              </MDBox>
              <br />
              <MDBox style={{ paddingBottom: "5px" }}>
                <Button onClick={handleFilter} style={Styles.buttonSx}>
                  Filter
                </Button>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
        <br />
        <MDBox pt={3}>
          <DataTable
            table={{ columns: pColumns, rows: gOI }}
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
}
export default FilterSales;
