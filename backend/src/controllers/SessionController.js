const connection = require("../database/connection");

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    const ngo = await connection("ngos")
      .where("id", id)
      .select("name")
      .first();

    if (!ngo) {
      return res
        .status(400)
        .json({ error: `No NGO found with the id '${id}'` });
    }

    return res.json(ngo);
  }
};
