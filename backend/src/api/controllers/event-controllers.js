const { deleteImgCloudinary } = require("../../middlewares/files-middleware");
const Route = require("../models/event-model");
const Site = require("../models/asistant-model");
const User = require("../models/User-model");
const Event = require("../models/event-model");
const Asistant = require("../models/asistant-model");
const { HttpError } = require("../../middlewares/error-middleware");

const getAllEvents = async (req, res, next) => {
  try {
    const allEvents = await Event.find().populate("createdBy");
    return res.status(200).json(allEvents);
  } catch (error) {
    return next(new HttpError(error));
  }
};

const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return next(new HttpError("Post not Found", 404));
    }
    return res.status(200).json(event);
  } catch (error) {
    return next(new HttpError(error));
  }
};

const getAllEventAsistants = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    const assistantIds = event?.participants;

    if (!assistantIds || assistantIds.length === 0) {
      return res.status(200).json({ message: "No asistants yet" }, []);
    }
    const asistants = [];
    for (const assistantId of assistantIds) {
      const assistant = await Asistant.findById(assistantId);
      if (assistant) {
        asistants.push({
          id: assistant._id,
          name: assistant.name,
          email: assistant.email,
        });
      }
    }
    return res
      .status(200)
      .json({ message: "Success", asistants, eventTitle: event.title });
  } catch (error) {
    return next(new HttpError(error));
  }
};

const getFilteredEvents = async (req, res, next) => {
  try {
    const { sport, difficulty, title, ubication } = req.body;
    console.log("REQBODY", req.body);
    const filter = {};

    if (sport) filter.sport = sport;
    if (difficulty) filter.difficulty = difficulty;
    if (title) filter.title = { $regex: new RegExp(title, "i") };
    if (ubication) filter.ubication = { $regex: new RegExp(ubication, "i") };

    const filteredEvents = await Event.find(filter).populate("createdBy");

    return res.status(200).json(filteredEvents);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const postEvent = async (req, res, next) => {
  const { title, date, ubication, difficulty, sport } = req.body;

  try {
    if (!title || !ubication || !difficulty) {
      return next(new HttpError("Complete all fields.", 400));
    }

    const newEvent = new Event({
      title,
      ubication,
      date,
      difficulty,
      sport,
      createdBy: req.user.id,
      eventImage: req.file ? req.file.path : "no Event image",
    });

    const savedEvent = await newEvent.save();

    await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { postedEvents: savedEvent._id },
      },
      { new: true }
    );

    return res.status(201).json({ message: "Posted", savedEvent });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};
const inscribeToEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    if (!req.user) {
      return next(new HttpError("User not authenticated", 401));
    }

    const user = await User.findById(req.user._id);

    const event = await Event.findById(eventId);

    if (!user || !event) {
      return next(new HttpError("User or Event not Found", 404));
    }

    if (user.asistedEvents.includes(eventId)) {
      return next(
        new HttpError("User is already inscribed to this event", 400)
      );
    }

    const existingAssistant = await Asistant.findOne({ email: req.body.email });

    if (
      existingAssistant &&
      existingAssistant.assistedEvents.includes(eventId)
    ) {
      return next(
        new HttpError(
          `${existingAssistant.name} is already inscribed to this event.`,
          400
        )
      );
    }

    const newAssistant = new Asistant({
      name: req.body.name,
      email: req.body.email,
    });
    newAssistant.assistedEvents.push(event._id);

    await newAssistant.save();
    event.participants.push(newAssistant._id);
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { asistedEvents: eventId },
      },
      { new: true }
    );
    const updatedEvent = await event.save();

    return res.status(200).json({
      message: `${newAssistant.name} confirmed assistance in ${updatedEvent?.title}`,
    });
  } catch (error) {
    return next(new HttpError(error));
  }
};
const editEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, ubication, date, sport, difficulty } = req.body;

    const existingEvent = await Event.findById(id);

    if (existingEvent?.eventImage && req.file) {
      deleteImgCloudinary(existingEvent.eventImage);
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title,
        date,
        sport,
        ubication,
        difficulty,
        eventImage: req.file ? req.file.path : "No Event image",
      },
      {
        new: true,
      }
    );
    return res.status(200).json(updatedEvent);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (event?.eventImage) {
      deleteImgCloudinary(event.eventImage);
    }
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    return next(new HttpError(error));
  }
};

const deleteAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    for (const event of events) {
      await Event.findByIdAndDelete(event._id);
      if (event.eventImage) {
        deleteImgCloudinary(event.eventImage);
      }
    }
    return res.status(200).json({ message: "All Events deleted successfully" });
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  getAllEventAsistants,
  getFilteredEvents,
  postEvent,
  inscribeToEvent,
  editEvent,
  deleteEventById,
  deleteAllEvents,
};
