const apiAdapter = require("../../apiAdapter");
const errorHandler = require("../errorHandler");
const { URL_SERVICE_ANTREAN } = process.env;

const api = apiAdapter(URL_SERVICE_ANTREAN);

module.exports = async (req, res) => {
  try {
    const jadwaldokter = await api.get("/api/jadwaldokterbpjs", {
      headers: req.headers,
    });
    return res.json(jadwaldokter.data);
  } catch (error) {
    return errorHandler(error, res);
  }
};