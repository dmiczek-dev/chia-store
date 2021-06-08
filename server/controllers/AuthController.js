const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { generateAccessToken, hashPassword } = require('../helpers/auth');
const { getClient } = require('../db/config')

exports.login = (req, res) => {
  const client = getClient();
  const username = req.body.username;
  const password = req.body.password;

  // validate user
  client
    .query('SELECT * FROM users WHERE username = $1', [username])
    .then((result) => {
      console.log(result.rows.length);
      if (result.rows.length === 0) {
        res.status(401).send({
          message: 'Invalid username or password'
        });
      } else {
        let userFromDB = result.rows[0];
        bcrypt.compare(password, userFromDB.password, (err, isValid) => {
          if (isValid) {

            const accessToken = generateAccessToken({ userId: userFromDB.user_id });
            const refreshToken = jwt.sign({ userId: userFromDB.user_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 525600 });

            // Save refresh Token in DB
            client
              .query('UPDATE credentials SET jwt_refresh = $1 WHERE user_id = $2', [refreshToken, userFromDB.user_id])
              .then(() => {
                res.cookie('JWT', accessToken, {
                  maxAge: 86400000,
                  httpOnly: true,
                });

                res.status(200).send({ accessToken, refreshToken });
              })
          } else {
            res.status(401).send({
              message: 'Invalid username or password'
            });
          }
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

exports.logout = (req, res) => {
  const client = getClient();
  const token = req.cookies.JWT;
  const payload = jwt.decode(token);

  client.query('UPDATE users SET jwt_refresh = null WHERE user_id = $1', [payload.userId]).then(() => {
    res.status(200).send();
  }).catch((err) => {
    res.status(500).send({ error: err })
  })
}

exports.register = async (req, res) => {
  const client = getClient();
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const hashedPassword = await hashPassword(password)

  client
    .query('INSERT INTO users(user_id, username, password, email, active, jwt_refresh, deleted) VALUES (DEFAULT, $1, $2, $3, TRUE, NULL, FALSE)', [username, hashedPassword, email]).then(() => {
      res.status(200).send();
    }).catch((err) => {
      res.status(500).send({ error: err })
    })
};

exports.refreshToken = (req, res) => {
  const refreshToken = req.body.token

  if (!refreshToken) {
    return res.status(401)
  }

  // Check if refreshToken exists in DB

  const validToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

  if (!validToken) {
    return res.status(403)
  }

  const accessToken = generateAccessToken({ id: 1 })

  res.send({ accessToken })
}
