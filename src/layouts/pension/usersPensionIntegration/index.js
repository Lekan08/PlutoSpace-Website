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

export default function UserPension() {
  const { allGHeaders: miHeaders } = GHeaders();
  // const { allPHeaders: myHeaders } = PHeaders();
  // const axios = require("axios");
  const [items, setItems] = useState([]);
  // const [id, setId] = useState("");
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
      .then(async (res) => res.json())
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
        // eslint-disable-next-line no-unused-vars
        const users = result;
        fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/pensionProviders/gets/${orgIDs}`, {
          headers,
        })
          .then(async (res) => res.json())
          .then((resultr) => {
            const providers = resultr;
            fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/pensionIntegration/gets/${orgIDs}`, {
              headers,
            })
              .then(async (res) => {
                const aToken = res.headers.get("token-1");
                localStorage.setItem("rexxdex", aToken);
                return res.json();
              })
              .then((resultp) => {
                if (isMounted) {
                  const resultx = resultp;
                  console.log(resultx);
                  const brand = [];
                  let i = 0;
                  // eslint-disable-next-line no-plusplus
                  for (i; i < users.length; i++) {
                    // eslint-disable-next-line no-loop-func
                    const findP = resultx.find((item) => item.empID === users[i].personal.id);
                    if (findP) {
                      const findPName = providers.find((item) => item.id === findP.providerID);
                      brand.push({
                        userName: `${users[i].personal.fname} ${users[i].personal.lname}`,
                        providerName: findPName.name,
                        empID: users[i].personal.id,
                        createdTime: findP.createdTime,
                        PID: findP.id,
                      });
                    } else {
                      brand.push({
                        userName: `${users[i].personal.fname} ${users[i].personal.lname}`,
                        providerName: "None",
                        empID: users[i].personal.id,
                        createdTime: "",
                        PID: "Null",
                      });
                    }
                  }
                  setItems(brand);
                }
              });
          });
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const handleDisable2 = (idx) => {
    const [filteredItems] = items.filter((item) => item.empID === idx);
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
        fetch(
          `${process.env.REACT_APP_JOHANNESBURG_URL}/pensionIntegration/delete/${filteredItems.PID}`,
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
  const handleUpdate = (value) => {
    const filteredItems = items.filter((item) => item.empID === value);
    navigate(`/user-pension-settings?id=${value}&name=${filteredItems[0].userName}`);
  };
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    if (timestamp === "") {
      return "Null";
    }
    return retDate;
  };

  return {
    columns: [
      {
        Header: "Employee ",
        accessor: "userName",
        align: "left",
      },
      { Header: "Pension Provider", accessor: "providerName", align: "left" },
      {
        Header: "Created On",
        accessor: "createdTime",
        Cell: ({ cell: { value } }) => changeDate(value),
        align: "left",
      },
      {
        Header: "actions",
        accessor: "empID",
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
              <Dropdown.Toggle variant="secondary" id="dropdown-basic-button">
                <Icon sx={{ fontWeight: "light" }}>settings</Icon>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleUpdate(value)}>View / Update</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDisable2(value)}>
                  Delete Integration
                </Dropdown.Item>
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
