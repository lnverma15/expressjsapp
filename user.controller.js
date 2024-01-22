// user.controller.js

const db = require('./db.config');
const User = db.users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res, next) => {
    try {
        const { name, email, phone, age, password } = req.body;

        if (!name || !email || !phone || !age || !password) {
            return res.status(400).send({
                message: 'All fields are required'
            });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name,
            email: email,
            phone: phone,
            age: age,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
};

module.exports = {
    registerUser,
    loginUser
};
