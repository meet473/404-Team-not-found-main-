const Bus = require("../models/Bus");
const Route = require("../models/Route");
const { predictArrivalTime, checkMaintenance } = require("../utils/aiUtils");

exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.find().populate("route");

    const distanceKm = 5;

    const data = buses.map((b) => {
      const etaMinutes = predictArrivalTime(distanceKm, b.speedKmph);
      const maintenanceStatus = checkMaintenance(b.lastServiceKm, b.currentKm);

      return {
        id: b._id,
        routeName: b.route ? b.route.name : "Unknown",
        routeId: b.route ? b.route._id : null,
        lat: b.lat,
        lng: b.lng,
        status: b.status,
        speedKmph: b.speedKmph,
        etaMinutes,
        maintenanceStatus,
      };
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching buses" });
  }
};

exports.createBus = async (req, res) => {
  try {
    const { routeId, lat, lng, speedKmph, status, lastServiceKm, currentKm } = req.body;

    const route = await Route.findById(routeId);
    if (!route) return res.status(404).json({ message: "Route not found" });

    const bus = await Bus.create({
      route: routeId,
      lat,
      lng,
      status,
      speedKmph,
      lastServiceKm,
      currentKm,
    });

    res.status(201).json(bus);
  } catch (err) {
    res.status(400).json({ message: "Error creating bus" });
  }
};

exports.updateBusLocation = async (req, res) => {
  try {
    const { busId, lat, lng, speedKmph, currentKm } = req.body;

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    if (lat !== undefined) bus.lat = lat;
    if (lng !== undefined) bus.lng = lng;
    if (speedKmph !== undefined) bus.speedKmph = speedKmph;
    if (currentKm !== undefined) bus.currentKm = currentKm;

    await bus.save();
    res.json({ message: "Bus location updated", bus });
  } catch (err) {
    res.status(400).json({ message: "Error updating bus location" });
  }
};
