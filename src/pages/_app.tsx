import { SessionProvider } from 'next-auth/react';

function ClickLayout({
  Component,
  pageProps: { session, ...pageProps },
}: {Component: any, pageProps: any }) {

  return (
    <SessionProvider session={session}>
     <Component {...pageProps} />
    </SessionProvider>
  );
}

export default ClickLayout;