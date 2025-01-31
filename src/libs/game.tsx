import React, { createContext, useContext, useState, ReactNode } from "react";
import { TIME_SECONDS, COUNTDOWN_SCALE_SECOND } from './constants'

interface GameContextType {
  clicks: number;
  timeLeft: number;
  scores: number[];
  startGame: () => void;
  handleClick: () => void;
  isRunning: boolean;
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clicks, setClicks] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(TIME_SECONDS);
  const [scores, setScores] = useState<number[]>([]);

  const startGame = () => {
    setClicks(0);
    setIsRunning(true)
    setTimeLeft(TIME_SECONDS);

    let timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          clearInterval(timer);
          setScores((prevScores) => [...prevScores, clicks]);
          return 0;
        }
        return prev - 1;
      });
    }, COUNTDOWN_SCALE_SECOND);
  };

  const handleClick = () => {
    if (timeLeft > 0 && isRunning) {
      setClicks((prev) => prev + 1);
    }
  };

  return (
    <GameContext.Provider value={{ clicks, timeLeft, scores, startGame, handleClick, isRunning }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
