import OrderModel from "../models/order.model.js";

export async function addOrder(req, res) {
    try {
        const {
            userId,
            orderId,
            productId,
            product_details,
            paymentId,
            payment_status,
            delivery_address,
            subTotalAmt,
            totalAmt,
            invoice_receipt,
        } = req.body;

        // Validate required fields (optional but recommended)
        if (!orderId || !userId || !productId) {
            return res.status(400).json({
                message: 'Missing required fields: orderId, userId, or productId.',
                error: true,
                success: false,
            });
        }

        // Create a new order document
        const newOrder = new OrderModel({
            userId,
            orderId,
            productId,
            product_details,
            paymentId,
            payment_status,
            delivery_address,
            subTotalAmt,
            totalAmt,
            invoice_receipt,
        });

        // Save to the database
        const savedOrder = await newOrder.save();

        return res.status(201).json({
            message: 'Order added successfully',
            error: false,
            success: true,
            data: savedOrder,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error',
            error: true,
            success: false,
        });
    }
}
