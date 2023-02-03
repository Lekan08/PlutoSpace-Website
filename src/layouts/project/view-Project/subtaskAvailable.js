/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { deepPurple, pink } from "@mui/material/colors";
import Stack from "@mui/material/Stack";

// eslint-disable-next-line react/prop-types
const SubtaskAvailable = ({ taskID, assignedToName }) => {
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_HALIFAX_URL}/subtask/gets/${orgIDs}/${taskID}`, {
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
          if (result.lenght !== 0) {
            console.log(taskID);
            setItems(result);
          }
          console.log(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div style={{ marginTop: "auto", textAlign: "center" }}>
      {items.length > 0 ? (
        <Stack direction="row" spacing={20}>
          <Avatar
            sx={{ bgcolor: deepPurple[500], width: 19, height: 19 }}
            style={{
              fontSize: "13px",
            }}
          >
            {items.length}
          </Avatar>
          {assignedToName !== null ? (
            <Avatar
              sx={{ bgcolor: pink[500], width: 19, height: 19 }}
              style={{
                fontSize: "13px",
              }}
            >
              {assignedToName.substring(0, 2).toUpperCase()}
            </Avatar>
          ) : (
            <></>
          )}
        </Stack>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SubtaskAvailable;
