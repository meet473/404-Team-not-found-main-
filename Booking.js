const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
    fromStop: { type: String, required: true },
    toStop: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
