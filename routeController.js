const Route = require("../models/Route");

exports.getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching routes" });
  }
};

exports.createRoute = async (req, res) => {
  try {
    const { name, stops } = req.body;
    const route = await Route.create({ name, stops });
    res.status(201).json(route);
  } catch (err) {
    res.status(400).json({ message: "Error creating route" });
  }
};
