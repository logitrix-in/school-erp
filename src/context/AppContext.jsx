import React, { createContext, useEffect, useState } from "react";
import api from "../config/api";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [quickTabs, setQuickTabs] = useState({});
  const [classes, setClasses] = useState([]);

  function generateAcademicYears() {
    const currentYear = new Date().getFullYear();
    const academicYears = [];

    for (let i = currentYear - 1; i <= currentYear + 1; i++) {
      const academicYear = `${i}-${(i + 1).toString().slice(2)}`;
      academicYears.push(academicYear);
    }

    return academicYears;
  }

  const curYear = new Date().getFullYear();
  const acYear = generateAcademicYears();
  const curAcademicYear = `${curYear}-${(curYear + 1).toString().slice(2)}`;

  useEffect(() => {
    api
      .get("/admission/get-all-classes")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, []);

  const value = {
    user,
    setUser,
    setQuickTabs,
    quickTabs,
    classes,
    acYear,
    curAcademicYear,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
