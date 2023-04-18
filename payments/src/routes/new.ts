import { Router, Request, Response } from "express";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@mcticketingapp/common";
import { body } from "express-validator";
import { Order } from "../models/order";
import { stripe } from "../stripe";
import { Payment } from "../models/payment";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = Router();

router.post(
  "/api/payments",
  requireAuth,
  body("token").not().isEmpty().withMessage("Token must be provided"),
  body("orderId").not().isEmpty().withMessage("OrderId must be provided"),
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Order is cancelled");
    }

    const charge = await stripe.charges.create({
      currency: "aud",
      amount: order.price * 100,
      source: token,
    });

    const payment = Payment.build({
      orderId,
      stripeId: charge.id,
    });

    await payment.save();

    await new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: charge.id,
    });

    res.status(201).json({ id: payment.id });
  }
);

export { router as createChargeRouter };
