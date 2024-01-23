import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useEventDataContext } from "../hooks/useEventData";
import EventInfo from "./EventInfo";

const AllEvents: React.FC = () => {
  const { events, setEvents } = useEventDataContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events`);
        const fetchedEvents = await response.json();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      setLoading(false);
    };
    fetchEvents();
  }, [setEvents]);

  if (loading) {
    return <Loader />;
  }

  return (
    <article>
      {events && events.length > 0 ? (
        <ul className="all-events">
          {events.map((event) => (
            <li key={event._id}>
              <EventInfo event={event} />
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="self-center">No events found.</h2>
      )}
    </article>
  );
};

export default AllEvents;
