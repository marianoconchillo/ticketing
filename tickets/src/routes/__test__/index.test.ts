import request from "supertest";
import { app } from "../../app";
import { signIn } from "../../test/auth-helper";

const createTicket = () => {
  const cookie = signIn();

  return request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "Concert", price: 20 })
    .expect(201);
};

it("can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(3);
});
