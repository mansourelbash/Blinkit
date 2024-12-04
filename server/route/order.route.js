import { Router } from "express";
import { addOrder } from "../controllers/order.controller.js";

const orderRouter = Router()
orderRouter.post('/order', addOrder)

export default orderRouter