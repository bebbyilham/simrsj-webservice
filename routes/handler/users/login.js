const apiAdapter = require("../../apiAdapter");
const jwt = require("jsonwebtoken");
const {
  URL_SERVICE_ANTREAN,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

//variabel  panggil adapter dg parameter base_url
const api = apiAdapter(URL_SERVICE_ANTREAN);

//integrasi api gateway create/post user
module.exports = async (req, res) => {
  try {
    const username = req.headers["x-username"] || req.body["x-username"] || req.body.username;
    const password = req.headers["x-password"] || req.body["x-password"] || req.body.password;

    if (!username || !password) {
      return res.status(200).json({
        metadata: {
          message: "Header atau parameter x-username dan x-password tidak boleh kosong",
          code: 201,
        },
      });
    }

    const payload = {
      "x-username": username,
      "x-password": password,
    };

    // Forward request ke backend Laravel
    const user = await api.post("/api/users/login", payload, {
      headers: {
        "x-username": username,
        "x-password": password,
      },
    });

    // Cek jika response dari backend mengindikasikan kegagalan autentikasi
    if (user.data && user.data.metadata && user.data.metadata.code !== 200) {
      return res.status(200).json(user.data);
    }

    const data = user.data.data || user.data.response;
    if (!data) {
      return res.status(200).json(user.data);
    }

    const token = jwt.sign({ data }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    });
    const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
    });

    // Simpan refreshToken ke backend jika user_id tersedia
    if (data.id) {
      try {
        await api.post("/api/refresh_tokens", {
          refresh_token: refreshToken,
          user_id: data.id,
        });
      } catch (err) {
        // Abaikan jika service refresh token gagal agar tidak memutus login
      }
    }

    return res.json({
      response: {
        token,
      },
      metadata: {
        message: "Ok",
        code: 200,
      },
    });
  } catch (error) {
    if (error.response && error.response.data) {
      return res.status(error.response.status || 200).json(error.response.data);
    }

    if (error.code === "ECONNABORTED") {
      return res.status(200).json({
        metadata: {
          message: "Waktu tunggu login habis (Timeout)",
          code: 201,
        },
      });
    }

    return res.status(200).json({
      metadata: {
        message: "Server RS Bermasalah / Service Unavailable",
        code: 201,
      },
    });
  }
};
