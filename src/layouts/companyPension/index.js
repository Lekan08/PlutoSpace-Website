/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from "react";
// import MDButton from "components/MDButton";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import withReactContent from "sweetalert2-react-content";
import GHeaders from "getHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "examples/Tables/DataTable";
// import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Card } from "@mui/material";

// import TextWrapper from "react-text-wrapper";

export default function CompanyPensions() {
  const { allGHeaders: miHeaders } = GHeaders();
  // const { allPHeaders: myHeaders } = PHeaders();
  // const axios = require("axios");

  const [opened, setOpened] = useState(false);
  const [gets, setGets] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [items, setItems] = useState([]);
  const [userx, setUserx] = useState([]);
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    setOpened(true);
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
      .then(async (res) => res.json())
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
        // eslint-disable-next-line no-unused-vars
        const users = result;
        setUserx(users);
        fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/pensionProviders/gets/${orgIDs}`, {
          headers,
        })
          .then(async (res) => res.json())
          .then((resultr) => {
            const providers = resultr;
            fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/pensionIntegration/gets/${orgIDs}`, {
              headers,
            })
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                return res.json();
              })
              .then((resultp) => {
                if (isMounted) {
                  // console.log(userx);
                  const resultx = resultp;
                  const brand = [];
                  let i = 0;
                  // eslint-disable-next-line no-plusplus
                  for (i; i < users.length; i++) {
                    // eslint-disable-next-line no-loop-func
                    const findP = resultx.find((item) => item.empID === users[i].personal.id);
                    if (findP) {
                      const findPName = providers.find((item) => item.id === findP.providerID);
                      brand.push({
                        userName: `${users[i].personal.fname} ${users[i].personal.lname}`,
                        providerName: findPName.name,
                        empID: users[i].personal.id,
                        createdTime: findP.createdTime,
                        PID: findP.id,
                      });
                    } else {
                      brand.push({
                        userName: `${users[i].personal.fname} ${users[i].personal.lname}`,
                        providerName: "None",
                        empID: users[i].personal.id,
                        createdTime: "",
                        PID: "Null",
                      });
                    }
                  }

                  setItems(brand);
                  setOpened(false);
                }
              });
          });
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const handleDisable2 = (idx) => {
    const [filteredItems] = items.filter((item) => item.empID === idx);
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed === true) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };
        fetch(
          `${process.env.REACT_APP_JOHANNESBURG_URL}/pensionIntegration/delete/${filteredItems.PID}`,
          requestOptions
        )
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
  const handleUpdate = (value) => {
    const filteredItems = items.filter((item) => item.empID === value);
    navigate(`/user-pension-settings?id=${value}&name=${filteredItems[0].userName}`);
  };
  const handleAddPension = (value) => {
    window.sessionStorage.setItem("users", JSON.stringify(userx));
    const filteredItems = items.filter((item) => item.empID === value);
    navigate(`/company-pension/add-pension?id=${value}&name=${filteredItems[0].userName}`);
  };
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    if (timestamp === 0) return "Null";
    if (typeof timestamp === "string") return "Null";
    return retDate;
  };
  // const { allPHeaders: myHeaders } = PHeaders();
  // const axios = require("axios");
  const [items2, setItems2] = useState([]);
  // const [id, setId] = useState("");

  // Method to change date from timestamp
  const handleDisable22 = (id) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const createdByx = data11.personalID;
    const [filteredItems] = items2.filter((item) => item.id === id);
    console.log(filteredItems);
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed === true) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };
        fetch(
          `${process.env.REACT_APP_JOHANNESBURG_URL}/pensions/terminate/${id}/${createdByx}`,
          requestOptions
        )
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
            const [fname, lname] = filteredItems.integration.empName.split(" ");
            const requestOptions2 = {
              method: "DELETE",
              headers: miHeaders,
            };
            fetch(
              `${process.env.REACT_APP_TANTA_URL}/remunerationpackagesetup/deleteByName/${
                filteredItems.orgID
              }/${Number(filteredItems.integration.empID)}/${fname}_${lname}_PENSION_${id}`,
              requestOptions2
            )
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                return res.json();
              })
              .then((result2) => {
                setOpened(false);
                console.log(result2);
                if (result2.message === "Expired Access") {
                  console.log("/authentication/sign-in");
                  window.location.reload();
                }
                if (result2.message === "Token Does Not Exist") {
                  console.log("/authentication/sign-in");
                  window.location.reload();
                }
                if (result2.message === "Unauthorized Access") {
                  console.log("/authentication/forbiddenPage");
                  window.location.reload();
                }
              });
            MySwal.fire({
              title: resx.status,
              type: "success",
              text: resx.message,
            }).then(() => {
              // eslint-disable-next-line no-use-before-define
              handleGets();
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
  // eslint-disable-next-line consistent-return
  const handleGets = () => {
    if (start && end) {
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const strt = start.getTime();
      const ends = end.getTime();
      const orgIDs = data11.orgID;
      const headers = miHeaders;
      let isMounted = true;
      setOpened(true);
      fetch(
        `${process.env.REACT_APP_JOHANNESBURG_URL}/pensions/gets/${orgIDs}?startTime=${strt}&endTime=${ends}`,
        { headers }
      )
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
          if (isMounted) {
            console.log(result);
            setItems2(result);
            setGets(true);
            setOpened(false);
          }
        });
      return () => {
        isMounted = false;
      };
    }
  };
  const handleUpdate2 = (value) => {
    const [filteredItems] = items2.filter((item) => item.id === value);
    console.log(filteredItems.integration.empID);
    navigate(`/update-user-pension?id=${value}&pid=${filteredItems.integration.empID}`);
  };
  const handleView = (value) => {
    const [filteredItems] = items.filter((item) => item.empID === value);
    navigate(`/view-user-pension?id=${value}&name=${filteredItems.userName}`);
  };
  const handleStatus = (status) => {
    if (status === 0) return "PENDING";
    if (status === 1) return "PAID";
    if (status === 3) return "TERMINATED";
    return null;
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        mx={10}
        mt={2}
        p={1}
        mb={0}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Add Pension For Users
        </MDTypography>
      </MDBox>
      <br />
      <MDBox>
        <DataTable
          table={{
            columns: [
              {
                Header: "Employee ",
                accessor: "userName",
                align: "left",
              },
              { Header: "Pension Provider", accessor: "providerName", align: "left" },
              {
                Header: "Created On",
                accessor: "createdTime",
                Cell: ({ cell: { value } }) => changeDate(value),
                align: "left",
              },
              {
                Header: "actions",
                accessor: "empID",
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
                        <Dropdown.Item onClick={() => handleAddPension(value)}>
                          Add Pension
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleView(value)}>
                          View Pension History
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleUpdate(value)}>
                          Update Pension Provider
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDisable2(value)}>
                          Delete Integration
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                ),
                align: "center",
              },
            ],

            rows: items,
          }}
        />
      </MDBox>
      <br />
      <br />
      <MDBox
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        mx={14}
        mt={2}
        p={1}
        mb={0}
        textAlign="center"
      >
        <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
          Company Pension History (All Employees)
        </MDTypography>
      </MDBox>
      <MDBox mx={10} mt={3} borderRadius="lg" textAlign="center">
        <Card>
          <div className="row" style={{ padding: "5%" }}>
            <div className="col-sm-6">
              <MDTypography
                variant="button"
                fontWeight="regular"
                fontSize="80%"
                align="left"
                color="text"
                mt={2}
              >
                From
              </MDTypography>
              <DatePicker
                placeholderText="MM/DD/YY"
                style={{ marginRight: "10px" }}
                selected={start}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                onChange={(time) => setStart(time)}
              />
              <i style={{ color: "red", fontSize: "60%" }}>required</i>
            </div>
            <div className="col-sm-6">
              <MDTypography
                variant="button"
                fontWeight="regular"
                fontSize="80%"
                align="left"
                color="text"
                mt={2}
              >
                To
              </MDTypography>
              <DatePicker
                placeholderText="MM/DD/YY"
                style={{ marginRight: "10px" }}
                selected={end}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                onChange={(time) => setEnd(time)}
              />
              <i style={{ color: "red", fontSize: "60%" }}>required</i>
            </div>
          </div>
          <MDBox textAlign="center" mx={3}>
            <MDBox textAlign="center" p={3}>
              <MDButton color="success" variant="gradient" onClick={handleGets} size="large">
                Generate History
              </MDButton>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <br />
      {gets && (
        <MDBox>
          <DataTable
            table={{
              columns: [
                { Header: "employee", accessor: "integration.empName", align: "left" },
                { Header: "amount (NGN)", accessor: "amount", align: "left" },
                {
                  Header: "Date Created",
                  accessor: "createdTime",
                  Cell: ({ cell: { value } }) => changeDate(value),
                  align: "left",
                },
                {
                  Header: "Payed On",
                  accessor: "payTime",
                  Cell: ({ cell: { value } }) => changeDate(value),
                  align: "left",
                },
                {
                  Header: "Terminated By ",
                  accessor: "terminatedByName",
                  align: "left",
                },
                // {
                //   Header: "Terminated Time ",
                //   accessor: "terminatedTime",
                //   Cell: ({ cell: { value } }) => changeDate(value),
                //   align: "left",
                // },
                {
                  Header: "Status",
                  accessor: "status",
                  Cell: ({ cell: { value } }) => handleStatus(value),
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
                          <Dropdown.Item onClick={() => handleUpdate2(value)}>Update</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDisable22(value)}>
                            Terminate
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  ),
                  align: "center",
                },
              ],
              rows: items2,
            }}
            isSorted
            entriesPerPage
            showTotalEntries
            noEndBorder
            canSearch
          />
        </MDBox>
      )}
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}
