const express = require('express');
const passport = require('passport');
const { register, login, verify } = require('../controllers/authControllers');
const { requireAuth } = require('../middlewares/authMiddleware');
const {LOGIN_REDIRECT_URL, DASHBOARD_URL} = require('../config/config');

const router = express.Router();

// Rutas de registro y login
router.post('/register', register);
router.post('/login', login);
router.get('/verify', requireAuth, verify); // Ruta protegida

// Rutas de autenticación con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: LOGIN_REDIRECT_URL }),
  (req, res) => {
    res.redirect(DASHBOARD_URL); // Redirige al frontend después del login exitoso
  }
);

// Rutas de autenticación con GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: LOGIN_REDIRECT_URL }),
  (req, res) => {
    res.redirect(DASHBOARD_URL); // Redirige al frontend después del login exitoso
  }
);

module.exports = router;