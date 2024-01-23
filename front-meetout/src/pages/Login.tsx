import { Link, useNavigate } from "react-router-dom";
import UserForm from "../components/forms/UserForm";
import { useState } from "react";
import { useUserDataContext } from "../hooks/useUserData";

const Login = () => {
  const { userData, setUserData } = useUserDataContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        const loggedUser = await response.json();
        setUserData(loggedUser);
        navigate("/");
      }
      setLoading(false);
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <section>
      <h2>Login:</h2>
      <UserForm
        onFormSubmit={loginUser}
        error={error}
        userData={userData}
        handleInputChange={handleInputChange}
        loading={loading}
      />
      <small>
        Don't you have an account?
        <Link to="/register" className="register">
          Register
        </Link>
      </small>
    </section>
  );
};

export default Login;
