const jwt = require('jsonwebtoken');

const {generateAccessToken} = require('../helpers/token');

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
