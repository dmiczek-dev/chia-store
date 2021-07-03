const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { generateAccessToken, hashPassword, decodeToken } = require('../helpers/auth');
const { getClient } = require('../db/config')

exports.login = (req, res) => {
  const client = getClient();
  const username = req.body.username;
  const password = req.body.password;

  client
    .query('SELECT * FROM users WHERE username = $1', [username])
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(401).send({
          message: 'Invalid username or password'
        });
      } else {
        let userFromDB = result.rows[0];

        client.query('SELECT * FROM permissions WHERE permission_id = $1', [userFromDB.permission_id]).then((result) => {
          bcrypt.compare(password, userFromDB.password, (err, isValid) => {
            if (isValid) {
              const permission = result.rows[0].name
              const accessToken = generateAccessToken({ userId: userFromDB.user_id, permission: permission });
              const refreshToken = jwt.sign({ userId: userFromDB.user_id, permission: permission }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 525600 });

              //TODO: Save refresh Token in DB
              client
                .query('UPDATE users SET jwt_refresh = $1 WHERE user_id = $2', [refreshToken, userFromDB.user_id])
                .then(() => {
                  res.cookie('refreshToken', refreshToken, {
                    maxAge: 86400000,
                    httpOnly: true,
                  });

                  res.status(200).send({ accessToken });
                })
            } else {
              res.status(401).send({
                message: 'Invalid username or password'
              });
            }
          })
        })
      }
    }).catch((err) => {
      res.status(500).send({
        message: 'Something went wrong',
        detailed_message: err,
      });
      console.error(err);
    });
};

exports.register = async (req, res) => {
  const client = getClient();
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const hashedPassword = await hashPassword(password)
  const permissionId = '2' // permissionId = 2 (User)

  client.query('SELECT username, email FROM users WHERE username = $1 OR email = $2', [username, email]).then((result) => {
    if (result.rowCount === 0) {
      client
        .query('INSERT INTO users(user_id, username, password, email, active, jwt_refresh, deleted, permission_id) VALUES (DEFAULT, $1, $2, $3, TRUE, NULL, FALSE, $4)', [username, hashedPassword, email, permissionId]).then(() => {
          res.status(200).send({ message: 'User registered successfully' });
        }).catch((err) => {
          res.status(500).send({ error: err })
        })
    } else {
      res.status(400).send({ error: 'Username or email taken' })
    }
  }).catch((err) => {
    res.status(500).send({ error: err })
  });

};

exports.createAccount = async (req, res) => {
  const payload = decodeToken(req);

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

exports.logout = (req, res) => {
  const client = getClient();
  const payload = decodeToken(req);

  client.query('UPDATE users SET jwt_refresh = null WHERE user_id = $1', [payload.userId]).then(() => {
    res.status(200).send({ message: 'User logout successfully' });
  }).catch((err) => {
    res.status(500).send({ error: err })
  })
}

exports.refreshToken = (req, res) => {
  //TODO: Generate new refreshToken? Validate access token before generate new access?
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401)
  }
  //TODO Check if refreshToken exists in DB
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403)
    //TODO: Check if refreshToken payload is correct, should be the same as access
    const accessToken = generateAccessToken(payload)
    res.send({ accessToken })
  })
}
