const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.generateAccessToken = function (payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 30 }); // 86400
};

exports.hashPassword = async function (plainText) {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(plainText, 10, function (err, result) {
      if (err) { reject(err) }
      resolve(result)
    })
  })
  return hashedPassword
}


//TODO: replace with authenticate middleware
exports.decodeToken = function (req) {
  const token = req.cookies.JWT;
  if (token) {
    return jwt.decode(token);
  }
}
