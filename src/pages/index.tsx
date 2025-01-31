import { NextPage } from "next/types"
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Paper, List, ListItem, ListItemText } from "@mui/material";
import { useGame } from "@/libs/game";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const { clicks, timeLeft, scores, startGame, handleClick, isRunning } = useGame();

  if (!session) {
    return (
      <button onClick={() => signIn()}>Sign in</button>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h3">Click Speed Game</Typography>
      <Typography variant="h5">Time Left: {timeLeft}s</Typography>
      <Typography variant="h6">Clicks: {clicks}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        disabled={!isRunning}
        sx={{ my: 2, fontSize: "1.5rem", px: 5, py: 2 }}
      >
        Click Me!
      </Button>
      <Button variant="outlined" onClick={startGame} disabled={isRunning}>
        Start Game
      </Button>
      <Paper elevation={3} sx={{ mt: 4, p: 2, width: "300px" }}>
        <Typography variant="h6">Scoreboard</Typography>
        <List>
          {scores.map((score, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${index + 1}. ${score} CPS`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default Home;