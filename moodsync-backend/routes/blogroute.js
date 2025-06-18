import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { authorizeRole } from "../middlewares/authorize.js";
import { create, getAll, update, remove } from "../controllers/blogcontroller.js";

const router = express.Router();

router.get("/", getAll); // public
router.post("/", authenticate, authorizeRole(["admin", "superadmin"]), create);
router.put("/:id", authenticate, authorizeRole(["admin", "superadmin"]), update);
router.delete("/:id", authenticate, authorizeRole(["admin", "superadmin"]), remove);

export default router;
