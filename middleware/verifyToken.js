const jwt = require('jsonwebtoken');
// const apiAdapter = require('../../apiAdapter');
const { JWT_SECRET, URL_SERVICE_USER } = process.env;

// const api = apiAdapter(URL_SERVICE_USER);


module.exports = async (req, res, next) => {
    
    const username = req.headers['x-username'];
    const token = req.headers['x-token'];
    // const token = req.headers.authorization;
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
        
        if (err) {
            return res.status(403).json({ message: err.message });
        }
        if (username!='bpjs' && username!='admin') {
            return res.status(403).json({ message: "username tidak terdaftar" });
        }
        req.user = decoded;
        return next();
    });
}