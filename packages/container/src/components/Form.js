import React from "react";
import {  Controller } from "react-hook-form";
import Grid from "@mui/material/Grid";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormGroup } from "@mui/material";
import SquareIcon from "@mui/icons-material/Square";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import SelectBoxComponent from "./Select";
import TextInputComponent from "./Input";
import Button from "./Button";

export default function ModalForm({
  handleExportModalClose,
  setIncludeAllColumnsInExport,
  exportFormatsData,
  onSubmit,
  handleSubmit,
  errors,
  control,
  formState
}) {


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <Controller
              name="exportfileformat"
              control={control}
              rules={{
                required: true,
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
                // formState,
              }) => (
                <SelectBoxComponent
                  data={exportFormatsData}
                  onChange={onChange}
                  value={value}
                  id={"export-file-format-input"}
                  label={""}
                  name={"exportfileformat"}
                  error={!!error}
                  errors={errors.exportfileformat}
                />
              )}
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
            <Controller
              name="exportfilename"
              control={control}
              rules={{
                required: true,
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
                // formState,
              }) => (
                <TextInputComponent
                  helperText={error ? error.message : null}
                  variant="outlined"
                  error={!!error}
                  value={value}
                  onChange={onChange}
                  id={"export-file-name-input"}
                  label={""}
                  errors={errors.exportfilename}
                />
              )}
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
          type="submit"
          bgcolor="#7D594C"
          sx={{ marginRight: "22px" }}
          disabled={!formState.isValid}
        >
          Export
        </Button>
      </DialogActions>
    </form>
  );
}
