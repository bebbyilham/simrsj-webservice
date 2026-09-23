require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const antreanRouter = require("./routes/antrean");
const bpjsRouter = require("./routes/bpjs");
const pasienRouter = require("./routes/pasien");
const poliRouter = require("./routes/poli");
const pendaftaranRouter = require("./routes/pendaftaran");
const dokterRouter = require("./routes/dokter");

const refreshTokensRouter = require("./routes/refreshTokens");
const tarifRouter = require("./routes/tarif");

const verifyToken = require("./middleware/verifyToken");
const can = require("./middleware/permission");

const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "500mb" })); //limit 500mb
app.use(express.urlencoded({ extended: false, limit: "500mb" })); //limit 500mb
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors("*"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
// Alias route get token standar BPJS (mencegah kendala perbedaan endpoint web service di BPJS vs RS)
app.use("/token", usersRouter);
app.use("/auth", usersRouter);
app.use("/refresh-tokens", refreshTokensRouter);
app.use("/antrean", verifyToken, can("admin", "bpjs"), antreanRouter);
app.use("/pasien", pasienRouter);
app.use("/bpjs", bpjsRouter);
app.use("/poli", poliRouter);
app.use("/pendaftaran", pendaftaranRouter);
app.use("/dokter", dokterRouter);
app.use("/tarif", tarifRouter);

// Global Error Handler agar tidak pernah mereturn status selain 200/201 atau HTML error
app.use((err, req, res, next) => {
  return res.status(200).json({
    metadata: {
      message: "Server RS Bermasalah: " + (err.message || "Internal Server Error"),
      code: 201,
    },
  });
});

module.exports = app;
