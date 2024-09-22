import jwt from 'jsonwebtoken';

// Middleware to authenticate JWT token from cookies
const authMiddleware = (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.token; // Assuming the cookie is named 'token'

        // Check if token is present
        if (!token) {
            return res.status(401).json({ message: 'Authentication token is missing' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object (decoded contains token payload)
        req.user = decoded;

        // Proceed to the next middleware/route handler
        next();
    } catch (error) {
        // Handle invalid or expired token
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authMiddleware;
