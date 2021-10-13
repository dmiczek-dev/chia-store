const jwt = require("jsonwebtoken");

exports.authenticate = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.payload = payload;
    next();
  });
};

exports.checkRefreshToken = function (req, res, next) {
  const token = req.cookies.refreshToken;

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.payload = payload;
    next();
  });
};
