// // Soft UI Dashboard React components
// import { useEffect, useState } from "react";
// import { Dropdown } from "react-bootstrap";
// // Zinoleesky - Go Far
// import "bootstrap/dist/css/bootstrap.min.css";
// import Icon from "@mui/material/Icon";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// // import PHeaders from "postHeader";
// import GHeaders from "getHeader";
// import { useNavigate } from "react-router-dom";
// // Big Zzz

// export default function AssignCbtQuestionTable() {
//   const MySwal = withReactContent(Swal);
//   const [items, setItems] = useState([]);

//   // const { allPHeaders: myHeaders } = PHeaders();
//   const { allGHeaders: miHeaders } = GHeaders();

//   const navigate = useNavigate();
//   // Method to handle update
//   //   const handleUpdate = (titlex, descripx, filteredItems) => {
//   //     const data11 = JSON.parse(localStorage.getItem("user1"));

//   //     const orgIDs = data11.orgID;
//   //     const raw = JSON.stringify({
//   //       id: filteredItems.id,
//   //       title: titlex,
//   //       orgID: orgIDs,
//   //       descrip: descripx,
//   //       status: filteredItems.status,
//   //       createdTime: filteredItems.createdTime,
//   //       deleteFlag: filteredItems.deleteFlag,
//   //     });
//   //     const requestOptions = {
//   //       method: "POST",
//   //       headers: myHeaders,
//   //       body: raw,
//   //       redirect: "follow",
//   //     };

//   //     fetch(`${process.env.REACT_APP_RAGA_URL}/cbt/update`, requestOptions)
//   //       .then(async (res) => {
//   //         const aToken = res.headers.get("token-1");
//   //         localStorage.setItem("rexxdex", aToken);
//   //         return res.json();
//   //       })
//   //       .then((result) => {
//   //         if (result.message === "Expired Access") {
//   //           navigate("/authentication/sign-in");
//   //           window.location.reload();
//   //         }
//   //         if (result.message === "Token Does Not Exist") {
//   //           navigate("/authentication/sign-in");
//   //           window.location.reload();
//   //         }
//   //         if (result.message === "Unauthorized Access") {
//   //           navigate("/authentication/forbiddenPage");
//   //           window.location.reload();
//   //         }
//   //         MySwal.fire({
//   //           title: result.status,
//   //           type: "success",
//   //           text: result.message,
//   //         }).then(() => {
//   //           window.location.reload();
//   //         });
//   //       })
//   //       .catch((error) => {
//   //         MySwal.fire({
//   //           title: error.status,
//   //           type: "error",
//   //           text: error.message,
//   //         });
//   //       });
//   //   };

//   //   // Method to filter departments
//   //   const handleShow = (filteredData, value) => {
//   //     let titlex = "";
//   //     let descripx = "";
//   //     let filteredItems = [];
//   //     // Avoid filter for empty string
//   //     if (!value) {
//   //       titlex = "";
//   //       descripx = "";
//   //       filteredItems = [];
//   //     } else {
//   //       filteredItems = filteredData.filter((item) => item.id === value);

//   //       titlex = filteredItems[0].title;
//   //       descripx = filteredItems[0].descrip;
//   //     }

//   //     MySwal.fire({
//   //       title: "Update CBT",
//   //       html: `<div text-align="left"><b>Title:</b> <input type="text" id="title" value="${titlex}" class="form-control">\
//   //            <b>Description:</b> <textarea rows="4" cols="8" class="form-control" id="descrip">${descripx}</textarea></div>`,
//   //       confirmButtonText: "Save",
//   //       showCancelButton: true,
//   //       confirmButtonColor: "#f96d02",
//   //       cancelButtonColor: "#d33",
//   //       preConfirm: () => {
//   //         const title = Swal.getPopup().querySelector("#title").value;
//   //         const descrip = Swal.getPopup().querySelector("#descrip").value;
//   //         if (!title) {
//   //           Swal.showValidationMessage(`Error In Input For Title`);
//   //         } else {
//   //           Swal.resetValidationMessage();
//   //           handleUpdate(title, descrip, filteredItems[0]);
//   //         }
//   //       },
//   //     });
//   //   };

//   // Method to handle disable
//   const handleDisable = (value) => {
//     MySwal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#f96d02",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const requestOptions = {
//           method: "DELETE",
//           headers: miHeaders,
//         };

//         fetch(`${process.env.REACT_APP_RAGA_URL}/cbtQuestion/delete/${value}`, requestOptions)
//           .then(async (res) => {
//             const aToken = res.headers.get("token-1");
//             localStorage.setItem("rexxdex", aToken);
//             return res.json();
//           })
//           .then((resx) => {
//             if (resx.message === "Expired Access") {
//               navigate("/authentication/sign-in");
//             }
//             if (resx.message === "Token Does Not Exist") {
//               navigate("/authentication/sign-in");
//             }
//             if (resx.message === "Unauthorized Access") {
//               navigate("/authentication/forbiddenPage");
//             }
//             MySwal.fire({
//               title: resx.status,
//               type: "success",
//               text: resx.message,
//             }).then(() => {
//               window.location.reload();
//             });
//           })
//           .catch((error) => {
//             MySwal.fire({
//               title: error.status,
//               type: "error",
//               text: error.message,
//             });
//           });
//       }
//     });
//   };

