import React from "react";
import { useForm } from "react-hook-form";
import {
  Checkbox,
  ListItemText,
  MenuItem,
  Grid,
} from "@mui/material";
import ButtonComponent from "../Button";
import SelectBoxComponent from "../Select";

const MyForm = ({ valueForSelect, options, viewBy }) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState(valueForSelect);
  const [showCheckbox, setShowCheckbox] = React.useState(false);

  const isAllSelected =
    options.length > 0 && selectedOptions.length === options.length;

  const handleSelectOption = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedOptions(
        selectedOptions.length === options.length ? [] : options
      );
      return;
    }
    setSelectedOptions(value);
  };

  const handleSelectValue = (event) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    if (selectedValue === "View By Assigned") {
      setShowCheckbox(false);
      setSelectedOptions([]);
      setValue("options", []); // reset the value of "options" field
    } else {
      setShowCheckbox(true);
    }
  };

  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    console.log(data);
  };

  React.useEffect(() => {
    if (valueForSelect === "View By Committe") {
      setShowCheckbox(true);
    } else {
      setShowCheckbox(false);
    }
  }, [register]);

  // React.useEffect(() => {
  //   setShowCheckbox(false); // reset showCheckbox state when value changes
  // }, [register]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} lg={3}>
            <SelectBoxComponent
              labelId="value-label"
              data-testid="value-for-select"
              label=""
              id="value"
              error={errors.value}
              errors={errors.value}
              value={selectedValue}
              onChange={handleSelectValue}
              inputProps={{
                ...register("value", { required: true }),
              }}
              fullWidth
              required
            >
              {viewBy.map((data, key) => (
                <MenuItem key={key} value={data.value}>
                  {data.label}
                </MenuItem>
              ))}
            </SelectBoxComponent>
        </Grid>
        {showCheckbox && (
          <Grid item xs={12} md={3} lg={3}>
              <SelectBoxComponent
                labelId="options-label"
                id="options"
                // data-testid="select-options"
                label=""
                multiple
                error={errors.options}
                errors={errors.options}
                value={selectedOptions}
                onChange={handleSelectOption}
                inputProps={{
                  ...register("options", { required: true }),
                  "data-testid": "select-options",
                }}
                renderValue={(selected) => selected.join(", ")}
                control={control}
              >
                <MenuItem value="all">
                  <Checkbox checked={isAllSelected} />
                  <ListItemText primary="Select All" />
                </MenuItem>
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={selectedOptions.indexOf(option) > -1} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </SelectBoxComponent>
          </Grid>
        )}

        <Grid item xs={12} md={3} lg={3}>
          <ButtonComponent
            type="submit"
            bgcolor="#7D594C"
            sx={{ minHeight: "48px" }}
            // disabled={!formState.isValid}
            data-testid="submit"
          >
                  View
          </ButtonComponent>
        </Grid>
      </Grid>
    </form>
  );
};

export default MyForm;
