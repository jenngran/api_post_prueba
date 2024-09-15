const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createPost);
router.get('/', getPosts);

// Resto de las rutas CRUD...

module.exports = router;
