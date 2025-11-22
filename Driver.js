const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus" },
  present: { type: Boolean, default: false },
});

module.exports = mongoose.model("Driver", driverSchema);
