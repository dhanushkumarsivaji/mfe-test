import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

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
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { loginRequest } from '../authConfig';

const ContentContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "24px 0",
  maxWidth: "1440px",
  margin: "auto",
  "@media (max-width: 1438px)": {
    margin: "0 16px",
  },
}));

const LogoContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  "& img": {
    maxWidth: "240px",
    maxHeight: "80px",
  },
}));

const IconsContainer = styled("div")(() => ({
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
    "& svg": {
      width: "24px",
      height: "24px",
      marginBottom: "14px",
    },
    "&.active": {
      "&::before": {
        content: '""',
        position: "absolute",
        height: "5px",
        left: 0,
        bottom: 0,
        width: "100%",
        backgroundColor: "#80A2C4",
      },
    },
  },
}));

export default function Header({ isSignedIn, onSignOut }) {
  const { instance } = useMsal();

  const isAuthenticated = useIsAuthenticated();

  const [activeIndex, setActiveIndex] = useState(
    localStorage?.activeIndex ? Number(localStorage?.activeIndex) : 0
  );

  const handleClick = (index) => {
    localStorage.setItem("activeIndex", index);
    setActiveIndex(index);
  };

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log("check", e);
    });
  };

  const handleLogout = () => {
    instance.logoutRedirect().catch((e) => {
      console.log("check", e);
    });
  };

  const iconsList = [
    {
      component: <HomeSVG />,
      link: "/home",
    },
    {
      component: <ListSVG />,
      link: "/list",
    },
    {
      component: <CalenderSVG />,
      link: "/calender",
    },
    {
      component: <BookmarkSVG />,
      link: "/bookmark",
    },
    {
      component: <FolderSVG />,
      link: "/folder",
    },
    {
      component: <KeyboardSVG />,
      link: "/keyboard",
    },
    {
      component: <QuestionSVG />,
      link: "/question",
    },
    {
      component: <SearchSVG />,
      link: "/search",
    },
  ];

  return (
    <React.Fragment>
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: "common.white" }}
      >
        <div>
          <ContentContainer>
            <LogoContainer>
              <img
                src={Logo}
                style={{}}
                alt="Dodge & Cox"
                data-testid="brand-logo"
              />
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  margin: "0",
                  color: "black",
                  fontSize: '12px'
                }}
              >
                Enterprise Workstation STG 3.5.0.3
              </Typography>
            </LogoContainer>

            <IconsContainer>
              {iconsList.map((icon, index) => (
                <span
                  key={index}
                  className={index === activeIndex ? "active" : ""}
                  onClick={() => handleClick(index)}
                >
                  {icon.component}
                </span>
              ))}
              <span
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  color: "rgb(58, 84, 124)",
                  cursor: "pointer",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!isAuthenticated ? (
                  <Tooltip title="Log In" arrow>
                    <IconButton onClick={() => handleLogin()} disableFocusRipple disableRipple sx={{color: 'rgb(58, 84, 124)'}}>
                      <LoginIcon
                        sx={{
                          width: "24px",
                          height: "24px",
                          marginBottom: "14px",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Log Out" arrow>
                    <IconButton  disableFocusRipple disableRipple sx={{color: 'rgb(58, 84, 124)'}} onClick={() => handleLogout()}>
                      <LogoutIcon
                        sx={{
                          width: "24px",
                          height: "24px",
                          marginBottom: "14px",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                )}
              </span>
            </IconsContainer>
          </ContentContainer>
        </div>
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
