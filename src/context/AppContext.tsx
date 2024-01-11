import React, { ReactElement, createContext } from "react";

interface IAppContextProps {
  children: ReactElement;
}

const AppContext = createContext(null);

export function AppProvider({ children }: IAppContextProps) {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
}
