import { Link, useNavigate } from "react-router-dom";
import UserForm from "../components/forms/UserForm";
import { useState } from "react";

const Register = () => {
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
    <section>
      <h2>Register:</h2>
      <UserForm
        onFormSubmit={registerUser}
        error={error}
        userData={localUserData}
        setFileInput={setAvatar}
        handleInputChange={handleInputChange}
        loading={loading}
      />
      <small>
        Already have an account?
        <Link to="/login" className="login">
          Login
        </Link>
      </small>
    </section>
  );
};

export default Register;
