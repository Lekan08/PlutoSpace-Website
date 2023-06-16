import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

/* eslint-disable react/prop-types */

function ViewDownloadDoc() {
  const MySwal = withReactContent(Swal);
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const handlePDF = (billDocID) => {
    console.log("entered?");
    console.log(billDocID);
    if (Object.keys(billDocID).length !== 0) {
      const data11 = JSON.parse(localStorage.getItem("user1"));

      const orgIDs = data11.orgID;
      const headers = miHeaders;
      fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getByKey/${orgIDs}/${billDocID}`, {
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
          console.log(result.name);
          fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${result.name}`, {
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

              // if (isMounted) {
              console.log(`link [${resultx[0]}]`);
              const url = resultx[0];
              window.location.href = url;
            });
        });
    }
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ids = urlParams.get("dz");
    const headers = miHeaders;
    let isMounted = true;
    setOpened(true);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/bills/getDocuments/${ids}`, { headers })
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
          console.log(result);
          if (Object.keys(result).length !== 0) {
            console.log(`something is there object ${result}`);
            handlePDF(result);
          } else {
            setOpened(false);
            console.log(`empty object ${result}`);
            MySwal.fire({
              title: "No Document",
              type: "error",
              text: "There are no attached Doc",
            }).then(() => {
              navigate(-1);
            });
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </div>
  );
}

export default ViewDownloadDoc;
