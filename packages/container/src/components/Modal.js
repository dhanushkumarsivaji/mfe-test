import * as React from "react";
import PropTypes from "prop-types";
// import Button from "@mui/material/Button";
import Button from "./Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ModalForm from "./Form";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .container-app-MuiDialogContent-root": {
    padding: "20px 18px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .container-app-MuiPaper-root": {
    minWidth: "500px",
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2, fontSize: "30px", fontWeight: 600 }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            // color: (theme) => theme.palette.grey[500],
            color: "#3A547C",
          }}
        >
          <CloseIcon
            sx={{ width: "34px !important", height: "34px !important" }}
          />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ModalComponent({
  open,
  handleExportModalOpen,
  handleExportModalClose,
  ...rest
}) {
  return (
    <div>
      <Button
        bgcolor="#7D594C"
        variant="outlined"
        onClick={handleExportModalOpen}
        sx={{ marginBottom: "30px" }}
      >
        Export
      </Button>
      <BootstrapDialog
        onClose={handleExportModalClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleExportModalClose}
        >
          Export
        </BootstrapDialogTitle>
        <ModalForm
          handleExportModalClose={handleExportModalClose}
          {...rest}
        />
      </BootstrapDialog>
    </div>
  );
}
