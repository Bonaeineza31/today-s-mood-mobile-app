import jwt from "jsonwebtoken";
import { findUserById } from "../models/usermodel";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.id);

    if (!user) throw new Error("User not found");

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};
