import { useEffect } from "react";
import { useUserDataContext } from "../hooks/useUserData";
import { Link } from "react-router-dom";
import { Event } from "../types/Types";
const Profile = () => {
  const { userData, fetchUser } = useUserDataContext();
  const user = userData?.user;
  // const { user } = userData || { user: null };

  useEffect(() => {
    fetchUser();
  }, []);

  const countEvents = (events: Event[] | undefined) => {
    return events ? events.length : 0;
  };
  return (
    <section>
      <div className="profile-photo">
        <img
          src={user?.avatar || "/front-meetout/public/avatar.png"}
          alt={user?.name || "USERNAME"}
        />
      </div>
      <h3>Name: </h3>
      <p>{user?.name}</p>
      <h3>Email:</h3>
      <p>{user?.email}</p>
      <ul className="asistant-list">
        <h3>Posted Events: </h3> <p>{countEvents(user?.postedEvents)}</p>
        {user?.postedEvents ? (
          user.postedEvents.map((event) => (
            <li key={event._id} className="asistant">
              {event.date} - {event.title}
            </li>
          ))
        ) : (
          <p>No events.</p>
        )}
      </ul>
      <ul className="asistant-list">
        <h3>Asisted Events: </h3> <p>{countEvents(user?.asistedEvents)}</p>
        {user?.asistedEvents ? (
          user.asistedEvents.map((event) => (
            <li key={event._id} className="asistant">
              {event.date} - {event.title}
            </li>
          ))
        ) : (
          <p>No events.</p>
        )}
      </ul>
      <Link className="no-link" to="/edit-profile">
        Edit Profile
      </Link>
    </section>
  );
};

export default Profile;
