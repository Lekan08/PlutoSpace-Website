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
  const [items, setItems] = useState([]);
  const [currentInsuranceType, setCurrentInsuranceType] = useState({});

  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();

  const { allGHeaders: miHeaders } = GHeaders();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const permissionsList = [];
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;

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
      // eslint-disable-next-line consistent-return
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
          setCurrentInsuranceType(result[0]);
          fetch(`${process.env.REACT_APP_JOHANNESBURG_URL}/insurancePlan/gets/${orgIDs}`, {
            headers,
          })
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resultx) => {
              if (resultx.message === "Expired Access") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resultx.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resultx.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
                window.location.reload();
              }
              if (isMounted) {
                if (resultx.length > 0) {
                  // eslint-disable-next-line array-callback-return
                  resultx.map((plan) => {
                    let check = false;
                    if (result[0].planIDs != null) {
                      // eslint-disable-next-line array-callback-return
                      result[0].planIDs.map((planID) => {
                        if (planID === plan.id) {
                          check = true;
                        }
                      });
                    }

                    const pObj = {
                      id: plan.id,
                      title: plan.title,
                      descrip: plan.descrip,
                      montlyContribution: plan.montlyContribution,
                      yearlyContribution: plan.yearlyContribution,
                      isCheck: check,
                    };

                    permissionsList.push(pObj);
                  });
                }

                setItems(permissionsList);
              }
            });
          return () => {
            isMounted = false;
          };
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnClick = (e, apix) => {
    setOpened(true);

    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const plansx = [];
    if (currentInsuranceType.planIDs !== null) {
      const checks = e.target.checked;
      if (checks) {
        plansx.push(apix.id);
      }
      // eslint-disable-next-line array-callback-return
      currentInsuranceType.planIDs.map((planID) => {
        if (!checks) {
          if (planID !== apix.id) {
            plansx.push(planID);
          }
        } else {
          plansx.push(planID);
        }
      });
    }

    const raw = JSON.stringify({
      id: currentInsuranceType.id,
      orgID: orgIDs,
      name: currentInsuranceType.name,
      descrip: currentInsuranceType.descrip,
      createdTime: currentInsuranceType.createdTime,
      deleteFlag: currentInsuranceType.deleteFlag,
      planIDs: plansx,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

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
          navigate("/insurance/type");
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
            {items.map((api) => (
              <div key={api.empID} className="mb-3">
                <Form.Check type="checkbox">
                  <Form.Check.Input
                    type="checkbox"
                    defaultChecked={api.isCheck}
                    onClick={(e) => handleOnClick(e, api)}
                  />
                  <Form.Check.Label>{api.title}</Form.Check.Label>
                </Form.Check>
                &nbsp;
                <h6>{api.descrip}</h6>
                &nbsp;
                <h6>
                  Monthly Contribution (in %): <b>{api.monthlyContribution}</b>
                </h6>
                &nbsp;
                <h6>
                  Yearly Contribution (in %): <b>{api.yearlyContribution}</b>
                </h6>
                <hr style={{ backgroundColor: "#f96d02" }} />
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
