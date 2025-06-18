import express from "express";
import { sendInvite } from "../controllers/admincontroller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorizeRole } from "../middlewares/authorize.js";

const router = express.Router();

router.post("/invite", authenticate, authorizeRole(["superadmin"]), sendInvite);

export default router;
