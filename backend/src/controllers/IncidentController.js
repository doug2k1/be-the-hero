const crypto = require("crypto");
const connection = require("../database/connection");

const PAGE_SIZE = 6;

module.exports = {
  async list(req, res) {
    const ngoId = req.headers.authorization;

    // FIXME: refactor into middleware
    if (!ngoId) {
      res.status(403).send();
    }

    const { page = 1 } = req.query;

    const [count] = await connection("incidents").count();
    const incidents = await connection("incidents")
      .where("ngoId", ngoId)
      .join("ngos", "ngos.id", "=", "incidents.ngoId")
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE)
      .select([
        "incidents.*",
        "ngos.name",
        "ngos.email",
        "ngos.whatsapp",
        "ngos.city",
        "ngos.state"
      ]);

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
