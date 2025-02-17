import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { Form, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import MDButton from "components/MDButton";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import AddDetailsData from "layouts/timeofftype/addDetailsToTimeOffType/adddetailstable";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";
import { useNavigate } from "react-router-dom";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import MDInput from "components/MDInput";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Styles from "styles";

function AddTimeOffType() {
  const MySwal = withReactContent(Swal);
  const { columns: pColumns, rows: pRows } = AddDetailsData();

  const [position, setPosition] = useState([]);
  const [branch, setBranch] = useState([]);
  const [statusmap, setStatusmap] = useState([]);
  const [department, setDepartment] = useState([]);
  const [companyRole, setCompanyRole] = useState([]);

  const [numofdaysx, setNumofdaysx] = useState("0");
  const [allTOTGVal, setAllTOTGVal] = useState("");
  const [allTOTGs, setAllTOTGs] = useState([]);
  const [typeValue, setTypeValue] = useState("");

  const [opened, setOpened] = useState(false);
  // const [checkedName, setCheckedName] = useState("");
  // const [enabled, setEnabled] = useState("");

  const genderx = [
    {
      id: "1",
      name: "Male",
    },
    {
      id: "2",
      name: "Female",
    },
  ];
  // const [numofdays, setNumofdays] = useState("");
  // const [enabled, setEnabled] = useState("");
  // const [checkedNumbers, setCheckedNumbers] = useState("");

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const data11 = JSON.parse(localStorage.getItem("user1"));
  const orgIDs = data11.orgID;

  const handleonChangeTimeOffTime = (e) => {
    setTypeValue(e.target.value);
    const idTOT = e.target.value;
    if (idTOT === "1") {
      setAllTOTGs(genderx);
    } else if (idTOT === "2") {
      setAllTOTGs(position);
    } else if (idTOT === "3") {
      setAllTOTGs(branch);
    } else if (idTOT === "4") {
      setAllTOTGs(statusmap);
    } else if (idTOT === "5") {
      setAllTOTGs(department);
    } else if (idTOT === "6") {
      setAllTOTGs(companyRole);
    }
  };

  useEffect(() => {
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_KUBU_URL}/position/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultp) => {
        if (resultp.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultp.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultp.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          setPosition(resultp);

          fetch(`${process.env.REACT_APP_KUBU_URL}/branch/gets/${orgIDs}`, { headers })
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resultx) => {
              if (resultx.message === "Expired Access") {
                navigate("/authentication/sign-in");
              }
              if (resultx.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
              }
              if (resultx.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
              }
              if (isMounted) {
                setBranch(resultx);

                fetch(`${process.env.REACT_APP_KUBU_URL}/department/gets/${orgIDs}`, { headers })
                  .then(async (res) => {
                    const aToken = res.headers.get("token-1");
                    localStorage.setItem("rexxdex", aToken);
                    return res.json();
                  })
                  .then((resultd) => {
                    if (resultd.message === "Expired Access") {
                      navigate("/authentication/sign-in");
                    }
                    if (resultd.message === "Token Does Not Exist") {
                      navigate("/authentication/sign-in");
                    }
                    if (resultd.message === "Unauthorized Access") {
                      navigate("/authentication/forbiddenPage");
                    }
                    if (isMounted) {
                      setDepartment(resultd);
                    }

                    fetch(`${process.env.REACT_APP_KUBU_URL}/role/gets/${orgIDs}`, { headers })
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
                        if (isMounted) {
                          setCompanyRole(resultr);
                        }
                      });
                  });
              }
            });
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/status/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultp) => {
        if (isMounted) {
          setStatusmap(resultp);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = () => {
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    // const ids = JSON.parse([id]);

    const raw = JSON.stringify({
      orgID: orgIDs,
      timeOffTypeID: id,
      type: typeValue,
      name: allTOTGVal,
      value: numofdaysx,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_NSUTANA_URL}/timeofftype/details/add`, requestOptions)
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
        if (result.status === "SUCCESS") {
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          }).then(() => {
            window.location.reload();
          });
        } else {
          MySwal.fire({
            title: result.status,
            type: "success",
            text: result.message,
          });
        }
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

  const handleOnNumofdayskeysKeys = (e) => {
    e.preventDefault();
    const numbers = /^[0-9 ]+$/;
    if (!numofdaysx.match(numbers)) {
      // setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("numofdays").innerHTML = "Number Of Days - input only numbers<br>";
    }
    if (numofdaysx.match(numbers)) {
      // setCheckedName(true);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("numofdays").innerHTML = "";
      // setEnabled(checkedName === true);
      handleClick();
    }
    if (numofdaysx.length === 0) {
      // setCheckedName(false);
      // eslint-disable-next-line no-unused-expressions
      document.getElementById("numofdays").innerHTML = "Number Of Days is required<br>";
    }
    // setEnabled(checkedName === true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={4} pb={3} px={3}>
        <MDBox
          variant="gradient"
          // bgColor="info"
          borderRadius="lg"
          style={Styles.boxSx}
          // coloredShadow="info"
          mx={0}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            Add Detail
          </MDTypography>
          <MDTypography variant="gradient" fontSize="60%" color="error" id="numbers">
            {" "}
          </MDTypography>
        </MDBox>
        <MDBox
          variant="gradient"
          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          borderRadius="lg"
          coloredShadow="success"
          mx={3}
          mt={1}
          p={1}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="gradient" fontSize="60%" color="error" id="numofdays">
            {" "}
          </MDTypography>
        </MDBox>
        <Card>
          <Container>
            <div className="row">
              <div className="col-sm-6">
                <MDBox mb={2}>
                  <MDTypography variant="button" fontWeight="regular" color="text">
                    Type
                  </MDTypography>
                  <Form.Select
                    onChange={handleonChangeTimeOffTime}
                    aria-label="Default select example"
                  >
                    <option>---Select TimeOff Type---</option>
                    <option value="1">Gender Based</option>
                    <option value="2">Position Based</option>
                    <option value="3">Branch Based</option>
                    <option value="4">Status Based</option>
                    <option value="5">Department Based</option>
                    <option value="6">Company Status Based</option>
                  </Form.Select>
                </MDBox>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <MDBox mb={2}>
                  <MDTypography variant="button" fontWeight="regular" color="text">
                    Category
                  </MDTypography>
                  <Form.Select
                    value={allTOTGVal || ""}
                    onChange={(e) => setAllTOTGVal(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option value="">---Select Category---</option>
                    {allTOTGs.map((api) => (
                      <option key={api.id} value={api.name}>
                        {api.name}
                      </option>
                    ))}
                  </Form.Select>
                  <br />
                </MDBox>
              </div>
              <div className="col-sm-6">
                <MDInput
                  type="text"
                  value={numofdaysx || ""}
                  onChange={(e) => setNumofdaysx(e.target.value)}
                  // onKeyUp={handleOnNumofdayskeysKeys}
                  label="Number Of Days"
                  variant="standard"
                  fullWidth
                />
              </div>
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  onClick={(e) => handleOnNumofdayskeysKeys(e)}
                  disabled={numofdaysx === "" || allTOTGVal === "" || (typeValue === "" && true)}
                  // color="info"
                  style={Styles.buttonSx}
                  width="50%"
                >
                  Save
                </MDButton>
              </MDBox>
            </div>
          </Container>
        </Card>
        &nbsp;
        {/* <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              onClick={handleClick}
              disabled={!enabled}
              color="info"
              width="50%"
            >
              Save
            </MDButton>
          </MDBox> */}
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

export default AddTimeOffType;
