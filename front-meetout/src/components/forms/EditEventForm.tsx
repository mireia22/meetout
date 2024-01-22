import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import { useUserDataContext } from "../../hooks/useUserData";
import InputFile from "../InputFile";
import { DIFFICULTY, SPORTS } from "../../constants/constants";

const EditEventForm = () => {
  const [event, setEvent] = useState({
    title: "",
    date: "",
    sport: "",
    difficulty: "",
    ubication: "",
  });
  const [eventImage, setEventImage] = useState("");
  const { userData } = useUserDataContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = userData?.token;
  const { eventId } = useParams();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEvent((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const editEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", event.title);
      formData.append("date", event.date);
      formData.append("ubication", event.ubication);
      formData.append("sport", event.sport);
      formData.append("difficulty", event.difficulty);
      if (eventImage) {
        formData.append("eventImage", eventImage);
      }
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/events/${eventId}`,
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

      const updatedEvent = await response.json();
      console.log("UPDATED EVENT", updatedEvent);
      if (!updatedEvent) {
        throw new Error("Server response is empty.");
      }

      setLoading(false);
      setEvent(updatedEvent);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteEvent = async () => {
    setError("");
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("DELETE RESPONSE", response);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        navigate("/");
      }
      setLoading(false);
    } catch (err) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={editEvent}>
      <article>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={event.title}
          autoFocus
          onChange={handleInputChange}
        />
      </article>

      <article>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          placeholder="Date"
          name="date"
          value={event.date}
          onChange={handleInputChange}
        />
      </article>
      <article>
        <label htmlFor="ubication">Ubication</label>
        <input
          type="text"
          placeholder="Ubication 🗺️"
          name="ubication"
          value={event.ubication}
          onChange={handleInputChange}
        />
      </article>
      <article>
        <label htmlFor="sport">Sport</label>
        <select name="sport" value={event.sport} onChange={handleInputChange}>
          <option value=""> - </option>
          {SPORTS.map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>
      </article>
      <article>
        <label htmlFor="difficulty">Difficulty</label>
        <select
          name="difficulty"
          value={event.difficulty}
          onChange={handleInputChange}
        >
          <option value=""> - </option>
          {DIFFICULTY.map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
      </article>
      <InputFile
        onChange={(file: string) => setEventImage(file)}
        inputName="Event Image 📸"
      />
      {error && <p>{error}</p>}
      {loading ? <Loader /> : <button>Edit Event</button>}
      <button onClick={deleteEvent} className="warining-btn">
        Delete Event
      </button>
    </form>
  );
};

export default EditEventForm;