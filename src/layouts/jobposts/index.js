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
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Chip from "@mui/material/Chip";
import Backdrop from "@mui/material/Backdrop";
// import GetJobPost from "layouts/jobposts/GetJobPost";
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
import Fade from "@mui/material/Fade";
import DatePicker from "react-datepicker";
import DataTable from "examples/Tables/DataTable";
import Icon from "@mui/material/Icon";

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
  const [items, setItems] = useState([]);

  const handleOpen = () => setOpen(true);
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

  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };
  const changeEndDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  const handleDisable = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f96d02",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };
        fetch(`${process.env.REACT_APP_RAGA_URL}/jobPost/delete/${id}`, requestOptions)
          .then((res) => res.json())
          .then((resx) => {
            if (resx.message === "Expired Access") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
            }
            if (resx.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
            }
            MySwal.fire({
              title: resx.status,
              type: "success",
              text: resx.message,
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
    });
  };

  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   overflow: "scroll",
  //   transform: "translate(-50%, -50%)",
  //   width: 400,
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
  // };

  const pColumns = [
    { Header: "Title", accessor: "title", align: "left" },
    { Header: "Industry ", accessor: "industry", align: "left" },
    { Header: "Job status ", accessor: "jobStatus", align: "left" },
    { Header: "Salary (NGN) ", accessor: "salaryExpectation", align: "left" },
    {
      Header: "Created ",
      accessor: "createdTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "Opens ",
      accessor: "openingTime",
      Cell: ({ cell: { value } }) => changeEndDate(value),
      align: "left",
    },
    // {
    //   Header: "Workflow ",
    //   accessor: "workflowID",
    //   Cell: ({ cell: { value } }) => changeIDtoName(value),
    //   align: "left",
    // },
    {
      Header: "actions",
      accessor: "id",
      // eslint-disable-next-line react/prop-types
      Cell: ({ cell: { value } }) => (
        <div
          style={{
            width: "100%",
            backgroundColor: "#f5f5f5",
            borderRadius: "2px",
          }}
        >
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <Icon sx={{ fontWeight: "light" }}>settings</Icon>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => navigate(`/Job-Post/View-Or-Update-Job-Post?id=${value}`)}
              >
                View /Update Job Post
              </Dropdown.Item>
              {/* <Dropdown.Item
                onClick={() => navigate(`/Job-Post/Get-Job-Post/GetApplication?id=${value}`)}
              >
                View Job Post
              </Dropdown.Item> */}
              <Dropdown.Item onClick={() => navigate(`/Job-Post/View-Applications?id=${value}`)}>
                View Applications
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => navigate(`/jobposts/GetJobPost/viewjobasHR?id=${value}`)}
              >
                view particular Job application history
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate(`/interview-Schedule?jobPostID=${value}`)}>
                Schedule Interview
              </Dropdown.Item>
              {/* <Dropdown.Item onClick={() => handleDelete(value)}>Delete</Dropdown.Item> */}
              <Dropdown.Item onClick={() => handleDisable(value)}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
      align: "left",
    },
  ];

  const handleCreatex = () => {
    const minCreatedx = new Date(minCreated).getTime();
    const maxCreatedx = new Date(maxCreated).getTime();
    const minClosex = new Date(minClose).getTime();
    const maxClosex = new Date(maxClose).getTime();
    const minSalary = Number(salarymin);
    const maxSalary = Number(salarymax);
    const isopen = selopen;
    setOpened(true);
    setOpen(false);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      title: titlex,
      location: locationx,
      closingDateStartTime: minClosex,
      closingDateEndTime: maxClosex,
      createdTimeStartTime: minCreatedx,
      createdTimeEndTime: maxCreatedx,
      minSalaryExpectation: minSalary,
      maxSalaryExpectation: maxSalary,
      jobStatus: statusx,
      industry: industryx,
      opened: isopen,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_RAGA_URL}/jobPost/getFiltered`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        if (result.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        console.log(result);
        setItems(result);
        setOpened(false);
      })
      .catch((error) => {
        setOpened(false);
        // alert(`Error ${error.length} : In Posting.`);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <Container> */}
      <Card>
        <MDBox pt={6} pb={2} px={10}>
          {/* <Container> */}
          <MDBox
            variant="gradient"
            // bgColor="info"
            style={Styles.boxSx}
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
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
            {/* <MDBox textAlign="center"> */}
            {/* <br /> */}
            {/* <br />
              <Row>
                <Col></Col>
              </Row>
            </MDBox> */}
            <MDBox textAlign="center" mb={10}>
              <MDBox textAlign="center">
                {/* <br /> */}
                {/* <br /> */}
                {/* <Row>
                  <Col>
                    <MDBox>
                      <Container>
                        
                      </Container>
                    </MDBox>
                  </Col> */}
                {/* <Col> */}
                <Container>
                  <div className="row">
                    <div className="col-sm-4">
                      <br />
                      <MDTypography
                        variant="p"
                        fontWeight="regular"
                        color="secondary"
                        fontSize="90%"
                      >
                        Job Status
                      </MDTypography>
                      <MDBox>
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
                      </MDBox>
                    </div>
                    <div className="col-sm-4">
                      <br />
                      <MDTypography
                        variant="p"
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
                    <div className="col-sm-4">
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
                {/* </Col> */}
                {/* </Row> */}
              </MDBox>
            </MDBox>
            <br />
            {/* <Container> */}
            <Container>
              <div className="row">
                <div className="col-sm-6">
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
                    {/* <br /> */}
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
            </Container>
            {/* </Container> */}
          </MDBox>
          <MDBox textAlign="center" p={5}>
            <MDButton
              /* color="success" */ style={Styles.buttonSx}
              variant="gradient"
              onClick={handleCreate}
              size="large"
            >
              Create Job Post
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
      {/* <br />
      </Container> */}
      <br />
      <MDBox textAlign="center" p={5}>
        <MDButton
          /* color="success" */ style={Styles.buttonSx}
          variant="gradient"
          onClick={handleOpen}
          size="large"
        >
          Get Job Post
        </MDButton>
      </MDBox>
      {/* <GetJobPost /> */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              border: "3px solid #000",
              borderRadius: "10px",
              boxShadow: 24,
              py: 4,
            }}
          >
            {/* <MDTypography variant="h6" component="h2" sx={{ px: 4 }}>
              Lorem ipsum
            </MDTypography> */}
            <MDTypography
              component="div"
              sx={{ px: 4, mt: 2, maxHeight: "50vh", overflowY: "auto" }}
            >
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
              <MDBox>
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
                  <Col sm={4}>
                    {/* <br /> */}
                    <i className="required"> (required) </i>
                    <br />
                    <MDTypography
                      variant="p"
                      textAlign="center"
                      fontWeight="light"
                      color="secondary"
                      fontSize="50%"
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
                  <Col sm={2} />
                  <Col sm={4}>
                    {/* <br /> */}
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
                  <Col sm={4}>
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
                  <Col sm={2} />
                  <Col sm={4}>
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
              <MDBox textAlign="center" mb={8}>
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
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <Row>
                    <Col sm={12}>
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
                    </Col>
                  </Row>
                </Container>
              </MDBox>
              <MDBox textAlign="center" p={-2}>
                <MDButton
                  textAlign="center"
                  color="success"
                  variant="gradient"
                  onClick={handleCreatex}
                  size="large"
                >
                  Get Job Posts
                </MDButton>
              </MDBox>
            </MDTypography>
            {/* <MDTypography
              component="div"
              sx={{ px: 4, mt: 2, maxHeight: "50vh", overflowY: "auto" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat vulputate
              nisl. Nulla scelerisque tempor neque ut facilisis. Aenean sed aliquet est. Maecenas
              aliquam tincidunt neque, et placerat ipsum feugiat a. Cras porta laoreet dui a
              feugiat. In eget ipsum ut elit ultricies elementum. Vivamus mattis ultricies pulvinar.
              In interdum dolor eu commodo fermentum. Suspendisse vitae sem at eros faucibus
              condimentum quis vel libero. Mauris non erat neque. Nunc facilisis lacus at purus
              pharetra lobortis. Duis et tempor elit. Phasellus mattis eget eros ac dignissim.
              Praesent eu erat aliquam, fringilla mauris ut, vehicula quam. Aliquam iaculis feugiat
              quam id gravida. Etiam eget ullamcorper erat, eu malesuada nisl. Nunc mollis vulputate
              quam nec iaculis. Morbi molestie tortor ac nisl aliquam, sed venenatis dolor
              vestibulum. Vestibulum a lorem ut tortor iaculis vehicula sit amet nec nibh. Duis
              vehicula rhoncus pulvinar. Sed eget lacus quis sapien scelerisque lobortis. Donec
              aliquam tortor vel massa placerat, quis sollicitudin magna vestibulum. Nullam nisl
              leo, pretium id condimentum at, auctor a lectus. Aenean pharetra orci eros, sed mattis
              ipsum sollicitudin sit amet. Ut dictum volutpat mauris, a lacinia purus interdum
              vitae. In rhoncus lorem quis massa finibus, eu ornare nulla sollicitudin. Cras
              vulputate tortor eu ante viverra, eget sodales nibh sollicitudin. Quisque tincidunt
              suscipit libero id egestas. Mauris vitae lorem congue, blandit orci sed, finibus diam.
              Nunc auctor, neque eget interdum laoreet, est tortor volutpat purus, ac sollicitudin
              mi nibh ac nulla. Aliquam id egestas lacus. Morbi purus nibh, scelerisque in
              consectetur sit amet, vestibulum eget felis. In aliquam mollis quam, nec faucibus
              velit aliquam sed. Praesent finibus tortor vel diam consectetur scelerisque. Nunc
              vitae metus condimentum, dignissim nibh id, elementum tortor. Morbi quis mauris urna.
              Maecenas rutrum auctor sodales. Quisque augue enim, pharetra at nisl ac, aliquet
              dictum diam. In hac habitasse platea dictumst. Cras interdum faucibus odio sodales
              fermentum. Praesent iaculis auctor lectus, non scelerisque mauris varius ut.
              Suspendisse potenti. Pellentesque rutrum iaculis sagittis. Sed auctor sagittis augue
              sit amet faucibus. Aenean turpis nisi, rutrum nec mauris eget, suscipit pretium arcu.
              Quisque pretium, dolor ac placerat mollis, lorem arcu faucibus lectus, eu suscipit
              quam est ut ligula. Ut leo nunc, auctor vel augue nec, efficitur tempor nibh.
              Phasellus vitae metus eu sapien imperdiet bibendum vel id mauris. Sed non purus
              consectetur, malesuada est vitae, mattis turpis. Fusce volutpat lacinia dui, eget
              laoreet eros blandit nec. Donec pharetra vestibulum mauris quis imperdiet. Etiam
              accumsan vitae massa eget scelerisque. Vestibulum molestie sem ut consectetur
              ultrices. Pellentesque tempor sem imperdiet, vulputate magna a, euismod massa. Donec
              pharetra nibh non consequat auctor. Morbi lorem ex, vestibulum scelerisque porta in,
              auctor eu nisl. Phasellus fermentum ante eu mi vehicula, euismod porttitor quam
              lacinia. Phasellus eget diam in nisl feugiat tincidunt. Nullam accumsan tristique
              massa, sit amet lobortis sapien semper vel. Quisque at laoreet massa. Proin a lacinia
              leo. Nulla et diam magna. Phasellus vulputate lectus ut quam viverra, nec rutrum ex
              volutpat. Suspendisse feugiat leo sapien, ac elementum nulla semper at. Integer turpis
              lectus, vehicula in nunc eget, dapibus posuere mi. Suspendisse suscipit ex augue, sit
              amet tristique magna iaculis a. Aenean semper efficitur dolor, quis imperdiet sapien
              condimentum eu. Praesent in maximus velit. Morbi ultrices dictum vestibulum. Cras
              faucibus sagittis lacus eget commodo. Praesent sed rutrum risus. Donec auctor enim mi,
              vel vestibulum odio tempus ut. Phasellus ultricies pretium nisi eget consectetur.
              Vestibulum a pulvinar enim. Duis in ligula in dui cursus lacinia at nec urna. Praesent
              consectetur magna at ligula imperdiet convallis. Nunc aliquet congue est eu ornare.
              Quisque nisl velit, dapibus ac nibh ut, cursus volutpat libero. Duis tristique sapien
              ut dictum congue. Curabitur porttitor vehicula libero ut pretium. Nullam interdum
              velit non nulla gravida, at sagittis nisi placerat. Fusce convallis eros est, ac
              maximus enim vulputate vitae. Nam scelerisque, quam et aliquet suscipit, mauris enim
              porttitor ligula, ac porta dui tortor posuere lacus. Nunc venenatis finibus ligula,
              sit amet feugiat tellus porta aliquet. Mauris placerat nibh enim, dignissim convallis
              enim volutpat nec. Integer efficitur dignissim dui in sollicitudin. Nullam ac justo
              vulputate, ultrices odio a, semper neque. Cras aliquet quis nulla quis varius. Etiam
              dapibus hendrerit fermentum. Vivamus sagittis ligula arcu, eu posuere metus mattis ac.
              Sed tristique quam mi, quis egestas nunc congue quis. Nulla nibh neque, rhoncus sed
              quam quis, placerat aliquam lacus. Nam mollis et arcu id fringilla. Nam elementum sit
              amet nisl sed elementum. Vestibulum metus lacus, pharetra vel urna nec, vestibulum
              lobortis felis. Donec ac libero fermentum, ultricies tellus et, blandit dolor. Vivamus
              vel mauris vitae elit imperdiet tristique ut sit amet ligula. Aenean pellentesque vel
              nisi sed dictum. Sed vitae elit tortor. Mauris a efficitur massa. Aenean quam sapien,
              gravida et fringilla quis, porta nec lorem. In ac elementum nunc. Curabitur
              sollicitudin a arcu non condimentum. Donec at faucibus nulla. Etiam id iaculis mi.
              Mauris ac nulla in tellus dapibus venenatis. Nulla luctus viverra lacus, sed accumsan
              lacus malesuada non. Maecenas at magna sem. Duis vel massa ut risus hendrerit
              consectetur sed ac erat. Aliquam vulputate venenatis nulla sit amet faucibus. Donec
              mattis arcu non pretium dignissim. Aliquam maximus justo in sem dictum, sed imperdiet
              lectus rhoncus. Praesent ante nulla, maximus sit amet sodales ut, posuere a arcu. Sed
              ex est, varius nec ipsum et, efficitur tempor leo. Ut sit amet aliquam erat. Donec
              gravida porta dolor ut fringilla. Praesent at ligula ac sapien efficitur semper. Nam
              sed mi congue, maximus elit et, vulputate dolor. Cras convallis ligula libero, at
              varius erat interdum quis. Cras sagittis posuere dolor, at consequat lectus
              consectetur in. Integer quis est tristique, fringilla leo ac, placerat orci. Sed
              maximus eros sit amet mattis placerat. Etiam a dapibus mauris, ac tincidunt leo.
              Aliquam porta risus quis eros tempor laoreet. Cras et dui non turpis commodo
              consequat. Nunc metus justo, tristique sit amet lacinia eu, vestibulum sed risus. Sed
              ut nisl vitae ante maximus placerat sit amet id libero. Donec rutrum ipsum quis magna
              efficitur euismod. Quisque suscipit vulputate accumsan. Curabitur diam diam, elementum
              at sapien a, congue interdum est. Aliquam erat volutpat. Curabitur dapibus et quam sed
              hendrerit. Phasellus gravida lectus dolor, nec accumsan neque fermentum a. Morbi
              mauris leo, venenatis non est id, lobortis gravida diam. Donec sit amet condimentum
              mauris, vel pellentesque sem. Fusce eget quam facilisis, tincidunt felis commodo,
              mattis diam. Integer sem sem, interdum ut tincidunt vitae, tempus eleifend risus.
              Praesent non varius eros. Cras molestie, neque luctus tincidunt ornare, tellus libero
              tincidunt massa, at facilisis nibh velit eu nisi. Nunc augue ex, efficitur ac velit a,
              gravida vestibulum ex. Aenean dapibus eu elit rhoncus aliquam. Duis tincidunt, ex vel
              posuere feugiat, sapien metus scelerisque nisl, et consectetur velit nisi a enim.
              Maecenas id blandit elit. Nunc gravida tellus eget posuere finibus. Etiam elementum
              congue nibh, eu sodales nibh fermentum sed. Proin pharetra ultrices viverra. Nullam in
              semper dui, ut vehicula est. Duis mollis ornare velit a suscipit. Nullam faucibus sem
              eget odio posuere luctus. Proin id iaculis ante. Quisque lectus arcu, tempus at eros
              et, dapibus consequat dui. Suspendisse id vulputate sem. Phasellus feugiat facilisis
              elit, vitae varius mi dapibus vitae. Aenean purus nisi, rutrum venenatis diam et,
              mollis faucibus augue. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Nunc bibendum massa in dolor sagittis rutrum. Praesent
              laoreet libero vel bibendum efficitur. Maecenas commodo a nunc eu ullamcorper.
              Pellentesque eget metus leo. Quisque a lacus gravida, fringilla nisl eget, blandit
              quam. Nunc pulvinar nibh aliquam imperdiet porttitor. In sodales imperdiet vulputate.
              Curabitur accumsan turpis et est blandit, vel suscipit dui tempus. Quisque tristique
              tellus a magna hendrerit, vel finibus augue interdum. Donec maximus nisi vitae lacus
              fringilla dictum. Sed congue consectetur mauris at laoreet. Sed quis dolor quis odio
              elementum malesuada. Nullam porta, nulla eu egestas suscipit, tortor nulla suscipit
              dui, eget rhoncus neque metus a magna. Sed ac egestas urna. Morbi viverra, felis quis
              feugiat cursus, odio neque laoreet lacus, a vehicula sem ipsum eget neque. Curabitur
              condimentum a justo et egestas. Sed sodales vehicula dolor ut convallis. Vivamus
              hendrerit, nulla in hendrerit tincidunt, lorem lacus ultrices sem, vel imperdiet quam
              nunc ornare nisi. Nulla at nibh leo. Pellentesque eu tellus libero. Duis vel nisl
              ante. In id augue sit amet justo suscipit molestie. Pellentesque ac erat in eros
              tincidunt placerat quis a risus. Ut mauris metus, mattis in lorem nec, cursus interdum
              eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas. Nam in iaculis orci. Vivamus fermentum condimentum leo, porta
              imperdiet augue. Nunc efficitur eros eget blandit vestibulum. Quisque pulvinar id leo
              id eleifend. Donec molestie molestie ante, at pretium lacus aliquet sed. Vestibulum
              viverra felis vel ligula rhoncus pretium. Pellentesque vitae mattis velit. Nullam
              consectetur cursus rutrum. Quisque eget mauris id velit convallis lobortis. Quisque
              cursus ipsum et justo suscipit molestie. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Sed quis scelerisque erat, non
              pharetra magna. Integer quis pulvinar lorem. Mauris sed facilisis orci. Maecenas
              tempor nisl sed diam rutrum, eu pulvinar odio gravida. Class aptent taciti sociosqu ad
              litora torquent per conubia nostra, per inceptos himenaeos. In efficitur vestibulum
              ante quis viverra. Vestibulum hendrerit posuere arcu molestie elementum. Aenean
              condimentum mollis justo, semper scelerisque est gravida id. Mauris leo ex, efficitur
              sit amet leo vitae, posuere porta tellus. Sed ut magna sit amet urna fringilla rutrum.
              Sed sodales feugiat turpis, vel suscipit dolor lacinia nec. Nullam fringilla ut felis
              et vestibulum. Phasellus est magna, dignissim eget mi et, ullamcorper varius tellus.
              In nec gravida orci. Cras fringilla sapien sed sollicitudin maximus. Aliquam vel
              posuere lorem. Donec maximus venenatis turpis, quis luctus est convallis facilisis.
              Nullam elementum dui in elit commodo, quis porttitor orci sodales. Sed sed sagittis
              dui. Aenean vitae placerat elit. Phasellus risus nulla, posuere et arcu vel, molestie
              varius justo. Donec tempus arcu ac metus iaculis tristique. Fusce eu vehicula augue,
              ut vehicula ipsum. Suspendisse commodo lacinia eros ac fringilla. Nunc dapibus nec
              turpis eu vehicula. Suspendisse blandit interdum ex, id mollis ipsum euismod ac.
              Integer nec lacus sit amet leo egestas euismod. Suspendisse ante nulla, vestibulum
              eget laoreet ac, rhoncus et quam. Proin nec massa ut mi vehicula varius id vitae
              libero. Vestibulum molestie eros vitae eros tincidunt, scelerisque tincidunt sem
              sollicitudin. Duis consectetur leo ac mi faucibus sodales. Nam purus odio, sodales
              quis neque non, scelerisque vehicula enim. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Donec ipsum sapien, cursus quis
              sem at, fermentum semper tortor. Mauris porttitor faucibus justo, id ultrices quam
              pellentesque in. Morbi ac enim vel augue fermentum suscipit non sit amet leo. In a
              lorem quis orci auctor rhoncus. Quisque sapien est, tristique ut elementum et, blandit
              vitae urna. Maecenas vitae auctor nisi, et molestie ligula. Fusce congue volutpat
              lorem, eget porttitor libero sagittis nec. Cras eu imperdiet arcu. Cras pretium nisl
              vel magna mattis, in volutpat augue cursus. Vivamus eu velit at lacus faucibus
              laoreet. In condimentum, neque in iaculis fringilla, tortor odio cursus arcu, eget
              gravida dolor risus nec massa. Aliquam aliquam dolor eget venenatis iaculis.
              Pellentesque nulla augue, rhoncus sit amet euismod quis, pulvinar at orci. Donec sed
              velit ut turpis fringilla condimentum nec vitae ante. Etiam pulvinar venenatis est,
              sed molestie ipsum. Vestibulum malesuada leo magna, tempor euismod dolor fringilla ut.
              Etiam pulvinar convallis libero. Nulla ut fringilla elit. Nullam in ante id ligula
              volutpat laoreet. Vivamus rhoncus est eget mollis facilisis.
            </MDTypography> */}
          </Box>
        </Fade>
      </Modal>
      <MDBox>
        <DataTable
          table={{ columns: pColumns, rows: items }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox>
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
