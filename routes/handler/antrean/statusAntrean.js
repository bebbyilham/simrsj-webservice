const apiAdapter = require("../../apiAdapter");
const errorHandler = require("../errorHandler");
const { URL_SERVICE_ANTREAN } = process.env;

const api = apiAdapter(URL_SERVICE_ANTREAN);

module.exports = async (req, res) => {
  try {
    const antrean = await api.post("/api/antrean/statusantrean", req.body, {
      headers: req.headers,
    });
    return res.json(antrean.data);
  } catch (error) {
    return errorHandler(error, res);
  }
};
