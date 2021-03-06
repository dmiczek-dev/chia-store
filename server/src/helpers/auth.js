const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.generateAccessToken = function (payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 86400 }); // 86400
};

exports.generateResetToken = function (payload) {
  return jwt.sign(payload, process.env.RESET_PASSWORD_SECRET, {
    expiresIn: 86400,
  });
};

exports.hashPassword = async function (plainText) {
  return await new Promise((resolve, reject) => {
    bcrypt.hash(plainText, 10, function (err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

exports.decryptToken = function (token) {
  jwt.verify(token, process.env.RESET_PASSWORD_SECRET, (err, payload) => {
    return payload;
  });
};
