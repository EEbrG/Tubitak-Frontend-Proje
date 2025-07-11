"use client";
import { createContext, useState, useContext, ReactNode } from "react";

type GameContextType = {
  balance: number;
  flowers: number;
  milk: number;
  selectedPlant: "tohum" | "süt" | null;
  setBalance: (value: number) => void;
  setFlowers: (value: number) => void;
  setMilk: (value: number) => void;
  setSelectedPlant: (value: "tohum" | "süt" | null) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(100);
  const [flowers, setFlowers] = useState(0);
  const [milk, setMilk] = useState(0);
  const [selectedPlant, setSelectedPlant] = useState<"tohum" | "süt" | null>(null);

  return (
    <GameContext.Provider
      value={{
        balance,
        flowers,
        milk,
        selectedPlant,
        setBalance,
        setFlowers,
        setMilk,
        setSelectedPlant,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
