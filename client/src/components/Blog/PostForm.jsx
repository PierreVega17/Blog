import 'setimmediate'; 
import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button, Box, Typography, TextField, IconButton } from '@mui/material';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import 'draft-js/dist/Draft.css'; 
import api from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import useSWR from 'swr';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TitleIcon from '@mui/icons-material/Title';
import { BorderColor } from '@mui/icons-material';

export default function PostForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty()); // Estado del editor
  const editorRef = useRef(null); // Referencia al editor
  const { user } = useAuth();
  const { themeStyles } = useTheme();

  // mutate para invalidar la caché de SWR
  const { mutate } = useSWR('/posts');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const htmlContent = stateToHTML(editorState.getCurrentContent());
  
    try {
      const res = await api.post('/posts', { 
        title, 
        content: htmlContent, 
        username: user.username 
      });
      
      // Estructura compatible con el backend (incluyendo author)
      const postWithAuthor = {
        ...res.data,
        author: {
          _id: user.id,       
          username: user.username
        }
      };
  
      mutate((posts) => [postWithAuthor, ...(posts || [])], false);
      
      setTitle('');
      setEditorState(EditorState.createEmpty());
  
      if (onCreate) {
        onCreate(postWithAuthor); 
      }
      alert('Post creado exitosamente!');
    } catch (error) {
      console.error('Error al crear post:', error.response?.data);
    }
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  if (!user) return null; // No mostrar si no hay usuario logueado

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
        backgroundColor: themeStyles.backgroundColor,
        color: themeStyles.color,
        padding: 3,
        borderRadius: 2,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Crear un nuevo post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Título"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            backgroundColor: themeStyles.inputBackground,
            color: themeStyles.inputColor,
            borderRadius: 1,
          }}
        />
        <Typography variant="body1" gutterBottom>
          <br></br>
        </Typography>
        <Box
          sx={{
            border: '1px solid #ccc',
            padding: '10px',
            minHeight: '200px',
            backgroundColor: themeStyles.inputBackground,
            color: themeStyles.inputColor
          }}
          onClick={focusEditor}
          onTouchStart={focusEditor} // Enfocar el editor al hacer clic
        >
          <Editor
            ref={editorRef}
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <IconButton onClick={() => toggleInlineStyle('BOLD')}>
            <FormatBoldIcon />
          </IconButton>
          <IconButton onClick={() => toggleInlineStyle('ITALIC')}>
            <FormatItalicIcon />
          </IconButton>
          <IconButton onClick={() => toggleInlineStyle('UNDERLINE')}>
            <FormatUnderlinedIcon />
          </IconButton>
          <IconButton onClick={() => toggleBlockType('header-one')}>
            <TitleIcon />
          </IconButton>
          <IconButton onClick={() => toggleBlockType('unordered-list-item')}>
            <FormatListBulletedIcon />
          </IconButton>
          <IconButton onClick={() => toggleBlockType('ordered-list-item')}>
            <FormatListNumberedIcon />
          </IconButton>
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: themeStyles.buttonBackground,
            color: themeStyles.buttonColor,
            '&:hover': {
              backgroundColor: themeStyles.buttonBackground === '#333333' ? '#444444' : '#e0e0e0',
            },
          }}
        >
          Publicar
        </Button>
      </form>
    </Box>
  );
}