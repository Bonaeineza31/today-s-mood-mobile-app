import express from "express";
import {
  getAll,
  enableOrDisable,
  updateRole,
  deleteUser,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";

const router = express.Router();

// All these routes require superadmin
router.use(authenticate, authorizeRole(["superadmin"]));

router.get("/", getAll);
router.put("/status/:id", enableOrDisable);
router.put("/role/:id", updateRole);
router.delete("/:id", deleteUser);

export default router;
