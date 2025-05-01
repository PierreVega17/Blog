const GOOGLE_URL = '/api/auth/google/callback';
const GITHUB_URL = '/api/auth/github/callback';
const LOGIN_URL = '/api/auth/login';
const REGISTER_URL = '/api/auth/register';
const VERIFY_URL = '/api/auth/verify'; // Ruta protegida


const DASHBOARD_URL = '/dashboard'; // URL del frontend para redirigir después del login exitoso
const LOGIN_REDIRECT_URL = '/login'; // URL del frontend para redirigir después de un fallo en el login
const FRONTEND_URL = '/'


module.exports = { GOOGLE_URL, GITHUB_URL, LOGIN_URL, REGISTER_URL, VERIFY_URL, DASHBOARD_URL, LOGIN_REDIRECT_URL, FRONTEND_URL };