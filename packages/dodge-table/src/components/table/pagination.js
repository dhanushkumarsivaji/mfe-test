import React from "react";
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { numberWithCommas } from './utils';



const StyledButton = styled(Button)(({ theme }) => ({
  width: '30px',
  height: '30px',
  border: 'none',
  padding: '5px',
  color: theme.palette.common.black
}));

const StyledButtonGroup = styled(ButtonGroup)(() => ({
  paddingLeft: '15px',
  '.MuiButtonGroup-grouped': {
    border: 'none !important'
  }
}));

const StyledTypography = styled(Typography)(() => ({
  paddingRight: 46
}));

function PaginationWithRowSelection({
  paginationProps: {
    totalCount,
    pageEntries,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage
  },
  table,
  options = [10, 25, 50, 2500, 5000]
}) {
  return (
    <>
      <StyledTypography variant="body1">Rows Per Page:</StyledTypography>
      <FormControl size="small" sx={{ paddingRight: '30px' }}>
        <InputLabel id="table-row-length-selection" sx={{ display: 'none' }}>
          Rows Per Page
        </InputLabel>
        <Select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          sx={{
            boxShadow: 'none',
            '.MuiOutlinedInput-notchedOutline': {
              border: 0,
              borderColor: 'transparent !important',
              borderWidth: 0
            }
          }}
        >
          {options.map((pageSize) => (
            <MenuItem key={pageSize} value={pageSize}>
              {pageSize}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <StyledTypography variant="body1">
        {' '}
        {pageEntries}
        <span>{numberWithCommas(totalCount)}</span>
      </StyledTypography>
      <StyledButtonGroup disableElevation variant="text">
        <StyledButton
          aria-label="pagination previous button"
          tabIndex={0}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <KeyboardDoubleArrowLeftIcon />
        </StyledButton>
        <StyledButton
          aria-label="pagination previous button"
          tabIndex={0}
          onClick={() => previousPage()}
          disabled={canPreviousPage}
        >
          <ChevronLeftIcon />
        </StyledButton>
        <StyledButton
          aria-label="pagination next button"
          tabIndex={0}
          onClick={() => nextPage()}
          disabled={canNextPage}
        >
          <ChevronRightIcon />
        </StyledButton>
        <StyledButton
          aria-label="pagination next button"
          tabIndex={0}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <KeyboardDoubleArrowRightIcon />
        </StyledButton>
      </StyledButtonGroup>
    </>
  );
}

export default PaginationWithRowSelection;
