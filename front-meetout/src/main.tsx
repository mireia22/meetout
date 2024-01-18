import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserDataProvider } from "./context/userDataContext.tsx";
import { EventsDataProvider } from "./context/eventDataContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserDataProvider>
        <EventsDataProvider>
          <App />
        </EventsDataProvider>
      </UserDataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
