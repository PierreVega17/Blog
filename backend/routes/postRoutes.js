const express = require('express');
const { createPost, getAllPosts, getUserPosts, deletePost, updatePost } = require('../controllers/postController');
const { requireAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas públicas
router.get('/', getAllPosts);

// Rutas protegidas (requieren autenticación)
router.post('/', requireAuth, createPost);
router.get('/my-posts', requireAuth, getUserPosts);
router.delete('/:id', requireAuth, deletePost); // Ruta para eliminar un post
router.put('/:id', requireAuth, updatePost); // Ruta para editar un post

module.exports = router;