//   // Method to handle change status
//   //   const handleStatus = (value, status) => {
//   //     MySwal.fire({
//   //       title: "Are you sure?",
//   //       text: "You won't be able to easily revert this!",
//   //       icon: "warning",
//   //       showCancelButton: true,
//   //       confirmButtonColor: "#f96d02",
//   //       cancelButtonColor: "#d33",
//   //       confirmButtonText: "Yes, Change it!",
//   //     }).then((result) => {
//   //       if (result.isConfirmed) {
//   //         const requestOptions = {
//   //           method: "GET",
//   //           headers: miHeaders,
//   //         };

//   //         fetch(
//   //           `${process.env.REACT_APP_RAGA_URL}/cbt/changeStatus/${value}/${status}`,
//   //           requestOptions
//   //         )
//   //           .then(async (res) => {
//   //             const aToken = res.headers.get("token-1");
//   //             localStorage.setItem("rexxdex", aToken);
//   //             return res.json();
//   //           })
//   //           .then((resx) => {
//   //             if (resx.message === "Expired Access") {
//   //               navigate("/authentication/sign-in");
//   //             }
//   //             if (resx.message === "Token Does Not Exist") {
//   //               navigate("/authentication/sign-in");
//   //             }
//   //             if (resx.message === "Unauthorized Access") {
//   //               navigate("/authentication/forbiddenPage");
//   //             }
//   //             MySwal.fire({
//   //               title: resx.status,
//   //               type: "success",
//   //               text: resx.message,
//   //             }).then(() => {
//   //               window.location.reload();
//   //             });
//   //           })
//   //           .catch((error) => {
//   //             MySwal.fire({
//   //               title: error.status,
//   //               type: "error",
//   //               text: error.message,
//   //             });
//   //           });
//   //       }
//   //     });
//   //   };

//   //   // Method to change type
//   //   const changeType = (status) => {
//   //     if (status === 0) {
//   //       return "Created";
//   //     }
//   //     if (status === 1) {
//   //       return "Open";
//   //     }
//   //     return "Closed";
//   //   };

//   //   const changeCol = (status) => {
//   //     if (status === 0) {
//   //       return "#0000aa";
//   //     }
//   //     if (status === 1) {
//   //       return "#FAFA33";
//   //     }
//   //     return "#FF0000";
//   //   };

//   // Method to change date from timestamp
//   //   const changeDate = (timestamp) => {
//   //     const date = new Date(timestamp);
//   //     const retDate = date.toDateString();
//   //     return retDate;
//   //   };

//   // Method to fetch all departments
//   // env.environments
//   useEffect(() => {
//     const headers = miHeaders;
//     const data11 = JSON.parse(localStorage.getItem("user1"));

//     const orgIDs = data11.orgID;
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const cbtIds = urlParams.get("id");
//     let isMounted = true;
//     fetch(`${process.env.REACT_APP_RAGA_URL}/cbtQuestion/gets/${orgIDs}/${cbtIds}`, { headers })
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
//         if (isMounted) {
//           setItems(result);
//         }
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const handleAddAnswer = (value) => {
//     navigate(`/cbt/answer/?id=${value}`);
//   };
//   //   const changeDate = (timestamp) => {
//   //     const date = new Date(timestamp);
//   //     const retDate = date.toDateString();
//   //     return retDate;
//   //   };

//   // Return table questionID
//   return {
//     columns: [
//       { Header: "Question", accessor: "questionID", align: "left" },
//       //   { Header: "Hint", accessor: "hint", align: "left" },
//       //   { Header: "Image", accessor: "imageUrl", align: "left" },
//       //   { Header: "Instruction", accessor: "instruction", align: "left" },
//       //   {
//       //     Header: "Date Created",
//       //     accessor: "createdTime",
//       //     Cell: ({ cell: { value } }) => changeDate(value),
//       //     align: "left",
//       //   },
//       //   {
//       //     Header: "Status",
//       //     accessor: "status",
//       //     // eslint-disable-next-line react/prop-types
//       //     Cell: ({ cell: { value } }) => (
//       //       <span className="badge badge-pill" style={{ backgroundColor: changeCol(value) }}>
//       //         {changeType(value)}
//       //       </span>
//       //     ),
//       //     align: "left",
//       //   },
//       {
//         Header: "actions",
//         accessor: "id",
//         // eslint-disable-next-line react/prop-types
//         Cell: ({ cell: { value } }) => (
//           <div
//             style={{
//               width: "100%",
//               backgroundColor: "#dadada",
//               borderRadius: "2px",
//             }}
//           >
//             <Dropdown>
//               <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//                 <Icon sx={{ fontWeight: "light" }}>settings</Icon>
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 {/* <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleStatus(value, 1)}>Open</Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleStatus(value, 2)}>Close</Dropdown.Item> */}
//                 <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleAddAnswer(value)}>Add Answer</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>
//         ),
//         align: "left",
//       },
//     ],

//     rows: items,
//   };
// }
