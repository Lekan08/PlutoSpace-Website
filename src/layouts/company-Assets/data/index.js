/* eslint-disable react/prop-types */

// @mui material components

// Soft UI Dashboard React components
import { useEffect, useState } from "react";
// import MDButton from "components/MDButton";
// import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import Icon from "@mui/material/Icon";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

export default function CompanyAssetss() {
  const { allGHeaders: miHeaders } = GHeaders();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // const MySwal = withReactContent(Swal);

  // Method to handle diable
  // const handleDisable = (val) => {
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

  //       fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/assets/delete/${val}`, requestOptions)
  //         .then(async (res) => {
  //           const aToken = res.headers.get("token-1");
  //           localStorage.setItem("rexxdex", aToken);
  //           const resultres = await res.text();
  //           if (resultres === null || resultres === undefined || resultres === "") {
  //             return {};
  //           }
  //           return JSON.parse(resultres);
  //         })
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

  // Method to change date from timestamp
  const changeBranchDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;

    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/assets/gets/${orgIDs}`, { headers })
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

  // eslint-disable-next-line consistent-return
  // const handleOnClientType = (clientType) => {
  //   if (clientType === 1) {
  //     return "Individual";
  //   }
  //   if (clientType === 2) {
  //     return "Corporate";
  //   }
  // };

  return {
    columns: [
      { Header: "Item", accessor: "item", align: "left" },
      { Header: "Item Worth", accessor: "itemWorth", align: "left" },
      // {
      //   Header: "Client Type",
      //   accessor: "clientType",
      //   Cell: ({ cell: { value } }) => handleOnClientType(value),
      //   align: "left",
      // },
      // { Header: "Client Name", accessor: "clientName", align: "left" },
      {
        Header: "Date Created",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeBranchDate(value),
        align: "left",
      },
      // {
      //   Header: "actions",
      //   accessor: "id",
      //   Cell: ({ cell: { value } }) => (
      //     <div
      //       style={{
      //         width: "100%",
      //         backgroundColor: "#dadada",
      //         borderRadius: "2px",
      //       }}
      //     >
      //       <Dropdown>
      //         <Dropdown.Toggle variant="secondary" id="dropdown-basic">
      //           <Icon sx={{ fontWeight: "light" }}>settings</Icon>
      //         </Dropdown.Toggle>

      //         <Dropdown.Menu>
      //           <Dropdown.Item onClick={() => navigate(`/assets/update?id=${value}`)}>
      //             Update
      //           </Dropdown.Item>
      //           <Dropdown.Item onClick={() => handleDisable(value)}>Delete</Dropdown.Item>
      //         </Dropdown.Menu>
      //       </Dropdown>
      //     </div>
      //   ),
      //   align: "center",
      // },
    ],

    rows: items,
  };
}
