import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const signIn = (): string => {
  // Build a JWT paylaod: { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and ecode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string that is the cookie with the encoded data
  return `session=${base64}`;
};

export { signIn };
