import { Router } from "express";
import { getPaymentdataController, initiatePayment, verifyPayment } from "../Controllers/payment.controller.js";

const paymentRouter: Router = Router();

paymentRouter.post("/initiate", initiatePayment);
paymentRouter.post("/verify", verifyPayment);
paymentRouter.get("/paymentData", getPaymentdataController)

export default paymentRouter;
