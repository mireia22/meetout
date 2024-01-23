import { Link } from "react-router-dom";
import { useUserDataContext } from "../hooks/useUserData";
import { IoHome } from "react-icons/io5";
import Avatar from "./Avatar";
import LogoutBtn from "./buttons/LogoutBtn";

const Header = () => {
  const { userData } = useUserDataContext();
  return (
    <header>
      <Link to="/">
        <IoHome size="1.4rem" />
      </Link>
      {userData?.token ? (
        <nav>
          <Link to="/create-event">Create Event ➕</Link>
          <Link to="/profile">
            <Avatar user={userData.user} size="small" />
          </Link>
          <LogoutBtn />
        </nav>
      ) : (
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
