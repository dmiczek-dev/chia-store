const { getClient } = require("../db/config");

exports.getStats = (req, res) => {
  const client = getClient();

  client
    .query("SELECT * FROM statistics ORDER BY date DESC LIMIT 1")
    .then((result) => res.status(200).send(result.rows))
    .catch((err) => res.status(500).send(err));
};
