const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_ANTREAN } = process.env;

//variabel  panggil adapter dg parameter base_url
const api = apiAdapter(URL_SERVICE_ANTREAN);

//integrasi api gateway pasien baru
module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const tlahir = req.params.tlahir;
    const url = tlahir ? `/api/pasiens/${id}/${tlahir}` : `/api/pasiens/${id}`;
    const pasien = await api.get(url);
    return res.json(pasien.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
    }

    const { status, data } = error.response || { status: 500, data: { status: "error", message: "Error" } };
    return res.status(status).json(data);
  }
};
