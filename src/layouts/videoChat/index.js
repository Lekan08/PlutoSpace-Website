import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import ReactiveButton from "reactive-button";

export default function VideoChat() {
  window.location = "https://cairo-videochat.netlify.app";
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <MDBox mx={25} textAlign="center" style={{ paddingBottom: "60vh", paddingTop: "10vh" }}>
        <Card style={{ width: "30vw", height: "20vh" }}>
          <p style={{ marginTop: "5vh" }}>
            Video Chat
            <br />
          </p>
          <a href="cairo-videochat.netlify.app" target="_blank" rel="noreferrer">
            <ReactiveButton
              size="large"
              outline
              shadow
              animation
              width="200px"
              rounded
              color="teal"
              idleText="Go"
            />
          </a>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
