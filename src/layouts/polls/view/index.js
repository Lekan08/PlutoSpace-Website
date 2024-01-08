import { useEffect, useState } from "react";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Card from "@mui/material/Card";
import Styles from "styles";

function PollsView() {
  const MySwal = withReactContent(Swal);

  const [items, setItems] = useState([]);
  const [opened, setOpened] = useState(false);

  const { allGHeaders: miHeaders } = GHeaders();

  const [questionx, setQuestion] = useState("");

  const navigate = useNavigate();

  const pollGetResults = () => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pollids = urlParams.get("id");

    fetch(`${process.env.REACT_APP_KUBU_URL}/poll/getResults/${orgIDs}/${pollids}`, { headers })
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
        }
        setQuestion(resultx[0].question);
        pollGetResults();
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

  const pColumns = [
    { Header: "Poll Options", accessor: "response", align: "left" },
    { Header: "Number Of Votes", accessor: "number", align: "left" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
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
          </MDBox>
        </Card>
        &nbsp; &nbsp;
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
      <Footer />
    </DashboardLayout>
  );
}

export default PollsView;
