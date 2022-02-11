const jwt = require("jsonwebtoken");
const apiAdapter = require("../../apiAdapter");
const {
  URL_SERVICE_ANTREAN,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;

//variabel  panggil adapter dg parameter base_url
const api = apiAdapter(URL_SERVICE_ANTREAN);

//integrasi api gateway create/post user
module.exports = async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    const username = req.body.username;

    //pengecekan refreshtoken dan username pada frontend
    if (!refreshToken || !username) {
      return res.status(400).json({
        status: "error",
        message: "invalid token",
      });
    }

    //pengecekan refreshtoken pada database
    //yg memerlukan service user
    await api.get("/api/refresh_tokens", {
      params: { refresh_token: refreshToken },
    });

    //verifikasi refreshtoken valid atau kadaluarsa
    jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          status: "error",
          message: err.message,
        });
      }
      //verifikasi username valid
      if (username !== decoded.data.username) {
        return res.status(400).json({
          status: "error",
          message: "username is not valid",
        });
      }
      //jika sudah valid
      const token = jwt.sign({ data: decoded.data }, JWT_SECRET, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
      });
      return res.json({
        status: "success",
        data: {
          token,
        },
      });
    });

    // jika tidak ada
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
