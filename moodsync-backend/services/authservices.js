import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import {
  createUser,
  findUserByEmail,
  verifyUserEmail,
} from "../models/usermodel.js";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "../utils/sendemail.js";
import { AppError } from "../utils/error.js";

// REGISTER
export const registerUser = async ({ name, email, password }) => {
  const existing = await findUserByEmail(email);
  if (existing) throw new AppError("Email already in use", 409);

  const hashed = await bcrypt.hash(password, 10);
  await createUser({ name, email, password: hashed });

try {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  await sendVerificationEmail(email, token);
} catch (emailErr) {
  console.error("❌ Email error:", emailErr); // ADD THIS TO DEBUG
  throw new AppError("Failed to send verification email", 500);
}
  return { message: "Check your email to verify your account." };
};

// VERIFY EMAIL
export const verifyUser = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await verifyUserEmail(decoded.email);
    return { success: true };
  } catch {
    throw new AppError("Invalid or expired verification link", 400);
  }
};

// LOGIN
export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new AppError("User not found", 404);
  if (!user.is_verified) throw new AppError("Please verify your email first", 401);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new AppError("Invalid password", 401);

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { token, user };
};

// FORGOT PASSWORD
export const requestPasswordReset = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) throw new AppError("Email not found", 404);

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10m" });
  await sendPasswordResetEmail(email, token);

  return { message: "Reset link sent to email." };
};

// RESET PASSWORD
export const resetPassword = async (token, newPassword) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashed = await bcrypt.hash(newPassword, 10);

    const [result] = await pool.query("UPDATE users SET password = ? WHERE email = ?", [
      hashed,
      decoded.email,
    ]);

    if (result.affectedRows === 0) {
      throw new AppError("Failed to update password", 400);
    }

    return { message: "Password updated successfully" };
  } catch {
    throw new AppError("Invalid or expired reset token", 400);
  }
};

// ACCEPT INVITE
export const acceptInviteService = async (token, password) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashed = await bcrypt.hash(password, 10);

    await createUser({
      name: decoded.name,
      email: decoded.email,
      password: hashed,
      role: decoded.role,
      isVerified: true,
    });

    return { message: "Account created. You can now log in." };
  } catch {
    throw new AppError("Invalid or expired invite link", 400);
  }
};
