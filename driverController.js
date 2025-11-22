const Driver = require("../models/Driver");
const Bus = require("../models/Bus");

exports.getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().populate("bus");
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching drivers" });
  }
};

exports.createDriver = async (req, res) => {
  try {
    const { name, busId } = req.body;
    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    const driver = await Driver.create({ name, bus: busId });
    res.status(201).json(driver);
  } catch (err) {
    res.status(400).json({ message: "Error creating driver" });
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const { driverId, present } = req.body;

    const driver = await Driver.findById(driverId);
    if (!driver) return res.status(404).json({ message: "Driver not found" });

    driver.present = present;
    await driver.save();

    res.json({ message: "Attendance updated", driver });
  } catch (err) {
    res.status(400).json({ message: "Error updating attendance" });
  }
};
