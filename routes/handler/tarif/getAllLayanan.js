const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_ANTREAN } = process.env;

const api = apiAdapter(URL_SERVICE_ANTREAN);

module.exports = async (req, res) => {
  try {
    const layanan = await api.get("/api/tarif/layanan");
    return res.json(layanan.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
    }

    if (error.response) {
      const { status, data } = error.response;
      return res.status(status).json(data);
    }

    return res.status(500).json({ status: "error", message: error.message });
  }
};
