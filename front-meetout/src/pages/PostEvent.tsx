import { useEffect, useState } from "react";
import EventForm from "../components/forms/EventForm";
import { useUserDataContext } from "../hooks/useUserData";
import { useNavigate } from "react-router-dom";

const PostEvent = () => {
  const [event, setEvent] = useState({
    title: "",
    date: "",
    sport: "",
    difficulty: "",
    ubication: "",
  });
  const [eventImage, setEventImage] = useState<File | null>(null);
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
    <section>
      <h2>Create event:</h2>
      <EventForm
        onFormSubmit={postEvent}
        event={event}
        handleInputChange={handleInputChange}
        error={error}
        loading={loading}
        setEventImage={(file: File | null) => setEventImage(file)}
      />
    </section>
  );
};

export default PostEvent;
