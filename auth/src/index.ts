import express, { Application } from "express";
import { json } from "body-parser"
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signIn";
import { signOutRouter } from "./routes/signOut";
import { signUpRouters } from "./routes/signUp";

const app: Application = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouters);

const PORT: number = 3000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${ PORT }`);
});