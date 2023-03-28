import { Router, Request, Response } from "express";

const router: Router = Router();

router.post("/api/users/signin", (req: Request, res: Response) => {
    res.send("Hi There!!")
});

export { router as signInRouter }