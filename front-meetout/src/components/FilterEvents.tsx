import { ChangeEvent, useEffect, useState } from "react";
import { useEventDataContext } from "../hooks/useEventData";
import { DIFFICULTY, SPORTS } from "../constants/constants";
import { FaMapMarkerAlt } from "react-icons/fa";

interface Filters {
  sport: string;
  difficulty: string;
  title: string;
  ubication: string;
}
const FilterEvents: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    sport: "",
    difficulty: "",
    title: "",
    ubication: "",
  });
  const { setEvents } = useEventDataContext();

  const fetchFilteredEvents = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/events/filtered`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filters),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch events. Status: ${response.status}`);
      }
      const filteredEventsData = await response.json();
      setEvents(filteredEventsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchFilteredEvents();
  }, [filters]);

  return (
    <article>
      <h3>Find Event: </h3>
      <div className="filter">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Search "
            name="title"
            onChange={handleInputChange}
            value={filters.title}
          />
          <label htmlFor="ubication" className="ubication">
            <FaMapMarkerAlt />
            Ubication
          </label>
          <input
            type="text"
            placeholder="Ubication  "
            name="ubication"
            onChange={handleInputChange}
            value={filters.ubication}
          />
        </div>
        <div>
          <label htmlFor="sport">Sport:</label>
          <select
            name="sport"
            onChange={handleInputChange}
            value={filters.sport}
          >
            <option value=""> All</option>
            {SPORTS.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            name="difficulty"
            onChange={handleInputChange}
            value={filters.difficulty}
          >
            <option value=""> All</option>
            {DIFFICULTY.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>
    </article>
  );
};

export default FilterEvents;
