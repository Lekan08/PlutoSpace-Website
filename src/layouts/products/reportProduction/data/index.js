import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

export default function ReportProductionTable() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);
  // const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();
  // Method to handle update
  // const handleUpdate = (idx, namex, descriptionx, personalIDs, pricePerQuantityx) => {
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const orgIDs = data11.orgID;
  //   const raw = JSON.stringify({
  //     orgID: orgIDs,
  //     name: namex,
  //     description: descriptionx,
  //     createdBy: personalIDs,
  //     pricePerQuantity: pricePerQuantityx,
  //   });
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/products/update`, requestOptions)
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
  //   fetch(`${process.env.REACT_APP_KUBU_URL}/department/update`, requestOptions)
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

  // Method to handle view
  // const handleview = () => {
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const orgIDs = data11.orgID;
  //   const raw = JSON.stringify({
  //     orgID: orgIDs,
  //   });
  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(`${process.env.REACT_APP_LOUGA_URL}/products/gets/{orgID}`, requestOptions)
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
  // const handleDisable = (value) => {
  //   MySwal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#f96d02",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const requestOptions = {
  //         method: "DELETE",
  //         headers: miHeaders,
  //       };

  //       fetch(`${process.env.REACT_APP_LOUGA_URL}/products/delete/${value}`, requestOptions)
  //         .then(async (res) => {
  //           const aToken = res.headers.get("token-1");
  //           localStorage.setItem("rexxdex", aToken);
  //           return res.json();
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

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    // const productIDs = data11.personalID;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productIDs = urlParams.get("id");

    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_LOUGA_URL}/production/getForProduct/${orgIDs}/?productID=${productIDs}`,
      { headers }
    )
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

  const handleUpdate = (value) => {
    navigate(`/Production-report/update?id=${value}`);
  };
  // eslint-disable-next-line consistent-return
  const handleOnChangeStatus = (type) => {
    if (type === 0) {
      return "Reported";
    }
    if (type === 1) {
      return "Approve";
    }
    if (type === 2) {
      return "Decline";
    }
  };
  // eslint-disable-next-line consistent-return
  const handleOnChangeType = (type) => {
    if (type === 0) {
      return "Addition";
    }
    if (type === 1) {
      return "Deduction";
    }
  };
  //   const changeStatus = (value) => {
  //     if (type === 0) {
  //         return ""       onChange={(e) => setType(e.target.value)}

  //     }
  //   }

  const handleApproveReport = (idx) => {
    const headers = miHeaders;
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const idx = urlParams.get("id");
    const status = 1;

    fetch(`${process.env.REACT_APP_LOUGA_URL}/production/approveOrDecline/${idx}/${status}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        // setOpened(false);
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
        // setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
  };

  const handleDisapproveReport = (value) => {
    navigate(`/products/Production-report/decline-Production-Report?id=${value}`);
  };

  // const handleGenerate = (value) => {
  //   navigate(`/products/Production-report/generateProducton-Report/?id=${value}`);
  // };

  // Return table
  return {
    columns: [
      { Header: "quantity", accessor: "quantity", align: "left" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell: { value } }) => handleOnChangeStatus(value),
        align: "left",
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: ({ cell: { value } }) => handleOnChangeType(value),
        align: "left",
      },
      { Header: "Branch Name", accessor: "branchName", align: "left" },
      //   {
      //     Header: "Date Created",
      //     accessor: "createdTime",
      //     Cell: ({ cell: { value } }) => changeDate(value),
      //     align: "left",
      //   },
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
                {/* <Dropdown.Item onClick={() => handleView(value)}>View Products</Dropdown.Item> */}
                <Dropdown.Item onClick={() => handleUpdate(value)}>
                  Update Production Report
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleApproveReport(value)}>
                  Approve Production Report
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisapproveReport(value)}>
                  Decline Production Report
                </Dropdown.Item>
                {/* <Dropdown.Item onClick={() => handleGenerate(value)}> 
                  Generate Production Report
                </Dropdown.Item>
                {/* <Dropdown.Item onClick={() => handleDisable(value)}>Disable</Dropdown.Item> */}
                {/* <Dropdown.Item onClick={() => handleReport(value)}>Report Production</Dropdown.Item> */}
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
