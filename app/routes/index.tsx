import { Grid, Typography } from "@mui/material";
import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >

      <Grid item xs={3}>
        <Typography variant="h3">Pharmedico</Typography>
        <Typography variant="h5">Bientôt ! 🚧🚧🚧</Typography>
      </Grid>   
      
    </Grid> 
  );
}
