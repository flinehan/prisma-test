import { NextPage } from "next/types"
import React from "react";
import { Button, Typography, Box, Paper, List, ListItem, ListItemText, Container, Toolbar, AppBar, IconButton, Avatar, CircularProgress, Snackbar } from "@mui/material";
import { useGame } from "@/libs/game";
import ButtonBar from "@/components/button-bar";
import { useSession } from "next-auth/react";
import { useClicks } from "@/libs/query/clicks";

const Home: NextPage = () => {
  const { clicks, timeLeft, handleClick, isRunning } = useGame();
  const { data: session } = useSession();
  const { status, data, error, isFetching } = useClicks()

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
              {isFetching && (
                <ListItem>
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                  </Box>
                </ListItem>
              )}
              {data?.map((score, index) => (
                <ListItem key={index}>
                  <Avatar alt={score?.user?.name || ''} src={score?.user?.image} />
                  <ListItemText primary={`${score.perSecond} CPS`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>
      <Snackbar
        open={clicks > 500}
        autoHideDuration={300}
        message="CRUSHING"
      />
    </Box>


  )
}

export default Home;