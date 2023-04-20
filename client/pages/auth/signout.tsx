import { NextPage } from "next";
import { useEffect } from "react";
import Router from "next/router";
import useRequest from "@/hooks/useRequest";
import Loading from "@/components/ui/Loading";

const SignOut: NextPage = () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <Loading />;
};

export default SignOut;
