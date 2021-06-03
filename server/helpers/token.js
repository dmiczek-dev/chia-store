const jwt = require('jsonwebtoken');

exports.generateAccessToken = function(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: 86400}); // 86400
};
