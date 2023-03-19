import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const GreetingText = () => {
  return (
    <div style={{margin: '46px 0px 24px 0px'}}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 600,
          color: "#222226",
          lineHeight: '36px',
          marginBottom: '5px'
        }}
      >
        Welcome, Jane Smith, {process.env.REACT_APP_NAME}
      </Typography>
      <Typography
      variant="body1"
      sx={{
        fontWeight: 400,
        color: "#000000",
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
