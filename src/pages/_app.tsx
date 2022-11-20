// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { useEffect } from "react";

// Components
import Header from "../components/layouts/Header";
import { DarkmodeProvider } from "../hooks/useDark";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <DarkmodeProvider>
        <Header>
          <Component {...pageProps} />
        </Header>
      </DarkmodeProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
