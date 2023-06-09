import { Router, Request, Response } from "express";
import { requireAuth } from "@mcticketingapp/common";
import { Order } from "../models/order";

const router = Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({ userId: req.currentUser!.id }).populate(
    "ticket"
  );
  res.json(orders);
});

export { router as indexOrderRouter };
