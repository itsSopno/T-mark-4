import { Router } from "express";
import { getPaymentdataController, initiatePayment, updatePaymentStatus, verifyPayment } from "../Controllers/payment.controller.js";
const paymentRouter = Router();
paymentRouter.post("/initiate", initiatePayment);
paymentRouter.post("/verify", verifyPayment);
paymentRouter.get("/paymentData", getPaymentdataController);
paymentRouter.patch("/update/:id", updatePaymentStatus);
export default paymentRouter;
//# sourceMappingURL=payment.route.js.map