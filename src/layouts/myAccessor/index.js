import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { Container, Form, Dropdown } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Icon from "@mui/material/Icon";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";

function Accessor() {
  // eslint-disable-next-line prefer-const

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [table, setTable] = useState([]);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();
  const [add, setAdd] = useState(0);
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    setOpened(true);
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
          const user = result.map((r) => ({
            grantedFor: r.personal.id,
            grantedForName: `${r.personal.fname} ${r.personal.lname}`,
            orgID: r.personalCompany.orgID,
            checked: false,
          }));
          const userx = user;
          const perso = data11.personalID;
          fetch(`${process.env.REACT_APP_RAGA_URL}/appointmentAccess/gets/${orgIDs}/${perso}`, {
            headers,
          })
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((rex) => {
              setTable(rex);
            });
          fetch(
            `${process.env.REACT_APP_RAGA_URL}/appointmentAccess/getsOpposite/${orgIDs}/${perso}`,
            {
              headers,
            }
          )
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((rex) => {
              if (rex.message === "Expired Access") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (rex.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (rex.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
                window.location.reload();
              }
              function alphabetical(a, b) {
                if (a.grantedForName.toUpperCase() < b.grantedForName.toUpperCase()) {
                  return -1;
                }
                if (a.grantedForName.toUpperCase() > b.grantedForName.toUpperCase()) {
                  return 1;
                }
                return 0;
              }
              if (isMounted) {
                console.log(rex);
                const myAccessor = rex;
                const setcheck = myAccessor.map((rr) => ({
                  ...rr,
                  checked: true,
                }));
                const mixed = setcheck.concat(userx);
                const proper = mixed.filter(
                  (value, index, self) =>
                    index === self.findIndex((t) => t.grantedFor === value.grantedFor)
                );
                proper.sort(alphabetical);
                console.log(proper);
                setUsers(proper);
                setOpened(false);
              }
            });
        }
      });
    return () => {
      isMounted = false;
    };
  }, [add]);
  const handleShow = (value, tablex) => {
    const filteredItems = tablex.filter((item) => item.accessor === value);
    console.log(filteredItems);
    navigate(`/View-Calendar?id=${value}&name=${filteredItems[0].accessorName}`);
  };
  const grant = (e, others) => {
    if (e.target.checked) {
      setOpened(true);
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      const perso = data11.personalID;

      const raw = JSON.stringify({
        orgID: orgIDs,
        accessor: perso,
        grantedFor: e.target.value,
      });
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_RAGA_URL}/appointmentAccess/add`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((result) => {
          console.log(result);
          if (result.message === "Expired Access") {
            navigate("/authentication/sign-in");
          }
          if (result.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
          }
          if (result.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
          }
          if (result.status === "SUCCESS") {
            setAdd(add + 1);
          } else {
            setOpened(false);
            alert(`error: ${result.message}`);
          }
        })
        .catch((error) => {
          setOpened(false);
          alert(error);
        });
    } else {
      const requestOptionsd = {
        method: "DELETE",
        headers: miHeaders,
      };
      // eslint-disable-next-line prefer-destructuring
      const id = others.id;
      setOpened(true);
      fetch(`${process.env.REACT_APP_RAGA_URL}/appointmentAccess/remove/${id}`, requestOptionsd)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          return res.json();
        })
        .then((resy) => {
          console.log(resy);
          if (resy.message === "Expired Access") {
            navigate("/authentication/sign-in");
          }
          if (resy.message === "Token Does Not Exist") {
            navigate("/authentication/sign-in");
          }
          if (resy.message === "Unauthorized Access") {
            navigate("/authentication/forbiddenPage");
          }
          setAdd(add + 1);
          if (resy.status === "SUCCESS") {
            setOpened(false);
          } else {
            setOpened(false);
            alert(`error: ${resy.message}`);
          }
        });
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <MDBox pt={4} pb={3} px={3}>
        <Card>
          <MDBox component="form" role="form" mx={10}>
            <MDBox
              variant="gradient"
              style={{ backgroundColor: "#f96d02" }}
              borderRadius="lg"
              coloredShadow="info"
              mx={0}
              mt={2}
              p={1}
              mb={0}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                My Calendar Accessors
              </MDTypography>
            </MDBox>
            <br />
            <MDBox>
              <Container>
                <Form>
                  {users.map((r) => (
                    <div key={r.grantedFor}>
                      <Form.Check.Input
                        type="checkbox"
                        defaultChecked={r.checked}
                        value={r.grantedFor}
                        onClick={(e) => grant(e, r)}
                      />
                      <Form.Check.Label>&nbsp; {r.grantedForName}</Form.Check.Label>
                    </div>
                  ))}
                </Form>
                <br />
              </Container>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <br />
      <Card>
        <div align="center">
          <MDTypography variant="h5" fontWeight="light" color="dark" mt={1}>
            <b> Other Users Calendar I can see </b>
          </MDTypography>
        </div>
        <hr />
        <DataTable
          table={{
            columns: [
              { Header: "Name", accessor: "accessorName", align: "left" },
              {
                Header: "actions",
                accessor: "accessor",
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
                      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <Icon sx={{ fontWeight: "light" }}>settings</Icon>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleShow(value, table)}>
                          View Calendar
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                ),
                align: "left",
              },
            ],
            rows: table,
          }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </Card>
      <br />
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default Accessor;
