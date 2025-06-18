import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  verifyUserEmail,
} from "../models/usermodel.js";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "../utils/sendemail.js";
import pool from "../config/db.js";

export const registerUser = async ({ name, email, password }) => {
  const existing = await findUserByEmail(email);
  if (existing) throw new Error("Email already in use");

  const hashed = await bcrypt.hash(password, 10);
  await createUser({ name, email, password: hashed });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  await sendVerificationEmail(email, token);

  return { message: "Check your email to verify your account." };
};

export const verifyUser = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  await verifyUserEmail(decoded.email);
  return { success: true };
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");
  if (!user.is_verified) throw new Error("Verify your email first");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

  return { token, user };
};

export const requestPasswordReset = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Email not found");

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10m" });
  await sendPasswordResetEmail(email, token);
  return { message: "Reset link sent to email." };
};

export const resetPassword = async (token, newPassword) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashed = await bcrypt.hash(newPassword, 10);

    const [result] = await pool.query("UPDATE users SET password = ? WHERE email = ?", [hashed, decoded.email]);
    if (result.affectedRows === 0) throw new Error("Failed to update password");

    return { message: "Password updated successfully" };
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
