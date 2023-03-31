import { Router, Request, Response } from "express";

const router: Router = Router();

router.post("/api/users/signout", (req: Request, res: Response) => {
  req.session = null;
  res.json({});
});

export { router as signOutRouter };
