import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useClasses = () => {
  const context = useContext(AppContext);
  return { classes: context.classes };
  
};

export default useClasses;
