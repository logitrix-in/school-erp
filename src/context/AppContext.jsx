import React, { createContext, useEffect, useState } from "react";
import api from "../config/api";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [quickTabs, setQuickTabs] = useState({});
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    api.get("/admission/get-all-classes").then((res) => setClasses(res.data));
  }, []);

  const value = {
    user,
    setUser,
    setQuickTabs,
    quickTabs,
    classes,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
