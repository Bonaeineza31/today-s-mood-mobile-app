import express from "express";
import { register, login, verify,forgotPassword, updatePassword } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.get("/verify/:token", verify);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", updatePassword);

export default router;
