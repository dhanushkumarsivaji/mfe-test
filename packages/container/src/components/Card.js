import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import SubCard from "./SubCard";

const ApplicationGroupContainer = styled(Card)(() => ({
  backgroundColor: "#DAE3F2",
  padding: "26px 18px",
  margin: "26px 0px 38px 0px",
  boxShadow: "none",
}));

const ApplicationGroupHeaderIcon = styled("div")(() => ({
  width: "70px",
  height: "8px",
  backgroundColor: "#80A2C4",
  marginBottom: "26px",
}));

const CardComponent = ({ data }) => {
  return (
    <ApplicationGroupContainer>
      <ApplicationGroupHeaderIcon />
      <Typography
        variant="h1"
        sx={{
          fontSize: "30px",
          fontWeight: 600,
          color: "#222226",
          marginBottom: "16px",
          fontFamily: "Arial",
        }}
      >
        {" "}
        {data.header}
      </Typography>
      <div>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#1C1D21",
            lineHeight: "24px",
          }}
        >
          {" "}
          {data.desc}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#8181A5",
            lineHeight: "20px",
          }}
        >
          {" "}
          {data.subDesc}
        </Typography>
      </div>
      <div>
        <div style={{ maxHeight: "300px", overflow: "auto" }}>
          {data.events.map((_, i) => (
            <div key={i}>
              <SubCard />
            </div>
          ))}
        </div>
      </div>
    </ApplicationGroupContainer>
  );
};

export default CardComponent;
