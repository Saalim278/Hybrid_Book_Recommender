import express from 'express';
import { cancelOrder, createOrder, getOrdersByUser } from '../controller/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/user/:userId', getOrdersByUser);
router.post('/cancel', cancelOrder);

export default router;
