const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stops: [{ type: String, required: true }],
});

module.exports = mongoose.model("Route", routeSchema);
