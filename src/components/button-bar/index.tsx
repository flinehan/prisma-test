import * as React from 'react';
import { Button, Stack } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useGame } from '@/libs/game';
import GameStart from '../game-start';
import SessionButton from '../session-button';


function ButtonBar() {
  const { data: session } = useSession();
  const { startGame, isRunning } = useGame();
  return (
    <Stack
      direction="column"
      spacing={5}
      sx={{
        padding: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GameStart handleGameStart={startGame} hasSession={!!session} isRunning={isRunning} />
      <SessionButton />
    </Stack>
  );
}

export default ButtonBar;