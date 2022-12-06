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

export default function InsurancePlansTableData() {
  const MySwal = withReactContent(Swal);
  const [items, setItems] = useState([]);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();
  // Method to handle update
  const handleUpdate = (
    idx,
    titlex,
    descripx,
    createdTimex,
    deleteFlagx,
    damageClientContributionx,
    monthlyContributionx,
    yearlyContributionx
  ) => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const damageCompanyContributionx = 100 - Number(damageClientContributionx);
    const orgIDs = data11.orgID;
    const raw = JSON.stringify({
      id: idx,
      orgID: orgIDs,
      title: titlex,
      descrip: descripx,
      createdTime: createdTimex,
      deleteFlag: deleteFlagx,
      damageClientContribution: damageClientContributionx,
      damageCompanyContribution: damageCompanyContributionx,
      monthlyContribution: monthlyContributionx,
      yearlyContribution: yearlyContributionx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insurancePlan/update`, requestOptions)
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
    let damageClientContributionx = 0;
    let monthlyContributionx = 0;
    let yearlyContributionx = 0;
    let createdTime = 0;
    let deleteFlag = 0;
    // Avoid filter for empty string
    if (!value) {
      titlex = "";
      descripx = "";
      damageClientContributionx = 0;
      monthlyContributionx = 0;
      yearlyContributionx = 0;
      createdTime = 0;
      deleteFlag = 0;
    } else {
      const filteredItems = filteredData.filter((item) => item.id === value);

      titlex = filteredItems[0].title;
      descripx = filteredItems[0].descrip;
      damageClientContributionx = filteredItems[0].damageClientContribution;
      monthlyContributionx = filteredItems[0].monthlyContribution;
      yearlyContributionx = filteredItems[0].yearlyContribution;
      createdTime = filteredItems[0].createdTime;
      deleteFlag = filteredItems[0].deleteFlag;
    }

    MySwal.fire({
      title: "Update Insurance Plan",
      html: ` <table><tr><td>
           <label for="Title">Title*</label></td>
           <td><input type="text" id="title" value="${titlex}" class="swal2-input" placeholder="Title"></td></tr><br>
           <tr><td><label for="descrip">Description</label></td>
           <td><input type="text" class="swal2-input" id="descrip" value="${descripx}" placeholder="Description"></td></tr>
           <tr><td><label for="damageClientContribution">Damage Client Contribution (in %)*</label></td>
           <td><input type="text" class="swal2-input" id="damageClientContribution" value="${damageClientContributionx}"></td></tr>
           <tr><td><label for="monthlyContribution">Monthly Contribution (in %)</label></td>
           <td><input type="text" class="swal2-input" id="monthlyContribution" value="${monthlyContributionx}"></td></tr>
           <tr><td><label for="yearlyContribution">Yearly Contribution (in %)</label></td>
           <td><input type="text" class="swal2-input" id="yearlyContribution" value="${yearlyContributionx}"></td></tr>
           </table>`,
      confirmButtonText: "Save",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const title = Swal.getPopup().querySelector("#title").value;
        const descrip = Swal.getPopup().querySelector("#descrip").value;
        const damageClientContribution = Swal.getPopup().querySelector(
          "#damageClientContribution"
        ).value;
        const monthlyContribution = Swal.getPopup().querySelector("#monthlyContribution").value;
        const yearlyContribution = Swal.getPopup().querySelector("#yearlyContribution").value;
        const id = value;

        const PricePCval = /^[0-9.]+$/;
        if (
          !title ||
          (damageClientContributionx.length > 0 && !damageClientContributionx.match(PricePCval)) ||
          (monthlyContributionx.length > 0 && !monthlyContributionx.match(PricePCval)) ||
          (yearlyContributionx.length > 0 && !yearlyContributionx.match(PricePCval)) ||
          (damageClientContributionx.length > 0 && Number(damageClientContributionx) > 100) ||
          (monthlyContributionx.length > 0 && Number(monthlyContributionx) > 100) ||
          (yearlyContributionx.length > 0 && Number(yearlyContributionx) > 100)
        ) {
          Swal.showValidationMessage(
            `Please enter valid inputs for title, damage client contribution, monthly contribution and yearly contribution`
          );
        } else {
          Swal.resetValidationMessage();
          handleUpdate(
            id,
            title,
            descrip,
            createdTime,
            deleteFlag,
            damageClientContribution,
            monthlyContribution,
            yearlyContribution
          );
        }
      },
    });
  };

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

        fetch(
          `${process.env.REACT_APP_JOHANNESBURG_URL}/insurancePlan/delete/${value}`,
          requestOptions
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

  // Method to change date from timestamp
  const changeDate = (timestamp) => {
    const date = new Date(timestamp);
    const retDate = date.toDateString();
    return retDate;
  };

  // Method to change display for percentage contribution
  const changeDisplay = (value) => {
    if (value <= 0) {
      return "NONE";
    }

    return value;
  };

  // Method to fetch all insurance types
  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insurancePlan/gets/${orgIDs}`, { headers })
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
        if (isMounted) {
          setItems(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Return table
  return {
    columns: [
      { Header: "title", accessor: "title", align: "left" },
      { Header: "description", accessor: "descrip", align: "left" },
      {
        Header: "damage client contribution (in %)",
        accessor: "damageClientContribution",
        align: "left",
      },
      {
        Header: "monthly contribution (in %)",
        accessor: "monthlyContribution",
        Cell: ({ cell: { value } }) => changeDisplay(value),
        align: "left",
      },
      {
        Header: "yearly contribution (in %)",
        accessor: "yearlyContribution",
        Cell: ({ cell: { value } }) => changeDisplay(value),
        align: "left",
      },
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
                <Dropdown.Item onClick={() => handleShow(items, value)}>Update</Dropdown.Item>
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
