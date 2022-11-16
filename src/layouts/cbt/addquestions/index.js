import { useEffect, useState } from "react";
// import { Form } from "react-bootstrap";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
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

function AddQuesToCBT() {
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

  useEffect(() => {
    // const permissionsList = [];
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const cbtIDs = urlParams.get("id");
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_RAGA_URL}/questions/gets/${orgIDs}`, { headers })
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
        setItems(result);
        fetch(`${process.env.REACT_APP_RAGA_URL}/cbtQuestion/gets/${orgIDs}/${cbtIDs}`, { headers })
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resultx) => {
            if (result.message === "Expired Access") {
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
            // console.log(result);
            // console.log(resultx);
            // if (isMounted) {
            //   // eslint-disable-next-line array-callback-return
            //   result.map((val1) => {
            //     let check = false;

            //     if (resultx != null) {
            //       // eslint-disable-next-line array-callback-return
            //       resultx.map((val2) => {
            //         if (val2.questionID === val1.id) {
            //           check = true;
            //           // countPerm += 1;
            //         }
            //         // check = false;
            //       });
            //     }

            //     const pObj = {
            //       createdTime: val1.createdTime,
            //       deleteFlag: val1.deleteFlag,
            //       hint: val1.hint,
            //       id: val1.id,
            //       imageKey: val1.imageKey,
            //       isCheck: check,
            //       imageUrl: val1.imageUrl,
            //       instruction: val1.instruction,
            //       orgID: val1.orgID,
            //       question: val1.question,
            //     };

            //     permissionsList.push(pObj);
            //   });
            //   setItems(permissionsList);
            // }
            if (isMounted) {
              // console.log(resultx);
              // eslint-disable-next-line eqeqeq
              if (resultx.length != 0) {
                // setIdx(resultx[0].id);
                // setName(resultx[0].name);
                // if (resultx[0].descrip !== null) {
                //   // setDescrip(resultx[0].descrip);
                // }
                if (resultx[0].cbtQuestion.id !== null) {
                  const newQues = [];
                  const leftQues = [];
                  // eslint-disable-next-line array-callback-return
                  result.map((it) => {
                    let check = 0;
                    // eslint-disable-next-line array-callback-return
                    resultx.map((sit) => {
                      const quesIds = sit.cbtQuestion.questionID;
                      if (quesIds === it.id) {
                        check = 1;
                        newQues.push(it);
                      }
                    });
                    if (check === 0) {
                      leftQues.push(it);
                    }
                  });

                  setNItems(newQues);
                  setItems(leftQues);
                }

                // if (resultx[0].createdTime !== null) {
                //   setCreatedTime(resultx[0].createdTime);
                // }
                // if (resultp[0].createdTime !== null) {
                //   setDeleteFlag(resultx[0].deleteFlag);
                // }
              }
            }
          });
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

  const handleRemoveQues = (check) => {
    // eslint-disable-next-line no-shadow
    setItems((stages) => stages.filter((stage) => stage.id !== check.id));
    setNItems((list) => [...list, check]);
  };

  // const permissionsList = [];

  //   const handleOnChange = (value) => {
  //     setOpened(true);
  //     const headers = miHeaders;
  //     const queryString = window.location.search;
  //     const urlParams = new URLSearchParams(queryString);
  //     const id = urlParams.get("id");
  //     const idVal = JSON.parse([id]);
  //     JSON.stringify(localStorage.setItem("permVal", value));

  //     const apiValue = value;
  //     setRService(value);
  //     setServiceVal(apiValue);
  //     fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/permissions/getForService/${apiValue}`, {
  //       headers,
  //     })
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         return res.json();
  //       })
  //       .then((resulta) => {
  //         if (resulta.message === "Expired Access") {
  //           navigate("/authentication/sign-in");
  //         }
  //         if (resulta.message === "Token Does Not Exist") {
  //           navigate("/authentication/sign-in");
  //         }
  //         if (resulta.message === "Unauthorized Access") {
  //           navigate("/authentication/forbiddenPage");
  //         }
  //         fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/rolespermissions/getbyroleid/${idVal}`, {
  //           headers,
  //         })
  //           .then(async (res) => {
  //             const aToken = res.headers.get("token-1");
  //             localStorage.setItem("rexxdex", aToken);
  //             return res.json();
  //           })
  //           .then((resultrpg) => {
  //             setOpened(false);
  //             if (resultrpg.message === "Expired Access") {
  //               navigate("/authentication/sign-in");
  //             }
  //             if (resultrpg.message === "Token Does Not Exist") {
  //               navigate("/authentication/sign-in");
  //             }
  //             if (resultrpg.message === "Unauthorized Access") {
  //               navigate("/authentication/forbiddenPage");
  //             }

  //             let countPerm = 0;
  //             // eslint-disable-next-line array-callback-return
  //             resulta.map((permission) => {
  //               let check = false;

  //               if (resultrpg != null) {
  //                 // eslint-disable-next-line array-callback-return
  //                 resultrpg.map((rolPermi) => {
  //                   if (rolPermi.permissionCall === permission.actionCall) {
  //                     if (rolPermi.isCheck === 1) {
  //                       check = true;
  //                       countPerm += 1;
  //                     }
  //                   }
  //                   // check = false;
  //                 });
  //               }

  //               const pObj = {
  //                 id: permission.id,
  //                 name: permission.displayName,
  //                 isCheck: check,
  //                 actionCall: permission.actionCall,
  //                 descrip: permission.descrip,
  //               };

  //               permissionsList.push(pObj);
  //             });
  //             if (resulta.length !== 0) {
  //               setSAll(true);
  //               if (countPerm === resulta.length) {
  //                 setcheckSelAll(false);
  //               } else {
  //                 setcheckSelAll(true);
  //               }
  //             } else {
  //               setSAll(false);
  //             }
  //             setVPermissions(permissionsList);
  //           });
  //       });
  //   };

  //   useEffect(() => {
  //     setOpened(true);
  //     const headers = miHeaders;
  //     let isMounted = true;
  //     fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/services/gets`, { headers })
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         return res.json();
  //       })
  //       .then((resultapi) => {
  //         setOpened(false);
  //         if (resultapi.message === "Expired Access") {
  //           navigate("/authentication/sign-in");
  //         }
  //         if (resultapi.message === "Token Does Not Exist") {
  //           navigate("/authentication/sign-in");
  //         }
  //         if (resultapi.message === "Unauthorized Access") {
  //           navigate("/authentication/forbiddenPage");
  //         }
  //         if (isMounted) {
  //           setServices(resultapi);
  //           const permm = localStorage.getItem("permVal");
  //           if (permm !== null) {
  //             setRService(permm);
  //             handleOnChange(permm);
  //           }
  //         }
  //       });
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);

  //   const handleOnClick = (e) => {
  //     setOpened(true);
  //     e.preventDefault();
  //     const queryString = window.location.search;
  //     const urlParams = new URLSearchParams(queryString);
  //     const cbtIDs = urlParams.get("id");
  //     // const idVal = JSON.parse([id]);

  //     const data11 = JSON.parse(localStorage.getItem("user1"));
  //     const orgIDs = data11.orgID;

  //     const raw = JSON.stringify([
  //       {
  //         orgID: orgIDs,
  //         cbtID: cbtIDs,
  //         questionID: itemsx[0].id,
  //       },
  //     ]);
  //     const requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };

  //     fetch(`${process.env.REACT_APP_RAGA_URL}/cbtQuestion/add`, requestOptions)
  //       .then(async (res) => {
  //         const aToken = res.headers.get("token-1");
  //         localStorage.setItem("rexxdex", aToken);
  //         return res.json();
  //       })
  //       .then((resultrp) => {
  //         setOpened(false);
  //         if (resultrp.message === "Expired Access") {
  //           navigate("/authentication/sign-in");
  //         }
  //         if (resultrp.message === "Token Does Not Exist") {
  //           navigate("/authentication/sign-in");
  //         }
  //         if (resultrp.message === "Unauthorized Access") {
  //           navigate("/authentication/forbiddenPage");
  //         }
  //         const permm = localStorage.getItem("permVal");
  //         if (permm !== null) {
  //           handleOnChange(permm);
  //         }
  //       });
  //   };
  //   const handleSelectAll = (e) => {
  //     if (showSAll) {
  //       setOpened(true);
  //       const queryString = window.location.search;
  //       const urlParams = new URLSearchParams(queryString);
  //       const id = urlParams.get("id");
  //       const idVal = JSON.parse([id]);

  //       let isChecked = 0;
  //       const checks = e.target.value;
  //       if (checks === "1") {
  //         isChecked = 1;
  //       }

  //       const data11 = JSON.parse(localStorage.getItem("user1"));
  //       const orgIDs = data11.orgID;

  //       const headers = miHeaders;
  //       fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/permissions/getForService/${serviceVal}`, {
  //         headers,
  //       })
  //         .then(async (res) => {
  //           const aToken = res.headers.get("token-1");
  //           localStorage.setItem("rexxdex", aToken);
  //           return res.json();
  //         })
  //         .then((resulta) => {
  //           if (resulta.message === "Expired Access") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (resulta.message === "Token Does Not Exist") {
  //             navigate("/authentication/sign-in");
  //           }
  //           if (resulta.message === "Unauthorized Access") {
  //             navigate("/authentication/forbiddenPage");
  //           }
  //           const selectAllPrems = [];
  //           // eslint-disable-next-line array-callback-return
  //           resulta.map((item) => {
  //             const fdy = {
  //               orgID: orgIDs,
  //               roleID: idVal,
  //               permissionCall: item.actionCall,
  //               isCheck: isChecked,
  //             };
  //             selectAllPrems.push(fdy);
  //           });

  //           const raw = JSON.stringify(selectAllPrems);
  //           const requestOptions = {
  //             method: "POST",
  //             headers: myHeaders,
  //             body: raw,
  //             redirect: "follow",
  //           };
  //           fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/rolespermissions/save`, requestOptions)
  //             .then(async (res) => {
  //               const aToken = res.headers.get("token-1");
  //               localStorage.setItem("rexxdex", aToken);
  //               return res.json();
  //             })
  //             .then((resultrp) => {
  //               setOpened(false);
  //               if (resultrp.message === "Expired Access") {
  //                 navigate("/authentication/sign-in");
  //               }
  //               if (resultrp.message === "Token Does Not Exist") {
  //                 navigate("/authentication/sign-in");
  //               }
  //               if (resultrp.message === "Unauthorized Access") {
  //                 navigate("/authentication/forbiddenPage");
  //               }
  //               setOpened(false);
  //               window.location.reload();
  //             });
  //         });
  //     }
  //   };

  const handleOnClick = (e, value) => {
    // handleOnNameKeys();
    // if (enabled) {
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
    // }
  };
  // console.log(handleOnClick);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={30}
          mt={2}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" textAlign="center" mt={1}>
            Add Questions To CBT
          </MDTypography>
        </MDBox>
      </Card>
      &nbsp;
      <Card>
        <MDTypography
          variant="h4"
          textAlign="left"
          fontWeight="medium"
          color="secondary"
          mx={4}
          mt={2}
        >
          Questions
        </MDTypography>
        {/* <MDBox pt={0} px={4}>
          &nbsp;
          <Form>
            {itemsx.map((api) => (
              <div key={api.id} className="mb-3">
                <Form.Check.Input
                  type="checkbox"
                  defaultChecked={api.isCheck}
                  onClick={(e) => handleOnClick(e, api.id)}
                />{" "}
                &nbsp;
                <Form.Check.Label>&nbsp;{api.question}</Form.Check.Label>
                {/* &nbsp;
                <h6>{api.question}</h6> 
              </div>
            ))}
          </Form>
           <div className="topping">
            <input type="checkbox" id="topping" name="topping" value="Paneer" />
            Paneer
          </div>
        </MDBox> */}
        {/* <MDBox> */}
        {/* <MDBox component="form" role="form">
          <MDBox mt={4} mb={1}>
            <MDButton
              onClick={handleOnClick}
              variant="gradient"
              color="info"
              width="50%"
              align="center"
            >
              Save
            </MDButton>
          </MDBox>
        </MDBox> */}
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
                      onClick={(e) => handleOnClick(e, item.id)}
                      onKeyUp={() => handleRemoveQues(item)}
                      label={item.question}
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
    </DashboardLayout>
  );
}

export default AddQuesToCBT;
