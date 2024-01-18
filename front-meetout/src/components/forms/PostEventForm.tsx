import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEventDataContext } from "../../hooks/useEventData";
import Loader from "../Loader";
import { useUserDataContext } from "../../hooks/useUserData";

const PostEventForm = () => {
  const { setEvents } = useEventDataContext();
  const [event, setEvent] = useState({
    title: "",
    date: "",
    sport: "Run",
    difficulty: "Easy",
    ubication: "",
  });
  const [eventImage, setEventImage] = useState("");
  const { userData } = useUserDataContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = userData?.token;

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const handleInputChange = (e) => {
    setEvent((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const postEvent = async (e) => {
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
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      setEvent(data);
      setEvents(data);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <form onSubmit={postEvent}>
      {error && <p>{error}</p>}
      <div>
        <label htmlFor="">Title</label>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={event.title}
          autoFocus
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="">Date</label>
        <input
          type="date"
          placeholder="Date"
          name="date"
          value={event.date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="">Ubication</label>
        <input
          type="text"
          placeholder="Ubication 🗺️"
          name="ubication"
          value={event.ubication}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="">Sport</label>
        <select name="sport" value={event.sport} onChange={handleInputChange}>
          <option value="Run">Run</option>
          <option value="Bike">Bike</option>
          <option value="Roller">Roller</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Difficulty</label>
        <select
          name="difficulty"
          value={event.difficulty}
          onChange={handleInputChange}
        >
          <option value="🟢Easy">🟢Easy</option>
          <option value="🟡Medium">🟡Medium</option>
          <option value="🔴Hard">🔴Hard</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Event Photo</label>
        <input
          type="file"
          placeholder="Event Photo"
          name="eventPhoto"
          onChange={(e) => setEventImage(e.target.files && e.target.files[0])}
        />
      </div>

      <button>Create Event</button>
    </form>
  );
};

export default PostEventForm;
