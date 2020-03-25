const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
  async list(req, res) {
    const ngos = await connection("ngos").select("*");

    return res.json(ngos);
  },

  async create(req, res) {
    // avoid unwanted data sent by post
    const { name, email, whatsapp, city, state } = req.body;
    const id = crypto.randomBytes(4).toString("HEX");

    await connection("ngos").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      state
    });

    return res.json({ id });
  }
};
