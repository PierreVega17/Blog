const GOOGLE_URL = 'https://blog-backend-upk0.onrender.com/api/auth/google/callback';
const GITHUB_URL = 'https://blog-backend-upk0.onrender.com/api/auth/github/callback';
const LOGIN_URL = 'https://blog-backend-upk0.onrender.com/api/auth/login';
const REGISTER_URL = 'https://blog-backend-upk0.onrender.com/api/auth/register';
const VERIFY_URL = 'https://blog-backend-upk0.onrender.com/api/auth/verify'; // Ruta protegida


const DASHBOARD_URL = 'https://blog-frontend-wzze.onrender.com/dashboard'; // URL del frontend para redirigir después del login exitoso
const LOGIN_REDIRECT_URL = 'https://blog-frontend-wzze.onrender.com/login'; // URL del frontend para redirigir después de un fallo en el login
const FRONTEND_URL = 'https://blog-frontend-wzze.onrender.com'


module.exports = { GOOGLE_URL, GITHUB_URL, LOGIN_URL, REGISTER_URL, VERIFY_URL, DASHBOARD_URL, LOGIN_REDIRECT_URL, FRONTEND_URL };