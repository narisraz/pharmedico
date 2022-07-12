import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "./Context";
import LegalInfoStep from "./LegalInfoStep";
import PersonalInfoStep from "./PersonalInfoStep";

const labels = ['Informations personnelles', 'Informations légales', 'Etudes et diplômes'];
const handleSteps = (step: number) => {
  switch (step) {
    case 0:
      return <PersonalInfoStep />
    case 1:
      return <LegalInfoStep />
    case 2:
      return <LegalInfoStep />
    default:
      throw new Error('Unknown step')
  }
}

export default function SignupPage() {
  const { activeStep } = useContext(AppContext)

  return (
    <Box 
      sx={{
        margin: 'auto',
        paddingTop: 8,
        display: 'grid',
        justifyItems: 'center',
        gap: 2,
        maxWidth: 800,
        paddingX: {
          xs: 2
        },
      }} 
      data-testid="signup-stepper" component="form" noValidate method="post"
    >
      <Typography component="h1" variant="h5">
        Inscription en tant que médecin
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ py: 3 }} alternativeLabel>
        {labels.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {handleSteps(activeStep)}
    </Box>
  )
}