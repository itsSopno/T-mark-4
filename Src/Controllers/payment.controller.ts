import { type Request, type Response } from "express";
import PaymentModel from "../Models/payment.model.js";

// @desc    Initiate a new payment
// @route   POST /api/payment/initiate
// @access  Private
export const initiatePayment = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userEmail, userImage, items, totalAmount, transactionId } = req.body;

        if (!userEmail || !items || !totalAmount || !transactionId) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newPayment = await PaymentModel.create({
            userEmail,
            userImage,
            items,
            totalAmount,
            transactionId,
            paymentStatus: 'pending'
        });

        return res.status(201).json({
            success: true,
            message: "Payment initiated successfully",
            data: newPayment
        });
    } catch (error) {
        console.error("Payment initiation error:", error);
        return res.status(500).json({ success: false, message: "Server error during payment initiation" });
    }
};

// @desc    Verify payment status
// @route   POST /api/payment/verify
// @access  Private
export const verifyPayment = async (req: Request, res: Response): Promise<any> => {
    try {
        const { transactionId, status } = req.body;

        const payment = await PaymentModel.findOneAndUpdate(
            { transactionId },
            { paymentStatus: status },
            { new: true }
        );

        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            data: payment
        });
    } catch (error) {
        console.error("Payment verification error:", error);
        return res.status(500).json({ success: false, message: "Server error during payment verification" });
    }
};
/**
 * @name getPaymentdataController
 * @desc user can get every paymentdata
 * @route GET /api/payment/getPaymentdata
 * @access Private
 */
export const getPaymentdataController = async (req: Request, res: Response): Promise<any> => {
    try {
        const payments = await PaymentModel.find();
        return res.status(200).json({
            success: true,
            message: "Payment data fetched successfully",
            data: payments
        });
    } catch (error) {
        console.error("Payment data fetch error:", error);
        return res.status(500).json({ success: false, message: "Server error during payment data fetch" });
    }
};