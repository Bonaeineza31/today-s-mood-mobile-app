import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { createMood, getMyMoods, getMyMoodStats } from "../controllers/moodcontroller.js";

const router = express.Router();

router.post("/", authenticate, createMood);
router.get("/", authenticate, getMyMoods);
router.get("/stats", authenticate, getMyMoodStats);

export default router;
