import React from 'react';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';

export default function LinkDemo() {
  return (
    <Box sx={{ typography: 'body1' }}>
      <Link to="/">Home</Link>
      <Link to="/pricing">Pricing</Link>
      <Link to="/auth/signin">SignIn</Link>
      <Link to="/auth/signup">SignUp</Link>
      <Link to="/dodge/table">Table</Link>
      <Link to="/dodge/edit">Edit</Link>
    </Box>
  );
}