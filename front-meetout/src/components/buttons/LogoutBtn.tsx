import { useUserDataContext } from "../../hooks/useUserData";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const { setUserData } = useUserDataContext();
  const navigate = useNavigate();

  const logout = () => {
    setUserData(null);
    localStorage.removeItem("user");
    navigate("/login");
  };
  return <button onClick={logout}>Logout</button>;
};

export default LogoutBtn;
