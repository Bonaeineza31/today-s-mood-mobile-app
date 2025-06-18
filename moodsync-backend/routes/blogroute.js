import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";
import { create, getAll, update, remove } from "../controllers/blog.controller.js";

const router = express.Router();

router.get("/", getAll); // public
router.post("/", authenticate, authorizeRole(["admin", "superadmin"]), create);
router.put("/:id", authenticate, authorizeRole(["admin", "superadmin"]), update);
router.delete("/:id", authenticate, authorizeRole(["admin", "superadmin"]), remove);

export default router;
