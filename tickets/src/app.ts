import express, { Application } from "express";
import "express-async-errors";
import { errorHandler, NotFoundError } from "@mcticketingapp/common";
import cookieSession from "cookie-session";
import { json } from "body-parser";

const app: Application = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
