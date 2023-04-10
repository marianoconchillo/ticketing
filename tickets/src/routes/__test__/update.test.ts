import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { signIn } from "../../test/auth-helper";
import { natsWrapper } from "../../nats-wrapper";

it("returns a 404 if the provided id does not exist", async () => {
  const cookie = signIn();
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", cookie)
    .send({ title: "Concert", price: 20 })
    .expect(404);
});

it("returns a 401 if the user is not authenticaded", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "Concert", price: 20 })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const cookieUser1 = signIn();
  const cookieUser2 = signIn();

  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookieUser1)
    .send({ title: "Concert", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookieUser2)
    .send({ title: "Concert", price: 30 })
    .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = signIn();

  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "Concert", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 20 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "Concert", price: -20 })
    .expect(400);
});

it("updated the ticket provided valid input", async () => {
  const cookie = signIn();

  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "Concert", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "Boca Juniors Match", price: 100 })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual("Boca Juniors Match");
  expect(ticketResponse.body.price).toEqual(100);
});

it("publishes an event", async () => {
  const cookie = signIn();

  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "Concert", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "Boca Juniors Match", price: 100 })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
