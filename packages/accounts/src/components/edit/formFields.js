import React,{ useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useHistory } from 'react-router-dom';
import { merge } from 'lodash';
import { useForm, Controller } from "react-hook-form";

// const accountStatus = [
//   {
//     value: "Open",
//     label: "Open",
//   },
//   {
//     value: "PendingOpen",
//     label: "PendingOpen",
//   },
//   {
//     value: "Closed",
//     label: "Closed",
//   },
// ];

// const productType = [
//   {
//     value: "Equity",
//     label: "Equity",
//   },
//   {
//     value: "Fixed Income",
//     label: "Fixed Income",
//   },
//   {
//     value: "Balanced",
//     label: "Balanced",
//   },
// ];

const myHelper = {
  accountName: {
    required: "Account Name is Required",
  },
  accountStatus: {
    required: "Account Status is Required",
  },
  productType: {
    required: "Product Type is Required",
  },
};

export default function FormFields({
  formValues = {
    accountId: "",
    accountName: "",
    accountStatus: "",
    productType: "",
  },
}) {

  const history = useHistory();

  const { control, formState, watch, register, handleSubmit } =
    useForm({
      defaultValues: useMemo(() => formValues, [formValues]),
    });
  const { errors } = formState;

  watch();

  const onSubmit = (data) => {
    let payload = merge(formValues, data)
    alert(JSON.stringify(payload, null, 4))
  };

  return (
    <Box sx={{ m: 1, maxWidth: "500px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Controller
              name="accountName"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Account Name"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: myHelper["accountName"].required }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="accountStatus"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Account Status"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: myHelper["accountStatus"].required }}
            />
            {/* <TextField
              select
              fullWidth
              defaultValue=""
              label="Account Status"
              inputProps={register("accountStatus", {
                required: "Please Select Status",
              })}
              error={errors.accountStatus}
              helperText={errors.accountStatus?.message}
            >
              {accountStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> */}
          </Grid>
          <Grid item xs={12}>
            {/* <TextField
              select
              fullWidth
              defaultValue=""
              label="Product Type"
              inputProps={register("productType", {
                required: "Please Select Product Type",
              })}
              error={errors.productType}
              helperText={errors.productType?.message}
            >
              {productType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> */}
            <Controller
              name="productType"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Product Type"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: myHelper["productType"].required }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" onClick={() => history.push('/accounts/table')} sx={{ mt: 3 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, ml: 3 }}
            >
              Submit
            </Button>
          </Grid>
          {/* <pre>{JSON.stringify(getValues(), null, 4)}</pre> */}
        </Grid>
      </form>
    </Box>
  );
}
