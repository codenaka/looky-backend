const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const AppError = require("./utils/appError");

const ingredientRouter = require("./routes/ingredients");
const recipeRouter = require("./routes/recipes");

const app = express();

// cors
app.use(cors());

// set security HTTP headers
app.use(helmet());

// logging
app.use(morgan("dev"));

// body parser, reading data body from body into req.body
app.use(express.json());

app.use("/api/v1/ingredients", ingredientRouter);
app.use("/api/v1/recipes", recipeRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
