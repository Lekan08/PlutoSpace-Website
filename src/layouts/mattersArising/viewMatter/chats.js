import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import Icon from "@mui/material/Icon";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import "./Css.css";
import { Paper } from "@mui/material";
import { Container } from "react-bootstrap";
import MDBox from "components/MDBox";

// import Footer from "examples/Footer";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import MDBox from "components/MDBox";
// import Card from "@mui/material/Card";
// import MDButton from "components/MDButton";

// import { Container } from "react-bootstrap";
// import Emojis from "./emoji";

// eslint-disable-next-line react/prop-types
function Chat({ socket, username, room }) {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  // const { emoticons: allEmojis } = Emojis();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const [titlex, setTitlex] = useState("");

  useEffect(() => {
    const messageMap = [];

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const concernID = urlParams.get("room");

    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/concernChat/getForConcern/${concernID}`, { headers })
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
          // eslint-disable-next-line array-callback-return
          result.map((item) => {
            const fdy = {
              id: item.id,
              room: concernID,
              author: item.senderName,
              message: item.message,
              time: `${new Date(item.createdTime).getHours()}:${new Date(Date.now()).getMinutes()}`,
            };
            messageMap.push(fdy);
          });
          setMessageList(messageMap);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        id: messageList.length + 1,
        room,
        author: username,
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
      };

      // eslint-disable-next-line react/prop-types
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");

      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      const personalIDs = data11.personalID;

      const raw = JSON.stringify({
        orgID: orgIDs,
        concernID: room,
        message: currentMessage,
        senderID: personalIDs,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_SHASHA_URL}/concernChat/save`, requestOptions)
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
        })
        .catch((error) => {
          MySwal.fire({
            title: error.status,
            type: "error",
            text: error.message,
          });
        });
    }
  };

  useEffect(() => {
    const headers = miHeaders;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("room");

    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/concern/getByIds/${ids}`, {
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
        if (isMounted) {
          setTitlex(result[0].title);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    // eslint-disable-next-line react/prop-types
    socket.on("receive_message", (data) => {
      if (isMounted) {
        setMessageList((list) => [...list, data]);
        console.log(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [socket]);

  return (
    <Paper className="chat-window" style={{ height: "550px", borderRadius: "15px" }} elevation={20}>
      <Container>
        <MDBox mx={1.7}>
          <div>
            <br />
            <div className="header">
              <div
                style={{
                  textAlign: "center",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  // width: "30rem",
                  whiteSpace: "nowrap",
                }}
              >
                <p className="headerText">{titlex}</p>
                <Chip size="medium" label="Matter" color="default" variant="filled" />
              </div>
            </div>
            <div className="chat-body">
              <ScrollToBottom className="message-container">
                {messageList.map((messageContent) => (
                  <div
                    className="message"
                    id={username === messageContent.author ? "other" : "you"}
                    key={messageContent.id}
                  >
                    <div>
                      <div className="box">
                        <p className="message">{messageContent.message}</p>
                      </div>
                      <div className="message-meta" style={{ fontSize: "9px" }}>
                        <p id="time">
                          {messageContent.time} <b>{messageContent.author}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollToBottom>
            </div>
            <div textAlign="center">
              <MDBox>
                <input
                  type="text"
                  className="textx"
                  value={currentMessage}
                  placeholder=" Type Message..."
                  onChange={(event) => {
                    setCurrentMessage(event.target.value);
                  }}
                  onKeyPress={(event) => {
                    // eslint-disable-next-line no-unused-expressions
                    event.key === "Enter" && sendMessage();
                  }}
                />
                &nbsp;
                {/* <Icon fontSize="large" onClick={sendMessage}>
                sentiment_satisfied_alt_icon
              </Icon>{" "} */}
                <b className="upp">
                  <Icon fontSize="large" className="upp" onClick={sendMessage}>
                    send
                  </Icon>
                </b>
              </MDBox>
            </div>
            {/* <ScrollToBottom className="emoji-container">
          <Container>
            <div className="row">
              {allEmojis.map((apis) => (
                <div key={apis.emoji} value={apis.emoji} className="col-sm-1">
                  <button type="button">{apis.emoji}</button>
                </div>
              ))}
            </div>
          </Container>
        </ScrollToBottom> */}
          </div>
        </MDBox>
      </Container>
    </Paper>
  );
}

export default Chat;
