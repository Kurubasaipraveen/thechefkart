const Post = require('../models/post');
const User = require('../models/user');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { userId } = req.params;
        const { title, description, images } = req.body;
        const user = await User.findByPk(userId);

        if (!user) return res.status(404).json({ error: 'User not found' });

        const post = await Post.create({ title, description, images, userId });
        user.postCount += 1;
        await user.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error creating post' });
    }
};
