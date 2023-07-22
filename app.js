require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { errors } = require("celebrate");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlwares/logger");
const router = require("./routes");
const GlobalError = require("./middlwares/GlobalError");
const appLimiter = require("./settings/settingsLimiter");
const { PORT, WEB_HOST, HOST, NODE_ENV } = require("./settings/settingsWeb");

const app = express();
mongoose.connect(NODE_ENV === "production" ? HOST : WEB_HOST, {
  useNewUrlParser: true,
});
app.use(cors());
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});
app.use(requestLogger);
app.use(appLimiter);
app.use(helmet());
app.use(express.json());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(GlobalError);
app.listen(PORT, () => {
  console.log(`Сервер запущен на port ${PORT}`);
});
