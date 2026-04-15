import express from 'express';
import { createOrder, verifyPayment } from '../controller/razorpay.controller.js';


const Razorpayrouter = express.Router();

Razorpayrouter.post("/create-order", createOrder);
Razorpayrouter.post("/verify-payment", verifyPayment);

export default Razorpayrouter;