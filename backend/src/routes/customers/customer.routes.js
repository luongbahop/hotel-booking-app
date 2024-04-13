import express from 'express';
import { verifyTokenMiddleware } from '../../../middlewares/auth.middleware.js';
import { createCustomer, deleteCustomer, getCustomerById, getCustomers, updateCustomer } from './customer.controller.js';

const router = express.Router();

// customers routers
router.get('/customers', getCustomers);
router.get('/customer/:id', getCustomerById);
router.post('/customer', createCustomer);
router.put('/customer/:id', updateCustomer);
router.delete('/customer/:id', [verifyTokenMiddleware], deleteCustomer);

export default router;
