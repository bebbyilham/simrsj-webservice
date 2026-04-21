const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_ANTREAN } = process.env;

//variabel  panggil adapter dg parameter base_url
const api = apiAdapter(URL_SERVICE_ANTREAN);

//integrasi api gateway info tempat tidur
module.exports = async (req, res) => {
  try {
    const info = await api.get("/api/antrean/infotempattidur");
    return res.json(info.data);
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
