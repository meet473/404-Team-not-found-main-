const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
  lat: { type: Number, default: 0 },
  lng: { type: Number, default: 0 },
  status: { type: String, default: "RUNNING" },
  speedKmph: { type: Number, default: 0 },
  lastServiceKm: { type: Number, default: 0 },
  currentKm: { type: Number, default: 0 },
});

module.exports = mongoose.model("Bus", busSchema);
