import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
// import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
// import { Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MDTypography from "components/MDTypography";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
// import ReportProductionTable from "layouts/products/reportProduction/data";

function GenerateProductionReport() {
  // const MySwal = withReactContent(Swal);
  // const { columns: pColumns, rows: pRows } = ReportProductionTable();
  // const [namex, setName] = useState("");
  // const [descriptionx, setDescriptionx] = useState("");
  // const [pricePerQuantityx, setPricePerQuantity] = useState("");
  // const [enabled, setEnabled] = useState("");
  // const [checkedName, setCheckedName] = useState("");
  // const [table, setTable] = useState("");

  // const [statusx, setStatus] = useState("");
  // const [quantityx, setQuantity] = useState("");
  // const [typex, setType] = useState("");
  const [toyoomap, setToyoomapexport] = useState([]);
  // // const [branx, setBranx] = useState("");
  // const [toyoomap, setToyoomapexport] = ([]);
  // const [branId, setBranId] = useState("");

  // const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  // const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // useEffect(() => {
  //   const headers = miHeaders;
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const productIDx = urlParams.get("id");
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const productID = productIDx;
  //   const orgIDs = data11.orgID;
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/productBranch/gets/${orgIDs}/${productID}`, {
  //     headers,
  //   })
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
  //       console.log(result);
  //       const branIdxx = result.branchID;
  //       console.log(branIdxx);
  //       // const queryString = window.location.search;
  //       // const urlParams = new URLSearchParams(queryString);
  //       // const productIDx = urlParams.get("id");
  //       // const data11 = JSON.parse(localStorage.getItem("user1"));
  //       // const productID = productIDx;
  //       // const orgIDs = data11.orgID;
  //       // let isMounted = true;
  //       fetch(
  //         `${process.env.REACT_APP_LOUGA_URL}/production/getForProductBranch/${orgIDs}/?productID=${productID}/?branchID=${branIdxx}`,
  //         {
  //           headers,
  //         }
  //       )
  //         .then(async (res) => {
  //           const aToken = res.headers.get("token-1");
  //           localStorage.setItem("rexxdex", aToken);
  //           return res.json();
  //         })
  //         .then((resultx) => {
  //           if (result.message === "Expired Access") {
  //             navigate("/authentication/sign-in");
  //             window.location.reload();
  //           }
  //           if (resultx.message === "Token Does Not Exist") {
  //             navigate("/authentication/sign-in");
  //             window.location.reload();
  //           }
  //           if (resultx.message === "Unauthorized Access") {
  //             navigate("/authentication/forbiddenPage");
  //             window.location.reload();
  //           }
  //           console.log(result);
  //           console.log(resultx);
  //           if (isMounted) {
  //             // setTable(resultx);
  //             setBranch(result);
  //           }
  //         });
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
  // console.log(branId);

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    // const ids = JSON.parse([id]);

    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const ids = data11.id;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/production/getByIds/${ids}`, {
      headers,
    })
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
        console.log(result);
        // eslint-disable-next-line no-empty
        if (result.length !== 0) {
          // } else {
          console.log(result);
          const data11 = JSON.parse(localStorage.getItem("user1"));
          const orgIDs = data11.orgID;
          const idiot = result[0].branchID;
          const stress = result[0].productID;
          fetch(
            `${process.env.REACT_APP_LOUGA_URL}/production/getForProductBranch/${orgIDs}?productID=${stress}&branchID=${idiot}`,
            {
              headers,
            }
          )
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
              if (isMounted) {
                setToyoomapexport(resultx);
              }
            });
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // useEffect(() => {
  //   const headers = miHeaders;
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const productIDx = urlParams.get("id");
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const productID = productIDx;
  //   const orgIDs = data11.orgID;
  //   let isMounted = true;
  //   fetch(
  //     `${process.env.REACT_APP_LOUGA_URL}/production/getForProductBranch/${orgIDs}/?productID=${productID}/?branchID=${branchx.branchID}`,
  //     {
  //       headers,
  //     }
  //   )
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
  //       console.log(result);
  //       if (isMounted) {
  //         // setTable(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // eslint-disable-next-line consistent-return
  const handleOnChangeStatus = (type) => {
    if (type === 0) {
      return "Reported";
    }
    if (type === 1) {
      return "Approve";
    }
    if (type === 2) {
      return "Decline";
    }
  };

  // eslint-disable-next-line consistent-return
  const handleOnChangeType = (type) => {
    if (type === 0) {
      return "Addition";
    }
    if (type === 1) {
      return "Deduction";
    }
  };

  const pdfColumns = [
    { Header: "quantity", accessor: "quantity", align: "left" },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ cell: { value } }) => handleOnChangeStatus(value),
      align: "left",
    },
    {
      Header: "Type",
      accessor: "type",
      Cell: ({ cell: { value } }) => handleOnChangeType(value),
      align: "left",
    },
    { Header: "Branch Name", accessor: "branch", align: "left" },
  ];

  const converter = toyoomap.map((newt) => ({
    // id: newt.id,
    // amount: twoDecimal(newt.amount),
    // createdTime: changeDate(newt.createdTime),
    quantity: newt.quantity,
    branch: newt.branchName,
    status: handleOnChangeStatus(newt.status),
    type: handleOnChangeType(newt.type),
  }));
  // console.log(pRows);

  const exportColumns = pdfColumns.map((Col) => ({
    title: Col.Header,
    dataKey: Col.accessor,
  }));

  const exportPDF = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        // eslint-disable-next-line new-cap
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, converter);
        doc.save("productionreport.pdf");
      });
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={1} px={3}>
          <MDBox component="form" role="form">
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="sm"
              coloredShadow="success"
              mx={2}
              mt={-2}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography
                variant="h6"
                fontWeight="medium"
                color="white"
                textAlign="center"
                mt={0}
              >
                Generate Production Report
              </MDTypography>
            </MDBox>
            &nbsp; &nbsp;
            <MDButton
              variant="gradient"
              onClick={exportPDF}
              color="info"
              width="50%"
              align="center"
            >
              Generate Production Report
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
      {/* <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop> */}
    </DashboardLayout>
  );
}

export default GenerateProductionReport;
