import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserDataContext } from "../hooks/useUserData";
import Loader from "../components/Loader";

const Inscription = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAsistantData((prevState) => ({ ...prevState, [name]: value }));
  };
  const makeInscription = async () => {
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

      if (!response.ok) {
        const errorData = await response.json();
        console.log("error", errorData.message);

        setError(errorData.message);
      } else {
        const newAsistant = await response.json();

        setAsistantData(newAsistant);
        navigate("/");
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <section>
      <form onSubmit={makeInscription}>
        {error && <p>{error}</p>}
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
          <button>Inscribe</button>
          {error && <p className="warning">🚫{error}</p>}
        </div>
      </form>
    </section>
  );
};

export default Inscription;
