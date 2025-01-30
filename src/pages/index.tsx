import { NextPage } from "next/types"
import { signIn, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (!session) {
    return (
      <button onClick={() => signIn()}>Sign in</button>
    );
  }

  return (
    <div> hello</div>
  )
}

export default Home;