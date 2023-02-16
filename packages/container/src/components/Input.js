import React from "react";
import { TextField, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { styled } from "@mui/system";
import { isEmpty } from 'lodash';

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

    const { label, id, errors, error } = props

    function renderErrorMessage(errors){
      console.log(errors)
      switch (errors.type) {
        case 'required':
          return 'This field is required'
        case 'minLength':
           return 'Please type more than 2 characters'
        case 'maxLength':
           return 'Please type not more than 24 characters'
        default:
          break;
      }
    }
      
  return (
    <React.Fragment>
      <FormControl fullWidth>
        <InputLabel htmlFor={id} sx={{display: 'none'}}>{label}</InputLabel>
        <StyledTextField
          id={id}
          {...props}
        />
        { !isEmpty(errors) ? <FormHelperText sx={{color: error ? '#d32f2f' : ''}}>{renderErrorMessage(errors)}</FormHelperText> : null}
      </FormControl>
    </React.Fragment>
  );
};
export default InputComponent;
