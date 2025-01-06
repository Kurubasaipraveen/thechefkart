const express = require('express');
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers); // GET all users
router.post('/', createUser); // CREATE a new user
router.get('/:userId', getUserById); // GET a user by ID
router.put('/:userId', updateUser); // UPDATE a user by ID
router.delete('/:userId', deleteUser); // DELETE a user by ID

module.exports = router;
