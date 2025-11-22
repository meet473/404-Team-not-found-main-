const Booking = require("../models/Booking");
const Route = require("../models/Route");

exports.createBooking = async (req, res) => {
  try {
    const { userName, routeId, fromStop, toStop } = req.body;

    const route = await Route.findById(routeId);
    if (!route) return res.status(404).json({ message: "Route not found" });

    const booking = await Booking.create({
      userName,
      route: routeId,
      fromStop,
      toStop,
    });

    res.status(201).json({ message: "Ticket booked", booking });
  } catch (err) {
    res.status(400).json({ message: "Error booking ticket" });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("route");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};
