import axios from "axios";
import { IncomingMessage } from "http";
import { NextPageContext } from "next";

const buildClient = ({ req }: NextPageContext) => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req?.headers,
    });
  } else {
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
