import React from 'react';
import { Button, Box } from '@mui/material';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const GOOGLE_AUTH = import.meta.env.VITE_GOOGLE_AUTH 
const GITHUB_AUTH = import.meta.env.VITE_GITHUB_AUTH 

export default function SocialAuth() {
  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH; // Redirige al backend para autenticación con Google
  };

  const handleGitHubLogin = () => {
    window.location.href = GITHUB_AUTH; // Redirige al backend para autenticación con GitHub
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      <Button
        variant="contained"
        onClick={handleGitHubLogin}
        sx={{
          textTransform: 'none',
          backgroundColor: '#333',
          color: '#fff',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          '&:hover': {
            backgroundColor: '#444',
          },
        }}
      >
        <FaGithub size={20} /> Iniciar Sesión Con GitHub
      </Button>
      <Button
        variant="contained"
        onClick={handleGoogleLogin}
        sx={{
          textTransform: 'none',
          backgroundColor: '#db4437',
          color: '#fff',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          '&:hover': {
            backgroundColor: '#c33c2e',
          },
        }}
      >
        <FaGoogle size={20} /> Iniciar Sesión Con Google
      </Button>
    </Box>
  );
}