import express from 'express'
import authMiddleware from '../../handlers/authMiddleware.js';

import UserController from './userController.js'

// user router 
const userRouter = express.Router();

// get routes
userRouter.get('/logout', authMiddleware, UserController.logout)

// post routes 
userRouter.post('/register', UserController.register)
userRouter.post('/login', UserController.login)

// put route
userRouter.put('/password', authMiddleware, UserController.resetPassword)

export default userRouter;