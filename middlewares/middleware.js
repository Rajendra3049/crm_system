const jwt = require("jsonwebtoken");

async function employeeAuth(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "crm", function (err, decoded) {
      if (err) {
        // Error during token verification
        if (err.name === "TokenExpiredError") {
          return res.status(401).send({ msg: "Token expired" });
        } else {
          return res.status(401).send({ msg: "Invalid token" });
        }
      }

      req.body.employeeID = decoded.employeeID;
      next();
    });
  } else {
    res.status(401).send({ msg: "You are not authorized, Please login" });
  }
}

module.exports = { employeeAuth };
