const jwt = require('jsonwebtoken');
// const apiAdapter = require('../../apiAdapter');
const { JWT_SECRET, URL_SERVICE_USER } = process.env;

// const api = apiAdapter(URL_SERVICE_USER);


module.exports = async (req, res, next) => {
    const username = req.headers['x-username'];
    const token = req.headers['x-token'] || req.headers.authorization;

    if (!token) {
        return res.status(200).json({
            metadata: {
                message: "Token tidak boleh kosong (Header x-token wajib ada)",
                code: 201,
            },
        });
    }

    // Jika token dikirim dengan format 'Bearer <token>'
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    jwt.verify(cleanToken, JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.status(200).json({
                metadata: {
                    message: "Token Expired / Tidak Valid",
                    code: 201,
                },
            });
        }

        if (username && username !== 'bpjs' && username !== 'admin') {
            return res.status(200).json({
                metadata: {
                    message: "Username Tidak Sesuai",
                    code: 201,
                },
            });
        }

        req.user = decoded;
        return next();
    });
};