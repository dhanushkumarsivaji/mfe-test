import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const GreetingText = () => {
  return (
    <div style={{margin: '46px 0px 24px 0px'}}>
      <Typography
        variant="h1"
        sx={{
          fontSize: "30px",
          fontWeight: 600,
          color: "#222226",
          fontFamily: "Arial",
          lineHeight: '36px',
          marginBottom: '5px'
        }}
      >
        Welcome, Jane Smith
      </Typography>
      <Typography
      variant="body1"
      sx={{
        fontSize: "14px",
        fontWeight: 400,
        color: "#000000",
        fontFamily: "Arial",
        lineHeight:'21px'
      }}
    >
      {" "}
      Your currently have access to the Analyst applications below. Need help? Request support.
    </Typography>
    </div>
  );
};

export default GreetingText;
