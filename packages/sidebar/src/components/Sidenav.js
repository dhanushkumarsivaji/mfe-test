import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from '@mui/material/styles';
const LINKS = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
  },
  {
    path: "/pricing",
    name: "Pricing",
  },
  {
    path: "/auth/signin",
    name: "Signin",
  },
  {
    path: "/auth/signup",
    name: "Signup",
  },
  {
    path: "/dodge/table",
    name: "Table",
  },
  {
    path: "/dodge/edit",
    name: "Edit",
  },
];

 

const SidebarContainer = styled('div')(() => ({

  margin: '0',
  padding: 0,
  height: '100vh',
  backgroundColor: '#f1f1f1',
}));

const StyledNavLink = styled('span')(() => ({
  '& a': {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 900,
    letterSpacing: '0.02em',
    marginRight: '20px',
    textDecoration: 'none',
    color: 'black',
    border: '1px solid white',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    // '&.active': {
    //   backgroundColor: 'black',
    //   color:'white'
    // },
    ':hover': {
      backgroundColor: 'black',
      color:'white'
    },
    '@media (max-width: 481px)': {
      display: 'none'
    }
  }
}));


export default function LinkDemo() {
  return (
    <SidebarContainer sx={{ typography: "body1" }}>
      {LINKS.map((link, index) => (
        <StyledNavLink>
            <NavLink key={index} to={link.path}>{link.name}</NavLink>
        </StyledNavLink>
      ))}
    </SidebarContainer>
  );
}
