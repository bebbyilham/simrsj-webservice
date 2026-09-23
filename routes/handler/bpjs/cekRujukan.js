const apiAdapter = require("../../apiAdapter");
const errorHandler = require("../errorHandler");
const { URL_SERVICE_ANTREAN } = process.env;

const api = apiAdapter(URL_SERVICE_ANTREAN);

module.exports = async (req, res) => {
  try {
    const bpjs = await api.post("/api/rujukan/cekrujukan", req.body, {
      headers: req.headers,
    });
    return res.json(bpjs.data);
  } catch (error) {
    return errorHandler(error, res);
  }
};
