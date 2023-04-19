import { NextPage } from "next";
import AuthForm from "@/components/auth/AuthForm";

const SignUp: NextPage = () => {
  return <AuthForm url="/api/users/signup" title="Sign Up" />;
};

export default SignUp;
