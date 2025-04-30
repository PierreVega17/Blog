import { useAuth } from "../context/AuthContext";
import { useProtectedRoute } from "../hooks/useAuth";
import { Typography, Box } from "@mui/material";
import PostForm from '../components/Blog/PostForm';
import PostList from '../components/Blog/PostList';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

export default function Dashboard() {
  useProtectedRoute(); // Protege la ruta
  const { username } = useAuth().user; // Obtén el nombre de usuario del contexto de autenticación
  const { themeStyles } = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: themeStyles.backgroundColor, // Fondo dinámico
        color: themeStyles.color, // Texto dinámico
        minHeight: '100%', // Asegura que el Dashboard ocupe todo el espacio disponible
        padding: '5% 10%', // Padding del 5% en el borde
        boxSizing: 'border-box',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          marginBottom: '20px',
          color: themeStyles.color, // Color dinámico
        }}
      >
        Bienvenido, {username}
      </Typography>
      <PostForm onCreate={(newPost) => console.log(newPost)} />
      <PostList />
    </Box>
  );
}