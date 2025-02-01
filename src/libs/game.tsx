import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from "react";
import { TIME_SECONDS, COUNTDOWN_SCALE_SECOND } from './constants'
import { useAddClick } from '../libs/query/clicks'

interface GameContextType {
  clicks: number;
  timeLeft: number;
  startGame: () => void;
  handleClick: () => void;
  handleClickMultiplier: (multiplier: number) => void;
  isRunning: boolean;
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clicks, setClicks] = useState<number>(0);
  // todo: think about state machine here instead of just state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(TIME_SECONDS);
  const [clickMulti, setClickMulti] = useState<number>(1);
  const addClick = useAddClick()
  const savedCallback = useRef<any>(null);

  const handleTick = () => {
    if (timeLeft !== null && timeLeft <= 1) {
      setIsRunning(false)
      addClick.mutate({ perSecond: clicks / TIME_SECONDS })
      setTimeLeft(0)
      setClickMulti(1)
    }

    if (timeLeft && timeLeft > -1) {
      setTimeLeft(timeLeft - 1)
    }
  }

  useEffect(() => {
    savedCallback.current = handleTick;
  }, [handleTick]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (isRunning) {
      let id = setInterval(tick, COUNTDOWN_SCALE_SECOND);
      return () => clearInterval(id);
    }
  }, [isRunning]);

  const startGame = () => {
    setClicks(0);
    setIsRunning(true)
    setTimeLeft(TIME_SECONDS);
  };

  const handleClick = () => {
    if (timeLeft !== null && timeLeft > 0 && isRunning) {
      setClicks((prev) => prev + clickMulti);
    }
  };

  const handleClickMultiplier = (multiplier: number) => {
    setClickMulti(multiplier)
  }

  return (
    <GameContext.Provider value={{ clicks, timeLeft, startGame, handleClick, isRunning, handleClickMultiplier }}>
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
