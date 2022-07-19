const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, "SomeSecreteKey", (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        next();
      }
    });
  } else {
    // Forbidden
    res.sendStatus(401);
  }
};

exports.getTokenData = async (token) => {
  return new Promise((res, rej) => {
    jwt.verify(token, 'SomeSecreteKey', function (err, decoded) {
      if (!err) {
        res(decoded);
      } else {
        rej(err);
      }
    });
  });
};
