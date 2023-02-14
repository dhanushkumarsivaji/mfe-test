import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
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
        label
    } = props
    
	return (
		<FormControl fullWidth>
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
		</FormControl>
	);
}

export default SelectBoxComponent;