import { useContext } from "react";
import { EventsContext, SharedEventsState } from "../context/eventDataContext";

export const useEventDataContext = (): SharedEventsState => {
  const contextValue = useContext(EventsContext);

  if (!contextValue) {
    throw new Error(
      "useEventDataContext must be used within an EventsDataProvider"
    );
  }

  const { events, setEvents } = contextValue;
  return { events, setEvents };
};
