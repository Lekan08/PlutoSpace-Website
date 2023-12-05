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

export default function CbtData() {
  const { allGHeaders: miHeaders } = GHeaders();
  // const { allPHeaders: myHeaders } = PHeaders();
  // const axios = require("axios");
  const [items, setItems] = useState([]);
  // const [id, setId] = useState("");
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  // Method to handle diable
  const handleDisable = (value) => {
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
        const requestOptions = {
          method: "DELETE",
          headers: miHeaders,
        };

        fetch(`${process.env.REACT_APP_RAGA_URL}/cbtAnswer/remove/${value}`, requestOptions)
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

  // const handleUpdate = (idx, answerx) => {
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const questionIDs = urlParams.get("id");
  //   const raw = JSON.stringify({
  //     id: idx,
  //     orgID: orgIDs,
  //     questionID: questionIDs,
  //     optionID: answerx,
  //   });
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };
  //   fetch(`${process.env.REACT_APP_RAGA_URL}/answer/update`, requestOptions)
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((result) => {
  //       if (result.message === "Expired Access") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Token Does Not Exist") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Unauthorized Access") {
  //         navigate("/authentication/forbiddenPage");
  //         window.location.reload();
  //       }
  //       MySwal.fire({
  //         title: result.status,
  //         type: "success",
  //         text: result.message,
  //       }).then(() => {
  //         window.location.reload();
  //       });
  //     })
  //     .catch((error) => {
  //       MySwal.fire({
  //         title: error.status,
  //         type: "error",
  //         text: error.message,
  //       });
  //     });
  // };

  // const handleShow = (filteredData, value) => {
  //   let answerx = "";
  //   // Avoid filter for empty string
  //   if (!value) {
  //     answerx = "";
  //   } else {
  //     const filteredItems = filteredData.filter((item) => item.id === value);

  //     answerx = filteredItems[0].optionID;
  //   }

  //   MySwal.fire({
  //     title: "Update Option",
  //     html: `<input type="text" id="answer" value="${answerx}" class="swal2-input" placeholder="Answer">`,
  //     confirmButtonText: "Save",
  //     showCancelButton: true,
  //     confirmButtonColor: "#f96d02",
  //     cancelButtonColor: "#d33",
  //     preConfirm: () => {
  //       const answer = Swal.getPopup().querySelector("#answer").value;
  //       const id = value;
  //       handleUpdate(id, answer);
  //     },
  //   });
  // };

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const questionId = urlParams.get("id");
    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/options/getForQuestion/${orgIDs}/${questionId}`, {
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
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    columns: [
      {
        Header: "Option",
        accessor: "value",
        // Cell: ({ cell: { value } }) => <TextWrapper width={300} content={value} />,
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
                {/* <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item> */}
                <Dropdown.Item onClick={() => handleDisable(value)}>Remove Answer</Dropdown.Item>
                {/* <Dropdown.Item onClick={() => handleOptions(value)}>Add Options</Dropdown.Item> */}
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
