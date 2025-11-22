const express = require("express");
const router = express.Router();
const {
  getBuses,
  createBus,
  updateBusLocation,
} = require("../controllers/busController");

router.get("/", getBuses);
router.post("/", createBus);
router.post("/location-update", updateBusLocation);

module.exports = router;
