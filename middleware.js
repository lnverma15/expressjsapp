// // middleware.js

// const bodyParser = require('body-parser');

// // Custom middleware function
// const customMiddleware = (req, res, next) => {
//     // Add your custom middleware logic here
//     console.log('Custom middleware executed');
//     next();
// };

// // Export all middleware functions
// module.exports = {
//     bodyParserJSON: bodyParser.json(),
//     bodyParserURLEncoded: bodyParser.urlencoded({ extended: true }),
//     customMiddleware: customMiddleware,
// };



// middleware.js

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

module.exports = {
    bodyParserJSON: bodyParser.json(),
    bodyParserURLEncoded: bodyParser.urlencoded({ extended: true }),
    // customMiddleware: customMiddleware,
    authenticateToken: authenticateToken
};
