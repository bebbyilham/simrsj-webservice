const apiAdapter = require("../../apiAdapter");
const errorHandler = require("../errorHandler");
const { URL_SERVICE_ANTREAN } = process.env;

const api = apiAdapter(URL_SERVICE_ANTREAN);

module.exports = async (req, res) => {
  try {
    const dokter = await api.get("/api/dokterbpjs", {
      headers: req.headers,
    });
    return res.json(dokter.data);
  } catch (error) {
    return errorHandler(error, res);
  }
};