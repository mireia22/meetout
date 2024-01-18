// AllEvents.tsx
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useEventDataContext } from "../hooks/useEventData";
import EventInfo from "./EventInfo";

const AllEvents: React.FC = () => {
  const { events, setEvents } = useEventDataContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events`);
        const fetchedEvents = await response.json();
        setEvents(fetchedEvents);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchEvents();
  }, [setEvents]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section>
      {events.length > 0 ? (
        <ul className="all-events">
          {events.map((event) => (
            <li key={event._id}>
              <EventInfo event={event} />
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="self-center">No events found</h2>
      )}
    </section>
  );
};

export default AllEvents;
