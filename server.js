require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const routeRoutes = require("./routes/routeRoutes");
const busRoutes = require("./routes/busRoutes");
const driverRoutes = require("./routes/driverRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/routes", routeRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Smart Bhavnagar Bus API is running 🚍");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
