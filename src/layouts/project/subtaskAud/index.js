import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
import MDTypography from "components/MDTypography";
import "./style.css";

// eslint-disable-next-line react/prop-types
const SubtaskAudit1 = ({ taskId }) => {
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  // const [createdByx, setCreatedByx] = useState("");
  // const [createdTime, setCreatedTime] = useState("");
  // const [actionTakenx, setActionTaken] = useState("");
  const [subtaskAudits, setSubTaskAudit] = useState([]);

  useEffect(() => {
    console.log(taskId);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const subTaskID = taskId;
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_HALIFAX_URL}/taskAudit/getForSubTask/${orgIDs}/${subTaskID}`, {
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
          if (result.length !== 0) {
            setSubTaskAudit(result);
            console.log(result);
            // setCreatedByx(result[0].actionByName);
            // setCreatedTime(result[0].actionOn);
            // setActionTaken(result[0].actionTaken);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, [taskId]);

  //  Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  return (
    <div className={`container${subtaskAudits.length > 10 ? " scrollable" : ""}`}>
      <MDTypography variant="h5" textAlign="center" fontWeight="light" color="secondary" mt={1}>
        SUBTASK AUDIT
      </MDTypography>
      {subtaskAudits.map((item) => (
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
      ))}
    </div>
  );
};

export default SubtaskAudit1;
