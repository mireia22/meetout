const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
    siteImg: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const Site = mongoose.model("site", siteSchema, "site");

module.exports = Site;
