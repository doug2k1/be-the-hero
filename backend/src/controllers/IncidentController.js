const crypto = require("crypto");
const connection = require("../database/connection");

const WEB_PAGE_SIZE = 6;
const MOB_PAGE_SIZE = 10;

module.exports = {
  async list(req, res) {
    const ngoId = req.headers.authorization;
    const { page = 1 } = req.query;
    let count = 0;
    let incidents = [];

    if (ngoId) {
      [count] = await connection("incidents")
        .where("ngoId", ngoId)
        .count();

      incidents = await connection("incidents")
        .where("ngoId", ngoId)
        .join("ngos", "ngos.id", "=", "incidents.ngoId")
        .limit(WEB_PAGE_SIZE)
        .offset((page - 1) * WEB_PAGE_SIZE)
        .select([
          "incidents.*",
          "ngos.name",
          "ngos.email",
          "ngos.whatsapp",
          "ngos.city",
          "ngos.state"
        ]);
    } else {
      [count] = await connection("incidents").count();

      incidents = await connection("incidents")
        .join("ngos", "ngos.id", "=", "incidents.ngoId")
        .limit(MOB_PAGE_SIZE)
        .offset((page - 1) * MOB_PAGE_SIZE)
        .select([
          "incidents.*",
          "ngos.name",
          "ngos.email",
          "ngos.whatsapp",
          "ngos.city",
          "ngos.state"
        ]);
    }

    res.header("X-Total-Count", count["count(*)"]);

    return res.json(incidents);
  },

  async create(req, res) {
    // avoid unwanted data sent by post
    const { title, description, value } = req.body;
    const ngoId = req.headers.authorization;

    // FIXME: refactor into middleware
    if (!ngoId) {
      res.status(403).send();
    }

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ngoId
    });

    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const ngoId = req.headers.authorization;

    // FIXME: refactor into middleware
    if (!ngoId) {
      res.status(403).send();
    }

    const incident = await connection("incidents")
      .where("id", id)
      .select("ngoId")
      .first();

    if (!incident) {
      return res.status(404).send();
    }

    if (incident.ngoId !== ngoId) {
      return res.status(401).send();
    }

    await connection("incidents")
      .where("id", id)
      .delete();

    return res.status(204).send();
  }
};
