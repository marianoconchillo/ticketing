import { useState } from "react";
import Router from "next/router";
import useRequest from "@/hooks/useRequest";
import Loading from "../ui/Loading";

interface Props {
  url: string;
  title: string;
}

const AuthForm = ({ url, title }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { doRequest, errors } = useRequest({
    url,
    method: "post",
    body: { email, password },
    onSuccess: () => Router.push("/"),
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await doRequest();
    setIsLoading(false);
  };

  return (
    <form
      className="p-4 mx-auto w-3/4 md:w-1/2 lg:w-1/3 flex flex-col space-y-5 border border-gray-200 rounded-md"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl text-center">{title}</h1>
      <label className="flex flex-col space-y-2" htmlFor="email-input">
        <span className="block">Email Address</span>
        <input
          type="email"
          id="email-input"
          className="border rounded-sm focus:outline-none px-2 py-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="flex flex-col space-y-2" htmlFor="password-input">
        <span className="block">Password</span>
        <input
          type="password"
          id="password-input"
          className="border rounded-sm focus:outline-none px-2 py-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {errors}
      <button
        type="submit"
        className="w-32 py-1.5 rounded text-white font-bold bg-indigo-500 self-center"
      >
        {isLoading ? <Loading /> : title}
      </button>
    </form>
  );
};

export default AuthForm;
