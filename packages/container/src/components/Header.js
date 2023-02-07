import React, { useState} from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Logo from "../assets/logo.png";
import BookmarkSVG from "../assets/bookmark";
import CalenderSVG from "../assets/calender";
import FolderSVG from "../assets/folder";
import HomeSVG from "../assets/home";
import KeyboardSVG from "../assets/keyboard";
import ListSVG from "../assets/list";
import QuestionSVG from "../assets/question";
import SearchSVG from "../assets/search";

const Icons = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "& span": {
    marginLeft: "10px",
    marginRight: "10px",
    color: "red",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // paddingBottom:'1em',
    "& svg": {
      width: "24px",
      height: "24px",
      marginBottom: '14px'
    },
    "&.active": {
      '&::before': {
        content: '""',
        position: 'absolute',
        height: '5px',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: '#80A2C4',
      }
    },
  },
}));

export default function Header({ isSignedIn, onSignOut }) {

  const [ activeIndex, setActiveIndex ] = useState(localStorage?.activeIndex ? Number(localStorage?.activeIndex) : 0 )


  const handleClick = (index) => {
      localStorage.setItem('activeIndex' , index)
      setActiveIndex(index)
  }
  const onClick = () => {
    if (isSignedIn && onSignOut) {
      onSignOut();
    }
  };

  const IconsList = [
    {
      component: <HomeSVG />,
      link: '/home'
    },
    {
      component: <ListSVG />,
      link: '/list'
    },
    {
      component: <CalenderSVG />,
      link: '/calender'
    },
    {
      component: <BookmarkSVG />,
      link: '/bookmark'
    },
    {
      component: <FolderSVG />,
      link: '/folder'
    },
    {
      component: <KeyboardSVG />,
      link: '/keyboard'
    },
    {
      component: <QuestionSVG />,
      link: '/question'
    },
    {
      component: <SearchSVG />,
      link: '/search'
    },
  ];

  return (
    <React.Fragment>
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: "common.white" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "80px",
          }}
        >
          <div style={{display:'flex', flexDirection:'column'}}>
            <img
              src={Logo}
              style={{ maxWidth: "240px", maxHeight: "80px" }}
              alt="Dodge & Cox"
              data-testid="brand-logo"
            />
            <span style={{display:'flex', justifyContent:'end', fontSize:'12px', margin: '0', color:'black'}}>Enterprise Workstation STG 3.5.0.3</span>
          </div>


          <Icons>
            {IconsList.map((icon, index) => (
              <span key={index} className={index === activeIndex ? "active" : ""} onClick={() => handleClick(index)}>
                {icon.component}
              </span>
            ))}
          </Icons>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

// <Button
// color="primary"
// variant="outlined"
// component={RouterLink}
// to={isSignedIn ? "/" : "/auth/signin"}
// onClick={onClick}
// >
// {isSignedIn ? "Sign Out" : "Sign In"}
// </Button>