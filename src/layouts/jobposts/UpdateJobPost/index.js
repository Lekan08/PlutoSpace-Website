import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Chip from "@mui/material/Chip";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import TimePicker from "react-bootstrap-time-picker";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import "../Force.css";
import { EditorState } from "draft-js";
import { convertFromHTML } from "draft-convert";
import { stateToHTML } from "draft-js-export-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

function UpdateJobPost() {
  const [deletex, setDeletex] = useState(0);
  const [createx, setCreatex] = useState(0);
  const [titlex, setTitlex] = useState("");
  const [locationx, setLocationx] = useState("");
  const [opening, setOpening] = useState("");
  const [closing, setClosing] = useState("");
  const [salaryx, setSalaryx] = useState("");
  const [workflowIDx, setWorkflowID] = useState("");
  const [statusx, setStatusx] = useState("");
  const [industryx, setIndustryx] = useState("");
  const [keywordx, setKeywordx] = useState("");
  const [newword, setNewword] = useState([]);
  const [workflow, setWorkflow] = useState([]);
  const [opened, setOpened] = useState(false);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const htmlForDesc = stateToHTML(editorState.getCurrentContent());
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const changeClosingDate = (timestamp) => {
    const date = new Date(timestamp);
    // eslint-disable-next-line no-use-before-define
    setClosing(changeDateandTime(date));
    console.log(date);
  };
  const changeOpeningDate = (timestamp) => {
    const date = new Date(timestamp);
    console.log(date);
    // eslint-disable-next-line no-use-before-define
    setOpening(changeDateandTime(date));
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

  //                  force sign out if no orgID
  useEffect(() => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    if (id === null) {
      navigate("/authentication/sign-in");
    }
    const verify = JSON.stringify(localStorage.getItem("user1"));
    if (verify === "null" || verify === null) {
      navigate("/authentication/sign-in");
    }
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/jobPost/getByIds/${id}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
        console.log(result);
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
          const del = Number(JSON.stringify(result[0].deleteFlag));
          setDeletex(del);
          const creat = Number(JSON.stringify(result[0].createdTime));
          setCreatex(creat);
          const htt = JSON.stringify(result[0].description);
          const rmvstring = htt.replace(/"/g, "");
          const editorStatex = EditorState.createWithContent(convertFromHTML(rmvstring));
          setEditorState(editorStatex);
          result.map((idk) => setTitlex(idk.title));
          result.map((idk) => setTitlex(idk.title));
          result.map((idk) => setLocationx(idk.location));
          result.map((idk) => setStatusx(idk.jobStatus));
          result.map((idk) => setIndustryx(idk.industry));
          result.map((idk) => setSalaryx(idk.salaryExpectation));
          result.map((idk) => setNewword(idk.keywords));
          // const toName = result.workflowID;
          // console.log(toName);
          // if (toName === workflow.id) {
          //   setWorkflowID(workflow.name);
          // }
          console.log(result);
          // eslint-disable-next-line array-callback-return
          setWorkflowID(result[0].workflowID);
          console.log(result[0].workflowID);
          changeClosingDate(result[0].closingTime);
          changeOpeningDate(result[0].openingTime);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  //   useEffect(() => {
  //     const p = Number(JSON.stringify(result[0].createdTime));
  //     const pconv = new Date(p).toLocaleDateString("en-US");
  //     const c = Number(JSON.stringify(result[0].closingTime));
  //     const cconv = new Date(c).toLocaleDateString("en-US");
  //     if (isMounted) {
  //       console.log(pconv);
  //       console.log(cconv);
  //       console.log(String(cconv));
  //       //   setOpening(pconv);
  //       setClosing(String(cconv));
  //       result.map((idk) => setTitlex(idk.title));
  //       result.map((idk) => setTitlex(idk.title));
  //       result.map((idk) => setLocationx(idk.location));
  //       result.map((idk) => setStatusx(idk.jobStatus));
  //       result.map((idk) => setIndustryx(idk.industry));
  //       result.map((idk) => setSalaryx(idk.salaryExpectation));
  //       result.map((idk) => setNewword(idk.keywords));
  //     }
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);

  const handleUpdate = () => {
    const OpeningDate = new Date(opening).getTime();
    const ClosingDate = new Date(closing).getTime();
    const SalaryVal = Number(salaryx);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get("id");
    const descripx = htmlForDesc;
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      id: idx,
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
      deleteFlag: deletex,
      createdTime: createx,
      workflowID: workflowIDx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    fetch(`${process.env.REACT_APP_RAGA_URL}/jobPost/update`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultr) => {
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
          navigate(`/Job-Post`);
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

  // useEffect(() => {
  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_RAGA_URL}/workflow/gets/${orgIDs}`, { headers })
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
  //         setWorkflow(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

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
  const changeDateandTime = (timestamp) => {
    const date = new Date(timestamp);
    let month = "0";
    if (date.getMonth() + 1 < 10) {
      const mymonth = date.getMonth() + 1;
      month += mymonth;
    } else {
      const mymonth = date.getMonth() + 1;
      month = mymonth;
    }
    let day = "0";
    if (date.getDate() < 10) {
      day += date.getDate();
    } else {
      day = date.getDate();
    }
    const retDate = `${date.getFullYear()}-${month}-${day}`;

    let hour = "0";
    let minutes = "0";

    if (date.getHours() < 10) {
      hour += date.getHours();
    } else {
      hour = date.getHours();
    }

    if (date.getMinutes() < 10) {
      minutes += date.getMinutes();
    } else {
      minutes = date.getMinutes();
    }

    return `${retDate}T${hour}:${minutes}`;
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container>
        <Card>
          <Container>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                View Or Update Job Post
              </MDTypography>
            </MDBox>
            <br />
            <br />
            <Container>
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
            </Container>
          </Container>
          <br />
          <Container>
            <MDBox>
              <MDTypography
                variant="p"
                textAlign="center"
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
              <br />
              <br />
            </MDBox>
          </Container>
          <br />
          <hr />
          <MDBox textAlign="center">
            <MDTypography
              variant="p"
              textAlign="center"
              fontWeight="light"
              color="secondary"
              fontSize="60%"
            >
              Application Time
            </MDTypography>
            <Row>
              <Col>
                <Container>
                  <br />
                  <i className="required"> (required) </i> &nbsp;
                  <br />
                  <div className="col-sm-3" style={{ paddingLeft: "15vh" }}>
                    <TextField
                      id="datetime-local"
                      label="Posted *"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={opening}
                      onChange={(e) => {
                        setOpening(e.target.value);
                      }}
                    />
                  </div>
                </Container>
              </Col>
              <Col>
                <Container>
                  <br />
                  <i className="required"> (required) </i> &nbsp;
                  <br />
                  <div className="col-sm-3" style={{ paddingLeft: "15vh" }}>
                    <TextField
                      id="datetime-local"
                      label="Expires *"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={closing}
                      onChange={(e) => {
                        setClosing(e.target.value);
                      }}
                    />
                  </div>
                </Container>
              </Col>
            </Row>
            <br />
          </MDBox>
          <hr />
          <MDBox textAlign="center" mb={10}>
            <MDBox textAlign="center">
              <br />
              <br />
              <Row>
                <Col>
                  <MDTypography
                    variant="p"
                    textAlign="center"
                    fontWeight="bold"
                    color="secondary"
                    fontSize="90%"
                  >
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
              </Row>
            </MDBox>
            <br />
            <Container>
              <Container>
                <div className="row">
                  <div className="col-sm-6">
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
                  </div>
                  <div className="col-sm-6">
                    <MDTypography
                      variant="p"
                      textAlign="center"
                      fontWeight="regular"
                      color="secondary"
                      fontSize="90%"
                    >
                      <i className="optional"> (optional) </i>
                      <br />
                      Keywords <br />
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
                      value={workflowIDx}
                      onChange={(e) => setWorkflowID(e.target.value)}
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
            <MDButton
              textAlign="center"
              color="success"
              variant="gradient"
              onClick={handleUpdate}
              size="large"
            >
              Update Job Post
            </MDButton>
          </MDBox>
        </Card>
        <br />
      </Container>
      <br />
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
export default UpdateJobPost;
