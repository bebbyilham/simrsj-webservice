require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const refreshTokensRouter = require("./routes/refreshTokens");

const verifyToken = require("./middleware/verifyToken");
const can = require("./middleware/permission");

const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" })); //limit 50mb
app.use(express.urlencoded({ extended: false, limit: "50mb" })); //limit 50mb
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors("*"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use("/media", verifyToken, can("admin", "student"), mediaRouter);
app.use("/refresh-tokens", refreshTokensRouter);

module.exports = app;
