import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const ListOfAssistants = () => {
  const [loading, setIsLoading] = useState(false);
  const { eventId } = useParams();
  const [asistants, setAssistants] = useState([]);
  const [event, setEvent] = useState(null);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/events/${eventId}/asistants`
      );
      const fetchedData = await response.json();
      console.log("fetched data", fetchedData);

      if (fetchedData.message === "Success") {
        setAssistants(fetchedData.asistants);
        setEvent(fetchedData.eventTitle);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <h4>List of Participants in {event}:</h4>
      <ul className="asistants-list">
        {asistants ? (
          asistants.map((asistants) => (
            <li key={asistants.id} className="asistant">
              {asistants.name}
            </li>
          ))
        ) : (
          <h3>No assistants yet</h3>
        )}
      </ul>
    </div>
  );
};

export default ListOfAssistants;
