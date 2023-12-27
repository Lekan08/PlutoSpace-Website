/* eslint-disable jsx-a11y/click-events-have-key-events */
import FormControl from "@mui/material/FormControl";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import { Form } from "react-bootstrap";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Styles from "styles";

function VotePolls() {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const { allGHeaders: miHeaders } = GHeaders();
  const { allPHeaders: myHeaders } = PHeaders();

  const [questionx, setQuestion] = useState("");
  const [items, setItems] = useState([]);
  const [opened, setOpened] = useState(false);

  const pollGetOptions = () => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pollids = urlParams.get("id");

    fetch(`${process.env.REACT_APP_KUBU_URL}/poll/getOptions/${orgIDs}/${pollids}`, { headers })
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
        setItems(result);
      });
  };

  const pollGetByIDs = () => {
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");

    fetch(`${process.env.REACT_APP_KUBU_URL}/poll/getByIds/${ids}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultx) => {
        if (resultx.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (resultx.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (resultx.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
        if (resultx[0].status === 0 || resultx[0].status === "0") {
          setOpened(false);
          MySwal.fire({
            title: "Poll Not Opened",
            icon: "info",
            type: "info",
            text: `Open Poll To Vote`,
          }).then(() => {
            navigate("/dashboard");
          });
        } else if (resultx[0].status === 2 || resultx[0].status === "2") {
          setOpened(false);
          MySwal.fire({
            title: "Poll Closed",
            icon: "info",
            type: "info",
            text: `You can't vote on this poll`,
          }).then(() => {
            navigate("/dashboard");
          });
        }
        setQuestion(resultx[0].question);
        pollGetOptions();
      });
  };

  useEffect(() => {
    setOpened(true);
    let isMounted = true;
    if (isMounted) {
      pollGetByIDs();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (e, apix) => {
    e.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const groupids = urlParams.get("id");

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const personalIds = data11.id;
    const raw = JSON.stringify({
      orgID: orgIDs,
      pollID: groupids,
      empID: personalIds,
      response: apix.value,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_KUBU_URL}/poll/submitResponse`, requestOptions)
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
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          navigate(`/dashboard`);
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="row">
        <div className="col-sm-2">&nbsp;</div>
        <div className="col-sm-8" align="center">
          <Card>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox
                variant="gradient"
                // bgColor="info"
                borderRadius="lg"
                style={Styles.boxSx}
                // coloredShadow="info"
                mx={25}
                mt={-6}
                p={3}
                mb={1}
                textAlign="center"
              >
                <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                  {questionx}
                </MDTypography>
              </MDBox>
              <MDBox mb={2} textAlign="left">
                <FormControl>
                  <MDBox>
                    <Form>
                      {items.map((api) => (
                        <div key={api.id} className="mb-3" align="left">
                          <Form.Check.Input
                            type="radio"
                            defaultChecked={api.isCheck}
                            onClick={(e) => handleClick(e, api)}
                          />
                          <Form.Check.Label>&nbsp; {api.value}</Form.Check.Label>
                        </div>
                      ))}
                    </Form>
                  </MDBox>
                </FormControl>
              </MDBox>
            </MDBox>
          </Card>
        </div>
      </div>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
      <Footer />
    </DashboardLayout>
  );
}

export default VotePolls;
