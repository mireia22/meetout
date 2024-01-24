import { createContext, useEffect, useState } from "react";
import { UserDataWithToken } from "../types/Types";

interface UserContextProps {
  userData: UserDataWithToken | null;
  setUserData: React.Dispatch<React.SetStateAction<UserDataWithToken | null>>;
  fetchUser: () => Promise<void>;
}

const initialState: UserContextProps = {
  userData: null,
  setUserData: () => {},
  fetchUser: async () => {},
};

export const UserDataContext = createContext<UserContextProps>(initialState);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserDataWithToken | null>(() => {
    const storedUserData = localStorage.getItem("user");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  const token = userData?.token;

  const fetchUser = async () => {
    try {
      if (!token) {
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchedUser = await response.json();

      setUserData((prevUserData) => ({
        ...prevUserData,
        token: prevUserData?.token || "",
        user: fetchedUser,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userData));
  }, [userData]);

  const sharedState = {
    userData,
    setUserData,
    fetchUser,
  };

  return (
    <UserDataContext.Provider value={sharedState}>
      {children}
    </UserDataContext.Provider>
  );
};
