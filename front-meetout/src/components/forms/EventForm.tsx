import { DIFFICULTY, SPORTS } from "../../constants/constants";
import InputFile from "../InputFile";
import Loader from "../Loader";

interface EventFormProps {
  event: {
    title: string;
    date: string;
    ubication: string;
    sport: string;
    difficulty: string;
  };
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  error: string;
  loading: boolean;
  setEventImage: (file: File | null) => void;
  deleteEvent?: () => void;
}

const EventForm: React.FC<EventFormProps> = ({
  event,
  onFormSubmit,
  handleInputChange,
  error,
  loading,
  setEventImage,
  deleteEvent,
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <article>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={event.title}
            autoFocus
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="ubication">Ubication</label>
          <input
            type="text"
            placeholder="Ubication "
            name="ubication"
            value={event.ubication}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            placeholder="Date"
            name="date"
            value={event.date}
            onChange={handleInputChange}
          />
        </div>
      </article>
      <article>
        <div>
          <label htmlFor="sport">Sport</label>
          <select name="sport" value={event.sport} onChange={handleInputChange}>
            <option value=""> - </option>
            {SPORTS.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>
        <div>
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
        </div>
        <div>
          <InputFile
            onChange={(file: File | null) => setEventImage(file)}
            inputName="Event Image 📸"
          />
        </div>
      </article>
      {error && <p>{error}</p>}

      {loading ? <Loader /> : <button>Post Event</button>}
      {deleteEvent && (
        <button onClick={deleteEvent} className="warining-btn">
          Delete Event
        </button>
      )}
    </form>
  );
};

export default EventForm;
