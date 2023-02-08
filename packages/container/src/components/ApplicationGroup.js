import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { styled } from "@mui/material/styles";
import ExpandLess from "../assets/expandLess";

const ApplicationGroupContainer = styled("div")(() => ({
  backgroundColor: "#EDEDED",
  padding: "26px 18px",
  margin: '26px 70px 38px 70px'
}));

const ApplicationGroupHeaderIcon = styled("div")(() => ({
  width: "70px",
  height: "8px",
  backgroundColor: "#80A2C4",
  marginBottom: "26px",
}));

export default function ApplicationGroups() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const data = [
    {
      title: "Client Reporting",
      totalItems: 9,
      desc: "Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.",
    },
    {
      title: "Fixed Income Reporting",
      totalItems: 6,
      desc: "Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet.",
    },
    {
      title: "Holdings",
      totalItems: 65,
      desc: "Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.",
    },
    {
      title: "Research",
      totalItems: 6,
      desc: "Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.",
    },
    {
      title: "Securities",
      totalItems: 2,
      desc: "Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.",
    },
  ];

  return (
    <ApplicationGroupContainer>
      <ApplicationGroupHeaderIcon></ApplicationGroupHeaderIcon>
      <Typography
        variant="h1"
        sx={{
          fontSize: "30px",
          fontWeight: 600,
          color: "#222226",
          marginBottom: "28px",
          fontFamily: "Arial",
        }}
      >
        {" "}
        Application Groups
      </Typography>

      {data.map((val, index) => (
        <Accordion
          disableGutters={true}
          square={true}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          key={index}
          sx={{ border: "0.5px solid #DAE3F2", boxShadow: "none" }}
        >
          <AccordionSummary
            expandIcon={<ExpandLess />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              sx={{
                // width: "50%",
                flexShrink: 0,
                color: "#474C59",
                fontWeight: 700,
                fontSize: "16px",
                fontFamily: "Arial",
              }}
            >
              {val.title} {`(${val.totalItems})`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ minHeight: "118px" }}>
            <Typography>{val.desc}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </ApplicationGroupContainer>
  );
}
