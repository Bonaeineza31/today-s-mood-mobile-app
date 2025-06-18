import pool from "../config/db.js";

export const createUser = async ({ name, email, password, role = "user", isVerified = false }) => {
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password, role, is_verified) VALUES (?, ?, ?, ?, ?)",
    [name, email, password, role, isVerified]
  );
  return result.insertId;
};

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

export const verifyUserEmail = async (email) => {
  await pool.query("UPDATE users SET is_verified = true WHERE email = ?", [email]);
};
