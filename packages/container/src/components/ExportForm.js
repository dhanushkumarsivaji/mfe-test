import React from "react";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormGroup } from "@mui/material";
import SquareIcon from "@mui/icons-material/Square";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import SelectBoxComponent from "./Select";
import TextInputComponent from "./Input";
import Button from "./Button";

export default function ModalForm({
  handleExportPopOverClose,
  setIncludeAllColumnsInExport,
  exportFormatsData,
  onSubmit,
}) {
  const { handleSubmit, formState, control } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      exportfileformat: "xlsx",
      exportfilename: "",
    },
  });
  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <React.Fragment>
        <Grid
          container
          margin="20px 0"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
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
                  inputProps={{ "data-testid": "exportfileformat" }}
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
            md={12}
            lg={12}
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
                minLength: 2,
                maxLength: 24,
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
                  inputProps={{ "data-testid": "exportfilename" }}
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
            md={12}
            lg={12}
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
                    inputProps={{
                      "data-testid": "include-all-columns-checkbox",
                    }}
                    icon={<CheckBoxOutlineBlankIcon />}
                    checkedIcon={
                      <SquareIcon
                        sx={{ color: "#3A547C", border: "1px solid #3A547C" }}
                      />
                    }
                  />
                }
                label="Include all column data within export"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </React.Fragment>
      <Grid container margin="20px 20px">

          <Button
            type="submit"
            bgcolor="#7D594C"
            sx={{ marginRight: "22px" }}
            disabled={!formState.isValid}
            data-testid="submit"
          >
            Export
          </Button>
  

          <Button
            variant="outlined"
            onClick={handleExportPopOverClose}
            data-testid="cancel-btn"
          >
            Cancel
          </Button>
  
      </Grid>
    </form>
  );
}
