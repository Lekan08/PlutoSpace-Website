/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from "react";
// import MDButton from "components/MDButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import GHeaders from "getHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "examples/Tables/DataTable";
// import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Styles from "styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Card } from "@mui/material";

// import TextWrapper from "react-text-wrapper";

export default function ViewUserPension() {
  const { allGHeaders: miHeaders } = GHeaders();
  // const { allPHeaders: myHeaders } = PHeaders();
  // const axios = require("axios");
  const [view, setView] = useState({ id: 0, name: "" });
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    setView({
      id: urlParams.get("id"),
      name: urlParams.get("name"),
    });
  }, []);

  const [opened, setOpened] = useState(false);
  const [gets, setGets] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const navigate = useNavigate();

  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    if (timestamp === "") {
      return "Null";
    }
    return retDate;
  };
  const [items2, setItems2] = useState([]);
  const handleGets = () => {
    if (start && end) {
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      const strt = start.getTime();
      const ends = end.getTime();
      const headers = miHeaders;
      let isMounted = true;
      setOpened(true);
      fetch(
        `${process.env.REACT_APP_JOHANNESBURG_URL}/pensions/getForEmp/${orgIDs}/${view.id}?startTime=${strt}&endTime=${ends}`,
        { headers }
      )
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          const result = await res.text();
          if (result === null || result === undefined || result === "") {
            return [];
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
  const handleStatus = (status) => {
    if (status === 0) return "PENDING";
    if (status === 1) return "PAID";
    if (status === 3) return "TERMINATED";
    return null;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <MDBox
        variant="gradient"
        // bgColor="info"
        style={{ backgroundColor: "#f96d02" }}
        borderRadius="lg"
        coloredShadow="info"
        mx={14}
        mt={2}
        p={1}
        mb={0}
        textAlign="center"
      >
        <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
          {view.name}&apos;s Pension History
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
              <MDButton
                style={Styles.buttonSx}
                variant="gradient"
                onClick={handleGets}
                size="large"
              >
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
                {
                  Header: "pension provider",
                  accessor: "integration.providerName",
                  align: "left",
                },
                { Header: "amount (NGN)", accessor: "amount", align: "left" },
                {
                  Header: "Date Created",
                  accessor: "createdTime",
                  Cell: ({ cell: { value } }) => changeDate(value),
                  align: "left",
                },
                {
                  Header: "Status",
                  accessor: "status",
                  Cell: ({ cell: { value } }) => handleStatus(value),
                  align: "left",
                },
                { Header: "terminatedBy", accessor: "terminatedByName", align: "left" },
                // {
                //   Header: "actions",
                //   accessor: "id",
                //   // eslint-disable-next-line react/prop-types
                //   Cell: ({ cell: { value } }) => (
                //     <div
                //       style={{
                //         width: "100%",
                //         backgroundColor: "#dadada",
                //         borderRadius: "2px",
                //       }}
                //     >
                //       <Dropdown>
                //         <Dropdown.Toggle variant="secondary" id="dropdown-basic-button">
                //           <Icon sx={{ fontWeight: "light" }}>settings</Icon>
                //         </Dropdown.Toggle>
                //         <Dropdown.Menu>
                //           <Dropdown.Item>Mark As Paid</Dropdown.Item>
                //           <Dropdown.Item onClick={() => handleUpdate2(value)}>Update</Dropdown.Item>
                //           <Dropdown.Item onClick={() => handleDisable22(value)}>
                //             Terminate
                //           </Dropdown.Item>
                //         </Dropdown.Menu>
                //       </Dropdown>
                //     </div>
                //   ),
                //   align: "center",
                // },
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
