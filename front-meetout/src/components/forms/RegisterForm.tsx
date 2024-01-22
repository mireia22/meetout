import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import InputFile from "../InputFile";

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLocalUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
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
        setError(errorData.message);
      } else {
        const newUser = await response.json();
        setLocalUserData(newUser);

        navigate("/login");
      }

      setLoading(false);
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={registerUser}>
      <article>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={localUserData.name}
          onChange={handleInputChange}
        />
      </article>
      <article>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={localUserData.email}
          onChange={handleInputChange}
        />
      </article>
      <article>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={localUserData.password}
          onChange={handleInputChange}
        />
      </article>
      <InputFile
        onChange={(file: string) => setAvatar(file)}
        inputName={"Choose Avatar 📂"}
      />
      {error && <p> 🚫{error}</p>}

      <button>{loading ? <Loader /> : "Register"}</button>
    </form>
  );
};

export default RegisterForm;
