const {  HOST, NODE_ENV, JWT_SECRET } = process.env;
const WEB_HOST = "mongodb://127.0.0.1:27017/bitfilmsdb";
const SECRET_DEV = "secret";
const PORT = 3000;
module.exports = {
  PORT,
  WEB_HOST,
  NODE_ENV,
  JWT_SECRET,
  HOST,
  SECRET_DEV,
};
