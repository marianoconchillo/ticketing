import "@/styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import buildClient from "@/api/build-client";
import { ICurrentUser } from "@/interfaces/user";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export interface Props extends AppProps {
  currentUser: ICurrentUser;
}

const MyApp = ({ Component, pageProps, currentUser }: Props) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header currentUser={currentUser} />
      <Component currentUser={currentUser} {...pageProps} />
      <Footer />
    </div>
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
