import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useClasses = () => {
  const context = useContext(AppContext);
  return {
    classes: context.classes,
    acYear: context.acYear,
    curYear: context.curAcademicYear,
  };
};

export default useClasses;
