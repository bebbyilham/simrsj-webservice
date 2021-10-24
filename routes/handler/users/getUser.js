const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_USER
} = process.env;

//variabel  panggil adapter dg parameter base_url
const api = apiAdapter(URL_SERVICE_USER);


//integrasi api gateway create/post user
module.exports = async(req, res) => {
    try {
        const id = req.user.data.id;
        const user = await api.get(`/users/${id}`);
        return res.json(user.data);
    } catch (error) {

        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', messaga: 'service unavailable' });
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}