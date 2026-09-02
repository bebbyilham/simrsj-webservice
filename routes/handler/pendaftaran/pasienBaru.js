const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_ANTREAN } = process.env;

//variabel  panggil adapter dg parameter base_url
const api = apiAdapter(URL_SERVICE_ANTREAN);

//integrasi api gateway pasien baru
module.exports = async (req, res) => {
  try {
    const pendaftaran = await api.post("/api/pendaftaranonline/pasienbaru", req.body);
    return res.json(pendaftaran.data);
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      return res.status(status).json(data);
    }
    return res.status(500).json({ status: "error", message: error.message || "internal server error" });
  }
};
