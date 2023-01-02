import React, { useState, useEffect } from "react";
// import axios from "axios";
import Posts from "components/posts";
import Pagination from "components/pagination";
// import "./App.css";
import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
import PHeaders from "postHeader";
import { Container } from "react-bootstrap";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "bootstrap/dist/css/bootstrap.min.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

// import CoverLayout from "layouts/authentication/components/CoverLayout";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import Time from "layouts/cbt/takeCbt/time";
import Grid from "@mui/material/Grid";

// eslint-disable-next-line consistent-return
const TakeCBT = () => {
  const MySwal = withReactContent(Swal);
  const [posts, setPosts] = useState([]);
  const [currentPosts, setCurrentPosts] = useState([]);
  // const [correctScore, setCorrectScore] = useState([]);
  const [picImage, setPicImage] = useState([]);
  // const [image, setImage] = useState([]);
  console.log(picImage);

  // console.log(posts);
  const [loading, setLoading] = useState(false);

  const PAGE_KEY = "MY_PAGINATION_KEY";

  const getPageNumber = () => {
    // eslint-disable-next-line radix
    if (localStorage && parseInt(localStorage.getItem(PAGE_KEY)) > 0) {
      // eslint-disable-next-line radix
      return parseInt(localStorage.getItem(PAGE_KEY));
    }
    return 1;
  };
  // console.log(getPageNumber());

  const [currentPage, setCurrentPage] = useState(getPageNumber());
  const [postsPerPage] = useState(1);
  const { allGHeaders: miHeaders } = GHeaders();
  const { allPHeaders: myHeaders } = PHeaders();
  // const [itemsx, setItems] = useState([]);
  // const [machala, setMachala] = useState("");
  // console.log(lojay);
  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();

  const [answerx, setAnswer] = useState("");
  const [optionsxy, setOptionsxy] = useState([]);
  // console.log(optionsxy);

  useEffect(() => {
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
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
        console.log(result);
        // const zinoleesky = [result[0]];
        // setImage(zinoleesky);
        if (isMounted) {
          setPicImage(result);
          console.log(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnChangeOption = (e) => {
    // console.log(answerx);
    const opVal = e.target.value;
    // console.log(opVal);
    const newSett = optionsxy.filter((option) => option.id === opVal);
    const newSet = newSett[0];
    // console.log(newSet);
    if (answerx.length !== 0) {
      setAnswer((ansx) => ansx.filter((ansxs) => ansxs.questionID !== newSet.questionID));
    }

    // // eslint-disable-next-line array-callback-return
    // answerx.map((detVal) => {
    //   if (detVal.questionID === newSet.questionID) {
    // setWhatsappAccounts((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    //   }
    // })

    // eslint-disable-next-line no-shadow
    setAnswer((ansx) => [...ansx, newSet]);
    // setAnswer(opVal);
  };
  // console.log(answerx);
  // console.log(handleOnChangeOption);

  // const getPrevious = () => {
  //   setCurrentPage(currentPage - 1);
  // };
  // const getNext = () => {
  //   setCurrentPage(currentPage + 1);
  // };

  // const startingMinutes = 10;
  // let time = startingMinutes * 60;

  // const coundownEl = document.getElementById("countdown");

  // function updateCountdown() {
  //   const minutes = Math.floor(time / 60);
  //   let seconds = time % 60;

  //   seconds = seconds < 10 ? `0${seconds}` : seconds;

  //   coundownEl.innerHTML = `${minutes} :${seconds}`;
  //   // eslint-disable-next-line no-plusplus
  //   time--;
  // }
  // setInterval(updateCountdown, 1000);

  //   useEffect(() => {
  //     const fetchPosts = async () => {
  //       setLoading(true);
  //       const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  //       setPosts(res.data);
  //       setLoading(false);
  //     };

  //     fetchPosts();
  //   }, []);
  // useEffect(() => {
  //   // const headers = miHeaders;
  //   // const headers = "";
  //   // console.log(headers);
  //   const miHeaders = new Headers();
  //   console.log(miHeaders);
  //   miHeaders.append("Content-Type", "application/json");
  //   const orgIDs = "62bb21f6266f37394be3a183";
  //   const cbtIds = "62c84d134f03d07ffeba236e";
  //   console.log(orgIDs);
  //   console.log(cbtIds);
  //   setLoading(true);
  //   const requestOptions = {
  //     method: "GET",
  //     headers: miHeaders,
  //     redirect: "follow",
  //   };

  //   fetch(
  //     `https://raga.plutospace.space/cbtQuestion/gets/${orgIDs}/${cbtIds}`,
  //     {
  //       requestOptions,
  //     }
  //   ).then(async (res) => {
  //     setPosts(res.data);
  //     setLoading(false);
  //     console.log(res);
  //     console.log(res.data);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    // console.log(answerx);
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    // const cbtIDs = data11.ID;
    const headers = miHeaders;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const cbtIDs = urlParams.get("id");
    let isMounted = true;
    setLoading(true);
    fetch(`${process.env.REACT_APP_RAGA_URL}/cbtQuestion/getDetails/${orgIDs}/${cbtIDs}`, {
      headers,
    })
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
        // if (result === 0 && result === "" && result === [] && result === {}) {
        //   return MySwal.fire({
        //     title: "No Questions",
        //     icon: "info",
        //     type: "info",
        //     text: `Add Questions before taking CBT`,
        //   });
        // }
        // navigate(`/authentication/sign-in`);
        if (result === 0 && result === "" && result === [] && result === {}) {
          MySwal.fire({
            title: "No Questions added to this CBT",
            type: "error",
            text: "Add Questions before taking CBT",
          });
        }
        navigate(`/authentication/sign-in`);

        // console.log(result);

        if (isMounted) {
          setPosts(result);
          // const indexOfLastPost = currentPage * postsPerPage;
          // const indexOfFirstPost = indexOfLastPost - postsPerPage;
          // console.log(posts);
          // console.log(indexOfFirstPost);
          // console.log(indexOfLastPost);
          // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
          // console.log(currentPosts);
          // const newPosts = itemsx.slice(indexOfFirstPost, indexOfLastPost);
          // console.log(newPosts);
          // console.log(itemsx);

          // const indexOfLastPost = currentPage * postsPerPage;
          // const indexOfFirstPost = indexOfLastPost - postsPerPage;
          // console.log(posts);
          // console.log(indexOfFirstPost);
          // console.log(indexOfLastPost);

          // const currentPostss = result.slice(indexOfFirstPost, indexOfLastPost);
          const currentPostss = [result[0]];
          setCurrentPosts(currentPostss);
          // console.log(currentPostss);
          // setCorrectScore(currentPostss);
          // setMachala(currentPostss[0].question.id);
          setOptionsxy(currentPostss[0].options);
          // console.log(currentPostss[0].options);

          // setOptionsxy(result.options);
          // console.log(result.options);
          // setOptionsxy(result[0].options);
          // setLojay(ids);
          // setPosts(result);
          setLoading(false);
          setOpened(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  // console.log(correctScore.options);
  // console.log(machala);

  const handleClick = (e) => {
    // handleOnNameKeys();
    // if (enabled) {
    setOpened(true);
    e.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const cbtIDs = urlParams.get("id");
    const candidate = urlParams.get("candidateid");

    // const Danyflames = [];
    // // const text = answerx;
    // // localStorage.setItem("test", JSON.stringify(Danyflames));
    // Danyflames.push(answerx);
    // //     let array = [];
    // // let text = "Hello!";

    // // initialize array from storage
    // let neww = "";
    // function load() {
    //   neww = JSON.parse(localStorage.getItem("notes")) || [];
    // }
    // console.log(load);

    // // update both the array and local storage
    // function notes() {
    //   neww.push(text);
    //   localStorage.setItem("notes", JSON.stringify(Danyflames));
    // }
    // console.log(notes);
    // if (localStorage.getItem("test")) {
    //   // eslint-disable-next-line no-const-assign
    //   Danyflames = JSON.parse(localStorage.getItem("test"));
    //   // console.log(Danyflames);
    // } else {
    //   // eslint-disable-next-line no-const-assign
    //   Danyflames = [];
    //   // console.log(Danyflames);
    // }
    // console.log(Danyflames);
    const data11 = JSON.parse(localStorage.getItem("user1"));

    const orgIDs = data11.orgID;
    const Danyflames = [];

    // eslint-disable-next-line array-callback-return
    posts.map((ppost) => {
      // eslint-disable-next-line array-callback-return
      answerx.map((aans) => {
        if (ppost.question.id === aans.questionID) {
          const fyd = {
            orgID: orgIDs,
            cbtID: cbtIDs,
            questionID: aans.questionID,
            candidateID: candidate,
            answerID: aans.id,
          };
          Danyflames.push(fyd);
        }
      });
    });

    const raw = JSON.stringify(Danyflames);
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_RAGA_URL}/cbtAnswer/save`, requestOptions)
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
        console.log(result);
        if (result.status === "SUCCESS") {
          const cbtIDsx = urlParams.get("id");
          const empID = data11.personalID;
          const headers = miHeaders;
          let isMounted = true;
          fetch(`${process.env.REACT_APP_RAGA_URL}/cbt/getCBTResultsForEmp/${cbtIDsx}/${empID}`, {
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
              // const zinoleesky = [result[0]];
              // setImage(zinoleesky);
              if (isMounted) {
                // setPicImage(result);
                console.log(resultx);
              }
            });
          return () => {
            isMounted = false;
          };
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
  // console.log(optionsxy);

  //   useEffect(() => {
  //     const data11 = JSON.parse(localStorage.getItem("user1"));

  //     const orgIDs = data11.orgID;
  //     // const cbtIDs = data11.ID;
  //     const headers = miHeaders;
  //     const zoom = "62bf0dbf4831dc771b418e2e";
  //     console.log(zoom);
  //     let isMounted = true;

  //     if (isMounted) {
  //       console.log(resultz);
  //       setItems(resultz);
  //     }
  //   });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // useEffect(() => {
  //   const headers = miHeaders;
  //   const data11 = JSON.parse(localStorage.getItem("user1"));

  //   const orgIDs = data11.orgID;
  //   const isMounted = true;
  //   fetch(`${process.env.REACT_APP_RAGA_URL}/options/getForQuestion/${orgIDs}/${lojay}`, {
  //     headers,
  //   })
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       return res.json();
  //     })
  //     .then((resultz) => {
  //       if (resultz.message === "Expired Access") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (resultz.message === "Token Does Not Exist") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (resultz.message === "Unauthorized Access") {
  //         navigate("/authentication/forbiddenPage");
  //         window.location.reload();
  //       }
  //       setItems(resultz);
  //       console.log(resultz);
  //       if (isMounted) {
  //         console.log(resultz);
  //       }
  //     });
  //   return () => {
  //     // eslint-disable-next-line no-const-assign
  //     isMounted = false;
  //   };
  // }, []);

  // const rubbish = currentPosts.cbtQuestion.questionID;
  // console.log(rubbish);
  // useEffect(() => {
  //   // const data11 = JSON.parse(localStorage.getItem("user1"));

  //   // const orgIDs = data11.orgID;
  //   // // const cbtIDs = data11.ID;
  //   const headers = miHeaders;
  //   // const queryString = window.location.search;
  //   // const urlParams = new URLSearchParams(queryString);
  //   // const cbtIDs = urlParams.get("id");
  //   const anodaRubbish = rubbish.cbtQuestion.questionID;
  //   console.log(anodaRubbish);
  //   let isMounted = true;
  //   fetch(`${process.env.REACT_APP__RAGA_URL}/questions/getByIds/${anodaRubbish}`, {
  //     headers,
  //   })
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
  //       console.log(result);
  //       if (isMounted) {
  //         console.log(result);
  //         // setItems(result);
  //       }
  //     });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // Change page
  // localStorage.setItem(PAGE_KEY, currentPage + 1);
  const paginate = (pageNumber) => {
    // console.lo);
    // eslint-disable-next-line no-unused-expressions
    setCurrentPage(pageNumber);
    // console.lo);
    const result = posts;
    setLoading(true);

    // console.lo);
    setPosts(result);
    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // console.log(posts);
    // console.log(indexOfFirstPost);
    // console.log(indexOfLastPost);
    // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    // console.log(currentPosts);
    // const newPosts = itemsx.slice(indexOfFirstPost, indexOfLastPost);
    // console.log(newPosts);
    // console.log(itemsx);

    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // console.log(posts);
    // console.log(indexOfFirstPost);
    // console.log(indexOfLastPost);

    // const currentPostss = result.slice(indexOfFirstPost, indexOfLastPost);
    const currentPostss = [result[pageNumber - 1]];
    setCurrentPosts(currentPostss);
    // console.lo);
    // setCorrectScore(currentPostss);
    // setMachala(currentPostss[0].question.id);
    setOptionsxy(currentPostss[0].options);
    // console.log(currentPostss[0].options);

    // setOptionsxy(result.options);
    // console.lo.options);
    // setOptionsxy(result[0].options);
    // setLojay(ids);
    // setPosts(result);
    setLoading(false);
    setOpened(false);

    // pageNumber.preventDefault();
  };
  localStorage.setItem(PAGE_KEY, currentPage);
  // console.log(machala);
  // console.log(currentPosts);
  // console.log(optionsxy);

  // const persisted = Number(localStorage.getItem("ContinueTime"));
  // let ContinueTime;

  // if (persisted > 0) {
  //   ContinueTime = persisted;
  // } else {
  //   ContinueTime = Time;
  //   localStorage.setItem("ContinueTime", ContinueTime);
  // }
  // console.log(<Time />);
  // console.log(ContinueTime);
  // console.log(persisted);

  // useEffect(() => {
  //   const fullData = [];
  //   fullData.push(currentPosts);
  //   console.log(fullData);
  //   const answer = [];
  //   answer.push(answerx);
  //   console.log(answer);
  // }, [answerx]);

  return (
    <PageLayout image={bgImage}>
      {/* <Posts posts={currentPosts} loading={loading} />
        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} /> */}
      {/* <Container> */}
      <MDBox>
        <Grid item xs={100} md={70} lg={45}>
          <Card>
            <MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox textAlign="right">
                  <Time />
                </MDBox>
                <MDBox textAlign="center">
                  <h1 className="text-primary mb-3">CBT Question</h1>
                </MDBox>
                <Posts posts={currentPosts} loading={loading} picImage={picImage} />
                {/* <Posts  /> */}
                {/* <>
                <link
                  href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"
                />
                <div className="timer" />
              </> */}
                {/* <li className="list-group-item">{machala}</li> */}
                {/* {posts.map((post) => (
                <li key={post.id}>{post.questionID}</li>
              ))} */}
                <MDBox mb={2}>
                  <Container>
                    {/* <div className="row">

                    <div className="col-sm-12"> */}

                    {optionsxy.length > 0 && (
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={answerx}
                          onChange={handleOnChangeOption}
                        >
                          {/* eslint-disable-next-line react/prop-types */}
                          {optionsxy.map((apis) => (
                            <FormControlLabel
                              key={apis.id}
                              value={apis.id}
                              control={<Radio />}
                              label={apis.value}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    )}
                    {/* </div> */}
                    {/* </div> */}
                    {/* <MDBox>
                  <Container>
                    <MDBox textAlign="left">
                      <MDButton variant="gradient" onClick={getPrevious} color="info" width="50%">
                        Previous
                      </MDButton>
                    </MDBox>
                    <MDBox textAlign="right">
                      <MDButton variant="gradient" onClick={getNext} color="info" width="50%">
                        Next
                      </MDButton>
                    </MDBox>
                  </Container>
                </MDBox> */}
                  </Container>
                </MDBox>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={posts.length}
                  paginate={paginate}
                />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" onClick={handleClick} color="info" width="50%">
                  Finish
                </MDButton>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
      {/* </Container> */}
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </PageLayout>
  );
};

export default TakeCBT;
