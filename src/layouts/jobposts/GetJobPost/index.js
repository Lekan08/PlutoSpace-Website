import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Form, Row, Col, ButtonGroup, ToggleButton, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import "../Force.css";
import { useNavigate } from "react-router-dom";

function GetJobPost() {
  const [titlex, setTitlex] = useState("");
  const [locationx, setLocationx] = useState("");
  const [minCreated, setMinCreated] = useState(0);
  const [maxCreated, setMaxCreated] = useState(0);
  const [minClose, setMinClosed] = useState(0);
  const [maxClose, setMaxClosed] = useState(0);
  const [opened, setOpened] = useState(false);
  const [salarymin, setSalarymin] = useState("");
  const [salarymax, setSalarymax] = useState("");
  const [statusx, setStatusx] = useState("");
  const [industryx, setIndustryx] = useState("");
  const navigate = useNavigate();
  const [selopen, setSelopen] = useState(false);
  const [selclose, setSelclose] = useState(true);
  const [sellopen, setSellopen] = useState(false);
  const [items, setItems] = useState([]);
  // const [workflow, setWorkflow] = useState([]);
  const MySwal = withReactContent(Swal);

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
  // eslint-disable-next-line consistent-return
  // const changeIDtoName = (toName) => {
  //   console.log(toName);
  //   console.log(workflow);
  //   if (workflow.id === toName) {
  //     return workflow.name;
  //   }
  //   if (workflow.id === !toName) {
  //     return "";
  //   }
  // };

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

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const handleCreate = () => {
    const minCreatedx = new Date(minCreated).getTime();
    const maxCreatedx = new Date(maxCreated).getTime();
    const minClosex = new Date(minClose).getTime();
    const maxClosex = new Date(maxClose).getTime();
    const minSalary = Number(salarymin);
    const maxSalary = Number(salarymax);
    const isopen = selopen;
    setOpened(true);
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
        alert(`Error ${error.length} : In Posting.`);
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
  // const handleDelete = (valuex) => {
  //   const id = valuex;
  //   const GeneToken = localStorage.getItem("rexxdex1");
  //   const apiToken = localStorage.getItem("rexxdex");

  //   if (apiToken !== "null" && apiToken !== null) {
  //     localStorage.setItem("rexxdex1", apiToken);
  //   }
  //   const myxHeaders = new Headers();
  //   myxHeaders.append("Content-Type", "application/json");
  //   myxHeaders.append("Token-1", GeneToken);
  //   MySwal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#f96d02",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const requestOptions = {
  //         method: "DELETE",
  //         headers: myxHeaders,
  //       };
  //       console.log(requestOptions);
  //       fetch(`${process.env.REACT_APP_RAGA_URL}/jobPost/delete/${id}`, {
  //         requestOptions,
  //       })
  //         .then((res) => res.json())
  //         .then((resx) => {
  //           if (resx.message === "Expired Access") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (resx.message === "Token Does Not Exist") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (resx.message === "Unauthorized Access") {
  //             navigate("/authentication/forbiddenPage");
  //           }
  //           MySwal.fire({
  //             title: resx.status,
  //             type: "success",
  //             text: resx.message,
  //           }).then(() => {
  //             window.location.reload();
  //           });
  //         })
  //         .catch((error) => {
  //           MySwal.fire({
  //             title: error.status,
  //             type: "error",
  //             text: error.message,
  //           });
  //         });
  //     }
  //   });
  // };
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

  return (
    <Container>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={5}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Get Job Posts
          </MDTypography>
        </MDBox>
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
      </Card>
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
    </Container>
  );
}
export default GetJobPost;
