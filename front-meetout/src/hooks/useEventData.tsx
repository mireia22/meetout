import { useContext } from "react";
import { EventsContext } from "../context/eventDataContext";

export const useEventDataContext = () => {
  const contextValue = useContext(EventsContext);

  if (!contextValue) {
    throw new Error(
      "useEventDataContext must be used within an EventsDataProvider"
    );
  }

  const { events, setEvents } = contextValue;
  return { events, setEvents };
};
