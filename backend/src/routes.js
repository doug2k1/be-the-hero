const express = require("express");
const NgoController = require("./controllers/NgoController");
const IncidentController = require("./controllers/IncidentController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

// NGOs
routes.get("/ngos", NgoController.list);
routes.post("/ngos", NgoController.create);

// Incidents
routes.get("/incidents", IncidentController.list);
routes.post("/incidents", IncidentController.create);
routes.delete("/incidents/:id", IncidentController.delete);

// Sessions
routes.post("/sessions", SessionController.create);

module.exports = routes;
