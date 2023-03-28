import { Router, Request, Response } from "express";

const router: Router = Router();

router.post("/api/users/signuout", (req: Request, res: Response) => {
    res.send("Hi There!!")
});

export { router as signOutRouter }