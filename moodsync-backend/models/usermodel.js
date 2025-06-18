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

export const getAllUsers = async () => {
  const [rows] = await pool.query("SELECT id, name, email, role, is_verified, is_active FROM users");
  return rows;
};

export const setUserActiveStatus = async (id, isActive) => {
  const [result] = await pool.query("UPDATE users SET is_active = ? WHERE id = ?", [isActive, id]);
  return result.affectedRows;
};

export const updateUserRole = async (id, role) => {
  const [result] = await pool.query("UPDATE users SET role = ? WHERE id = ?", [role, id]);
  return result.affectedRows;
};

export const deleteUserById = async (id) => {
  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows;
};
