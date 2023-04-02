import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(email, password);
  };

  return (
    <form
      className="container mx-auto flex flex-col space-y-5"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl">Sign Up</h1>
      <label className="block">
        <span className="block">Email Address</span>
        <input
          type="email"
          className="border rounded-md focus:outline-none px-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="block">
        <span className="block">Password</span>
        <input
          type="password"
          className="border rounded-md focus:outline-none px-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button
        type="submit"
        className="w-32 py-1.5 rounded text-white font-bold bg-indigo-500"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
