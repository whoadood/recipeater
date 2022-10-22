// Packages
import React, { useContext, createContext } from "react";
import useToggle from "./useToggle";

const Darkmode = createContext<
  { darkmode: boolean; handleDarkMode: () => void } | undefined
>(undefined);

const DarkmodeProvider = ({ children }: { children: React.ReactNode }) => {
  const { toggle: darkmode, handleToggle: handleDarkMode } = useToggle();
  return (
    <Darkmode.Provider value={{ darkmode, handleDarkMode }}>
      {children}
    </Darkmode.Provider>
  );
};

const useDarkmode = () => {
  const context = useContext(Darkmode);
  if (context === undefined) {
    throw new Error("darkmode context must be used within darkmode provider");
  }
  return context;
};

export { DarkmodeProvider, useDarkmode };
