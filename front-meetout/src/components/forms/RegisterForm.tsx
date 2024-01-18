import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const RegisterForm = () => {
  const [localUserData, setLocalUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLocalUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", localUserData.name);
      formData.append("email", localUserData.email);
      formData.append("password", localUserData.password);
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("error", errorData.message);

        setError(errorData.message);
      } else {
        navigate("/");
      }

      const newUser = await response.json();

      if (!newUser) {
        throw new Error("Server response is empty.");
      }

      setLoading(false);
      setLocalUserData(newUser);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <form onSubmit={registerUser}>
      {error && <p>{error}</p>}
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={localUserData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={localUserData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={localUserData.password}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="avatar">Avatar</label>
        <input
          type="file"
          name="avatar"
          onChange={(e) => setAvatar(e.target.files && e.target.files[0])}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
