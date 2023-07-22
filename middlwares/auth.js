const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require("../messageError/UnauthorizedError");
const { SECRET_DEV } = require("../settings/settingsWeb");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Необходима авторизация");
  }
  let payload;
  const token = authorization.replace("Bearer ", "");
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : SECRET_DEV
    );
  } catch (error) {
    next(new UnauthorizedError("Необходима авторизация"));
    return;
  }
  req.user = payload;
  next();
};

module.exports = auth;
