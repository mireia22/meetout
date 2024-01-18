const express = require("express");
const {
  getAllEvents,
  getEventById,
  postEvent,
  editEvent,
  deleteEventById,
  deleteAllEvents,
  inscribeToEvent,
  getAllEventAsistants,
  getFilteredEvents,
} = require("../controllers/event-controllers");
const { isAuth } = require("../../middlewares/auth-middleware");
const { isAdmin } = require("../../middlewares/admin-middleware");
const { upload } = require("../../middlewares/files-middleware");

const eventRouter = express.Router();
eventRouter.get("/", getAllEvents);
eventRouter.get("/:id", getEventById);
eventRouter.get("/:id/asistants", getAllEventAsistants);
eventRouter.post("/filtered", getFilteredEvents);
eventRouter.post("/", isAuth, upload.single("eventImage"), postEvent);
eventRouter.put("/:eventId/inscription", isAuth, inscribeToEvent);

eventRouter.put("/:id", upload.single("EventImg"), editEvent);

eventRouter.delete("/:id", deleteEventById);
eventRouter.delete("/", deleteAllEvents);

module.exports = { eventRouter };
