/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
// import MDButton from "components/MDButton";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GHeaders from "getHeader";
// import PHeaders from "postHeader";
import { useNavigate } from "react-router-dom";
// import TextWrapper from "react-text-wrapper";

export default function SingleIndividualTable() {
  const { allGHeaders: miHeaders } = GHeaders();
  // const { allPHeaders: myHeaders } = PHeaders();
  // const axios = require("axios");
  const [items, setItems] = useState([]);
  // const [id, setId] = useState("");
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };
  const handleDisable2 = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed === true) {
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };
        fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/delete/${id}`, requestOptions)
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

  // const handleDisable = (id) => {
  //   console.log(id);
  //   MySwal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const requestOptions = {
  //         method: "DELETE",
  //         headers: miHeaders,
  //       };
  //       console.log(requestOptions);
  //       fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/delete/${id}`, requestOptions)
  //         .then((res) => res.json())
  //         .then((resx) => {
  //           if (resx.message === "Expired Access") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (resx.message === "Token Does Not Exist") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (resx.message === "Unauthorized Access") {
  //             navigate("/authentication/forbiddenPage");
  //           }
  //           MySwal.fire({
  //             title: resx.status,
  //             type: "success",
  //             text: resx.message,
  //           }).then(() => {
  //             window.location.reload();
  //           });
  //         })
  //         .catch((error) => {
  //           MySwal.fire({
  //             title: error.status,
  //             type: "error",
  //             text: error.message,
  //           });
  //         });
  //     }
  //   });
  // };

  //   const handleView = (value) => {
  //     navigate(`/update?id=${value}`);
  //   };

  //   const handleUpdate = (
  //     idx,
  //     questionx,
  //     instructionx,
  //     hintx,
  //     imageUrlx,
  //     imageKeyx,
  //     createdTimex,
  //     deleteFlagx
  //   ) => {
  //     const data11 = JSON.parse(localStorage.getItem("user1"));

  //     const orgIDs = data11.orgID;
  //     const raw = JSON.stringify({
  //       id: idx,
  //       orgID: orgIDs,
  //       question: questionx,
  //       instruction: instructionx,
  //       hint: hintx,
  //       imageUrl: imageUrlx,
  //       imageKey: imageKeyx,
  //       createdTime: createdTimex,
  //       deleteFlag: deleteFlagx,
  //     });
  //     const requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };

  //     fetch(`${process.env.REACT_APP_RAGA_URL}/questions/update`, requestOptions)
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         return res.json();
  //       })
  //       .then((result) => {
  //         if (result.message === "Expired Access") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (result.message === "Token Does Not Exist") {
  //           navigate("/authentication/sign-in");
  //           window.location.reload();
  //         }
  //         if (result.message === "Unauthorized Access") {
  //           navigate("/authentication/forbiddenPage");
  //           window.location.reload();
  //         }
  //         MySwal.fire({
  //           title: result.status,
  //           type: "success",
  //           text: result.message,
  //         }).then(() => {
  //           window.location.reload();
  //         });
  //       })
  //       .catch((error) => {
  //         MySwal.fire({
  //           title: error.status,
  //           type: "error",
  //           text: error.message,
  //         });
  //       });
  //   };

  //   const handleView = (filteredData, value) => {
  //     let questionx = "";
  //     let instructionx = "";
  //     let hintx = "";
  //     let imageUrlx = "";
  //     let imageKeyx = "";
  //     let createdTimex = 0;
  //     let deleteFlagx = 0;
  //     // Avoid filter for empty string
  //     if (!value) {
  //       questionx = "";
  //       instructionx = "";
  //       hintx = "";
  //       imageUrlx = "";
  //       imageKeyx = "";
  //       createdTimex = 0;
  //       deleteFlagx = 0;
  //     } else {
  //       const filteredItems = filteredData.filter((item) => item.id === value);

  //       questionx = filteredItems[0].question;
  //       console.log(filteredItems);
  //       instructionx = filteredItems[0].instruction;
  //       hintx = filteredItems[0].hint;
  //       imageUrlx = filteredItems[0].imageUrl;
  //       imageKeyx = filteredItems[0].imageKey;
  //       createdTimex = filteredItems[0].createdTime;
  //       deleteFlagx = filteredItems[0].deleteFlag;
  //     }

  //     MySwal.fire({
  //       title: "Update Test Question",
  //       html: `<table><tr><td>
  //       <label for="qestion">Question</label></td>
  //       <td><input type="textarea" id="question" value="${questionx}" class="swal2-input" placeholder="Question"></td></tr><br>
  //       <tr><td><label for="instruct">Instruction</label></td>
  //       <td><input type="text" class="swal2-input" id="instruct" value="${instructionx}" placeholder="Instruction"></td></tr><br>
  //       <tr><td><label for="hint">Hint</label></td>
  //       <td><input type="text" class="swal2-input" id="hint" value="${hintx}" placeholder="Hint"></td></tr><br>
  //       <tr><td><label for="image">Image</label></td>
  //       <td><input type="text" class="swal2-input" id="image" value="${imageUrlx}" placeholder="Image"></td></tr></table>`,
  //       confirmButtonText: "Save",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       preConfirm: () => {
  //         const question = Swal.getPopup().querySelector("#question").value;
  //         const instruction = Swal.getPopup().querySelector("#instruct").value;
  //         const hint = Swal.getPopup().querySelector("#hint").value;
  //         const id = value;
  //         const letters = /^[a-zA-Z ,.?;:'#*!()" ]+$/;
  //         if (question.length > 0 && !question.match(letters)) {
  //           Swal.showValidationMessage(`Question - Please fill this field`);
  //         } else {
  //           handleUpdate(id, question, instruction, hint, imageKeyx, createdTimex, deleteFlagx);
  //         }
  //       },
  //     });
  //   };
  // Method to fetch all Data
  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/individual/gets/${orgIDs}`, { headers })
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
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const handleUpdate = (value) => {
    navigate(`/Individual/update?id=${value}`);
  };
  // const handleviewpsprequest = (value) => {
  //   navigate(`/Individual/update?id=${value}`);
  // };
  const handleView = (value) => {
    navigate(`/Individual/view?id=${value}`);
  };

  return {
    columns: [
      {
        Header: "First Name ",
        accessor: "fname",
        align: "left",
      },
      {
        Header: "Last Name ",
        accessor: "lname",
        align: "left",
      },
      { Header: "Email ", accessor: "email", align: "left" },
      { Header: "Country ", accessor: "country", align: "left" },
      { Header: "Phone Number", accessor: "pno", align: "left" },
      { Header: "Occupation ", accessor: "occupation", align: "left" },
      {
        Header: "Date Created",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeDate(value),
        align: "left",
      },
      {
        Header: "actions",
        accessor: "id",
        Cell: ({ cell: { value } }) => (
          <div
            style={{
              width: "100%",
              backgroundColor: "#dadada",
              borderRadius: "2px",
            }}
          >
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic-button">
                <Icon sx={{ fontWeight: "light" }}>settings</Icon>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleView(value)}>View</Dropdown.Item>
                <Dropdown.Item onClick={() => handleUpdate(value)}>Update</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable2(value)}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ),
        align: "center",
      },
    ],

    rows: items,
  };
}
