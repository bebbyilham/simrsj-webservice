const apiAdapter = require("../../apiAdapter");
const errorHandler = require("../errorHandler");
const { URL_SERVICE_ANTREAN } = process.env;

const api = apiAdapter(URL_SERVICE_ANTREAN);

module.exports = async (req, res) => {
  try {
    const info = await api.get("/api/antrean/infotempattidur", {
      headers: req.headers,
    });
    return res.json(info.data);
  } catch (error) {
    return errorHandler(error, res);
  }
};
