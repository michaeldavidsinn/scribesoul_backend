// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Tidak ada token yang disediakan!' });
  }

  // Format token adalah "Bearer <token>", kita hanya butuh tokennya
  token = token.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Tidak diizinkan! Token tidak valid.' });
    }
    // Simpan id user ke object request untuk digunakan di controller selanjutnya
    req.userId = decoded.id;
    next();
  });
};