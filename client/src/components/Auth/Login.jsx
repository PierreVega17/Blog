import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Alert, Checkbox, FormControlLabel } from '@mui/material';
import SocialAuth from './SocialAuth';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Login() {
  const { loginWithSocial, login } = useAuth();
  const { themeStyles } = useTheme(); // Obtén los estilos dinámicos del tema
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      loginWithSocial(token); // Inicia sesión con el token recibido
    }
  }, [loginWithSocial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh', // Asegura que el fondo cubra toda la pantalla
        backgroundColor: themeStyles.backgroundColor, // Fondo dinámico
        color: themeStyles.color, // Texto dinámico
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          p: 4,
          backgroundColor: themeStyles.inputBackground, // Fondo del formulario
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
          color: themeStyles.color,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Iniciar sesión
        </Typography>
        <Typography variant="body2" align="center" sx={{ mb: 2, color: themeStyles.color }}>
          Bienvenido usuario, por favor inicia sesión para continuar
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <SocialAuth />
        <Typography variant="body2" align="center" sx={{ mt: 2, mb: 2, color: themeStyles.color }}>
          O
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Correo electrónico"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              style: { color: themeStyles.inputColor },
            }}
            InputLabelProps={{
              style: { color: themeStyles.color },
            }}
            sx={{
              backgroundColor: themeStyles.inputBackground,
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: themeStyles.color,
                },
                '&:hover fieldset': {
                  borderColor: themeStyles.color,
                },
                '&.Mui-focused fieldset': {
                  borderColor: themeStyles.color,
                },
              },
            }}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              style: { color: themeStyles.inputColor },
            }}
            InputLabelProps={{
              style: { color: themeStyles.color },
            }}
            sx={{
              backgroundColor: themeStyles.inputBackground,
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: themeStyles.color,
                },
                '&:hover fieldset': {
                  borderColor: themeStyles.color,
                },
                '&.Mui-focused fieldset': {
                  borderColor: themeStyles.color,
                },
              },
            }}
          />
          <FormControlLabel
            control={<Checkbox sx={{ color: themeStyles.color }} />}
            label="Acuérdate de mí"
            sx={{ color: themeStyles.color, mt: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: themeStyles.buttonBackground,
              color: themeStyles.buttonColor,
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: themeStyles.buttonBackground === '#333333' ? '#444444' : '#e0e0e0',
              },
            }}
            disabled={submitting}
          >
            {submitting ? 'Cargando...' : 'Iniciar sesión con correo y contraseña'}
          </Button>
        </form>
      </Box>
    </Box>
  );
}

