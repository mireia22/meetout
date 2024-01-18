const mongoose = require("mongoose");
const { formatDate, formatTimeAgo } = require("../../utils/formatDates");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String },
    ubication: { type: String },
    sport: { type: String },
    description: { type: String },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "user" },
    eventImage: { type: String, trim: true },
    difficulty: { type: String, trim: true },
    participants: [{ type: mongoose.Schema.ObjectId, ref: "asistant" }],
  },
  {
    timestamps: true,
  }
);

eventSchema.pre("save", function (next) {
  if (this.date) {
    this.date = formatDate(this.date);
  }
  if (this.createdAt) {
    this.createdAt = formatTimeAgo(this.createdAt);
  }
  next();
});

const Event = mongoose.model("event", eventSchema, "event");

module.exports = Event;
