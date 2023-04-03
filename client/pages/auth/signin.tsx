import AuthForm from "@/components/auth/AuthForm";

const SignIn = () => {
  return <AuthForm url="/api/users/signin" title="Sign In" />;
};

export default SignIn;
