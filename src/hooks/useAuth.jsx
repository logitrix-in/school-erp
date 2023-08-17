import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useAuth = () => {
  const context = useContext(AppContext);
  return context.user;
};

export default useAuth;
