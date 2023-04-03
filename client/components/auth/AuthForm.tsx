import { useState } from "react";
import Router from "next/router";
import useRequest from "@/hooks/useRequest";

interface Props {
  url: string;
  title: string;
}

const AuthForm = ({ url, title }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { doRequest, errors } = useRequest({
    url,
    method: "post",
    body: { email, password },
    onSuccess: () => Router.push("/"),
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await doRequest();
  };

  return (
    <form
      className="container mx-auto flex flex-col space-y-5"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl">{title}</h1>
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
      {errors}
      <button
        type="submit"
        className="w-32 py-1.5 rounded text-white font-bold bg-indigo-500"
      >
        {title}
      </button>
    </form>
  );
};

export default AuthForm;
