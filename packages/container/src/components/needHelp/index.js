import React from "react";
import { styled } from "@mui/material/styles";
import Typography, { typographyClasses } from "@mui/material/Typography";
import Link from "@mui/material/Link";


const Container = styled("div")(() => ({
  backgroundColor: "#EDEDED"
}));

const NeedHelpContainer = styled("div")(() => ({
  padding: "60px 0px 80px 0px",
  maxWidth: "1440px",
  margin: "auto",
  "@media (max-width: 1438px)": {
    margin: "0 16px",
  },
}));

const NeedHelpSectionContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

const SupportLinksContainer = styled("div")(() => ({
  minWidth: "320px",
}));

const SupportLinksItemsContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

const SupportLinksItemSectionContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}));

const StyledTypographyHeader = styled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    fontSize: "26px",
    fontWeight: "600px",
    marginBottom: "16px",
  },
}));

const StyledLink = styled(Link)(() => ({
  fontSize: "16px",
  fontWeight: "400px",
  lineHeight: "16px",
  color: "#3A547C",
  marginBottom: "6px",
}));

const NeedHelp = () => {
  return (
    <Container> 
    <NeedHelpContainer>
      <NeedHelpSectionContainer>
        <Typography variant="h4" sx={{ fontSize: "26px", fontWeight: "600px" }}>
          Need help?
        </Typography>

        <div>
          <StyledTypographyHeader variant="h5">Call</StyledTypographyHeader>
          <Typography
            variant="body1"
            sx={{ fontSize: "16px", fontWeight: "bold" }}
          >
            800-621-3979
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "16px" }}>
            M–F, 8 a.m. – 7:30 p.m., ET
          </Typography>
        </div>

        <SupportLinksContainer>
          <StyledTypographyHeader variant="h5">
            Support Links
          </StyledTypographyHeader>

          <SupportLinksItemsContainer>
            <SupportLinksItemSectionContainer>
              <StyledLink href="#">FAQ List</StyledLink>
              <StyledLink href="#">Keyboard Mapping</StyledLink>
            </SupportLinksItemSectionContainer>
            <SupportLinksItemSectionContainer>
              <StyledLink href="#">Tips</StyledLink>
              <StyledLink href="#">Support Link Sample</StyledLink>
            </SupportLinksItemSectionContainer>
          </SupportLinksItemsContainer>
        </SupportLinksContainer>
      </NeedHelpSectionContainer>
    </NeedHelpContainer>
    </Container>
  );
};

export default NeedHelp;
