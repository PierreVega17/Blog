require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
require('./config/passportConfig'); // Configuración de Passport
const FRONTEND_URL = require('./config/config').FRONTEND_URL;

const app = express();

app.use(express.static('../client/dist/index.html'));
// Configuración de CORS
app.use(cors({
    credentials: true,
    origin: FRONTEND_URL 
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Configuración de sesiones
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

// Iniciar el servidor
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

