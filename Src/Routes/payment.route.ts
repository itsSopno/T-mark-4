import { Router } from "express";
import { getPaymentdataController, initiatePayment, paymentDeleteController, updatePaymentStatus, verifyPayment } from "../Controllers/payment.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const paymentRouter: Router = Router();

paymentRouter.post("/initiate", authUser, initiatePayment);
paymentRouter.post("/verify", authUser, verifyPayment);
paymentRouter.get("/paymentData", authUser, getPaymentdataController);
paymentRouter.patch("/update/:id", authUser, updatePaymentStatus);
paymentRouter.delete("/delete/:id", authUser, paymentDeleteController);

export default paymentRouter;
