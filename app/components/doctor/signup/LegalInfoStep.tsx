import { Box, TextField } from "@mui/material";

export default function LegalInfoStep() {
  return (
    <Box>
      <TextField
        margin="normal"
        required
        fullWidth
        id="onm"
        label="ONM"
        name="onm"
        autoComplete="onm"
        autoFocus
      />
    </Box>
  )
}