import React from "react";
import { styled } from "@mui/material/styles";
import { Dialog } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "600px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function DialogBox({ children, open, handleClose }) {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      {children}
    </BootstrapDialog>
  );
}
