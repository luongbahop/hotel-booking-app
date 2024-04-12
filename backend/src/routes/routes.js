import express from 'express';
import hotelRouter from './hotels/hotel.routes.js';

const router = express.Router();

router.use(hotelRouter);

export default router;
