import * as React from 'react';
import { Button } from '@mui/material';
import { useGame } from '@/libs/game';

interface PowerUpType {
  scoreModifier: number;
}

function PowerUp({ scoreModifier }: PowerUpType) {
  const { handleClickMultiplier } = useGame();

  return (
    <Button variant="contained" color="secondary" onClick={() => handleClickMultiplier(scoreModifier)}>Power up score! by {scoreModifier}</Button>
  );
}

export default PowerUp;