import * as React from "react";
import Button from "./Button";
import Popover from "@mui/material/Popover";
import ExportForm from "./ExportForm";

export default function PopOverComponent({
  anchorEl,
  handleExportPopOverOpen,
  handleExportPopOverClose,
  ...rest
}) {
  const id = anchorEl ? "export-popover" : undefined;
  const open = Boolean(anchorEl);
  return (
    <div>
      <Button
        bgcolor="#7D594C"
        variant="outlined"
        aria-describedby={id}
        onClick={handleExportPopOverOpen}
      >
        Export
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleExportPopOverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          "& .container-app-MuiPaper-root": {
            backgroundColor: "#EDEDED",
          },
        }}
      >
        <ExportForm
          handleExportPopOverClose={handleExportPopOverClose}
          {...rest}
        />
      </Popover>
    </div>
  );
}
