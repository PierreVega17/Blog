import useSWR from 'swr';
import { Box, Typography } from '@mui/material';
import PostCard from './PostCard';
import { useSearch } from '../../context/SearchContext';
import api from '../../services/api';

// Función fetcher para obtener los datos
const fetcher = (url) => api.get(url).then((res) => res.data);

export default function PostList() {
  const { searchQuery } = useSearch(); // Obtén el estado de búsqueda del contexto

  // Usa SWR para obtener los posts
  const { data: posts = [], error, mutate } = useSWR('/posts', fetcher);

  if (error) {
    return <div>Error al cargar los posts</div>;
  }

  if (!Array.isArray(posts)) {
    console.error('La respuesta de /posts no es un array:', posts);
    return <div>No se pudieron cargar los posts</div>;
  }

  // Filtrar los posts según el término de búsqueda
  const filteredPosts = posts.filter((post) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(lowerCaseQuery) ||
      post.content.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Últimos Posts</Typography>
      {filteredPosts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onEdit={(updatedPost) => {
            // Actualiza el post en la caché de SWR
            mutate((prevPosts) =>
              prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p)),
              false // No revalida automáticamente
            );
          }}
          onDelete={(postId) => {
            // Elimina el post de la caché de SWR
            mutate((prevPosts) => prevPosts.filter((p) => p._id !== postId), false);
            api.delete(`/posts/${postId}`); // Elimina el post en el servidor
          }}
        />
      ))}
    </Box>
  );
}