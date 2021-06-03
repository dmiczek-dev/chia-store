const jwt = require('jsonwebtoken');

const {generateAccessToken} = require('../helpers/auth');

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // validate user

  const accessToken = generateAccessToken({data: 1});
  const refreshToken = jwt.sign({data: 1}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: 525600});
  // Save refresh Token in DB?

  res.cookie('JWT', accessToken, {
    maxAge: 86400000,
    httpOnly: true,
  });

  res.send({accessToken, refreshToken});
};

exports.register = (req, res) => {

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
