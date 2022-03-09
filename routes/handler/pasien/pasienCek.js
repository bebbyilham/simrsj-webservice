const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_ANTREAN } = process.env;

//variabel  panggil adapter dg parameter base_url
const api = apiAdapter(URL_SERVICE_ANTREAN);

//integrasi api gateway pasien baru
module.exports = async(req, res) => {
    try {
        const id = req.params.id;
        const pasien = await api.get(`/api/pasiens/${id}`);
        return res.json(pasien.data);
    } catch (error) {

        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}
