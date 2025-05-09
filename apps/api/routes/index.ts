import { Router } from "express";
const router = Router();

import shorten from "./shorten";
import analytics from "./analytics";

router.get("/", (req, res) => {
  res.send("Welcome to the i8i API");
});

router.post("/shorten", shorten);
router.get("/shorten", shorten);

router.get("/analytics", analytics);

export default router;
