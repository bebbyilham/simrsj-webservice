const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_ANTREAN } = process.env;

//variabel  panggil adapter dg parameter base_url
const api = apiAdapter(URL_SERVICE_ANTREAN);

//integrasi api gateway get media
module.exports = async (req, res) => {
  try {
    const dokter = await api.get("/api/pendaftaranonline/jenislayanan");
    return res.json(dokter.data);
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      return res.status(status).json(data);
    }
    return res.status(500).json({ status: "error", message: error.message || "internal server error" });
  }
};
