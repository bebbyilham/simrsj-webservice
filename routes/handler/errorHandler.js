/**
 * Helper error handling untuk memastikan response error API Gateway
 * selalu berformat standar BPJS dan status code HTTP 200/201 (mencegah error 500 mentah).
 */
module.exports = (error, res) => {
  // Jika backend Laravel merespon (meskipun status error 4xx atau 201)
  if (error.response && error.response.data) {
    const status = error.response.status === 500 ? 200 : (error.response.status || 200);
    return res.status(status).json(error.response.data);
  }

  // Jika terjadi timeout (melebihi batas SLA threshold)
  if (error.code === 'ECONNABORTED') {
    return res.status(200).json({
      metadata: {
        message: 'Waktu tunggu layanan habis (SLA Timeout)',
        code: 201,
      },
    });
  }

  // Jika koneksi ke backend ditolak / down (ECONNREFUSED / ENOTFOUND dll)
  return res.status(200).json({
    metadata: {
      message: 'Server RS Bermasalah / Service Unavailable',
      code: 201,
    },
  });
};
