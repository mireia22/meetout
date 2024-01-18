const express = require("express");
const { isAuth } = require("../../middlewares/auth-middleware");
const { isAdmin } = require("../../middlewares/admin-middleware");
const { upload } = require("../../middlewares/files-middleware");
const {
  getAllAssistants,
  getAsistantById,
  deleteAsistantById,
  deleteAllAsistants,
  getAllAssistantsInEvent,
} = require("../controllers/asistant-controllers");

const asistantRouter = express.Router();
asistantRouter.get("/", getAllAssistants);
asistantRouter.get("/:id", getAsistantById);
asistantRouter.get("/:eventId", getAllAssistantsInEvent);
asistantRouter.delete("/:id", deleteAsistantById);
asistantRouter.delete("/", deleteAllAsistants);

module.exports = { asistantRouter };
