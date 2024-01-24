import { Link, useNavigate } from "react-router-dom";
import UserForm from "../components/forms/UserForm";
import { useState } from "react";
import { UserData } from "../types/Types";

const Register = () => {
  const [localUserData, setLocalUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLocalUserData((prevState) => {
      const newValue = e.target.value !== null ? e.target.value : "";
      return { ...prevState, [e.target.name]: newValue };
    });
  };

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);

      const formData = new FormData();
      if (localUserData.name !== null) {
        formData.append("name", localUserData.name);
      }

      if (localUserData.email !== null) {
        formData.append("email", localUserData.email);
      }

      if (localUserData.password !== null) {
        formData.append("password", localUserData.password);
      }

      if (avatar !== null) {
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
        setFileInput={(file: File | null) => setAvatar(file)}
        handleInputChange={handleInputChange}
        loading={loading}
        buttonText="Register"
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
