import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import GHeaders from "getHeader";
import Grid from "@mui/material/Grid";
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Styles from "styles";

// eslint-disable-next-line react/prop-types
const AttachSignedDoc = ({ billId }) => {
  const { allGHeaders: miHeaders } = GHeaders();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [billDocOldId, setBillDocOldID] = useState([]);
  const [opened, setOpened] = useState(false);
  const [files, setFiles] = useState("");

  const showSwalNotification = (titlex, typex, textx) => {
    MySwal.fire({
      title: titlex,
      icon: typex,
      text: textx,
      customClass: {
        container: "swal-container",
      },
      didOpen: () => {
        const swalContainer = document.querySelector(".swal-container");
        if (swalContainer) {
          swalContainer.style.zIndex = "9999";
        }
      },
    }).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    const headers = miHeaders;
    let isMounted = true;
    setOpened(true);
    fetch(`${process.env.REACT_APP_LOUGA_URL}/bills/getDocuments/${billId}`, { headers })
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
            setOpened(false);
            console.log(`something is there object ${result}`);
            setBillDocOldID(result);
          } else {
            setOpened(false);
            console.log(`empty object ${result}`);

            showSwalNotification("No Document", "error", "There was no Doc attached from onset");
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleImageUpload = (e) => {
    if (files !== "" && files !== 0) {
      if (files === undefined) {
        showSwalNotification("INVALID_INPUT", "error", "Please input a file");
      } else {
        setOpened(true);
        e.preventDefault();
        // Headers for upload image
        const GenToken = localStorage.getItem("rexxdex1");
        const apiiToken = localStorage.getItem("rexxdex");

        if (apiiToken !== "null" && apiiToken !== null) {
          localStorage.setItem("rexxdex1", apiiToken);
        }
        const iiHeaders = new Headers();
        iiHeaders.append("Token-1", GenToken);

        const data11 = JSON.parse(localStorage.getItem("user1"));
        // const personalIDs = data11.id;
        const orgIdx = data11.orgID;
        // const imgKey = `PROF_PIC_EMP-${personalIDs}`;
        // console.log(imgKey);

        const dateQ = new Date().getTime();
        const billsKey = `billsDoc${1 * 2 + 3 + dateQ}`;
        console.log(billsKey);
        console.log(files);
        const formDataxx = new FormData();
        formDataxx.append("file", files[0]);
        formDataxx.append("orgID", orgIdx);
        formDataxx.append("key", billsKey);
        formDataxx.append("type", files[0].type);

        const raw = formDataxx;
        console.log(raw);

        const requestOptions = {
          method: "POST",
          headers: iiHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/uploadFile`, requestOptions)
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
            console.log(`Result of media upload ${result.status}`);
            if (result.status === "SUCCESS") {
              console.log(billId);

              const requestOptionsDel = {
                method: "DELETE",
                headers: miHeaders,
              };

              fetch(
                `${process.env.REACT_APP_LOUGA_URL}/bills/removeDocument/${billId}/${billDocOldId}`,
                requestOptionsDel
              )
                .then(async (res) => {
                  const aToken = res.headers.get("token-1");
                  localStorage.setItem("rexxdex", aToken);
                  return res.json();
                })
                .then((resultr) => {
                  console.log(`Result of remove Document ${resultr.status}`);
                  if (resultr.status === "SUCCESS") {
                    const requestOptionsAdd = {
                      method: "GET",
                      headers: miHeaders,
                    };
                    fetch(
                      `${process.env.REACT_APP_LOUGA_URL}/bills/addDocument/${billId}/${billsKey}`,
                      requestOptionsAdd
                    )
                      .then(async (res) => {
                        const aToken = res.headers.get("token-1");
                        localStorage.setItem("rexxdex", aToken);
                        return res.json();
                      })
                      .then((resultrp) => {
                        console.log(`Result of Add Document ${resultrp.status}`);

                        if (resultrp.status === "SUCCESS") {
                          const requestOptionsMediaDel = {
                            method: "DELETE",
                            headers: miHeaders,
                          };
                          fetch(
                            `${process.env.REACT_APP_EKOATLANTIC_URL}/media/delete/${orgIdx}/${billDocOldId}`,
                            requestOptionsMediaDel
                          )
                            .then(async (res) => {
                              const aToken = res.headers.get("token-1");
                              localStorage.setItem("rexxdex", aToken);
                              return res.json();
                            })
                            .then((resultrDe) => {
                              showSwalNotification(resultrp.status, "success", resultrp.message);
                              console.log(resultrDe);
                            })
                            .catch((error) => {
                              console.log(`${error.status} : ${error.message}`);
                            });
                        }
                      })
                      .catch((error) => {
                        setOpened(false);
                        showSwalNotification(error.status, "error", error.message);
                      });
                  }
                })
                .catch((error) => {
                  console.log(`${error.status} : ${error.message}`);
                  setOpened(false);
                });
            }
          });
      }
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <MDBox pt={1} pb={1} px={2}>
            <MDBox
              variant="gradient"
              // bgColor="info"
              borderRadius="lg"
              style={{ backgroundColor: "#f96d02" }}
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Upload Signed Document
              </MDTypography>
            </MDBox>
            <MDBox
              mt={2}
              mb={2}
              sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <MDTypography variant="gradient" fontSize="60%" color="white" id="document">
                {" "}
              </MDTypography>
            </MDBox>
          </MDBox>
          <div className="col-sm-6">
            {/* <input type="file" ref={ref} /> */}
            <MDInput type="file" files={files} onChange={(e) => setFiles(e.target.files)} />
            <p id="imageVal" style={{ color: "red", fontSize: 13 }}>
              <i> </i>
            </p>
          </div>
          <MDBox mt={4} mb={1}>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                onClick={handleImageUpload}
                //   color="info"
                style={Styles.buttonSx}
                width="50%"
                align="left"
              >
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>

      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
        <CircularProgress color="info" />
      </Backdrop>
    </div>
  );
};

export default AttachSignedDoc;
