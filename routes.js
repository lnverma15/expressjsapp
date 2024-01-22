
// routes.js

const express = require('express');
const router = express.Router();
const controller = require('./customer.controller');
const userController = require('./user.controller');

const middleware = require('./middleware'); // Import the middleware module

// Use middleware in the router
router.use(middleware.bodyParserJSON);
router.use(middleware.bodyParserURLEncoded);
// router.use(middleware.customMiddleware);

// Home route
router.get('/', (req, res) => {
    res.send('Hello World!');
});

// Create a new customer
router.post('/customers/new', controller.createCustomer);

// Get all customers or a single customer by ID
router.get('/customers/:id?', controller.getCustomer);

// Update a customer
router.put('/customers/update', controller.updateCustomer);

// Delete a customer
router.delete('/customers/delete/:email', controller.deleteCustomer);



// user-management routes
// Register a new user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

module.exports = router;
