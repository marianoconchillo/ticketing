import { NextPage } from "next";
import AuthForm from "@/components/auth/AuthForm";

const SignIn: NextPage = () => {
  return <AuthForm url="/api/users/signin" title="Sign In" />;
};

export default SignIn;
