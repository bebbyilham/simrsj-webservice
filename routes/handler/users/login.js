const apiAdapter = require('../../apiAdapter');
const jwt = require('jsonwebtoken');
const {
    URL_SERVICE_USER,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env;

//variabel  panggil adapter dg parameter base_url
const api = apiAdapter(URL_SERVICE_USER);


//integrasi api gateway create/post user
module.exports = async(req, res) => {
    try {
        const user = await api.post('/users/login', req.body);
        const data = user.data.data;

        const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });
        const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED });

        //ketika telah berhasil membuat token dan refreshtoken
        //maka refreshtoken akan tersimpan di tabel refreshtoken yang berada di SERVICE USER
        //berikut cara memanggilnya
        await api.post('/refresh_tokens', { refresh_token: refreshToken, user_id: data.id });

        //setelah kedua token tersimpan
        //memberi respon ke fontend agar bisa digunakan oleh frontend
        return res.json({
            status: 'success',
            data: {
                token,
                refresh_token: refreshToken,
                username:data.username
            }
        });

        return res.json(user.data);
    } catch (error) {

        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', messaga: 'service unavailable' });
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}