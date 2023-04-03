import AuthForm from "@/components/auth/AuthForm";

const SignUp = () => {
  return <AuthForm url="/api/users/signup" title="Sign Up" />;
};

export default SignUp;
