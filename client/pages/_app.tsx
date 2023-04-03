import "@/styles/globals.css";
import type { AppProps, AppContext } from "next/app";
import { Roboto } from "next/font/google";
import buildClient from "@/api/build-client";
import { ICurrentUser } from "@/interfaces/user";
import Header from "@/components/ui/Header";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

export interface Props extends AppProps {
  currentUser: ICurrentUser;
}

const MyApp = ({ Component, pageProps, currentUser }: Props) => {
  return (
    <main className={roboto.className}>
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
