import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button, AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useAuth } from "../context/AuthContext";
import { useTheme } from '../context/ThemeContext';
import SearchBar from './SearchBar'; // Importa el componente de búsqueda
import { useSearch } from '../context/SearchContext'; // Importa el contexto de búsqueda

export default function Navbar() {
  const { user, logout } = useAuth(); // Obtén el estado del usuario y la función de logout
  const location = useLocation();
  const { setSearchQuery } = useSearch(); // Obtén la función para actualizar el estado de búsqueda
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (query) => {
    setSearchQuery(query); // Actualiza el estado de búsqueda en el contexto
  };

  // Renderizado condicional basado en la ruta actual
  const isDashboardPage = location.pathname === "/dashboard";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const isHomePage = location.pathname === "/"; // Verifica si estás en la página de inicio

  if (isHomePage) {
    return null; // No renderiza nada si estás en la página de inicio
  } 

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        boxSizing: 'border-box', 
        maxWidth: '100%', 
        padding: 0, 
        margin: 0,
        overflowX: 'hidden',
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: theme === 'dark' ? '#fff' : '#000' }}>
              Blog
            </Link>
          </Typography>
          {location.pathname !== '/' && ( // Excluir el Home del toggle de tema
            <IconButton onClick={toggleTheme} color="inherit">
              {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          )}
          {isDashboardPage && user && (
            <>
              {/* Mostrar barra de búsqueda y opciones para usuarios autenticados en el dashboard */}
              <SearchBar onSearch={handleSearch} />
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  flexWrap: 'wrap', 
                  gap: 2, 
                }}
              >
                
                <Button color="inherit" onClick={logout}>
                  Cerrar sesión
                </Button>
              </Box>
            </>
          )}
          {isAuthPage && (
            <>
              {/* Mostrar opciones para usuarios no autenticados en las páginas de login y registro */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  flexWrap: 'wrap', 
                  gap: 2, 
                }}
              >
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Registro
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}