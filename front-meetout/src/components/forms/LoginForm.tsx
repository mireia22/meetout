import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../hooks/useUserData";
import Loader from "../Loader";

const LoginForm = () => {
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
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log("error", errorData.message);

        setError(errorData.message);
      } else {
        const loggedUser = await response.json();
        setUserData(loggedUser);

        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <form onSubmit={loginUser}>
      <div>
        <label htmlFor="">Email</label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={userData?.email}
          autoFocus
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userData?.password}
          onChange={handleInputChange}
        />
      </div>
      {error && <p>🚫{error}</p>}

      <button>Login</button>
    </form>
  );
};

export default LoginForm;
