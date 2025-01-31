import { SessionProvider } from 'next-auth/react';
import { GameProvider } from "../libs/game";

function ClickLayout({
  Component,
  pageProps: { session, ...pageProps },
}: { Component: any, pageProps: any }) {

  return (
    <SessionProvider session={session}>
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </SessionProvider>
  );
}

export default ClickLayout;