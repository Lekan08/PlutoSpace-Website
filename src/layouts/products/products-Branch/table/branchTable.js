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

export default function productsBranchTable() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

  // const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();
  // Method to handle update
  // const handleUpdate = (idx, productIDx, branchIDx, quantityx) => {
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   const raw = JSON.stringify({
  //     id: idx,
  //     orgID: orgIDs,
  //     productID: productIDx,
  //     branchID: branchIDx,
  //     quantity: quantityx,
  //   });
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   // eslint-disable-next-line no-irregular-whitespace
  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/productBranct/update`, requestOptions)
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

  // Method to handle diable
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
        const data11 = JSON.parse(localStorage.getItem("user1"));
        const personalIDs = data11.personalID;

        // eslint-disable-next-line no-irregular-whitespace
        fetch(
          `${process.env.REACT_APP_LOUGA_URL}/productBranch/delete/${value}/${personalIDs}`,
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

  // Method to fetch all departments
  // env.environments
  useEffect(() => {
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productIDx = urlParams.get("id");
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const productID = productIDx;
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/productBranch/gets/${orgIDs}/${productID}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        console.log(result);
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
        console.log(result);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // const handleUpdate = (value) => {
  //   navigate(`/products/products-Branch/update?id=${value}`);
  // };
  // Return table
  return {
    columns: [
      { Header: "Branch Name", accessor: "branchName", align: "left" },
      { Header: "Quantity", accessor: "quantity", align: "left" },
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
                {/* <Dropdown.Item onClick={() => handleUpdate(value)}>Update</Dropdown.Item> */}
                <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item>
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
