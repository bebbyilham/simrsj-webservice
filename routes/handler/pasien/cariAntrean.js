const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_ANTREAN } = process.env;

//variabel  panggil adapter dg parameter base_url
const api = apiAdapter(URL_SERVICE_ANTREAN);

//integrasi api gateway pasien cek
module.exports = async (req, res) => {
  try {
    const norm = req.params.norm;
    const tanggalperiksa = req.params.tanggalperiksa;
    const antrean = await api.get(`/api/antrean/${norm}/${tanggalperiksa}`);
    return res.json(antrean.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
