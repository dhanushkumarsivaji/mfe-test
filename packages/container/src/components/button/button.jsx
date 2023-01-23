import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function ButtonComponent({label,variant}) {
  return (
    <Stack spacing={2} direction="row">
      <Button variant={variant}>{label}</Button>
    </Stack>
  );
}

export default ButtonComponent