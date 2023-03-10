import { useEffect, useState } from "react";
// import { Form } from "react-bootstrap";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MDTypography from "components/MDTypography";
import "bootstrap/dist/css/bootstrap.min.css";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";

function Checklist() {
  const MySwal = withReactContent(Swal);
  const [itemsx, setItems] = useState([]);
  const [nitemsx, setNItems] = useState([]);

  // const [createdTimex, setCreatedTime] = useState("");
  // const [deleteFlagx, setDeleteFlag] = useState("");
  //   const [serviceVal, setServiceVal] = useState("");

  //   // const [services, setServices] = useState([]);
  //   // const [rService, setRService] = useState("");
  //   // const [vPermissions, setVPermissions] = useState([]);

  //   const [showSAll, setSAll] = useState(false);
  //   const [checkSelAll, setcheckSelAll] = useState(true);

  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  //   useEffect(() => {
  //     // const permissionsList = [];
  //     const data11 = JSON.parse(localStorage.getItem("user1"));

  //     const orgIDs = data11.orgID;
  //     const queryString = window.location.search;
  //     const urlParams = new URLSearchParams(queryString);
  //     const cbtIDs = urlParams.get("id");
  //     const headers = miHeaders;
  //     let isMounted = true;
  //     fetch(`${process.env.REACT_APP_RAGA_URL}/questions/gets/${orgIDs}`, { headers })
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
  //         setItems(result);
  //         fetch(`${process.env.REACT_APP_RAGA_URL}/cbtQuestion/gets/${orgIDs}/${cbtIDs}`, { headers })
  //           .then(async (res) => {
  //             const aToken = res.headers.get("token-1");
  //             localStorage.setItem("rexxdex", aToken);
  //             return res.json();
  //           })
  //           .then((resultx) => {
  //             if (result.message === "Expired Access") {
  //               navigate("/authentication/sign-in");
  //               window.location.reload();
  //             }
  //             if (resultx.message === "Token Does Not Exist") {
  //               navigate("/authentication/sign-in");
  //               window.location.reload();
  //             }
  //             if (resultx.message === "Unauthorized Access") {
  //               navigate("/authentication/forbiddenPage");
  //               window.location.reload();
  //             }
  //             if (isMounted) {
  //               // eslint-disable-next-line eqeqeq
  //               if (resultx.length != 0) {
  //                 if (resultx[0].cbtQuestion.id !== null) {
  //                   const newQues = [];
  //                   const leftQues = [];
  //                   // eslint-disable-next-line array-callback-return
  //                   result.map((it) => {
  //                     let check = 0;
  //                     // eslint-disable-next-line array-callback-return
  //                     resultx.map((sit) => {
  //                       const quesIds = sit.cbtQuestion.questionID;
  //                       if (quesIds === it.id) {
  //                         check = 1;
  //                         const questObj = {
  //                           id: sit.cbtQuestion.id,
  //                           name: it.question,
  //                         };
  //                         newQues.push(questObj);
  //                       }
  //                     });
  //                     if (check === 0) {
  //                       leftQues.push(it);
  //                     }
  //                   });

  //                   setNItems(newQues);
  //                   setItems(leftQues);
  //                 }

  //                 // if (resultx[0].createdTime !== null) {
  //                 //   setCreatedTime(resultx[0].createdTime);
  //                 // }
  //                 // if (resultp[0].createdTime !== null) {
  //                 //   setDeleteFlag(resultx[0].deleteFlag);
  //                 // }
  //               }
  //             }
  //           });
  //       });
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);
  useEffect(() => {
    setOpened(true);
    const data11 = JSON.parse(localStorage.getItem("user1"));
    console.log(data11);
    const orgIDs = data11.orgID;
    const headers = miHeaders;

    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/onboarding/gets/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultp) => {
        setOpened(false);
        if (resultp.message === "Expired Access") {
          navigate("/authentication/sign-in");
        }
        if (resultp.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
        }
        if (resultp.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
        }
        if (isMounted) {
          console.log(resultp);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getAllUserInfo/${orgIDs}`, { headers })
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
          //   setUser(result);
          console.log(result);
          setOpened(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddQues = (check) => {
    // eslint-disable-next-line no-shadow
    setItems((stages) => stages.filter((stage) => stage.id !== check.id));

    setNItems((list) => [...list, check]);
  };

  // const handleRemoveQues = (check) => {
  //   // eslint-disable-next-line no-shadow
  //   setItems((stages) => stages.filter((stage) => stage.id !== check.id));
  //   setNItems((list) => [...list, check]);
  // };
  const handleRemoveQues = (value) => {
    const requestOptions = {
      method: "DELETE",
      headers: miHeaders,
    };

    fetch(`${process.env.REACT_APP_RAGA_URL}/cbtQuestion/delete/${value}`, requestOptions)
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
  };

  const handleOnClick = (e, value) => {
    setOpened(true);
    e.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const cbtIDs = urlParams.get("id");

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    // const cbtIDs = data11.personalID;
    const raw = JSON.stringify({
      orgID: orgIDs,
      cbtID: cbtIDs,
      questionID: value,
    });
    // console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_RAGA_URL}/cbtQuestion/add`, requestOptions)
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
  };

  return (
    // <DashboardLayout>
    //   <DashboardNavbar />
    <MDBox>
      <Card>
        <MDTypography
          variant="h4"
          textAlign="left"
          fontWeight="medium"
          color="secondary"
          mx={4}
          mt={2}
        >
          Checklist
        </MDTypography>
        <div className="row">
          <div className="col-sm-5">
            <Box sx={{ flexGrow: 1 }}>
              <FormGroup style={{ padding: "20px" }}>
                {itemsx.map((item) => (
                  <Grid key={item.id} item xs={12}>
                    <FormControlLabel
                      control={<Checkbox />}
                      onClick={(e) => handleOnClick(e, item.id)}
                      onKeyUp={() => handleAddQues(item)}
                      label={item.question}
                    />
                  </Grid>
                ))}
              </FormGroup>
            </Box>
          </div>
          <div className="col-sm-2" style={{ backgroundColor: "#offwhite" }}>
            <></>
          </div>

          <div className="col-sm-5">
            <Box sx={{ flexGrow: 1 }}>
              <FormGroup style={{ padding: "20px" }}>
                {nitemsx.map((item) => (
                  <Grid key={item.id} item xs={12}>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      onClick={() => handleRemoveQues(item.id)}
                      // onKeyUp={() => handleRemoveQues(item)}
                      label={item.name}
                    />
                  </Grid>
                ))}
              </FormGroup>
            </Box>
          </div>
        </div>
        {/* </MDBox> */}
      </Card>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </MDBox>
  );
}

export default Checklist;
