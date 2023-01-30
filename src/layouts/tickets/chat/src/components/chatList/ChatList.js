import React, { useState, useEffect } from "react";
import "./chatList.css";
import Avatar from "./Avatar";

export default function ChatList() {
  const [chatListDataa, setChatListDataa] = useState([]);
  const allChatUsers = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      id: 1,
      name: "Tim Hover",
      active: true,
      isOnline: true,
    },
    {
      image:
        "https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
      id: 2,
      name: "Ayub Rossi",
      active: false,
      isOnline: false,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
      id: 3,
      name: "Hamaad Dejesus",
      active: false,
      isOnline: false,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
      id: 4,
      name: "Eleni Hobbs",
      active: false,
      isOnline: true,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
      id: 5,
      name: "Elsa Black",
      active: false,
      isOnline: false,
    },
    {
      image:
        "https://huber.ghostpool.com/wp-content/uploads/avatars/3/596dfc2058143-bpfull.png",
      id: 6,
      name: "Kayley Mellor",
      active: false,
      isOnline: true,
    },
    {
      image:
        "https://www.paintingcontest.org/components/com_djclassifieds/assets/images/default_profile.png",
      id: 7,
      name: "Hasan Mcculloch",
      active: false,
      isOnline: true,
    },
    {
      image:
        "https://auraqatar.com/projects/Anakalabel/media//vesbrand/designer4.jpg",
      id: 8,
      name: "Autumn Mckee",
      active: false,
      isOnline: false,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU",
      id: 9,
      name: "Allen Woodley",
      active: false,
      isOnline: true,
    },
    {
      image: "https://pbs.twimg.com/profile_images/770394499/female.png",
      id: 10,
      name: "Manpreet David",
      active: false,
      isOnline: true,
    },
  ];

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      let chatListData = [];
      allChatUsers.map((item) => {
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
        if (item.name) {
          const nameee = item.name;
          lett = nameee.charAt(0).toUpperCase();
        } else {
          lett = "?";
        }
        const dataa = {
          id: item.id,
          name: item.name,
          active: item.active,
          isOnline: item.isOnline,
          backgroundCol: randomCol,
          letter: lett,
        };
        chatListData.push(dataa);
      });
      setChatListDataa(chatListData);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const selectChat = (e) => {
    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  };

  return (
    <div className="main__chatlist">
      <button className="btn">
        <i className="fa fa-plus"></i>
        <span>New conversation</span>
      </button>
      <div className="chatlist__heading">
        <h2>Chats</h2>
        <button className="btn-nobg">
          <i className="fa fa-ellipsis-h"></i>
        </button>
      </div>
      <div className="chatList__search">
        <div className="search_wrap">
          <input type="text" placeholder="Search Here" required />
          <button className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="chatlist__items">
        {chatListDataa.map((item, index) => {
          const name = item.name;
          const key = item.id;
          const animationDelay = index + 1;
          const active = item.active ? "active" : "";
          const isOnline = item.isOnline ? "active" : "";
          const backgroundCol = item.backgroundCol;
          const letter = item.letter;
          return (
            <div
              style={{ animationDelay: `0.${animationDelay}s` }}
              onClick={selectChat}
              className={`chatlist__item ${active ? active : ""} `}
            >
              <Avatar
                isOnline="active"
                backgroundCol={backgroundCol}
                letter={letter}
              />

              <div className="userMeta">
                <p>{name}</p>
                <span className="activeTime">32 mins ago</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
