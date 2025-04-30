import 'setimmediate'; // Asegúrate de que esto sea lo primero que se importe
import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Chip, Modal, TextField } from '@mui/material';
import { marked } from 'marked'; // Importa la biblioteca marked
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext'; // Importa el contexto de tema

export default function PostCard({ post, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ ...post });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const { themeStyles } = useTheme(); // Obtén los estilos dinámicos del tema

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onEdit(editedPost);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPost({ ...post });
    setIsEditing(false);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : 'Fecha no disponible';

  // Convierte el contenido del post a HTML usando marked
  const renderContent = (content) => {
    return { __html: marked(content) };
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor: themeStyles.backgroundColor, // Fondo dinámico
          color: themeStyles.color, // Texto dinámico
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px',
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {post.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: themeStyles.color, // Texto dinámico
              marginBottom: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              wordWrap: 'break-word',
            }}
            dangerouslySetInnerHTML={{__html:(post.content)}} // Renderiza el contenido como HTML
          />
          <Typography variant="caption" sx={{ color: themeStyles.color }}>
            Publicado por:  {post.author.username  || 'Anónimo'}
          </Typography>
          <br />
          <Typography variant="caption" sx={{ color: themeStyles.color }}>
            {formattedDate}
          </Typography>
        </CardContent>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: 2, paddingBottom: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {(post.tags || []).map((tag) => (
              <Chip key={tag} label={`#${tag}`} size="small" sx={{ backgroundColor: '#333', color: '#fff' }} />
            ))}
          </Box>
        </Box>

        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button size="small" color="primary" onClick={handleOpenModal}>
            Leer más...
          </Button>
        </CardActions>
      </Card>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxHeight: '90vh',
            bgcolor: themeStyles.backgroundColor, // Fondo dinámico
            color: themeStyles.color, // Texto dinámico
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
            overflowY: 'auto',
          }}
        >
          {isEditing ? (
            <>
              <TextField
                label="Título"
                name="title"
                fullWidth
                margin="normal"
                value={editedPost.title}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: themeStyles.inputBackground, color: themeStyles.inputColor }}
              />
              <TextField
                label="Contenido"
                name="content"
                fullWidth
                multiline
                rows={6}
                margin="normal"
                value={editedPost.content}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: themeStyles.inputBackground, color: themeStyles.inputColor }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button size="small" color="primary" onClick={handleSave}>
                  Guardar
                </Button>
                <Button size="small" color="inherit" onClick={handleCancel}>
                  Cancelar
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h4" gutterBottom>
                {post.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: 2,
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  maxWidth: '100%',
                }}
                dangerouslySetInnerHTML={renderContent(post.content)} // Renderiza el contenido como HTML
              />
              <Typography variant="caption" sx={{ color: themeStyles.color, display: 'block', marginBottom: 2 }}>
                Publicado por: {post.author.username || 'Anónimo'}
              </Typography>
              <Typography variant="caption" sx={{ color: themeStyles.color, display: 'block', marginBottom: 2 }}>
                {formattedDate}
              </Typography>
              {user.id === post.author._id?(
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button size="small" color="primary" onClick={() => setIsEditing(true)}>
                  Editar
                </Button>
                <Button size="small" color="error" onClick={() => onDelete(post._id)}>
                  Eliminar
                </Button>
                <Button size="small" color="inherit" onClick={handleCloseModal}>
                  Cerrar
                </Button>
              </Box>)
              :null}
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}