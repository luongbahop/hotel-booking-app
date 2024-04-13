import express from 'express';
import { verifyTokenMiddleware } from '../../../middlewares/auth.middleware.js';
import { createRoom, deleteRoom, getRoomById, getRooms, updateRoom } from './room.controller.js';

const router = express.Router();

// rooms routers
router.get('/rooms', getRooms);
router.get('/room/:id', getRoomById);
router.post('/room', [verifyTokenMiddleware], createRoom);
router.put('/room/:id', [verifyTokenMiddleware], updateRoom);
router.delete('/room/:id', [verifyTokenMiddleware], deleteRoom);

export default router;
