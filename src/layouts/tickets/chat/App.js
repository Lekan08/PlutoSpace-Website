import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
// import Chat from "./chats";
import PageLayout from "examples/LayoutContainers/PageLayout";
import ChatBody from "./src/components/chatBody/ChatBody";

const socket = io.connect("http://localhost:3004");

function TicketChatApp() {
  // const [username, setUsername] = useState("");
  const [ticketIDx, setTicketIDx] = useState("");

  useEffect(() => {
    /* if (idx === 0) {
      setPassEnabled(true);
    } */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    // const userNamex = "Ticket Test";
    const ticketID = urlParams.get("ticketID");
    console.log("usernameeeee");
    console.log(ticketID);

    let isMounted = true;
    if (isMounted) {
      // setUsername(userNamex);
      setTicketIDx(ticketID);
      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      socket.emit("join_room", orgIDs);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageLayout>
      {/* <DashboardNavbar /> */}
      <MDBox>
        <div className="App">
          {/* <Chat socket={socket} username={username} room={room} /> */}
          <ChatBody socket={socket} initialTicketID={ticketIDx} />
        </div>
      </MDBox>
    </PageLayout>
  );
}

export default TicketChatApp;
