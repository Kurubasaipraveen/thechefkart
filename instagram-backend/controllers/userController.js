const User = require('../models/user');

// Helper function to check if user exists by ID
const findUserById = async (userId) => {
    return await User.findByPk(userId);
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate for unique email (Optional: Add more validation)
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const user = await User.create({ username, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await findUserById(userId);

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email, password } = req.body;

        const user = await findUserById(userId);

        if (!user) return res.status(404).json({ error: 'User not found' });

        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password || user.password;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await findUserById(userId);

        if (!user) return res.status(404).json({ error: 'User not found' });

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};
