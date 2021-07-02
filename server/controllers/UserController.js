const jwt = require('jsonwebtoken');
const { getClient } = require('../db/config')
const { decodeToken } = require('../helpers/auth');

exports.getPermissions = (req, res) => {
    const client = getClient();

    client.query("SELECT * FROM permissions").then((result) => {
        res.status(200).send(result.rows);
    }).catch((err) => {
        res.status(500).send({ error: err })
    })
}