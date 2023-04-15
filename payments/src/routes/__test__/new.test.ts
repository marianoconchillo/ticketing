import request from "supertest";
import { Types } from "mongoose";
import { OrderStatus } from "@mcticketingapp/common";
import { app } from "../../app";
import { signIn } from "../../test/auth-helper";
import { Order } from "../../models/order";

it("returns a 404 when purchasing an order that does not exist", async () => {
  const cookie = signIn();

  await request(app)
    .post("/api/payments")
    .set("Cookie", cookie)
    .send({
      token: "12345",
      orderId: new Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("returns a 401 when purchasing an order that doesnt belong to the user", async () => {
  const order = Order.build({
    id: new Types.ObjectId().toHexString(),
    userId: new Types.ObjectId().toHexString(),
    price: 99,
    version: 0,
    status: OrderStatus.Created,
  });

  await order.save();

  const cookie = signIn();

  await request(app)
    .post("/api/payments")
    .set("Cookie", cookie)
    .send({
      token: "12345",
      orderId: order.id,
    })
    .expect(401);
});

it("returns a 400 when purchasing a cancelled order", async () => {
  const userId = new Types.ObjectId().toHexString();

  const order = Order.build({
    id: new Types.ObjectId().toHexString(),
    userId,
    price: 99,
    version: 0,
    status: OrderStatus.Cancelled,
  });

  await order.save();

  const cookie = signIn(userId);

  await request(app)
    .post("/api/payments")
    .set("Cookie", cookie)
    .send({
      token: "12345",
      orderId: order.id,
    })
    .expect(400);
});
