const express = require("express");

require("dotenv").config();

const mongoose = require("mongoose");

const helmet = require("helmet");

const cors = require("cors");

const { errors } = require("celebrate");

const errorHandler = require("./middlewares/errorHandler");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const router = require("./routes/index");

const limiter = require("./utils/rateLimit");

const { PORT = 3002 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/MIST")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(requestLogger);
app.use(limiter);
app.use("/", router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
