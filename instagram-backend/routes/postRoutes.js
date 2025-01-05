const express = require('express');
const { getAllPosts, createPost } = require('../controllers/postController');
const router = express.Router();

router.get('/', getAllPosts);
router.post('/users/:userId', createPost);

module.exports = router;
