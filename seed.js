require("dotenv").config();
const connectDB = require("./config/db");

const Route = require("./models/Route");
const Bus = require("./models/Bus");
const Driver = require("./models/Driver");
const Booking = require("./models/Booking");

const run = async () => {
  try {
    await connectDB();

    console.log("🔄 Clearing old data...");
    await Promise.all([
      Route.deleteMany({}),
      Bus.deleteMany({}),
      Driver.deleteMany({}),
      Booking.deleteMany({}),
    ]);

    console.log("🛣️  Inserting routes...");
    const routes = await Route.insertMany([
      {
        name: "Route 1: Ghogha Circle - Waghawadi Road",
        stops: ["Ghogha Circle", "Panwadi", "Kaliabid", "Waghawadi Road"],
      },
      {
        name: "Route 2: ST Stand - Hill Drive",
        stops: ["ST Stand", "Kalanala", "Chitra", "Hill Drive"],
      },
      {
        name: "Route 3: Bhavnagar University - Takhteshwar",
        stops: ["University", "Digjam Circle", "Sanskar Mandal", "Takhteshwar"],
      },
    ]);

    console.log("🚍 Inserting buses...");
    const buses = await Bus.insertMany([
      {
        route: routes[0]._id,
        lat: 21.764,
        lng: 72.151,
        status: "RUNNING",
        speedKmph: 28,
        lastServiceKm: 12000,
        currentKm: 17250,
      },
      {
        route: routes[1]._id,
        lat: 21.771,
        lng: 72.139,
        status: "RUNNING",
        speedKmph: 22,
        lastServiceKm: 9000,
        currentKm: 12300,
      },
      {
        route: routes[2]._id,
        lat: 21.770,
        lng: 72.156,
        status: "IDLE",
        speedKmph: 0,
        lastServiceKm: 15000,
        currentKm: 16000,
      },
    ]);

    console.log("👨‍✈️ Inserting drivers...");
    const drivers = await Driver.insertMany([
      {
        name: "Ramesh Patel",
        bus: buses[0]._id,
        present: true,
      },
      {
        name: "Vijay Singh",
        bus: buses[1]._id,
        present: false,
      },
      {
        name: "Amit Shah",
        bus: buses[2]._id,
        present: true,
      },
    ]);

    console.log("🎫 Inserting sample bookings...");
    await Booking.insertMany([
      {
        userName: "Test User 1",
        route: routes[0]._id,
        fromStop: "Ghogha Circle",
        toStop: "Waghawadi Road",
      },
      {
        userName: "Test User 2",
        route: routes[1]._id,
        fromStop: "ST Stand",
        toStop: "Hill Drive",
      },
    ]);

    console.log("✅ Seeding done!");
    console.log("Routes:", routes.length);
    console.log("Buses:", buses.length);
    console.log("Drivers:", drivers.length);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};

run();
