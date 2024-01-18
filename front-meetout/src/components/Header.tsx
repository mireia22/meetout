import { Link, useNavigate } from "react-router-dom";
import { useUserDataContext } from "../hooks/useUserData";
import { IoHome } from "react-icons/io5";
const Header = () => {
  const { userData, setUserData } = useUserDataContext();
  const navigate = useNavigate();
  console.log(userData);
  const logout = () => {
    setUserData(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header>
      <Link to="/">
        <IoHome />
      </Link>
      {userData ? (
        <ul>
          <li>
            <Link to="/create_event">Create Event</Link>
          </li>
          <Link to="/profile">
            <li>Profile</li>
          </Link>

          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      ) : (
        <ul>
          <Link to="/login">
            <li>Login</li>
          </Link>
          <Link to="/register">
            <li>Register</li>
          </Link>
        </ul>
      )}
    </header>
  );
};

export default Header;
