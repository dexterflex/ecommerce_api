import UserModel from "./userModel.js";
import jwt from 'jsonwebtoken';
import ApplicationError from "../../handlers/applicationErrorHandler.js";

class UserController {
    static async register(req, res, next) {
        try {
            let user = await UserModel.addUser(req.body);
            res.status(200).send({ message: "Registered Successfully", user });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            let user = await UserModel.authenticatedUser(req.body);

            // Generate JWT token with 2 days expiration
            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '2d' }
            );

            // Set the cookie with 2 days expiration
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days in milliseconds
            });

            res.status(200).send({ message: "Login Successfully", user });
        } catch (error) {
            next(error);
        }
    }



    static async resetPassword(req, res, next) {
        try {
            const { newPassword } = req.body;

            const user = await UserModel.resetPassword(req.user, newPassword)

            res.status(200).send({ message: "Password reset successfully", user });
        } catch (error) {
            next(error);
        }
    }

    static logout(req, res, next) {
        try {
            res.clearCookie('token', { httpOnly: true });
            res.status(200).send({ message: "Logout Successfully" });
        } catch (error) {
            next(new ApplicationError(400, "Failed to logout"));
        }
    }
}

export default UserController;
