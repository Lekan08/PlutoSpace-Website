/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import PHeaders from "postHeader";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./style.css";

const CommentCardTask = ({ taskId }) => {
  const [taskComment, setTaskComment] = useState([]);
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  const { allPHeaders: myHeaders } = PHeaders();

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;

    let isMounted = true;
    fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskComment/getForTask/${orgIDs}/${taskId}`, {
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
          console.log(result);
          setTaskComment(result);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  function getTimeCreated(createdAt) {
    const now = new Date();
    const created = new Date(createdAt);

    if (created.getDate() === now.getDate()) {
      // Comment created today
      const hours = created.getHours();
      const minutes = created.getMinutes();
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      // eslint-disable-next-line no-else-return
    } else if (created.getDate() === now.getDate() - 1) {
      // Comment created yesterday
      return "Yesterday";
    } else {
      // Comment created more than 2 days ago
      const daysAgo = Math.floor((now - created) / (1000 * 60 * 60 * 24));
      return `${daysAgo} days ago`;
    }
  }

  const handleDeleteComment = (value) => {
    const requestOptions = {
      method: "DELETE",
      headers: miHeaders,
    };

    fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskComment/delete/${value}`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
          window.location.reload();
        }
        console.log(resx);
        console.log(resx.status);
        if (resx.status === "SUCCESS") {
          setTaskComment(taskComment.filter((comment) => comment.id !== value));
          const filteredInfo = taskComment.filter((comment) => comment.id === value);
          console.log(filteredInfo);
          const data11 = JSON.parse(localStorage.getItem("user1"));
          const createdByx = data11.personalID;
          const raww = JSON.stringify({
            orgID: filteredInfo[0].orgID,
            projectID: filteredInfo[0].projectID,
            subTaskID: filteredInfo[0].subTaskID,
            actionBy: createdByx,
            actionTaken: "deleted a comment on",
          });
          console.log(raww);
          const requestOptionsx = {
            method: "POST",
            headers: myHeaders,
            body: raww,
            redirect: "follow",
          };
          fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskAudit/add`, requestOptionsx)
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
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
              console.log(result.status);
            })
            .catch((errorr) => {
              console.log(errorr.status);
            });
        }
      })
      .catch((error) => {
        console.log(error.status);
      });
  };

  return (
    <div className={`container${taskComment.length > 5 ? " scrollable" : ""}`}>
      {taskComment
        .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime)) // sort comments in reverse chronological order
        .map((comment) => (
          <div className="dialogbox" key={comment.id}>
            <div className="body">
              <span className="tip tip-up">
                <div
                  className="prefix"
                  data-initials={comment.empName.substring(0, 2).toUpperCase()}
                  data-name={comment.empName}
                >
                  <></>
                </div>
              </span>
              <div className="message">
                <span>{comment.comment}</span>
              </div>
              <div className="time-created">{getTimeCreated(comment.createdTime)}</div>

              <div className="icons">
                <span className="delete-icon">
                  <DeleteForeverIcon
                    style={{
                      height: "20px",
                      marginLeft: "9px",
                      cursor: "pointer",
                      width: "20px",
                    }}
                    onClick={() => {
                      handleDeleteComment(comment.id);
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CommentCardTask;
