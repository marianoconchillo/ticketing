import request from "supertest";
import { Types } from "mongoose";
import { app } from "../../app";
import { signIn } from "../../test/auth-helper";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it("returns an error if the ticket does not exist", async () => {
  const cookie = signIn();
  const ticketId = new Types.ObjectId();

  await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId })
    .expect(404);
});

it("returns an error if the ticket is already reserved", async () => {
  const cookie = signIn();

  const ticket = Ticket.build({
    title: "Concert",
    price: 20,
  });

  await ticket.save();

  const order = Order.build({
    userId: "1234",
    status: OrderStatus.Created,
    expiresAt: new Date(),
    ticket,
  });

  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("reserves a ticket", async () => {
  const cookie = signIn();

  const ticket = Ticket.build({
    title: "Concert",
    price: 20,
  });

  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: ticket.id })
    .expect(201);
});

it("emits an order created event", async () => {
  const cookie = signIn();

  const ticket = Ticket.build({
    title: "Concert",
    price: 20,
  });

  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: ticket.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
