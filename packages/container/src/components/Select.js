import React from 'react';
import { Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { styled } from '@mui/system';
import { isEmpty } from 'lodash';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledSelectBox = styled(Select)({
	borderRadius: '0px',
	background: '#fff',
    '& .container-app-MuiOutlinedInput-input': {
        padding: '13px 14px'
    }
});

function SelectBoxComponent(props) {
    const {
        id,
        label,
		error,
		errors,
		children
    } = props

	function renderErrorMessage(errors){
		console.log(errors)
		switch (errors.type) {
			case 'required':
				return 'This field is required'
			default:
				break;
		}
	}
    
	return (
		<FormControl fullWidth error={error}>
			<InputLabel htmlFor={id}>{label}</InputLabel>
			<StyledSelectBox
				id={id}
                {...props}
				IconComponent={ExpandMoreIcon}
				
			>
				{children}
			</StyledSelectBox>
			{ !isEmpty(errors) ? <FormHelperText >{renderErrorMessage(errors)}</FormHelperText> : null}
		</FormControl>
	);
}

export default SelectBoxComponent;