import request from "supertest";
import { OrderStatus } from "@mcticketingapp/common";
import { app } from "../../app";
import { signIn } from "../../test/auth-helper";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it("marks an order as cancelled", async () => {
  const cookie = signIn();

  const ticket = Ticket.build({
    title: "Concert",
    price: 20,
  });

  await ticket.save();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: cancelledOrder } = await request(app)
    .patch(`/api/orders/${order.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(cancelledOrder.status).toEqual(OrderStatus.Cancelled);
});

it("emits a order cancelled event", async () => {
  const cookie = signIn();

  const ticket = Ticket.build({
    title: "Concert",
    price: 20,
  });

  await ticket.save();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .patch(`/api/orders/${order.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
