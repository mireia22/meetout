import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserDataContext } from "../hooks/useUserData";
import { LoginFormUserData } from "../types/Types";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  const { setUserData } = useUserDataContext();
  const [formUserData, setFormUserData] = useState<LoginFormUserData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormUserData((prevState: LoginFormUserData | null) => {
      return { ...prevState!, [e.target.name]: e.target.value };
    });
  };
  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
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
          body: JSON.stringify(formUserData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        const loggedUser = await response.json();
        setUserData((prevUserData) => ({
          ...prevUserData,
          user: loggedUser.user,
          token: loggedUser.token,
        }));
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
      <LoginForm
        onFormSubmit={loginUser}
        error={error}
        userData={formUserData}
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
