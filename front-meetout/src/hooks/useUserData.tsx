import { useContext } from "react";
import { UserDataContext } from "../context/userDataContext";

export const useUserDataContext = () => {
  const context = useContext(UserDataContext);

  if (!context) {
    throw new Error(
      "useUserDataContext must be used within a UserDataProvider"
    );
  }

  return context;
};
