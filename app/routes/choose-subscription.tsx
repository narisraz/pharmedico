import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Typography } from "@mui/material";

export default function ChooseSubscription() {
  return (
    <Box
      sx={{
        margin: 'auto',
        marginTop: 8,
        display: 'grid',
        justifyItems: 'center',
        gap: 4,
        maxWidth: 500,
        paddingX: {
          xs: 2
        },
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
        <LockOutlinedIcon fontSize='large' />
      </Avatar>
      <Typography component="h1" variant="h5">
        S'inscrire
        <Typography component="h2">
          En tant que 
        </Typography> 
      </Typography>
      <Button data-testid="doctor-subscription" href="/doctor/signup" variant="contained" fullWidth>Médecin</Button>
    </Box>
  )
}