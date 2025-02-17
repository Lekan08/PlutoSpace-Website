// @mui material components
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import MDTypography from "components/MDTypography";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from 'react-router-dom';
// import Icon from "@mui/material/Icon";
import PHeaders from "postHeader";
// react-chartjs-2 components
import PieChart from "examples/Charts/PieChart";

import "./index.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate, Link } from "react-router-dom";
import GHeaders from "getHeader";
// import MDButton from "components/MDButton";
import ProgressBar from "react-bootstrap/ProgressBar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Styles from "styles";
// import { getFormGroupUtilityClass } from "@mui/material";

// import React from "react";
// import Paper from "@material-ui/core/Paper";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

function Dashboard() {
  const MySwal = withReactContent(Swal);
  const [card, setItems] = useState([]);
  const [itemsx, setItemsx] = useState([]);

  const [noOfUsers, setNoOfUsers] = useState(0);
  const [remPayDay, setRemPayDay] = useState(0);
  // const [groupGet, setGroupGet] = useState([]);
  const [polls, setPolls] = useState([]);
  const [allApp, setAllApp] = useState([]);
  const [empTOR, setEmpTOR] = useState([]);
  // const [pollsGroup, setPollGroups] = useState([]);

  const [showApp, setShowApp] = useState(false);
  const [showBirth, setShowBirth] = useState(false);
  const [showAnn, setShowAnn] = useState(false);
  const [showTOR, setShowTOR] = useState(false);
  const [showPolls, setShowPolls] = useState(false);
  const [idiotPoll, setIdiotPoll] = useState(true);

  const [resulty, setResult] = useState([]);
  // console.log(resulty);
  const [userNamex, setUserNamex] = useState("");
  const [amountx, setAmount] = useState("");
  const [numOfWork, setNumOfWork] = useState("");
  const [grading, setGrading] = useState("");
  // const [pollGroupID, setPollGroupID] = useState("");

  const [pollsResult, setPollsResult] = useState({});

  const { allGHeaders: miHeaders } = GHeaders();
  const { allPHeaders: myHeaders } = PHeaders();
  const navigate = useNavigate();

  const [opened, setOpened] = useState(false);

  const scrollContainerStyle = { width: "100%", maxHeight: "60%" };
  // const grader = { grading };

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const personalIds = data11.id;

    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_SHASHA_URL}/appraisalGrading/result/getEmpAverageResult/${orgIDs}/${personalIds}`,
      {
        headers,
      }
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
          if (result !== null && result !== "null") {
            setGrading(result);
          } else {
            setGrading("");
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const birthStatus = JSON.parse(localStorage.getItem("BirthDayStatus"));
    // console.log(setNumOfWork);

    const userOData = JSON.parse(localStorage.getItem("userOtherDets"));

    const userFullName = `${userOData.personal.fname} ${userOData.personal.lname}`;
    // console.log(userFullName);

    let isMounted = true;
    if (isMounted) {
      if (birthStatus === true) {
        MySwal.fire({
          title: "Happy Birthday",
          icon: "info",
          type: "info",
          text: `Happy Birthday ${userFullName}`,
        });
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/announcement/getCurrent/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
          if (result.length > 0) {
            setShowAnn(true);
          }
          if (result.length !== 0) {
            setItems(result);
          } else {
            setItems([]);
          }
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
    const personalIds = data11.personalID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/groups/getForEmp/${orgIDs}/${personalIds}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
          if (result.length !== 0) {
            let groupIDs = "";
            // eslint-disable-next-line array-callback-return
            result.map((grp) => {
              const idcheck = `${grp.group.id},`;
              groupIDs += idcheck;
            });
            fetch(`${process.env.REACT_APP_KUBU_URL}/poll/getForDashboard/${groupIDs}`, {
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
                console.log(resultx);
                console.log(result);
                if (isMounted) {
                  if (result.length > 0) {
                    setShowPolls(true);
                  }
                  if (result.length !== 0) {
                    setPolls(resultx);
                  } else if (resultx[0].status !== 2 && resultx[0].status !== "2") {
                    setIdiotPoll(true);
                  } else if (resultx[0].status === 2 && resultx[0].status === "2") {
                    idiotPoll(false);
                    showPolls(false);
                  } else {
                    setPolls([]);
                  }
                }
              });
          }
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
    const personalIds = data11.id;

    const userOData = JSON.parse(localStorage.getItem("userOtherDets"));
    const userNamexx = `${userOData.personal.fname} ${userOData.personal.lname}`;
    setUserNamex(userNamexx);
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_SHASHA_URL}/concern/getForEmpDashboard/${orgIDs}/${personalIds}`,
      {
        headers,
      }
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
          // if (result.length > 0) {
          //   setShowApp(true);
          // }
          if (result.length !== 0) {
            setResult(result);
          } else {
            setResult([]);
          }
          // console.log(setResult);
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
    const personalIds = data11.personalID;
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_SHASHA_URL}/appraisal/getOpenedForAppraiser/${orgIDs}/${personalIds}`,
      {
        headers,
      }
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
          if (result.length > 0) {
            setShowApp(true);
          }
          if (result.length !== 0) {
            setAllApp(result);
          } else {
            setAllApp([]);
          }
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
    const personalIds = data11.personalID;
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_NSUTANA_URL}/employeetimeofftransaction/getForEmpDashboard/${orgIDs}/${personalIds}`,
      { headers }
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
          if (result.length > 0) {
            setShowTOR(true);
          }
          if (result.length !== 0) {
            setEmpTOR(result);
          } else {
            setEmpTOR([]);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // function getFirstDayOfMonth(year, month) {
    //   return new Date(year, month, 1);
    // }

    // 👇️ First day of CURRENT MONTH
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();
    // console.log(lastDay);
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    let isMounted = true;
    fetch(
      `${process.env.REACT_APP_NSUTANA_URL}/freedays/getBetween/${orgIDs}/${firstDay}/${lastDay}`,
      { headers }
    )
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
          const totalFreeDays = result.length;
          const totalDays = (lastDay - firstDay) / 86400000;
          const finalTotalDays = totalDays - totalFreeDays + 1;
          // console.log(totalDays);
          // console.log(totalFreeDays);

          const clastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

          // console.log(lastDayx);
          // console.log(firstDays);
          // console.log(date.getFullYear());
          // console.log(clastDay);

          fetch(
            `${process.env.REACT_APP_NSUTANA_URL}/freedays/getBetween/${orgIDs}/${firstDay}/${clastDay}`,
            { headers }
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
            .then((cresult) => {
              if (cresult.message === "Expired Access") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (cresult.message === "Token Does Not Exist") {
                navigate("/authentication/sign-in");
                window.location.reload();
              }
              if (cresult.message === "Unauthorized Access") {
                navigate("/authentication/forbiddenPage");
                window.location.reload();
              }
              const ctotalFreeDays = cresult.length;
              const ctotalDays = (clastDay - firstDay) / 86400000;
              const cfinalTotalDays = ctotalDays - ctotalFreeDays + 1;
              const now = `${cfinalTotalDays}/${finalTotalDays}`;
              if (result !== null && result !== "null") {
                setNumOfWork(now);
              } else {
                setNumOfWork("");
              }
              // console.log(ctotalDays);
              // console.log(ctotalFreeDays);

              // console.log(firstDay);
              // console.log(lastDay);
              // console.log(clastDay);
            });
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
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getNoOfUsers/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
          if (result !== null && result !== "null") {
            setNoOfUsers(result);
          } else {
            setNoOfUsers(0);
          }
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
    fetch(`${process.env.REACT_APP_TANTA_URL}/remunerationTime/getNext/${orgIDs}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
          if (Object.keys(result).length !== 0) {
            const curDate = new Date();
            const payDate = new Date(result.payTime);

            const curDay = curDate.getDate();
            const payDay = payDate.getDate();
            const remDays = payDay - curDay;
            setRemPayDay(remDays);
          } else {
            setRemPayDay(0);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // const CurTime = new Date().getTime();
    const Month = new Date().getMonth() + 1;
    const Dates = new Date().getDate();
    const data11 = JSON.parse(localStorage.getItem("user1"));
    const orgIDs = data11.orgID;
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_ZAVE_URL}/user/getBirthdaysToday/${orgIDs}/${Dates}/${Month}`, {
      headers,
    })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
          if (result.length > 0) {
            setShowBirth(true);
          }
          if (result.length !== 0) {
            setItemsx(result);
          } else {
            setItemsx([]);
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // setOpened(true);

    // const headers = myHeaders;
    // function getFirstDayOfMonth(year, month) {
    //   return new Date(year, month, 1);
    // }

    // startTime: 1655074800000,
    // endTime: 1655161200000,

    // 👇️ First day of CURRENT MONTH
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const curDay = new Date().getTime();
    // console.log(firstDay);
    // console.log(curDay);
    // const curDate = new Date();
    const firstttDay = new Date(date.getFullYear(), date.getMonth(), 1);
    console.log(firstttDay);
    // const curDay = curDate.getDate();

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const personalIds = data11.personalID;

    const raw = JSON.stringify({
      userID: personalIds,
      orgID: orgIDs,
      startTime: firstDay,
      endTime: curDay,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let isMounted = true;
    fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/audit/getAuditAmount`, requestOptions)
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        const result = await res.text();
        if (result === null || result === undefined || result === "") {
          return {};
        }
        return JSON.parse(result);
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
          setOpened(false);
          // let priceByUser = 0;
          // // eslint-disable-next-line array-callback-return
          // result.map((item) => {
          //   if (item.price < 1) {
          //     priceByUser += item.price;
          //   }
          // });
          // console.log("result");
          // console.log(result);
          // console.log(priceByUser);
          if (result !== null && result !== "null") {
            setAmount(result);
          } else {
            setAmount("");
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAppraise = (value) => {
    navigate(`/Appraisal-Question-and-Answers?id=${value}`);
  };
  // const data = {
  //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //   datasets: {
  //     label: "# of Votes",
  //     data: [12, 19, 3, 5, 2, 3],
  //     backgroundColor: [
  //       "rgba(255, 99, 132, 0.2)",
  //       "rgba(54, 162, 235, 0.2)",
  //       "rgba(255, 206, 86, 0.2)",
  //       "rgba(75, 192, 192, 0.2)",
  //       "rgba(153, 102, 255, 0.2)",
  //       "rgba(255, 159, 64, 0.2)",
  //     ],
  //     borderColor: [
  //       "rgba(255, 99, 132, 1)",
  //       "rgba(54, 162, 235, 1)",
  //       "rgba(255, 206, 86, 1)",
  //       "rgba(75, 192, 192, 1)",
  //       "rgba(153, 102, 255, 1)",
  //       "rgba(255, 159, 64, 1)",
  //     ],
  //     borderWidth: 1,
  //   },
  // };

  // ChartJS.register(ArcElement, Tooltip, Legend);

  const handleGetPolls = (groupID) => {
    const headers = miHeaders;
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;

    fetch(`${process.env.REACT_APP_KUBU_URL}/poll/getForDashboard/${groupID}`, { headers })
      .then(async (res) => {
        const aToken = res.headers.get("token-1");
        localStorage.setItem("rexxdex", aToken);
        return res.json();
      })
      .then((resultt) => {
        if (resultt.message === "Expired Access") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (resultt.message === "Token Does Not Exist") {
          navigate("/authentication/sign-in");
          window.location.reload();
        }
        if (resultt.message === "Unauthorized Access") {
          navigate("/authentication/forbiddenPage");
          window.location.reload();
        }
        if (resultt.length !== 0) {
          fetch(`${process.env.REACT_APP_KUBU_URL}/poll/getResults/${orgIDs}/${resultt[0].id}`, {
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
              if (result.length !== 0) {
                console.log(result);
                const responseLabel = [];
                const numberData = [];
                const bgColorCode = [];
                // eslint-disable-next-line array-callback-return
                result.map((item) => {
                  let colorCodeee = "#";
                  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                  colorCodeee += randomColor;

                  numberData.push(item.number);
                  responseLabel.push(item.response);
                  bgColorCode.push(colorCodeee);
                });
                const allDataa = {
                  labels: responseLabel,
                  data: numberData,
                  backgroundColor: bgColorCode,
                };
                setPollsResult(allDataa);
              }
            });
          // } else {
          //   MySwal.fire({
          //     title: "NO_POLLS",
          //     type: "error",
          //     text: "There is no poll present in this group",
          //   });
        }
      });
  };

  useEffect(() => {
    const headers = miHeaders;

    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const empid = data11.personalID;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_SHASHA_URL}/groups/getForEmp/${orgIDs}/${empid}`, { headers })
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
        // setGroupId(result);
        if (isMounted) {
          if (result.length !== 0) {
            handleGetPolls(result[0].group.id);
            // setPollGroupID(result[0].group.id);
            // setPollGroups(result);
          }
        }

        return () => {
          isMounted = false;
        };
      });
  }, []);

  // useEffect(() => {

  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;

  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const pollids = urlParams.get("id");

  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP_KUBU_URL}/poll/getForDashboard/${orgIDs}`, { headers })
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
  //       if (isMounted) {
  //         const responseLabel = [];
  //         const numberData = [];
  //         // eslint-disable-next-line array-callback-return
  //         result.map((item) => {
  //           numberData.push(item.number);
  //           responseLabel.push(item.response);
  //         });
  //         const allDataa = {
  //           labels: responseLabel,
  //           data: numberData,
  //         };
  //         setPollsResult(allDataa);
  //         console.log(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // function getRandomColor(): string {
  //   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  // }
  // console.log(getRandomColor);

  // eslint-disable-next-line camelcase
  // function random_Rgba() {
  //   const o = Math.round;
  //   const r = Math.random;
  //   const s = 255;
  //   return `rgba(${o(r() * s)},${o(r() * s)},${o(r() * s)},${r().toFixed(1)})`;
  // }

  // const colorx = random_Rgba();
  // console.log(colorx);

  // eslint-disable-next-line no-return-assign

  // const setBg = () => {
  //   const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  //   document.body.style.backgroundColor = `#${randomColor}`;
  //   // eslint-disable-next-line no-undef
  //   innerHTML = `#${randomColor}`;
  // };
  // console.log(setBg);

  // const [primary] = useState("#18d01c");
  // console.log(primary);

  // // eslint-disable-next-line no-unused-expressions
  // primary - "#18d01c";

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Link to="/user-Management">
                <ComplexStatisticsCard
                  color="secondary"
                  icon="people"
                  title="No Of Users"
                  count={noOfUsers}
                  percentage={{
                    color: "success",
                    amount: "+55%",
                    label: "than lask week",
                  }}
                />
              </Link>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="payments"
                title="Amount Spent By User(₦)"
                count={amountx}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="schedule"
                title="Daily Countdown To Pay Day"
                count={remPayDay > 0 ? remPayDay : 0}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="calendar_month"
                title="Number of Working Days"
                count={numOfWork}
                percentage={{
                  color: "success",
                  // amount: "+1%",
                  // label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <>
                {grading?.score > 0 && (
                  <Card>
                    <MDBox
                      variant="gradient"
                      // bgColor="info"
                      // borderRadius="lg"
                      style={Styles.boxSx}
                      // coloredShadow="info"
                      mt={2}
                      mb={-2}
                      mx={0}
                      p={1}
                      textAlign="left"
                    >
                      <MDTypography
                        variant="h4"
                        fontWeight="medium"
                        color="white"
                        textAlign="center"
                        // mt={1}
                      >
                        Appraisal Score
                      </MDTypography>
                    </MDBox>
                    &nbsp;
                    <MDBox mb={2}>
                      <ProgressBar
                        now={grading.score}
                        variant={grading.colorCode}
                        label={`${grading.score}%`}
                        style={{
                          borderRadius: 0,
                        }}
                      />
                    </MDBox>
                  </Card>
                )}
              </>
              &nbsp;
            </Grid>
            <Grid item xs={6} md={3} lg={6}>
              <>
                {showBirth ? (
                  <Card style={{ backgroundColor: "#f96d02", maxHeight: 350 }}>
                    <MDTypography
                      variant="h4"
                      fontWeight="bold"
                      color="white"
                      textAlign="left"
                      mt={1}
                    >
                      &nbsp; Birthdays
                    </MDTypography>
                    &nbsp;
                    <div
                      className="scrollbar scrollbar-primary mt-2 mx-auto"
                      style={scrollContainerStyle}
                    >
                      <Container>
                        <div className="row">
                          {itemsx.map((item) => (
                            <Grid item xs={12} md={12} lg={12} key={item.id}>
                              <Card sx={{ maxWidth: 345 }}>
                                <CardContent>
                                  <MDTypography
                                    variant="h5"
                                    fontWeight="medium"
                                    fontSize="120%"
                                    // color="info"
                                    style={Styles.textSx}
                                    textAlign="left"
                                    mt={1}
                                  >
                                    {item.personal.fname} &nbsp; {item.personal.lname}
                                  </MDTypography>
                                  {/* <MDTypography
                                  variant="h6"
                                  color="text"
                                  fontSize="75%"
                                  textAlign="left"
                                  mt={1}
                                >
                                  You have been selected for this Appraisal
                                </MDTypography> */}
                                  <MDTypography
                                    variant="h6"
                                    color="text"
                                    fontSize="75%"
                                    textAlign="left"
                                    mt={1}
                                  >
                                    Phone Number - {item.personal.pno}
                                  </MDTypography>
                                  <MDTypography
                                    variant="h6"
                                    color="text"
                                    fontSize="75%"
                                    textAlign="left"
                                    mt={0}
                                  >
                                    Country - {item.personal.residentialCountry}
                                  </MDTypography>
                                  <MDTypography
                                    variant="h6"
                                    color="text"
                                    fontSize="75%"
                                    textAlign="left"
                                    mt={0}
                                  >
                                    Marital Status - {item.personal.maritalStatus}
                                  </MDTypography>
                                </CardContent>
                                {/* <CardActions>
                                <div align="right">
                                  <MDButton
                                    variant="gradient"
                                    color="info"
                                    onClick={() => handleAppraise(item.id)}
                                    width="50%"
                                  >
                                    Appraise
                                  </MDButton>
                                </div>
                              </CardActions> */}
                              </Card>
                              &nbsp;
                            </Grid>
                          ))}
                        </div>
                      </Container>
                    </div>
                    &nbsp;
                  </Card>
                ) : (
                  <>
                    {/* <Card
                  style={{
                    // backgroundColor: "#318CE7",
                    backgroundColor: "#f96d02",
                    maxHeight: 350,
                  }}
                >
                  {" "}
                  <MDTypography
                    variant="h3"
                    fontWeight="bold"
                    color="white"
                    textAlign="center"
                    mt={1}
                  >
                    No Birthdays Today
                  </MDTypography>
                  <Icon
                    fontSize="medium"
                    sx={{ fontSize: 100, alignSelf: "center" }}
                    color="disabled"
                  >
                    sentiment_dissatisfied
                  </Icon>
                </Card> */}
                  </>
                )}
              </>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox>
                {showAnn ? (
                  <Grid container spacing={0}>
                    <Card sx={{ maxHeight: 350 }}>
                      <MDBox
                        variant="gradient"
                        // bgColor="info"
                        // borderRadius="lg"
                        style={Styles.boxSx}
                        // coloredShadow="info"
                        mt={2}
                        mx={0}
                        p={1}
                        textAlign="left"
                      >
                        <MDTypography
                          variant="h4"
                          fontWeight="medium"
                          color="white"
                          textAlign="center"
                          mt={1}
                        >
                          Announcement
                        </MDTypography>
                      </MDBox>
                      <div
                        className="scrollbar scrollbar-primary mt-2 mx-auto"
                        style={scrollContainerStyle}
                      >
                        <Container>
                          <div className="row">
                            {card.map((api) => (
                              <Grid item xs={12} md={12} lg={12} key={api.announcement.id}>
                                <div>
                                  <Accordion
                                    style={{ backgroundColor: api.announcementType.colorCode }}
                                  >
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                    >
                                      <img
                                        src={api.announcementType.icon}
                                        alt="Icon"
                                        width="62"
                                        height="62"
                                      />
                                      &nbsp; &nbsp;
                                      <MDTypography
                                        variant="h4"
                                        fontWeight="medium"
                                        color="white"
                                        textAlign="left"
                                        mt={1}
                                      >
                                        {api.announcement.title}
                                      </MDTypography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <div style={{ color: "#f5f5f5" }}>
                                        {api.announcement.message}
                                      </div>
                                    </AccordionDetails>
                                  </Accordion>
                                  <br />
                                </div>
                              </Grid>
                            ))}
                          </div>
                        </Container>
                      </div>
                    </Card>
                  </Grid>
                ) : (
                  <>
                    {/* <Card style={{ backgroundColor: "#f96d02", maxHeight: 350 }}>
                    {" "}
                    <MDTypography
                      variant="h3"
                      fontWeight="bold"
                      color="white"
                      textAlign="center"
                      mt={1}
                    >
                      No Announcement At The Moment
                    </MDTypography>
                    <Icon
                      fontSize="medium"
                      sx={{ fontSize: 100, alignSelf: "center" }}
                      color="disabled"
                    >
                      sentiment_dissatisfied
                    </Icon>
                  </Card> */}
                  </>
                )}
              </MDBox>
            </Grid>
            <Grid item xs={6} md={3} lg={4}>
              {showTOR ? (
                <Card sx={{ maxHeight: 350 }}>
                  <MDBox
                    variant="gradient"
                    // bgColor="info"
                    // borderRadius="lg"
                    style={Styles.boxSx}
                    // coloredShadow="info"
                    mt={2}
                    mx={0}
                    p={1}
                    textAlign="left"
                  >
                    <MDTypography
                      variant="h4"
                      fontWeight="medium"
                      color="white"
                      textAlign="center"
                      mt={1}
                    >
                      Time-Off Request
                    </MDTypography>
                  </MDBox>
                  <div
                    className="scrollbar scrollbar-primary mt-2 mx-auto"
                    style={scrollContainerStyle}
                  >
                    <MDBox mb={1.5}>
                      <Container>
                        <div className="row">
                          {empTOR.map((item) => (
                            <Grid container spacing={0} key={item.id}>
                              <Grid item xs={12} md={12} lg={12}>
                                {/* <Link to={`/polls/vote-Polls?id=${api.id}`}> */}
                                <Card style={{ backgroundColor: "#f96d02" }}>
                                  <CardContent>
                                    <MDTypography
                                      variant="h6"
                                      color="white"
                                      fontSize="75%"
                                      textAlign="left"
                                      mt={1}
                                    >
                                      Employee - {item.empName}
                                    </MDTypography>
                                    <MDTypography
                                      variant="h6"
                                      color="white"
                                      fontSize="75%"
                                      textAlign="left"
                                      mt={0}
                                    >
                                      Date Requested - {item.noOfDaysRequested}
                                    </MDTypography>
                                    <MDTypography
                                      variant="h6"
                                      color="white"
                                      fontSize="75%"
                                      textAlign="left"
                                      mt={0}
                                    >
                                      Reason - {item.purpose}
                                    </MDTypography>
                                  </CardContent>
                                </Card>{" "}
                                &nbsp; &nbsp;
                                {/* </Link> */}
                              </Grid>
                            </Grid>
                          ))}
                        </div>
                      </Container>
                    </MDBox>
                  </div>
                </Card>
              ) : (
                <>
                  {/* <Card style={{ backgroundColor: "#f96d02", maxHeight: 350 }}>
                  {" "}
                  <MDTypography
                    variant="h3"
                    fontWeight="bold"
                    color="white"
                    textAlign="center"
                    mt={1}
                  >
                    No Time-Off Requests At The Moment
                  </MDTypography>
                  <Icon
                    fontSize="medium"
                    sx={{ fontSize: 100, alignSelf: "center" }}
                    color="disabled"
                  >
                    sentiment_dissatisfied
                  </Icon>
                </Card> */}
                </>
              )}
            </Grid>
            {resulty.length > 0 && (
              <Grid item xs={6} md={3} lg={4}>
                <Card sx={{ maxHeight: 350 }}>
                  <div
                    className="scrollbar scrollbar-primary mt-2 mx-auto"
                    style={scrollContainerStyle}
                  >
                    <MDBox mb={1.5}>
                      <MDBox
                        variant="gradient"
                        // bgColor="info"
                        // borderRadius="lg"
                        style={Styles.boxSx}
                        // coloredShadow="info"
                        mt={2}
                        mx={0}
                        p={1}
                        mb={3}
                        textAlign="left"
                      >
                        <MDTypography
                          variant="h4"
                          fontWeight="medium"
                          color="white"
                          textAlign="center"
                          mt={1}
                        >
                          Matters Arising
                        </MDTypography>
                      </MDBox>
                      <Container>
                        <div className="row">
                          {resulty.map((api) => (
                            <Grid container spacing={0} key={api.id}>
                              <Grid item xs={12} md={12} lg={12}>
                                <MDBox mb={2}>
                                  <Link to={`/view-Matter?username=${userNamex}&room=${api.id}`}>
                                    <Card style={{ backgroundColor: "#f96d02" }}>
                                      <CardContent>
                                        <MDTypography
                                          variant="h4"
                                          fontWeight="medium"
                                          color="white"
                                          textAlign="left"
                                          mt={1}
                                        >
                                          {api.title}
                                        </MDTypography>
                                        <div
                                          style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            width: "10rem",
                                            color: "#f5f5f5",
                                            whiteSpace: "nowrap",
                                            fontSize: "80%",
                                          }}
                                        >
                                          <p>{api.message}</p>
                                        </div>
                                      </CardContent>
                                    </Card>{" "}
                                  </Link>
                                </MDBox>

                                {/* <Link to={`/polls/vote-Polls?id=${api.id}`}>
                              <Card style={{ backgroundColor: "#318CE7" }}>
                                <CardContent>
                                  <MDTypography
                                    variant="h4"
                                    fontWeight="medium"
                                    color="white"
                                    textAlign="left"
                                    mt={1}
                                  >
                                    Poll
                                  </MDTypography>
                                  <div style={{ color: "#f5f5f5" }}>{api.question}</div>
                                </CardContent>
                              </Card>{" "}
                              &nbsp; &nbsp;
                            </Link> */}
                              </Grid>
                            </Grid>
                          ))}
                        </div>
                      </Container>
                    </MDBox>
                  </div>
                </Card>
              </Grid>
            )}
          </Grid>
        </MDBox>
      </MDBox>
      &nbsp;
      <Container>
        <div className="row">
          {/* <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={(e) => handleUpdate(e)}
                // disabled={!enabled}
                color="info"
                width="50%"
                align="right"
              >
                Vote Poll
              </MDButton>
            </MDBox> */}
        </div>
      </Container>
      <MDBox py={3}>
        {/* <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid> */}
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={6} md={6} lg={6}>
              {showApp ? (
                <Card style={{ backgroundColor: "#f96d02", maxHeight: 350 }}>
                  <MDBox
                    variant="gradient"
                    bgColor="white"
                    // borderRadius="lg"
                    coloredShadow="success"
                    mt={2}
                    mx={0}
                    p={1}
                    textAlign="left"
                  >
                    <MDTypography
                      variant="h4"
                      fontWeight="medium"
                      // color="info"
                      style={Styles.textSx}
                      textAlign="center"
                      mt={1}
                    >
                      Appraisal
                    </MDTypography>
                  </MDBox>
                  &nbsp;
                  <div
                    className="scrollbar scrollbar-primary mt-2 mx-auto"
                    style={scrollContainerStyle}
                  >
                    <Container>
                      <div className="row">
                        {allApp.map((item) => (
                          <Grid item xs={12} md={12} lg={12} key={item.id}>
                            <Card sx={{ maxWidth: 345 }}>
                              <CardContent>
                                <MDTypography
                                  variant="h5"
                                  fontWeight="medium"
                                  fontSize="120%"
                                  // color="info"
                                  style={Styles.textSx}
                                  textAlign="left"
                                  mt={1}
                                >
                                  {item.name}
                                </MDTypography>
                                <MDTypography
                                  variant="h6"
                                  color="text"
                                  fontSize="75%"
                                  textAlign="left"
                                  mt={1}
                                >
                                  You have been selected for this Appraisal
                                </MDTypography>
                                <MDTypography
                                  variant="h6"
                                  color="text"
                                  fontSize="75%"
                                  textAlign="left"
                                  mt={1}
                                >
                                  Appraisee - {item.appraiseeName}
                                </MDTypography>
                                <MDTypography
                                  variant="h6"
                                  color="text"
                                  fontSize="75%"
                                  textAlign="left"
                                  mt={0}
                                >
                                  Created By - {item.createdByName}
                                </MDTypography>
                              </CardContent>
                              <CardActions>
                                <div align="right">
                                  <MDButton
                                    variant="gradient"
                                    // color="info"
                                    style={Styles.buttonSx}
                                    onClick={() => handleAppraise(item.id)}
                                    width="50%"
                                  >
                                    Appraise
                                  </MDButton>
                                </div>
                              </CardActions>
                            </Card>
                            &nbsp;
                          </Grid>
                        ))}
                      </div>
                    </Container>
                  </div>
                  &nbsp;
                </Card>
              ) : (
                <>
                  {/* <Card style={{ backgroundColor: "#f96d02", maxHeight: 350 }}>
                  {" "}
                  <MDTypography
                    variant="h3"
                    fontWeight="bold"
                    color="white"
                    textAlign="center"
                    mt={1}
                  >
                    No Appraisal At The Moment
                  </MDTypography>
                  <Icon
                    fontSize="medium"
                    sx={{ fontSize: 100, alignSelf: "center" }}
                    color="disabled"
                  >
                    sentiment_dissatisfied
                  </Icon>
                </Card> */}
                </>
              )}
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              {showPolls ? (
                <Card sx={{ maxHeight: 350 }}>
                  <div
                    className="scrollbar scrollbar-primary mt-2 mx-auto"
                    style={scrollContainerStyle}
                  >
                    <MDBox mb={1.5}>
                      <Container>
                        <div className="row">
                          {polls.map((api) => (
                            <Grid container spacing={0} key={api.id}>
                              <Grid item xs={12} md={12} lg={12}>
                                <Link to={`/polls/vote-Polls?id=${api.id}`}>
                                  <Card style={{ backgroundColor: "#f96d02" }}>
                                    <CardContent>
                                      <MDTypography
                                        variant="h4"
                                        fontWeight="medium"
                                        color="white"
                                        textAlign="left"
                                        mt={1}
                                      >
                                        Poll
                                      </MDTypography>
                                      <div style={{ color: "#f5f5f5" }}>{api.question}</div>
                                    </CardContent>
                                  </Card>{" "}
                                  &nbsp; &nbsp;
                                </Link>
                              </Grid>
                            </Grid>
                          ))}
                        </div>
                      </Container>
                    </MDBox>
                  </div>
                </Card>
              ) : (
                <>
                  {/* <Card style={{ backgroundColor: "#f96d02", maxHeight: 350 }}>
                  {" "}
                  <MDTypography
                    variant="h3"
                    fontWeight="bold"
                    color="white"
                    textAlign="center"
                    mt={1}
                  >
                    No Poll At The Moment
                  </MDTypography>
                  <Icon
                    fontSize="medium"
                    sx={{ fontSize: 100, alignSelf: "center" }}
                    color="disabled"
                  >
                    sentiment_dissatisfied
                  </Icon>
                </Card> */}
                </>
              )}
            </Grid>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Grid container spacing={1}>
              <Grid item xs={6} md={6} lg={6}>
                {idiotPoll ? (
                  <Card style={{ marginLeft: 10 }}>
                    <PieChart
                      // icon={{ color: "primary", component: "leaderboard" }}
                      title="Pie Chart"
                      description="Poll Analytics Insights"
                      chart={{
                        labels: pollsResult.labels,
                        datasets: {
                          label: "Projects",
                          backgroundColors: pollsResult.backgroundColor,
                          data: pollsResult.data,
                        },
                      }}
                    />
                  </Card>
                ) : (
                  // <Card>
                  //   <PieChart
                  //     // icon={{ color: "primary", component: "leaderboard" }}
                  //     title="Pie Chart"
                  //     description="Analytics Insights"
                  //     chart={{
                  //       labels: pollsResult.labels,
                  //       datasets: {
                  //         label: "Projects",
                  //         backgroundColors: pollsResult.backgroundColor,
                  //         data: pollsResult.data,
                  //       },
                  //     }}
                  //   />
                  // </Card>
                  <Card />
                )}
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
