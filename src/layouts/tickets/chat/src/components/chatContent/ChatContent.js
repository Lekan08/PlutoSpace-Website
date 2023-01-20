import React, { useState, createRef, useEffect } from "react";

import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";

export default function ChatContent({ id, name }) {
  console.log(localStorage.getItem("chatName"));
  console.log(name);
  const messagesEndRef = createRef(null);

  const [msg, setMsg] = useState("");

  const [chatDataa, setChatDataa] = useState([]);
  const chatItms = [
    {
      key: 1,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Hi Tim, How are you?",
    },
    {
      key: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I am fine.",
    },
    {
      key: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "What about you?   padding: 10px; border-radius: 10px 10px 0 10px; min-width: 215px;width: auto;height: auto;min-height: 40px;max-width: 120px;background-color: #43a047;color: white;display: flex;align-items: center;margin-right: 5px;padding-left: 5px;overflow-wrap: break-word;word-break: break-word;",
    },
    {
      key: 4,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Awesome these days.",
    },
    {
      key: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "Finally. What's the plan?",
    },
    {
      key: 6,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "what plan mate?",
    },
    {
      key: 7,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I'm taliking about the tutorial",
    },
  ];
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      let chatData = [];
      chatItms.map((item) => {
        const colorrray = [
          "#3b5bfe",
          "#7DFF33",
          "#FF3361",
          "#E6FF33",
          "#FFB533",
        ];
        const randomCol =
          colorrray[Math.floor(Math.random() * colorrray.length)];
        let lett = "";
        if (item.type) {
          const typpp = item.type;
          lett = typpp.charAt(0).toUpperCase();
        } else {
          lett = "M";
        }
        const dataa = {
          key: item.key,
          backgroundCol: randomCol,
          letter: lett,
          type: item.type,
          msg: item.msg,
        };
        chatData.push(dataa);
      });
      setChatDataa(chatData);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      scrollToBottom();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleMessage = () => {
    if (msg !== "") {
      const colorrray = ["#3b5bfe", "#7DFF33", "#FF3361", "#E6FF33", "#FFB533"];
      const randomCol = colorrray[Math.floor(Math.random() * colorrray.length)];
      let lett = "M";

      const dataa = {
        key: chatDataa.length + 1,
        backgroundCol: randomCol,
        letter: lett,
        type: "",
        msg: msg,
      };
      setChatDataa((list) => [...list, dataa]);
      scrollToBottom();
      setMsg("");
    }
  };
  const onStateChange = (e) => {
    setMsg(e.target.value);
  };

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar
              isOnline="active"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
            />
            <p>
              {name} &nbsp; {id}
            </p>
          </div>
        </div>

        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg">
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="content__body">
        <div className="chat__items">
          {chatDataa.map((itm, index) => {
            const animationDelay = index + 2;
            const key = itm.key;
            const user = itm.type ? itm.type : "me";
            const msg = itm.msg;
            const backgroundCol = itm.backgroundCol;
            const letter = itm.letter;
            return (
              <div
                style={{ animationDelay: `0.8s` }}
                className={`chat__item ${user ? user : ""}`}
              >
                &nbsp;
                <div className="chat__item__content">
                  <div className="chat__msg">{msg}</div>
                  <div className="chat__meta">
                    <span id="author">{user ? user : "you"}</span>
                    <span id="time">1:30PM</span>
                  </div>
                </div>
                <Avatar
                  isOnline="active"
                  backgroundCol={backgroundCol}
                  letter={letter}
                />
              </div>
            );
          })}
          <div ref={messagesEndRef} />
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
            onKeyPress={(event) => {
              event.key === "Enter" && handleMessage();
            }}
            onChange={onStateChange}
            value={msg}
          />
          <button
            className="btnSendMsg"
            onClick={handleMessage}
            id="sendMsgBtn"
          >
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
