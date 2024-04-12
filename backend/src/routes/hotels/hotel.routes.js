import express from 'express';
import { getHotels } from './hotel.controller.js';

const router = express.Router();

// hotels routers
router.get('/hotels', getHotels);

export default router;
