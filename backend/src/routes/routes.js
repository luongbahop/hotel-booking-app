import express from 'express';

import userRouter from './users/user.routes.js';
import hotelRouter from './hotels/hotel/hotel.routes.js';

const router = express.Router();

router.use(userRouter);
router.use(hotelRouter);

export default router;
