import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const SubCardContainer = styled(Card)(() => ({
  padding: "20px 22px",
  margin: "16px 0px",
  backgroundColor: "rgba(245, 245, 250, 0.4)",
  borderRadius: "12px",
  boxShadow: "none",
}));

const SubCardHeaderContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

const SubCardHeaderCTAContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
}));

const SubCardDottedIcon = styled("div")(() => ({
  width: "8px",
  height: "8px",
  borderRadius: "50px",
  backgroundColor: "#5E81F4",
}));

const SubCard = () => {
  return (
    <SubCardContainer>
      <SubCardHeaderContainer>
        <SubCardHeaderCTAContainer>
          <SubCardDottedIcon></SubCardDottedIcon>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 700,
              color: "#5E81F4",
              lineHeight: "18px",
              marginLeft: "5px",
            }}
          >
            Today
          </Typography>
        </SubCardHeaderCTAContainer>
        <IconButton
          aria-label="more"
          id="long-button"
          sx={{ transform: "rotate(90deg)" }}
        >
          <MoreVertIcon />
        </IconButton>
      </SubCardHeaderContainer>
      <div>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 700,
            color: "#1C1D21",
            lineHeight: "24px",
          }}
        >
          {" "}
          Update company ranking
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 400,
            color: "#8181A5",
            lineHeight: "20px",
          }}
        >
          {" "}
          Description here
        </Typography>
      </div>
    </SubCardContainer>
  );
};

export default SubCard;
