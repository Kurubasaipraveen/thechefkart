const express = require('express');
const {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
} = require('../controllers/postController');

const router = express.Router();

// Routes for post operations
router.get('/', getAllPosts); // Get all posts
router.post('/:userId', createPost); // Create a new post associated with a user
router.get('/:postId', getPostById); // Get a post by ID
router.put('/:postId', updatePost); // Update a post by ID
router.delete('/:postId', deletePost); // Delete a post by ID

module.exports = router;
