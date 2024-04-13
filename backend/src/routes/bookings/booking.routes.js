import express from 'express';
import { verifyTokenMiddleware } from '../../middlewares/auth.middleware.js';
import { createBooking, deleteBooking, getBookingById, getBookings, updateBooking } from './booking.controller.js';

const router = express.Router();

// bookings routers
router.get('/bookings', getBookings);
router.get('/booking/:id', getBookingById);
router.post('/booking', createBooking);
router.put('/booking/:id', updateBooking);
router.delete('/booking/:id', [verifyTokenMiddleware], deleteBooking);

export default router;
