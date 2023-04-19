import "@/styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import buildClient from "@/api/build-client";
import { ICurrentUser } from "@/interfaces/user";
import Header from "@/components/ui/Header";

export interface Props extends AppProps {
  currentUser: ICurrentUser;
}

const MyApp = ({ Component, pageProps, currentUser }: Props) => {
  return (
    <>
      <Header currentUser={currentUser} />
      <div className="container mx-auto">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </>
  );
};

MyApp.getInitialProps = async ({ ctx, Component }: AppContext) => {
  const client = buildClient(ctx);
  const { data } = await client.get<Props>("/api/users/currentUser");

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { ...data, pageProps };
};

export default MyApp;
