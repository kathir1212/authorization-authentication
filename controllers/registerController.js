const registerModel = require('../models/register');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get all registered users
exports.getRegister = async (req, res, next) => {
    try {
        const getregister = await registerModel.find();
        res.json({ message: "Users fetched successfully", data: getregister });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single user's profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await registerModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const getregisterlist = await registerModel.findById(req.params.id);
        if (!getregisterlist) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Get successful', data: getregisterlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user' });
    }
};

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        
        const registerlist = new registerModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        
        await registerlist.save();
        return res.json({ message: 'Registration successful', data: registerlist });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update user details
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedRegister = await registerModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        res.json({ message: 'User updated successfully', data: updatedRegister });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedRegister = await registerModel.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully', data: deletedRegister });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// User login
exports.loginUser = async (req, res) => {
    try {
        const userlogin = await registerModel.findOne({ email: req.body.email });
        console.log(userlogin,"userlogin1");
        
        if (!userlogin) {
            console.log(userlogin,"userlogin2");

            return res.status(400).json({ message: "Invalid credentials" });

        }

        const isValid = bcrypt.compareSync(req.body.password, userlogin.password);
        console.log(isValid,"isValid3");

        if (!isValid) {
            console.log(isValid,"isValid4");

            return res.status(400).json({ message: "Invalid credentials" });

        }
        console.log(process.env.Jwt_SECRET,"process.env.Jwt_SECRET");

        const token = jwt.sign({ id: userlogin._id }, process.env.Jwt_SECRET);

        console.log(token,"token>>>>");
        
        return res.json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
