// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// import GHeaders from "getHeader";
// import Backdrop from "@mui/material/Backdrop";

import React from "react";

// eslint-disable-next-line react/prop-types
const PDF = ({ namexxx }) => (
  <>
    {" "}
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <Card style={{ backgroundColor: "#C1224F", minHeight: "77vw" }}>
          <CardContent>
            <Typography
              style={{ color: "white", textAlign: "center", marginTop: "200px" }}
              variant="h1"
              component="div"
            >
              {namexxx}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </>
);

export default PDF;
