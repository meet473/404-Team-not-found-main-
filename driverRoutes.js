const express = require("express");
const router = express.Router();
const {
  getDrivers,
  createDriver,
  markAttendance,
} = require("../controllers/driverController");

router.get("/", getDrivers);
router.post("/", createDriver);
router.post("/attendance", markAttendance);

module.exports = router;
