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
    // const username = req.headers["x-username"];
    // const password = req.headers["x-password"];
    // const user = await api.post('/api/users/login', req.body);
    const user = await api.post("/api/users/login", req.headers);
    const data = user.data.data;

    const token = jwt.sign({ data }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    });
    const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
    });

    //ketika telah berhasil membuat token dan refreshtoken
    //maka refreshtoken akan tersimpan di tabel refreshtoken yang berada di SERVICE USER
    //berikut cara memanggilnya
    await api.post("/api/refresh_tokens", {
      refresh_token: refreshToken,
      user_id: data.id,
    });

    //setelah kedua token tersimpan
    //memberi respon ke fontend agar bisa digunakan oleh frontend
    return res.json({
      response: {
        token,
      },
      metadata: {
        message: "Ok",
        code: 200,
      },
    });

    return res.json(user.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
    }

    // const { status, data } = error.response;
    return res.status(201).json({
      metadata: {
        message: "Server RS Bermasalah",
        code: 201,
      },
    });
  }
};
