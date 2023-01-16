/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ScrollToBottom, { useScrollToBottom, useSticky } from "react-scroll-to-bottom";
import "./chatList.css";
import Avatar from "./Avatar";
import "./chatBody.css";
import "./chatContent.css";
import "./userProfile.css";

export default function ChatBody({ socket, initialTicketID }) {
  const MySwal = withReactContent(Swal);

  const [chatListDataa, setChatListDataa] = useState([{ time: { time: "", date: "" } }]);
  const [eventData, setEventData] = useState([]);
  const [rMessageData, setRMessageData] = useState([]);
  // const allChatUsers = [
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
  //     id: 1,
  //     name: "Tim Hover",
  //     active: true,
  //     isOnline: true,
  //   },
  //   {
  //     image: "https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
  //     id: 2,
  //     name: "Ayub Rossi",
  //     active: false,
  //     isOnline: false,
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
  //     id: 3,
  //     name: "Hamaad Dejesus",
  //     active: false,
  //     isOnline: false,
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
  //     id: 4,
  //     name: "Eleni Hobbs",
  //     active: false,
  //     isOnline: true,
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
  //     id: 5,
  //     name: "Elsa Black",
  //     active: false,
  //     isOnline: false,
  //   },
  //   {
  //     image: "https://huber.ghostpool.com/wp-content/uploads/avatars/3/596dfc2058143-bpfull.png",
  //     id: 6,
  //     name: "Kayley Mellor",
  //     active: false,
  //     isOnline: true,
  //   },
  //   {
  //     image:
  //       "https://www.paintingcontest.org/components/com_djclassifieds/assets/images/default_profile.png",
  //     id: 7,
  //     name: "Hasan Mcculloch",
  //     active: false,
  //     isOnline: true,
  //   },
  //   {
  //     image: "https://auraqatar.com/projects/Anakalabel/media//vesbrand/designer4.jpg",
  //     id: 8,
  //     name: "Autumn Mckee",
  //     active: false,
  //     isOnline: false,
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU",
  //     id: 9,
  //     name: "Allen Woodley",
  //     active: false,
  //     isOnline: true,
  //   },
  //   {
  //     image: "https://pbs.twimg.com/profile_images/770394499/female.png",
  //     id: 10,
  //     name: "Manpreet David",
  //     active: false,
  //     isOnline: true,
  //   },
  // ];

  // const messagesEndRef = createRef(null);

  const [msg, setMsg] = useState("");
  const [ticketIDx, setTicketIDx] = useState(initialTicketID);
  const [curClientObj, setCurClientObj] = useState({});
  const [ticketSettingsx, setTicketSettings] = useState({});
  const [clientDatax, setClientData] = useState({});

  const [chatDataa, setChatDataa] = useState([]);
  // const [chatItms, setChatItms] = useState([]);
  const [mainItems, setMainItems] = useState([{ time: { time: "", date: "" } }]);
  // const chatItms = [
  //   {
  //     key: 1,
  //     image: "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
  //     type: "",
  //     msg: "Hi Tim, How are you?",
  //   },
  //   {
  //     key: 2,
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
  //     type: "other",
  //     msg: "I am fine.",
  //   },
  //   {
  //     key: 3,
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
  //     type: "other",
  //     msg: "What about you?   padding: 10px; border-radius: 10px 10px 0 10px; min-width: 215px;width: auto;height: auto;min-height: 40px;max-width: 120px;background-color: #43a047;color: white;display: flex;align-items: center;margin-right: 5px;padding-left: 5px;overflow-wrap: break-word;word-break: break-word;",
  //   },
  //   {
  //     key: 4,
  //     image: "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
  //     type: "",
  //     msg: "Awesome these days.",
  //   },
  //   {
  //     key: 5,
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
  //     type: "other",
  //     msg: "Finally. What's the plan?",
  //   },
  //   {
  //     key: 6,
  //     image: "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
  //     type: "",
  //     msg: "what plan mate?",
  //   },
  //   {
  //     key: 7,
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
  //     type: "other",
  //     msg: "I'm taliking about the tutorial",
  //   },
  // ];

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  const scrollToBottom = useScrollToBottom();
  const [sticky] = useSticky();

  const changeTime = (timestamp) => {
    const conDate = new Date(timestamp);
    let minute = conDate.getMinutes();
    let hour = conDate.getHours();
    const zero = "0";
    if (minute < 10) {
      minute = zero + minute;
    }
    if (hour < 10) {
      hour = zero + hour;
    }
    const hourMinute = `${hour}:${minute}`;
    return hourMinute;
  };

  const addReceivedData = (receivedMessageData) => {
    console.log(chatDataa);
    console.log(receivedMessageData);
    if (receivedMessageData.ticketID === ticketIDx) {
      const dataa = {
        id: receivedMessageData.id,
        room: initialTicketID,
        image: "",
        ticketID: receivedMessageData.ticketID,
        type: receivedMessageData.agentID ? "" : "other",
        msg: receivedMessageData.message,
        time: changeTime(receivedMessageData.createdTime),
      };
      setChatDataa((list) => [...list, dataa]);

      const removedFromList = chatListDataa.filter(
        (item) => item.id === receivedMessageData.ticketID
      );
      const remainingList = chatListDataa.filter(
        (item) => item.id !== receivedMessageData.ticketID
      );

      if (removedFromList.length === 0) return;
      if (remainingList.length === 0) return;
      setChatListDataa([removedFromList[0], ...remainingList]);
    } else {
      const removedFromList = chatListDataa.filter(
        (item) => item.id === receivedMessageData.ticketID
      );
      const remainingList = chatListDataa.filter(
        (item) => item.id !== receivedMessageData.ticketID
      );
      // removedFromList[0].isOnline = "active";
      const ttt = [{ ...removedFromList[0], isOnline: "active" }, ...remainingList];
      console.log(ttt);
      console.log(chatListDataa);
      console.log(removedFromList);
      console.log(remainingList);
      setChatListDataa(ttt);
    }
  };

  useEffect(() => {
    let isMounted = true;
    // // eslint-disable-next-line react/prop-types
    // socket.on("testt", (message) => {
    //   if (isMounted) {
    //     console.log(message);
    //   }
    // });
    // eslint-disable-next-line react/prop-types
    socket.on("receive_message", (allEventata) => {
      if (isMounted) {
        console.log(allEventata);
        // let receivedMessage = "";
        let receivedMessageData;
        if (allEventata.channel === 1) {
          // do email
          receivedMessageData = allEventata.sentMessage;
        } else if (allEventata.channel === 2) {
          // do twitter
          const { event } = allEventata;
          console.log(event);
          const { message } = allEventata;
          setRMessageData(message);
          setEventData(event);
          // const senderScreenName =
          //   event.users[message.message_create.sender_id].screen_name;
          // console.log(
          //   `${senderScreenName} says ${message.message_create.message_data.text}`
          // );
          // receivedMessage = message.message_create.message_data.text;
          console.log(message);
        } else if (allEventata.channel === 3) {
          // do whatsapp
        }
        addReceivedData(receivedMessageData);
        console.log("done adding message");
      }
    });
    return () => {
      isMounted = false;
    };
  }, [chatListDataa, socket]);

  const getClientData = (clientID) => {
    // console.log(ticketID);
    setOpened(true);
    const headers = miHeaders;
    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const orgIDs = data11.orgID;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/getByIds/${clientID}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
      })
      .then((result) => {
        setOpened(false);
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
        if (result.length > 0) {
          setClientData(result[0]);
        } else {
          setClientData({});
        }
      });
  };

  const handleDateAndTime = (timestamp) => {
    const conDate = new Date(timestamp);
    const slashDate = `${conDate.getDate()}/${conDate.getMonth() + 1}/${conDate.getFullYear()}`;
    let minute = conDate.getMinutes();
    let hour = conDate.getHours();
    const zero = "0";
    if (minute < 10) {
      minute = zero + minute;
    }
    if (hour < 10) {
      hour = zero + hour;
    }
    const hourMinute = `${hour}:${minute}`;
    return { date: slashDate, time: hourMinute };
  };
  const listTickets = (allChatUsersParam) => {
    const chatListData = [];

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ticketID = urlParams.get("ticketID");
    const resu = allChatUsersParam.filter((item) => item.id === ticketID);
    // eslint-disable-next-line array-callback-return
    allChatUsersParam.map((item) => {
      const colorrray = ["#3b5bfe", "#7DFF33", "#FF3361", "#E6FF33", "#FFB533"];
      const randomCol = colorrray[Math.floor(Math.random() * colorrray.length)];
      let lett = "";
      if (item.clientName) {
        const nameee = item.clientName;
        lett = nameee.charAt(0).toUpperCase();
      } else {
        lett = "?";
      }

      const dataa = {
        id: item.id,
        name: item.clientName,
        clientID: item.clientID,
        active: item.id === resu[0].id,
        isOnline: "",
        backgroundCol: randomCol,
        letter: lett,
        time: handleDateAndTime(item.lastChatTime),
        status: item.status === 0,
        isResolved: item.resolved,
        isReopened: item.reopened,
        channel: item.channel,
      };
      chatListData.push(dataa);
    });
    // const colorrray = ["#3b5bfe", "#7DFF33", "#FF3361", "#E6FF33", "#FFB533"];
    // const randomCol = colorrray[Math.floor(Math.random() * colorrray.length)];
    const result = chatListData.filter((item) => item.id === ticketID);
    console.log(result);
    // const lett = result[0].name.charAt(0).toUpperCase();

    const cObj = {
      id: result[0].id,
      name: result[0].name,
      clientID: result[0].clientID,
      active: result[0].active,
      isOnline: result[0].isOnline,
      backgroundCol: result[0].backgroundCol,
      letter: result[0].letter,
      time: result[0].time,
      status: result[0].status,
      isResolved: result[0].resolved,
      isReopened: result[0].reopened,
      channel: result[0].channel,
    };
    getClientData(cObj.clientID);

    setCurClientObj(cObj);
    setChatListDataa(chatListData);

    setMainItems(chatListData);
  };

  const handleGets = () => {
    // handleClose();
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    setOpened(true);
    const date = new Date();
    const firstDay = new Date(2010, date.getMonth(), 1).getTime();
    const curDay = new Date().getTime();

    const raw = JSON.stringify({
      orgID: orgIDs,
      startTime: firstDay,
      endTime: curDay,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    fetch(`${process.env.REACT_APP_SHASHA_URL}/tickets/getFiltered`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        // handleClose();
        console.log(result);
        if (result.status !== 500) {
          if (Object.keys(result).length !== 0) {
            if (result.length > 0) {
              listTickets(result);
            } else {
              setMainItems([{ time: { time: "", date: "" } }]);
            }
          }
        }

        setOpened(false);
      })
      .catch((error) => {
        // handleClose();
        setOpened(false);
        console.log(error);
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      //   fetches the table data
      handleGets();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const listChats = (chatItms) => {
    const chatData = [];
    // eslint-disable-next-line array-callback-return
    chatItms.map((item) => {
      const dataa = {
        id: item.id,
        room: initialTicketID,
        image: "",
        ticketID: item.ticketID,
        type: item.agentID ? "" : "other",
        msg: item.message,
        time: changeTime(item.createdTime),
      };
      chatData.push(dataa);
    });
    setChatDataa(chatData);
  };

  const fetchChats = (ticketID) => {
    // console.log(ticketID);
    setOpened(true);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let ticketID2 = urlParams.get("ticketID");
    if (ticketID) ticketID2 = ticketID;
    setTicketIDx(ticketID2);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/chat/gets/${orgIDs}/${ticketID2}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
      })
      .then((result) => {
        setOpened(false);
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
        if (result.length > 0) {
          listChats(result);
        } else {
          setChatDataa([]);
        }
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      //   fetches the table data
      fetchChats(initialTicketID);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // const scrollToBottom = () => {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   let isMounted = true;

  //   if (isMounted) {
  //     scrollToBottom();
  //   }
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // Method to filter tickets
  const handleGetsTicketSettings = () => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/ticketSettings/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
        if (Object.keys(result).length !== 0) {
          setTicketSettings(result);
        }
        setOpened(false);
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      //   fetches the table data
      handleGetsTicketSettings();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // const handleMessage = async () => {
  //   scrollToBottom();
  //   if (msg !== "") {
  //     const colorrray = ["#3b5bfe", "#7DFF33", "#FF3361", "#E6FF33", "#FFB533"];
  //     const randomCol = colorrray[Math.floor(Math.random() * colorrray.length)];
  //     const lett = "M";

  //     const dataa = {
  //       key: chatDataa.length + 1,
  //       backgroundCol: randomCol,
  //       letter: lett,
  //       type: "",
  //       msg,
  //     };
  //     const messageData = {
  //       event: eventData,
  //       message: rMessageData,
  //       rMessage: msg,
  //       ticketSettingResult: [],
  //     };

  //     // eslint-disable-next-line react/prop-types
  //     await socket.emit("send_message", messageData);
  //     setChatDataa((list) => [...list, dataa]);

  //     setMsg("");
  //   }
  // };

  const sendMessage = async () => {
    if (msg !== "") {
      // scrollToBottom();
      const colorrray = ["#3b5bfe", "#7DFF33", "#FF3361", "#E6FF33", "#FFB533"];
      const randomCol = colorrray[Math.floor(Math.random() * colorrray.length)];
      const lett = "M";

      const dataa = {
        id: chatDataa.length + 1,
        backgroundCol: randomCol,
        letter: lett,
        type: "",
        msg,
      };
      const channell = curClientObj.channel;
      let toInfo = "";
      let chann = 0;
      if (channell === "Email") {
        // do email
        if (!clientDatax.email) {
          MySwal.fire({
            title: "INVALID_ACCOUNT",
            type: "error",
            text: "cannot send message to this client, there seems to be something wrong with this email account",
          });
          return;
        }
        toInfo = clientDatax.email;
        chann = 1;
      } else if (channell === "Twitter") {
        //  do twitter
        if (!clientDatax.twitter) {
          MySwal.fire({
            title: "INVALID_ACCOUNT",
            type: "error",
            text: "cannot send message to this client, there seems to be something wrong with this twitter account",
          });
          return;
        }
        toInfo = clientDatax.twitter;
        chann = 2;
      } else if (channell === "Whatsapp") {
        //  do whatsapp
        if (!clientDatax.pno) {
          MySwal.fire({
            title: "INVALID_ACCOUNT",
            type: "error",
            text: "cannot send message to this client, there seems to be something wrong with this whatsapp account",
          });
          return;
        }
        toInfo = clientDatax.pno;
        chann = 3;
      }
      const messageData = {
        event: eventData,
        message: rMessageData,
        rMessage: msg,
        ticketSettingResult: ticketSettingsx,
        to: toInfo,
        channel: chann,
      };

      // eslint-disable-next-line react/prop-types
      await socket.emit("send_message", messageData);
      setChatDataa((list) => [...list, dataa]);

      setMsg("");

      const data11 = JSON.parse(localStorage.getItem("user1"));
      const orgIDs = data11.orgID;
      const personalIDs = data11.personalID;

      const raw = JSON.stringify({
        orgID: orgIDs,
        agentID: personalIDs,
        ticketID: ticketIDx,
        // sender: accountInfo,
        // extraID: accountID,
        message: msg,
        client: true,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_SHASHA_URL}/chat/save`, requestOptions)
        .then(async (res) => {
          const aToken = res.headers.get("token-1");
          localStorage.setItem("rexxdex", aToken);
          const resultres = await res.text();
          if (resultres === null || resultres === undefined || resultres === "") {
            return {};
          }
          return JSON.parse(resultres);
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
          console.log(error);
        });
    }
  };

  // Method to handle Reopen
  const handleReopenTicket = (val) => {
    const requestOptions = {
      method: "GET",
      headers: miHeaders,
    };

    fetch(`${process.env.REACT_APP_SHASHA_URL}/tickets/reOpen/${val}`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
      })
      .then((resx) => {
        if (resx.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resx.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resx.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        MySwal.fire({
          title: resx.status,
          type: "success",
          text: resx.message,
        }).then(() => {
          handleGets();
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

  // Method to handle Resolve
  const handleResolveTicket = (val) => {
    const requestOptions = {
      method: "GET",
      headers: miHeaders,
    };

    fetch(`${process.env.REACT_APP_SHASHA_URL}/tickets/resolve/${val}`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
      })
      .then((resx) => {
        if (resx.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resx.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resx.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        MySwal.fire({
          title: resx.status,
          type: "success",
          text: resx.message,
        }).then(() => {
          handleGets();
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

  // Method to handle diable
  const handleCloseTicket = (val) => {
    const requestOptions = {
      method: "GET",
      headers: miHeaders,
    };

    fetch(`${process.env.REACT_APP_SHASHA_URL}/tickets/close/${val}`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
      })
      .then((resx) => {
        if (resx.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resx.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resx.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        MySwal.fire({
          title: resx.status,
          type: "success",
          text: resx.message,
        }).then(() => {
          handleGets();
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

  const onStateChange = (e) => {
    setMsg(e.target.value);
  };

  const selectChat = (e, item) => {
    // const audio = new Audio("https://t.co/LeCWNlKdnI.mp3");
    // audio.play();
    setChatDataa([]);
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < e.currentTarget.parentNode.children.length; index++) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
    console.log(item);
    const list = chatListDataa.map((lii) => ({ ...lii, isOnline: "" }));
    setChatListDataa(list);
    setTicketIDx(item.id);
    getClientData(item.clientID);
    fetchChats(item.id);
    setCurClientObj(item);
  };

  // const toggleInfo = (e) => {
  //   e.target.parentNode.classList.toggle("open");
  // };

  /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
  const toggleInfo = () => {
    document.getElementById("cardContent").classList.toggle("open");
  };

  // Close the dropdown if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches(".card__header")) {
      const dropdowns = document.getElementsByClassName("card__content");
      let i;
      // eslint-disable-next-line no-plusplus
      for (i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (!event.target.matches(".card__header")) {
          return;
        }
        if (openDropdown.classList.contains("open")) {
          openDropdown.classList.remove("open");
        }
      }
    }
  };

  // Function to search table
  const searchFunc = (val) => {
    // console.log(val);
    // const input = document.getElementById("search").value;
    const input = val;
    console.log(input);
    const filter = input.toUpperCase();
    const jsonData = [];
    // eslint-disable-next-line array-callback-return
    mainItems.map((item) => {
      let docName = item.name;
      if (docName == null) {
        docName = "";
      }
      if (
        item.name.toUpperCase().indexOf(filter) > -1 ||
        docName.toUpperCase().indexOf(filter) > -1
      ) {
        jsonData.push(item);
      }
    });
    setChatListDataa(jsonData);
  };

  return (
    <div className="main__chatbody">
      {/* <img
        src="fetch_dm_image?url=https://ton.twitter.com/1.1/ton/data/dm/1570857004800905221/1570857002213036038/EjY__axe.jpg"
        alt="test"
      /> */}
      <div className="main__chatlist">
        {/* <button className="btn">
          <i className="fa fa-plus"></i>
          <span>New conversation</span>
        </button> */}
        <div className="chatlist__heading">
          <h2>Tickets</h2>
          <button className="btn-nobg">
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input
              type="text"
              placeholder="Search Here"
              onKeyUp={(e) => searchFunc(e.target.value)}
              required
            />
            <span className="search-btn">
              <i className="fa fa-search"></i>
            </span>
          </div>
        </div>
        <div className="chatlist__items">
          {chatListDataa.map((item, index) => {
            const { name } = item;
            // const key = item.id;
            const animationDelay = index + 1;
            const active = item.active ? "active" : "";
            // const isOnline = item.isOnline ? "active" : "";
            const { backgroundCol, letter, isOnline } = item;
            return (
              <div
                style={{ animationDelay: `0.${animationDelay}s` }}
                onClick={(e) => selectChat(e, item)}
                className={`chatlist__item ${active || ""} `}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              >
                <Avatar isOnline={isOnline} backgroundCol={backgroundCol} letter={letter} />

                <div className="userMeta">
                  <p>{name}</p>
                  <span className="activeTime">
                    {item.time.date}
                    <br />
                    {item.time.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="content__header__main">
            <div className="current-chatting-user">
              <Avatar
                isOnline={curClientObj.isOnline}
                backgroundCol={curClientObj.backgroundCol}
                letter={curClientObj.letter}
              />
              <div>
                <p className="namee">{curClientObj.name}</p>
                {curClientObj.channel && <p className="channel">channel: {curClientObj.channel}</p>}
              </div>
              <span
                style={{
                  margin: 5,
                  backgroundColor: "#777",
                  color: "#333",
                  padding: "5px",
                  borderRadius: 5,
                  fontSize: "13px",
                  // width: "20mm",
                  // justifyContent: "center",
                }}
              >
                <p>{curClientObj.status && "OPENED"}</p>
                <p>{!curClientObj.status && curClientObj.isResolved === false && "CLOSED"}</p>
                <p>{!curClientObj.status && curClientObj.isResolved === true && "RESOLVED"}</p>
              </span>
            </div>
          </div>
          <div className="content__header__right">
            <div>
              <div className="buttonStyle resolve">
                <button className="" onClick={() => handleResolveTicket(ticketIDx)} id="">
                  Resolve
                </button>
              </div>
            </div>
            {!curClientObj.status && (
              <div>
                <div className="buttonStyle reopen">
                  <button className="" onClick={() => handleReopenTicket(ticketIDx)} id="">
                    Reopen
                  </button>
                </div>
              </div>
            )}
            {curClientObj.status && (
              <div>
                <div className="buttonStyle close">
                  <button className="" onClick={() => handleCloseTicket(ticketIDx)} id="">
                    close
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div> */}
        </div>
        <div className="content__body">
          {chatDataa.length === 0 && (
            <div className="sendInitial">
              <p className="initialMessage">
                send a message to {curClientObj.name || clientDatax.corporateName}
              </p>
            </div>
          )}
          <div className="chat__items">
            <ScrollToBottom className="message-container">
              <>
                {/* <div ref={messagesEndRef}> */}
                {chatDataa.map((itm) => {
                  // const animationDelay = index + 2;
                  const { id, time } = itm;
                  const user = itm.type ? itm.type : "me";
                  const msgx = itm.msg;
                  // const { backgroundCol } = itm;
                  // const { letter } = itm;
                  return (
                    <>
                      <div
                        style={{ animationDelay: `0.8s` }}
                        className={`chat__item ${user || ""}`}
                        // eslint-disable-next-line react/no-array-index-key
                        key={id}
                      >
                        <div className="chat__item__content">
                          <div className="chat__msg">
                            <p>{msgx}</p>
                          </div>
                          <div className="chat__meta">
                            {/* <span id="author">{user || "you"}</span> */}
                            <span id="time">{changeTime(time)}</span>
                          </div>
                        </div>
                        {/* <Avatar isOnline="active" backgroundCol={backgroundCol} letter={letter} /> */}
                      </div>
                    </>
                  );
                })}
                {/* </div> */}
              </>
            </ScrollToBottom>
            {!sticky && <button onClick={scrollToBottom}>Click me to scroll to bottom</button>}
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input
              type="text"
              placeholder="Type a message here"
              onKeyUp={(ev) => ev.key === "Enter" && sendMessage()}
              onChange={onStateChange}
              value={msg}
            />
            <button className="btnSendMsg" onClick={sendMessage} id="sendMsgBtn">
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="main__userprofile">
        <div className="profile__card user__profile__image">
          <div className="profile__image">
            <div
              className="profile_img"
              style={{ backgroundColor: `${curClientObj.backgroundCol}` }}
            >
              <div className="profile_letter">{curClientObj.letter}</div>
            </div>
          </div>
          <h4>
            {clientDatax ? (
              <>
                {clientDatax.corporateName ? (
                  <>{clientDatax.corporateName}</>
                ) : (
                  <>
                    {clientDatax.title && <>{clientDatax.title}&nbsp;</>}
                    {clientDatax.fname && <>{clientDatax.fname}&nbsp;</>}
                    {clientDatax.oname && <>{clientDatax.oname}&nbsp;</>}
                    {clientDatax.lname && <>{clientDatax.lname}</>}
                  </>
                )}
              </>
            ) : (
              <>{curClientObj.name}</>
            )}
          </h4>
          <p>
            <>
              {clientDatax.street && <>{clientDatax.street},&nbsp;</>}
              {clientDatax.city && <>{clientDatax.city},&nbsp;</>}
              {clientDatax.state && <>{clientDatax.state},&nbsp;</>}
              {clientDatax.country && <>{clientDatax.country}</>}
            </>
          </p>
          {clientDatax.occupation && <p>Occupation:&nbsp;{clientDatax.occupation}</p>}
          {clientDatax.portfolio && <p>Portfolio:&nbsp;{clientDatax.portfolio}</p>}
          <br />
          <br />
        </div>
        <div className="profile__card">
          <div className="card__header" onClick={toggleInfo}>
            <h4>Information</h4>
            <i className="fa fa-angle-down"></i>
          </div>
          <div className="card__content" id="cardContent">
            <>
              {clientDatax.email && <p>Email:&nbsp;{clientDatax.email}</p>}
              {clientDatax.pno && <p>Phone Number:&nbsp;{clientDatax.pno}</p>}
              {clientDatax.twitter && <p>Email:&nbsp;{clientDatax.twitter}</p>}
              {clientDatax.linkedIn && <p>LinkedIn:&nbsp;{clientDatax.linkedIn}</p>}
              {clientDatax.facebook && <p>Facebook:&nbsp;{clientDatax.facebook}</p>}
              {clientDatax.instagram && <p>Instagram:&nbsp;{clientDatax.instagram}</p>}
            </>
          </div>
        </div>
      </div>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </div>
  );
}
