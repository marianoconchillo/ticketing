import request from "supertest";
import { app } from "../../app";
import { signIn } from "../../test/auth-helper";
import { Ticket } from "../../models/ticket";

it("has a route handle listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).toEqual(401);
});

it("returns a status other than 401 is the user is signed in", async () => {
  const cookie = signIn();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  const cookie = signIn();

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "", price: 10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ price: 10 })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  const cookie = signIn();

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "NBA", price: -10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "NBA" })
    .expect(400);
});

it("creates a ticket with valid inputs", async () => {
  const cookie = signIn();

  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "NBA", price: 20 })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
});
