/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
import React, { useState } from "react";
import Papa from "papaparse";
import Accordion from "react-bootstrap/Accordion";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";
// import Select from "react-select";
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PHeaders from "postHeader";
// import GHeaders from "getHeader";
import MDTypography from "components/MDTypography";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import exampleImg from "./exampleImg.jpeg";
import "../Force.css";

function AppCsv() {
  const { allPHeaders: myHeaders } = PHeaders();
  // const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [file, setFile] = useState([]);
  const [checkedFile, setCheckedFile] = useState("");

  const [opened, setOpened] = useState(false);

  const consu = () => {
    MySwal.fire({
      title: "INVALID_CSV_DATA",
      type: "error",
      text: "Please Read The Instructions and input the valid format(input the first line/row names correctly and remove unwanted spaces)",
    });
    setCheckedFile(false);
  };

  const changeHandler = (event) => {
    setOpened(true);
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      // eslint-disable-next-line func-names, object-shorthand
      complete: function (results) {
        setFile(results.data);
        console.log(results);
        console.log(results.data);
        const waddup = results.data;

        const data11 = JSON.parse(localStorage.getItem("user1"));

        const orgIDs = data11.orgID;
        const newResult = [];
        // eslint-disable-next-line array-callback-return, consistent-return
        waddup.map((item) => {
          if (
            item.Question === undefined
            // ||
            // item.Hint === undefined ||
            // item.OptionA === undefined ||
            // item.OptionB === undefined ||
            // item.OptionC === undefined ||
            // item.OptionD === undefined ||
            // item.OptionE === undefined
          ) {
            return consu();
          }
          console.log(item.OptionA);
          if (
            item.OptionA === "" &&
            item.OptionB === "" &&
            item.OptionC === "" &&
            item.OptionD === "" &&
            item.OptionE === ""
          ) {
            const timidMan = {
              question: {
                orgID: orgIDs,
                question: item.Question,
                hint: item.Hint,
                inputType: "Text",
              },
            };

            newResult.push(timidMan);
          } else {
            const allOptionShit = [];
            if (item.OptionA) {
              if (item.OptionA !== "") {
                const optionShit = {
                  orgID: orgIDs,
                  optionValue: item.OptionA,
                };
                allOptionShit.push(optionShit);
              }
            }
            if (item.OptionB) {
              if (item.OptionB !== "") {
                const optionShit = {
                  orgID: orgIDs,
                  optionValue: item.OptionB,
                };
                allOptionShit.push(optionShit);
              }
            }
            if (item.OptionC) {
              if (item.OptionC !== "") {
                const optionShit = {
                  orgID: orgIDs,
                  optionValue: item.OptionC,
                };
                allOptionShit.push(optionShit);
              }
            }
            if (item.OptionD) {
              if (item.OptionD !== "") {
                const optionShit = {
                  orgID: orgIDs,
                  optionValue: item.OptionD,
                };
                allOptionShit.push(optionShit);
              }
            }
            if (item.OptionE) {
              if (item.OptionE !== "") {
                const optionShit = {
                  orgID: orgIDs,
                  optionValue: item.OptionE,
                };
                allOptionShit.push(optionShit);
              }
            }
            const timidMan = {
              question: {
                orgID: orgIDs,
                question: item.Question,
                hint: item.Hint,
                inputType: "Option",
              },
              options: allOptionShit,
            };

            newResult.push(timidMan);
          }
        });
        console.log(newResult);
        const why = JSON.stringify(newResult);
        setFile(why);
        setCheckedFile(true);
        setOpened(false);
      },
    });
  };
  // const changeHandler = (event) => {
  //   // Passing file data (event.target.files[0]) to parse using Papa.parse
  //   Papa.parse(event.target.files[0], {
  //     header: true,
  //     skipEmptyLines: true,
  //     complete(results) {
  //       const data11 = JSON.parse(localStorage.getItem("user1"));
  //       const orgIDs = data11.orgID;
  //       const personalIDs = data11.personalID;
  //       const dutyx = Number(duty);
  //       const obj = results.data;
  //       console.log(obj);
  //       const objx = obj.map(
  //         ({
  //           fname,
  //           lname,
  //           oname,
  //           title,
  //           street,
  //           city,
  //           state,
  //           country,
  //           email,
  //           pno,
  //           dayOfBirth,
  //           monthOfBirth,
  //           yearOfBirth,
  //           twitter,
  //           facebook,
  //           linkedIn,
  //           instagram,
  //           portfolio,
  //           website,
  //           occupation,
  //           maritalStatus,
  //           // eslint-disable-next-line arrow-body-style
  //         }) => {
  //           return {
  //             fname,
  //             lname,
  //             oname,
  //             title,
  //             street,
  //             city,
  //             state,
  //             country,
  //             email,
  //             dayOfBirth: Number(dayOfBirth),
  //             monthOfBirth: Number(monthOfBirth),
  //             yearOfBirth: Number(yearOfBirth),
  //             twitter,
  //             facebook,
  //             linkedIn,
  //             instagram,
  //             portfolio,
  //             website,
  //             occupation,
  //             maritalStatus,
  //             // eslint-disable-next-line no-eval
  //             pno: `${Number(pno)}` ? `${Number(pno)}` : "invalid",
  //           };
  //         }
  //       );
  //       console.log(objx);
  //       // const obj = mapped.map((element) => ({
  //       //   ...element,
  //       //   orgID: `${orgIDs}`,
  //       //   corporateID: corp,
  //       //   accountOwnerID: personalIDs,
  //       //   createdBy: dutyx,
  //       // }));
  //       // function convertIntObj(objx) {
  //       //   const res = [];
  //       //   for (const key in objx) {
  //       //     res[key] = {};
  //       //     for (const prop in objx[key]) {
  //       //       const parsed = parseInt(objx[key][prop], 10);
  //       //       // eslint-disable-next-line no-restricted-globals
  //       //       res[key][prop] = isNaN(parsed) ? objx[key][prop] : parsed;
  //       //     }
  //       //   }
  //       //   return res;
  //       // }

  //       objx.forEach((element) => {
  //         element.orgID = orgIDs;
  //         element.corporateID = corp;
  //         element.createdBy = dutyx;
  //         element.accountOwnerID = personalIDs;
  //       });
  //       const objc = objx.map(
  //         ({
  //           orgID,
  //           corporateID,
  //           createdBy,
  //           accountOwnerID,
  //           fname,
  //           lname,
  //           oname,
  //           title,
  //           street,
  //           city,
  //           state,
  //           country,
  //           email,
  //           pno,
  //           dayOfBirth,
  //           monthOfBirth,
  //           yearOfBirth,
  //           twitter,
  //           facebook,
  //           linkedIn,
  //           instagram,
  //           portfolio,
  //           website,
  //           occupation,
  //           maritalStatus,
  //           // eslint-disable-next-line arrow-body-style
  //         }) => {
  //           return {
  //             fname,
  //             lname,
  //             oname,
  //             title,
  //             street,
  //             city,
  //             state,
  //             pno: String(pno),
  //             country,
  //             email,
  //             dayOfBirth,
  //             monthOfBirth,
  //             yearOfBirth,
  //             twitter,
  //             facebook,
  //             linkedIn,
  //             instagram,
  //             portfolio,
  //             website,
  //             occupation,
  //             maritalStatus,
  //             orgID,
  //             corporateID,
  //             createdBy,
  //             accountOwnerID,
  //           };
  //         }
  //       );
  //       console.log(objx);
  //       const why = JSON.stringify(objc);
  //       console.log(why);
  //       setFile(why);
  //       // const wow = JSON.stringify(resultx);
  //       // console.log(wow);

  //       // console.log("Object result", result);

  //       // const x = results.data;
  //       // const y = x.forEach((element) => {
  //       //   // eslint-disable-next-line no-param-reassign
  //       //   element.b = "qux";
  //       // });
  //       // console.log(y);
  //       // const p = JSON.stringify(results.data);
  //       // console.log(p);
  //     },
  //   });
  // };
  // const handleChanges = (selectedOption) => {
  //   // this.setState({ selectedOption });
  //   setCorp(selectedOption.value);
  //   console.log(corp);
  //   console.log(`Option selected:`, selectedOption);
  // };

  const handleUpload = () => {
    // [
    //   {
    //     "question": {
    //       "id": "string",
    //       "orgID": "string",
    //       "question": "string",
    //       "createdTime": 0,
    //       "hint": "string",
    //       "inputType": "string",
    //       "deleteFlag": 0
    //     },
    //     "options": [
    //       {
    //         "id": "string",
    //         "orgID": "string",
    //         "questionID": "string",
    //         "optionValue": "string"
    //       }
    //     ]
    //   }
    // ]

    setOpened(true);
    const raw = file;
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    fetch(`${process.env.REACT_APP_SHASHA_URL}/appraisalQuestion/addMultiple`, requestOptions)
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
  const handleValidate = (e) => {
    if (checkedFile) {
      handleUpload(e);
    } else {
      consu();
    }
  };

  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Add Multiple Appraisal Questions (CSV files only)</Accordion.Header>
          <Accordion.Body>
            <Paper elevation={3}>
              <MDBox textAlign="center" mt={3}>
                <u>Before Proceeding Read carefully:</u>
                <MDBox p={3} mt={2}>
                  <MDTypography
                    variant="h4"
                    fontWeight="regular"
                    fontSize="75%"
                    textAlign="center"
                    color="text"
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;The first line/row in your csv file must be exactly the
                    same as the words in the image below in row 1 A - G (should be camelCase when
                    necessary and no space between letters so that each row can be identified. The
                    first row order does not matter, in essence, you may have question hint or
                    optionA at any position you want) and your further details in each row should be
                    corresponding to the content of the first row (i.e under &apos;question&apos;
                    you should have Questions e.t.c... <br /> please open image in new tab to zoom
                    in for a clearer view). For questions with options fill the options but for
                    questions that require writing answers just leave the options blank
                  </MDTypography>
                </MDBox>
                <img className="img" src={exampleImg} alt="example" />
                <br />
                <MDBox textAlign="center" p={5}>
                  <MDTypography
                    variant="h4"
                    fontWeight="regular"
                    fontSize="75%"
                    textAlign="center"
                    color="text"
                  >
                    <input
                      type="file"
                      name="file"
                      accept=".csv"
                      onChange={changeHandler}
                      style={{ display: "block", margin: "10px auto" }}
                    />
                  </MDTypography>
                </MDBox>
                <Button onClick={handleValidate} variant="success">
                  Upload
                </Button>
              </MDBox>
              <br />
              <br />
            </Paper>
          </Accordion.Body>
        </Accordion.Item>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
          <CircularProgress color="info" />
        </Backdrop>
      </Accordion>
    </div>
  );
}

export default AppCsv;
