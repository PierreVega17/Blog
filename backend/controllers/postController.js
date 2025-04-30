const Post = require('../models/Post');

// Obtener todos los posts (públicos)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username email'); // Incluye username y email del autor
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener posts' });
  }
};

// Crear un nuevo post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({ title, content, author: req.userId });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// Obtener posts de un usuario (protegido)
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.userId });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tus posts' });
  }
};

// Eliminar un post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el post por ID
    const post = await Post.findById(id);

    // Verificar si el post existe
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    // Verificar si el usuario es el autor del post
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar este post' });
    }

    // Eliminar el post
    await post.deleteOne();
    res.json({ message: 'Post eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
};

// Editar un post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // Buscar el post por ID
    const post = await Post.findById(id);

    // Verificar si el post existe
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    // Verificar si el usuario es el autor del post
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'No tienes permiso para editar este post' });
    }

    // Actualizar el post
    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    res.json({ message: 'Post actualizado correctamente', post });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el post' });
  }
};