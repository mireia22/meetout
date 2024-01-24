import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserDataContext } from "../hooks/useUserData";
import EventForm from "../components/forms/EventForm";

const EditEvent = () => {
  const [event, setEvent] = useState({
    title: "",
    date: "",
    sport: "",
    difficulty: "",
    ubication: "",
  });
  const [eventImage, setEventImage] = useState<File | null>();
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
      console.log(error);
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
    <section>
      <h2>Edit:</h2>
      <EventForm
        event={event}
        onFormSubmit={editEvent}
        deleteEvent={deleteEvent}
        handleInputChange={handleInputChange}
        error={error}
        loading={loading}
        setEventImage={setEventImage}
      />
    </section>
  );
};

export default EditEvent;
