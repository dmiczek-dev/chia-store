const jwt = require('jsonwebtoken');
const { getClient } = require('../db/config')

exports.getPermissions = (req, res) => {
    const client = getClient();
    const token = req.cookies.JWT
    const payload = jwt.decode(token);

    client.query("SELECT * FROM permissions").then((result) => {
        res.status(200).send(result.rows);
    }).catch((err) => {
        res.status(500).send({ error: err })
    })
}