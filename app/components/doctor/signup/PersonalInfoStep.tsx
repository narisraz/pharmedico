import { Button, Grid, TextField } from "@mui/material";
import { useCallback, useContext } from "react";
import { AppContext } from "./Context";

export default function PersonalInfoStep() {
  const { formValues, handleChange, handleNext, variant, margin } = useContext(
    AppContext
  )
  const { name, firstName } = formValues

  const isError = useCallback(
    () =>
      Object.keys({ name, firstName }).some(
        (name) =>
          (formValues[name].required && !formValues[name].value) ||
          formValues[name].error
      ),
    [formValues, name, firstName]
  )

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="name"
            label="Nom"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleChange}
            value={name.value}
            error={!!name.error}
            helperText={name.error}
            required={name.required}
            variant={variant}
            margin={margin}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="firstName"
            label="Prénom"
            name="firstName"
            autoComplete="firstName"
            value={firstName.value}
            onChange={handleChange}
            error={!!firstName.error}
            helperText={firstName.error}
            required={firstName.required}
            variant={variant}
            margin={margin}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{ mt: 3, ml: 1 }}
        disabled={isError()}
        color="primary"
        onClick={!isError() ? handleNext : () => null}
      >
        Next
      </Button>
    </>
  )
}