import * as React from "react";
import PropTypes from "prop-types";
// import Button from "@mui/material/Button";
import Button from "./Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormGroup } from "@mui/material";
import SquareIcon from "@mui/icons-material/Square";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import SelectBoxComponent from "./Select";
import TextInputComponent from "./Input";

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
  handleExportFileFormat,
  setIncludeAllColumnsInExport,
  exportFormatsData,
  handleGridExport,
  exportFileName,
  exportFileFormat,
  handleExportFileName,
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
        <DialogContent>
          <Grid
            container
            margin="20px 0"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              lg={3}
              sx={{ justifyContent: "flex-end" }}
            >
              <Typography
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  fontWeight: 600,
                  "@media (max-width: 900px)": {
                    justifyContent: "start",
                  },
                }}
              >
                Format
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={9}
              lg={9}
              p={"0 20px"}
              sx={{
                "@media (max-width: 900px)": {
                  padding: 0,
                },
              }}
            >
              <SelectBoxComponent
                data={exportFormatsData}
                onChange={handleExportFileFormat}
                value={exportFileFormat}
                id={"export-file-format-input"}
                label={""}
              />
            </Grid>
          </Grid>
          <Grid
            container
            margin="20px 0"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              lg={3}
              sx={{ justifyContent: "flex-end" }}
            >
              <Typography
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  fontWeight: 600,
                  "@media (max-width: 900px)": {
                    justifyContent: "start",
                  },
                }}
              >
                Filename
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={9}
              lg={9}
              p={"0 20px"}
              sx={{
                "@media (max-width: 900px)": {
                  padding: 0,
                },
              }}
            >
              <TextInputComponent
                variant="outlined"
                value={exportFileName}
                onChange={handleExportFileName}
                id={"export-file-name-input"}
                label={""}
              />
            </Grid>
          </Grid>
          <Grid
            container
            margin={"20px 0"}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              lg={3}
              sx={{
                justifyContent: "flex-end",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  visibility: "hidden",
                  "@media (max-width: 900px)": {
                    justifyContent: "start",
                    display: "none",
                  },
                }}
              >
                Filename
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={9}
              lg={9}
              pl={"20px"}
              sx={{
                "@media (max-width: 900px)": {
                  padding: 0,
                },
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() =>
                        setIncludeAllColumnsInExport((prev) => !prev)
                      }
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={
                        <SquareIcon
                          sx={{ color: "#3A547C", border: "1px solid white" }}
                        />
                      }
                    />
                  }
                  label="Include all column data within export"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ marginBottom: "20px" }}>
          <Button variant="outlined" onClick={handleExportModalClose}>
            Cancel
          </Button>
          <Button
            bgcolor="#7D594C"
            sx={{ marginRight: "22px" }}
            onClick={() => handleGridExport(exportFileFormat, exportFileName)}
            disabled={!exportFileName}
          >
            Export
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
