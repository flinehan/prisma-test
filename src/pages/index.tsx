import { NextPage } from "next/types"
import React from "react";
import { Button, Typography, Box, Paper, List, ListItem, ListItemText, Container, Toolbar, AppBar, IconButton, Avatar } from "@mui/material";
import { useGame } from "@/libs/game";
import ButtonBar from "@/components/button-bar";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { clicks, timeLeft, scores, handleClick, isRunning } = useGame();
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#3499ff"
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {session && <Avatar alt={session?.user?.name || ''} src={session?.user?.image || ''} />}
          </Toolbar>
        </AppBar>
      </Box>
      <ButtonBar />
      <Container
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white"
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <Typography variant="h3">Click Speed Game</Typography>
          <Typography variant="h5">Time Left: {timeLeft}s</Typography>
          <Typography variant="h6">Clicks: {clicks}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            disabled={!isRunning}
            sx={{ my: 10, fontSize: "6rem", px: 5, py: 5 }}
          >
            Click Attack!
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
      </Container>
    </Box>


  )
}

export default Home;