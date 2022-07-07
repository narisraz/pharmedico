import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, Avatar, Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
    invalidCredentials?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: "Email invalide" } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json<ActionData>(
      { errors: { password: "Le mot de passe ne doit pas être vide" } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json<ActionData>(
      { errors: { invalidCredentials: "Email ou mot de passe invalide" } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo,
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/notes";
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Box
      sx={{
        margin: 'auto',
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 500,
        paddingX: {
          xs: 2
        }
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
        <LockOutlinedIcon fontSize='large' />
      </Avatar>
      <Typography component="h1" variant="h5">
        Se connecter
      </Typography> 
      <Box component="form" method="post" noValidate sx={{ mt: 1 }}>
        {actionData?.errors?.invalidCredentials &&
          <Alert severity="error">{ actionData?.errors?.invalidCredentials }</Alert>
        } 
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          error={Boolean(actionData?.errors?.email)}
          helperText={actionData?.errors?.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mot de passe"
          type="password"
          id="password"
          autoComplete="current-password"
          error={Boolean(actionData?.errors?.password)}
          helperText={actionData?.errors?.password}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Se souvenir de moi"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Se connecter
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Mot de passe oublié?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/join" variant="body2">
              {"Pas encore de compte? S'inscrire"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
