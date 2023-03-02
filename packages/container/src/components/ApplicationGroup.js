import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ExpandLess from "../assets/expandLess";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

const ApplicationGroupContainer = styled("div")(() => ({
  backgroundColor: "#EDEDED",
  padding: "26px 18px",
  margin: "26px 0px 38px 0px",
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
      links: [],
    },
    {
      title: "Fixed Income Reporting",
      links: []
    },
    {
      title: "Holdings",
      links: [
        {
          name: "By Account",
          link: "holdings-by-account",
        }
      ],
    },
    {
      title: "Research",
      links: [],
    },
    {
      title: "Securities",
      links: [],
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
              {val.title} {`(${val?.links?.length})`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ minHeight: "118px" }}>
            <div>
              {val?.links?.map((d, i) => (
                  <Link component={RouterLink} to={d.link} sx={{margin: '0px 10px', fontSize:'16px', fontFamily:'Arial', color:'#3A547C', lineHeight:'24px', '&:first-of-type': {
                    marginLeft: '0'
                  }}}>
                    {d.name}
                  </Link>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </ApplicationGroupContainer>
  );
}
