import express from 'express';
import { verifyTokenMiddleware } from '../../../middlewares/auth.middleware.js';
import { createHotel, deleteHotel, getHotelById, getHotels, updateHotel } from './hotel.controller.js';

const router = express.Router();

// hotels routers
router.get('/hotels', getHotels);
router.get('/hotel/:id', getHotelById);
router.post('/hotel', [verifyTokenMiddleware], createHotel);
router.put('/hotel/:id', [verifyTokenMiddleware], updateHotel);
router.delete('/hotel/:id', [verifyTokenMiddleware], deleteHotel);

export default router;
