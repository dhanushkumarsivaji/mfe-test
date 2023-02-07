import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { styled } from '@mui/material/styles';
import BookmarkSVG from '../assets/bookmark'
import CalenderSVG from '../assets/calender'
import FolderSVG from '../assets/folder'
import HomeSVG from '../assets/home'
import KeyboardSVG from '../assets/keyboard'
import ListSVG from '../assets/list'
import QuestionSVG from '../assets/question'
import SearchSVG from '../assets/search'

const Icons = styled('div')(() => ({
      display: 'flex',
      alignItems: 'center',
      '& span':{
        width: '24px',
        height: '24px',
        marginLeft: '8px',
        marginRight: '8px',
        color: 'red',
        cursor: 'pointer',
        position: 'relative',

        // paddingBottom:'1em',
        '&.active': {
          '&::after': {

            content: '""',
            position: "absolute",
            display: 'block',
            height: '3px',
            backgroundColor: 'red'
          }
        }
      }
  })
);


export default function Header({ isSignedIn, onSignOut }) {
  const onClick = () => {
    if (isSignedIn && onSignOut) {
      onSignOut();
    }
  };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ display:'flex', justifyContent:'space-between' }}>
          <Typography
            variant="h5"
            color="inherit"
            noWrap
            component={RouterLink}
            to="/"
            sx={{textDecoration:'none', fontWeight: 700}}
          >
            Dodge & Cox
          </Typography>
          <Button
            color="primary"
            variant="outlined"
            component={RouterLink}
            to={isSignedIn ? "/" : "/auth/signin"}
            onClick={onClick}
          >
            {isSignedIn ? "Sign Out" : "Sign In"}
          </Button>
          <Icons>
            <HomeSVG />
            <ListSVG />
            <CalenderSVG />
            <BookmarkSVG />
            <FolderSVG />
            <KeyboardSVG />
            <QuestionSVG />
            <SearchSVG />
          </Icons>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
