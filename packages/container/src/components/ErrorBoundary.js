import React from 'react';
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ErrorBoundaryContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 100px 0px;

  & h1,
  h3,
  h4 {
    padding: 10px 0px;
  }
`;

function ErrorBoundary() {


  const onClick = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div>
      <ErrorBoundaryContainer>
        <Typography variant="h6" sx={{fontWeight:'700'}}>Something went wrong</Typography>
      {  /* <Typography variant="h6">
          Please refresh the screen by clicking the retry button below or close
          the browser and try again after sometime
  </Typography> */ }
        <Button
          sx={{ margin: "16px 0px" }}
          variant="contained"
          onClick={onClick}
        >
          Retry
        </Button>
      </ErrorBoundaryContainer>
    </div>
  );
}

export default ErrorBoundary;
