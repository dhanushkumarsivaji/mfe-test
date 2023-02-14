import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ bgcolor }) => ({
	backgroundColor: bgcolor ? bgcolor : '',
	color: bgcolor ? '#FFFFFF' : '#000000',
	height: '44px',
	borderRadius: 2,
	fontSize: '16px',
	fontWeight: 600,
	textTransform: 'none',
	'&:disabled': { color: '#C2C6C9', border: '2px solid #C2C6C9' },
	'&:hover': { backgroundColor: bgcolor ? bgcolor : '#fff' },
}));

export default function ButtonComponent(props) {

    const {
        variant="contained",
        children,
        bgcolor
    } = props;


	return (
		<StyledButton
			variant={variant}
            bgcolor={bgcolor}
            {...props}
		>
            {children}
		</StyledButton>
	);
}
