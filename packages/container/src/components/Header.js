import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

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
            Micro App
          </Typography>
          <Button
            color="primary"
            variant="outlined"
            component={RouterLink}
            to={isSignedIn ? "/" : "/auth/signin"}
            onClick={onClick}
          >
            {isSignedIn ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
