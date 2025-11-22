const express = require("express");
const router = express.Router();
const { getRoutes, createRoute } = require("../controllers/routeController");

router.get("/", getRoutes);
router.post("/", createRoute);

module.exports = router;
