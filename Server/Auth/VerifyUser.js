const { verifyToken } = require("../Utils/JWT");

function authMiddleware(req, res, next) {
  const token = req.cookies.token; // read token from cookie

  if (!token) {
    return res.status(401).json({ error: "No token found in cookies" });
  }

  const result = verifyToken(token);

  if (!result.valid) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.user = result.id; // attach user ID to request
  next();
}

module.exports = authMiddleware;
