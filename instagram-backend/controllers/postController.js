const Post = require('../models/post');
const User = require('../models/user');

// Helper function to find a post by ID
const findPostById = async (postId) => {
    return await Post.findByPk(postId);
};

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
};

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { userId } = req.params;
        const { title, description, images } = req.body;

        // Check if user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create post
        const post = await Post.create({ title, description, images, userId });
        
        // Update user post count
        user.postCount += 1;
        await user.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error creating post' });
    }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
    try {
        const { postId } = req.params;

        // Find post using helper function
        const post = await findPostById(postId);

        if (!post) return res.status(404).json({ error: 'Post not found' });

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching post' });
    }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, description, images } = req.body;

        // Find post using helper function
        const post = await findPostById(postId);

        if (!post) return res.status(404).json({ error: 'Post not found' });

        // Update post details
        post.title = title || post.title;
        post.description = description || post.description;
        post.images = images || post.images;

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error updating post' });
    }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        // Find post using helper function
        const post = await findPostById(postId);

        if (!post) return res.status(404).json({ error: 'Post not found' });

        // Delete post
        await post.destroy();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting post' });
    }
};
