import { Link, useNavigate } from "react-router-dom";
import { formatTimeAgo } from "../utils/formatDates";
import { useUserDataContext } from "../hooks/useUserData";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Event } from "../types/Types";
interface EventInfoProps {
  event: Event;
}

const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
  const {
    _id,
    title,
    date,
    description,
    ubication,
    sport,
    difficulty,
    createdBy,
    eventImage,
    createdAt,
  } = event;
  const [error, setError] = useState("");
  const { userData } = useUserDataContext();
  console.log("USERDATA", userData);
  const user = userData?.user;
  // const { user } = userData || { user: null };

  const isUserInscribed =
    user?.asistedEvents?.some(
      (assistedEvent) => assistedEvent._id === event._id
    ) || false;
  const navigate = useNavigate();

  const handleInscriptionClick = () => {
    if (userData === undefined) {
      setError("You must be registered.");
    } else {
      navigate(`/${_id}/inscription`);
    }
  };

  return (
    <div className="event-info">
      <h2>{title}</h2>

      <div>
        <p>{date && date}</p>

        <h4>{sport}</h4>
      </div>

      <div>
        <h5>
          <FaMapMarkerAlt />
          {ubication}
        </h5>

        <h4>{difficulty}</h4>
      </div>
      <div></div>
      <div className="card-event-image">
        <img
          src={eventImage || "/front-meetout/public/event.png"}
          alt="Event image"
        />
      </div>
      <div>
        <p>{description}</p>
      </div>
      <div>
        <button onClick={handleInscriptionClick}>
          {isUserInscribed ? "Inscribed!" : "Inscription Here"}
        </button>
        <Link to={`/${_id}/asistants`}>Assistants</Link>
      </div>
      <div>
        <small>
          Created by: {createdBy?.name} {formatTimeAgo(createdAt)}
        </small>
      </div>
      {error && <p> {error}</p>}
    </div>
  );
};

export default EventInfo;
