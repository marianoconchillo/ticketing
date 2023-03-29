import express, { Application } from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signIn";
import { signOutRouter } from "./routes/signOut";
import { signUpRouters } from "./routes/signUp";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app: Application = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouters);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }

  const PORT: number = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
};

start();
