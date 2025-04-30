const jwt = require('jsonwebtoken');

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.token; // Leer el token de las cookies
  if (!token) return res.status(401).json({ error: 'No autorizado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido' });
    req.userId = decoded.userId; // Establecer el ID del usuario en la solicitud
    next();
  });
};