import * as React from 'react';
import { Button } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';


function SessionLink() {
  const { data: session, status } = useSession();

  if (session) {
    return <Button onClick={() => signOut()}>Sign out</Button>
  }

  return <Button onClick={() => signIn()}>Sign in</Button>
}

export default SessionLink;