import { Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PostEvent from "./pages/PostEvent";
import Footer from "./components/Footer";
import Inscription from "./pages/Inscription";
import ListOfAssistants from "./pages/ListOfAssistants";
import EditEvent from "./pages/EditEvent";
import EditProfile from "./pages/EditProfile";
const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/edit-profile" element={<EditProfile />}></Route>
          <Route path="/create-event" element={<PostEvent />}></Route>
          <Route path="/:eventId/edit" element={<EditEvent />}></Route>
          <Route path="/:eventId/inscription" element={<Inscription />}></Route>
          <Route
            path="/:eventId/asistants"
            element={<ListOfAssistants />}
          ></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
