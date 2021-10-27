const express = require("express");
const router = express.Router();

const antreanHandler = require("./handler/antrean");

const verifyToken = require("../middleware/verifyToken");
const can = require("../middleware/permission");

// router.get("/", antreanHandler.getAll);
// router.get("/:id", antreanHandler.get);

router.post("/",verifyToken,can("admin", "bpjs"),antreanHandler.ambilAntrean);

module.exports = router;
