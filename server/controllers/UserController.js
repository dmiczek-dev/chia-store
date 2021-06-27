const jwt = require('jsonwebtoken');
const { getClient } = require('../db/config')

exports.getPermissions = (req, res) => {
    const client = getClient();
    const token = req.cookies.JWT
    const payload = jwt.decode(token);

    if (!validateAdminPermission(payload)) {
        res.status(403).send({ error: 'Unauthorized request' })
        return;
    }

    client.query("SELECT * FROM permissions").then((result) => {
        res.status(200).send(result.rows);
    }).catch((err) => {
        res.status(500).send({ error: err })
    })
}