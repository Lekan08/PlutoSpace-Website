import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { TabPanel } from "react-tabs";

export default function SalesPayment() {
  const [value, setValue] = React.useState("1"); // useState("");
  //   const [showTabelPanel, setShowTabelPanel] = useState(false);
  // const handleClick = (e) => {
  //   // handleOnTitleKeys();
  //   // handleOnQuantityKeys();
  //   // handleOnPPQuantityKeys();
  //   // handleOnBonusAmountKeys();
  //   // Amount * taxamount - bonus
  //   // if (enabled) {
  //   setOpened(true);
  //   e.preventDefault();
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   const idx = data11.personalID;
  //   const raw = JSON.stringify({
  //     orgID: orgIDs,
  //     individualID: indix,
  //     items: counter,
  //     bonusAmount: bonusAmountxx,
  //     subTotalAmount: subTotalAmountx,
  //     totalAmount: TOTAL,
  //     createdBy: idx,
  //     comment: commentx,
  //     receiptStatus: 0,
  //   });
  //   console.log(raw);
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };
  //   localStorage.setItem("Payload", JSON.stringify(raw));

  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/sales/add`, requestOptions)
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       setOpened(false);
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

  //       MySwal.fire({
  //         title: result.status,
  //         type: "success",
  //         text: result.message,
  //       })
  //         .then(() => {
  //           console.log(result.data.id);
  //           //   handlePayVAT(result.data.id);
  //           // window.location.reload();
  //         })
  //         .then(() => {
  //           window.location.reload();
  //         });
  //     })
  //     .catch((error) => {
  //       MySwal.fire({
  //         title: error.status,
  //         type: "error",
  //         text: error.message,
  //       });
  //     });
  //   // }
  // };

  const handleChange = (event, newValue) => {
    console.log(event);
    console.log(newValue);
    newValue.toString();
    setValue(newValue);
  };
  //   setShowTabelPanel(value);
  //   if (value === "1") {
  //     console.log(value);
  //     setShowTabelPanel(true);
  //   } else if (value === "2") {
  //     setShowTabelPanel(true);
  //   } else if (value === 3) {
  //     setShowTabelPanel(true);
  //   }

  console.log(value);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Cash Payment" value="1" />
                <Tab label="Transfer Payment" value="2" />
                <Tab label="Card Payment" value="3" />
              </TabList>
            </Box>
            <div value="1">Blessing</div>
            <TabPanel value="1">Blessing</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
            <TabPanel value={1}>
              <h2>Any content 1</h2>
            </TabPanel>
            <TabPanel value="2">
              <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item One
            </TabPanel>
            <TabPanel value={value}>Item One</TabPanel>
          </TabContext>
        </Box>
      </MDBox>
      {/* <MDBox>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={setValue} aria-label="lab API tabs example">
              <Tab>Title 1</Tab>
              <Tab>Title 2</Tab>
            </TabList>
          </Box>

          <TabPanel value={1}>
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel value="2">
            <h2>Any content 2</h2>
          </TabPanel>
        </TabContext>
      </MDBox> */}
    </DashboardLayout>
  );
}
