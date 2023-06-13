/* eslint-disable no-plusplus */
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
// import StepContent from "@mui/material/StepContent";
// import Typography from "@mui/material/Typography";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import GHeaders from "getHeader";
import { useNavigate } from "react-router-dom";

const stepStyle = {
  boxShadow: 2,
  background: "rgba(0,0,0,0.4)",
  padding: 2,
  "& .Mui-active": {
    "&.MuiStepIcon-root": { color: "warning.main", fontSize: "5rem" },
    "& .MuiStepConnector-line": { borderColor: "warning.main" },
  },
  "& .Mui-completed": {
    "&.MuiStepIcon-root": { color: "secondary.main", fontSize: "2rem" },
    "& .MuiStepConnector-line": { borderColor: "secondary.main" },
  },
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "#ffffff",
  border: "3px solid #5F9DF7",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  overflow: "auto",
  height: "55%",
  display: "flex",
  "&::-webkit-scrollbar": {
    width: 20,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "white",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
};

// eslint-disable-next-line react/prop-types
export default function BillJourney({ id }) {
  const [billJourney, setBillJourney] = useState([]);
  const [opened, setOpened] = useState(false);
  const { allGHeaders: miHeaders } = GHeaders();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);

  //  Method to change date from timestamp
  function formatTimestamp(timestamp) {
    console.log(timestamp);
    const date = new Date(timestamp);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(date)) {
      return "Invalid Date";
    }

    const hour = date.getHours();
    const minute = date.getMinutes();
    const amOrPm = hour >= 12 ? "PM" : "AM";
    const formattedHour = (hour % 12 || 12).toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);

    return `${formattedHour}:${formattedMinute} ${amOrPm}, ${formattedDate}`;
  }

  useEffect(() => {
    setOpened(true);
    const headers = miHeaders;
    let isMounted = true;
    fetch(`${process.env.REACT_APP_LOUGA_URL}/billsJourney/gets/${id}`, { headers })
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
        if (isMounted) {
          console.log(result);
          // Adding the action that occured on that Bill Journey

          const billArrangement = [];

          if (result.length > 1) {
            const createdByUser = {
              id: result[0].id,
              text: `This Bill was created by ${result[0].actionByName} at ${formatTimestamp(
                result[0].actionTime
              )}`,
            };
            billArrangement.push(createdByUser);

            for (let i = 1; i < result.length; i++) {
              const forwardedActions = result[i];
              const forwardedByUsers = forwardedActions.map((action) => ({
                id: action.id,
                text: `Forwarded by ${action.actionByName} at ${formatTimestamp(
                  action.actionTime
                )}`,
              }));

              billArrangement.push({
                id: forwardedActions[0].id,
                text: `Forwarded to ${forwardedByUsers.map((user) => user.text).join(", ")}`,
              });
              billArrangement.push(...forwardedByUsers.slice(1));
            }
          } else {
            const createdByUser = {
              id: result[0].id,
              text: `This Bill was created by ${result[0].actionByName} at ${formatTimestamp(
                result[0].actionTime
              )}`,
            };
            billArrangement.push(createdByUser);
          }

          setBillJourney(billArrangement);
          console.log(billArrangement);

          setActiveStep(result.length);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <>
      <Box sx={modalStyle}>
        {/* <Box sx={{ width: "100%", height: "100%" }}>
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
                Bill Journey
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
          <Stepper activeStep={billJourney.length} alternativeLabel sx={stepStyle}>
            {billJourney.map((label) => (
              <Step key={label.id}>
                <StepLabel>{label.actions}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box> */}
        <Box sx={{ width: "100%" }}>
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
                Bill Journey
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
          <Stepper activeStep={activeStep} orientation="vertical" sx={stepStyle}>
            {billJourney.map((step) => (
              <Step key={step.id}>
                <StepLabel>{step.text}</StepLabel>
                {/* <StepContent>
                  <Typography>{step.description}</Typography>
                </StepContent> */}
              </Step>
            ))}
          </Stepper>
        </Box>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={opened}>
          <CircularProgress color="info" />
        </Backdrop>
      </Box>
    </>
  );
}
