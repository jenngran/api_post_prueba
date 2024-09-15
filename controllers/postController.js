const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { title, content, tags, category } = req.body;
  try {
    const post = new Post({ title, content, tags, category, author: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la publicación' });
  }
};

exports.getPosts = async (req, res) => {
  const { category, tags } = req.query;
  let filter = {};
  if (category) filter.category = category;
  if (tags) filter.tags = { $in: tags.split(',') };

  try {
    const posts = await Post.find(filter).populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener publicaciones' });
  }
};

// Resto de las operaciones CRUD...
