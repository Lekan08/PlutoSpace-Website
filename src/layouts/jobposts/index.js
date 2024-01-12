import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
// import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  ButtonGroup,
  ToggleButton,
  // Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Chip from "@mui/material/Chip";
import Backdrop from "@mui/material/Backdrop";
import GetJobPost from "layouts/jobposts/GetJobPost";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import PHeaders from "postHeader";
import "./Force.css";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Styles from "styles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DatePicker from "react-datepicker";

function JobPost() {
  const navigate = useNavigate();
  const { allGHeaders: miHeaders } = GHeaders();
  const [titlex, setTitlex] = useState("");
  const MySwal = withReactContent(Swal);
  const [locationx, setLocationx] = useState("");
  const [opening, setOpening] = useState("");
  const today = new Date();
  const [closing, setClosing] = useState("");
  const [salaryx, setSalaryx] = useState("");
  const [statusx, setStatusx] = useState("");
  const [industryx, setIndustryx] = useState("");
  const [keywordx, setKeywordx] = useState("");
  const [newword, setNewword] = useState([]);
  const [opened, setOpened] = useState(false);
  const [workflow, setWorkflow] = useState([]);
  const [workflowIDx, setTheWorkflowIDx] = useState("");
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const htmlForDesc = stateToHTML(editorState.getCurrentContent());
  const { allPHeaders: myHeaders } = PHeaders();
  const [open, setOpen] = React.useState(false);
  const [salarymin, setSalarymin] = useState("");
  const [salarymax, setSalarymax] = useState("");
  const [minClose, setMinClosed] = useState(0);
  const [maxClose, setMaxClosed] = useState(0);
  const [minCreated, setMinCreated] = useState(0);
  const [maxCreated, setMaxCreated] = useState(0);
  const [selopen, setSelopen] = useState(false);
  const [selclose, setSelclose] = useState(true);
  const [sellopen, setSellopen] = useState(false);

  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpened = () => {
    setSelopen(true);
    setSellopen(true);
    setSelclose(false);
  };
  const handleClosed = () => {
    setSelopen(false);
    setSelclose(true);
    setSellopen(false);
  };

  const handleCreate = () => {
    const OpeningDate = new Date(opening).getTime();
    const ClosingDate = new Date(closing).getTime();
    const SalaryVal = Number(salaryx);
    const descripx = htmlForDesc;
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      title: titlex,
      location: locationx,
      description: descripx,
      openingTime: OpeningDate,
      closingTime: ClosingDate,
      salaryExpectation: SalaryVal,
      jobStatus: statusx,
      industry: industryx,
      keywords: newword,
      workflowID: workflowIDx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_RAGA_URL}/jobPost/add`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultr) => {
        console.log(resultr);
        if (resultr.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultr.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultr.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        setOpened(false);
        MySwal.fire({
          title: resultr.status,
          type: "success",
          text: resultr.message,
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
  const handleKeyword = () => {
    if (keywordx === "" || keywordx === " ") {
      // eslint-disable-next-line no-unused-expressions
      null;
    } else {
      setNewword([...newword, keywordx]);
      setKeywordx("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleKeyword();
      setKeywordx("");
    }
  };
  const handleDelete = () => {
    const All = newword;
    All.pop();
    setNewword(All);
    setOpened(true);
    setTimeout(() => {
      setOpened(false);
    }, 1);
  };

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/workflow/gets/${orgIDs}`, { headers })
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
          setWorkflow(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const setOpeningTime = (timex) => {
    const time = new Date(timex);
    if (today.getTime() > time.getTime()) {
      MySwal.fire({
        title: "Invalid Time",
        type: "error",
        text: "Job Posting can only be opened from today",
      });
    } else setOpening(timex);
  };
  const setClosingTime = (timex) => {
    const time = new Date(timex);
    if (today.getTime() > time.getTime()) {
      MySwal.fire({
        title: "Invalid Time",
        type: "error",
        text: "Job Posting can only be Closed from today",
      });
    } else setClosing(timex);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    overflow: "scroll",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <Container> */}
      <Card>
        <MDBox pt={4} pb={3} px={5}>
          {/* <Container> */}
          <MDBox
            variant="gradient"
            // bgColor="info"
            style={Styles.boxSx}
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Create A Job Post
            </MDTypography>
          </MDBox>
          <br />
          <br />
          {/* <Container> */}
          <Row>
            <Col>
              <MDBox>
                <MDInput
                  type="text"
                  label="Title"
                  value={titlex || ""}
                  //   onKeyUp={handleOnTitleKeys}
                  onChange={(e) => setTitlex(e.target.value)}
                  variant="standard"
                  fullWidth
                />
              </MDBox>
            </Col>
            <Col>
              <MDBox>
                <MDInput
                  type="text"
                  label="Location"
                  value={locationx || ""}
                  //   onKeyUp={handleOnTitleKeys}
                  onChange={(e) => setLocationx(e.target.value)}
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <br />
            </Col>
          </Row>
          {/* </Container> */}
          {/* </Container> */}
          <br />
          {/* <Container> */}
          <MDBox>
            <MDTypography
              variant="p"
              fontWeight="medium"
              color="secondary"
              fontSize="90%"
              className="App-header"
            >
              Description
            </MDTypography>
            <br />
            <Editor
              editorState={editorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "fontFamily",
                  "list",
                  "textAlign",
                  "emoji",
                  "remove",
                  "history",
                ],
                inline: {
                  options: ["italic", "bold", "underline", "strikethrough", "monospace"],
                  bold: { className: "demo-option-custom" },
                  italic: { className: "demo-option-custom" },
                  underline: { className: "demo-option-custom" },
                  strikethrough: { className: "demo-option-custom" },
                  monospace: { className: "demo-option-custom" },
                },
                blockType: {
                  className: "demo-option-custom-wide",
                  dropdownClassName: "demo-dropdown-custom",
                },
                fontSize: { className: "demo-option-custom-medium" },
                list: {
                  inDropdown: false,
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined,
                  options: ["unordered", "ordered"],
                },
                textAlign: {
                  inDropdown: false,
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined,
                  options: [
                    "left",
                    "center",
                    "right",
                    // justify
                  ],
                },
              }}
              onEditorStateChange={setEditorState}
            />
            {/* <br /> */}
          </MDBox>
          {/* </Container> */}
          <hr />
          <MDBox textAlign="center">
            <MDTypography variant="p" fontWeight="light" color="secondary" fontSize="60%">
              Application Time
            </MDTypography>
            {/* <br /> */}
            <Row style={{ paddingLeft: "15vw", paddingTop: "5vh" }}>
              <Col>
                <div className="col-sm-3">
                  <TextField
                    id="datetime-local"
                    label="Posted *"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={opening}
                    onChange={(e) => {
                      console.log(e.target.value, opening);
                      setOpeningTime(e.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col>
                <div className="col-sm-3">
                  <TextField
                    id="datetime-local"
                    label="Expires *"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={closing}
                    onChange={(e) => {
                      console.log(e.target.value, opening);
                      setClosingTime(e.target.value);
                    }}
                  />
                </div>
              </Col>
            </Row>
            {/* <br /> */}
          </MDBox>
          <hr />
          <MDBox textAlign="center" mb={10}>
            <MDBox textAlign="center">
              <br />
              <br />
              <Row>
                <Col>
                  <MDTypography variant="p" fontWeight="bold" color="secondary" fontSize="90%">
                    <i className="optional"> (optional) </i>
                    <br />
                    Salary Expectation (NGN): <br />{" "}
                    <TextField
                      label="Amount "
                      type="number"
                      value={salaryx}
                      onChange={(e) => setSalaryx(e.target.value)}
                    />
                  </MDTypography>
                </Col>
                <Col>
                  <MDBox>
                    <Container>
                      <MDTypography
                        variant="p"
                        fontWeight="regular"
                        color="secondary"
                        fontSize="90%"
                      >
                        Job Status
                      </MDTypography>
                      <Form.Select
                        aria-label="Default select example"
                        value={statusx}
                        onChange={(e) => setStatusx(e.target.value)}
                      >
                        <option>--Job Status--</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Temporal">Temporal</option>
                        <option value="Seasonal">Seasonal</option>
                        <option value="Internship">Internship</option>
                        <option value="At Will">At Will</option>
                      </Form.Select>
                    </Container>
                  </MDBox>
                </Col>
              </Row>
            </MDBox>
            <br />
            <Container>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
                    <MDTypography variant="p" fontWeight="regular" color="secondary" fontSize="90%">
                      Industry
                    </MDTypography>
                    <MDBox>
                      <Form.Select
                        aria-label="Default select example"
                        value={industryx}
                        //
                        onChange={(e) => setIndustryx(e.target.value)}
                      >
                        <option>--Select Industry--</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Chemical Industry">Chemical Industry</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Construction">Construction</option>
                        <option value="Education">Education</option>
                        <option value="Financial Services">Financial Services</option>
                        <option value="Fisheries">Fisheries</option>
                        <option value="Food">Food</option>
                        <option value="Forestry">Forestry</option>
                        <option value="Health Services">Health Services</option>
                        <option value="Hotels">Hotels</option>
                        <option value="Metal Production">Metal Production</option>
                        <option value="Mining">Mining</option>
                        <option value="Mechanical and Electricitical Engineering">
                          Mechanical and Electrical Engineering
                        </option>
                        <option value="Media - Culture">Media - Culture</option>
                        <option value="Oil and Gas production">Oil and Gas production</option>
                        <option value="Postals and Telecommunication">
                          Postals and Telecommunication
                        </option>
                        <option value="Public Service">Public Service</option>
                        <option value="Shipping and Ports">Shipping and Ports</option>
                        <option value="Textiles"> Textiles, Clothing, Leather </option>
                        <option value="Transport: road, railways">
                          Transport (road, railways)
                        </option>
                        <option value="Transport Equipment Manufacturing">
                          Transport Equipment Manufacturing
                        </option>
                        <option value="utilities: water, gas, electricity">
                          Utilities:Water, Gas, Electricity
                        </option>
                        <option value="others">Others...</option>
                      </Form.Select>
                    </MDBox>
                  </div>
                  <div className="col-sm-6">
                    <MDTypography variant="p" fontWeight="regular" color="secondary" fontSize="90%">
                      <i className="optional"> (optional) </i>
                      <br />
                      Keywords
                      <br />
                      {newword.map((item) => (
                        <React.Fragment key={item}>
                          <Chip size="small" label={item} color="success" variant="outlined" />
                          &nbsp;
                        </React.Fragment>
                      ))}
                      <br /> <br />
                      <TextField
                        label="Add keywords "
                        type="text"
                        value={keywordx}
                        onChange={(e) => setKeywordx(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                      />
                    </MDTypography>
                    &nbsp;
                    <Button size="sm" variant="success" onClick={handleKeyword}>
                      Add
                    </Button>
                    &nbsp;
                    <Button size="sm" variant="danger" onClick={handleDelete}>
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <i className="optional" style={{ color: "red" }}>
                      {" "}
                      (required){" "}
                    </i>
                    <br />
                    Add to Workflow
                    <br />
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => setTheWorkflowIDx(e.target.value)}
                    >
                      <option>--Select Workflow--</option>
                      {workflow.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>
              </Container>
            </Container>
          </MDBox>
          <MDBox textAlign="center" p={5}>
            <MDButton color="success" variant="gradient" onClick={handleCreate} size="large">
              Create Job Post
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
      {/* <br />
      </Container> */}
      <br />
      {/* <MDBox textAlign="center" p={5}>
        <MDButton color="success" variant="gradient" onClick={handleOpen} size="large">
          Get Job Post
        </MDButton>
      </MDBox> */}
      <GetJobPost />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <GetJobPost /> */}
          <MDBox textAlign="center">
            <Container>
              <Row>
                <Col>
                  <MDInput
                    type="text"
                    label="Title"
                    value={titlex || ""}
                    //   onKeyUp={handleOnTitleKeys}
                    onChange={(e) => setTitlex(e.target.value)}
                    variant="standard"
                    fullWidth
                  />
                </Col>

                <Col>
                  <MDBox>
                    <MDInput
                      type="text"
                      label="Location"
                      value={locationx || ""}
                      //   onKeyUp={handleOnTitleKeys}
                      onChange={(e) => setLocationx(e.target.value)}
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                </Col>
              </Row>
            </Container>
          </MDBox>
          <hr />
          <MDBox textAlign="center">
            <MDTypography
              variant="p"
              textAlign="center"
              fontWeight="light"
              color="secondary"
              fontSize="60%"
            >
              Posted Date
            </MDTypography>
            <Row>
              <Col>
                <br />
                <i className="required"> (required) </i>
                <br />
                <MDTypography
                  variant="p"
                  textAlign="center"
                  fontWeight="light"
                  color="secondary"
                  fontSize="70%"
                >
                  Lowest Posted Date
                </MDTypography>
                <Container>
                  <DatePicker
                    placeholderText="MM/DD/YY"
                    style={{ marginRight: "2px" }}
                    selected={minCreated}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    onChange={(time) => setMinCreated(time)}
                  />
                </Container>
              </Col>
              <Col>
                <br />
                <i className="required"> (required) </i>
                <br />
                <MDTypography
                  variant="p"
                  textAlign="center"
                  fontWeight="light"
                  color="secondary"
                  fontSize="70%"
                >
                  Highest Posted Date
                </MDTypography>
                <Container>
                  <DatePicker
                    placeholderText="MM/DD/YY"
                    style={{ marginRight: "10px" }}
                    selected={maxCreated}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    onChange={(time) => setMaxCreated(time)}
                  />
                </Container>
              </Col>
            </Row>
            <br />
          </MDBox>
          <hr />
          <MDBox textAlign="center">
            <MDTypography
              variant="p"
              textAlign="center"
              fontWeight="light"
              color="secondary"
              fontSize="60%"
            >
              Expiry Date
            </MDTypography>
            <Row>
              <Col>
                <MDTypography
                  variant="p"
                  textAlign="center"
                  fontWeight="light"
                  color="secondary"
                  fontSize="70%"
                >
                  Lowest Expiry Date
                </MDTypography>
                <Container>
                  <DatePicker
                    placeholderText="MM/DD/YY"
                    style={{ marginRight: "2px" }}
                    selected={minClose}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    onChange={(time) => setMinClosed(time)}
                  />
                </Container>
              </Col>
              <Col>
                <MDTypography
                  variant="p"
                  textAlign="center"
                  fontWeight="light"
                  color="secondary"
                  fontSize="70%"
                >
                  Highest Expiry Date
                </MDTypography>
                <Container>
                  <DatePicker
                    placeholderText="MM/DD/YY"
                    style={{ marginRight: "10px" }}
                    selected={maxClose}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    onChange={(time) => setMaxClosed(time)}
                  />
                </Container>
              </Col>
            </Row>
            <br />
          </MDBox>
          <hr />
          <MDBox textAlign="center" mb={10}>
            <MDBox textAlign="center">
              <Row>
                <MDTypography
                  variant="p"
                  textAlign="center"
                  fontWeight="light"
                  color="secondary"
                  fontSize="60%"
                >
                  Salary Expectation Range
                </MDTypography>
                <br />
                <br />
                <Col>
                  <MDTypography
                    variant="p"
                    textAlign="center"
                    fontWeight="bold"
                    color="secondary"
                    fontSize="70%"
                  >
                    Minimum Salary Expectation (NGN): <br />
                    <TextField
                      label="Amount "
                      type="number"
                      value={salarymin}
                      onChange={(e) => setSalarymin(e.target.value)}
                    />
                  </MDTypography>
                </Col>
                <Col>
                  <MDTypography
                    variant="p"
                    textAlign="center"
                    fontWeight="bold"
                    color="secondary"
                    fontSize="70%"
                  >
                    Maximum Salary Expectation (NGN): <br />
                    <TextField
                      label="Amount "
                      type="number"
                      value={salarymax}
                      onChange={(e) => setSalarymax(e.target.value)}
                    />
                  </MDTypography>
                </Col>
              </Row>
            </MDBox>
            <br />
            <hr />
            <Container>
              <Row>
                <Col>
                  <MDBox>
                    <Container>
                      <MDTypography
                        variant="p"
                        textAlign="center"
                        fontWeight="regular"
                        color="secondary"
                        fontSize="90%"
                      >
                        Job Status
                      </MDTypography>
                      <Form.Select
                        aria-label="Default select example"
                        value={statusx}
                        onChange={(e) => setStatusx(e.target.value)}
                      >
                        <option>--Job Status--</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Temporal">Temporal</option>
                        <option value="Seasonal">Seasonal</option>
                        <option value="Internship">Internship</option>
                        <option value="At Will">At Will</option>
                      </Form.Select>
                    </Container>
                  </MDBox>
                </Col>
                <Col>
                  <MDTypography
                    variant="p"
                    textAlign="center"
                    fontWeight="regular"
                    color="secondary"
                    fontSize="90%"
                  >
                    Industry
                  </MDTypography>
                  <MDBox>
                    <Form.Select
                      aria-label="Default select example"
                      value={industryx}
                      // textAlign="center"
                      onChange={(e) => setIndustryx(e.target.value)}
                    >
                      <option>--Select Industry--</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Chemical Industry">Chemical Industry</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Construction">Construction</option>
                      <option value="Education">Education</option>
                      <option value="Financial Services">Financial Services</option>
                      <option value="Fisheries">Fisheries</option>
                      <option value="Food">Food</option>
                      <option value="Forestry">Forestry</option>
                      <option value="Health Services">Health Services</option>
                      <option value="Hotels">Hotels</option>
                      <option value="Metal Production">Metal Production</option>
                      <option value="Mining">Mining</option>
                      <option value="Mechanical and Electricitical Engineering">
                        Mechanical and Electrical Engineering
                      </option>
                      <option value="Media - Culture">Media - Culture</option>
                      <option value="Oil and Gas production">Oil and Gas production</option>
                      <option value="Postals and Telecommunication">
                        Postals and Telecommunication
                      </option>
                      <option value="Public Service">Public Service</option>
                      <option value="Shipping and Ports">Shipping and Ports</option>
                      <option value="Textiles"> Textiles, Clothing, Leather </option>
                      <option value="Transport: road, railways">Transport (road, railways)</option>
                      <option value="Transport Equipment Manufacturing">
                        Transport Equipment Manufacturing
                      </option>
                      <option value="utilities: water, gas, electricity">
                        Utilities:Water, Gas, Electricity
                      </option>
                      <option value="others">Others...</option>
                    </Form.Select>
                  </MDBox>
                </Col>
              </Row>
              <br />
              <br />
              <ButtonGroup>
                <ToggleButton
                  type="checkbox"
                  value={selopen}
                  onClick={handleOpened}
                  variant="outline-success"
                  checked={sellopen}
                >
                  Opened
                </ToggleButton>
                <ToggleButton
                  value={selopen}
                  onClick={handleClosed}
                  variant="outline-danger"
                  checked={selclose}
                  type="checkbox"
                >
                  Closed
                </ToggleButton>
              </ButtonGroup>
            </Container>
          </MDBox>
          <MDBox textAlign="center" p={5}>
            <MDButton
              textAlign="center"
              color="success"
              variant="gradient"
              onClick={handleCreate}
              size="large"
            >
              Get Job Posts
            </MDButton>
          </MDBox>
        </Box>
      </Modal>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
      <br />
      <Container>
        <Footer />
      </Container>
    </DashboardLayout>
  );
}
export default JobPost;
