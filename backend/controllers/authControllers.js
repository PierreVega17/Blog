const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registro
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar que todos los campos estén presentes
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Crear un nuevo usuario
    const user = new User({ username, email, password });
    await user.save();

    // Generar JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.cookie('token', token, { httpOnly: true });

    res.status(201).json({
      message: 'Usuario registrado',
      user: { id: user._id, username: user.username, email: user.email },
      token
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error('Usuario no encontrado');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Contraseña incorrecta');

    // Generar JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Login exitoso', user: { id: user._id, email: user.email, username: user.username }, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Verificar token (para el frontend)
exports.verify = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(401).json({ error: 'No autorizado' });
  }
};