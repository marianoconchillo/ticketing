import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/api/users/currentUser", (req: Request, res: Response) => {
    res.send("Hi There!!")
});

export { router as currentUserRouter }