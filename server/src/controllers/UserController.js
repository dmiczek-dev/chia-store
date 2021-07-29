const { getClient } = require('../db/config')

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