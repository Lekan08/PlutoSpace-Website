/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Accordion from "react-bootstrap/Accordion";
import Paper from "@mui/material/Paper";
// import { Container, Form, Button } from "react-bootstrap";
// import Select from "react-select";
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import MDTypography from "components/MDTypography";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Form, Button } from "react-bootstrap";
import Grid from "@mui/material/Grid";

import example from "./example.PNG";
import "../Force.css";

function Csv() {
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [corporateID, setCorporateID] = useState([]);
  const options = corporateID.map((d) => ({
    value: d.id,
    label: d.name,
  }));
  options.unshift({ value: "", label: "None" });
  const [user, setUser] = useState([]);
  const [file, setFile] = useState([]);
  const [assetTypeIDx, setAssetTypeID] = useState("");
  const [clientTypex, setClientTypex] = useState("");
  const [clientIDx, setClientIDx] = useState("");
  const [showClients, setShowClients] = useState(false);
  const [clientx, setClient] = useState([]);
  const [itemsx, setItems] = useState([]);
  const [getAllBranch, setGetAllBranch] = useState([]);
  const [branchx, setBranch] = useState("");
  const [assignedTox, setAssignedTo] = useState("");

  //   const customStyles = {
  //     menu: (provided) => ({
  //       ...provided,
  //       width: "300px",
  //       borderBottom: "1px dotted pink",
  //       color: "black",
  //       padding: 0,
  //       fontSize: 15,
  //       marginLeft: 60,
  //       marginTop: 0,
  //     }),
  //   };
  const [opened, setOpened] = useState(false);

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

    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/assetTypes/gets/${orgIDs}`, { headers })
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
          setItems(result);
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
          setGetAllBranch(result);
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
    fetch(`${process.env.REACT_APP_LOUGA_URL}/corporate/gets/${orgIDs}`, { headers })
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
          setCorporateID(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  //   const chanllgeHandler = (event) => {
  //     Papa.parse(event.target.files[0], {
  //       header: true,
  //       skipEmptyLines: true,
  //       complete(results) {
  //         const data11 = JSON.parse(localStorage.getItem("user1"));
  //         const orgIDs = data11.orgID;
  //         const idx = data11.personalID;
  //         const obj = results.data;
  //         const branch = Number(branchx);
  //         const objx = obj.map(
  //           ({
  //             item,
  //             itemWorth,
  //             itemBoughtDate,
  //             itemWarrantyDate,
  //             serialNumber,
  //             manufacturer,
  //             components,
  //             // eslint-disable-next-line arrow-body-style
  //           }) => {
  //             console.log(itemBoughtDate);
  //             console.log(item);
  //             console.log(itemWorth);
  //             console.log(itemBoughtDate);
  //             const itembought = new Date().getTime(itemBoughtDate);
  //             const itemwarranty = new Date().getTime(itemWarrantyDate);
  //             return {
  //               item,
  //               itemWorth: Number(itemWorth),
  //               itemBoughtDate: itembought,
  //               itemWarrantyDate: itemwarranty,
  //               serialNumber,
  //               manufacturer,
  //               components,
  //             };
  //           }
  //         );

  //         objx.forEach((element) => {
  //           element.orgID = orgIDs;
  //           element.assetTypeID = assetTypeIDx;
  //           element.createdBy = idx;
  //           element.branchID = branch;
  //           element.clientType = clientTypex;
  //           element.clientID = clientIDx;
  //           element.assignedTo = assignedTox;
  //           console.log(element);
  //         });
  //         console.log(objx);
  //         const objc = objx.map(
  //           ({
  //             orgID,
  //             item,
  //             clientType,
  //             clientID,
  //             assetTypeID,
  //             itemWorth,
  //             createdBy,
  //             itemBoughtDate,
  //             itemWarrantyDate,
  //             branchID,
  //             serialNumber,
  //             manufacturer,
  //             components,
  //             assignedTo,
  //             // eslint-disable-next-line arrow-body-style
  //           }) => {
  //             return {
  //               orgID,
  //               item,
  //               clientType,
  //               clientID,
  //               assetTypeID,
  //               itemWorth,
  //               createdBy,
  //               itemBoughtDate,
  //               itemWarrantyDate,
  //               branchID,
  //               serialNumber,
  //               manufacturer,
  //               components,
  //               assignedTo,
  //             };
  //           }
  //         );
  //         console.log(objc);
  //         const why = JSON.stringify(objc);
  //         setFile(why);
  //       },
  //     });
  //   };
  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete(results) {
        const data11 = JSON.parse(localStorage.getItem("user1"));
        const orgIDs = data11.orgID;
        // const personalIDs = data11.personalID;
        const idx = data11.personalID;
        // const branch = Number(branchx);
        const clientType = clientTypex;
        const clientId = clientIDx;
        const assignToo = assignedTox;
        const obj = results.data;
        const objx = obj.map(
          ({
            item,
            itemWorth,
            itemBoughtDate,
            itemWarrantyDate,
            serialNumber,
            manufacturer,
            // components,
            // eslint-disable-next-line arrow-body-style
          }) => {
            return {
              item,
              itemWorth: Number(itemWorth),
              itemBoughtDate: new Date(itemBoughtDate).getTime(),
              itemWarrantyDate: new Date(itemWarrantyDate).getTime(),
              serialNumber: Number(serialNumber),
              manufacturer,
              //   components,
            };
          }
        );

        objx.forEach((element) => {
          element.orgID = orgIDs;
          element.createdBy = idx;
          element.branchID = branchx;
          element.assetTypeID = assetTypeIDx;
          element.clientType = clientType;
          element.clientID = clientId;
          element.assignedTo = assignToo;
        });
        const objc = objx.map(
          ({
            orgID,
            createdBy,
            branchID,
            assetTypeID,
            clientType,
            clientID,
            assignedTo,
            item,
            itemWorth,
            itemBoughtDate,
            itemWarrantyDate,
            serialNumber,
            manufacturer,
            // components,
            // eslint-disable-next-line arrow-body-style
          }) => {
            return {
              orgID,
              createdBy,
              branchID,
              assetTypeID,
              clientType,
              clientID,
              assignedTo,
              item,
              itemWorth,
              itemBoughtDate,
              itemWarrantyDate,
              serialNumber,
              manufacturer,
              //   components,
            };
          }
        );
        const why = JSON.stringify(objc);
        setFile(why);
      },
    });
  };
  //   const handleChanges = (selectedOption) => {
  //     setCorp(selectedOption.value);
  //   };
  const handleUpload = () => {
    const raw = file;
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/assets/addMultiple`, requestOptions)
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
  };

  const handleChangeClient = (value) => {
    console.log(value);

    const callClientType = value.toString();
    console.log(callClientType);
    setClientTypex(callClientType);
    let clientTyppe = "";
    if (callClientType === "1") {
      setShowClients(true);
      clientTyppe = "individual";
    } else if (callClientType === "2") {
      setShowClients(false);
      clientTyppe = "corporate";
    } else if (callClientType === "--Select Client Type--") {
      setClient([]);
      return;
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

  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Add Multiple Assets (CSV files only)</Accordion.Header>
          <Accordion.Body>
            <Paper elevation={3}>
              <MDBox textAlign="center" mt={3}>
                <Container>
                  <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={5}>
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        fontSize="80%"
                        align="left"
                        color="text"
                        mt={0}
                      >
                        Branch *
                      </MDTypography>
                      <MDBox textAlign="right">
                        <Form.Select
                          value={branchx}
                          aria-label="Default select example"
                          name="branchID"
                          onChange={(e) => setBranch(e.target.value)}
                        >
                          <option>--Branch--</option>
                          {getAllBranch.map((apis) => (
                            <option key={apis.id} value={apis.id}>
                              {apis.name}
                            </option>
                          ))}
                        </Form.Select>
                      </MDBox>
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
                        Assets Types *
                      </MDTypography>
                      <MDBox textAlign="right">
                        <Form.Select
                          value={assetTypeIDx}
                          onChange={(e) => setAssetTypeID(e.target.value)}
                          aria-label="Default select example"
                        >
                          <option value="">--Assets Types--</option>
                          {itemsx.map((api) => (
                            <option key={api.id} value={api.id}>
                              {api.name}
                            </option>
                          ))}
                        </Form.Select>
                      </MDBox>
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
                          value={clientTypex || ""}
                          aria-label="Default select example"
                        >
                          <option>--Select Client Type--</option>
                          <option value="1">Individual</option>
                          <option value="2">Corporate</option>
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
                      </MDBox>
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
                        Assigned To *
                      </MDTypography>
                      <MDBox textAlign="right">
                        <Form.Select
                          value={assignedTox}
                          aria-label="Default select example"
                          name="branchID"
                          onChange={(e) => setAssignedTo(e.target.value)}
                        >
                          <option>--Assigned To--</option>
                          {user.map((apis) => (
                            <option key={apis.personal.id} value={apis.personal.id}>
                              {apis.personal.fname} {apis.personal.lname}
                            </option>
                          ))}
                        </Form.Select>
                      </MDBox>
                    </Grid>
                    <Grid item xs={5}>
                      {" "}
                    </Grid>
                    <Grid item xs={10}>
                      {" "}
                      <u>Before Proceeding Read carefully:</u>
                      <MDBox p={1} mt={2}>
                        <MDTypography
                          variant="h4"
                          fontWeight="regular"
                          fontSize="75%"
                          textAlign="center"
                          color="text"
                        >
                          &nbsp;&nbsp;&nbsp;&nbsp;The first line/row in your csv file must be
                          exactly the same as the words in the image below in row 1 A - G (should be
                          camelCase when necessary. The first row order does not matter, in essence,
                          you may have fname or lname or title at any position you want) and your
                          further details in each row should be corresponding to the content of the
                          first row (i.e under please open image in new tab to zoom in for a clearer
                          view)
                        </MDTypography>
                      </MDBox>
                      <img className="img" src={example} style={{ width: "100%" }} alt="example" />{" "}
                    </Grid>
                    <Grid item xs={5}>
                      {" "}
                      <MDBox textAlign="center">
                        <MDTypography
                          variant="h4"
                          fontWeight="regular"
                          fontSize="75%"
                          textAlign="center"
                          color="text"
                        >
                          <input
                            type="file"
                            name="file"
                            accept=".csv"
                            onChange={changeHandler}
                            style={{ display: "block", margin: "10px auto" }}
                          />
                        </MDTypography>
                      </MDBox>{" "}
                    </Grid>
                    <Grid item xs={5}>
                      {" "}
                    </Grid>

                    <Grid item xs={5}>
                      <Button onClick={handleUpload} variant="success">
                        Upload
                      </Button>{" "}
                    </Grid>
                    <Grid item xs={5}>
                      {" "}
                    </Grid>
                  </Grid>
                </Container>
              </MDBox>
              <br />
              <br />
            </Paper>
          </Accordion.Body>
        </Accordion.Item>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
          <CircularProgress color="info" />
        </Backdrop>
      </Accordion>
    </div>
  );
}

export default Csv;
