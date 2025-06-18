import express from "express";
import { register, login, verify,forgotPassword, updatePassword,acceptInvite } from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/register", register);
router.get("/verify/:token", verify);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", updatePassword);
router.post("/accept-invite/:token", acceptInvite);

export default router;
