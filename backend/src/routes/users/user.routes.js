import express from 'express';
import { verifyTokenMiddleware } from '../../middlewares/auth.middleware.js';
import { getUsers, getUserById, createUser, updateUser, deleteUser, refreshToken, login, logout, register, forgotPassword, changePassword } from './user.controller.js';

const router = express.Router();

// auth routers
router.post('/auth/login', login);
router.post('/auth/register', register);
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/change-password', changePassword);
router.post('/auth/logout', [verifyTokenMiddleware], logout);
router.post('/auth/refresh-token', refreshToken);

// user routers
router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.post('/user', [verifyTokenMiddleware], createUser);
router.put('/user/:id', [verifyTokenMiddleware], updateUser);
router.delete('/user/:id', [verifyTokenMiddleware], deleteUser);

export default router;
