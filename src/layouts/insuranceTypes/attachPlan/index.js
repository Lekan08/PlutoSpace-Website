import { Form } from "react-bootstrap";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { useState, useEffect, React } from "react";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PHeaders from "postHeader";

function AttachPlanCheckox() {
  const [itemsx, setItems] = useState([]);
  const [gInsureTypx, setGInsureTYP] = useState("");
  // const [users, setUsers] = useState([]);
  // const [usermembers, setUserMember] = useState([]);

  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();

  const { allGHeaders: miHeaders } = GHeaders();
  const MySwal = withReactContent(Swal);

  console.log(gInsureTypx);
  useEffect(() => {
    // const permissionsList = [];
    // const data11 = JSON.parse(localStorage.getItem("user1"));

    // const orgIDs = data11.orgID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("id");
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insuranceType/getByIds/${ids}`, { headers })
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
          if (result !== "") {
            setGInsureTYP(result);
            // setTitle(result);
            console.log(result);
          }
          console.log(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnClick = (e, apix) => {
    e.preventDefault();
    setOpened(true);

    // const checks = e.target.checked;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    console.log(gInsureTypx);
    console.log(apix);
    console.log(apix.title);
    const PLANSx = [];

    PLANSx.push(apix.title);
    console.log(PLANSx);
    // if (checks) {
    const raw = JSON.stringify({
      // orgID: orgIDs,
      // groupID: apix.groupID,
      // empID: apix.empID,

      id: gInsureTypx[0].id,
      orgID: orgIDs,
      name: gInsureTypx[0].name,
      descrip: gInsureTypx[0].descrip,
      createdTime: gInsureTypx[0].createdTime,
      deleteFlag: gInsureTypx[0].deleteFlag,
      planIDs: PLANSx,
    });
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // const headers = miHeaders;
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insuranceType/update`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((result) => {
        setOpened(false);
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
        setOpened(false);
        MySwal.fire({
          title: result.status,
          type: "success",
          text: result.message,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        setOpened(false);
        MySwal.fire({
          title: error.status,
          type: "error",
          text: error.message,
        });
      });
    // }
  };

  // useEffect(() => {
  //   setOpened(true);
  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));
  //   const orgIDs = data11.orgID;

  //   const permissionsList = [];
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((resultd) => {
  //       if (resultd.message === "Expired Access") {
  //         navigate("/authentication/sign-in");
  //       }
  //       if (resultd.message === "Token Does Not Exist") {
  //         navigate("/authentication/sign-in");
  //       }
  //       if (resultd.message === "Unauthorized Access") {
  //         navigate("/authentication/forbiddenPage");
  //       }
  //       if (isMounted) {
  //         setUsers(resultd);
  //       }

  //       const queryString = window.location.search;
  //       const urlParams = new URLSearchParams(queryString);
  //       const id = urlParams.get("id");

  //       fetch(`${process.env.REACT_APP_SHASHA_URL}/groups/getByIds/${id}`, {
  //         headers,
  //       })
  //         .then(async (res) => {
  //           const aToken = res.headers.get("token-1");
  //           localStorage.setItem("rexxdex", aToken);
  //           return res.json();
  //         })
  //         .then((resultrs) => {
  //           setOpened(false);
  //           if (resultrs.message === "Expired Access") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (resultrs.message === "Token Does Not Exist") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (resultrs.message === "Unauthorized Access") {
  //             navigate("/authentication/forbiddenPage");
  //           }
  //           if (isMounted) {
  //             setName(resultrs[0].group.name);
  //             setGroupMember(resultrs[0].groupMembers);
  //           }

  //           // eslint-disable-next-line array-callback-return
  //           resultd.map((emp) => {
  //             let check = false;
  //             if (resultrs[0].groupMembers != null) {
  //               // eslint-disable-next-line array-callback-return
  //               resultrs[0].groupMembers.map((member) => {
  //                 if (member.empID === emp.personal.id) {
  //                   // if (rolPermi.isCheck === 1) {
  //                   check = true;
  //                   // }
  //                 }
  //                 // check = false;
  //               });
  //             }

  //             const pObj = {
  //               groupID: id,
  //               empID: emp.personal.id,
  //               fname: emp.personal.fname,
  //               lname: emp.personal.lname,
  //               isCheck: check,
  //             };

  //             permissionsList.push(pObj);
  //           });
  //           console.log(users);
  //           console.log(groupmembers);
  //           setUserMember(permissionsList);
  //         });
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  useEffect(() => {
    // const permissionsList = [];
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const ids = urlParams.get("id");
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insurancePlan/gets/${orgIDs}`, { headers })
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
          if (result !== "") {
            setItems(result);
            // setTitle(result);
            console.log(result);
          }
          console.log(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  console.log(itemsx);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox
          variant="gradient"
          // bgColor="info"
          borderRadius="lg"
          style={{ backgroundColor: "#f96d02" }}
          coloredShadow="success"
          mx={30}
          mt={2}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" textAlign="center" mt={1}>
            Attach Plan To Insurance Type
          </MDTypography>
        </MDBox>
        <MDBox pt={0} px={4}>
          &nbsp;
          <Form>
            {itemsx.map((api) => (
              <div key={api.empID} className="mb-3">
                <Form.Check type="checkbox">
                  <Form.Check.Input
                    type="checkbox"
                    defaultChecked={api.isCheck}
                    onClick={(e) => handleOnClick(e, api)}
                  />
                  <Form.Check.Label>{api.title}</Form.Check.Label>
                </Form.Check>
              </div>
            ))}
          </Form>
        </MDBox>
      </Card>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}
export default AttachPlanCheckox;
