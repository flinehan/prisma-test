import * as React from 'react';
import { Button } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';


function SessionLink() {
  const { data: session, status } = useSession();

  if (session) {
    return <Button variant="contained" color="secondary" onClick={() => signOut()}>Sign out</Button>
  }

  return <Button variant="contained" color="secondary" onClick={() => signIn()}>Sign in</Button>
}

export default SessionLink;