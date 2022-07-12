import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/server-runtime";
import { StepsProvider } from "~/components/doctor/signup/Context";
import SignupPage from "~/components/doctor/signup/SignupPage";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log(JSON.stringify(formData))

  return json(
    { error: JSON.stringify(formData) },
    { status: 400 }
  );
}

export default function DoctorSignup() {
  return (
    <StepsProvider>
      <SignupPage />
    </StepsProvider>
  )
}