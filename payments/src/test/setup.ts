import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

jest.mock("../nats-wrapper");

process.env.STRIPE_KEY =
  "sk_test_51MxA31CkKeF5Ku0wZAXgliPShCio4rf6PU2KBaQZrVkLRB5h139Ahbd9bOX1uh9GL0dznSJ69V9pRdZ0xOGxSZSv00VQSOcuFG";
let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = "123";

  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});
