import { SessionProvider } from 'next-auth/react';
import { GameProvider } from "../libs/game";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/libs/query/query-client';

function ClickLayout({
  Component,
  pageProps: { session, ...pageProps },
}: { Component: any, pageProps: any }) {

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <GameProvider>
          <Component {...pageProps} />
        </GameProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default ClickLayout;