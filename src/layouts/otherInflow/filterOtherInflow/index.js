import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Form, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
// import Paper from "@mui/material/Paper";
// import Accordion from "react-bootstrap/Accordion";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "examples/Footer";
import Select from "react-select";
// import Styles from "styles";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";
import Styles from "styles";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { Accordion } from "@material-ui/core";
// import { CheckBox } from "@mui/icons-material";
// import OtherInflowntable from "./data/table";
// Big Zzzz new doins 👏👏😀
// 😴😫☺😎😍🥱windows .
// na the 🐐 of all time dis code 😎
console.log(Form);

function FilterOtherInflow() {
  //   const MySwal = withReactContent(Swal);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  // const { columns: pColumns, rows: pRows } = OtherInflowntable();

  const [opened, setOpened] = useState(false);
  console.log(setOpened);

  const [startAmountx, setStartAmount] = useState("");
  const [endTimex, setEndTime] = useState("");
  const [endAmountx, setEndAmount] = useState("");
  const [startTimex, setStartTime] = useState("");
  const [gOI, setGOI] = useState([]);
  const [userx, setUser] = useState([]);
  const [approv, setApprov] = useState([]);
  const [approv2, setApprov2] = useState([]);
  //   const [applicantx, setApplicantx] = useState([]);
  console.log(gOI);
  console.log(userx);

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
        console.log(result);
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
    // const idx = data11.personalID;
    const newStart = new Date(startTimex).getTime();
    const newEnd = new Date(endTimex).getTime();
    // const raww = applicantx.map((api) => api.personalID);
    // raww.push(idx);
    let isMounted = true;
    const raw = JSON.stringify({
      startTime: newStart,
      endTime: newEnd,
      approverStatus: -1,
      orgID: orgIDs,
      createdBys: approv2,
      approvedBys: approv,
      startAmount: startAmountx,
      endAmount: endAmountx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_LOUGA_URL}/otherInflow/gets`, requestOptions)
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
            setGOI(result);
          }
        }
        console.log(result);
        // setOpened(false);
        //     MySwal.fire({
        //       title: result.status,
        //       type: "success",
        //       text: result.message,
        //     }).then(() => {
        //       window.location.reload();
        //     });
      });
    //   .catch((error) => {
    //     setOpened(false);
    // MySwal.fire({
    //   title: error.status,
    //   type: "error",
    //   text: error.message,
    // });
    //   });
    return () => {
      isMounted = false;
    };
  };

  //   const addEm = (api) => {
  //     // const applicantr = [];
  //     const mapper = {
  //       orgID: api.personalCompany.orgID,
  //       name: `${api.personal.fname} ${api.personal.lname}`,
  //       email: api.personal.email,
  //       personalID: api.personal.id,
  //     };
  //     applicantx.push(mapper);
  //     setApplicantx(applicantx);
  //   };
  //   const deleteEm = (api) => {
  //     // eslint-disable-next-line no-plusplus
  //     for (let i = applicantx.length - 1; i >= 0; --i) {
  //       if (applicantx[i].personalID === api.personal.id) {
  //         applicantx.splice(i, 1);
  //       }
  //     }
  //   };

  //   const applicant = (e, api) => {
  //     // e.preventDefault();
  //     if (e.target.checked === true) {
  //       addEm(api);
  //     }
  //     if (e.target.checked === false) {
  //       deleteEm(api);
  //     }
  //     console.log(applicantx);
  //   };

  {
    const pColumns = [
      {
        Header: "Amount",
        accessor: "amount",
        align: "left",
      },
      {
        Header: "quantity",
        accessor: "otherInflowType.name",
        align: "left",
      },
      {
        Header: "Tax Amount",
        accessor: "taxAmount",
        align: "left",
      },
      {
        Header: "Total Amount",
        accessor: "totalAmount",
        align: "left",
      },
      {
        Header: "Particulars",
        accessor: "particulars",
        align: "left",
      },
      //   {
      //     Header: "Client Name",
      //     accessor: "clientName",
      //     align: "left",
      //   },

      //   //   {
      //   //     Header: "actions",
      //   //     accessor: "id",
      //   //     // eslint-disable-next-line react/prop-types
      //   //     Cell: ({ cell: { value } }) => (
      //   //       <div
      //   //         style={{
      //   //           width: "100%",
      //   //           backgroundColor: "#dadada",
      //   //           borderRadius: "2px",
      //   //         }}
      //   //       >
      //   //         <Dropdown>
      //   //           <Dropdown.Toggle variant="secondary" id="dropdown-basic-button">
      //   //             <Icon sx={{ fontWeight: "light" }}>settings</Icon>
      //   //           </Dropdown.Toggle>

      //   //           <Dropdown.Menu>
      //   //             <Dropdown.Item onClick={() => navigate("/Tickets/Chats")}>view</Dropdown.Item>
      //   //             <Dropdown.Item onClick={() => handleResolveTicket(value)}>Resolve</Dropdown.Item>
      //   //           </Dropdown.Menu>
      //   //         </Dropdown>
      //   //       </div>
      //   //     ),
      //   //     align: "center",
      //   //   },
    ];

    // return (
    //   <DashboardLayout>
    //     <DashboardNavbar />
    //     &nbsp;
    //     <MDBox>
    //       <DataTable
    //         table={{ columns: pColumns, rows: items }}
    //         isSorted
    //         entriesPerPage
    //         showTotalEntries
    //         noEndBorder
    //         canSearch
    //       />
    //     </MDBox>
    //     <Footer />
    //     <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
    //       <CircularProgress color="info" />
    //     </Backdrop>
    //   </DashboardLayout>
    // );

    return (
      <DashboardLayout>
        <DashboardNavbar />
        {/* <MDBox>Finish halftime</MDBox> */}
        <Card>
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
              <MDTypography variant="h4" fontWeight="regular" color="white" mt={1}>
                Add Individual Client
              </MDTypography>
            </MDBox>
            <br />
            <MDBox component="form" role="form">
              <MDBox mb={0}>
                <Container>
                  <div className="row">
                    <div className="col-sm-4">
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
                    </div>
                    <br />
                    <div className="col-sm-2" />
                    &nbsp; &nbsp;
                    <div className="col-sm-4">
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
                    </div>
                  </div>
                </Container>
              </MDBox>
              <br />
              <MDBox mb={0}>
                <Container>
                  <div className="row">
                    <div className="col-sm-6">
                      <TextField
                        label="Start Amount *"
                        type="number"
                        value={startAmountx}
                        // onKeyUp={handleOnAmountKeys}
                        onChange={(e) => setStartAmount(e.target.value)}
                      />
                    </div>
                    <br />
                    {/* &nbsp; &nbsp; */}
                    {/* <div className="col-sm-2" /> */}
                    <div className="col-sm-6">
                      <TextField
                        label="End Amount *"
                        type="number"
                        value={endAmountx}
                        // onKeyUp={handleOnTaxAmountKeys}
                        onChange={(e) => setEndAmount(e.target.value)}
                      />
                    </div>
                  </div>
                </Container>
              </MDBox>
              <br />
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
                        Approved By
                      </MDTypography>
                      <Select
                        // defaultValue={[colourOptions[2], colourOptions[3]]}
                        isMulti
                        name="colors"
                        options={userx}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleOnSelect}
                      />
                      {/* <option>--Select Approver--</option>
                      {userx.map((apic) => (
                        <div key={apic.personal.id} className="mb-3">
                          <option>
                            {apic.personal.fname} {apic.personal.lname}
                          </option>
                        </div>
                      ))} */}
                      {/* </Select> */}
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
                        // defaultValue={[colourOptions[2], colourOptions[3]]}
                        isMulti
                        name="colors"
                        options={userx}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleOnSelect2}
                      />
                      {/* <option>--Select Approver--</option>
                      {userx.map((apic) => (
                        <div key={apic.personal.id} className="mb-3">
                          <option>
                            {apic.personal.fname} {apic.personal.lname}
                          </option>
                        </div>
                      ))} */}
                      {/* </Select> */}
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
              {/* <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={handleValidate} color="info" width="50%">
                Save
              </MDButton>
            </MDBox> */}
            </MDBox>
          </MDBox>
        </Card>
        {/* <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="1">
          <Accordion.Header>Add Single Individual Client</Accordion.Header>
          <Accordion.Body>
            <Paper elevation={3}>
              <br />
              <MDBox pt={3} pb={2} px={20}>
                <MDBox mx={2} mt={-3} p={2} mb={1} textAlign="center">
                  <MDBox component="form" role="form">
                    {/* <MDBox>
                <Container>
                  <div className="col-sm-12">
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Select Participants</Typography>
                      </AccordionSummary>
                      <Form>
                        {userx.map((api) => (
                          <div key={api.personal.id} className="mb-3">
                            <Form.Check.Input
                              type="checkbox"
                              // defaultChecked={checked}
                              //   onClick={(e) => applicant(e, api)}
                            />
                            <Form.Check.Label>
                              &nbsp;{api.personal.fname} {api.personal.lname}
                            </Form.Check.Label>
                          </div>
                        ))}
                      </Form>
                    </Accordion>
                  </div>
                </Container>
                        </MDBox> 
                    <MDBox mb={0}>
                      <Container>
                        <div className="row">
                          <div className="col-sm-5">
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
                          </div>
                          <div className="col-sm-5">
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
                          </div>
                        </div>
                      </Container>
                    </MDBox>
                    <br />
                    <MDBox mb={0}>
                      <Container>
                        <div className="row">
                          <div className="col-sm-5">
                            <TextField
                              label="Start Amount *"
                              type="number"
                              value={startAmountx}
                              // onKeyUp={handleOnAmountKeys}
                              onChange={(e) => setStartAmount(e.target.value)}
                            />
                          </div>
                          <div className="col-sm-5">
                            <TextField
                              label="End Amount *"
                              type="number"
                              value={endAmountx}
                              // onKeyUp={handleOnTaxAmountKeys}
                              onChange={(e) => setEndAmount(e.target.value)}
                            />
                          </div>
                        </div>
                      </Container>
                    </MDBox>
                    <br />
                    <MDBox>
                      <Container>
                        <div className="col-sm-12">
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography>Select</Typography>
                            </AccordionSummary>
                            <Form>
                              {userx.map((api) => (
                                <div key={api.personal.id} className="mb-3">
                                  <Form.Check.Input
                                    type="checkbox"
                                    // defaultChecked={checked}
                                    //   onClick={(e) => applicant(e, api)}
                                  />
                                  <Form.Check.Label>
                                    &nbsp;{api.personal.fname} {api.personal.lname}
                                  </Form.Check.Label>
                                </div>
                              ))}
                            </Form>
                          </Accordion>
                        </div>
                      </Container>
                    </MDBox>
                    <br />
                    <MDBox style={{ paddingBottom: "5px" }}>
                      <Button onClick={handleFilter} variant="success">
                        Upload
                      </Button>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Paper>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
        <br />
        {/* <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Filter Other Inflow</Accordion.Header>
            <Accordion.Body>
              <Paper elevation={3}>
                <br />
                <MDBox mb={0}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-5">
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
                      </div>
                      <div className="col-sm-5">
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
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <br />
                <MDBox mb={0}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-5">
                        <TextField
                          label="Start Amount *"
                          type="number"
                          value={startAmountx}
                          // onKeyUp={handleOnAmountKeys}
                          onChange={(e) => setStartAmount(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-5">
                        <TextField
                          label="End Amount *"
                          type="number"
                          value={endAmountx}
                          // onKeyUp={handleOnTaxAmountKeys}
                          onChange={(e) => setEndAmount(e.target.value)}
                        />
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <br />
                <MDBox style={{ paddingBottom: "5px" }}>
                  <Button onClick={handleFilter} variant="success">
                    Upload
                  </Button>
                </MDBox>
              </Paper>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion> */}
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
export default FilterOtherInflow;
