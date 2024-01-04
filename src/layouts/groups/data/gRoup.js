/* eslint-disable react/prop-types */

// @mui material components

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

export default function data() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  // Method to handle diable
  const handleUpdate = (idx, namex, descripx, createdTimex, deleteFlagx) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      name: namex,
      descrip: descripx,
      createdTime: createdTimex,
      deleteFlag: deleteFlagx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_SHASHA_URL}/groups/update`, requestOptions)
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
    let namex = "";
    let descripx = "";
    let createdTimex = 0;
    let deleteFlagx = 0;
    // Avoid filter for empty string
    if (!value) {
      namex = "";
      descripx = "";
      createdTimex = 0;
      deleteFlagx = 0;
    } else {
      const filteredItems = filteredData.filter((item) => item.group.id === value);
      //   console.log(filterItems);
      namex = filteredItems[0].group.name;
      descripx = filteredItems[0].group.descrip;
      createdTimex = filteredItems[0].group.createdTime;
      deleteFlagx = filteredItems[0].group.deleteFlag;
    }

    MySwal.fire({
      title: "Update Group",
      html: `<table><tr><td>
      <label for="name">Name</label></td>
      <td><input type="text" id="name" value="${namex}" class="swal2-input" placeholder="Name"></td></tr><br>
      <tr><td><label for="descrip">Description</label></td>
      <td><input type="text" class="swal2-input" id="descrip" value="${descripx}" placeholder="Description"></td></tr>
      </td></tr></table>`,
      confirmButtonText: "Save",
      showCancelButton: true,
      confirmButtonColor: "#f96d02",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name").value;
        const descrip = Swal.getPopup().querySelector("#descrip").value;
        const id = value;
        const letters = /^[a-zA-Z ]+$/;
        if (name.length > 0 && !name.match(letters)) {
          Swal.showValidationMessage(`Name - Please write a name and use only letters`);
        } else {
          handleUpdate(id, name, descrip, createdTimex, deleteFlagx);
        }
      },
    });
  };

  // Method to handle diable
  const handleDisable = (id) => {
    console.log(id);
    console.log("getGroup");
    const headers = miHeaders;
    // let resultxx = resultxx;

    // let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/groups/getByIds/${id}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultxx) => {
        if (resultxx.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (resultxx.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (resultxx.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
        console.log(resultxx);
        // if (isMounted) {
        // setItems(result);
        // }
        MySwal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f96d02",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            if (resultxx.groupMembers !== []) {
              // const headers = miHeaders;

              // let isMounted = true;
              // fetch(`${process.env.REACT_APP_SHASHA_URL}/groups/getByIds/${id}`, { headers })
              //   .then(async (res) => {
              //     const aToken = res.headers.get("token-1");
              //     localStorage.setItem("rexxdex", aToken);
              //     return res.json();
              //   })
              //   .then((resultxx) => {
              //     if (resultxx.message === "Expired Access") {
              //       navigate("/authentication/sign-in");
              //       window.location.reload();
              //     }
              //     if (resultxx.message === "Token Does Not Exist") {
              //       navigate("/authentication/sign-in");
              //       window.location.reload();
              //     }
              //     if (resultxx.message === "Unauthorized Access") {
              //       navigate("/authentication/forbiddenPage");
              //       window.location.reload();
              //     }
              //     console.log(resultxx);
              // if (isMounted) {
              //   setItems(result);
              // }
              // if (resultxx.status === "SUCCESS") {
              console.log("finalLap");
              // const ID = result.data.id;
              // console.log(ID);
              // const raw2 = JSON.stringify({
              //   orgID: orgid,
              //   groupID: ID,
              //   empID: data11.personalID,
              // });
              // console.log(raw2);
              const requestOptions2 = {
                method: "DELETE",
                headers: miHeaders,
              };
              const resultMap = resultxx[0].groupMembers;
              // eslint-disable-next-line array-callback-return
              resultMap.map((val) => {
                // const headers = miHeaders;
                fetch(
                  `${process.env.REACT_APP_SHASHA_URL}/groups/removeMember/${val.orgID}/${val.groupID}/${val.empID}`,
                  requestOptions2
                )
                  .then(async (res) => {
                    const aToken = res.headers.get("token-1");
                    localStorage.setItem("rexxdex", aToken);
                    return res.json();
                  })
                  .then((resultx) => {
                    // setOpened(false);
                    if (resultx.message === "Expired Access") {
                      navigate("/authentication/sign-in");
                      window.location.reload();
                    }
                    if (resultx.message === "Token Does Not Exist") {
                      navigate("/authentication/sign-in");
                      window.location.reload();
                    }
                    if (resultx.message === "Unauthorized Access") {
                      navigate("/authentication/forbiddenPage");
                      window.location.reload();
                    }
                    console.log(resultx);
                    if (resultx.status === "SUCCESS") {
                      const requestOptions = {
                        method: "DELETE",
                        headers: miHeaders,
                      };
                      console.log(requestOptions);
                      fetch(
                        `${process.env.REACT_APP_SHASHA_URL}/groups/delete/${id}`,
                        requestOptions
                      )
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
                          console.log(resx);
                          if (resx.status === "SUCCESS") {
                            console.log("getGroup");
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
                    // window.location.reload();
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              });
              // }
              // });
            }
            console.log("okay");
            const requestOptions = {
              method: "DELETE",
              headers: miHeaders,
            };
            console.log(requestOptions);
            fetch(`${process.env.REACT_APP_SHASHA_URL}/groups/delete/${id}`, requestOptions)
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
                console.log(resx);
                if (resx.status === "SUCCESS") {
                  console.log("getGroup");
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
      });
  };

  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };
  // Method to change type

  // Method to fetch all timeofftype
  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/groups/gets/${orgIDs}`, { headers })
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
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const notification = (value) => {
    const filteredItems = items.filter((item) => item.group.id === value);
    navigate(`/Notifications?id=${value}&name=${filteredItems[0].group.name}`);
  };
  // Return table
  return {
    columns: [
      { Header: "name", accessor: "group.name", align: "left" },
      { Header: "description", accessor: "group.descrip", align: "left" },
      {
        Header: "Date Created",
        accessor: "group.createdTime",
        Cell: ({ cell: { value } }) => changeDate(value),
        align: "left",
      },
      {
        Header: "actions",
        accessor: "group.id",
        Cell: ({ cell: { value } }) => (
          <div
            style={{
              width: "100%",
              backgroundColor: "#f5f5f5",
              borderRadius: "2px",
            }}
          >
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <Icon sx={{ fontWeight: "light" }}>settings</Icon>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(`/View-Group?id=${value}`)}>
                  View
                </Dropdown.Item>
                <Dropdown.Item onClick={() => notification(value)}>Notifications</Dropdown.Item>
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
