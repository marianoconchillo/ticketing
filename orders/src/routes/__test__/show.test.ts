import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { signIn } from "../../test/auth-helper";

it("returns an error if one user tries to fetch another user order", async () => {
  const ticket = Ticket.build({
    title: "Concert",
    price: 20,
  });

  await ticket.save();
  const userOne = signIn();
  const userTwo = signIn();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", userTwo)
    .send()
    .expect(401);
});

it("fetches the order", async () => {
  const ticket = Ticket.build({
    title: "Concert",
    price: 20,
  });

  await ticket.save();
  const user = signIn();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});
