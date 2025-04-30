import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const { themeStyles } = useTheme(); // Usa los estilos dinámicos del tema
  const isHomePage = useLocation().pathname === '/'; // Verifica si estás en la página de inicio

  if (isHomePage) {
    return null; // No renderiza el footer si estás en la página de inicio
  }
  return (
    <Box
      sx={{
        backgroundColor: themeStyles.backgroundColor, // Fondo dinámico
        color: themeStyles.color, // Texto dinámico
        textAlign: 'center',
        padding: '20px',
        borderTop: `1px solid ${themeStyles.color}`, // Línea superior
      }}
    >
      <Typography variant="body1" sx={{ marginBottom: '10px' }}>
        Desarrollado por Jean Pierre Galarreta
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '10px' }}>
        {/* Icono de GitHub */}
        <Link
          href="https://github.com/tu-enlace-de-prueba"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: themeStyles.color, fontSize: '24px', '&:hover': { color: '#6e5494' } }}
        >
          <FaGithub />
        </Link>
        {/* Icono de Facebook */}
        <Link
          href="https://facebook.com/tu-enlace-de-prueba"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: themeStyles.color, fontSize: '24px', '&:hover': { color: '#4267B2' } }}
        >
          <FaFacebook />
        </Link>
        {/* Icono de Instagram */}
        <Link
          href="https://instagram.com/tu-enlace-de-prueba"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: themeStyles.color, fontSize: '24px', '&:hover': { color: '#E1306C' } }}
        >
          <FaInstagram />
        </Link>
      </Box>
      <Typography variant="body2">
        © {new Date().getFullYear()} Todos los derechos reservados.
      </Typography>
    </Box>
  );
}