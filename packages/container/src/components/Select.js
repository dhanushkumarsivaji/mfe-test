import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { styled } from '@mui/system';
import { isEmpty } from 'lodash';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledSelectBox = styled(Select)({
	borderRadius: '0px',
	background: '#fff',
    '& .MuiSelect-select': {
        padding: '12px 14px'
    }
});

function SelectBoxComponent(props) {
    const {
        data,
        id,
        label,
		error,
		errors
    } = props

	function renderErrorMessage(errors){
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
				{data.map((option) => (
					<MenuItem key={option.id} value={option.id}>
						{option.name}
					</MenuItem>
				))}
			</StyledSelectBox>
			{ !isEmpty(errors) ? <FormHelperText >{renderErrorMessage(errors)}</FormHelperText> : null}
		</FormControl>
	);
}

export default SelectBoxComponent;