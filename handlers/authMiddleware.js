import jwt from 'jsonwebtoken';
import ApplicationError from './applicationErrorHandler.js'

// Middleware to authenticate JWT token from cookies
const authMiddleware = (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.token; // Assuming the cookie is named 'token'

        // Check if token is present
        if (!token) {
            throw new ApplicationError(401, 'Authentication token is missing')
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object (decoded contains token payload)
        req.user = decoded;

        // Proceed to the next middleware/route handler
        next();
    } catch (error) {
        // Handle invalid or expired token
        next(new ApplicationError(error.status || 401, error.message || "Invalid or expired token"))
    }
}


// admin verification 

export const isAdmin = (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.token; // Assuming the cookie is named 'token'

        // Check if token is present
        if (!token) {
            throw new ApplicationError(401, 'Authentication token is missing')
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== 'admin') {
            throw new ApplicationError(401, "Unauthorized")
        }

        // Attach user information to the request object (decoded contains token payload)
        req.user = decoded;

        // Proceed to the next middleware/route handler
        next();
    } catch (error) {
        // Handle invalid or expired token
        next(new ApplicationError(error.status || 401, error.message || "Invalid or expired token"))
    }
}

export default authMiddleware;
