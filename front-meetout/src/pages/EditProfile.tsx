import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import UserForm from "../components/forms/UserForm";
import { useUserDataContext } from "../hooks/useUserData";
import { UserData } from "../types/Types";

const EditProfile = () => {
  const [localUserData, setLocalUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { userData } = useUserDataContext();
  const token = userData?.token;

  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLocalUserData((prevState) => {
      const newValue = e.target.value !== null ? e.target.value : "";
      return { ...prevState, [e.target.name]: newValue };
    });
  };

  const editUser = async (e: React.FormEvent<HTMLFormElement>) => {
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
      console.log(error);
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
        setFileInput={(file: File | null) => setAvatar(file)}
        handleInputChange={handleInputChange}
        buttonText="Edit"
      />
    </section>
  );
};

export default EditProfile;
