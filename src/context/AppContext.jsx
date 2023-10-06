import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [quickTabs, setQuickTabs] = useState({});

  const value = {
    user,
    setUser,
    setQuickTabs,
    quickTabs,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
