import React from "react";
import { IconButton, DialogTitle as DialogTitleLayout } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function DialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitleLayout sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitleLayout>
  );
}
