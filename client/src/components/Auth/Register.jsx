import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const { themeStyles } = useTheme(); // Obtén los estilos dinámicos del tema

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await register(username, email, password);
    } catch (error) {
      console.error('Error al registrar:', error.response?.data);
      setError('Error al registrar. Por favor, inténtalo de nuevo.');
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
        <Typography variant="h4" gutterBottom>
          Registro
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre de usuario"
            type="text"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            }}
          />
          <TextField
            label="Email"
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
            }}
          />
          <TextField
            label="Confirmar contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            }}
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
          >
            Registrarse
          </Button>
        </form>
      </Box>
    </Box>
  );
}