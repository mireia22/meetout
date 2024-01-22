import { createContext, useState } from "react";
import { Event } from "../types/Types";

interface EventDataProviderProps {
  children: React.ReactNode;
}

interface SharedEventsState {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

export const EventsContext = createContext<SharedEventsState | undefined>(
  undefined
);

export const EventsDataProvider: React.FC<EventDataProviderProps> = ({
  children,
}) => {
  const [events, setEvents] = useState<Event[]>([]);

  const sharedState: SharedEventsState = { events, setEvents };

  return (
    <EventsContext.Provider value={sharedState}>
      {children}
    </EventsContext.Provider>
  );
};
