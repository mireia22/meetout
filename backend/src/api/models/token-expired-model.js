const mongoose = require("mongoose");

const tokenExpired = new mongoose.Schema(
  {
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

const TokenExpired = mongoose.model(
  "token-expired",
  tokenExpired,
  "token-expired"
);

module.exports = TokenExpired;
