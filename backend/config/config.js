const GOOGLE_URL = 'http://localhost:3001/api/auth/google/callback';
const GITHUB_URL = 'http://localhost:3001/api/auth/github/callback';
const LOGIN_URL = 'http://localhost:3001/api/auth/login';
const REGISTER_URL = 'http://localhost:3001/api/auth/register';
const VERIFY_URL = 'http://localhost:3001/api/auth/verify'; // Ruta protegida


const DASHBOARD_URL = 'http://localhost:5173/dashboard'; // URL del frontend para redirigir después del login exitoso
const LOGIN_REDIRECT_URL = 'http://localhost:5173/login'; // URL del frontend para redirigir después de un fallo en el login
const FRONTEND_URL = 'http://localhost:5173'


module.exports = { GOOGLE_URL, GITHUB_URL, LOGIN_URL, REGISTER_URL, VERIFY_URL, DASHBOARD_URL, LOGIN_REDIRECT_URL, FRONTEND_URL };