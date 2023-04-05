import "@/styles/globals.css";
import type { AppProps, AppContext } from "next/app";
import buildClient from "@/api/build-client";
import { ICurrentUser } from "@/interfaces/user";
import Header from "@/components/ui/Header";

export interface Props extends AppProps {
  currentUser: ICurrentUser;
}

const MyApp = ({ Component, pageProps, currentUser }: Props) => {
  return (
    <main>
      <Header currentUser={currentUser} />
      <Component currentUser={currentUser} {...pageProps} />
    </main>
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
