/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { deepPurple, pink } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// eslint-disable-next-line react/prop-types
const SubtaskAvailable = ({ taskID, assignedToName }) => {
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [items, setItems] = useState([]);

  const handleTaskDelete = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f96d02",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed === true) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };
        fetch(`${process.env.REACT_APP_HALIFAX_URL}/task/delete/${id}`, requestOptions)
          .then((res) => res.json())
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
              window.location.reload();
            });
          })
          .catch((error) => {
            MySwal.fire({
              title: error.status,
              type: "error",
              text: error.message,
            });
          });
      }
    });
  };

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
        }
        if (result.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (result.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
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
      <Stack direction="row" spacing={10}>
        <DeleteIcon onClick={() => handleTaskDelete(taskID)} style={{ cursor: "default" }} />
        {items.length > 0 ? (
          <Avatar
            sx={{ bgcolor: deepPurple[500], width: 19, height: 19 }}
            style={{
              fontSize: "13px",
            }}
          >
            {items.length}
          </Avatar>
        ) : (
          <></>
        )}
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
    </div>
  );
};

export default SubtaskAvailable;
