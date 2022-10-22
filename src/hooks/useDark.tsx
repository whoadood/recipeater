// Packages
import React, { useContext, createContext, useEffect } from "react";
import useToggle from "./useToggle";

const Darkmode = createContext<
  | {
      darkmode: boolean;
      handleDarkmode: () => void;
      addClasses: () => string;
      justFont: () => string;
    }
  | undefined
>(undefined);

const DarkmodeProvider = ({ children }: { children: React.ReactNode }) => {
  const { toggle: darkmode, handleToggle, setToggle } = useToggle();

  useEffect(() => {
    const dm = localStorage.getItem("darkmode");
    if (dm) {
      setToggle(!!JSON.parse(dm));
    }
  }, [setToggle]);

  const handleDarkmode = () => {
    handleToggle();
    localStorage.setItem("darkmode", JSON.stringify(!darkmode));
  };
  const addClasses = () =>
    darkmode ? "bg-black/70 text-white" : "bg-white text-black";
  const justFont = () => (darkmode ? "text-gray-400" : "text-gray-700");
  return (
    <Darkmode.Provider
      value={{ darkmode, handleDarkmode, addClasses, justFont }}
    >
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
