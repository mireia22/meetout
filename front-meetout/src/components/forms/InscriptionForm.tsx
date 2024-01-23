import { useEffect, useState } from "react";
import { useUserDataContext } from "../../hooks/useUserData";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";

const InscriptionForm = () => {
  const { userData } = useUserDataContext();
  const { eventId } = useParams();
  const [asistantData, setAsistantData] = useState({
    name: "",
    email: "",
  });
  console.log("current user", userData);
  const token = userData?.token;

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAsistantData((prevState) => ({ ...prevState, [name]: value }));
  };
  const makeInscription = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/events/${eventId}/inscription`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(asistantData),
        }
      );
      console.log("Response:", response);
      if (!response.ok) {
        const errorData = await response.json();
        console.log("error", errorData.message);
        setError(errorData.message);
      } else {
        navigate("/");
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={makeInscription}>
      <article>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={asistantData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={asistantData.email}
            onChange={handleInputChange}
          />
        </div>
      </article>

      {error && <p>🚫 {error}</p>}
      <button>{loading ? <Loader /> : "Inscribe"}</button>
    </form>
  );
};

export default InscriptionForm;
