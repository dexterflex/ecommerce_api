import User from "./userSchema.js";
import bcrypt from 'bcrypt';
import ApplicationError from '../../handlers/applicationErrorHandler.js';

class UserModel {
    static async addUser(userData) {
        try {
            let user = await this.findByEmail(userData.email);
            if (user) {
                throw new ApplicationError(401, "Email Already Exists");
            }

            let newUser = new User({ ...userData, role: 'customer' });
            await newUser.save();

            return newUser;
        } catch (error) {
            throw new ApplicationError(error.status || 400, error.message || "Failed to add new user");
        }
    }

    static async authenticatedUser(userData) {
        try {
            let user = await this.findByEmail(userData.email);
            if (!user) {
                throw new ApplicationError(404, "Authentication failed");
            }

            let isMatch = await bcrypt.compare(userData.password, user.password);
            if (!isMatch) {
                throw new ApplicationError(404, "Authentication failed");
            }

            return user;
        } catch (error) {
            throw new ApplicationError(error.status || 404, error.message || "Failed to authenticate user");
        }
    }

    static async resetPassword(currentUser, newPassword) {
        try {
            let user = await this.findById(currentUser.id);
            user.password = newPassword;
            await user.save()

            return user;
        } catch (error) {
            throw new ApplicationError(error.status || 400, error.message || "Failed to Update Password")
        }
    }


    static async findByEmail(email) {
        return await User.findOne({ email }).select('+password');
    }

    static async findById(id) {
        return await User.findById(id).select('+password');
    }
}

export default UserModel;
