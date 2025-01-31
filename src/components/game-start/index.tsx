import * as React from 'react';
import { Button, Tooltip } from '@mui/material';

interface GameButton {
  hasSession: boolean;
  isRunning: boolean;
  handleGameStart: () => void;
}

function GameStart({ hasSession, handleGameStart, isRunning }: GameButton) {
  const startTooltip = hasSession ? "Get ready!" : "Sign in to play!"
  return (
    <Tooltip title={startTooltip} arrow>
      <span>
        <Button variant="contained" color="success" onClick={handleGameStart} disabled={isRunning || !hasSession}>
          Start Game
        </Button>
      </span>
    </Tooltip>
  );
}

export default GameStart;