const { getClient } = require('../db/config')
const { hashPassword } = require('../helpers/auth');

exports.getPermissions = (req, res) => {
    const client = getClient();

    client.query("SELECT * FROM permissions").then((result) => {
        res.status(200).send(result.rows);
    }).catch((err) => {
        res.status(500).send({ error: err })
    })
}

exports.createAccount = async (req, res) => {

    const client = getClient();
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const hashedPassword = await hashPassword(password)
    const permissionId = req.body.permissionId

    client
        .query('INSERT INTO users(user_id, username, password, email, active, jwt_refresh, deleted, permission_id) VALUES (DEFAULT, $1, $2, $3, TRUE, NULL, FALSE, $4)', [username, hashedPassword, email, permissionId]).then(() => {
            res.status(200).send({ message: 'User registered successfully' });
        }).catch((err) => {
            res.status(500).send({ error: err })
        })

};

exports.getUsers = (req, res) => {
    const client = getClient();

    client.query('SELECT * FROM users_view').then((result) => {
        res.status(200).send(result.rows);
    }).catch((err) => {
        res.status(500).send({ error: err })
    })
}

exports.getUserById = (req, res) => {
    const client = getClient();
    const userId = req.payload.userId;

    client.query('SELECT username, email FROM users_view WHERE user_id = $1', [userId]).then((result) => {
        res.status(200).send(result.rows);
    }).catch((err) => {
        res.status(500).send({ error: err })
    })
}

exports.toggleUserById = (req, res) => {
    const client = getClient();
    const userId = req.body.userId;
    const active = req.body.active;

    client.query('UPDATE users SET active = $1 WHERE user_id = $2', [active, userId])
        .then(() => res.status(200).send())
        .catch((err) => res.status(500).send(err))
}

exports.changePassword = async (req, res) => {
    const client = getClient();
    const payload = req.payload;
    const password = req.body.password;
    const hashedPassword = await hashPassword(password)

    client.query('UPDATE users SET password = $1 WHERE user_id = $2', [hashedPassword, payload.userId])
        .then(() => res.status(200).send())
        .catch((err) => res.status(500).send(err))
}

exports.changeEmail = (req, res) => {
    const client = getClient();
    const payload = req.payload;
    const email = req.body.email;

    client.query('UPDATE users SET email = $1 WHERE user_id = $2', [email, payload.userId])
        .then(() => res.status(200).send())
        .catch((err) => res.status(500).send(err))
}