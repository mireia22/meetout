import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { useUserDataContext } from "../../hooks/useUserData";
import InputFile from "../InputFile";
import { DIFFICULTY, SPORTS } from "../../constants/constants";

const PostEventForm = () => {
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

  const postEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);

      const formData = new FormData();
      const { title, date, ubication, sport, difficulty } = event;
      formData.append("title", title);
      formData.append("date", date);
      formData.append("ubication", ubication);
      formData.append("sport", sport);
      formData.append("difficulty", difficulty);
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

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        const eventData = await response.json();
        setEvent(eventData);
        navigate("/");
      }
      setLoading(false);
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={postEvent}>
      <article>
        <label htmlFor="">Title</label>
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
        <label htmlFor="">Date</label>
        <input
          type="date"
          placeholder="Date"
          name="date"
          value={event.date}
          onChange={handleInputChange}
        />
      </article>
      <article>
        <label htmlFor="">Ubication</label>
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
      {error && <p>🚫 {error}</p>}

      <button>{loading ? <Loader /> : "Post Event"}</button>
    </form>
  );
};

export default PostEventForm;
