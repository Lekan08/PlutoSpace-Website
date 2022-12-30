// Soft UI Dashboard React components
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

export default function CuponsData() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

  //   const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();
  // Method to handle update
  //   const handleUpdate = (idx, namex, descripx, createdTimex, deleteFlagx) => {
  //     const data11 = JSON.parse(localStorage.getItem("user1"));

  //     const orgIDs = data11.orgID;
  //     const raw = JSON.stringify({
  //       id: idx,
  //       orgID: orgIDs,
  //       name: namex,
  //       descrip: descripx,
  //       createdTime: createdTimex,
  //       deleteFlag: deleteFlagx,
  //     });
  //     const requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };

  //     fetch(`${process.env.REACT_APP_LOUGA_URL}/coupons/update`, requestOptions)
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         const resultres = await res.text();
  //         if (resultres === null || resultres === undefined || resultres === "") {
  //           return {};
  //         }
  //         return JSON.parse(resultres);
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

  // Method to handle diable
  //   const handleDisable = (value) => {
  //     MySwal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         const requestOptions = {
  //           method: "DELETE",
  //           headers: miHeaders,
  //         };

  //         fetch(`${process.env.REACT_APP_KUBU_URL}/department/delete/${value}`, requestOptions)
  //           .then(async (res) => {
  //             const aToken = res.headers.get("token-1");
  //             localStorage.setItem("rexxdex", aToken);
  //             const resultres = await res.text();
  //             if (resultres === null || resultres === undefined || resultres === "") {
  //               return {};
  //             }
  //             return JSON.parse(resultres);
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

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const date = new Date();
    const startTime = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const endTime = new Date(new Date()).getTime();
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_LOUGA_URL}/coupons/gets/${orgIDs}?startTime=${startTime}&endTime=${endTime}`,
      { headers }
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const resultres = await res.text();
        if (resultres === null || resultres === undefined || resultres === "") {
          return {};
        }
        return JSON.parse(resultres);
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
  const handleShow = (value) => {
    navigate(`/coupons/update?id=${value}`);
  };

  function handleTerminate(id) {
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIDs = data11.personalID;
    const terminatedBy = personalIDs;
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Terminate it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "GET",
          headers: miHeaders,
        };
        fetch(
          `${process.env.REACT_APP_LOUGA_URL}/coupons/terminate/${id}/${terminatedBy}`,
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
  }

  // eslint-disable-next-line consistent-return
  // const handleOnClientType = (clientType) => {
  //   if (clientType === 1) {
  //     return "Type";
  //   }
  //   if (clientType === 2) {
  //     return "Frequency";
  //   }
  // };

  // Return table
  return {
    columns: [
      // { Header: "Text", accessor: "text", align: "left" },
      { Header: "Amount", accessor: "amount", align: "left" },
      { Header: "Frequency", accessor: "frequency", align: "left" },
      { Header: "Left Usage", accessor: "leftUsage", align: "left" },
      // {
      //   Header: "Sales Type",
      //   accessor: "type",

      //   // eslint-disable-next-line react/prop-types
      //   Cell: ({ cell: { value } }) => (
      //     <span className="badge badge-pill" style={{ backgroundColor: changeCol(value) }}>
      //       {changeStatusCol(value)}
      //     </span>
      //   ),
      //   align: "left",
      // },
      // {
      //   Header: "Sales Type",
      //   accessor: "type",
      //   // Cell: ({ cell: { value } }) => console.log(value), // handleOnClientType(value),
      //   align: "left",
      // },
      {
        Header: "Date Created",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeDate(value),
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
                <Dropdown.Item onClick={() => handleShow(value)}>Update</Dropdown.Item>
                <Dropdown.Item onClick={() => handleTerminate(value)}>Terminate</Dropdown.Item>
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
