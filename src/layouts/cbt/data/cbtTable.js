// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

export default function CBTTable() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);
  // const [minutes, setMinute] = useState("");

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  // const OnTimeStamp = minutes * 60 * 1000;

  const navigate = useNavigate();
  // Method to handle update
  const handleUpdate = (titlex, descripx, duration, filteredItems) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const durationx = duration * 60 * 1000;
    const raw = JSON.stringify({
      id: filteredItems.id,
      title: titlex,
      orgID: orgIDs,
      duration: durationx,
      descrip: descripx,
      status: filteredItems.status,
      createdTime: filteredItems.createdTime,
      deleteFlag: filteredItems.deleteFlag,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_RAGA_URL}/cbt/update`, requestOptions)
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
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
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
  };

  // Method to filter departments
  const handleShow = (filteredData, value) => {
    let titlex = "";
    let descripx = "";
    let duration = "";
    let filteredItems = [];
    // Avoid filter for empty string
    if (!value) {
      titlex = "";
      descripx = "";
      duration = "";
      filteredItems = [];
    } else {
      filteredItems = filteredData.filter((item) => item.id === value);

      titlex = filteredItems[0].title;
      descripx = filteredItems[0].descrip;
      duration = filteredItems[0].duration;
    }
    const BiGZzzz = duration / 60000;
    // console.log(BiGZzzz);

    MySwal.fire({
      title: "Update CBT",
      html: `<div text-align="left"><b>Title:</b> <input type="text" id="title" value="${titlex}" class="form-control">\
            <div text-align="left"><b>Time in Minutes:</b> <input type="text" id="minutes" value="${BiGZzzz}" class="form-control">\
           <b>Description:</b> <textarea rows="4" cols="8" class="form-control" id="descrip">${descripx}</textarea></div>`,
      confirmButtonText: "Save",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const title = Swal.getPopup().querySelector("#title").value;
        const descrip = Swal.getPopup().querySelector("#descrip").value;
        const minutesx = Swal.getPopup().querySelector("#minutes").value;
        if (!title) {
          Swal.showValidationMessage(`Error In Input For Title`);
        } else {
          Swal.resetValidationMessage();
          handleUpdate(title, descrip, minutesx, filteredItems[0]);
        }
      },
    });
    // console.log(duration);
  };

  // Method to handle disable
  const handleDisable = (value) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(`${process.env.REACT_APP_RAGA_URL}/cbt/delete/${value}`, requestOptions)
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
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

  // Method to handle change status
  const handleStatus = (value, status) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to easily revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "GET",
          headers: miHeaders,
        };

        fetch(
          `${process.env.REACT_APP_RAGA_URL}/cbt/changeStatus/${value}/${status}`,
          requestOptions
        )
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
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

  // Method to change type
  const changeType = (status) => {
    if (status === 0) {
      return "Created";
    }
    if (status === 1) {
      return "Open";
    }
    return "Closed";
  };

  const changeCol = (status) => {
    if (status === 0) {
      return "#0000aa";
    }
    if (status === 1) {
      return "#FAFA33";
    }
    return "#FF0000";
  };

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  // Method to fetch all departments
  // env.environments
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/cbt/gets/${orgIDs}`, { headers })
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
        // console.log(result);
        if (isMounted) {
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Method to set CBT deadline
  // eslint-disable-next-line no-shadow
  const handleCBTDeadline = (filteredData, value) => {
    // console.log(value);
    let cbttime = "";
    let filteredItems = [];
    // Avoid filter for empty string
    if (!value) {
      cbttime = "";
      filteredItems = [];
    } else {
      filteredItems = filteredData.filter((item) => item.id === value);

      cbttime = new Date(filteredItems[0].deadline);
    }

    MySwal.fire({
      title: "Deadline For CBT",
      html: `<div text-align="left"><b>Time:</b> <input type="datetime-local" id="time" value="${cbttime}" class="form-control">`,
      confirmButtonText: "Save",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const time = Swal.getPopup().querySelector("#time").value;
        if (!time) {
          Swal.showValidationMessage(`Set a Specific Time`);
        } else {
          Swal.resetValidationMessage();
          // console.log(time);

          const data11 = JSON.parse(localStorage.getItem("user1"));
          const cbtTimex = new Date(time).getTime();
          // console.log(cbtTimex);

          const orgIDs = data11.orgID;
          const raw = JSON.stringify({
            id: filteredItems[0].id,
            title: filteredItems[0].title,
            orgID: orgIDs,
            duration: filteredItems[0].duration,
            descrip: filteredItems[0].descrip,
            status: filteredItems[0].status,
            jobPostID: filteredItems[0].jobPostID,
            deadline: cbtTimex,
            createdTime: filteredItems[0].createdTime,
            deleteFlag: filteredItems[0].deleteFlag,
          });

          // console.log(raw);
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch(`${process.env.REACT_APP_RAGA_URL}/cbt/update`, requestOptions)
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
              MySwal.fire({
                title: result.status,
                type: "success",
                text: result.message,
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
      },
    });
  };

  // eslint-disable-next-line no-lone-blocks
  {
    /* const handleAddQuestion = (value) => {
    navigate(`/cbt/question/?id=${value}`);
  }; */
  }
  const handleViewResult = (value) => {
    navigate(`/cbt/view-Results/?id=${value}`);
  };

  const handleQuestion = (value) => {
    navigate(`/cbt/add-questions/?id=${value}`);
  };

  // const handleAddAnswer = (value) => {
  //   navigate(`/cbt/takeCbt/?id=${value}`);
  // };

  const handleAssignCbtTestToJobPost = (value) => {
    navigate(`/CBT/assign-CBT-To-JobPost/?id=${value}`);
  };

  const toMinutes = (durationx) => {
    // console.log(duration);
    const date = durationx;
    const retDate = date / 60000;
    return retDate;
  };

  const changeTimeToZero = (timestamp) => {
    if (timestamp === 0) {
      return 0;
    }
    const date = new Date(timestamp);

    const retDate = date.toDateString();
    return retDate;
  };

  // Return table
  return {
    columns: [
      { Header: "title", accessor: "title", align: "left" },
      { Header: "description", accessor: "descrip", align: "left" },
      {
        Header: "Minutes for CBT",
        accessor: "duration",
        Cell: ({ cell: { value } }) => toMinutes(value),
        align: "left",
      },
      {
        Header: "Date Created",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeDate(value),
        align: "left",
      },
      {
        Header: "CBT Deadline",
        accessor: "deadline",
        Cell: ({ cell: { value } }) => changeTimeToZero(value),
        align: "left",
      },
      {
        Header: "Status",
        accessor: "status",
        // eslint-disable-next-line react/prop-types
        Cell: ({ cell: { value } }) => (
          <span className="badge badge-pill" style={{ backgroundColor: changeCol(value) }}>
            {changeType(value)}
          </span>
        ),
        align: "left",
      },
      {
        Header: "actions",
        accessor: "id",
        // eslint-disable-next-line react/prop-types
        Cell: ({ cell: { value } }) => (
          <div
            style={{
              width: "100%",
              backgroundColor: "#dadada",
              borderRadius: "2px",
            }}
          >
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <Icon sx={{ fontWeight: "light" }}>settings</Icon>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item>
                <Dropdown.Item onClick={() => handleStatus(value, 1)}>Open</Dropdown.Item>
                <Dropdown.Item onClick={() => handleStatus(value, 2)}>Close</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
                <Dropdown.Item onClick={() => handleViewResult(value)}>
                  View CBT Result
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleAssignCbtTestToJobPost(value)}>
                  Assign CBT To Job Post
                </Dropdown.Item>
                {/* <Dropdown.Item onClick={() => handleAddAnswer(value)}>
                  Take Cbt Question
                </Dropdown.Item> */}
                <Dropdown.Item onClick={() => handleQuestion(value)}>
                  Add Test Question To CBT
                </Dropdown.Item>
                {/* <Dropdown.Item onClick={() => handleAddQuestion(value)}>Add Question</Dropdown.Item> */}
                <Dropdown.Item onClick={() => handleCBTDeadline(items, value)}>
                  Set Deadline For CBT
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ),
        align: "left",
      },
    ],

    rows: items,
  };
}
