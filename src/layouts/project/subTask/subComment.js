/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable object-shorthand */
import React, { useEffect, useState, useRef } from "react";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import GHeaders from "getHeader";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// eslint-disable-next-line react/prop-types
const subTaskComment = ({ subTaskId }) => {
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  // const [createdByx, setCreatedByx] = useState("");
  // const [createdTime, setCreatedTime] = useState("");
  // const [actionTakenx, setActionTaken] = useState("");
  const [taskAudits, setTaskAudit] = useState([]);
  const [eff, setEff] = useState(0);
  const [opened, setOpened] = useState(false);
  const [updateDetails, setUpdateDetails] = useState({});
  const [updating, setUpdating] = useState(false);
  const { allPHeaders: myHeaders } = PHeaders();
  const [comment, setComment] = useState("");
  const messagesEndRef = useRef(null);
  const details = JSON.parse(localStorage.getItem("userOtherDets"));
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  };
  useEffect(() => scrollToBottom(), [taskAudits]);
  useEffect(() => {
    console.log(subTaskId);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskAudit/getForSubTask/${orgIDs}/${subTaskId}`, {
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
        if (isMounted) {
          if (result.length !== 0) {
            fetch(
              `${process.env.REACT_APP_HALIFAX_URL}/taskComment/getForSubTask/${orgIDs}/${subTaskId}`,
              {
                headers,
              }
            )
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                return res.json();
              })
              .then((resultz) => {
                console.log(resultz);
                resultz.forEach((items) => {
                  // eslint-disable-next-line no-param-reassign
                  items.actionOn = items.createdTime;
                  // eslint-disable-next-line no-param-reassign
                  items.actionTaken = "Commented";
                });
                const rez = result.concat(resultz).sort((a, b) => a.actionOn - b.actionOn);
                setTaskAudit(rez);
                console.log(rez);
              });
            // setCreatedByx(result[0].actionByName);
            // setCreatedTime(result[0].actionOn);
            // setActionTaken(result[0].actionTaken);
          }
        }
      });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line no-use-before-define
  }, [subTaskId, eff]);

  //  Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  const commenter = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      if (!updating) {
        setOpened(true);
        const newTA = [];
        newTA.push(
          {
            actionTaken: "Commented",
            actionOn: new Date().getTime(),
            id: 0,
            actionByName: `${details.personal.fname} ${details.personal.lname}`,
            comment: comment,
          },
          {
            actionOn: new Date().getTime(),
            projectID: taskAudits[0].projectID,
            taskID: taskAudits[0].taskID,
            actionByName: `${details.personal.fname} ${details.personal.lname}`,
            actionTaken: "added the comment above on",
          }
        );
        const finalTA = newTA.concat(taskAudits).sort((a, b) => a.actionOn - b.actionOn);
        console.log(subTaskId);
        const data11 = JSON.parse(localStorage.getItem("user1"));
        const orgIDs = data11.orgID;
        const createdByx = data11.personalID;
        const raw = JSON.stringify({
          orgID: orgIDs,
          projectID: taskAudits[0].projectID,
          // taskID: subTaskId,
          comment: comment,
          empID: createdByx,
          subTaskID: subTaskId,
        });

        console.log(raw);
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskComment/add`, requestOptions)
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resultr) => {
            console.log(resultr);
            if (resultr.data !== null) {
              const raww = JSON.stringify({
                orgID: orgIDs,
                projectID: taskAudits[0].projectID,
                // taskID: taskAudits[0].taskID,
                subTaskID: taskAudits[0].subTaskID,

                actionBy: createdByx,
                actionTaken: "added the comment above on",
              });
              console.log(raw);
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
                  setEff(eff + 1);
                  setOpened(false);
                })
                .catch((errorr) => {
                  console.log(errorr.status);
                });
            }
          });
        // eslint-disable-next-line no-unused-expressions
        setTaskAudit(finalTA);
        setComment("");
        console.log(taskAudits);
      } else {
        // eslint-disable-next-line no-lonely-if
        if (e.target.value !== "") {
          console.log("updating", updateDetails);
          setComment("");
          setUpdating(false);
          const raw = JSON.stringify({
            id: updateDetails.id,
            orgID: updateDetails.orgID,
            projectID: updateDetails.projectID,
            taskID: updateDetails.taskID,
            subTaskID: updateDetails.subTaskID,
            comment: e.target.value,
            empID: updateDetails.empID,
            createdTime: updateDetails.createdTime,
            deleteFlag: updateDetails.deleteFlag,
          });
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
          console.log(raw);
          setOpened(true);
          fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskComment/update`, requestOptions)
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
              setEff(eff + 1);
              setOpened(false);
            });
        }
      }
    }
  };
  const commenter2 = () => {
    if (comment !== "") {
      if (!updating) {
        const newTA = [];
        newTA.push(
          {
            actionTaken: "Commented",
            actionOn: new Date().getTime(),
            id: 0,
            actionByName: `${details.personal.fname} ${details.personal.lname}`,
            comment: comment,
          },
          {
            projectID: taskAudits[0].projectID,
            actionByName: `${details.personal.fname} ${details.personal.lname}`,
            taskID: taskAudits[0].taskID,
            actionOn: new Date().getTime(),
            actionTaken: "added the comment above on",
          }
        );
        console.log(subTaskId);
        setOpened(true);
        const finalTA = newTA.concat(taskAudits).sort((a, b) => a.actionOn - b.actionOn);
        const data11 = JSON.parse(localStorage.getItem("user1"));
        const orgIDs = data11.orgID;
        const createdByx = data11.personalID;
        const raw = JSON.stringify({
          orgID: orgIDs,
          projectID: taskAudits[0].projectID,
          subTaskID: subTaskId,
          comment: comment,
          empID: createdByx,
        });

        console.log(raw);
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskComment/add`, requestOptions)
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resultr) => {
            console.log(resultr);
            if (resultr.data !== null) {
              const raww = JSON.stringify({
                orgID: orgIDs,
                projectID: taskAudits[0].projectID,
                subTaskID: taskAudits[0].subTaskID,
                actionBy: createdByx,
                actionTaken: "added the comment above on",
              });
              console.log(raw);
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
                  setEff(eff + 1);
                  setOpened(false);
                })
                .catch((errorr) => {
                  console.log(errorr.status);
                });
            }
          });
        // eslint-disable-next-line no-unused-expressions
        setTaskAudit(finalTA);
        setComment("");
        console.log(taskAudits);
      } else {
        // eslint-disable-next-line no-lonely-if
        if (comment !== "") {
          console.log("updating", updateDetails);
          setUpdating(false);
          const raw = JSON.stringify({
            id: updateDetails.id,
            orgID: updateDetails.orgID,
            projectID: updateDetails.projectID,
            taskID: updateDetails.taskID,
            subTaskID: updateDetails.subTaskID,
            comment: comment,
            empID: updateDetails.empID,
            createdTime: updateDetails.createdTime,
            deleteFlag: updateDetails.deleteFlag,
          });
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
          console.log(raw);
          setOpened(true);
          setComment("");
          fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskComment/update`, requestOptions)
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
              setEff(eff + 1);
              setOpened(false);
            });
        }
      }
    }
  };
  const handleDelete = (value) => {
    const requestOptions = {
      method: "DELETE",
      headers: miHeaders,
    };
    setOpened(true);
    fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskComment/delete/${value}`, requestOptions)
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
        // eslint-disable-next-line no-unused-expressions
        setEff(eff + 1);
        if (resx.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resx.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resx.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        const data11 = JSON.parse(localStorage.getItem("user1"));
        const createdByx = data11.personalID;
        console.log(resx.status);
        const raww = JSON.stringify({
          orgID: taskAudits[0].orgID,
          projectID: taskAudits[0].projectID,
          subTaskID: taskAudits[0].subTaskID,
          actionBy: createdByx,
          actionTaken: "deleted a comment",
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
            setOpened(false);
            console.log(result.status);
          })
          .catch((errorr) => {
            console.log(errorr.status);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdate = (val) => {
    console.log(val);
    setUpdateDetails(val);
    setUpdating(true);
    setComment(val.comment);
  };

  return (
    <div>
      <div style={{ overflowY: "scroll", overflowX: "hidden", height: "50vh", left: "10vw" }}>
        <MDTypography variant="h3" textAlign="center" fontWeight="light" color="secondary" mt={1}>
          Sub-TASK AUDIT
        </MDTypography>
        <div>
          {taskAudits.map((item) => {
            if (item.actionTaken !== "Commented")
              return (
                <MDTypography
                  fontSize="11px"
                  textAlign="center"
                  fontWeight="light"
                  color="secondary"
                  mt={1}
                  key={item.id}
                >
                  {item.actionByName} {item.actionTaken} {changeDate(item.actionOn)}
                </MDTypography>
              );
            return (
              <Card
                style={{
                  border: "gray 2px solid",
                  textAlign: "left",
                  paddingLeft: "5%",
                  marginTop: "2%",
                  fontSize: "13px",
                  marginBottom: "-2%",
                }}
              >
                {item.comment}{" "}
                <div className="row" style={{ marginLeft: "22vw" }}>
                  <div className="col-sm-2">
                    <EditIcon
                      style={{
                        // marginRight: "5vw",
                        height: "25px",
                        width: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        console.log(item.id);
                        handleUpdate(item);
                      }}
                    />
                  </div>
                  <div className="col-sm-2">
                    <DeleteForeverIcon
                      style={{
                        height: "25px",
                        marginLeft: "9px",
                        cursor: "pointer",
                        width: "25px",
                      }}
                      onClick={() => {
                        console.log(item.id);
                        handleDelete(item.id);
                      }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <br />
      <MDInput
        label={updating ? "Updating a comment" : "Add a comment"}
        onKeyDown={(e) => commenter(e)}
        size="small"
        style={{ width: "25rem" }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      &nbsp;
      <MDButton color="info" size="small" onClick={() => commenter2()}>
        <Icon fontSize="small">send</Icon>
      </MDButton>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </div>
  );
};

export default subTaskComment;
