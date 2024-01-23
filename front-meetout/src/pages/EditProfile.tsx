import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import UserForm from "../components/forms/UserForm";
import { useUserDataContext } from "../hooks/useUserData";

const EditProfile = () => {
  const [localUserData, setLocalUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState<File | null>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { userData } = useUserDataContext();
  const token = userData?.token;

  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalUserData({ ...localUserData, [name]: value });
  };

  const editUser = async (e: React.FormEvent<HTMLFormElement>) => {
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
        `${import.meta.env.VITE_BASE_URL}/users/edit`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("error", errorData.message);

        setError(errorData.message);
      }

      const updatedUser = await response.json();

      if (!updatedUser) {
        throw new Error("Server response is empty.");
      }

      setLoading(false);
      setLocalUserData(updatedUser);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <section>
      <h2>Edit Profile:</h2>
      <UserForm
        onFormSubmit={editUser}
        error={error}
        userData={localUserData}
        setFileInput={setAvatar}
        handleInputChange={handleInputChange}
      />
    </section>
  );
};

export default EditProfile;
