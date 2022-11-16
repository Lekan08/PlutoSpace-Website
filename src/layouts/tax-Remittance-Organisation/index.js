import Card from "@mui/material/Card";
import { Dropdown } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import withReactContent from "sweetalert2-react-content";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Swal from "sweetalert2";
import Footer from "examples/Footer";
import Icon from "@mui/material/Icon";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
// import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import DataTable from "examples/Tables/DataTable";

function TaxRemittanceOrg() {
  // eslint-disable-next-line prefer-const
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();
  const [table, setTable] = useState([]);
  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const handlePay = (valuex, statusx) => {
    const resultp = table.filter((item) => item.id === valuex);

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;

    const raw = JSON.stringify({
      id: valuex,
      orgID: orgIDs,
      empID: resultp[0].empID,
      requestID: resultp[0].requestID,
      amount: resultp[0].amount,
      createdTime: resultp[0].createdTime,
      status: statusx,
      remittedBy: resultp[0].remittedBy,
      remittedTime: resultp[0].remittedTime,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_TANTA_URL}/taxRemittance/update`, requestOptions)
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

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;

    const stDate = new Date(new Date().getFullYear(), 0, 1);
    const enDate = new Date(new Date().getFullYear(), 12, 1);
    const starDate = stDate.getTime();
    const endDate = enDate.getTime();

    fetch(
      `${process.env.REACT_APP_TANTA_URL}/taxRemittance/getOnlyOrg/${orgIDs}?startTime=${starDate}&endTime=${endDate}`,
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
          console.log(result);
          setTable(result);
          //   setEmpID(result.empID);
          //   setRequestID(result.requestID);
          //   setAmount(result.amount);
          //   setCreatedTime(result.createdTime);
          //   setRemittedBy(result.remittedBy);
          //   setRemittedTime(result.remittedTime);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;

    const stDate = new Date(new Date().getFullYear(), 0, 1);
    const enDate = new Date(new Date().getFullYear(), 12, 1);
    const starDate = stDate.getTime();
    const endDate = enDate.getTime();

    fetch(
      `${process.env.REACT_APP_TANTA_URL}/taxRemittance/gets/${orgIDs}?startTime=${starDate}&endTime=${endDate}`,
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
          console.log(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  // eslint-disable-next-line consistent-return
  const changeStatus = (status) => {
    if (status === 0) {
      return " ";
    }
    if (status === 1) {
      return "PAID";
    }
    if (status === 2) {
      return "DECLINED";
    }
  };

  const twoDecimal = (num) => {
    const dec = num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return dec;
  };

  const pColumns = [
    {
      Header: "Amount (NGN)",
      accessor: "amount",
      Cell: ({ cell: { value } }) => twoDecimal(value),
      align: "left",
    },
    //   { Header: "description", accessor: "descrip", align: "left" },
    {
      Header: "Date Created",
      accessor: "createdTime",
      Cell: ({ cell: { value } }) => changeDate(value),
      align: "left",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ cell: { value } }) => changeStatus(value),
      align: "left",
    },
    {
      Header: "Actions",
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
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <Icon sx={{ fontWeight: "light" }}>settings</Icon>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handlePay(value, 1)}>Pay</Dropdown.Item>
              <Dropdown.Item onClick={() => handlePay(value, 2)}>Decline</Dropdown.Item>
              {/* <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
      align: "left",
    },
  ];

  const exportColumns = pColumns.map((Col) => ({
    title: Col.Header,
    dataKey: Col.accessor,
  }));

  const converter = table.map((newt) => ({
    id: newt.id,
    amount: twoDecimal(newt.amount),
    createdTime: changeDate(newt.createdTime),
    status: changeStatus(newt.status),
  }));

  const exportPDF = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        // eslint-disable-next-line new-cap
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, converter);
        doc.save("Tax-Remittance-Org.pdf");
      });
    });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <DataTable
          table={{
            columns: pColumns,
            rows: table,
          }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
        <MDBox mt={4} mb={1} style={{ textAlign: "center" }}>
          <MDButton variant="gradient" onClick={exportPDF} color="info" width="50%" align="center">
            Export PDF
          </MDButton>
        </MDBox>
      </Card>
      <br />
      <Footer />
      {/* <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop> */}
    </DashboardLayout>
  );
}

export default TaxRemittanceOrg;
