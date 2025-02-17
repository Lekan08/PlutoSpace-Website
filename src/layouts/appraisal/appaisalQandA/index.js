import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { Container, Form } from "react-bootstrap";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { orange } from "@mui/material/colors";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PHeaders from "postHeader";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Styles from "styles";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";

function AppraiseQandA() {
  const MySwal = withReactContent(Swal);

  // const animatedComponents = makeAnimated();

  const [questionIDx, setQuestionID] = useState("");
  const [orgIDx, setOrgID] = useState("");
  const [questionx, setQuestion] = useState("");
  const [hintx, setHint] = useState("");
  const [answerx, setAnswer] = useState("");

  const [appraisalName, setAppraisalName] = useState("");
  const [appraiseeName, setAppraiseeName] = useState("");

  const [showF, setShowF] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [showCom, setShowCom] = useState(true);

  const [pageNo, setPageNo] = useState(1);
  const [questNo, setQuestNo] = useState(1);
  const [rLength, setRLength] = useState(0);

  // const [defaultSelVal, setDefaultSelVal] = useState([]);

  // const [items, setItems] = useState([]);
  const [itemss, setItemss] = useState([]);
  const [allObj, setAllObj] = useState([]);

  const [viewOption, setViewOption] = useState(false);
  // const [viewMultiple, setViewMultiple] = useState(false);
  const [viewText, setViewText] = useState(false);

  const [opened, setOpened] = useState(false);

  const { allPHeaders: myHeaders } = PHeaders();
  const { allGHeaders: miHeaders } = GHeaders();

  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));
    const personalIds = data11.personalID;

    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/appraisers/gets/${orgIDs}/${id}`, {
      headers,
    })
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
          console.log(result);
          let checkUser = false;
          // eslint-disable-next-line array-callback-return
          result.map((item) => {
            if (item.empID === personalIds) {
              checkUser = true;
            }
          });
          if (checkUser === false) {
            setOpened(false);
            MySwal.fire({
              title: "UNAUTHORIZED_ACCESS",
              type: "error",
              text: "You were not set for this appraisal",
            }).then(() => {
              navigate("/dashboard", { replace: true });
              window.location.reload();
            });
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/getByIds/${id}`, {
      headers,
    })
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
          localStorage.removeItem("selOpt");
          setAppraisalName(result[0].name);
          setAppraiseeName(result[0].appraiseeName);
          setShowAll(true);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const data11 = JSON.parse(localStorage.getItem("user1"));

    setOpened(true);
    const orgIDs = data11.orgID;

    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/questions/gets/${orgIDs}/${id}`, {
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
        if (result.length !== 0) {
          const questID = result[pageNo - 1].questionID;
          fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalQuestion/getByIds/${questID}`, {
            headers,
          })
            .then(async (res) => {
              const aToken = res.headers.get("token-1");
              localStorage.setItem("rexxdex", aToken);
              return res.json();
            })
            .then((resultq) => {
              setOpened(false);
              if (resultq.message === "Expired Access") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resultq.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (resultq.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
                window.location.reload();
              }
              if (isMounted) {
                setRLength(result.length);
                // setItems(resultq);
                setQuestionID(resultq[0].question.id);
                setOrgID(resultq[0].question.orgID);
                setQuestion(resultq[0].question.question);
                setHint(resultq[0].question.hint);

                if (resultq[0].question.inputType === "Option") {
                  setItemss(resultq[0].options);
                } else if (resultq[0].question.inputType === "Multiple") {
                  // const anwerMap = [];
                  // // eslint-disable-next-line array-callback-return
                  // resultq[0].options.map((item) => {
                  //   const fdy = {
                  //     value: item.optionValue,
                  //     label: item.optionValue,
                  //   };
                  //   anwerMap.push(fdy);
                  // });
                  // setItems(anwerMap);
                }

                if (resultq[0].question.inputType === "Option") {
                  setViewOption(true);
                  // setViewMultiple(false);
                  setViewText(false);
                } else if (resultq[0].question.inputType === "Multiple") {
                  setViewOption(true);
                  // setViewMultiple(false);
                  setViewText(false);
                } else {
                  setViewText(true);
                  // setViewMultiple(false);
                  setViewOption(false);
                }
              }
            });
        } else {
          setOpened(false);
          MySwal.fire({
            title: "NO_QUESTIONS_SET",
            type: "error",
            text: "There are no questions set for this Appraisal",
          }).then(() => {
            navigate("/dashboard", { replace: true });
            window.location.reload();
          });
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleFetchQuest = (tNum) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;

    setOpened(true);
    const headers = miHeaders;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisal/questions/gets/${orgIDs}/${id}`, {
      headers,
    })
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
        const questID = result[tNum - 1].questionID;
        fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalQuestion/getByIds/${questID}`, {
          headers,
        })
          .then(async (res) => {
            const aToken = res.headers.get("token-1");
            localStorage.setItem("rexxdex", aToken);
            return res.json();
          })
          .then((resultq) => {
            setOpened(false);
            console.log(resultq);
            if (resultq.message === "Expired Access") {
              navigate("/authentication/sign-in");
              window.location.reload();
            }
            if (resultq.message === "Token Does Not Exist") {
              navigate("/authentication/sign-in");
              window.location.reload();
            }
            if (resultq.message === "Unauthorized Access") {
              navigate("/authentication/forbiddenPage");
              window.location.reload();
            }
            setQuestionID(resultq[0].question.id);
            setOrgID(resultq[0].question.orgID);
            setQuestion(resultq[0].question.question);
            setHint(resultq[0].question.hint);

            if (resultq[0].question.inputType === "Option") {
              setItemss(resultq[0].options);
            } else if (resultq[0].question.inputType === "Multiple") {
              // const anwerMap = [];
              // // eslint-disable-next-line array-callback-return
              // resultq[0].options.map((item) => {
              //   const fdy = {
              //     value: item.optionValue,
              //     label: item.optionValue,
              //   };
              //   anwerMap.push(fdy);
              // });
              // setItems(anwerMap);
              // if (allObj.length >= tNum) {
              //   const tDefAns = [];
              //   const tAns = allObj[tNum - 1].answer;
              //   const myArray = tAns.split(",");
              //   // eslint-disable-next-line array-callback-return
              //   myArray.map((objectx) => {
              //     const fdy = {
              //       value: objectx,
              //       label: objectx,
              //     };
              //     tDefAns.push(fdy);
              //     console.log(objectx);
              //   });
              //   console.log(tDefAns);
              //   setDefaultSelVal(tDefAns);
              // }
            }

            if (resultq[0].question.inputType === "Option") {
              setViewOption(true);
              // setViewMultiple(false);
              setViewText(false);
            } else if (resultq[0].question.inputType === "Multiple") {
              setViewOption(true);
              // setViewMultiple(false);
              setViewText(false);
            } else {
              setViewText(true);
              // setViewMultiple(false);
              setViewOption(false);
            }
          });
      });
  };

  const handleOnChangeOption = (e) => {
    const opVal = e.target.value;
    setAnswer(opVal);
  };

  // const handleOnSelect = (select) => {
  //   const ansA = [];
  //   // eslint-disable-next-line array-callback-return
  //   select.map((item) => {
  //     const fdy = item.value;
  //     ansA.push(fdy);
  //   });
  //   setAnswer(ansA.toString());
  //   console.log(ansA);
  // };

  const handleNext = () => {
    localStorage.removeItem("selOpt");
    const numberYu = 1;
    const tNum = pageNo + numberYu;
    console.log(tNum);
    console.log(pageNo);
    if (pageNo <= rLength) {
      if (tNum <= rLength) {
        setQuestNo(tNum);
        setPageNo(tNum);
        handleFetchQuest(tNum);
        console.log("jfjfjfnddj1");

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get("id");

        const data11 = JSON.parse(localStorage.getItem("user1"));
        const personalIds = data11.personalID;

        const answery = answerx.toString();
        let questIID = "";
        if (allObj.length !== 0) {
          // eslint-disable-next-line array-callback-return
          allObj.map((objectx) => {
            if (questionIDx === objectx.questionID) {
              questIID = objectx.questionID;
              console.log(objectx.questionID);
              console.log(questionIDx);
              setAnswer("");
              if (answerx !== objectx.answer) {
                console.log("answerx");
                // eslint-disable-next-line no-param-reassign
                objectx.answer = answerx;
              }
            }
          });

          console.log(questIID);
          console.log(questionIDx);
          if (questionIDx !== questIID) {
            console.log("questID");
            const obj = {
              orgID: orgIDx,
              appraisalID: id,
              questionID: questionIDx,
              empID: personalIds,
              answer: answery,
            };
            console.log(obj);
            setAllObj((list) => [...list, obj]);
            setAnswer("");
            console.log(allObj);
          }
        } else {
          const obj = {
            orgID: orgIDx,
            appraisalID: id,
            questionID: questionIDx,
            empID: personalIds,
            answer: answery,
          };
          console.log(obj);
          setAllObj((list) => [...list, obj]);
          setAnswer("");
          console.log(allObj);
        }

        //   if (answerx !== "") {
        //     if (allObj.length !== 0) {
        //       // eslint-disable-next-line array-callback-return
        //       allObj.map((objectx) => {
        //         console.log(objectx.questionID);
        //         if (questionIDx !== objectx.questionID) {
        //           setAllObj((list) => [...list, obj]);
        //         }
        //       });
        //     } else {
        //       setAllObj((list) => [...list, obj]);
        //     }
        //   }
      }
    }
    const rNum = pageNo;
    if (rNum === rLength) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get("id");

      const data11 = JSON.parse(localStorage.getItem("user1"));
      const answery = answerx.toString();
      const personalIds = data11.personalID;
      let questIID = "";
      // eslint-disable-next-line array-callback-return
      allObj.map((objectx) => {
        if (questionIDx === objectx.questionID) {
          questIID = objectx.questionID;
          console.log(objectx.questionID);
          console.log(questionIDx);
          setAnswer("");
          if (answerx !== objectx.answer) {
            console.log("answerx");
            // eslint-disable-next-line no-param-reassign
            objectx.answer = answerx;
          }
        }
      });

      console.log(questIID);
      console.log(questionIDx);
      if (questionIDx !== questIID) {
        console.log("questID");
        const obj = {
          orgID: orgIDx,
          appraisalID: id,
          questionID: questionIDx,
          empID: personalIds,
          answer: answery,
        };
        console.log(obj);
        setAllObj((list) => [...list, obj]);
        console.log(allObj);
      }

      setShowCom(false);
      setShowF(true);
    }
    console.log(allObj.length);
    console.log(tNum);
    const nextt = tNum;
    if (allObj.length >= nextt) {
      if (tNum > 1) {
        console.log(allObj[tNum - 1]);
        setAnswer(allObj[tNum - 1].answer);
      }
    }
  };

  const handleBack = () => {
    if (allObj.length === rLength) {
      setShowF(false);
    }
  };

  const handlePrev = () => {
    console.log(allObj);
    const numberYu = 1;
    const tNum = pageNo - numberYu;
    if (pageNo > 1) {
      setQuestNo(tNum);
      setPageNo(tNum);
      handleFetchQuest(tNum);
      setAnswer("");
    }
    console.log(tNum);
    console.log(pageNo);
    if (tNum >= 1) {
      console.log(allObj[tNum - 1]);
      setAnswer(allObj[tNum - 1].answer);
    }
  };

  const handleComplete = () => {
    const raw = JSON.stringify(allObj);
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraiserAnswer/save`, requestOptions)
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
          if (result.status === "SUCCESS") {
            navigate("/dashboard", { replace: true });
          }
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

  const handleChangeToForm = () => {
    setShowF(false);
  };

  return (
    <DashboardLayout>
      {/* { <DashboardNavbar />} */}
      <Card>
        {showAll ? (
          <MDBox pt={4} pb={3} px={3}>
            {showF ? (
              <MDBox mb={2} mt={3}>
                <MDBox
                  variant="gradient"
                  // bgColor="info"
                  borderRadius="lg"
                  style={Styles.boxSx}
                  // coloredShadow="info"
                  mx={2}
                  mt={-3}
                  p={2}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                    {appraisalName}
                  </MDTypography>
                </MDBox>
                <MDBox
                  variant="gradient"
                  bgColor="white"
                  borderRadius="lg"
                  coloredShadow="secondary"
                  mx={2}
                  mt={0}
                  p={2}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h6" fontWeight="medium" color="text" mt={1}>
                    Appraisal For {appraiseeName}
                  </MDTypography>
                </MDBox>
                <div align="center">
                  {showCom ? (
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        onClick={handleChangeToForm}
                        // color="info"
                        style={Styles.buttonSx}
                        width="50%"
                      >
                        Start
                      </MDButton>
                    </MDBox>
                  ) : (
                    <MDBox mt={4} mb={1}>
                      <MDBox mt={4} mb={1}>
                        <MDButton
                          variant="gradient"
                          onClick={handleBack}
                          // color="info"
                          style={Styles.buttonSx}
                          width="50%"
                        >
                          Go Back
                        </MDButton>
                      </MDBox>
                      <MDBox mt={4} mb={1}>
                        <MDButton
                          variant="gradient"
                          onClick={handleComplete}
                          // color="info"
                          style={Styles.buttonSx}
                          width="50%"
                        >
                          Complete
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  )}
                </div>
              </MDBox>
            ) : (
              <MDBox component="form" role="form">
                <MDBox mb={0}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-12">
                        <Container>
                          <div className="row">
                            <div className="col-sm-4">
                              <MDBox
                                variant="gradient"
                                // bgColor="info"
                                borderRadius="lg"
                                style={Styles.boxSx}
                                // coloredShadow="info"
                                mx={2}
                                mt={-3}
                                p={2}
                                mb={1}
                                textAlign="left"
                              >
                                <MDTypography variant="h4" fontWeight="medium" color="white">
                                  Question {questNo}
                                </MDTypography>
                              </MDBox>
                            </div>
                          </div>
                        </Container>
                        <MDBox
                          variant="gradient"
                          bgColor="white"
                          borderRadius="lg"
                          coloredShadow="secondary"
                          mx={2}
                          mt={0}
                          p={2}
                          mb={1}
                          textAlign="center"
                        >
                          <MDTypography variant="h6" fontWeight="medium" color="text" mt={1}>
                            {questionx}
                          </MDTypography>
                        </MDBox>
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-1" />
                      <div className="col-sm-11">
                        <MDTypography variant="h4" fontWeight="medium" fontSize="55%">
                          Hint: {hintx}
                        </MDTypography>
                      </div>
                    </div>
                  </Container>
                </MDBox>
                <MDBox mb={2}>
                  <Container>
                    <div className="row">
                      <div className="col-sm-4">
                        <MDBox
                          variant="gradient"
                          // bgColor="info"
                          borderRadius="lg"
                          style={Styles.boxSx}
                          // coloredShadow="info"
                          mx={5}
                          mt={2}
                          p={2}
                          mb={-1}
                          textAlign="left"
                        >
                          <MDTypography variant="h4" fontWeight="medium" color="white">
                            Answer
                          </MDTypography>
                        </MDBox>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-8">
                        <MDBox textAlign="right">
                          {viewText ? (
                            <MDBox mb={2} mt={3}>
                              <Container>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <Form.Group
                                      className="mb-1"
                                      controlId="exampleForm.ControlTextarea1"
                                    >
                                      <Form.Control
                                        as="textarea"
                                        value={answerx}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        rows={2}
                                      />
                                    </Form.Group>
                                  </div>
                                </div>
                              </Container>
                            </MDBox>
                          ) : (
                            <MDBox mt={4} mb={1} />
                          )}
                          {viewOption ? (
                            <MDBox mb={2}>
                              <Container>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <FormControl>
                                      <RadioGroup
                                        // row
                                        // aria-labelledby="demo-controlled-radio-buttons-group"
                                        // name="controlled-radio-buttons-group"
                                        value={answerx}
                                        onChange={handleOnChangeOption}
                                      >
                                        {itemss.map((apis) => (
                                          <MDBox
                                            // mt={2}
                                            style={{
                                              // justifyContent: "flex-start",
                                              // flexDirection: "row",
                                              display: "flex",
                                              alignItems: "flex-start",
                                              // border: "solid black 2px",
                                            }}
                                          >
                                            <FormControlLabel
                                              key={apis.id}
                                              value={apis.optionValue}
                                              control={
                                                <Radio
                                                  name="color-radio-button-demo"
                                                  sx={{
                                                    color: orange[800],
                                                    "&.Mui-checked": {
                                                      color: orange[600],
                                                    },
                                                  }}
                                                />
                                              }
                                              label={apis.optionValue}
                                            />
                                          </MDBox>
                                        ))}
                                        {/* <>
                                          <FormControlLabel
                                            value="are"
                                            control={<Radio />}
                                            label="are"
                                          />
                                          <FormControlLabel
                                            value="what if we chow"
                                            control={<Radio />}
                                            label="what if we chow"
                                          />
                                          <FormControlLabel
                                            value="good loving baby"
                                            control={<Radio />}
                                            label="good loving baby"
                                          />
                                          <FormControlLabel
                                            value="are"
                                            control={<Radio />}
                                            label="are"
                                          />
                                        </> */}
                                      </RadioGroup>
                                    </FormControl>
                                  </div>
                                </div>
                              </Container>
                            </MDBox>
                          ) : (
                            <MDBox mt={4} mb={1} />
                          )}
                          {/* {viewMultiple ? (
                            <MDBox mb={2}>
                              <Container>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <Select
                                      closeMenuOnSelect
                                      components={animatedComponents}
                                      defaultValue={defaultSelVal}
                                      onChange={handleOnSelect}
                                      isMulti
                                      options={items}
                                    />
                                  </div>
                                </div>
                              </Container>
                            </MDBox>
                          ) : (
                            <MDBox mt={4} mb={1} />
                          )} */}
                        </MDBox>
                      </div>
                    </div>
                  </Container>

                  <Container>
                    <div className="row">
                      <div className="col-sm-3">
                        {pageNo > 1 && (
                          <MDBox mt={4} mb={1}>
                            <MDButton
                              variant="gradient"
                              onClick={handlePrev}
                              // color="info"
                              style={Styles.buttonSx}
                              width="50%"
                            >
                              Prev
                            </MDButton>
                          </MDBox>
                        )}
                      </div>
                      <div className="col-sm-6" />
                      <div className="col-sm-3">
                        <MDBox mt={4} mb={1}>
                          <MDButton
                            variant="gradient"
                            onClick={handleNext}
                            // color="info"
                            style={Styles.buttonSx}
                            width="50%"
                          >
                            Next
                          </MDButton>
                        </MDBox>
                      </div>
                    </div>
                  </Container>
                </MDBox>
              </MDBox>
            )}
          </MDBox>
        ) : (
          <MDBox mt={4} mb={1} />
        )}
      </Card>
      <Footer />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default AppraiseQandA;
