import React from "react";
import { TextField, FormControl, InputLabel } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  background: "#fff",
  borderRadius: 0,
  height: "44px",
  "div:first-of-type": {
    borderRadius: 0,
    height: "44px",
  },
});

const InputComponent = (props) => {

    const { label, id } = props
  return (
    <React.Fragment>
      <FormControl fullWidth>
        <InputLabel htmlFor={id} sx={{display: 'none'}}>{label}</InputLabel>
        <StyledTextField
          id={id}
          {...props}
        />
      </FormControl>
    </React.Fragment>
  );
};
export default InputComponent;
