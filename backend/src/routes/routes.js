import express from 'express';

import userRouter from './users/user.routes.js';
// import customerRouter from './customers/customer.routes.js';
import bookingRouter from './bookings/booking.routes.js';
import hotelRouter from './hotels/hotel/hotel.routes.js';
import roomRouter from './hotels/room/room.routes.js';

const router = express.Router();

router.use(userRouter);
// router.use(customerRouter);
router.use(bookingRouter);
router.use(hotelRouter);
router.use(roomRouter);

export default router;
