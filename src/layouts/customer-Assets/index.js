import React from "react";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CustomerAssetss from "layouts/customer-Assets/data";
// Zinoleesky

function CustomerAssets() {
  const { columns: pColumns, rows: pRows } = CustomerAssetss();

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
    </DashboardLayout>
  );
}

export default CustomerAssets;
